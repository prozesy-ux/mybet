import pkg from 'pg';

const base = 'https://mybet-backend-xypv.onrender.com';
const companyKey = 'AC5568ADDCB94EEFA56BC4BCB2600C8C';
const n = Date.now();
const email = `proof${n}@example.com`;
const phone = `017${String(n).slice(-8)}`;
const password = 'TestPass123!';

const registerRes = await fetch(`${base}/api/auth/register`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  body: JSON.stringify({ email, phone, password }),
});
const registerText = await registerRes.text();
let registerJson = {};
try { registerJson = JSON.parse(registerText); } catch { registerJson = { raw: registerText }; }

if (!registerRes.ok) {
  console.log(JSON.stringify({ ok: false, step: 'register', status: registerRes.status, body: registerJson }, null, 2));
  process.exit(0);
}

const token = registerJson.token;
const user = registerJson.user || {};

// Set a deterministic non-zero balance for parity check.
const { Client } = pkg;
const client = new Client({
  connectionString: 'postgresql://postgres.hlimqihowlyeolpgsxfk:BetWin%402.012@aws-1-ap-south-1.pooler.supabase.com:5432/postgres',
  ssl: { rejectUnauthorized: false },
});
await client.connect();
await client.query('UPDATE users SET balance = $1 WHERE id = $2', ['321.45', user.id]);
await client.end();

const meRes = await fetch(`${base}/api/auth/me`, {
  headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
});
const meJson = await meRes.json();

const seamlessUsername = user.seamlessUsername || user.playerAccountId || user.username;
const getBalanceRes = await fetch(`${base}/GetBalance`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  body: JSON.stringify({
    CompanyKey: companyKey,
    Username: seamlessUsername,
    ProductType: 1,
    GameType: 1,
    Gpid: -1,
  }),
});
const getBalanceJson = await getBalanceRes.json();

const launchRes = await fetch(`${base}/api/auth/sports/launch`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, Accept: 'application/json' },
  body: JSON.stringify({ portfolio: 'SportsBook' }),
});
const launchText = await launchRes.text();
let launchJson = {};
try { launchJson = JSON.parse(launchText); } catch { launchJson = { raw: launchText }; }

console.log(JSON.stringify({
  ok: true,
  user: {
    id: user.id,
    username: user.username,
    seamlessUsername: user.seamlessUsername,
    playerSync: registerJson.playerSync || null,
  },
  balances: {
    app: meJson?.balance,
    seamless: getBalanceJson?.Balance,
    same: String(meJson?.balance) === String(getBalanceJson?.Balance),
  },
  gameplay: {
    launchStatus: launchRes.status,
    launchOk: launchRes.ok,
    launchHasUrl: Boolean(launchJson?.url),
    launchError: launchJson?.error || null,
  },
}, null, 2));
