import { fmt, buildBookingComUrl } from '../utils/costCalc'
import { UK_CLUSTERS } from '../data/racesData'

const SKYSCANNER_AFFILIATE_ID = null
const BOOKING_AFFILIATE_ID = null

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

function CostRow(props) {
  var color = props.color
  var label = props.label
  var sub = props.sub
  var mid = props.mid
  var low = props.low
  var high = props.high
  var included = props.included
  var noRange = props.noRange
  return (
    <div className={included ? 'cost-row' : 'cost-row excluded'}>
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
        <div className="cost-panel-total-amount">{fmt(c.totalMid)}</div>
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
        <CostRow color="#3B82F6" label={isUKHome ? 'Local Travel' : 'Return Flights'} sub={isUKHome ? 'Local race — no flights needed' : ('From ' + depLabel)} mid={c.flight.mid} low={c.flight.low} high={c.flight.high} included={c.flight.included && !isUKHome} />
        <CostRow color="#E8002D" label={ticketLabel} sub={ticketSub} mid={c.ticket.mid} low={c.ticket.low} high={c.ticket.high} included={c.ticket.included} />
        <CostRow color="#F59E0B" label={'Accommodation (' + c.accom.nights + ' nights)'} sub={race.accumLabels[trip.accumTier]} mid={c.accom.mid} low={c.accom.low} high={c.accom.high} included={c.accom.included} />
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

  return (
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

      <div className="cost-panel-ctas">
        {skyBtn}
        {hotelBtn}
      </div>

      <div className="cost-disclaimer">
        Estimates based on advance bookings (3+ months). Always verify before purchasing.
      </div>
    </div>
  )
}
