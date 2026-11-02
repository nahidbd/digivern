/* Digivern content file.
   The daily update edits this file only. Keep the structure: arrays of plain objects.
   NEWSORDER lists news ids newest first; UPDATED is the date shown on the site. */
(function(){
const UPDATED = '2 Nov 2026';
const THEMES = [
  {id:'egov',code:'EGOV',label:'E-governance & services',desc:'Online services, service design, GovTech, digital transformation of ministries and local government.'},
  {id:'dpi',code:'DPI',label:'Digital Public Infrastructure',desc:'Digital ID, payments, data exchange, civil and business registries, CRVS, digital public goods.'},
  {id:'pol',code:'POL',label:'Digital governance & policy',desc:'Data protection, interoperability, open data, digital rights, platform and telecom regulation, national strategies.'},
  {id:'ai',code:'AI',label:'Artificial intelligence',desc:'AI in the public sector, regulation and ethics, AI safety, national AI strategies.'},
  {id:'cyb',code:'CYB',label:'Cybersecurity',desc:'National cyber strategies and laws, critical infrastructure, incidents affecting public systems, capacity building.'},
  {id:'sec',code:'SECT',label:'Sector digitalisation',desc:'Fintech and digital payments, health tech, ed-tech, agritech, digital social protection and digital trade.'},
  {id:'grn',code:'GRN',label:'Green digitalisation',desc:'E-waste, energy use of data centres and AI, circular-economy policy, climate tech in government.'},
  {id:'enb',code:'ENB',label:'Enabling areas',desc:'Connectivity and inclusion, digital skills, technology procurement, emerging technologies.'}
];
const T = Object.fromEntries(THEMES.map(t => [t.id, t]));
/* Sectors tag every news item (field `sector`) so readers can follow fintech, health, education and other sectors across all themes. */
const SECTORS = ['Government','Fintech & payments','Health','Education','Agriculture','Social protection','Telecom','Trade & business','Energy & climate'];
const REGIONS = ['Africa','Americas','Asia-Pacific','Europe','Middle East','Global'];

const BU = 'Biometric Update';
const NEWS = [
  {id:'n19',theme:'dpi',region:'Africa',country:'',sector:'Fintech & payments',type:'Policy or law',trust:'media',sources:2,date:'2 Nov 2026',
   title:'West Africa makes mobile money interoperable through one instant payment system and doubles wallet limits',
   summary:'From 2 November 2026, new rules from the Central Bank of West African States (BCEAO) apply across the eight WAEMU countries. Instruction no. 020, signed on 8 October, requires interoperable person-to-person transfers to run through the BCEAO’s PI-SPI instant payment system, which already links more than 175 institutions and over 38 million users. Transfers are free up to CFAF 8,000 a day per user, with fees capped at 0.8% above that, and receiving money stays free. The maximum balance for an identified customer doubles from CFAF 2 million to CFAF 4 million, the monthly top-up ceiling rises from CFAF 10 million to CFAF 15 million, and issuers must keep 65% of customer funds in demand deposits, down from 75%.',
   why:'A regional central bank is using a public instant payment switch to end closed mobile money networks, one of the clearest cases of payments being run as digital public infrastructure.',
   links:[['The end of closed mobile money networks in West Africa','TechAfrica News','https://techafricanews.com/2026/10/26/89825/','media'],['BCEAO eases mobile money rules, gives operators more freedom to invest customer funds','Ecofin Agency','https://www.ecofinagency.com/news-finances/1210-59674-bceao-eases-mobile-money-rules-gives-operators-more-freedom-to-invest-customer-funds','media']]},
  {id:'n20',theme:'sec',region:'Africa',country:'',sector:'Health',type:'Policy or law',trust:'official',sources:2,date:'22 Oct 2026',
   title:'African Union member states validate the first continental framework for governing health data',
   summary:'Meeting in Addis Ababa, AU member states validated the African Continental Health Data Governance Framework, developed by Africa CDC with Transform Health through consultations since 2025. It sets common rules for lawful, secure and ethical use of health data and proposes a federated model, so countries can share data across borders for disease surveillance and care while keeping control of their national systems. It builds on the Malabo Convention, the AU Data Policy Framework and the Digital Transformation Strategy for Africa. Africa CDC will now finalise the text, which is expected to go through AU policy processes in 2027.',
   why:'Cross-border health data sharing in Africa has stalled on trust and sovereignty concerns; a shared framework gives ministries a common baseline for national health data laws.',
   links:[['AU member states validate African Continental Health Data Governance Framework','Africa CDC','https://africacdc.org/news-item/au-member-states-validate-african-continental-health-data-governance-framework/','official'],['AU member states validate African Continental Health Data Governance Framework','allAfrica','https://allafrica.com/stories/202610230017.html','media']]},
  {id:'n21',theme:'sec',region:'Asia-Pacific',country:'bangladesh',sector:'Health',type:'News',trust:'media',sources:1,date:'18 Oct 2026',
   title:'Bangladesh unveils a digital health push built on an e-health card and a national health database',
   summary:'At an event in Dhaka organised with the World Health Organization, State Minister for Health and Family Welfare Dr M A Muhit set out plans for a universal electronic health card and a national health database for nearly 200 million people. The database would link consultations, prescriptions, medicine purchases and test results. Plans also include app-based appointment booking, digital tracking of medicines supplied to public hospitals to curb illegal sales, and a national e-Hackathon. No budget or rollout timetable was announced.',
   why:'A shared health record linked to a national card would be the backbone for e-prescriptions and referrals; the missing timetable and budget will decide whether it moves beyond announcements.',
   links:[['From paper prescriptions to digital care: a new hope for Bangladesh','The Daily Star','https://www.thedailystar.net/health/news/paper-prescriptions-digital-care-new-hope-bangladesh-4306636','media']]},
  {id:'n22',theme:'ai',region:'Europe',country:'',sector:'Fintech & payments',type:'Guidance',trust:'official',sources:2,date:'19 Oct 2026',
   title:'UK financial regulator sets out good and poor practice for firms using AI, including agentic tools',
   summary:'The Financial Conduct Authority published examples of good practice and areas for improvement in how financial firms use machine learning, generative AI and agentic AI, drawn from its 2026 supervisory testing. It creates no new rules: existing rules, including the Consumer Duty and senior managers’ accountability, still apply. Good practice includes independent panels that challenge AI use cases and named senior owners for each one. Weak practice includes deploying AI before governance is in place and treating human review as a fix for flawed systems. The FCA also plans a framework for “agentic finance” covering agent identity and delegated authority.',
   why:'Regulators elsewhere are watching how the FCA supervises AI under existing law rather than new AI-specific rules; the approach offers a template for central banks and financial regulators in emerging markets.',
   links:[['AI in financial services: good practice and areas for improvement','Financial Conduct Authority','https://www.fca.org.uk/publications/good-poor-practice/ai-financial-services','official'],['FCA publishes AI good and poor practice for financial firms','The Paypers','https://thepaypers.com/regulations/news/fca-publishes-ai-good-and-poor-practice-for-financial-firms','media']]},
  {id:'n23',theme:'sec',region:'Americas',country:'',sector:'Education',type:'News',trust:'media',sources:1,date:'23 Oct 2026',
   title:'New York City lists 38 ed-tech products caught by its ban on student-facing AI in public schools',
   summary:'Chalkbeat obtained the list of 38 previously approved products whose generative AI features New York City public schools must switch off or drop under restrictions announced by Mayor Zohran Mamdani. It covers widely used reading and maths programmes, assessment tools and the education department’s own chatbot teaching assistant. The AI reading tutor Amira, used in more than 200 schools, was banned outright, and Google’s Gemini is being turned off for students. Some vendors dispute that their tools use generative AI; the department is reviewing products case by case, with a carve-out for tools that help English language learners.',
   why:'The largest US school system is showing how hard it is to regulate AI inside ed-tech procurement when vendors’ definitions of AI differ; education ministries face the same vetting problem.',
   links:[['NYC school AI ban: see 38 ed tech products officials say violate the policy','Chalkbeat','https://www.chalkbeat.org/newyork/2026/10/23/nyc-schools-ai-ban-list-38-education-technology-products/','media']]},
  {id:'n24',theme:'sec',region:'Asia-Pacific',country:'india',sector:'Education',type:'News',trust:'media',sources:1,date:'22–31 Oct 2026',
   title:'Himachal Pradesh puts every government school teacher on a digital profile with an AI skills baseline',
   summary:'India’s Himachal Pradesh signed an agreement on 22 October with Bharti Airtel Foundation to use its free Teacher App across government schools. On 31 October the Directorate of School Education told district officials to make sure all teachers and heads of schools register and complete a baseline survey of their digital and AI skills. The results will steer needs-based training, including AI Samarth Level 1 and 2 courses and an “AI Tools in Teaching” kit, in place of one-size-fits-all workshops.',
   why:'Mapping teachers’ digital skills before rolling out AI in classrooms is a step many education systems skip; a state-wide baseline lets training budgets follow actual gaps.',
   links:[['Himachal Pradesh puts every government school teacher on The Teacher App','Elets digitalLEARNING','https://digitallearning.eletsonline.com/2026/11/himachal-pradesh-the-teacher-app-bharti-airtel-foundation-teacher-digital-profiles-ai-training','media']]},
  {id:'n15',theme:'cyb',region:'Europe',country:'',sector:'Government',type:'News',trust:'media',sources:2,date:'27–29 Oct 2026',
   title:'Moldova takes 82 e-services offline after attackers extract data linked to 750,000 ID numbers',
   summary:'Moldova’s Electronic Governance Agency (AGE) said attackers exploited government e-services that needed no login between 19 and 23 October, querying about one million personal identification numbers (IDNPs) and extracting data linked to about 750,000 of them. Exposed fields include family links, health insurance status, benefits and pensions, driving licences, photographs, bank account numbers (IBANs) and tax debts; bank card data and state registers were not affected. As a precaution, 82 public services and more than 30 information systems were disconnected. Prime Minister Vasile Tofan said foreign state involvement is being examined, and AGE director Nicoleta Colomeeț is stepping down, with Artiom Cociu leading the agency on an interim basis.',
   why:'Unauthenticated services that query interconnected registries can turn a data exchange layer into a single point of mass exposure; it is a warning for every country building once-only services.',
   links:[['Moldova investigates possible foreign involvement in cyberattacks','The Record','https://therecord.media/moldova-investigates-possible-foreign-involvement-cyberattacks','media'],['Moldova e-government chief resigns after hack exposed data tied to 750,000 ID numbers','ID Tech','https://idtechwire.com/moldova-e-government-chief-resigns-after-hack-exposed-data-tied-to-750000-id-numbers/','media']]},
  {id:'n16',theme:'cyb',region:'Europe',country:'',sector:'Government',type:'News',trust:'media',sources:2,date:'28–29 Oct 2026',
   title:'Cyberattack takes Belgium’s MyMinfin tax portal offline; filing deadline moved to 16 November',
   summary:'Belgium’s Federal Public Service Finance took MyMinfin, Tax-on-web and Biztax offline as a precaution after intruders entered its systems overnight on 27–28 October and tried to alter parts of its digital environment. The ministry says the intrusion was contained within hours and that no data was leaked. Returns due on 31 October can now be filed until 16 November 2026. Federal police and the Centre for Cybersecurity Belgium are investigating.',
   why:'When a single tax portal goes down days before a deadline, the whole filing calendar moves; resilience and recovery planning matter as much as prevention for core e-services.',
   links:[['Cyberattack disrupts Belgian tax services before deadline','The Record','https://therecord.media/cyberattack-disrupts-belgian-tax-services-before-deadline','media'],['No data leaked in Finance Ministry cyberattack, services still down','The Brussels Times','https://brusselstimes.com/2383490/no-data-leaked-in-finance-ministry-cyberattack-services-still-down','media']]},
  {id:'n17',theme:'dpi',region:'Europe',country:'',sector:'Government',type:'Policy or law',trust:'media',sources:1,date:'27 Oct 2026',
   title:'Türkiye plans a digital ID wallet prototype in 2027 and sets e-Devlet growth targets',
   summary:'Türkiye’s 2027 Presidential Annual Program, published in the Official Gazette on 27 October, plans a national digital ID wallet prototype in 2027, led by the Cybersecurity Presidency with the Ministry of Interior. It would first hold basic identity documents and diplomas, piloted with a university and prioritising public employees. The programme targets at least 71 million e-Devlet users and about 10,000 services in 2027. Separately, from 1 November social media platforms may not open accounts for children under 15, with ages checked through an e-Devlet age token.',
   why:'Türkiye is pairing a mature e-government portal with a wallet and privacy-preserving age checks, a combination many countries outside the EU are now weighing.',
   links:[['Türkiye plans digital ID wallet pilot for 2027 as age verification expands',BU,'https://www.biometricupdate.com/202610/turkiye-plans-digital-id-wallet-pilot-for-2027-as-age-verification-expands','media']]},
  {id:'n18',theme:'pol',region:'Americas',country:'brazil',sector:'Telecom',type:'Policy or law',trust:'media',sources:1,date:'28 Oct 2026',
   title:'Brazil’s telecom regulator makes face biometrics mandatory to activate and keep mobile lines',
   summary:'Anatel issued Technical Norm GT-SEG.2026.11, drafted by a fraud and scams subgroup, requiring all mobile operators, including MVNOs, to verify individual customers with a face check and liveness detection at ISO/IEC 30107-3 level 2 or higher. Deadlines are 30 September 2027 for new prepaid lines, 31 December 2027 for postpaid activations, portability and SIM swaps, and 31 December 2028 for existing customers. From January 2029, unvalidated lines face a 120-day suspension, with emergency calls preserved, and then cancellation.',
   why:'It ties the right to a phone line to biometric verification for millions of people, raising inclusion and data protection questions that other regulators fighting SIM fraud will face too.',
   links:[['Brazil’s Anatel makes facial biometric checks mandatory for mobile lines','ID Tech','https://idtechwire.com/brazils-anatel-makes-facial-biometric-checks-mandatory-for-mobile-lines/','media']]},
  {id:'n1',theme:'ai',region:'Europe',country:'',sector:'Government',type:'Policy or law',trust:'official',sources:2,date:'27 Jul 2026 · deadline 2 Dec 2026',
   title:'EU delays high-risk AI Act rules; two new bans apply from 2 December',
   summary:'The EU’s "Digital Omnibus on AI" (Regulation 2026/1744) entered into force on 27 July 2026. It moves the AI Act’s high-risk obligations for Annex III uses, such as employment, credit, education and biometrics, from August 2026 to 2 December 2027. Obligations for AI in regulated products move to 2 August 2028. Two new prohibitions, on non-consensual intimate deepfakes and child sexual abuse material, apply from 2 December 2026.',
   why:'Public bodies that deploy AI in the EU, and suppliers selling to them, get more time for high-risk compliance, but the transparency and new prohibition deadlines this December still stand.',
   links:[['AI Act: obligations in force and delays under omnibus 2026/1744','ActuIA','https://www.actuia.com/en/news/ai-act-obligations-in-force-and-delays-under-omnibus-2026-1744/','media'],['EU AI Act Omnibus Agreement: postponed high-risk deadlines','Gibson Dunn','https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/','expert']]},
  {id:'n2',theme:'dpi',region:'Africa',country:'',sector:'Government',type:'Report',trust:'expert',sources:1,date:'13 Oct 2026',
   title:'CIPESA report warns DPI is reshaping state–citizen relations in 11 African countries',
   summary:'The State of Internet Freedom in Africa 2026 report by CIPESA, launched at FIFAfrica26 in Mauritius, reviews digital public infrastructure in Egypt, Ethiopia, Ghana, Kenya, Nigeria, Senegal, South Africa, Tunisia, Uganda, Zambia and Zimbabwe. It finds that design flaws, technical failures and inaccurate records in foundational ID and mandatory digital gateways often exclude vulnerable groups.',
   why:'It adds African evidence to the case for rights-respecting DPI safeguards before systems become entrenched, a priority for donors funding ID and registry programmes.',
   links:[['Digital public infrastructure reshaping state-citizen relations in Africa, report warns',BU,'https://www.biometricupdate.com/202610/digital-public-infrastructure-reshaping-state-citizen-relations-in-africa-report-warns','media']]},
  {id:'n3',theme:'dpi',region:'Africa',country:'rwanda',sector:'Government',type:'News',trust:'media',sources:1,date:'12 Oct 2026',
   title:'Rwanda approves $19m more World Bank financing for digital ID and CRVS',
   summary:'Rwandan lawmakers ratified about US$19 million in additional IDA financing for the Rwanda Digital Acceleration Project. The State Minister reported the digital ID rollout as 76% complete and CRVS digitisation as 89% complete; the National Identification Agency reported about 13.7 million people biometrically enrolled as of 4 October. The project’s closing date moves to June 2028.',
   why:'Rwanda is one of the few countries building a single digital ID together with digitised civil registration, a model many governments are watching.',
   links:[['New World Bank funding to support Rwanda’s digital ID rollout, CRVS digitization',BU,'https://www.biometricupdate.com/202610/new-world-bank-funding-to-support-rwandas-digital-id-rollout-crvs-digitization','media']]},
  {id:'n4',theme:'dpi',region:'Asia-Pacific',country:'pakistan',sector:'Government',type:'News',trust:'media',sources:1,date:'29 Oct 2026',
   title:'Pakistan selects 10 public services for digital delivery under World Bank-backed DEEP',
   summary:'Pakistan’s US$78 million Digital Economy Enhancement Project, overseen by NITB and NADRA, has chosen 10 priority services for digital delivery and linked single sign-on to the National Data Exchange Layer. NADRA’s PakID Vault in the Pak App now holds six official documents, including the CNIC.',
   why:'It shows a country joining digital ID, a data exchange layer and service delivery in one programme, the core DPI pattern.',
   links:[['Pakistan advances digital ID infrastructure, selects 10 services for DEEP rollout',BU,'https://www.biometricupdate.com/202610/pakistan-advances-digital-id-infrastructure-selects-10-services-for-deep-rollout','media']]},
  {id:'n5',theme:'pol',region:'Asia-Pacific',country:'india',sector:'Government',type:'Policy or law',trust:'official',sources:1,date:'Takes effect 13 Nov 2026',
   title:'India’s Consent Manager rules under the DPDP framework take effect on 13 November',
   summary:'Under the Digital Personal Data Protection Rules notified on 13 November 2025, Rule 4 on registering and running Consent Managers takes effect on 13 November 2026. The main obligations on data fiduciaries, including consent, notices, security safeguards and breach notification, follow on 13 May 2027.',
   why:'Consent Managers are India’s answer to user-controlled data sharing and a reference point for other countries designing consent layers.',
   links:[['DPDP Act and Rules 2025: the 2026 compliance milestones','Mondaq','https://www.mondaq.com/dpdp-act-and-rules-2025-the-2026-compliance-milestones-businesses-cant-afford-to-miss/1830402','media']]},
  {id:'n6',theme:'ai',region:'Americas',country:'',sector:'Government',type:'Policy or law',trust:'expert',sources:1,date:'20 Oct 2026',
   title:'Panama sets out a 10-year national AI strategy built on five pillars',
   summary:'Panama’s National Artificial Intelligence Strategy, announced in July and developed by SENACYT with Georgia Tech, rests on five pillars: governance and regulation, talent and institutional capacity, data and infrastructure, ethics and inclusion, and international cooperation. Its design drew on a national survey with more than 6,700 respondents.',
   why:'A structured, consultative strategy from a smaller economy is a useful template for countries drafting their first AI strategy.',
   links:[['Georgia Tech partners with Panama to chart national AI strategy','Georgia Tech Research','https://news.research.gatech.edu/2026/10/20/georgia-tech-partners-panama-chart-national-ai-strategy','expert']]},
  {id:'n7',theme:'cyb',region:'Global',country:'',sector:'Government',type:'Report',trust:'media',sources:1,date:'22 Oct 2026',
   title:'Intrusion attempts on state and local government networks up 242%, vendor data shows',
   summary:'SonicWall data for the first half of 2026 shows a 242% year-on-year rise in intrusion attempts against state and local government networks, with web application attacks making up 85.1% of the activity. Malware detections rose 8.6%, while ransomware activity fell 74%. SonicWall links the rise to outdated technology, limited staff and patchy software updates.',
   why:'Local governments run many citizen-facing services on ageing systems; the figures support funding for patching and staffing, not only new systems.',
   links:[['State and local government cyberattacks rose 242 percent in first half of 2026','Security Today','https://securitytoday.com/articles/2026/10/22/research-state-and-local-government-cyberattacks-rose-242-percent-in-first-half-of-2026.aspx','media']]},
  {id:'n8',theme:'ai',region:'Europe',country:'',sector:'Government',type:'News',trust:'media',sources:1,date:'28 Oct 2026',
   title:'UK Budget funds a £40m unit to detect AI systems that slip their controls',
   summary:'The UK Budget of 28 October 2026 includes £40 million for a National Agentic Security Unit to detect and respond to AI systems that go beyond their intended controls, and £24 million for cyber defence in hospitals, schools and councils, according to reports citing City AM.',
   why:'It is one of the first government units aimed specifically at agentic AI risk, alongside new money for public-sector cyber defence.',
   links:[['Budget 2026 funds £40m unit to monitor rogue AI agents','Resultsense','https://www.resultsense.com/news/2026-10-29-budget-national-agentic-security-unit/','media']]},
  {id:'n9',theme:'dpi',region:'Europe',country:'',sector:'Government',type:'Policy or law',trust:'media',sources:1,date:'29 Oct 2026',
   title:'Italy’s privacy regulator approves the national plan for its EU digital identity wallet',
   summary:'Italy’s data protection authority, the Garante, approved the technical and architectural plan for the IT-Wallet, Italy’s implementation of the EU Digital Identity Wallet, without requesting changes. It set conditions on handling data subject rights, safeguards for biometric data and demonstrable risk management.',
   why:'EU wallets must launch soon; Italy’s review shows what regulators expect from wallet architectures.',
   links:[['Italian data protection regulator approves national digital ID wallet plan',BU,'https://www.biometricupdate.com/202610/italian-data-protection-regulator-approves-national-digital-id-wallet-plan','media']]},
  {id:'n10',theme:'sec',region:'Asia-Pacific',country:'india',sector:'Agriculture',type:'News',trust:'media',sources:1,date:'26 Oct 2026',
   title:'India issues 110 million Farmer IDs under its Digital Agriculture Mission',
   summary:'India has created 11 crore (110 million) unique Farmer IDs under the Digital Agriculture Mission of the Ministry of Agriculture and Farmers’ Welfare, five months ahead of its 31 March 2027 deadline.',
   why:'Farmer registries are becoming the base layer for subsidies, credit and advisory services in agriculture-heavy economies.',
   links:[['Farmer ID: 11 crore digital IDs under Digital Agriculture Mission','NEXT IAS','https://www.nextias.com/ca/current-affairs/26-10-2026/farmer-id-digital-agriculture-mission','media']]},
  {id:'n11',theme:'sec',region:'Africa',country:'',sector:'Agriculture',type:'News',trust:'media',sources:1,date:'30 Aug 2026',
   title:'Lesotho launches a national farmer registry built on a GovStack specification',
   summary:'Lesotho’s Ministry of Agriculture, Food Security and Nutrition launched the Lesotho Farmers Portal, its first national registry combining farmer and land data. Farmers are registered against their national ID number and land parcels with GPS boundaries, using the GovStack Registration Building Block specification with support from ITU and WFP.',
   why:'A practical example of reusable DPI building blocks applied in a small country’s agriculture sector.',
   links:[['Lesotho launches National Farmers Portal','PR Newswire','https://www.prnewswire.com/news-releases/lesotho-launches-national-farmers-portal-giving-every-farmer-a-place-in-a-single-digital-registry-302864372.html','media']]},
  {id:'n12',theme:'dpi',region:'Africa',country:'',sector:'Government',type:'News',trust:'media',sources:1,date:'14 Oct 2026',
   title:'Benin moves biometric ID card renewals online',
   summary:'Benin’s identification agency ANIP now lets citizens apply for and track renewals of the national biometric ID card online, around the clock. Applications are still validated manually and cards are usually collected in person. Enrolment reportedly covers nearly 99% of the population.',
   why:'Moving ID services online is a common next step once enrolment is near-universal.',
   links:[['Benin moves biometric national ID card renewals online',BU,'https://www.biometricupdate.com/202610/benin-moves-biometric-national-id-card-renewals-online','media']]},
  {id:'n13',theme:'egov',region:'Asia-Pacific',country:'india',sector:'Government',type:'News',trust:'expert',sources:1,date:'28 Oct 2026',
   title:'Digital Citizen Summit in Hyderabad debates making India’s DPI more accountable',
   summary:'IIIT Hyderabad hosted the Digital Citizen Summit regional dialogue on digital public infrastructure for governance, organised with the Digital Empowerment Foundation and Code for Good Tech. Participants discussed how to make DPI such as Aadhaar, UPI and DigiLocker more inclusive, accountable and accessible.',
   why:'Civil society scrutiny of India’s DPI matters globally because the model is being promoted abroad.',
   links:[['IIIT Hyderabad hosts Digital Citizen Summit','IIIT Hyderabad','https://www.iiit.ac.in/iiit-hyderabad-hosts-digital-citizen-summit/','expert']]},
  {id:'n14',theme:'sec',region:'Asia-Pacific',country:'',sector:'Health',type:'News',trust:'official',sources:1,date:'15 May 2026',
   title:'Cambodia rolls out a national health information system on DHIS2',
   summary:'Cambodia’s Ministry of Health launched a new electronic Health Management Information System on the DHIS2 platform, to be rolled out in all 25 provinces with support from WHO, UNICEF, CHAI and Gavi.',
   why:'DHIS2, a digital public good, is the backbone of health data in many lower-income countries.',
   links:[['Cambodia launches digital health information system','WHO Cambodia','https://www.who.int/cambodia/news/detail/15-05-2026-cambodia-launches-digital-health-information-system-to-strengthen-decision-making-nationwide','official']]}
];
const TRUST = {official:['Official','b-official'],expert:['Expert','b-expert'],media:['Media','b-media']};

const REPORTS = [
  {id:'r1',kind:'Weekly Global Brief',freq:'Weekly',access:'free',status:'live',title:'Weekly Global Brief: 2 – 8 Nov 2026',theme:'egov'},
  {id:'r7',kind:'Explainer',freq:'Ongoing',access:'free',status:'live',title:'What is digital public infrastructure? A plain-language guide',theme:'dpi'},
  {id:'r2',kind:'Thematic deep-dive',freq:'Monthly',access:'premium',status:'soon',title:'Regulating AI in public services after the EU Digital Omnibus',theme:'ai'},
  {id:'r3',kind:'Thematic deep-dive',freq:'Monthly',access:'premium',status:'soon',title:'Safeguards in digital ID systems: what the evidence shows',theme:'dpi'},
  {id:'r4',kind:'Regional report',freq:'Quarterly',access:'premium',status:'soon',title:'Asia-Pacific digital governance review',theme:'pol'},
  {id:'r5',kind:'Regional report',freq:'Quarterly',access:'premium',status:'soon',title:'Africa digital governance review',theme:'pol'},
  {id:'r6',kind:'Annual outlook',freq:'Annual',access:'premium',status:'soon',title:'State of Digital Governance 2027',theme:'egov'},
  {id:'r8',kind:'Thematic deep-dive',freq:'Monthly',access:'premium',status:'soon',title:'Cyber resilience of local government systems',theme:'cyb'}
];

/* country profiles: [label, value, status] ; status: op = operational, part = partial/in rollout, law = law in force, ver = to verify */
const UN_EGOV = ['UN E-Government Knowledgebase','https://publicadministration.un.org/egovkb/en-us/Data-Center'];
const PROFILES = {
  bangladesh:{agency:'ICT Division and a2i (Aspire to Innovate)',strategy:'[To verify: current national digital strategy]',egdi:'100 of 193 · 0.657 · 2024',
    rows:[['Digital identity','National ID (NID), Bangladesh Election Commission','op'],['Digital payments','Binimoy interoperable payment platform, Bangladesh Bank; mobile financial services','part'],['Civil registration (CRVS)','Birth and Death Registration Information System, Office of the Registrar General','op'],['Business registry','Registrar of Joint Stock Companies and Firms (RJSC)','op'],['Data protection','Personal Data Protection Ordinance 2025 (No. 61), issued 6 Nov 2025','law'],['Cybersecurity','Cyber Security Ordinance 2025','ver'],['NGO registration','NGO Affairs Bureau','op']],
    sources:[['Bangladesh country data, UN E-Government Knowledgebase','https://publicadministration.un.org/egovkb/en-us/Data/Country-Information/id/14-Bangladesh'],['Personal Data Protection Ordinance 2025 (Ordinance No. 61 of 2025)','https://digitalpolicyalert.org/change/18756-personal-data-protection-ordinance-2025-ordinance-no-61-of-2025']]},
  india:{agency:'Ministry of Electronics and Information Technology (MeitY)',strategy:'Digital India',egdi:'97 of 193 · 0.668 · 2024',
    rows:[['Digital identity','Aadhaar, Unique Identification Authority of India (UIDAI)','op'],['Digital payments','Unified Payments Interface (UPI), National Payments Corporation of India','op'],['Document wallet','DigiLocker','op'],['Data protection','Digital Personal Data Protection Act 2023; Rules notified 13 Nov 2025, phased to 13 May 2027','part'],['Agriculture registry','Farmer IDs under the Digital Agriculture Mission: 110 million issued (Oct 2026)','part'],['AI governance','[To verify: current AI policy instruments]','ver']],
    sources:[['DPDP Act and Rules 2025 milestones (Mondaq)','https://www.mondaq.com/dpdp-act-and-rules-2025-the-2026-compliance-milestones-businesses-cant-afford-to-miss/1830402'],['Farmer ID: 11 crore digital IDs (NEXT IAS)','https://www.nextias.com/ca/current-affairs/26-10-2026/farmer-id-digital-agriculture-mission'],UN_EGOV]},
  rwanda:{agency:'Ministry of ICT and Innovation (MINICT)',strategy:'Rwanda Digital Acceleration Project (World Bank / AIIB), to June 2028',egdi:'[To verify: 2024 rank]',
    rows:[['Digital identity','Single digital ID, National Identification Agency (NIDA): rollout 76% complete, ~13.7 million enrolled (Oct 2026)','part'],['Civil registration (CRVS)','CRVS digitisation 89% complete (Oct 2026)','part'],['Online services','258 public services introduced or upgraded online','op'],['Data exchange','Government Data Hub: procurement restarted','part'],['Data protection','Law No. 058/2021 on the protection of personal data and privacy','law']],
    sources:[['New World Bank funding to support Rwanda’s digital ID rollout (Biometric Update)','https://www.biometricupdate.com/202610/new-world-bank-funding-to-support-rwandas-digital-id-rollout-crvs-digitization']]},
  pakistan:{agency:'National Information Technology Board (NITB) and NADRA',strategy:'Digital Economy Enhancement Project (DEEP), US$78m, World Bank',egdi:'[To verify: 2024 rank]',
    rows:[['Digital identity','CNIC, National Database and Registration Authority (NADRA); PakID Vault in the Pak App','op'],['Data exchange','National Data Exchange Layer (NDEL), linked to single sign-on','part'],['Digital payments','Raast instant payment system, State Bank of Pakistan','op'],['Online services','10 priority services selected for digital delivery (Oct 2026)','part'],['Data protection','[To verify: status of personal data protection bill]','ver']],
    sources:[['Pakistan advances digital ID infrastructure (Biometric Update)','https://www.biometricupdate.com/202610/pakistan-advances-digital-id-infrastructure-selects-10-services-for-deep-rollout']]},
  estonia:{agency:'[To verify: ministry responsible for digital affairs]',strategy:'[To verify: current digital agenda]',egdi:'2 of 193 · 0.973 · 2024',
    rows:[['Digital identity','National eID: ID card, Mobile-ID and Smart-ID','op'],['Data exchange','X-Road data exchange layer','op'],['Digital payments','Part of the EU single euro payments area','op'],['Data protection','EU GDPR, with national Personal Data Protection Act','law'],['AI governance','EU AI Act applies','law']],
    sources:[UN_EGOV,['EU AI Act, Regulation (EU) 2024/1689','https://eur-lex.europa.eu/eli/reg/2024/1689/oj']]},
  brazil:{agency:'Ministry of Management and Innovation in Public Services (MGI)',strategy:'[To verify: current digital government strategy]',egdi:'50 of 193 · 0.840 · 2024',
    rows:[['Digital identity','gov.br single sign-on; CPF taxpayer number; new national ID card (CIN)','op'],['Digital payments','Pix instant payments, Banco Central do Brasil','op'],['Data protection','General Data Protection Law (LGPD, Law 13.709/2018); authority: ANPD','law'],['Online services','gov.br services portal','op']],
    sources:[UN_EGOV,['LGPD, Law 13.709/2018 (Planalto)','https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm']]}
};
const COUNTRIES = [
  ['bangladesh','Bangladesh','Asia-Pacific'],['india','India','Asia-Pacific'],['pakistan','Pakistan','Asia-Pacific'],['rwanda','Rwanda','Africa'],['estonia','Estonia','Europe'],['brazil','Brazil','Americas'],
  ['indonesia','Indonesia','Asia-Pacific'],['philippines','Philippines','Asia-Pacific'],['singapore','Singapore','Asia-Pacific'],
  ['kenya','Kenya','Africa'],['nigeria','Nigeria','Africa'],['south-africa','South Africa','Africa'],['ethiopia','Ethiopia','Africa'],['benin','Benin','Africa'],
  ['mexico','Mexico','Americas'],['colombia','Colombia','Americas'],['panama','Panama','Americas'],
  ['ukraine','Ukraine','Europe'],['italy','Italy','Europe'],['jordan','Jordan','Middle East'],['uae','United Arab Emirates','Middle East']
].map(([id,name,region]) => ({id,name,region,ready:!!PROFILES[id]}));

const LAWS = [
  {where:'European Union',name:'Artificial Intelligence Act (Regulation (EU) 2024/1689)',cat:'ai',year:'2024',status:'In force · phased; high-risk from Dec 2027',url:'https://eur-lex.europa.eu/eli/reg/2024/1689/oj'},
  {where:'European Union',name:'Digital Omnibus on AI (Regulation (EU) 2026/1744), amending the AI Act',cat:'ai',year:'2026',status:'In force since 27 Jul 2026',url:'https://www.actuia.com/en/news/ai-act-obligations-in-force-and-delays-under-omnibus-2026-1744/'},
  {where:'Council of Europe',name:'Framework Convention on Artificial Intelligence',cat:'ai',year:'2024',status:'Open for signature',url:'https://www.coe.int/en/web/artificial-intelligence/the-framework-convention-on-artificial-intelligence'},
  {where:'OECD',name:'Recommendation on Artificial Intelligence (OECD AI Principles)',cat:'ai',year:'2019',status:'Adopted',url:'https://oecd.ai/en/ai-principles'},
  {where:'UNESCO',name:'Recommendation on the Ethics of Artificial Intelligence',cat:'ai',year:'2021',status:'Adopted',url:'https://www.unesco.org/en/artificial-intelligence/recommendation-ethics'},
  {where:'Panama',name:'National Artificial Intelligence Strategy (10-year road map)',cat:'ai',year:'2026',status:'Adopted',url:'https://news.research.gatech.edu/2026/10/20/georgia-tech-partners-panama-chart-national-ai-strategy'},
  {where:'European Union',name:'General Data Protection Regulation (GDPR)',cat:'dp',year:'2016',status:'In force',url:'https://eur-lex.europa.eu/eli/reg/2016/679/oj'},
  {where:'Bangladesh',name:'Personal Data Protection Ordinance 2025 (No. 61)',cat:'dp',year:'2025',status:'In force since 6 Nov 2025',url:'https://digitalpolicyalert.org/change/18756-personal-data-protection-ordinance-2025-ordinance-no-61-of-2025'},
  {where:'Brazil',name:'General Data Protection Law (LGPD, Law 13.709/2018)',cat:'dp',year:'2018',status:'In force',url:'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm'},
  {where:'China',name:'Personal Information Protection Law',cat:'dp',year:'2021',status:'In force',url:''},
  {where:'India',name:'Digital Personal Data Protection Act 2023 and DPDP Rules 2025',cat:'dp',year:'2023',status:'In force · phased to May 2027',url:'https://www.mondaq.com/dpdp-act-and-rules-2025-the-2026-compliance-milestones-businesses-cant-afford-to-miss/1830402'},
  {where:'Kenya',name:'Data Protection Act',cat:'dp',year:'2019',status:'In force',url:'https://www.odpc.go.ke/'},
  {where:'Nigeria',name:'Nigeria Data Protection Act',cat:'dp',year:'2023',status:'In force',url:'https://ndpc.gov.ng/'},
  {where:'Rwanda',name:'Law No. 058/2021 on the Protection of Personal Data and Privacy',cat:'dp',year:'2021',status:'In force',url:''},
  {where:'South Africa',name:'Protection of Personal Information Act (POPIA)',cat:'dp',year:'2013',status:'In force',url:'https://inforegulator.org.za/'},
  {where:'European Union',name:'NIS2 Directive (EU) 2022/2555',cat:'cyb',year:'2022',status:'In force',url:'https://eur-lex.europa.eu/eli/dir/2022/2555/oj'},
  {where:'Singapore',name:'Cybersecurity Act 2018',cat:'cyb',year:'2018',status:'In force',url:'https://sso.agc.gov.sg/Act/CA2018'},
  {where:'G20',name:'Framework for Systems of Digital Public Infrastructure',cat:'dpi',year:'2023',status:'Adopted · voluntary',url:''},
  {where:'European Union',name:'European Digital Identity framework (EUDI Wallet)',cat:'dpi',year:'2024',status:'In force · wallets rolling out',url:''}
];
const LAWCATS = {all:'All categories',dp:'Data protection',ai:'AI',cyb:'Cybersecurity',dpi:'DPI & strategy'};



const GLOSSARY = [
  ['Digital public infrastructure (DPI)','Shared, society-wide digital systems such as identity, payments and data exchange that public and private services can build on. They are usually governed to be interoperable, inclusive and safe.'],
  ['Digital public goods (DPGs)','Open-source software, open data, open AI models, open standards and open content that follow privacy and other laws and are designed to do no harm.'],
  ['Foundational ID','A general-purpose identity system, usually national, that registers the whole population and can be used across many services.'],
  ['Functional ID','An identity credential issued for one purpose or sector, such as a voter card, tax number or health insurance card.'],
  ['CRVS','Civil registration and vital statistics: the continuous recording of births, deaths, marriages and other life events, and the statistics produced from those records.'],
  ['Data exchange layer','Technology and rules that let separate government databases share data securely through standard interfaces instead of point-to-point connections.'],
  ['Interoperability','The ability of different systems and organisations to exchange information and use it, covering technical, semantic, organisational and legal aspects.'],
  ['Consent management','Processes and tools that record what a person agreed to share, with whom and for what purpose, and let them review or withdraw that agreement.'],
  ['G2P payments','Government-to-person payments, such as wages, pensions and social transfers, increasingly made into accounts or mobile wallets.'],
  ['Once-only principle','Citizens and businesses provide a piece of information to government only once; agencies then reuse it, with safeguards, instead of asking again.'],
  ['AI impact assessment','A structured review before deploying an AI system that examines its purpose, risks to people, data use and the controls needed.'],
  ['Agentic AI','AI systems that can plan and take actions across tools or services with limited human input, rather than only answering questions.'],
  ['Zero trust','A security approach where no user or device is trusted by default, even inside the network; every request is verified.'],
  ['Open data','Data that anyone can access, use and share, published in machine-readable formats under an open licence.'],
  ['Digital sovereignty','A state’s ability to make independent decisions about its digital infrastructure, data and technology suppliers.'],
  ['E-waste','Discarded electrical and electronic equipment. It contains valuable materials and hazardous substances, so it needs safe collection and recycling.']
];

const SOURCES = {
  'Tier 1 · Official':['UN DESA','UNDP','ITU','UNICEF','WHO (digital health)','FAO (digital agriculture)','UNESCO (education technology)','Central banks and financial regulators','Bank for International Settlements','Africa CDC','UNEP','World Bank (incl. ID4D)','Asian Development Bank','African Development Bank','Inter-American Development Bank','OECD','European Commission and EUR-Lex','Council of Europe','National digital agencies and regulators','Official gazettes and legislation portals'],
  'Tier 2 · Expert':['Co-Develop','Digital Public Goods Alliance','CIPESA','Center for Global Development','Observer Research Foundation','LIRNEasia','Ada Lovelace Institute','Stanford HAI (AI Index)','Partnership on AI','Global Forum on Cyber Expertise','CyberPeace Institute','Digital Square (PATH)','CGIAR','StEP Initiative','GSMA (incl. mobile money)','CGAP','Alliance for Financial Inclusion','Better Than Cash Alliance','Transform Health','Open Government Partnership','Access Now','ID4Africa','University research centres'],
  'Tier 3 · Media':['Reuters','Associated Press','AFP','BBC News','The Guardian','Financial Times','The Economist','Bloomberg','Nikkei Asia','Al Jazeera','Rest of World','Devex','The Hindu','The Daily Star (Bangladesh)','Dawn','Nation (Kenya)','TechCabal','Biometric Update','The Record','Specialist GovTech, fintech, health tech, ed-tech, AI and cybersecurity trade press','Law firm and policy briefings']
};

const SAMPLE_QS = [
  'What changed in the EU AI Act timeline this year?',
  'Which DPI programmes did the World Bank support recently?',
  'What risks does the CIPESA report find in African digital ID systems?'
];
const ANSWERS = {
  0:{p:['The Digital Omnibus on AI (Regulation 2026/1744) entered into force on 27 July 2026. It moves high-risk obligations for Annex III uses to 2 December 2027 and for AI in regulated products to 2 August 2028.','Two new prohibitions, on non-consensual intimate deepfakes and child sexual abuse material, apply from 2 December 2026.'],src:['n1']},
  1:{p:['Rwanda ratified about US$19 million in additional IDA financing for its Digital Acceleration Project, covering digital ID and CRVS digitisation.','Pakistan’s US$78 million Digital Economy Enhancement Project links digital ID, a data exchange layer and 10 priority online services.'],src:['n3','n4']},
  2:{p:['The State of Internet Freedom in Africa 2026 report covers 11 countries. It finds that design flaws, technical failures and inaccurate records in foundational ID and mandatory digital gateways often exclude vulnerable groups.','It calls for rights-respecting frameworks before DPI becomes further entrenched.'],src:['n2']}
};

const NEWSORDER = ['n19','n15','n16','n17','n18','n24','n23','n20','n22','n21','n1','n3','n2','n4','n9','n8','n10','n6','n7','n12','n13','n5','n11','n14'];
/* Weekly Global Brief (report r1): top = five lead item ids, also = other item ids. Refresh every Monday. */
const BRIEF = {top:['n15','n16','n17','n18','n4'], also:['n1','n9','n8','n10','n5']};
/* Voices: approved contributor writeups, newest first. Only added when the Editor-in-Chief approves a submission.
   Shape: {id:'w1', title, theme, date:'D Mon YYYY', summary, body:[paragraphs; '## ' starts a subheading], author:{name, role, org, country, bio, link, photo}} */
const WRITEUPS = [];
window.DV = {WRITEUPS, BRIEF, UPDATED, THEMES, T, SECTORS, REGIONS, NEWS, TRUST, REPORTS, PROFILES, COUNTRIES, LAWS, LAWCATS, GLOSSARY, SOURCES, SAMPLE_QS, ANSWERS, NEWSORDER};
})();
