// Builds plain HTML copies of GovTec content so that search engines and social networks can read them.
// The site itself is a single page that draws everything with JavaScript under "#..." addresses, which search
// engines treat as one page and link previews (LinkedIn, Facebook, WhatsApp, X) cannot read.
// This script writes, from data.js, analysis.js, focus.js, events.js and images.js:
//   news/<id>/index.html, analysis/<id>/index.html, countries/<id>/index.html, focus/<month>/index.html,
//   news/index.html, analysis/index.html, countries/index.html (hub pages),
//   sitemap.xml, feed.xml (RSS) and the <noscript> list of latest headlines in index.html.
// Run: node tools/build-seo.mjs   (the "Build static pages" GitHub Actions job runs it after every content change)
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const SITE = 'https://govtec.org';
const NAME = 'GovTec';
const FULL = 'GovTec, the Governance & Technology Centre';

const window = {};
const ctx = vm.createContext({ window, console });
for (const f of ['data.js', 'images.js', 'analysis.js', 'focus.js', 'events.js'])
  vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: f });
const D = window.DV, IMG = window.DV_IMAGES || {}, AN = window.DV_ANALYSES || [], FOCUS = window.DV_FOCUS || { MONTHS: [] };
const T = Object.fromEntries(D.THEMES.map(t => [t.id, t.label]));
const C = Object.fromEntries(D.COUNTRIES.map(c => [c.id, c]));

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const MON = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
// "16–17 Nov 2026" -> 2026-11-17 ; "Mar 2026" -> 2026-03-01
function isoDate(s) {
  const all = [...String(s).matchAll(/(\d{1,2})\s+([A-Z][a-z]{2})[a-z]*\s+(\d{4})/g)];
  if (all.length) { const m = all[all.length - 1]; return ymd(+m[3], MON[m[2]], +m[1]); }
  const r = String(s).match(/(\d{1,2})[–-]\d{1,2}\s+([A-Z][a-z]{2})[a-z]*\s+(\d{4})/);
  if (r) return ymd(+r[3], MON[r[2]], +r[1]);
  const m2 = String(s).match(/([A-Z][a-z]{2})[a-z]*\s+(\d{4})/);
  if (m2 && MON[m2[1]] !== undefined) return ymd(+m2[2], MON[m2[1]], 1);
  return null;
}
function ymd(y, m, d) { return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`; }
const clip = (s, n) => { s = String(s).replace(/\s+/g, ' ').trim(); return s.length <= n ? s : s.slice(0, s.lastIndexOf(' ', n - 1)) + '…'; };
const strip = s => String(s ?? '').replace(/\[(\d+)\]/g, '');
const imgOf = id => { const v = IMG[id]; return v && v.status === 'done' && v.src ? v : null; };
const abs = p => SITE + '/' + p.replace(/^\//, '');

function cite(s, prefix) {
  return esc(s).replace(/\[(\d+)\]/g, (m, n) => `<sup><a href="#${prefix}${n}">${n}</a></sup>`);
}

function page({ url, title, desc, image, type = 'article', jsonld = [], crumbs = [], body, app }) {
  const canon = SITE + url;
  const img = image || abs('img/og-govtec.jpg');
  const ld = [{
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [['Home', '/'], ...crumbs].map(([n, u], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: SITE + u }))
  }, ...jsonld];
  const share = encodeURIComponent(canon), st = encodeURIComponent(title);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} | ${NAME}</title>
<meta name="description" content="${esc(clip(desc, 300))}">
<link rel="canonical" href="${canon}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
<meta property="og:site_name" content="${esc(FULL)}">
<meta property="og:type" content="${type}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(clip(desc, 300))}">
<meta property="og:url" content="${canon}">
<meta property="og:image" content="${esc(img)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(clip(desc, 200))}">
<meta name="twitter:image" content="${esc(img)}">
<link rel="icon" type="image/png" href="/img/favicon-64.png">
<link rel="apple-touch-icon" href="/img/apple-touch-icon.png">
<link rel="alternate" type="application/rss+xml" title="${NAME} news and analysis" href="/feed.xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Caladea:wght@400;700&family=Montserrat:wght@600;700;800&display=swap">
<link rel="stylesheet" href="/theme.css">
<link rel="stylesheet" href="/pages.css">
<script type="application/ld+json">${JSON.stringify(ld.length === 1 ? ld[0] : ld).replace(/</g, '\\u003c')}</script>
</head>
<body class="sp">
<header class="sp-mast"><div class="sp-wrap">
<a class="sp-brand" href="/"><img src="/img/emblem.webp" width="44" height="44" alt=""><span><b>Gov<i>Tec</i></b><small>Governance &amp; Technology Centre</small></span></a>
<nav aria-label="Main"><a href="/news/">News</a><a href="/analysis/">Analysis</a><a href="/countries/">Countries</a><a href="/#focus">Monthly Focus</a><a href="/#tracker">Policy Tracker</a><a href="/#events">Events</a><a href="/#funding">Funding</a></nav>
</div></header>
<main class="sp-wrap sp-main">
<p class="sp-crumb"><a href="/">Home</a>${crumbs.map(([n, u], i) => i === crumbs.length - 1 ? ` / <span>${esc(n)}</span>` : ` / <a href="${u}">${esc(n)}</a>`).join('')}</p>
${body}
${app ? `<p class="sp-app"><a class="sp-btn" href="${app}">Open in the interactive ${NAME} site</a></p>` : ''}
<p class="sp-share"><b>Share:</b> <a href="https://www.linkedin.com/sharing/share-offsite/?url=${share}" rel="noopener" target="_blank">LinkedIn</a> · <a href="https://x.com/intent/post?url=${share}&amp;text=${st}" rel="noopener" target="_blank">X</a> · <a href="https://www.facebook.com/sharer/sharer.php?u=${share}" rel="noopener" target="_blank">Facebook</a> · <a href="https://wa.me/?text=${st}%20${share}" rel="noopener" target="_blank">WhatsApp</a> · <a href="mailto:?subject=${st}&amp;body=${share}">Email</a></p>
</main>
<footer class="sp-foot"><div class="sp-wrap">
<p><b>${esc(FULL)}</b>: global intelligence on e-governance, digital public infrastructure, AI and cybersecurity, linked to its sources. A knowledge venture of <a href="https://synapseconsulting.services" rel="noopener">Synapse Consulting</a>. In beta: everything is free.</p>
<p><a href="/news/">All news</a> · <a href="/analysis/">All analysis</a> · <a href="/countries/">Country profiles</a> · <a href="/feed.xml">RSS feed</a> · <a href="/#about">Methodology</a> · <a href="/#contact">Contact</a></p>
</div></footer>
</body>
</html>
`;
}

