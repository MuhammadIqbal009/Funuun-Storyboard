import { cp, mkdir, copyFile } from 'node:fs/promises';
await mkdir('public', { recursive: true });
for (const name of ['index.html', 'client.js', 'style.css', 'favicon.svg']) {
  await copyFile(name, 'public/' + name);
}
await cp('assets', 'public/assets', { recursive: true });
console.log('Storyboard Studio static assets ready');
