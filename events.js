/* Digivern Events and Funding.
   EVENTS: conferences, summits and forums worldwide on e-governance, DPI, AI, cybersecurity, fintech, health tech and other
   digital topics. Shape:
     {id, title, start:'YYYY-MM-DD' or '' if not set, end:'YYYY-MM-DD' or '', dateText (as the organiser states it),
      city, country, region (Africa | Americas | Asia-Pacific | Europe | Middle East | Global | Online),
      format:'In person'|'Hybrid'|'Online', organiser, theme (THEMES id in data.js), sector (SECTORS value),
      cost (as stated, or 'Not stated'), note (deadlines such as calls for sessions; '' if none),
      url (official event page or the best page you could open), source:[title, publisher and date, url], checked:'YYYY-MM-DD'}
   Events whose end date has passed move automatically to "Recently held"; remove them 90 days after they end.
   Events with no dates yet (start '') appear under "Dates to be announced".

   FUNDING: open grants, fellowships, incubators and calls for proposals for digital government, DPI, AI, data, cybersecurity,
   fintech and other digital work. Shape:
     {id, title, funder, kind:'Grant'|'Fellowship'|'Incubator'|'Prize'|'Call for proposals', amount (as published),
      who (eligible applicants), where (eligible countries, in words), close:'UTC ISO time', closeText (exactly as the funder states it),
      summary (Digivern's own words), url (official call page), theme, sector, checked:'YYYY-MM-DD', via ('' or where it was found, e.g. 'DevFund')}
   Calls past their deadline disappear automatically; remove them 30 days after closing.
   FUNDNEWS: ids of NEWS items in data.js about money for digital programmes (loans, grants, budgets, new funds), newest first. */
