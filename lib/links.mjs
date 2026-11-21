// Contextual interlinking: links the first natural mention of a topic in body text to its page.
// Skips text inside links, headings, buttons, captions, summaries and the page itself.
// Each target page is linked at most once per page, with a cap on total auto links.
const SKIP = new Set(['a', 'h1', 'h2', 'h3', 'h4', 'figcaption', 'summary', 'button', 'th', 'dt', 'b', 'strong', 'script', 'style', 'svg', 'label']);

const SKIPCLASS = /\b(award|tags|meta|chips|tier|kicker|rev|buy)\b/;

export function autolink(htmlIn, self, anchors, max = 14) {
  const used = new Set([self]);
  // Count links already present so we do not double up on targets the writer linked by hand.
  for (const m of htmlIn.matchAll(/href="\/([^"#]*?)\/?"/g)) used.add(m[1]);
  const list = anchors
    .filter(([, path]) => !used.has(path))
    .map(([phrase, path]) => ({ path, re: new RegExp(`(^|[^A-Za-z0-9'-])(${phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})(?![A-Za-z0-9-])`, 'i') }));
  let added = 0;
  const stack = [];
  return htmlIn.replace(/(<[^>]+>)|([^<]+)/g, (all, tag, text) => {
    if (tag) {
      const m = tag.match(/^<\s*(\/)?\s*([a-zA-Z0-9]+)/);
      if (m && !/\/>$/.test(tag)) {
        const name = m[2].toLowerCase();
        if (m[1]) { let i = stack.lastIndexOf(name); if (i < 0) i = stack.length - 1; if (i >= 0) stack.splice(i); }
        else if (!['br', 'img', 'input', 'meta', 'link', 'hr', 'source', 'path', 'rect', 'circle'].includes(name)) { const c = tag.match(/class="([^"]*)"/); stack.push(c && SKIPCLASS.test(c[1]) ? 'a' : name); }
      }
      return tag;
    }
    if (added >= max || stack.some((t) => SKIP.has(t)) || !stack.some((t) => t === 'p' || t === 'li' || t === 'td')) return text;
    let out = text;
    for (const a of list) {
      if (added >= max) break;
      if (used.has(a.path)) continue;
      const m = out.match(a.re);
      if (!m) continue;
      const at = m.index + m[1].length;
      out = `${out.slice(0, at)}<a href="${a.path ? `/${a.path}/` : "/"}">${m[2]}</a>${out.slice(at + m[2].length)}`;
      used.add(a.path); added++;
      // Do not link twice inside one text node; move on to keep anchors spread out.
      break;
    }
    return out;
  });
}
