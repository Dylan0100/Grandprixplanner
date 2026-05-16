import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import VisaChecker from '../components/VisaChecker'
import GrandstandPicker from '../components/GrandstandPicker'
import FlightGuide from '../components/FlightGuide'
import LocalTransport from '../components/LocalTransport' // ← ADDED

const races = [
  {round:1,name:"Australian Grand Prix",short:"Australia",circuit:"Albert Park Circuit",city:"Melbourne",country:"Australia",flag:"🇦🇺",dates:"6–8 Mar 2026",region:"asia",sprint:false,status:"completed",isNew:false,tip:"A fan favourite season opener. Great atmosphere, walkable from the city centre.",airport:"Melbourne Tullamarine (MEL) — 30 min",flightBase:950,flightNA:1150,flightAUS:130,accommodation:[85,155,280],tickets:[160,320,580],transport:20,nights:3,ticketLabels:["General Admission","Clark / Whiteford Grandstand","Platinum Club"],accumLabels:["Guest house / inner suburb","3-star city hotel","4–5 star Melbourne CBD"]},
  {round:2,name:"Chinese Grand Prix",short:"China",circuit:"Shanghai International Circuit",city:"Shanghai",country:"China",flag:"🇨🇳",dates:"13–15 Mar 2026",region:"asia",sprint:true,status:"completed",isNew:false,tip:"Sprint weekend. Chinese visa required for UK passport holders — apply 4+ weeks early.",airport:"Shanghai Pudong (PVG) — 45 min",flightBase:720,flightNA:900,flightAUS:650,accommodation:[70,130,250],tickets:[120,240,440],transport:25,nights:3,ticketLabels:["General Admission","Turn 6 Grandstand","VIP Pavilion"],accumLabels:["Budget hotel Pudong","3-star hotel near circuit","5-star Pudong hotel"]},
  {round:3,name:"Japanese Grand Prix",short:"Japan",circuit:"Suzuka Circuit",city:"Suzuka",country:"Japan",flag:"🇯🇵",dates:"27–29 Mar 2026",region:"asia",sprint:false,status:"completed",isNew:false,tip:"Book accommodation in Nagoya rather than Osaka — closer and cheaper.",airport:"Nagoya Chubu (NGO) — 50 min",flightBase:790,flightNA:980,flightAUS:580,accommodation:[80,150,290],tickets:[170,340,600],transport:35,nights:3,ticketLabels:["General Admission","Degner / 130R Stand","Super Seat Grandstand"],accumLabels:["Business hotel Nagoya","3-star Nagoya central","Premium Nagoya hotel"]},
  {round:4,name:"Miami Grand Prix",short:"Miami",circuit:"Miami International Autodrome",city:"Miami",country:"USA",flag:"🇺🇸",dates:"1–3 May 2026",region:"americas",sprint:true,status:"next",isNew:false,tip:"Sprint weekend. Premium event experience — plan for heat and book accommodation well in advance.",airport:"Miami International (MIA) — 20 min",flightBase:580,flightNA:180,flightAUS:1280,accommodation:[140,240,440],tickets:[340,680,1200],transport:30,nights:3,ticketLabels:["General Admission","Turn 1 Grandstand","Club Paddock"],accumLabels:["Airport area hotel","Miami Lakes / Aventura hotel","South Beach 4-star"]},
  {round:5,name:"Canadian Grand Prix",short:"Canada",circuit:"Circuit Gilles Villeneuve",city:"Montréal",country:"Canada",flag:"🇨🇦",dates:"22–24 May 2026",region:"americas",sprint:true,status:"upcoming",isNew:false,tip:"Sprint weekend. Montréal is one of the best host cities in F1 — build in 3–4 days.",airport:"Montréal Trudeau (YUL) — 25 min by metro / shuttle",flightBase:490,flightNA:200,flightAUS:1350,accommodation:[110,190,360],tickets:[200,400,680],transport:20,nights:3,ticketLabels:["General Admission","Senna / Prost Grandstand","Paddock Club"],accumLabels:["Hostel or budget hotel","Plateau-Mont-Royal hotel","Old Montréal boutique hotel"]},
  {round:6,name:"Monaco Grand Prix",short:"Monaco",circuit:"Circuit de Monaco",city:"Monaco",country:"Monaco",flag:"🇲🇨",dates:"5–7 Jun 2026",region:"europe",sprint:false,status:"upcoming",isNew:false,tip:"The most iconic race on the calendar. Consider staying in Nice — 25 mins and significantly cheaper.",airport:"Nice Côte d'Azur (NCE) — 25 min by train",flightBase:140,flightNA:680,flightAUS:1020,accommodation:[190,340,640],tickets:[220,520,1500],transport:40,nights:4,ticketLabels:["Harbour / public area","Tribune Grandstand","Paddock Club"],accumLabels:["Budget hotel Nice or Menton","3-star Nice city hotel","Monaco hotel (very limited)"]},
  {round:7,name:"Spanish Grand Prix",short:"Spain (Barcelona)",circuit:"Circuit de Barcelona-Catalunya",city:"Barcelona",country:"Spain",flag:"🇪🇸",dates:"12–14 Jun 2026",region:"europe",sprint:false,status:"upcoming",isNew:false,tip:"Excellent infrastructure and easy access — one of the best first-race choices for UK fans.",airport:"Barcelona El Prat (BCN) — 30 min",flightBase:120,flightNA:700,flightAUS:1050,accommodation:[90,165,310],tickets:[140,300,540],transport:25,nights:3,ticketLabels:["General Admission","Main / Repsol Grandstand","Paddock Club"],accumLabels:["Hostel or Granollers budget hotel","3-star Barcelona hotel","4-star central Barcelona"]},
  {round:8,name:"Austrian Grand Prix",short:"Austria",circuit:"Red Bull Ring",city:"Spielberg",country:"Austria",flag:"🇦🇹",dates:"26–28 Jun 2026",region:"europe",sprint:false,status:"upcoming",isNew:false,tip:"Camping is the preferred fan experience here — take the free shuttle from Zeltweg.",airport:"Graz (GRZ) — 45 min, or Salzburg (SZG) — 80 min",flightBase:150,flightNA:720,flightAUS:1080,accommodation:[75,135,250],tickets:[110,270,460],transport:15,nights:3,ticketLabels:["General Admission / Camping","Grandstand Silverstone / Orange","Premium Tribune"],accumLabels:["Circuit camping (recommended)","Guesthouse Zeltweg area","4-star Graz hotel"]},
  {round:9,name:"British Grand Prix",short:"Great Britain",circuit:"Silverstone Circuit",city:"Silverstone",country:"Great Britain",flag:"🇬🇧",dates:"4–6 Jul 2026",region:"europe",sprint:true,status:"upcoming",isNew:false,isUKRace:true,tip:"Sprint weekend. Always sells out — book as early as possible. Camping transforms the experience.",airport:"Birmingham (BHX) or London Heathrow (LHR) — 60 min by car",flightBase:0,flightNA:500,flightAUS:880,accommodation:[85,155,290],tickets:[220,460,800],transport:45,nights:3,ticketLabels:["General Admission (GA)","Club / Stowe Grandstand","Wing Hospitality"],accumLabels:["Circuit campsite","Towcester / Northampton hotel","Silverstone Hotel on-site"]},
  {round:10,name:"Belgian Grand Prix",short:"Belgium",circuit:"Circuit de Spa-Francorchamps",city:"Stavelot",country:"Belgium",flag:"🇧🇪",dates:"17–19 Jul 2026",region:"europe",sprint:false,status:"upcoming",isNew:false,tip:"The greatest circuit on the calendar. Pack waterproof gear — Spa weather is always unpredictable.",airport:"Brussels (BRU) — 90 min, Liège (LGG) — 60 min",flightBase:100,flightNA:680,flightAUS:1020,accommodation:[80,145,270],tickets:[130,290,500],transport:20,nights:3,ticketLabels:["General Admission","Raidillon Grandstand","VIP Village"],accumLabels:["Camping at circuit (recommended)","Liège budget hotel","Spa boutique hotel"]},
  {round:11,name:"Hungarian Grand Prix",short:"Hungary",circuit:"Hungaroring",city:"Budapest",country:"Hungary",flag:"🇭🇺",dates:"25–27 Jul 2026",region:"europe",sprint:false,status:"upcoming",isNew:false,tip:"Combine with Budapest city break — one of Europe's finest cities. Hot in late July.",airport:"Budapest Ferenc Liszt (BUD) — 30 min",flightBase:140,flightNA:710,flightAUS:1060,accommodation:[70,135,250],tickets:[120,270,420],transport:15,nights:3,ticketLabels:["General Admission","B / C Grandstand","Paddock Club"],accumLabels:["Budapest hostel / budget hotel","3-star Budapest central","4-star Buda hotel"]},
  {round:12,name:"Dutch Grand Prix",short:"Netherlands",circuit:"Circuit Zandvoort",city:"Zandvoort",country:"Netherlands",flag:"🇳🇱",dates:"21–23 Aug 2026",region:"europe",sprint:true,status:"upcoming",isNew:false,tip:"Sprint weekend. The final Dutch GP ever — no cars allowed on race weekend. Train only from Haarlem.",airport:"Amsterdam Schiphol (AMS) — 30 min by direct train",flightBase:90,flightNA:660,flightAUS:980,accommodation:[105,185,340],tickets:[170,350,620],transport:20,nights:3,ticketLabels:["General Admission","Tarzan / Main Grandstand","Hospitality Suite"],accumLabels:["Haarlem hostel / guesthouse","3-star Haarlem hotel","Amsterdam 4-star hotel"]},
  {round:13,name:"Italian Grand Prix",short:"Italy",circuit:"Autodromo Nazionale Monza",city:"Monza",country:"Italy",flag:"🇮🇹",dates:"4–6 Sep 2026",region:"europe",sprint:false,status:"upcoming",isNew:false,tip:"The Temple of Speed. Stay in Milan — 30 min by commuter train. The Tifosi atmosphere is like nothing else.",airport:"Milan Malpensa (MXP) or Linate (LIN) — 40 min",flightBase:130,flightNA:700,flightAUS:1040,accommodation:[90,160,310],tickets:[140,290,470],transport:20,nights:3,ticketLabels:["General Admission (Parabolica)","Curva Grande Grandstand","Paddock Club"],accumLabels:["Milan budget hotel (Navigli)","3-star Milan central","4-star Milan Duomo area"]},
  {round:14,name:"Madrid Grand Prix",short:"Madrid",circuit:"Circuit Urbano de Madrid",city:"Madrid",country:"Spain",flag:"🇪🇸",dates:"12–14 Sep 2026",region:"europe",sprint:false,status:"upcoming",isNew:true,tip:"Brand new circuit and event — attend the inaugural Madrid GP. Some infrastructure uncertainty expected.",airport:"Madrid Barajas (MAD) — 20–30 min",flightBase:130,flightNA:720,flightAUS:1060,accommodation:[95,170,300],tickets:[160,330,580],transport:25,nights:3,ticketLabels:["General Admission","Grandstand (TBC)","VIP Hospitality"],accumLabels:["Madrid budget hotel (Atocha)","3-star Madrid central","Gran Vía 4-star hotel"]},
  {round:15,name:"Azerbaijan Grand Prix",short:"Azerbaijan",circuit:"Baku City Circuit",city:"Baku",country:"Azerbaijan",flag:"🇦🇿",dates:"25–27 Sep 2026",region:"middle-east",sprint:false,status:"upcoming",isNew:false,tip:"Saturday race. eVisa is easy and cheap. Baku is massively underrated — brilliant street circuit through the old city.",airport:"Baku Heydar Aliyev (GYD) — 25 min",flightBase:380,flightNA:860,flightAUS:1120,accommodation:[70,135,250],tickets:[110,230,380],transport:15,nights:3,ticketLabels:["General Admission","Turn 1 / Castle Grandstand","Paddock Club"],accumLabels:["Old City guesthouse","3-star Baku central","Fairmont or similar 5-star"]},
  {round:16,name:"Singapore Grand Prix",short:"Singapore",circuit:"Marina Bay Street Circuit",city:"Singapore",country:"Singapore",flag:"🇸🇬",dates:"9–11 Oct 2026",region:"asia",sprint:true,status:"upcoming",isNew:false,tip:"Sprint weekend. Night race under the lit-up city skyline — the most visually spectacular event in F1.",airport:"Singapore Changi (SIN) — 25 min",flightBase:720,flightNA:1050,flightAUS:440,accommodation:[135,230,420],tickets:[250,520,900],transport:20,nights:3,ticketLabels:["Zone 4 General","Pit / Bay Grandstand","Paddock Club"],accumLabels:["Chinatown or Little India hotel","3-star Marina area","Marina Bay Sands or equivalent"]},
  {round:17,name:"United States Grand Prix",short:"USA (Austin)",circuit:"Circuit of The Americas",city:"Austin, Texas",country:"USA",flag:"🇺🇸",dates:"23–25 Oct 2026",region:"americas",sprint:false,status:"upcoming",isNew:false,tip:"Austin is a genuinely excellent host city. The Big Tex fan festival sets the benchmark for F1 events.",airport:"Austin-Bergstrom (AUS) — 25 min",flightBase:580,flightNA:190,flightAUS:1280,accommodation:[120,210,380],tickets:[190,390,700],transport:30,nights:3,ticketLabels:["General Admission","Turn 1 / Main Grandstand","Paddock Club"],accumLabels:["Austin budget motel","3-star East Austin hotel","4-star downtown Austin"]},
  {round:18,name:"Mexico City Grand Prix",short:"Mexico",circuit:"Autódromo Hermanos Rodríguez",city:"Mexico City",country:"Mexico",flag:"🇲🇽",dates:"30 Oct–1 Nov 2026",region:"americas",sprint:false,status:"upcoming",isNew:false,tip:"High altitude (2,240m) has dramatic effects on the cars. The Foro Sol stadium section is unique in F1.",airport:"Mexico City Benito Juárez (MEX) — 20 min",flightBase:620,flightNA:280,flightAUS:1380,accommodation:[80,150,280],tickets:[120,260,440],transport:15,nights:3,ticketLabels:["General Admission","Foro Sol Grandstand","Premium Club"],accumLabels:["Polanco or Roma budget hotel","3-star Polanco hotel","4-star Condesa hotel"]},
  {round:19,name:"São Paulo Grand Prix",short:"Brazil",circuit:"Autódromo José Carlos Pace",city:"São Paulo",country:"Brazil",flag:"🇧🇷",dates:"6–8 Nov 2026",region:"americas",sprint:false,status:"upcoming",isNew:false,tip:"Brazilian passion at Interlagos is extraordinary. Use official shuttles — avoid unofficial transport.",airport:"São Paulo Guarulhos (GRU) — 45 min",flightBase:700,flightNA:580,flightAUS:1450,accommodation:[70,130,250],tickets:[110,230,400],transport:20,nights:3,ticketLabels:["General Admission","Grandstand K (Turn 4)","Premium Hospitality"],accumLabels:["Vila Olímpia budget hotel","3-star Pinheiros hotel","4-star Jardins hotel"]},
  {round:20,name:"Las Vegas Grand Prix",short:"Las Vegas",circuit:"Las Vegas Strip Circuit",city:"Las Vegas",country:"USA",flag:"🇺🇸",dates:"20–21 Nov 2026",region:"americas",sprint:false,status:"upcoming",isNew:false,tip:"Saturday night race. Combine with 2–3 nights in Vegas. Late finish — plan your transport ahead.",airport:"Harry Reid International (LAS) — 15 min",flightBase:560,flightNA:180,flightAUS:1280,accommodation:[160,280,520],tickets:[270,550,1020],transport:20,nights:3,ticketLabels:["General Admission","Turn 1 Grandstand","FORMULA 1 Club Hospitality"],accumLabels:["Off-Strip hotel (budget)","Mid-Strip 3-star hotel","Bellagio / Wynn style resort"]},
  {round:21,name:"Qatar Grand Prix",short:"Qatar",circuit:"Lusail International Circuit",city:"Lusail",country:"Qatar",flag:"🇶🇦",dates:"27–29 Nov 2026",region:"middle-east",sprint:false,status:"upcoming",isNew:false,tip:"Night race in the desert. November is much cooler. Pairs perfectly with Abu Dhabi the following week.",airport:"Doha Hamad (DOH) — 15 min",flightBase:420,flightNA:920,flightAUS:780,accommodation:[90,165,320],tickets:[130,270,460],transport:20,nights:3,ticketLabels:["General Admission","Turn 1 / Main Grandstand","Platinum Lounge"],accumLabels:["Lusail or Doha budget hotel","3-star Doha West Bay","5-star Doha corniche hotel"]},
  {round:22,name:"Abu Dhabi Grand Prix",short:"Abu Dhabi",circuit:"Yas Marina Circuit",city:"Abu Dhabi",country:"UAE",flag:"🇦🇪",dates:"4–6 Dec 2026",region:"middle-east",sprint:false,status:"upcoming",isNew:false,tip:"The season finale. Excellent facilities throughout. Easily pairs with a few days in Dubai.",airport:"Abu Dhabi (AUH) or Dubai (DXB) — 35–40 min",flightBase:480,flightNA:960,flightAUS:820,accommodation:[110,200,380],tickets:[180,380,660],transport:25,nights:3,ticketLabels:["General Admission","Yas Marina Grandstand","Paddock Club"],accumLabels:["Yas Island budget hotel","3-star Yas Island hotel","Yas Viceroy or equivalent"]}
]

