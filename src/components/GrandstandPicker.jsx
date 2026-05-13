import { useState } from 'react'

const BackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

function RatingBar({ label, value, color }) {
  return (
    <div style={{marginBottom:'8px'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'3px'}}>
        <span style={{fontSize:'11px',color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:'0.06em',fontFamily:"'Barlow Condensed',sans-serif",fontWeight:600}}>{label}</span>
        <span style={{fontSize:'11px',color:'var(--text-dim)'}}>{value}/5</span>
      </div>
      <div style={{height:'4px',background:'var(--surface-3)',borderRadius:'2px',overflow:'hidden'}}>
        <div style={{height:'4px',width:String(Math.round(value/5*100))+'%',background:color,borderRadius:'2px'}}/>
      </div>
    </div>
  )
}

const TIER_COLORS = {budget:'#22C55E',mid:'#F59E0B',premium:'#E8002D'}
const TIER_LABELS = {budget:'Budget',mid:'Mid-Range',premium:'Premium'}

const TIER_OPTS = [
  {id:'all',label:'All Tiers'},
  {id:'budget',label:'Budget'},
  {id:'mid',label:'Mid-Range'},
  {id:'premium',label:'Premium'},
]

const TAG_OPTS = [
  {id:'all',label:'All'},
  {id:'first-timers',label:'First-Timers'},
  {id:'overtaking',label:'Overtaking'},
  {id:'atmosphere',label:'Atmosphere'},
  {id:'pit-action',label:'Pit Lane View'},
  {id:'panoramic',label:'Panoramic'},
  {id:'budget-friendly',label:'Budget-Friendly'},
  {id:'covered',label:'Covered Seat'},
]

const TAG_LABELS = {
  'first-timers':'First-Timers',
  'overtaking':'Overtaking',
  'atmosphere':'Atmosphere',
  'pit-action':'Pit Lane View',
  'panoramic':'Panoramic',
  'budget-friendly':'Budget-Friendly',
}

