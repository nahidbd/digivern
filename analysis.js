/* Digivern in-depth analysis.
   Each analysis has: key numbers, body sections, charts (bar = one series, group = two series), a timeline,
   an impact assessment, a comparison with similar work around the world, a comparison inside the country,
   what to watch, and numbered sources. "[n]" in any text becomes a link to source n.
   Optional sections (expected in every new analysis):
     policy:{title?, intro?, rows:[[instrument, year, what it does, status]]}
     implementation:{title?, intro?, rows:[[milestone, date or target, 'done'|'on track'|'delayed'|'not started'|'unclear', evidence]]}
     economics:{title?, figures:[{v,l,c}], p:[paragraphs on budget, cost, savings, market size, cost-benefit]}
     voices:[{who, group:'Government'|'Industry'|'Expert'|'Civil society'|'Users'|'Development partner', stance:'support'|'concern'|'mixed', view (attributed paraphrase or short quote), c}] */
const ANALYSES = [
{
  id:'a1', theme:'dpi', sector:'Fintech & payments', region:'Asia-Pacific', country:'bangladesh', date:'2 Nov 2026', readMins:11,
  kicker:'Payments · Bangladesh in global context',
  title:'One switch for every taka: can Bangladesh catch up on interoperable payments?',
  standfirst:'From today, eight West African countries route all mobile money transfers through one central bank switch. India and Brazil did this years ago. Bangladesh has tried several times since 2020; this year a compulsory Bangla QR finally took off, and it now aims for full interoperability by July 2027. What the comparisons show, and what it would take.',
  keynums:[
    {v:'25.47 bn',l:'UPI payments in India in October 2026',c:1},
    {v:'7.89 bn',l:'Pix payments in Brazil in September 2026',c:2},
    {v:'38 m',l:'users on West Africa’s PI-SPI, a year after launch',c:4},
    {v:'Tk 201,337 cr',l:'monthly MFS value in Bangladesh, April 2026',c:11},
    {v:'Tk 143.54 cr',l:'daily Bangla QR payments, up from about Tk 28 cr in June 2026',c:18}
  ],
  body:[
    {h:'The short version',p:[
      'Interoperability means a person can send money from any bank, wallet or mobile money account to any other, instantly and cheaply. Countries that achieved it did so with a public switch run or backed by the central bank, and by keeping transfers free or nearly free for individuals.',
      'Bangladesh has a large mobile money market, with 255 million MFS subscriber records and monthly MFS value that doubled between July 2023 and April 2026 [11]. But money still moves mostly inside closed networks. Since November 2025 cross-provider transfers run through the National Payment Switch Bangladesh (NPSB) with fee caps [7], and the Mojaloop-based Inclusive Instant Payment System (IIPS) went live the same month [10]. The central bank’s target is that every bank, MFS provider and other financial institution is on an interoperable system by July 2027 [9].'
    ]},
    {h:'What the leaders did',p:[
      'India’s UPI processed 25.47 billion payments worth ₹31.53 lakh crore in October 2026, about 822 million a day [1]. Brazil’s Pix handled 7.89 billion payments worth R$3.81 trillion in September 2026, up 15% in a year [2], and accounted for 55.2% of all payment transactions in Brazil in the first half of 2026 [3]. Both are free for individuals: NPCI has repeatedly said consumers are not charged for UPI [13], and Brazil’s central bank made Pix free for individuals from launch [14].',
      'West Africa is the newest case. The BCEAO launched PI-SPI on 30 September 2025 with 45 institutions [5]. By October 2026 it connected more than 175 institutions and over 38 million users, and from 2 November 2026 all interoperable person-to-person transfers in the eight WAEMU countries must run through it [4]. Transfers are free up to CFAF 8,000 a day, with fees capped at 0.8% above that [6].'
    ]},
    {h:'Where Bangladesh stands',p:[
      'Bangladesh’s caps are low for bank-originated transfers (0.15%) but high for MFS-originated ones (0.85%, including VAT) [7], which is where most low-income users sit. A sender moving Tk 1,000 from one MFS account to another pays Tk 8.50; in India or Brazil the same transfer is free [7][13][14].',
      'The country has also been here before. An NPSB interoperability service launched in 2020 was suspended within hours [7]. The Binimoy platform, built for Tk 65 crore and launched in November 2022, attracted only eight banks, three MFS providers and two PSPs before Bangladesh Bank ended it in 2025, citing irregularities and a breach of the agreement behind it [8]. The lesson from both is that technology alone does not create interoperability: the incentives of the largest providers and the pricing for users decide whether people actually switch.'
    ]},
    {h:'Bangla QR: the part that is working',p:[
      'Bangla QR shows what changes when the central bank makes interoperability compulsory. Bangladesh Bank issued the national QR standard, based on the EMV merchant-presented specification, in January 2021 and told providers to replace their own QR codes by the end of that year [15]. For five years most merchants kept separate bKash, Nagad or bank codes. On 1 April 2026 the central bank ordered all banks, MFS providers and payment operators to switch to Bangla QR by 30 June, with penalties of up to Tk 30 lakh [20]; from 1 July it became mandatory for all businesses, so one sticker accepts payment from any bank or wallet app [16].',
      'Use jumped. About 39 lakh merchant points now accept Bangla QR, and daily payments rose from about 1 lakh worth Tk 28 crore in June 2026 to nearly 3.5 lakh worth Tk 143.54 crore by late September [18]. From 1 October the central bank removed the 1% minimum merchant fee, set the interchange fee to zero and required instant settlement to merchants [17]. On 1 November it opened person-to-person transfers by Bangla QR: a user scans another person’s code to send money between banks and wallets without typing an account number [19][21]. Fees and limits for these transfers had not been published at launch [19].'
    ]},
    {h:'Digivern’s assessment',p:[
      'Bangladesh has the ingredients that India and Brazil had: a central bank willing to own the switch, open-source infrastructure (Mojaloop, also used in other countries), and a deep mobile money base. Bangla QR has now proved the method: a fixed deadline, penalties and lower merchant costs moved the market in three months where five years of voluntary adoption had not [16][18]. The weak point is pricing. While MFS-originated transfers carry a fee about as high as the West African cap that starts only above a free daily allowance, closed networks keep their advantage. The July 2027 target is achievable for connection; it will only change behaviour if person-to-person transfers become free or close to free and if the dominant MFS providers are required, not invited, to route through the national switch, as the BCEAO has now done.'
    ]}
  ],
  charts:[
    {type:'bar',title:'Bangla QR took off once it became compulsory',sub:'Average daily Bangla QR payments, Tk crore',fmt:'dec',
     rows:[['June 2026 (before the mandate)',28,''],['Late September 2026 (after 1 July mandate)',143.54,'hl']],c:[18]},
    {type:'bar',title:'What an individual pays to send money across providers',sub:'Maximum fee on a person-to-person transfer, % of amount. Lower is better.',fmt:'pct',
     rows:[['India · UPI (consumers)',0,''],['Brazil · Pix (individuals)',0,''],['West Africa · PI-SPI (up to CFAF 8,000/day)',0,''],['West Africa · PI-SPI (above daily allowance)',0.8,''],['Bangladesh · from a bank account',0.15,'hl'],['Bangladesh · from a PSP',0.20,'hl'],['Bangladesh · from an MFS account',0.85,'hl']],
     c:[6,7,13,14]},
    {type:'bar',title:'West Africa’s switch grew fast once the central bank set a deadline',sub:'Institutions connected to PI-SPI',fmt:'int',
     rows:[['Launch, 30 Sep 2025',45,''],['20 Jul 2026',80,''],['Oct 2026',175,'hl']],c:[4,5]},
    {type:'group',title:'Inside Bangladesh: digital payments are growing, led by internet banking',sub:'Monthly value, Tk crore',fmt:'int',series:['July 2023','April 2026'],
     rows:[['Mobile financial services',[98307,201337]],['Internet banking',[46243,158917]]],c:[11]}
  ],
  timeline:{title:'Bangladesh’s road to interoperable payments',items:[
    ['2020','NPSB interoperability between providers launched and suspended within hours',7],
    ['Jan 2021','Bangla QR national QR standard issued; providers told to replace their own codes by end-2021',15],
    ['Nov 2022','Binimoy platform launched (Tk 65 crore); used by 8 banks, 3 MFS and 2 PSPs',8],
    ['Aug 2025','Bangladesh Bank ends Binimoy, citing irregularities',8],
    ['1 Nov 2025','Cross-platform MFS, bank and PSP transfers via NPSB, with fee caps',7],
    ['Nov 2025','Mojaloop-based Inclusive Instant Payment System (IIPS) launched',10],
    ['1 Jul 2026','Bangla QR mandatory for all merchants; one code accepts every bank and wallet',16],
    ['1 Oct 2026','1% minimum merchant fee removed; instant settlement to merchants',17],
    ['1 Nov 2026','Person-to-person transfers by Bangla QR go live',19],
    ['Jul 2027','Target: all financial institutions on an interoperable system',9]
  ]},
  impact:[
    {who:'Small merchants',dir:'+',size:'High',text:'One Bangla QR sticker replaces several provider codes and a POS machine; the 1% minimum fee is gone and money arrives instantly [16][17].'},
    {who:'Low-income users',dir:'+',size:'High',text:'Can pay anyone regardless of provider; gains are largest if MFS-originated fees fall towards zero [7].'},
    {who:'Large MFS providers',dir:'±',size:'High',text:'Lose the lock-in of closed networks but gain volume and access to bank customers; the main source of resistance in past attempts [8].'},
    {who:'Banks and PSPs',dir:'+',size:'Medium',text:'Low caps (0.15–0.20%) make them competitive for transfers into wallets for the first time [7].'},
    {who:'Government and central bank',dir:'+',size:'High',text:'Less cash to print and manage; a former governor put cash management costs at about Tk 20,000 crore a year [10].'},
    {who:'Migrant families',dir:'+',size:'Medium',text:'An instant domestic leg makes formal remittance channels more attractive than hundi [10].'},
    {who:'Consumer protection',dir:'−',size:'Medium',text:'Faster, wider payments also speed up fraud; IIPS plans fraud screening with the Tazama toolkit [10].'}
  ],
  world:{title:'Similar systems around the world',cols:['System','Run by','Launched','Latest scale','Fee for individuals'],
    rows:[
      ['UPI, India','NPCI (central bank–promoted)','2016','25.47 bn payments, Oct 2026 [1]','Free for consumers [13]'],
      ['Pix, Brazil','Banco Central do Brasil','Nov 2020','7.89 bn payments, Sep 2026; 55.2% of all transactions [2][3]','Free [14]'],
      ['PI-SPI, WAEMU (8 countries)','BCEAO','30 Sep 2025','175+ institutions, 38 m users, Oct 2026 [4]','Free to CFAF 8,000/day, then ≤0.8% [6]'],
      ['Kenya','Central Bank of Kenya','Draft law','Draft National Payment System Bill 2026 adds interoperability and open-finance rules [12]','Not yet set'],
      ['IIPS / NPSB, Bangladesh','Bangladesh Bank','Nov 2025','255 m MFS records; full interoperability targeted Jul 2027 [9][11]','0.15–0.85% cap [7]']
    ]},
  home:{title:'Inside Bangladesh: earlier and parallel efforts',cols:['Initiative','Lead','Period','What happened'],
    rows:[
      ['NPSB interoperability (first attempt)','Bangladesh Bank','2020','Suspended within hours of launch [7]'],
      ['Binimoy','ICT Division (IDEA), run by Bangladesh Bank','Nov 2022 – 2025','Low uptake; ended over irregularities and unpaid support [8]'],
      ['NPSB cross-platform transfers','Bangladesh Bank','From 1 Nov 2025','MFS, bank and PSP transfers with fee caps; sender pays [7]'],
      ['Inclusive Instant Payment System (IIPS)','Bangladesh Bank, Mojaloop, Gates Foundation support','From Nov 2025','Feature-phone access, simpler accounts, fraud screening; to connect MFIs later [10]'],
      ['Bangla QR (merchant payments)','Bangladesh Bank, via NPSB','Standard Jan 2021; mandatory 1 Jul 2026','39 lakh merchant points; daily value up about fivefold in three months [15][16][18]'],
      ['Bangla QR person-to-person','Bangladesh Bank','From 1 Nov 2026','Scan a person’s code to pay across banks and wallets; fees and limits not yet published [19][21]']
    ]},
  watch:[
    'The fees and limits Bangladesh Bank sets for person-to-person Bangla QR transfers, and whether they are lower than the 0.85% cap on MFS-originated transfers.',
    'Whether Bangladesh Bank lowers the 0.85% cap on MFS-originated transfers or introduces a free daily allowance like the BCEAO’s.',
    'Whether the largest MFS providers are required to route person-to-person transfers through IIPS, and by when.',
    'Monthly interoperable transaction data: Bangladesh Bank does not yet publish it separately, which makes progress hard to track.',
    'Kenya’s National Payment System Bill, the next big mobile money market to legislate interoperability.'
  ],
  sources:[
    ['UPI recorded 25.47 billion transactions, ₹31.53 lakh crore value in October (NPCI data)','NewsBytes, 1 Nov 2026','https://www.newsbytesapp.com/news/business/upi-recorded-2547-billion-transactions-rs3153lcr-value-in-october/tldr'],
    ['Pix movimenta R$ 3,81 trilhões em setembro, maior valor mensal da série (BCB data)','Carta Circular, 20 Oct 2026','https://www.cartacircular.com/pix-setembro-2026-recorde-valor-mensal/'],
    ['Pix concentra 55% das transações realizadas no Brasil, diz Banco Central','Metrópoles, 27 Oct 2026','https://www.metropoles.com/brasil/pix-concentra-55-das-transacoes-realizadas-no-brasil-diz-banco-central'],
    ['The end of closed mobile money networks in West Africa','TechAfrica News, 26 Oct 2026','https://techafricanews.com/2026/10/26/89825/'],
    ['BCEAO: PI-SPI surpasses 30 million users','Financial Afrik, 23 Jul 2026','https://www.financialafrik.com/en/2026/07/23/bceao-pi-spi-surpasses-30-million-users-and-accelerates-financial-inclusion-in-the-uemoa/'],
    ['BCEAO eases mobile money rules, gives operators more freedom to invest customer funds','Ecofin Agency, 12 Oct 2026','https://www.ecofinagency.com/news-finances/1210-59674-bceao-eases-mobile-money-rules-gives-operators-more-freedom-to-invest-customer-funds'],
    ['Cross-platform MFS transfers from Nov','The Daily Star, 13 Oct 2025','https://www.thedailystar.net/business/news/cross-platform-mfs-transfers-nov-4008981'],
    ['BB suspends Binimoy over irregularities','The Daily Star, 3 Aug 2025','https://www.thedailystar.net/business/news/bb-suspends-binimoy-over-irregularities-3954916'],
    ['Bangladesh Bank targets fully digital transactions by July 2027','The Daily Star, 24 Nov 2025','https://www.thedailystar.net/business/news/bangladesh-bank-targets-fully-digital-transactions-july-2027-4042431'],
    ['Cash management costs BB Tk 200b a year, digital push a must: Mansur','The Financial Express, 23 Jul 2026','https://thefinancialexpress.com.bd/economy/cash-management-costs-bb-tk-200b-a-year-digital-push-a-must-mansur'],
    ['What Bangladesh’s payment surge does and does not tell us','The Daily Star, 10 Oct 2026','https://www.thedailystar.net/business/news/what-bangladeshs-payment-surge-does-and-does-not-tell-us-4295156'],
    ['Draft National Payment System Bill, 2026 gives CBK stronger powers over mobile money','Dawan Africa, 12 Oct 2026','https://www.dawan.africa/news/draft-national-payment-system-bill-2026-gives-cbk-stronger-powers-over-mobile-money-wallets-and-fintechs'],
    ['NPCI clarifies that customers won’t be charged for UPI transactions','The News Minute, 29 Mar 2023','https://www.thenewsminute.com/money/npci-clarifies-customers-wont-be-charged-upi-transactions-175237'],
    ['Central Bank regulates tariff collection under Pix (free for individuals)','Felsberg Advogados, 26 Oct 2020','https://www.felsberg.com.br/en/central-bank-regulates-tariff-collection-and-rediscount-line-under-pix/'],
    ['Central bank issues guidelines on “Bangla QR” payments','The Financial Express, 7 Jan 2021','https://old.thefinancialexpress.com.bd/trade/central-bank-issues-guidelines-on-bangla-qr-payments-1609991144'],
    ['BB launches Bangla QR to drive cashless economy','UNB, 2 Jul 2026','https://unb.com.bd/category/business/bb-launches-bangla-qr-to-drive-cashless-economy/189653'],
    ['Bangla QR payments to get cheaper, faster for merchants','The Daily Star, 1 Oct 2026','https://www.thedailystar.net/business/economy/news/bangla-qr-payments-get-cheaper-faster-merchants-4287316'],
    ['Bangla QR transactions surge nearly fivefold to Tk 143.54cr daily: BB','UNB, 30 Sep 2026','https://unb.com.bd/category/Business/bangla-qr-transactions-surge-nearly-fivefold-to-tk-14354cr-daily-bb/196633'],
    ['Bangladesh Bank launches QR-based P2P payment service','The Business Standard, 1 Nov 2026','https://www.tbsnews.net/economy/banking/bangladesh-bank-launches-qr-based-p2p-payment-service-1589731'],
    ['What is Bangla QR?','The Daily Star, 2 Apr 2026','https://www.thedailystar.net/business/news/what-bangla-qr-4141941'],
    ['BB set to introduce person-to-person money transfer through Bangla QR','The Financial Express, 14 Aug 2026','https://thefinancialexpress.com.bd/trade/bb-set-to-introduce-person-to-person-money-transfer-through-bangla-qr']
  ],
  related:['n25','n19']
},
{
  id:'a2', theme:'sec', sector:'Health', region:'Asia-Pacific', country:'bangladesh', date:'2 Nov 2026', readMins:8,
  kicker:'Health tech · Bangladesh in global context',
  title:'A health card for 200 million people: what Bangladesh can learn from India, the UK and Singapore',
  standfirst:'Bangladesh has promised every citizen an e-health card by 2028, linked to a national health database. Other countries show that the card is the easy part. Linking records, getting hospitals to use them and protecting the data take years.',
  keynums:[
    {v:'~200 m',l:'people the planned Bangladesh health database would cover',c:1},
    {v:'2028',l:'target for an e-health card for every Bangladeshi citizen',c:2},
    {v:'93 cr+',l:'ABHA health accounts in India, linked to 104 crore records',c:4},
    {v:'16.7 m',l:'people used England’s NHS App in September 2026',c:5}
  ],
  body:[
    {h:'The short version',p:[
      'On 18 October 2026, State Minister for Health Dr M A Muhit set out plans for a universal e-health card and a national health database for nearly 200 million people, linking consultations, prescriptions, medicine purchases and test results [1]. The government’s stated target is a card for every citizen by 2028 [2], starting in five districts: Khulna, Noakhali, Bogura, Sirajganj and Narsingdi [3]. No budget or rollout schedule has been published [1][3].'
    ]},
    {h:'What others did',p:[
      'India built a health ID first and records later. Under the Ayushman Bharat Digital Mission, more than 93 crore ABHA accounts have been created and over 104 crore health records linked to them; a “scan and share” queue service issued over 23 crore tokens and cut hospital registration waits from about an hour to a few minutes [4]. The scale came from linking the ID to services people already used, not from the card itself.',
      'England took the opposite route: a single app on top of existing records. The NHS App had 16.7 million users in September 2026, up 24% in a year, and 6.3 million people used it to order repeat prescriptions that month [5]. Even so, a single patient record that joins hospital, GP and social care data is only due in the app by 2028, under the NHS Modernisation Bill [6].',
      'Singapore and Thailand are cutting app sprawl. Singapore is merging four public health apps into an enhanced HealthHub app by November 2026, with the old apps switched off by February 2027 [7]. Thailand announced in 2025 that its Mor Prom+ “super app” would replace more than 50 separate government health apps [8]. In Africa, AU member states validated a continental health data governance framework in October 2026, so national records can be shared across borders under common safeguards [9].'
    ]},
    {h:'Where Bangladesh stands',p:[
      'Bangladesh is not starting from zero. The Directorate General of Health Services piloted a Shared Health Record on the open-source OpenHIE and OpenMRS (Bahmni) stack in Kaliganj from November 2015 and in Gazipur district from 2016 [10]. What has been missing is a single identifier used across public and private providers, and the instruction to use it. The e-health card can supply the identifier; the five-district rollout is meant to link cardholders to electronic referral and patient management systems [3].'
    ]},
    {h:'Digivern’s assessment',p:[
      'The international evidence points to three conditions. First, make the record useful on day one: India’s scan-and-share and England’s prescription ordering drove use because they saved patients time [4][5]. Second, build on what exists: the Shared Health Record pilots and the national ID give Bangladesh a head start that a card-first approach could waste. Third, protect the data before it is pooled: a database of 200 million health records is a high-value target, as Moldova’s October 2026 e-government breach showed for linked registries. A published budget, a rollout timetable and clear rules on who may see the records would turn the 2028 promise into a plan.'
    ]}
  ],
  charts:[
    {type:'bar',title:'India: scale built on one health identifier',sub:'Crore (10 million), as of mid-2026',fmt:'dec',
     rows:[['Health records linked',104,'hl'],['ABHA accounts',93,''],['Scan-and-share tokens issued',23.21,'']],c:[4]},
    {type:'bar',title:'England: what a mature national health app does in a month',sub:'Millions, September 2026',fmt:'dec',
     rows:[['People using the NHS App',16.7,'hl'],['Repeat prescriptions ordered',7.8,''],['People ordering prescriptions',6.3,'']],c:[5]},
    {type:'bar',title:'Cutting app sprawl',sub:'Separate public health apps being merged into one',fmt:'int',
     rows:[['Thailand · Mor Prom+',50,''],['Singapore · HealthHub',4,'']],c:[7,8]}
  ],
  timeline:{title:'Bangladesh’s road to a national health record',items:[
    ['Nov 2015','Shared Health Record pilot in Kaliganj on OpenHIE and OpenMRS',10],
    ['Mar 2016','Pilot extended to Gazipur district',10],
    ['Apr 2026','Prime Minister announces e-health cards in five districts within the 180-day programme',3],
    ['Jun 2026','Health Minister tells Parliament: e-health cards for all citizens by 2028',2],
    ['18 Oct 2026','National health database, app-based appointments and medicine tracking unveiled',1],
    ['2028','Target: every citizen holds an e-health card',2]
  ]},
  impact:[
    {who:'Patients',dir:'+',size:'High',text:'Records follow the patient between facilities, cutting repeat tests and paper files [1].'},
    {who:'Public hospitals',dir:'±',size:'High',text:'Digital medicine tracking can curb leakage, but staff need devices, connectivity and training [1].'},
    {who:'Doctors and health workers',dir:'±',size:'Medium',text:'Better history at the point of care, more data entry; adoption depends on systems being fast and simple.'},
    {who:'Private providers',dir:'±',size:'Medium',text:'Value depends on whether private clinics and pharmacies are required to connect to the national database.'},
    {who:'Privacy and security',dir:'−',size:'High',text:'A national record for ~200 million people is a prime target; access rules and breach response must come first.'},
    {who:'People without phones or IDs',dir:'−',size:'Medium',text:'App-based booking can exclude the poorest unless assisted channels remain [1].'}
  ],
  world:{title:'Similar programmes around the world',cols:['Country','Programme','Approach','Status'],
    rows:[
      ['India','Ayushman Bharat Digital Mission (ABHA)','Health ID first, records linked to it','93 cr+ accounts, 104 cr records linked [4]'],
      ['United Kingdom (England)','NHS App and Single Patient Record','App on existing records; joined record by law','16.7 m monthly users; record in app by 2028 [5][6]'],
      ['Singapore','Enhanced HealthHub','Merge cluster apps into one national app','4 apps merged by Nov 2026 [7]'],
      ['Thailand','Mor Prom+','Super app replacing many ministry apps','50+ apps to be consolidated (announced 2025) [8]'],
      ['African Union','Continental Health Data Governance Framework','Common rules, federated cross-border sharing','Validated Oct 2026; AU process in 2027 [9]'],
      ['Bangladesh','e-Health Card and national health database','Card and database together','5 districts first; all citizens by 2028 [1][2][3]']
    ]},
  home:{title:'Inside Bangladesh: earlier and parallel efforts',cols:['Initiative','Lead','Period','What happened'],
    rows:[
      ['Shared Health Record pilot','DGHS, with Thoughtworks','2015–2016 onwards','OpenHIE/OpenMRS record piloted in Kaliganj and Gazipur [10]'],
      ['e-Health Card, five districts','Government 180-day programme','Announced Apr 2026','Khulna, Noakhali, Bogura, Sirajganj, Narsingdi; project awaiting approval [3]'],
      ['e-Health Card for all','Ministry of Health and Family Welfare','Target 2028','Through a technical assistance project [2]'],
      ['National health database and app','Ministry of Health, with WHO','Unveiled Oct 2026','Links consultations, prescriptions, purchases and tests [1]']
    ]},
  watch:[
    'Approval of the five-district project proposal and its budget.',
    'Whether private hospitals, diagnostic centres and pharmacies are required to connect.',
    'Rules on who can access records under the Personal Data Protection Ordinance 2025.',
    'Whether the Shared Health Record platform is reused or replaced.'
  ],
  sources:[
    ['From paper prescriptions to digital care: a new hope for Bangladesh','The Daily Star, 25 Oct 2026','https://www.thedailystar.net/health/news/paper-prescriptions-digital-care-new-hope-bangladesh-4306636'],
    ['Every citizen to get e-health cards by 2028: Health Minister','UNB, 10 Jun 2026','https://unb.com.bd/category/Bangladesh/every-citizen-to-get-e-health-cards-by-2028-health-minister/187860'],
    ['Govt plans to roll out e-health cards in 5 districts: PM','The Business Standard, 15 Apr 2026','https://www.tbsnews.net/bangladesh/govt-plans-rollout-e-health-cards-5-districts-pm-1411756'],
    ['Over 104 crore health records linked to over 93 crore ABHA accounts','Press Information Bureau, Government of India, 6 Jul 2026','https://www.pib.gov.in/PressReleasePage.aspx?PRID=2281466&reg=3&lang=1'],
    ['NHS App reaches 16.7 million monthly users in England','ICT Health, 28 Oct 2026','https://icthealth.org/news/nhs-app-reaches-167-million-monthly-users-in-england'],
    ['NHS moves to national patient record system with mandatory data sharing','Computing','https://www.computing.co.uk/news/2026/security/nhs-moves-to-national-patient-record-system-with-mandatory-data-sharing'],
    ['Public healthcare cluster apps to be unified under enhanced HealthHub app by November 2026','Synapxe, 2 Jul 2026','https://www.synapxe.sg/media-releases/collaboration/healthcare-apps-unified-healthhub-2026'],
    ['Thailand to launch “Moh Promt+” super app for unified health services','The Nation Thailand, 9 Oct 2025','https://www.nationthailand.com/health-wellness/40056535'],
    ['AU member states validate African Continental Health Data Governance Framework','Africa CDC, 22 Oct 2026','https://africacdc.org/news-item/au-member-states-validate-african-continental-health-data-governance-framework/'],
    ['DGHS Bangladesh: Shared Health Record','Thoughtworks','https://www.thoughtworks.com/en-gb/clients/dghs-bangladesh']
  ],
  related:['n21','n20']
}
];
window.DV_ANALYSES = ANALYSES;
