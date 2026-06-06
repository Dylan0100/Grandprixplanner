import { useState, useEffect, useRef } from 'react'

const VC_PASSPORTS = [
  { id:'uk', label:'United Kingdom',  flag:'🇬🇧' },
  { id:'us', label:'United States',   flag:'🇺🇸' },
  { id:'ca', label:'Canada',          flag:'🇨🇦' },
  { id:'au', label:'Australia',       flag:'🇦🇺' },
  { id:'nz', label:'New Zealand',     flag:'🇳🇿' },
  { id:'de', label:'Germany',         flag:'🇩🇪' },
  { id:'fr', label:'France',          flag:'🇫🇷' },
  { id:'it', label:'Italy',           flag:'🇮🇹' },
  { id:'es', label:'Spain',           flag:'🇪🇸' },
  { id:'nl', label:'Netherlands',     flag:'🇳🇱' },
  { id:'be', label:'Belgium',         flag:'🇧🇪' },
  { id:'se', label:'Sweden',          flag:'🇸🇪' },
  { id:'no', label:'Norway',          flag:'🇳🇴' },
  { id:'pl', label:'Poland',          flag:'🇵🇱' },
  { id:'jp', label:'Japan',           flag:'🇯🇵' },
  { id:'kr', label:'South Korea',     flag:'🇰🇷' },
  { id:'in', label:'India',           flag:'🇮🇳' },
  { id:'cn', label:'China',           flag:'🇨🇳' },
  { id:'za', label:'South Africa',    flag:'🇿🇦' },
  { id:'br', label:'Brazil',          flag:'🇧🇷' },
  { id:'mx', label:'Mexico',          flag:'🇲🇽' },
  { id:'ar', label:'Argentina',       flag:'🇦🇷' },
  { id:'ru', label:'Russia',          flag:'🇷🇺' },
  { id:'tr', label:'Turkey',          flag:'🇹🇷' },
  { id:'ae', label:'UAE',             flag:'🇦🇪' },
]

const EU_PP = ['de','fr','it','es','nl','be','se','no','pl']
const STRONG_W = ['uk','us','ca','au','nz','jp','kr','de','fr','it','es','nl','be','se','no','pl']

const VC_RACE_DEST = {
  1:'australia', 2:'china',      3:'japan',
  4:'usa',       5:'canada',
  6:'schengen',  7:'schengen',   8:'schengen',  9:'uk',
  10:'schengen', 11:'schengen',  12:'schengen',
  13:'schengen', 14:'schengen',
  15:'azerbaijan', 16:'singapore',
  17:'usa',      18:'mexico_d',  19:'brazil_d', 20:'usa',
  21:'qatar',    22:'uae_d'
}

const VC_DEST_INFO = {
  australia:   { name:'Australia',      flag:'🇦🇺', zoneNote:null },
  china:       { name:'China',          flag:'🇨🇳', zoneNote:null },
  japan:       { name:'Japan',          flag:'🇯🇵', zoneNote:null },
  usa:         { name:'United States',  flag:'🇺🇸', zoneNote:'Covers Miami, Austin and Las Vegas' },
  canada:      { name:'Canada',         flag:'🇨🇦', zoneNote:null },
  schengen:    { name:'Schengen Zone',  flag:'🇪🇺', zoneNote:'Same rules apply across Monaco, Spain, Austria, Belgium, Hungary, Netherlands and Italy' },
  uk:          { name:'United Kingdom', flag:'🇬🇧', zoneNote:null },
  azerbaijan:  { name:'Azerbaijan',     flag:'🇦🇿', zoneNote:null },
  singapore:   { name:'Singapore',      flag:'🇸🇬', zoneNote:null },
  mexico_d:    { name:'Mexico',         flag:'🇲🇽', zoneNote:null },
  brazil_d:    { name:'Brazil',         flag:'🇧🇷', zoneNote:null },
  qatar:       { name:'Qatar',          flag:'🇶🇦', zoneNote:null },
  uae_d:       { name:'UAE',            flag:'🇦🇪', zoneNote:null },
}