const grandstandData = {
  "Australian Grand Prix": {
    grandstands: [
      {
        id:'aus-ga',
        name:'General Admission — Lakeside Zones',
        priceTier:'budget',
        location:'Multiple zones around Albert Park Lake (Turns 1, 3, 9–16)',
        covered:false,
        ratings:{view:3,overtaking:3,atmosphere:4},
        bestFor:['first-timers','budget-friendly','atmosphere'],
        pros:['Move freely between lake zones all weekend','Great festival atmosphere with fan stages and music','Multiple corners visible from different positions'],
        cons:['Standing only — no reserved seat','Popular spots fill quickly on race day','Limited shade in the Australian summer heat'],
        expertTip:'Claim a spot at Turn 3 early on race day for overtaking action, then enjoy the fan festival zone between sessions. The atmosphere here rivals any grandstand.'
      },
      {
        id:'aus-clark',
        name:'Clark / Whiteford Grandstand',
        priceTier:'mid',
        location:'Turns 2–3',
        covered:false,
        ratings:{view:4,overtaking:4,atmosphere:4},
        bestFor:['overtaking','first-timers'],
        pros:['Clear view of Turns 2 and 3 — a primary overtaking zone','Elevated position gives wide sightlines across both corners','Reserved seat — no early morning rush for a good spot'],
        cons:['No roof — bring sun protection and a hat','Away from the pit lane and podium ceremony area'],
        expertTip:'The best value grandstand at Albert Park. Late braking from Turn 2 into Turn 3 produces regular passing opportunities — you will see genuine wheel-to-wheel racing here.'
      },
      {
        id:'aus-platinum',
        name:'Platinum Club',
        priceTier:'premium',
        location:'Pit straight / Start-Finish',
        covered:true,
        ratings:{view:5,overtaking:3,atmosphere:5},
        bestFor:['pit-action','atmosphere'],
        pros:['Prime pit straight location — full view of starts and pit stops','Covered seating with premium hospitality included','Podium ceremony directly in front of you'],
        cons:['Significantly more expensive than other options','Less overtaking action than the lakeside infield corners'],
        expertTip:'If this is your first Grand Prix and budget allows, the race start from the pit straight is genuinely unforgettable. Worth it as a once-in-a-while experience.'
      }
    ]
  },
  "Chinese Grand Prix": {
    grandstands: [
      {
        id:'chn-ga',
        name:'General Admission',
        priceTier:'budget',
        location:'Infield zones — Turns 7–11 and back section',
        covered:false,
        ratings:{view:3,overtaking:3,atmosphere:3},
        bestFor:['budget-friendly'],
        pros:['Access to multiple corners across a large circuit','Cheapest way to experience an F1 weekend in Asia','Decent proximity to the long straight approach'],
        cons:['Very large circuit — long walks between viewing zones','Infield areas can feel disconnected from the main spectacle','Limited facilities compared to grandstand areas'],
        expertTip:'Head to the Turn 6 hairpin area early on race day. It is the key DRS overtaking point and the best free vantage spot on the circuit.'
      },
      {
        id:'chn-turn6',
        name:'Turn 6 Grandstand',
        priceTier:'mid',
        location:'Turn 6 — main hairpin complex',
        covered:false,
        ratings:{view:4,overtaking:5,atmosphere:4},
        bestFor:['overtaking','first-timers'],
        pros:['Turn 6 is the primary overtaking point at Shanghai','Long braking zone produces dramatic wheel-to-wheel action','Clear, elevated view of the entire approach and exit'],
        cons:['No cover — important for unpredictable Shanghai spring weather','Can feel exposed if it rains during the race'],
        expertTip:'The standout grandstand at Shanghai. DRS activation leads directly into this hairpin — expect multiple overtakes here every single lap. This is where the race is decided.'
      },
      {
        id:'chn-main',
        name:'Main Grandstand',
        priceTier:'premium',
        location:'Pit straight / Start-Finish',
        covered:true,
        ratings:{view:5,overtaking:3,atmosphere:5},
        bestFor:['pit-action','atmosphere'],
        pros:['Covered seating — essential protection from spring rain in Shanghai','Full view of pit lane, race starts and safety car restarts','Premium facilities and podium ceremony views'],
        cons:['Top price for an event that already commands high premiums','Overtaking happens mainly at Turn 6, not at the pit straight'],
        expertTip:'Best for the complete spectacle. Choose Turn 6 if overtaking is your priority. Choose the Main Grandstand for the full ceremony of a Chinese GP weekend.'
      }
    ]
  },
  "Japanese Grand Prix": {
    grandstands: [
      {
        id:'jpn-ga',
        name:'General Admission — Casio Triangle Zones',
        priceTier:'budget',
        location:'Hairpin chicane, Dunlop Curve, and 130R approach areas',
        covered:false,
        ratings:{view:4,overtaking:4,atmosphere:5},
        bestFor:['budget-friendly','atmosphere','first-timers'],
        pros:['Access to some of the most iconic corners in motorsport history','The Suzuka fan atmosphere is extraordinary — among the best in F1','Can roam between Spoon Curve, Casio Triangle, and Dunlop Corner'],
        cons:['Standing only — very busy, arrive early on race day','Some sightlines partially obscured by barriers and trees','Long circuit with significant distances between zones'],
        expertTip:'Station yourself at the Casio Triangle chicane for the most overtaking action. The fan atmosphere here rivals anywhere in F1 — the passion is completely genuine.'
      },
      {
        id:'jpn-degner',
        name:'Degner / Spoon Curve Grandstand',
        priceTier:'mid',
        location:'Degner 2 and Spoon Curve — back section of the circuit',
        covered:false,
        ratings:{view:5,overtaking:3,atmosphere:4},
        bestFor:['panoramic','overtaking'],
        pros:['Elevated views of the sweeping Spoon Curve at genuine racing speed','Quieter than the grandstands near the start-finish area','See cars carrying extraordinary speed through a technically demanding section'],
        cons:['Further from the pit straight and podium ceremony','Less passing action than the Casio Triangle hairpin'],
        expertTip:'Spoon Curve is a beautifully technical corner where drivers set personal bests. Perfect for fans who appreciate what these cars can do at high speed.'
      },
      {
        id:'jpn-main',
        name:'Main Grandstand',
        priceTier:'premium',
        location:'Pit straight / Start-Finish',
        covered:true,
        ratings:{view:5,overtaking:3,atmosphere:5},
        bestFor:['pit-action','atmosphere'],
        pros:['Full view of the start sequence and entire pit lane','Covered seating — Suzuka in March can be cold and wet','Podium ceremony and race start action directly in front of you'],
        cons:['Highest ticket price at a race that sells out rapidly','Overtaking primarily happens in the infield hairpin section'],
        expertTip:'For a first visit to Suzuka, the main grandstand gives you the full ceremony of one of the greatest races in the world. Come back and roam the GA zones for the raw Suzuka experience.'
      },
      {
        id:'jpn-130r',
        name:'Super Seat — 130R Grandstand',
        priceTier:'premium',
        location:'130R — the iconic flat-out left-hander',
        covered:false,
        ratings:{view:5,overtaking:2,atmosphere:5},
        bestFor:['panoramic','atmosphere'],
        pros:['Witness F1 cars at close to 300 kph through a flat-out corner','One of the most spectacular single sights in all of motorsport','Elevated position with a wide view of the entire final sector'],
        cons:['Very little overtaking — cars rarely challenge each other here','Premium price for a specific spectacle rather than racing action'],
        expertTip:'130R is about speed, not overtaking. Watching a modern F1 car take this corner at full throttle is genuinely jaw-dropping. A bucket list motor racing experience.'
      }
    ]
  },
  "Miami Grand Prix": {
    grandstands: [
      {
        id:'mia-ga',
        name:'General Admission',
        priceTier:'budget',
        location:'Various infield fan zones and entertainment areas',
        covered:false,
        ratings:{view:2,overtaking:2,atmosphere:4},
        bestFor:['budget-friendly','atmosphere'],
        pros:['Access to the fan festival, concerts and entertainment throughout the weekend','Cheapest entry to one of the most glamorous events on the calendar','Multiple activations and brand experiences throughout the circuit'],
        cons:['Track views are quite limited in GA zones at Miami','Extremely hot in early May — shade is seriously scarce','At GA level this is primarily an entertainment event, not a racing one'],
        expertTip:'Miami GA is more music festival than motorsport. If watching the cars closely matters to you, invest in a grandstand seat. If the spectacle and party atmosphere is the draw, GA works well.'
      },
      {
        id:'mia-turn1',
        name:'Turn 1 Grandstand',
        priceTier:'mid',
        location:'Turn 1 — main braking zone from the start straight',
        covered:false,
        ratings:{view:4,overtaking:4,atmosphere:4},
        bestFor:['overtaking','first-timers'],
        pros:['Primary overtaking point at the Miami Autodrome','Clear view of the full approach and exit from the corner','Reserved seat with unobstructed sightlines — no craning needed'],
        cons:['No shade at all — the Miami May heat is genuinely punishing','Turn 1 can produce chaotic incidents rather than clean racing passes'],
        expertTip:'Turn 1 produces incidents, defensive drives, and passes on almost every lap. The best value seat at Miami for watching actual Formula 1 racing.'
      },
      {
        id:'mia-club',
        name:'Club Paddock',
        priceTier:'premium',
        location:'Pit straight / Start-Finish',
        covered:true,
        ratings:{view:5,overtaking:3,atmosphere:5},
        bestFor:['pit-action','atmosphere'],
        pros:['Air-conditioned hospitality areas — an absolute necessity at Miami','Full pit straight view with premium service and F1 Paddock access','The most complete spectator experience at this event'],
        cons:['Among the most expensive grandstand tickets anywhere in F1','More social event than pure racing experience at this price level'],
        expertTip:'Miami is a premium lifestyle event. The Club Paddock fits the event DNA — if you are going to Miami, doing it properly is genuinely worth considering.'
      }
    ]
  },
  "Canadian Grand Prix": {
    grandstands: [
      {
        id:'can-ga',
        name:'General Admission — Île Notre-Dame',
        priceTier:'budget',
        location:'Roaming access across the island circuit',
        covered:false,
        ratings:{view:3,overtaking:4,atmosphere:5},
        bestFor:['budget-friendly','atmosphere','first-timers'],
        pros:['Access to multiple corners including the famous Wall of Champions hairpin','Incredible party atmosphere throughout the island — one of the best in F1','The unique island setting in the St Lawrence River is genuinely scenic'],
        cons:['Standing only — claim your spot at the hairpin very early on race day','The hairpin area gets extremely crowded and intense'],
        expertTip:'The GA hairpin zone at Montreal is genuinely special. The Wall of Champions catches cars at the final chicane seemingly every few years — it is a real incident magnet.'
      },
      {
        id:'can-senna',
        name:'Senna Grandstand',
        priceTier:'mid',
        location:'Hairpin — Turns 13–14',
        covered:false,
        ratings:{view:5,overtaking:5,atmosphere:5},
        bestFor:['overtaking','atmosphere','first-timers'],
        pros:['Arguably the best value grandstand seat in all of Formula 1','The hairpin is the main DRS detection and overtaking point every lap','A reserved seat at the most dramatic corner at one of the most exciting races'],
        cons:['Books out faster than any other grandstand in Canada — must buy immediately','Fully exposed — pack waterproofs as Montreal weather is unpredictable'],
        expertTip:'If you can attend one Grand Prix in your lifetime and sit in one grandstand, make it this one. The hairpin produces overtakes, incidents, and drama on almost every single lap.'
      },
      {
        id:'can-prost',
        name:'Prost Grandstand',
        priceTier:'mid',
        location:'Back section — Turn 9 and Turn 10 complex',
        covered:false,
        ratings:{view:4,overtaking:3,atmosphere:4},
        bestFor:['panoramic'],
        pros:['Good views of the fast back section of the circuit','Usually has better availability than the Senna grandstand','Elevated position with clear, unobstructed sightlines'],
        cons:['Less overtaking action than the hairpin section','Further from the main atmosphere and festival areas'],
        expertTip:'A solid option if the Senna stand is already sold out. Good racing views without the intensity of the hairpin section. Worth pairing with a day roaming GA zones.'
      },
      {
        id:'can-paddock',
        name:'Paddock Club',
        priceTier:'premium',
        location:'Pit straight / Start-Finish',
        covered:true,
        ratings:{view:5,overtaking:3,atmosphere:5},
        bestFor:['pit-action','atmosphere'],
        pros:['Full pit straight and podium views at one of the most beloved events on the calendar','Premium hospitality in a circuit right in the heart of a beautiful city','Covered and comfortable across the race weekend'],
        cons:['Significantly more expensive than the already-excellent mid-tier options','The hairpin is where the real racing action happens'],
        expertTip:'Montreal is a world-class city and a great excuse to spend several days there. The Paddock Club suits a trip that combines the best of the race with the best of the city.'
      }
    ]
  },
  "Monaco Grand Prix": {
    grandstands: [
      {
        id:'mon-harbour',
        name:'Harbour — Public Viewing Areas',
        priceTier:'budget',
        location:'Waterfront and public areas around the harbour',
        covered:false,
        ratings:{view:2,overtaking:1,atmosphere:5},
        bestFor:['atmosphere','budget-friendly'],
        pros:['No ticket required — experience the Monaco principality and harbour atmosphere','Watch on screens throughout the weekend in a uniquely glamorous setting','The ambience of Monaco race weekend is extraordinary even without a trackside seat'],
        cons:['Virtually no direct track view without a grandstand ticket','Incredibly crowded on race day — arrive extremely early','You are there for the atmosphere and occasion, not to watch the cars'],
        expertTip:'Monaco public viewing is about being there, not watching racing. Invest in a grandstand ticket if seeing the cars matters. Come to the harbour for the scene and the spectacle.'
      },
      {
        id:'mon-loews',
        name:'Tribune Loews — Grand Hotel Hairpin',
        priceTier:'mid',
        location:'Grand Hotel Hairpin — the slowest corner in Formula 1',
        covered:false,
        ratings:{view:5,overtaking:2,atmosphere:5},
        bestFor:['first-timers','atmosphere'],
        pros:['The most iconic individual corner in all of motorsport — in person it is extraordinary','Cars pass within metres at walking pace — close enough to touch almost','Stunning backdrop of the Monaco buildings, cliffs and harbour'],
        cons:['Overtaking here is exceptionally rare — cars queue through the hairpin','Monaco overall has almost zero passing action anywhere on the circuit'],
        expertTip:'Do not come to Monaco expecting overtakes — there are almost none. Come for the spectacle, the history, and the visceral experience of the Grand Hotel Hairpin at walking pace.'
      },
      {
        id:'mon-rascasse',
        name:'Rascasse Corner Tribune',
        priceTier:'mid',
        location:'Rascasse — final corner before the pit straight',
        covered:false,
        ratings:{view:4,overtaking:2,atmosphere:5},
        bestFor:['atmosphere','panoramic'],
        pros:['See cars exiting the final corner and accelerating down the pit straight','Atmospheric setting with the Casino on the hill behind','Good position to watch any safety car restarts play out'],
        cons:['Extremely limited overtaking opportunities here or anywhere at Monaco','Tickets can be surprisingly expensive relative to the view you receive'],
        expertTip:'Rascasse is historically significant — Schumacher infamously parked his car here in 2006 qualifying. A corner where incidents and controversy happen when they do occur at Monaco.'
      },
      {
        id:'mon-tribune-k',
        name:'Tribune K — Pit Straight',
        priceTier:'premium',
        location:'Pit straight / Start-Finish',
        covered:true,
        ratings:{view:5,overtaking:2,atmosphere:5},
        bestFor:['pit-action','atmosphere'],
        pros:['The premier seat at the most prestigious race in the world','Full pit lane and start-finish straight view for the full race weekend','Covered seating — important for a four-day Monaco Grand Prix weekend'],
        cons:['The most expensive grandstand ticket in Formula 1 by a substantial margin','The pit straight itself sees very little actual racing action'],
        expertTip:'Monaco is about ceremony, history, and prestige. The Tribune K delivers the definitive version of that. If the price is acceptable to you, this is genuinely the complete Monaco experience.'
      }
    ]
  },
  "Spanish Grand Prix": {
    grandstands: [
      {
        id:'esp-ga',
        name:'General Admission — Pelouse',
        priceTier:'budget',
        location:'Infield grass areas — access to multiple sector viewpoints',
        covered:false,
        ratings:{view:3,overtaking:3,atmosphere:3},
        bestFor:['budget-friendly','first-timers'],
        pros:['Roam between multiple corners across the weekend','Excellent value for a European race with easy access from Barcelona city','Very good transport connections — straightforward for a first-timer'],
        cons:['No reserved seat — requires walking and standing throughout','Barcelona can feel processional — choose your GA viewing spot carefully'],
        expertTip:'Target the Turn 1 area within the GA zone. The long start straight means Turn 1 is a genuine overtaking point. Arrive early on race day to secure the best position.'
      },
      {
        id:'esp-turn1',
        name:'Turns 1–2 Grandstand',
        priceTier:'mid',
        location:'Turn 1 and Turn 2 braking complex',
        covered:false,
        ratings:{view:4,overtaking:4,atmosphere:4},
        bestFor:['overtaking','first-timers'],
        pros:['Primary DRS overtaking point at the Circuit de Barcelona-Catalunya','Elevated view into the hard braking zone','Where most of the lap 1 drama and position changes happen'],
        cons:['No cover — sunscreen is essential in June','Barcelona overall is not the richest circuit for overtaking across the full race'],
        expertTip:'The best racing seat at Catalunya. Turn 1 is where the lap 1 order is reshuffled and where DRS passes most frequently occur. A reliable source of action.'
      },
      {
        id:'esp-main',
        name:'Main / Repsol Grandstand',
        priceTier:'premium',
        location:'Pit straight / Start-Finish',
        covered:true,
        ratings:{view:5,overtaking:3,atmosphere:5},
        bestFor:['pit-action','atmosphere'],
        pros:['Covered seating — relevant in occasionally wet early June weather','Full pit lane, formation lap, start and podium ceremony in front of you','Most prestigious seat at the Spanish Grand Prix'],
        cons:['Top price for a race that is excellent but not the most expensive on the calendar','Racing action concentrates at Turn 1, not the pit straight'],
        expertTip:'Barcelona is one of the best first-race choices for UK fans — easy, accessible, and well-organised. The Main Grandstand delivers the complete experience in comfort.'
      }
    ]
  },
  "Austrian Grand Prix": {
    grandstands: [
      {
        id:'aut-ga',
        name:'General Admission + Camping',
        priceTier:'budget',
        location:'Hillside viewing zones across the entire circuit',
        covered:false,
        ratings:{view:4,overtaking:4,atmosphere:5},
        bestFor:['budget-friendly','atmosphere','first-timers','panoramic'],
        pros:['Natural hillside terrain gives elevated views of almost the entire circuit','Camping creates an extraordinary multi-day festival atmosphere','Move freely between Turns 3, 4, and 8 zone all weekend'],
        cons:['Standing and walking — no reserved position','Can be extremely hot in late June — hydration is important','Camping requires more advance planning and equipment'],
        expertTip:'The Red Bull Ring GA camping experience is one of the very best in F1. The Dutch Orange Army transforms the hillsides. Take the free shuttle from Zeltweg village.'
      },
      {
        id:'aut-turn3',
        name:'Turn 3 Grandstand',
        priceTier:'mid',
        location:'Turn 3 — uphill braking zone',
        covered:false,
        ratings:{view:5,overtaking:5,atmosphere:4},
        bestFor:['overtaking','first-timers'],
        pros:['The best overtaking grandstand at the Red Bull Ring','Uphill braking approach creates dramatic late-braking moves','Good elevation with a sweeping view of the full approach from Turn 2'],
        cons:['No cover — the Austrian weather swings between scorching heat and sudden storms','Books up quickly due to its reputation as the prime racing seat'],
        expertTip:'Turn 3 is where the actual racing happens at Spielberg. The DRS activation zone funnels cars into a heavy braking zone with genuine passing opportunities every lap.'
      },
      {
        id:'aut-orange',
        name:'Orange Grandstand',
        priceTier:'mid',
        location:'Turn 4 — technical downhill right-hander',
        covered:false,
        ratings:{view:4,overtaking:3,atmosphere:5},
        bestFor:['atmosphere','panoramic'],
        pros:['Home grandstand for the Dutch fans who travel in extraordinary force','Superb panoramic view of the entire back section of the circuit','The single loudest, most energetic grandstand at any F1 race'],
        cons:['Less direct overtaking action than Turn 3','Can feel overwhelming — very busy and extremely loud throughout race day'],
        expertTip:'Even if you are not Dutch, the Orange stand delivers a completely unique experience. The fan energy is unmatched in sport. Be prepared for an all-day celebration regardless of results.'
      },
      {
        id:'aut-main',
        name:'Main Grandstand',
        priceTier:'premium',
        location:'Pit straight / Start-Finish',
        covered:true,
        ratings:{view:5,overtaking:3,atmosphere:4},
        bestFor:['pit-action'],
        pros:['Covered seating — extremely valuable at Spielberg where weather changes very quickly','Full pit lane view and podium ceremony access','Comfortable, reliable base for the entire race weekend'],
        cons:['Less racing action than the hillside grandstands','Premium price at a venue that is otherwise very budget-accessible'],
        expertTip:'If comfort and weather protection matter most, the main stand delivers. But the GA camping experience is arguably the more authentic and enjoyable one at this circuit.'
      }
    ]
  },
  "British Grand Prix": {
    grandstands: [
      {
        id:'gbr-ga',
        name:'General Admission',
        priceTier:'budget',
        location:'GA zones — Club, Luffield, Vale, Becketts outer areas',
        covered:false,
        ratings:{view:3,overtaking:3,atmosphere:5},
        bestFor:['budget-friendly','atmosphere','first-timers'],
        pros:['Access to multiple corners including the famous Maggotts-Becketts complex','Brilliant festival atmosphere — Silverstone GA is a significant event in itself','Camping upgrade available for the full long-weekend experience'],
        cons:['Popular viewing spots fill very early on race morning','Silverstone in July can be blazing hot or completely soaked — pack for both','Some GA sightlines are limited by barriers and fencing'],
        expertTip:'Head to the Luffield complex (Turns 16–18) within GA for the best free overtaking view. Club Corner also offers good proximity. Arrive the night before on race day.'
      },
      {
        id:'gbr-stowe',
        name:'Stowe Grandstand',
        priceTier:'mid',
        location:'Stowe Corner — Turn 9',
        covered:false,
        ratings:{view:4,overtaking:4,atmosphere:4},
        bestFor:['overtaking','first-timers'],
        pros:['Cars arrive from the fast Club and Vale sections at very high speed then brake hard','One of the primary overtaking zones at Silverstone','Good elevated view of the long approach and the corner exit'],
        cons:['No cover — Silverstone weather is famously unpredictable','Away from the main Wing building and pit lane facilities'],
        expertTip:'Stowe is underrated and often overlooked. Cars arrive at extreme speed from the back straight and brake dramatically. Dramatic, exciting viewing at a very accessible price.'
      },
      {
        id:'gbr-club',
        name:'Club Grandstand',
        priceTier:'mid',
        location:'Club Corner — Turn 15–16',
        covered:false,
        ratings:{view:4,overtaking:3,atmosphere:4},
        bestFor:['panoramic','first-timers'],
        pros:['Good view of the final sector chicane and Club Corner','Reserved seat at a more accessible price point for a premium event','Decent atmosphere in a consistently popular area of the circuit'],
        cons:['Not the highest-action overtaking point at Silverstone','Fully exposed — Silverstone weather demands waterproofs and sunscreen simultaneously'],
        expertTip:'A solid first British GP seat. Club Corner is not the most dramatic but it is a comfortable, well-positioned grandstand that gives a clear view of the final sector.'
      },
      {
        id:'gbr-wing',
        name:'The Wing — Pit Straight Grandstand',
        priceTier:'premium',
        location:'Start-Finish straight / The Wing building',
        covered:true,
        ratings:{view:5,overtaking:3,atmosphere:5},
        bestFor:['pit-action','atmosphere'],
        pros:['Britain\'s home race — the atmosphere at the start straight is extraordinary','Covered seating with premium facilities inside the iconic Wing building','Podium, pit lane, and formation lap all directly visible'],
        cons:['Top price at an already expensive event','Sells out within hours of release — requires booking the moment tickets go on sale'],
        expertTip:'The British GP at Silverstone is one of the greatest events in world sport. Book the instant tickets open. The home crowd atmosphere at the Wing grandstand is a genuinely special experience.'
      }
    ]
  },
  "Belgian Grand Prix": {
    grandstands: [
      {
        id:'bel-ga',
        name:'General Admission — La Source and Forest Zones',
        priceTier:'budget',
        location:'La Source hairpin, Pouhon, and forest section viewing areas',
        covered:false,
        ratings:{view:4,overtaking:4,atmosphere:5},
        bestFor:['budget-friendly','atmosphere','overtaking'],
        pros:['La Source hairpin is accessible on GA and produces regular overtaking','Spa\'s natural hillside geography gives excellent free sightlines','The Ardennes forest atmosphere is completely unique in Formula 1'],
        cons:['Spa weather is genuinely unpredictable — waterproofs are non-negotiable, always, regardless of forecast','Popular GA spots become extremely crowded at La Source on race day'],
        expertTip:'Spa GA is exceptional value. The hillside geography gives far better views than GA at any flat circuit. Pack waterproofs no matter what the forecast says — this is Spa.'
      },
      {
        id:'bel-raidillon',
        name:'Raidillon Grandstand',
        priceTier:'mid',
        location:'Raidillon — crest at the exit of Eau Rouge',
        covered:false,
        ratings:{view:5,overtaking:3,atmosphere:5},
        bestFor:['panoramic','atmosphere','first-timers'],
        pros:['One of the most iconic views in all of motorsport — genuinely unmissable','See F1 cars accelerate through Eau Rouge and crest Raidillon at flat-out speed','Panoramic sight up the entire Kemmel Straight from an elevated position'],
        cons:['No overtaking at Raidillon itself — passing happens further up at Les Combes','Fully exposed — Spa rain with no cover is a serious challenge'],
        expertTip:'This is the must-see grandstand of the entire F1 calendar. Watching modern F1 cars crest Raidillon at full throttle is a visceral, jaw-dropping experience. Book early — it sells out faster than any other stand here.'
      },
      {
        id:'bel-gold',
        name:'Gold Cup Grandstand',
        priceTier:'premium',
        location:'Elevated position above Eau Rouge and Raidillon',
        covered:false,
        ratings:{view:5,overtaking:3,atmosphere:5},
        bestFor:['panoramic','atmosphere'],
        pros:['Bird\'s-eye view of the entire Eau Rouge and Raidillon sequence from above','See the full run from La Source hairpin through the valley and up to the crest','Arguably the single greatest grandstand view in Formula 1'],
        cons:['Fully exposed to Spa\'s famous unpredictable weather','Very steep steps — not appropriate for anyone with mobility concerns'],
        expertTip:'The elevation here gives a perspective on Eau Rouge and Raidillon that television simply cannot capture. If there is one premium grandstand in F1 to justify the expense, this might be it.'
      },
      {
        id:'bel-kemmel',
        name:'Kemmel Grandstand',
        priceTier:'mid',
        location:'Kemmel Straight — approach to Les Combes chicane',
        covered:false,
        ratings:{view:4,overtaking:5,atmosphere:4},
        bestFor:['overtaking'],
        pros:['Les Combes is the primary DRS overtaking point at Spa — more passes here than anywhere else','See F1 cars at maximum speed down the fastest straight on the calendar','High action content with regular genuine overtaking every lap'],
        cons:['Less iconic visually than Raidillon — it is a chicane, not a sweeping corner','Away from the main fan infrastructure around the paddock'],
        expertTip:'If seeing actual overtaking is your priority at Spa, sit here rather than at Raidillon. Les Combes produces more genuine passes per race than anywhere else on this circuit.'
      }
    ]
  },
  "Hungarian Grand Prix": {
    grandstands: [
      {
        id:'hun-ga',
        name:'General Admission — Hill Section',
        priceTier:'budget',
        location:'Natural infield hillside overlooking Turns 4–8',
        covered:false,
        ratings:{view:4,overtaking:2,atmosphere:4},
        bestFor:['budget-friendly','panoramic'],
        pros:['Natural hillside gives an elevated panoramic view of much of the circuit','Can see a large portion of the track from a single position','Good value for a European race with excellent Budapest city access'],
        cons:['Hungaroring is notoriously processional — limited overtaking overall from any seat','July in Budapest is seriously hot — shade is minimal in the hill zone'],
        expertTip:'The Hungaroring hill is genuinely good value. You see more of the circuit than most dedicated grandstands. Bring serious sun protection — July in Hungary is intense.'
      },
      {
        id:'hun-b',
        name:'B Grandstand',
        priceTier:'mid',
        location:'Turn 1 — main braking zone from the pit straight',
        covered:false,
        ratings:{view:4,overtaking:4,atmosphere:4},
        bestFor:['overtaking','first-timers'],
        pros:['Turn 1 is the only realistic overtaking point at the Hungaroring','Heavy braking from the long pit straight produces the best racing action here','The highest-action grandstand available at this circuit'],
        cons:['Even Turn 1 has limited passing — this is a processional circuit by nature','No cover — the heat in late July Budapest is seriously punishing'],
        expertTip:'If you are choosing a grandstand at the Hungaroring, Turn 1 is the answer. It is the one corner where incidents and passes are genuinely possible each lap.'
      },
      {
        id:'hun-c',
        name:'C Grandstand',
        priceTier:'mid',
        location:'Turns 3–4 sweeping complex',
        covered:false,
        ratings:{view:4,overtaking:2,atmosphere:4},
        bestFor:['panoramic'],
        pros:['Elevated panoramic view of the technical middle sector','Good sight of a significant portion of the circuit layout','Slightly more accessible price than the B grandstand'],
        cons:['Very little overtaking in this section of the circuit','Can be a relatively quiet viewing experience on race day'],
        expertTip:'Good for watching race strategy and tyre management unfold. You see a lot of the circuit from C grandstand. Less exciting than Turn 1 but a pleasant, spacious spot.'
      },
      {
        id:'hun-paddock',
        name:'Paddock Club',
        priceTier:'premium',
        location:'Pit straight / Start-Finish',
        covered:true,
        ratings:{view:4,overtaking:3,atmosphere:4},
        bestFor:['pit-action','atmosphere'],
        pros:['Air-conditioned hospitality — an absolute necessity in July Budapest heat','Pit lane views and race start action from a covered, premium position','Comfortable and well-equipped across the full race weekend'],
        cons:['Top price for a circuit that historically produces limited on-track drama','Consider whether time exploring Budapest might be more satisfying'],
        expertTip:'Pair this race with a proper Budapest city break. The Paddock Club suits a couple of days of world-class culture followed by a comfortable race weekend indulgence.'
      }
    ]
  },
  "Dutch Grand Prix": {
    grandstands: [
      {
        id:'ned-ga',
        name:'General Admission — Dune Zones',
        priceTier:'budget',
        location:'Sandy dune sections across the compact circuit perimeter',
        covered:false,
        ratings:{view:3,overtaking:2,atmosphere:5},
        bestFor:['budget-friendly','atmosphere'],
        pros:['The Orange Army creates the single greatest fan atmosphere in Formula 1','Unique coastal dune setting unlike any other circuit on the calendar','Multiple vantage points across the compact, intimate circuit layout'],
        cons:['Zandvoort is extremely difficult to overtake at — GA zones will not see much passing','Some GA sightlines are limited by the dune terrain and barriers','No cars allowed on race weekend — must arrive by train and shuttle from Haarlem'],
        expertTip:'The Dutch GP is as much a national festival as a race. Come for the extraordinary atmosphere and spectacle, not for overtaking action. The fan energy here is unmatched anywhere in sport.'
      },
      {
        id:'ned-tarzan',
        name:'Tarzan Grandstand',
        priceTier:'mid',
        location:'Turn 1 — Tarzan hairpin',
        covered:false,
        ratings:{view:4,overtaking:4,atmosphere:5},
        bestFor:['overtaking','atmosphere','first-timers'],
        pros:['Turn 1 is the best and most reliable overtaking point at Zandvoort','Heavy braking from the main straight into the tight hairpin','Completely surrounded by the most passionate fans in all of motorsport'],
        cons:['The first grandstand to sell out — must book immediately when tickets release','Exposed coastal position — Zandvoort weather is famously unpredictable'],
        expertTip:'The Tarzan grandstand is the standout seat at the Dutch GP. The combination of actual racing action and extraordinary fan atmosphere is the best of both worlds. Book the day tickets open.'
      },
      {
        id:'ned-main',
        name:'Main Grandstand',
        priceTier:'premium',
        location:'Pit straight / Start-Finish',
        covered:true,
        ratings:{view:5,overtaking:2,atmosphere:5},
        bestFor:['pit-action','atmosphere'],
        pros:['Covered seating — genuinely valuable at an exposed coastal circuit','Pit lane and podium views with the full Dutch GP race start ceremony','The 2026 edition is the final Dutch GP at Zandvoort — a historic occasion'],
        cons:['Highest price at an already expensive event','Zandvoort has limited overtaking regardless of which grandstand you sit in'],
        expertTip:'The 2026 Dutch GP is the last ever race at Zandvoort. The main grandstand gives you the ceremony of a closing chapter in F1 history — worth experiencing in the best seat available.'
      },
      {
        id:'ned-hugenholtz',
        name:'Hugenholtz Grandstand',
        priceTier:'mid',
        location:'Final corner — the banked Hugenholtz turn',
        covered:false,
        ratings:{view:4,overtaking:2,atmosphere:4},
        bestFor:['panoramic','first-timers'],
        pros:['View of the dramatic banked final corner — unique in modern Formula 1','See cars exit and accelerate hard onto the main straight','A distinctive viewing angle at a circuit with distinctive character'],
        cons:['Very limited overtaking opportunity at this corner','Quite far from the pit lane, paddock and main event facilities'],
        expertTip:'The banking at Hugenholtz is genuinely unlike anything else in modern F1. Even if racing action is limited here, watching cars navigate the banking at speed is worth seeing in person.'
      }
    ]
  },
  "Italian Grand Prix": {
    grandstands: [
      {
        id:'ita-ga',
        name:'General Admission — Parabolica and Lesmo Zones',
        priceTier:'budget',
        location:'Parabolica (Turn 11), Lesmo 1–2, and forest sections',
        covered:false,
        ratings:{view:4,overtaking:3,atmosphere:5},
        bestFor:['budget-friendly','atmosphere','first-timers'],
        pros:['Parabolica — now the Curva Alboreto — is one of the greatest corners in F1 and is accessible on GA','The Tifosi atmosphere through the Monza forest is unlike anything else in motorsport','Roaming access gives multiple sightlines of an incredibly fast circuit'],
        cons:['September heat can still be significant — shade at the Parabolica is limited','Parabolica grandstand sections within GA get extremely crowded on race day'],
        expertTip:'Monza GA is genuinely special. Position yourself at the exit of Parabolica where cars run right to the edge of the circuit at extreme speed. The roar of a Ferrari through here is unforgettable.'
      },
      {
        id:'ita-chicane2',
        name:'Second Chicane Grandstand',
        priceTier:'mid',
        location:'Second chicane — Turns 4–5 (Roggia)',
        covered:false,
        ratings:{view:5,overtaking:5,atmosphere:5},
        bestFor:['overtaking','atmosphere','first-timers'],
        pros:['The primary overtaking point at Monza — DRS passes are frequent and dramatic','Cars arrive at the end of the back straight at over 340 kph and brake extremely hard','Tifosi atmosphere peaks at this corner whenever Ferrari are in a position to overtake'],
        cons:['Sells out extremely quickly — this is the most sought-after mid-tier seat at Monza','September temperatures can still be warm'],
        expertTip:'If you want to see the most on-track action at Monza, this is your grandstand. The approach speed from the back straight is extraordinary and the braking zone is one of the most dramatic in F1.'
      },
      {
        id:'ita-curvagrande',
        name:'Curva Grande Grandstand',
        priceTier:'mid',
        location:'Curva Grande — fast sweeping left-hander after Turn 1',
        covered:false,
        ratings:{view:4,overtaking:2,atmosphere:4},
        bestFor:['panoramic'],
        pros:['Witness F1 cars at close to maximum speed through a sweeping high-speed corner','Elevated position with a long view of the approach from Turn 1','Typically less crowded than the chicane grandstands'],
        cons:['Very little overtaking action — cars rarely challenge each other here','Less fan atmosphere than the chicane sections closer to the Tifosi heartland'],
        expertTip:'Curva Grande is about raw Monza speed. Cars are travelling at over 310 kph through here. Come here to appreciate the engineering rather than to watch racing action.'
      },
      {
        id:'ita-main',
        name:'Main Grandstand',
        priceTier:'premium',
        location:'Pit straight / Start-Finish',
        covered:true,
        ratings:{view:5,overtaking:3,atmosphere:5},
        bestFor:['pit-action','atmosphere'],
        pros:['The Tifosi atmosphere at the Monza pit straight is the most intense in any sport','If Ferrari are on the podium, the emotion and noise is genuinely extraordinary','Covered seating and premium facilities at one of the greatest racing venues on Earth'],
        cons:['Extremely expensive and sells out the moment tickets release each year','The racing action happens at the chicanes, not the pit straight'],
        expertTip:'Monza is a bucket list race. The Main Grandstand delivers the full ceremony — the Tifosi, the iconic park, the podium. Book the moment tickets open. This race sells out in hours.'
      }
    ]
  },
  "Madrid Grand Prix": {
    grandstands: [
      {
        id:'mad-ga',
        name:'General Admission',
        priceTier:'budget',
        location:'Various circuit zones — full layout details to be confirmed',
        covered:false,
        ratings:{view:3,overtaking:3,atmosphere:4},
        bestFor:['budget-friendly','first-timers'],
        pros:['Cheapest entry to a genuinely historic inaugural Grand Prix','Madrid city is exceptional — a world-class European capital to explore','Attending the very first Madrid GP is something to tell people about for decades'],
        cons:['New circuit infrastructure means some uncertainty in what to expect','GA zone layout and access for the new circuit is not yet fully confirmed'],
        expertTip:'The inaugural Madrid GP is a piece of history. Attend for the occasion itself. Madrid is a magnificent city — build in extra days to explore it properly around the race.'
      },
      {
        id:'mad-main',
        name:'Main Grandstand',
        priceTier:'mid',
        location:'Pit straight / Start-Finish (provisional)',
        covered:false,
        ratings:{view:4,overtaking:3,atmosphere:4},
        bestFor:['first-timers','pit-action'],
        pros:['Best available reserved view at a new and still-developing venue','Pit straight provides consistent interest at any circuit','Attending the inaugural race from a prime position is itself a draw'],
        cons:['Grandstand layout not yet formally confirmed for the new street circuit','Expect some operational teething issues typical of a brand new Grand Prix'],
        expertTip:'Madrid grandstand details will firm up closer to the event. Check back on grandprixplanner.com for updated circuit information as it is confirmed by the organisers.'
      },
      {
        id:'mad-vip',
        name:'VIP Hospitality',
        priceTier:'premium',
        location:'Pit straight / hospitality village',
        covered:true,
        ratings:{view:5,overtaking:3,atmosphere:5},
        bestFor:['pit-action','atmosphere'],
        pros:['Premium experience at a landmark inaugural event on the F1 calendar','Modern facilities at a brand new, purpose-built circuit infrastructure','Covered and comfortable for a warm September race in Spain'],
        cons:['Highest price with some inherent uncertainty at an unproven venue','The premium product is untested — but the organisers have strong incentives to impress'],
        expertTip:'The inaugural Madrid GP will be a showpiece event. The premium hospitality will be designed to make a statement. Expect high quality — this matters to both Madrid and Formula 1.'
      }
    ]
  },
  "Azerbaijan Grand Prix": {
    grandstands: [
      {
        id:'aze-ga',
        name:'General Admission — Street Circuit Zones',
        priceTier:'budget',
        location:'Various zones along the boulevard and city sections',
        covered:false,
        ratings:{view:3,overtaking:3,atmosphere:4},
        bestFor:['budget-friendly','atmosphere'],
        pros:['Baku city is walkable and genuinely beautiful — great to explore around the circuit','Street circuit setting means a unique urban backdrop at every corner','The old walled city section is close to the circuit and extraordinary to visit'],
        cons:['GA sightlines on a street circuit are more restricted than permanent facilities','September heat in Azerbaijan can be quite significant'],
        expertTip:'Baku is massively underrated as a race destination. The old city next to the circuit is a UNESCO World Heritage site. Use GA access to explore the race and the city together.'
      },
      {
        id:'aze-turn1',
        name:'Turn 1 Grandstand',
        priceTier:'mid',
        location:'Turn 1 — main braking zone from the start straight',
        covered:false,
        ratings:{view:4,overtaking:4,atmosphere:4},
        bestFor:['overtaking','first-timers'],
        pros:['The Baku pit straight is the longest in F1 — DRS is maximally effective here','Turn 1 braking zone produces regular, dramatic overtakes every lap','Reserved seat at the highest-action corner on the circuit'],
        cons:['No cover — September sun can be strong in Baku','Street circuit barriers occasionally obstruct some sightlines'],
        expertTip:'Turn 1 is the go-to seat at Baku. The combination of the longest straight in F1 and a tight Turn 1 hairpin means overtaking here is frequent and often dramatic.'
      },
      {
        id:'aze-castle',
        name:'Castle Section Grandstand',
        priceTier:'mid',
        location:'Narrow castle walls section — Turns 7–8',
        covered:false,
        ratings:{view:4,overtaking:2,atmosphere:5},
        bestFor:['panoramic','atmosphere','first-timers'],
        pros:['Uniquely spectacular setting — medieval castle walls on both sides of the track','Watch F1 cars thread through the narrowest section on the entire calendar','An image that is simply impossible to replicate at any other circuit in the world'],
        cons:['Very limited overtaking possible in the extremely narrow castle section','Limited seating capacity — sells out quickly due to the unique setting'],
        expertTip:'The castle section is the visual highlight of the Baku street circuit. At 7.6 metres wide, cars are at their most vulnerable here. Drama and contact are always possible. A genuinely one-of-a-kind F1 experience.'
      },
      {
        id:'aze-main',
        name:'Main Grandstand',
        priceTier:'premium',
        location:'Pit straight / Start-Finish',
        covered:true,
        ratings:{view:5,overtaking:3,atmosphere:5},
        bestFor:['pit-action','atmosphere'],
        pros:['Full pit straight view — and the Baku straight is the longest in Formula 1','Covered seating at a race where heat can be an issue','Podium ceremony views at a circuit known for dramatic and unpredictable racing'],
        cons:['Premium price in a destination where mid-tier options offer excellent value'],
        expertTip:'Baku is great value across all tiers. If you are going premium, the pit straight view of the longest straight in F1 is genuinely impressive. Top speeds here exceed 360 kph.'
      }
    ]
  },
  "Singapore Grand Prix": {
    grandstands: [
      {
        id:'sgp-ga',
        name:'Zone 4 — General Access',
        priceTier:'budget',
        location:'Multiple access zones across the Marina Bay street circuit',
        covered:false,
        ratings:{view:3,overtaking:3,atmosphere:5},
        bestFor:['budget-friendly','atmosphere'],
        pros:['The best night race atmosphere in the world — extraordinary even from GA zones','Singapore\'s illuminated city skyline is visible throughout the entire circuit','Multiple entertainment zones, fan areas, and concerts across the race weekend'],
        cons:['Late night finish — public transport planning is essential for the journey home','Street circuit barriers significantly reduce sightlines in GA areas','Singapore in October is intensely hot and humid — dress light and hydrate seriously'],
        expertTip:'Singapore at night under the city lights is a spectacle like no other in F1. Even GA access lets you feel the full atmosphere. But the humidity is genuinely intense — prepare accordingly.'
      },
      {
        id:'sgp-turns1820',
        name:'Turns 18–20 / Final Chicane Grandstand',
        priceTier:'mid',
        location:'Final chicane complex approaching the pit straight',
        covered:false,
        ratings:{view:4,overtaking:3,atmosphere:5},
        bestFor:['overtaking','first-timers','atmosphere'],
        pros:['Good view into the final chicane — a key late-braking zone in the final laps','Direct sight of cars accelerating down the pit straight under the circuit lights','The Marina Bay skyline and waterfront backdrop is stunning at night'],
        cons:['The most spectacular skyline views are from the pit straight grandstands','No cover — Singapore heat and occasional tropical rain require preparation'],
        expertTip:'The approach to the start-finish line under the Singapore circuit lights is genuinely magical. A solid mid-tier option combining real racing views with the visual spectacle of the night race.'
      },
      {
        id:'sgp-bay',
        name:'Bay / Pit Grandstand',
        priceTier:'premium',
        location:'Pit straight — Marina Bay waterfront',
        covered:true,
        ratings:{view:5,overtaking:3,atmosphere:5},
        bestFor:['atmosphere','pit-action','first-timers'],
        pros:['The most visually spectacular grandstand setting in all of Formula 1','Marina Bay skyline, skyscrapers, harbour lights and the illuminated circuit as a backdrop','Covered seating — genuinely essential given Singapore\'s humidity and potential tropical rain'],
        cons:['Among the most expensive grandstand seats in Formula 1','Singapore is a premium-priced event across every tier'],
        expertTip:'Singapore is the most visually stunning race on the calendar. The pit straight grandstand at night with the city skyline is an image you will remember for the rest of your life. Worth saving up for as a once-in-a-decade experience.'
      }
    ]
  },
  "United States Grand Prix": {
    grandstands: [
      {
        id:'usa-ga',
        name:'General Admission',
        priceTier:'budget',
        location:'Various infield, hillside, and outer zones across COTA',
        covered:false,
        ratings:{view:3,overtaking:3,atmosphere:4},
        bestFor:['budget-friendly','atmosphere','first-timers'],
        pros:['COTA is a large circuit with genuinely excellent GA viewing areas','The Austin fan festival and concerts are outstanding — one of the best in F1','Turn 1 hill is accessible on GA and is one of the most famous vantage points in the sport'],
        cons:['Very large circuit — walking between zones takes significant time','Texas in October can still be very warm and sunny'],
        expertTip:'The Turn 1 hill within GA is one of the best free views in all of F1. You see cars arriving up the steep climb with the whole circuit spread below. Arrive early to secure a good position.'
      },
      {
        id:'usa-turn1',
        name:'Turn 1 Grandstand',
        priceTier:'mid',
        location:'Turn 1 — elevated hairpin at the top of the hill',
        covered:false,
        ratings:{view:5,overtaking:5,atmosphere:5},
        bestFor:['overtaking','first-timers','panoramic'],
        pros:['Genuinely one of the best grandstand seats anywhere in Formula 1','Panoramic elevated view of Turn 1 and sweeping views of the circuit below','Primary DRS and overtaking point at COTA — lap 1 incidents happen here virtually every year'],
        cons:['Very popular — buy as soon as tickets release each year','Fully exposed hilltop — sun protection and adequate water are essential'],
        expertTip:'COTA Turn 1 is extraordinary. The elevation gives you a view across the entire circuit, and the racing action here is the most consistent at any American race. Priority seat when booking.'
      },
      {
        id:'usa-main',
        name:'Main Grandstand',
        priceTier:'premium',
        location:'Pit straight / Start-Finish',
        covered:true,
        ratings:{view:5,overtaking:3,atmosphere:5},
        bestFor:['pit-action','atmosphere'],
        pros:['Full pit straight view with covered seating at an excellent host circuit','Podium, race start and pit stops all clearly visible','Premium facilities at one of the best-organised races on the American circuit'],
        cons:['Top price — COTA already commands significant ticket premiums','The Turn 1 grandstand offers more racing action at a notably lower price point'],
        expertTip:'If you are doing the US GP as a premium trip, the main grandstand is excellent. But honestly, the Turn 1 grandstand delivers more for less money — consider it as your first option.'
      }
    ]
  },
  "Mexico City Grand Prix": {
    grandstands: [
      {
        id:'mex-ga',
        name:'General Admission',
        priceTier:'budget',
        location:'Infield and outer circuit zones across the Autodromo',
        covered:false,
        ratings:{view:3,overtaking:3,atmosphere:5},
        bestFor:['budget-friendly','atmosphere'],
        pros:['Mexican fans create an atmosphere that genuinely rivals any race on the calendar','Large circuit with good variety of GA viewing positions','Excellent value for money compared to US and European equivalent events'],
        cons:['Altitude at 2,240 metres above sea level affects everyone — acclimatise carefully','Some GA zones have limited direct track views'],
        expertTip:'Mexico City altitude affects visitors more than they expect. Take the first day slowly, drink plenty of water, and avoid alcohol initially. The reward is one of the best atmospheres in Formula 1.'
      },
      {
        id:'mex-forosol',
        name:'Foro Sol Grandstand',
        priceTier:'mid',
        location:'Foro Sol stadium — Turns 13–17 (stadium section)',
        covered:false,
        ratings:{view:5,overtaking:3,atmosphere:5},
        bestFor:['atmosphere','first-timers','panoramic'],
        pros:['The only dedicated stadium section in Formula 1 — a completely unique experience','Over 70,000 fans in an enclosed venue creating extraordinary sustained noise','See cars navigate the full stadium loop from multiple elevated positions'],
        cons:['Limited overtaking within the stadium section of the circuit','Extremely loud — hearing protection is recommended for qualifying and race day'],
        expertTip:'The Foro Sol is one of F1\'s truly unique experiences. The noise when the cars pass through the stadium is physically felt as much as heard. Completely unmissable at Mexico City.'
      },
      {
        id:'mex-main',
        name:'Main Grandstand',
        priceTier:'premium',
        location:'Pit straight / Start-Finish',
        covered:true,
        ratings:{view:5,overtaking:3,atmosphere:5},
        bestFor:['pit-action','atmosphere'],
        pros:['Full pit straight view with covered seating','Podium ceremony surrounded by extraordinary Mexican fan passion','Premium hospitality in one of the world\'s great host cities'],
        cons:['Most expensive option at a race where mid-tier offers excellent value','The Foro Sol atmosphere is arguably the richer experience at the mid-price tier'],
        expertTip:'The podium ceremony at Mexico City is profoundly emotional — the fan passion here is in a class of its own. Sitting on the pit straight for the final laps and podium is a special experience.'
      }
    ]
  },
  "São Paulo Grand Prix": {
    grandstands: [
      {
        id:'bra-ga',
        name:'General Admission — Interlagos Roaming Access',
        priceTier:'budget',
        location:'Multiple zones around the compact Interlagos layout',
        covered:false,
        ratings:{view:3,overtaking:3,atmosphere:5},
        bestFor:['budget-friendly','atmosphere'],
        pros:['Interlagos is compact — GA gives good proximity to the actual track action','Brazilian fan passion is extraordinary — among the most emotional experiences in motor racing','Very good value compared to other F1 races of equivalent prestige'],
        cons:['Use official shuttles from the circuit — avoid unofficial transport completely','Some areas can become very crowded on race day at a compact circuit'],
        expertTip:'Always use official shuttles and transport at Interlagos. The Brazilian fan passion is unlike anywhere else — emotional, loud, and completely genuine. This race has a different feeling to any other.'
      },
      {
        id:'bra-k',
        name:'Grandstand K — Turn 4',
        priceTier:'mid',
        location:'Turn 4 — Descida do Lago',
        covered:false,
        ratings:{view:4,overtaking:4,atmosphere:5},
        bestFor:['overtaking','atmosphere','first-timers'],
        pros:['Reliable braking zone with regular overtaking possibilities','The compact circuit means cars are visible in multiple sections from one seat','The Brazilian atmosphere permeates every grandstand and every corner'],
        cons:['No cover — November weather in São Paulo can be very unpredictable','The undulating circuit layout can limit some specific sightlines'],
        expertTip:'Turn 4 at Interlagos is a solid and reliable seat. The compact nature of the circuit means you see more racing from here than most mid-tier positions at larger tracks.'
      },
      {
        id:'bra-premium',
        name:'Premium Hospitality',
        priceTier:'premium',
        location:'Pit straight / Start-Finish',
        covered:true,
        ratings:{view:5,overtaking:3,atmosphere:5},
        bestFor:['pit-action','atmosphere'],
        pros:['Full pit straight views with premium comfort','Podium ceremony in an emotionally charged atmosphere','The Brazilian crowd reaction to driver moments is extraordinary from this position'],
        cons:['Most expensive option at a race where mid-tier delivers excellent value','Interlagos is a historic circuit — the grandstand infrastructure is not the most modern'],
        expertTip:'Interlagos is one of the most emotionally intense venues in world sport. Whether from GA or the premium level, the Brazilian GP atmosphere is something every motorsport fan should experience at least once.'
      }
    ]
  },
  "Las Vegas Grand Prix": {
    grandstands: [
      {
        id:'lvg-ga',
        name:'General Admission',
        priceTier:'budget',
        location:'Various entertainment and fan zones along the Strip circuit',
        covered:false,
        ratings:{view:2,overtaking:2,atmosphere:5},
        bestFor:['budget-friendly','atmosphere'],
        pros:['The Las Vegas Strip as a race backdrop is visually spectacular even at GA level','Entertainment, concerts and activations throughout the extensive fan zone','A unique event experience unlike anything else in the Formula 1 calendar'],
        cons:['GA views of the actual racing cars are quite limited in Las Vegas','This is primarily a show and lifestyle event at GA level — not a pure motorsport experience','Race finishes very late — transport in Las Vegas after midnight requires planning'],
        expertTip:'Las Vegas GA is more party than racing. If watching the cars closely matters, invest in a grandstand. If the spectacle, the Strip, and the night-time party atmosphere is what you came for, GA works perfectly.'
      },
      {
        id:'lvg-turn1',
        name:'Turn 1 Chicane Grandstand',
        priceTier:'mid',
        location:'Turn 1 — main braking zone from the pit straight',
        covered:false,
        ratings:{view:4,overtaking:4,atmosphere:4},
        bestFor:['overtaking','first-timers'],
        pros:['Main overtaking point at Las Vegas — hard braking after the longest straight','Clear views of the approach, braking zone and corner exit','The best available seat for watching actual Formula 1 racing at this event'],
        cons:['Late at night in November — temperatures in Las Vegas drop sharply after dark','No cover — pack warm layers for the cold desert night air'],
        expertTip:'Turn 1 is where the racing happens in Las Vegas. The long straight leading to the tight chicane produces genuine passes. A reserved grandstand seat here is essential for actually watching the race.'
      },
      {
        id:'lvg-sphere',
        name:'Sphere Entertainment Zone',
        priceTier:'mid',
        location:'Back section of circuit — near the MSG Sphere',
        covered:false,
        ratings:{view:3,overtaking:3,atmosphere:5},
        bestFor:['atmosphere','panoramic'],
        pros:['The MSG Sphere provides a spectacular and futuristic backdrop for Formula 1 cars','A uniquely Las Vegas experience — impossible to replicate anywhere else on the calendar','Excellent photo and visual experience throughout qualifying and the race'],
        cons:['Limited overtaking in this section of the circuit','More about the visual spectacle and experience than pure racing action'],
        expertTip:'The Sphere section is a Las Vegas-only F1 moment. Watching F1 cars against one of the most technically spectacular entertainment venues in the world is something to see in person.'
      },
      {
        id:'lvg-f1club',
        name:'FORMULA 1 Club — Pit Straight',
        priceTier:'premium',
        location:'Pit straight / Start-Finish',
        covered:true,
        ratings:{view:5,overtaking:3,atmosphere:5},
        bestFor:['pit-action','atmosphere'],
        pros:['The most visually spectacular pit straight setting in all of Formula 1 — the Strip at night','Premium heated hospitality — essential for a cold November night race in the desert','The definitive Las Vegas Grand Prix experience from the best possible seat'],
        cons:['The most expensive grandstand at one of the most expensive races in the world','This is a premium lifestyle event — the price reflects that unapologetically'],
        expertTip:'Las Vegas is not a budget race and the F1 Club is not a budget seat. The Strip, the lights, the speed, and the warmth of a covered premium seat on a cold desert night — go all-in or consider a less expensive race instead.'
      }
    ]
  },
  "Qatar Grand Prix": {
    grandstands: [
      {
        id:'qat-ga',
        name:'General Admission',
        priceTier:'budget',
        location:'Various zones around the Lusail International Circuit',
        covered:false,
        ratings:{view:3,overtaking:3,atmosphere:3},
        bestFor:['budget-friendly'],
        pros:['Most affordable way to experience a night race in the Middle East','Good value if combining with Abu Dhabi the following week','November temperatures in Qatar are genuinely pleasant — not the scorching summer heat'],
        cons:['Lusail is a purpose-built stadium circuit with limited personality as a venue','GA zones at Lusail are less engaging than those at circuits with natural terrain'],
        expertTip:'Qatar pairs well with Abu Dhabi the following week. If you are doing both, use Qatar for a lower-budget experience and invest more in the season finale at Abu Dhabi.'
      },
      {
        id:'qat-turn1',
        name:'Turn 1 / Main Grandstand',
        priceTier:'mid',
        location:'Turn 1 — primary braking zone',
        covered:false,
        ratings:{view:4,overtaking:4,atmosphere:3},
        bestFor:['overtaking','first-timers'],
        pros:['Turn 1 is the primary overtaking point at Lusail — regular DRS passes occur here','Good elevated view of a significant braking zone','Reasonable prices compared to other night races on the calendar'],
        cons:['Lusail lacks the atmospheric setting of Singapore or Las Vegas for a night race','The circuit overall is clean but unremarkable as a racing venue'],
        expertTip:'Turn 1 at Qatar is a reliable source of race action. The circuit was designed for MotoGP and flows well for F1 — DRS overtaking opportunities here are consistent.'
      },
      {
        id:'qat-platinum',
        name:'Platinum Lounge',
        priceTier:'premium',
        location:'Pit straight / Start-Finish',
        covered:true,
        ratings:{view:5,overtaking:3,atmosphere:4},
        bestFor:['pit-action','atmosphere'],
        pros:['Air-conditioned lounge — comfortable even in the warm November evenings','Full pit straight and podium ceremony views','Premium facilities at a well-organised and efficient venue'],
        cons:['Qatar lacks the iconic setting of Singapore or Abu Dhabi for premium spend','If choosing between Qatar and Abu Dhabi for a premium experience, Abu Dhabi is the stronger choice'],
        expertTip:'Qatar is a solid race with a reliable premium product. But if you are allocating a premium budget across two end-of-season races, the Abu Dhabi season finale is the more significant occasion.'
      }
    ]
  },
  "Abu Dhabi Grand Prix": {
    grandstands: [
      {
        id:'abu-ga',
        name:'General Admission',
        priceTier:'budget',
        location:'Various GA zones across the Yas Marina Circuit',
        covered:false,
        ratings:{view:3,overtaking:2,atmosphere:4},
        bestFor:['budget-friendly','first-timers'],
        pros:['Access to the beautiful Yas Marina facility and island setting at a lower price point','The season finale atmosphere is always charged with emotion and significance','Multiple circuit zones accessible across the well-organised venue'],
        cons:['Yas Marina has limited overtaking opportunities regardless of viewing position','Early December in Abu Dhabi can still be warm — shade in GA zones is at a premium'],
        expertTip:'Abu Dhabi as the season finale always carries weight — championships, driver retirements, and emotional season endings happen here. Even GA gives you that finale atmosphere.'
      },
      {
        id:'abu-marina',
        name:'Yas Marina Grandstand',
        priceTier:'mid',
        location:'Marina section — Turns 19–21 alongside the waterway',
        covered:false,
        ratings:{view:5,overtaking:2,atmosphere:5},
        bestFor:['panoramic','atmosphere','first-timers'],
        pros:['One of the most beautiful settings in Formula 1 — the marina, the Viceroy Hotel, and the sea','See F1 cars weave through the final marina section as the circuit lights reflect on the water','A uniquely aesthetic and photogenic section of circuit unlike anywhere else'],
        cons:['Overtaking in the marina section is extremely limited','Yas Marina overall is not a great racing circuit despite its spectacular setting'],
        expertTip:'The Yas Marina setting is the most aesthetically beautiful in Formula 1. Watching cars negotiate the final section with the illuminated Viceroy Hotel above is genuinely magical.'
      },
      {
        id:'abu-paddock',
        name:'Paddock Club',
        priceTier:'premium',
        location:'Pit straight / Start-Finish',
        covered:true,
        ratings:{view:5,overtaking:2,atmosphere:5},
        bestFor:['pit-action','atmosphere'],
        pros:['The season finale Paddock Club is the most prestigious race occasion in Formula 1','Full pit straight views at a world-class, purpose-built racing and entertainment facility','Covered and premium — the complete package for the final race of the year'],
        cons:['The season finale brings premium pricing even by Abu Dhabi standards','Yas Marina is a processional circuit — passing is rare regardless of where you sit'],
        expertTip:'The Abu Dhabi Paddock Club on the final race weekend of the season is a once-in-a-decade treat. Championship moments, driver farewells, and emotional season endings happen here. The occasion justifies the investment.'
      }
    ]
  }
}

