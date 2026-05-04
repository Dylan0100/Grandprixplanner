import { useState } from 'react'

const BackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

// ─── PASSPORT & DESTINATION DATA ───────────────────────────────────────────

const EU_PASSPORTS = ['de','fr','it','es','nl','be','se','no','pl']
const STRONG_WESTERN = ['uk','us','ca','au','nz','jp','kr', ...EU_PASSPORTS]

const passports = [
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

// Race round → destination key
const raceDestMap = {
  1:'australia',  2:'china',      3:'japan',
  4:'usa',        5:'canada',
  6:'schengen',   7:'schengen',   8:'schengen',   9:'uk',
  10:'schengen',  11:'schengen',  12:'schengen',
  13:'schengen',  14:'schengen',
  15:'azerbaijan',16:'singapore',
  17:'usa',       18:'mexico_d',  19:'brazil_d',  20:'usa',
  21:'qatar',     22:'uae_d'
}

const DEST_INFO = {
  australia:  { name:'Australia',       flag:'🇦🇺' },
  china:      { name:'China',           flag:'🇨🇳' },
  japan:      { name:'Japan',           flag:'🇯🇵' },
  usa:        { name:'United States',   flag:'🇺🇸' },
  canada:     { name:'Canada',          flag:'🇨🇦' },
  schengen:   { name:'Schengen Zone',   flag:'🇪🇺', zoneNote:'Same rules apply to Monaco, Spain (Barcelona & Madrid), Austria, Belgium, Hungary, Netherlands and Italy' },
  uk:         { name:'United Kingdom',  flag:'🇬🇧' },
  azerbaijan: { name:'Azerbaijan',      flag:'🇦🇿' },
  singapore:  { name:'Singapore',       flag:'🇸🇬' },
  mexico_d:   { name:'Mexico',          flag:'🇲🇽' },
  brazil_d:   { name:'Brazil',          flag:'🇧🇷' },
  qatar:      { name:'Qatar',           flag:'🇶🇦' },
  uae_d:      { name:'UAE',             flag:'🇦🇪' },
}

// Passport → home destination (where status = "own country")
const HOME_DEST = {
  au:'australia', us:'usa',      ca:'canada', uk:'uk',
  de:'schengen',  fr:'schengen', it:'schengen', es:'schengen',
  nl:'schengen',  be:'schengen', se:'schengen', no:'schengen', pl:'schengen',
  jp:'japan',     cn:'china',
  br:'brazil_d',  mx:'mexico_d', ae:'uae_d'
}

const ROUND_NAMES = {
  1:'Australia',  2:'China',         3:'Japan',
  4:'Miami',      5:'Canada',
  6:'Monaco',     7:'Spain (BCN)',   8:'Austria',      9:'Great Britain',
  10:'Belgium',   11:'Hungary',      12:'Netherlands',
  13:'Italy',     14:'Spain (MAD)',
  15:'Azerbaijan',16:'Singapore',
  17:'USA (Austin)', 18:'Mexico City', 19:'São Paulo', 20:'Las Vegas',
  21:'Qatar',     22:'Abu Dhabi'
}

const STATUS_CONFIG = {
  own:  { color:'#818CF8', bg:'rgba(129,140,248,0.10)', label:'Home Country / Region', emoji:'🏠' },
  free: { color:'#22C55E', bg:'rgba(34,197,94,0.10)',   label:'Visa Free',             emoji:'✅' },
  eta:  { color:'#F59E0B', bg:'rgba(245,158,11,0.10)',  label:'eVisa / ETA Required',  emoji:'🟡' },
  vol:  { color:'#F97316', bg:'rgba(249,115,22,0.10)',  label:'Visa on Arrival',        emoji:'🟠' },
  req:  { color:'#E8002D', bg:'rgba(232,0,45,0.10)',    label:'Visa Required',          emoji:'🔴' },
}

// ─── VISA LOGIC ─────────────────────────────────────────────────────────────

function getVisaInfo(pid, dest) {
  // Home country / region check
  if (HOME_DEST[pid] === dest) {
    return {
      status: 'own',
      duration: 'N/A', cost: 'N/A', processing: 'N/A',
      note: dest === 'schengen'
        ? 'As an EU/EEA passport holder you have full freedom of movement within the Schengen zone — no restrictions apply.'
        : 'This is your home country. No entry requirements needed.',
      url: null
    }
  }

  const inc = arr => arr.includes(pid)

  switch (dest) {

    case 'australia':
      if (pid === 'nz') return { status:'free', duration:'Unlimited', cost:'Free', processing:'None', note:'New Zealand citizens have special Trans-Tasman travel rights and can live and work in Australia freely.', url: null }
      if (inc([...STRONG_WESTERN, 'ae'])) return { status:'eta', duration:'Up to 3 months per visit', cost:'AUD 20 (~£10)', processing:'Usually instant (up to 72 hrs)', note:'Apply via the Australian ETA app or immigration website before departure. Usually approved within minutes. Passport must be valid for 6+ months.', url:'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/electronic-travel-authority-601' }
      return { status:'req', duration:'Varies', cost:'~AUD 145 (~£75)', processing:'2–4 weeks', note:'Tourist visa (subclass 600) required. Apply online via ImmiAccount well in advance of travel.', url:'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/visitor-600' }

    case 'china':
      if (inc([...EU_PASSPORTS, 'uk', 'au', 'nz'])) return { status:'free', duration:'15–30 days', cost:'Free', processing:'None', note:'Visa-free access introduced in 2024. Duration varies by passport nationality — verify your specific allowance before booking. Passport must be valid 6+ months.', url:'https://www.fmprc.gov.cn/mfa_eng/' }
      if (inc(['jp', 'kr'])) return { status:'free', duration:'15 days', cost:'Free', processing:'None', note:'Part of China\'s expanded visa-free trial programme. Verify this status is still current before booking your trip.', url:'https://www.fmprc.gov.cn/mfa_eng/' }
      if (inc(['ru'])) return { status:'free', duration:'30 days', cost:'Free', processing:'None', note:'Bilateral 30-day visa-free agreement between Russia and China.', url: null }
      if (inc(['us', 'ca'])) return { status:'req', duration:'30–60 days typical', cost:'~$140 USD (~£110)', processing:'4+ business days', note:'Tourist (L) visa required. Apply at a Chinese Visa Application Service Centre — book your appointment early as slots fill quickly.', url:'https://www.visaforchina.cn/eng/' }
      return { status:'req', duration:'Varies', cost:'Varies', processing:'5–10 days', note:'Tourist visa required. Apply at the nearest Chinese embassy or consulate well in advance of travel.', url:'https://www.visaforchina.cn/eng/' }

    case 'japan':
      if (inc([...STRONG_WESTERN, 'br', 'mx', 'ar', 'ae', 'tr'])) return { status:'free', duration:'90 days', cost:'Free', processing:'None', note:'No advance application needed. Arrival card completed on arrival. Strictly tourism/short visits only — no working permitted.', url: null }
      if (inc(['ru'])) return { status:'req', duration:'Varies', cost:'Varies', processing:'5–10 days', note:'Visa required. Apply at a Japanese embassy or consulate.', url:'https://www.mofa.go.jp/j_info/visit/visa/index.html' }
      return { status:'req', duration:'Varies', cost:'~JPY 3,000 (~£15)', processing:'5 business days', note:'Tourist visa required. Apply at a Japanese embassy or consulate. Documents required include: passport, bank statements, itinerary, and photos.', url:'https://www.mofa.go.jp/j_info/visit/visa/index.html' }

    case 'usa':
      if (pid === 'ca') return { status:'free', duration:'Up to 6 months', cost:'Free', processing:'None', note:'No visa required for entry into the US.', url: null }
      if (inc([...EU_PASSPORTS, 'uk', 'au', 'nz', 'jp', 'kr', 'br', 'ar'])) return { status:'eta', duration:'Up to 90 days per trip', cost:'$21 USD (~£16)', processing:'Usually instant (up to 72 hrs)', note:'ESTA (Electronic System for Travel Authorisation) required before departure. Valid for 2 years / multiple trips. Apply only at esta.cbp.dhs.gov — avoid third-party sites that charge inflated fees.', url:'https://esta.cbp.dhs.gov' }
      return { status:'req', duration:'Varies (often 10-year multi-entry)', cost:'$185 USD (~£145)', processing:'Weeks to months — consular interview required', note:'B1/B2 tourist visa required. Apply at the nearest US embassy or consulate. Appointment waiting times can be very long — apply several months in advance.', url:'https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html' }

    case 'canada':
      if (pid === 'us') return { status:'free', duration:'Up to 6 months', cost:'Free (land) / CAD 7 (air)', processing:'None', note:'No visa required. If flying into Canada, an eTA (CAD 7) is needed — usually approved within minutes online.', url:'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta.html' }
      if (inc([...STRONG_WESTERN, 'br', 'mx', 'ar', 'ae'])) return { status:'eta', duration:'Up to 6 months', cost:'CAD 7 (~£4)', processing:'Usually minutes (up to 72 hrs)', note:'eTA required for air travel only — not needed if crossing by land or sea. Apply before flying.', url:'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta.html' }
      return { status:'req', duration:'Varies', cost:'CAD 100 (~£58)', processing:'Several weeks', note:'Visitor visa required. Apply online via the IRCC portal. Processing times vary — apply at least 8 weeks before travel.', url:'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/visitor-visa.html' }

    case 'schengen':
      if (inc(['uk', 'us', 'ca', 'au', 'nz', 'jp', 'kr', 'br', 'mx', 'ar', 'ae'])) return { status:'free', duration:'90 days in any 180-day period', cost:'Free', processing:'None', note:'ETIAS electronic authorisation is in development and may become required — check travel-europe.europa.eu for the latest status before your trip.', url:'https://travel-europe.europa.eu/etias_en' }
      if (inc(['tr'])) return { status:'req', duration:'Up to 90 days', cost:'~€80 (~£68)', processing:'2–4 weeks', note:'Schengen visa required. Apply at the embassy of your main destination country (e.g. French embassy for Monaco, Spanish embassy for Barcelona or Madrid). Apply at least 4 weeks before travel.', url:'https://www.schengenvisainfo.com/schengen-visa-application-process/' }
      return { status:'req', duration:'Up to 90 days', cost:'~€80 (~£68)', processing:'2–4 weeks', note:'Schengen visa required. Apply at the relevant country\'s embassy or consulate. Appointment slots fill quickly — book well in advance and prepare all supporting documents.', url:'https://www.schengenvisainfo.com/schengen-visa-application-process/' }

    case 'uk':
      if (inc([...STRONG_WESTERN, 'br', 'mx', 'ar', 'ae', 'tr'])) return { status:'free', duration:'Up to 6 months', cost:'Free', processing:'None', note:'No visa required for short tourism visits. Entry is at the border officer\'s discretion. Have accommodation details and return travel evidence ready.', url: null }
      return { status:'req', duration:'Up to 6 months', cost:'~£115', processing:'3+ weeks', note:'Standard Visitor visa required. Apply online via UK Visas & Immigration. Apply at least 3 weeks before travel — longer if biometrics are required at a visa application centre.', url:'https://www.gov.uk/standard-visitor-visa' }

    case 'azerbaijan':
      if (inc(['ru'])) return { status:'free', duration:'90 days', cost:'Free', processing:'None', note:'Visa-free under CIS bilateral agreement.', url: null }
      return { status:'eta', duration:'30 days', cost:'~$20 USD (~£16)', processing:'3 working days', note:'All nationalities (except CIS states) must apply for an eVisa via Azerbaijan\'s ASAN portal before travel. The process is simple and quick — apply at least 5 days before departure to be safe.', url:'https://evisa.gov.az/en/' }

    case 'singapore':
      if (inc([...STRONG_WESTERN, 'cn', 'ae', 'br', 'mx', 'ar', 'tr'])) return { status:'free', duration:'30 days', cost:'Free', processing:'None', note:'Visa-free entry. Complete the Singapore Arrival Card (SGAC) online within 3 days before arrival — it\'s free and takes about 5 minutes.', url:'https://eservices.ica.gov.sg/sgarrivalcard/' }
      return { status:'req', duration:'30 days', cost:'~SGD 30 (~£17)', processing:'3–7 days', note:'Tourist visa required. Apply online via ICA Singapore before travel. Multiple-entry visas are available. Have hotel booking and return flight details ready when applying.', url:'https://www.ica.gov.sg/enter-transit-depart/entering-singapore/visa-information' }

    case 'mexico_d':
      if (inc([...STRONG_WESTERN, 'br', 'ar', 'ae', 'tr'])) return { status:'free', duration:'180 days', cost:'Free', processing:'None', note:'No visa required. A tourist card (FMM) is completed on arrival or often included with your flight. No advance application needed.', url: null }
      return { status:'req', duration:'Varies', cost:'Varies', processing:'2–4 weeks', note:'Tourist visa required. Apply at the nearest Mexican consulate. Requirements vary by nationality.', url:'https://embamex.sre.gob.mx' }

    case 'brazil_d':
      if (inc([...STRONG_WESTERN, 'ar', 'mx', 'ae', 'tr', 'ru'])) return { status:'free', duration:'90 days (up to 180 per year)', cost:'Free', processing:'None', note:'No visa required. Passport must be valid for 6+ months. Entry form completed on arrival.', url: null }
      return { status:'req', duration:'90 days', cost:'~$40–80 USD (~£30–62)', processing:'5–10 days', note:'Tourist e-visa available via the Brazilian government\'s online portal. Apply well in advance of travel.', url:'https://www.gov.br/mre/en/consular-services/visas' }

    case 'qatar':
      if (inc([...STRONG_WESTERN, 'ae'])) return { status:'free', duration:'30 days', cost:'Free', processing:'None', note:'Visa-free on arrival at Hamad International Airport. Extendable to 60 days at no cost. Just need a valid passport and onward/return ticket.', url: null }
      return { status:'vol', duration:'30 days', cost:'~QAR 100 (~£21)', processing:'On arrival', note:'Visa on arrival available at Hamad International Airport. Simple process — have hotel and return flight details ready. Can also apply in advance via Qatar\'s MOI portal for a faster arrival experience.', url:'https://portal.moi.gov.qa/wps/portal/MOIInternet/services/inquiries/visaservices' }

    case 'uae_d':
      if (inc([...STRONG_WESTERN, 'cn', 'ru', 'br', 'mx', 'ar', 'tr'])) return { status:'free', duration:'30 days', cost:'Free', processing:'None', note:'Visa-free on arrival at UAE airports. Extendable for an additional 30 days in-country. Valid passport and return ticket required.', url: null }
      return { status:'vol', duration:'30 days', cost:'~AED 100 (~£21)', processing:'On arrival', note:'Visa on arrival available at UAE airports. You can also apply for an eVisa before travel via the ICA UAE portal for a smoother arrival experience.', url:'https://u.ae/en/information-and-services/visa-and-emirates-id/do-you-need-an-entry-permit-or-a-visa-to-enter-the-uae' }

    default:
      return { status:'req', duration:'Verify', cost:'Verify', processing:'Verify', note:'Entry requirements unclear — verify with your nearest embassy or consulate before booking.', url:'https://www.iata.org/en/services/travel-centre/' }
  }
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

const STYLES = `
  .vc-body { display: grid; grid-template-columns: 310px 1fr; gap: 28px; padding: 28px 32px; align-items: start; }
  .vc-search { width: 100%; box-sizing: border-box; background: var(--surface-3); border: 1px solid var(--text-dim); border-radius: 8px; padding: 10px 14px; color: var(--text); font-family: Barlow, sans-serif; font-size: 14px; outline: none; margin-bottom: 10px; }
  .vc-search:focus { border-color: var(--red); }
  .vc-search::placeholder { color: var(--text-muted); }
  .vc-passport-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5px; max-height: 390px; overflow-y: auto; padding-right: 2px; }
  .vc-passport-grid::-webkit-scrollbar { width: 4px; }
  .vc-passport-grid::-webkit-scrollbar-track { background: transparent; }
  .vc-passport-grid::-webkit-scrollbar-thumb { background: var(--surface-3); border-radius: 2px; }
  .vc-pp-btn { display: flex; align-items: center; gap: 8px; padding: 8px 10px; background: var(--surface-2); border: 1px solid var(--surface-3); border-radius: 8px; cursor: pointer; color: var(--text-muted); text-align: left; transition: all 0.15s; }
  .vc-pp-btn:hover { background: var(--surface-3); color: var(--text); border-color: var(--text-dim); }
  .vc-pp-btn.active { background: rgba(232,0,45,0.10); border-color: var(--red); color: var(--text); }
  .vc-pp-flag { font-size: 18px; line-height: 1; flex-shrink: 0; }
  .vc-pp-label { font-size: 12px; line-height: 1.3; font-family: Barlow, sans-serif; }
  .vc-status-card { border-radius: 12px; padding: 20px 22px; margin-bottom: 18px; }
  .vc-status-badge { display: inline-flex; align-items: center; gap: 8px; padding: 7px 14px; border-radius: 100px; font-size: 13px; font-weight: 700; font-family: 'Barlow Condensed', sans-serif; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 14px; }
  .vc-passport-dest { font-size: 14px; color: var(--text); line-height: 1.5; }
  .vc-zone-note { font-size: 12px; color: var(--text-muted); background: var(--surface-2); border-radius: 6px; padding: 8px 12px; margin-top: 10px; }
  .vc-detail-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-bottom: 14px; }
  .vc-detail-item { background: var(--surface-2); border-radius: 8px; padding: 12px 14px; }
  .vc-detail-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-dim); margin-bottom: 5px; font-family: 'Barlow Condensed', sans-serif; }
  .vc-detail-value { font-size: 13px; color: var(--text); font-weight: 500; font-family: Barlow, sans-serif; line-height: 1.3; }
  .vc-note { font-size: 13px; color: var(--text-muted); line-height: 1.65; margin-bottom: 16px; padding: 12px 14px; background: var(--surface-2); border-radius: 8px; border-left: 3px solid var(--surface-3); font-family: Barlow, sans-serif; }
  .vc-apply-btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; background: var(--red); color: #fff; border-radius: 8px; font-family: 'Barlow Condensed', sans-serif; font-size: 14px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; text-decoration: none; transition: opacity 0.15s; margin-bottom: 20px; }
  .vc-apply-btn:hover { opacity: 0.86; }
  .vc-all-toggle { display: flex; align-items: center; justify-content: space-between; width: 100%; background: var(--surface-2); border: 1px solid var(--surface-3); border-radius: 10px; padding: 13px 16px; cursor: pointer; color: var(--text); font-family: Barlow, sans-serif; font-size: 14px; transition: background 0.15s; margin-bottom: 2px; }
  .vc-all-toggle:hover { background: var(--surface-3); }
  .vc-all-grid { display: flex; flex-direction: column; gap: 5px; margin-top: 10px; margin-bottom: 10px; }
  .vc-all-row { display: flex; align-items: center; gap: 10px; padding: 10px 14px; background: var(--surface-2); border-radius: 8px; }
  .vc-all-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
  .vc-all-dest-name { font-size: 13px; color: var(--text); font-weight: 500; font-family: Barlow, sans-serif; }
  .vc-all-races { font-size: 11px; color: var(--text-muted); font-family: Barlow, sans-serif; }
  .vc-all-status { font-size: 12px; font-weight: 600; font-family: 'Barlow Condensed', sans-serif; letter-spacing: 0.04em; white-space: nowrap; }
  .vc-prompt { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 320px; gap: 14px; text-align: center; }
  .vc-prompt-icon { font-size: 52px; }
  .vc-prompt-text { font-size: 15px; color: var(--text-muted); font-family: Barlow, sans-serif; max-width: 280px; line-height: 1.5; }
  .vc-disclaimer { font-size: 11px; color: var(--text-dim); line-height: 1.6; margin-top: 16px; padding: 12px 14px; background: var(--surface); border: 1px solid var(--surface-3); border-radius: 8px; font-family: Barlow, sans-serif; }
  @media (max-width: 780px) {
    .vc-body { grid-template-columns: 1fr; padding: 20px 16px; gap: 20px; }
    .vc-passport-grid { max-height: 200px; }
    .vc-detail-grid { grid-template-columns: 1fr 1fr; }
  }
`

export default function VisaChecker({ race, onBack }) {
  const [passport, setPassport] = useState(null)
  const [search, setSearch]     = useState('')
  const [showAll, setShowAll]   = useState(false)

  const filtered = passports.filter(p =>
    p.label.toLowerCase().includes(search.toLowerCase())
  )

  const destId   = raceDestMap[race.round]
  const destInfo = DEST_INFO[destId]
  const visaInfo = passport ? getVisaInfo(passport.id, destId) : null
  const sc       = visaInfo ? STATUS_CONFIG[visaInfo.status] : null

  // Unique destinations in calendar order
  const allDests = [...new Set(Object.values(raceDestMap))]

  return (
    <div className="estimator-wrap">
      <style>{STYLES}</style>

      {/* Header */}
      <div className="est-topbar">
        <button className="est-back" onClick={onBack}>
          <BackIcon />Back to options
        </button>
        <div style={{ textAlign: 'right' }}>
          <div className="est-title">Visa Checker</div>
          <div className="est-subtitle">Entry requirements for {destInfo.flag} {destInfo.name}</div>
        </div>
      </div>

      <div className="vc-body">

        {/* ── LEFT: Passport selector ── */}
        <div>
          <div className="est-section-label" style={{ marginBottom: '10px' }}>Select your passport</div>
          <input
            className="vc-search"
            placeholder="Search nationality…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="vc-passport-grid">
            {filtered.map(p => (
              <button
                key={p.id}
                className={`vc-pp-btn${passport?.id === p.id ? ' active' : ''}`}
                onClick={() => { setPassport(p); setSearch(''); setShowAll(false) }}
              >
                <span className="vc-pp-flag">{p.flag}</span>
                <span className="vc-pp-label">{p.label}</span>
              </button>
            ))}
            {filtered.length === 0 && (
              <div style={{ gridColumn: '1/-1', padding: '16px', color: 'var(--text-dim)', fontSize: '13px', textAlign: 'center', fontFamily: 'Barlow, sans-serif' }}>
                No passport found
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT: Results ── */}
        <div>
          {!passport ? (
            <div className="vc-prompt">
              <div className="vc-prompt-icon">🛂</div>
              <div className="vc-prompt-text">
                Select your passport nationality to check entry requirements for {destInfo.flag} {destInfo.name}
              </div>
            </div>
          ) : (
            <>
              {/* Status card */}
              <div className="vc-status-card" style={{ background: sc.bg, border: `1px solid ${sc.color}30` }}>
                <div
                  className="vc-status-badge"
                  style={{ background: sc.color + '20', color: sc.color, border: `1px solid ${sc.color}40` }}
                >
                  {sc.emoji} {sc.label}
                </div>
                <div className="vc-passport-dest">
                  <strong>{passport.flag} {passport.label}</strong>
                  <span style={{ color: 'var(--text-muted)' }}> passport visiting </span>
                  <strong>{destInfo.flag} {destInfo.name}</strong>
                </div>
                {destInfo.zoneNote && (
                  <div className="vc-zone-note">ℹ️ {destInfo.zoneNote}</div>
                )}
              </div>

              {/* Detail grid (hidden for "own country") */}
              {visaInfo.status !== 'own' && (
                <div className="vc-detail-grid">
                  <div className="vc-detail-item">
                    <div className="vc-detail-label">📅 Max Stay</div>
                    <div className="vc-detail-value">{visaInfo.duration}</div>
                  </div>
                  <div className="vc-detail-item">
                    <div className="vc-detail-label">💰 Cost</div>
                    <div className="vc-detail-value">{visaInfo.cost}</div>
                  </div>
                  <div className="vc-detail-item">
                    <div className="vc-detail-label">⏱️ Processing</div>
                    <div className="vc-detail-value">{visaInfo.processing}</div>
                  </div>
                </div>
              )}

              {/* Note */}
              <div className="vc-note">{visaInfo.note}</div>

              {/* Apply link */}
              {visaInfo.url && (
                
                  href={visaInfo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vc-apply-btn"
                >
                  Official Application / Info ↗
                </a>
              )}

              {/* All races toggle */}
              <button className="vc-all-toggle" onClick={() => setShowAll(v => !v)}>
                <span>🌍 Check all 2026 race countries</span>
                <span style={{ color: 'var(--text-dim)', fontSize: '12px' }}>
                  {showAll ? '▲ Hide' : '▼ Show all 13 destinations'}
                </span>
              </button>

              {showAll && (
                <div className="vc-all-grid">
                  {allDests.map(dId => {
                    const info = getVisaInfo(passport.id, dId)
                    const cfg  = STATUS_CONFIG[info.status]
                    const dest = DEST_INFO[dId]
                    const races = Object.entries(raceDestMap)
                      .filter(([, d]) => d === dId)
                      .map(([rnd]) => ROUND_NAMES[parseInt(rnd)])
                      .join(', ')
                    return (
                      <div key={dId} className="vc-all-row">
                        <div className="vc-all-dot" style={{ background: cfg.color }} />
                        <span style={{ fontSize: '18px' }}>{dest.flag}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div className="vc-all-dest-name">{dest.name}</div>
                          <div className="vc-all-races">{races}</div>
                        </div>
                        <div className="vc-all-status" style={{ color: cfg.color }}>
                          {cfg.emoji} {cfg.label}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Disclaimer */}
              <div className="vc-disclaimer">
                ⚠️ <strong>Always verify before booking.</strong> Visa rules can change at short notice. This tool provides guidance only — confirm requirements via official government sources or the{' '}
                <a href="https://www.iata.org/en/services/travel-centre/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)' }}>IATA Travel Centre</a>.
                {' '}GP Planner accepts no liability for travel disruption arising from reliance on this information.
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