const VC_HOME = {
  au:'australia', us:'usa',      ca:'canada',  uk:'uk',
  de:'schengen',  fr:'schengen', it:'schengen', es:'schengen',
  nl:'schengen',  be:'schengen', se:'schengen', no:'schengen', pl:'schengen',
  jp:'japan',     cn:'china',    br:'brazil_d', mx:'mexico_d', ae:'uae_d'
}

const VC_ROUND_NAMES = {
  1:'Australia',  2:'China',       3:'Japan',      4:'Miami',
  5:'Canada',     6:'Monaco',      7:'Spain (BCN)', 8:'Austria',
  9:'Great Britain', 10:'Belgium', 11:'Hungary',   12:'Netherlands',
  13:'Italy',    14:'Spain (MAD)', 15:'Azerbaijan', 16:'Singapore',
  17:'USA (Austin)', 18:'Mexico City', 19:'Sao Paulo', 20:'Las Vegas',
  21:'Qatar',    22:'Abu Dhabi'
}

const VC_STATUS = {
  own:  { color:'#818CF8', bg:'rgba(129,140,248,0.10)', label:'Home Country / Region', emoji:'🏠' },
  free: { color:'#22C55E', bg:'rgba(34,197,94,0.10)',   label:'Visa Free',             emoji:'✅' },
  eta:  { color:'#F59E0B', bg:'rgba(245,158,11,0.10)',  label:'eVisa / ETA Required',  emoji:'🟡' },
  vol:  { color:'#F97316', bg:'rgba(249,115,22,0.10)',  label:'Visa on Arrival',        emoji:'🟠' },
  req:  { color:'#E8002D', bg:'rgba(232,0,45,0.10)',    label:'Visa Required',          emoji:'🔴' },
}

const PLAN_TO_VC = {
  'gb':'uk', 'us':'us', 'au':'au', 'ca':'ca', 'nz':'nz', 'ie':null,
  'de':'de', 'fr':'fr', 'nl':'nl', 'be':'be', 'es':'es', 'it':'it',
  'pt':null, 'se':'se', 'no':'no', 'dk':null, 'fi':null, 'ch':null,
  'at':null, 'pl':'pl', 'br':'br', 'mx':'mx', 'jp':'jp', 'sg':null,
  'za':'za'
}

