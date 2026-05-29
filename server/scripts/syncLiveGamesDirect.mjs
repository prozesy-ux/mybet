import path from 'path';
import dotenv from 'dotenv';
import pg from 'pg';

const { Client } = pg;

dotenv.config({ path: path.resolve(process.cwd(), '../.env') });
dotenv.config();

const toCasinoCategory = (newGameType) => {
  const type = Number(newGameType);
  if (!Number.isFinite(type)) return 'other';
  if (type >= 100 && type < 200) return 'live';
  if (type >= 200 && type < 300) return 'slots';
  if (type >= 300 && type < 400) return 'table';
  if (type === 9 || type === 10 || type === 11) return 'live';
  return 'other';
};

const toPublicIconUrl = (rawUrl) => {
  const url = String(rawUrl || '').trim();
  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith('/')) return `https://img-3-2.cdn568.net${url}`;
  return `https://img-3-2.cdn568.net/${url}`;
};

const buildDbConfig = () => {
  const connectionString =
    process.env.DATABASE_URL ||
    `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;

  return {
    connectionString,
    ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
  };
};

const externalConfig = () => ({
  baseUrl: String(process.env.SW_API_BASE_URL || '').replace(/\/+$/, ''),
  companyKey: String(process.env.SW_API_COMPANY_KEY || '').trim(),
  serverId: String(process.env.SW_API_SERVER_ID || 'GPZES01').trim(),
});

const main = async () => {
  const ext = externalConfig();
  if (!ext.baseUrl || !ext.companyKey || !ext.serverId) {
    throw new Error('Missing SW API configuration');
  }

  const remoteRes = await fetch(`${ext.baseUrl}/web-root/restricted/information/get-game-list.aspx`, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ CompanyKey: ext.companyKey, ServerId: ext.serverId, GpId: 0, IsGetAll: true }),
  });

  const remote = await remoteRes.json();
  const apiErrorId = Number(remote?.error?.id ?? -1);
  if (apiErrorId !== 0) {
    throw new Error(String(remote?.error?.msg || 'Provider game list error'));
  }

  const sourceRows = Array.isArray(remote?.seamlessGameProviderGames)
    ? remote.seamlessGameProviderGames
    : [];

  const normalized = [];
  for (let i = 0; i < sourceRows.length; i++) {
    const item = sourceRows[i] || {};
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

    normalized.push({
      gp_id: gpId,
      upstream_game_id: upstreamGameId,
      title,
      provider,
      category: toCasinoCategory(item.newGameType),
      image_url: imageUrl,
      game_url: '#',
      sort_order: Number.isFinite(Number(item.rank)) ? Number(item.rank) : i,
      is_active: Boolean(item.isEnabled ?? true) && Boolean(item.isProviderOnline ?? true) && !Boolean(item.isMaintain ?? false),
    });
  }

  const client = new Client(buildDbConfig());
  await client.connect();

  try {
    await client.query('BEGIN');
    await client.query('SET LOCAL statement_timeout = 0');
    await client.query('DELETE FROM casino_games WHERE gp_id IS NULL OR upstream_game_id IS NULL');

    const batchSize = 400;
    let total = 0;

    for (let offset = 0; offset < normalized.length; offset += batchSize) {
      const chunk = normalized.slice(offset, offset + batchSize);
      const params = [];
      const valuesSql = chunk
        .map((row, idx) => {
          const b = idx * 9;
          params.push(
            row.gp_id,
            row.upstream_game_id,
            row.title,
            row.provider,
            row.category,
            row.image_url,
            row.game_url,
            row.sort_order,
            row.is_active
          );
          return `($${b + 1},$${b + 2},$${b + 3},$${b + 4},$${b + 5},$${b + 6},$${b + 7},$${b + 8},$${b + 9})`;
        })
        .join(',');

      await client.query(
        `INSERT INTO casino_games (
           gp_id, upstream_game_id, title, provider, category, image_url, game_url, sort_order, is_active
         ) VALUES ${valuesSql}
         ON CONFLICT (gp_id, upstream_game_id)
         DO UPDATE SET
           title = EXCLUDED.title,
           provider = EXCLUDED.provider,
           category = EXCLUDED.category,
           image_url = EXCLUDED.image_url,
           game_url = EXCLUDED.game_url,
           sort_order = EXCLUDED.sort_order,
           is_active = EXCLUDED.is_active,
           updated_at = CURRENT_TIMESTAMP`,
        params
      );

      total += chunk.length;
      if (total % 2000 === 0) {
        console.log(`progress=${total}`);
      }
    }

    await client.query('COMMIT');

    const countRes = await client.query('SELECT COUNT(*)::int AS c FROM casino_games WHERE is_active = true');
    console.log(`source_count=${sourceRows.length}`);
    console.log(`normalized_count=${normalized.length}`);
    console.log(`active_count=${Number(countRes.rows[0]?.c || 0)}`);
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    await client.end();
  }
};

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
