(function(){
const $ = s => document.querySelector(s);
const {UPDATED, THEMES, T, REGIONS, NEWS, TRUST, REPORTS, PROFILES, COUNTRIES, LAWS, LAWCATS, GLOSSARY, SOURCES, SAMPLE_QS, ANSWERS, NEWSORDER, BRIEF} = window.DV;
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ---------- state ---------- */
const st = {theme:'all', newsTheme:'all', region:'all', official:false, confirmed:false, q:'', lawCat:'all', lawQ:'', cRegion:'all', tTheme:'all', glossQ:'', askI:0, askFree:''};
try { const saved = JSON.parse(localStorage.getItem('digivern-filters')||'{}'); Object.assign(st, saved); } catch(e) {}
function persist(){ try{ localStorage.setItem('digivern-filters', JSON.stringify({region:st.region, official:st.official, confirmed:st.confirmed})); }catch(e){} }

/* ---------- helpers ---------- */
const trustBadge = n => `<span class="badge ${TRUST[n.trust][1]}">${TRUST[n.trust][0]} source</span>`;
const verifyText = n => n.sources >= 2 ? 'Confirmed by 2 sources' : (n.trust === 'media' ? 'Reported by 1 source' : 'Single ' + TRUST[n.trust][0].toLowerCase() + ' source');
const dots = n => `<span class="dots" aria-hidden="true">${'●'.repeat(Math.min(n.sources,2))}<span class="off">${'●'.repeat(2-Math.min(n.sources,2))}</span></span>`;
const evidence = n => `<div class="evidence"><span>${T[n.theme].code} / ${esc(n.region).toUpperCase()}</span><span>${esc(n.date).toUpperCase()}</span><span>${dots(n)} ${verifyText(n)}</span><span>AI SUMMARY · SOURCE-CHECKED</span></div>`;
const ext = (url, text) => url ? `<a href="${esc(url)}" target="_blank" rel="noopener">${text}</a>` : `<span class="muted">${text}</span>`;
function newsRow(n){
  return `<article class="newsitem"><span class="code">${T[n.theme].code}</span><div class="stack" style="gap:8px">
    <div class="row" style="gap:6px">${trustBadge(n)}<span class="badge b-plain">${esc(n.type)}</span></div>
    <h3><a href="#story-${n.id}">${esc(n.title)}</a></h3>
    <p class="muted">${esc(n.summary.split('. ')[0])}.</p>
    ${evidence(n)}</div></article>`;
}
function pagehead(crumb, title, lede, actions){
  return `<div class="pagehead"><div class="wrap"><p class="crumb"><a href="#home">Home</a> / ${crumb}</p>
  <div class="row" style="justify-content:space-between;align-items:end;gap:16px"><div class="stack" style="gap:8px"><h1>${title}</h1>${lede?`<p class="muted prose" style="font-size:1.08rem">${lede}</p>`:''}</div>${actions||''}</div></div></div>`;
}
function toast(msg){ const t=document.createElement('div'); t.className='toast'; t.setAttribute('role','status'); t.textContent=msg; document.body.appendChild(t); setTimeout(()=>t.remove(),2600); }
function newsletterBlock(){
  return `<section class="band" id="subscribe-band"><div class="wrap"><div class="card" style="padding:32px;flex-direction:row;flex-wrap:wrap;gap:24px;align-items:center;justify-content:space-between">
  <div class="stack" style="gap:6px;flex:1 1 360px;min-width:0"><h2>The Weekly Global Brief</h2><p class="muted">The developments that mattered, every week, in a five-minute read. Free.</p></div>
  <form class="row js-sub" style="flex:1 1 380px;min-width:0"><label class="sr" for="sub-email">Email address</label><input id="sub-email" type="email" required placeholder="you@organisation.org" style="flex:1 1 220px;width:auto"><button class="btn" type="submit">Subscribe</button></form>
  </div></div></section>`;
}
const SORTED = NEWSORDER.map(id => NEWS.find(n => n.id === id));

/* ---------- views ---------- */
const V = {};

V.home = () => {
  const lead = SORTED[0];
  const briefItems = BRIEF.top.map(id => NEWS.find(n => n.id === id)).filter(n => n && n !== lead);
  const briefIds = new Set(briefItems.map(n => n.id));
  let seconds = SORTED.filter(n => n !== lead && !briefIds.has(n.id));
  if (seconds.length < 4) seconds = seconds.concat(SORTED.filter(n => n !== lead && briefIds.has(n.id)));
  seconds = seconds.slice(0, 4);
  const laws = LAWS.slice().sort((a,b) => (parseInt(b.year)||0) - (parseInt(a.year)||0)).slice(0, 4);
  const spotItem = SORTED.find(n => n.country && PROFILES[n.country]);
  const spotId = spotItem ? spotItem.country : 'rwanda';
  const spotC = COUNTRIES.find(c => c.id === spotId);
  const spotP = PROFILES[spotId];
  const kick = n => `${esc(T[n.theme].label)} · ${esc(n.region)}`;
  const statusColor = s => s.startsWith('In force') || s.startsWith('Adopted') ? 'var(--accent)' : 'var(--red)';
  return `
  <div class="wrap front">
    <div class="front-top">
      <article class="lead">
        <p class="kicker">Lead · ${kick(lead)}</p>
        <h1><a href="#story-${lead.id}">${esc(lead.title)}</a></h1>
        <p class="standfirst">${esc(lead.summary)}</p>
        <p class="whyline">Why it matters: ${esc(lead.why)}</p>
        ${evidence(lead)}
        <a href="#story-${lead.id}" style="font-weight:700">Read the full item →</a>
      </article>
      <aside class="brief" aria-label="The Weekly Brief">
        <h2>The Weekly Brief</h2>
        <p class="muted" style="font-size:.95rem">${esc(REPORTS.find(r=>r.id==='r1').title.replace('Weekly Global Brief: ',''))} · the developments that mattered</p>
        <ol>${briefItems.slice(0,5).map(n => `<li><a href="#story-${n.id}">${esc(n.title)}</a></li>`).join('')}</ol>
        <a href="#report-r1" style="font-weight:700">Read the full brief →</a>
      </aside>
    </div>

    <div class="seconds">
      ${seconds.map(n => `<article><p class="kicker" style="font-size:.76rem">${kick(n)}</p><h3><a href="#story-${n.id}">${esc(n.title)}</a></h3><p class="muted" style="font-size:1rem">${esc(n.why)}</p><p class="evidence">${esc(n.date).toUpperCase()} · ${verifyText(n)}</p></article>`).join('')}
    </div>

    <div class="boxes">
      <section class="snap" aria-label="Policy and Law Tracker">
        <h2 style="color:var(--accent)">Policy &amp; Law Tracker</h2>
        <div>${laws.map(l => `<div class="line"><span><b>${esc(l.where)}</b> · ${esc(l.name)}</span><span style="color:${statusColor(l.status)};font-weight:700;white-space:nowrap">${esc(l.status.split(' · ')[0])}</span></div>`).join('')}</div>
        <a href="#tracker" style="font-weight:700">All ${LAWS.length} instruments →</a>
      </section>
      <section class="spot" aria-label="Country spotlight">
        <p class="kicker">Country spotlight</p>
        <h2 style="font-size:2rem">${esc(spotC.name)}</h2>
        <ul style="margin:0;padding-left:18px;display:flex;flex-direction:column;gap:6px">${spotP.rows.slice(0,3).map(r => `<li><b>${esc(r[0])}:</b> ${esc(r[1])}</li>`).join('')}</ul>
        <a href="#country-${spotId}" style="font-weight:700">Open the profile →</a>
      </section>
    </div>

    <div class="themes-row" role="navigation" aria-label="Browse by theme">
      <span class="eyebrow" style="margin-right:6px">Browse by theme</span>
      ${THEMES.map(t => `<a class="chip" href="#news" data-act="gotheme" data-v="${t.id}" style="text-decoration:none">${esc(t.label)}</a>`).join('')}
    </div>
  </div>

  <section class="band band-alt" style="margin-top:44px"><div class="wrap">
    <div class="head-row"><div class="stack" style="gap:6px"><h2>Analysis &amp; Reports</h2><p class="muted">The Weekly Global Brief and explainers are free. Deep-dives, regional reports and the annual outlook are Premium.</p></div><a href="#reports" style="font-weight:700">All reports →</a></div>
    <div class="grid g4">${REPORTS.slice(0,4).map(reportCard).join('')}</div>
  </div></section>

  <section class="band"><div class="wrap">
    <div class="card" style="background:var(--accent-soft);border-color:transparent;padding:32px;flex-direction:row;flex-wrap:wrap;gap:28px;align-items:center">
      <div class="stack" style="flex:1 1 380px;min-width:0;gap:8px">
        <p class="kicker">Consulting Desk</p>
        <h2>Concept notes, ToRs and policy briefs in 3–10 working days.</h2>
        <p class="muted">Built from Digivern's verified library. A senior expert reviews and signs off every deliverable.</p>
      </div>
      <a href="#consulting" class="btn">Request a deliverable</a>
    </div>
  </div></section>
  ${newsletterBlock()}`;
};
function tool(href,title,desc,code){ return `<a class="card" href="${href}"><span class="mono" style="color:var(--accent);font-weight:600">${code}</span><h3>${title}</h3><p class="muted">${desc}</p></a>`; }
function reportCard(r){
  const badge = r.status==='soon' ? '<span class="badge b-plain">In preparation</span>' : '';
  return `<a class="card" href="#report-${r.id}"><div class="row" style="gap:6px"><span class="badge ${r.access==='free'?'b-official':'b-premium'}">${r.access==='free'?'Free':'Premium'}</span><span class="badge b-plain">${esc(r.freq)}</span>${badge}</div>
  <h3>${esc(r.title)}</h3><p class="mono muted">${esc(r.kind).toUpperCase()} · ${T[r.theme].code}</p></a>`;
}
function pipeline(){
  const s = [['COLLECT','Scout agent','Monitors approved sources several times a day.'],['VERIFY','Curator agent','Removes duplicates; media reports need a second source or are labelled.'],['DRAFT','Writer agent','Writes an original summary and a "why it matters" note.'],['FACT-CHECK','Fact-checker agent','A separate agent re-reads the sources and checks every name, number and date.'],['PUBLISH','Automatic','Items that pass the source check go live. The editor reviews them and corrections are logged within 24 hours.']];
  return `<ol class="pipeline pipeline-wrap">${s.map((x,i)=>`<li><span class="st">${String(i+1).padStart(2,'0')} ${x[0]}</span><b>${x[1]}</b><span class="muted">${x[2]}</span></li>`).join('')}</ol>`;
}

V.news = () => {
  let items = SORTED.filter(n => (st.newsTheme==='all'||n.theme===st.newsTheme) && (st.region==='all'||n.region===st.region) && (!st.official||n.trust==='official') && (!st.confirmed||n.sources>=2));
  if (st.q) { const q = st.q.toLowerCase(); items = items.filter(n => (n.title+' '+n.summary+' '+T[n.theme].label+' '+n.region+' '+n.sector).toLowerCase().includes(q)); }
  return pagehead('News Desk','News Desk','Curated global news across eight themes. Each item has an original summary, a note on why it matters and a direct link to its source.',
    `<button class="btn btn-line" data-act="follow">Follow these filters</button>`) + `
  <section class="band"><div class="wrap layout-side">
    <aside class="filterbox" aria-label="Filters">
      <div class="field"><label for="nq">Search</label><input id="nq" type="search" value="${esc(st.q)}" placeholder="Keyword, country, sector…" data-input="q"></div>
      <div class="stack" style="gap:8px"><span class="field"><span class="lab">Trust</span></span>
        <button class="toggle" data-act="official" aria-pressed="${st.official}">Official sources only <span class="sw">${st.official?'ON':'OFF'}</span></button>
        <button class="toggle" data-act="confirmed" aria-pressed="${st.confirmed}">Confirmed by 2+ sources <span class="sw">${st.confirmed?'ON':'OFF'}</span></button>
      </div>
      <div class="field"><label for="nt">Theme</label><select id="nt" data-change="newsTheme"><option value="all">All eight themes</option>${THEMES.map(t=>`<option value="${t.id}" ${st.newsTheme===t.id?'selected':''}>${esc(t.label)}</option>`).join('')}</select></div>
      <div class="field"><label for="nr">Region</label><select id="nr" data-change="region"><option value="all">All regions</option>${REGIONS.map(r=>`<option ${st.region===r?'selected':''}>${r}</option>`).join('')}</select></div>
      <div class="field"><label for="na">Audience</label><select id="na"><option>Everyone</option><option>Government</option><option>Development partner</option><option>Civil society</option><option>Private sector</option><option>Research</option></select></div>
    </aside>
    <div class="main">
      <div class="row" style="justify-content:space-between;margin-bottom:6px"><p class="muted"><b style="color:var(--ink)">${items.length}</b> items · updated ${UPDATED}</p><button class="btn btn-line" data-act="reset" style="min-height:38px">Clear filters</button></div>
      <div class="card" style="padding:4px 22px">${items.length ? items.map(newsRow).join('') : `<p style="padding:24px 0" class="muted">No items match these filters. Turn off a trust filter or choose another region.</p>`}</div>
    </div>
  </div></section>`;
};

V.story = id => {
  const n = NEWS.find(x => x.id === id) || SORTED[0];
  const related = SORTED.filter(x => x.theme === n.theme && x.id !== n.id).slice(0,3);
  const prof = n.country && PROFILES[n.country] ? COUNTRIES.find(c => c.id === n.country) : null;
  return `<div class="pagehead"><div class="wrap"><p class="crumb"><a href="#home">Home</a> / <a href="#news">News</a> / ${esc(T[n.theme].label)}</p>
    <div class="row" style="gap:6px">${trustBadge(n)}<span class="badge b-plain">${esc(n.type)}</span><span class="badge b-plain">${esc(n.region)}</span><span class="badge b-plain">${esc(n.sector)}</span></div>
    <h1 style="max-width:24ch">${esc(n.title)}</h1>${evidence(n)}</div></div>
  <section class="band"><div class="wrap layout-side">
    <article class="main stack prose" style="gap:18px;font-size:1.06rem">
      <p>${esc(n.summary)}</p>
      <div class="why"><b>Why it matters.</b> ${esc(n.why)}</div>
      <div class="how"><span class="eyebrow">How this was made</span>
        <p>Summary drafted by AI in Digivern's own words from the sources below, and checked against them on ${UPDATED}. ${n.trust==='media'&&n.sources<2?'This item rests on one media report, so details are attributed to it.':''} Published automatically after the source check; the editor reviews items after publication.</p>
        <p class="mono muted">Scout → Curator → Writer → Fact-checker → Published → Editor review</p></div>
      <div class="stack" style="gap:8px"><h2 style="font-size:1.3rem">Sources</h2>
        <ol style="margin:0;padding-left:20px" class="stack">${n.links.map(l=>`<li>${ext(l[2],esc(l[0]))} <span class="badge ${TRUST[l[3]][1]}">${TRUST[l[3]][0]}</span> <span class="muted">${esc(l[1])}</span></li>`).join('')}</ol></div>
      <div class="row"><button class="btn btn-line" data-act="save">Save</button><button class="btn btn-line" data-act="copylink">Copy link</button><a class="btn btn-line" href="#contact">Report a problem</a></div>
    </article>
    <aside class="stack">
      ${prof?`<a class="card" href="#country-${prof.id}"><span class="eyebrow">Country profile</span><h3>${esc(prof.name)}</h3><p class="muted">ID, payments, data protection and key institutions.</p></a>`:''}
      <div class="card"><span class="eyebrow">Related</span>${related.length?related.map(r=>`<a href="#story-${r.id}" style="font-weight:600">${esc(r.title)}</a>`).join(''):'<p class="muted">More on this theme soon.</p>'}</div>
      <div class="card" style="background:var(--accent-soft);border-color:transparent"><h3>Ask about this story</h3><p>Ask Digivern a follow-up question. Answers cite the verified library.</p><a class="btn" href="#ask" style="align-self:flex-start">Ask Digivern</a></div>
    </aside>
  </div></section>`;
};

V.reports = () => pagehead('Analysis &amp; Reports','Analysis &amp; Reports','The Weekly Global Brief, explainers, monthly deep-dives, quarterly regional reports and the annual State of Digital Governance outlook. Every figure is footnoted.') + `
  <section class="band"><div class="wrap stack" style="gap:28px">
    ${[['Free','free'],['Premium','premium']].map(([lab,acc])=>`<div><div class="head-row"><h2>${lab}</h2>${acc==='premium'?'<a href="#premium">See Premium plans →</a>':''}</div><div class="grid g4">${REPORTS.filter(r=>r.access===acc).map(reportCard).join('')}</div></div>`).join('')}
  </div></section>`;

function briefBody(){
  const pick = BRIEF.top.map(id => NEWS.find(n=>n.id===id)).filter(Boolean);
  return `<h2>The five developments that mattered</h2>
    <ol class="stack" style="margin:0;padding-left:22px;gap:14px">${pick.map((n,i)=>`<li><b><a href="#story-${n.id}">${esc(n.title)}</a></b><br><span class="muted">${esc(n.why)}</span><a class="cite" href="#story-${n.id}">${i+1}</a></li>`).join('')}</ol>
    <h2>Also this week</h2>
    <ul class="stack" style="margin:0;padding-left:20px;gap:8px">${BRIEF.also.map(id=>NEWS.find(x=>x.id===id)).filter(Boolean).map(n=>`<li><a href="#story-${n.id}">${esc(n.title)}</a></li>`).join('')}</ul>
    <p class="footnote">${pick.map((n,i)=>`${i+1}. ${esc(n.links[0][1])}, ${esc(n.date)}`).join(' · ')}</p>`;
}
function dpiBody(){
  return `<h2>The short version</h2>
    <p>Digital public infrastructure (DPI) means shared digital systems that a whole society can use, run in the public interest. The three most common are <b>digital identity</b>, <b>digital payments</b> and <b>data exchange</b>. Many services, public and private, can be built on top of them.</p>
    <h2>Why governments build it</h2>
    <ul class="stack" style="margin:0;padding-left:20px;gap:8px"><li>People prove who they are once and use that across many services.</li><li>Payments, such as social transfers, reach people directly and cheaply.</li><li>Agencies share data through standard, secured channels instead of asking citizens for the same documents again.</li></ul>
    <h2>What can go wrong</h2>
    <p>If systems are badly designed or records are wrong, people can be shut out of services they are entitled to. A 2026 report on 11 African countries found exactly this pattern in foundational ID and mandatory digital gateways.<a class="cite" href="#story-n2">1</a> That is why safeguards, redress and inclusion are part of good DPI, not extras.</p>
    <h2>Examples on Digivern</h2>
    <ul class="stack" style="margin:0;padding-left:20px;gap:8px"><li><a href="#country-india">India</a>: Aadhaar, UPI and DigiLocker</li><li><a href="#country-estonia">Estonia</a>: eID and the X-Road data exchange</li><li><a href="#country-rwanda">Rwanda</a>: a single digital ID with digitised civil registration</li><li><a href="#country-brazil">Brazil</a>: gov.br and Pix</li></ul>
    <p class="footnote">1. CIPESA, State of Internet Freedom in Africa 2026, reported by Biometric Update, 13 Oct 2026.</p>`;
}
V.report = id => {
  const r = REPORTS.find(x => x.id === id) || REPORTS[0];
  const live = r.status === 'live';
  return `<div class="pagehead"><div class="wrap"><p class="crumb"><a href="#home">Home</a> / <a href="#reports">Analysis</a> / ${esc(r.kind)}</p>
    <div class="row" style="gap:6px"><span class="badge ${r.access==='free'?'b-official':'b-premium'}">${r.access==='free'?'Free':'Premium'}</span><span class="badge b-plain">${esc(r.freq)}</span><span class="badge b-plain">${T[r.theme].code}</span>${live?'':'<span class="badge b-plain">In preparation</span>'}</div>
    <h1 style="max-width:26ch">${esc(r.title)}</h1><p class="mono muted">${live?'PUBLISHED '+UPDATED.toUpperCase()+' · AI-DRAFTED, SOURCE-CHECKED':'FIRST EDITION IN PREPARATION'}</p></div></div>
  <section class="band"><div class="wrap layout-side">
    <article class="main stack prose" style="gap:18px;font-size:1.05rem">
      ${r.id==='r1' ? briefBody() : r.id==='r7' ? dpiBody() :
      `<p>This ${esc(r.kind.toLowerCase())} is in preparation. It will be built from the verified library, with a numbered footnote on every figure and a named expert reviewer.</p>
      <div class="lock"><span class="badge b-premium">Premium</span><h3>Get it when it is published</h3><p class="muted">Premium readers receive deep-dives, regional reports and the annual outlook as they are released.</p><div class="row"><a class="btn" href="#premium">See plans</a><a class="btn btn-line" href="#report-r1">Read the free weekly brief</a></div></div>`}
      ${live?`<div class="how"><span class="eyebrow">How this was made</span><p>Drafted by Digivern's Writer agent from items in the verified library, checked against their sources, and published automatically.</p></div>`:''}
    </article>
    <aside class="stack"><div class="card"><span class="eyebrow">More reports</span>${REPORTS.filter(x=>x.id!==r.id).slice(0,4).map(x=>`<a href="#report-${x.id}" style="font-weight:600">${esc(x.title)}</a>`).join('')}</div></aside>
  </div></section>`;
};

V.countries = () => {
  const list = COUNTRIES.filter(c => st.cRegion==='all' || c.region===st.cRegion).sort((a,b)=> (b.ready-a.ready));
  return pagehead('Countries','Country profiles','One template for every country, so profiles can be compared: digital ID, payments, data exchange, key laws, institutions and recent news.') + `
  <section class="band"><div class="wrap stack" style="gap:20px">
    <div class="row" role="toolbar" aria-label="Filter by region"><button class="chip" data-act="cregion" data-v="all" aria-pressed="${st.cRegion==='all'}">All regions</button>${REGIONS.filter(r=>r!=='Global').map(r=>`<button class="chip" data-act="cregion" data-v="${r}" aria-pressed="${st.cRegion===r}">${r}</button>`).join('')}</div>
    <div class="grid g4">${list.map(c=>`<a class="card" href="#country-${c.id}"><span class="mono muted">${esc(c.region).toUpperCase()}</span><h3>${esc(c.name)}</h3><span class="badge ${c.ready?'b-official':'b-plain'}" style="align-self:flex-start">${c.ready?'Profile live':'In preparation'}</span></a>`).join('')}</div>
    <p class="muted">${Object.keys(PROFILES).length} profiles are live. More are added each week, towards all UN member states.</p>
  </div></section>`;
};

V.country = id => {
  const c = COUNTRIES.find(x => x.id === id) || COUNTRIES[0];
  const p = PROFILES[c.id];
  const ST = {op:['Operational','b-official'],part:['In rollout','b-media'],law:['Law in force','b-expert'],ver:['To verify','b-plain']};
  const news = SORTED.filter(n => n.country === c.id);
  const head = `<div class="pagehead"><div class="wrap"><p class="crumb"><a href="#home">Home</a> / <a href="#countries">Countries</a> / ${esc(c.name)}</p>
    <div class="row" style="justify-content:space-between;align-items:end"><div class="stack" style="gap:8px"><span class="eyebrow">${esc(c.region)} · Country profile</span><h1>${esc(c.name)}</h1><p class="mono muted">${p?'LAST REVIEWED '+UPDATED.toUpperCase():'PROFILE IN PREPARATION'}</p></div>
    <div class="row"><a class="btn btn-line" href="#countries">All countries</a><button class="btn" data-act="follow">Follow ${esc(c.name)}</button></div></div></div></div>`;
  if (!p) return head + `<section class="band"><div class="wrap stack" style="gap:16px"><div class="notice">This profile is in preparation. It will follow the same template as the live profiles, with every entry linked to a source.</div>
    <p>Live profiles you can read now: ${Object.keys(PROFILES).map(k=>{const x=COUNTRIES.find(y=>y.id===k);return `<a href="#country-${k}">${esc(x.name)}</a>`;}).join(', ')}.</p></div></section>`;
  return head + `
  <section class="band"><div class="wrap layout-side">
    <div class="main stack" style="gap:20px">
      <div class="tablebox"><table><thead><tr><th scope="col">Building block</th><th scope="col">System or institution</th><th scope="col">Status</th></tr></thead><tbody>
        ${p.rows.map(r=>`<tr><th scope="row" style="font-weight:600">${esc(r[0])}</th><td>${esc(r[1])}</td><td><span class="badge ${ST[r[2]][1]}">${ST[r[2]][0]}</span></td></tr>`).join('')}
      </tbody></table></div>
      <div class="card"><h3>Recent developments</h3>${news.length?news.map(n=>`<div class="row" style="gap:14px;padding:8px 0;border-top:1px solid var(--line)"><span class="mono" style="color:var(--accent);min-width:110px">${esc(n.date).toUpperCase()}</span><a href="#story-${n.id}" style="flex:1 1 300px">${esc(n.title)}</a></div>`).join(''):'<p class="muted">No items in the last month.</p>'}</div>
      <div class="card"><h3>Sources</h3><ol style="margin:0;padding-left:20px" class="stack">${p.sources.map(s=>`<li>${ext(s[1],esc(s[0]))}</li>`).join('')}</ol><p class="footnote">Entries marked "To verify" are not yet confirmed against an official source.</p></div>
    </div>
    <aside class="stack">
      <div class="card" style="background:var(--accent-soft);border-color:transparent"><span class="eyebrow" style="color:var(--accent)">Key facts</span>
        ${[['Lead digital agency',p.agency],['Strategy or programme',p.strategy],['UN E-Government Development Index',p.egdi]].map(f=>`<div><div class="mono" style="color:var(--mast-muted)">${f[0].toUpperCase()}</div><div style="font-weight:600">${esc(f[1])}</div></div>`).join('')}</div>
      <div class="card"><h3>Spot something out of date?</h3><p class="muted">Send a correction with a source. Editors review every suggestion.</p><a class="btn" href="#contact" style="align-self:flex-start">Suggest a correction</a></div>
    </aside>
  </div></section>`;
};

V.tracker = () => {
  let rows = LAWS.filter(l => st.lawCat==='all' || l.cat===st.lawCat);
  if (st.lawQ) { const q=st.lawQ.toLowerCase(); rows = rows.filter(l => (l.where+' '+l.name).toLowerCase().includes(q)); }
  const sb = s => s.startsWith('Draft') ? 'b-media' : s.startsWith('In force') ? 'b-official' : 'b-plain';
  return pagehead('Policy &amp; Law Tracker','Policy &amp; Law Tracker','Digital strategies, data protection laws, AI rules, cybersecurity laws and DPI frameworks worldwide, each linked to its source.',`<button class="btn" data-act="alerts">Get change alerts</button>`) + `
  <section class="band"><div class="wrap stack" style="gap:16px">
    <div class="row" role="toolbar" aria-label="Filter by category">${Object.entries(LAWCATS).map(([k,v])=>`<button class="chip" data-act="lawcat" data-v="${k}" aria-pressed="${st.lawCat===k}">${v}</button>`).join('')}
      <label class="sr" for="lq">Search instruments</label><input id="lq" type="search" placeholder="Search jurisdiction or instrument…" value="${esc(st.lawQ)}" data-input="lawQ" style="flex:1 1 240px;width:auto"></div>
    <p class="muted"><b style="color:var(--ink)">${rows.length}</b> instruments · ${LAWCATS[st.lawCat]}</p>
    <div class="tablebox"><table><thead><tr><th scope="col">Jurisdiction</th><th scope="col">Instrument</th><th scope="col">Category</th><th scope="col">Year</th><th scope="col">Status</th><th scope="col">Source</th></tr></thead><tbody>
      ${rows.length?rows.map(l=>`<tr><td style="font-weight:600">${esc(l.where)}</td><td>${esc(l.name)}</td><td><span class="badge b-plain">${LAWCATS[l.cat]}</span></td><td class="num">${l.year}</td><td><span class="badge ${sb(l.status)}">${esc(l.status)}</span></td><td>${l.url?ext(l.url,'Open ↗'):'<span class="muted">Link to add</span>'}</td></tr>`).join(''):`<tr><td colspan="6" class="muted">No instruments match. Try another word or category.</td></tr>`}
    </tbody></table></div>
    <p class="footnote">Year is the year of adoption or enactment. Statuses checked on ${UPDATED}. <a href="#contact">Report an outdated entry</a></p>
  </div></section>`;
};



V.ask = () => {
  const asked = st.askFree || SAMPLE_QS[st.askI];
  const a = ANSWERS[st.askI];
  const srcs = st.askFree ? [] : a.src.map(id => NEWS.find(n=>n.id===id));
  return pagehead('Ask Digivern','Ask Digivern','Ask in your own language. Answers draw only on Digivern’s verified library and cite every source. Ask Digivern does not search the open web.') + `
  <section class="band"><div class="wrap layout-side">
    <div class="main stack" style="gap:18px">
      <div class="row">${SAMPLE_QS.map((q,i)=>`<button class="chip" data-act="askq" data-v="${i}" aria-pressed="${!st.askFree&&st.askI===i}">${esc(q)}</button>`).join('')}</div>
      <div class="card" style="padding:24px;gap:18px">
        <div class="bubble-q">${esc(asked)}</div>
        <div class="bubble-a">
          ${st.askFree ? `<p>Ask Digivern is not switched on yet. When it launches, it will answer questions like this from approved library items and list each source. Meanwhile, try the <a href="#news">News Desk search</a>.</p>` :
          a.p.map((t,i)=>`<p>${esc(t)}<a class="cite" href="#story-${a.src[Math.min(i,a.src.length-1)]}">${Math.min(i,a.src.length-1)+1}</a></p>`).join('')}
          <p class="mono muted">${st.askFree?'':'PREVIEW ANSWER FROM '+srcs.length+' VERIFIED ITEM'+(srcs.length>1?'S':'')}</p>
        </div>
      </div>
      <form class="card js-ask" style="flex-direction:row;flex-wrap:wrap;gap:10px;padding:12px">
        <label class="sr" for="askin">Your question</label><input id="askin" type="text" placeholder="Ask about policies, laws, DPI, AI, cybersecurity…" style="flex:1 1 280px;width:auto;border:0">
        <label class="row" style="gap:6px;font-size:.9rem" for="asklang">Answer in</label><select id="asklang" style="width:auto"><option>English</option><option>Français</option><option>Español</option><option>العربية</option></select>
        <button class="btn" type="submit">Ask</button>
      </form>
    </div>
    <aside class="card" aria-label="Sources for this answer"><h3>Sources for this answer</h3>
      ${srcs.length?srcs.map((n,i)=>`<div class="stack" style="gap:4px;padding:12px;border:1px solid var(--line);border-radius:8px"><div class="row" style="gap:8px"><b class="mono">[${i+1}]</b>${trustBadge(n)}</div><a href="#story-${n.id}">${esc(n.title)}</a><span class="mono muted">${esc(n.links[0][1]).toUpperCase()} · ${esc(n.date).toUpperCase()}</span></div>`).join(''):'<p class="muted">Sources appear here once Ask Digivern is live.</p>'}
    </aside>
  </div></section>`;
};

V.consulting = () => pagehead('Consulting Desk','Consulting Desk','AI-drafted, expert-reviewed deliverables for governments, development partners, NGOs and firms. Delivered in 3–10 working days.') + `
  <section class="band"><div class="wrap layout-side">
    <div class="main stack" style="gap:20px">
      <div class="grid g3">${[['Concept notes','Programme or project concepts, with background, objectives and approach.'],['Terms of Reference','Scope, deliverables, qualifications and timelines for assignments.'],['Policy briefs','Short, evidence-based options for decision makers.'],['Readiness assessments','Scored DPI, AI or cyber readiness with recommendations.'],['Feasibility notes','Options analysis for a system, platform or reform.'],['Proposal sections','Context, methodology and risk sections for bids.']].map(s=>`<div class="card"><h3>${s[0]}</h3><p class="muted">${s[1]}</p></div>`).join('')}</div>
      <form class="card js-consult" style="padding:26px;gap:16px" novalidate>
        <h2>Request a deliverable</h2>
        <div class="grid g2">
          <div class="field"><label for="c-name">Your name</label><input id="c-name" type="text" required></div>
          <div class="field"><label for="c-org">Organisation</label><input id="c-org" type="text" required></div>
          <div class="field"><label for="c-email">Work email</label><input id="c-email" type="email" required></div>
          <div class="field"><label for="c-type">Deliverable</label><select id="c-type"><option>Concept note</option><option>Terms of Reference</option><option>Policy brief</option><option>Readiness assessment</option><option>Feasibility note</option><option>Proposal section</option></select></div>
          <div class="field"><label for="c-country">Country or region</label><input id="c-country" type="text"></div>
          <div class="field"><label for="c-when">Needed by</label><select id="c-when"><option>Standard (10 working days)</option><option>Priority (5 working days)</option><option>Express (3 working days)</option></select></div>
        </div>
        <div class="field"><label for="c-brief">Brief</label><textarea id="c-brief" required placeholder="What do you need, for whom, and what should it cover?"></textarea></div>
        <p class="footnote">A senior expert reviews and signs off every deliverable. We share a fixed quote within two working days.</p>
        <p id="c-err" class="footnote" style="color:var(--warn)" hidden>Please fill in your name, organisation, a valid email and the brief.</p>
        <button class="btn" type="submit" style="align-self:flex-start">Send request</button>
      </form>
      <div id="c-done" class="card" hidden style="background:var(--accent-soft);border-color:transparent"><h3>Request noted</h3><p>Online requests open soon, so nothing was sent. Please use the address on the <a href="#contact">Contact</a> page for now.</p></div>
    </div>
    <aside class="stack">
      <div class="card"><span class="eyebrow">How it works</span><ol class="stack" style="margin:0;padding-left:18px;gap:8px"><li>You send a brief.</li><li>We confirm scope, reviewer and price.</li><li>We draft from the verified library and templates.</li><li>A senior expert reviews, edits and signs off.</li><li>You receive the deliverable with sources.</li></ol></div>
      <div class="card"><h3>Reviewers</h3><p class="muted">Synapse Consulting and a network of vetted DPI, legal and cybersecurity experts.</p></div>
    </aside>
  </div></section>`;

V.learn = () => {
  const q = st.glossQ.toLowerCase();
  const g = GLOSSARY.filter(x => !q || (x[0]+' '+x[1]).toLowerCase().includes(q));
  return pagehead('Learning Hub','Learning Hub','Explainers, a shared glossary, short courses and a standards library for practitioners.') + `
  <section class="band"><div class="wrap stack" style="gap:28px">
    <a class="card" href="#report-r7" style="background:var(--accent-soft);border-color:transparent"><span class="eyebrow">Start here</span><h3>What is digital public infrastructure? A plain-language guide</h3><p>The basics of digital ID, payments and data exchange, what can go wrong, and real examples.</p></a>
    <div class="grid g4">${THEMES.map(t=>`<a class="card" href="#news" data-act="gotheme" data-v="${t.id}"><span class="mono" style="color:var(--accent);font-weight:600">${t.code}</span><h3>${esc(t.label)}</h3><p class="muted" style="font-size:.93rem">${esc(t.desc)}</p></a>`).join('')}</div>
    <div class="stack" style="gap:14px">
      <div class="head-row" style="margin:0"><h2>Glossary</h2><div style="flex:0 1 340px;min-width:0"><label class="sr" for="gq">Search glossary</label><input id="gq" type="search" placeholder="Search terms…" value="${esc(st.glossQ)}" data-input="glossQ"></div></div>
      <dl class="card" style="padding:4px 22px;margin:0;gap:0">${g.length?g.map(x=>`<div style="padding:14px 0;border-top:1px solid var(--line);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:6px 24px"><dt style="font-weight:700">${esc(x[0])}</dt><dd style="margin:0" class="muted">${esc(x[1])}</dd></div>`).join(''):'<p class="muted" style="padding:20px 0">No terms match.</p>'}</dl>
    </div>
    <div class="grid g3">
      <div class="card"><span class="badge b-plain" style="align-self:flex-start">Course · coming soon</span><h3>DPI fundamentals</h3><p class="muted">Short modules on identity, payments, data exchange and safeguards.</p></div>
      <div class="card"><span class="badge b-plain" style="align-self:flex-start">Course · coming soon</span><h3>AI governance for public bodies</h3><p class="muted">Modules on risk, procurement and impact assessment.</p></div>
      <div class="card"><span class="badge b-official" style="align-self:flex-start">Library</span><h3>Standards and frameworks</h3><p class="muted">Key frameworks are summarised in the <a href="#tracker">Policy &amp; Law Tracker</a>, each linked to its source.</p></div>
    </div>
  </div></section>`;
};

V.readiness = () => pagehead('Readiness self-assessment','Readiness self-assessment','Answer five quick questions about your agency or programme to get an indicative score. The full Premium tool goes deeper.') + `
  <section class="band"><div class="wrap layout-side">
    <form class="main card js-ready" style="padding:26px;gap:18px">
      <div class="field"><label for="ra">Assessment</label><select id="ra"><option>DPI readiness</option><option>AI readiness</option><option>Cybersecurity readiness</option></select></div>
      ${['A written strategy or roadmap is approved','A unit with budget and staff leads the work','Data protection rules apply to the systems in scope','Systems use open standards and documented interfaces','There is a channel for complaints and redress'].map((q,i)=>`<fieldset style="border:1px solid var(--line);border-radius:8px;padding:12px 14px"><legend style="padding:0 6px;font-weight:600">${q}</legend><div class="row">${['Not yet','Partly','Fully'].map((o,j)=>`<label class="check"><input type="radio" name="rq${i}" value="${j}" ${j===1?'checked':''}>${o}</label>`).join('')}</div></fieldset>`).join('')}
      <button class="btn" type="submit" style="align-self:flex-start">Calculate score</button>
      <div id="ready-out" hidden class="why"></div>
    </form>
    <aside class="card"><h3>About the score</h3><p class="muted">This quick check scores five core questions equally. The full tool will weight a longer question set with an expert panel and produce a written report.</p></aside>
  </div></section>`;

V.premium = () => pagehead('Premium','Plans','Free news and briefs for everyone. Premium for people who need full reports, alerts and tools.') + `
  <section class="band"><div class="wrap"><div class="grid g3">
    ${[['Free','$0','For everyone',['Daily News Desk','Weekly Global Brief','Explainers and glossary','Country profiles','Policy & Law Tracker'],false],
       ['Individual','Price at launch','For consultants and researchers',['Everything in Free','Full deep-dives and regional reports','Policy change alerts','Readiness tool and report generator','Full archive'],true],
       ['Institutional','Price at launch','For agencies, NGOs and firms',['Everything in Individual','Multiple named users','Annual State of Digital Governance briefing','Priority Consulting Desk slots'],false]]
      .map(p=>`<div class="card plan ${p[4]?'featured':''}" style="padding:26px;gap:14px">${p[4]?'<span class="badge b-premium" style="align-self:flex-start">Most chosen</span>':''}<h3>${p[0]}</h3><div class="price">${p[1]}</div><p class="muted">${p[2]}</p><ul>${p[3].map(f=>`<li>${f}</li>`).join('')}</ul><button class="btn ${p[4]?'':'btn-line'}" data-act="plan" data-v="${p[0]}" style="margin-top:auto">${p[0]==='Free'?'Subscribe free':'Join the waiting list'}</button></div>`).join('')}
  </div><p class="muted" style="margin-top:14px">Premium opens after the pilot. Development partners can sponsor free access for government users in lower-income countries.</p></div></section>`;

V.subscribe = () => pagehead('Subscribe','Subscribe to Digivern','Choose your themes and regions. We send the Weekly Global Brief and, if you like, daily alerts.') + `
  <section class="band"><div class="wrap"><form class="card js-sub" style="padding:26px;gap:18px;max-width:760px">
    <div class="field"><label for="s-email">Email address</label><input id="s-email" type="email" required placeholder="you@organisation.org"></div>
    <div class="field"><span class="lab">Themes</span><div class="grid g2" style="gap:4px">${THEMES.map((t,i)=>`<label class="check"><input type="checkbox" id="s-t${i}" ${i<3?'checked':''}>${esc(t.label)}</label>`).join('')}</div></div>
    <div class="field"><label for="s-reg">Region</label><select id="s-reg"><option>All regions</option>${REGIONS.map(r=>`<option>${r}</option>`).join('')}</select></div>
    <div class="field"><label for="s-freq">How often</label><select id="s-freq"><option>Weekly brief only</option><option>Weekly brief + daily alerts</option></select></div>
    <button class="btn" type="submit" style="align-self:flex-start">Subscribe</button>
  </form></div></section>`;

V.about = () => pagehead('How Digivern works','How Digivern works','Every item is drafted with AI assistance from approved sources and checked against them before it is published. The Editor-in-Chief reviews published items and corrects errors within 24 hours.') + `
  <section class="band"><div class="wrap stack" style="gap:36px">
    <div class="stack prose" style="gap:12px"><h2>Why Digivern exists</h2><p>Information on digital governance is spread across UN agencies, development banks, governments, standards bodies, think tanks and media, in many languages. Most of it is raw news or long reports with no synthesis. DPI, AI, cybersecurity and data protection are covered separately, although governments have to decide on them together. Digivern brings them into one place, sorted by theme, country and use, and covers every country with the same method.</p></div>
    <div class="stack" style="gap:14px"><h2>From source to page</h2>${pipeline()}</div>
    <div class="stack" style="gap:14px"><h2>The agents and their human checks</h2>
      <div class="tablebox"><table><thead><tr><th scope="col">Agent</th><th scope="col">Job</th><th scope="col">Human check</th></tr></thead><tbody>
      ${[['Scout','Monitors approved sources several times a day','Source list reviewed monthly'],['Curator','Removes duplicates, cross-checks, tags by theme, country, sector, type and audience','Daily spot-check'],['Writer','Writes summaries, briefs and report drafts in house style and other languages','Editor reviews after publication'],['Analyst','Builds country profiles, comparisons, scores and charts','Editor review'],['Consultant','Drafts client deliverables from a brief','Senior expert sign-off, always'],['Fact-checker','A second, independent agent checks every claim, number and citation','Flags go to the editor'],['Concierge','Runs Ask Digivern, newsletter personalisation and support','Logged and audited weekly']].map(r=>`<tr><th scope="row">${r[0]}</th><td>${r[1]}</td><td class="muted">${r[2]}</td></tr>`).join('')}
      </tbody></table></div></div>
    <div class="grid g3">
      <div class="card"><span class="badge b-official" style="align-self:flex-start">Official</span><h3>Tier 1</h3><p class="muted">UN agencies, development banks, governments, regulators, gazettes. Can be published on a single source.</p></div>
      <div class="card"><span class="badge b-expert" style="align-self:flex-start">Expert</span><h3>Tier 2</h3><p class="muted">Think tanks, research bodies, universities, journals. Can be published on a single source, with attribution.</p></div>
      <div class="card"><span class="badge b-media" style="align-self:flex-start">Media</span><h3>Tier 3</h3><p class="muted">Established news outlets and trade press. Needs a second independent source, or is labelled "reported by".</p></div>
    </div>
    <div class="stack prose" style="gap:10px"><h2>Editorial rules</h2><ul class="stack" style="margin:0;padding-left:20px;gap:6px"><li>Every item links to its original source. No unsourced numbers.</li><li>AI-generated content is labelled.</li><li>Items go live automatically once they pass the source check; the Editor-in-Chief reviews them after publication.</li><li>Errors are fixed and logged publicly within 24 hours.</li><li>Neutral tone on political topics; claims by governments and partners are attributed, not endorsed.</li></ul></div>
    <div class="grid g2">
      <div class="card"><h3>Governance</h3><p class="muted">Owned and operated by Synapse Consulting. An Editor-in-Chief is accountable for all content. An advisory board of DPI, legal and media experts will review AI performance and ethics each quarter.</p></div>
      <div class="card"><h3>Editor-in-Chief</h3><p class="muted">[Name], [title]. [One-line background in e-governance and DPI.]</p></div>
    </div>
  </div></section>`;

V.sources = () => pagehead('Our sources','Our sources','Digivern only collects from approved sources. The list is reviewed every month, and anyone can propose a new source.',`<a class="btn" href="#contact">Propose a source</a>`) + `
  <section class="band"><div class="wrap grid g3">
    ${Object.entries(SOURCES).map(([k,v])=>`<div class="card"><h3>${k}</h3><ul style="margin:0;padding-left:18px" class="stack">${v.map(s=>`<li style="margin:0">${esc(s)}</li>`).join('')}</ul></div>`).join('')}
  </div><div class="wrap"><p class="muted" style="margin-top:16px">Digivern respects each site's terms and robots.txt, writes short summaries in its own words, links to the original and never republishes full text.</p></div></section>`;

V['ai-policy'] = () => pagehead('AI use policy','AI use policy','How Digivern uses AI, and the limits it works within.') + `
  <section class="band"><div class="wrap stack prose" style="gap:14px">
    <p>Digivern uses AI to help collect, summarise and draft content. People stay responsible for what is published.</p>
    <ul class="stack" style="margin:0;padding-left:20px;gap:8px">
      <li>AI tools only draw on approved sources and the verified library.</li>
      <li>A separate fact-checking step checks every claim before an item is published.</li>
      <li>Items are published automatically after the source check. The Editor-in-Chief reviews them and corrects errors within 24 hours.</li>
      <li>Every AI-drafted item says so.</li>
      <li>Ask Digivern answers only from the verified library and cites every source.</li>
      <li>Digivern collects as little personal data as possible and does not use readers' data to train AI models.</li>
    </ul>
  </div></section>`;

V.corrections = () => pagehead('Corrections log','Corrections log','Errors are fixed and logged here within 24 hours of being confirmed.',`<a class="btn" href="#contact">Report a problem</a>`) + `
  <section class="band"><div class="wrap"><div class="tablebox"><table><thead><tr><th scope="col">Date</th><th scope="col">Item</th><th scope="col">What was wrong</th><th scope="col">What changed</th></tr></thead><tbody>
    <tr><td colspan="4" class="muted">No corrections yet.</td></tr>
  </tbody></table></div></div></section>`;

V.contact = () => pagehead('Contact','Contact the editors','Report a problem, propose a source, suggest an event or ask about partnerships.') + `
  <section class="band"><div class="wrap layout-side">
    <form class="main card js-contact" style="padding:26px;gap:16px">
      <div class="field"><label for="k-type">Topic</label><select id="k-type"><option>Report a problem or error</option><option>Propose a source</option><option>Suggest an event</option><option>Partnership or sponsorship</option><option>Something else</option></select></div>
      <div class="field"><label for="k-email">Your email</label><input id="k-email" type="email" required></div>
      <div class="field"><label for="k-msg">Message</label><textarea id="k-msg" required placeholder="Include a link to the item or source if relevant."></textarea></div>
      <button class="btn" type="submit" style="align-self:flex-start">Send to the editors</button>
    </form>
    <aside class="card"><h3>Editorial address</h3><p class="mono" style="user-select:all">[editors@digivern.domain]</p><p class="muted">Corrections are confirmed and logged within 24 hours.</p></aside>
  </div></section>`;

/* ---------- router ---------- */
const NAVMAP = {home:'',news:'news',story:'news',reports:'reports',report:'reports',countries:'countries',country:'countries',tracker:'tracker',ask:'ask',consulting:'consulting',learn:'learn'};
function render(){
  const h = (location.hash || '#home').slice(1);
  let name = h, param = '';
  const m = h.match(/^(story|report|country)-(.+)$/);
  if (m) { name = m[1]; param = m[2]; }
  if (!V[name]) name = 'home';
  $('#view').innerHTML = V[name](param);
  document.querySelectorAll('.nav a').forEach(a => { if (a.getAttribute('href') === '#' + NAVMAP[name]) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current'); });
  $('#nav').dataset.open = 'false'; $('#menuBtn').setAttribute('aria-expanded','false');
}
function rerenderKeepFocus(id){
  const el = document.getElementById(id); const pos = el ? el.selectionStart : null;
  render(); const n = document.getElementById(id);
  if (n) { n.focus(); try{ n.setSelectionRange(pos,pos); }catch(e){} }
}
let lastHash = location.hash;
window.addEventListener('hashchange', () => { render(); if (location.hash !== lastHash) window.scrollTo(0,0); lastHash = location.hash; });

/* ---------- events ---------- */
document.addEventListener('click', e => {
  const b = e.target.closest('[data-act]'); if (!b) return;
  const a = b.dataset.act, v = b.dataset.v;
  if (a === 'theme') { st.theme = v; render(); }
  else if (a === 'official') { st.official = !st.official; persist(); render(); }
  else if (a === 'confirmed') { st.confirmed = !st.confirmed; persist(); render(); }
  else if (a === 'reset') { Object.assign(st,{newsTheme:'all',region:'all',official:false,confirmed:false,q:''}); persist(); render(); }
  else if (a === 'lawcat') { st.lawCat = v; render(); }
  else if (a === 'cregion') { st.cRegion = v; render(); }
  else if (a === 'askq') { st.askI = +v; st.askFree = ''; render(); }
  else if (a === 'gotheme') { st.newsTheme = v; }
  else if (a === 'follow') toast('Following opens with reader accounts after the pilot.');
  else if (a === 'alerts') toast('Alerts are part of Premium, which opens after the pilot.');
  else if (a === 'save') toast('Saving opens with reader accounts after the pilot.');
  else if (a === 'plan') toast(v === 'Free' ? 'Everything in Free is open now.' : 'Noted. The waiting list opens after the pilot.');
  else if (a === 'copylink') {
    try { navigator.clipboard.writeText(location.href).then(()=>toast('Link copied'), ()=>toast('Copy is blocked here. Copy the address bar instead.')); } catch(err) { toast('Copy is blocked here. Copy the address bar instead.'); }
  }
});
document.addEventListener('change', e => {
  const k = e.target.dataset && e.target.dataset.change; if (!k) return;
  st[k] = e.target.value; persist(); render();
});
document.addEventListener('input', e => {
  const k = e.target.dataset && e.target.dataset.input; if (!k) return;
  st[k] = e.target.value; rerenderKeepFocus(e.target.id);
});
document.addEventListener('submit', e => {
  const f = e.target; e.preventDefault();
  if (f.classList.contains('js-search')) { st.q = f.querySelector('input').value.trim(); if (location.hash === '#news') render(); else location.hash = 'news'; }
  else if (f.classList.contains('js-sub')) { const em = f.querySelector('input[type=email]'); if (!em.value || !em.checkValidity()) { em.focus(); toast('Enter a valid email address'); return; } toast('Thanks. Email delivery starts with the first weekly brief.'); f.reset(); }
  else if (f.classList.contains('js-ask')) { const v = $('#askin').value.trim(); if (!v) { $('#askin').focus(); return; } st.askFree = v; render(); }
  else if (f.classList.contains('js-consult')) {
    const ok = ['c-name','c-org','c-brief'].every(id => $('#'+id).value.trim()) && $('#c-email').value && $('#c-email').checkValidity();
    $('#c-err').hidden = ok; if (!ok) return; f.hidden = true; $('#c-done').hidden = false; $('#c-done').scrollIntoView({block:'nearest'});
  }
  else if (f.classList.contains('js-contact')) { toast('The contact form opens soon. Please use the editorial address for now.'); }
  else if (f.classList.contains('js-ready')) {
    let s = 0; for (let i=0;i<5;i++){ const r = f.querySelector(`input[name=rq${i}]:checked`); s += r ? +r.value : 0; }
    const pct = Math.round(s/10*100); const out = $('#ready-out'); out.hidden = false;
    out.innerHTML = `<b>Indicative score: ${pct} / 100.</b> ${pct<40?'Early stage: start with a strategy and a lead unit.':pct<75?'Developing: strengthen standards, data protection and redress.':'Advanced: focus on scale, audits and continuous improvement.'}`;
  }
});
$('#menuBtn').addEventListener('click', () => { const n = $('#nav'); const open = n.dataset.open !== 'true'; n.dataset.open = String(open); $('#menuBtn').setAttribute('aria-expanded', String(open)); });

try { $('#today').textContent = new Date().toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric',timeZone:'Asia/Dhaka'}); } catch(e) { $('#today').textContent = UPDATED; }
render();
})();
