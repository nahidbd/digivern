// Moves visitors from the old addresses (digivern.pages.dev, cgtk-sc.pages.dev and www.govtec.org) to the main one (govtec.org).
// Only GET/HEAD requests on those exact hosts are redirected; preview deployments (<hash>.cgtk-sc.pages.dev) and everything else pass through unchanged.
const OLD_HOSTS = ['digivern.pages.dev', 'cgtk-sc.pages.dev', 'www.govtec.org'];
const NEW_ORIGIN = 'https://govtec.org';
export async function onRequest(context) {
  const url = new URL(context.request.url);
  const m = context.request.method;
  if (OLD_HOSTS.includes(url.hostname) && (m === 'GET' || m === 'HEAD') && !url.pathname.startsWith('/api/')) {
    return Response.redirect(NEW_ORIGIN + url.pathname + url.search, 301);
  }
  return context.next();
}
