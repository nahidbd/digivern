// Digivern lead collector.
// Runs in GitHub Actions before the daily update. Asks Gemini (with Google Search) and ChatGPT (with web search)
// for recent developments in Digivern's themes, the Country of the Month and the Sector of the Month,
// and saves what they return as UNVERIFIED LEADS. Nothing here is published: the daily update opens every
// source link itself and publishes only what the original source confirms.
//
// Usage: node tools/collect-leads.mjs --site <path to site checkout> --out <output folder>
// Environment: GEMINI_API_KEY, OPENAI_API_KEY (either may be missing; that provider is then skipped),
//              GEMINI_MODEL, OPENAI_MODEL (optional overrides), LEADS_MOCK=1 (offline test).
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > -1 ? process.argv[i + 1] : d; };
const SITE = arg('site', '.');
const OUT = arg('out', 'leads-out');
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.1-pro-preview';
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-5';
const MOCK = process.env.LEADS_MOCK === '1';

// ---- read the site's own data so the prompt always matches the current themes and monthly focus ----
const sandbox = { window: {} };
vm.createContext(sandbox);
for (const f of ['data.js', 'focus.js']) {
  const p = path.join(SITE, f);
  if (fs.existsSync(p)) vm.runInContext(fs.readFileSync(p, 'utf8'), sandbox, { filename: f });
}
const DV = sandbox.window.DV || {};
const FOCUS = (sandbox.window.DV_FOCUS && sandbox.window.DV_FOCUS.MONTHS && sandbox.window.DV_FOCUS.MONTHS[0]) || null;
const THEMES = (DV.THEMES || []).map(t => `${t.label} (${t.desc})`);
const SECTORS = DV.SECTORS || [];
const known = new Set((DV.NEWS || []).flatMap(n => (n.links || []).map(l => normUrl(l[2]))));

const dhaka = new Date(Date.now() + 6 * 3600e3);
const today = dhaka.toISOString().slice(0, 10);

const focusText = FOCUS
  ? `This month's Country of the Month is ${FOCUS.country.name}: search its own national media and official government sites (in local languages too) and give at least 3 leads about ${FOCUS.country.name}. This month's Sector of the Month is ${FOCUS.sector.name}: give at least 3 leads about ${FOCUS.sector.name.toLowerCase()} anywhere in the world.`
  : '';

const PROMPT = `You are a research assistant for Digivern, a global news site on e-governance, digital public infrastructure (DPI), digital policy, AI, cybersecurity and the digitalisation of sectors. Today is ${today}.

Search the web for genuinely new developments published in the last 48 hours on these themes:
${THEMES.map(t => '- ' + t).join('\n')}

Sectors of interest: ${SECTORS.join('; ')}.
${focusText}

Rules:
- Only real articles or official documents you actually found in search results. Every lead must have the exact URL of the original page. Never invent or guess a URL, date, number or quote.
- Prefer official sources (governments, central banks, regulators, UN agencies, World Bank, development banks), then expert bodies, then major international and national media of record.
- Cover all regions, especially Africa, South Asia, Southeast Asia, Latin America and the Middle East, including non-English sources (summarise them in English).
- Exclude tenders, procurement notices, job adverts, conference or event announcements, calls for proposals, opinion pieces and press releases from private companies selling products.
- Give 10 to 20 leads.

Reply with ONLY a JSON array, no other text. Each element:
{"title": "...", "date": "YYYY-MM-DD (publication date on the page)", "country": "country name or Global", "region": "Africa|Americas|Asia-Pacific|Europe|Middle East|Global", "theme": "one of the themes above", "sector": "one of the sectors above", "summary": "2-3 factual sentences in English with the key names, numbers and dates exactly as the source states them", "source_url": "https://...", "source_name": "publisher", "source_type": "official|expert|media", "language": "language of the source", "focus": "country|sector|none"}`;

function normUrl(u) { try { const x = new URL(u); return (x.hostname.replace(/^www\./, '') + x.pathname).replace(/\/$/, '').toLowerCase(); } catch { return String(u || '').toLowerCase(); } }

