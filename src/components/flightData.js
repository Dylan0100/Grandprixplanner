const flightData = {

  "Australian Grand Prix": {
    destination: "Melbourne, Australia",
    primaryAirport: {
      code: "MEL",
      name: "Melbourne Tullamarine Airport",
      transferTime: "30–40 min to city centre",
      transferOptions: [
        "SkyBus (~AUD 32, runs 24/7, 30 min to Southern Cross Station)",
        "Taxi / Uber (~AUD 55–70 to city centre)",
        "No direct train link to the city"
      ]
    },
    avoidAirport: "Avoid Avalon (AVV) — 90 min from Melbourne with no reliable public transport to the circuit",
    secondaryOption: null,
    ukRouting: {
      typicalRoute: "London Heathrow → Dubai or Singapore → Melbourne",
      commonHubs: ["Dubai (Emirates)", "Singapore (Singapore Airlines)", "Hong Kong (Cathay Pacific)"],
      totalTravelTime: "22–26 hours total",
      directAvailable: false
    },
    recommendedAirlines: ["Emirates", "Singapore Airlines", "Qantas", "Cathay Pacific"],
    bookingWindow: {
      ideal: "5–6 months out",
      acceptable: "3–4 months out",
      lastMinuteRisk: "High — race week fares typically 2–3× base fare. March timing overlaps Australian school holidays."
    },
    typicalFareRange: "£900 – £1,400 return from London",
    pricingTips: [
      "Emirates and Singapore Airlines frequently undercut BA on this route",
      "Set fare alerts on Google Flights 6 months out — there are occasional sales windows",
      "Positioning to Heathrow is worth it — far more route options than regional UK airports on this corridor"
    ],
    destinationNotes: [
      "Albert Park circuit is 6km from Melbourne CBD — easy tram (Route 58) or rideshare from city hotels",
      "UK passport holders require an Australian ETA (~AUD 20) — apply online well before travel, not at the airport",
      "March is late summer in Melbourne — warm days (22–28°C) but evenings can be cooler; bring a layer for night sessions",
      "The race typically sells out well in advance — secure tickets before booking flights"
    ]
  },

  "Chinese Grand Prix": {
    destination: "Shanghai, China",
    primaryAirport: {
      code: "PVG",
      name: "Shanghai Pudong International Airport",
      transferTime: "45–60 min to city centre",
      transferOptions: [
        "Maglev to Longyang Rd then Metro (~CNY 55 total, 30 min) — the fast, fun option",
        "Taxi (~CNY 180–250, 45–60 min depending on traffic)",
        "Metro Line 2 direct (~CNY 7, 60+ min)"
      ]
    },
    avoidAirport: "Hongqiao (SHA) serves domestic routes only — not relevant for UK arrivals",
    secondaryOption: null,
    ukRouting: {
      typicalRoute: "London Heathrow → hub → Shanghai Pudong",
      commonHubs: ["Helsinki (Finnair)", "Amsterdam (KLM)", "Doha (Qatar Airways)", "Dubai (Emirates)"],
      totalTravelTime: "14–18 hours total",
      directAvailable: false
    },
    recommendedAirlines: ["Finnair", "KLM", "Qatar Airways", "Air China", "China Eastern"],
    bookingWindow: {
      ideal: "3–4 months out",
      acceptable: "2–3 months out",
      lastMinuteRisk: "Moderate — race weekend drives hotel prices more than flights on this route"
    },
    typicalFareRange: "£550 – £950 return from London",
    pricingTips: [
      "Finnair via Helsinki consistently offers competitive fares and short layovers — often the sweet spot",
      "China Eastern direct pricing can be very competitive but service quality is inconsistent — check reviews",
      "UK citizens currently benefit from visa-free access for stays under 15 days — verify this policy remains active before booking"
    ],
    destinationNotes: [
      "Shanghai International Circuit is 30km from the city — allow 60–90 min on race day due to traffic",
      "Dedicated shuttle buses run from major city hotels on race weekend",
      "Set up a VPN before you leave — Google, WhatsApp, and most Western apps are blocked in China",
      "Carry some cash (CNY) — despite WeChat Pay dominance, tourists without a Chinese bank account still need it"
    ]
  },

  "Japanese Grand Prix": {
    destination: "Suzuka, Japan",
    primaryAirport: {
      code: "NGO",
      name: "Nagoya Chubu Centrair Airport",
      transferTime: "60–75 min to Suzuka by train",
      transferOptions: [
        "Meitetsu Express to Nagoya then JR Kansai line to Shirako (~¥1,500, 75 min total)",
        "Race weekend direct shuttle buses from Nagoya city",
        "Taxi from Nagoya station (~¥8,000–10,000)"
      ]
    },
    avoidAirport: null,
    secondaryOption: "Osaka Kansai (KIX) is a solid alternative — 90 min to Suzuka and better for exploring Kyoto/Osaka. Tokyo Narita/Haneda then Shinkansen (3 hours to Nagoya) works well for multi-city Japan trips.",
    ukRouting: {
      typicalRoute: "London Heathrow → hub → Nagoya (NGO) or Osaka (KIX)",
      commonHubs: ["Dubai (Emirates to KIX)", "Doha (Qatar to NGO)", "Helsinki (Finnair to HND/KIX)", "Amsterdam (KLM to KIX)"],
      totalTravelTime: "16–22 hours total",
      directAvailable: false
    },
    recommendedAirlines: ["Japan Airlines", "ANA", "Qatar Airways", "Finnair", "KLM"],
    bookingWindow: {
      ideal: "5–6 months out",
      acceptable: "3–4 months out",
      lastMinuteRisk: "Very high — Suzuka is the most sought-after ticket on the calendar; circuit-side accommodation books out almost instantly when released"
    },
    typicalFareRange: "£700 – £1,100 return from London",
    pricingTips: [
      "Flying into Osaka (KIX) often yields better fares than Nagoya (NGO) — the train journey is longer but very manageable",
      "JAL and ANA offer excellent service but at premium prices — Finnair and KLM are usually better value",
      "Consider Tokyo as your arrival city and do Suzuka as part of a wider Japan trip — the JR Pass makes rail travel exceptional value"
    ],
    destinationNotes: [
      "Most fans base in Nagoya city and commute daily — circuit-side hotels sell out in minutes when tickets release",
      "UK citizens get 90-day visa-free access to Japan",
      "The race typically draws enormous Japanese fan support — arrive at the circuit very early on race day",
      "April in Suzuka: cool (12–20°C) — layers essential, especially for qualifying and early morning sessions",
      "Japan is still largely cash-based in rural areas — carry yen"
    ]
  },

  "Bahrain Grand Prix": {
    destination: "Sakhir, Bahrain",
    primaryAirport: {
      code: "BAH",
      name: "Bahrain International Airport",
      transferTime: "30 min to circuit, 20 min to Manama",
      transferOptions: [
        "Taxi (~BHD 5–8 to Manama, BHD 8–12 to circuit)",
        "Uber available and reliable throughout Bahrain",
        "Race weekend official shuttles from Manama city hotels"
      ]
    },
    avoidAirport: null,
    secondaryOption: null,
    ukRouting: {
      typicalRoute: "London Heathrow or Gatwick → Bahrain direct",
      commonHubs: [],
      totalTravelTime: "6.5–7 hours direct",
      directAvailable: true
    },
    recommendedAirlines: ["Gulf Air", "British Airways"],
    bookingWindow: {
      ideal: "3–4 months out",
      acceptable: "6–8 weeks out",
      lastMinuteRisk: "Low-moderate — this route is well-served and prices are relatively stable until 3–4 weeks before the race"
    },
    typicalFareRange: "£350 – £700 return from London",
    pricingTips: [
      "Gulf Air often significantly undercuts BA on this route — compare both before booking",
      "Direct flights make Bahrain one of the most logistically straightforward races on the calendar",
      "Bahrain makes an excellent stopover hub if you are combining with other Gulf races"
    ],
    destinationNotes: [
      "Night race — temperatures are far more comfortable than daytime (18–24°C in the evening in March)",
      "UK citizens can obtain a Bahrain e-Visa on arrival (free) or apply online in advance — no hassle either way",
      "Bahrain is more relaxed than other Gulf states but dress respectfully outside circuit and hotel areas",
      "The circuit is in the desert — outside of race weekend infrastructure the surrounding area is sparse"
    ]
  },

  "Saudi Arabian Grand Prix": {
    destination: "Jeddah, Saudi Arabia",
    primaryAirport: {
      code: "JED",
      name: "King Abdulaziz International Airport",
      transferTime: "25–30 min to Jeddah Corniche Circuit",
      transferOptions: [
        "Taxi (~SAR 50–80 to circuit area)",
        "Uber available and widely used in Jeddah",
        "Race weekend official shuttles from central Jeddah hotels"
      ]
    },
    avoidAirport: null,
    secondaryOption: null,
    ukRouting: {
      typicalRoute: "London Heathrow → Jeddah direct",
      commonHubs: ["Dubai (Emirates — if not flying direct)"],
      totalTravelTime: "6.5 hours direct",
      directAvailable: true
    },
    recommendedAirlines: ["British Airways", "Saudia", "Flydubai via Dubai"],
    bookingWindow: {
      ideal: "3–4 months out",
      acceptable: "6–8 weeks out",
      lastMinuteRisk: "Moderate — race weekend demand noticeably pushes fares up; book when you secure tickets"
    },
    typicalFareRange: "£400 – £750 return from London",
    pricingTips: [
      "Saudia often offers competitive fares vs BA — compare both as prices fluctuate",
      "BA operates direct Heathrow–Jeddah year-round — reliable but rarely the cheapest option",
      "Check Flydubai or Emirates via Dubai if direct options are expensive on your preferred dates"
    ],
    destinationNotes: [
      "UK citizens require a Saudi e-Visa (~£120, multiple-entry now available) — apply online well in advance",
      "Night race — the Corniche street circuit at night is spectacular; late finishes mean midnight transfers so book reliable transport in advance",
      "Jeddah is notably more liberal than Riyadh — the Corniche area is tourist-friendly",
      "Alcohol is unavailable throughout Saudi Arabia — plan accordingly",
      "March evenings are warm and pleasant (~22–26°C) — very comfortable for spectating"
    ]
  },

  "Miami Grand Prix": {
    destination: "Miami, Florida, USA",
    primaryAirport: {
      code: "MIA",
      name: "Miami International Airport",
      transferTime: "25–35 min to Hard Rock Stadium area",
      transferOptions: [
        "Uber / Lyft (~USD 30–45 to circuit area — most practical option)",
        "Taxi (~USD 40–55)",
        "Rental car — parking exists but is congested; not recommended race day"
      ]
    },
    avoidAirport: null,
    secondaryOption: "Fort Lauderdale (FLL) — 45 min from circuit, often significantly cheaper. Worth checking if the saving is £150 or more.",
    ukRouting: {
      typicalRoute: "London Heathrow, Gatwick, or Manchester → Miami direct",
      commonHubs: [],
      totalTravelTime: "9.5–10 hours direct",
      directAvailable: true
    },
    recommendedAirlines: ["Virgin Atlantic", "British Airways", "American Airlines"],
    bookingWindow: {
      ideal: "5–6 months out",
      acceptable: "3–4 months out",
      lastMinuteRisk: "Very high — Miami race weekend is extremely popular, falls in peak May season, and hotel prices near the circuit are enormous"
    },
    typicalFareRange: "£550 – £1,050 return from London",
    pricingTips: [
      "Virgin Atlantic frequently offers better value than BA on the LHR–MIA route — check both",
      "Fort Lauderdale fares can save £150+ and the transfer is manageable — worth the comparison",
      "May is peak Miami season — book flights and hotels simultaneously at the earliest opportunity",
      "Regional UK airports (Manchester, Birmingham) sometimes have surprisingly competitive one-stop fares to MIA"
    ],
    destinationNotes: [
      "ESTA required for UK passport holders (~USD 14) — apply at esta.cbp.dhs.gov well in advance",
      "The circuit is in Miami Gardens, not Miami Beach — plan transfers accordingly; they are different parts of a very spread-out city",
      "May in Miami: hot and humid (~30°C), afternoon thunderstorms are common — dress light and have a poncho",
      "Miami race weekend is a major social event — expect premium pricing on everything in the city"
    ]
  },

  "Emilia Romagna Grand Prix": {
    destination: "Imola, Italy",
    primaryAirport: {
      code: "BLQ",
      name: "Bologna Guglielmo Marconi Airport",
      transferTime: "35–40 min to Imola",
      transferOptions: [
        "Aerobus to Bologna Centrale then regional train to Imola (~EUR 8 total, 50 min)",
        "Taxi direct from airport (~EUR 60–75 to Imola)",
        "Race weekend park-and-ride organised from Bologna outskirts"
      ]
    },
    avoidAirport: "Avoid Rome Fiumicino (FCO) — 3.5+ hours to Imola by high-speed train; not worth it",
    secondaryOption: "Rimini (RMI) — seasonal Ryanair routes, 75 min from Imola. Milan Malpensa (MXP) — 2.5 hours, useful if combining with Milan.",
    ukRouting: {
      typicalRoute: "UK regional airport → Bologna direct (budget carriers)",
      commonHubs: [],
      totalTravelTime: "2–2.5 hours flight",
      directAvailable: true
    },
    recommendedAirlines: ["Ryanair", "easyJet", "Jet2", "Wizz Air"],
    bookingWindow: {
      ideal: "2–3 months out",
      acceptable: "6–8 weeks out",
      lastMinuteRisk: "Moderate — flights stay reasonable; Imola and Bologna accommodation is the real constraint, especially for Friday–Sunday"
    },
    typicalFareRange: "£80 – £250 return from UK (budget carriers)",
    pricingTips: [
      "One of the most accessible races from the UK — multiple UK airports have direct budget routes to Bologna",
      "Ryanair from Stansted and easyJet from Gatwick, Bristol, and Liverpool are usually cheapest",
      "Hire a car at Bologna for flexibility — Imola town and the surrounding Emilia-Romagna region rewards exploration",
      "Staying in Bologna city is often better value than Imola, with excellent food and easy daily commute to the circuit"
    ],
    destinationNotes: [
      "No visa required for UK citizens — standard 90-day Schengen access",
      "Imola is a beautiful historic circuit town — many restaurants are within walking distance of the paddock",
      "May weather in Emilia-Romagna: warm (18–24°C) but changeable — pack a rain layer",
      "The region is world-famous for food and motor racing history — well worth extending the trip"
    ]
  },

  "Monaco Grand Prix": {
    destination: "Monaco",
    primaryAirport: {
      code: "NCE",
      name: "Nice Côte d'Azur Airport",
      transferTime: "40–70 min to Monaco (longer race weekend due to traffic and road closures)",
      transferOptions: [
        "Helicopter (~EUR 150–200, 7 min) — book months in advance; spectacular and worth it once",
        "Bus #110 from airport terminal (~EUR 22, 45–70 min race weekend)",
        "Train: airport tram to Nice-Ville then train to Monaco-Monte-Carlo (~EUR 10, 60 min)",
        "Taxi (~EUR 90–130 race weekend with surcharge)"
      ]
    },
    avoidAirport: null,
    secondaryOption: null,
    ukRouting: {
      typicalRoute: "UK airport → Nice direct",
      commonHubs: [],
      totalTravelTime: "2–2.5 hours flight",
      directAvailable: true
    },
    recommendedAirlines: ["easyJet", "British Airways", "Ryanair", "Vueling"],
    bookingWindow: {
      ideal: "6+ months out",
      acceptable: "4–5 months out",
      lastMinuteRisk: "Extreme — Monaco is the most expensive race on the calendar. Accommodation and hospitality sell out within days of tickets releasing. The flights are the affordable part."
    },
    typicalFareRange: "£120 – £350 return from UK (flights are manageable — accommodation and hospitality are not)",
    pricingTips: [
      "easyJet and BA both serve Nice well from multiple UK airports — keep checking as fares to NCE are competitive",
      "Consider basing yourself in Nice, Cannes, or Antibes — hotels are a fraction of Monaco prices, and the train link is easy",
      "Arrive Thursday — Monaco locks down for race weekend and Thursday's historic F1 cars session is genuinely excellent"
    ],
    destinationNotes: [
      "No visa required for UK citizens — standard 90-day Schengen access",
      "Monaco is tiny and walkable once you're there — no need for taxis within the principality",
      "May weather: warm and typically sunny (20–25°C) — usually the most reliable weather on the calendar",
      "The helicopter transfer from Nice is genuinely worth doing once for the views of the Côte d'Azur",
      "Grandstand tickets with a view of the harbour are among the most prized in sport — book immediately when released"
    ]
  },

  "Spanish Grand Prix": {
    destination: "Barcelona, Spain",
    primaryAirport: {
      code: "BCN",
      name: "Barcelona El Prat Airport",
      transferTime: "40–50 min to Circuit de Catalunya",
      transferOptions: [
        "Metro to Passeig de Gràcia then official race weekend shuttle bus to circuit",
        "Aerobus to Plaça de Catalunya then shuttle (~EUR 6 Aerobus + ~EUR 30 taxi to circuit)",
        "Taxi direct from airport (~EUR 60–80 race weekend with surcharge)",
        "Race weekend official coach from city centre to circuit"
      ]
    },
    avoidAirport: null,
    secondaryOption: "Girona (GRO) — Ryanair serves it from several UK airports, 90 min from Barcelona by coach. Worth checking if it's considerably cheaper.",
    ukRouting: {
      typicalRoute: "UK airport → Barcelona direct (numerous options from most UK airports)",
      commonHubs: [],
      totalTravelTime: "2–2.5 hours flight",
      directAvailable: true
    },
    recommendedAirlines: ["Ryanair", "easyJet", "Jet2", "British Airways", "Vueling", "Iberia"],
    bookingWindow: {
      ideal: "2–3 months out",
      acceptable: "4–6 weeks out",
      lastMinuteRisk: "Low-moderate — Barcelona is one of the most competitive airline routes from the UK"
    },
    typicalFareRange: "£80 – £220 return from UK",
    pricingTips: [
      "One of the cheapest races to reach from the UK — intense airline competition keeps fares low year-round",
      "Regional UK airports frequently beat London prices here — check Manchester, Birmingham, and Bristol",
      "The Circuit de Catalunya is well north of Barcelona city — allow 60–90 min door-to-door on race day including shuttle queues"
    ],
    destinationNotes: [
      "No visa required for UK citizens — standard 90-day Schengen access",
      "June in Barcelona: hot and dry (25–30°C) — bring sunscreen, a hat, and carry water",
      "Stay in central Barcelona for the best experience — the city is world-class and well worth extending the trip",
      "The circuit itself is in a fairly unremarkable business park area north of the city — don't base yourself near it"
    ]
  },

  "Canadian Grand Prix": {
    destination: "Montreal, Canada",
    primaryAirport: {
      code: "YUL",
      name: "Montreal Trudeau International Airport",
      transferTime: "25–35 min to city centre",
      transferOptions: [
        "747 Express Bus to Berri-UQAM metro station (~CAD 11, 45–55 min)",
        "Taxi (~CAD 50–70)",
        "Uber / Lyft available and reliable"
      ]
    },
    avoidAirport: null,
    secondaryOption: null,
    ukRouting: {
      typicalRoute: "London Heathrow or Gatwick → Montreal direct",
      commonHubs: ["Toronto (Air Canada if connecting)", "Amsterdam or Frankfurt (if indirect)"],
      totalTravelTime: "7–7.5 hours direct",
      directAvailable: true
    },
    recommendedAirlines: ["Air Transat", "British Airways", "Air Canada"],
    bookingWindow: {
      ideal: "4–5 months out",
      acceptable: "2–3 months out",
      lastMinuteRisk: "High — Canadian GP is immensely popular with European fans and June is peak transatlantic travel season"
    },
    typicalFareRange: "£500 – £900 return from London",
    pricingTips: [
      "Air Transat regularly undercuts BA by £150–200 on the LHR/LGW–YUL route — worth a direct comparison",
      "BA has the most frequent schedule; Air Transat usually wins on price for standard economy",
      "Check if combining with a New York or Boston add-on — transatlantic multi-city fares sometimes work out cheaper than Montreal return"
    ],
    destinationNotes: [
      "UK citizens need an eTA for Canada (~CAD 7) — apply online before departure at ircc.canada.ca",
      "The Circuit Gilles Villeneuve is on Île Notre-Dame in the St Lawrence river — the race weekend atmosphere is extraordinary",
      "June in Montreal: warm and pleasant (20–26°C), occasionally thundery — light layers for evening sessions",
      "Montreal is consistently rated one of the best race weekend cities — bilingual, exceptional food scene, great nightlife",
      "Metro and walking are the easiest ways around on race day; the circuit island access is well-managed"
    ]
  },

  "Austrian Grand Prix": {
    destination: "Spielberg, Austria",
    primaryAirport: {
      code: "GRZ",
      name: "Graz Airport",
      transferTime: "60–70 min to Red Bull Ring",
      transferOptions: [
        "Car hire from Graz airport — most practical option for the area",
        "Taxi (~EUR 70–95 to circuit)",
        "Race weekend shuttle buses from Graz city centre"
      ]
    },
    avoidAirport: null,
    secondaryOption: "Salzburg (SZG) — 90 min drive. Munich (MUC) — 2.5 hours drive but often better UK flight options. Vienna (VIE) — 2.5 hours but well-connected from UK.",
    ukRouting: {
      typicalRoute: "UK airport → Graz (Ryanair direct), or UK → Munich or Salzburg → drive",
      commonHubs: ["Munich (Lufthansa hub)", "Vienna (Austrian Airlines)"],
      totalTravelTime: "2–3 hours flight + transfer",
      directAvailable: true
    },
    recommendedAirlines: ["Ryanair (to GRZ)", "easyJet (to SZG)", "Lufthansa (to MUC)", "Austrian Airlines (to VIE)"],
    bookingWindow: {
      ideal: "3–4 months out",
      acceptable: "6–8 weeks out",
      lastMinuteRisk: "Moderate — flights remain available; circuit-side camping books up faster than accommodation in nearby towns"
    },
    typicalFareRange: "£80 – £250 return from UK",
    pricingTips: [
      "Ryanair to Graz is the most direct option if timed well — Stansted or various UK regionals serve this route",
      "Flying into Munich and hiring a car gives the most flexibility with often the best UK fares — scenic drive through the Alps too",
      "Salzburg via easyJet from Gatwick or Bristol is a strong option — one of Europe's most beautiful cities to base yourself"
    ],
    destinationNotes: [
      "No visa required for UK citizens — standard 90-day Schengen access",
      "The Red Bull Ring is set in stunning Alpine countryside — one of the most beautiful circuits on the calendar",
      "July weather: warm and sunny (24–28°C) but afternoon Alpine thunderstorms are extremely common — a good waterproof is essential",
      "On-site camping at the circuit is legendary among F1 fans — many fans never need a hotel transfer",
      "Surrounding Styrian villages are charming but accommodation is very limited — book months in advance"
    ]
  },

  "British Grand Prix": {
    destination: "Silverstone, Northamptonshire, UK",
    primaryAirport: {
      code: null,
      name: "No flight needed for UK-based fans",
      transferTime: "1–3 hours from most UK cities by road or rail",
      transferOptions: [
        "Train to Silverstone Central race weekend station — direct from London Euston via Milton Keynes, most stress-free option",
        "Official GP coaches from London and major cities (National Express race services)",
        "Car via A43 / M1 junction 15A — allow 2–3 hours extra on Sunday; traffic is significant",
        "Cycle routes to the circuit are well-signed and popular with local fans"
      ]
    },
    avoidAirport: null,
    secondaryOption: "International fans connecting into the UK: Birmingham (BHX, 45 min) or London Heathrow (LHR, 60 min) are the most practical arrival airports.",
    ukRouting: {
      typicalRoute: "Domestic — no international travel required for UK residents",
      commonHubs: [],
      totalTravelTime: "Varies — 1 to 3 hours from most UK locations",
      directAvailable: true
    },
    recommendedAirlines: [],
    bookingWindow: {
      ideal: "Book accommodation 6+ months out — local hotels and B&Bs fill up faster than almost any other UK event",
      acceptable: "Tickets should be secured as soon as they release — grandstands sell out quickly",
      lastMinuteRisk: "Very high for accommodation — options within 30 minutes of the circuit are gone within days of ticket sales"
    },
    typicalFareRange: "No flights needed. Train or coach from ~£30–£80 return depending on origin.",
    pricingTips: [
      "The direct Silverstone Central train is by far the most stress-free option — runs from Milton Keynes throughout the weekend",
      "On-site camping (Club, Village, and Woodlands camping) is excellent and removes the transfer problem entirely",
      "Driving on Sunday requires leaving before 17:00 or after 20:00 to avoid the worst traffic",
      "Northampton and Milton Keynes make practical bases if camping is not for you"
    ],
    destinationNotes: [
      "Silverstone in July is one of the great sporting occasions anywhere in the world — the home race atmosphere is unmatched",
      "British summer weather: bring sun cream AND a full waterproof — both will be needed",
      "General admission areas at Silverstone are extensive and very well positioned — GA is a great value option here",
      "The circuit is in a relatively remote Northamptonshire location — plan transfers carefully if not camping"
    ]
  },

  "Belgian Grand Prix": {
    destination: "Spa-Francorchamps, Belgium",
    primaryAirport: {
      code: "LGG",
      name: "Liège Airport",
      transferTime: "45–55 min to circuit",
      transferOptions: [
        "Car hire from Liège — recommended; Spa area has very limited public transport",
        "Taxi (~EUR 70–90 to circuit)",
        "Race weekend shuttle buses from Liège city"
      ]
    },
    avoidAirport: null,
    secondaryOption: "Brussels (BRU) — 2 hours drive. Luxembourg (LUX) — 90 min. Cologne (CGN) — 90 min. Maastricht (MST) — 75 min. Eurostar London → Brussels + car hire is a genuine and often excellent alternative to flying.",
    ukRouting: {
      typicalRoute: "UK airport → Liège (Ryanair), or Eurostar London → Brussels → car hire",
      commonHubs: [],
      totalTravelTime: "1.5 hours flight, or 2h15m Eurostar to Brussels + 2h drive",
      directAvailable: true
    },
    recommendedAirlines: ["Ryanair (to LGG)", "Brussels Airlines (to BRU)", "British Airways (to BRU)"],
    bookingWindow: {
      ideal: "3–4 months out",
      acceptable: "6–8 weeks out",
      lastMinuteRisk: "Moderate — Spa area has very limited accommodation; campsites fill months in advance"
    },
    typicalFareRange: "£50 – £180 return flight; Eurostar from ~£80 return",
    pricingTips: [
      "Eurostar to Brussels plus car hire is often competitive with flying when you factor in luggage fees and airport transfers",
      "Ryanair Stansted to Liège is the most direct air option — check times as Liège has limited daily services",
      "Multiple airports within 90 minutes give good backup options if Liège fares are high",
      "Eurotunnel or ferry to Calais and driving through Belgium is a genuinely viable option for those who prefer it"
    ],
    destinationNotes: [
      "No visa required for UK citizens — standard 90-day Schengen access",
      "Spa-Francorchamps is set in the Ardennes forest — stunning location but with notoriously changeable weather",
      "Bring full waterproofs regardless of forecast — Spa's weather is legendary for its unpredictability and changes by sector",
      "Late July / August: mild (18–24°C) but rain can arrive suddenly and heavily — plan accordingly",
      "Camping within and around the circuit is very popular and well-organised; book early"
    ]
  },

  "Hungarian Grand Prix": {
    destination: "Budapest, Hungary",
    primaryAirport: {
      code: "BUD",
      name: "Budapest Ferenc Liszt International Airport",
      transferTime: "20–25 min to city centre",
      transferOptions: [
        "100E Express Bus to Deák Ferenc tér (~HUF 1,800, 30 min) — simplest option",
        "Bolt / Uber (~HUF 8,000–12,000 to city centre)",
        "Metro Line 3 connection — requires a bus change; not recommended with luggage"
      ]
    },
    avoidAirport: null,
    secondaryOption: null,
    ukRouting: {
      typicalRoute: "UK airport → Budapest direct (numerous budget options)",
      commonHubs: [],
      totalTravelTime: "2.5–3 hours flight",
      directAvailable: true
    },
    recommendedAirlines: ["Wizz Air", "Ryanair", "easyJet", "British Airways"],
    bookingWindow: {
      ideal: "3–4 months out",
      acceptable: "6–8 weeks out",
      lastMinuteRisk: "Moderate — Budapest has good hotel supply; the Hungaroring area itself is limited but most fans stay in the city"
    },
    typicalFareRange: "£80 – £250 return from UK",
    pricingTips: [
      "Wizz Air offers the most frequent service to Budapest from UK regional airports and is often cheapest",
      "Budapest is excellent value on the ground — any savings on flights are well spent in the city",
      "Ryanair and easyJet both serve BUD from London airports — check all terminal options"
    ],
    destinationNotes: [
      "No visa required for UK citizens — standard 90-day Schengen access (note: Hungary uses HUF, not EUR)",
      "Hungaroring is 20km northeast of Budapest — race weekend shuttle buses run from Keleti station and Heroes Square",
      "Late July in Budapest: very hot (28–34°C) — take water and sun protection to the circuit; shade is limited",
      "Budapest is one of the most beautiful cities on the F1 calendar — arrive a day early and explore",
      "Bolt ride-share app works well across Hungary and is good value compared to taxis"
    ]
  },

  "Dutch Grand Prix": {
    destination: "Zandvoort, Netherlands",
    primaryAirport: {
      code: "AMS",
      name: "Amsterdam Schiphol Airport",
      transferTime: "45–60 min to Zandvoort by train",
      transferOptions: [
        "Train: Schiphol → Amsterdam Centraal → Zandvoort aan Zee (direct on race weekend, ~50 min, ~EUR 15)",
        "Uber / taxi (~EUR 80–100) — not recommended race weekend due to road closures",
        "Car hire available but driving into Zandvoort race weekend is strongly discouraged"
      ]
    },
    avoidAirport: null,
    secondaryOption: "Rotterdam (RTM) — 60 min by train, occasionally cheaper fares. Eurostar London St Pancras → Amsterdam Centraal (3h55m direct) is highly recommended as an alternative to flying — trains run directly to the circuit.",
    ukRouting: {
      typicalRoute: "UK airport → Amsterdam direct, or Eurostar London → Amsterdam",
      commonHubs: [],
      totalTravelTime: "1.5 hours flight or 3h55m Eurostar",
      directAvailable: true
    },
    recommendedAirlines: ["easyJet", "KLM", "British Airways", "Ryanair", "Eurostar (train — highly recommended)"],
    bookingWindow: {
      ideal: "5–6 months out",
      acceptable: "3–4 months out",
      lastMinuteRisk: "Very high — Zandvoort circuit tickets sell out almost immediately; accommodation in Zandvoort and Haarlem is extremely limited"
    },
    typicalFareRange: "£80 – £250 return flight; Eurostar from ~£70 return",
    pricingTips: [
      "The Eurostar is often the best overall value — central London to Amsterdam city centre in under 4 hours with no airport faff",
      "Accommodation in Zandvoort itself is almost impossible to get — consider Haarlem, The Hague, or Amsterdam and commute by train",
      "Book everything for this race simultaneously the moment tickets are released — it moves faster than any other European round",
      "KLM can be competitive from regional UK airports with connections through Schiphol"
    ],
    destinationNotes: [
      "No visa required for UK citizens — standard 90-day Schengen access",
      "The circuit is set in sand dunes metres from the North Sea beach — one of the most unique venues on the calendar",
      "Late August: mild (18–23°C) but North Sea conditions can be breezy and cool — bring a windproof layer",
      "The Dutch Orange Army creates one of the greatest atmospheres in sport — truly special",
      "Cars cannot reach central Zandvoort on race weekend — the train from Amsterdam is the only sensible option"
    ]
  },

  "Italian Grand Prix": {
    destination: "Monza, Italy",
    primaryAirport: {
      code: "MXP",
      name: "Milan Malpensa Airport",
      transferTime: "45–55 min to Monza",
      transferOptions: [
        "Race weekend direct shuttle Malpensa → Monza (~EUR 20–30 one-way, check booking in advance)",
        "Malpensa Express to Milan Cadorna then regional train to Monza (~EUR 15, 75 min total)",
        "Taxi (~EUR 85–110)"
      ]
    },
    avoidAirport: "Avoid Rome Fiumicino (FCO) — 3.5+ hours by high-speed train; not worth it for Monza",
    secondaryOption: "Bergamo Orio al Serio (BGY) — 50 min drive or shuttle; often cheaper Ryanair fares and worth considering. Milan Linate (LIN) — 40 min, limited international UK service.",
    ukRouting: {
      typicalRoute: "UK airport → Milan Malpensa or Bergamo direct (budget options widely available)",
      commonHubs: [],
      totalTravelTime: "2–2.5 hours flight",
      directAvailable: true
    },
    recommendedAirlines: ["Ryanair (to BGY)", "easyJet", "British Airways", "Wizz Air"],
    bookingWindow: {
      ideal: "4–5 months out",
      acceptable: "2–3 months out",
      lastMinuteRisk: "High — Monza is one of the most passionate events on the calendar; accommodation in Monza itself books out very fast"
    },
    typicalFareRange: "£90 – £280 return from UK",
    pricingTips: [
      "Bergamo (Ryanair) is often significantly cheaper than Malpensa — the shuttle or hire car to Monza is straightforward",
      "Multiple UK airports have direct routes to Malpensa — regional UK airports frequently beat London prices",
      "Staying in Milan city (30 min by train to Monza) dramatically increases your hotel options and is generally better value"
    ],
    destinationNotes: [
      "No visa required for UK citizens — standard 90-day Schengen access",
      "Monza circuit is set within a beautiful royal park — the walk-in experience and circuit atmosphere is unlike anywhere else",
      "September: warm and usually excellent weather (22–27°C) — one of the better races for conditions",
      "The Tifosi are unlike any other fans in sport — wear neutral colours unless you want good-natured ribbing all weekend",
      "Monza town centre has excellent restaurants — book dinner for Saturday night well in advance"
    ]
  },

  "Azerbaijan Grand Prix": {
    destination: "Baku, Azerbaijan",
    primaryAirport: {
      code: "GYD",
      name: "Heydar Aliyev International Airport",
      transferTime: "25–35 min to city centre / circuit",
      transferOptions: [
        "Bolt app — works well in Baku and is the recommended option (~AZN 8–15 to centre)",
        "Taxi (~AZN 15–25 to centre)",
        "Bus route 135 to city (cheap but slower and less straightforward with luggage)"
      ]
    },
    avoidAirport: null,
    secondaryOption: null,
    ukRouting: {
      typicalRoute: "London Heathrow → Istanbul → Baku, or LHR → Baku direct (AZAL)",
      commonHubs: ["Istanbul (Turkish Airlines / Pegasus)"],
      totalTravelTime: "5.5 hours direct or 7–9 hours via Istanbul",
      directAvailable: true
    },
    recommendedAirlines: ["Turkish Airlines", "Azerbaijan Airlines (AZAL)", "Pegasus Airlines"],
    bookingWindow: {
      ideal: "3–4 months out",
      acceptable: "6–8 weeks out",
      lastMinuteRisk: "Moderate — Baku has reasonable hotel capacity for its size; flights are the more variable element"
    },
    typicalFareRange: "£350 – £700 return from London",
    pricingTips: [
      "Azerbaijan Airlines (AZAL) operates a direct LHR–GYD service — check this first as it saves significant connection time",
      "Turkish Airlines via Istanbul is usually the best overall value with strong scheduling",
      "Pegasus via Istanbul is often cheaper than Turkish — service quality is lower but perfectly adequate for the journey",
      "Baku is excellent value on the ground — budget more for the flight and save once you arrive"
    ],
    destinationNotes: [
      "UK citizens can obtain an Azerbaijani e-Visa easily (~£20) — apply at evisa.gov.az at least 3 days before travel",
      "Baku's Old City (Icheri Sheher, UNESCO listed) is stunning — worth a full day exploring before the race weekend",
      "The street circuit winds through the historic Old City and along the Caspian waterfront — spectacular setting",
      "September or October timing: warm and very pleasant (20–26°C) — some of the best race weather on the calendar",
      "Baku is surprisingly modern and tourist-friendly — the Caspian Sea boulevard is a great evening walk"
    ]
  },

  "Singapore Grand Prix": {
    destination: "Singapore",
    primaryAirport: {
      code: "SIN",
      name: "Singapore Changi Airport",
      transferTime: "25–30 min to Marina Bay / city centre",
      transferOptions: [
        "MRT East-West Line to City Hall or Raffles Place (~SGD 2, 30 min) — excellent and easy",
        "Grab app (~SGD 25–40 to Marina Bay hotels)",
        "Taxi (~SGD 30–50)"
      ]
    },
    avoidAirport: null,
    secondaryOption: null,
    ukRouting: {
      typicalRoute: "London Heathrow → Singapore direct",
      commonHubs: ["Doha (Qatar Airways if not flying direct)", "Dubai (Emirates if preferred)"],
      totalTravelTime: "13–13.5 hours direct",
      directAvailable: true
    },
    recommendedAirlines: ["Singapore Airlines", "British Airways", "Qatar Airways"],
    bookingWindow: {
      ideal: "5–6 months out",
      acceptable: "3–4 months out",
      lastMinuteRisk: "Very high — Singapore GP is a premium event; hotel prices near the Marina Bay circuit are among the highest on the calendar during race weekend"
    },
    typicalFareRange: "£700 – £1,200 return from London",
    pricingTips: [
      "Singapore Airlines is the benchmark carrier on this route — premium service but rarely cheap",
      "Qatar Airways via Doha is often competitive and provides a comparable experience for less",
      "BA operates direct LHR–SIN but is usually not the best value option on this corridor",
      "Book flights and hotels simultaneously — Marina Bay hotel prices triple or more during race weekend"
    ],
    destinationNotes: [
      "No visa required for UK citizens — 30-day visa-free access",
      "Changi Airport is consistently rated the world's best — factor in time to explore the Jewel or butterfly garden",
      "Night race under floodlights around the Marina Bay waterfront is one of the most spectacular sporting events anywhere",
      "September in Singapore: hot and humid (28–32°C) with occasional heavy rain — the night race temperature is more comfortable",
      "Singapore is expensive but transport, food hygiene, and personal safety are world-class",
      "The race finishes around midnight local time — arrange hotel transport in advance as streets near the circuit are gridlocked post-race"
    ]
  },

  "United States Grand Prix": {
    destination: "Austin, Texas, USA",
    primaryAirport: {
      code: "AUS",
      name: "Austin-Bergstrom International Airport",
      transferTime: "15–20 min to downtown Austin",
      transferOptions: [
        "Uber / Lyft (~USD 20–35 to downtown — most practical option)",
        "MetroFlyer 100 bus (~USD 3.50 to downtown)",
        "Taxi (~USD 30–45)",
        "Rental car — useful for circuit access but parking on race day is slow"
      ]
    },
    avoidAirport: "Avoid Dallas Fort Worth (DFW) or Houston (IAH) unless AUS is very expensive — both are 3-hour drives",
    secondaryOption: "San Antonio (SAT) — 80 miles from Austin; occasionally worth checking for fare savings but adds significant transfer complexity.",
    ukRouting: {
      typicalRoute: "London Heathrow → US hub → Austin",
      commonHubs: ["Dallas Fort Worth (American / BA)", "Houston Bush (United)", "Charlotte (American)", "New York JFK (various)"],
      totalTravelTime: "11–13 hours via one connection",
      directAvailable: false
    },
    recommendedAirlines: ["British Airways", "American Airlines", "United Airlines", "Virgin Atlantic"],
    bookingWindow: {
      ideal: "4–5 months out",
      acceptable: "2–3 months out",
      lastMinuteRisk: "High — COTA race weekend is enormous; Austin hotel accommodation fills months in advance and prices surge dramatically"
    },
    typicalFareRange: "£550 – £1,050 return from London",
    pricingTips: [
      "BA via Dallas Fort Worth is the most common and reliable routing — compare with United via Houston for the best fare",
      "ESTA required before flying — apply at esta.cbp.dhs.gov (~USD 14); do this well in advance",
      "October is peak season for COTA — book at the earliest possible opportunity; Austin hotels are both scarce and expensive"
    ],
    destinationNotes: [
      "ESTA required for UK passport holders (~USD 14) — apply at esta.cbp.dhs.gov at least 72 hours before departure",
      "Circuit of the Americas is south of Austin city — Uber and Lyft are the most practical options but expect very slow post-race queues",
      "October in Austin: warm and dry (24–29°C) — usually excellent conditions for a race weekend",
      "Austin's live music scene on 6th Street and its exceptional food scene make this one of the best race cities",
      "Official COTA shuttle buses from downtown Austin are often the most stress-free option on race day"
    ]
  },

  "Mexico City Grand Prix": {
    destination: "Mexico City, Mexico",
    primaryAirport: {
      code: "MEX",
      name: "Mexico City International Airport (Benito Juárez)",
      transferTime: "20–35 min to city centre (traffic dependent)",
      transferOptions: [
        "Uber (~MXN 150–280 to Polanco or Condesa — safest and most practical option)",
        "Metro Line 5 to Terminal Aérea then transfer (~MXN 5 — not recommended with luggage)",
        "Authorised airport taxi booths only (~MXN 250–400) — never accept an approach inside the terminal"
      ]
    },
    avoidAirport: "Felipe Ángeles (NLU) — the newer northern airport is 50+ min from the circuit with limited airline service; avoid unless fares are dramatically cheaper",
    secondaryOption: null,
    ukRouting: {
      typicalRoute: "London Heathrow → US hub → Mexico City",
      commonHubs: ["Dallas Fort Worth (American / BA)", "Houston Bush (United)", "Miami (American)"],
      totalTravelTime: "13–16 hours total",
      directAvailable: false
    },
    recommendedAirlines: ["British Airways", "American Airlines", "United Airlines", "Aeromexico (via Madrid or direct)"],
    bookingWindow: {
      ideal: "4–5 months out",
      acceptable: "2–3 months out",
      lastMinuteRisk: "High — October is peak transatlantic travel; hotel options near the Autodromo are limited and expensive race weekend"
    },
    typicalFareRange: "£650 – £1,100 return from London",
    pricingTips: [
      "Routing via Dallas on American or BA is usually the most direct and reliable connection available",
      "Aeromexico via Madrid is worth checking if Iberian fares happen to be cheap when you search",
      "Mexico City is at 2,240m altitude — alcohol hits significantly harder and physical exertion feels more intense; factor this into your planning"
    ],
    destinationNotes: [
      "UK citizens do not need a visa for Mexico — 180-day visa-free entry on arrival",
      "Use Uber exclusively in Mexico City — street taxis carry real safety risks for tourists; book all transport through the app",
      "High altitude is a genuine consideration — allow 24–48 hours to acclimatise, drink plenty of water, and take it easy on arrival day",
      "The Autodromo Hermanos Rodriguez is in the eastern suburbs — stay in Polanco or Condesa for the best base",
      "Late October in Mexico City: mild and pleasant (18–24°C, clear skies) — usually very comfortable race conditions"
    ]
  },

  "São Paulo Grand Prix": {
    destination: "São Paulo, Brazil",
    primaryAirport: {
      code: "GRU",
      name: "São Paulo Guarulhos International Airport",
      transferTime: "45–75 min to city centre (highly traffic dependent)",
      transferOptions: [
        "Uber (~BRL 80–160 to Pinheiros or Itaim Bibi — strongly recommended)",
        "Official taxi booth at arrivals (~BRL 180–280)",
        "CPTM train T10 line to central station — budget option but complex with luggage"
      ]
    },
    avoidAirport: "Congonhas (CGH) handles domestic routes only — not relevant for UK arrivals",
    secondaryOption: null,
    ukRouting: {
      typicalRoute: "London Heathrow → São Paulo Guarulhos (direct, ~11 hours)",
      commonHubs: ["Lisbon (TAP Air Portugal)", "Madrid (Iberia / LATAM)"],
      totalTravelTime: "11 hours direct or 13–15 hours via hub",
      directAvailable: true
    },
    recommendedAirlines: ["British Airways", "TAP Air Portugal", "LATAM", "Iberia"],
    bookingWindow: {
      ideal: "4–5 months out",
      acceptable: "2–3 months out",
      lastMinuteRisk: "High — season-end excitement drives demand; hotel stock near Interlagos is genuinely limited and prices surge"
    },
    typicalFareRange: "£600 – £1,100 return from London",
    pricingTips: [
      "TAP via Lisbon is often considerably cheaper than BA direct and is perfectly comfortable — Lisbon is also an excellent airport to transit",
      "BA's direct LHR–GRU service is one of the better premium economy options if you want to arrive fresh",
      "LATAM via Madrid or Lisbon gives a further competitive option worth checking alongside the others"
    ],
    destinationNotes: [
      "UK citizens do not need a visa for Brazil — 90-day visa-free entry",
      "Use Uber throughout São Paulo — traffic and safety considerations make it the right choice for tourists",
      "Interlagos circuit is in the southern Zona Sul of São Paulo — stay in Pinheiros or Itaim Bibi for the best access",
      "November in São Paulo: warm (24–30°C) with the possibility of heavy afternoon thunderstorms — pack accordingly",
      "The Brazilian crowd creates the most passionate and emotional race atmosphere on the entire calendar — unforgettable"
    ]
  },

  "Las Vegas Grand Prix": {
    destination: "Las Vegas, Nevada, USA",
    primaryAirport: {
      code: "LAS",
      name: "Harry Reid International Airport",
      transferTime: "10–15 min to the Las Vegas Strip",
      transferOptions: [
        "Uber / Lyft (~USD 15–25 to Strip hotels — most practical)",
        "Taxi (~USD 22–35)",
        "Las Vegas Monorail from MGM Grand station if staying on the mid-Strip"
      ]
    },
    avoidAirport: null,
    secondaryOption: null,
    ukRouting: {
      typicalRoute: "London Heathrow → Los Angeles or Dallas → Las Vegas, or seasonal direct if available",
      commonHubs: ["Los Angeles (LAX)", "Dallas Fort Worth (DFW)", "New York JFK"],
      totalTravelTime: "12–15 hours total",
      directAvailable: false
    },
    recommendedAirlines: ["Virgin Atlantic", "British Airways", "American Airlines", "United Airlines"],
    bookingWindow: {
      ideal: "5–6 months out",
      acceptable: "3–4 months out",
      lastMinuteRisk: "Very high — Las Vegas race weekend coincides with peak November travel; Strip hotel prices are extraordinary and rise further as the race approaches"
    },
    typicalFareRange: "£550 – £1,050 return from London (flights are manageable — Strip hotels are the major cost)",
    pricingTips: [
      "Check whether Virgin Atlantic or BA fly direct or one-stop to LAS — seasonal routings change year to year",
      "Flying into LA (LAX) and catching a short Southwest or Spirit domestic to LAS can occasionally offer savings — do the maths including the domestic fare",
      "The race starts at 22:00 local time and finishes around midnight — check your outbound flight time carefully; you may need a late checkout",
      "ESTA required — apply at esta.cbp.dhs.gov well in advance (~USD 14)"
    ],
    destinationNotes: [
      "ESTA required for UK passport holders (~USD 14) — apply at esta.cbp.dhs.gov at least 72 hours before departure",
      "The race runs along the Las Vegas Strip at night — the most visually spectacular venue on the entire calendar",
      "Race starts 22:00 local, finishes around midnight — plan for a very late night and a slow start the following day",
      "November in Las Vegas: warm days (~18°C) but cold nights (~7–9°C) — dress in layers for the race; it gets cold in the stands",
      "Las Vegas requires a separate accommodation and entertainment budget — factor this in before you commit to attending"
    ]
  },

  "Qatar Grand Prix": {
    destination: "Lusail, Qatar",
    primaryAirport: {
      code: "DOH",
      name: "Hamad International Airport",
      transferTime: "20–30 min to Lusail circuit",
      transferOptions: [
        "Taxi / Karwa (official metered taxi) from airport (~QAR 50–80 to Lusail)",
        "Uber available in Doha",
        "Race weekend official shuttle buses from Doha city hotels"
      ]
    },
    avoidAirport: null,
    secondaryOption: null,
    ukRouting: {
      typicalRoute: "London Heathrow or Manchester → Doha direct",
      commonHubs: [],
      totalTravelTime: "6.5–7 hours direct",
      directAvailable: true
    },
    recommendedAirlines: ["Qatar Airways"],
    bookingWindow: {
      ideal: "3–4 months out",
      acceptable: "6–8 weeks out",
      lastMinuteRisk: "Moderate — Qatar Airways effectively has sole control of this route so prices are less competitive, but capacity is high and fare sales are frequent"
    },
    typicalFareRange: "£450 – £850 return from London",
    pricingTips: [
      "Qatar Airways has a near-monopoly on direct London–Doha — watch for their regular fare sales which can be substantial",
      "Business class on QR can occasionally be booked for premium economy prices during promotional periods",
      "Qatar flies from Manchester as well as Heathrow — northern UK fans have a direct option without going to London"
    ],
    destinationNotes: [
      "UK citizens can obtain a Qatar visa on arrival free of charge — very straightforward process",
      "November / December timing: pleasantly warm evenings (~25°C) — very comfortable conditions for spectating",
      "Lusail is a purpose-built city north of Doha — excellent race infrastructure but limited to explore beyond the circuit area",
      "Qatar is conservative in public — dress modestly away from the circuit and hotel areas",
      "Hamad International is a world-class airport — a generous layover here is a pleasure, not a problem"
    ]
  },

  "Abu Dhabi Grand Prix": {
    destination: "Abu Dhabi, UAE (Yas Island)",
    primaryAirport: {
      code: "AUH",
      name: "Abu Dhabi International Airport",
      transferTime: "30–40 min to Yas Marina Circuit",
      transferOptions: [
        "Taxi (~AED 60–90 to Yas Island)",
        "Uber available throughout Abu Dhabi",
        "Race weekend official shuttle buses from Abu Dhabi city hotels"
      ]
    },
    avoidAirport: null,
    secondaryOption: "Dubai (DXB) — 90 min drive to Yas Marina but often significantly cheaper flights. Worth considering if savings exceed £200, factoring in the transfer cost and time.",
    ukRouting: {
      typicalRoute: "London Heathrow, Gatwick, or Manchester → Abu Dhabi direct",
      commonHubs: ["Dubai (DXB) as alternative gateway"],
      totalTravelTime: "7–7.5 hours direct",
      directAvailable: true
    },
    recommendedAirlines: ["Etihad Airways", "British Airways", "Virgin Atlantic"],
    bookingWindow: {
      ideal: "4–5 months out",
      acceptable: "2–3 months out",
      lastMinuteRisk: "High — the season finale is enormously popular; Yas Island hotels sell out fast and prices increase dramatically as race weekend approaches"
    },
    typicalFareRange: "£450 – £850 return from London",
    pricingTips: [
      "Etihad's hub is Abu Dhabi — excellent service and they are motivated to fill seats for their home race weekend",
      "Check Dubai (DXB) with Emirates — often significantly cheaper, but the 90-min transfer to Yas Island needs to be costed in",
      "Staying on Yas Island itself is the dream option but book 6+ months out — prices during race weekend are severe",
      "December is peak UAE tourist season — everything from hotels to restaurants will be more expensive than usual"
    ],
    destinationNotes: [
      "No visa required for UK citizens — 30-day visa-free entry on arrival",
      "December weather in Abu Dhabi is genuinely perfect (24–28°C, sunny, no rain) — the best climate conditions on the calendar",
      "Yas Marina Circuit is a purpose-built venue with world-class facilities and the distinctive Yas Hotel straddling the track",
      "The sunset-into-night race format is visually spectacular — grandstand orientation matters for the best light experience",
      "Ferrari World, Warner Bros World, and Yas Waterworld are all on Yas Island — excellent if bringing family",
      "The season finale atmosphere is unique — a fitting way to close the F1 year"
    ]
  }

};

export default flightData;
