import fs from 'node:fs';
import crypto from 'node:crypto';

const env = Object.fromEntries(fs.readFileSync('c:/Users/mpro/Desktop/1win/server/.env','utf8').split(/\r?\n/).filter(Boolean).filter(l=>!l.trim().startsWith('#')).map(l=>{const i=l.indexOf('='); return [l.slice(0,i), l.slice(i+1)];}));
const key=env.SW_API_COMPANY_KEY;
const hash=env.SW_API_COMPANY_HASH;
const serverId=env.SW_API_SERVER_ID;
const username='gpz_82_gpzesui17801637021_067';

for (const base of ['http://ex-api-yy2.ttbbyyllyy.com','https://ex-api-yy2.ttbbyyllyy.com']) {
  const params=new URLSearchParams({username,key,lang:'en',homeurl:'https://gpzes.com/sports',cashierurl:'https://gpzes.com/dashboard',serverId});
  const query=params.toString();
  const token=crypto.createHash('sha1').update(query+hash).digest('hex');
  const url=`${base}/player/v2/login.aspx?${query}&token=${token}`;
  try {
    const r=await fetch(url);
    const t=await r.text();
    console.log('\nBASE',base,'STATUS',r.status,'HEAD',t.slice(0,220));
  } catch(e) {
    console.log('\nBASE',base,'ERROR',e.message);
  }
}
