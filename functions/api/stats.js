/* Aggregated site statistics for the #stats page. Returns counts only. */
export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const days = Math.min(Math.max(parseInt(url.searchParams.get('days') || '30', 10) || 30, 1), 3650);
  const from = new Date(Date.now() + 6 * 3600e3 - (days - 1) * 86400e3).toISOString().slice(0, 10);
  const q = (sql, ...p) => env.DB.prepare(sql).bind(...p).all().then(r => r.results);
  try {
    const [tot, all, daily, pages, refs, countries, devices] = await Promise.all([
      q('SELECT COUNT(*) AS views, COALESCE(SUM(visit),0) AS visits FROM hits WHERE day >= ?', from),
      q('SELECT COUNT(*) AS views, COALESCE(SUM(visit),0) AS visits, MIN(day) AS since FROM hits'),
      q('SELECT day, COUNT(*) AS views, COALESCE(SUM(visit),0) AS visits FROM hits WHERE day >= ? GROUP BY day ORDER BY day', from),
      q('SELECT path, COUNT(*) AS views FROM hits WHERE day >= ? GROUP BY path ORDER BY views DESC LIMIT 200', from),
      q("SELECT COALESCE(ref,'') AS ref, COUNT(*) AS visits FROM hits WHERE day >= ? AND visit = 1 GROUP BY COALESCE(ref,'') ORDER BY visits DESC LIMIT 50", from),
      q("SELECT COALESCE(country,'') AS country, COALESCE(SUM(visit),0) AS visits, COUNT(*) AS views FROM hits WHERE day >= ? GROUP BY COALESCE(country,'') ORDER BY visits DESC, views DESC LIMIT 50", from),
      q('SELECT device, COALESCE(SUM(visit),0) AS visits FROM hits WHERE day >= ? GROUP BY device', from)
    ]);
    return Response.json({ days, from, total: tot[0], allTime: all[0], daily, pages, refs, countries, devices }, { headers: { 'cache-control': 'no-store' } });
  } catch (e) {
    return Response.json({ error: 'Statistics are not available right now.' }, { status: 503 });
  }
}