const clusters = [
  {id:'uk-south',label:'London & South East',sub:'LHR, LGW, STN, LTN, SEN'},
  {id:'uk-midlands',label:'Midlands & East',sub:'BHX, EMA, NWI'},
  {id:'uk-north',label:'North England',sub:'MAN, LBA, LPL, NCL'},
  {id:'uk-scotland',label:'Scotland & N. Ireland',sub:'EDI, GLA, BFS'},
  {id:'uk-wales',label:'Wales & South West',sub:'CWL, BRS, EXT'},
  {id:'ireland',label:'Ireland',sub:'DUB, ORK, SNN'},
  {id:'w-europe',label:'Western Europe',sub:'AMS, CDG, FRA, BCN'},
  {id:'e-europe',label:'Central & East Europe',sub:'VIE, PRG, WAW, BUD'},
  {id:'scandinavia',label:'Scandinavia',sub:'CPH, ARN, HEL, OSL'},
  {id:'n-america',label:'North America',sub:'JFK, LAX, ORD, YYZ'},
  {id:'australia',label:'Australia & NZ',sub:'SYD, MEL, BNE, AKL'},
  {id:'other',label:'Rest of World',sub:'Middle East, Asia, Africa'}
]

const clusterMult = {'uk-south':1.00,'uk-midlands':1.08,'uk-north':1.12,'uk-scotland':1.15,'uk-wales':1.10,'ireland':0.97,'w-europe':0.60,'e-europe':0.70,'scandinavia':0.82,'n-america':null,'australia':null,'other':0.95}
const UK_CLUSTERS = ['uk-south','uk-midlands','uk-north','uk-scotland','uk-wales','ireland']

