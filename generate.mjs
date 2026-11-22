// Builds the static site into ./out. Run: node generate.mjs
import { mkdirSync, writeFileSync, readFileSync, rmSync, cpSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ORIGIN, SITE, WRITER, ISO, AS_OF, safe } from './lib/site.mjs';
import pages from './content/pages.mjs';
import { autolink } from './lib/links.mjs';
import { ANCHORS } from './lib/anchors.mjs';
import legal from './content/legal.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, 'out');
const docs = [...pages, ...legal];
const find = (p) => docs.find((d) => d.path === p);
const href = (p) => (p ? `/${p}/` : '/');
const abs = (p) => ORIGIN + href(p);
const idOf = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const style = readFileSync(join(root, 'lib/theme.css'), 'utf8').replace(/\s+/g, ' ').replace(/\s*([{};:,>])\s*/g, '$1');

const MENU = [['Deals', ''], ['Black Friday', 'walking-pad-black-friday-deals'], ['Best walking pads', 'best-walking-pad'], ['With incline', 'best-walking-pad-with-incline'], ['Treadmills', 'best-treadmill-for-home'], ['All guides', 'guides']];
const SHELF = [
  ['Deals and timing', ['', 'walking-pad-black-friday-deals', 'treadmill-black-friday-deals', 'treadmill-deals']],
  ['Best walking pads', ['best-walking-pad', 'best-walking-pad-with-incline', 'best-walking-pad-with-handle', 'best-under-desk-treadmill', 'best-quiet-walking-pad', 'best-cheap-walking-pad', 'best-walking-pad-for-heavy-people', 'best-walking-pad-for-seniors', 'best-walking-pad-for-tall-people', 'best-mini-treadmill']],
  ['Treadmills', ['best-treadmill-for-home', 'best-budget-treadmill', 'best-incline-treadmill', 'best-walking-treadmill', 'best-folding-treadmill', 'best-folding-treadmill-for-small-spaces', 'best-compact-treadmill', 'best-portable-treadmill', 'best-manual-treadmill', 'best-curved-treadmill']],
  ['Walking pad reviews', ['urevo-walking-pad-review', 'kingsmith-walkingpad-review', 'deerrun-walking-pad-review', 'merach-walking-pad-review', 'redliro-walking-pad-review', 'lichico-walking-pad-review', 'superun-walking-pad-review', 'sperax-walking-pad-review']],
  ['Treadmill reviews', ['goplus-2-in-1-review', 'horizon-7-0-at-review', 'sole-treadmill-review', 'proform-treadmill-review', 'bowflex-treadmill-review', 'wellfit-treadmill-review', 'superfit-treadmill-review']],
  ['Desk setups and gear', ['standing-desk-and-treadmill', 'best-treadmill-mat', 'best-weighted-vest-for-walking', 'best-shoes-for-treadmill-walking']],
  ['Workouts and tools', ['treadmill-incline-calculator', '12-3-30-treadmill-workout', 'incline-treadmill-workout', 'hiit-treadmill-workout', 'treadmill-for-weight-loss', 'walking-pad-for-weight-loss']],
  ['Guides', ['walking-pad-vs-treadmill', 'what-is-a-walking-pad', 'can-you-run-on-a-walking-pad', 'is-a-walking-pad-worth-it', 'walking-pad-weight-limit', 'walking-pad-fsa-hsa-eligible', 'walking-pad-recalls']],
  ['Care', ['how-to-lube-a-walking-pad', 'how-to-tighten-walking-pad-belt', 'walking-pad-on-carpet']],
];
for (const d of pages) if (!d.plain && !SHELF.some(([, l]) => l.includes(d.path))) throw new Error('Missing from guides page: ' + d.path);
const shelved = SHELF.flatMap(([, l]) => l).length;
docs.push({
  path: 'guides', short: 'All guides', tab: `All Walking Pad and Treadmill Guides | ${SITE}`,
  summary: `Every guide on ${SITE}: walking pad deals, best picks by need, folding treadmills, reviews and how-to guides.`,
  heading: 'All walking pad guides', lede: `${shelved} guides, grouped by what you are trying to decide.`, plain: false, nostamp: true,
  parts: SHELF.map(([h, l]) => [h, `<ul class="tiles">${l.map((p) => { const x = find(p); return `<li><a href="${href(p)}"><b>${safe(x.short || x.heading)}</b><span>${safe(x.blurb || x.summary)}</span></a></li>`; }).join('')}</ul>`]),
});