function getVisaInfo(pid, dest) {
  if (VC_HOME[pid] === dest) {
    return {
      status:'own', duration:'N/A', cost:'N/A', processing:'N/A',
      note: dest === 'schengen'
        ? 'As an EU/EEA passport holder you have full freedom of movement within the Schengen zone — no restrictions apply.'
        : 'This is your home country. No entry requirements apply.',
      url: null
    }
  }

  const inc = function(arr) { return arr.indexOf(pid) !== -1 }

  switch (dest) {
    case 'australia':
      if (pid === 'nz') return { status:'free', duration:'Unlimited', cost:'Free', processing:'None', note:'New Zealand citizens have special Trans-Tasman travel rights and can live and work in Australia freely.', url:null }
      if (inc(STRONG_W.concat(['ae']))) return { status:'eta', duration:'Up to 3 months per visit', cost:'AUD 20 (~£10)', processing:'Usually instant', note:'Apply via the Australian ETA app before departure. Usually approved within minutes. Passport must be valid for 6+ months.', url:'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/electronic-travel-authority-601' }
      return { status:'req', duration:'Varies', cost:'~AUD 145 (~£75)', processing:'2-4 weeks', note:'Tourist visa (subclass 600) required. Apply online via ImmiAccount well in advance of travel.', url:'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/visitor-600' }

    case 'china':
      if (inc(EU_PP.concat(['uk','au','nz']))) return { status:'free', duration:'15-30 days', cost:'Free', processing:'None', note:'Visa-free access introduced in 2024. Duration varies by nationality — verify your specific allowance before booking.', url:'https://www.fmprc.gov.cn/mfa_eng/' }
      if (inc(['jp','kr'])) return { status:'free', duration:'15 days', cost:'Free', processing:'None', note:"Part of China's expanded visa-free trial. Verify this status is still current before booking your trip.", url:'https://www.fmprc.gov.cn/mfa_eng/' }
      if (pid === 'ru') return { status:'free', duration:'30 days', cost:'Free', processing:'None', note:'Bilateral 30-day visa-free agreement between Russia and China.', url:null }
      if (inc(['us','ca'])) return { status:'req', duration:'30-60 days typical', cost:'~$140 USD (~£110)', processing:'4+ business days', note:'Tourist (L) visa required. Apply at a Chinese Visa Application Service Centre — book your appointment early as slots fill quickly.', url:'https://www.visaforchina.cn/eng/' }
      return { status:'req', duration:'Varies', cost:'Varies', processing:'5-10 days', note:'Tourist visa required. Apply at the nearest Chinese embassy or consulate well in advance of travel.', url:'https://www.visaforchina.cn/eng/' }

    case 'japan':
      if (inc(STRONG_W.concat(['br','mx','ar','ae','tr']))) return { status:'free', duration:'90 days', cost:'Free', processing:'None', note:'No advance application needed. Arrival card completed on arrival. Strictly tourism only — no working permitted.', url:null }
      return { status:'req', duration:'Varies', cost:'~JPY 3,000 (~£15)', processing:'5 business days', note:'Tourist visa required. Apply at a Japanese embassy or consulate. Documents required include: passport, bank statements, itinerary, and photos.', url:'https://www.mofa.go.jp/j_info/visit/visa/index.html' }

    case 'usa':
      if (pid === 'ca') return { status:'free', duration:'Up to 6 months', cost:'Free', processing:'None', note:'No visa required for entry into the US.', url:null }
      if (inc(STRONG_W.concat(['br','ar']))) return { status:'eta', duration:'Up to 90 days per trip', cost:'$21 USD (~£16)', processing:'Usually instant', note:'ESTA (Electronic System for Travel Authorisation) required before departure. Valid for 2 years and multiple trips. Apply only at esta.cbp.dhs.gov — avoid third-party sites.', url:'https://esta.cbp.dhs.gov' }
      return { status:'req', duration:'Varies — often 10-year multi-entry', cost:'$185 USD (~£145)', processing:'Weeks to months — consular interview required', note:'B1/B2 tourist visa required. Apply at the nearest US embassy or consulate. Appointment waiting times can be very long — apply several months in advance.', url:'https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html' }

    case 'canada':
      if (pid === 'us') return { status:'free', duration:'Up to 6 months', cost:'Free', processing:'None', note:'No visa required. If flying into Canada, an eTA (CAD 7) is needed — usually approved within minutes online.', url:'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta.html' }
      if (inc(STRONG_W.concat(['br','mx','ar','ae']))) return { status:'eta', duration:'Up to 6 months', cost:'CAD 7 (~£4)', processing:'Usually minutes', note:'eTA required for air travel only — not needed if crossing by land or sea. Apply before flying.', url:'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta.html' }
      return { status:'req', duration:'Varies', cost:'CAD 100 (~£58)', processing:'Several weeks', note:'Visitor visa required. Apply online via the IRCC portal. Processing times vary — apply at least 8 weeks before travel.', url:'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/visitor-visa.html' }

    case 'schengen':
      if (inc(['uk','us','ca','au','nz','jp','kr','br','mx','ar','ae'])) return { status:'free', duration:'90 days in any 180-day period', cost:'Free', processing:'None', note:'ETIAS electronic authorisation is in development and may become required — check travel-europe.europa.eu for the latest status before your trip.', url:'https://travel-europe.europa.eu/etias_en' }
      return { status:'req', duration:'Up to 90 days', cost:'~80 EUR (~£68)', processing:'2-4 weeks', note:'Schengen visa required. Apply at the embassy of your main destination country. Apply at least 4 weeks before travel with supporting documents including accommodation and return flight proof.', url:'https://www.schengenvisainfo.com/schengen-visa-application-process/' }

    case 'uk':
      if (inc(STRONG_W.concat(['br','mx','ar','ae','tr']))) return { status:'free', duration:'Up to 6 months', cost:'Free', processing:'None', note:'No visa required for short tourism visits. Have accommodation details and return travel evidence ready at the border.', url:null }
      return { status:'req', duration:'Up to 6 months', cost:'~£115', processing:'3+ weeks', note:'Standard Visitor visa required. Apply online via UK Visas and Immigration at least 3 weeks before travel.', url:'https://www.gov.uk/standard-visitor-visa' }

    case 'azerbaijan':
      if (pid === 'ru') return { status:'free', duration:'90 days', cost:'Free', processing:'None', note:'Visa-free under CIS bilateral agreement.', url:null }
      return { status:'eta', duration:'30 days', cost:'~$20 USD (~£16)', processing:'3 working days', note:"All nationalities must apply for an eVisa via Azerbaijan's ASAN portal before travel. Simple and quick process — apply at least 5 days before departure to be safe.", url:'https://evisa.gov.az/en/' }

    case 'singapore':
      if (inc(STRONG_W.concat(['cn','ae','br','mx','ar','tr']))) return { status:'free', duration:'30 days', cost:'Free', processing:'None', note:'Visa-free entry. Complete the Singapore Arrival Card (SGAC) online within 3 days before arrival — free and takes about 5 minutes.', url:'https://eservices.ica.gov.sg/sgarrivalcard/' }
      return { status:'req', duration:'30 days', cost:'~SGD 30 (~£17)', processing:'3-7 days', note:'Tourist visa required. Apply online via ICA Singapore. Have hotel booking and return flight details ready when applying.', url:'https://www.ica.gov.sg/enter-transit-depart/entering-singapore/visa-information' }

    case 'mexico_d':
      if (inc(STRONG_W.concat(['br','ar','ae','tr']))) return { status:'free', duration:'180 days', cost:'Free', processing:'None', note:'No visa required. A tourist card (FMM) is completed on arrival or included with your flight. No advance application needed.', url:null }
      return { status:'req', duration:'Varies', cost:'Varies', processing:'2-4 weeks', note:'Tourist visa required. Apply at the nearest Mexican consulate. Requirements vary by nationality.', url:'https://embamex.sre.gob.mx' }

    case 'brazil_d':
      if (inc(STRONG_W.concat(['ar','mx','ae','tr','ru']))) return { status:'free', duration:'90 days (up to 180 per year)', cost:'Free', processing:'None', note:'No visa required. Passport must be valid for 6+ months. Entry form completed on arrival.', url:null }
      return { status:'req', duration:'90 days', cost:'~$40-80 USD (~£30-62)', processing:'5-10 days', note:"Tourist e-visa available via the Brazilian government's online portal. Apply well in advance of travel.", url:'https://www.gov.br/mre/en/consular-services/visas' }

    case 'qatar':
      if (inc(STRONG_W.concat(['ae']))) return { status:'free', duration:'30 days', cost:'Free', processing:'None', note:'Visa-free on arrival at Hamad International Airport. Extendable to 60 days at no cost. Need a valid passport and onward/return ticket.', url:null }
      return { status:'vol', duration:'30 days', cost:'~QAR 100 (~£21)', processing:'On arrival', note:"Visa on arrival available at Hamad International Airport. Can also apply in advance via Qatar's MOI portal for a faster arrival experience.", url:'https://portal.moi.gov.qa/wps/portal/MOIInternet/services/inquiries/visaservices' }

    case 'uae_d':
      if (inc(STRONG_W.concat(['cn','ru','br','mx','ar','tr']))) return { status:'free', duration:'30 days', cost:'Free', processing:'None', note:'Visa-free on arrival at UAE airports. Extendable for an additional 30 days in-country. Valid passport and return ticket required.', url:null }
      return { status:'vol', duration:'30 days', cost:'~AED 100 (~£21)', processing:'On arrival', note:'Visa on arrival available at UAE airports. You can also apply for an eVisa before travel via the ICA UAE portal for a smoother arrival experience.', url:'https://u.ae/en/information-and-services/visa-and-emirates-id/do-you-need-an-entry-permit-or-a-visa-to-enter-the-uae' }

    default:
      return { status:'req', duration:'Verify', cost:'Verify', processing:'Verify', note:'Entry requirements unclear — verify with your nearest embassy or consulate before booking.', url:'https://www.iata.org/en/services/travel-centre/' }
  }
}

