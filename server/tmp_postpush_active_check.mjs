const base = 'https://mybet-backend-xypv.onrender.com';
const companyKey = 'AC5568ADDCB94EEFA56BC4BCB2600C8C';

const loginRes = await fetch(`${base}/api/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  body: JSON.stringify({ email: 'swrun_1780138009676@example.com', password: 'TestPass123!' }),
});
const loginJson = await loginRes.json();
if (!loginRes.ok) {
  console.log(JSON.stringify({ ok: false, step: 'login', status: loginRes.status, body: loginJson }, null, 2));
  process.exit(0);
}

const token = loginJson.token;
const user = loginJson.user;
const seamlessUsername = user.seamlessUsername || user.playerAccountId || user.username;

const meRes = await fetch(`${base}/api/auth/me`, {
  headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
});
const meJson = await meRes.json();

const getBalanceRes = await fetch(`${base}/GetBalance`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  body: JSON.stringify({ CompanyKey: companyKey, Username: seamlessUsername, ProductType: 1, GameType: 1, Gpid: -1 }),
});
const getBalanceJson = await getBalanceRes.json();

const launchRes = await fetch(`${base}/api/auth/sports/launch`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, Accept: 'application/json' },
  body: JSON.stringify({ portfolio: 'SportsBook' }),
});
const launchText = await launchRes.text();
let launchJson = {}; try { launchJson = JSON.parse(launchText); } catch { launchJson = { raw: launchText }; }

console.log(JSON.stringify({
  ok: true,
  user: { id: user.id, username: user.username, seamlessUsername },
  balances: {
    app: String(meJson?.user?.balance ?? ''),
    seamless: String(getBalanceJson?.Balance ?? ''),
    same: String(meJson?.user?.balance ?? '') === String(getBalanceJson?.Balance ?? ''),
  },
  gameplay: {
    launchStatus: launchRes.status,
    launchOk: launchRes.ok,
    launchHasUrl: Boolean(launchJson?.url),
    launchError: launchJson?.error || null,
  }
}, null, 2));
