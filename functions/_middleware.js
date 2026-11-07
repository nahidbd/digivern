// Moves visitors from the old address (digivern.pages.dev) to the new one (cgtk-sc.pages.dev).
// Only GET/HEAD requests on the old host are redirected; everything else passes through unchanged.
const OLD_HOST = 'digivern.pages.dev';
const NEW_ORIGIN = 'https://cgtk-sc.pages.dev';
export async function onRequest(context) {
  const url = new URL(context.request.url);
  const m = context.request.method;
  if (url.hostname === OLD_HOST && (m === 'GET' || m === 'HEAD')) {
    return Response.redirect(NEW_ORIGIN + url.pathname + url.search, 301);
  }
  return context.next();
}
