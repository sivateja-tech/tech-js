import dotenv from 'dotenv';
dotenv.config();   

import pool from './config/db.js';

async function test() {
  const res = await pool.query('SELECT NOW()');
  console.log('DB OK:', res.rows);
  process.exit(0);
}

test().catch(err => {
  console.error(err);
  process.exit(1);
});