function GrandstandCard({ gs }) {
  const tierColor = TIER_COLORS[gs.priceTier]
  const tierLabel = TIER_LABELS[gs.priceTier]
  return (
    <div style={{background:'var(--surface-2)',borderRadius:'12px',padding:'20px',border:'1px solid var(--surface-3)',display:'flex',flexDirection:'column',gap:'14px'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:'12px'}}>
        <div style={{flex:1}}>
          <div style={{fontSize:'15px',fontWeight:700,color:'var(--text)',fontFamily:"'Barlow Condensed',sans-serif",textTransform:'uppercase',letterSpacing:'0.04em',lineHeight:1.2,marginBottom:'5px'}}>{gs.name}</div>
          <div style={{fontSize:'12px',color:'var(--text-muted)',lineHeight:1.4}}>{'📍 ' + gs.location}</div>
        </div>
        <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:'5px',flexShrink:0}}>
          <span style={{fontSize:'11px',fontWeight:700,color:tierColor,background:tierColor+'20',border:'1px solid '+tierColor+'50',borderRadius:'4px',padding:'3px 8px',textTransform:'uppercase',letterSpacing:'0.06em',fontFamily:"'Barlow Condensed',sans-serif",whiteSpace:'nowrap'}}>{tierLabel}</span>
          {gs.covered && <span style={{fontSize:'10px',color:'#60A5FA',background:'#60A5FA15',border:'1px solid #60A5FA40',borderRadius:'4px',padding:'2px 6px',textTransform:'uppercase',letterSpacing:'0.05em',fontFamily:"'Barlow Condensed',sans-serif",whiteSpace:'nowrap'}}>✓ Covered</span>}
        </div>
      </div>
      <div>
        <RatingBar label="View Quality" value={gs.ratings.view} color="#3B82F6"/>
        <RatingBar label="Overtaking Action" value={gs.ratings.overtaking} color="#E8002D"/>
        <RatingBar label="Atmosphere" value={gs.ratings.atmosphere} color="#F59E0B"/>
      </div>
      <div style={{borderTop:'1px solid var(--surface-3)',paddingTop:'12px'}}>
        {gs.pros.map((p,i) => (
          <div key={'p'+i} style={{display:'flex',gap:'8px',marginBottom:'6px',fontSize:'13px',color:'var(--text-muted)',lineHeight:1.4}}>
            <span style={{color:'#22C55E',flexShrink:0,fontWeight:700}}>✓</span>
            <span>{p}</span>
          </div>
        ))}
        {gs.cons.map((c,i) => (
          <div key={'c'+i} style={{display:'flex',gap:'8px',marginBottom:'6px',fontSize:'13px',color:'var(--text-muted)',lineHeight:1.4}}>
            <span style={{color:'#E8002D',flexShrink:0,fontWeight:700}}>✗</span>
            <span>{c}</span>
          </div>
        ))}
      </div>
      <div style={{background:'var(--surface-3)',borderRadius:'8px',padding:'12px 14px',borderLeft:'3px solid var(--amber)'}}>
        <div style={{fontSize:'10px',color:'var(--amber)',textTransform:'uppercase',letterSpacing:'0.1em',fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,marginBottom:'5px'}}>💡 Expert Tip</div>
        <div style={{fontSize:'13px',color:'var(--text)',lineHeight:1.55}}>{gs.expertTip}</div>
      </div>
      <div style={{display:'flex',flexWrap:'wrap',gap:'6px'}}>
        {gs.bestFor.filter(t => TAG_LABELS[t]).map(t => (
          <span key={t} style={{fontSize:'10px',color:'var(--text-dim)',background:'var(--surface-3)',border:'1px solid var(--text-dim)',borderRadius:'20px',padding:'2px 9px',fontFamily:"'Barlow Condensed',sans-serif",textTransform:'uppercase',letterSpacing:'0.05em'}}>{TAG_LABELS[t]}</span>
        ))}
        {gs.covered && <span style={{fontSize:'10px',color:'var(--text-dim)',background:'var(--surface-3)',border:'1px solid var(--text-dim)',borderRadius:'20px',padding:'2px 9px',fontFamily:"'Barlow Condensed',sans-serif",textTransform:'uppercase',letterSpacing:'0.05em'}}>Covered</span>}
      </div>
    </div>
  )
}

