const base = 'http://ex-api-yy2.ttbbyyllyy.com';
const username = 'gpz_82_gpzesui17801637021_067';

const registerPayload = {
  CompanyKey: 'AC5568ADDCB94EEFA56BC4BCB2600C8C',
  ServerId: 'GPZES01',
  Username: username,
  Agent: 'bajag_0529185934',
  UserGroup: 'a'
};
const registerRes = await fetch(`${base}/web-root/restricted/player/register-player.aspx`, {
  method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(registerPayload)
});
const registerJson = await registerRes.json();

const loginPayload = {
  CompanyKey: 'AC5568ADDCB94EEFA56BC4BCB2600C8C',
  ServerId: 'GPZES01',
  Username: username,
  Portfolio: 'SportsBook',
  GpId: 0,
  GameId: 0,
  Device: 'd',
  Lang: 'en'
};
const loginRes = await fetch(`${base}/web-root/restricted/player/v2/login.aspx`, {
  method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(loginPayload)
});
const loginJson = await loginRes.json();

console.log(JSON.stringify({
  register: { status: registerRes.status, error: registerJson?.error || null },
  providerLogin: { status: loginRes.status, error: loginJson?.error || null, hasUrl: !!loginJson?.url }
}, null, 2));
