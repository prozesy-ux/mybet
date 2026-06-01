const base = 'https://mybet-backend-xypv.onrender.com';
const loginRes = await fetch(`${base}/api/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  body: JSON.stringify({ email: 'gpzes.ui.17801637021@example.com', password: 'TestPass123!' })
});
const loginJson = await loginRes.json();
if (!loginRes.ok) {
  console.log(JSON.stringify({ ok:false, step:'siteLogin', status:loginRes.status, body:loginJson }, null, 2));
  process.exit(0);
}
const token = loginJson.token;
const launchRes = await fetch(`${base}/api/auth/sports/launch`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, Accept: 'application/json' },
  body: JSON.stringify({ portfolio: 'SportsBook' })
});
const txt = await launchRes.text();
let launchJson = {}; try { launchJson = JSON.parse(txt); } catch { launchJson = { raw: txt.slice(0,200) }; }
console.log(JSON.stringify({
  siteLoginOk: true,
  username: loginJson?.user?.username,
  seamlessUsername: loginJson?.user?.seamlessUsername,
  launchStatus: launchRes.status,
  launchOk: launchRes.ok,
  launchHasUrl: !!launchJson?.url,
  launchError: launchJson?.error || null
}, null, 2));
