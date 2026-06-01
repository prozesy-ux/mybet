const base = 'https://mybet-backend-xypv.onrender.com';
const loginRes = await fetch(`${base}/api/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  body: JSON.stringify({ email: 'gpzes.ui.17801637021@example.com', password: 'TestPass123!' })
});
const loginJson = await loginRes.json().catch(()=>({}));
if (!loginRes.ok) {
  console.log(JSON.stringify({ step:'login', status: loginRes.status, body: loginJson }, null, 2));
  process.exit(0);
}
const launchRes = await fetch(`${base}/api/auth/sports/launch`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${loginJson.token}` },
  body: JSON.stringify({ portfolio: 'SportsBook' })
});
const launchJson = await launchRes.json().catch(()=>({}));
console.log(JSON.stringify({
  loginStatus: loginRes.status,
  userId: loginJson?.user?.id,
  seamlessUsernameFromLogin: loginJson?.user?.seamlessUsername ?? null,
  launchStatus: launchRes.status,
  launchOk: launchRes.ok,
  launchHasUrl: !!launchJson?.url,
  launchError: launchJson?.error || null
}, null, 2));
