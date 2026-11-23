// Builds plain HTML copies of GovTec content so that search engines and social networks can read them.
// The site itself is a single page that draws everything with JavaScript under "#..." addresses, which search
// engines treat as one page and link previews (LinkedIn, Facebook, WhatsApp, X) cannot read.
// This script writes, from data.js, analysis.js, focus.js, events.js and images.js:
//   news/<id>/index.html, analysis/<id>/index.html, countries/<id>/index.html, focus/<month>/index.html,
//   events/<id>/index.html, funding/<id>/index.html, topics/<theme>/index.html, sectors/<sector>/index.html,
//   hub pages (news/, analysis/, countries/, focus/, events/, funding/, topics/, policy-tracker/, glossary/),
//   sitemap.xml (with images), news-sitemap.xml (Google News), feed.xml (RSS), indexnow-urls.txt
//   and the <noscript> list of latest headlines in index.html.
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
const slug = s => String(s).toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const BUILD_NOW = Date.now();

function cite(s, prefix) {
  return esc(s).replace(/\[(\d+)\]/g, (m, n) => `<sup><a href="#${prefix}${n}">${n}</a></sup>`);
}

function page({ url, title, desc, image, type = 'article', jsonld = [], crumbs = [], body, app, published, modified, noindex }) {
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
<!-- Google Tag Manager -->
<script async src="https://www.googletagmanager.com/gtm.js?id=GTM-MSJLXW5D"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
</script>
<!-- End Google Tag Manager -->
<title>${esc(title)} | ${NAME}</title>
<meta name="description" content="${esc(clip(desc, 300))}">
<link rel="canonical" href="${canon}">
<meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}">
<meta name="author" content="${esc(FULL)}">
<meta property="og:locale" content="en_GB">
<meta property="og:site_name" content="${esc(FULL)}">
<meta property="og:type" content="${type}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(clip(desc, 300))}">
<meta property="og:url" content="${canon}">
<meta property="og:image" content="${esc(img)}">
<meta property="og:image:alt" content="${esc(clip(title, 200))}">
${published ? `<meta property="article:published_time" content="${published}">\n` : ''}${modified ? `<meta property="article:modified_time" content="${modified}">\n` : ''}<meta name="twitter:card" content="summary_large_image">
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
<nav aria-label="Main"><a href="/news/">News</a><a href="/analysis/">Analysis</a><a href="/countries/">Countries</a><a href="/focus/">Monthly Focus</a><a href="/policy-tracker/">Policy Tracker</a><a href="/events/">Events</a><a href="/funding/">Grants &amp; jobs</a></nav>
</div></header>
<main class="sp-wrap sp-main">
<p class="sp-crumb"><a href="/">Home</a>${crumbs.map(([n, u], i) => i === crumbs.length - 1 ? ` / <span>${esc(n)}</span>` : ` / <a href="${u}">${esc(n)}</a>`).join('')}</p>
${body}
${app ? `<p class="sp-app"><a class="sp-btn" href="${app}">Open in the interactive ${NAME} site</a></p>` : ''}
<p class="sp-share"><b>Share:</b> <a href="https://www.linkedin.com/sharing/share-offsite/?url=${share}" rel="noopener" target="_blank">LinkedIn</a> · <a href="https://x.com/intent/post?url=${share}&amp;text=${st}" rel="noopener" target="_blank">X</a> · <a href="https://www.facebook.com/sharer/sharer.php?u=${share}" rel="noopener" target="_blank">Facebook</a> · <a href="https://wa.me/?text=${st}%20${share}" rel="noopener" target="_blank">WhatsApp</a> · <a href="mailto:?subject=${st}&amp;body=${share}">Email</a></p>
</main>
<footer class="sp-foot"><div class="sp-wrap">
<p><b>${esc(FULL)}</b>: global intelligence on e-governance, digital public infrastructure, AI and cybersecurity, linked to its sources. A knowledge venture of <a href="https://synapseconsulting.services" rel="noopener">Synapse Consulting</a>. In beta: everything is free.</p>
<p><b>Topics:</b> ${D.THEMES.map(t => `<a href="/topics/${t.id}/">${esc(t.label)}</a>`).join(' · ')}</p>
<p><b>Sectors:</b> ${D.SECTORS.map(x => `<a href="/sectors/${slug(x)}/">${esc(x)}</a>`).join(' · ')}</p>
<p><a href="/news/">All news</a> · <a href="/analysis/">All analysis</a> · <a href="/countries/">Country profiles</a> · <a href="/events/">Events</a> · <a href="/funding/">Grants, fellowships and jobs</a> · <a href="/policy-tracker/">Policy &amp; Law Tracker</a> · <a href="/glossary/">Glossary</a> · <a href="/feed.xml">RSS feed</a> · <a href="/#about">Methodology</a> · <a href="/#contact">Contact</a></p>
</div></footer>
</body>
</html>
`;
}

const ORG = { '@type': 'Organization', '@id': SITE + '/#org', name: FULL, alternateName: NAME, url: SITE + '/', logo: { '@type': 'ImageObject', url: abs('img/emblem-512.png'), width: 512, height: 512 } };
const FREE = { isAccessibleForFree: true, inLanguage: 'en' };
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
<p class="sp-note">More on <a href="/topics/${n.theme}/">${esc(T[n.theme] || '')}</a> · <a href="/sectors/${slug(n.sector)}/">${esc(n.sector)}</a>${country ? ` · <a href="/countries/${n.country}/">${esc(country.name)}</a>` : ''}</p>
</article>`;
  write(`news/${n.id}/index.html`, page({
    url: `/news/${n.id}/`, title: n.title, desc: n.summary, image: im ? abs(im.src) : null,
    crumbs: [['News', '/news/'], [n.title, `/news/${n.id}/`]], app: `/#story-${n.id}`, published: d, modified: d,
    jsonld: [{
      '@context': 'https://schema.org', '@type': 'NewsArticle', headline: clip(n.title, 110), description: clip(n.summary, 300),
      datePublished: d, dateModified: d, image: im ? [abs(im.src)] : [abs('img/og-govtec.jpg')],
      articleSection: T[n.theme], keywords: [T[n.theme], n.sector, country && country.name].filter(Boolean).join(', '),
      author: ORG, publisher: ORG, mainEntityOfPage: SITE + `/news/${n.id}/`,
      isBasedOn: n.links.map(l => l[2]), ...FREE, ...(country ? { contentLocation: { '@type': 'Country', name: country.name } } : {})
    }],
    body
  }));
  sitemap.push([`/news/${n.id}/`, d, im ? [{ loc: abs(im.src), title: im.alt }] : []]);
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
  const aim = (a.related || []).map(imgOf).find(Boolean);
  write(`analysis/${a.id}/index.html`, page({
    url: `/analysis/${a.id}/`, title: a.title, desc: strip(a.standfirst), image: aim ? abs(aim.src) : null, published: d, modified: u,
    crumbs: [['Analysis', '/analysis/'], [a.title, `/analysis/${a.id}/`]], app: `/#analysis-${a.id}`,
    jsonld: [{
      '@context': 'https://schema.org', '@type': 'AnalysisNewsArticle', headline: clip(a.title, 110), description: clip(strip(a.standfirst), 300),
      datePublished: d, dateModified: u, image: [aim ? abs(aim.src) : abs('img/og-govtec.jpg')], articleSection: T[a.theme], author: ORG, publisher: ORG,
      mainEntityOfPage: SITE + `/analysis/${a.id}/`, citation: a.sources.map(s => s[2]), ...FREE, wordCount: (a.body || []).flatMap(b => b.p || []).join(' ').split(/\s+/).length,
      ...(country ? { contentLocation: { '@type': 'Country', name: country.name } } : {})
    }],
    body
  }));
  sitemap.push([`/analysis/${a.id}/`, u, aim ? [{ loc: abs(aim.src), title: aim.alt }] : []]);
}
write('analysis/index.html', page({
  url: '/analysis/', title: 'In-depth analysis on digital government and DPI', type: 'website',
  desc: 'GovTec in-depth analysis: policy, implementation, money, impact and voices on digital government, digital public infrastructure, payments, health and cybersecurity, with numbered sources.',
  crumbs: [['Analysis', '/analysis/']], app: '/#reports',
  body: `<h1>Analysis</h1><p class="sp-lead">Deep, source-numbered analysis of the most significant developments, published every Saturday.</p><ul class="sp-list">${AN.map(a => `<li><a href="/analysis/${a.id}/">${esc(a.title)}</a><br><small>${esc(a.date)} · ${esc(a.kicker || '')}</small><br>${esc(clip(strip(a.standfirst), 260))}</li>`).join('')}</ul>`
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

// Countries that have news but no full profile yet get a basic page (UN EGDI data and their news), so that
// searches for a country's digital government news land on GovTec.
const newsOnlyIds = [...new Set(newsList.map(n => n.country).filter(id => id && C[id] && !D.PROFILES[id]))].sort((a, b) => C[a].name.localeCompare(C[b].name));
for (const id of newsOnlyIds) {
  const c = C[id];
  const news = newsList.filter(n => n.country === id);
  const title = `${c.name}: digital government and digital public infrastructure news`;
  const desc = `GovTec news on ${c.name}’s digital government, digital ID, payments, data and cybersecurity, linked to sources. ${c.name} ranks ${c.egdiRank} of 193 in the UN E-Government Development Index 2024 (score ${c.egdi.toFixed(3)}).`;
  const last = isoDate(news[0].date);
  const body = `<article class="sp-article">
<p class="sp-kicker">Country page · ${esc(c.region)}</p>
<h1>${esc(c.name)}: digital government news</h1>
<p class="sp-meta">UN E-Government Development Index 2024: rank ${c.egdiRank} of 193 · score ${c.egdi.toFixed(3)} (<a href="${esc(D.EGDI_SOURCE[1])}" rel="noopener">${esc(D.EGDI_SOURCE[0])}</a>)</p>
<p class="sp-lead">A full GovTec country profile of ${esc(c.name)} (digital identity, payments, data exchange, data protection, cybersecurity and AI governance) is in preparation. Below is every GovTec news item about ${esc(c.name)}, newest first.</p>
<h2>News on ${esc(c.name)}</h2><ul class="sp-list">${news.map(newsCard).join('')}</ul>
</article>`;
  write(`countries/${id}/index.html`, page({
    url: `/countries/${id}/`, title, desc, crumbs: [['Countries', '/countries/'], [c.name, `/countries/${id}/`]], app: `/#country-${id}`, modified: last,
    jsonld: [{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: title, description: clip(desc, 300), dateModified: last, about: { '@type': 'Country', name: c.name }, publisher: ORG, ...FREE }],
    body
  }));
  sitemap.push([`/countries/${id}/`, last]);
}
write('countries/index.html', page({
  url: '/countries/', title: 'Country profiles: digital ID, payments, data protection and e-government', type: 'website',
  desc: `GovTec country profiles of digital public infrastructure and e-government for ${profIds.length} countries, each reviewed at least every 30 days and linked to official sources.`,
  crumbs: [['Countries', '/countries/']], app: '/#countries',
  body: `<h1>Country profiles</h1><p class="sp-lead">Digital identity, payments, data exchange, civil registration, data protection, cybersecurity and AI governance, country by country, with sources.</p><ul class="sp-list">${profIds.map(id => `<li><a href="/countries/${id}/">${esc(C[id].name)}</a> <small>· ${esc(C[id].region)} · EGDI ${esc(D.PROFILES[id].egdi)} · reviewed ${esc(D.PROFILES[id].reviewed)}</small></li>`).join('')}</ul>${newsOnlyIds.length ? `<h2>More countries in the news</h2><p>Full profiles in preparation; these pages list GovTec news and UN EGDI 2024 data.</p><ul class="sp-list">${newsOnlyIds.map(id => `<li><a href="/countries/${id}/">${esc(C[id].name)}</a> <small>· ${esc(C[id].region)} · EGDI rank ${C[id].egdiRank} of 193</small></li>`).join('')}</ul>` : ''}`
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

/* ---------- monthly focus hub ---------- */
if ((FOCUS.MONTHS || []).length) {
  write('focus/index.html', page({
    url: '/focus/', title: 'Monthly Focus: one country and one sector in depth each month', type: 'website',
    desc: 'GovTec Monthly Focus: each month an in-depth look at one country’s digital government and one sector’s digitalisation, with numbered sources.',
    crumbs: [['Monthly Focus', '/focus/']], app: '/#focus',
    body: `<h1>Monthly Focus</h1><p class="sp-lead">Each month GovTec looks in depth at one country and one sector.</p><ul class="sp-list">${FOCUS.MONTHS.map(m => `<li><a href="/focus/${m.key}/">${esc(m.label)}: ${esc(m.country ? m.country.name : '')}${m.country && m.sector ? ' and ' : ''}${esc(m.sector ? m.sector.name : '')}</a><br><small>Published ${esc(m.published || m.label)}</small></li>`).join('')}</ul>`
  }));
  sitemap.push(['/focus/', isoDate(FOCUS.MONTHS[0].published || FOCUS.MONTHS[0].label)]);
}

/* ---------- events ---------- */
const EV = (window.DV_EVENTS || []).slice().sort((a, b) => (a.start || '9999').localeCompare(b.start || '9999'));
const todayIso = isoDate(D.UPDATED);
const evUpcoming = EV.filter(e => !e.start || (e.end || e.start) >= todayIso);
const evPast = EV.filter(e => e.start && (e.end || e.start) < todayIso).reverse();
const evLine = e => `<li><a href="/events/${e.id}/">${esc(e.title)}</a><br><small>${esc(e.type)} · ${esc(e.dateText || 'Dates to be announced')} · ${esc(e.city)}${e.country && e.country !== e.city ? ', ' + esc(e.country) : ''} · ${esc(e.format)}</small></li>`;
const isOnline = e => e.format === 'Online' || e.city === 'Online';
/* schema.org Offer for an event: price 0 only when the organiser says the event is free; otherwise the registration
   link and the cost text as published (no price is guessed). */
const evOffer = e => {
  const cost = (e.cost || '').trim();
  const free = /^free\b/i.test(cost);
  const o = { '@type': 'Offer', url: e.url };
  if (free) Object.assign(o, { price: 0, priceCurrency: 'USD', availability: 'https://schema.org/InStock' });
  if (cost && !/^not stated$/i.test(cost)) o.description = cost;
  return o;
};
for (const e of EV) {
  const past = e.start && (e.end || e.start) < todayIso;
  const postponed = /postpon/i.test(e.dateText || '') || /postpon/i.test(e.note || '');
  const title = `${e.title}${e.start ? ' (' + e.dateText + ')' : ''}`;
  const desc = `${e.type} on ${T[e.theme] || e.sector}: ${e.dateText || 'dates to be announced'}, ${isOnline(e) ? 'online' : e.city + ', ' + e.country}. Organised by ${e.organiser}. ${e.note || ''}`;
  const body = `<article class="sp-article">
<p class="sp-kicker">Event · ${esc(e.type)} · ${esc(T[e.theme] || '')} · ${esc(e.sector)}</p>
<h1>${esc(e.title)}</h1>
${past ? '<p class="sp-note">This event has taken place.</p>' : ''}
<dl class="sp-dl"><dt>When</dt><dd>${e.start ? `<time datetime="${esc(e.start)}">${esc(e.dateText)}</time>` : esc(e.dateText || 'Dates to be announced')}</dd>
<dt>Where</dt><dd>${isOnline(e) ? 'Online' : esc(e.city) + ', ' + esc(e.country)} (${esc(e.format)})</dd>
<dt>Organiser</dt><dd>${esc(e.organiser)}</dd><dt>Cost</dt><dd>${esc(e.cost || 'Not stated')}</dd>${e.note ? `<dt>Notes</dt><dd>${esc(e.note)}</dd>` : ''}</dl>
<p><a class="sp-btn" href="${esc(e.url)}" rel="noopener">Official event page</a></p>
<p><small>Source: <a href="${esc(e.source[2])}" rel="noopener">${esc(e.source[0])}</a>, ${esc(e.source[1])}. Checked ${esc(e.checked || '')}. Always confirm details with the organiser.</small></p>
<p class="sp-note">More events: <a href="/events/">all upcoming events</a> · <a href="/topics/${e.theme}/">${esc(T[e.theme] || '')}</a></p>
</article>`;
  const ld = e.start ? [{
    '@context': 'https://schema.org', '@type': 'Event', name: e.title, description: clip(desc, 300),
    startDate: e.start, endDate: e.end || e.start,
    eventStatus: postponed ? 'https://schema.org/EventPostponed' : 'https://schema.org/EventScheduled',
    eventAttendanceMode: isOnline(e) ? 'https://schema.org/OnlineEventAttendanceMode' : e.format === 'Hybrid' ? 'https://schema.org/MixedEventAttendanceMode' : 'https://schema.org/OfflineEventAttendanceMode',
    location: isOnline(e) ? { '@type': 'VirtualLocation', url: e.url } : [{ '@type': 'Place', name: e.city, address: { '@type': 'PostalAddress', addressLocality: e.city, addressCountry: e.country } }, ...(e.format === 'Hybrid' ? [{ '@type': 'VirtualLocation', url: e.url }] : [])],
    organizer: { '@type': 'Organization', name: e.organiser, url: e.url },
    /* Speakers are not tracked, so the organiser is named as the presenting organisation. */
    performer: { '@type': 'Organization', name: e.organiser, url: e.url },
    offers: evOffer(e),
    url: SITE + `/events/${e.id}/`, image: [abs('img/og-govtec.jpg')]
  }] : [];
  write(`events/${e.id}/index.html`, page({
    url: `/events/${e.id}/`, title, desc, crumbs: [['Events', '/events/'], [e.title, `/events/${e.id}/`]], app: '/#events', jsonld: ld, body, modified: e.checked
  }));
  if (!past) sitemap.push([`/events/${e.id}/`, e.checked || todayIso]);
}
write('events/index.html', page({
  url: '/events/', title: 'Events on e-governance, DPI, AI, cybersecurity and fintech: conferences, webinars and workshops', type: 'website',
  desc: `Calendar of ${evUpcoming.length} upcoming conferences, summits, forums, workshops, seminars, webinars and trainings worldwide on e-governance, digital public infrastructure, digital ID, AI governance, cybersecurity, fintech and health tech, checked against organisers’ pages.`,
  crumbs: [['Events', '/events/']], app: '/#events',
  jsonld: [{ '@context': 'https://schema.org', '@type': 'ItemList', name: 'Upcoming events', itemListElement: evUpcoming.filter(e => e.start).map((e, i) => ({ '@type': 'ListItem', position: i + 1, url: SITE + `/events/${e.id}/` })) }],
  body: `<h1>Events</h1><p class="sp-lead">Conferences, summits, forums, workshops, seminars, webinars and trainings on digital government, DPI, AI, cybersecurity, fintech and digital health, in person and online.</p>
<h2>Upcoming</h2><ul class="sp-list">${evUpcoming.filter(e => e.start).map(evLine).join('')}</ul>
${evUpcoming.some(e => !e.start) ? `<h2>Dates to be announced</h2><ul class="sp-list">${evUpcoming.filter(e => !e.start).map(evLine).join('')}</ul>` : ''}
${evPast.length ? `<h2>Recently held</h2><ul class="sp-list">${evPast.map(evLine).join('')}</ul>` : ''}`
}));
sitemap.push(['/events/', todayIso]);

/* ---------- grants, fellowships and jobs ---------- */
const FU = (window.DV_FUNDING || []).slice().sort((a, b) => a.close.localeCompare(b.close));
const fuOpen = FU.filter(f => Date.parse(f.close) > BUILD_NOW);
const JOBKIND = { Job: 'FULL_TIME', Consultancy: 'CONTRACTOR', Internship: 'INTERN' };
const ALIAS = { 'united-states': ['USA', 'US'], 'united-kingdom': ['UK'], 'republic-of-korea': ['South Korea', 'Korea'], 'turkiye': ['Turkey'] };
const reEsc = x => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
function countriesIn(txt) { // longest names first, so "Papua New Guinea" is not also read as "Guinea"
  let t = String(txt || ''); const found = [];
  const names = D.COUNTRIES.flatMap(c => [c.name, ...(ALIAS[c.id] || [])].map(n => [n, c])).sort((a, b) => b[0].length - a[0].length);
  for (const [n, c] of names) { const re = new RegExp('\\b' + reEsc(n) + '\\b', n.length <= 3 ? '' : 'i'); if (re.test(t)) { if (!found.includes(c)) found.push(c); t = t.replace(new RegExp('\\b' + reEsc(n) + '\\b', n.length <= 3 ? 'g' : 'gi'), ' '); } }
  return found;
}
const fuLine = f => `<li><a href="/funding/${f.id}/">${esc(f.title)}</a><br><small>${esc(f.kind)} · ${esc(f.funder)} · closes ${esc(f.closeText)}</small></li>`;
for (const f of FU) {
  const open = Date.parse(f.close) > BUILD_NOW;
  const closeDay = f.close.slice(0, 10);
  const title = `${f.title} — ${f.funder}`;
  const desc = `${f.kind}: ${f.summary} Who can apply: ${f.who}. Where: ${f.where}. Deadline: ${f.closeText}.`;
  const body = `<article class="sp-article">
<p class="sp-kicker">${esc(f.kind)} · ${esc(T[f.theme] || '')} · ${esc(f.sector)}</p>
<h1>${esc(f.title)}</h1>
<p class="sp-meta">${esc(f.funder)} · ${open ? 'Deadline' : 'Closed'}: ${esc(f.closeText)}</p>
<p class="sp-lead">${esc(f.summary)}</p>
<dl class="sp-dl">${f.amount ? `<dt>Amount</dt><dd>${esc(f.amount)}</dd>` : ''}${f.duration ? `<dt>Duration</dt><dd>${esc(f.duration)}</dd>` : ''}<dt>Who can apply</dt><dd>${esc(f.who)}</dd><dt>Where</dt><dd>${esc(f.where)}</dd><dt>Deadline</dt><dd>${esc(f.closeText)}</dd></dl>
<p><a class="sp-btn" href="${esc(f.url)}" rel="noopener">Apply on the official page</a></p>
<p><small>Checked ${esc(f.checked || '')}. GovTec lists opportunities free of charge and never asks for fees; apply only through the organisation’s own page.</small></p>
<p class="sp-note">More: <a href="/funding/">all open grants, fellowships and jobs</a> · <a href="/topics/${f.theme}/">${esc(T[f.theme] || '')}</a></p>
</article>`;
  let ld = [];
  const ctry = countriesIn(f.where), remote = /home-based|remote/i.test(f.where || '');
  if (open && JOBKIND[f.kind] && ctry.length && (remote || ctry.length <= 2)) {
    const jp = {
      '@context': 'https://schema.org', '@type': 'JobPosting', title: f.title,
      description: `<p>${esc(f.summary)}</p><p>Who can apply: ${esc(f.who)}</p><p>Where: ${esc(f.where)}</p>${f.amount ? `<p>Pay: ${esc(f.amount)}</p>` : ''}${f.duration ? `<p>Duration: ${esc(f.duration)}</p>` : ''}<p>Deadline: ${esc(f.closeText)}. Apply on the organisation’s official page: ${esc(f.url)}</p>`,
      datePosted: f.checked, validThrough: f.close, employmentType: JOBKIND[f.kind],
      hiringOrganization: { '@type': 'Organization', name: f.funder, sameAs: new URL(f.url).origin },
      directApply: false
    };
    if (remote) { jp.jobLocationType = 'TELECOMMUTE'; jp.applicantLocationRequirements = ctry.map(c => ({ '@type': 'Country', name: c.name })); }
    else jp.jobLocation = ctry.map(c => {
      const parts = f.where.replace(/\([^)]*\)/g, '').split(/[,;]/).map(x => x.trim());
      const i = parts.findIndex(x => x.toLowerCase().includes(c.name.toLowerCase()));
      const loc = i > 0 && !/site|based|remote|duty|station/i.test(parts[i - 1]) && !countriesIn(parts[i - 1]).length ? parts[i - 1].replace(/^duty station\s+/i, '') : '';
      return { '@type': 'Place', address: { '@type': 'PostalAddress', ...(loc ? { addressLocality: loc } : {}), addressCountry: c.iso2.toUpperCase() } };
    });
    ld = [jp];
  }
  write(`funding/${f.id}/index.html`, page({
    url: `/funding/${f.id}/`, title, desc, crumbs: [['Grants & jobs', '/funding/'], [f.title, `/funding/${f.id}/`]], app: '/#funding', jsonld: ld, body, modified: f.checked, noindex: !open
  }));
  if (open) sitemap.push([`/funding/${f.id}/`, f.checked || todayIso]);
}
const byKind = {};
for (const f of fuOpen) (byKind[f.kind] = byKind[f.kind] || []).push(f);
write('funding/index.html', page({
  url: '/funding/', title: 'Grants, fellowships, jobs and consultancies in digital government, DPI, AI and fintech', type: 'website',
  desc: `${fuOpen.length} open opportunities: grants, fellowships, scholarships, awards, accelerators, calls for proposals and papers, trainings, jobs, consultancies and internships in digital government, digital public infrastructure, AI, data, cybersecurity, fintech and digital health. Free to use; every item links to the organisation’s own page.`,
  crumbs: [['Grants & jobs', '/funding/']], app: '/#funding',
  jsonld: [{ '@context': 'https://schema.org', '@type': 'ItemList', name: 'Open opportunities', itemListElement: fuOpen.map((f, i) => ({ '@type': 'ListItem', position: i + 1, url: SITE + `/funding/${f.id}/` })) }],
  body: `<h1>Grants, fellowships and jobs</h1><p class="sp-lead">Open opportunities for people and organisations working on digital government, DPI, AI, data, cybersecurity, fintech and digital health, soonest deadline first. GovTec never charges and never lists anything that asks applicants for fees.</p>
${Object.entries(byKind).map(([k, list]) => `<h2>${esc(k)}</h2><ul class="sp-list">${list.map(fuLine).join('')}</ul>`).join('\n')}`
}));
sitemap.push(['/funding/', todayIso]);

/* ---------- topic and sector hubs ---------- */
const anList = AN.map(a => `<li><a href="/analysis/${a.id}/">${esc(a.title)}</a><br><small>${esc(a.date)} · ${esc(a.kicker || '')}</small></li>`);
for (const t of D.THEMES) {
  const news = newsList.filter(n => n.theme === t.id), ans = AN.filter(a => a.theme === t.id);
  const evs = evUpcoming.filter(e => e.theme === t.id && e.start), fus = fuOpen.filter(f => f.theme === t.id);
  const title = `${t.label}: news, analysis, events and opportunities`;
  write(`topics/${t.id}/index.html`, page({
    url: `/topics/${t.id}/`, title, type: 'website', desc: `GovTec on ${t.label.toLowerCase()}: ${t.desc} ${news.length} news items, ${ans.length} analyses, ${evs.length} upcoming events and ${fus.length} open opportunities, linked to sources.`,
    crumbs: [['Topics', '/news/'], [t.label, `/topics/${t.id}/`]], app: '/#news', modified: news[0] ? isoDate(news[0].date) : null,
    jsonld: [{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: title, description: t.desc, publisher: ORG, ...FREE }],
    body: `<h1>${esc(t.label)}</h1><p class="sp-lead">${esc(t.desc)}</p>
${ans.length ? `<h2>Analysis</h2><ul class="sp-list">${ans.map(a => anList[AN.indexOf(a)]).join('')}</ul>` : ''}
${news.length ? `<h2>News</h2><ul class="sp-list">${news.map(newsCard).join('')}</ul>` : ''}
${evs.length ? `<h2>Upcoming events</h2><ul class="sp-list">${evs.map(evLine).join('')}</ul>` : ''}
${fus.length ? `<h2>Open grants and jobs</h2><ul class="sp-list">${fus.map(fuLine).join('')}</ul>` : ''}`
  }));
  sitemap.push([`/topics/${t.id}/`, news[0] ? isoDate(news[0].date) : todayIso]);
}
for (const sec of D.SECTORS) {
  const sl = slug(sec);
  const news = newsList.filter(n => n.sector === sec), ans = AN.filter(a => a.sector === sec);
  const evs = evUpcoming.filter(e => e.sector === sec && e.start), fus = fuOpen.filter(f => f.sector === sec);
  const title = `${sec}: digitalisation news, analysis and opportunities`;
  write(`sectors/${sl}/index.html`, page({
    url: `/sectors/${sl}/`, title, type: 'website', desc: `GovTec on digitalisation in ${sec.toLowerCase()}: ${news.length} news items, ${ans.length} analyses, ${evs.length} upcoming events and ${fus.length} open opportunities worldwide, linked to sources.`,
    crumbs: [['Sectors', '/news/'], [sec, `/sectors/${sl}/`]], app: '/#news', modified: news[0] ? isoDate(news[0].date) : null,
    jsonld: [{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: title, publisher: ORG, ...FREE }],
    body: `<h1>${esc(sec)}</h1><p class="sp-lead">News, analysis, events and opportunities on digitalisation in ${esc(sec.toLowerCase())}, worldwide.</p>
${ans.length ? `<h2>Analysis</h2><ul class="sp-list">${ans.map(a => anList[AN.indexOf(a)]).join('')}</ul>` : ''}
${news.length ? `<h2>News</h2><ul class="sp-list">${news.map(newsCard).join('')}</ul>` : '<p>No news items yet.</p>'}
${evs.length ? `<h2>Upcoming events</h2><ul class="sp-list">${evs.map(evLine).join('')}</ul>` : ''}
${fus.length ? `<h2>Open grants and jobs</h2><ul class="sp-list">${fus.map(fuLine).join('')}</ul>` : ''}`
  }));
  sitemap.push([`/sectors/${sl}/`, news[0] ? isoDate(news[0].date) : todayIso]);
}

/* ---------- policy & law tracker, glossary ---------- */
write('policy-tracker/index.html', page({
  url: '/policy-tracker/', title: 'Policy & Law Tracker: AI, data protection, cybersecurity and DPI laws worldwide', type: 'website',
  desc: `GovTec tracks ${D.LAWS.length} laws and policies on AI, data protection, cybersecurity and digital public infrastructure worldwide, with their status and official texts.`,
  crumbs: [['Policy & Law Tracker', '/policy-tracker/']], app: '/#tracker',
  jsonld: [{ '@context': 'https://schema.org', '@type': 'ItemList', name: 'Policy & Law Tracker', itemListElement: D.LAWS.map((l, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'Legislation', name: l.name, legislationJurisdiction: l.where, ...(/^\d{4}$/.test(l.year) ? { legislationDate: l.year } : {}), url: l.url } })) }],
  body: `<h1>Policy &amp; Law Tracker</h1><p class="sp-lead">Laws, regulations and strategies on AI, data protection, cybersecurity and digital public infrastructure, with links to the official texts.</p>
<div class="sp-table"><table><thead><tr><th>Jurisdiction</th><th>Law or policy</th><th>Area</th><th>Year</th><th>Status</th></tr></thead><tbody>${D.LAWS.map(l => `<tr><td>${esc(l.where)}</td><td><a href="${esc(l.url)}" rel="noopener">${esc(l.name)}</a></td><td>${esc(D.LAWCATS[l.cat] || l.cat)}</td><td>${esc(l.year)}</td><td>${esc(l.status)}</td></tr>`).join('')}</tbody></table></div>`
}));
sitemap.push(['/policy-tracker/', todayIso]);
write('glossary/index.html', page({
  url: '/glossary/', title: 'Glossary of digital government and digital public infrastructure terms', type: 'website',
  desc: `Plain-language definitions of ${D.GLOSSARY.length} terms in digital government, digital public infrastructure (DPI), digital ID, payments, data and AI governance.`,
  crumbs: [['Glossary', '/glossary/']], app: '/#learn',
  jsonld: [{ '@context': 'https://schema.org', '@type': 'DefinedTermSet', name: 'GovTec glossary', url: SITE + '/glossary/', hasDefinedTerm: D.GLOSSARY.map(g => ({ '@type': 'DefinedTerm', name: g[0], description: g[1] })) }],
  body: `<h1>Glossary</h1><p class="sp-lead">Key terms in digital government and digital public infrastructure, in plain language.</p><dl class="sp-dl">${D.GLOSSARY.map(g => `<dt id="${slug(g[0])}">${esc(g[0])}</dt><dd>${esc(g[1])}</dd>`).join('')}</dl>`
}));
sitemap.push(['/glossary/', todayIso]);

/* ---------- sitemap, RSS, home page ---------- */
const today = isoDate(D.UPDATED);
sitemap.unshift(['/', today]);
out.set('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${sitemap.map(([u, d, ims]) => `<url><loc>${SITE}${u}</loc>${d ? `<lastmod>${d}</lastmod>` : ''}${(ims || []).map(im => `<image:image><image:loc>${esc(im.loc)}</image:loc></image:image>`).join('')}</url>`).join('\n')}
</urlset>
`);
// Google News sitemap: news and analysis from the last two days (Google reads only those).
const recentCut = ymd(...(d => [d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()])(new Date(Date.parse(today + 'T00:00:00Z') - 2 * 864e5)));
const recent = [
  ...newsList.map(n => ({ u: `/news/${n.id}/`, d: isoDate(n.date), t: n.title })),
  ...AN.map(a => ({ u: `/analysis/${a.id}/`, d: isoDate(a.date), t: a.title }))
].filter(x => x.d && x.d >= recentCut);
out.set('news-sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${recent.map(x => `<url><loc>${SITE}${x.u}</loc><news:news><news:publication><news:name>${NAME}</news:name><news:language>en</news:language></news:publication><news:publication_date>${x.d}</news:publication_date><news:title>${esc(x.t)}</news:title></news:news></url>`).join('\n')}
</urlset>
`);
// Every URL, one per line, for the IndexNow ping in the "Build static pages" workflow.
out.set('indexnow-urls.txt', sitemap.map(([u]) => SITE + u).join('\n') + '\n');
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
const latest = `<!--SEO:LATEST--><noscript><section class="wrap" style="padding:24px 0"><h2>Latest news</h2><ul>${newsList.slice(0, 30).map(n => `<li><a href="/news/${n.id}/">${esc(n.title)}</a> (${esc(n.date)})</li>`).join('')}</ul><h2>Analysis</h2><ul>${AN.map(a => `<li><a href="/analysis/${a.id}/">${esc(a.title)}</a></li>`).join('')}</ul><p><a href="/news/">All news</a> · <a href="/analysis/">All analysis</a> · <a href="/countries/">Country profiles</a> · <a href="/focus/">Monthly Focus</a> · <a href="/events/">Events</a> · <a href="/funding/">Grants, fellowships and jobs</a> · <a href="/policy-tracker/">Policy &amp; Law Tracker</a> · <a href="/glossary/">Glossary</a></p><p>Topics: ${D.THEMES.map(t => `<a href="/topics/${t.id}/">${esc(t.label)}</a>`).join(' · ')}</p></section></noscript><!--/SEO:LATEST-->`;
if (!/<!--SEO:LATEST-->[\s\S]*?<!--\/SEO:LATEST-->/.test(index)) throw new Error('index.html has no SEO:LATEST markers');
index = index.replace(/<!--SEO:LATEST-->[\s\S]*?<!--\/SEO:LATEST-->/, () => latest);
out.set('index.html', index);

/* ---------- write, removing pages whose item no longer exists ---------- */
for (const dir of ['news', 'analysis', 'countries', 'focus', 'events', 'funding', 'topics', 'sectors']) {
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