function fmt(n) { return '£' + Math.round(n).toLocaleString('en-GB') }
function regionLabel(r) { return {europe:'Europe',americas:'Americas',asia:'Asia & Pacific','middle-east':'Middle East'}[r] || r }

function getFlightCost(race, dep) {
  if (!dep) return null
  if (race.isUKRace && UK_CLUSTERS.includes(dep)) return 0
  if (dep === 'n-america') return race.flightNA
  if (dep === 'australia') return race.flightAUS
  return Math.round(race.flightBase * (clusterMult[dep] || 1))
}

function calcCost(race, est) {
  if (!est.departure) return null
  const fm = getFlightCost(race, est.departure)
  const fl = {mid:fm,low:fm===0?0:Math.round(fm*0.86),high:fm===0?0:Math.round(fm*1.16),included:est.incFlights,isLocal:fm===0}
  const tm = race.tickets[est.ticketTier]
  const tk = {mid:tm,low:Math.round(tm*0.95),high:Math.round(tm*1.08),included:est.incTickets}
  const nm = race.accommodation[est.accumTier]*race.nights
  const ac = {mid:nm,low:Math.round(nm*0.88),high:Math.round(nm*1.14),included:est.incAccom,nights:race.nights}
  const tr = {mid:race.transport,low:race.transport,high:race.transport,included:true}
  const g = o => o.included ? o.mid : 0
  const ppMid = g(fl)+g(tk)+g(ac)+tr.mid
  const ppLow = (fl.included?fl.low:0)+(tk.included?tk.low:0)+(ac.included?ac.low:0)+tr.low
  const ppHigh = (fl.included?fl.high:0)+(tk.included?tk.high:0)+(ac.included?ac.high:0)+tr.high
  const pct = v => ppMid===0?0:Math.round(v/ppMid*100)
  return {flight:fl,ticket:tk,accom:ac,transport:tr,ppMid,ppLow,ppHigh,totalMid:ppMid*est.party,totalLow:ppLow*est.party,totalHigh:ppHigh*est.party,pct:{flight:pct(g(fl)),ticket:pct(g(tk)),accom:pct(g(ac)),transport:pct(tr.mid)}}
}

const ArrowIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
const BackIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
const CalIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{opacity:0.4,flexShrink:0}}><rect x="1" y="1.5" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.4"/><path d="M1 5h12" stroke="currentColor" strokeWidth="1.4"/><path d="M4.5 0v2M9.5 0v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>

function RaceCard({race, selected, onClick}) {
  return (
    <div className={['race-card',race.status,selected?'selected':''].filter(Boolean).join(' ')} onClick={()=>onClick(race.round)}>
      <div className="race-card-top">
        <span className="race-round">Round {race.round}</span>
        <div className="race-badges">
          {race.status==='next'&&<span className="race-badge next">Next Race</span>}
          {race.sprint&&<span className="race-badge sprint">Sprint</span>}
          {race.isNew&&<span className="race-badge new-circuit">New Circuit</span>}
          {race.status==='completed'&&<span className="race-badge done">Done</span>}
        </div>
      </div>
      <div className="race-flag">{race.flag}</div>
      <div className="race-name">{race.short}</div>
      <div className="race-circuit">{race.circuit}</div>
      <div className="race-date"><CalIcon/>{race.dates}</div>
      <div className="race-card-footer">
        <span className="region-tag">{regionLabel(race.region)}</span>
        <span className="plan-btn">{race.status==='completed'?'View info':'Plan this race'}<ArrowIcon/></span>
      </div>
    </div>
  )
}