const VC_CSS = `
.vc-wrap {
  font-family: 'Barlow', sans-serif;
  color: var(--text);
}
.vc-body {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 0;
  align-items: start;
  min-height: 440px;
}
.vc-left {
  padding: 20px 20px 24px;
  border-right: 1px solid var(--border);
}
.vc-right {
  padding: 20px 24px 24px;
}
.vc-left-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-dim);
  margin-bottom: 10px;
  display: block;
}
.vc-search {
  width: 100%;
  box-sizing: border-box;
  background: var(--surface-3);
  border: 1px solid var(--border-md);
  border-radius: 7px;
  padding: 9px 12px;
  color: var(--text);
  font-family: 'Barlow', sans-serif;
  font-size: 13px;
  outline: none;
  margin-bottom: 8px;
  transition: border-color 0.15s;
}
.vc-search:focus { border-color: rgba(232,0,45,0.5); }
.vc-search::placeholder { color: var(--text-dim); }
.vc-pp-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  max-height: 360px;
  overflow-y: auto;
  padding-right: 2px;
}
.vc-pp-grid::-webkit-scrollbar { width: 3px; }
.vc-pp-grid::-webkit-scrollbar-thumb { background: var(--surface-4); border-radius: 2px; }
.vc-pp-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 9px;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 7px;
  cursor: pointer;
  color: var(--text-muted);
  text-align: left;
  transition: all 0.15s;
  width: 100%;
}
.vc-pp-btn:hover {
  background: var(--surface-3);
  border-color: var(--border-md);
  color: var(--text);
}
.vc-pp-btn.vc-active {
  background: rgba(232,0,45,0.09);
  border-color: rgba(232,0,45,0.4);
  color: var(--text);
}
.vc-pp-flag { font-size: 16px; line-height: 1; flex-shrink: 0; }
.vc-pp-label { font-size: 11px; line-height: 1.3; font-family: 'Barlow', sans-serif; }
.vc-no-results {
  grid-column: 1 / -1;
  padding: 14px;
  color: var(--text-dim);
  font-size: 12px;
  text-align: center;
  font-family: 'Barlow', sans-serif;
}
.vc-auto-tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: 10px;
  padding: 5px 10px;
  background: rgba(129,140,248,0.1);
  border: 1px solid rgba(129,140,248,0.25);
  border-radius: 100px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #818CF8;
}
.vc-prompt {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 340px;
  gap: 14px;
  text-align: center;
  padding: 0 20px;
}
.vc-prompt-icon { font-size: 48px; opacity: 0.25; }
.vc-prompt-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 22px;
  letter-spacing: 0.04em;
  color: var(--text);
}
.vc-prompt-text {
  font-size: 13px;
  color: var(--text-muted);
  max-width: 260px;
  line-height: 1.6;
}
.vc-status-card {
  border-radius: 10px;
  padding: 18px 20px;
  margin-bottom: 16px;
  border: 1px solid transparent;
}
.vc-status-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 6px 14px;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 700;
  font-family: 'Barlow Condensed', sans-serif;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  margin-bottom: 12px;
  border: 1px solid transparent;
}
.vc-passport-line {
  font-size: 13px;
  color: var(--text);
  line-height: 1.5;
  font-family: 'Barlow', sans-serif;
}
.vc-passport-line strong { font-weight: 600; }
.vc-passport-line .muted { color: var(--text-muted); }
.vc-zone-note {
  margin-top: 10px;
  padding: 9px 12px;
  background: rgba(100,120,255,0.07);
  border: 1px solid var(--border-md);
  border-radius: 7px;
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.5;
  font-family: 'Barlow', sans-serif;
}
.vc-detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
  margin-bottom: 14px;
}
.vc-detail-item {
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 11px 13px;
}
.vc-detail-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-dim);
  margin-bottom: 4px;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  display: block;
}
.vc-detail-value {
  font-size: 12px;
  color: var(--text);
  font-weight: 500;
  font-family: 'Barlow', sans-serif;
  line-height: 1.4;
}
.vc-note {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.65;
  margin-bottom: 14px;
  padding: 12px 14px;
  background: var(--surface-2);
  border-radius: 8px;
  border: 1px solid var(--border);
  border-left: 3px solid var(--border-md);
  font-family: 'Barlow', sans-serif;
}
.vc-apply-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: var(--red);
  color: #fff;
  border-radius: 8px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  transition: opacity 0.15s;
  margin-bottom: 18px;
}
.vc-apply-btn:hover { opacity: 0.86; }
.vc-all-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: var(--surface-2);
  border: 1px solid var(--border-md);
  border-radius: 9px;
  padding: 12px 16px;
  cursor: pointer;
  color: var(--text);
  font-family: 'Barlow', sans-serif;
  font-size: 13px;
  font-weight: 500;
  transition: background 0.15s;
  margin-bottom: 2px;
}
.vc-all-toggle:hover { background: var(--surface-3); }
.vc-all-toggle-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-dim);
}
.vc-all-grid {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 8px;
  margin-bottom: 8px;
}
.vc-all-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 8px;
}
.vc-all-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.vc-all-dest-flag { font-size: 18px; flex-shrink: 0; }
.vc-all-info { flex: 1; min-width: 0; }
.vc-all-dest-name { font-size: 13px; color: var(--text); font-weight: 500; font-family: 'Barlow', sans-serif; }
.vc-all-races { font-size: 11px; color: var(--text-muted); font-family: 'Barlow', sans-serif; margin-top: 1px; }
.vc-all-status {
  font-size: 11px;
  font-weight: 700;
  font-family: 'Barlow Condensed', sans-serif;
  letter-spacing: 0.05em;
  white-space: nowrap;
  text-align: right;
}
.vc-disclaimer {
  font-size: 11px;
  color: var(--text-dim);
  line-height: 1.65;
  margin-top: 14px;
  padding: 11px 14px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  font-family: 'Barlow', sans-serif;
}
@media (max-width: 780px) {
  .vc-body { grid-template-columns: 1fr; }
  .vc-left { border-right: none; border-bottom: 1px solid var(--border); padding: 16px; }
  .vc-right { padding: 16px; }
  .vc-pp-grid { max-height: 180px; }
  .vc-detail-grid { grid-template-columns: 1fr 1fr; }
}
`

