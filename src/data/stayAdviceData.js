const stayAdvice = {
  "Australian Grand Prix": {
    recommendedBase: "Melbourne CBD or inner suburbs",
    why: "Albert Park circuit is 6km from the city centre — an easy tram ride on Route 58, making central Melbourne the obvious and best base.",
    points: [
      "Tram Route 58 runs directly to Albert Park — free on race weekend with your ticket",
      "South Yarra and St Kilda offer slightly cheaper rates with equally easy circuit access",
      "Avoid staying near the airport — Tullamarine is 30km from both the city and the circuit"
    ]
  },
  "Chinese Grand Prix": {
    recommendedBase: "Pudong or Jing'an district, Shanghai",
    why: "The circuit is 30km from central Shanghai — dedicated race weekend shuttles run from major city hotels, making a central base the most practical option.",
    points: [
      "Pudong hotels are closest to the circuit and best placed for race day shuttles",
      "Jing'an and the Bund area offer better restaurants and city experience at similar prices",
      "Avoid budget accommodation near the circuit itself — the surrounding area has very limited facilities"
    ]
  },
  "Japanese Grand Prix": {
    recommendedBase: "Nagoya city centre",
    why: "Circuit-side hotels at Suzuka sell out within minutes of tickets releasing and cost a significant premium — Nagoya is 60 minutes away by train and far better value.",
    points: [
      "Nagoya station area gives excellent train access to Suzuka via the Kintetsu Nagoya line",
      "Osaka is a viable alternative base if combining with a wider Japan trip — 90 min to circuit",
      "Book Nagoya accommodation the moment race tickets are secured — it fills fast for this event"
    ]
  },
  "Miami Grand Prix": {
    recommendedBase: "Miami Lakes, Aventura, or Doral area",
    why: "The circuit is at Hard Rock Stadium in Miami Gardens — staying near the stadium rather than Miami Beach saves significantly on accommodation while cutting transfer times.",
    points: [
      "Miami Beach hotels charge enormous premiums during race weekend — the beach is 30+ min from the circuit",
      "Doral and Miami Lakes offer much better value with direct access north toward the circuit",
      "Uber and Lyft from central Miami are practical but expect surge pricing on race day"
    ]
  },
  "Canadian Grand Prix": {
    recommendedBase: "Plateau-Mont-Royal, Old Montreal, or downtown",
    why: "Montreal is a compact, walkable city and one of the best race weekend bases on the calendar — any central neighbourhood puts you within easy metro reach of the circuit island.",
    points: [
      "The circuit is on Île Notre-Dame, accessible by metro from Berri-UQAM station",
      "Old Montreal offers the best atmosphere for a race weekend city break",
      "Book well in advance — Montreal is enormously popular with European fans and the city fills up fast"
    ]
  },
  "Monaco Grand Prix": {
    recommendedBase: "Nice, Menton, or Antibes — not Monaco",
    why: "Hotel rooms inside Monaco during race weekend cost three to five times their normal rate and availability is almost zero — Nice is 25 minutes by train and a fraction of the price.",
    points: [
      "Nice city centre hotels are the standard choice for F1 fans — book 6+ months out even so",
      "Train from Nice-Ville to Monaco-Monte-Carlo runs every 30 minutes and takes 22 minutes",
      "Menton (east of Monaco, 15 min by train) is quieter and often cheaper than Nice itself",
      "If you must stay in Monaco, book the moment tickets release — nothing stays available for long"
    ]
  },
  "Spanish Grand Prix": {
    recommendedBase: "Central Barcelona",
    why: "The circuit is 30km north of Barcelona in a business park — staying in the city gives a far better experience and race weekend shuttle buses handle the transfer.",
    points: [
      "Eixample and Gràcia districts offer excellent value with strong metro connections",
      "Official race shuttles depart from Plaça de Catalunya — straightforward on race day",
      "Do not base yourself near the circuit — the surrounding area has nothing of interest"
    ]
  },
  "Austrian Grand Prix": {
    recommendedBase: "Circuit camping, or Zeltweg and Knittelfeld",
    why: "On-site camping at the Red Bull Ring is genuinely the recommended fan experience here — the hillside campsites are part of what makes this race special, and free shuttles run from Zeltweg village.",
    points: [
      "Camping tickets are separate from race tickets — book both simultaneously when they release",
      "Zeltweg village (5km from circuit) has guesthouses if camping is not for you",
      "Graz city (60km away) is the nearest urban base with a proper hotel selection",
      "Avoid booking accommodation in the circuit's immediate area at premium prices — camping is better value and a better experience"
    ]
  },
  "British Grand Prix": {
    recommendedBase: "On-site circuit camping, or Towcester and Northampton",
    why: "Silverstone is in a remote part of Northamptonshire with very limited nearby accommodation — on-site camping removes the transfer problem entirely and is the preferred fan option.",
    points: [
      "Club, Village, and Woodlands campsites are all well-run and close to the circuit",
      "Northampton (15km) and Milton Keynes (20km) are the nearest towns with hotel options",
      "The direct Silverstone Central train from Milton Keynes is the best non-camping transport option",
      "London-based fans can day-trip via the race weekend train — feasible but a long day"
    ]
  },
  "Belgian Grand Prix": {
    recommendedBase: "Circuit camping, or Spa town and Stavelot",
    why: "Spa-Francorchamps is in a remote Ardennes forest location — circuit camping is the default fan choice, and the town of Spa itself (5km away) is the main accommodation alternative.",
    points: [
      "Camping within the circuit is well-organised and very popular — book months in advance",
      "Spa town has a selection of hotels and is walkable to shuttle pick-up points",
      "Stavelot (10km) is a beautiful historic town with more accommodation options than Spa",
      "Liège (60km) and Brussels (120km) work as bases if you have a hire car"
    ]
  },
  "Hungarian Grand Prix": {
    recommendedBase: "Central Budapest",
    why: "Budapest is one of the finest cities on the F1 calendar and the obvious base — the Hungaroring is 20km away with excellent race weekend shuttle connections from the city.",
    points: [
      "Race shuttles depart from Keleti station and Heroes Square throughout race weekend",
      "Budapest Pest side (Districts V, VI, VII) offers the best combination of value and location",
      "Book at least 3 months out — Budapest fills quickly for the Hungarian GP weekend",
      "Staying near the Hungaroring itself is unnecessary and significantly more expensive"
    ]
  },
  "Dutch Grand Prix": {
    recommendedBase: "Haarlem or Amsterdam — not Zandvoort",
    why: "Zandvoort is a small coastal village with almost no hotel capacity — Haarlem (15 min by train) is where most fans base themselves, with Amsterdam as the premium alternative.",
    points: [
      "Haarlem has the best balance of proximity, price, and availability for this race",
      "Direct trains from Haarlem to Zandvoort run every few minutes on race weekend",
      "Amsterdam offers more hotel options but adds 10 minutes to the train journey",
      "Book accommodation for this race the same day tickets are released — it disappears within hours"
    ]
  },
  "Italian Grand Prix": {
    recommendedBase: "Milan city centre",
    why: "Monza is 30 minutes from Milan by commuter train — staying in Milan gives a world-class city experience at significantly lower prices than the limited options near the circuit.",
    points: [
      "Regular trains from Milano Centrale and Porta Garibaldi to Monza run throughout the weekend",
      "Monza town itself has limited hotels — what exists is expensive and books out months in advance",
      "Milan Navigli and Brera districts offer the best base for evenings after the circuit",
      "The walk from Monza station through the royal park to the circuit is genuinely beautiful"
    ]
  },
  "Madrid Grand Prix": {
    recommendedBase: "Central Madrid — Salamanca, Retiro, or Gran Vía area",
    why: "As a brand new street circuit event, staying centrally gives the most flexibility while circuit transport logistics are established for the inaugural running.",
    points: [
      "Transport details to the new circuit will be confirmed closer to the event — check grandprixplanner.com for updates",
      "Central Madrid is the safest base given infrastructure uncertainty for the inaugural race",
      "Madrid has excellent hotel supply — book early but availability is better than most race destinations"
    ]
  },
  "Azerbaijan Grand Prix": {
    recommendedBase: "Baku city centre or Old City area",
    why: "The street circuit runs through the heart of Baku along the Caspian waterfront — staying centrally means the circuit is within walking distance and the Old City is on your doorstep.",
    points: [
      "The Old City (Icheri Sheher) is UNESCO listed and extraordinary — stay as close to it as budget allows",
      "The Caspian waterfront hotels are directly alongside the pit straight section of the circuit",
      "Baku is excellent value — mid-tier hotels here offer far more than equivalents in Western Europe"
    ]
  },
  "Singapore Grand Prix": {
    recommendedBase: "Marina Bay or CBD — as close to the circuit as budget allows",
    why: "The Marina Bay street circuit is in the heart of the city — proximity to the circuit matters for a night race with late finishes and post-race transport congestion.",
    points: [
      "Marina Bay Sands and the surrounding hotels are ideal but command significant race weekend premiums",
      "Chinatown and Tanjong Pagar districts offer better value with a short MRT connection to the circuit",
      "Post-race MRT and roads are congested until 02:00 — being within walking distance is genuinely valuable",
      "Book 5–6 months out minimum — Marina Bay hotel inventory for race weekend is extremely limited"
    ]
  },
  "United States Grand Prix": {
    recommendedBase: "Downtown Austin or East Austin",
    why: "COTA is south of Austin city — staying downtown gives the best of Austin's exceptional food and music scene while official shuttles handle the circuit transfer on race day.",
    points: [
      "Official COTA shuttles from downtown Austin are the most stress-free race day option",
      "East Austin and South Congress offer good value alternatives to the premium downtown hotels",
      "Book accommodation the moment tickets release — Austin fills months in advance for race weekend",
      "Avoid staying near the circuit itself — the area has almost no amenities beyond the venue"
    ]
  },
  "Mexico City Grand Prix": {
    recommendedBase: "Polanco or Condesa district",
    why: "The Autodromo is in the eastern suburbs — Polanco and Condesa offer the best combination of safety, restaurant quality, and Uber access to the circuit.",
    points: [
      "Use Uber exclusively for all transport — street taxis carry genuine safety risks for tourists in Mexico City",
      "Polanco is Mexico City's premium neighbourhood with excellent restaurants and easy circuit access",
      "Condesa and Roma Norte are trendier and slightly cheaper alternatives with a strong food scene",
      "Allow extra travel time to the circuit — Mexico City traffic is significant on race days"
    ]
  },
  "São Paulo Grand Prix": {
    recommendedBase: "Pinheiros, Itaim Bibi, or Vila Olímpia",
    why: "Interlagos circuit is in the southern Zona Sul — these districts offer the best balance of safety, amenities, and Uber access to the venue.",
    points: [
      "Use Uber exclusively throughout São Paulo — this is important for tourist safety",
      "Vila Olímpia is closest to Interlagos and the most convenient base for the race",
      "Pinheiros has the best restaurant and bar scene for evenings after the circuit",
      "Always use official circuit shuttles on race day — they are safer and faster than individual transfers"
    ]
  },
  "Las Vegas Grand Prix": {
    recommendedBase: "The Las Vegas Strip — mid-Strip for best access",
    why: "The circuit runs along the Strip itself — staying on the Strip puts you within walking distance of much of the circuit and eliminates transfer problems for a midnight finish.",
    points: [
      "Mid-Strip hotels (Caesars, Bellagio, MGM Grand area) give the best circuit proximity",
      "The race finishes around midnight and roads near the circuit are gridlocked post-race — being on the Strip is a significant advantage",
      "Off-Strip hotels are dramatically cheaper but require transport planning for the late finish",
      "Book Strip accommodation 5–6 months out — race weekend prices are extraordinary and inventory is limited"
    ]
  },
  "Qatar Grand Prix": {
    recommendedBase: "West Bay or The Pearl, Doha",
    why: "Lusail circuit is 20km north of Doha — West Bay and The Pearl are the most practical and enjoyable bases with good taxi and shuttle access to the venue.",
    points: [
      "The Pearl is Qatar's premium waterfront district and the best base for the race experience",
      "West Bay business district has the highest hotel density and most competitive rates",
      "Official race shuttles run from central Doha throughout the weekend",
      "Qatar is excellent value at the mid-tier — accommodation here costs less than equivalent European races"
    ]
  },
  "Abu Dhabi Grand Prix": {
    recommendedBase: "Yas Island — or Dubai as a budget alternative",
    why: "Staying on Yas Island puts you at the circuit — but it commands significant race weekend premiums. Dubai is 90 minutes away and often less than half the price.",
    points: [
      "Yas Island accommodation books out 6+ months in advance for race weekend — prioritise this",
      "Dubai hotels are substantially cheaper and the transfer to Yas Marina is straightforward by taxi or shuttle",
      "If staying in Dubai, arrange your return transfer in advance — post-race demand for taxis is very high",
      "The Yas Viceroy hotel straddles the circuit itself — the ultimate race weekend stay if budget is not a concern"
    ]
  }
}

export default stayAdvice