function DetailHeader({race, onClose}) {
  return (
    <div className="detail-header">
      <div>
        <div className="detail-flag">{race.flag}</div>
        <div className="detail-title">{race.name}</div>
        <div className="detail-sub">{race.circuit + ' · ' + race.city + ', ' + race.country}</div>
        <div className="detail-meta">
          <div className="detail-meta-item"><span className="detail-meta-label">Race Weekend</span><span className="detail-meta-value">{race.dates}</span></div>
          <div className="detail-meta-item"><span className="detail-meta-label">Round</span><span className="detail-meta-value">{race.round + ' of 22'}</span></div>
          <div className="detail-meta-item"><span className="detail-meta-label">Tickets from</span><span className="detail-meta-value">{fmt(race.tickets[0])}</span></div>
          <div className="detail-meta-item"><span className="detail-meta-label">Nearest Airport</span><span className="detail-meta-value">{race.airport.split('—')[0].trim()}</span></div>
        </div>
      </div>
      <button className="close-btn" onClick={onClose}>✕</button>
    </div>
  )
}

// ← ADDED: onOpenTransport prop wired in, Local Transport card made live
function Modules({race, onOpenEstimator, onOpenVisa, onOpenGrandstand, onOpenFlight, onOpenTransport}) {
  return (
    <>
      <div className="modules-grid">
        <div className="module-card" onClick={onOpenEstimator}>
          <div className="module-icon">💷</div>
          <div className="module-title">Cost Estimator</div>
          <div className="module-desc">Build a full trip budget in minutes. Flights, hotel, tickets, and transport — broken down by your choices.</div>
          <div className="module-cta">Estimate my costs <ArrowIcon/></div>
        </div>
        <div className="module-card" onClick={onOpenVisa}>
          <div className="module-icon">🛂</div>
          <div className="module-title">Visa Checker</div>
          <div className="module-desc">{'Instant entry requirements for ' + race.country + ' based on your passport. 25 nationalities covered.'}</div>
          <div className="module-cta">Check requirements <ArrowIcon/></div>
        </div>
        <div className="module-card" onClick={onOpenGrandstand}>
          <div className="module-icon">🏟️</div>
          <div className="module-title">Grandstand Picker</div>
          <div className="module-desc">{'Compare every grandstand at ' + race.circuit + ' — views, pricing tiers, and expert tips for every budget.'}</div>
          <div className="module-cta">Explore grandstands <ArrowIcon/></div>
        </div>
        <div className="module-card" onClick={onOpenFlight}>
          <div className="module-icon">✈️</div>
          <div className="module-title">Flight Guide</div>
          <div className="module-desc">{'Best airports, booking windows, routing from the UK, and pricing tips for ' + race.country + '.'}</div>
          <div className="module-cta">Plan my flights <ArrowIcon/></div>
        </div>
        <div className="module-card" onClick={onOpenTransport}>
          <div className="module-icon">🗺️</div>
          <div className="module-title">Local Transport</div>
          <div className="module-desc">{'Every option to get to and from ' + race.circuit + ' — day by day guidance and insider tips.'}</div>
          <div className="module-cta">Plan my transport <ArrowIcon/></div>
        </div>
        {[
          {icon:'📋',title:'Build Itinerary',desc:'Compile everything into a shareable, printable race weekend plan.',cta:'Build my itinerary'},
        ].map(m=>(
          <div key={m.title} className="module-card coming-soon">
            <span className="coming-chip">Coming Soon</span>
            <div className="module-icon">{m.icon}</div>
            <div className="module-title">{m.title}</div>
            <div className="module-desc">{m.desc}</div>
            <div className="module-cta" style={{color:'var(--text-dim)'}}>{m.cta}</div>
          </div>
        ))}
      </div>
      <div className="tip-bar"><p>{'💡 '}<strong style={{color:'var(--text)',fontWeight:500}}>Expert tip:</strong>{' ' + race.tip}</p></div>
    </>
  )
}

