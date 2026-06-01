const base = 'http://ex-api-yy2.ttbbyyllyy.com';
const common = {
  CompanyKey: 'AC5568ADDCB94EEFA56BC4BCB2600C8C',
  ServerId: 'GPZES01',
  Username: 'SWRUN_1780138009676_NEW',
  Portfolio: 'SportsBook',
  GpId: 0,
  GameId: 0,
  Device: 'd',
  Lang: 'en'
};

const endpoints = [
  '/web-root/restricted/player/v2/login.aspx',
  '/web-root/restricted/player/login.aspx',
  '/web-root/restricted/player/v3/login.aspx'
];

for (const ep of endpoints) {
  const res = await fetch(`${base}${ep}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(common)
  });
  const txt = await res.text();
  let data; try { data = JSON.parse(txt); } catch { data = { raw: txt.slice(0, 300) }; }
  console.log(JSON.stringify({ ep, status: res.status, error: data?.error || null, hasUrl: !!data?.url, raw: data?.raw || null }, null, 2));
}
