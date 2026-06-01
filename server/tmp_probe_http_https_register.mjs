const creds = {
  CompanyKey: 'AC5568ADDCB94EEFA56BC4BCB2600C8C',
  ServerId: 'GPZES01',
  Agent: 'bajag_0529185934',
  UserGroup: 'a',
};
for (const base of ['http://ex-api-yy2.ttbbyyllyy.com','https://ex-api-yy2.ttbbyyllyy.com']) {
  const username = `proto_${Date.now()}_${base.startsWith('https')?'s':'h'}`;
  const res = await fetch(`${base}/web-root/restricted/player/register-player.aspx`, {
    method:'POST', headers:{'Content-Type':'application/json',Accept:'application/json'},
    body: JSON.stringify({ ...creds, Username: username })
  });
  const txt = await res.text();
  let data; try { data = JSON.parse(txt);} catch { data={raw:txt.slice(0,200)}; }
  console.log(JSON.stringify({ base, status: res.status, error: data?.error || null, raw:data?.raw||null }, null, 2));
}