function graph(d) {
  const g = [{ '@type': 'WebSite', '@id': ORIGIN + '/#site', url: ORIGIN + '/', name: SITE, inLanguage: 'en-US' }, { '@type': 'Organization', '@id': ORIGIN + '/#org', name: SITE, url: ORIGIN + '/', logo: ORIGIN + '/icon-512.png' }];
  const trail = [{ '@type': 'ListItem', position: 1, name: 'Home', item: ORIGIN + '/' }];
  if (d.path && !d.legal && d.path !== 'guides') trail.push({ '@type': 'ListItem', position: 2, name: 'Guides', item: abs('guides') });
  if (d.path) trail.push({ '@type': 'ListItem', position: trail.length + 1, name: d.short || d.heading, item: abs(d.path) });
  if (d.path) g.push({ '@type': 'BreadcrumbList', itemListElement: trail });
  if (!d.legal) g.push({ '@type': 'Article', headline: d.heading, description: d.summary, url: abs(d.path), datePublished: d.iso || ISO, dateModified: d.iso || ISO, image: `${ORIGIN}/share/${d.path || 'index'}.png`, author: { '@type': 'Person', name: WRITER }, publisher: { '@id': ORIGIN + '/#org' }, isPartOf: { '@id': ORIGIN + '/#site' }, mainEntityOfPage: abs(d.path) });
  // Review pages: Product is the top entity and carries the review, so Google's Product snippet has its required "review" field.
  if (!d.legal && d.review) g.push({ '@type': 'Product', name: d.review.name, brand: { '@type': 'Brand', name: d.review.brand }, review: { '@type': 'Review', name: d.heading, url: abs(d.path), datePublished: d.iso || ISO, author: { '@type': 'Person', name: WRITER }, publisher: { '@id': ORIGIN + '/#org' }, reviewRating: { '@type': 'Rating', ratingValue: d.review.score, bestRating: 10, worstRating: 1 } } });
  if (d.list?.length) g.push({ '@type': 'ItemList', name: d.heading, numberOfItems: d.list.length, itemListElement: d.list.map((n, i) => ({ '@type': 'ListItem', position: i + 1, name: n })) });
  if (d.howto) g.push({ '@type': 'HowTo', name: d.heading, description: d.summary, step: d.howto.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s[0], text: s[1] })) });
  if (d.asked?.length) g.push({ '@type': 'FAQPage', mainEntity: d.asked.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a.replace(/<[^>]+>/g, '') } })) });
  return `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': g }).replace(/</g, '\\u003c')}</script>`;
}

const cup = `<svg width="34" height="22" viewBox="0 0 34 22" aria-hidden="true"><rect x="1" y="8" width="32" height="10" rx="5" fill="#23262B"/><path d="M7 13h20" stroke="#F2541B" stroke-width="3" stroke-dasharray="4 3"/><circle cx="6" cy="13" r="2" fill="#fff"/><circle cx="28" cy="13" r="2" fill="#fff"/></svg>`;