const ORG = { '@type': 'Organization', name: FULL, alternateName: NAME, url: SITE + '/', logo: { '@type': 'ImageObject', url: abs('img/emblem-512.png'), width: 512, height: 512 } };
const out = new Map(); // relative path -> content
const sitemap = []; // [url, lastmod]
const write = (rel, html) => out.set(rel, html);

/* ---------- news ---------- */
const order = D.NEWSORDER.filter(id => D.NEWS.some(n => n.id === id));
const newsById = Object.fromEntries(D.NEWS.map(n => [n.id, n]));
const newsList = [...order, ...D.NEWS.map(n => n.id).filter(id => !order.includes(id))].map(id => newsById[id]);
function newsCard(n) {
  return `<li><a href="/news/${n.id}/">${esc(n.title)}</a><br><small>${esc(n.date)} · ${esc(T[n.theme] || '')}${n.country && C[n.country] ? ' · ' + esc(C[n.country].name) : ''} · ${esc(n.sector)}</small></li>`;
}
for (const n of newsList) {
  const im = imgOf(n.id);
  const d = isoDate(n.date);
  const country = n.country && C[n.country] ? C[n.country] : null;
  const related = newsList.filter(x => x.id !== n.id && ((country && x.country === n.country) || x.theme === n.theme)).slice(0, 5);
  const body = `<article class="sp-article">
<p class="sp-kicker">${esc(T[n.theme] || '')} · ${esc(n.sector)}${country ? ' · ' + esc(country.name) : ''} · ${esc(n.type)}</p>
<h1>${esc(n.title)}</h1>
<p class="sp-meta"><time datetime="${d || ''}">${esc(n.date)}</time> · ${n.sources} source${n.sources === 1 ? '' : 's'} · ${esc(n.trust)} sourcing</p>
${im ? `<figure><img src="/${esc(im.src)}" width="${im.w}" height="${im.h}" alt="${esc(im.alt)}"><figcaption>${im.kind === 'ai' ? 'AI-generated illustration' : `Photo: ${esc(im.credit || '')}, <a href="${esc(im.licenseUrl || '#')}" rel="noopener">${esc(im.license || '')}</a>, via <a href="${esc(im.sourceUrl || '#')}" rel="noopener">Wikimedia Commons</a>`}</figcaption></figure>` : ''}
<p class="sp-lead">${esc(n.summary)}</p>
<h2>Why it matters</h2>
<p>${esc(n.why)}</p>
<h2>Sources</h2>
<ol class="sp-sources">${n.links.map(l => `<li><a href="${esc(l[2])}" rel="noopener">${esc(l[0])}</a>, ${esc(l[1])}</li>`).join('')}</ol>
${country && D.PROFILES[n.country] ? `<p>See also: <a href="/countries/${n.country}/">${esc(country.name)}: digital government profile</a></p>` : ''}
${related.length ? `<h2>Related</h2><ul class="sp-list">${related.map(newsCard).join('')}</ul>` : ''}
</article>`;
  write(`news/${n.id}/index.html`, page({
    url: `/news/${n.id}/`, title: n.title, desc: n.summary, image: im ? abs(im.src) : null,
    crumbs: [['News', '/news/'], [n.title, `/news/${n.id}/`]], app: `/#story-${n.id}`,
    jsonld: [{
      '@context': 'https://schema.org', '@type': 'NewsArticle', headline: clip(n.title, 110), description: clip(n.summary, 300),
      datePublished: d, dateModified: d, image: im ? [abs(im.src)] : [abs('img/og-govtec.jpg')],
      articleSection: T[n.theme], keywords: [T[n.theme], n.sector, country && country.name].filter(Boolean).join(', '),
      author: ORG, publisher: ORG, mainEntityOfPage: SITE + `/news/${n.id}/`,
      isBasedOn: n.links.map(l => l[2]), ...(country ? { contentLocation: { '@type': 'Country', name: country.name } } : {})
    }],
    body
  }));
  sitemap.push([`/news/${n.id}/`, d]);
}
write('news/index.html', page({
  url: '/news/', title: 'News on e-governance, DPI, AI and cybersecurity', type: 'website',
  desc: `All ${newsList.length} GovTec news items on e-governance, digital public infrastructure, AI, cybersecurity and digitalisation, newest first, each linked to its sources.`,
  crumbs: [['News', '/news/']], app: '/#news',
  body: `<h1>News</h1><p class="sp-lead">Every GovTec news item, newest first. Each one is written from its original sources and links to them.</p><ul class="sp-list">${newsList.map(newsCard).join('')}</ul>`
}));
sitemap.push(['/news/', isoDate(D.UPDATED)]);

