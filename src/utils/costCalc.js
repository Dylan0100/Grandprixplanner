import { clusterMult, UK_CLUSTERS } from '../data/racesData'

export function fmt(n) {
  return '£' + Math.round(n).toLocaleString('en-GB')
}

export function getFlightCost(race, dep) {
  if (!dep) return null
  if (race.isUKRace && UK_CLUSTERS.includes(dep)) return 0
  if (dep === 'n-america') return race.flightNA
  if (dep === 'australia') return race.flightAUS
  return Math.round(race.flightBase * (clusterMult[dep] || 1))
}

export function calcCost(race, est) {
  if (!est.departure) return null

  const fm = getFlightCost(race, est.departure)
  const fl = {
    mid: fm,
    low: fm === 0 ? 0 : Math.round(fm * 0.86),
    high: fm === 0 ? 0 : Math.round(fm * 1.16),
    included: est.incFlights,
    isLocal: fm === 0
  }

  const tm = (est.ticketPriceOverride !== null && est.ticketPriceOverride !== undefined)
    ? est.ticketPriceOverride
    : race.tickets[est.ticketTier]
  const tk = {
    mid: tm,
    low: Math.round(tm * 0.95),
    high: Math.round(tm * 1.08),
    included: est.incTickets
  }

  const nm = race.accommodation[est.accumTier] * race.nights
  const ac = {
    mid: nm,
    low: Math.round(nm * 0.88),
    high: Math.round(nm * 1.14),
    included: est.incAccom,
    nights: race.nights
  }

  const tr = {
    mid: race.transport,
    low: race.transport,
    high: race.transport,
    included: true
  }

  const g = o => o.included ? o.mid : 0
  const ppMid = g(fl) + g(tk) + g(ac) + tr.mid
  const ppLow = (fl.included ? fl.low : 0) + (tk.included ? tk.low : 0) + (ac.included ? ac.low : 0) + tr.low
  const ppHigh = (fl.included ? fl.high : 0) + (tk.included ? tk.high : 0) + (ac.included ? ac.high : 0) + tr.high
  const pct = v => ppMid === 0 ? 0 : Math.round(v / ppMid * 100)

  return {
    flight: fl,
    ticket: tk,
    accom: ac,
    transport: tr,
    ppMid,
    ppLow,
    ppHigh,
    totalMid: ppMid * est.party,
    totalLow: ppLow * est.party,
    totalHigh: ppHigh * est.party,
    pct: {
      flight: pct(g(fl)),
      ticket: pct(g(tk)),
      accom: pct(g(ac)),
      transport: pct(tr.mid)
    }
  }
}

export function buildBookingComUrl(race, party, affiliateId = null) {
  const checkIn = parseDateIn(race.dates)
  const checkOut = parseDateOut(race.dates, race.nights)
  const city = encodeURIComponent(race.city)
  const adults = party || 2
  const aid = affiliateId ? `&aid=${affiliateId}` : ''
  return `https://www.booking.com/searchresults.html?ss=${city}&checkin=${checkIn}&checkout=${checkOut}&group_adults=${adults}${aid}`
}

function parseDateIn(dateStr) {
  // Parses "6–8 Mar 2026" or "30 Oct–1 Nov 2026" into YYYY-MM-DD for check-in
  const months = {
    Jan:'01',Feb:'02',Mar:'03',Apr:'04',May:'05',Jun:'06',
    Jul:'07',Aug:'08',Sep:'09',Oct:'10',Nov:'11',Dec:'12'
  }
  // Handle cross-month ranges like "30 Oct–1 Nov 2026"
  const crossMonth = dateStr.match(/(\d+)\s+(\w+)–(\d+)\s+(\w+)\s+(\d{4})/)
  if (crossMonth) {
    const [, dayIn, monIn, , , year] = crossMonth
    return `${year}-${months[monIn]}-${dayIn.padStart(2,'0')}`
  }
  // Handle same-month ranges like "6–8 Mar 2026"
  const sameMonth = dateStr.match(/(\d+)–\d+\s+(\w+)\s+(\d{4})/)
  if (sameMonth) {
    const [, dayIn, mon, year] = sameMonth
    return `${year}-${months[mon]}-${dayIn.padStart(2,'0')}`
  }
  return ''
}

function parseDateOut(dateStr, nights) {
  const checkIn = parseDateIn(dateStr)
  if (!checkIn) return ''
  const d = new Date(checkIn)
  d.setDate(d.getDate() + nights)
  return d.toISOString().split('T')[0]
}
