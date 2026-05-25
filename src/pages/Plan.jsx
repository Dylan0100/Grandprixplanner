import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import VisaChecker from '../components/VisaChecker'
import GrandstandPicker from '../components/GrandstandPicker'
import FlightGuide from '../components/FlightGuide'
import LocalTransport from '../components/LocalTransport'
import Itinerary from '../components/Itinerary'

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
  {round:22,name:"Abu Dhabi Grand Prix",short:"Abu Dhabi",circuit:"Yas Marina Circuit",city:"Abu Dhabi",country:"UAE",flag:"🇦🇪",dates:"4–6 Dec 2026",region:"middle-east",sprint:false,status:"upcoming",isNew:false,tip:"The season finale. Excellent facilities throughout. Easily pairs with a few days in Dubai.",airport:"Abu Dhabi (AUH) or Dubai (DXB) — 35–40 min",flightBase:480,flightNA:960,flightAUS:820,accommodation:[110,200,380],tickets:[180,380,660],transport:25,nights:3,ticketLabels:["General Admission","Yas Marina Grandstand","Paddock Club"],accumLabels:["Yas Island budget hotel","3-star Yas Island hotel","Yas Viceroy or equivalent"]},
]

const departureCities = [
  {group:'UK — South & London',cities:[{label:'London (Heathrow / Gatwick)',cluster:'uk-south'},{label:'London (Stansted / Luton / City)',cluster:'uk-south'},{label:'Southampton / Bournemouth',cluster:'uk-south'}]},
  {group:'UK — Midlands & East',cities:[{label:'Birmingham',cluster:'uk-midlands'},{label:'East Midlands (Derby / Leicester / Nottingham)',cluster:'uk-midlands'},{label:'Norwich / Cambridge',cluster:'uk-midlands'}]},
  {group:'UK — North England',cities:[{label:'Manchester',cluster:'uk-north'},{label:'Liverpool',cluster:'uk-north'},{label:'Leeds / Bradford',cluster:'uk-north'},{label:'Newcastle',cluster:'uk-north'},{label:'Sheffield / Doncaster',cluster:'uk-north'}]},
  {group:'UK — Scotland & Northern Ireland',cities:[{label:'Edinburgh',cluster:'uk-scotland'},{label:'Glasgow',cluster:'uk-scotland'},{label:'Belfast',cluster:'uk-scotland'},{label:'Aberdeen / Inverness',cluster:'uk-scotland'}]},
  {group:'UK — Wales & South West',cities:[{label:'Bristol',cluster:'uk-wales'},{label:'Cardiff',cluster:'uk-wales'},{label:'Exeter / Plymouth',cluster:'uk-wales'}]},
  {group:'Ireland',cities:[{label:'Dublin',cluster:'ireland'},{label:'Cork',cluster:'ireland'},{label:'Shannon',cluster:'ireland'}]},
  {group:'Western Europe',cities:[{label:'Amsterdam',cluster:'w-europe'},{label:'Paris',cluster:'w-europe'},{label:'Frankfurt / Munich',cluster:'w-europe'},{label:'Barcelona',cluster:'w-europe'},{label:'Madrid',cluster:'w-europe'},{label:'Rome / Milan',cluster:'w-europe'},{label:'Brussels',cluster:'w-europe'},{label:'Zurich / Geneva',cluster:'w-europe'},{label:'Lisbon',cluster:'w-europe'}]},
  {group:'Central & Eastern Europe',cities:[{label:'Vienna',cluster:'e-europe'},{label:'Prague',cluster:'e-europe'},{label:'Warsaw',cluster:'e-europe'},{label:'Budapest',cluster:'e-europe'},{label:'Bucharest',cluster:'e-europe'},{label:'Athens',cluster:'e-europe'}]},
  {group:'Scandinavia',cities:[{label:'Copenhagen',cluster:'scandinavia'},{label:'Stockholm',cluster:'scandinavia'},{label:'Oslo',cluster:'scandinavia'},{label:'Helsinki',cluster:'scandinavia'}]},
  {group:'North America',cities:[{label:'New York',cluster:'n-america'},{label:'Los Angeles',cluster:'n-america'},{label:'Chicago',cluster:'n-america'},{label:'Toronto / Montreal',cluster:'n-america'},{label:'Miami',cluster:'n-america'},{label:'Dallas / Houston',cluster:'n-america'}]},
  {group:'Australia & New Zealand',cities:[{label:'Sydney',cluster:'australia'},{label:'Melbourne',cluster:'australia'},{label:'Brisbane',cluster:'australia'},{label:'Auckland',cluster:'australia'},{label:'Perth',cluster:'australia'}]},
  {group:'Rest of World',cities:[{label:'Dubai / Abu Dhabi',cluster:'other'},{label:'Singapore',cluster:'other'},{label:'Tokyo',cluster:'other'},{label:'Johannesburg',cluster:'other'},{label:'Sao Paulo',cluster:'other'}]},
]

