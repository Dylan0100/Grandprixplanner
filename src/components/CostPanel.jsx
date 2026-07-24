import { useState, useEffect, useRef } from 'react'
import { fmt, buildBookingComUrl } from '../utils/costCalc'
import { UK_CLUSTERS } from '../data/racesData'

const SKYSCANNER_AFFILIATE_ID = null
const BOOKING_AFFILIATE_ID = null

const panelStyles = `
  .cost-panel-complete {
    margin: 0 22px 14px;
    padding: 10px 14px;
    background: rgba(34,197,94,0.08);
    border: 1px solid rgba(34,197,94,0.28);
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #4ade80;
  }
  .cost-panel-complete-check {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: rgba(34,197,94,0.18);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    flex-shrink: 0;
  }
`

function clusterToIATA(cluster) {
  const map = {
    'uk-south': 'LHR',
    'uk-midlands': 'BHX',
    'uk-north': 'MAN',
    'uk-scotland': 'EDI',
    'uk-wales': 'BRS',
    'ireland': 'DUB',
    'w-europe': 'AMS',
    'e-europe': 'VIE',
    'scandinavia': 'CPH',
    'n-america': 'JFK',
    'australia': 'SYD',
    'other': 'DXB',
  }
  return map[cluster] || ''
}

const DEST_IATA = {
  'Australian Grand Prix': 'MEL',
  'Chinese Grand Prix': 'PVG',
  'Japanese Grand Prix': 'NGO',
  'Miami Grand Prix': 'MIA',
  'Canadian Grand Prix': 'YUL',
  'Monaco Grand Prix': 'NCE',
  'Spanish Grand Prix': 'BCN',
  'Austrian Grand Prix': 'GRZ',
  'British Grand Prix': 'LHR',
  'Belgian Grand Prix': 'LGG',
  'Hungarian Grand Prix': 'BUD',
  'Dutch Grand Prix': 'AMS',
  'Italian Grand Prix': 'MXP',
  'Madrid Grand Prix': 'MAD',
  'Azerbaijan Grand Prix': 'GYD',
  'Singapore Grand Prix': 'SIN',
  'United States Grand Prix': 'AUS',
  'Mexico City Grand Prix': 'MEX',
  'São Paulo Grand Prix': 'GRU',
  'Las Vegas Grand Prix': 'LAS',
  'Qatar Grand Prix': 'DOH',
  'Abu Dhabi Grand Prix': 'AUH',
}

function parseSkyDate(dateStr) {
  const months = {Jan:'01',Feb:'02',Mar:'03',Apr:'04',May:'05',Jun:'06',Jul:'07',Aug:'08',Sep:'09',Oct:'10',Nov:'11',Dec:'12'}
  const cross = dateStr.match(/(\d+)\s+(\w+)–(\d+)\s+(\w+)\s+(\d{4})/)
  if (cross) return cross[5].slice(2) + months[cross[2]] + cross[1].padStart(2,'0')
  const same = dateStr.match(/(\d+)–\d+\s+(\w+)\s+(\d{4})/)
  if (same) return same[3].slice(2) + months[same[2]] + same[1].padStart(2,'0')
  return ''
}

function parseSkyDateOut(dateStr, nights) {
  const months = {Jan:'01',Feb:'02',Mar:'03',Apr:'04',May:'05',Jun:'06',Jul:'07',Aug:'08',Sep:'09',Oct:'10',Nov:'11',Dec:'12'}
  var day, mon, year
  const cross = dateStr.match(/(\d+)\s+(\w+)–(\d+)\s+(\w+)\s+(\d{4})/)
  if (cross) { day = cross[1]; mon = months[cross[2]]; year = cross[5] }
  else {
    const same = dateStr.match(/(\d+)–\d+\s+(\w+)\s+(\d{4})/)
    if (same) { day = same[1]; mon = months[same[2]]; year = same[3] }
    else return ''
  }
  var d = new Date(year + '-' + mon + '-' + day.padStart(2,'0'))
  d.setDate(d.getDate() + nights)
  return d.getFullYear().toString().slice(2) + String(d.getMonth()+1).padStart(2,'0') + String(d.getDate()).padStart(2,'0')
}