export default function GrandstandPicker({ race, onBack }) {
  const [tierFilter, setTierFilter] = useState('all')
  const [tagFilter, setTagFilter] = useState('all')

  const data = grandstandData[race.name]

  const filtered = data ? data.grandstands.filter(gs => {
    if (tierFilter !== 'all' && gs.priceTier !== tierFilter) return false
    if (tagFilter === 'covered') return gs.covered
    if (tagFilter !== 'all' && !gs.bestFor.includes(tagFilter)) return false
    return true
  }) : []

  const filtersActive = tierFilter !== 'all' || tagFilter !== 'all'

  const chipStyle = (active) => ({
    fontSize:'12px',
    padding:'5px 13px',
    borderRadius:'20px',
    border:'1px solid ' + (active ? 'var(--red)' : 'var(--surface-3)'),
    background: active ? 'rgba(232,0,45,0.12)' : 'var(--surface-2)',
    color: active ? 'var(--red)' : 'var(--text-muted)',
    cursor:'pointer',
    fontFamily:"'Barlow Condensed',sans-serif",
    textTransform:'uppercase',
    letterSpacing:'0.05em',
    fontWeight:600,
    transition:'all 0.15s',
    whiteSpace:'nowrap',
  })

  const css = '.gps-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}.gps-chips{display:flex;flex-wrap:wrap;gap:8px}@media(max-width:720px){.gps-grid{grid-template-columns:1fr}}'

  return (
    <div>
      <style dangerouslySetInnerHTML={{__html:css}}/>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'24px',gap:'12px',flexWrap:'wrap'}}>
        <button onClick={onBack} style={{display:'flex',alignItems:'center',gap:'8px',background:'none',border:'none',color:'var(--text-muted)',cursor:'pointer',padding:'6px 0',fontSize:'14px',fontFamily:'Barlow,sans-serif'}}>
          <BackIcon/>Back to options
        </button>
        <div style={{textAlign:'right'}}>
          <div style={{fontSize:'16px',fontWeight:700,color:'var(--text)',fontFamily:"'Barlow Condensed',sans-serif",textTransform:'uppercase',letterSpacing:'0.06em'}}>Grandstand Picker</div>
          <div style={{fontSize:'12px',color:'var(--text-muted)',marginTop:'2px'}}>{'Expert guide · ' + race.circuit}</div>
        </div>
      </div>

      <div style={{background:'var(--surface-2)',borderRadius:'10px',padding:'14px 16px',marginBottom:'20px',display:'flex',justifyContent:'space-between',alignItems:'center',gap:'16px',flexWrap:'wrap',border:'1px solid var(--surface-3)'}}>
        <div>
          <div style={{fontSize:'14px',fontWeight:700,color:'var(--text)',fontFamily:"'Barlow Condensed',sans-serif",textTransform:'uppercase',letterSpacing:'0.04em'}}>{race.circuit}</div>
          <div style={{fontSize:'12px',color:'var(--text-muted)',marginTop:'2px'}}>{race.city + ', ' + race.country + ' · ' + race.dates}</div>
        </div>
        <div style={{fontSize:'12px',color:'var(--text-muted)',flexShrink:0}}>
          {data ? String(data.grandstands.length) + ' viewing areas covered' : 'Data coming soon'}
        </div>
      </div>

      {data && (
        <div style={{marginBottom:'20px'}}>
          <div style={{marginBottom:'12px'}}>
            <div style={{fontSize:'11px',color:'var(--text-dim)',textTransform:'uppercase',letterSpacing:'0.08em',fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,marginBottom:'8px'}}>Price Tier</div>
            <div className="gps-chips">
              {TIER_OPTS.map(opt => (
                <button key={opt.id} onClick={() => setTierFilter(opt.id)} style={chipStyle(tierFilter === opt.id)}>{opt.label}</button>
              ))}
            </div>
          </div>
          <div>
            <div style={{fontSize:'11px',color:'var(--text-dim)',textTransform:'uppercase',letterSpacing:'0.08em',fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,marginBottom:'8px'}}>Best For</div>
            <div className="gps-chips">
              {TAG_OPTS.map(opt => (
                <button key={opt.id} onClick={() => setTagFilter(opt.id)} style={chipStyle(tagFilter === opt.id)}>{opt.label}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {data && filtersActive && (
        <div style={{fontSize:'12px',color:'var(--text-muted)',marginBottom:'14px'}}>
          {filtered.length === 0
            ? 'No grandstands match your filters'
            : String(filtered.length) + ' grandstand' + (filtered.length !== 1 ? 's' : '') + ' shown'}
        </div>
      )}

      {filtered.length > 0 ? (
        <div className="gps-grid">
          {filtered.map(gs => <GrandstandCard key={gs.id} gs={gs}/>)}
        </div>
      ) : data ? (
        <div style={{textAlign:'center',padding:'48px 20px',color:'var(--text-muted)'}}>
          <div style={{fontSize:'36px',marginBottom:'12px'}}>🏟️</div>
          <div style={{fontSize:'15px',fontWeight:600,color:'var(--text)',marginBottom:'6px'}}>No grandstands match your filters</div>
          <div style={{fontSize:'13px',marginBottom:'20px'}}>Try adjusting the price tier or experience filter above</div>
          <button onClick={() => { setTierFilter('all'); setTagFilter('all') }} style={{padding:'9px 22px',background:'var(--red)',color:'white',border:'none',borderRadius:'6px',cursor:'pointer',fontSize:'13px',fontFamily:'Barlow,sans-serif',fontWeight:500}}>Clear filters</button>
        </div>
      ) : (
        <div style={{textAlign:'center',padding:'48px 20px',color:'var(--text-muted)'}}>
          <div style={{fontSize:'36px',marginBottom:'12px'}}>🏟️</div>
          <div style={{fontSize:'15px',fontWeight:600,color:'var(--text)',marginBottom:'6px'}}>{'Data coming soon for ' + race.name}</div>
          <div style={{fontSize:'13px'}}>We are adding grandstand data for every circuit — check back soon.</div>
        </div>
      )}

      <div style={{marginTop:'24px',padding:'14px 16px',background:'var(--surface-2)',borderRadius:'8px',border:'1px solid var(--surface-3)'}}>
        <p style={{fontSize:'12px',color:'var(--text-dim)',margin:0,lineHeight:1.5}}>Grandstand data is based on official circuit information and expert fan knowledge. Ticket prices, availability and grandstand layouts can change — always verify with the official event ticketing site before purchasing.</p>
      </div>
    </div>
  )
}