function Results({race, est, c}) {
  if (!c) return <div className="results-waiting"><div className="results-waiting-icon">✈️</div><p>Select your departure region above to see your cost estimate</p></div>
  const isUKHome = race.isUKRace && UK_CLUSTERS.includes(est.departure)
  const partyLabel = est.party===1?'per person':'for ' + est.party + ' people'
  const depName = clusters.find(cl=>cl.id===est.departure)?.label||'your region'
  const tot = Math.max(c.pct.flight+c.pct.ticket+c.pct.accom+c.pct.transport,1)
  const w = (v,inc) => inc?(v/tot*100).toFixed(1):0
  const BRow = ({color,label,sub,mid,low,high,included,showRange}) => (
    <div className={`breakdown-row${!included?' excluded':''}`}>
      <div className="breakdown-left"><div className="breakdown-dot" style={{background:color}}/><div><div className="breakdown-label">{label}</div><div className="breakdown-sublabel">{sub}</div></div></div>
      <div className="breakdown-amount"><div className="breakdown-mid">{included?fmt(mid):'—'}</div>{included&&showRange&&mid>0&&<div className="breakdown-range">{fmt(low) + ' – ' + fmt(high)}</div>}</div>
    </div>
  )
  return (
    <>
      <div className="results-header">
        <div className="results-total-label">{'Estimated total ' + partyLabel}</div>
        <div className="results-total">{fmt(c.totalMid)}</div>
        <div className="results-range" style={{marginTop:'6px'}}>Typically <span>{fmt(c.totalLow)}</span>{' – '}<span>{fmt(c.totalHigh)}</span></div>
        {est.party>1&&<div className="results-range" style={{marginTop:'4px'}}>{'Per person approx. '}<span>{fmt(c.ppMid)}</span></div>}
      </div>
      <div>
        <div className="results-bar-wrap">
          <div className="results-bar-seg bar-flight" style={{width:w(c.pct.flight,c.flight.included&&!isUKHome)+'%'}}/>
          <div className="results-bar-seg bar-ticket" style={{width:w(c.pct.ticket,c.ticket.included)+'%'}}/>
          <div className="results-bar-seg bar-accom"  style={{width:w(c.pct.accom,c.accom.included)+'%'}}/>
          <div className="results-bar-seg bar-transport" style={{width:w(c.pct.transport,true)+'%'}}/>
        </div>
        <div className="results-bar-legend">
          {c.flight.included&&!isUKHome&&<div className="legend-item"><div className="legend-dot" style={{background:'#3B82F6'}}/>{'Flights (' + c.pct.flight + '%)'}</div>}
          {c.ticket.included&&<div className="legend-item"><div className="legend-dot" style={{background:'#E8002D'}}/>{'Tickets (' + c.pct.ticket + '%)'}</div>}
          {c.accom.included&&<div className="legend-item"><div className="legend-dot" style={{background:'#F59E0B'}}/>{'Hotel (' + c.pct.accom + '%)'}</div>}
          <div className="legend-item"><div className="legend-dot" style={{background:'#22C55E'}}/>{'Transport (' + c.pct.transport + '%)'}</div>}
        </div>
      </div>
      <div className="results-breakdown">
        <BRow color="#3B82F6" label={isUKHome?'Local Travel':'Return Flights'} sub={isUKHome?'Included in transport cost below':'Per person from ' + depName} mid={c.flight.mid} low={c.flight.low} high={c.flight.high} included={c.flight.included&&!isUKHome} showRange/>
        <BRow color="#E8002D" label={['Standard','Advanced','Premium'][est.ticketTier]+' Tickets'} sub={race.ticketLabels[est.ticketTier]} mid={c.ticket.mid} low={c.ticket.low} high={c.ticket.high} included={c.ticket.included} showRange/>
        <BRow color="#F59E0B" label={'Accommodation (' + c.accom.nights + ' nights)'} sub={race.accumLabels[est.accumTier]} mid={c.accom.mid} low={c.accom.low} high={c.accom.high} included={c.accom.included} showRange/>
        <BRow color="#22C55E" label="Local Transport" sub="Return travel to circuit (per person)" mid={c.transport.mid} low={c.transport.low} high={c.transport.high} included showRange={false}/>
      </div>
      <div className="results-disclaimer">Costs are approximate estimates based on advance bookings (3+ months). Prices vary by date, availability and season. Always verify current prices before booking.</div>
      <div className="results-actions">
        <a className="results-action-btn results-action-primary" href="https://www.skyscanner.net" target="_blank" rel="noopener noreferrer">Search Flights on Skyscanner ↗</a>
        <a className="results-action-btn results-action-secondary" href="https://www.booking.com" target="_blank" rel="noopener noreferrer">Browse Hotels on Booking.com ↗</a>
      </div>
    </>
  )
}

