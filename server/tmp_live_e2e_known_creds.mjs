const base='https://mybet-backend-xypv.onrender.com';
const ts=Date.now();
const email=`live.fix.${ts}@example.com`;
const password='Pass@1234A';
const username=`livefix${ts}`;
const payload={username,password,email,fullName:'Live Fix User',phone:'01800000000',country:'Bangladesh',dateOfBirth:'01/01/1995'};

const j=(o)=>JSON.stringify(o);

const reg=await fetch(base+'/api/auth/register',{method:'POST',headers:{'content-type':'application/json'},body:j(payload)});
const rj=await reg.json().catch(()=>({}));
console.log('register status',reg.status,'ok',reg.ok);
console.log('register body',rj);

const login=await fetch(base+'/api/auth/login',{method:'POST',headers:{'content-type':'application/json'},body:j({email,password})});
const lj=await login.json().catch(()=>({}));
console.log('login status',login.status,'ok',login.ok);
console.log('login user', {id: lj.user?.id, email: lj.user?.email, seamlessUsername: lj.user?.seamlessUsername, username: lj.user?.username});

const token=lj.token || rj.token;
if (token) {
  const sports=await fetch(base+'/api/auth/sports/launch',{method:'POST',headers:{'content-type':'application/json','authorization':'Bearer '+token},body:j({returnUrl:'https://gpzes.com/sports'})});
  const sj=await sports.json().catch(()=>({}));
  console.log('sports status',sports.status,'ok',sports.ok);
  console.log('sports body',sj);
} else {
  console.log('no token available to test sports launch');
}
