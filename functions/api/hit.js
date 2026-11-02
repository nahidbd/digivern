/* Records one page view. No cookies, no IP addresses, no personal data:
   only the page, the referring site (domain only, first view of a visit), country, device type and time. */
const PATH = /^[a-z0-9-]{1,60}$/;
const REF = /^[a-z0-9.-]{0,80}$/;
export async function onRequestPost({ request, env }) {
  try {
    const ua = request.headers.get('user-agent') || '';
    if (/bot|crawl|spider|slurp|preview|headless|lighthouse/i.test(ua)) return new Response(null, { status: 204 });
    const b = await request.json();
    const path = String(b.p || 'home').toLowerCase();
    if (!PATH.test(path)) return new Response(null, { status: 204 });
    let ref = String(b.r || '').toLowerCase();
    if (!REF.test(ref)) ref = '';
    const now = Date.now();
    const day = new Date(now + 6 * 3600e3).toISOString().slice(0, 10); // Dhaka calendar day
    const device = /mobi|android|iphone|ipad/i.test(ua) ? 'mobile' : 'desktop';
    const country = (request.cf && request.cf.country) || null;
    await env.DB.prepare('INSERT INTO hits (ts, day, path, ref, country, visit, device) VALUES (?, ?, ?, ?, ?, ?, ?)')
      .bind(now, day, path, ref || null, country, b.v ? 1 : 0, device).run();
  } catch (e) { /* never break the page */ }
  return new Response(null, { status: 204 });
}