function Estimator({race, onBack}) {
  const [est, setEst] = useState({departure:null,party:2,ticketTier:1,accumTier:1,incFlights:true,incTickets:true,incAccom:true})
  const isUKHome = race.isUKRace && UK_CLUSTERS.includes(est.departure)
  const c = calcCost(race, est)
  const set = (key,val) => setEst(prev=>({...prev,[key]:val}))
  const toggleInc = key => { if(key==='incFlights'&&isUKHome)return; setEst(prev=>({...prev,[key]:!prev[key]})) }
  return (
    <div className="estimator-wrap">
      <div className="est-topbar">
        <button className="est-back" onClick={onBack}><BackIcon/>Back to options</button>
        <div style={{textAlign:'right'}}><div className="est-title">Cost Estimator</div><div className="est-subtitle">Approximate costs — advance bookings assumed</div></div>
      </div>
      <div className="est-body">
        <div className="est-controls">
          <div>
            <div className="est-section-label">Where are you travelling from?</div>
            <div className="cluster-grid">
              {clusters.map(cl=><button key={cl.id} className={'cluster-btn' + (est.departure===cl.id?' active':'')} onClick={()=>set('departure',cl.id)}><span className="cb-label">{cl.label}</span><span className="cb-sub">{cl.sub}</span></button>)}
            </div>
          </div>
          <div>
            <div className="est-section-label">How many people?</div>
            <div className="party-row">
              {[1,2,3,4].map(n=><button key={n} className={'party-btn' + (est.party===n?' active':'')} onClick={()=>set('party',n)}>{n}{n===4?'+':''}</button>)}
            </div>
          </div>
          <div>
            <div className="est-section-label">Ticket preference</div>
            <div className="tier-grid">
              {race.ticketLabels.map((label,i)=><button key={i} className={'tier-btn' + (est.ticketTier===i?' active':'')} onClick={()=>set('ticketTier',i)}><div className="tier-btn-left"><span className="tier-btn-name">{['Standard','Advanced','Premium'][i]}</span><span className="tier-btn-desc">{label}</span></div><span className="tier-btn-price">{fmt(race.tickets[i])}</span></button>)}
            </div>
          </div>
          <div>
            <div className="est-section-label">{'Accommodation (' + race.nights + ' nights)'}</div>
            <div className="tier-grid">
              {race.accumLabels.map((label,i)=><button key={i} className={'tier-btn' + (est.accumTier===i?' active':'')} onClick={()=>set('accumTier',i)}><div className="tier-btn-left"><span className="tier-btn-name">{['Standard','Advanced','Premium'][i]}</span><span className="tier-btn-desc">{label}</span></div><span className="tier-btn-price">{fmt(race.accommodation[i])}<span style={{fontSize:'11px',color:'var(--text-dim)'}}>/night</span></span></button>)}
            </div>
          </div>
          <div>
            <div className="est-section-label">What to include</div>
            <div className="toggle-row">
              {isUKHome?(
                <div className="toggle-item disabled-item"><div><div className="toggle-label">Flights / Travel</div><div className="toggle-sub">Local race — included in transport cost</div></div><div className="toggle-switch on"/></div>
              ):(
                <div className="toggle-item" onClick={()=>toggleInc('incFlights')}><div><div className="toggle-label">Flights</div><div className="toggle-sub">Return flights from your departure region</div></div><div className={'toggle-switch' + (est.incFlights?' on':'')}/></div>
              )}
              <div className="toggle-item" onClick={()=>toggleInc('incTickets')}><div><div className="toggle-label">Race Tickets</div><div className="toggle-sub">Already have tickets? Toggle off</div></div><div className={'toggle-switch' + (est.incTickets?' on':'')}/></div>
              <div className="toggle-item" onClick={()=>toggleInc('incAccom')}><div><div className="toggle-label">Accommodation</div><div className="toggle-sub">Already booked? Toggle off</div></div><div className={'toggle-switch' + (est.incAccom?' on':'')}/></div>
            </div>
          </div>
        </div>
        <div className="est-results"><Results race={race} est={est} c={c}/></div>
      </div>
    </div>
  )
}

