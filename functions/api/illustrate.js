/* Creates an AI illustration for a news item with Cloudflare Workers AI (free daily allowance), for the image job.
   It only draws prompts that are already published in images.js as an open request (status "requested", noAi false),
   so callers cannot ask for arbitrary images. Results are cached so repeated calls do not use more of the allowance. */
const MODEL = '@cf/black-forest-labs/flux-1-schnell';
const STYLE = 'Style: clean, realistic editorial photo look, natural light, muted colours, wide 16:9 composition. No faces, no recognisable people, no text, letters or numbers, no logos or brand names, no flags, emblems or seals.';
export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id') || '';
  if (!/^n\d{1,5}$/.test(id)) return new Response('bad id', { status: 400 });
  if (!env.AI) return new Response('AI binding missing', { status: 503 });
  const src = await (await env.ASSETS.fetch(new URL('/images.js', url.origin))).text();
  const line = src.split('\n').find(l => l.startsWith(`"${id}":`));
  if (!line) return new Response('no request for this id', { status: 404 });
  let e; try { e = JSON.parse(line.slice(id.length + 3).replace(/,\s*$/, '')); } catch { return new Response('bad entry', { status: 500 }); }
  if (e.status !== 'requested' || e.noAi || !e.prompt) return new Response('not an open illustration request', { status: 404 });
  const cache = caches.default;
  const key = new Request(`${url.origin}/api/illustrate-cache/${id}/${encodeURIComponent(e.prompt).slice(0, 900)}`);
  const hit = await cache.match(key);
  if (hit) return hit;
  try {
    const out = await env.AI.run(MODEL, { prompt: `Editorial illustration for a news website about digital government and technology. ${e.prompt} ${STYLE}`.slice(0, 2000), steps: 8 });
    if (!out || !out.image) return new Response('no image returned', { status: 502 });
    const bin = Uint8Array.from(atob(out.image), c => c.charCodeAt(0));
    const res = new Response(bin, { headers: { 'content-type': 'image/jpeg', 'cache-control': 'public, max-age=86400' } });
    await cache.put(key, res.clone());
    return res;
  } catch (err) {
    return new Response('AI error: ' + String(err && err.message || err).slice(0, 200), { status: 502 });
  }
}
