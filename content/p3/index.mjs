// Phase 3 pages: each file in this folder exports default an array of page objects (same shape as ../e2a.mjs / ../wave2a.mjs).
// A file that needs new products adds them itself first: import { P } from '../../lib/products.mjs'; Object.assign(P, { ... });
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
const dir = path.dirname(url.fileURLToPath(import.meta.url));
const PAGES = [];
for (const f of fs.readdirSync(dir).filter((f) => f.endsWith('.mjs') && f !== 'index.mjs').sort()) {
  const m = (await import(url.pathToFileURL(path.join(dir, f)).href)).default;
  PAGES.push(...m);
}
export default PAGES;
