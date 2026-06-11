import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';

import { DEFAULT_SETTINGS, getSettings } from './settings.js';

const { Pool } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const assetsDir = path.join(publicDir, 'assets');

const app = express();
const port = Number(process.env.PORT || 3200);
const databaseUrl = process.env.DATABASE_URL || 'postgresql:///my_portfolio?host=/var/run/postgresql';
const pool = new Pool({ connectionString: databaseUrl });

app.disable('x-powered-by');
app.use(express.json());
app.use('/assets', express.static(assetsDir, {
  fallthrough: false,
  maxAge: process.env.NODE_ENV === 'production' ? '1h' : 0,
}));
app.use(express.static(publicDir, {
  extensions: ['html'],
  maxAge: process.env.NODE_ENV === 'production' ? '1h' : 0,
}));

app.get('/api/settings', async (_req, res) => {
  try {
    const settings = await getSettings(pool);
    res.json({ ok: true, source: 'database', settings });
  } catch (error) {
    console.error('Failed to load portfolio settings from database:', error.message);
    res.status(200).json({ ok: true, source: 'defaults', settings: DEFAULT_SETTINGS });
  }
});

app.get('/health', async (_req, res) => {
  let database = 'unknown';
  try {
    await pool.query('select 1');
    database = 'ok';
  } catch (error) {
    database = 'error';
  }

  res.json({
    ok: true,
    service: 'mike-portfolio',
    owner: 'Mikhail Daffa Herdiansah',
    database,
  });
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(port, '127.0.0.1', () => {
  console.log(`Mike Portfolio listening at http://127.0.0.1:${port}`);
});
