const transportData = {

  "Australian Grand Prix": {
    overview: "Albert Park Circuit sits 3km from Melbourne CBD, making it one of the most accessible venues on the calendar. Trams run directly to the gate and the walk from nearby suburbs is easy.",
    alert: null,
    modes: [
      {
        name: "Tram (Route 58 / 64)",
        icon: "🚊",
        rating: "best",
        cost: "Free (Myki — check for GP weekend free travel)",
        time: "20–25 min from CBD",
        notes: "Runs directly to the circuit gate along St Kilda Road. Gets very busy post-race — allow 30–45 min queue time before boarding."
      },
      {
        name: "Train + Walk",
        icon: "🚆",
        rating: "good",
        cost: "Free (Myki)",
        time: "25–35 min from CBD",
        notes: "Train to Richmond or Flinders Street, then walk through the parkland. A pleasant route on lower-crowd days."
      },
      {
        name: "Walking / Cycling",
        icon: "🚶",
        rating: "good",
        cost: "Free",
        time: "30 min from CBD",
        notes: "Flat route through parkland from South Yarra or St Kilda. Melbourne Bike Share docks are near the circuit entrance."
      },
      {
        name: "Rideshare / Taxi",
        icon: "🚗",
        rating: "avoid",
        cost: "AUD 20–45",
        time: "30–60 min",
        notes: "Heavy surge pricing on race day. Drop-off zones are a significant walk from the gates. Tram is always faster."
      }
    ],
    byDay: {
      friday: "Light crowds — any option works fine. Great day to test your tram route and timings.",
      saturday: "Qualifying draws bigger crowds. Tram recommended; add 15 minutes to your expected journey.",
      sunday: "Use the tram and arrive early. Post-race queues can be 45 minutes — grab a drink inside and wait it out before heading to the stop."
    },
    tips: [
      "Top up your Myki card before race weekend — machines at tram stops get long queues on Sunday.",
      "Gate 1 on Aughtie Drive is closest to the Route 58/64 tram stop on Domain Road.",
      "During the GP weekend Melbourne often runs free public transport — check the Public Transport Victoria website before you travel."
    ]
  },

  "Chinese Grand Prix": {
    overview: "Shanghai International Circuit is in Jiading district, about 30km from central Shanghai. Metro Line 11 is the primary option — reliable, cheap, and air-conditioned.",
    alert: null,
    modes: [
      {
        name: "Metro Line 11 + Shuttle",
        icon: "🚇",
        rating: "best",
        cost: "CNY 7–9 (~£0.80)",
        time: "60–70 min from city centre",
        notes: "Alight at Jiading North, then shuttle bus or short taxi to the circuit. Check late-evening service frequency on race day — last trains can be sparse."
      },
      {
        name: "Official Shuttle Bus",
        icon: "🚌",
        rating: "good",
        cost: "CNY 30–60",
        time: "45–60 min",
        notes: "Departs from Jing'An Temple and other central locations. Book in advance through the circuit website."
      },
      {
        name: "Taxi / DiDi",
        icon: "🚕",
        rating: "good",
        cost: "CNY 150–200 (~£17–22)",
        time: "45–75 min",
        notes: "DiDi is the local Uber equivalent. Useful for flexibility, but traffic post-race can be very severe."
      }
    ],
    byDay: {
      friday: "Metro is comfortable and easy. A good day to get familiar with the route.",
      saturday: "Metro recommended. Leave extra time and avoid relying on the last train of the evening.",
      sunday: "Allow extra time. Post-race at Jiading North station is very crowded — queues can be long before boarding."
    },
    tips: [
      "Get the Shanghai Metro app or use Alipay / WeChat Pay for seamless transit payment.",
      "The Metro runs until around midnight — verify the last service time on race day before going in.",
      "DiDi requires a Chinese phone number to register; set up your account before you arrive."
    ]
  },

  "Japanese Grand Prix": {
    overview: "Suzuka Circuit is in Mie Prefecture, roughly 90 minutes from Nagoya by train. There is no direct rail link to the circuit — a short connecting leg from Shiroko station is required.",
    alert: "Extreme crowds post-race. Plan to wait 30–45 minutes inside the circuit before attempting to leave.",
    modes: [
      {
        name: "Kintetsu Train to Shiroko + Walk / Bike",
        icon: "🚆",
        rating: "best",
        cost: "JPY 1,500–2,500 from Nagoya",
        time: "90 min from Nagoya (train + 15 min walk or bike)",
        notes: "Kintetsu Nagoya Line to Shiroko Station. Rental bikes are available at the station. Flat 15-minute ride to the circuit entrance."
      },
      {
        name: "Official Shuttle Bus",
        icon: "🚌",
        rating: "good",
        cost: "JPY 2,000–3,500 return",
        time: "Varies by departure point",
        notes: "Buses from Nagoya, Osaka, and Yokkaichi. Reserve well in advance — sells out months early."
      },
      {
        name: "Rental Car",
        icon: "🚗",
        rating: "avoid",
        cost: "JPY 8,000+ per day",
        time: "2+ hours post-race due to traffic",
        notes: "Parking is available but egress is chaotic. Post-race traffic regularly adds 2+ hours to any road journey."
      }
    ],
    byDay: {
      friday: "Lightest day — the train and bike ride is easy and enjoyable.",
      saturday: "Busier. Add 30 minutes to your journey each way.",
      sunday: "Do not drive. Use the train and stay inside the circuit after the race — crowds thin significantly after 30–45 minutes."
    },
    tips: [
      "Rental bikes at Shiroko Station run out fast on Sunday morning — arrive early or reserve in advance.",
      "A Suica or ICOCA card makes train travel seamless and avoids long ticket machine queues.",
      "Weather in the valley can change quickly — check forecasts as this affects shuttle bus schedules."
    ]
  },

  "Bahrain Grand Prix": {
    overview: "Bahrain International Circuit is in the desert near Sakhir, about 40 minutes from Manama. There is no public transport to the venue — all travel is by shuttle, taxi, or private car.",
    alert: "No public transport serves the circuit. Official shuttle buses and taxis are your only practical options.",
    modes: [
      {
        name: "Official Shuttle Bus",
        icon: "🚌",
        rating: "best",
        cost: "BHD 5–10 (~£11–22) return",
        time: "40–50 min from Manama",
        notes: "Departs from the Exhibition Centre and key hotels. The most reliable option — book before you arrive."
      },
      {
        name: "Taxi / Uber",
        icon: "🚕",
        rating: "good",
        cost: "BHD 8–15 (~£18–33) each way",
        time: "35–50 min",
        notes: "Uber and local taxis available. Negotiate price with local taxis before getting in. Surge applies on race day."
      },
      {
        name: "Rental Car",
        icon: "🚗",
        rating: "good",
        cost: "BHD 10–20 per day",
        time: "40 min, longer post-race",
        notes: "Ample parking on site. Convenient if you want flexibility across the weekend."
      }
    ],
    byDay: {
      friday: "Shuttles run frequently. Taxi is easy and cheap on a practice day.",
      saturday: "Demand increases — book your return shuttle seat in advance.",
      sunday: "All shuttle seats fill quickly. Book the earliest return you are comfortable with. Taxis are scarce post-race."
    },
    tips: [
      "Heat is a major factor — even moving between vehicles is exhausting in March. Stay hydrated throughout.",
      "Some hotels run private transfer services — check with yours before booking public shuttles.",
      "Post-race taxi availability is poor. Pre-book a return or arrange a private transfer before race day."
    ]
  },

  "Saudi Arabian Grand Prix": {
    overview: "The Jeddah Corniche Circuit runs along the Red Sea waterfront. Official shuttle buses are the primary transport option, though walking is feasible from Corniche hotels. The race runs at night.",
    alert: "No public transport serves the circuit. Use official shuttle buses or hotel transfers.",
    modes: [
      {
        name: "Official Shuttle Bus",
        icon: "🚌",
        rating: "best",
        cost: "SAR 50–100 (~£11–22) return",
        time: "20–40 min from central Jeddah",
        notes: "Multiple pick-up points across the city. Most reliable option — book before arrival and note the last return departure time."
      },
      {
        name: "Uber / Careem",
        icon: "🚕",
        rating: "good",
        cost: "SAR 40–80 (~£9–18) each way",
        time: "20–45 min",
        notes: "Both apps work well in Jeddah. Drop-off zones are managed. Careem often has shorter wait times than Uber."
      },
      {
        name: "Walking",
        icon: "🚶",
        rating: "good",
        cost: "Free",
        time: "20–40 min from Corniche hotels",
        notes: "If staying on the Corniche itself, walking is genuinely feasible on practice and qualifying days."
      },
      {
        name: "Rental Car",
        icon: "🚗",
        rating: "avoid",
        cost: "SAR 80–150 per day",
        time: "Variable",
        notes: "Parking near the circuit is limited and access roads become heavily managed on race evenings."
      }
    ],
    byDay: {
      friday: "Light traffic — any option works.",
      saturday: "Use the shuttle or Uber. Corniche road closures begin building from Saturday.",
      sunday: "Shuttle strongly recommended. Corniche access restrictions peak on race night. Check your return time carefully."
    },
    tips: [
      "The race runs at night — plan for late returns and confirm the shuttle's last departure before you go in.",
      "Careem is the regional Uber equivalent and often has better availability in Jeddah.",
      "Book your hotel on or near the Corniche to minimise transport complexity significantly."
    ]
  },

  "Miami Grand Prix": {
    overview: "The Miami International Autodrome is built around Hard Rock Stadium in Miami Gardens, 30 minutes north of downtown Miami. There is no direct transit link — the Metrorail shuttle combination is the most practical public option.",
    alert: "No direct public transport to the circuit. Use the Metrorail feeder shuttle from Golden Glades station.",
    modes: [
      {
        name: "Metrorail + Shuttle Bus",
        icon: "🚇",
        rating: "best",
        cost: "USD 5–10 total",
        time: "45–60 min from downtown Miami",
        notes: "Take Metrorail to Golden Glades, then the paid shuttle to the circuit. Pre-purchase shuttle tickets online before race weekend."
      },
      {
        name: "Uber / Lyft",
        icon: "🚕",
        rating: "good",
        cost: "USD 30–60 each way (race day surge)",
        time: "30–60 min",
        notes: "Expect heavy surge pricing on Sunday. Designated drop-off zones are in place. Fine and easy on practice days."
      },
      {
        name: "Parking On-Site",
        icon: "🅿️",
        rating: "good",
        cost: "USD 50–150 per day",
        time: "Variable — arrive early",
        notes: "Advance parking passes required. General lots mean a long walk to the gates. Premium lots sell out first."
      }
    ],
    byDay: {
      friday: "Traffic is manageable. Uber or parking is stress-free.",
      saturday: "Busier. Metrorail + shuttle removes the traffic variable.",
      sunday: "Metrorail + shuttle strongly recommended. Traffic on I-95 and surrounding roads is severe for hours post-race."
    },
    tips: [
      "Miami Gardens is not walkable from South Beach or downtown — factor journey time carefully when choosing accommodation.",
      "Stay near a Metrorail station (Brickell, Coconut Grove, or Dadeland) for the easiest access.",
      "Circuit parking lots open from 6am — early arrival pays off significantly on race day."
    ]
  },

  "Emilia Romagna Grand Prix": {
    overview: "Imola is a compact Italian town built around the circuit. The train from Bologna takes 30 minutes and the circuit is a short, flat walk from the station — making this one of the most walkable venues on the calendar.",
    alert: null,
    modes: [
      {
        name: "Train (Bologna Centrale → Imola)",
        icon: "🚆",
        rating: "best",
        cost: "EUR 3–5 (~£3)",
        time: "30 min from Bologna",
        notes: "Regional trains run every 30 minutes. Imola station is a 15-minute walk from the circuit gates. Cheap, easy, and reliable."
      },
      {
        name: "Walking from Station",
        icon: "🚶",
        rating: "best",
        cost: "Free",
        time: "15 min from Imola station",
        notes: "Easy, flat walk through the town centre. Follow the crowds — you cannot miss it."
      },
      {
        name: "Shuttle Bus",
        icon: "🚌",
        rating: "good",
        cost: "EUR 5–10",
        time: "Varies",
        notes: "Limited services from Bologna and surrounding towns. Train is quicker and cheaper for most fans."
      },
      {
        name: "Driving",
        icon: "🚗",
        rating: "avoid",
        cost: "Variable",
        time: "45 min from Bologna, much longer post-race",
        notes: "Town parking fills rapidly. Egress after the race is very slow. The train is overwhelmingly the better option."
      }
    ],
    byDay: {
      friday: "Quiet day — perfect for a relaxed train journey and a walk around the town.",
      saturday: "Early morning trains from Bologna are comfortable.",
      sunday: "Book an early morning train. Return services fill up — consider waiting 45–60 minutes post-race before joining the station queue."
    },
    tips: [
      "Buy your train ticket in advance at trenitalia.com — tickets are cheap but the last trains post-race fill up fast.",
      "Bologna is an ideal base — excellent food, affordable hotels, and easy daily access by train.",
      "The Variante Alta section offers stunning views and is accessible via a hillside walk from the main circuit area."
    ]
  },

  "Monaco Grand Prix": {
    overview: "Monaco is tiny and the circuit is the city itself. The best approach is to stay in Monaco or Nice and walk or take the train. Road closures make private vehicles completely impractical on race day.",
    alert: "All roads into Monaco are closed on race day. No private vehicles. Train, walking, and boat are your only options.",
    modes: [
      {
        name: "Train (Nice → Monaco-Monte-Carlo)",
        icon: "🚆",
        rating: "best",
        cost: "EUR 4–6 (~£4)",
        time: "25 min from Nice",
        notes: "The single best option from Nice. Monaco-Monte-Carlo station is central to the circuit. Gets crowded race morning — go early."
      },
      {
        name: "Walking Within Monaco",
        icon: "🚶",
        rating: "best",
        cost: "Free",
        time: "5–15 min if staying in Monaco",
        notes: "If staying in Monaco itself, walking is ideal. The principality is tiny — everything is close."
      },
      {
        name: "Helicopter (Nice → Monaco)",
        icon: "🚁",
        rating: "good",
        cost: "EUR 150–250 each way",
        time: "7 min",
        notes: "Héli Air Monaco operates regular transfers. A memorable experience — but far from necessary."
      },
      {
        name: "Ferry / Water Taxi",
        icon: "⛵",
        rating: "good",
        cost: "EUR 2–5",
        time: "Short hop within port",
        notes: "Small ferry operates within the port area on race weekend. Useful for harbour-side grandstand access."
      },
      {
        name: "Private Car",
        icon: "🚗",
        rating: "avoid",
        cost: "N/A — roads closed",
        time: "N/A",
        notes: "Not viable on race day. Resident parking is heavily restricted from Saturday onwards."
      }
    ],
    byDay: {
      friday: "Some roads still open during practice sessions. Train from Nice and walk from the station.",
      saturday: "Monaco road restrictions increase. Arrive early and plan to walk everywhere within the principality.",
      sunday: "All roads closed. Train from Nice or helicopter only. Walk everywhere once you are in Monaco."
    },
    tips: [
      "Nice is a far more affordable base than Monaco — hotels there are a fraction of the price.",
      "Buy train tickets before race day to avoid queues — the French rail app (SNCF Connect) works well.",
      "Book restaurants and hospitality weeks in advance — demand in Monaco during the GP is extreme.",
      "Wear comfortable shoes — Monaco's hills and grandstand steps are surprisingly punishing."
    ]
  },

  "Spanish Grand Prix": {
    overview: "Circuit de Barcelona-Catalunya is in Montmeló, 25km north of Barcelona. The Rodalies commuter train from Barcelona Sants to Montmeló is the standard approach, followed by a 20-minute walk to the gates.",
    alert: null,
    modes: [
      {
        name: "Rodalies Train (R2 Nord) + Walk",
        icon: "🚆",
        rating: "best",
        cost: "EUR 4–5 (~£4) return",
        time: "45 min from Sants + 20 min walk",
        notes: "Most reliable option. The walk from Montmeló station is well-signposted and flat. Book early morning trains on Sunday in advance."
      },
      {
        name: "Metro + Shuttle Bus",
        icon: "🚇",
        rating: "good",
        cost: "EUR 8–12",
        time: "60–75 min from city centre",
        notes: "Metro L1 to Fondo, then a shuttle bus to the circuit. Good if you are not based near Sants."
      },
      {
        name: "Rideshare / Taxi",
        icon: "🚕",
        rating: "avoid",
        cost: "EUR 30–50 each way",
        time: "30–60 min",
        notes: "Surge pricing applies heavily on race weekend. Access roads get congested — the train is almost always faster."
      }
    ],
    byDay: {
      friday: "Train is easy and uncrowded. Use it as a test run for the weekend.",
      saturday: "Busier trains. Leave Barcelona earlier than you think you need to.",
      sunday: "Book your morning train at renfe.com in advance. Return trains pack out — wait 45–60 min post-race."
    },
    tips: [
      "The T-Casual card (10 trips) is valid on both Metro and Rodalies — excellent value across the weekend.",
      "Montmeló station is the correct stop, not Granollers Centre — an easy mistake to make.",
      "Toilets at Montmeló station are very limited — use facilities before boarding the return train."
    ]
  },

  "Canadian Grand Prix": {
    overview: "Circuit Gilles Villeneuve is on Île Notre-Dame in the St Lawrence River. The Montreal Metro's Yellow Line runs directly to Jean-Drapeau station on the island — one of the most convenient circuit locations on the entire calendar.",
    alert: null,
    modes: [
      {
        name: "Metro (Yellow Line → Jean-Drapeau)",
        icon: "🚇",
        rating: "best",
        cost: "CAD 3.75 (~£2) each way",
        time: "20–30 min from downtown",
        notes: "The definitive option. Jean-Drapeau station is right at the circuit entrance. Very crowded post-race but efficiently managed."
      },
      {
        name: "Cycling (Jacques Cartier Bridge)",
        icon: "🚲",
        rating: "best",
        cost: "Free / Bixi rental ~CAD 5",
        time: "20–30 min from downtown",
        notes: "Cross the Jacques Cartier Bridge and ride down to the island. Bixi bike share stations sit near the circuit. Very popular with local Montrealers."
      },
      {
        name: "Ferry",
        icon: "⛵",
        rating: "good",
        cost: "CAD 10–15",
        time: "15 min from Old Port",
        notes: "Seasonal service from the Old Port. A pleasant way to arrive — check timetables as the service is limited."
      },
      {
        name: "Rideshare / Taxi",
        icon: "🚕",
        rating: "avoid",
        cost: "CAD 15–30 each way",
        time: "20–45 min",
        notes: "Access roads to the island are heavily managed. Drop-off zones require a long walk. Metro is almost always faster."
      }
    ],
    byDay: {
      friday: "Metro is empty and easy. A great day to also explore the island on a bike.",
      saturday: "Metro recommended. Circuit fills up for qualifying — leave earlier than you think.",
      sunday: "Metro is the right call. Post-race queuing is managed in phases — patience pays off here."
    },
    tips: [
      "The Yellow Line is only 3 stops — no complex planning required. It is one of the simplest circuits to reach on the calendar.",
      "Bixi Montreal bike share is excellent. Stations on the island itself mean you can ride door to door.",
      "Walking across Jacques Cartier Bridge is possible but adds 30–40 minutes each way."
    ]
  },

  "Austrian Grand Prix": {
    overview: "The Red Bull Ring is set in the Styrian Alps near Spielberg, a small village with no meaningful public transport infrastructure. Park-and-ride is the main option — though for many fans, camping on-site removes the need entirely.",
    alert: "No direct public transport to the circuit. All travel is by park-and-ride, shuttle bus, or on foot from campsites.",
    modes: [
      {
        name: "Park and Ride",
        icon: "🅿️",
        rating: "best",
        cost: "EUR 20–40 per day (parking + shuttle included)",
        time: "15–30 min shuttle from parking areas",
        notes: "Multiple sites near Zeltweg and Knittelfeld. Shuttle is free with parking. Purchase in advance — sites sell out."
      },
      {
        name: "Walking from Campsite",
        icon: "🚶",
        rating: "best",
        cost: "Free",
        time: "10–20 min",
        notes: "On-site camping is extremely popular at Austria and one of the great race weekend experiences. Walking from your tent to the gates is a highlight."
      },
      {
        name: "Train to Zeltweg + Shuttle",
        icon: "🚆",
        rating: "good",
        cost: "EUR 15–30 from Graz or Leoben",
        time: "60–90 min total",
        notes: "Regional trains run to Zeltweg. Shuttle buses connect to the circuit. Infrequent — check timetables carefully."
      },
      {
        name: "Taxi",
        icon: "🚕",
        rating: "avoid",
        cost: "EUR 30–60",
        time: "Unpredictable post-race",
        notes: "Very limited taxi availability in the area. Pre-booking is difficult. Not a reliable return option."
      }
    ],
    byDay: {
      friday: "Light traffic — park and ride is easy and quick.",
      saturday: "Steady crowd build. Allow more time in the morning.",
      sunday: "Arrive early. Post-race egress from parking areas can take 60–90 minutes."
    },
    tips: [
      "Camping on-site is genuinely one of the best GP experiences on the calendar — it eliminates all transport stress.",
      "Book park-and-ride spots well in advance; they sell out long before the event.",
      "Graz is a decent base for non-campers — it has good food and train options are reasonable."
    ]
  },

  "British Grand Prix": {
    overview: "Silverstone sits in rural Northamptonshire between Northampton and Buckingham. It is one of the most notoriously congested circuits on the entire calendar. Allow at least 3 hours travel time on Sunday regardless of transport method.",
    alert: "Silverstone traffic is severe on race day. Allow 3+ hours travel time regardless of how you are getting there.",
    modes: [
      {
        name: "Train + Official Shuttle",
        icon: "🚆",
        rating: "best",
        cost: "£30–60 return (train + shuttle)",
        time: "60–90 min from London + shuttle wait",
        notes: "Official shuttles run from Northampton, Milton Keynes Central, and Coventry. Book shuttles well in advance — they sell out. Milton Keynes Central is the most popular and well-run."
      },
      {
        name: "Cycling",
        icon: "🚲",
        rating: "good",
        cost: "Free",
        time: "Variable from local towns",
        notes: "Dedicated cycling routes from Towcester, Brackley, and Silverstone village. Secure bike parking available at the circuit. Excellent option if you are staying locally."
      },
      {
        name: "Park and Ride",
        icon: "🅿️",
        rating: "good",
        cost: "£20–35",
        time: "Allow 60–120 min for egress post-race",
        notes: "Multiple official car parks around the circuit. Egress managed in phases. Arrive before 8am on Sunday for a manageable exit."
      },
      {
        name: "Helicopter",
        icon: "🚁",
        rating: "good",
        cost: "£300–800+",
        time: "15–20 min from London",
        notes: "The Silverstone helipad is well-established. If budget allows, this bypasses all road congestion entirely."
      },
      {
        name: "Driving (no shuttle)",
        icon: "🚗",
        rating: "avoid",
        cost: "Variable",
        time: "3–5 hours post-race is common",
        notes: "The A43 and A5 back up for miles. Without park-and-ride discipline, egress is genuinely punishing. Avoid unless unavoidable."
      }
    ],
    byDay: {
      friday: "Traffic is light — driving or shuttle both work fine. A good day to test your route.",
      saturday: "Qualifying day is busy but manageable. Allow an extra hour each way.",
      sunday: "Leave your accommodation by 7am if driving. Train + shuttle is the most predictable option regardless of what time you leave."
    },
    tips: [
      "The official shuttle from Milton Keynes Central is reliable and well-run — book as soon as tickets go on sale.",
      "Silverstone village residents often rent driveway spaces — an easy cycling base and cheaper than official car parks.",
      "Waze and radio traffic reports help with real-time egress route choices once you are in a car post-race."
    ]
  },

  "Belgian Grand Prix": {
    overview: "Spa-Francorchamps is set in the dense Ardennes forest near the town of Spa. Most fans drive and park in the surrounding fields. Public transport options exist but are limited — driving is genuinely the primary method here.",
    alert: null,
    modes: [
      {
        name: "Driving + On-site Parking",
        icon: "🚗",
        rating: "best",
        cost: "EUR 20–50 per day",
        time: "Variable — arrive early",
        notes: "The most practical option for Spa. Extensive field and forest parking surrounds the circuit. Arrive early — access roads narrow significantly on race day."
      },
      {
        name: "Train to Spa-Gare + Shuttle",
        icon: "🚆",
        rating: "good",
        cost: "EUR 15–30 return",
        time: "90–120 min from Brussels (train + shuttle)",
        notes: "Train from Brussels or Liège to Spa, then a shuttle bus to the circuit. A good option if not hiring a car."
      },
      {
        name: "Shuttle from Liège",
        icon: "🚌",
        rating: "good",
        cost: "EUR 20–35 return",
        time: "45 min",
        notes: "Coaches from Liège-Guillemins station. Pre-booking is essential — do not assume walk-up availability."
      }
    ],
    byDay: {
      friday: "Driving is easy. Spa weather can deteriorate quickly — check the forest road conditions.",
      saturday: "Steady traffic build. Arrive before 9am to secure parking in your preferred area.",
      sunday: "Leave early. Forest parking can become waterlogged in wet weather — have wellies ready."
    },
    tips: [
      "Camping within the Spa forest is hugely popular and removes transport stress entirely.",
      "Wet weather is common at Spa — check road conditions for forest parking areas if it has rained overnight.",
      "Raidillon and Eau Rouge are walkable from many parking areas — absolutely worth the hike."
    ]
  },

  "Hungarian Grand Prix": {
    overview: "The Hungaroring is 20km east of Budapest near Mogyoród. A direct bus connection from the Örs vezér tere Metro terminus is the well-established standard route — cheap, reliable, and easy.",
    alert: null,
    modes: [
      {
        name: "Metro M2 + Bus 28E",
        icon: "🚇",
        rating: "best",
        cost: "HUF 1,000–1,500 (~£2.50) return",
        time: "45–60 min from central Budapest",
        notes: "Take M2 to Örs vezér tere (end of the line), then bus 28E, 28Y, or 288 to the circuit. Cheap, reliable, and well-established for the GP."
      },
      {
        name: "Official Shuttle Bus",
        icon: "🚌",
        rating: "good",
        cost: "EUR 8–15 return",
        time: "40–50 min from Deák tér",
        notes: "Direct buses from central Budapest. More comfortable than the metro connection. Book in advance."
      },
      {
        name: "Rideshare / Taxi",
        icon: "🚕",
        rating: "avoid",
        cost: "EUR 25–40 each way",
        time: "25–50 min",
        notes: "Surge pricing on race weekend. Access roads are managed by police and can cause delays. Public transport is dramatically better."
      }
    ],
    byDay: {
      friday: "Bus journey is comfortable and uncrowded.",
      saturday: "Slightly busier bus. Morning departures before 9am are easiest.",
      sunday: "Use the bus. Post-race it gets very crowded — wait 45 minutes for the initial rush to clear."
    },
    tips: [
      "Buy a Budapest travel card for unlimited transport — it covers the Metro, bus, and tram networks.",
      "The bus drops you directly at the circuit entrance — no walking required once you arrive.",
      "Pest-side hotels near the M2 line are ideal for race weekend access."
    ]
  },

  "Dutch Grand Prix": {
    overview: "Zandvoort is a small coastal town in North Holland, served directly by train from Amsterdam and Haarlem. On race day, private vehicles are banned from the town — the train is not just the best option, it is the only one.",
    alert: "No private vehicles permitted in Zandvoort on race day. Train from Amsterdam or Haarlem is mandatory.",
    modes: [
      {
        name: "Train (Amsterdam Centraal → Zandvoort aan Zee)",
        icon: "🚆",
        rating: "best",
        cost: "EUR 8–12 (~£7) return",
        time: "30 min from Amsterdam; 15 min from Haarlem",
        notes: "Direct service on the Zandvoort branch line. Special race weekend trains run very frequently. Book in advance through NS — they sell out."
      },
      {
        name: "Cycling from Haarlem",
        icon: "🚲",
        rating: "good",
        cost: "Free / rental",
        time: "45–60 min from Haarlem",
        notes: "Flat Dutch terrain makes cycling realistic and enjoyable. Bike parking is available near the circuit."
      },
      {
        name: "Private Car",
        icon: "🚗",
        rating: "avoid",
        cost: "N/A",
        time: "N/A — access prohibited",
        notes: "Vehicles are prohibited in Zandvoort on race day. If you are driving, park in Haarlem or Heemstede and take the train the rest of the way."
      }
    ],
    byDay: {
      friday: "Trains run normally — easy and comfortable.",
      saturday: "Race-weekend frequency timetable often begins Saturday. Book your ticket.",
      sunday: "Book your morning train before you arrive in the Netherlands. Post-race trains queue outside the station — be patient, the system clears well."
    },
    tips: [
      "NS (Dutch Rail) sells special Zandvoort GP day tickets — check ns.nl as soon as they go on sale.",
      "Haarlem is an excellent and affordable base — just 15 minutes from Zandvoort and much cheaper than Amsterdam.",
      "Zandvoort station sits at one end of the main straight — you are essentially at the circuit the moment you step off the train."
    ]
  },

  "Italian Grand Prix": {
    overview: "Monza sits in the Royal Park of Monza, 20km north of Milan. The train from Milan Centrale takes 15 minutes, followed by the iconic 30-minute walk through the park to the circuit. One of the great race-day experiences in F1.",
    alert: null,
    modes: [
      {
        name: "Train (Milan Centrale → Monza) + Park Walk",
        icon: "🚆",
        rating: "best",
        cost: "EUR 2–4 (~£3) each way",
        time: "15 min train + 30 min walk through the park",
        notes: "The classic Monza experience. The Royal Park walk is beautiful and iconic — especially post-race with the Tifosi. Gets very crowded on Sunday."
      },
      {
        name: "Metro M1 + Shuttle",
        icon: "🚇",
        rating: "good",
        cost: "EUR 5–10",
        time: "50–70 min from central Milan",
        notes: "Metro to Sesto 1° Maggio Fs, then a shuttle to the circuit. Good if you are not staying near Centrale."
      },
      {
        name: "Shuttle Bus",
        icon: "🚌",
        rating: "good",
        cost: "EUR 10–15 return",
        time: "40–60 min",
        notes: "Services from various Milan pickup points. Book in advance."
      },
      {
        name: "Driving",
        icon: "🚗",
        rating: "avoid",
        cost: "Variable + parking",
        time: "2+ hours post-race",
        notes: "Traffic on the A4 and surrounding roads is extremely heavy after the race. The train is overwhelmingly the better option."
      }
    ],
    byDay: {
      friday: "Train is easy. The park walk is peaceful — a wonderful start to the weekend.",
      saturday: "Busier trains. Aim for early morning departures from Milano Centrale.",
      sunday: "Book morning trains in advance. The post-race park walk is an iconic Tifosi procession — one of the great moments in F1."
    },
    tips: [
      "Trenitalia Sunday tickets sell out — buy yours the moment they become available at trenitalia.com.",
      "Allow 90 minutes each way on Sunday: ticket queues, the park walk, and post-race crowds all add up.",
      "The Parco di Monza itself is genuinely beautiful — the walk is part of the Monza experience, not just a commute."
    ]
  },

  "Azerbaijan Grand Prix": {
    overview: "The Baku City Circuit threads through the Old City and along the seafront Boulevard. The circuit is the heart of the city — most central accommodation is within easy walking distance of grandstands, making transport refreshingly simple.",
    alert: null,
    modes: [
      {
        name: "Walking",
        icon: "🚶",
        rating: "best",
        cost: "Free",
        time: "5–20 min from most central hotels",
        notes: "The circuit runs through Baku city centre. Staying on the Boulevard or near the Old City means walking is simply the best option."
      },
      {
        name: "Bolt / Taxi",
        icon: "🚕",
        rating: "good",
        cost: "AZN 3–8 (~£1.50–4)",
        time: "10–20 min",
        notes: "Bolt (the European Uber equivalent) is excellent in Baku — very cheap and reliable for practice and qualifying days."
      },
      {
        name: "Metro",
        icon: "🚇",
        rating: "good",
        cost: "AZN 0.50 (~£0.25)",
        time: "15–20 min from outer areas",
        notes: "Two metro lines serve central Baku. İçərişəhər (Old City) station is closest. Useful if staying further from the centre."
      }
    ],
    byDay: {
      friday: "Walk or Bolt — completely stress-free.",
      saturday: "Some road closures increase. Check which pedestrian routes remain open.",
      sunday: "Walk wherever possible. Some sections of the circuit area are pedestrian-only during the race."
    },
    tips: [
      "Staying on the Boulevard or near the Old City is the single best transport decision you can make for Baku.",
      "Old City (İçərişəhər) entry points may be restricted during the race — plan your walking route in advance.",
      "Bolt is genuinely cheap in Baku — even when walking is slightly impractical, rides cost almost nothing."
    ]
  },

  "Singapore Grand Prix": {
    overview: "The Marina Bay Street Circuit runs through the heart of Singapore. The city has world-class public transport and the MRT serves multiple circuit gates directly. This is one of the easiest circuits on the calendar to reach — and it runs at night.",
    alert: "Private vehicles are not permitted in the circuit zone during race sessions. MRT is the clear answer.",
    modes: [
      {
        name: "MRT (Multiple Lines + Gates)",
        icon: "🚇",
        rating: "best",
        cost: "SGD 1.50–3 (~£1) each way",
        time: "15–30 min from most areas",
        notes: "Multiple gates served by different stations: Promenade (CC4/DT15), Esplanade (CC3), Bayfront (CE1/DT16). Match your station to the gate nearest your grandstand."
      },
      {
        name: "Walking from CBD Hotels",
        icon: "🚶",
        rating: "best",
        cost: "Free",
        time: "5–15 min",
        notes: "The Marina Bay financial district is adjacent to the circuit. Staying at Marina Bay Sands, the Mandarin Oriental, or nearby? Walking is the only option you need."
      },
      {
        name: "Taxi / Grab",
        icon: "🚕",
        rating: "avoid",
        cost: "SGD 15–30 each way",
        time: "20–45 min",
        notes: "Grab works but road closures make drop zones awkward. MRT is always faster and cheaper — use it."
      }
    ],
    byDay: {
      friday: "MRT is easy. Singapore's network is excellent on any day of the week.",
      saturday: "Busier but very manageable. All lines run extended late-night hours.",
      sunday: "MRT runs deep into the night — perfectly timed for the post-race crowd. The system handles it well."
    },
    tips: [
      "Get an EZ-Link card or use your contactless bank card for seamless MRT entry.",
      "The race ends around midnight — plan your return journey and check that your hotel is MRT-accessible.",
      "Different grandstands have different nearest stations — confirm the right stop before you leave your accommodation."
    ]
  },

  "United States Grand Prix": {
    overview: "Circuit of the Americas (COTA) is 10 miles east of downtown Austin in a semi-rural area with no direct public transit link. Official shuttle buses from the city centre are the most reliable way to get there.",
    alert: "No public transport serves COTA. Shuttles and rideshare are your only practical options without a car.",
    modes: [
      {
        name: "Official Shuttle Bus",
        icon: "🚌",
        rating: "best",
        cost: "USD 30–50 return",
        time: "30–45 min from downtown Austin",
        notes: "Buses from Palmer Events Centre and other downtown points. Book in advance on the COTA website — the most reliable option available."
      },
      {
        name: "Rideshare (Uber / Lyft)",
        icon: "🚕",
        rating: "good",
        cost: "USD 25–50 each way (race day surge)",
        time: "20–40 min",
        notes: "Dedicated pick-up and drop-off zones at the circuit. Good for flexibility, but surge pricing is heavy on Sunday."
      },
      {
        name: "Park and Ride",
        icon: "🅿️",
        rating: "good",
        cost: "USD 30–60 per day",
        time: "Variable — arrive early",
        notes: "On-site and off-site parking with circuit shuttles. On-site lots fill by 9am on race day."
      }
    ],
    byDay: {
      friday: "Relaxed — rideshare or shuttle is completely easy.",
      saturday: "Moderately busy. Shuttle is the comfortable choice.",
      sunday: "Shuttle from Palmer Events Centre is the most reliable option. Rideshare surge can be significant post-race."
    },
    tips: [
      "Book your return shuttle before you arrive at the circuit — on-site day-of returns sell out.",
      "Austin-Bergstrom Airport is closer to COTA than downtown — useful to know for arrival and departure day.",
      "The 6th Street area near Palmer Events Centre is part of the Austin race experience — worth building into your day."
    ]
  },

  "Mexico City Grand Prix": {
    overview: "Autódromo Hermanos Rodríguez sits within Parque Bicentenario in eastern Mexico City. The Metro system is superb value and gets you within a short park walk of the circuit for an astonishingly cheap fare.",
    alert: null,
    modes: [
      {
        name: "Metro Line B (Ciudad Deportiva / Velódromo)",
        icon: "🚇",
        rating: "best",
        cost: "MXN 5 (~£0.22)",
        time: "40–60 min from central areas",
        notes: "Line B stops at Ciudad Deportiva — a 15-minute walk through the park to the gates. Extraordinary value. Gets very packed post-race."
      },
      {
        name: "Metrobús",
        icon: "🚌",
        rating: "good",
        cost: "MXN 6–12 (~£0.30)",
        time: "Variable",
        notes: "BRT system covers a wide area of the city. Useful for those not near Line B."
      },
      {
        name: "Uber / Cabify",
        icon: "🚕",
        rating: "avoid",
        cost: "MXN 150–400 (~£7–18)",
        time: "45–90 min",
        notes: "Mexico City traffic is legendary. Surge pricing applies race weekend. The Metro is dramatically faster on every measure."
      }
    ],
    byDay: {
      friday: "Metro is comfortable and fast. The park walk from Ciudad Deportiva is pleasant.",
      saturday: "Busier Metro but still very efficient. Allow a bit of extra time.",
      sunday: "Use the Metro without question. Post-race it is very crowded — wait 30 minutes inside the park before joining the exit flow."
    },
    tips: [
      "Buy a Metro card (Tarjeta de Movilidad) on arrival — single coins are frequently refused at turnstiles.",
      "The Estadio Azteca sits nearby — if a football match is scheduled that weekend, Line B gets even busier.",
      "The walk through Parque Bicentenario to the circuit is easy, flat, and clearly signed — follow the crowd."
    ]
  },

  "São Paulo Grand Prix": {
    overview: "Autódromo José Carlos Pace (Interlagos) is in the southern zone of São Paulo, about 20km from the city centre. There is no single direct transit route — Uber and official shuttles are the most practical approaches.",
    alert: "Interlagos has complex access. Uber and official shuttles are the most reliable options. Avoid driving.",
    modes: [
      {
        name: "Uber / 99",
        icon: "🚕",
        rating: "best",
        cost: "BRL 40–80 (~£6–12) each way",
        time: "30–60 min from central areas",
        notes: "Most practical option. Uber and 99 (Brazilian Uber equivalent) both work well. Order your return ride before leaving the circuit — wait times spike post-race."
      },
      {
        name: "Official Shuttle Bus",
        icon: "🚌",
        rating: "good",
        cost: "BRL 60–100 return",
        time: "40–60 min from pickup points",
        notes: "Shuttles from Consolação, Faria Lima, and other zones. Book in advance — reliable and air-conditioned."
      },
      {
        name: "Metro Line 5 + Taxi",
        icon: "🚇",
        rating: "good",
        cost: "BRL 10–20 total",
        time: "60–75 min total",
        notes: "Metro Line 5 (Lilás) to Capão Redondo, then a short taxi or Uber to the circuit. A cheaper hybrid option."
      },
      {
        name: "Driving",
        icon: "🚗",
        rating: "avoid",
        cost: "Variable",
        time: "90+ min post-race",
        notes: "São Paulo traffic is among the worst globally. Post-race egress is brutal. Do not drive."
      }
    ],
    byDay: {
      friday: "Uber is easy. Traffic is lighter than race days.",
      saturday: "Shuttle is comfortable on qualifying day. Book your return in advance.",
      sunday: "Order your return Uber before leaving the circuit — wait times surge immediately post-chequered flag."
    },
    tips: [
      "Have the 99 app downloaded as a backup to Uber — pricing competition between the two can save money.",
      "Stay with groups near designated Uber collection zones — the Interlagos area can feel chaotic post-race.",
      "November weather can bring heavy afternoon storms — have a plan for shelter if your transport is delayed."
    ]
  },

  "Las Vegas Grand Prix": {
    overview: "The Las Vegas Street Circuit IS the Las Vegas Strip. If you are staying on or near the Strip, you are already at the circuit. The race runs late at night through some of the most iconic streets in the world.",
    alert: "Strip roads close progressively from the afternoon on race day. Walking is the only reliable option if staying nearby.",
    modes: [
      {
        name: "Walking from Strip Hotels",
        icon: "🚶",
        rating: "best",
        cost: "Free",
        time: "0–15 min",
        notes: "Caesars Palace, the Bellagio, MGM Grand, and others are on or directly adjacent to the circuit. Walk out of your hotel — you are already there."
      },
      {
        name: "Las Vegas Monorail",
        icon: "🚇",
        rating: "good",
        cost: "USD 5–8 per ride",
        time: "10–15 min along the Strip",
        notes: "Runs along the eastern side of the Strip. Check which stations remain accessible on race night as some areas are restricted."
      },
      {
        name: "Rideshare (from off-Strip hotels)",
        icon: "🚕",
        rating: "good",
        cost: "USD 15–40 (surge pricing)",
        time: "20–45 min",
        notes: "Designated rideshare zones are in place as Strip roads close. Fine for reaching the circuit, but late-night return rides take time to materialise."
      },
      {
        name: "Driving",
        icon: "🚗",
        rating: "avoid",
        cost: "N/A",
        time: "N/A — roads closed",
        notes: "The Strip is closed. Parallel roads are significantly affected too. Do not drive anywhere near the circuit on race night."
      }
    ],
    byDay: {
      friday: "Practice sessions run late. Easy walking access from the Strip — enjoy the atmosphere.",
      saturday: "Same pattern. The Strip before and between sessions is part of the Las Vegas experience.",
      sunday: "Race starts late (around 10pm local time). Walk. Strip road closures begin progressively through the afternoon."
    },
    tips: [
      "Staying on the Strip is not just convenient — it is the experience. Off-Strip savings are not worth the transport complexity here.",
      "Food and drink on the Strip is expensive. Stock up at a CVS or Walgreens near your hotel before race sessions.",
      "The race ends around 1am and the Strip never sleeps — post-race celebrations are built into the venue itself."
    ]
  }

};

export default transportData;