export default function Plan() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedRound, setSelectedRound] = useState(null)
  const [estimatorOpen, setEstimatorOpen] = useState(false)
  const [visaOpen, setVisaOpen] = useState(false)
  const [grandstandOpen, setGrandstandOpen] = useState(false)
  const [flightOpen, setFlightOpen] = useState(false)
  const [transportOpen, setTransportOpen] = useState(false) // ← ADDED
  const detailRef = useRef(null)
  const filtered = races.filter(r=>{
    if(activeFilter==='all')return true
    if(activeFilter==='sprint')return r.sprint
    if(activeFilter==='upcoming')return r.status!=='completed'
    return r.region===activeFilter
  })
  const selectedRace = races.find(r=>r.round===selectedRound)
  function selectRace(round) {
    setSelectedRound(round); setEstimatorOpen(false); setVisaOpen(false); setGrandstandOpen(false); setFlightOpen(false); setTransportOpen(false) // ← ADDED reset
    setTimeout(()=>detailRef.current?.scrollIntoView({behavior:'smooth',block:'start'}),50)
  }
  function closePanel() { setSelectedRound(null); setEstimatorOpen(false); setVisaOpen(false); setGrandstandOpen(false); setFlightOpen(false); setTransportOpen(false) } // ← ADDED reset
  const filters = [{id:'all',label:'All 22 Races'},{id:'europe',label:'Europe'},{id:'americas',label:'Americas'},{id:'asia',label:'Asia & Pacific'},{id:'middle-east',label:'Middle East'},{id:'sprint',label:'Sprint Weekends'},{id:'upcoming',label:'Upcoming Only'}]
  return (
    <>
      <nav className="sticky-nav" style={{padding:'16px 40px'}}>
        <Link to="/" className="nav-logo"><div className="logo-mark">GP</div>Grand Prix Planner</Link>
        <div className="nav-right">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/" className="nav-btn">Get Early Access</Link>
        </div>
      </nav>
      <div className="page-header">
        <div className="page-header-inner">
          <div className="breadcrumb"><Link to="/">Home</Link><span>›</span><span>Plan a Race</span></div>
          <h1>Choose Your<br/><em>2026 Grand Prix</em></h1>
          <p>Select a race below to start building your perfect race weekend — tickets, travel, accommodation and everything in between.</p>
          <div className="stats-row">
            <div className="stat-item"><span className="stat-dot next"/><span>Next race: Miami — 1–3 May</span></div>
            <div className="stat-item"><span className="stat-dot sprint"/><span>Sprint weekend</span></div>
            <div className="stat-item"><span className="stat-dot upcoming"/><span>Upcoming</span></div>
            <div className="stat-item"><span className="stat-dot completed"/><span>Completed</span></div>
          </div>
        </div>
      </div>
      <div className="filters-bar">
        <span className="filter-label">Filter:</span>
        {filters.map(f=><button key={f.id} className={'filter-btn' + (activeFilter===f.id?' active':'')} onClick={()=>setActiveFilter(f.id)}>{f.label}</button>)}
      </div>
      <div className="main">
        {!selectedRace?(
          <div className="pick-prompt"><div className="pick-prompt-icon">🏁</div><h3>Pick a Race to Start Planning</h3><p>Select any Grand Prix from the calendar below to see planning options, cost estimates, and travel information.</p></div>
        ):(
          <div className="detail-panel" ref={detailRef}>
            <DetailHeader race={selectedRace} onClose={closePanel}/>
            {estimatorOpen
              ? <Estimator race={selectedRace} onBack={()=>setEstimatorOpen(false)}/>
              : visaOpen
                ? <VisaChecker race={selectedRace} onBack={()=>setVisaOpen(false)}/>
                : grandstandOpen
                  ? <GrandstandPicker race={selectedRace} onBack={()=>setGrandstandOpen(false)}/>
                  : flightOpen
                    ? <FlightGuide race={selectedRace} onBack={()=>setFlightOpen(false)}/>
                    : transportOpen
                      ? <LocalTransport race={selectedRace} onBack={()=>setTransportOpen(false)}/> // ← ADDED
                      : <Modules
                          race={selectedRace}
                          onOpenEstimator={()=>setEstimatorOpen(true)}
                          onOpenVisa={()=>setVisaOpen(true)}
                          onOpenGrandstand={()=>setGrandstandOpen(true)}
                          onOpenFlight={()=>setFlightOpen(true)}
                          onOpenTransport={()=>setTransportOpen(true)}
                        />
            }
          </div>
        )}
        <div>
          <div className="section-heading"><h2>2026 Season Calendar</h2><span className="race-count">{filtered.length + ' race' + (filtered.length!==1?'s':'')}</span></div>
          <div className="race-grid">
            {filtered.map(race=><RaceCard key={race.round} race={race} selected={selectedRound===race.round} onClick={selectRace}/>)}
          </div>
        </div>
      </div>
    </>
  )
}
