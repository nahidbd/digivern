// Turns image requests in images.js into images for Digivern news items.
// Runs in GitHub Actions ("Process images"). For each entry with status "requested":
//   1. If a Wikimedia Commons file is named, read its licence from the Commons API and accept it only if it is
//      public domain, CC0, CC BY or CC BY-SA with no extra restrictions (personality rights, trademarks).
//      Download a 1600 px version and save it as img/<id>.webp with the author credit and licence.
//   2. Otherwise, unless noAi is set, ask Gemini for an editorial illustration from the prompt and save it,
//      credited as an AI-generated illustration.
//   3. If neither works, mark the entry "failed" with the reason; the site then shows the item without an image.
// Usage: node tools/process-images.mjs [--site .] [--max 12]
// Environment: GEMINI_API_KEY (needed for illustrations), GEMINI_IMAGE_MODEL (default gemini-2.5-flash-image), IMAGES_MOCK=1 (offline test).
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > -1 ? process.argv[i + 1] : d; };
const SITE = arg('site', '.');
const MAX = +arg('max', '12');
const MODEL = process.env.GEMINI_IMAGE_MODEL || 'gemini-2.5-flash-image';
const MOCK = process.env.IMAGES_MOCK === '1';
const UA = 'DigivernImageBot/1.0 (https://digivern.pages.dev)';
const FILE = path.join(SITE, 'images.js');
const OUTDIR = path.join(SITE, 'img');

const sharp = MOCK ? null : (await import('sharp')).default;

function load() {
  const src = fs.readFileSync(FILE, 'utf8');
  const box = { window: {} }; vm.createContext(box); vm.runInContext(src, box);
  const header = src.slice(0, src.indexOf('window.DV_IMAGES'));
  return { header, images: box.window.DV_IMAGES || {} };
}
function save(header, images) {
  const lines = Object.entries(images).map(([k, v]) => JSON.stringify(k) + ':' + JSON.stringify(v));
  fs.writeFileSync(FILE, header + 'window.DV_IMAGES = {\n' + lines.join(',\n') + (lines.length ? '\n' : '') + '};\n');
}

const strip = h => String(h || '').replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/\s+/g, ' ').trim();
const OK_LICENCE = /^(public domain|pd\b|pd-|cc0|cc[ -]by(-sa)?[ -]\d(\.\d)?)/i;
const BAD_LICENCE = /\b(nc|nd|non-?commercial|no ?deriv|fair use|copyrighted|all rights reserved)\b/i;

async function fetchJson(url) {
  const r = await fetch(url, { headers: { 'user-agent': UA } });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}
async function fetchBuf(url) {
  const r = await fetch(url, { headers: { 'user-agent': UA } });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return Buffer.from(await r.arrayBuffer());
}

async function fromCommons(title) {
  if (!/^File:/i.test(title)) title = 'File:' + title;
  const info = MOCK ? mockCommons(title) : await fetchJson('https://commons.wikimedia.org/w/api.php?action=query&format=json&formatversion=2&prop=imageinfo&iiprop=url|extmetadata|mime|size&iiurlwidth=1600&titles=' + encodeURIComponent(title));
  const page = (info.query && info.query.pages || [])[0];
  if (!page || page.missing) throw new Error('file not found on Commons');
  const ii = (page.imageinfo || [])[0]; if (!ii) throw new Error('no image info');
  if (!/^image\/(jpeg|png|webp|tiff)$/.test(ii.mime || '')) throw new Error('not a photo file (' + ii.mime + ')');
  const m = ii.extmetadata || {}; const v = k => (m[k] && m[k].value) || '';
  const licence = strip(v('LicenseShortName'));
  if (!OK_LICENCE.test(licence) || BAD_LICENCE.test(licence)) throw new Error('licence not allowed: ' + (licence || 'unknown'));
  if (strip(v('Restrictions'))) throw new Error('has restrictions: ' + strip(v('Restrictions')));
  if (/personality|trademark/i.test(strip(v('UsageTerms')))) throw new Error('usage terms restrict reuse');
  const credit = strip(v('Artist')) || strip(v('Credit')) || 'Unknown author';
  const buf = MOCK ? Buffer.alloc(10) : await fetchBuf(ii.thumburl || ii.url);
  return { kind: 'photo', buf, credit: credit.slice(0, 160), license: licence, licenseUrl: strip(v('LicenseUrl')) || '', sourceUrl: ii.descriptionurl || '' };
}

