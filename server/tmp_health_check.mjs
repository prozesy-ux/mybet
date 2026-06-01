const base = 'https://mybet-backend-xypv.onrender.com';
const r = await fetch(base + '/api/health').catch(()=>null);
if (!r) { console.log('health: no response'); process.exit(0); }
const txt = await r.text();
console.log('health status', r.status);
console.log('health body', txt.slice(0, 200));
