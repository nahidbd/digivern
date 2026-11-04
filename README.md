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
| `focus.js` | Monthly Focus: the Country of the Month and Sector of the Month pages (`#focus`, `#focus-country`, `#focus-sector`), with key numbers, map, facts, analysis, people's views and numbered sources. Older months stay in the archive. |
| `events.js` | Events calendar (EVENTS) and open grants and funding calls (FUNDING) |
| `tools/collect-leads.mjs` and `.github/workflows/collect-leads.yml` | Daily lead collection from Gemini and ChatGPT (see below) |
| `analysis.js` | In-depth analysis: key numbers, charts, timeline, impact assessment, global and in-country comparison, numbered sources |
| `_headers` | Security headers |
| `wrangler.toml` | Cloudflare Pages settings and the statistics database binding |
| `functions/api/hit.js` | Records a page view (no cookies, no IP addresses) |
| `functions/api/stats.js` | Returns totals for the Site statistics page (`#stats`) |
| `netlify.toml` | Legacy Netlify settings (not used by Cloudflare) |

## Publishing

The repository is linked to Cloudflare Pages (project `digivern`, no build step). Every push to `main` publishes the site automatically within about a minute.

Writeup submissions from the Write for Digivern form are sent to Netlify Forms on digivern.netlify.app (free, unlimited) and reviewed there.

## Country profiles

`COUNTRIES` in `data.js` lists all 193 UN member states with region, flag code and UN E-Government Development Index 2024 rank and score (UN DESA). Every country has a page; countries with an entry in `PROFILES` get the full profile. Each profile has a `reviewed` date: the day every row was last checked against its sources. The daily update re-checks the profiles with the oldest `reviewed` dates and writes one new full profile each day until all 193 are done.

## Monthly Focus

Each month Digivern covers one country and one sector in more depth. November 2026: **Uganda** and **Agritech**.

- The editor chooses the next country and sector and records them in `NEXT` in `focus.js` (or tells Claude in chat).
- On the first day of the month the daily update adds the new month at the top of `MONTHS`, builds the country profile in `data.js` if it does not exist yet, and sets `NEXT` back to `null`. Past months stay online at `#focus-country-YYYY-MM` and `#focus-sector-YYYY-MM`.
- During the month the daily update adds extra news on the focus country (including its own national media and official sites) and on the focus sector worldwide, and refreshes the focus pages when sources show a change.

## Leads from Gemini and ChatGPT

Every morning at 05:05 Dhaka time a GitHub Actions job asks Gemini (with Google Search) and ChatGPT (with web search) for developments from the last 48 hours in Digivern's themes, the Country of the Month and the Sector of the Month. It saves the answers as **unverified leads** in `leads/latest.json` on the separate `leads` branch (last 30 days kept). Nothing on that branch is published on the site.

The daily update reads the leads, opens every source link itself, and publishes only what the original source confirms. Gemini and ChatGPT are never cited as sources.

Setup (GitHub → Settings → Secrets and variables → Actions):

- Secrets: `GEMINI_API_KEY` (from Google AI Studio) and `OPENAI_API_KEY` (from the OpenAI API platform). Either one alone also works.
- Optional variables: `GEMINI_MODEL` (default `gemini-2.5-pro`) and `OPENAI_MODEL` (default `gpt-5`) to switch models without changing code.
- Test: Actions → "Collect leads (Gemini and ChatGPT)" → Run workflow.

## Daily update

A scheduled task updates `data.js` every morning:

1. Search approved sources for new developments in the eight themes.
2. Add new items to `NEWS`, each with a summary in Digivern's own words, a "why it matters" note, a date and source links.
3. Check every name, number and date against the source before adding it.
4. Update the Policy Tracker and country profiles when a source shows a change.
5. Refresh the Weekly Global Brief on Mondays.
6. Set `UPDATED` to the day's date, check the site still loads, and push to `main`.

Items go live automatically. The Editor-in-Chief reviews them after publication; corrections are logged within 24 hours.