async function fromGemini(prompt) {
  const key = process.env.GEMINI_API_KEY;
  if (!key && !MOCK) throw new Error('GEMINI_API_KEY not set');
  const full = `Editorial illustration for a news website about digital government and technology. ${prompt}
Style: clean, realistic, natural light, muted colours, wide 16:9 composition.
Strict rules: no real or recognisable people (any people must be anonymous, seen from behind or at a distance), no text, letters or numbers, no logos or brand names, no flags, emblems or official seals, nothing that looks like a photograph of a specific real event.`;
  const j = MOCK ? mockGemini() : await (async () => {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(MODEL)}:generateContent`, {
      method: 'POST', headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: full }] }], generationConfig: { responseModalities: ['IMAGE'], imageConfig: { aspectRatio: '16:9' } } })
    });
    const b = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(`Gemini HTTP ${r.status}: ${(b.error && b.error.message) || ''}`.slice(0, 200));
    return b;
  })();
  const part = (((j.candidates || [])[0] || {}).content || {}).parts?.find(p => p.inlineData && p.inlineData.data);
  if (!part) throw new Error('Gemini returned no image');
  return { kind: 'ai', buf: Buffer.from(part.inlineData.data, 'base64'), credit: 'AI-generated illustration', license: '', licenseUrl: '', sourceUrl: '' };
}

async function toWebp(buf, file) {
  if (MOCK) { fs.writeFileSync(file, buf); return { w: 1200, h: 675 }; }
  const out = await sharp(buf).rotate().resize({ width: 1200, height: 675, fit: 'cover', position: 'attention' }).webp({ quality: 74 }).toFile(file);
  return { w: out.width, h: out.height };
}

const { header, images } = load();
const today = new Date(Date.now() + 6 * 3600e3).toISOString().slice(0, 10);
fs.mkdirSync(OUTDIR, { recursive: true });
let done = 0, failed = 0;
for (const [id, e] of Object.entries(images)) {
  if (!e || e.status !== 'requested') continue;
  if (done + failed >= MAX) break;
  if (!/^[a-z0-9-]{1,40}$/i.test(id)) { images[id] = { ...e, status: 'failed', reason: 'bad id' }; failed++; continue; }
  const tried = [];
  let got = null;
  if (e.commons) { try { got = await fromCommons(e.commons); } catch (err) { tried.push('photo: ' + err.message); } }
  if (!got && e.prompt && !e.noAi) { try { got = await fromGemini(e.prompt); } catch (err) { tried.push('illustration: ' + err.message); } }
  if (!got) {
    images[id] = { status: 'failed', alt: e.alt || '', commons: e.commons || '', prompt: e.prompt || '', noAi: !!e.noAi, reason: tried.join('; ') || 'no photo named and illustrations not allowed', date: today };
    failed++; console.log(`${id}: failed – ${images[id].reason}`); continue;
  }
  const rel = `img/${id}.webp`;
  const { w, h } = await toWebp(got.buf, path.join(SITE, rel));
  images[id] = { status: 'done', kind: got.kind, src: rel, w, h, alt: e.alt || '', credit: got.credit, license: got.license, licenseUrl: got.licenseUrl, sourceUrl: got.sourceUrl, date: today, ...(tried.length ? { note: tried.join('; ') } : {}) };
  done++; console.log(`${id}: ${got.kind} saved (${got.kind === 'photo' ? got.license + ', ' + got.credit : 'AI illustration'})`);
}
save(header, images);
console.log(`Images: ${done} added, ${failed} failed.`);

// ---- offline test fixtures (IMAGES_MOCK=1) ----
function mockCommons(title) {
  if (/Bad/.test(title)) return { query: { pages: [{ title, imageinfo: [{ mime: 'image/jpeg', url: 'u', extmetadata: { LicenseShortName: { value: 'CC BY-NC 4.0' } } }] }] } };
  return { query: { pages: [{ title, imageinfo: [{ mime: 'image/jpeg', url: 'https://upload.wikimedia.org/x.jpg', descriptionurl: 'https://commons.wikimedia.org/wiki/' + title, extmetadata: { LicenseShortName: { value: 'CC BY-SA 4.0' }, LicenseUrl: { value: 'https://creativecommons.org/licenses/by-sa/4.0' }, Artist: { value: '<a href="x">Jane Example</a>' } } }] }] } };
}
function mockGemini() { return { candidates: [{ content: { parts: [{ inlineData: { mimeType: 'image/png', data: Buffer.from('png').toString('base64') } }] } }] }; }