function buildSkyscannerUrl(race, cluster, party) {
  if (!race || !cluster) return 'https://www.skyscanner.net'
  var dest = race.destinationIATA || DEST_IATA[race.name] || ''
  var origin = clusterToIATA(cluster)
  var ci = parseSkyDate(race.dates)
  var co = parseSkyDateOut(race.dates, race.nights)
  var adults = party || 2
  if (dest && origin && ci && co) {
    var aff = SKYSCANNER_AFFILIATE_ID ? ('&affilid=' + SKYSCANNER_AFFILIATE_ID) : ''
    return 'https://www.skyscanner.net/transport/flights/' + origin + '/' + dest + '/' + ci + '/' + co + '/?adults=' + adults + aff
  }
  return 'https://www.skyscanner.net'
}

/* Animates a number smoothly toward `target` whenever it changes, instead of
   snapping straight to the new value. Used for the headline cost total. */
function useAnimatedNumber(target) {
  var [display, setDisplay] = useState(target)
  var prevRef = useRef(target)
  var rafRef = useRef(null)

  useEffect(function() {
    var from = prevRef.current
    var to = target
    if (from === to) return undefined

    var startTime = null
    var duration = 500

    function step(timestamp) {
      if (startTime === null) startTime = timestamp
      var progress = Math.min((timestamp - startTime) / duration, 1)
      var eased = 1 - Math.pow(1 - progress, 3)
      var value = Math.round(from + (to - from) * eased)
      setDisplay(value)
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        prevRef.current = to
      }
    }

    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(step)

    return function() {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [target])

  return display
}

function CostRow(props) {
  var color = props.color
  var label = props.label
  var sub = props.sub
  var mid = props.mid
  var low = props.low
  var high = props.high
  var included = props.included
  var noRange = props.noRange
  var flash = props.flash
  var rowClass = (included ? 'cost-row' : 'cost-row excluded') + (flash ? ' gp-flash' : '')
  return (
    <div className={rowClass}>
      <div className="cost-row-left">
        <div className="cost-row-dot" style={{background: color}} />
        <div>
          <div className="cost-row-label">{label}</div>
          <div className="cost-row-sub">{sub}</div>
        </div>
      </div>
      <div className="cost-row-right">
        <div className="cost-row-mid">{included ? fmt(mid) : '—'}</div>
        {included && !noRange && mid > 0 && (
          <div className="cost-row-range">{fmt(low) + ' – ' + fmt(high)}</div>
        )}
      </div>
    </div>
  )
}

export default function CostPanel(props) {
  var race = props.race
  var trip = props.trip
  var onSet = props.onSet
  var c = props.c
  var selectedGrandstand = props.selectedGrandstand

  var depCluster = trip.departureCity ? trip.departureCity.cluster : null
  var isUKHome = race.isUKRace && UK_CLUSTERS.includes(depCluster || '')
  var depLabel = trip.departureCity ? trip.departureCity.label : ''
  var tot = c ? Math.max(c.pct.flight + c.pct.ticket + c.pct.accom + c.pct.transport, 1) : 1
  var partyLabel = trip.party === 1 ? 'per person' : 'for ' + trip.party + ' people'
  var ticketLabel = selectedGrandstand ? selectedGrandstand.name : (['Standard','Advanced','Premium'][trip.ticketTier] + ' Tickets')
  var ticketSub = selectedGrandstand ? 'Selected grandstand' : race.ticketLabels[trip.ticketTier]
  var skyscannerUrl = buildSkyscannerUrl(race, depCluster, trip.party)
  var bookingUrl = buildBookingComUrl(race, trip.party, BOOKING_AFFILIATE_ID)

  // Animated headline total — counts toward the new value instead of snapping.
  var totalMidRaw = c ? c.totalMid : 0
  var animatedTotal = useAnimatedNumber(totalMidRaw)

  // Brief highlight flash on whichever row's value just changed.
  var flightMid = c ? c.flight.mid : null
  var ticketMid = c ? c.ticket.mid : null
  var accomMid = c ? c.accom.mid : null
  var [flashRow, setFlashRow] = useState(null)
  var prevMidsRef = useRef({ flight: null, ticket: null, accom: null })

  useEffect(function() {
    if (!c) return undefined
    var prev = prevMidsRef.current
    var changed = null
    if (prev.ticket !== null && ticketMid !== prev.ticket) changed = 'ticket'
    else if (prev.accom !== null && accomMid !== prev.accom) changed = 'accom'
    else if (prev.flight !== null && flightMid !== prev.flight) changed = 'flight'
    prevMidsRef.current = { flight: flightMid, ticket: ticketMid, accom: accomMid }
    if (changed) {
      setFlashRow(changed)
      var t = setTimeout(function() { setFlashRow(null) }, 900)
      return function() { clearTimeout(t) }
    }
    return undefined
  }, [flightMid, ticketMid, accomMid])

  // "Trip plan complete" milestone — fires once, the first time the person has
  // set a departure city, a passport, and picked a specific grandstand.
  var planComplete = !!(trip.departureCity && trip.passport && selectedGrandstand)
  var [justCompleted, setJustCompleted] = useState(false)
  var wasCompleteRef = useRef(false)

  useEffect(function() {
    if (planComplete && !wasCompleteRef.current) {
      wasCompleteRef.current = true
      setJustCompleted(true)
      var t = setTimeout(function() { setJustCompleted(false) }, 600)
      return function() { clearTimeout(t) }
    }
    if (!planComplete) {
      wasCompleteRef.current = false
    }
    return undefined
  }, [planComplete])

  function w(v, inc) { return inc ? (v / tot * 100).toFixed(1) : 0 }

  function toggleInc(key) {
    if (key === 'incFlights' && isUKHome) return
    onSet(key, !trip[key])
  }

  var emptyPanel = (
    <div className="cost-panel-empty">
      <div className="cost-panel-empty-icon">✈️</div>
      <p>Select your departure city above to see your personalised cost estimate</p>
    </div>
  )

  var fullPanel = !c ? null : (
    <div className="cost-panel-full">
      <div className="cost-panel-total">
        <div className="cost-panel-total-label">{'Estimated total ' + partyLabel}</div>
        <div className="cost-panel-total-amount">{fmt(animatedTotal)}</div>
        <div className="cost-panel-total-range">
          {'Range: '}<span>{fmt(c.totalLow)}</span>{' – '}<span>{fmt(c.totalHigh)}</span>
        </div>
        {trip.party > 1 && (
          <div className="cost-panel-per-person">{'~' + fmt(c.ppMid) + ' per person'}</div>
        )}
      </div>
      <div className="cost-bar-outer">
        <div className="cost-bar-wrap">
          <div className="cost-bar-seg bar-flight" style={{width: w(c.pct.flight, c.flight.included && !isUKHome) + '%'}} />
          <div className="cost-bar-seg bar-ticket" style={{width: w(c.pct.ticket, c.ticket.included) + '%'}} />
          <div className="cost-bar-seg bar-accom" style={{width: w(c.pct.accom, c.accom.included) + '%'}} />
          <div className="cost-bar-seg bar-transport" style={{width: w(c.pct.transport, true) + '%'}} />
        </div>
      </div>
      <div className="cost-breakdown">
        <CostRow color="#3B82F6" label={isUKHome ? 'Local Travel' : 'Return Flights'} sub={isUKHome ? 'Local race — no flights needed' : ('From ' + depLabel)} mid={c.flight.mid} low={c.flight.low} high={c.flight.high} included={c.flight.included && !isUKHome} flash={flashRow === 'flight'} />
        <CostRow color="#E8002D" label={ticketLabel} sub={ticketSub} mid={c.ticket.mid} low={c.ticket.low} high={c.ticket.high} included={c.ticket.included} flash={flashRow === 'ticket'} />
        <CostRow color="#F59E0B" label={'Accommodation (' + c.accom.nights + ' nights)'} sub={race.accumLabels[trip.accumTier]} mid={c.accom.mid} low={c.accom.low} high={c.accom.high} included={c.accom.included} flash={flashRow === 'accom'} />
        <CostRow color="#22C55E" label="Local Transport" sub="Return travel to circuit" mid={c.transport.mid} low={c.transport.low} high={c.transport.high} included={true} noRange={true} />
      </div>
    </div>
  )

  var flightToggle = isUKHome ? (
    <div className="cost-toggle-item disabled">
      <div>
        <div className="cost-toggle-label">Flights / Travel</div>
        <div className="cost-toggle-sub">Local race — no flights needed</div>
      </div>
      <div className="cost-toggle-switch on" />
    </div>
  ) : (
    <div className="cost-toggle-item" onClick={function() { toggleInc('incFlights') }}>
      <div>
        <div className="cost-toggle-label">Flights</div>
        <div className="cost-toggle-sub">{'Return from ' + (depLabel || 'departure city')}</div>
      </div>
      <div className={trip.incFlights ? 'cost-toggle-switch on' : 'cost-toggle-switch'} />
    </div>
  )

  var skyBtn = !isUKHome ? (
    <a className="cost-cta-primary" href={skyscannerUrl} target="_blank" rel="noopener noreferrer">
      Search Flights on Skyscanner ↗
    </a>
  ) : null

  var hotelBtn = (
    <a className="cost-cta-secondary" href={bookingUrl} target="_blank" rel="noopener noreferrer">
      Find Hotels for This Race ↗
    </a>
  )

  var completeRibbon = planComplete ? (
    <div className={'cost-panel-complete' + (justCompleted ? ' gp-reveal' : '')}>
      <span className="cost-panel-complete-check" aria-hidden="true">✓</span>
      Trip plan complete — ready to book
    </div>
  ) : null

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: panelStyles }} />
      <div className="cost-panel">
        <div className="cost-panel-header">
          <div className="cost-panel-title">Trip Cost Estimate</div>
          <div className="cost-panel-sub">Updates live as you plan</div>
        </div>

        {trip.departureCity ? fullPanel : emptyPanel}

        <div className="cost-panel-section">
          <div className="cost-panel-section-label">Include in estimate</div>
          <div className="cost-toggles">
            {flightToggle}
            <div className="cost-toggle-item" onClick={function() { toggleInc('incTickets') }}>
              <div>
                <div className="cost-toggle-label">Race Tickets</div>
                <div className="cost-toggle-sub">Already have tickets? Toggle off</div>
              </div>
              <div className={trip.incTickets ? 'cost-toggle-switch on' : 'cost-toggle-switch'} />
            </div>
            <div className="cost-toggle-item" onClick={function() { toggleInc('incAccom') }}>
              <div>
                <div className="cost-toggle-label">Accommodation</div>
                <div className="cost-toggle-sub">Already booked? Toggle off</div>
              </div>
              <div className={trip.incAccom ? 'cost-toggle-switch on' : 'cost-toggle-switch'} />
            </div>
          </div>
        </div>

        {completeRibbon}

        <div className="cost-panel-ctas">
          {skyBtn}
          {hotelBtn}
        </div>

        <div className="cost-disclaimer">
          Estimates based on advance bookings (3+ months). Always verify before purchasing.
        </div>
      </div>
    </>
  )
}