const fmapCols = [['Deals', (p) => /sale|deals|black-friday/.test(p)], ['Best picks', (p) => /^best-/.test(p)], ['Reviews', (p) => /-review$/.test(p)], ['Guides and comparisons', (p) => true]];
const fmap = (() => { const seen = new Set(); const cols = fmapCols.map(([t, f]) => { const items = pages.filter((x) => x.path && !x.legal && x.path !== 'guides' && !seen.has(x.path) && f(x.path)); items.forEach((x) => seen.add(x.path)); return [t, items.slice(0, 8)]; }); return `<div class="fmap">${cols.map(([t, items]) => `<div><b>${t}</b>${items.map((x) => `<a href="/${x.path}/">${safe(x.short || x.heading)}</a>`).join('')}</div>`).join('')}</div>`; })();
function render(d) {
  const unself = (h) => h.split(`<a class="rev" href="/${d.path}/">Read the full review</a>`).join('');
  const parts = d.parts || [];
  const toc = parts.length > 2 ? `<nav class="rail" aria-label="On this page"><b>Jump to</b>${parts.map((s) => `<a href="#${idOf(s[0])}">${safe(s[0])}</a>`).join('')}${d.asked?.length ? '<a href="#questions">Questions</a>' : ''}</nav>` : '';
  const main0 = d.legal || d.path === 'guides' ? parts.map(([h, html]) => `<section><h2 id="${idOf(h)}">${safe(h)}</h2>${html}</section>`).join('') : autolink(parts.map(([h, html]) => `<section><h2 id="${idOf(h)}">${safe(h)}</h2>${html}</section>`).join(''), d.path, ANCHORS);
  const main = unself(main0);
  const qa = d.asked?.length ? `<section class="qa"><h2 id="questions">Questions people ask</h2>${d.asked.map(([q, a]) => `<details><summary>${safe(q)}</summary><p>${a}</p></details>`).join('')}</section>` : '';
  const refs = d.refs?.length ? `<section class="refs"><h2 id="sources">Sources</h2><ol>${d.refs.map(([t, u]) => `<li><a href="${u}" rel="nofollow noopener">${safe(t)}</a></li>`).join('')}</ol></section>` : '';
  const next0 = (d.next || []).map(find).filter(Boolean);
  const grp = (p) => fmapCols.findIndex(([, f]) => f(p || ''));
  const next = d.legal || !d.path || d.path === 'guides' ? next0 : [...next0, ...pages.filter((x) => x.path && !x.legal && x.path !== 'guides' && x.path !== d.path && !next0.includes(x) && grp(x.path) === grp(d.path))].slice(0, 6);
  const more = next.length ? `<section class="more"><h2>Read next</h2><ul class="tiles">${next.map((n) => `<li><a href="${href(n.path)}"><b>${safe(n.short || n.heading)}</b><span>${safe(n.blurb || n.summary)}</span></a></li>`).join('')}</ul></section>` : '';
  const stamp = d.legal || d.nostamp ? '' : `<p class="stamp">By ${WRITER}. Updated <time datetime="${d.iso || ISO}">${d.asOf || AS_OF}</time>.</p>`;
  const tops = [...(parts.map((p) => p[1]).join('')).matchAll(/<article class="pick" id="(pick-[a-z0-9]+)"><header><p class="award">(.*?)<\/p><h3>(.*?)<\/h3>/g)];
  const glance = tops.length > 2 ? `<div class="glance"><b>Top picks at a glance</b><ul>${tops.map((m) => `<li><a href="#${m[1]}"><span>${m[2]}</span>${m[3]}</a></li>`).join('')}</ul></div>` : '';
  const quick = d.quick ? `<div class="answer"><b>Bottom line</b><p>${d.quick}</p></div>` : '';
  const head = d.path ? `<p class="trail"><a href="/">Home</a> &rsaquo; ${!d.legal && d.path !== 'guides' ? '<a href="/guides/">Guides</a> &rsaquo; ' : ''}${safe(d.short || d.heading)}</p><h1>${safe(d.heading)}</h1>${d.lede ? `<p class="lede">${d.lede}</p>` : ''}${stamp}${quick}${glance}` : quick + glance;
  const hero = d.path ? '' : `<div class="hero"><div class="shell"><div><h1>${safe(d.heading)}</h1><p>${d.lede}</p><small>By ${WRITER}. Updated <time datetime="${ISO}">${AS_OF}</time>.</small></div>${d.hero || ''}</div></div>`;
  return `<!doctype html>
<html lang="en-US">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${safe(d.tab)}</title>
<meta name="description" content="${safe(d.summary)}">
<link rel="canonical" href="${abs(d.path)}">
${d.noindex ? '<meta name="robots" content="noindex">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
<meta property="og:title" content="${safe(d.tab)}">
<meta property="og:description" content="${safe(d.summary)}">
<meta property="og:type" content="${d.path ? 'article' : 'website'}">
<meta property="og:url" content="${abs(d.path)}">
<meta property="og:image" content="${ORIGIN}/share/${d.path || 'index'}.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:site_name" content="${SITE}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#23262B">
<link rel="icon" href="/favicon.ico" sizes="48x48"><link rel="icon" href="/icon.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="/fonts/archivo.woff2" as="font" type="font/woff2" crossorigin>
<style>${style}</style>
${graph(d)}
</head>
<body>
<a class="jump" href="#content">Skip to content</a>
<header class="bar"><div class="shell"><a class="mark" href="/">${cup}<span>walkingpadsale</span></a><nav class="menu" aria-label="Primary">${MENU.map(([t, p]) => `<a href="${href(p)}"${p === d.path ? ' aria-current="page"' : ''}>${t}</a>`).join('')}</nav></div></header>
${hero}
<div class="shell cols${toc ? '' : ' one'}" id="content"><main>${head}<div class="prose">${main}</div>${qa}${refs}${more}</main>${toc}</div>
<footer class="base"><div class="shell">${fmap}<strong>${SITE}</strong><nav aria-label="Footer"><a href="/guides/">All guides</a><a href="/how-we-choose/">How we choose</a><a href="/affiliate-disclosure/">Affiliate disclosure</a><a href="/privacy/">Privacy</a><a href="/terms/">Terms</a><a href="/contact/">Contact</a></nav><p>We may earn a commission when you buy through links on this site, at no cost to you. Speeds, limits and prices come from maker listings and change often, so check the seller's page before you buy. Talk to a doctor before starting a new exercise routine.</p></div></footer>
${d.script ? `<script>${d.script}</script>` : ''}
</body>
</html>`;
}

