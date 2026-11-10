/* CGTK Monthly Focus.
   Each month CGTK picks one Country of the Month and one Sector of the Month and covers them in more depth.
   MONTHS lists every focus month, newest first. The first entry is the current month; older entries form the archive.
   To start a new month: add a new object at the top of MONTHS with the same shape, and tag that month's news items
   in data.js with the focus country id (field `country`) and the focus sector name (field `sector`).
   "[n]" in any text becomes a link to source n of that page (country sources and sector sources are numbered separately).
   Shape of country: {id (matches COUNTRIES in data.js), name, iso2 (for the flag), region, capital, lat, lon, bbox:[west,south,east,north],
     standfirst, facts:[[label,value]], factsNote, keynums:[{v,l,c}], charts:[...], body:[{h,p:[...]}], policy:{rows}, implementation:{rows},
     voices:[...], watch:[...], sources:[[title, publisher and date, url]]}
   Both country and sector take infographic:{...} (see analysis.js for block types).
   Shape of sector: {name, tag (SECTORS value in data.js), icon, standfirst, keynums, body, tracker:{cols,rows}, watch, sources} */
(function(){
const MONTHS = [
{
  key:'2026-11', label:'November 2026', published:'2 Nov 2026',
  country:{
    id:'uganda', name:'Uganda', iso2:'ug', region:'Africa', capital:'Kampala', lat:0.3476, lon:32.5825, bbox:[29.4,-1.7,35.3,4.4],
    standfirst:'Uganda has re-registered most of its population for a new national ID, launched a five-year national data strategy and licensed satellite internet this year. It also switched the internet off for four days around its January election, and its flagship World Bank connectivity project has been cut back. This month CGTK follows how the pieces fit together.',
    facts:[
      ['Capital','Kampala'],
      ['Coordinates of capital','0.35° N, 32.58° E'],
      ['Region','East Africa (landlocked)'],
      ['Land borders','Kenya, South Sudan, DR Congo, Rwanda, Tanzania'],
      ['Area','About 241,550 km², including part of Lake Victoria'],
      ['Population','45,905,417 (2024 census) [2]'],
      ['Official languages','English and Swahili'],
      ['Currency','Ugandan shilling (UGX)'],
      ['Time zone','East Africa Time, UTC+3'],
      ['Internet domain · calling code','.ug · +256'],
      ['Independence','9 October 1962']
    ],
    factsNote:'Population from the final 2024 census; other basic facts are general reference information.',
    keynums:[
      {v:'45.9 million',l:'people counted in the 2024 national census',c:2},
      {v:'150 of 193',l:'Uganda’s rank in the UN E-Government Development Index 2024 (score 0.446)',c:1},
      {v:'35 million',l:'people in the national ID system after the 2025–26 mass registration',c:3},
      {v:'38 million',l:'active mobile money customers, July 2026',c:10},
      {v:'UGX 1.66 tn',l:'five-year cost of the National Data Strategy launched in October 2026',c:5},
      {v:'4 days',l:'of near-total internet blackout around the January 2026 general election',c:14}
    ],
    infographic:{title:'How Uganda’s digital government fits together', sub:'Strong building blocks; delivery and trust are the weak links.', blocks:[
      {type:'flow', title:'From identity to services', steps:[
        {icon:'id', label:'National ID (NIRA)', note:'About 35 million people in the system', c:[3]},
        {icon:'shield', label:'UGPass digital ID and e-signature', c:[6]},
        {icon:'link', label:'UGhub data exchange', note:'135 platforms integrated; target 300 by 2030/31', c:[5]},
        {icon:'globe', label:'UGOV single services platform', note:'Unveiled in November 2025', c:[7]},
        {icon:'phone', label:'Mobile money', note:'38 million active customers, July 2026', c:[10]}]},
      {type:'iconArray', title:'ID cards: printed is not delivered', pct:35.5, icon:'card', big:'35.5%', label:'of national ID cards shipped to districts had been collected by 8 February 2026: 2.58 million of 7.26 million', c:3, legend:['Collected','Waiting']},
      {type:'stats', title:'Trust and access', items:[{icon:'wifi', v:'4 days', l:'near-total internet blackout around the January 2026 election', c:14},{icon:'coin', v:'UGX 1.4 tn', l:'in expected transactions stalled during the blackout, per Unwanted Witness', c:14},{icon:'law', v:'~14,000', l:'organisations registered with the data protection office, against an estimated 500,000+ handling personal data', c:12}]}]},
    charts:[
      {title:'Uganda’s UN E-Government rank, 2003–2024',sub:'Rank among UN member states; a lower number is better',type:'bar',fmt:'int',
       rows:[['2003',119],['2008',133],['2012',143],['2014',156],['2016',128],['2018',135],['2020',137],['2022',144],['2024',150,'hl']],c:[1]},
      {title:'National ID mass registration, results at 8 February 2026',sub:'Share of each target reached, per cent',type:'bar',fmt:'dec',
       rows:[['Legacy records migrated',100],['Renewals and updates (target 15.8 m)',90.5],['New registrations (target 17.2 m)',37.3,'hl'],['Shipped cards collected by citizens',35.5,'hl']],c:[3]}
    ],
    body:[
      {h:'Why Uganda, why now',p:[
        'Uganda is a useful test of what happens when a government invests in the building blocks of digital public infrastructure but the wider environment does not keep pace. Its score in the UN E-Government Development Index, 0.446, is above the African average of 0.425 but well below the world average of 0.638 [7]. Its rank has slipped at each survey since 2016, from 128th to 150th [1]. The online services score is the strongest part of the index (0.607); telecommunications infrastructure is the weakest (0.230) [1].',
        'Officials point to progress on the government side: a 4,387 km national backbone, the UGhub integration platform and the UGPass digital identity and e-signature service. They acknowledge weak integration between systems, limited digital skills, cyber risks and tight funding [6]. October 2026 brought two signals of where the government wants to go next: Kampala hosted the 4th Digital Government Africa summit on 6–8 October [6], and the Ministry of ICT and National Guidance launched a National Data Strategy for 2026/27–2030/31 [5].'
      ]},
      {h:'Identity: almost everyone on the register, but cards and newcomers lag',p:[
        'The national ID run by the National Identification and Registration Authority (NIRA) is the foundation for most services. To migrate old records, renew expiring cards and register new citizens, NIRA ran a parish-level mass registration from May 2025, extended to 8 February 2026. By then about 35 million people were in the system [3].',
        'The results are uneven. All 28.6 million legacy records were migrated and 90.5% of planned renewals and updates were done, but only 37.3% of the 17.2 million targeted new registrations were achieved. Of 7.26 million cards shipped to districts, just 2.58 million had been collected [3]. The registrar called new registration an area for concerted effort [3].',
        'Civil society has long argued that the ID system excludes poorer and marginalised people. Unwanted Witness has pointed to the UGX 50,000 replacement fee, higher than in Kenya and Rwanda, and to the absence of a published data protection impact assessment for the new-generation ID [16]. NIRA has not published reasons for the low collection rate; cost, distance and awareness are all plausible factors that deserve study.'
      ]},
      {h:'Data and integration: a costed plan',p:[
        'The National Data Strategy has three pillars: data governance, data infrastructure and strategic use of data. It is costed at UGX 1,662.6 billion over five years [5], about US$450 million at the Bank of Uganda’s average 2026 exchange rate [10]. Its targets for 2030/31 are to raise the number of government platforms integrated through UGhub from 135 to 300, raise the share of national development plan indicators backed by verifiable data from 36% to 80%, and build two Tier IV data centres with 10 petabytes of sovereign storage [5]. Funding is expected from the government budget, fees for value-added data services, development partners and private co-investment [5].',
        'The strategy was developed with UNDP and UN Global Pulse and validated by 131 organisations [5]. The Permanent Secretary said it lays the groundwork for a planned national AI strategy [5]. Uganda is also exploring AI cooperation with Korea, including AI translation of government information into local languages [17].',
        'Members of Parliament raised two practical tests at the launch: whether data, much of it reportedly hosted abroad, will be kept safe; and whether people can afford the devices to use digital services at all, given a 10% import duty on entry-level devices [4].'
      ]},
      {h:'Connectivity: a flagship project cut back',p:[
        'The World Bank-financed Uganda Digital Acceleration Project – GovNet (UDAP) was approved in June 2021 for US$200 million but only became effective in May 2023 [8]. A 2025 review rated implementation moderately unsatisfactory and proposed cutting the project to about US$87 million, removing the national backbone component and almost all of the US$57 million planned for refugee-hosting communities [8]. By June 2025 US$44.2 million had been disbursed [8]. The project was due to close on 30 May 2026 and the government requested a 17-month extension [9]; CGTK has not found a published decision.',
        'Satellite internet is now an alternative for those who can pay. Uganda ordered Starlink to stop operating on 1 January 2026, before the election [14], then granted it a five-year licence in May 2026 with conditions including a national gateway and local staff. Residential service became available on 1 September 2026 [15].'
      ]},
      {h:'Money: mobile money moves more than the economy produces',p:[
        'Mobile money is Uganda’s most widely used digital public service in practice, even though it is privately run. Transactions worth UGX 365.9 trillion passed through mobile money in 2025, and UGX 263 trillion in the first seven months of 2026 [10]. That is roughly US$99 billion a year at 2026 exchange rates [10], about twice the US$50 billion size of the economy cited in the national plan [5]. Active customers reached 38 million in July 2026, with 1.3 million agents [10].',
        'This dependence raised the cost of the January shutdown. Unwanted Witness, citing industry estimates of about UGX 357 billion in digital payments a day, put the value of stalled transactions over the four-day blackout at about UGX 1.4 trillion; agents reported withdrawals collapsing [14].',
        'Cross-border payments are next. On 3 November 2026 the Minister for EAC Affairs told Parliament that the East African Community is building an integrated payment and settlement system so that people and businesses can pay between partner states in local currencies through bank accounts, mobile money wallets or other authorised channels, under a masterplan adopted in 2025. Today’s East African Payment System links the RTGS systems of Uganda, Kenya, Tanzania and Rwanda; no dates or budget were given for the wider system [20].'
      ]},
      {h:'Rights and trust: enforcement starts, the shutdown lingers',p:[
        'The Data Protection and Privacy Act 2019 is now being enforced. The Personal Data Protection Office ruled in July 2025 that Google had failed to register and had transferred data abroad without adequate safeguards, and secured its first criminal conviction against a digital lender the same month [13][12]. Yet the office says only about 14,000 organisations are registered, against an estimated 500,000 that collect personal data [12].',
        'The internet shutdown is the main mark against trust. Civil society groups describe it as deliberate and centrally coordinated: public internet collapsed nationwide on the evening of 13 January, partial service returned on 18 January and full service on 26 January, with social media blocked for eight more days [14]. They call for judicial oversight of any future shutdown and transparency on regulators’ orders [14].'
      ]},
      {h:'CGTK’s assessment',p:[
        'Uganda has many of the right components: a near-universal ID register, an integration hub, a costed data strategy, an active data protection regulator and one of Africa’s deepest mobile money markets. The weak links are delivery and trust. Card collection and new registrations lag, the main connectivity project has been halved, device costs limit access, and the January shutdown showed that digital services can be switched off with little legal check. Whether the 300-platform target is met will depend less on technology than on funding the strategy in annual budgets and on rebuilding confidence that services will stay on.',
        'The link to this month’s sector is direct: about 65% of Ugandans depend on agriculture, and the new agriculture plan includes e-vouchers for inputs and digital extension [18]. Agro-industrialisation is also one of the priority sectors the data strategy is meant to serve [5]. See the Agritech sector page for how other countries are building farmer registries on top of national ID.'
      ]}
    ],
    policy:{rows:[
      ['Data Protection and Privacy Act 2019 (Cap. 97)','2019','Requires organisations handling personal data to register with the Personal Data Protection Office; sets rules on consent and cross-border transfers [12][13]','In force; enforcement since 2025'],
      ['Digital Transformation Roadmap 2023/24–2027/28','2023','Framework for national digital priorities, used to align partner projects [17]','In implementation'],
      ['National Data Strategy 2026/27–2030/31','2026','Data governance, infrastructure and use; UGhub and data centre targets; UGX 1,662.6 bn [5]','Launched October 2026'],
      ['Agriculture Strategic Plan 2025/26–2029/30','2026','UGX 17 trillion plan including input e-vouchers and e-extension [18]','Launched January 2026'],
      ['National AI strategy','—','Planned; the data strategy is described as its groundwork [5]','Not yet published']
    ]},
    implementation:{rows:[
      ['National ID: legacy data migration','By Feb 2026','done','28.6 million records migrated [3]'],
      ['National ID: renewals and updates','Target 15.8 million','on track','14.3 million done, 90.5% [3]'],
      ['National ID: new registrations','Target 17.2 million','delayed','6.4 million, 37.3% [3]'],
      ['National ID: card collection','Ongoing','delayed','2.58 million of 7.26 million shipped cards collected [3]'],
      ['UDAP-GovNet connectivity project','Closing 30 May 2026','delayed','Cut from US$200 m to about US$87 m; 17-month extension requested [8][9]'],
      ['UGhub integration','300 platforms by 2030/31','not started','Baseline 135 platforms; strategy launched October 2026 [5]'],
      ['Data controller registration','All data handlers','delayed','About 14,000 registered against 500,000+ estimated [12]'],
      ['Satellite internet licensing','2026','done','Starlink licensed May 2026; residential service from 1 Sep 2026 [15]'],
      ['Business registration on mobile (URSB Connect app)','Launched 5 Nov 2026','done','Company and business-name registration, searches, annual returns and trademarks on Android and iOS, alongside the eRegistry [19]'],
      ['EAC cross-border payment and settlement system','No date set','unclear','Masterplan adopted 2025; current EAPS links four RTGS systems; no dates or budget announced [20]']
    ]},
    voices:[
      {who:'Dr Aminah Zawedde, Permanent Secretary, Ministry of ICT and National Guidance',group:'Government',stance:'support',view:'Reliable data lets government decide, for example, whether a community needs a health facility and of what level.',c:4},
      {who:'Hatwib Mugasa, Executive Director, NITA-U',group:'Government',stance:'support',view:'The focus has moved from connecting government institutions to delivering services that change citizens’ lives.',c:6},
      {who:'Claire Ollama, NIRA',group:'Government',stance:'mixed',view:'New registrations remain well below target and need concerted effort; applicants should collect waiting cards.',c:3},
      {who:'Baker Birikujja, Personal Data Protection Office',group:'Government',stance:'mixed',view:'Registration is a legal duty, and citizens should question businesses that photocopy their ID cards.',c:12},
      {who:'Hon. Andrew Ojok Oulanyah, Chair, Parliamentary ICT Committee',group:'Government',stance:'concern',view:'The data strategy means little if people cannot reach services; the 10% duty on entry-level devices should be reviewed.',c:4},
      {who:'Hon. Sheilah Amaniyo, MP',group:'Government',stance:'concern',view:'Asked how citizens’ data will be protected when much of it is reportedly hosted abroad.',c:4},
      {who:'Unwanted Witness and WOUGNET',group:'Civil society',stance:'concern',view:'The January blackout was deliberate and nationwide; future shutdowns should need judicial approval.',c:14},
      {who:'Unwanted Witness',group:'Civil society',stance:'concern',view:'The ID replacement fee and missing privacy safeguards risk excluding poorer people from services.',c:16},
      {who:'Maurice Taremwa, ISACA Kampala Chapter',group:'Expert',stance:'mixed',view:'Digital trust in Uganda is stable but fluid.',c:12}
    ],
    watch:[
      'Whether the World Bank extends UDAP-GovNet and what it delivers before closing [9].',
      'NIRA figures on new registrations and card collection through 2026 [3].',
      'Whether the National Data Strategy is funded in the 2027/28 budget, and progress from 135 towards 300 integrated platforms [5].',
      'Publication of the national AI strategy [5].',
      'Any review of the import duty on entry-level devices [4].',
      'Legal safeguards on internet shutdowns, as demanded by civil society [14].',
      'Whether the EAC sets dates and funding for its regional payment system, and whether mobile money wallets are connected to it [20].'
    ],
    sources:[
      ['Uganda country data','UN E-Government Knowledgebase, UN DESA','https://publicadministration.un.org/egovkb/en-us/Data/Country-Information/id/179-Uganda'],
      ['Uganda’s population stands at 45,905,417','NTV Uganda','https://www.ntv.co.ug/ug/news/national/uganda-s-population-stands-at-45-905-417-4785208'],
      ['35 million Ugandans registered in national ID drive','New Vision, 9 Feb 2026','https://www.newvision.co.ug/category/news/35-million-ugandans-registered-in-national-id-NV_227736_022026'],
      ['Uganda launches UGX 1.663 trillion National Data Strategy','Uganda Broadcasting Corporation, 20 Oct 2026','https://ubc.go.ug/2026/10/20/uganda-launches-ugx-1-663-trillion-national-data-strategy-to-drive-digital-economy-and-public-planning'],
      ['Uganda targets 300 integrated government platforms under new data strategy','allAfrica, 21 Oct 2026','https://allafrica.com/stories/202610220526.html'],
      ['Uganda to host Africa digital summit amid service delivery reform push','Nile Post','https://nilepost.co.ug/news/339521/uganda-to-host-africa-digital-summit-amid-service-delivery-reform-push'],
      ['Uganda launches platform to centralise all government services','Ecofin Agency, 25 Nov 2025','https://www.ecofinagency.com/news-digital/2511-50801-uganda-launches-platform-to-centralize-all-government-services'],
      ['Uganda Digital Acceleration Project-GovNet: mid-term review aide memoire','World Bank, 2025','https://documents1.worldbank.org/curated/en/099062725052021757/pdf/P171305-de6358f2-8cbd-4a74-9160-b2717d5d9b2e.pdf'],
      ['Govt in race against time on Shs750b fibre project','Daily Monitor, 2 Nov 2025','https://www.monitor.co.ug/uganda/news/national/govt-in-race-against-time-on-shs750b-fibre-project-5251526'],
      ['Mobile money value reaches 72 per cent of 2025 total','UG Business (Bank of Uganda data), 9 Oct 2026','https://ugbusiness.com/2026/10/digital-economy/mobile-money-value-reaches-72-per-cent-of-2025-total'],
      ['UCC report: mobile money active users hit 36.7 million','Matooke Republic, 2 Jun 2026','https://www.matookerepublic.com/news/20260602/ucc-report-mobile-money-active-users-hit-36-7-million-as-ugandans-transact-shs2-37-billion-in-three-months/'],
      ['Over 500,000 Ugandan firms collect personal data without registration','Eagle Online, 19 Aug 2026','https://eagle.co.ug/2026/08/19/over-500000-ugandan-firms-collect-personal-data-without-registration-pdpo/'],
      ['Uganda’s data protection office finds Google in breach of privacy','URSB, 12 Aug 2025','https://ursb.go.ug/2025/08/12/ugandas-data-protection-office-finds-google-in-breach-of-privacy/'],
      ['No Signal, No Voice: what really happened during Uganda’s 2026 election shutdown','Unwanted Witness, 23 Feb 2026','https://www.unwantedwitness.org/no-signal-no-voice-what-really-happened-during-ugandas-2026-election-shutdown/'],
      ['Starlink is now live in Uganda','Space in Africa, 1 Sep 2026','https://spaceinafrica.com/2026/09/01/starlink-is-now-live-in-uganda/'],
      ['A call for inclusivity, trust and accountability in reforming Uganda’s national ID system','Unwanted Witness, 10 Jun 2024','https://www.unwantedwitness.org/a-call-for-inclusivity-trust-and-accountability-in-reforming-ugandas-national-id-system/'],
      ['Uganda and South Korea explore AI and digital transformation partnership','TechAfrica News, 15 Oct 2026','https://techafricanews.com/2026/10/15/uganda-south-korea-ai-digital-transformation-partnership/'],
      ['MAAIF unveils strategic blueprints to transform Uganda’s agriculture by 2030','Publicist East Africa, 5 Jan 2026','https://publicisteastafrica.com/maaif-unveils-strategic-blueprints-to-transform-ugandas-agriculture-by-2030/'],
      ['New URSB mobile App aims to end long queues, boost business formalisation','Daily Monitor, 5 Nov 2026','https://www.monitor.co.ug/uganda/news/national/new-ursb-mobile-app-aims-to-end-long-queues-boost-business-formalisation-5659420'],
      ['EAC member states plot to reduce dollar dependence','Parliament of Uganda (via APO Group), 3 Nov 2026','https://www.africa-newsroom.com/press/uganda-east-african-community-affairs-eac-member-states-plot-to-reduce-dollar-dependence?lang=en']
    ]
  },
  sector:{
    name:'Agritech', tag:'Agriculture', icon:'agri',
    standfirst:'Governments are building farmer registries on top of national ID, using AI to give advice in local languages and using satellites to estimate harvests. From 30 December, EU trade rules will require plot-level proof that imported cocoa, coffee and other goods did not come from deforested land. This month CGTK follows agritech as public infrastructure, not only as a start-up market.',
    keynums:[
      {v:'US$16.2 bn',l:'global agrifoodtech venture funding in 2025, flat on 2024, with deals down 12%',c:1},
      {v:'US$9 bn',l:'invested upstream, in farms and food production, in 2025: up 7%',c:1},
      {v:'110 million',l:'Farmer IDs issued under India’s Digital Agriculture Mission by October 2026',c:2},
      {v:'6.58 million',l:'Kenyan farmers registered on KIAMIS for fertiliser e-vouchers (March 2025)',c:5},
      {v:'1,000+',l:'digital agriculture initiatives documented by FAO’s AgriTech Observatory in Europe and Central Asia',c:12},
      {v:'30 Dec 2026',l:'date the EU Deforestation Regulation starts to apply to large and medium operators',c:11}
    ],
    infographic:{title:'How a farmer registry turns into support', sub:'Countries are building agriculture services on top of national ID.', blocks:[
      {type:'flow', title:'The DPI path for agriculture', steps:[
        {icon:'id', label:'National ID', note:'The foundation for registering farmers', c:[3]},
        {icon:'leaf', label:'Farmer registry', note:'Farmer, land plot and crop records', c:[3]},
        {icon:'coin', label:'Targeted subsidies', note:'For example Kenya’s fertiliser e-vouchers', c:[5]},
        {icon:'phone', label:'Advice in local languages', note:'For example India’s Bharat-VISTAAR', c:[4]},
        {icon:'globe', label:'Traceability for trade', note:'EU deforestation rules apply from 30 December 2026', c:[11]}]},
      {type:'stats', title:'Scale so far', items:[{icon:'id', v:'110 m', l:'Farmer IDs issued in India by October 2026', c:2},{icon:'people', v:'6.58 m', l:'Kenyan farmers registered for fertiliser e-vouchers (March 2025)', c:5},{icon:'coin', v:'US$2.65 bn', l:'saved by removing 13 million ineligible beneficiaries from India’s PM-KISAN, according to a 2025 DPI report', c:3}]},
      {type:'compare', title:'Where private agritech money went in 2025', items:[{label:'All agrifoodtech venture funding', v:16.2, text:'US$16.2 bn', icon:'chart'},{label:'Upstream: farms and food production', v:9, text:'US$9 bn', icon:'leaf', hl:true},{label:'Climate tech within agrifood', v:3.9, text:'US$3.9 bn', icon:'globe'}], c:[1]}]},
    body:[
      {h:'Why agritech is a governance topic',p:[
        'Farming is where digital public infrastructure meets the largest number of poor people. In Uganda, this month’s focus country, about 65% of people depend on agriculture for their livelihoods [13]. Governments spend heavily on input subsidies, credit and extension, and the main question is how to get that support to genuine farmers. A 2025 report on DPI for agriculture, backed by the Gates Foundation, argues that most agricultural digitalisation so far has produced isolated systems that cannot share data, and that shared registries, payments and data exchange can fix this [3].'
      ]},
      {h:'Registries are the base layer',p:[
        'The common first step is a farmer registry linked to national ID. India has issued 110 million Farmer IDs under its Digital Agriculture Mission, five months ahead of its March 2027 deadline [2]. The DPI report credits ID-linked payments with removing 13 million ineligible beneficiaries from India’s PM-KISAN income support, which it says saved about US$2.65 billion [3]. Kenya ties its fertiliser subsidy to registration on KIAMIS: 6.58 million farmers and 53.6 million e-vouchers by March 2025 [5].',
        'Others are earlier on the path. Lesotho launched a national farmers portal in August 2026, registering farmers against their national ID and GPS-mapped land parcels using a GovStack specification [8]. Nigeria’s agriculture minister called in September 2026 for one national register anchored on the National Identification Number, with states enumerating farmers and the federal ministry setting one interoperable standard; the ministry itself named siloed and duplicate records as the main obstacle [6][7]. Ethiopia’s Digital Agriculture Roadmap 2025–2033 plans 22 use cases built on its Fayda national ID [3].'
      ]},
      {h:'AI advice in farmers’ own languages',p:[
        'India launched Bharat-VISTAAR in February 2026, describing it as AI-based digital public infrastructure for farm advice. Farmers reach it by phone helpline, chatbot or app for weather, prices, pest alerts, soil health and scheme information, drawing on AgriStack, weather and market data. It launched in Hindi and English, with plans for 11 languages within six months [4].',
        'Language and offline use decide whether tools are used. When the World Food Programme screened 22 local digital agriculture tools in Tajikistan using FAO’s AgriTech Observatory, it kept seven, judged on language, offline functions and relevance to farmers [12].'
      ]},
      {h:'Satellites and statistics',p:[
        'On 24 October 2026 NASA and the US Department of Agriculture signed an agreement to apply Earth observation data and geospatial analytics to crop monitoring, acreage and yield estimates and drought assessment, as part of USDA’s data modernisation plan [9]. Better official crop statistics matter well beyond the United States, because they move global prices and food security planning.'
      ]},
      {h:'Trade rules force traceability',p:[
        'The EU Deforestation Regulation requires proof that products such as cocoa, coffee, palm oil, soy, cattle, rubber and wood were not grown on land deforested after 2020. After two postponements it applies from 30 December 2026 to large and medium operators and from 30 June 2027 to most micro and small operators [11]. Non-EU suppliers acting as operators must still supply plot-level geolocation, while small EU primary operators may use a postal address instead [10]. Nigeria’s ministry links its farmer registry partly to this pressure, so that exports such as cocoa, sesame and cashew are not rejected at port [6].',
        'Uganda, this month’s focus country, sends more than 60% of its coffee exports to the EU, and in the year to March 2025 exported 6.87 million bags worth US$1.84 billion, according to agriculture ministry data reported by Nile Post [18]. It has been registering coffee farmers and mapping their plots for the regulation: by August 2026 more than 1.6 million farmers were registered against a target of 1.2 million, an agricultural officer for Greater Masaka told the Daily Monitor in October [16]. The same report quotes farmers in Masaka and Kyotera who said many villages had never seen an enumerator, that some people were registered without their consent and that some registration cards were rejected [16]. A digital platform built by the Uganda Coffee Farmers Alliance with the National Coffee Research Institute aims to trace each coffee lot back to individual farms; the alliance says farmers’ rights under Uganda’s Data Protection and Privacy Act 2019 apply to the data [17].'
      ]},
      {h:'Where the money is going',p:[
        'Private investment is flat overall but shifting towards the farm. AgFunder counts US$16.2 billion of agrifoodtech venture funding in 2025, the same as 2024, with deal numbers down 12%. Upstream funding rose 7% to US$9 billion, climate technology within the sector recovered to US$3.9 billion, and deep-technology companies made up 32% of deals [1]. Debt reached 18.2% of funding, its highest share in a decade [1]. The summary does not break out Africa or South Asia, where most smallholders farm.'
      ]},
      {h:'CGTK’s assessment',p:[
        'The strongest returns in agritech for lower-income countries are coming from public infrastructure, not from venture-funded products: ID-linked registries that cut leakage from subsidies, and payments that put support directly into farmers’ accounts. The risks are the familiar DPI risks. Farmers without ID or network coverage can be left out, data collected for subsidies can be reused without consent, and registries built by different agencies can duplicate one another, as Nigeria has found [6]. The EU deadline on 30 December will test whether exporting countries can link farmer, plot and shipment data quickly enough to keep market access.'
      ]}
    ],
    tracker:{title:'Who is doing what',cols:['Country or bloc','Initiative','Scale or stage','Status'],rows:[
      ['India','AgriStack Farmer IDs, Digital Agriculture Mission','110 million IDs; deadline 31 Mar 2027 [2]','Ahead of schedule'],
      ['India','Bharat-VISTAAR AI advisory','Launched 17 Feb 2026; Hindi and English first [4]','Live, expanding'],
      ['Kenya','KIAMIS registry and fertiliser e-vouchers','6.58 million farmers; 53.6 million e-vouchers (Mar 2025) [5]','Operating'],
      ['Nigeria','National Digital Farmers Registry, anchored on NIN','Unified register proposed Sep 2026; no total published [6][7]','Planning'],
      ['India','Agri Welfare Portal: single window for PM-KISAN, AgriStack and crop insurance','Upgraded 19 Oct 2026; online eligibility checks, DBT payments, works on basic phones [14]','Live'],
      ['Nigeria','AgroPass (FCMB with Mastercard): farmers linked to buyers, inputs and lenders','FCMB lent ₦364.6 billion to agriculture last year, reaching 196,000+ smallholders [15]','Launched Oct 2026'],
      ['Lesotho','Lesotho Farmers Portal on a GovStack specification','Farmers linked to national ID and GPS land parcels [8]','Live since Aug 2026'],
      ['Ethiopia','Digital Agriculture Roadmap 2025–2033','22 use cases using the Fayda ID [3]','Planned'],
      ['Uganda','E-vouchers and e-extension in the Agriculture Strategic Plan','Part of a UGX 17 trillion plan, 2025/26–2029/30 [13]','Planned'],
      ['United States','NASA–USDA Earth observation agreement','Crop acreage, yield and drought data [9]','Signed 24 Oct 2026'],
      ['Uganda','Coffee farmer registration and plot mapping for EU traceability','1.6 million+ farmers registered by Aug 2026 against a 1.2 million target; farmers report gaps [16]','Under way'],
      ['European Union','Deforestation Regulation traceability','Large and medium operators from 30 Dec 2026 [11]','Upcoming']
    ]},
    watch:[
      'The EU Deforestation Regulation taking effect on 30 December 2026, and whether exporters’ traceability systems are ready [11].',
      'Whether Uganda’s small-scale coffee farmers are registered before their deadline of 30 June 2027, and how consent complaints are handled [16].',
      'Whether Nigeria publishes a single registry standard and first registration numbers [6].',
      'How many languages Bharat-VISTAAR supports and how many farmers use it [4].',
      'First products from the NASA–USDA agreement in official crop estimates [9].',
      'AgFunder’s next annual report, expected in early 2027, for any recovery in funding [1].'
    ],
    sources:[
      ['Agrifoodtech funding is flat. The interesting part is where it isn’t','AgFunder News, 18 Mar 2026','https://agfundernews.com/agrifoodtech-funding-is-flat-the-interesting-part-is-where-it-isnt'],
      ['Farmer ID: 11 crore digital IDs under Digital Agriculture Mission','NEXT IAS, 26 Oct 2026','https://www.nextias.com/ca/current-affairs/26-10-2026/farmer-id-digital-agriculture-mission'],
      ['Digital Public Infrastructure: a new approach for the agriculture sector','Co-Develop and Center for Open Societal Systems, with Gates Foundation support, 2025','https://connect4impact.worldbank.org/system/files/2026-02/DPI-Approach-for-Agriculture-Sector_Final_.pdf'],
      ['Union Minister to launch Bharat-VISTAAR','Press Information Bureau, Government of India, Feb 2026','https://www.pib.gov.in/PressReleasePage.aspx?PRID=2228842&reg=3&lang=1'],
      ['E-voucher registration reaches 6.58M farmers','KBC, 14 Mar 2025','https://www.kbc.co.ke/e-voucher-registration-reaches-6-58m-farmers/'],
      ['Kyari pushes national digital farmers register to eliminate duplication','The Authority, 30 Sep 2026','https://authorityngr.com/2026/09/30/kyari-pushes-national-digital-farmers-register-to-eliminate-duplication/'],
      ['Nigeria launches National Digital Farmers Registry to strengthen food security','Federal Ministry of Agriculture and Food Security, 20 Nov 2025','https://agriculture.gov.ng/nigeria-launches-national-digital-farmers-registry-to-strengthen-food-security/'],
      ['Lesotho launches National Farmers Portal','PR Newswire, Aug 2026','https://www.prnewswire.com/news-releases/lesotho-launches-national-farmers-portal-giving-every-farmer-a-place-in-a-single-digital-registry-302864372.html'],
      ['NASA, USDA sign agreement advancing Earth science, agriculture','NASA, 26 Oct 2026','https://www.nasa.gov/news-release/nasa-usda-sign-agreement-advancing-earth-science-agriculture/'],
      ['EU Deforestation Regulation application postponed to 30 December 2026','EY Tax News, 20 Jan 2026','https://taxnews.ey.com/news/2026-0237-eu-deforestation-regulation-application-postponed-to-30-december-2026'],
      ['Commission updates product scope and tools to support EUDR','European Commission, 13 Jul 2026','https://environment.ec.europa.eu/news/commission-updates-product-scope-and-tools-support-eudr-2026-07-13_en'],
      ['1,000 initiatives and beyond: how FAO’s AgriTech Observatory helps navigate digital agriculture','FAO, 2 Jun 2026','https://www.fao.org/europe/news/detail/1-000-initiatives-and-beyond--how-fao-s-agritech-observatory-helps-navigate-digital-agriculture/en'],
      ['MAAIF unveils strategic blueprints to transform Uganda’s agriculture by 2030','Publicist East Africa, 5 Jan 2026','https://publicisteastafrica.com/maaif-unveils-strategic-blueprints-to-transform-ugandas-agriculture-by-2030/'],
      ['Government to stay live on mobile: Shivraj Singh Chouhan launches new portal for farmers','Press Information Bureau, Government of India, 19 Oct 2026','https://www.pib.gov.in/PressReleasePage.aspx?PRID=2325129&reg=48&lang=2'],
      ['FCMB and Mastercard launch AgroPass to expand finance access for Nigerian farmers','TechAfrica News, 2 Nov 2026','https://techafricanews.com/2026/11/02/fcmb-mastercard-launch-agropass-expand-finance-access-nigerian-farmers'],
      ['Slow registration worries coffee farmers as second deadline draws closer','Daily Monitor, 5 Oct 2026','https://www.monitor.co.ug/uganda/news/national/slow-registration-worries-coffee-farmers-as-second-deadline-draws-closer-5620446'],
      ['Uganda rolls out digital system to boost coffee traceability and meet EU regulations','The Cooperator News, 10 Apr 2026','https://thecooperator.news/uganda-rolls-out-digital-system-to-boost-coffee-traceability-and-meet-eu-regulations/'],
      ['Uganda races to register 2.8 million coffee farmers ahead of EU deforestation law','Nile Post, 28 May 2025','https://nilepost.co.ug/agriculture/261211/uganda-races-to-register-2-8-million-coffee-farmers-ahead-of-eu-deforestation-law']
    ]
  }
}
];
/* NEXT: the editor's choice for the coming month, e.g. {key:'2026-12', label:'December 2026', country:'zambia', sector:'Health'}.
   On the first day of that month the daily update builds the new month at the top of MONTHS from this choice, then sets NEXT back to null.
   If NEXT is null when a month starts, the current focus continues until the editor chooses. */
const NEXT = null;
window.DV_FOCUS = {MONTHS, NEXT};
})();