export default function VisaChecker({ race, onBack, passport: passportProp }) {
  const [passport, setPassport] = useState(null)
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [autoSelected, setAutoSelected] = useState(false)
  const activeRef = useRef(null)

  useEffect(function() {
    if (!passportProp) return
    var vcId = PLAN_TO_VC[passportProp]
    if (!vcId) return
    var match = VC_PASSPORTS.find(function(p) { return p.id === vcId })
    if (match) {
      setPassport(match)
      setAutoSelected(true)
      setShowAll(false)
    }
  }, [passportProp])

  var filteredPP = VC_PASSPORTS.filter(function(p) {
    return p.label.toLowerCase().indexOf(search.toLowerCase()) !== -1
  })

  var destId   = VC_RACE_DEST[race.round]
  var destInfo = VC_DEST_INFO[destId]
  var visaInfo = passport ? getVisaInfo(passport.id, destId) : null
  var sc       = visaInfo ? VC_STATUS[visaInfo.status] : null

  var allDests = []
  var seen = {}
  Object.values(VC_RACE_DEST).forEach(function(d) {
    if (!seen[d]) { seen[d] = true; allDests.push(d) }
  })

  function handlePassportClick(p) {
    if (passport && passport.id === p.id) {
      setPassport(null)
      setAutoSelected(false)
    } else {
      setPassport(p)
      setAutoSelected(false)
      setSearch('')
      setShowAll(false)
    }
  }

  return (
    <div className="vc-wrap">
      <style dangerouslySetInnerHTML={{ __html: VC_CSS }} />
      <div className="vc-body">
        <div className="vc-left">
          <span className="vc-left-label">Your passport</span>
          <input
            className="vc-search"
            placeholder="Search nationality..."
            value={search}
            onChange={function(e) { setSearch(e.target.value) }}
          />
          <div className="vc-pp-grid">
            {filteredPP.map(function(p) {
              var isActive = passport && passport.id === p.id
              return (
                <button
                  key={p.id}
                  ref={isActive ? activeRef : null}
                  className={'vc-pp-btn' + (isActive ? ' vc-active' : '')}
                  onClick={function() { handlePassportClick(p) }}
                >
                  <span className="vc-pp-flag">{p.flag}</span>
                  <span className="vc-pp-label">{p.label}</span>
                </button>
              )
            })}
            {filteredPP.length === 0 && (
              <div className="vc-no-results">No passport found</div>
            )}
          </div>
          {autoSelected && passport && (
            <div className="vc-auto-tag">⚡ From your trip settings</div>
          )}
        </div>

        <div className="vc-right">
          {!passport ? (
            <div className="vc-prompt">
              <div className="vc-prompt-icon">🛂</div>
              <div className="vc-prompt-title">Select Your Passport</div>
              <div className="vc-prompt-text">
                {'Choose your nationality to check entry requirements for ' + destInfo.flag + ' ' + destInfo.name + '.'}
              </div>
            </div>
          ) : (
            <div>
              <div className="vc-status-card" style={{ background: sc.bg, borderColor: sc.color + '28' }}>
                <div className="vc-status-badge" style={{ background: sc.color + '20', color: sc.color, borderColor: sc.color + '45' }}>
                  <span>{sc.emoji}</span>
                  <span>{sc.label}</span>
                </div>
                <div className="vc-passport-line">
                  <strong>{passport.flag + ' ' + passport.label}</strong>
                  <span className="muted"> passport visiting </span>
                  <strong>{destInfo.flag + ' ' + destInfo.name}</strong>
                </div>
                {destInfo.zoneNote && (
                  <div className="vc-zone-note">{destInfo.zoneNote}</div>
                )}
              </div>

              {visaInfo.status !== 'own' && (
                <div className="vc-detail-grid">
                  <div className="vc-detail-item">
                    <span className="vc-detail-label">Max Stay</span>
                    <div className="vc-detail-value">{visaInfo.duration}</div>
                  </div>
                  <div className="vc-detail-item">
                    <span className="vc-detail-label">Cost</span>
                    <div className="vc-detail-value">{visaInfo.cost}</div>
                  </div>
                  <div className="vc-detail-item">
                    <span className="vc-detail-label">Processing</span>
                    <div className="vc-detail-value">{visaInfo.processing}</div>
                  </div>
                </div>
              )}

              <div className="vc-note">{visaInfo.note}</div>

              {visaInfo.url && (
                <a href={visaInfo.url} target="_blank" rel="noopener noreferrer" className="vc-apply-btn">
                  Official Application / Info ↗
                </a>
              )}

              <button className="vc-all-toggle" onClick={function() { setShowAll(function(v) { return !v }) }}>
                <span>Check all 2026 race countries</span>
                <span className="vc-all-toggle-label">{showAll ? 'Hide ▲' : 'Show all 13 ▼'}</span>
              </button>

              {showAll && (
                <div className="vc-all-grid">
                  {allDests.map(function(dId) {
                    var info  = getVisaInfo(passport.id, dId)
                    var cfg   = VC_STATUS[info.status]
                    var dest2 = VC_DEST_INFO[dId]
                    var raceNames = Object.keys(VC_RACE_DEST)
                      .filter(function(rnd) { return VC_RACE_DEST[parseInt(rnd)] === dId })
                      .map(function(rnd) { return VC_ROUND_NAMES[parseInt(rnd)] })
                      .join(', ')
                    return (
                      <div key={dId} className="vc-all-row">
                        <div className="vc-all-dot" style={{ background: cfg.color }} />
                        <span className="vc-all-dest-flag">{dest2.flag}</span>
                        <div className="vc-all-info">
                          <div className="vc-all-dest-name">{dest2.name}</div>
                          <div className="vc-all-races">{raceNames}</div>
                        </div>
                        <div className="vc-all-status" style={{ color: cfg.color }}>
                          {cfg.emoji + ' ' + cfg.label}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              <div className="vc-disclaimer">
                Always verify before booking. Visa rules can change at short notice. This tool provides guidance only — confirm requirements via official government sources or the IATA Travel Centre. GP Planner accepts no liability for travel disruption arising from reliance on this information.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
