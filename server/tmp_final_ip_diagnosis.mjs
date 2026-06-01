const base = 'https://mybet-backend-xypv.onrender.com';
const ts = Date.now();
const email = `ip-test.${ts}@example.com`;
const password = 'Pass@1234A';
const username = `iptest${ts}`;
const payload = {username, password, email, fullName: 'IP Test', phone: '01800000000', country: 'Bangladesh', dateOfBirth: '01/01/1995'};

// Register first
const reg = await fetch(base + '/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
});
const regJson = await reg.json();
console.log('Register:', {
  status: reg.status,
  playerSyncPending: regJson.playerSync?.pending,
  playerSyncReason: regJson.playerSync?.reason,
  playerSyncMessage: regJson.playerSync?.message,
  seamlessUsernameAssigned: !!regJson.user?.seamlessUsername
});

// Then try login
const login = await fetch(base + '/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
const loginJson = await login.json();

// Then try launch
const launch = await fetch(base + '/api/auth/sports/launch', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${loginJson.token}`
  },
  body: JSON.stringify({ portfolio: 'SportsBook' })
});
const launchJson = await launch.json();
console.log('Launch:', {
  status: launch.status,
  error: launchJson.error,
  attempts: launchJson.details?.attempts || null,
  attemptDetails: launchJson.details?.attempts?.map(a => ({ portfolio: a.portfolio, error_msg: a.error?.msg })) || null
});