const passports = [
  {id:'gb',label:'United Kingdom'},{id:'us',label:'United States'},{id:'au',label:'Australia'},
  {id:'ca',label:'Canada'},{id:'nz',label:'New Zealand'},{id:'ie',label:'Ireland'},
  {id:'de',label:'Germany'},{id:'fr',label:'France'},{id:'nl',label:'Netherlands'},
  {id:'be',label:'Belgium'},{id:'es',label:'Spain'},{id:'it',label:'Italy'},
  {id:'pt',label:'Portugal'},{id:'se',label:'Sweden'},{id:'no',label:'Norway'},
  {id:'dk',label:'Denmark'},{id:'fi',label:'Finland'},{id:'ch',label:'Switzerland'},
  {id:'at',label:'Austria'},{id:'pl',label:'Poland'},{id:'br',label:'Brazil'},
  {id:'mx',label:'Mexico'},{id:'jp',label:'Japan'},{id:'sg',label:'Singapore'},
  {id:'za',label:'South Africa'},
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
  const tm = (est.ticketPriceOverride !== null && est.ticketPriceOverride !== undefined) ? est.ticketPriceOverride : race.tickets[est.ticketTier]
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
const CalIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{opacity:0.4,flexShrink:0}}><rect x="1" y="1.5" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.4"/><path d="M1 5h12" stroke="currentColor" strokeWidth="1.4"/><path d="M4.5 0v2M9.5 0v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>

