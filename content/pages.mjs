import a from './pages1.mjs';
import b from './pages2.mjs';
import c from './wave2a.mjs';
import d from './wave2b.mjs';
import e from './wave2c.mjs';
import f from './wave2d.mjs';
import DEPTH from './depth/index.mjs';
import P3 from './p3/index.mjs';
const ALL = [...a, ...b, ...c, ...d, ...e, ...f, ...P3];
for (const p of ALL) {
  const d = DEPTH[p.path === '' ? '/' : '/' + String(p.path).replace(/^\/|\/$/g, '')];
  if (!d) continue;
  if (d.parts.length) p.parts = [...(p.parts || []), ...d.parts];
  if (d.asked.length) p.asked = [...(p.asked || []), ...d.asked];
}
export default ALL;
