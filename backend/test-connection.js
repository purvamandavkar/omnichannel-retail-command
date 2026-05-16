import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function test() {
    try {
        await client.connect();
        console.log('✅ Connected successfully!');
        const res = await client.query('SELECT NOW() as time');
        console.log('Server time:', res.rows[0].time);
        await client.end();
    } catch (err) {
        console.error('❌ Connection failed:', err.message);
        console.error('Full error:', err);
    }
}

test();