function RaceCard({race, selected, onClick}) {
  return (
    <div className={['race-card',race.status,selected?'selected':''].filter(Boolean).join(' ')} onClick={()=>onClick(race.round)}>
      <div className="race-card-top">
        <span className="race-round">R{race.round}</span>
        <div className="race-badges">
          {race.status==='next'&&<span className="race-badge next">Next</span>}
          {race.sprint&&<span className="race-badge sprint">Sprint</span>}
          {race.isNew&&<span className="race-badge new-circuit">New</span>}
          {race.status==='completed'&&<span className="race-badge done">Done</span>}
        </div>
      </div>
      <div className="race-flag">{race.flag}</div>
      <div className="race-name">{race.short}</div>
      <div className="race-circuit">{race.circuit}</div>
      <div className="race-date"><CalIcon/>{race.dates}</div>
      <div className="race-card-footer">
        <span className="region-tag">{regionLabel(race.region)}</span>
        <span className="plan-btn">{race.status==='completed'?'View':'Plan'}<ArrowIcon/></span>
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

function TripInputs({trip, onSet}) {
  function handleCityChange(e) {
    if (!e.target.value) { onSet('departureCity', null); return }
    for (var i = 0; i < departureCities.length; i++) {
      var found = departureCities[i].cities.find(function(c) { return c.label === e.target.value })
      if (found) { onSet('departureCity', found); return }
    }
  }
  return (
    <div className="trip-inputs">
      <div className="trip-inputs-eyebrow">Your Trip Details</div>
      <div className="trip-inputs-row">
        <div className="trip-input-group trip-input-wide">
          <label className="trip-input-label">Flying from</label>
          <select className="trip-select" value={trip.departureCity ? trip.departureCity.label : ''} onChange={handleCityChange}>
            <option value="">Select city or airport...</option>
            {departureCities.map(function(g) {
              return (
                <optgroup key={g.group} label={g.group}>
                  {g.cities.map(function(city) { return <option key={city.label} value={city.label}>{city.label}</option> })}
                </optgroup>
              )
            })}
          </select>
        </div>
        <div className="trip-input-group trip-input-wide">
          <label className="trip-input-label">Passport / nationality</label>
          <select className="trip-select" value={trip.passport || ''} onChange={function(e) { onSet('passport', e.target.value || null) }}>
            <option value="">Select nationality...</option>
            {passports.map(function(p) { return <option key={p.id} value={p.id}>{p.label}</option> })}
          </select>
        </div>
        <div className="trip-input-group">
          <label className="trip-input-label">Party size</label>
          <div className="trip-party-row">
            {[1,2,3,4].map(function(n) {
              return (
                <button key={n} className={'trip-party-btn' + (trip.party === n ? ' active' : '')} onClick={function() { onSet('party', n) }}>
                  {n}{n === 4 ? '+' : ''}
                </button>
              )
            })}
          </div>
        </div>
      </div>
      <div className="trip-inputs-note">All fields optional — fill in what you know to personalise cost estimates and visa information</div>
    </div>
  )
}

function SectionNav({navRef}) {
  var sections = [
    {id:'sec-grandstands',icon:'🏟️',label:'Grandstands'},
    {id:'sec-flights',icon:'✈️',label:'Flights'},
    {id:'sec-accom',icon:'🏨',label:'Hotels'},
    {id:'sec-transport',icon:'🗺️',label:'Transport'},
    {id:'sec-itinerary',icon:'📋',label:'Itinerary'},
    {id:'sec-visa',icon:'🛂',label:'Visa'},
  ]
  function scrollTo(id) {
    var el = document.getElementById(id)
    if (el) el.scrollIntoView({behavior:'smooth',block:'start'})
  }
  return (
    <div className="section-nav-row" ref={navRef}>
      {sections.map(function(s) {
        return (
          <button key={s.id} className="section-nav-btn" onClick={function() { scrollTo(s.id) }}>
            <span className="snb-icon">{s.icon}</span>
            <span className="snb-label">{s.label}</span>
          </button>
        )
      })}
    </div>
  )
}

function PlanSectionHeading({number, icon, title, sub}) {
  var num = number < 10 ? '0' + number : '' + number
  return (
    <div className="psh">
      <span className="psh-num">{num}</span>
      <span className="psh-icon">{icon}</span>
      <div className="psh-text">
        <div className="psh-title">{title}</div>
        {sub && <div className="psh-sub">{sub}</div>}
      </div>
    </div>
  )
}

function CostRow({color, label, sub, mid, low, high, included, noRange}) {
  return (
    <div className={'cost-row' + (!included ? ' excluded' : '')}>
      <div className="cost-row-left">
        <div className="cost-row-dot" style={{background:color}}/>
        <div>
          <div className="cost-row-label">{label}</div>
          <div className="cost-row-sub">{sub}</div>
        </div>
      </div>
      <div className="cost-row-right">
        <div className="cost-row-mid">{included ? fmt(mid) : '—'}</div>
        {included && !noRange && mid > 0 && <div className="cost-row-range">{fmt(low) + ' – ' + fmt(high)}</div>}
      </div>
    </div>
  )
}

function CostPanel({race, trip, onSet, c, selectedGrandstand, onClearGrandstand}) {
  var isUKHome = race.isUKRace && UK_CLUSTERS.includes(trip.departureCity ? trip.departureCity.cluster : '')
  var depLabel = trip.departureCity ? trip.departureCity.label : ''
  var tot = c ? Math.max(c.pct.flight + c.pct.ticket + c.pct.accom + c.pct.transport, 1) : 1
  var w = function(v, inc) { return inc ? (v / tot * 100).toFixed(1) : 0 }
  var partyLabel = trip.party === 1 ? 'per person' : 'for ' + trip.party + ' people'
  var ticketLabel = selectedGrandstand ? selectedGrandstand.name : (['Standard','Advanced','Premium'][trip.ticketTier] + ' Tickets')
  var ticketSub = selectedGrandstand ? 'Selected grandstand' : race.ticketLabels[trip.ticketTier]
  function toggleInc(key) {
    if (key === 'incFlights' && isUKHome) return
    onSet(key, !trip[key])
  }
  return (
    <div className="cost-panel">
      <div className="cost-panel-header">
        <div className="cost-panel-title">Trip Cost Estimate</div>
        <div className="cost-panel-sub">Updates live as you plan</div>
      </div>
      {!trip.departureCity ? (
        <div className="cost-panel-empty">
          <div className="cost-panel-empty-icon">✈️</div>
          <p>Select your departure city above to see your personalised cost estimate</p>
        </div>
      ) : (
        <>
          <div className="cost-panel-total">
            <div className="cost-panel-total-label">{'Estimated total ' + partyLabel}</div>
            <div className="cost-panel-total-amount">{fmt(c.totalMid)}</div>
            <div className="cost-panel-total-range">{'Range: '}<span>{fmt(c.totalLow)}</span>{' – '}<span>{fmt(c.totalHigh)}</span></div>
            {trip.party > 1 && <div className="cost-panel-per-person">{'~' + fmt(c.ppMid) + ' per person'}</div>}
          </div>
          <div className="cost-bar-outer">
            <div className="cost-bar-wrap">
              <div className="cost-bar-seg bar-flight"    style={{width:w(c.pct.flight,    c.flight.included && !isUKHome) + '%'}}/>
              <div className="cost-bar-seg bar-ticket"   style={{width:w(c.pct.ticket,   c.ticket.included) + '%'}}/>
              <div className="cost-bar-seg bar-accom"    style={{width:w(c.pct.accom,    c.accom.included) + '%'}}/>
              <div className="cost-bar-seg bar-transport" style={{width:w(c.pct.transport, true) + '%'}}/>
            </div>
          </div>
          <div className="cost-breakdown">
            <CostRow color="#3B82F6" label={isUKHome ? 'Local Travel' : 'Return Flights'} sub={isUKHome ? 'Local race — no flights needed' : ('From ' + depLabel)} mid={c.flight.mid} low={c.flight.low} high={c.flight.high} included={c.flight.included && !isUKHome}/>
            <CostRow color="#E8002D" label={ticketLabel} sub={ticketSub} mid={c.ticket.mid} low={c.ticket.low} high={c.ticket.high} included={c.ticket.included}/>
            <CostRow color="#F59E0B" label={'Accommodation (' + c.accom.nights + ' nights)'} sub={race.accumLabels[trip.accumTier]} mid={c.accom.mid} low={c.accom.low} high={c.accom.high} included={c.accom.included}/>
            <CostRow color="#22C55E" label="Local Transport" sub="Return travel to circuit" mid={c.transport.mid} low={c.transport.low} high={c.transport.high} included={true} noRange/>
          </div>
        </>
      )}
      <div className="cost-panel-section">
        <div className="cost-panel-section-label">Include in estimate</div>
        <div className="cost-toggles">
          {isUKHome ? (
            <div className="cost-toggle-item disabled">
              <div><div className="cost-toggle-label">Flights / Travel</div><div className="cost-toggle-sub">Local race — no flights needed</div></div>
              <div className="cost-toggle-switch on"/>
            </div>
          ) : (
            <div className="cost-toggle-item" onClick={function() { toggleInc('incFlights') }}>
              <div><div className="cost-toggle-label">Flights</div><div className="cost-toggle-sub">{'Return from ' + (depLabel || 'departure city')}</div></div>
              <div className={'cost-toggle-switch' + (trip.incFlights ? ' on' : '')}/>
            </div>
          )}
          <div className="cost-toggle-item" onClick={function() { toggleInc('incTickets') }}>
            <div><div className="cost-toggle-label">Race Tickets</div><div className="cost-toggle-sub">Already have tickets? Toggle off</div></div>
            <div className={'cost-toggle-switch' + (trip.incTickets ? ' on' : '')}/>
          </div>
          <div className="cost-toggle-item" onClick={function() { toggleInc('incAccom') }}>
            <div><div className="cost-toggle-label">Accommodation</div><div className="cost-toggle-sub">Already booked? Toggle off</div></div>
            <div className={'cost-toggle-switch' + (trip.incAccom ? ' on' : '')}/>
          </div>
        </div>
      </div>
      <div className="cost-panel-ctas">
        <a className="cost-cta-primary" href="https://www.skyscanner.net" target="_blank" rel="noopener noreferrer">Search Flights on Skyscanner ↗</a>
        <a className="cost-cta-secondary" href="https://www.booking.com" target="_blank" rel="noopener noreferrer">Browse Hotels on Booking.com ↗</a>
      </div>
      <div className="cost-disclaimer">Estimates based on advance bookings (3+ months). Always verify before purchasing.</div>
    </div>
  )
}

export default function Plan() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedRound, setSelectedRound] = useState(null)
  const [selectedGrandstand, setSelectedGrandstand] = useState(null)
  const [trip, setTripState] = useState({
    departureCity: null,
    passport: null,
    party: 2,
    ticketTier: 1,
    accumTier: 1,
    incFlights: true,
    incTickets: true,
    incAccom: true,
  })
  const detailRef = useRef(null)
  const navRef = useRef(null)
  const selectedRace = races.find(function(r) { return r.round === selectedRound })
  function onSet(key, val) { setTripState(function(prev) { return Object.assign({}, prev, {[key]: val}) }) }

  function handleGrandstandSelect(gs) {
    if (selectedGrandstand && selectedGrandstand.id === gs.id) {
      setSelectedGrandstand(null)
      onSet('ticketTier', 1)
    } else {
      var price = selectedRace ? selectedRace.tickets[gs.tierIndex] : 0
      setSelectedGrandstand({ name: gs.name, id: gs.id, price: price })
      onSet('ticketTier', gs.tierIndex)
    }
  }

  function handleGrandstandClear() { setSelectedGrandstand(null) }

  const est = {
    departure: trip.departureCity ? trip.departureCity.cluster : null,
    party: trip.party,
    ticketTier: trip.ticketTier,
    ticketPriceOverride: selectedGrandstand ? selectedGrandstand.price : null,
    accumTier: trip.accumTier,
    incFlights: trip.incFlights,
    incTickets: trip.incTickets,
    incAccom: trip.incAccom,
  }
  const c = selectedRace ? calcCost(selectedRace, est) : null

  function selectRace(round) {
    setSelectedRound(round)
    setSelectedGrandstand(null)
    setTimeout(function() { if (detailRef.current) detailRef.current.scrollIntoView({behavior:'smooth',block:'start'}) }, 50)
  }
  function closePanel() { setSelectedRound(null); setSelectedGrandstand(null) }
  function scrollToNav() { if (navRef.current) navRef.current.scrollIntoView({behavior:'smooth',block:'start'}) }

  const filters = [
    {id:'all',label:'All 22 Races'},{id:'europe',label:'Europe'},{id:'americas',label:'Americas'},
    {id:'asia',label:'Asia & Pacific'},{id:'middle-east',label:'Middle East'},
    {id:'sprint',label:'Sprint Weekends'},{id:'upcoming',label:'Upcoming Only'},
  ]
  const filtered = races.filter(function(r) {
    if (activeFilter === 'all') return true
    if (activeFilter === 'sprint') return r.sprint
    if (activeFilter === 'upcoming') return r.status !== 'completed'
    return r.region === activeFilter
  })

  return (
    <>
      <nav className="sticky-nav" style={{padding:'16px 40px'}}>
        <Link to="/" className="nav-logo"><div className="logo-mark">GP</div>Grand Prix Planner</Link>
        <div className="nav-right"><Link to="/" className="nav-link">Home</Link></div>
      </nav>
      <div className="page-header">
        <div className="page-header-inner">
          <div className="breadcrumb"><Link to="/">Home</Link><span>›</span><span>Plan a Race</span></div>
          <h1>Choose Your<br/><em>2026 Grand Prix</em></h1>
          <p>Select a race to start building your perfect weekend — tickets, travel, accommodation and everything in between.</p>
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
        {filters.map(function(f) {
          return <button key={f.id} className={'filter-btn' + (activeFilter === f.id ? ' active' : '')} onClick={function() { setActiveFilter(f.id) }}>{f.label}</button>
        })}
      </div>
      <div className="main">
        {!selectedRace ? (
          <div className="pick-prompt">
            <div className="pick-prompt-icon">🏁</div>
            <h3>Pick a Race to Start Planning</h3>
            <p>Select any Grand Prix from the calendar below to access grandstand guides, cost estimates, flight information, and everything else for your race weekend.</p>
          </div>
        ) : (
          <div className="detail-panel" ref={detailRef}>
            <DetailHeader race={selectedRace} onClose={closePanel}/>
            <div className="plan-layout">
              <div className="plan-content">
                <TripInputs trip={trip} onSet={onSet}/>
                <SectionNav navRef={navRef}/>

                <div id="sec-grandstands" className="plan-section">
                  <PlanSectionHeading number={1} icon="🏟️" title="Tickets & Grandstands" sub={'Compare every grandstand at ' + selectedRace.circuit}/>
                  <div className="psh-tier-bar">
                    <span className="psh-tier-label">Ticket estimate:</span>
                    {!selectedGrandstand && ['Standard','Advanced','Premium'].map(function(t, i) {
                      return (
                        <button key={i} className={'psh-tier-btn' + (trip.ticketTier === i ? ' active' : '')} onClick={function() { onSet('ticketTier', i) }}>
                          {t}<span className="psh-tier-price">{' ' + fmt(selectedRace.tickets[i])}</span>
                        </button>
                      )
                    })}
                    {selectedGrandstand && (
                      <div className="psh-gs-selected">
                        <span className="psh-gs-name">{selectedGrandstand.name}</span>
                        <span className="psh-gs-price">{fmt(selectedGrandstand.price)}</span>
                        <button className="psh-gs-clear" onClick={handleGrandstandClear}>clear</button>
                      </div>
                    )}
                  </div>
                  <GrandstandPicker
                    race={selectedRace}
                    onSelect={handleGrandstandSelect}
                    selectedId={selectedGrandstand ? selectedGrandstand.id : null}
                  />
                </div>

                <div id="sec-flights" className="plan-section plan-section-alt">
                  <PlanSectionHeading number={2} icon="✈️" title="Flights" sub={'Routes, airports and booking tips for ' + selectedRace.country}/>
                  <FlightGuide race={selectedRace} onBack={scrollToNav}/>
                </div>

                <div id="sec-accom" className="plan-section">
                  <PlanSectionHeading number={3} icon="🏨" title="Accommodation" sub={selectedRace.nights + ' nights — select your level'}/>
                  <div className="accom-body">
                    <div className="accom-tier-grid">
                      {selectedRace.accumLabels.map(function(label, i) {
                        return (
                          <button key={i} className={'accom-tier-btn' + (trip.accumTier === i ? ' active' : '')} onClick={function() { onSet('accumTier', i) }}>
                            <div className="accom-tier-left">
                              <div className="accom-tier-name">{['Standard','Advanced','Premium'][i]}</div>
                              <div className="accom-tier-desc">{label}</div>
                            </div>
                            <div className="accom-tier-right">
                              <div className="accom-tier-price">{fmt(selectedRace.accommodation[i])}<span className="accom-per-night">/night</span></div>
                              <div className="accom-tier-total">{'~' + fmt(selectedRace.accommodation[i] * selectedRace.nights) + ' total'}</div>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                    <div className="accom-note">Your selection updates the cost estimate live. Hotel recommendations and booking links coming soon.</div>
                  </div>
                </div>

                <div id="sec-transport" className="plan-section plan-section-alt">
                  <PlanSectionHeading number={4} icon="🗺️" title="Local Transport" sub={'Getting to and from ' + selectedRace.circuit}/>
                  <LocalTransport race={selectedRace} onBack={scrollToNav}/>
                </div>

                <div id="sec-itinerary" className="plan-section">
                  <PlanSectionHeading number={5} icon="📋" title="Race Weekend Itinerary" sub={selectedRace.name}/>
                  <Itinerary race={selectedRace} onBack={scrollToNav}/>
                </div>

                <div id="sec-visa" className="plan-section plan-section-alt">
                  <PlanSectionHeading number={6} icon="🛂" title="Visa & Entry Requirements" sub={'Entry requirements for ' + selectedRace.country}/>
                  <VisaChecker race={selectedRace} onBack={scrollToNav} passport={trip.passport}/>
                </div>

                <div className="tip-bar">
                  <p>{'💡 '}<strong style={{color:'var(--text)',fontWeight:600}}>Expert tip:</strong>{' ' + selectedRace.tip}</p>
                </div>
              </div>
              <div className="plan-sidebar">
                <CostPanel race={selectedRace} trip={trip} onSet={onSet} c={c} selectedGrandstand={selectedGrandstand} onClearGrandstand={handleGrandstandClear}/>
              </div>
            </div>
          </div>
        )}
        <div>
          <div className="section-heading"><h2>2026 Season Calendar</h2><span className="race-count">{filtered.length + ' races'}</span></div>
          <div className="race-grid">
            {filtered.map(function(race) {
              return <RaceCard key={race.round} race={race} selected={selectedRound === race.round} onClick={selectRace}/>
            })}
          </div>
        </div>
      </div>
    </>
  )
}