/* ---------- analysis ---------- */
for (const a of AN) {
  const d = isoDate(a.date), u = a.updated ? isoDate(a.updated) : d;
  const P = `s`;
  const sec = (h, inner) => inner ? `<h2>${esc(h)}</h2>${inner}` : '';
  const body = `<article class="sp-article">
<p class="sp-kicker">${esc(a.kicker || '')}</p>
<h1>${esc(a.title)}</h1>
<p class="sp-meta"><time datetime="${d}">${esc(a.date)}</time>${a.updated ? ` · Updated <time datetime="${u}">${esc(a.updated)}</time>` : ''}${a.readMins ? ` · ${a.readMins} min read` : ''} · ${a.sources.length} sources</p>
<p class="sp-lead">${cite(a.standfirst, P)}</p>
${(a.keynums || []).length ? `<h2>Key numbers</h2><ul class="sp-keynums">${a.keynums.map(k => `<li><b>${esc(k.v)}</b> ${cite(k.l, P)}${k.c ? `<sup><a href="#${P}${k.c}">${k.c}</a></sup>` : ''}</li>`).join('')}</ul>` : ''}
${(a.body || []).map(b => `<h2>${esc(b.h)}</h2>${(b.p || []).map(p => `<p>${cite(p, P)}</p>`).join('')}`).join('\n')}
${a.policy && a.policy.rows ? sec(a.policy.title || 'Policy and law', `<div class="sp-table"><table><thead><tr><th>Instrument</th><th>Year</th><th>What it does</th><th>Status</th></tr></thead><tbody>${a.policy.rows.map(r => `<tr>${r.map(c => `<td>${cite(c, P)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`) : ''}
${a.economics ? sec(a.economics.title || 'Money and value', (a.economics.p || []).map(p => `<p>${cite(p, P)}</p>`).join('')) : ''}
${(a.voices || []).length ? sec('Voices', `<ul>${a.voices.map(v => `<li><b>${esc(v.who)}</b> (${esc(v.group)}, ${esc(v.stance)}): ${cite(v.view, P)}${v.c ? `<sup><a href="#${P}${v.c}">${v.c}</a></sup>` : ''}</li>`).join('')}</ul>`) : ''}
${(a.watch || []).length ? sec('What to watch', `<ul>${a.watch.map(w => `<li>${cite(typeof w === 'string' ? w : (w.t || w.text || JSON.stringify(w)), P)}</li>`).join('')}</ul>`) : ''}
<p class="sp-note">Charts, the infographic, the timeline, the implementation tracker and the impact assessment are in the <a href="/#analysis-${a.id}">interactive version</a>.</p>
<h2>Sources</h2>
<ol class="sp-sources">${a.sources.map((s, i) => `<li id="${P}${i + 1}"><a href="${esc(s[2])}" rel="noopener">${esc(s[0])}</a>, ${esc(s[1])}</li>`).join('')}</ol>
</article>`;
  const country = a.country && C[a.country];
  write(`analysis/${a.id}/index.html`, page({
    url: `/analysis/${a.id}/`, title: a.title, desc: strip(a.standfirst),
    crumbs: [['Analysis', '/analysis/'], [a.title, `/analysis/${a.id}/`]], app: `/#analysis-${a.id}`,
    jsonld: [{
      '@context': 'https://schema.org', '@type': 'AnalysisNewsArticle', headline: clip(a.title, 110), description: clip(strip(a.standfirst), 300),
      datePublished: d, dateModified: u, image: [abs('img/og-govtec.jpg')], articleSection: T[a.theme], author: ORG, publisher: ORG,
      mainEntityOfPage: SITE + `/analysis/${a.id}/`, citation: a.sources.map(s => s[2]),
      ...(country ? { contentLocation: { '@type': 'Country', name: country.name } } : {})
    }],
    body
  }));
  sitemap.push([`/analysis/${a.id}/`, u]);
}
write('analysis/index.html', page({
  url: '/analysis/', title: 'In-depth analysis on digital government and DPI', type: 'website',
  desc: 'GovTec in-depth analysis: policy, implementation, money, impact and voices on digital government, digital public infrastructure, payments, health and cybersecurity, with numbered sources.',
  crumbs: [['Analysis', '/analysis/']], app: '/#reports',
  body: `<h1>Analysis</h1><p class="sp-lead">Deep, source-numbered analysis of the most significant developments, published twice a week.</p><ul class="sp-list">${AN.map(a => `<li><a href="/analysis/${a.id}/">${esc(a.title)}</a><br><small>${esc(a.date)} · ${esc(a.kicker || '')}</small><br>${esc(clip(strip(a.standfirst), 260))}</li>`).join('')}</ul>`
}));
sitemap.push(['/analysis/', AN[0] ? isoDate(AN[0].updated || AN[0].date) : null]);

/* ---------- country profiles ---------- */
const STATUS = { op: 'Operational', part: 'Partial', law: 'Law or policy', ver: 'To verify' };
const profIds = Object.keys(D.PROFILES).filter(id => C[id]).sort((a, b) => C[a].name.localeCompare(C[b].name));
for (const id of profIds) {
  const p = D.PROFILES[id], c = C[id];
  const news = newsList.filter(n => n.country === id).slice(0, 12);
  const title = `${c.name}: digital government, digital ID, payments and data protection`;
  const desc = `${c.name} digital public infrastructure profile: ${p.rows.map(r => r[0]).join(', ')}. Lead agency: ${p.agency}. UN EGDI: ${p.egdi}.`;
  const body = `<article class="sp-article">
<p class="sp-kicker">Country profile · ${esc(c.region)}</p>
<h1>${esc(c.name)}: digital government profile</h1>
<p class="sp-meta">Reviewed <time datetime="${esc(p.reviewed)}">${esc(p.reviewed)}</time> · UN E-Government Development Index: ${esc(p.egdi)}</p>
<dl class="sp-dl"><dt>Lead agency</dt><dd>${esc(p.agency)}</dd><dt>Strategy</dt><dd>${esc(p.strategy)}</dd></dl>
<h2>Building blocks</h2>
<div class="sp-table"><table><thead><tr><th>Area</th><th>What exists</th><th>Status</th></tr></thead><tbody>${p.rows.map(r => `<tr><th scope="row">${esc(r[0])}</th><td>${esc(r[1])}</td><td>${esc(STATUS[r[2]] || r[2])}</td></tr>`).join('')}</tbody></table></div>
${news.length ? `<h2>Latest news on ${esc(c.name)}</h2><ul class="sp-list">${news.map(newsCard).join('')}</ul>` : ''}
<h2>Sources and reference sites</h2>
<ol class="sp-sources">${p.sources.map(s => `<li><a href="${esc(s[1])}" rel="noopener">${esc(s[0])}</a></li>`).join('')}</ol>
</article>`;
  write(`countries/${id}/index.html`, page({
    url: `/countries/${id}/`, title, desc, crumbs: [['Countries', '/countries/'], [c.name, `/countries/${id}/`]], app: `/#country-${id}`,
    jsonld: [{ '@context': 'https://schema.org', '@type': 'WebPage', name: title, description: clip(desc, 300), dateModified: p.reviewed, about: { '@type': 'Country', name: c.name }, publisher: ORG }],
    body
  }));
  sitemap.push([`/countries/${id}/`, p.reviewed]);
}
write('countries/index.html', page({
  url: '/countries/', title: 'Country profiles: digital ID, payments, data protection and e-government', type: 'website',
  desc: `GovTec country profiles of digital public infrastructure and e-government for ${profIds.length} countries, each reviewed at least every 30 days and linked to official sources.`,
  crumbs: [['Countries', '/countries/']], app: '/#countries',
  body: `<h1>Country profiles</h1><p class="sp-lead">Digital identity, payments, data exchange, civil registration, data protection, cybersecurity and AI governance, country by country, with sources.</p><ul class="sp-list">${profIds.map(id => `<li><a href="/countries/${id}/">${esc(C[id].name)}</a> <small>· ${esc(C[id].region)} · EGDI ${esc(D.PROFILES[id].egdi)} · reviewed ${esc(D.PROFILES[id].reviewed)}</small></li>`).join('')}</ul>`
}));
sitemap.push(['/countries/', profIds.map(id => D.PROFILES[id].reviewed).sort().pop()]);

/* ---------- monthly focus ---------- */
for (const m of FOCUS.MONTHS || []) {
  const c = m.country, s = m.sector;
  const part = (x, P, label) => x ? `<section><p class="sp-kicker">${label}</p><h2>${esc(x.name)}</h2><p class="sp-lead">${cite(x.standfirst, P)}</p>
${(x.body || []).map(b => `<h3>${esc(b.h)}</h3>${(b.p || []).map(p => `<p>${cite(p, P)}</p>`).join('')}`).join('\n')}
${(x.watch || []).length ? `<h3>What to watch</h3><ul>${x.watch.map(w => `<li>${cite(w, P)}</li>`).join('')}</ul>` : ''}
<h3>Sources</h3><ol class="sp-sources">${(x.sources || []).map((r, i) => `<li id="${P}${i + 1}"><a href="${esc(r[2])}" rel="noopener">${esc(r[0])}</a>, ${esc(r[1])}</li>`).join('')}</ol></section>` : '';
  const title = `Monthly Focus, ${m.label}: ${c ? c.name : ''}${c && s ? ' and ' : ''}${s ? s.name : ''}`;
  const desc = [c && strip(c.standfirst), s && strip(s.standfirst)].filter(Boolean).join(' ');
  const d = isoDate(m.published || m.label);
  write(`focus/${m.key}/index.html`, page({
    url: `/focus/${m.key}/`, title, desc, crumbs: [['Monthly Focus', '/#focus'], [m.label, `/focus/${m.key}/`]], app: '/#focus-country',
    jsonld: [{ '@context': 'https://schema.org', '@type': 'Article', headline: clip(title, 110), description: clip(desc, 300), datePublished: d, author: ORG, publisher: ORG, image: [abs('img/og-govtec.jpg')], mainEntityOfPage: SITE + `/focus/${m.key}/` }],
    body: `<article class="sp-article"><h1>${esc(title)}</h1><p class="sp-meta">Published ${esc(m.published || m.label)}</p>${part(c, 'c', 'Country of the Month')}${part(s, 'x', 'Sector of the Month')}<p class="sp-note">Maps, charts, the infographic and trackers are in the <a href="/#focus-country">interactive version</a>.</p></article>`
  }));
  sitemap.push([`/focus/${m.key}/`, d]);
}

/* ---------- sitemap, RSS, home page ---------- */
const today = isoDate(D.UPDATED);
sitemap.unshift(['/', today]);
out.set('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemap.map(([u, d]) => `<url><loc>${SITE}${u}</loc>${d ? `<lastmod>${d}</lastmod>` : ''}</url>`).join('\n')}
</urlset>
`);
const rfc = d => new Date(d + 'T06:00:00Z').toUTCString();
const feedItems = [
  ...newsList.map(n => ({ t: n.title, u: `/news/${n.id}/`, d: isoDate(n.date), s: n.summary, c: T[n.theme] })),
  ...AN.map(a => ({ t: a.title, u: `/analysis/${a.id}/`, d: isoDate(a.date), s: strip(a.standfirst), c: 'Analysis' }))
].filter(x => x.d).sort((a, b) => b.d.localeCompare(a.d)).slice(0, 60);
out.set('feed.xml', `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${esc(FULL)}</title>
<link>${SITE}/</link>
<atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml"/>
<description>News and analysis on e-governance, digital public infrastructure, AI, cybersecurity and digitalisation, linked to sources.</description>
<language>en</language>
<lastBuildDate>${rfc(today)}</lastBuildDate>
${feedItems.map(x => `<item><title>${esc(x.t)}</title><link>${SITE}${x.u}</link><guid isPermaLink="true">${SITE}${x.u}</guid><pubDate>${rfc(x.d)}</pubDate><category>${esc(x.c || '')}</category><description>${esc(x.s)}</description></item>`).join('\n')}
</channel>
</rss>
`);

const indexPath = path.join(ROOT, 'index.html');
let index = fs.readFileSync(indexPath, 'utf8');
const latest = `<!--SEO:LATEST--><noscript><section class="wrap" style="padding:24px 0"><h2>Latest news</h2><ul>${newsList.slice(0, 30).map(n => `<li><a href="/news/${n.id}/">${esc(n.title)}</a> (${esc(n.date)})</li>`).join('')}</ul><h2>Analysis</h2><ul>${AN.map(a => `<li><a href="/analysis/${a.id}/">${esc(a.title)}</a></li>`).join('')}</ul><p><a href="/news/">All news</a> · <a href="/analysis/">All analysis</a> · <a href="/countries/">Country profiles</a></p></section></noscript><!--/SEO:LATEST-->`;
if (!/<!--SEO:LATEST-->[\s\S]*?<!--\/SEO:LATEST-->/.test(index)) throw new Error('index.html has no SEO:LATEST markers');
index = index.replace(/<!--SEO:LATEST-->[\s\S]*?<!--\/SEO:LATEST-->/, () => latest);
out.set('index.html', index);

/* ---------- write, removing pages whose item no longer exists ---------- */
for (const dir of ['news', 'analysis', 'countries', 'focus']) {
  const d = path.join(ROOT, dir);
  if (!fs.existsSync(d)) continue;
  for (const sub of fs.readdirSync(d)) {
    const rel = `${dir}/${sub}/index.html`;
    if (fs.statSync(path.join(d, sub)).isDirectory() && !out.has(rel)) fs.rmSync(path.join(d, sub), { recursive: true });
  }
}
let changed = 0;
for (const [rel, html] of out) {
  const f = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  if (!fs.existsSync(f) || fs.readFileSync(f, 'utf8') !== html) { fs.writeFileSync(f, html); changed++; }
}
console.log(`Static pages: ${out.size} files (${changed} changed), ${sitemap.length} URLs in sitemap, ${feedItems.length} feed items.`);
