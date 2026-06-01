import pkg from 'pg';
const { Client } = pkg;
const client = new Client({ connectionString: 'postgresql://postgres.hlimqihowlyeolpgsxfk:BetWin%402.012@aws-1-ap-south-1.pooler.supabase.com:5432/postgres', ssl: { rejectUnauthorized: false } });
await client.connect();
const r = await client.query('select id, username, email, seamless_username from users where lower(email)=lower($1)', ['gpzes.ui.17801637021@example.com']);
console.log(JSON.stringify(r.rows, null, 2));
await client.end();
