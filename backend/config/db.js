import dotenv from 'dotenv';
dotenv.config();

import pkg from 'pg';
const { Pool } = pkg;

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,

  // Recommended pool settings
  max: 10,                 // max number of clients
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,

  // Needed for cloud DBs (Render, Railway, etc.)
  ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false }
    : false
});

/* =========================
   CONNECTION CHECK
========================= */
pool.on('connect', () => {
  console.log('✅ PostgreSQL connected');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected PG error', err);
  process.exit(1);
});

/* =========================
   GRACEFUL SHUTDOWN
========================= */
process.on('SIGINT', async () => {
  await pool.end();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await pool.end();
  process.exit(0);
});

export default pool;
