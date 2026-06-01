const base = 'http://ex-api-yy2.ttbbyyllyy.com';
const payload = {
  CompanyKey: 'AC5568ADDCB94EEFA56BC4BCB2600C8C',
  ServerId: 'GPZES01',
  Username: 'gpz_82_gpzesui17801637021_067',
  Portfolio: 'SportsBook',
  GpId: 0,
  GameId: 0,
  Device: 'd',
  Lang: 'en'
};
const res = await fetch(`${base}/web-root/restricted/player/v2/login.aspx`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  body: JSON.stringify(payload)
});
const txt = await res.text();
let data; try { data = JSON.parse(txt); } catch { data = { raw: txt.slice(0,200) }; }
console.log(JSON.stringify({ status: res.status, error: data?.error || null, hasUrl: !!data?.url }, null, 2));
