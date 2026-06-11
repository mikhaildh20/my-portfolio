import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

const app = express();
const port = Number(process.env.PORT || 3200);

app.disable('x-powered-by');
app.use(express.static(publicDir, {
  extensions: ['html'],
  maxAge: process.env.NODE_ENV === 'production' ? '1h' : 0,
}));

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'mike-portfolio', owner: 'Mikhail Daffa Herdiansah' });
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(port, '127.0.0.1', () => {
  console.log(`Mike Portfolio listening at http://127.0.0.1:${port}`);
});