function parseJsonArray(text) {
  if (!text) return [];
  let t = text.trim();
  const fence = t.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) t = fence[1];
  const a = t.indexOf('['), b = t.lastIndexOf(']');
  if (a < 0 || b < a) return [];
  try { const v = JSON.parse(t.slice(a, b + 1)); return Array.isArray(v) ? v : []; } catch { return []; }
}

function clean(leads, provider) {
  const out = [];
  for (const l of leads) {
    if (!l || typeof l !== 'object') continue;
    const url = String(l.source_url || '').trim();
    if (!/^https?:\/\//i.test(url)) continue;
    out.push({
      provider,
      title: String(l.title || '').slice(0, 300),
      date: String(l.date || '').slice(0, 20),
      country: String(l.country || '').slice(0, 60),
      region: String(l.region || '').slice(0, 30),
      theme: String(l.theme || '').slice(0, 80),
      sector: String(l.sector || '').slice(0, 60),
      focus: String(l.focus || 'none').slice(0, 10),
      summary: String(l.summary || '').slice(0, 1200),
      source_url: url.slice(0, 600),
      source_name: String(l.source_name || '').slice(0, 120),
      source_type: String(l.source_type || '').slice(0, 20),
      language: String(l.language || '').slice(0, 30),
      already_on_site: known.has(normUrl(url)),
      verified: false
    });
  }
  return out;
}

async function post(url, headers, body, timeoutMs = 300000) {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), timeoutMs);
  try {
    const r = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: JSON.stringify(body), signal: ctl.signal });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(`HTTP ${r.status}: ${(j.error && (j.error.message || j.error.status)) || 'request failed'}`);
    return j;
  } finally { clearTimeout(timer); }
}

async function withRetry(fn, tries = 3) {
  let err;
  for (let i = 0; i < tries; i++) {
    try { return await fn(); } catch (e) { err = e; if (/HTTP 4(0[0-4]|22)/.test(e.message)) break; await new Promise(r => setTimeout(r, 5000 * (i + 1))); }
  }
  throw err;
}