rmSync(out, { recursive: true, force: true });
for (const d of docs) {
  const dir = d.path ? join(out, d.path) : out;
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), render(d));
}
writeFileSync(join(out, '404.html'), render({ path: '404', legal: true, noindex: true, tab: `Page not found | ${SITE}`, summary: 'Page not found.', heading: 'That page is not here', parts: [['Try one of these', '<p>Start with the <a href="/">walking pad deals guide</a>, the <a href="/best-walking-pad/">best walking pads</a>, or <a href="/guides/">every guide</a>.</p>']] }));
const listed = docs.filter((d) => !d.noindex);
writeFileSync(join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${listed.map((d) => `  <url><loc>${abs(d.path)}</loc><lastmod>${d.iso || ISO}</lastmod></url>`).join('\n')}\n</urlset>\n`);
writeFileSync(join(out, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`);
writeFileSync(join(out, 'llms.txt'), `# ${SITE}\n\n> Buying guides, reviews and sale timing for walking pads, under-desk treadmills and folding treadmills.\n\n${listed.filter((d) => !d.legal).map((d) => `- [${d.heading}](${abs(d.path)}): ${d.summary}`).join('\n')}\n`);
cpSync(join(root, 'static'), out, { recursive: true });
writeFileSync(join(root, 'scripts/share-list.json'), JSON.stringify(docs.map((d) => ({ slug: d.path || 'index', title: d.heading }))));
console.log(`${docs.length} pages written to out/`);
