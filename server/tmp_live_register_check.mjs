const base = 'https://mybet-backend-xypv.onrender.com';
const n = Date.now();
const payload = {
  email: `jsonok${n}@example.com`,
  phone: `017${String(n).slice(-8)}`,
  password: 'TestPass123!'
};
const res = await fetch(`${base}/api/auth/register`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
  body: JSON.stringify(payload)
});
const text = await res.text();
console.log('status', res.status);
console.log(text);
