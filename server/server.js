import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { getClient, query } from './db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load project root .env first, then server/.env (if present) to support both run locations.
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config();

const app = express();
const PORT = process.env.API_PORT || 3001;
const corsOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const isCorsOriginAllowed = (origin) => {
  if (!origin) {
    return true;
  }

  if (corsOrigins.length === 0) {
    return true;
  }

  return corsOrigins.some((allowedOrigin) => {
    if (allowedOrigin === origin) {
      return true;
    }

    if (!allowedOrigin.includes('*')) {
      return false;
    }

    const escaped = allowedOrigin
      .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
      .replace(/\*/g, '.*');
    return new RegExp(`^${escaped}$`, 'i').test(origin);
  });
};

app.use(
  cors(
    corsOrigins.length > 0
      ? {
          origin(origin, callback) {
            if (isCorsOriginAllowed(origin)) {
              callback(null, true);
              return;
            }

            callback(new Error('CORS origin not allowed'));
          },
        }
      : undefined
  )
);
app.use(express.json());

const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || process.env.JWT_SECRET || 'change-me-admin-secret';
const USER_JWT_SECRET = process.env.USER_JWT_SECRET || process.env.JWT_SECRET || 'change-me-user-secret';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin@12345';

const normalizeEmail = (value) => (value ? String(value).trim().toLowerCase() : null);
const normalizePhone = (value) => (value ? String(value).trim() : null);
const FALLBACK_SEAMLESS_COMPANY_KEYS = ['SWKEY-REAL-0513', '799DCB01CFB9489CB2DF42D9B0743F59'];
const seamlessCompanyKeys = Array.from(
  new Set([
    ...FALLBACK_SEAMLESS_COMPANY_KEYS,
    ...String(process.env.SEAMLESS_COMPANY_KEY || '')
      .split(',')
      .map((value) => String(value || '').trim())
      .filter(Boolean),
  ])
);
const seamlessStateByTransfer = new Map();
const seamlessTransferByTxn = new Map();
const SEAMLESS_BETS_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS seamless_bets (
    transfer_key TEXT PRIMARY KEY,
    bet_payload JSONB NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;
const SEAMLESS_TXN_INDEX_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS seamless_tx_index (
    txn_key TEXT PRIMARY KEY,
    transfer_key TEXT NOT NULL REFERENCES seamless_bets(transfer_key) ON DELETE CASCADE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;
const tkpayCallbackWhitelist = String(process.env.TKPAY_CALLBACK_IP_WHITELIST || '')
  .split(',')
  .map((value) => String(value || '').trim())
  .filter(Boolean);

const runDbQuery = (client, text, params = []) => (client ? client.query(text, params) : query(text, params));

const hydrateTxnIndexFromBet = (transferKey, bet) => {
  if (!bet || !bet.scope || !bet.txs || typeof bet.txs !== 'object') {
    return;
  }

  const transferCode = String(bet.transfer_code || '').trim();
  if (!transferCode) {
    return;
  }

  Object.keys(bet.txs).forEach((txnId) => {
    const txnKey = [
      String(bet.scope.username || ''),
      String(bet.scope.productType || ''),
      String(bet.scope.gameType || ''),
      String(bet.scope.gpid || ''),
      transferCode,
      String(txnId || ''),
    ].join('|');
    seamlessTransferByTxn.set(txnKey, transferKey);
  });
};

const loadSeamlessBet = async (transferKey, client = null) => {
  const cached = seamlessStateByTransfer.get(transferKey);
  if (cached) {
    return cached;
  }

  const result = await runDbQuery(
    client,
    `SELECT bet_payload
       FROM seamless_bets
      WHERE transfer_key = $1
      LIMIT 1`,
    [transferKey]
  );

  const payload = result.rows[0]?.bet_payload;
  if (!payload || typeof payload !== 'object') {
    return null;
  }

  seamlessStateByTransfer.set(transferKey, payload);
  hydrateTxnIndexFromBet(transferKey, payload);
  return payload;
};

const loadTransferKeyByTxn = async (txnKey, client = null) => {
  const cached = seamlessTransferByTxn.get(txnKey);
  if (cached) {
    return cached;
  }

  const result = await runDbQuery(
    client,
    `SELECT transfer_key
       FROM seamless_tx_index
      WHERE txn_key = $1
      LIMIT 1`,
    [txnKey]
  );

  const transferKey = result.rows[0]?.transfer_key;
  if (!transferKey) {
    return null;
  }

  seamlessTransferByTxn.set(txnKey, transferKey);
  return transferKey;
};

const persistSeamlessBet = async (client, transferKey, bet) => {
  await runDbQuery(
    client,
    `INSERT INTO seamless_bets (transfer_key, bet_payload, updated_at)
     VALUES ($1, $2::jsonb, CURRENT_TIMESTAMP)
     ON CONFLICT (transfer_key)
     DO UPDATE SET bet_payload = EXCLUDED.bet_payload,
                   updated_at = CURRENT_TIMESTAMP`,
    [transferKey, JSON.stringify(bet)]
  );
};

const persistSeamlessTxnIndex = async (client, txnKey, transferKey) => {
  await runDbQuery(
    client,
    `INSERT INTO seamless_tx_index (txn_key, transfer_key, updated_at)
     VALUES ($1, $2, CURRENT_TIMESTAMP)
     ON CONFLICT (txn_key)
     DO UPDATE SET transfer_key = EXCLUDED.transfer_key,
                   updated_at = CURRENT_TIMESTAMP`,
    [txnKey, transferKey]
  );
};

const getRequestIp = (req) => {
  const forwarded = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  const candidate = forwarded || req.ip || req.socket?.remoteAddress || '';
  return String(candidate || '').replace('::ffff:', '').trim();
};

const isTkpayIpAllowed = (req) => {
  if (tkpayCallbackWhitelist.length === 0) {
    return true;
  }

  const requestIp = getRequestIp(req);
  return tkpayCallbackWhitelist.includes(requestIp);
};

const findTkpayReference = (payload) => {
  const value = getBodyValue(
    payload,
    'reference_id',
    'referenceId',
    'merchant_order_no',
    'merchantOrderNo',
    'order_no',
    'orderNo',
    'out_trade_no',
    'trade_no',
    'transaction_id',
    'transactionId',
    'ref',
    'RefNo'
  );
  return value ? String(value).trim() : '';
};

const getTkpayStatusText = (payload) =>
  String(
    getBodyValue(payload, 'status', 'trade_status', 'order_status', 'state', 'result', 'message') || ''
  )
    .trim()
    .toLowerCase();

const getTkpayStatusCode = (payload) =>
  String(getBodyValue(payload, 'code', 'status_code', 'result_code', 'errno', 'error_code') || '')
    .trim()
    .toLowerCase();

const isTkpayCallbackSuccess = (payload) => {
  const status = getTkpayStatusText(payload);
  const code = getTkpayStatusCode(payload);
  const successText = ['success', 'succeed', 'succeeded', 'paid', 'completed', 'done', 'ok'];
  const successCode = ['0', '00', '200', '201', 'ok', 'success'];
  return successText.includes(status) || successCode.includes(code);
};

const parseTkpayChannels = () => {
  return String(process.env.TKPAY_SUPPORTED_CHANNELS || '')
    .split(',')
    .map((pair) => pair.trim())
    .filter(Boolean)
    .reduce((acc, pair) => {
      const [code, value] = pair.split(':').map((v) => String(v || '').trim().toLowerCase());
      const channelId = Number(value);
      if (code && Number.isFinite(channelId) && channelId > 0) {
        acc[code] = channelId;
      }
      return acc;
    }, {});
};

const compactTkpayPayload = (payload) =>
  Object.fromEntries(
    Object.entries(payload || {}).filter(([, value]) => {
      if (value === null || value === undefined) {
        return false;
      }
      if (typeof value === 'string' && value.trim() === '') {
        return false;
      }
      return true;
    })
  );

const tkpayNormalizeValue = (value) => {
  if (value === null || value === undefined) {
    return null;
  }

  if (typeof value === 'number') {
    if (!Number.isFinite(value)) {
      return null;
    }
    if (Number.isInteger(value)) {
      return String(value);
    }
    return String(Number(value));
  }

  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }

  return String(value);
};

const buildTkpayEncryptValue = (payload, hashKey) => {
  const keys = Object.keys(payload || {})
    .filter((key) => key !== 'EncryptValue')
    .filter((key) => payload[key] !== null && payload[key] !== undefined)
    .sort((a, b) => a.localeCompare(b));

  const body = keys
    .map((key) => `${key}=${tkpayNormalizeValue(payload[key])}`)
    .join('&');

  const source = `${body}${body ? '&' : ''}HashKey=${hashKey}`.toLowerCase();
  return crypto.createHash('sha256').update(source, 'utf8').digest('hex').toUpperCase();
};

const tkpayConfig = () => {
  const baseUrl = String(process.env.TKPAY_API_BASE_URL || '').replace(/\/+$/, '');
  const merchantId = String(process.env.TKPAY_MERCHANT_ID || '').trim();
  const hashKey = String(process.env.TKPAY_MERCHANT_KEY || '').trim();
  const collectionCallback = String(process.env.TKPAY_COLLECTION_CALLBACK_URL || '').trim();
  const payoutCallback = String(process.env.TKPAY_PAYOUT_CALLBACK_URL || '').trim();
  const returnUrl = String(process.env.TKPAY_RETURN_URL || process.env.VITE_PUBLIC_SITE_URL || 'https://gpzes.com/').trim();
  const currencyId = Number(process.env.TKPAY_CURRENCY_ID || 11);

  return {
    ok: Boolean(baseUrl && merchantId && hashKey),
    baseUrl,
    merchantId,
    hashKey,
    collectionCallback,
    payoutCallback,
    returnUrl,
    currencyId: Number.isFinite(currencyId) ? currencyId : 11,
    channels: parseTkpayChannels(),
  };
};

const buildReturnUrlWithRef = (baseUrl, referenceId) => {
  const base = String(baseUrl || '').trim();
  const ref = String(referenceId || '').trim();
  if (!base || !ref) {
    return base;
  }

  const separator = base.includes('?') ? '&' : '?';
  return `${base}${separator}deposit_ref=${encodeURIComponent(ref)}`;
};

const callTkpayApi = async (endpointPath, payload) => {
  const conf = tkpayConfig();
  if (!conf.ok) {
    throw new Error('TKPAY configuration is incomplete');
  }

  const withSign = compactTkpayPayload({
    ...payload,
    ShopUserLongId: payload.ShopUserLongId || conf.merchantId,
  });
  withSign.EncryptValue = buildTkpayEncryptValue(withSign, conf.hashKey);

  const response = await fetch(`${conf.baseUrl}${endpointPath}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(withSign),
  });

  const text = await response.text();
  let data = null;
  try {
    data = JSON.parse(text);
  } catch {
    data = { raw: text };
  }

  return {
    ok: response.ok,
    status: response.status,
    payload: withSign,
    data,
  };
};

const externalGameApiConfig = () => {
  const baseUrl = String(process.env.SW_API_BASE_URL || '').replace(/\/+$/, '');
  const companyKey = String(process.env.SW_API_COMPANY_KEY || '').trim();
  const serverId = String(process.env.SW_API_SERVER_ID || 'GPZES01').trim();
  const agent = String(process.env.SW_API_AGENT_USERNAME || '').trim();
  const lang = String(process.env.SW_API_LANG || 'en').trim() || 'en';

  return {
    ok: Boolean(baseUrl && companyKey && serverId),
    baseUrl,
    companyKey,
    serverId,
    agent,
    lang,
  };
};

const callExternalGameApi = async (endpointPath, payload = {}) => {
  const conf = externalGameApiConfig();
  if (!conf.ok) {
    throw new Error('External game API configuration is incomplete');
  }

  const response = await fetch(`${conf.baseUrl}${endpointPath}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...payload,
      CompanyKey: conf.companyKey,
      ServerId: conf.serverId,
    }),
  });

  const text = await response.text();
  let data = {};
  try {
    data = JSON.parse(text);
  } catch {
    data = { raw: text };
  }

  return {
    ok: response.ok,
    status: response.status,
    data,
    conf,
  };
};

const toCasinoCategory = (newGameType) => {
  const type = Number(newGameType);
  if (!Number.isFinite(type)) {
    return 'other';
  }
  if (type >= 100 && type < 200) {
    return 'live';
  }
  if (type >= 200 && type < 300) {
    return 'slots';
  }
  if (type >= 300 && type < 400) {
    return 'table';
  }
  if (type === 9 || type === 10 || type === 11) {
    return 'live';
  }
  return 'other';
};

const toPublicIconUrl = (rawUrl) => {
  const url = String(rawUrl || '').trim();
  if (!url) {
    return '';
  }
  if (/^https?:\/\//i.test(url)) {
    return url;
  }
  if (url.startsWith('/')) {
    return `https://img-3-2.cdn568.net${url}`;
  }
  return `https://img-3-2.cdn568.net/${url}`;
};

