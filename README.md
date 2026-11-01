# Digivern

Global intelligence on e-governance, digital public infrastructure (DPI), AI and cybersecurity.
A knowledge venture of Synapse Consulting.

Live site: https://digivern.pages.dev (Cloudflare Pages). The old address https://digivern.netlify.app is no longer updated; it is kept only because Netlify Forms stores writeup submissions there.

## Files

| File | What it holds |
|---|---|
| `index.html` | Page layout and styles |
| `app.js` | How pages are drawn (routing, filters, forms) |
| `data.js` | All content: news, reports, country profiles, tracker, glossary, sources |
| `_headers` | Security headers |
| `netlify.toml` | Legacy Netlify settings (not used by Cloudflare) |

## Publishing

The repository is linked to Cloudflare Pages (project `digivern`, no build step). Every push to `main` publishes the site automatically within about a minute.

Writeup submissions from the Write for Digivern form are sent to Netlify Forms on digivern.netlify.app (free, unlimited) and reviewed there.

## Daily update

A scheduled task updates `data.js` every morning:

1. Search approved sources for new developments in the eight themes.
2. Add new items to `NEWS`, each with a summary in Digivern's own words, a "why it matters" note, a date and source links.
3. Check every name, number and date against the source before adding it.
4. Update the Policy Tracker and country profiles when a source shows a change.
5. Refresh the Weekly Global Brief on Mondays.
6. Set `UPDATED` to the day's date, check the site still loads, and push to `main`.

Items go live automatically. The Editor-in-Chief reviews them after publication; corrections are logged within 24 hours.
