// Depth expansions: each file in this folder exports default { '/path': { parts: [[h, html], ...], asked: [[q, a], ...] } }
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
const dir = path.dirname(url.fileURLToPath(import.meta.url));
const DEPTH = {};
for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.mjs') && f !== 'index.mjs').sort()) {
  const m = (await import(url.pathToFileURL(path.join(dir, f)).href)).default;
  for (const [k, v] of Object.entries(m)) {
    const d = DEPTH[k] || (DEPTH[k] = { parts: [], asked: [] });
    d.parts.push(...(v.parts || []));
    d.asked.push(...(v.asked || []));
  }
}
export default DEPTH;