async function gemini() {
  const key = process.env.GEMINI_API_KEY;
  if (!key && !MOCK) return { ok: false, skipped: true, error: 'GEMINI_API_KEY not set' };
  const j = MOCK ? mockGemini() : await withRetry(() => post(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(GEMINI_MODEL)}:generateContent`,
    { 'x-goog-api-key': key },
    { contents: [{ role: 'user', parts: [{ text: PROMPT }] }], tools: [{ google_search: {} }], generationConfig: { temperature: 0.2 } }));
  const cand = (j.candidates || [])[0] || {};
  const text = ((cand.content && cand.content.parts) || []).map(p => p.text || '').join('');
  const grounding = ((cand.groundingMetadata && cand.groundingMetadata.groundingChunks) || []).map(c => c.web).filter(Boolean).map(w => ({ title: w.title || '', url: w.uri || '' }));
  const leads = clean(parseJsonArray(text), 'gemini');
  return { ok: true, model: GEMINI_MODEL, leads, search_results_seen: grounding, raw_if_unparsed: leads.length ? undefined : text.slice(0, 4000) };
}

async function openai() {
  const key = process.env.OPENAI_API_KEY;
  if (!key && !MOCK) return { ok: false, skipped: true, error: 'OPENAI_API_KEY not set' };
  const j = MOCK ? mockOpenAI() : await withRetry(() => post(
    'https://api.openai.com/v1/responses',
    { authorization: `Bearer ${key}` },
    { model: OPENAI_MODEL, tools: [{ type: 'web_search' }], input: PROMPT }));
  const parts = (j.output || []).filter(o => o.type === 'message').flatMap(o => o.content || []).filter(c => c.type === 'output_text');
  const text = parts.map(c => c.text || '').join('');
  const citations = parts.flatMap(c => (c.annotations || []).filter(a => a.type === 'url_citation').map(a => ({ title: a.title || '', url: a.url || '' })));
  const leads = clean(parseJsonArray(text), 'openai');
  return { ok: true, model: OPENAI_MODEL, leads, search_results_seen: citations, raw_if_unparsed: leads.length ? undefined : text.slice(0, 4000) };
}

const safe = async (name, fn) => { try { return await fn(); } catch (e) { return { ok: false, error: `${name}: ${e.message}` }; } };

const [g, o] = await Promise.all([safe('gemini', gemini), safe('openai', openai)]);

// merge: the same source URL from both providers becomes one lead marked as found by both
const merged = new Map();
for (const l of [...(g.leads || []), ...(o.leads || [])]) {
  const k = normUrl(l.source_url);
  if (merged.has(k)) { const m = merged.get(k); if (!m.found_by.includes(l.provider)) m.found_by.push(l.provider); }
  else { const { provider, ...rest } = l; merged.set(k, { ...rest, found_by: [provider] }); }
}
const leads = [...merged.values()].sort((a, b) => (b.found_by.length - a.found_by.length) || String(b.date).localeCompare(String(a.date)));

const result = {
  date: today,
  generated_at: new Date().toISOString(),
  notice: 'UNVERIFIED LEADS from Gemini and ChatGPT. Not for publication as they stand. Open every source_url and publish only what the original source confirms. Never cite Gemini or ChatGPT as a source.',
  focus: FOCUS ? { month: FOCUS.label, country: FOCUS.country.name, sector: FOCUS.sector.name } : null,
  providers: {
    gemini: { ok: !!g.ok, model: g.model || GEMINI_MODEL, leads: (g.leads || []).length, error: g.error || null },
    openai: { ok: !!o.ok, model: o.model || OPENAI_MODEL, leads: (o.leads || []).length, error: o.error || null }
  },
  leads,
  search_results_seen: { gemini: g.search_results_seen || [], openai: o.search_results_seen || [] },
  unparsed: { gemini: g.raw_if_unparsed || null, openai: o.raw_if_unparsed || null }
};

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, `${today}.json`), JSON.stringify(result, null, 2));
fs.writeFileSync(path.join(OUT, 'latest.json'), JSON.stringify(result, null, 2));
console.log(`Leads for ${today}: ${leads.length} unique (Gemini ${result.providers.gemini.leads}${g.error ? ' – ' + g.error : ''}; ChatGPT ${result.providers.openai.leads}${o.error ? ' – ' + o.error : ''})`);
if (!g.ok && !o.ok && !g.skipped && !o.skipped) process.exitCode = 1;

// ---- offline test fixtures (LEADS_MOCK=1) ----
function mockGemini() {
  return { candidates: [{ content: { parts: [{ text: '```json\n[{"title":"Test lead A","date":"' + today + '","country":"Uganda","region":"Africa","theme":"Digital Public Infrastructure","sector":"Government","summary":"Test.","source_url":"https://example.org/a","source_name":"Example","source_type":"media","language":"English","focus":"country"},{"title":"No url","source_url":""}]\n```' }] },
    groundingMetadata: { groundingChunks: [{ web: { uri: 'https://vertexaisearch.cloud.google.com/x', title: 'example.org' } }] } }] };
}
function mockOpenAI() {
  return { output: [{ type: 'web_search_call' }, { type: 'message', content: [{ type: 'output_text', text: '[{"title":"Test lead A (dup)","date":"' + today + '","country":"Uganda","region":"Africa","theme":"DPI","sector":"Government","summary":"Test.","source_url":"https://www.example.org/a/","source_name":"Example","source_type":"media","language":"English","focus":"country"},{"title":"Test lead B","date":"' + today + '","country":"Global","region":"Global","theme":"AI","sector":"Agriculture","summary":"Test.","source_url":"https://example.org/b","source_name":"Example","source_type":"expert","language":"English","focus":"sector"}]',
    annotations: [{ type: 'url_citation', url: 'https://example.org/b', title: 'B' }] }] }] };
}