(function(){
const EVENTS = [
  {id:'e1', title:'Bangladesh AI Business Summit 2026', start:'2026-11-05', end:'2026-11-05', dateText:'5 November 2026',
   city:'Dhaka', country:'Bangladesh', region:'Asia-Pacific', format:'In person',
   organiser:'Ministry of Science and Technology, Government of Bangladesh, and Dhaka Chamber of Commerce & Industry (DCCI)',
   theme:'ai', sector:'Trade & business', cost:'Visitor registration online (fee not stated)', note:'Venue: Bangladesh-China Friendship Conference Center (BCFCC).',
   url:'https://aisummit.dhakachamber.com/', source:['Bangladesh AI Business Summit 2026','DCCI, official event site','https://aisummit.dhakachamber.com/'], checked:'2026-11-04'},
  {id:'e2', title:'Web Summit 2026', start:'2026-11-09', end:'2026-11-12', dateText:'9–12 November 2026',
   city:'Lisbon', country:'Portugal', region:'Europe', format:'In person', organiser:'Web Summit',
   theme:'enb', sector:'Trade & business', cost:'Paid tickets', note:'Venue: MEO Arena and FIL, Lisbon.',
   url:'https://hadea.ec.europa.eu/events/web-summit-2026-2026-11-09_en', source:['Web Summit 2026','European Health and Digital Executive Agency (HaDEA) events listing','https://hadea.ec.europa.eu/events/web-summit-2026-2026-11-09_en'], checked:'2026-11-04'},
  {id:'e3', title:'Singapore FinTech Festival 2026', start:'2026-11-18', end:'2026-11-20', dateText:'18–20 November 2026',
   city:'Singapore', country:'Singapore', region:'Asia-Pacific', format:'In person', organiser:'Monetary Authority of Singapore and partners',
   theme:'sec', sector:'Fintech & payments', cost:'Paid passes', note:'Venue: Singapore EXPO.',
   url:'https://www.luxembourgforfinance.com/?p=20389', source:['Singapore FinTech Festival, 18–20 November 2026','Luxembourg for Finance events listing','https://www.luxembourgforfinance.com/?p=20389'], checked:'2026-11-04'},
  {id:'e4', title:'Internet Governance Forum (IGF) 2026 — 21st annual meeting', start:'2026-12-14', end:'2026-12-18', dateText:'14–18 December 2026',
   city:'Nairobi', country:'Kenya', region:'Africa', format:'Hybrid', organiser:'United Nations IGF Secretariat, hosted by the Government of Kenya',
   theme:'pol', sector:'Government', cost:'Registration through the UN Accreditation System', note:'Venue: Kenyatta International Convention Centre (KICC). Online participation available.',
   url:'https://indico.un.org/event/1024890/', source:['21st Annual Meeting of the Internet Governance Forum (14–18 December 2026)','Indico.UN','https://indico.un.org/event/1024890/'], checked:'2026-11-04'},
  {id:'e5', title:'World Governments Summit 2027', start:'2027-02-01', end:'2027-02-03', dateText:'1–3 February 2027',
   city:'Dubai', country:'United Arab Emirates', region:'Middle East', format:'In person', organiser:'World Governments Summit Organisation, UAE',
   theme:'egov', sector:'Government', cost:'By invitation or registration (details not yet published)', note:'Previous editions were held in Dubai; confirm the venue on the official site.',
   url:'https://mediaoffice.ae/en/news/2026/february/08-02/guided-by-the-vision-of-uae-president-and-mohammed-bin-rashid-wgs2027-set-from-1-to-3-feb', source:['WGS2027 set from 1 to 3 February','Government of Dubai Media Office, 8 Feb 2026','https://mediaoffice.ae/en/news/2026/february/08-02/guided-by-the-vision-of-uae-president-and-mohammed-bin-rashid-wgs2027-set-from-1-to-3-feb'], checked:'2026-11-04'},
  {id:'e6', title:'MWC Barcelona 2027', start:'2027-03-01', end:'2027-03-04', dateText:'1–4 March 2027',
   city:'Barcelona', country:'Spain', region:'Europe', format:'In person', organiser:'GSMA',
   theme:'enb', sector:'Telecom', cost:'Paid passes', note:'Venue: Fira Barcelona Gran Via.',
   url:'https://mwcbarcelona.bnetwork.com/Home/AboutTheEvent', source:['MWC Barcelona 2027: about the event','MWC Barcelona booking network','https://mwcbarcelona.bnetwork.com/Home/AboutTheEvent'], checked:'2026-11-04'},
  {id:'e7', title:'Global DPI Summit 2027', start:'2027-03-22', end:'2027-03-25', dateText:'22–25 March 2027',
   city:'Bali', country:'Indonesia', region:'Asia-Pacific', format:'In person',
   organiser:'Co-Develop, ITU, UN Office for Digital and Emerging Technologies, UNDP and World Bank, with the Government of Indonesia; ADB as regional co-host',
   theme:'dpi', sector:'Government', cost:'Registration details to be announced', note:'Session proposals close 1 December 2026. First time the summit is held in Asia.',
   url:'https://www.globaldpisummit.org/', source:['Global DPI Summit 2027 — Bali, Indonesia','Global DPI Summit, official site','https://www.globaldpisummit.org/'], checked:'2026-11-04'},
  {id:'e8', title:'ID4Africa 2027 Annual General Meeting', start:'2027-06-15', end:'2027-06-18', dateText:'15–18 June 2027',
   city:'Cape Town', country:'South Africa', region:'Africa', format:'In person', organiser:'ID4Africa',
   theme:'dpi', sector:'Government', cost:'Not stated', note:'Theme: "Digital Identity Ecosystems: Fostering the Connections."',
   url:'https://id4africa.com/', source:['ID4Africa 2027 AGM theme highlights digital ID systems connections, utility','Biometric Update, 25 Sep 2026','https://www.biometricupdate.com/202609/id4africa-2027-agm-theme-highlights-digital-id-systems-connections-utility'], checked:'2026-11-04'},
  {id:'e9', title:'6th UN World Data Forum', start:'', end:'', dateText:'Postponed from 9–12 Nov 2026 to 2027; new dates to be announced',
   city:'Riyadh', country:'Saudi Arabia', region:'Middle East', format:'Hybrid', organiser:'United Nations Statistics Division and the Kingdom of Saudi Arabia (GASTAT)',
   theme:'pol', sector:'Government', cost:'Not stated', note:'Postponed by joint decision of the UN Secretariat and Saudi Arabia.',
   url:'https://www.fao.org/statistics/events/events-detail/6th-united-nations-world-data-forum/en', source:['United Nations World Data Forum 2026 (postponed)','FAO Statistics events','https://www.fao.org/statistics/events/events-detail/6th-united-nations-world-data-forum/en'], checked:'2026-11-04'},
  {id:'e10', title:'AI Summit 2027, Geneva', start:'', end:'', dateText:'2027; dates to be announced',
   city:'Geneva', country:'Switzerland', region:'Europe', format:'In person', organiser:'Government of Switzerland',
   theme:'ai', sector:'Government', cost:'Not stated', note:'Follows the Paris (2025) and New Delhi (2026) AI summits.',
   url:'https://www.admin.ch/en/newnsb/YZYU1gmqW9vcPFMl2VroY', source:['President Parmelin meets Indian Prime Minister Modi in New Delhi, announces 2027 AI summit for Geneva','Swiss Federal Council','https://www.admin.ch/en/newnsb/YZYU1gmqW9vcPFMl2VroY'], checked:'2026-11-04'},
  {id:'e11', title:'6th Bangladesh Fintech Summit', start:'2026-10-10', end:'2026-10-10', dateText:'10 October 2026',
   city:'Dhaka', country:'Bangladesh', region:'Asia-Pacific', format:'In person', organiser:'Bangladesh Brand Forum (Bangladesh Fintech Forum)',
   theme:'sec', sector:'Fintech & payments', cost:'BDT 15,000 plus VAT per person', note:'Venue: Radisson Blu Water Garden Hotel, Dhaka.',
   url:'https://bdfintechforum.com/summit/', source:['6th Bangladesh Fintech Summit','Bangladesh Fintech Forum, official site','https://bdfintechforum.com/summit/'], checked:'2026-11-04'}
];

const FUNDING = [
  {id:'f1', title:'Cities Deliver: AI Solutions for Public Services — open call, Round 1', funder:'The Rockefeller Foundation and OpenAI Foundation', kind:'Grant',
   amount:'Seed grants $500,000 to under $1 million; Scale grants $1–2 million (24 months)', who:'NGOs, INGOs, academic institutions and firms working with a city government',
   where:'Cities in all regions; organisations in countries under comprehensive US OFAC sanctions are excluded',
   close:'2026-11-30T04:59:00Z', closeText:'29 November 2026, 11:59 pm EST (Round 1 proposal)',
   summary:'Funds organisations that partner with a city government to use frontier AI in public health, economic mobility, environmental resilience or civic engagement. Each proposal needs a letter of intent from the city; research-only projects are not funded. Part of a $50 million initiative announced on 16 October 2026.',
   url:'https://www.rockefellerfoundation.org/wp-content/uploads/2026/10/Cities-Deliver-AI-Solutions-for-Public-Services-FAQs-Final.pdf', theme:'ai', sector:'Government', checked:'2026-11-02', via:'DevFund'},
  {id:'f2', title:'Mozilla Foundation Human-Scale AI Incubator 2026', funder:'Mozilla Foundation', kind:'Incubator',
   amount:'$300,000, with up to $200,000 more for strong progress (up to $500,000 over three years)', who:'NGOs, start-ups, firms and academic teams',
   where:'Check the official call for country and organisation eligibility',
   close:'2026-11-21T07:59:00Z', closeText:'Friday 20 November 2026, 11:59 pm Pacific Standard Time',
   summary:'Non-dilutive funding for teams building smaller, specialised, community-focused AI. Incubation starts in April 2027 and runs for 12 months, with possible follow-on support.',
   url:'https://www.mozillafoundation.org/en/what-we-do/grantmaking/incubator/human-scale-ai/call-for-proposals/', theme:'ai', sector:'Trade & business', checked:'2026-11-03', via:'DevFund'},
  {id:'f3', title:'Internet Society Fellowship Program 2027', funder:'Internet Society', kind:'Fellowship',
   amount:'Project stipend up to $5,000, plus travel support to a global or regional internet event', who:'Individuals working on internet policy, connectivity, or safety and security',
   where:'No country restriction stated',
   close:'2026-11-22T23:59:00Z', closeText:'Finish the Pre-Fellowship Training by 22 November 2026; applications close 18 December 2026',
   summary:'A fellowship in three tracks (policy and mobilisation, connectivity, and safety and security) with a mentor, a project stipend and travel support. The application link is sent after the Pre-Fellowship Training is completed.',
   url:'https://www.internetsociety.org/fellowship/', theme:'enb', sector:'Telecom', checked:'2026-11-02', via:'DevFund'},
  {id:'f4', title:'Mozilla Foundation Fellowships 2027–2028', funder:'Mozilla Foundation', kind:'Fellowship',
   amount:'$100,000 (embedded track) or $125,000 (independent track), each including a $25,000 project budget', who:'Technologists, researchers, entrepreneurs, artists and change-makers',
   where:'Check the official call for full eligibility',
   close:'2026-12-18T07:59:00Z', closeText:'17 December 2026, 11:59 pm Pacific Time (letter of intent); full applications by 12 March 2027 if shortlisted',
   summary:'Ten fellowships for people building a more human-centred technology future, including trustworthy AI and digital rights.',
   url:'https://www.mozillafoundation.org/what-we-do/grantmaking/fellowship/2027-call-for-applications/', theme:'ai', sector:'Government', checked:'2026-11-02', via:'DevFund'},
  {id:'f5', title:'Global DPI Summit 2027: call for session proposals', funder:'Global DPI Summit co-hosts (Co-Develop, ITU, UN ODET, UNDP, World Bank)', kind:'Call for proposals',
   amount:'Speaking slot (not a grant)', who:'Governments, practitioners, researchers, civil society and companies working on DPI',
   where:'Global',
   close:'2026-12-01T23:59:00Z', closeText:'1 December 2026',
   summary:'Proposals for sessions at the Global DPI Summit in Bali, 22–25 March 2027. A chance to present country experience to the main global DPI community.',
   url:'https://www.globaldpisummit.org/', theme:'dpi', sector:'Government', checked:'2026-11-04', via:''}
];

const FUNDNEWS = ['n3','n4','n8','n34'];

window.DV_EVENTS = EVENTS;
window.DV_FUNDING = FUNDING;
window.DV_FUNDNEWS = FUNDNEWS;
})();
