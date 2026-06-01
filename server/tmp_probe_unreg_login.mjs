const base = 'http://ex-api-yy2.ttbbyyllyy.com';
const username = `probe_unreg_${Date.now()}`;
const payload = {
  CompanyKey: 'AC5568ADDCB94EEFA56BC4BCB2600C8C',
  ServerId: 'GPZES01',
  Username: username,
  Portfolio: 'SportsBook',
  GpId: 0,
  GameId: 0,
  Device: 'd',
  Lang: 'en'
};
const res = await fetch(`${base}/web-root/restricted/player/v2/login.aspx`, {
  method: 'POST', headers: { 'Content-Type':'application/json', Accept:'application/json' }, body: JSON.stringify(payload)
});
const txt = await res.text();
let data; try { data = JSON.parse(txt); } catch { data = { raw: txt }; }
console.log(JSON.stringify({ username, status: res.status, data }, null, 2));
