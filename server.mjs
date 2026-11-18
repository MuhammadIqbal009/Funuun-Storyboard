import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import talentsHandler from './api/talents.js';

const ROOT = resolve('.');
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.json': 'application/json; charset=utf-8',
};

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost:3000');
  if (url.pathname === '/api/talents') return talentsHandler(req, res);
  const rel = url.pathname === '/' ? '/index.html' : decodeURIComponent(url.pathname);
  const filePath = resolve(ROOT, '.' + rel);
  if (!filePath.startsWith(ROOT + sep)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }
  try {
    const info = await stat(filePath);
    if (!info.isFile()) throw new Error('Not file');
    const body = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': MIME[extname(filePath).toLowerCase()] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
}).listen(3000, () => console.log('Storyboard Studio running at http://localhost:3000'));