const syncLiveCasinoGames = async ({ removeLegacyRows = true } = {}) => {
  const conf = externalGameApiConfig();
  if (!conf.ok) {
    throw new Error('SW_API_BASE_URL, SW_API_COMPANY_KEY, and SW_API_SERVER_ID are required');
  }

  const remote = await callExternalGameApi('/web-root/restricted/information/get-game-list.aspx', {
    GpId: 0,
    IsGetAll: true,
  });

  const apiErrorId = Number(remote.data?.error?.id ?? -1);
  if (apiErrorId !== 0) {
    throw new Error(String(remote.data?.error?.msg || 'Game list API failed'));
  }

  const rows = Array.isArray(remote.data?.seamlessGameProviderGames)
    ? remote.data.seamlessGameProviderGames
    : [];

  let client;
  try {
    client = await getClient();
    await client.query('BEGIN');
    await client.query('SET LOCAL statement_timeout = 0');

    if (removeLegacyRows) {
      await client.query(
        `DELETE FROM casino_games
         WHERE gp_id IS NULL
            OR upstream_game_id IS NULL`
      );
    }

    const normalizedRows = [];
    for (let i = 0; i < rows.length; i++) {
      const item = rows[i] || {};
      const gpId = Number(item.gameProviderId);
      const upstreamGameId = Number(item.gameID);

      if (!Number.isFinite(gpId) || gpId <= 0 || !Number.isFinite(upstreamGameId) || upstreamGameId <= 0) {
        continue;
      }

      const infos = Array.isArray(item.gameInfos) ? item.gameInfos : [];
      const enInfo = infos.find((g) => String(g.language || '').toLowerCase() === 'en') || infos[0] || {};
      const title = String(enInfo.gameName || item.provider || `Game ${upstreamGameId}`).trim();
      const provider = String(item.provider || 'Unknown').trim() || 'Unknown';
      const imageUrl = toPublicIconUrl(enInfo.gameIconUrl);

      if (!title || !imageUrl) {
        continue;
      }

      const isActive = Boolean(item.isEnabled ?? true) && Boolean(item.isProviderOnline ?? true) && !Boolean(item.isMaintain ?? false);

      normalizedRows.push([
        gpId,
        upstreamGameId,
        title,
        provider,
        toCasinoCategory(item.newGameType),
        imageUrl,
        '#',
        Number.isFinite(Number(item.rank)) ? Number(item.rank) : i,
        isActive,
      ]);
    }

    const batchSize = 300;
    let upserted = 0;

    for (let offset = 0; offset < normalizedRows.length; offset += batchSize) {
      const chunk = normalizedRows.slice(offset, offset + batchSize);
      const placeholders = [];
      const params = [];

      for (let index = 0; index < chunk.length; index++) {
        const base = index * 9;
        const row = chunk[index];
        placeholders.push(`($${base + 1},$${base + 2},$${base + 3},$${base + 4},$${base + 5},$${base + 6},$${base + 7},$${base + 8},$${base + 9})`);
        params.push(...row);
      }

      const bulkUpsertSql = `
        INSERT INTO casino_games (
          gp_id,
          upstream_game_id,
          title,
          provider,
          category,
          image_url,
          game_url,
          sort_order,
          is_active
        ) VALUES ${placeholders.join(',')}
        ON CONFLICT (gp_id, upstream_game_id)
        DO UPDATE SET
          title = EXCLUDED.title,
          provider = EXCLUDED.provider,
          category = EXCLUDED.category,
          image_url = EXCLUDED.image_url,
          game_url = EXCLUDED.game_url,
          sort_order = EXCLUDED.sort_order,
          is_active = EXCLUDED.is_active,
          updated_at = CURRENT_TIMESTAMP
      `;

      await client.query(bulkUpsertSql, params);
      upserted += chunk.length;
    }

    await client.query('COMMIT');

    const count = await query('SELECT COUNT(*)::int AS c FROM casino_games WHERE is_active = true');
    return {
      ok: true,
      upserted,
      sourceCount: rows.length,
      activeCount: Number(count.rows[0]?.c || 0),
      serverId: remote.data?.serverId || conf.serverId,
    };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

const normalizeExternalUsername = (userId, username) => {
  const safe = String(username || '')
    .replace(/[^a-zA-Z0-9_]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 22);
  return `gpz_${userId}_${safe || 'player'}`.slice(0, 40);
};

const ensureExternalPlayer = async (authUser, client = null) => {
  const conf = externalGameApiConfig();
  if (!conf.agent) {
    throw new Error('SW_API_AGENT_USERNAME is required to auto-register players');
  }

  const probePlayerLogin = async (username) => {
    const probe = await callExternalGameApi('/web-root/restricted/player/v2/login.aspx', {
      Username: username,
      Portfolio: 'SportsBook',
      GpId: 0,
      GameId: 0,
      Device: 'd',
      Lang: conf.lang,
    });

    return {
      ok: Number(probe.data?.error?.id ?? -1) === 0 && Boolean(probe.data?.url),
      data: probe.data,
    };
  };

  const existing = String(authUser.seamless_username || '').trim();
  const seamlessUsername = existing || normalizeExternalUsername(authUser.id, authUser.username);

  // Existing linked users should not be re-registered during launch flow.
  // Re-register attempts can be forbidden by provider policy even when login is valid.
  if (existing) {
    return seamlessUsername;
  }

  if (!existing) {
    await runDbQuery(
      client,
      `UPDATE users
       SET seamless_username = $1
       WHERE id = $2`,
      [seamlessUsername, authUser.id]
    );
  }

  const register = await callExternalGameApi('/web-root/restricted/player/register-player.aspx', {
    Username: seamlessUsername,
    Agent: conf.agent,
    UserGroup: 'a',
  });

  const regErrorId = Number(register.data?.error?.id ?? -1);
  const regErrorMsg = String(register.data?.error?.msg || '');
  const canIgnore = regErrorId === 0 || /exist|duplicate|already/i.test(regErrorMsg);

  if (!canIgnore) {
    // Some upstream responses are ambiguous; probe login to confirm whether account is already usable.
    const probe = await probePlayerLogin(seamlessUsername);
    if (probe.ok) {
      return seamlessUsername;
    }

    const detail = regErrorMsg || String(register.data?.raw || '').trim() || `HTTP ${register.status}`;
    throw new Error(`Player registration failed: ${detail}`);
  }

  return seamlessUsername;
};

const isTkpayCallbackFailed = (payload) => {
  const status = getTkpayStatusText(payload);
  const code = getTkpayStatusCode(payload);
  const failedText = ['failed', 'fail', 'error', 'cancel', 'cancelled', 'rejected', 'expired'];
  const failedCode = ['400', '401', '402', '403', '404', '422', '500', 'failed', 'error'];
  return failedText.includes(status) || failedCode.includes(code);
};

const getBodyValue = (payload, ...candidates) => {
  if (!payload || typeof payload !== 'object') {
    return undefined;
  }

  const keyMap = new Map(Object.keys(payload).map((key) => [key.toLowerCase(), key]));
  for (const candidate of candidates) {
    const found = keyMap.get(String(candidate).toLowerCase());
    if (found) {
      return payload[found];
    }
  }

  return undefined;
};

const formatBalance = (value) => Number(value || 0).toFixed(5);

const seamlessResponse = (overrides = {}) => ({
  AccountName: String(overrides.AccountName || ''),
  Balance: formatBalance(overrides.Balance || 0),
  ErrorCode: String(overrides.ErrorCode ?? 0),
  ErrorMessage: String(overrides.ErrorMessage || 'No Error'),
  ...overrides,
});

const isCompanyKeyValid = (providedKey) => {
  if (seamlessCompanyKeys.length === 0) {
    return true;
  }
  return seamlessCompanyKeys.includes(String(providedKey || ''));
};

const normalizeSeamlessUsername = (value) => {
  const raw = String(value || '').trim();
  if (!raw) {
    return { raw: '', canonical: '', candidates: [] };
  }

  const candidates = [raw];
  if (raw.includes('_')) {
    const parts = raw.split('_').filter(Boolean);
    if (parts.length > 1) {
      candidates.push(parts.slice(1).join('_'));
      candidates.push(parts[parts.length - 1]);
    }
  }

  const uniqueCandidates = Array.from(new Set(candidates.map((item) => String(item).trim()).filter(Boolean)));
  return {
    raw,
    // Prefer the most specific suffix if provider sends prefixed username formats.
    canonical: uniqueCandidates[uniqueCandidates.length - 1] || raw,
    candidates: uniqueCandidates,
  };
};

const findUserBySeamlessName = async (payload) => {
  const usernameRaw = getBodyValue(payload, 'Username', 'UserName', 'AccountName', 'Member', 'PlayerName');
  const normalized = normalizeSeamlessUsername(usernameRaw);
  if (!normalized.raw) {
    return null;
  }

  const usernameCandidates = normalized.candidates.map((value) => String(value).toLowerCase());
  const result = await query(
    `SELECT id, username, balance, status
     FROM users
     WHERE LOWER(username) = ANY($1::text[])
     ORDER BY CASE WHEN LOWER(username) = $2 THEN 0 ELSE 1 END
     LIMIT 1`,
    [usernameCandidates, String(normalized.raw).toLowerCase()]
  );

  return result.rows[0] || null;
};

const findReferenceNo = (payload) => {
  const value = getBodyValue(
    payload,
    'RefNo',
    'ReferenceNo',
    'TransactionId',
    'TransactionID',
    'TransferCode',
    'OrderNo',
    'BetId',
    'WagerId',
    'RoundId'
  );
  return value ? String(value) : '';
};

const findTransferCode = (payload) => {
  const value = getBodyValue(payload, 'TransferCode', 'Transfercode', 'TransferID', 'TransferId', 'RefNo', 'ReferenceNo');
  return value ? String(value) : '';
};

const findTransactionId = (payload) => {
  const value = getBodyValue(payload, 'TransactionId', 'TransactionID', 'OrderNo', 'BetId', 'WagerId', 'RoundId');
  return value ? String(value) : '';
};

const findNumeric = (payload, ...keys) => {
  const raw = getBodyValue(payload, ...keys);
  const value = Number(raw);
  return Number.isFinite(value) ? value : 0;
};

const getScopeParts = (payload) => {
  const normalized = normalizeSeamlessUsername(getBodyValue(payload, 'Username', 'UserName', 'AccountName', 'Member', 'PlayerName'));
  return {
    // Scope seamless state by the raw account name so separate SWRUN users do not collide.
    username: String(normalized.raw || normalized.canonical || '').toLowerCase(),
    productType: String(getBodyValue(payload, 'ProductType') || ''),
    gameType: String(getBodyValue(payload, 'GameType') || ''),
    gpid: String(getBodyValue(payload, 'Gpid') || ''),
  };
};

const buildTransferKey = (payload, transferCode) => {
  const scope = getScopeParts(payload);
  return [scope.username, scope.productType, scope.gameType, scope.gpid, String(transferCode || '')].join('|');
};

const buildTxnKey = (payload, transferCode, transactionId) => {
  const scope = getScopeParts(payload);
  return [scope.username, scope.productType, scope.gameType, scope.gpid, String(transferCode || ''), String(transactionId || '')].join('|');
};

const getDuplicateDeductErrorCode = (payload, existingBet = null) => {
  const productType = Number(getBodyValue(payload, 'ProductType') || 0);
  const isRunning = existingBet ? String(existingBet.status || '') === 'running' : true;
  if ((productType === 3 || productType === 7) && isRunning) {
    return 7;
  }
  return 5003;
};

const supportsUpgradeableDuplicateDeduct = (payload) => {
  const productType = Number(getBodyValue(payload, 'ProductType') || 0);
  return productType === 3 || productType === 7;
};

const getBetByPayload = async (payload, client = null) => {
  const transferCode = findTransferCode(payload);
  const transactionId = findTransactionId(payload);

  if (transferCode) {
    const transferKey = buildTransferKey(payload, transferCode);
    const bet = await loadSeamlessBet(transferKey, client);
    if (bet) {
      return { transferCode, transactionId, transferKey, bet };
    }
  }

  if (transferCode && transactionId) {
    const txnKey = buildTxnKey(payload, transferCode, transactionId);
    const linkedTransferKey = await loadTransferKeyByTxn(txnKey, client);
    if (linkedTransferKey) {
      const bet = await loadSeamlessBet(linkedTransferKey, client);
      if (bet) {
        return { transferCode: bet.transfer_code, transactionId, transferKey: linkedTransferKey, bet };
      }
    }
  }

  return { transferCode, transactionId, transferKey: null, bet: null };
};

const createSeamlessBet = ({ user, payload, transferCode, transactionId, amount, balanceAfter }) => {
  const scope = getScopeParts(payload);
  return {
    username: user.username,
    user_id: user.id,
    scope,
    transfer_code: transferCode,
    primary_transaction_id: transactionId,
    status: 'running',
    stake_total: Number(amount || 0),
    current_stake: Number(amount || 0),
    settled_win_loss: 0,
    settled_count: 0,
    cancel_count: 0,
    rollback_count: 0,
    last_action: 'deduct',
    balance_after: Number(balanceAfter || 0),
    txs: {
      [String(transactionId)]: {
        amount: Number(amount || 0),
        status: 'running',
      },
    },
    return_stake_history: {},
  };
};

const cloneSeamlessTxs = (txs = {}) => Object.fromEntries(
  Object.entries(txs || {}).map(([id, tx]) => [String(id), tx ? { ...tx } : tx])
);

const saveSeamlessBet = async (client, transferKey, bet, payload, transferCode, transactionId) => {
  seamlessStateByTransfer.set(transferKey, bet);
  await persistSeamlessBet(client, transferKey, bet);

  hydrateTxnIndexFromBet(transferKey, bet);
  if (transferCode && transactionId) {
    const txnKey = buildTxnKey(payload, transferCode, transactionId);
    seamlessTransferByTxn.set(txnKey, transferKey);
    await persistSeamlessTxnIndex(client, txnKey, transferKey);
  }
};

const findAmount = (payload) => {
  const raw = getBodyValue(payload, 'Amount', 'Stake', 'BetAmount', 'WinLoseAmount', 'WinLoss', 'PayoutAmount', 'BonusAmount');
  const value = Number(raw || 0);
  return Number.isFinite(value) ? Math.abs(value) : 0;
};

const mapSeamlessStatus = (status) => {
  if (status === 'settled') return 'Settled';
  if (status === 'void') return 'Void';
  return 'Running';
};

const mapUserRow = (row) => ({
  id: row.id,
  username: row.username || null,
  name: row.full_name || row.username,
  email: row.email,
  phone: row.phone || '',
  country: row.country || 'Bangladesh',
  dateOfBirth: row.date_of_birth || '01/01/1990',
  balance: String(row.balance ?? '0'),
  seamlessUsername: row.seamless_username || null,
  playerAccountId: row.seamless_username || row.username || null,
  status: row.status,
  createdAt: row.created_at,
});

const signUserToken = (userId) => jwt.sign({ role: 'user', userId }, USER_JWT_SECRET, { expiresIn: '7d' });

const requireAdminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.slice(7);
  try {
    const decoded = jwt.verify(token, ADMIN_JWT_SECRET);
    req.admin = decoded;
    return next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

const requireUserAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const token = authHeader.slice(7);
    const decoded = jwt.verify(token, USER_JWT_SECRET);
    const userResult = await query(
      `SELECT id, username, full_name, email, phone, country, date_of_birth, balance, status, created_at, seamless_username
       FROM users WHERE id = $1`,
      [decoded.userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid token user' });
    }

    req.authUser = userResult.rows[0];
    return next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

const MOCK_CASINO_GAMES = [
  { title: 'Super Ace Deluxe',         provider: 'JDB',            category: 'slots', image_url: 'https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/67bb43f1-f233-4bef-96d1-481e2a377457_vertical.png@webp', game_url: '#' },
  { title: 'Aviator',                  provider: 'Spribe',         category: 'crash', image_url: 'https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/18f9b3f7-55fe-4231-9f81-250036e9e25d_vertical.png@webp', game_url: '#' },
  { title: 'Fortune Gems 3',           provider: 'JDB',            category: 'slots', image_url: 'https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/orchestra/17c8f884-c3b6-4f3d-ba7f-8e2c2fd75b84_vertical.png@webp', game_url: '#' },
  { title: 'Wild Bounty Showdown',     provider: 'PG Soft',        category: 'slots', image_url: 'https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/7ef80b5a-032e-44e1-a4e8-22f172009f06_vertical.png@webp', game_url: '#' },
  { title: 'Tower Rush',               provider: 'PG Soft',        category: 'crash', image_url: 'https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/fd80b5e4-d5dc-484b-8852-921ee24266ae_vertical.png@webp', game_url: '#' },
  { title: 'Gates of Olympus 1000',    provider: 'Pragmatic Play', category: 'slots', image_url: 'https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/bc0e8a47-49ee-4f2d-88af-a879ac7a5c67_vertical.png@webp', game_url: '#' },
  { title: 'Money Coming Expand Bets', provider: 'Orchestra',      category: 'slots', image_url: 'https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/orchestra/2650e9ee-2aa8-4adb-bdf5-0b1224b9f3af_vertical.png@webp', game_url: '#' },
  { title: 'Golden Genie',             provider: 'Orchestra',      category: 'slots', image_url: 'https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/orchestra/0a713f35-d4d4-43d6-accb-7fca63f3c05a_vertical.jpg@webp', game_url: '#' },
  { title: 'Crazy Time',               provider: 'Evolution',      category: 'live',  image_url: 'https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/26092fbd-24c8-4128-a039-029a73e37ecf_vertical.png@webp', game_url: '#' },
  { title: 'Pilot Chicken',            provider: 'PG Soft',        category: 'crash', image_url: 'https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/62d6c213-4433-4797-9bb5-18b5ae02e528_vertical.jpg@webp', game_url: '#' },
  { title: 'Treasures of Aztec',       provider: 'PG Soft',        category: 'slots', image_url: 'https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/6ee23772-9fd1-4912-975c-f9f89570f065_vertical.jpg@webp', game_url: '#' },
  { title: 'Bizarre',                  provider: 'PG Soft',        category: 'slots', image_url: 'https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/fd36d964-5c89-420a-a9eb-996d68f58b06_vertical.png@webp', game_url: '#' },
  { title: 'Blazing Crown Deluxe',     provider: 'MrSlotty',       category: 'slots', image_url: 'https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/mrslotty/64b69510-6f11-4c2c-b1c8-186d454171b3_vertical.png@webp', game_url: '#' },
  { title: 'Sun of Egypt 2',           provider: 'PG Soft',        category: 'slots', image_url: 'https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/a440a7d9-3a35-4fae-a522-075984c1bef9_vertical.png@webp', game_url: '#' },
  { title: 'Zeus',                     provider: 'Orchestra',      category: 'slots', image_url: 'https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/orchestra/04f36e36-8cac-4adb-9cc4-dac63650de5a_vertical.jpg@webp', game_url: '#' },
  { title: 'Prosperity Tiger',         provider: 'Orchestra',      category: 'slots', image_url: 'https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/orchestra/e3c76638-c8de-48a7-b5e8-245208469ca1_vertical.png@webp', game_url: '#' },
  { title: 'Golden Empire',            provider: 'Orchestra',      category: 'slots', image_url: 'https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/orchestra/c972ab3a-ee66-4384-88e0-a8bda6aa65e8_vertical.png@webp', game_url: '#' },
  { title: 'Fortune Snake',            provider: 'PG Soft',        category: 'slots', image_url: 'https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/45af0924-3f24-4a1a-b16e-1317c714e26b_vertical.jpg@webp', game_url: '#' },
  { title: 'Lucky Neko',               provider: 'PG Soft',        category: 'slots', image_url: 'https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/b08b7b0f-09da-4099-9baf-9b35b6c6453a_vertical.png@webp', game_url: '#' },
  { title: 'Triple Tigers',            provider: 'Pragmatic Play', category: 'slots', image_url: 'https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/pragmatic/586724d6-9c26-4971-8fa6-79ba8c4f3ce4_vertical.jpg@webp', game_url: '#' },
  { title: 'Persian Fortune',          provider: 'Fundist',        category: 'slots', image_url: 'https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/fundist/b855c83a-a445-427a-9f2d-1044ef9375ea_vertical.jpg@webp', game_url: '#' },
  { title: 'Book of Vikings',          provider: 'Pragmatic Play', category: 'slots', image_url: 'https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/pragmatic/4ffb3aee-7a47-4e95-a0c0-aef0a29e1e97_vertical.jpg@webp', game_url: '#' },
  { title: 'Sweet Bonanza',            provider: 'Pragmatic Play', category: 'slots', image_url: 'https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/pragmatic/sweet-bonanza_vertical.jpg@webp', game_url: '#' },
  { title: 'Dragon Hatch',             provider: 'PG Soft',        category: 'slots', image_url: 'https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/dragon-hatch_vertical.jpg@webp', game_url: '#' },
  { title: 'Mahjong Ways 2',           provider: 'PG Soft',        category: 'slots', image_url: 'https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/mahjong-ways-2_vertical.jpg@webp', game_url: '#' },
  { title: 'Caishen Wins',             provider: 'PG Soft',        category: 'slots', image_url: 'https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/v/caishen-wins_vertical.jpg@webp', game_url: '#' },
  { title: 'Buffalo King Megaways',    provider: 'Pragmatic Play', category: 'slots', image_url: 'https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/pragmatic/buffalo-king-megaways_vertical.jpg@webp', game_url: '#' },
  { title: 'Starlight Princess',       provider: 'Pragmatic Play', category: 'slots', image_url: 'https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/pragmatic/starlight-princess_vertical.jpg@webp', game_url: '#' },
  { title: 'Wolf Gold',                provider: 'Pragmatic Play', category: 'slots', image_url: 'https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/pragmatic/wolf-gold_vertical.jpg@webp', game_url: '#' },
  { title: 'Big Bass Bonanza',         provider: 'Pragmatic Play', category: 'slots', image_url: 'https://1win.com/resources/v1/optimizeimages/unsafe/casino_game_card_x1/plain/https://v1.bundlecdn.com/casino-images/pragmatic/big-bass-bonanza_vertical.jpg@webp', game_url: '#' },
];

const BKASH_LOGO_URL = 'https://files.v1.distcdn.net/v1/objects/513306c6-1563-46db-aab5-5e4e5bb4563a';
const NAGAD_LOGO_URL = 'https://files.v1.distcdn.net/v1/objects/6ebd6ca3-2592-405a-8f89-198bb44ea372';

const runCasinoSeed = async () => {
  for (let i = 0; i < MOCK_CASINO_GAMES.length; i++) {
    const g = MOCK_CASINO_GAMES[i];
    await query(
      `INSERT INTO casino_games (title, provider, category, image_url, game_url, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [g.title, g.provider, g.category, g.image_url, g.game_url, i]
    );
  }
};

const initializeAdminSchema = async () => {
  await query(`
    CREATE TABLE IF NOT EXISTS site_settings (
      key VARCHAR(120) PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS game_providers (
      id SERIAL PRIMARY KEY,
      external_provider_id INTEGER,
      name VARCHAR(120) UNIQUE NOT NULL,
      api_endpoint TEXT NOT NULL,
      api_key TEXT,
      supported_sections VARCHAR(255) DEFAULT 'casino',
      status VARCHAR(20) DEFAULT 'active',
      last_sync_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS payment_methods (
      id SERIAL PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      code VARCHAR(80) UNIQUE NOT NULL,
      method_type VARCHAR(20) DEFAULT 'both',
      provider VARCHAR(120),
      image_url TEXT,
      account_number VARCHAR(64),
      status VARCHAR(20) DEFAULT 'active',
      min_amount DECIMAL(12,2) DEFAULT 0,
      max_amount DECIMAL(12,2) DEFAULT 999999,
      fee_percent DECIMAL(6,2) DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS content_sections (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(120) UNIQUE NOT NULL,
      title VARCHAR(180) NOT NULL,
      section_type VARCHAR(40) DEFAULT 'home',
      is_active BOOLEAN DEFAULT true,
      sort_order INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS content_items (
      id SERIAL PRIMARY KEY,
      section_id INTEGER NOT NULL REFERENCES content_sections(id) ON DELETE CASCADE,
      title VARCHAR(180) NOT NULL,
      subtitle VARCHAR(300),
      image_url TEXT,
      target_url TEXT,
      payload JSONB DEFAULT '{}'::jsonb,
      is_active BOOLEAN DEFAULT true,
      sort_order INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS seo_pages (
      id SERIAL PRIMARY KEY,
      path VARCHAR(220) UNIQUE NOT NULL,
      title VARCHAR(220) NOT NULL,
      description TEXT,
      keywords TEXT,
      og_image TEXT,
      no_index BOOLEAN DEFAULT false,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await query(`ALTER TABLE transactions ADD COLUMN IF NOT EXISTS payment_method VARCHAR(80)`);
  await query(`ALTER TABLE transactions ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb`);
  await query(`ALTER TABLE bets ADD COLUMN IF NOT EXISTS game_name VARCHAR(120)`);
  await query(`ALTER TABLE bets ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb`);
  await query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS phone VARCHAR(30)`);
  await query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS full_name VARCHAR(120)`);
  await query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS country VARCHAR(80) DEFAULT 'Bangladesh'`);
  await query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS date_of_birth VARCHAR(20)`);
  await query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMP`);
  await query(`CREATE UNIQUE INDEX IF NOT EXISTS idx_users_phone_unique ON users(phone) WHERE phone IS NOT NULL`);
  await query(`ALTER TABLE payment_methods ADD COLUMN IF NOT EXISTS image_url TEXT`);
  await query(`ALTER TABLE payment_methods ADD COLUMN IF NOT EXISTS account_number VARCHAR(64)`);
  await query(SEAMLESS_BETS_TABLE_SQL);
  await query(SEAMLESS_TXN_INDEX_TABLE_SQL);

  await query(`
    CREATE TABLE IF NOT EXISTS user_profile_changes (
      id BIGSERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      field_name VARCHAR(80) NOT NULL,
      old_value TEXT,
      new_value TEXT,
      changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      metadata JSONB DEFAULT '{}'::jsonb
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_user_profile_changes_user_time ON user_profile_changes(user_id, changed_at DESC)`);

  await query(`
    CREATE TABLE IF NOT EXISTS user_login_attempts (
      id BIGSERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
      login_field VARCHAR(10) NOT NULL,
      login_value TEXT,
      success BOOLEAN NOT NULL,
      failure_reason TEXT,
      ip_address VARCHAR(64),
      user_agent TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_user_login_attempts_user_time ON user_login_attempts(user_id, created_at DESC)`);

  await query(`
    CREATE TABLE IF NOT EXISTS casino_games (
      id SERIAL PRIMARY KEY,
      gp_id INTEGER,
      upstream_game_id INTEGER,
      title VARCHAR(200) NOT NULL,
      provider VARCHAR(100) DEFAULT 'Unknown',
      category VARCHAR(80) DEFAULT 'slots',
      image_url TEXT NOT NULL,
      game_url TEXT DEFAULT '#',
      is_active BOOLEAN DEFAULT true,
      sort_order INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS seamless_username VARCHAR(40)`);
  await query(`ALTER TABLE game_providers ADD COLUMN IF NOT EXISTS external_provider_id INTEGER`);
  await query(`ALTER TABLE casino_games ADD COLUMN IF NOT EXISTS gp_id INTEGER`);
  await query(`ALTER TABLE casino_games ADD COLUMN IF NOT EXISTS upstream_game_id INTEGER`);
  await query(`CREATE UNIQUE INDEX IF NOT EXISTS idx_game_providers_external_id ON game_providers(external_provider_id) WHERE external_provider_id IS NOT NULL`);
  await query(`CREATE UNIQUE INDEX IF NOT EXISTS idx_casino_games_external_key ON casino_games(gp_id, upstream_game_id) WHERE gp_id IS NOT NULL AND upstream_game_id IS NOT NULL`);
  await query(`CREATE UNIQUE INDEX IF NOT EXISTS idx_casino_games_external_key_full ON casino_games(gp_id, upstream_game_id)`);

  const gameCount = await query('SELECT COUNT(*)::int AS c FROM casino_games');
  if (Number(gameCount.rows[0]?.c) === 0) {
    await runCasinoSeed();
  }

  const autoSyncEnabled = String(process.env.SW_AUTO_SYNC_ON_BOOT || 'true').toLowerCase() !== 'false';
  if (autoSyncEnabled) {
    const syncStats = await query(
      `SELECT
         COUNT(*)::int AS total_count,
         COUNT(*) FILTER (WHERE gp_id IS NOT NULL AND upstream_game_id IS NOT NULL)::int AS live_count
       FROM casino_games`
    );

    const totalCount = Number(syncStats.rows[0]?.total_count || 0);
    const liveCount = Number(syncStats.rows[0]?.live_count || 0);
    const likelyLegacyDataset = totalCount > 0 && liveCount < Math.min(totalCount, 100);

    if (likelyLegacyDataset) {
      syncLiveCasinoGames({ removeLegacyRows: true })
        .then((syncResult) => {
          console.log(
            `[casino-sync] Auto sync completed on boot: source=${syncResult.sourceCount}, upserted=${syncResult.upserted}, active=${syncResult.activeCount}`
          );
        })
        .catch((syncError) => {
          console.error(`[casino-sync] Auto sync failed on boot: ${syncError.message}`);
        });
    }
  }

  const paymentCount = await query('SELECT COUNT(*)::int AS c FROM payment_methods');
  if (Number(paymentCount.rows[0]?.c) === 0) {
    await query(
      `INSERT INTO payment_methods (name, code, method_type, provider, image_url, status, min_amount, max_amount, fee_percent)
       VALUES
         ('BKash', 'bkash', 'both', 'TKPAY', $1, 'active', 100, 50000, 0),
         ('Nagad', 'nagad', 'both', 'TKPAY', $2, 'active', 100, 50000, 0)`
      ,
      [BKASH_LOGO_URL, NAGAD_LOGO_URL]
    );
  }

  // Keep legacy databases in sync with the current gateway rollout.
  await query(
    `INSERT INTO payment_methods (name, code, method_type, provider, image_url, status, min_amount, max_amount, fee_percent)
     VALUES
       ('BKash', 'bkash', 'both', 'TKPAY', $1, 'active', 100, 50000, 0),
       ('Nagad', 'nagad', 'both', 'TKPAY', $2, 'active', 100, 50000, 0)
     ON CONFLICT (code)
     DO UPDATE SET
       name = EXCLUDED.name,
       method_type = EXCLUDED.method_type,
       provider = EXCLUDED.provider,
       image_url = COALESCE(payment_methods.image_url, EXCLUDED.image_url),
       status = 'active',
       min_amount = 100,
       max_amount = 50000,
       fee_percent = 0,
       updated_at = CURRENT_TIMESTAMP`,
    [BKASH_LOGO_URL, NAGAD_LOGO_URL]
  );

  await query(
    `UPDATE payment_methods
     SET status = 'inactive', updated_at = CURRENT_TIMESTAMP
     WHERE code = 'upay'`
  );
};

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

app.post('/api/payments/tkpay/callback/collection', async (req, res) => {
  if (!isTkpayIpAllowed(req)) {
    return res.status(403).json({ ok: false, error: 'IP not allowed' });
  }

  const referenceId = findTkpayReference(req.body || {});
  if (!referenceId) {
    return res.status(400).json({ ok: false, error: 'Missing reference id in callback payload' });
  }

  let client;
  try {
    client = await getClient();
    await client.query('BEGIN');

    const txResult = await client.query(
      `SELECT id, user_id, amount, status, type
       FROM transactions
       WHERE reference_id = $1
       ORDER BY id DESC
       LIMIT 1
       FOR UPDATE`,
      [referenceId]
    );

    if (!txResult.rows.length) {
      await client.query('ROLLBACK');
      return res.status(404).json({ ok: false, error: 'Transaction not found' });
    }

    const tx = txResult.rows[0];
    if (tx.type !== 'deposit') {
      await client.query('ROLLBACK');
      return res.status(400).json({ ok: false, error: 'Callback reference is not a deposit transaction' });
    }

    const callbackMetadata = JSON.stringify({
      tkpay_callback_type: 'collection',
      payload: req.body || {},
      callback_ip: getRequestIp(req),
      received_at: new Date().toISOString(),
    });

    if (isTkpayCallbackSuccess(req.body || {})) {
      if (tx.status !== 'completed') {
        await client.query(
          `UPDATE transactions
           SET status = 'completed',
               metadata = COALESCE(metadata, '{}'::jsonb) || $1::jsonb
           WHERE id = $2`,
          [callbackMetadata, tx.id]
        );

        await client.query(
          `UPDATE users
           SET balance = balance + $1,
               updated_at = CURRENT_TIMESTAMP
           WHERE id = $2`,
          [tx.amount, tx.user_id]
        );
      }

      await client.query('COMMIT');
      return res.json({ ok: true, status: tx.status === 'completed' ? 'already_completed' : 'completed' });
    }

    if (isTkpayCallbackFailed(req.body || {})) {
      if (tx.status === 'pending') {
        await client.query(
          `UPDATE transactions
           SET status = 'cancelled',
               metadata = COALESCE(metadata, '{}'::jsonb) || $1::jsonb
           WHERE id = $2`,
          [callbackMetadata, tx.id]
        );
      }
      await client.query('COMMIT');
      return res.json({ ok: true, status: tx.status === 'pending' ? 'cancelled' : tx.status });
    }

    await client.query(
      `UPDATE transactions
       SET metadata = COALESCE(metadata, '{}'::jsonb) || $1::jsonb
       WHERE id = $2`,
      [callbackMetadata, tx.id]
    );

    await client.query('COMMIT');
    return res.json({ ok: true, status: 'received' });
  } catch (error) {
    await client.query('ROLLBACK');
    return res.status(500).json({ ok: false, error: error.message });
  } finally {
    client.release();
  }
});

app.post('/api/payments/tkpay/callback/payout', async (req, res) => {
  if (!isTkpayIpAllowed(req)) {
    return res.status(403).json({ ok: false, error: 'IP not allowed' });
  }

  const referenceId = findTkpayReference(req.body || {});
  if (!referenceId) {
    return res.status(400).json({ ok: false, error: 'Missing reference id in callback payload' });
  }

  const client = await getClient();
  try {
    await client.query('BEGIN');

    const txResult = await client.query(
      `SELECT id, user_id, amount, status, type
       FROM transactions
       WHERE reference_id = $1
       ORDER BY id DESC
       LIMIT 1
       FOR UPDATE`,
      [referenceId]
    );

    if (!txResult.rows.length) {
      await client.query('ROLLBACK');
      return res.status(404).json({ ok: false, error: 'Transaction not found' });
    }

    const tx = txResult.rows[0];
    if (tx.type !== 'withdrawal') {
      await client.query('ROLLBACK');
      return res.status(400).json({ ok: false, error: 'Callback reference is not a withdrawal transaction' });
    }

    const callbackMetadata = JSON.stringify({
      tkpay_callback_type: 'payout',
      payload: req.body || {},
      callback_ip: getRequestIp(req),
      received_at: new Date().toISOString(),
    });

    if (isTkpayCallbackSuccess(req.body || {})) {
      if (tx.status === 'pending') {
        await client.query(
          `UPDATE transactions
           SET status = 'completed',
               metadata = COALESCE(metadata, '{}'::jsonb) || $1::jsonb
           WHERE id = $2`,
          [callbackMetadata, tx.id]
        );

        await client.query(
          `UPDATE users
           SET balance = balance - $1,
               updated_at = CURRENT_TIMESTAMP
           WHERE id = $2`,
          [tx.amount, tx.user_id]
        );
      }

      await client.query('COMMIT');
      return res.json({ ok: true, status: tx.status === 'pending' ? 'completed' : tx.status });
    }

    if (isTkpayCallbackFailed(req.body || {})) {
      if (tx.status === 'pending') {
        await client.query(
          `UPDATE transactions
           SET status = 'cancelled',
               metadata = COALESCE(metadata, '{}'::jsonb) || $1::jsonb
           WHERE id = $2`,
          [callbackMetadata, tx.id]
        );
      }

      await client.query('COMMIT');
      return res.json({ ok: true, status: tx.status === 'pending' ? 'cancelled' : tx.status });
    }

    await client.query(
      `UPDATE transactions
       SET metadata = COALESCE(metadata, '{}'::jsonb) || $1::jsonb
       WHERE id = $2`,
      [callbackMetadata, tx.id]
    );

    await client.query('COMMIT');
    return res.json({ ok: true, status: 'received' });
  } catch (error) {
    await client.query('ROLLBACK');
    return res.status(500).json({ ok: false, error: error.message });
  } finally {
    client.release();
  }
});

app.get('/api/payments/tkpay/status', (req, res) => {
  const merchantId = String(process.env.TKPAY_MERCHANT_ID || '').trim();
  const merchantKey = String(process.env.TKPAY_MERCHANT_KEY || '').trim();
  const apiBaseUrl = String(process.env.TKPAY_API_BASE_URL || '').trim();

  return res.json({
    ok: true,
    gateway: 'TKPAY',
    configured: Boolean(merchantId && merchantKey && apiBaseUrl),
    merchantIdPresent: Boolean(merchantId),
    merchantId,
    merchantKeyPresent: Boolean(merchantKey),
    apiBaseUrl,
    callbackIpWhitelistCount: tkpayCallbackWhitelist.length,
    callbackIpWhitelist: tkpayCallbackWhitelist,
    endpoints: {
      collection: '/api/payments/tkpay/callback/collection',
      payout: '/api/payments/tkpay/callback/payout',
    },
  });
});

app.post('/api/payments/tkpay/balance', requireAdminAuth, async (req, res) => {
  try {
    const conf = tkpayConfig();
    if (!conf.ok) {
      return res.status(400).json({ ok: false, error: 'TKPAY env is incomplete' });
    }

    const currencyId = Number(req.body?.currencyId || conf.currencyId || 11);
    const result = await callTkpayApi('/api/shopGetBalance', {
      CurrencyId: Number.isFinite(currencyId) ? currencyId : 11,
      ShopUserLongId: conf.merchantId,
    });

    return res.status(result.ok ? 200 : 502).json({
      ok: result.ok,
      httpStatus: result.status,
      request: {
        CurrencyId: currencyId,
        ShopUserLongId: conf.merchantId,
      },
      response: result.data,
    });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
});

app.post('/api/payments/tkpay/deposits/:id/create-order', requireAdminAuth, async (req, res) => {
  const txId = Number(req.params.id);
  if (!txId) {
    return res.status(400).json({ ok: false, error: 'Invalid transaction id' });
  }

  try {
    const conf = tkpayConfig();
    if (!conf.ok) {
      return res.status(400).json({ ok: false, error: 'TKPAY env is incomplete' });
    }

    const txResult = await query(
      `SELECT t.id, t.user_id, t.amount, t.status, t.type, t.reference_id, t.payment_method, u.full_name, u.username
       FROM transactions t
       JOIN users u ON u.id = t.user_id
       WHERE t.id = $1
       LIMIT 1`,
      [txId]
    );
    if (!txResult.rows.length) {
      return res.status(404).json({ ok: false, error: 'Transaction not found' });
    }

    const tx = txResult.rows[0];
    if (tx.type !== 'deposit') {
      return res.status(400).json({ ok: false, error: 'Transaction must be deposit' });
    }

    const methodCode = String(tx.payment_method || '').toLowerCase();
    const paymentChannelId = conf.channels[methodCode];
    if (!paymentChannelId) {
      return res.status(400).json({ ok: false, error: `Unsupported TKPAY channel for method ${methodCode || 'unknown'}` });
    }

    const shopOrderId = String(tx.reference_id || `DEP-${tx.id}`);
    const payload = compactTkpayPayload({
      Amount: Number(tx.amount),
      CurrencyId: conf.currencyId,
      IsTest: Boolean(req.body?.isTest ?? false),
      PayerKey: String(tx.user_id),
      PayerName: String(tx.full_name || tx.username || `user-${tx.user_id}`),
      PaymentChannelId: paymentChannelId,
      ShopInformUrl: conf.collectionCallback,
      ShopOrderId: shopOrderId,
      ShopReturnUrl: req.body?.shopReturnUrl ? String(req.body.shopReturnUrl) : conf.returnUrl,
      ShopRemark: req.body?.shopRemark ? String(req.body.shopRemark) : undefined,
      ShopUserLongId: conf.merchantId,
    });

    const result = await callTkpayApi('/api/createOrder', payload);
    const metadata = {
      tkpay_create_order: {
        at: new Date().toISOString(),
        is_test: payload.IsTest,
        request: {
          ...payload,
          EncryptValue: undefined,
        },
        http_status: result.status,
        response: result.data,
      },
    };

    await query(
      `UPDATE transactions
       SET metadata = COALESCE(metadata, '{}'::jsonb) || $1::jsonb,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $2`,
      [JSON.stringify(metadata), tx.id]
    );

    return res.status(result.ok ? 200 : 502).json({
      ok: result.ok,
      httpStatus: result.status,
      transactionId: tx.id,
      referenceId: shopOrderId,
      response: result.data,
    });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
});

app.post('/api/payments/tkpay/withdrawals/:id/create-order', requireAdminAuth, async (req, res) => {
  const txId = Number(req.params.id);
  if (!txId) {
    return res.status(400).json({ ok: false, error: 'Invalid transaction id' });
  }

  try {
    const conf = tkpayConfig();
    if (!conf.ok) {
      return res.status(400).json({ ok: false, error: 'TKPAY env is incomplete' });
    }

    const txResult = await query(
      `SELECT t.id, t.user_id, t.amount, t.status, t.type, t.reference_id, t.payment_method, t.metadata, u.full_name, u.username
       FROM transactions t
       JOIN users u ON u.id = t.user_id
       WHERE t.id = $1
       LIMIT 1`,
      [txId]
    );
    if (!txResult.rows.length) {
      return res.status(404).json({ ok: false, error: 'Transaction not found' });
    }

    const tx = txResult.rows[0];
    if (tx.type !== 'withdrawal') {
      return res.status(400).json({ ok: false, error: 'Transaction must be withdrawal' });
    }

    const methodCode = String(tx.payment_method || '').toLowerCase();
    const paymentChannelId = conf.channels[methodCode];
    if (!paymentChannelId) {
      return res.status(400).json({ ok: false, error: `Unsupported TKPAY channel for method ${methodCode || 'unknown'}` });
    }

    const accountNumber = String(tx.metadata?.account_number || req.body?.payeeAccountNumber || '').trim();
    if (!accountNumber) {
      return res.status(400).json({ ok: false, error: 'Missing payee account number (withdrawal metadata.account_number)' });
    }

    const shopOrderId = String(tx.reference_id || `WDR-${tx.id}`);
    const payload = compactTkpayPayload({
      Amount: Number(tx.amount),
      CurrencyId: conf.currencyId,
      IsTest: Boolean(req.body?.isTest ?? false),
      PayeeAccountName: String(req.body?.payeeAccountName || tx.full_name || tx.username || `user-${tx.user_id}`),
      PayeeAccountNumber: accountNumber,
      PayeePhoneNumber: req.body?.payeePhoneNumber ? String(req.body.payeePhoneNumber) : undefined,
      PaymentChannelId: paymentChannelId,
      ShopInformUrl: conf.payoutCallback,
      ShopOrderId: shopOrderId,
      ShopRemark: req.body?.shopRemark ? String(req.body.shopRemark) : undefined,
      ShopUserLongId: conf.merchantId,
    });

    const result = await callTkpayApi('/api/createPaymentOrder', payload);
    const metadata = {
      tkpay_create_payout: {
        at: new Date().toISOString(),
        is_test: payload.IsTest,
        request: {
          ...payload,
          EncryptValue: undefined,
        },
        http_status: result.status,
        response: result.data,
      },
    };

    await query(
      `UPDATE transactions
       SET metadata = COALESCE(metadata, '{}'::jsonb) || $1::jsonb,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $2`,
      [JSON.stringify(metadata), tx.id]
    );

    return res.status(result.ok ? 200 : 502).json({
      ok: result.ok,
      httpStatus: result.status,
      transactionId: tx.id,
      referenceId: shopOrderId,
      response: result.data,
    });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
});

// ── Public casino games ───────────────────────────────────────────────────────
app.get('/api/casino-games', async (req, res) => {
  try {
    const result = await query(
      `SELECT * FROM casino_games WHERE is_active = true ORDER BY sort_order ASC, id ASC`
    );
    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/casino/launch/:id', requireUserAuth, async (req, res) => {
  try {
    const gameId = Number(req.params.id);
    if (!Number.isFinite(gameId) || gameId <= 0) {
      return res.status(400).json({ error: 'Invalid game id' });
    }

    const conf = externalGameApiConfig();
    if (!conf.ok) {
      return res.status(500).json({ error: 'Production game API is not configured' });
    }

    const gameResult = await query(
      `SELECT id, title, provider, gp_id, upstream_game_id
       FROM casino_games
       WHERE id = $1 AND is_active = true`,
      [gameId]
    );

    if (gameResult.rows.length === 0) {
      return res.status(404).json({ error: 'Game not found' });
    }

    const game = gameResult.rows[0];
    const seamlessUsername = await ensureExternalPlayer(req.authUser);
    const userAgent = String(req.headers['user-agent'] || '').toLowerCase();
    const device = /mobile|android|iphone|ipad/i.test(userAgent) ? 'm' : 'd';
    const gpId = Number(game.gp_id);
    const upstreamGameId = Number(game.upstream_game_id);

    const launchAttempts = [];

    const directGamesLaunch = await callExternalGameApi('/web-root/restricted/player/v2/login.aspx', {
      Username: seamlessUsername,
      Portfolio: 'Games',
      GpId: 0,
      GameId: Number.isFinite(upstreamGameId) ? upstreamGameId : 0,
      Device: device,
      Lang: conf.lang,
    });
    launchAttempts.push({
      mode: 'Games',
      payload: {
        Portfolio: 'Games',
        GpId: 0,
        GameId: Number.isFinite(upstreamGameId) ? upstreamGameId : 0,
      },
      error: directGamesLaunch.data?.error,
      hasUrl: Boolean(directGamesLaunch.data?.url),
    });

    const directGamesErrorId = Number(directGamesLaunch.data?.error?.id ?? -1);
    if (directGamesErrorId === 0 && directGamesLaunch.data?.url) {
      const rawUrl = String(directGamesLaunch.data.url);
      const launchUrl = rawUrl.startsWith('//') ? `https:${rawUrl}` : rawUrl;
      return res.json({
        ok: true,
        game: { id: game.id, title: game.title, provider: game.provider },
        url: launchUrl,
      });
    }

    const seamlessLaunch = await callExternalGameApi('/web-root/restricted/player/v2/login.aspx', {
      Username: seamlessUsername,
      Portfolio: 'SeamlessGame',
      GpId: Number.isFinite(gpId) ? gpId : 10000,
      GameId: Number.isFinite(upstreamGameId) ? upstreamGameId : 1,
      Device: device,
      Lang: conf.lang,
    });
    launchAttempts.push({
      mode: 'SeamlessGame',
      payload: {
        Portfolio: 'SeamlessGame',
        GpId: Number.isFinite(gpId) ? gpId : 10000,
        GameId: Number.isFinite(upstreamGameId) ? upstreamGameId : 1,
      },
      error: seamlessLaunch.data?.error,
      hasUrl: Boolean(seamlessLaunch.data?.url),
    });

    const seamlessErrorId = Number(seamlessLaunch.data?.error?.id ?? -1);
    if (seamlessErrorId === 0 && seamlessLaunch.data?.url) {
      const rawUrl = String(seamlessLaunch.data.url);
      const launchUrl = rawUrl.startsWith('//') ? `https:${rawUrl}` : rawUrl;
      return res.json({
        ok: true,
        game: { id: game.id, title: game.title, provider: game.provider },
        url: launchUrl,
      });
    }

    return res.status(502).json({
      error: 'Unable to open selected game in current provider configuration',
      details: {
        directGames: directGamesLaunch.data?.error || null,
        seamlessGame: seamlessLaunch.data?.error || null,
      },
      attempts: launchAttempts,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Unable to launch game' });
  }
});

const getSportsLaunchContext = (req) => {
  const requestedPortfolio = String(req.body?.portfolio || '').trim();
  const allowedPortfolios = new Set(['SportsBook', '568WinSportsbook']);
  const primary = allowedPortfolios.has(requestedPortfolio) ? requestedPortfolio : 'SportsBook';
  const portfolios = Array.from(new Set([primary, 'SportsBook', '568WinSportsbook']));
  const userAgent = String(req.headers['user-agent'] || '').toLowerCase();
  const device = /mobile|android|iphone|ipad/i.test(userAgent) ? 'm' : 'd';
  return { portfolio: primary, portfolios, device };
};

const launchSportsbookForUsername = async ({ username, portfolios, device, lang }) => {
  const attempts = [];
  for (const portfolio of portfolios) {
    const launch = await callExternalGameApi('/web-root/restricted/player/v2/login.aspx', {
      Username: username,
      Portfolio: portfolio,
      GpId: 0,
      GameId: 0,
      Device: device,
      Lang: lang,
    });

    const launchErrorId = Number(launch.data?.error?.id ?? -1);
    attempts.push({
      portfolio,
      error: launch.data?.error || null,
      hasUrl: Boolean(launch.data?.url),
    });

    if (launchErrorId === 0 && launch.data?.url) {
      const rawUrl = String(launch.data.url);
      const url = rawUrl.startsWith('//') ? `https:${rawUrl}` : rawUrl;
      return { ok: true, url, portfolio, attempts };
    }
  }

  const firstError = attempts.find((a) => a.error && String(a.error.msg || '').trim())?.error;
  return {
    ok: false,
    error: String(firstError?.msg || 'Unable to open sportsbook'),
    details: {
      error: firstError || null,
      attempts,
    },
  };
};

app.post('/api/auth/sports/launch', requireUserAuth, async (req, res) => {
  try {
    const conf = externalGameApiConfig();
    if (!conf.ok) {
      return res.status(500).json({ error: 'Production game API is not configured' });
    }

    const { portfolio, portfolios, device } = getSportsLaunchContext(req);
    const seamlessUsername = await ensureExternalPlayer(req.authUser);
    const result = await launchSportsbookForUsername({
      username: seamlessUsername,
      portfolios,
      device,
      lang: conf.lang,
    });

    if (!result.ok) {
      return res.status(502).json({ error: result.error, details: result.details });
    }

    return res.json({
      ok: true,
      portfolio,
      url: result.url,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Unable to launch sportsbook' });
  }
});

app.post('/api/sports/launch', async (req, res) => {
  try {
    const conf = externalGameApiConfig();
    if (!conf.ok) {
      return res.status(500).json({ error: 'Production game API is not configured' });
    }
    if (!conf.agent) {
      return res.status(500).json({ error: 'SW_API_AGENT_USERNAME is required for guest sports launch' });
    }

    const { portfolio, portfolios, device } = getSportsLaunchContext(req);
    const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '0').split(',')[0].trim();
    const ua = String(req.headers['user-agent'] || 'ua');
    const dayKey = new Date().toISOString().slice(0, 10);
    const source = `${ip}|${ua}|${dayKey}`;
    let checksum = 0;
    for (let i = 0; i < source.length; i++) {
      checksum = ((checksum << 5) - checksum + source.charCodeAt(i)) | 0;
    }
    const guestUsername = `gpz_guest_${Math.abs(checksum)}`.slice(0, 40);

    const register = await callExternalGameApi('/web-root/restricted/player/register-player.aspx', {
      Username: guestUsername,
      Agent: conf.agent,
      UserGroup: 'a',
    });

    const regErrorId = Number(register.data?.error?.id ?? -1);
    const regErrorMsg = String(register.data?.error?.msg || '');
    const canIgnore = regErrorId === 0 || /exist|duplicate|already/i.test(regErrorMsg);
    if (!canIgnore) {
      return res.status(502).json({ error: `Guest registration failed: ${regErrorMsg || 'unknown error'}` });
    }

    const result = await launchSportsbookForUsername({
      username: guestUsername,
      portfolios,
      device,
      lang: conf.lang,
    });

    if (!result.ok) {
      return res.status(502).json({ error: result.error, details: result.details });
    }

    return res.json({
      ok: true,
      guest: true,
      portfolio,
      url: result.url,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Unable to launch sportsbook' });
  }
});

// ── Admin casino-games CRUD ───────────────────────────────────────────────────
app.get('/api/admin/casino-games', requireAdminAuth, async (req, res) => {
  try {
    const result = await query(`SELECT * FROM casino_games ORDER BY sort_order ASC, id ASC`);
    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/casino-games/seed', requireAdminAuth, async (req, res) => {
  try {
    await query('TRUNCATE casino_games RESTART IDENTITY');
    await runCasinoSeed();
    const count = await query('SELECT COUNT(*)::int AS c FROM casino_games');
    return res.json({ ok: true, count: count.rows[0]?.c });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/casino-games/sync-live', requireAdminAuth, async (req, res) => {
  try {
    const result = await syncLiveCasinoGames({ removeLegacyRows: true });
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/casino-games', requireAdminAuth, async (req, res) => {
  const { title, provider = 'Unknown', category = 'slots', image_url, game_url = '#', sort_order = 0, is_active = true } = req.body || {};
  if (!title || !image_url) return res.status(400).json({ error: 'title and image_url are required' });
  try {
    const result = await query(
      `INSERT INTO casino_games (title, provider, category, image_url, game_url, sort_order, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [title, provider, category, image_url, game_url, sort_order, is_active]
    );
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.patch('/api/admin/casino-games/:id', requireAdminAuth, async (req, res) => {
  const { title, provider, category, image_url, game_url, sort_order, is_active } = req.body || {};
  const fields = [];
  const values = [];
  let idx = 1;
  if (title      !== undefined) { fields.push(`title=$${idx++}`);      values.push(title); }
  if (provider   !== undefined) { fields.push(`provider=$${idx++}`);   values.push(provider); }
  if (category   !== undefined) { fields.push(`category=$${idx++}`);   values.push(category); }
  if (image_url  !== undefined) { fields.push(`image_url=$${idx++}`);  values.push(image_url); }
  if (game_url   !== undefined) { fields.push(`game_url=$${idx++}`);   values.push(game_url); }
  if (sort_order !== undefined) { fields.push(`sort_order=$${idx++}`); values.push(sort_order); }
  if (is_active  !== undefined) { fields.push(`is_active=$${idx++}`);  values.push(is_active); }
  if (!fields.length) return res.status(400).json({ error: 'No fields to update' });
  fields.push(`updated_at=CURRENT_TIMESTAMP`);
  values.push(req.params.id);
  try {
    const result = await query(
      `UPDATE casino_games SET ${fields.join(', ')} WHERE id=$${idx} RETURNING *`,
      values
    );
    if (!result.rows.length) return res.status(404).json({ error: 'Game not found' });
    return res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.delete('/api/admin/casino-games/:id', requireAdminAuth, async (req, res) => {
  try {
    const result = await query(`DELETE FROM casino_games WHERE id=$1 RETURNING id`, [req.params.id]);
    if (!result.rows.length) return res.status(404).json({ error: 'Game not found' });
    return res.json({ ok: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get('/api/payment-methods', async (req, res) => {
  const requestedType = String(req.query.type || 'deposit').toLowerCase();
  const methodType = requestedType === 'withdrawal' ? 'withdrawal' : 'deposit';

  try {
    const result = await query(
      `SELECT id, name, code, method_type, provider, image_url, account_number, min_amount, max_amount, fee_percent
       FROM payment_methods
       WHERE status = 'active'
         AND (method_type = 'both' OR method_type = $1)
       ORDER BY id ASC`,
      [methodType]
    );
    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/register', async (req, res) => {
  const { email, phone, password } = req.body || {};
  const normalizedEmail = normalizeEmail(email);
  const normalizedPhone = normalizePhone(phone);

  if (!normalizedEmail || !normalizedPhone || !password) {
    return res.status(400).json({ error: 'Email, phone and password are required' });
  }

  if (String(password).length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' });
  }

  let client;
  try {
    client = await getClient();
    await client.query('BEGIN');

    const duplicate = await client.query(
      `SELECT id FROM users WHERE LOWER(email) = $1 OR phone = $2`,
      [normalizedEmail, normalizedPhone]
    );
    if (duplicate.rows.length > 0) {
      await client.query('ROLLBACK');
      return res.status(409).json({ error: 'Email or phone already registered' });
    }

    const passwordHash = await bcrypt.hash(String(password), 10);
    const usernameBase = normalizedEmail.split('@')[0].replace(/[^a-z0-9_]/gi, '').toLowerCase() || 'player';
    const username = `${usernameBase}_${Date.now().toString().slice(-6)}`;

    const inserted = await client.query(
      `INSERT INTO users (username, full_name, email, phone, country, date_of_birth, password_hash, balance, status)
       VALUES ($1, $2, $3, $4, 'Bangladesh', '01/01/1990', $5, 0, 'active')
       RETURNING id, username, full_name, email, phone, country, date_of_birth, balance, status, created_at, seamless_username`,
      [username, username.toUpperCase(), normalizedEmail, normalizedPhone, passwordHash]
    );

    const row = inserted.rows[0];
    let playerSync = { ok: true };
    try {
      // Try to create provider/backoffice player at signup time.
      const seamlessUsername = await ensureExternalPlayer(row, client);
      row.seamless_username = seamlessUsername;
    } catch (playerError) {
      const message = String(playerError?.message || 'Player registration failed');
      if (/HTTP\s*403/i.test(message)) {
        // Keep signup available when provider temporarily denies registration.
        playerSync = {
          ok: false,
          pending: true,
          reason: 'provider_forbidden',
          message,
        };
      } else {
        throw playerError;
      }
    }

    await client.query('COMMIT');

    const token = signUserToken(row.id);
    return res.status(201).json({
      ok: true,
      message: playerSync.ok ? 'Registration successful' : 'Registration successful, player sync pending',
      token,
      user: mapUserRow(row),
      playerSync,
    });
  } catch (error) {
    if (client) {
      try {
        await client.query('ROLLBACK');
      } catch (rollbackError) {
        console.error('Register rollback failed:', rollbackError.message);
      }
    }
    return res.status(500).json({ error: error.message || 'Registration failed' });
  } finally {
    if (client) {
      client.release();
    }
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, phone, password } = req.body || {};
  const normalizedEmail = normalizeEmail(email);
  const normalizedPhone = normalizePhone(phone);

  if ((!normalizedEmail && !normalizedPhone) || !password) {
    return res.status(400).json({ error: 'Email or phone and password are required' });
  }

  try {
    const loginField = normalizedEmail ? 'email' : 'phone';
    const loginValue = normalizedEmail || normalizedPhone;
    const ipAddress = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || null;
    const userAgent = req.headers['user-agent'] || null;

    const result = await query(
      `SELECT id, username, full_name, email, phone, country, date_of_birth, balance, status, created_at, password_hash
       FROM users
       WHERE ($1::text IS NOT NULL AND LOWER(email) = $1)
          OR ($2::text IS NOT NULL AND phone = $2)
       LIMIT 1`,
      [normalizedEmail, normalizedPhone]
    );

    if (result.rows.length === 0) {
      await query(
        `INSERT INTO user_login_attempts (user_id, login_field, login_value, success, failure_reason, ip_address, user_agent)
         VALUES (NULL, $1, $2, false, 'user_not_found', $3, $4)`,
        [loginField, loginValue, ipAddress, userAgent]
      );
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const row = result.rows[0];
    if (row.status !== 'active') {
      await query(
        `INSERT INTO user_login_attempts (user_id, login_field, login_value, success, failure_reason, ip_address, user_agent)
         VALUES ($1, $2, $3, false, 'account_inactive', $4, $5)`,
        [row.id, loginField, loginValue, ipAddress, userAgent]
      );
      return res.status(403).json({ error: 'Account is not active' });
    }

    const valid = await bcrypt.compare(String(password), row.password_hash || '');
    if (!valid) {
      await query(
        `INSERT INTO user_login_attempts (user_id, login_field, login_value, success, failure_reason, ip_address, user_agent)
         VALUES ($1, $2, $3, false, 'invalid_password', $4, $5)`,
        [row.id, loginField, loginValue, ipAddress, userAgent]
      );
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = signUserToken(row.id);
    await query('UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE id = $1', [row.id]);
    await query(
      `INSERT INTO user_login_attempts (user_id, login_field, login_value, success, failure_reason, ip_address, user_agent)
       VALUES ($1, $2, $3, true, NULL, $4, $5)`,
      [row.id, loginField, loginValue, ipAddress, userAgent]
    );
    return res.json({
      ok: true,
      message: 'Login successful',
      token,
      user: mapUserRow(row),
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get('/api/auth/me', requireUserAuth, async (req, res) => {
  return res.json({ user: mapUserRow(req.authUser) });
});

app.patch('/api/auth/profile', requireUserAuth, async (req, res) => {
  const { name, email, phone, country, dateOfBirth } = req.body || {};
  const userId = req.authUser.id;

  if (!name || !email || !phone || !country || !dateOfBirth) {
    return res.status(400).json({ error: 'name, email, phone, country and dateOfBirth are required' });
  }

  const normalizedEmail = normalizeEmail(email);
  const normalizedPhone = normalizePhone(phone);

  try {
    const currentUser = await query(
      `SELECT full_name, email, phone, country, date_of_birth FROM users WHERE id = $1`,
      [userId]
    );
    if (currentUser.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const duplicate = await query(
      `SELECT id FROM users WHERE id <> $1 AND (LOWER(email) = $2 OR phone = $3) LIMIT 1`,
      [userId, normalizedEmail, normalizedPhone]
    );
    if (duplicate.rows.length > 0) {
      return res.status(409).json({ error: 'Email or phone already in use' });
    }

    const updated = await query(
      `UPDATE users
       SET full_name = $1,
           email = $2,
           phone = $3,
           country = $4,
           date_of_birth = $5,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $6
       RETURNING id, username, full_name, email, phone, country, date_of_birth, balance, status, created_at`,
      [String(name).trim(), normalizedEmail, normalizedPhone, String(country).trim(), String(dateOfBirth).trim(), userId]
    );

    const previous = currentUser.rows[0];
    const nextValues = {
      full_name: String(name).trim(),
      email: normalizedEmail,
      phone: normalizedPhone,
      country: String(country).trim(),
      date_of_birth: String(dateOfBirth).trim(),
    };

    const changedFields = Object.entries(nextValues).filter(([field, value]) => String(previous[field] || '') !== String(value || ''));
    for (const [field, value] of changedFields) {
      await query(
        `INSERT INTO user_profile_changes (user_id, field_name, old_value, new_value, metadata)
         VALUES ($1, $2, $3, $4, $5::jsonb)`,
        [userId, field, previous[field] || null, value || null, JSON.stringify({ source: 'profile_modal' })]
      );
    }

    return res.json({ ok: true, message: 'Profile updated', user: mapUserRow(updated.rows[0]) });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/change-password', requireUserAuth, async (req, res) => {
  const { currentPassword, newPassword } = req.body || {};
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'currentPassword and newPassword are required' });
  }
  if (String(newPassword).length < 8) {
    return res.status(400).json({ error: 'New password must be at least 8 characters' });
  }

  try {
    const current = await query('SELECT password_hash FROM users WHERE id = $1', [req.authUser.id]);
    if (current.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const valid = await bcrypt.compare(String(currentPassword), current.rows[0].password_hash || '');
    if (!valid) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    const nextHash = await bcrypt.hash(String(newPassword), 10);
    await query('UPDATE users SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [nextHash, req.authUser.id]);
    return res.json({ ok: true, message: 'Password updated' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/password-reset', async (req, res) => {
  const { email, phone, newPassword } = req.body || {};
  const normalizedEmail = normalizeEmail(email);
  const normalizedPhone = normalizePhone(phone);
  if ((!normalizedEmail && !normalizedPhone) || !newPassword) {
    return res.status(400).json({ error: 'email or phone and newPassword are required' });
  }
  if (String(newPassword).length < 8) {
    return res.status(400).json({ error: 'New password must be at least 8 characters' });
  }

  try {
    const userResult = await query(
      `SELECT id FROM users
       WHERE ($1::text IS NOT NULL AND LOWER(email) = $1)
          OR ($2::text IS NOT NULL AND phone = $2)
       LIMIT 1`,
      [normalizedEmail, normalizedPhone]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'Account not found' });
    }

    const nextHash = await bcrypt.hash(String(newPassword), 10);
    await query('UPDATE users SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [nextHash, userResult.rows[0].id]);
    return res.json({ ok: true, message: 'Password reset successful' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/deposits', requireUserAuth, async (req, res) => {
  const { amount, payment_method, provider_name } = req.body || {};
  const numericAmount = Number(amount);

  if (!payment_method || !Number.isFinite(numericAmount) || numericAmount <= 0) {
    return res.status(400).json({ error: 'amount and payment_method are required' });
  }

  try {
    const methodResult = await query(
      `SELECT code, method_type, status, min_amount, max_amount
       FROM payment_methods
       WHERE code = $1
       LIMIT 1`,
      [String(payment_method).toLowerCase()]
    );
    if (methodResult.rows.length === 0 || methodResult.rows[0].status !== 'active') {
      return res.status(400).json({ error: 'Payment method is not available' });
    }

    const method = methodResult.rows[0];
    if (!(method.method_type === 'both' || method.method_type === 'deposit')) {
      return res.status(400).json({ error: 'Payment method does not support deposits' });
    }

    if (numericAmount < Number(method.min_amount) || numericAmount > Number(method.max_amount)) {
      return res.status(400).json({ error: `Amount must be between ${method.min_amount} and ${method.max_amount}` });
    }

    const inserted = await query(
      `INSERT INTO transactions (user_id, type, amount, status, payment_method, reference_id, metadata)
       VALUES ($1, 'deposit', $2, 'pending', $3, $4, $5::jsonb)
       RETURNING *`,
      [
        req.authUser.id,
        numericAmount,
        method.code,
        `DEP-${Date.now()}`,
        JSON.stringify({ provider: provider_name || method.code, source: 'user_modal' }),
      ]
    );

    const transaction = inserted.rows[0];
    const conf = tkpayConfig();
    const paymentChannelId = conf.channels[String(method.code || '').toLowerCase()];

    if (conf.ok && paymentChannelId) {
      const payload = compactTkpayPayload({
        Amount: Number(transaction.amount),
        CurrencyId: conf.currencyId,
        IsTest: false,
        PayerKey: String(req.authUser.id),
        PayerName: String(req.authUser.full_name || req.authUser.username || `user-${req.authUser.id}`),
        PaymentChannelId: paymentChannelId,
        ShopInformUrl: conf.collectionCallback,
        ShopOrderId: String(transaction.reference_id),
        ShopReturnUrl: conf.returnUrl,
        ShopUserLongId: conf.merchantId,
      });

      const result = await callTkpayApi('/api/createOrder', payload);
      const metadata = {
        tkpay_create_order: {
          at: new Date().toISOString(),
          is_test: payload.IsTest,
          request: {
            ...payload,
            EncryptValue: undefined,
          },
          http_status: result.status,
          response: result.data,
        },
      };

      await query(
        `UPDATE transactions
         SET metadata = COALESCE(metadata, '{}'::jsonb) || $1::jsonb
         WHERE id = $2`,
        [JSON.stringify(metadata), transaction.id]
      );

      if (result.ok && result.data?.Success && result.data?.PayUrl) {
        return res.status(201).json({
          ok: true,
          message: 'Deposit order created',
          transaction,
          payUrl: String(result.data.PayUrl),
          trackingNumber: result.data.TrackingNumber || null,
        });
      }

      return res.status(400).json({
        ok: false,
        error: result.data?.ErrorMessage || 'Failed to create TKPAY order',
      });
    }

    return res.status(201).json({
      ok: true,
      message: 'Deposit submitted and waiting for admin approval',
      transaction,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/withdrawals', requireUserAuth, async (req, res) => {
  const { amount, payment_method, account_number, provider_name } = req.body || {};
  const numericAmount = Number(amount);

  if (!payment_method || !account_number || !Number.isFinite(numericAmount) || numericAmount <= 0) {
    return res.status(400).json({ error: 'amount, payment_method and account_number are required' });
  }

  try {
    const methodResult = await query(
      `SELECT code, method_type, status, min_amount, max_amount
       FROM payment_methods
       WHERE code = $1
       LIMIT 1`,
      [String(payment_method).toLowerCase()]
    );
    if (methodResult.rows.length === 0 || methodResult.rows[0].status !== 'active') {
      return res.status(400).json({ error: 'Payment method is not available' });
    }

    const method = methodResult.rows[0];
    if (!(method.method_type === 'both' || method.method_type === 'withdrawal')) {
      return res.status(400).json({ error: 'Payment method does not support withdrawals' });
    }

    if (numericAmount < Number(method.min_amount) || numericAmount > Number(method.max_amount)) {
      return res.status(400).json({ error: `Amount must be between ${method.min_amount} and ${method.max_amount}` });
    }

    const balanceResult = await query('SELECT balance FROM users WHERE id = $1', [req.authUser.id]);
    const currentBalance = Number(balanceResult.rows[0]?.balance || 0);
    if (currentBalance < numericAmount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    const inserted = await query(
      `INSERT INTO transactions (user_id, type, amount, status, payment_method, reference_id, metadata)
       VALUES ($1, 'withdrawal', $2, 'pending', $3, $4, $5::jsonb)
       RETURNING *`,
      [
        req.authUser.id,
        numericAmount,
        method.code,
        `WDR-${Date.now()}`,
        JSON.stringify({
          account_number: String(account_number).trim(),
          provider: provider_name || method.code,
          source: 'user_modal',
        }),
      ]
    );

    return res.status(201).json({
      ok: true,
      message: 'Withdrawal submitted and waiting for admin approval',
      transaction: inserted.rows[0],
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get('/api/auth/transactions', requireUserAuth, async (req, res) => {
  const requestedType = String(req.query.type || '').toLowerCase();
  const type = requestedType === 'deposit' || requestedType === 'withdrawal' ? requestedType : null;

  try {
    if (type) {
      const filtered = await query(
        `SELECT id, type, amount, status, payment_method, reference_id, created_at
         FROM transactions
         WHERE user_id = $1 AND type = $2
         ORDER BY created_at DESC`,
        [req.authUser.id, type]
      );
      return res.json(filtered.rows);
    }

    const result = await query(
      `SELECT id, type, amount, status, payment_method, reference_id, created_at
       FROM transactions
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [req.authUser.id]
    );
    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/bets/place', requireUserAuth, async (req, res) => {
  const { amount, odds, game_name = 'Unknown', metadata = {} } = req.body || {};
  const numericAmount = Number(amount);
  const numericOdds = Number(odds);

  if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
    return res.status(400).json({ error: 'Valid amount is required' });
  }
  if (!Number.isFinite(numericOdds) || numericOdds < 1.01) {
    return res.status(400).json({ error: 'Valid odds is required (>= 1.01)' });
  }

  const client = await getClient();
  try {
    await client.query('BEGIN');
    const userResult = await client.query(
      'SELECT id, balance, status FROM users WHERE id = $1 FOR UPDATE',
      [req.authUser.id]
    );
    if (userResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'User not found' });
    }

    const user = userResult.rows[0];
    if (user.status !== 'active') {
      await client.query('ROLLBACK');
      return res.status(403).json({ error: 'Account is not active' });
    }

    const currentBalance = Number(user.balance || 0);
    if (currentBalance < numericAmount) {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    const potentialWin = Number((numericAmount * numericOdds).toFixed(2));
    const betResult = await client.query(
      `INSERT INTO bets (user_id, amount, odds, potential_win, status, game_name, metadata)
       VALUES ($1, $2, $3, $4, 'pending', $5, $6::jsonb)
       RETURNING *`,
      [req.authUser.id, numericAmount, numericOdds, potentialWin, String(game_name || 'Unknown'), JSON.stringify(metadata || {})]
    );

    const nextBalance = Number((currentBalance - numericAmount).toFixed(2));
    await client.query('UPDATE users SET balance = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [nextBalance, req.authUser.id]);

    await client.query(
      `INSERT INTO transactions (user_id, type, amount, status, payment_method, reference_id, metadata)
       VALUES ($1, 'manual', $2, 'completed', 'bet_stake', $3, $4::jsonb)`,
      [req.authUser.id, numericAmount, `BET-${betResult.rows[0].id}`, JSON.stringify({ action: 'bet_place', game_name: String(game_name || 'Unknown') })]
    );

    await client.query('COMMIT');
    return res.status(201).json({
      ok: true,
      message: 'Bet placed successfully',
      bet: betResult.rows[0],
      balance: String(nextBalance.toFixed(2)),
    });
  } catch (error) {
    await client.query('ROLLBACK');
    return res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

app.get('/api/auth/bets', requireUserAuth, async (req, res) => {
  const status = String(req.query.status || '').toLowerCase();
  const allowed = ['open', 'settled'];
  const wants = allowed.includes(status) ? status : null;

  try {
    if (wants === 'open') {
      const openBets = await query(
        `SELECT id, game_name, amount, odds, potential_win, status, created_at
         FROM bets
         WHERE user_id = $1 AND status = 'pending'
         ORDER BY created_at DESC`,
        [req.authUser.id]
      );
      return res.json(openBets.rows);
    }

    if (wants === 'settled') {
      const settledBets = await query(
        `SELECT id, game_name, amount, odds, potential_win, status, created_at, settled_at
         FROM bets
         WHERE user_id = $1 AND status IN ('won', 'lost', 'cancelled')
         ORDER BY COALESCE(settled_at, created_at) DESC`,
        [req.authUser.id]
      );
      return res.json(settledBets.rows);
    }

    const allBets = await query(
      `SELECT id, game_name, amount, odds, potential_win, status, created_at, settled_at
       FROM bets
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [req.authUser.id]
    );
    return res.json(allBets.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get('/api/auth/profile-stats', requireUserAuth, async (req, res) => {
  const userId = req.authUser.id;
  try {
    const [txCount, txTotals, betsAgg, gameAgg, changesAgg] = await Promise.all([
      query(
        `SELECT
          COUNT(*)::int AS total_transactions,
          COUNT(*) FILTER (WHERE type = 'deposit')::int AS deposit_count,
          COUNT(*) FILTER (WHERE type = 'withdrawal')::int AS withdrawal_count,
          COUNT(*) FILTER (WHERE status = 'pending')::int AS pending_transactions
         FROM transactions WHERE user_id = $1`,
        [userId]
      ),
      query(
        `SELECT
          COALESCE(SUM(amount) FILTER (WHERE type = 'deposit' AND status = 'completed'), 0)::numeric AS total_deposit,
          COALESCE(SUM(amount) FILTER (WHERE type = 'withdrawal' AND status = 'completed'), 0)::numeric AS total_withdrawal,
          COALESCE(SUM(amount) FILTER (WHERE type = 'deposit' AND status = 'pending'), 0)::numeric AS pending_deposit,
          COALESCE(SUM(amount) FILTER (WHERE type = 'withdrawal' AND status = 'pending'), 0)::numeric AS pending_withdrawal
         FROM transactions WHERE user_id = $1`,
        [userId]
      ),
      query(
        `SELECT
          COUNT(*)::int AS total_bets,
          COUNT(*) FILTER (WHERE status = 'won')::int AS won_bets,
          COUNT(*) FILTER (WHERE status = 'lost')::int AS lost_bets,
          COUNT(*) FILTER (WHERE status = 'pending')::int AS open_bets
         FROM bets WHERE user_id = $1`,
        [userId]
      ),
      query(
        `SELECT
          COALESCE(NULLIF(game_name, ''), 'Unknown') AS game_name,
          COUNT(*)::int AS plays
         FROM bets
         WHERE user_id = $1
         GROUP BY COALESCE(NULLIF(game_name, ''), 'Unknown')
         ORDER BY plays DESC, game_name ASC`,
        [userId]
      ),
      query(
        `SELECT
          COUNT(*) FILTER (WHERE changed_at >= NOW() - INTERVAL '7 days')::int AS changes_7d,
          COUNT(*) FILTER (WHERE field_name IN ('full_name', 'email', 'phone') AND changed_at >= NOW() - INTERVAL '30 days')::int AS identity_changes_30d
         FROM user_profile_changes
         WHERE user_id = $1`,
        [userId]
      ),
    ]);

    const won = Number(betsAgg.rows[0]?.won_bets || 0);
    const lost = Number(betsAgg.rows[0]?.lost_bets || 0);
    const settled = won + lost;
    const winRate = settled > 0 ? won / settled : 0;

    return res.json({
      highGainer: winRate >= 0.8,
      suspicious:
        winRate >= 0.8 ||
        Number(changesAgg.rows[0]?.changes_7d || 0) >= 3 ||
        Number(changesAgg.rows[0]?.identity_changes_30d || 0) >= 3,
      stats: {
        totalTransactions: Number(txCount.rows[0]?.total_transactions || 0),
        depositCount: Number(txCount.rows[0]?.deposit_count || 0),
        withdrawalCount: Number(txCount.rows[0]?.withdrawal_count || 0),
        pendingTransactions: Number(txCount.rows[0]?.pending_transactions || 0),
        totalDeposit: String(txTotals.rows[0]?.total_deposit || '0'),
        totalWithdrawal: String(txTotals.rows[0]?.total_withdrawal || '0'),
        pendingDeposit: String(txTotals.rows[0]?.pending_deposit || '0'),
        pendingWithdrawal: String(txTotals.rows[0]?.pending_withdrawal || '0'),
        totalBets: Number(betsAgg.rows[0]?.total_bets || 0),
        wonBets: won,
        lostBets: lost,
        openBets: Number(betsAgg.rows[0]?.open_bets || 0),
        winRate,
        profileChanges7d: Number(changesAgg.rows[0]?.changes_7d || 0),
        identityChanges30d: Number(changesAgg.rows[0]?.identity_changes_30d || 0),
      },
      gamePlays: gameAgg.rows,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid admin credentials' });
  }

  const token = jwt.sign({ role: 'admin', username: ADMIN_USERNAME }, ADMIN_JWT_SECRET, { expiresIn: '12h' });

  return res.json({
    ok: true,
    token,
    admin: {
      username: ADMIN_USERNAME,
      role: 'admin',
    },
  });
});

app.get('/api/admin/summary', requireAdminAuth, async (req, res) => {
  try {
    const [usersCount, betsCount, pendingBetsCount, transactionsTotal, activeUsers, blockedUsers, sectionCount, itemCount] = await Promise.all([
      query('SELECT COUNT(*)::int AS count FROM users'),
      query('SELECT COUNT(*)::int AS count FROM bets'),
      query("SELECT COUNT(*)::int AS count FROM bets WHERE status = 'pending'"),
      query("SELECT COALESCE(SUM(amount), 0)::numeric AS total FROM transactions WHERE type IN ('deposit','payout','withdrawal')"),
      query("SELECT COUNT(*)::int AS count FROM users WHERE status = 'active'"),
      query("SELECT COUNT(*)::int AS count FROM users WHERE status = 'blocked'"),
      query('SELECT COUNT(*)::int AS count FROM content_sections'),
      query('SELECT COUNT(*)::int AS count FROM content_items'),
    ]);

    return res.json({
      users: usersCount.rows[0]?.count || 0,
      bets: betsCount.rows[0]?.count || 0,
      pendingBets: pendingBetsCount.rows[0]?.count || 0,
      totalTransactionVolume: transactionsTotal.rows[0]?.total || '0',
      activeUsers: activeUsers.rows[0]?.count || 0,
      blockedUsers: blockedUsers.rows[0]?.count || 0,
      contentSections: sectionCount.rows[0]?.count || 0,
      contentItems: itemCount.rows[0]?.count || 0,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get('/api/admin/billing/overview', requireAdminAuth, async (req, res) => {
  try {
    const [depositTotal, withdrawalTotal, payoutTotal, pendingWithdrawals] = await Promise.all([
      query("SELECT COALESCE(SUM(amount), 0)::numeric AS total FROM transactions WHERE type = 'deposit' AND status = 'completed'"),
      query("SELECT COALESCE(SUM(amount), 0)::numeric AS total FROM transactions WHERE type = 'withdrawal' AND status = 'completed'"),
      query("SELECT COALESCE(SUM(amount), 0)::numeric AS total FROM transactions WHERE type = 'payout' AND status = 'completed'"),
      query("SELECT COUNT(*)::int AS count FROM transactions WHERE type = 'withdrawal' AND status = 'pending'"),
    ]);

    return res.json({
      depositTotal: depositTotal.rows[0]?.total || '0',
      withdrawalTotal: withdrawalTotal.rows[0]?.total || '0',
      payoutTotal: payoutTotal.rows[0]?.total || '0',
      pendingWithdrawals: pendingWithdrawals.rows[0]?.count || 0,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get('/api/admin/users', requireAdminAuth, async (req, res) => {
  try {
    const result = await query(
      `SELECT
        u.id,
        u.username,
        u.full_name,
        u.email,
        u.phone,
        u.balance,
        u.status,
        u.created_at,
        COALESCE(MAX(b.created_at), u.created_at) AS last_activity,
        CASE
          WHEN COUNT(*) FILTER (WHERE b.status IN ('won', 'lost')) = 0 THEN false
          ELSE (
            (COUNT(*) FILTER (WHERE b.status = 'won'))::decimal /
            NULLIF(COUNT(*) FILTER (WHERE b.status IN ('won', 'lost')), 0)
          ) >= 0.8
        END AS high_gainer,
        (
          SELECT COUNT(*)::int
          FROM user_profile_changes pc
          WHERE pc.user_id = u.id
            AND pc.changed_at >= NOW() - INTERVAL '7 days'
        ) AS profile_change_count_7d,
        (
          SELECT COUNT(*)::int
          FROM user_profile_changes pc
          WHERE pc.user_id = u.id
            AND pc.field_name IN ('full_name', 'email', 'phone')
            AND pc.changed_at >= NOW() - INTERVAL '30 days'
        ) >= 3 AS suspicious
      FROM users u
      LEFT JOIN bets b ON b.user_id = u.id
      GROUP BY u.id
      ORDER BY u.created_at DESC`
    );
    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/users', requireAdminAuth, async (req, res) => {
  const { username, email, password = 'ChangeMe@123', status = 'active', balance = 0 } = req.body || {};

  if (!username || !email) {
    return res.status(400).json({ error: 'username and email are required' });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const result = await query(
      `INSERT INTO users (username, email, password_hash, balance, status)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, username, email, balance, status, created_at, updated_at`,
      [username, email, passwordHash, balance, status]
    );
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error?.code === '23505') {
      return res.status(409).json({ error: 'Username or email already exists' });
    }
    return res.status(500).json({ error: error.message });
  }
});

app.patch('/api/admin/users/:id', requireAdminAuth, async (req, res) => {
  const { status, balance } = req.body || {};
  const userId = Number(req.params.id);

  if (!userId) {
    return res.status(400).json({ error: 'Invalid user id' });
  }

  try {
    const existing = await query('SELECT id, status, balance FROM users WHERE id = $1', [userId]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const nextStatus = status ?? existing.rows[0].status;
    const nextBalance = balance ?? existing.rows[0].balance;
    const updated = await query(
      'UPDATE users SET status = $1, balance = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING id, username, email, balance, status, created_at, updated_at',
      [nextStatus, nextBalance, userId]
    );

    return res.json(updated.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.delete('/api/admin/users/:id', requireAdminAuth, async (req, res) => {
  const userId = Number(req.params.id);
  if (!userId) {
    return res.status(400).json({ error: 'Invalid user id' });
  }

  const client = await getClient();
  try {
    await client.query('BEGIN');
    const existing = await client.query('SELECT id FROM users WHERE id = $1', [userId]);
    if (existing.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'User not found' });
    }

    await client.query('DELETE FROM user_profile_changes WHERE user_id = $1', [userId]);
    await client.query('DELETE FROM bonuses WHERE user_id = $1', [userId]);
    await client.query('DELETE FROM transactions WHERE user_id = $1', [userId]);
    await client.query('DELETE FROM bets WHERE user_id = $1', [userId]);
    await client.query('DELETE FROM users WHERE id = $1', [userId]);
    await client.query('COMMIT');
    return res.json({ ok: true });
  } catch (error) {
    await client.query('ROLLBACK');
    return res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

app.get('/api/admin/users/:id/insights', requireAdminAuth, async (req, res) => {
  const userId = Number(req.params.id);
  if (!userId) {
    return res.status(400).json({ error: 'Invalid user id' });
  }

  try {
    const [
      userResult,
      aggregateResult,
      gameStatsResult,
      profileChangesResult,
      loginAttemptsResult,
      recentTransactionsResult,
    ] = await Promise.all([
      query(
        `SELECT id, username, full_name, email, phone, balance, status, country, date_of_birth, created_at, last_login_at
         FROM users WHERE id = $1`,
        [userId]
      ),
      query(
        `SELECT
          COUNT(*)::int AS total_bets,
          COUNT(*) FILTER (WHERE status = 'won')::int AS won_bets,
          COUNT(*) FILTER (WHERE status = 'lost')::int AS lost_bets,
          COUNT(*) FILTER (WHERE status = 'pending')::int AS pending_bets,
          COALESCE(SUM(amount) FILTER (WHERE status = 'won'), 0)::numeric AS won_stake_total,
          COALESCE(SUM(amount) FILTER (WHERE status = 'lost'), 0)::numeric AS lost_stake_total,
          COALESCE(SUM(amount) FILTER (WHERE status IN ('won', 'lost')), 0)::numeric AS settled_stake_total,
          COALESCE(AVG(odds) FILTER (WHERE status IN ('won', 'lost')), 0)::numeric AS avg_odds,
          COALESCE(SUM(amount) FILTER (WHERE status IN ('won', 'lost') AND game_name IS NOT NULL), 0)::numeric AS tracked_game_stake
         FROM bets
         WHERE user_id = $1`,
        [userId]
      ),
      query(
        `SELECT
          COALESCE(NULLIF(game_name, ''), 'Unknown') AS game_name,
          COUNT(*)::int AS plays,
          COUNT(*) FILTER (WHERE status = 'won')::int AS wins,
          COUNT(*) FILTER (WHERE status = 'lost')::int AS losses,
          COALESCE(SUM(amount), 0)::numeric AS total_stake
         FROM bets
         WHERE user_id = $1
         GROUP BY COALESCE(NULLIF(game_name, ''), 'Unknown')
         ORDER BY plays DESC, game_name ASC`,
        [userId]
      ),
      query(
        `SELECT id, field_name, old_value, new_value, changed_at, metadata
         FROM user_profile_changes
         WHERE user_id = $1
         ORDER BY changed_at DESC
         LIMIT 100`,
        [userId]
      ),
      query(
        `SELECT id, login_field, login_value, success, failure_reason, ip_address, user_agent, created_at
         FROM user_login_attempts
         WHERE user_id = $1
         ORDER BY created_at DESC
         LIMIT 120`,
        [userId]
      ),
      query(
        `SELECT id, type, amount, status, payment_method, reference_id, metadata, created_at
         FROM transactions
         WHERE user_id = $1
         ORDER BY created_at DESC
         LIMIT 200`,
        [userId]
      ),
    ]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const [txTotals, txCounts] = await Promise.all([
      query(
        `SELECT
          COALESCE(SUM(amount) FILTER (WHERE type = 'deposit' AND status = 'completed'), 0)::numeric AS total_deposit,
          COALESCE(SUM(amount) FILTER (WHERE type = 'withdrawal' AND status = 'completed'), 0)::numeric AS total_withdrawal,
          COALESCE(SUM(amount) FILTER (WHERE type = 'deposit' AND status = 'pending'), 0)::numeric AS pending_deposit,
          COALESCE(SUM(amount) FILTER (WHERE type = 'withdrawal' AND status = 'pending'), 0)::numeric AS pending_withdrawal
         FROM transactions
         WHERE user_id = $1`,
        [userId]
      ),
      query(
        `SELECT
          COUNT(*)::int AS total_transactions,
          COUNT(*) FILTER (WHERE type = 'deposit')::int AS deposit_count,
          COUNT(*) FILTER (WHERE type = 'withdrawal')::int AS withdrawal_count,
          COUNT(*) FILTER (WHERE status = 'pending')::int AS pending_transactions
         FROM transactions
         WHERE user_id = $1`,
        [userId]
      ),
    ]);

    const agg = aggregateResult.rows[0] || {};
    const wonBets = Number(agg.won_bets || 0);
    const lostBets = Number(agg.lost_bets || 0);
    const settled = wonBets + lostBets;
    const winRate = settled > 0 ? wonBets / settled : 0;
    const profileChangeCount7d = profileChangesResult.rows.filter((r) => {
      const changedAt = new Date(r.changed_at).getTime();
      return changedAt >= Date.now() - 7 * 24 * 60 * 60 * 1000;
    }).length;

    const suspicious =
      winRate >= 0.8 ||
      profileChangeCount7d >= 3 ||
      profileChangesResult.rows.filter((r) => ['full_name', 'email', 'phone'].includes(r.field_name)).length >= 3;

    const loginAttempts = loginAttemptsResult.rows;
    const loginSuccessCount = loginAttempts.filter((item) => item.success).length;
    const loginFailureCount = loginAttempts.length - loginSuccessCount;
    const lastFailedLoginAt = loginAttempts.find((item) => !item.success)?.created_at || null;

    const recentTransactions = recentTransactionsResult.rows;
    const txByStatus = recentTransactions.reduce((acc, item) => {
      const key = String(item.status || 'unknown');
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    const txByType = recentTransactions.reduce((acc, item) => {
      const key = String(item.type || 'unknown');
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    return res.json({
      user: userResult.rows[0],
      highGainer: winRate >= 0.8,
      suspicious,
      stats: {
        winRate,
        totalBets: Number(agg.total_bets || 0),
        wonBets,
        lostBets,
        pendingBets: Number(agg.pending_bets || 0),
        avgOdds: String(agg.avg_odds || '0'),
        settledStakeTotal: String(agg.settled_stake_total || '0'),
        wonStakeTotal: String(agg.won_stake_total || '0'),
        lostStakeTotal: String(agg.lost_stake_total || '0'),
        totalDeposit: String(txTotals.rows[0]?.total_deposit || '0'),
        totalWithdrawal: String(txTotals.rows[0]?.total_withdrawal || '0'),
        pendingDeposit: String(txTotals.rows[0]?.pending_deposit || '0'),
        pendingWithdrawal: String(txTotals.rows[0]?.pending_withdrawal || '0'),
        totalTransactions: Number(txCounts.rows[0]?.total_transactions || 0),
        depositCount: Number(txCounts.rows[0]?.deposit_count || 0),
        withdrawalCount: Number(txCounts.rows[0]?.withdrawal_count || 0),
        pendingTransactions: Number(txCounts.rows[0]?.pending_transactions || 0),
        profileChangeCount7d,
        loginSuccessCount,
        loginFailureCount,
        lastFailedLoginAt,
      },
      gameStats: gameStatsResult.rows,
      profileChanges: profileChangesResult.rows,
      loginAttempts,
      recentTransactions,
      transactionBreakdown: {
        byStatus: txByStatus,
        byType: txByType,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get('/api/admin/bets', requireAdminAuth, async (req, res) => {
  try {
    const result = await query(
      `SELECT
        b.id,
        b.user_id,
        u.username,
        u.email,
        b.amount,
        b.odds,
        b.status,
        b.potential_win,
        b.created_at,
        b.settled_at
      FROM bets b
      LEFT JOIN users u ON u.id = b.user_id
      ORDER BY b.created_at DESC`
    );
    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.patch('/api/admin/bets/:id', requireAdminAuth, async (req, res) => {
  const betId = Number(req.params.id);
  const { status } = req.body || {};
  const validStatuses = ['pending', 'won', 'lost', 'cancelled'];

  if (!betId) {
    return res.status(400).json({ error: 'Invalid bet id' });
  }

  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  const client = await getClient();
  try {
    await client.query('BEGIN');
    const existing = await client.query(
      'SELECT id, user_id, amount, potential_win, status FROM bets WHERE id = $1 FOR UPDATE',
      [betId]
    );
    if (existing.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Bet not found' });
    }

    const bet = existing.rows[0];
    if (bet.status !== 'pending' && status !== bet.status) {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'Only pending bets can be settled' });
    }

    const settledAt = status === 'pending' ? null : new Date();
    const result = await client.query('UPDATE bets SET status = $1, settled_at = $2 WHERE id = $3 RETURNING *', [status, settledAt, betId]);

    if (bet.status === 'pending') {
      if (status === 'won') {
        await client.query('UPDATE users SET balance = balance + $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [bet.potential_win, bet.user_id]);
        await client.query(
          `INSERT INTO transactions (user_id, type, amount, status, payment_method, reference_id, metadata)
           VALUES ($1, 'payout', $2, 'completed', 'bet_settlement', $3, $4::jsonb)`,
          [bet.user_id, bet.potential_win, `BET-${betId}-WIN`, JSON.stringify({ action: 'bet_settle', result: 'won' })]
        );
      }

      if (status === 'cancelled') {
        await client.query('UPDATE users SET balance = balance + $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [bet.amount, bet.user_id]);
        await client.query(
          `INSERT INTO transactions (user_id, type, amount, status, payment_method, reference_id, metadata)
           VALUES ($1, 'manual', $2, 'completed', 'bet_refund', $3, $4::jsonb)`,
          [bet.user_id, bet.amount, `BET-${betId}-REFUND`, JSON.stringify({ action: 'bet_settle', result: 'cancelled_refund' })]
        );
      }
    }

    await client.query('COMMIT');
    return res.json(result.rows[0]);
  } catch (error) {
    await client.query('ROLLBACK');
    return res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

app.get('/api/admin/transactions', requireAdminAuth, async (req, res) => {
  try {
    const result = await query(
      `SELECT
        t.id,
        t.user_id,
        u.username,
        u.email,
        t.type,
        t.amount,
        t.status,
        t.payment_method,
        t.reference_id,
        t.created_at
      FROM transactions t
      LEFT JOIN users u ON u.id = t.user_id
      ORDER BY t.created_at DESC`
    );
    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/transactions', requireAdminAuth, async (req, res) => {
  const { user_id, type, amount, status = 'completed', reference_id, payment_method } = req.body || {};
  const validTypes = ['deposit', 'withdrawal', 'payout', 'manual'];

  if (!user_id || !type || !amount) {
    return res.status(400).json({ error: 'user_id, type and amount are required' });
  }

  if (!validTypes.includes(type)) {
    return res.status(400).json({ error: 'Invalid transaction type' });
  }

  const client = await getClient();
  try {
    await client.query('BEGIN');

    const userResult = await client.query('SELECT id, balance FROM users WHERE id = $1 FOR UPDATE', [user_id]);
    if (userResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'User not found' });
    }

    const numericAmount = Number(amount);
    const currentBalance = Number(userResult.rows[0].balance || 0);
    let nextBalance = currentBalance;

    if (status === 'completed') {
      if (type === 'deposit' || type === 'payout' || type === 'manual') {
        nextBalance = currentBalance + numericAmount;
      }
      if (type === 'withdrawal') {
        nextBalance = currentBalance - numericAmount;
      }
    }

    const transactionResult = await client.query(
      `INSERT INTO transactions (user_id, type, amount, status, reference_id, payment_method)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [user_id, type, numericAmount, status, reference_id || null, payment_method || null]
    );

    await client.query('UPDATE users SET balance = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [nextBalance, user_id]);

    await client.query('COMMIT');
    return res.status(201).json(transactionResult.rows[0]);
  } catch (error) {
    await client.query('ROLLBACK');
    return res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

app.delete('/api/admin/transactions/:id', requireAdminAuth, async (req, res) => {
  const transactionId = Number(req.params.id);
  if (!transactionId) {
    return res.status(400).json({ error: 'Invalid transaction id' });
  }

  try {
    const existing = await query('SELECT id, status FROM transactions WHERE id = $1', [transactionId]);
    if (!existing.rows.length) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    if (existing.rows[0].status === 'completed') {
      return res.status(400).json({ error: 'Completed transactions cannot be deleted' });
    }

    await query('DELETE FROM transactions WHERE id = $1', [transactionId]);
    return res.json({ ok: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.patch('/api/admin/withdrawals/:id/decision', requireAdminAuth, async (req, res) => {
  const transactionId = Number(req.params.id);
  const { decision } = req.body || {};

  if (!transactionId || !['approve', 'reject'].includes(decision)) {
    return res.status(400).json({ error: 'Valid id and decision are required' });
  }

  const client = await getClient();
  try {
    await client.query('BEGIN');

    const txResult = await client.query(
      `SELECT id, user_id, amount, status, type
       FROM transactions
       WHERE id = $1 FOR UPDATE`,
      [transactionId]
    );

    if (txResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Transaction not found' });
    }

    const tx = txResult.rows[0];
    if (tx.type !== 'withdrawal') {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'Not a withdrawal transaction' });
    }

    if (tx.status !== 'pending') {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'Withdrawal already processed' });
    }

    const finalStatus = decision === 'approve' ? 'completed' : 'cancelled';
    await client.query('UPDATE transactions SET status = $1 WHERE id = $2', [finalStatus, transactionId]);

    if (decision === 'approve') {
      await client.query('UPDATE users SET balance = balance - $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [
        tx.amount,
        tx.user_id,
      ]);
    }

    await client.query('COMMIT');
    return res.json({ ok: true, transactionId, status: finalStatus });
  } catch (error) {
    await client.query('ROLLBACK');
    return res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

app.get('/api/admin/bonuses', requireAdminAuth, async (req, res) => {
  try {
    const result = await query(
      `SELECT
        bo.id,
        bo.user_id,
        u.username,
        u.email,
        bo.amount,
        bo.type,
        bo.expires_at,
        bo.used,
        bo.created_at
      FROM bonuses bo
      LEFT JOIN users u ON u.id = bo.user_id
      ORDER BY bo.created_at DESC`
    );
    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/bonuses', requireAdminAuth, async (req, res) => {
  const { user_id, amount, type, expires_at = null } = req.body || {};
  if (!user_id || !amount || !type) {
    return res.status(400).json({ error: 'user_id, amount and type are required' });
  }

  try {
    const userResult = await query('SELECT id FROM users WHERE id = $1', [user_id]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const bonusResult = await query(
      'INSERT INTO bonuses (user_id, amount, type, expires_at, used) VALUES ($1, $2, $3, $4, false) RETURNING *',
      [user_id, amount, type, expires_at]
    );
    return res.status(201).json(bonusResult.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get('/api/admin/risk', requireAdminAuth, async (req, res) => {
  try {
    const [highOddsBets, topPendingExposureUsers, blockedButBettingUsers] = await Promise.all([
      query('SELECT COUNT(*)::int AS count FROM bets WHERE odds >= 5'),
      query(
        `SELECT
          u.id,
          u.username,
          u.email,
          COALESCE(SUM(b.amount), 0)::numeric AS exposure
        FROM users u
        LEFT JOIN bets b ON b.user_id = u.id AND b.status = 'pending'
        GROUP BY u.id
        ORDER BY exposure DESC
        LIMIT 10`
      ),
      query(
        `SELECT COUNT(*)::int AS count
         FROM users u
         WHERE u.status = 'blocked'
         AND EXISTS (
           SELECT 1 FROM bets b WHERE b.user_id = u.id AND b.created_at >= NOW() - INTERVAL '7 days'
         )`
      ),
    ]);

    return res.json({
      highOddsBets: highOddsBets.rows[0]?.count || 0,
      blockedButBettingUsers: blockedButBettingUsers.rows[0]?.count || 0,
      topPendingExposureUsers: topPendingExposureUsers.rows,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get('/api/admin/content-sections', requireAdminAuth, async (req, res) => {
  try {
    const result = await query('SELECT * FROM content_sections ORDER BY sort_order ASC, id ASC');
    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/content-sections', requireAdminAuth, async (req, res) => {
  const { slug, title, section_type = 'home', sort_order = 0, is_active = true } = req.body || {};
  if (!slug || !title) {
    return res.status(400).json({ error: 'slug and title are required' });
  }

  try {
    const result = await query(
      `INSERT INTO content_sections (slug, title, section_type, sort_order, is_active)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [slug, title, section_type, sort_order, is_active]
    );
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error?.code === '23505') {
      return res.status(409).json({ error: 'Section slug already exists' });
    }
    return res.status(500).json({ error: error.message });
  }
});

app.patch('/api/admin/content-sections/:id', requireAdminAuth, async (req, res) => {
  const sectionId = Number(req.params.id);
  const { title, section_type, sort_order, is_active } = req.body || {};

  if (!sectionId) {
    return res.status(400).json({ error: 'Invalid section id' });
  }

  try {
    const current = await query('SELECT * FROM content_sections WHERE id = $1', [sectionId]);
    if (current.rows.length === 0) {
      return res.status(404).json({ error: 'Section not found' });
    }

    const row = current.rows[0];
    const result = await query(
      `UPDATE content_sections
       SET title = $1,
           section_type = $2,
           sort_order = $3,
           is_active = $4,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $5
       RETURNING *`,
      [
        title ?? row.title,
        section_type ?? row.section_type,
        sort_order ?? row.sort_order,
        typeof is_active === 'boolean' ? is_active : row.is_active,
        sectionId,
      ]
    );
    return res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.delete('/api/admin/content-sections/:id', requireAdminAuth, async (req, res) => {
  const sectionId = Number(req.params.id);
  if (!sectionId) {
    return res.status(400).json({ error: 'Invalid section id' });
  }

  try {
    await query('DELETE FROM content_sections WHERE id = $1', [sectionId]);
    return res.json({ ok: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get('/api/admin/content-items', requireAdminAuth, async (req, res) => {
  const sectionId = Number(req.query.section_id || 0);
  try {
    if (sectionId) {
      const result = await query(
        `SELECT ci.*, cs.slug AS section_slug, cs.title AS section_title
         FROM content_items ci
         LEFT JOIN content_sections cs ON cs.id = ci.section_id
         WHERE ci.section_id = $1
         ORDER BY ci.sort_order ASC, ci.id ASC`,
        [sectionId]
      );
      return res.json(result.rows);
    }

    const result = await query(
      `SELECT ci.*, cs.slug AS section_slug, cs.title AS section_title
       FROM content_items ci
       LEFT JOIN content_sections cs ON cs.id = ci.section_id
       ORDER BY ci.created_at DESC`
    );
    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/content-items', requireAdminAuth, async (req, res) => {
  const {
    section_id,
    title,
    subtitle = null,
    image_url = null,
    target_url = null,
    payload = {},
    sort_order = 0,
    is_active = true,
  } = req.body || {};

  if (!section_id || !title) {
    return res.status(400).json({ error: 'section_id and title are required' });
  }

  try {
    const result = await query(
      `INSERT INTO content_items (section_id, title, subtitle, image_url, target_url, payload, sort_order, is_active)
       VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7, $8)
       RETURNING *`,
      [section_id, title, subtitle, image_url, target_url, JSON.stringify(payload || {}), sort_order, is_active]
    );
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.patch('/api/admin/content-items/:id', requireAdminAuth, async (req, res) => {
  const itemId = Number(req.params.id);
  if (!itemId) {
    return res.status(400).json({ error: 'Invalid item id' });
  }

  try {
    const current = await query('SELECT * FROM content_items WHERE id = $1', [itemId]);
    if (current.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    const row = current.rows[0];
    const body = req.body || {};
    const result = await query(
      `UPDATE content_items
       SET title = $1,
           subtitle = $2,
           image_url = $3,
           target_url = $4,
           payload = $5::jsonb,
           sort_order = $6,
           is_active = $7,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $8
       RETURNING *`,
      [
        body.title ?? row.title,
        body.subtitle ?? row.subtitle,
        body.image_url ?? row.image_url,
        body.target_url ?? row.target_url,
        JSON.stringify(body.payload ?? row.payload ?? {}),
        body.sort_order ?? row.sort_order,
        typeof body.is_active === 'boolean' ? body.is_active : row.is_active,
        itemId,
      ]
    );

    return res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.delete('/api/admin/content-items/:id', requireAdminAuth, async (req, res) => {
  const itemId = Number(req.params.id);
  if (!itemId) {
    return res.status(400).json({ error: 'Invalid item id' });
  }

  try {
    await query('DELETE FROM content_items WHERE id = $1', [itemId]);
    return res.json({ ok: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get('/api/admin/payment-methods', requireAdminAuth, async (req, res) => {
  try {
    const result = await query('SELECT * FROM payment_methods ORDER BY created_at DESC');
    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/payment-methods', requireAdminAuth, async (req, res) => {
  const {
    name,
    code,
    method_type = 'both',
    provider = null,
    image_url = null,
    account_number = null,
    status = 'active',
    min_amount = 0,
    max_amount = 999999,
    fee_percent = 0,
  } = req.body || {};

  if (!name || !code) {
    return res.status(400).json({ error: 'name and code are required' });
  }

  try {
    const result = await query(
      `INSERT INTO payment_methods (name, code, method_type, provider, image_url, account_number, status, min_amount, max_amount, fee_percent)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [name, code, method_type, provider, image_url, account_number, status, min_amount, max_amount, fee_percent]
    );
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error?.code === '23505') {
      return res.status(409).json({ error: 'Payment method code already exists' });
    }
    return res.status(500).json({ error: error.message });
  }
});

app.patch('/api/admin/payment-methods/:id', requireAdminAuth, async (req, res) => {
  const methodId = Number(req.params.id);
  if (!methodId) {
    return res.status(400).json({ error: 'Invalid payment method id' });
  }

  try {
    const current = await query('SELECT * FROM payment_methods WHERE id = $1', [methodId]);
    if (current.rows.length === 0) {
      return res.status(404).json({ error: 'Payment method not found' });
    }

    const row = current.rows[0];
    const body = req.body || {};

    const result = await query(
      `UPDATE payment_methods
       SET name = $1,
           code = $2,
           method_type = $3,
           provider = $4,
           image_url = $5,
           account_number = $6,
           status = $7,
           min_amount = $8,
           max_amount = $9,
           fee_percent = $10,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $11
       RETURNING *`,
      [
        body.name ?? row.name,
        body.code ?? row.code,
        body.method_type ?? row.method_type,
        body.provider ?? row.provider,
        body.image_url ?? row.image_url,
        body.account_number ?? row.account_number,
        body.status ?? row.status,
        body.min_amount ?? row.min_amount,
        body.max_amount ?? row.max_amount,
        body.fee_percent ?? row.fee_percent,
        methodId,
      ]
    );

    return res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.delete('/api/admin/payment-methods/:id', requireAdminAuth, async (req, res) => {
  const methodId = Number(req.params.id);
  if (!methodId) {
    return res.status(400).json({ error: 'Invalid payment method id' });
  }

  try {
    await query('DELETE FROM payment_methods WHERE id = $1', [methodId]);
    return res.json({ ok: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get('/api/admin/game-providers', requireAdminAuth, async (req, res) => {
  try {
    const result = await query('SELECT * FROM game_providers ORDER BY created_at DESC');
    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/game-providers', requireAdminAuth, async (req, res) => {
  const { name, api_endpoint, api_key = null, supported_sections = 'casino', status = 'active' } = req.body || {};

  if (!name || !api_endpoint) {
    return res.status(400).json({ error: 'name and api_endpoint are required' });
  }

  try {
    const result = await query(
      `INSERT INTO game_providers (name, api_endpoint, api_key, supported_sections, status)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, api_endpoint, api_key, supported_sections, status]
    );
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error?.code === '23505') {
      return res.status(409).json({ error: 'Provider already exists' });
    }
    return res.status(500).json({ error: error.message });
  }
});

app.patch('/api/admin/game-providers/:id', requireAdminAuth, async (req, res) => {
  const providerId = Number(req.params.id);
  if (!providerId) {
    return res.status(400).json({ error: 'Invalid provider id' });
  }

  try {
    const current = await query('SELECT * FROM game_providers WHERE id = $1', [providerId]);
    if (current.rows.length === 0) {
      return res.status(404).json({ error: 'Provider not found' });
    }

    const row = current.rows[0];
    const body = req.body || {};

    const result = await query(
      `UPDATE game_providers
       SET name = $1,
           api_endpoint = $2,
           api_key = $3,
           supported_sections = $4,
           status = $5,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $6
       RETURNING *`,
      [
        body.name ?? row.name,
        body.api_endpoint ?? row.api_endpoint,
        body.api_key ?? row.api_key,
        body.supported_sections ?? row.supported_sections,
        body.status ?? row.status,
        providerId,
      ]
    );

    return res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.delete('/api/admin/game-providers/:id', requireAdminAuth, async (req, res) => {
  const providerId = Number(req.params.id);
  if (!providerId) {
    return res.status(400).json({ error: 'Invalid provider id' });
  }

  try {
    await query('DELETE FROM game_providers WHERE id = $1', [providerId]);
    return res.json({ ok: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/game-providers/:id/test', requireAdminAuth, async (req, res) => {
  const providerId = Number(req.params.id);
  if (!providerId) {
    return res.status(400).json({ error: 'Invalid provider id' });
  }

  try {
    const providerRes = await query('SELECT * FROM game_providers WHERE id = $1', [providerId]);
    if (providerRes.rows.length === 0) {
      return res.status(404).json({ error: 'Provider not found' });
    }

    const provider = providerRes.rows[0];
    const ok = Boolean(provider.api_endpoint) && Boolean(provider.api_key);

    if (ok) {
      await query('UPDATE game_providers SET last_sync_at = CURRENT_TIMESTAMP WHERE id = $1', [providerId]);
    }

    return res.json({
      ok,
      provider: provider.name,
      message: ok
        ? 'Connection check passed and provider marked synced.'
        : 'Connection check failed. Set API endpoint and API key.',
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/game-providers/sync-live', requireAdminAuth, async (req, res) => {
  const conf = externalGameApiConfig();
  if (!conf.ok) {
    return res.status(500).json({ error: 'SW_API_BASE_URL, SW_API_COMPANY_KEY, and SW_API_SERVER_ID are required' });
  }

  const client = await getClient();
  try {
    const remote = await callExternalGameApi('/web-root/restricted/information/get-provider-info.aspx', {
      GpId: 0,
      IsGetAll: true,
    });

    const apiErrorId = Number(remote.data?.error?.id ?? -1);
    if (apiErrorId !== 0) {
      return res.status(502).json({
        error: String(remote.data?.error?.msg || 'Provider info API failed'),
        details: remote.data?.error || remote.data,
      });
    }

    const providers = Array.isArray(remote.data?.data) ? remote.data.data : [];

    await client.query('BEGIN');

    for (const item of providers) {
      const providerId = Number(item?.gpId);
      if (!Number.isFinite(providerId)) {
        continue;
      }

      const providerName = String(
        item?.providerName?.en || item?.providerName?.cn || `Provider ${providerId}`
      ).trim();
      const providerType = String(item?.providerType || '').toLowerCase();
      const supportedSections = providerType.includes('sport') ? 'sports' : 'casino';

      await client.query(
        `INSERT INTO game_providers (
           external_provider_id,
           name,
           api_endpoint,
           api_key,
           supported_sections,
           status,
           last_sync_at
         ) VALUES ($1,$2,$3,$4,$5,$6,CURRENT_TIMESTAMP)
         ON CONFLICT (external_provider_id)
         DO UPDATE SET
           name = EXCLUDED.name,
           api_endpoint = EXCLUDED.api_endpoint,
           supported_sections = EXCLUDED.supported_sections,
           status = EXCLUDED.status,
           last_sync_at = CURRENT_TIMESTAMP,
           updated_at = CURRENT_TIMESTAMP`,
        [
          providerId,
          providerName,
          `${conf.baseUrl}/web-root/restricted/player/v2/login.aspx`,
          null,
          supportedSections,
          item?.isEnabled ? 'active' : 'inactive',
        ]
      );
    }

    await client.query('COMMIT');
    const count = await query('SELECT COUNT(*)::int AS c FROM game_providers');
    return res.json({
      ok: true,
      synced: providers.length,
      total: Number(count.rows[0]?.c || 0),
      serverId: remote.data?.serverId || conf.serverId,
    });
  } catch (error) {
    await client.query('ROLLBACK');
    return res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

app.get('/api/admin/seo-pages', requireAdminAuth, async (req, res) => {
  try {
    const result = await query('SELECT * FROM seo_pages ORDER BY path ASC');
    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/seo-pages', requireAdminAuth, async (req, res) => {
  const { path, title, description = null, keywords = null, og_image = null, no_index = false } = req.body || {};
  if (!path || !title) {
    return res.status(400).json({ error: 'path and title are required' });
  }

  try {
    const result = await query(
      `INSERT INTO seo_pages (path, title, description, keywords, og_image, no_index)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [path, title, description, keywords, og_image, no_index]
    );
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error?.code === '23505') {
      return res.status(409).json({ error: 'SEO path already exists' });
    }
    return res.status(500).json({ error: error.message });
  }
});

app.patch('/api/admin/seo-pages/:id', requireAdminAuth, async (req, res) => {
  const pageId = Number(req.params.id);
  if (!pageId) {
    return res.status(400).json({ error: 'Invalid seo page id' });
  }

  try {
    const current = await query('SELECT * FROM seo_pages WHERE id = $1', [pageId]);
    if (current.rows.length === 0) {
      return res.status(404).json({ error: 'SEO page not found' });
    }

    const row = current.rows[0];
    const body = req.body || {};

    const result = await query(
      `UPDATE seo_pages
       SET title = $1,
           description = $2,
           keywords = $3,
           og_image = $4,
           no_index = $5,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $6
       RETURNING *`,
      [
        body.title ?? row.title,
        body.description ?? row.description,
        body.keywords ?? row.keywords,
        body.og_image ?? row.og_image,
        typeof body.no_index === 'boolean' ? body.no_index : row.no_index,
        pageId,
      ]
    );

    return res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.delete('/api/admin/seo-pages/:id', requireAdminAuth, async (req, res) => {
  const pageId = Number(req.params.id);
  if (!pageId) {
    return res.status(400).json({ error: 'Invalid seo page id' });
  }

  try {
    await query('DELETE FROM seo_pages WHERE id = $1', [pageId]);
    return res.json({ ok: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get('/api/admin/site-settings', requireAdminAuth, async (req, res) => {
  try {
    const result = await query('SELECT key, value, updated_at FROM site_settings ORDER BY key ASC');
    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/site-settings', requireAdminAuth, async (req, res) => {
  const { key, value } = req.body || {};
  if (!key) {
    return res.status(400).json({ error: 'key is required' });
  }

  try {
    const result = await query(
      `INSERT INTO site_settings (key, value, updated_at)
       VALUES ($1, $2, CURRENT_TIMESTAMP)
       ON CONFLICT (key) DO UPDATE SET
         value = EXCLUDED.value,
         updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [key, value ?? '']
    );
    return res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/site-settings/bulk', requireAdminAuth, async (req, res) => {
  const { items } = req.body || {};
  if (!Array.isArray(items)) {
    return res.status(400).json({ error: 'items array is required' });
  }

  const client = await getClient();
  try {
    await client.query('BEGIN');
    for (const item of items) {
      await client.query(
        `INSERT INTO site_settings (key, value, updated_at)
         VALUES ($1, $2, CURRENT_TIMESTAMP)
         ON CONFLICT (key) DO UPDATE SET
           value = EXCLUDED.value,
           updated_at = CURRENT_TIMESTAMP`,
        [item.key, item.value ?? '']
      );
    }
    await client.query('COMMIT');
    return res.json({ ok: true, count: items.length });
  } catch (error) {
    await client.query('ROLLBACK');
    return res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const result = await query('SELECT id, username, email, balance, status, created_at FROM users');
    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const result = await query('SELECT id, username, email, balance, status, created_at FROM users WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get('/api/users/:id/bets', async (req, res) => {
  try {
    const result = await query('SELECT * FROM bets WHERE user_id = $1 ORDER BY created_at DESC', [req.params.id]);
    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get('/api/users/:id/bonuses', async (req, res) => {
  try {
    const result = await query('SELECT * FROM bonuses WHERE user_id = $1 AND used = false', [req.params.id]);
    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/bets', async (req, res) => {
  const { user_id, amount, odds, game_name = 'Unknown', metadata = {} } = req.body;

  if (!user_id || !amount || !odds) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const potential_win = amount * odds;
    const result = await query(
      'INSERT INTO bets (user_id, amount, odds, potential_win, game_name, metadata) VALUES ($1, $2, $3, $4, $5, $6::jsonb) RETURNING *',
      [user_id, amount, odds, potential_win, game_name, JSON.stringify(metadata || {})]
    );
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post(['/GetBalance', '/getbalance'], async (req, res) => {
  try {
    const companyKey = getBodyValue(req.body, 'CompanyKey');
    if (!isCompanyKeyValid(companyKey)) {
      return res.json(seamlessResponse({ ErrorCode: 4, ErrorMessage: 'Invalid CompanyKey' }));
    }

    const user = await findUserBySeamlessName(req.body);
    if (!user) {
      return res.json(seamlessResponse({ ErrorCode: 1, ErrorMessage: 'Member not found' }));
    }

    if (String(user.status || '').toLowerCase() !== 'active') {
      return res.json(seamlessResponse({ AccountName: user.username, Balance: user.balance, ErrorCode: 2002, ErrorMessage: 'Member suspended' }));
    }

    return res.json(seamlessResponse({ AccountName: user.username, Balance: user.balance }));
  } catch (error) {
    return res.json(seamlessResponse({ ErrorCode: 1, ErrorMessage: error.message || 'Internal error' }));
  }
});

app.post(['/Deduct', '/deduct'], async (req, res) => {
  const client = await getClient();
  try {
    const companyKey = getBodyValue(req.body, 'CompanyKey');
    if (!isCompanyKeyValid(companyKey)) {
      return res.json(seamlessResponse({ ErrorCode: 4, ErrorMessage: 'Invalid CompanyKey' }));
    }

    const username = getBodyValue(req.body, 'Username', 'UserName', 'AccountName', 'Member', 'PlayerName');
    const transferCode = findTransferCode(req.body);
    const transactionId = findTransactionId(req.body);
    const amount = findAmount(req.body);

    if (!username || !transferCode || !transactionId || amount <= 0) {
      return res.json(seamlessResponse({ ErrorCode: 3, ErrorMessage: 'Invalid request data' }));
    }

    await client.query('BEGIN');
    const userResult = await client.query(
      `SELECT id, username, balance, status
       FROM users
       WHERE LOWER(username) = LOWER($1)
       LIMIT 1
       FOR UPDATE`,
      [String(username)]
    );

    if (!userResult.rows[0]) {
      await client.query('ROLLBACK');
      return res.json(seamlessResponse({ ErrorCode: 1, ErrorMessage: 'Member not found' }));
    }

    const user = userResult.rows[0];
    if (String(user.status || '').toLowerCase() !== 'active') {
      await client.query('ROLLBACK');
      return res.json(seamlessResponse({ AccountName: user.username, Balance: user.balance, ErrorCode: 2002, ErrorMessage: 'Member suspended' }));
    }

    const transferKey = buildTransferKey(req.body, transferCode);
    const txnKey = buildTxnKey(req.body, transferCode, transactionId);
    const existingBet = await loadSeamlessBet(transferKey, client);
    const currentBalance = Number(user.balance || 0);

    const existingKeyForTxn = await loadTransferKeyByTxn(txnKey, client);
    if (existingKeyForTxn) {
      const existing = await loadSeamlessBet(existingKeyForTxn, client);
      const existingTx = existing?.txs?.[String(transactionId)];

      if (
        existing &&
        existingTx &&
        existing.status === 'running' &&
        supportsUpgradeableDuplicateDeduct(req.body) &&
        amount > Number(existingTx.amount || 0)
      ) {
        const deltaAmount = Number((amount - Number(existingTx.amount || 0)).toFixed(5));
        if (currentBalance < deltaAmount) {
          await client.query('ROLLBACK');
          return res.json(seamlessResponse({ AccountName: user.username, Balance: currentBalance, ErrorCode: 5, ErrorMessage: 'Insufficient balance' }));
        }

        const nextBalance = Number((currentBalance - deltaAmount).toFixed(5));
        await client.query('UPDATE users SET balance = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [nextBalance, user.id]);
        await client.query(
          `INSERT INTO transactions (user_id, type, amount, status, reference_id, payment_method, metadata)
           VALUES ($1, 'withdrawal', $2, 'completed', $3, 'seamless_wallet', $4::jsonb)`,
          [
            user.id,
            deltaAmount,
            `SW-${transferCode}-${transactionId}-UPGRADE`,
            JSON.stringify({ action: 'seamless_deduct_upgrade', transfer_code: transferCode, transaction_id: transactionId, previous_amount: Number(existingTx.amount || 0), requested_amount: amount }),
          ]
        );

        const upgradedBet = {
          ...existing,
          stake_total: Number((Number(existing.stake_total || 0) + deltaAmount).toFixed(5)),
          current_stake: Number((Number(existing.current_stake || 0) + deltaAmount).toFixed(5)),
          last_action: 'deduct',
          balance_after: nextBalance,
          txs: {
            ...(existing.txs || {}),
            [String(transactionId)]: {
              ...existingTx,
              amount,
              status: 'running',
            },
          },
        };

        await saveSeamlessBet(client, existingKeyForTxn, upgradedBet, req.body, transferCode, transactionId);
        await client.query('COMMIT');
        return res.json(seamlessResponse({ AccountName: user.username, BetAmount: amount.toFixed(1), Balance: nextBalance }));
      }

      await client.query('ROLLBACK');
      const duplicateCode = getDuplicateDeductErrorCode(req.body, existing);
      return res.json(
        seamlessResponse({
          AccountName: user.username,
          Balance: Number(existing?.balance_after ?? user.balance),
          ErrorCode: duplicateCode,
          ErrorMessage: 'Duplicate transaction',
        })
      );
    }

    if (currentBalance < amount) {
      await client.query('ROLLBACK');
      return res.json(seamlessResponse({ AccountName: user.username, Balance: currentBalance, ErrorCode: 5, ErrorMessage: 'Insufficient balance' }));
    }

    const nextBalance = Number((currentBalance - amount).toFixed(5));
    await client.query('UPDATE users SET balance = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [nextBalance, user.id]);
    await client.query(
      `INSERT INTO transactions (user_id, type, amount, status, reference_id, payment_method, metadata)
       VALUES ($1, 'withdrawal', $2, 'completed', $3, 'seamless_wallet', $4::jsonb)`,
      [user.id, amount, `SW-${transferCode}-${transactionId}`, JSON.stringify({ action: 'seamless_deduct', transfer_code: transferCode, transaction_id: transactionId })]
    );

    if (existingBet) {
      const canReopenAfterPartialCancel =
        existingBet.status === 'void' &&
        existingBet.last_action === 'cancel' &&
        existingBet.last_cancel_all === false;

      if (existingBet.status !== 'running' && !canReopenAfterPartialCancel) {
        await client.query('ROLLBACK');
        return res.json(seamlessResponse({ AccountName: user.username, Balance: Number(existingBet.balance_after), ErrorCode: 5003, ErrorMessage: 'Duplicate transaction' }));
      }

      const updatedBet = {
        ...existingBet,
        status: 'running',
        stake_total: Number((Number(existingBet.stake_total || 0) + amount).toFixed(5)),
        current_stake: Number((Number(existingBet.current_stake || 0) + amount).toFixed(5)),
        last_action: 'deduct',
        balance_after: nextBalance,
        txs: {
          ...(existingBet.txs || {}),
          [String(transactionId)]: {
            amount,
            status: 'running',
          },
        },
      };
      await saveSeamlessBet(client, transferKey, updatedBet, req.body, transferCode, transactionId);
    } else {
      const bet = createSeamlessBet({
        user,
        payload: req.body,
        transferCode,
        transactionId,
        amount,
        balanceAfter: nextBalance,
      });
      await saveSeamlessBet(client, transferKey, bet, req.body, transferCode, transactionId);
    }

    await client.query('COMMIT');
    return res.json(seamlessResponse({ AccountName: user.username, BetAmount: amount.toFixed(1), Balance: nextBalance }));
  } catch (error) {
    await client.query('ROLLBACK');
    return res.json(seamlessResponse({ ErrorCode: 1, ErrorMessage: error.message || 'Internal error' }));
  } finally {
    client.release();
  }
});

app.post(['/Settle', '/settle'], async (req, res) => {
  const client = await getClient();
  try {
    const companyKey = getBodyValue(req.body, 'CompanyKey');
    if (!isCompanyKeyValid(companyKey)) {
      return res.json(seamlessResponse({ ErrorCode: 4, ErrorMessage: 'Invalid CompanyKey' }));
    }

    const username = getBodyValue(req.body, 'Username', 'UserName', 'AccountName', 'Member', 'PlayerName');
    const transferCode = findTransferCode(req.body);
    const rawWinLoss = getBodyValue(req.body, 'WinLoss', 'WinLoseAmount', 'Amount', 'PayoutAmount');
    const winLoss = Number(rawWinLoss || 0);
    if (!username || !transferCode) {
      return res.json(seamlessResponse({ ErrorCode: 3, ErrorMessage: 'Invalid request data' }));
    }

    await client.query('BEGIN');
    const userResult = await client.query(
      `SELECT id, username, balance, status
       FROM users
       WHERE LOWER(username) = LOWER($1)
       LIMIT 1
       FOR UPDATE`,
      [String(username)]
    );

    if (!userResult.rows[0]) {
      await client.query('ROLLBACK');
      return res.json(seamlessResponse({ ErrorCode: 1, ErrorMessage: 'Member not found' }));
    }

    const user = userResult.rows[0];
    const transferKey = buildTransferKey(req.body, transferCode);
    const existing = await loadSeamlessBet(transferKey, client);
    if (!existing) {
      await client.query('ROLLBACK');
      return res.json(seamlessResponse({ AccountName: user.username, Balance: user.balance, ErrorCode: 6, ErrorMessage: 'Reference not found' }));
    }

    if (existing && existing.status === 'settled') {
      await client.query('ROLLBACK');
      return res.json(seamlessResponse({ AccountName: user.username, Balance: existing.balance_after, ErrorCode: 2001, ErrorMessage: 'Already settled' }));
    }

    if (existing && existing.status === 'void') {
      await client.query('ROLLBACK');
      return res.json(seamlessResponse({ AccountName: user.username, Balance: existing.balance_after, ErrorCode: 2002, ErrorMessage: 'Already canceled' }));
    }

    const currentBalance = Number(user.balance || 0);
    const nextBalance = Number((currentBalance + winLoss).toFixed(5));
    await client.query('UPDATE users SET balance = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [nextBalance, user.id]);
    await client.query(
      `INSERT INTO transactions (user_id, type, amount, status, reference_id, payment_method, metadata)
       VALUES ($1, 'payout', $2, 'completed', $3, 'seamless_wallet', $4::jsonb)`,
      [user.id, Math.abs(winLoss), `SW-${transferCode}-SETTLE`, JSON.stringify({ action: 'seamless_settle', win_loss: winLoss, transfer_code: transferCode })]
    );

    const updated = {
      ...existing,
      status: 'settled',
      balance_after: nextBalance,
      settled_win_loss: Number(winLoss.toFixed(5)),
      settled_count: Number(existing.settled_count || 0) + 1,
      last_action: 'settle',
      rollback_snapshot: {
        source_action: 'settle',
        status: existing.status,
        current_stake: Number(existing.current_stake || 0),
        settled_win_loss: Number(existing.settled_win_loss || 0),
        txs: cloneSeamlessTxs(existing.txs),
      },
      txs: Object.fromEntries(
        Object.entries(existing.txs || {}).map(([id, tx]) => [
          id,
          {
            ...tx,
            status: tx?.status === 'void' ? 'void' : 'settled',
          },
        ])
      ),
    };
    await saveSeamlessBet(client, transferKey, updated, req.body, transferCode, existing.primary_transaction_id || findTransactionId(req.body));

    await client.query('COMMIT');
    return res.json(seamlessResponse({ AccountName: user.username, Balance: nextBalance }));
  } catch (error) {
    await client.query('ROLLBACK');
    return res.json(seamlessResponse({ ErrorCode: 1, ErrorMessage: error.message || 'Internal error' }));
  } finally {
    client.release();
  }
});

app.post(['/Cancel', '/cancel'], async (req, res) => {
  const client = await getClient();
  try {
    const companyKey = getBodyValue(req.body, 'CompanyKey');
    if (!isCompanyKeyValid(companyKey)) {
      return res.json(seamlessResponse({ ErrorCode: 4, ErrorMessage: 'Invalid CompanyKey' }));
    }

    const username = getBodyValue(req.body, 'Username', 'UserName', 'AccountName', 'Member', 'PlayerName');
    const transferCode = findTransferCode(req.body);
    const transactionId = findTransactionId(req.body);
    const isCancelAll = Boolean(getBodyValue(req.body, 'IsCancelAll'));
    if (!username || !transferCode) {
      return res.json(seamlessResponse({ ErrorCode: 3, ErrorMessage: 'Invalid request data' }));
    }

    await client.query('BEGIN');
    const userResult = await client.query(
      `SELECT id, username, balance
       FROM users
       WHERE LOWER(username) = LOWER($1)
       LIMIT 1
       FOR UPDATE`,
      [String(username)]
    );

    if (!userResult.rows[0]) {
      await client.query('ROLLBACK');
      return res.json(seamlessResponse({ ErrorCode: 1, ErrorMessage: 'Member not found' }));
    }

    const user = userResult.rows[0];
    const transferKey = buildTransferKey(req.body, transferCode);
    const existing = await loadSeamlessBet(transferKey, client);
    if (!existing) {
      await client.query('ROLLBACK');
      return res.json(seamlessResponse({ AccountName: user.username, Balance: user.balance, ErrorCode: 6, ErrorMessage: 'Reference not found' }));
    }

    if (existing.status === 'void') {
      await client.query('ROLLBACK');
      return res.json(seamlessResponse({ AccountName: user.username, Balance: existing.balance_after, ErrorCode: 2002, ErrorMessage: 'Already canceled' }));
    }

    const currentBalance = Number(user.balance || 0);
    let netChange = 0;
    let resolvedCancelTxnId = transactionId;
    let canceledTxIds = [];
    const previousTxs = cloneSeamlessTxs(existing.txs);
    const previousStatus = String(existing.status || 'running');
    const previousStake = Number(existing.current_stake || 0);
    const previousSettledWinLoss = Number(existing.settled_win_loss || 0);

    if (!isCancelAll && transactionId && existing.status === 'running') {
      const tx = existing.txs?.[String(transactionId)];
      if (!tx) {
        await client.query('ROLLBACK');
        return res.json(seamlessResponse({ AccountName: user.username, Balance: existing.balance_after, ErrorCode: 6, ErrorMessage: 'Reference not found' }));
      }
      if (tx && tx.status === 'void') {
        await client.query('ROLLBACK');
        return res.json(seamlessResponse({ AccountName: user.username, Balance: existing.balance_after, ErrorCode: 2002, ErrorMessage: 'Already canceled' }));
      }
      if (tx) {
        netChange = Number(tx.amount || 0);
        resolvedCancelTxnId = String(transactionId);
        canceledTxIds = [resolvedCancelTxnId];
      }
    } else {
      const stake = Number(existing.current_stake || 0);
      const settledAmount = Number(existing.settled_win_loss || 0);
      netChange = existing.status === 'settled' ? stake - settledAmount : stake;
      canceledTxIds = Object.entries(existing.txs || {})
        .filter(([, tx]) => String(tx?.status || '') !== 'void')
        .map(([id]) => id);
    }

    const nextBalance = Number((currentBalance + netChange).toFixed(5));
    await client.query('UPDATE users SET balance = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [nextBalance, user.id]);
    await client.query(
      `INSERT INTO transactions (user_id, type, amount, status, reference_id, payment_method, metadata)
       VALUES ($1, 'payout', $2, 'completed', $3, 'seamless_wallet', $4::jsonb)`,
      [user.id, Math.abs(netChange), `SW-${transferCode}-CANCEL`, JSON.stringify({ action: 'seamless_cancel', net_change: netChange, transfer_code: transferCode, transaction_id: transactionId || null, is_cancel_all: isCancelAll })]
    );

    const nextTxs = cloneSeamlessTxs(existing.txs);
    if (!isCancelAll && resolvedCancelTxnId && nextTxs[String(resolvedCancelTxnId)]) {
      nextTxs[String(resolvedCancelTxnId)] = {
        ...nextTxs[String(resolvedCancelTxnId)],
        status: 'void',
      };
    } else {
      Object.keys(nextTxs).forEach((id) => {
        nextTxs[id] = {
          ...nextTxs[id],
          status: 'void',
        };
      });
    }

    const runningStake = Object.values(nextTxs)
      .filter((tx) => tx.status === 'running')
      .reduce((sum, tx) => sum + Number(tx.amount || 0), 0);

    await saveSeamlessBet(client, transferKey, {
      ...existing,
      status: runningStake > 0 ? 'running' : 'void',
      current_stake: Number(runningStake.toFixed(5)),
      cancel_count: Number(existing.cancel_count || 0) + 1,
      last_cancel_all: Boolean(isCancelAll),
      last_cancel_refund: Number(netChange.toFixed(5)),
      last_action: 'cancel',
      rollback_snapshot: {
        source_action: 'cancel',
        status: previousStatus,
        current_stake: previousStake,
        settled_win_loss: previousSettledWinLoss,
        txs: previousTxs,
        canceled_tx_ids: canceledTxIds,
      },
      balance_after: nextBalance,
      txs: nextTxs,
    }, req.body, transferCode, existing.primary_transaction_id || transactionId);

    await client.query('COMMIT');
    return res.json(seamlessResponse({ AccountName: user.username, Balance: nextBalance }));
  } catch (error) {
    await client.query('ROLLBACK');
    return res.json(seamlessResponse({ ErrorCode: 1, ErrorMessage: error.message || 'Internal error' }));
  } finally {
    client.release();
  }
});

app.post(['/Rollback', '/rollback'], async (req, res) => {
  const client = await getClient();
  try {
    const companyKey = getBodyValue(req.body, 'CompanyKey');
    if (!isCompanyKeyValid(companyKey)) {
      return res.json(seamlessResponse({ ErrorCode: 4, ErrorMessage: 'Invalid CompanyKey' }));
    }

    const username = getBodyValue(req.body, 'Username', 'UserName', 'AccountName', 'Member', 'PlayerName');
    const transferCode = findTransferCode(req.body);
    if (!username || !transferCode) {
      return res.json(seamlessResponse({ ErrorCode: 3, ErrorMessage: 'Invalid request data' }));
    }

    await client.query('BEGIN');
    const userResult = await client.query(
      `SELECT id, username, balance
       FROM users
       WHERE LOWER(username) = LOWER($1)
       LIMIT 1
       FOR UPDATE`,
      [String(username)]
    );

    if (!userResult.rows[0]) {
      await client.query('ROLLBACK');
      return res.json(seamlessResponse({ ErrorCode: 1, ErrorMessage: 'Member not found' }));
    }

    const user = userResult.rows[0];
    const transferKey = buildTransferKey(req.body, transferCode);
    const existing = await loadSeamlessBet(transferKey, client);
    if (!existing) {
      await client.query('ROLLBACK');
      return res.json(seamlessResponse({ AccountName: user.username, Balance: user.balance, ErrorCode: 6, ErrorMessage: 'Reference not found' }));
    }

    if (existing.status === 'running') {
      await client.query('ROLLBACK');
      return res.json(seamlessResponse({ AccountName: user.username, Balance: existing.balance_after, ErrorCode: 2003, ErrorMessage: 'Already rollback' }));
    }

    const currentBalance = Number(user.balance || 0);
    const stake = Number(existing.current_stake || 0);
    const winLoss = Number(existing.settled_win_loss || 0);
    let nextBalance = currentBalance;
    let metadata = { action: 'seamless_rollback', win_loss: winLoss };
    const snapshot = existing.rollback_snapshot || null;
    let restoredStatus = snapshot?.status || 'running';
    let restoredStake = Number((snapshot?.current_stake ?? stake).toFixed(5));
    let restoredSettledWinLoss = Number((snapshot?.settled_win_loss ?? 0).toFixed(5));
    let restoredTxs = cloneSeamlessTxs(snapshot?.txs || existing.txs);

    if (existing.status === 'settled') {
      nextBalance = Number((currentBalance - winLoss).toFixed(5));
    } else if (existing.status === 'void' && existing.last_action === 'cancel') {
      const canceledTxIds = Array.isArray(snapshot?.canceled_tx_ids)
        ? snapshot.canceled_tx_ids.map((id) => String(id))
        : [];
      const reopenStakeFromTxs = canceledTxIds.reduce((sum, id) => {
        const txAmount = Number(snapshot?.txs?.[id]?.amount || existing.txs?.[id]?.amount || 0);
        return sum + txAmount;
      }, 0);
      const reopenStake = Number(
        (
          reopenStakeFromTxs ||
          Math.max(0, Number(snapshot?.current_stake || 0) - Number(existing.current_stake || 0))
        ).toFixed(5)
      );
      nextBalance = Number((currentBalance - reopenStake).toFixed(5));
      metadata = { action: 'seamless_rollback_cancel_reopen', stake: reopenStake };

      // Rollback after cancel must reopen the bet to Running, even if cancel happened on a settled bet.
      restoredStatus = 'running';
      restoredSettledWinLoss = 0;

      if (snapshot?.source_action === 'cancel' && snapshot?.status === 'settled') {
        restoredTxs = Object.fromEntries(
          Object.entries(restoredTxs).map(([id, tx]) => [
            id,
            tx ? { ...tx, status: 'running' } : tx,
          ])
        );
      }
    } else {
      await client.query('ROLLBACK');
      return res.json(seamlessResponse({ AccountName: user.username, Balance: existing.balance_after, ErrorCode: 6, ErrorMessage: 'Cannot rollback current status' }));
    }

    await client.query('UPDATE users SET balance = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [nextBalance, user.id]);
    await client.query(
      `INSERT INTO transactions (user_id, type, amount, status, reference_id, payment_method, metadata)
       VALUES ($1, 'withdrawal', $2, 'completed', $3, 'seamless_wallet', $4::jsonb)`,
      [user.id, Math.abs(currentBalance - nextBalance), `SW-${transferCode}-ROLLBACK`, JSON.stringify({ ...metadata, transfer_code: transferCode })]
    );

    await saveSeamlessBet(client, transferKey, {
      ...existing,
      status: restoredStatus,
      current_stake: restoredStake,
      settled_win_loss: restoredSettledWinLoss,
      rollback_count: Number(existing.rollback_count || 0) + 1,
      last_action: 'rollback',
      balance_after: nextBalance,
      rollback_snapshot: null,
      txs: restoredTxs,
    }, req.body, transferCode, existing.primary_transaction_id || findTransactionId(req.body));

    await client.query('COMMIT');
    return res.json(seamlessResponse({ AccountName: user.username, Balance: nextBalance }));
  } catch (error) {
    await client.query('ROLLBACK');
    return res.json(seamlessResponse({ ErrorCode: 1, ErrorMessage: error.message || 'Internal error' }));
  } finally {
    client.release();
  }
});

app.post(['/Bonus', '/bonus'], async (req, res) => {
  const client = await getClient();
  try {
    const companyKey = getBodyValue(req.body, 'CompanyKey');
    if (!isCompanyKeyValid(companyKey)) {
      return res.json(seamlessResponse({ ErrorCode: 2003, ErrorMessage: 'Invalid CompanyKey' }));
    }

    const username = getBodyValue(req.body, 'Username', 'UserName', 'AccountName', 'Member', 'PlayerName');
    const transferCode = findTransferCode(req.body) || findReferenceNo(req.body) || `BONUS-${Date.now()}`;
    const transactionId = findTransactionId(req.body) || transferCode;
    const amount = findAmount(req.body);
    if (!username || amount <= 0) {
      return res.json(seamlessResponse({ ErrorCode: 1, ErrorMessage: 'Invalid request data' }));
    }

    await client.query('BEGIN');
    const userResult = await client.query(
      `SELECT id, username, balance
       FROM users
       WHERE LOWER(username) = LOWER($1)
       LIMIT 1
       FOR UPDATE`,
      [String(username)]
    );

    if (!userResult.rows[0]) {
      await client.query('ROLLBACK');
      return res.json(seamlessResponse({ ErrorCode: 2001, ErrorMessage: 'Member not found' }));
    }

    const user = userResult.rows[0];
    const transferKey = buildTransferKey(req.body, transferCode);
    const existingByTransfer = await loadSeamlessBet(transferKey, client);
    if (existingByTransfer) {
      await client.query('ROLLBACK');
      return res.json(seamlessResponse({ AccountName: user.username, Balance: existingByTransfer.balance_after, ErrorCode: 5003, ErrorMessage: 'Duplicate transaction' }));
    }

    const currentBalance = Number(user.balance || 0);
    const nextBalance = Number((currentBalance + amount).toFixed(5));
    await client.query('UPDATE users SET balance = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [nextBalance, user.id]);
    await client.query(
      `INSERT INTO transactions (user_id, type, amount, status, reference_id, payment_method, metadata)
       VALUES ($1, 'deposit', $2, 'completed', $3, 'seamless_wallet', $4::jsonb)`,
      [user.id, amount, `SW-${transferCode}-BONUS`, JSON.stringify({ action: 'seamless_bonus', transfer_code: transferCode, transaction_id: transactionId })]
    );

    const bet = {
      username: user.username,
      user_id: user.id,
      amount,
      status: 'settled',
      balance_after: nextBalance,
      payout: amount,
      transfer_code: transferCode,
      primary_transaction_id: transactionId,
      txs: {
        [String(transactionId)]: {
          amount,
          status: 'settled',
        },
      },
      current_stake: 0,
      settled_win_loss: amount,
      return_stake_history: {},
    };
    await saveSeamlessBet(client, transferKey, bet, req.body, transferCode, transactionId);

    await client.query('COMMIT');
    return res.json(seamlessResponse({ AccountName: user.username, Balance: nextBalance }));
  } catch (error) {
    await client.query('ROLLBACK');
    return res.json(seamlessResponse({ ErrorCode: 1, ErrorMessage: error.message || 'Internal error' }));
  } finally {
    client.release();
  }
});

app.post(['/GetBetStatus', '/getbetstatus'], async (req, res) => {
  try {
    const companyKey = getBodyValue(req.body, 'CompanyKey');
    if (!isCompanyKeyValid(companyKey)) {
      return res.json({ ErrorCode: '4', ErrorMessage: 'Invalid CompanyKey' });
    }

    const username = getBodyValue(req.body, 'Username', 'UserName', 'AccountName', 'Member', 'PlayerName');
    if (!username) {
      return res.json({ ErrorCode: '3', ErrorMessage: 'Username is required' });
    }

    const transferCode = findTransferCode(req.body);
    const transactionId = findTransactionId(req.body);
    const located = await getBetByPayload(req.body);
    const existing = located.bet;
    if (!existing) {
      return res.json({
        TransferCode: transferCode,
        TransactionId: transactionId || transferCode,
        Status: 'Unknown',
        ErrorCode: '6',
        ErrorMessage: 'Bet not found',
      });
    }

    const requestedTxId = transactionId ? String(transactionId) : '';
    const txEntry = requestedTxId ? existing.txs?.[requestedTxId] : null;

    if (requestedTxId && !txEntry) {
      return res.json({
        TransferCode: existing.transfer_code || transferCode,
        TransactionId: requestedTxId,
        Status: 'Unknown',
        ErrorCode: '6',
        ErrorMessage: 'Bet not found',
      });
    }

    const resolvedStatus = txEntry
      ? mapSeamlessStatus(txEntry.status || existing.status)
      : mapSeamlessStatus(existing.status);

    return res.json({
      TransferCode: existing.transfer_code || transferCode,
      TransactionId: transactionId || existing.primary_transaction_id || existing.transfer_code || transferCode,
      Status: resolvedStatus,
      ErrorCode: '0',
      ErrorMessage: 'No Error',
    });
  } catch (error) {
    return res.json({ ErrorCode: '1', ErrorMessage: error.message || 'Internal error' });
  }
});

app.post(['/ReturnStake', '/returnstake'], async (req, res) => {
  const client = await getClient();
  try {
    const companyKey = getBodyValue(req.body, 'CompanyKey');
    if (!isCompanyKeyValid(companyKey)) {
      return res.json(seamlessResponse({ ErrorCode: 4, ErrorMessage: 'Invalid CompanyKey' }));
    }

    const username = getBodyValue(req.body, 'Username', 'UserName', 'AccountName', 'Member', 'PlayerName');
    const transferCode = findTransferCode(req.body);
    const transactionId = findTransactionId(req.body);
    const currentStake = findNumeric(req.body, 'CurrentStake');

    if (!username || !transferCode || !transactionId) {
      return res.json(seamlessResponse({ ErrorCode: 3, ErrorMessage: 'Invalid request data' }));
    }

    await client.query('BEGIN');
    const userResult = await client.query(
      `SELECT id, username, balance
       FROM users
       WHERE LOWER(username) = LOWER($1)
       LIMIT 1
       FOR UPDATE`,
      [String(username)]
    );

    if (!userResult.rows[0]) {
      await client.query('ROLLBACK');
      return res.json(seamlessResponse({ ErrorCode: 1, ErrorMessage: 'Member not found' }));
    }

    const user = userResult.rows[0];
    const transferKey = buildTransferKey(req.body, transferCode);
    const bet = await loadSeamlessBet(transferKey, client);
    if (!bet) {
      await client.query('ROLLBACK');
      return res.json(seamlessResponse({ AccountName: user.username, Balance: user.balance, ErrorCode: 6, ErrorMessage: 'Reference not found' }));
    }

    if (bet.status === 'settled') {
      await client.query('ROLLBACK');
      return res.json(seamlessResponse({ AccountName: user.username, Balance: bet.balance_after, ErrorCode: 2001, ErrorMessage: 'Already settled' }));
    }

    if (bet.status === 'void') {
      await client.query('ROLLBACK');
      return res.json(seamlessResponse({ AccountName: user.username, Balance: bet.balance_after, ErrorCode: 2002, ErrorMessage: 'Already canceled' }));
    }

    const requestKey = `${transactionId}:${currentStake}`;
    if (bet.return_stake_history?.[requestKey]) {
      await client.query('ROLLBACK');
      return res.json(seamlessResponse({ AccountName: user.username, Balance: bet.balance_after, ErrorCode: 5003, ErrorMessage: 'Duplicate transaction' }));
    }

    const existingStake = Number(bet.current_stake || 0);
    if (currentStake > existingStake || currentStake < 0) {
      await client.query('ROLLBACK');
      return res.json(seamlessResponse({ AccountName: user.username, Balance: bet.balance_after, ErrorCode: 3, ErrorMessage: 'Invalid current stake' }));
    }

    const refund = Number((existingStake - currentStake).toFixed(5));
    const userBalance = Number(user.balance || 0);
    const nextBalance = Number((userBalance + refund).toFixed(5));

    if (refund > 0) {
      await client.query('UPDATE users SET balance = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [nextBalance, user.id]);
      await client.query(
        `INSERT INTO transactions (user_id, type, amount, status, reference_id, payment_method, metadata)
         VALUES ($1, 'deposit', $2, 'completed', $3, 'seamless_wallet', $4::jsonb)`,
        [user.id, refund, `SW-${transferCode}-RETURNSTAKE`, JSON.stringify({ action: 'seamless_return_stake', transfer_code: transferCode, transaction_id: transactionId, from_stake: existingStake, to_stake: currentStake })]
      );
    }

    await saveSeamlessBet(client, transferKey, {
      ...bet,
      current_stake: Number(currentStake.toFixed(5)),
      balance_after: nextBalance,
      last_action: 'returnstake',
      return_stake_history: {
        ...(bet.return_stake_history || {}),
        [requestKey]: true,
      },
    }, req.body, transferCode, transactionId);

    await client.query('COMMIT');
    return res.json(seamlessResponse({ AccountName: user.username, Balance: nextBalance }));
  } catch (error) {
    await client.query('ROLLBACK');
    return res.json(seamlessResponse({ ErrorCode: 1, ErrorMessage: error.message || 'Internal error' }));
  } finally {
    client.release();
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const startServer = async () => {
  try {
    await initializeAdminSchema();
    app.listen(PORT, () => {
      console.log(`Betwin API running on http://localhost:${PORT}`);
      console.log(`Database: ${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`);
    });
  } catch (error) {
    console.error('Failed to initialize schema:', error.message);
    process.exit(1);
  }
};

startServer();
