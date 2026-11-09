/* CGTK in-depth analysis.
   Each analysis has: key numbers, body sections, charts (bar = one series, group = two series), a timeline,
   an impact assessment, a comparison with similar work around the world, a comparison inside the country,
   what to watch, and numbered sources. "[n]" in any text becomes a link to source n.
   updated: optional date string shown as 'Updated <date>' when an analysis is revised with new sources.
   Sections expected in every analysis:
     policy:{title?, intro?, rows:[[instrument, year, what it does, status]]}
     implementation:{title?, intro?, rows:[[milestone, date or target, 'done'|'on track'|'delayed'|'not started'|'unclear', evidence]]}
     economics:{title?, figures:[{v,l,c}], p:[paragraphs on budget, cost, savings, market size, cost-benefit]}
     voices:[{who, group:'Government'|'Industry'|'Expert'|'Civil society'|'Users'|'Development partner', stance:'support'|'concern'|'mixed', view (attributed paraphrase or short quote), c}]
     infographic (required in every new analysis and Monthly Focus page): {title, sub?, note?, blocks:[...]} drawn as a branded "At a glance" panel. Block types:
       {type:'stats', title?, items:[{icon, v, l, c}]}
       {type:'flow', title?, steps:[{icon?, date?, status?:'done'|'target'|'delayed'|'planned'|'unclear', label, note?, c?:[n]}]}
       {type:'iconArray', title?, pct (0-100), icon, big?, label, c, legend?:[on, off]}
       {type:'compare', title?, items:[{label, v (number for bar length), text, icon?, hl?}], c?:[n], note?}
       {type:'meters', title?, items:[{label, pct, text?}], c?:[n]}
       icons: id phone bank coin qr person people globe shield chip tower leaf health school law data link transfer card server wifi check clock alert map chart.
       Use only figures that appear in the page's own sources, with their [n]; label own arithmetic as a CGTK calculation. Do not repeat a chart that is already on the page.
*/
const ANALYSES = [
{
  id:'a1', theme:'dpi', sector:'Fintech & payments', region:'Asia-Pacific', country:'bangladesh', date:'2 Nov 2026', updated:'4 Nov 2026', readMins:16,
  kicker:'Payments · Bangladesh in global context',
  title:'One switch for every taka: can Bangladesh catch up on interoperable payments?',
  standfirst:'From today, eight West African countries route all mobile money transfers through one central bank switch. India and Brazil did this years ago. Bangladesh has tried several times since 2020; this year a compulsory Bangla QR finally took off, and the central bank aims for full interoperability by July 2027. What the laws, the money, the people and the comparisons show.',
  infographic:{title:'Bangladesh’s road to one payment switch', sub:'Bangla QR took off once it became compulsory; full interoperability is the next test.', blocks:[
    {type:'flow', title:'Milestones', steps:[
      {date:'Jan 2023', status:'done', icon:'qr', label:'Bangla QR pilot in Motijheel, Dhaka', c:[28]},
      {date:'Nov 2025', status:'done', icon:'transfer', label:'Transfers between banks, MFS and PSPs through NPSB, with fee caps', c:[7]},
      {date:'Jul 2026', status:'done', icon:'qr', label:'Bangla QR compulsory for all merchants', c:[16]},
      {date:'Oct 2026', status:'done', icon:'coin', label:'Merchant fees removed; payments credited instantly', c:[17,31]},
      {date:'Nov 2026', status:'done', icon:'phone', label:'Person-to-person payments by Bangla QR', c:[19]},
      {date:'Jul 2027', status:'target', icon:'link', label:'All financial institutions interoperable', c:[9]}]},
    {type:'compare', title:'Daily Bangla QR payments rose nearly five-fold after the mandate', items:[{label:'June 2026', v:28, text:'about Tk 28 cr', icon:'qr'},{label:'Late September 2026', v:143.54, text:'Tk 143.54 cr', icon:'qr', hl:true}], c:[18]},
    {type:'compare', title:'Most it can cost to send Tk 1,000 to another provider', items:[{label:'India · UPI', v:0, text:'Free', icon:'phone'},{label:'Brazil · Pix', v:0, text:'Free', icon:'phone'},{label:'Bangladesh · from a bank account', v:1.5, text:'Tk 1.50', icon:'bank'},{label:'Bangladesh · from a PSP', v:2, text:'Tk 2', icon:'card'},{label:'Bangladesh · from an MFS account', v:8.5, text:'Tk 8.50', icon:'phone', hl:true}], note:'Bangladesh figures are CGTK calculations from the fee caps of 0.15%, 0.2% and 0.85% [7]. UPI and Pix are free for individuals [13][14].'},
    {type:'stats', title:'Where the leaders are', items:[{icon:'phone', v:'25.47 bn', l:'UPI payments in India in October 2026', c:1},{icon:'transfer', v:'7.89 bn', l:'Pix payments in Brazil in September 2026', c:2},{icon:'people', v:'38 m', l:'users on West Africa’s PI-SPI a year after launch', c:4}]}]},
  keynums:[
    {v:'25.47 bn',l:'UPI payments in India in October 2026',c:1},
    {v:'7.89 bn',l:'Pix payments in Brazil in September 2026',c:2},
    {v:'38 m',l:'users on West Africa’s PI-SPI, a year after launch',c:4},
    {v:'Tk 201,337 cr',l:'monthly MFS value in Bangladesh, April 2026',c:11},
    {v:'Tk 143.54 cr',l:'daily Bangla QR payments, up from about Tk 28 cr in June 2026',c:18}
  ],
  body:[
    {h:'The short version',p:[
      'Interoperability means a person can pay or send money from any bank, wallet or mobile money account to any other, instantly and cheaply. Countries that achieved it did so with a public switch run or backed by the central bank, a deadline that obliged every provider to join, and transfers that are free or nearly free for individuals.',
      'Bangladesh has a large mobile money market: about 237 million registered MFS accounts at the end of 2024, of which 37.6% were active [23], and monthly MFS value that doubled between July 2023 and April 2026 [11]. Money still moves mostly inside closed networks, but 2026 changed the picture. Bangla QR became compulsory for every merchant on 1 July [16], its daily value rose about fivefold in three months [18], and on 1 November person-to-person payments by QR went live [19]. The central bank’s target is that every bank, MFS provider and other financial institution is on an interoperable system by July 2027 [9].'
    ]},
    {h:'What the leaders did',p:[
      'India’s UPI processed 25.47 billion payments worth ₹31.53 lakh crore in October 2026, about 822 million a day [1]. Brazil’s Pix handled 7.89 billion payments worth R$3.81 trillion in September 2026, up 15% in a year [2], and accounted for 55.2% of all payment transactions in Brazil in the first half of 2026 [3]. Both are free for individuals: NPCI says bank-account UPI payments remain free for customers [13], and Brazil’s central bank made Pix free for individuals from launch [14].',
      'West Africa is the newest case. The BCEAO launched PI-SPI on 30 September 2025 with 45 institutions [5]. By October 2026 it connected more than 175 institutions and over 38 million users, and from 2 November 2026 all interoperable person-to-person transfers in the eight WAEMU countries must run through it [4]. Transfers are free up to CFAF 8,000 a day, with fees capped at 0.8% above that [6].'
    ]},
    {h:'Where Bangladesh stands',p:[
      'Bangladesh’s caps on cross-provider transfers are low for bank-originated transfers (0.15%) but high for MFS-originated ones (0.85%, including VAT) [7], which is where most low-income users sit. A sender moving Tk 1,000 from one MFS account to another pays Tk 8.50; in India or Brazil the same transfer is free [7][13][14]. Taking money out is costlier still: MFS cash-out fees run from Tk 12.90 to Tk 18.50 per Tk 1,000 [26].',
      'The country has also been here before. An NPSB interoperability service launched in 2020 was suspended within hours [7]. The Binimoy platform, built for Tk 65 crore and launched in November 2022, attracted only eight banks, three MFS providers and two PSPs before Bangladesh Bank ended it in 2025, citing irregularities and a breach of the agreement behind it [8]. The lesson from both is that technology alone does not create interoperability: the incentives of the largest providers and the pricing for users decide whether people actually switch.'
    ]},
    {h:'Bangla QR: the part that is working',p:[
      'Bangladesh Bank issued the national QR standard, based on the EMV merchant-presented specification, in January 2021 [15], and piloted it in Motijheel, Dhaka, from 18 January 2023 [28]. Adoption stayed voluntary and slow: by the end of 2025 about 9.63 lakh merchants used it, through 46 banks, seven MFS providers and four PSPs [28]. On 1 April 2026 the central bank ordered all providers to replace their own QR codes by 30 June, with penalties of up to Tk 30 lakh [20]; from 1 July one sticker accepts payment from any bank or wallet app [16].',
      'Use jumped. About 39 lakh merchant points now accept Bangla QR, and daily payments rose from about 1 lakh worth Tk 28 crore in June 2026 to nearly 3.5 lakh worth Tk 143.54 crore by late September [18]. Instant crediting of Bangla QR payments had applied to small and marginal merchants since 15 December 2025 [30]. From 1 October 2026 the central bank extended immediate crediting to all Bangla QR payments, removed the 1% minimum merchant fee and set the interchange fee to zero [17][31]; it also told providers that by 31 October every savings and current account holder must be able to pay by scanning Bangla QR in their app [31]. On 1 November it opened person-to-person transfers by Bangla QR: a user scans another person’s code to send money without typing an account number [19][21]. Fees and limits for these transfers had not been published at launch [19].',
      'The fast take-up has side effects. Some merchants have started letting customers withdraw cash through Bangla QR without buying anything, avoiding MFS cash-out fees and undercutting about 2 million agents; in one case Tk 36.4 lakh moved through two banks’ QR codes in five days [26].'
    ]},
    {h:'CGTK’s assessment',p:[
      'Bangladesh has the ingredients that India and Brazil had: a central bank willing to own the switch, open-source infrastructure (Mojaloop), a payments law since 2024 [22] and a deep mobile money base. Bangla QR has now proved the method: a fixed deadline, penalties and lower merchant costs moved the market in three months where years of voluntary adoption had not [16][18][28]. Two things will decide whether the July 2027 target changes behaviour. First, pricing: while sending money from an MFS account costs up to 0.85% [7] and cash-out up to about 1.85% [24], closed networks keep their advantage, so person-to-person QR transfers need to be free or close to free for small amounts, as the BCEAO now does. Second, controls: cash-out through merchants shows that removing fees without limits creates new channels for unrecorded money, so per-merchant limits and monitoring should come with each step. Publishing monthly interoperability data would let everyone see whether it is working.'
    ]}
  ],
  policy:{intro:'Bangladesh now has a dedicated payments law and a run of central bank circulars that push providers towards one interoperable system.',rows:[
    ['Payment and Settlement Systems Act 2024','2024','First dedicated payments law: Bangladesh Bank approval needed to run a payment system or issue e-money; up to five years’ jail or Tk 50 lakh fine for unlicensed operation [22]','Passed by parliament, July 2024 [22]'],
    ['MFS Regulations 2022','2022','Licensing and supervision of mobile financial service providers by Bangladesh Bank’s Payment Systems Department [23]','In force [23]'],
    ['Bangla QR guidelines','2021','National EMV-based QR standard for open-loop, interoperable payments; static QR payments capped at Tk 20,200 [15]','In force [15]'],
    ['NPSB cross-platform transfer circular','Oct 2025','MFS, bank and PSP transfers across providers from 1 Nov 2025; fee caps 0.15% (bank), 0.20% (PSP), 0.85% (MFS) including VAT; receiver pays nothing [7]','In force [7]'],
    ['Bangla QR instant settlement circular','Nov 2025','Payments to small and marginal merchants credited instantly from 15 Dec 2025; other merchants on terms set by providers [30]','In force; widened to all Bangla QR payments from 1 Oct 2026 [31]'],
    ['Bangla QR directive','Apr 2026','All providers to replace proprietary merchant QR codes by 30 June 2026; penalties up to Tk 30 lakh [20]','Complied; mandatory from 1 Jul 2026 [16]'],
    ['Bangla QR pricing and settlement directive','Sep 2026','From 1 Oct: 1% minimum merchant fee removed, interchange set to zero, all Bangla QR payments credited immediately, incentives for payments up to Tk 2,000; by 31 Oct, QR payment from every account holder’s app [17][31]','In force [17]'],
    ['Local Government Division trade licence directive','2026','Retail businesses and merchants applying for or renewing a trade licence must display a Bangla QR code, which enrols them in the Bangla QR network; city corporations and other local authorities enforce it [32]','Directive issued; effective date not stated in the report [32]'],['National interoperability target','Nov 2025','All banks, MFS providers, insurers and other institutions on an interoperable system [9]','Target July 2027 [9]']
  ]},
  implementation:{intro:'Most 2025–26 milestones were met on time. The gaps are data and the final, all-institution target.',rows:[
    ['Bangla QR pilot','18 Jan 2023','done','Pilot launched in Motijheel, Dhaka [28]'],
    ['Cross-provider transfers through NPSB','1 Nov 2025','done','Circular issued 12 Oct 2025 with fee caps [7]'],
    ['Inclusive Instant Payment System (Mojaloop)','Nov 2025','done','Launched, per Bangladesh Bank’s Payment Systems Department [10]'],
    ['Instant crediting for small and marginal merchants','15 Dec 2025','done','Circular of 24 Nov 2025 [30]'],
    ['Bangla QR mandatory for all merchants','1 Jul 2026','done','Launched by the governor at a bKash merchant outlet [16]'],
    ['Merchant fee removal and instant settlement','1 Oct 2026','done','Minimum MDR removed, interchange zero, all payments credited immediately [17][31]'],
    ['Bangla QR payment from every bank account app','31 Oct 2026','unclear','Deadline set in the September directive [31]; no compliance data published'],
    ['Person-to-person Bangla QR','1 Nov 2026','done','Live; fees and limits not yet published [19]'],
    ['Limits on merchant cash-out misuse','Not set','not started','Officials considering transaction limits on merchants [26]'],
    ['All financial institutions interoperable','Jul 2027','unclear','Target set [9]; no monthly interoperability data published [11]']
  ]},
  economics:{figures:[
    {v:'Tk 20,000 cr',l:'yearly cost of printing and managing cash, per a former governor',c:10},
    {v:'Tk 65 cr',l:'cost of the Binimoy platform, ended in 2025',c:8},
    {v:'Tk 100 cr',l:'central bank fund to subsidise merchant fees for small merchants',c:29},
    {v:'Tk 12.90–18.50',l:'MFS cash-out fee per Tk 1,000',c:26}
  ],p:[
    'Scale. Mobile financial services moved about Tk 2 lakh crore a month by April 2026 [11]. Bangla QR, at Tk 143.54 crore a day [18], is roughly Tk 4,300 crore a month (CGTK calculation), or about 2% of MFS value: fast-growing, but still a small share of digital money flows.',
    'Who pays. Under the old 1% minimum merchant fee, a grocery taking Tk 10,000 a day lost about Tk 3,000 a month [27], and consumer groups asked for a cap of 0.25% [25]. Since October the merchant fee floor and interchange are gone; Bangladesh Bank now pays incentives of 0.10% to acquirers and 0.20% to issuers on payments up to Tk 2,000 [17], backed by a Tk 100 crore fund [29]. For users, an MFS-to-MFS transfer of Tk 1,000 costs Tk 8.50 [7], and in an iDEA survey 90.9% of bKash users rated cash-out charges high or very high [24].',
    'Value for money. Binimoy cost Tk 65 crore and was closed with low use [8]. Bangla QR, with a modest subsidy fund and a mandate, multiplied daily value about five times in three months [18][29]. If wider digital payments cut even a tenth of the Tk 20,000 crore yearly cash-handling cost [10], the saving would be about Tk 2,000 crore a year (CGTK illustration), many times the public money spent so far. The main economic risk is leakage: merchant cash-outs move money outside agent controls and could feed informal hundi channels [26], at a time when remittances are about 6% of GDP [10].'
  ]},
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
    ['Jan 2021','Bangla QR national QR standard issued',15],
    ['Nov 2022','Binimoy platform launched (Tk 65 crore)',8],
    ['18 Jan 2023','Bangla QR pilot in Motijheel, Dhaka',28],
    ['Jul 2024','Parliament passes the Payment and Settlement Systems Bill',22],
    ['Aug 2025','Bangladesh Bank ends Binimoy, citing irregularities',8],
    ['1 Nov 2025','Cross-platform MFS, bank and PSP transfers via NPSB, with fee caps',7],
    ['Nov 2025','Mojaloop-based Inclusive Instant Payment System launched',10],
    ['15 Dec 2025','Instant crediting of Bangla QR payments to small merchants',30],
    ['1 Jul 2026','Bangla QR mandatory for all merchants',16],
    ['1 Oct 2026','Minimum merchant fee removed; instant settlement for all Bangla QR payments',31],
    ['1 Nov 2026','Person-to-person transfers by Bangla QR go live',19],
    ['Jul 2027','Target: all financial institutions interoperable',9]
  ]},
  impact:[
    {who:'Small merchants',dir:'+',size:'High',text:'One Bangla QR sticker replaces several provider codes and a POS machine; the 1% minimum fee is gone and money arrives instantly [16][17].'},
    {who:'Low-income users',dir:'+',size:'High',text:'Can pay anyone regardless of provider; gains are largest if MFS-originated fees fall towards zero [7][24].'},
    {who:'Large MFS providers',dir:'±',size:'High',text:'Lose the lock-in of closed networks but gain volume and access to bank customers; the main source of resistance in past attempts [8].'},
    {who:'MFS agents',dir:'−',size:'Medium',text:'About 2 million agents risk losing cash-out business to merchants offering QR withdrawals [26].'},
    {who:'Banks and PSPs',dir:'+',size:'Medium',text:'Low caps (0.15–0.20%) make them competitive for transfers into wallets for the first time [7].'},
    {who:'Government and central bank',dir:'+',size:'High',text:'Less cash to print and manage, against a cash-handling bill of about Tk 20,000 crore a year [10].'},
    {who:'Migrant families',dir:'+',size:'Medium',text:'An instant domestic leg makes formal remittance channels more attractive than hundi [10].'},
    {who:'Financial integrity',dir:'−',size:'Medium',text:'Faster payments and merchant cash-outs open new fraud and laundering routes; IIPS plans fraud screening with the Tazama toolkit [10][26].'}
  ],
  voices:[
    {who:'Md Mostaqur Rahman, Governor, Bangladesh Bank',group:'Government',stance:'support',view:'Launched mandatory Bangla QR as a step towards a cashless society and set up a Tk 100 crore fund to help small merchants adopt it.',c:29},
    {who:'Arief Hossain Khan, spokesperson, Bangladesh Bank',group:'Government',stance:'support',view:'Says person-to-person QR transfers will cut errors from mistyped account details because users no longer re-enter recipient information.',c:21},
    {who:'Rashed Al Mahmud Titumir, Prime Minister’s Adviser on Economy and Planning',group:'Government',stance:'support',view:'Says the government wants to implement a “One Citizen, One ID, One Digital Wallet” system gradually.',c:28},
    {who:'Rashedul Hasan, shopkeeper, Dilkusha, Dhaka',group:'Users',stance:'support',view:'Previously only bKash users could pay him digitally; with one code for all apps he hopes his sales will rise.',c:28},
    {who:'Mohiuddin Ahmed, President, Bangladesh Mobile Phone Consumers’ Association',group:'Civil society',stance:'concern',view:'“Imposing extra charges on digital transactions can never wean people off cash”; asked for merchant fees of at most 0.25%.',c:25},
    {who:'KAS Murshid, former director general, BIDS',group:'Expert',stance:'concern',view:'Argues the mandate and fee withdrawal were rushed, pushing some merchants into the cash-withdrawal business.',c:26},
    {who:'Mohammad Ali, Managing Director, Pubali Bank',group:'Industry',stance:'mixed',view:'Expects QR to replace card payments quickly, but warns merchant cash-outs must be stopped or hundi will grow.',c:26},
    {who:'Md Emdadul Haque, CFO and commentator',group:'Expert',stance:'mixed',view:'Merchants’ worries about fees, tax scrutiny, settlement and data use mean trust matters as much as technology.',c:27}
  ],
  world:{title:'Similar systems around the world',cols:['System','Run by','Launched','Latest scale','Fee for individuals'],
    rows:[
      ['UPI, India','NPCI (central bank–promoted)','2016','25.47 bn payments, Oct 2026 [1]','Free for bank-account payments [13]'],
      ['Pix, Brazil','Banco Central do Brasil','Nov 2020','7.89 bn payments, Sep 2026; 55.2% of all transactions [2][3]','Free [14]'],
      ['PI-SPI, WAEMU (8 countries)','BCEAO','30 Sep 2025','175+ institutions, 38 m users, Oct 2026 [4]','Free to CFAF 8,000/day, then ≤0.8% [6]'],
      ['Kenya','Central Bank of Kenya','Draft law','Draft National Payment System Bill 2026 adds interoperability and open-finance rules [12]','Not yet set'],
      ['IIPS, NPSB and Bangla QR, Bangladesh','Bangladesh Bank','2021–2026','39 lakh QR merchant points; full interoperability targeted Jul 2027 [9][18]','0.15–0.85% cap on transfers [7]']
    ]},
  home:{title:'Inside Bangladesh: earlier and parallel efforts',cols:['Initiative','Lead','Period','What happened'],
    rows:[
      ['NPSB interoperability (first attempt)','Bangladesh Bank','2020','Suspended within hours of launch [7]'],
      ['Binimoy','ICT Division (IDEA), run by Bangladesh Bank','Nov 2022 – 2025','Low uptake; ended over irregularities and unpaid support [8]'],
      ['NPSB cross-platform transfers','Bangladesh Bank','From 1 Nov 2025','MFS, bank and PSP transfers with fee caps; sender pays [7]'],
      ['Inclusive Instant Payment System (IIPS)','Bangladesh Bank, Mojaloop, Gates Foundation support','From Nov 2025','Feature-phone access, simpler accounts, fraud screening; to connect MFIs later [10]'],
      ['Bangla QR (merchant payments)','Bangladesh Bank, via NPSB','Pilot Jan 2023; mandatory 1 Jul 2026','9.63 lakh merchants by end-2025; 39 lakh merchant points by Sep 2026 [18][28]'],
      ['Bangla QR person-to-person','Bangladesh Bank','From 1 Nov 2026','Scan a person’s code to pay across banks and wallets; fees and limits not yet published [19]']
    ]},
  watch:[
    'The fees and limits Bangladesh Bank sets for person-to-person Bangla QR transfers, and whether they are lower than the 0.85% cap on MFS-originated transfers.',
    'Limits on merchant cash-outs through Bangla QR, and whether they slow genuine merchant adoption [26].',
    'Whether the largest MFS providers are required to route person-to-person transfers through IIPS, and by when.',
    'Monthly interoperable transaction data: Bangladesh Bank does not yet publish it separately, which makes progress hard to track.',
    'Kenya’s National Payment System Bill, the next big mobile money market to legislate interoperability [12].'
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
    ['BB set to introduce person-to-person money transfer through Bangla QR','The Financial Express, 14 Aug 2026','https://thefinancialexpress.com.bd/trade/bb-set-to-introduce-person-to-person-money-transfer-through-bangla-qr'],
    ['JS passes payment and settlement system bill','The Daily Star, 2 Jul 2024','https://www.thedailystar.net/news/bangladesh/politics/news/js-passes-payment-and-settlement-system-bill-3647316'],
    ['Governance challenges in the mobile financial services sector in Bangladesh','Transparency International Bangladesh, 27 May 2025','https://www.ti-bangladesh.org/en/articles/research/7261'],
    ['Analysis of cost and pricing of MFS in Bangladesh','iDEA Foundation','https://idea-bd.org/article-publication/analysis-of-cost-and-pricing-of-mfs-in-bangladesh'],
    ['Scrap Bangla QR service charge to build cashless Bangladesh: BMPCA','The Financial Express, 12 Jul 2026','https://thefinancialexpress.com.bd/trade/scrap-bangla-qr-service-charge-to-build-cashless-bangladesh-bmpca'],
    ['Misuse of Bangla QR: merchants illegally offering cash-out services, 2m agents at risk','Prothom Alo, 15 Sep 2026','https://en.prothomalo.com/business/local/8mljzomg86'],
    ['Trust is the missing link to Bangla QR’s success','The Daily Star, 11 Aug 2026','https://www.thedailystar.net/opinion/views/news/trust-the-missing-link-bangla-qrs-success-4244856'],
    ['Mandatory Bangla QR code marks new phase in Bangladesh’s digital payments','Prothom Alo, 3 Jul 2026','https://en.prothomalo.com/business/local/h5dlqaen8x'],
    ['BB sets Tk100cr to boost Bangla QR use','The New Nation, 9 Aug 2026','https://dailynewnation.com/news/848095'],
    ['BB asks to ensure instant settlement for Bangla QR code-based transactions','BSS, 24 Nov 2025','https://www.bssnews.net/business/335351'],
    ['Bangla QR payments to reach merchants instantly from Oct 1','The Daily Star, 18 Sep 2026','https://www.thedailystar.net/business/economy/news/bangla-qr-payments-reach-merchants-instantly-oct-1-4275841'],['Mandatory Bangla QR required for trade licences','Dhaka Tribune, 6 Sep 2026','https://www.dhakatribune.com/business/419203/mandatory-bangla-qr-required-for-trade-licences']
  ],
  related:['n25','n19']
},
{
  id:'a2', theme:'sec', sector:'Health', region:'Asia-Pacific', country:'bangladesh', date:'2 Nov 2026', updated:'9 Nov 2026', readMins:14,
  kicker:'Health tech · Bangladesh in global context',
  title:'A health card for 200 million people: what Bangladesh can learn from India, the UK and Singapore',
  standfirst:'Bangladesh has promised every citizen an e-health card by 2028, linked to a national health database, and has doubled its health budget. Other countries show that the card is the easy part. Linking records, getting hospitals to use them, paying for it and protecting the data take years.',
  infographic:{title:'Bangladesh’s e-health card: plans ahead of delivery', sub:'A card for every citizen is promised for 2028; the first district rollout has slipped.', blocks:[
    {type:'iconArray', title:'Who pays for health care', pct:79, icon:'coin', big:'~79%', label:'of Bangladesh’s health spending is paid out of pocket by patients and families', c:12, legend:['Out of pocket','Other sources']},
    {type:'flow', title:'From pilot to promise', steps:[
      {date:'Nov 2015', status:'done', icon:'health', label:'Shared Health Record pilot in Kaliganj', c:[10]},
      {date:'Mar 2016', status:'done', icon:'health', label:'Extended to Gazipur district', c:[10]},
      {date:'Jun 2026', status:'delayed', icon:'card', label:'e-Health Card in five districts', c:[13,1,3]},
      {date:'Oct 2026', status:'planned', icon:'data', label:'National health database and app booking unveiled, with no budget or timetable', c:[1]},
      {date:'2027', status:'unclear', icon:'server', label:'Electronic health records in all public facilities', c:[15]},
      {date:'2028', status:'target', icon:'id', label:'e-Health Card for every citizen', c:[2]}]},
    {type:'stats', title:'What scale looks like elsewhere', items:[{icon:'id', v:'93 cr+', l:'ABHA health accounts in India, linked to 104 crore records', c:4},{icon:'phone', v:'16.7 m', l:'people used England’s NHS App in September 2026', c:5},{icon:'people', v:'~200 m', l:'people the planned Bangladesh health database would cover', c:1}]}]},
  keynums:[
    {v:'~200 m',l:'people the planned Bangladesh health database would cover',c:1},
    {v:'2028',l:'target for an e-health card for every Bangladeshi citizen',c:2},
    {v:'~79%',l:'share of Bangladesh’s health spending paid out of pocket',c:12},
    {v:'93 cr+',l:'ABHA health accounts in India, linked to 104 crore records',c:4},
    {v:'16.7 m',l:'people used England’s NHS App in September 2026',c:5}
  ],
  body:[
    {h:'The short version',p:[
      'On 18 October 2026, State Minister for Health Dr M A Muhit set out plans for a universal e-health card and a national health database for nearly 200 million people, linking consultations, prescriptions, medicine purchases and test results [1]. The government’s stated target is a card for every citizen by 2028 [2], starting in five districts: Khulna, Noakhali, Bogura, Sirajganj and Narsingdi [3]. The health budget for 2026–27 nearly doubled to Tk 69,409 crore, crossing 1% of GDP for the first time [11], but no budget line or rollout schedule for the card has been published [1][11]. A revised project proposal now before the Planning Commission puts the pilot at Tk 493.88 crore, nearly three times the earlier Tk 168.16 crore, and adds a sixth district, Jhalakathi, for July 2026 to December 2028 [21].'
    ]},
    {h:'What others did',p:[
      'India built a health ID first and records later. The Ayushman Bharat Digital Mission was approved in February 2022 with Rs 1,600 crore for five years [16]; it now has more than 93 crore ABHA accounts and over 104 crore linked health records, and its “scan and share” queue service issued over 23 crore tokens and cut hospital registration waits from about an hour to a few minutes [4]. The scale came from linking the ID to services people already used.',
      'England took the opposite route: a single app on top of existing records. The NHS App had 16.7 million users in September 2026, up 24% in a year, and 6.3 million people used it to order repeat prescriptions that month [5]. A single patient record joining hospital, GP and social care data is due in the app by 2028 under the NHS Modernisation Bill, announced on 11 May 2026 [6][17].',
      'Singapore and Thailand are cutting app sprawl. Singapore is merging four public health apps into an enhanced HealthHub app by November 2026, with the old apps switched off by February 2027 [7]. Thailand announced in 2025 that its Mor Prom+ “super app” would replace more than 50 separate government health apps [8]. In Africa, AU member states validated a continental health data governance framework in October 2026 [9].'
    ]},
    {h:'Where Bangladesh stands',p:[
      'Bangladesh is not starting from zero. The Directorate General of Health Services piloted a Shared Health Record on the open-source OpenHIE and OpenMRS (Bahmni) stack in Kaliganj from November 2015 and in Gazipur district from 2016 [10]. The Bangladesh Digital Health Strategy 2023–2027 already calls for a health ID linked to the national ID, a health information exchange and electronic health records in all public facilities by 2027 [15]. What has been missing is a single identifier used across public and private providers, and the instruction to use it. The e-health card can supply the identifier; the five-district rollout is meant to link cardholders to electronic referral and patient management systems [3].',
      'The money context matters. About 79% of health spending in Bangladesh is paid by households out of pocket [12], so anything that cuts repeat tests, lost records and unnecessary visits has a direct value for families. But the health ministry has a weak record of spending its development budget, which experts say could limit the gains from the larger allocation [11][12].'
    ]},
    {h:'CGTK’s assessment',p:[
      'The international evidence points to four conditions. First, make the record useful on day one: India’s scan-and-share and England’s prescription ordering drove use because they saved patients time [4][5]. Second, build on what exists: the Shared Health Record pilots, the digital health strategy and the national ID give Bangladesh a head start that a card-first approach could waste [10][15]. Third, link the card to money: as health researchers argue, a card that only stores records changes little for a family paying most costs out of pocket, while a card linked to cashless care or insurance changes behaviour [12][13]. Fourth, protect the data before it is pooled: a database of 200 million health records is a high-value target, as Moldova’s October 2026 e-government breach showed for linked registries [20]. A published budget, a rollout timetable and clear access rules under the 2025 data protection ordinance [19] would turn the 2028 promise into a plan.'
    ]}
  ],
  policy:{intro:'Bangladesh has a digital health strategy and a new data protection law, but no health-specific data law and no published plan for the e-health card.',rows:[
    ['Bangladesh Digital Health Strategy 2023–2027','2023','Six pillars; health ID linked to the national ID; health information exchange; EHRs in all public facilities and telehealth in 80% of upazilas by 2027 [15]','In effect until 2027 [15]'],
    ['Personal Data Protection Ordinance 2025','2025','National personal data protection law (Ordinance No. 61 of 2025), relevant to who may access pooled health records [19]','Issued 2025 [19]'],
    ['Health Protection Act','2014 draft','Draft health protection law from 2014, never enacted; commentators urge it be revisited alongside the card [14]','Draft [14]'],
    ['e-Health Card programme','2026','Cards for all citizens by 2028 through a technical assistance project, starting in five districts [2][3]','Revised proposal of Tk 493.88 crore for six districts under Planning Commission review (Nov 2026) [3][21]'],
    ['India: Ayushman Bharat Digital Mission','2022','National health ID and record-linking system run by the National Health Authority; Rs 1,600 crore for five years [16]','Operating [4]'],
    ['UK: NHS Modernisation Bill','2026','Statutory duty to share patient information; single patient record in the NHS App [17]','Before Parliament [6][17]'],
    ['African Union: Continental Health Data Governance Framework','2026','Common rules and federated cross-border health data sharing [9]','Validated Oct 2026; AU process in 2027 [9]']
  ]},
  implementation:{intro:'Planning is ahead of delivery: the card has slipped from its first target date and no rollout has been reported.',rows:[
    ['Shared Health Record pilot','Nov 2015','done','Kaliganj sub-district [10]'],
    ['Shared Health Record extended','Mar 2016','done','Gazipur district [10]'],
    ['e-Health Card in five districts','June 2026 target','delayed','June rollout was planned [13]; project still awaiting approval and no timetable published [1][3]; revised proposal for July 2026–December 2028 under Planning Commission review in November 2026 [21]'],
    ['National health database, app booking and medicine tracking','Unveiled 18 Oct 2026','not started','Plans announced; no budget or timetable [1]'],
    ['EHRs in all public facilities','2027','unclear','Strategy target [15]; no progress report found'],
    ['e-Health Card for every citizen','2028','not started','Government target [2]']
  ]},
  economics:{figures:[
    {v:'Tk 493.88 cr',l:'revised cost of the six-district e-health pilot, up from Tk 168.16 cr',c:21},
    {v:'Tk 165.15 cr',l:'proposed ADB loan; the government would pay Tk 328.73 cr',c:21},
    {v:'Tk 69,409 cr',l:'total health budget 2026–27, 1.01% of GDP',c:11},
    {v:'Tk 23,522 cr',l:'block allocation in the health development budget',c:11},
    {v:'Rs 1,600 cr',l:'India’s five-year budget for its digital health mission',c:16},
    {v:'£14 bn',l:'yearly outpatient spending England aims to reduce with joined-up records and digital advice',c:17}
  ],p:[
    'Funding. Bangladesh’s 2026–27 health budget of Tk 69,409 crore includes a Tk 23,522 crore block allocation in the development budget [11], which could fund the card, but no specific allocation has been published [11][14]. The card is to be delivered through a technical assistance project [2]. A revised proposal before the Planning Commission puts the pilot at Tk 493.88 crore: Tk 328.73 crore from the government and an ADB loan of Tk 165.15 crore, to equip 881 facilities and 9,040 field workers in six districts; DGHS says it would reach 1.64 crore citizens [21]. That is about Tk 301 per targeted citizen (CGTK calculation). The cost nearly tripled from Tk 168.16 crore when the pilot grew from Khulna alone to six districts, and the Planning Commission has asked for the card’s unit cost, distribution cost and sustainability [21].',
    'Benchmarks. India budgeted Rs 1,600 crore over five years for its digital health mission [16] and has created more than 93 crore health accounts [4], roughly Rs 17 per account (CGTK calculation). England is pairing its single patient record with digital advice to cut into £14 billion a year of outpatient costs [17]. Both show that the core digital layer is cheap compared with the health spending it can make more efficient.',
    'Who pays and who gains. With about 79% of spending out of pocket [12], households bear most of the cost of duplicate tests and lost records today, so they would gain most from a working shared record. Researchers argue the card delivers its real economic value only if it is linked to cashless or insured care for poor families [13]. The main fiscal risk is under-spending: experts warn that the ministry’s weak record in using its development budget, and corruption and delays in hospitals, could leave the money unspent or wasted [11][12].'
  ]},
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
    ['2023','Bangladesh Digital Health Strategy 2023–2027 adopted',15],
    ['Apr 2026','Prime Minister announces e-health cards in five districts within the 180-day programme',3],
    ['Jun 2026','Health Minister tells Parliament: e-health cards for all citizens by 2028; health budget nearly doubles',2],
    ['18 Oct 2026','National health database, app-based appointments and medicine tracking unveiled',1],
    ['2027','Strategy target: electronic health records in all public facilities',15],
    ['2028','Target: every citizen holds an e-health card',2]
  ]},
  impact:[
    {who:'Patients and families',dir:'+',size:'High',text:'Records follow the patient between facilities, cutting repeat tests in a system where about 79% of costs are paid out of pocket [1][12].'},
    {who:'Public hospitals',dir:'±',size:'High',text:'Digital medicine tracking can curb leakage, but staff need devices, connectivity and training, and spending capacity is weak [1][11].'},
    {who:'Doctors and health workers',dir:'±',size:'Medium',text:'Better history at the point of care, more data entry; 100,000 health workers are to be recruited [2].'},
    {who:'Private providers',dir:'±',size:'Medium',text:'Value depends on whether private clinics and pharmacies are required to connect to the national database.'},
    {who:'Privacy and security',dir:'−',size:'High',text:'A national record for ~200 million people is a prime target; access rules under the 2025 data protection ordinance must come first [19][20].'},
    {who:'People without phones or IDs',dir:'−',size:'Medium',text:'App-based booking can exclude the poorest unless assisted channels remain [1].'}
  ],
  voices:[
    {who:'Prof Foara Tasmim, Additional Director General (Planning and Development), DGHS',group:'Government',stance:'support',view:'Said the cost rose because the pilot grew from one district to six, “not a higher budget for any single component”.',c:21},
    {who:'Dr M A Muhit, State Minister for Health and Family Welfare',group:'Government',stance:'support',view:'Unveiled a universal e-health card and a national database linking consultations, prescriptions, medicine purchases and tests.',c:1},
    {who:'Sardar Md Sakhawat Husain, Health and Family Welfare Minister',group:'Government',stance:'support',view:'Told Parliament the target is e-health cards for all citizens by 2028 through a technical assistance project.',c:2},
    {who:'Dr Imrul Mohammad Sifat, Bangladesh Health Watch and BRAC JPGSPH',group:'Expert',stance:'mixed',view:'The card should not be a “digital flash drive for medical records” but should guarantee cashless care for poor families.',c:13},
    {who:'Prof Shafiun Nahin Shimul, Institute of Health Economics, Dhaka University',group:'Expert',stance:'concern',view:'Warns the health ministry’s poor record of spending its development budget could limit gains from the bigger allocation.',c:11},
    {who:'Prof Syed Abdul Hamid, Institute of Health Economics, Dhaka University',group:'Expert',stance:'concern',view:'More money will not improve outcomes without tackling corruption, political interference and bureaucratic delays.',c:12},
    {who:'Pratik Ejaz, President, Bangladesh Health Reporters Forum',group:'Civil society',stance:'concern',view:'Administrative inefficiency means significant health funds go unspent each year; calls for better planning capacity.',c:12},
    {who:'Farjana Yesmin, researcher in trustworthy AI for healthcare',group:'Expert',stance:'mixed',view:'Build governance first: impact assessments and testing of any AI linked to the card on Bangladeshi patients, in Bangla.',c:14},
    {who:'Dr Jean Kaseya, Director-General, Africa CDC',group:'Development partner',stance:'support',view:'“Health sovereignty begins with owning, protecting and using our own data.”',c:18},
    {who:'Karin Smyth, UK health minister',group:'Government',stance:'support',view:'Says England’s single patient record will give patients “real control” over their care.',c:17}
  ],
  world:{title:'Similar programmes around the world',cols:['Country','Programme','Approach','Status and cost'],
    rows:[
      ['India','Ayushman Bharat Digital Mission (ABHA)','Health ID first, records linked to it','93 cr+ accounts, 104 cr records; Rs 1,600 cr over five years [4][16]'],
      ['United Kingdom (England)','NHS App and Single Patient Record','App on existing records; joined record by law','16.7 m monthly users; record in app by 2028 [5][17]'],
      ['Singapore','Enhanced HealthHub','Merge cluster apps into one national app','4 apps merged by Nov 2026 [7]'],
      ['Thailand','Mor Prom+','Super app replacing many ministry apps','50+ apps to be consolidated (announced 2025) [8]'],
      ['African Union','Continental Health Data Governance Framework','Common rules, federated cross-border sharing','Validated Oct 2026; AU process in 2027 [9]'],
      ['Bangladesh','e-Health Card and national health database','Card and database together','5 districts first; all citizens by 2028; budget not published [1][2][3]']
    ]},
  home:{title:'Inside Bangladesh: earlier and parallel efforts',cols:['Initiative','Lead','Period','What happened'],
    rows:[
      ['Shared Health Record pilot','DGHS, with Thoughtworks','2015–2016 onwards','OpenHIE/OpenMRS record piloted in Kaliganj and Gazipur [10]'],
      ['Bangladesh Digital Health Strategy','Ministry of Health and Family Welfare','2023–2027','Health ID, information exchange, EHRs in all public facilities by 2027 [15]'],
      ['e-Health Card, five districts','Government 180-day programme','Announced Apr 2026','Khulna, Noakhali, Bogura, Sirajganj, Narsingdi; project awaiting approval [3]; the revised plan adds Jhalakathi (Nov 2026) [21]'],
      ['e-Health Card for all','Ministry of Health and Family Welfare','Target 2028','Through a technical assistance project [2]'],
      ['National health database and app','Ministry of Health, with WHO','Unveiled Oct 2026','Links consultations, prescriptions, purchases and tests [1]']
    ]},
  watch:[
    'Approval of the revised six-district proposal (Tk 493.88 crore, part-financed by an ADB loan) by the Planning Commission and ECNEC [21].',
    'Whether the card is linked to cashless or insured care for poor families, as researchers propose [13].',
    'Whether private hospitals, diagnostic centres and pharmacies are required to connect.',
    'Rules on who can access records under the Personal Data Protection Ordinance 2025 [19].',
    'How much of the 2026–27 health development budget is actually spent by June 2027 [11].'
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
    ['DGHS Bangladesh: Shared Health Record','Thoughtworks','https://www.thoughtworks.com/en-gb/clients/dghs-bangladesh'],
    ['Health gets biggest boost (Budget 2026–27)','The Daily Star, 12 Jun 2026','https://www.thedailystar.net/business/bangladesh-budget-2026-27/news/health-gets-biggest-boost-4196891'],
    ['Experts call for strategic investment to cut out-of-pocket health spending','The Business Standard, 17 Jun 2026','https://www.tbsnews.net/bangladesh/health/experts-call-strategic-investment-cut-out-pocket-health-spending-1465851'],
    ['Bangladesh’s e-Health Card needs to move beyond data to delivery','The Business Standard, 10 Apr 2026','https://www.tbsnews.net/thoughts/bangladeshs-e-health-card-needs-move-beyond-data-delivery-1408186'],
    ['Bangladesh’s health budget just doubled, what happens next?','Prothom Alo, 16 Sep 2026','https://en.prothomalo.com/opinion/op-ed/74lo3d7wfl'],
    ['The Bangladesh Digital Health Strategy 2023–2027','Digital Watch Observatory','https://dig.watch/resource/the-bangladesh-digital-health-strategy-2023-2027'],
    ['Cabinet approves implementation of ABDM with budget of Rs 1,600 crore for five years','BioSpectrum India, 26 Feb 2022','https://www.biospectrumindia.com/news/22/20774/cabinet-approves-implementation-of-abdm-with-budget-of-rs-1600-cr-for-five-years.html'],
    ['NHS Modernisation Bill promises single patient record by 2028','Computer Weekly','https://www.computerweekly.com/news/366643138/NHS-Modernisation-Bill-promises-single-patient-record-by-2028'],
    ['AU member states validate African Continental Health Data Governance Framework','allAfrica, 23 Oct 2026','https://allafrica.com/stories/202610230017.html'],
    ['Personal Data Protection Ordinance 2025 (Ordinance No. 61 of 2025)','Digital Policy Alert','https://digitalpolicyalert.org/change/18756-personal-data-protection-ordinance-2025-ordinance-no-61-of-2025'],
    ['Moldova investigates possible foreign involvement in cyberattacks','The Record, Oct 2026','https://therecord.media/moldova-investigates-possible-foreign-involvement-cyberattacks'],
    ['Digital healthcare project cost nearly triples to Tk494cr as DGHS expands pilot to six districts','The Business Standard, 1 Nov 2026','https://www.tbsnews.net/bangladesh/health/digital-healthcare-project-cost-nearly-triples-tk494cr-dghs-expands-pilot-six'],
  ],
  related:['n21','n20']
}
];
window.DV_ANALYSES = ANALYSES;
