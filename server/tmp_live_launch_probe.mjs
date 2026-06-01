const base='https://mybet-backend-xypv.onrender.com';
const email='gpzes.ui.17801637021@example.com';
const password='Pass@1234';

const j=(o)=>JSON.stringify(o);

const main=async()=>{
  const login=await fetch(base+'/api/auth/login',{method:'POST',headers:{'content-type':'application/json'},body:j({email,password})});
  const lj=await login.json();
  console.log('login status',login.status,'ok',login.ok);
  console.log('login user', {id: lj.user?.id, email: lj.user?.email, seamlessUsername: lj.user?.seamlessUsername, username: lj.user?.username});
  const token=lj.token;
  const sports=await fetch(base+'/api/auth/sports/launch',{method:'POST',headers:{'content-type':'application/json','authorization':'Bearer '+token},body:j({returnUrl:'https://gpzes.com/sports'})});
  const sj=await sports.json().catch(()=>({}));
  console.log('sports status',sports.status,'ok',sports.ok);
  console.log('sports body',sj);
};
main().catch(e=>{console.error(e);process.exit(1)});
