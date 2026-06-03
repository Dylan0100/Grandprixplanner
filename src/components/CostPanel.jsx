import { fmt, buildBookingComUrl } from '../utils/costCalc'
import { UK_CLUSTERS } from '../data/racesData'

// Drop your affiliate IDs here the moment accounts are approved
const SKYSCANNER_AFFILIATE_ID = null
const BOOKING_AFFILIATE_ID = null

function buildSkyscannerUrl(race, departureCluster, party) {
  if (!race || !departureCluster) return 'https://www.skyscanner.net'
  const dest = race.destinationIATA || ''
  const origin = clusterToIATA(departureCluster)
  const checkIn = parseSkyDate(race.dates)
  const checkOut = parseSkyDateOut(race.dates, race.nights)
  const adults = party || 2
  const base = dest && origin && checkIn && checkOut
    ? `https://www.skyscanner.net/transport/flights/${origin}/${dest}/${checkIn}/${checkOut}/`
    : 'https://www.skyscanner.net'
  const affiliate = SKYSCANNER_AFFILIATE_ID ? `?adults=${adults}&affilid=${SKYSCANNER_AFFILIATE_ID}` : `?adults=${adults}`
  return base + affiliate
}

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

function parseSkyDate(dateStr) {
  // Returns YYMMDD for Skyscanner deep links
  const months = {
    Jan:'01',Feb:'02',Mar:'03',Apr:'04',May:'05',Jun:'06',
    Jul:'07',Aug:'08',Sep:'09',Oct:'10',Nov:'11',Dec:'12'
  }
  const crossMonth = dateStr.match(/(\d+)\s+(\w+)–(\d+)\s+(\w+)\s+(\d{4})/)
  if (crossMonth) {
    const [, dayIn, monIn, , , year] = crossMonth
    return year.slice(2) + months[monIn] + dayIn.padStart(2,'0')
  }
  const sameMonth = dateStr.match(/(\d+)–\d+\s+(\w+)\s+(\d{4})/)
  if (sameMonth) {
    const [, dayIn, mon, year] = sameMonth
    return year.slice(2) + months[mon] + dayIn.padStart(2,'0')
  }
  return ''
}

function parseSkyDateOut(dateStr, nights) {
  const months = {
    Jan:'01',Feb:'02',Mar:'03',Apr:'04',May:'05',Jun:'06',
    Jul:'07',Aug:'08',Sep:'09',Oct:'10',Nov:'11',Dec:'12'
  }
  const crossMonth = dateStr.match(/(\d+)\s+(\w+)–(\d+)\s+(\w+)\s+(\d{4})/)
  if (crossMonth) {
    const [, dayIn, monIn, , , year] = crossMonth
    const d = new Date(`${year}-${months[monIn]}-${dayIn.padStart(2,'0')}`)
    d.setDate(d.getDate() + nights)
    const y = d.getFullYear().toString().slice(2)
    const m = String(d.getMonth()+1).padStart(2,'0')
    const dy = String(d.getDate()).padStart(2,'0')
    return y + m + dy
  }
  const sameMonth = dateStr.match(/(\d+)–\d+\s+(\w+)\s+(\d{4})/)
  if (sameMonth) {
    const [, dayIn, mon, year] = sameMonth
    const d = new Date(`${year}-${months[mon]}-${dayIn.padStart(2,'0')}`)
    d.setDate(d.getDate() + nights)
    const y = d.getFullYear().toString().slice(2)
    const m = String(d.getMonth()+1).padStart(2,'0')
    const dy = String(d.getDate()).padStart(2,'0')
    return y + m + dy
  }
  return ''
}

function CostRow({ color, label, sub, mid, low, high, included, noRange }) {
  return (
    <div className={'cost-row' + (!included ? ' excluded' : '')}>
      <div className="cost-row-left">
        <div className="cost-row-dot" style={{ background: color }} />
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

export default function CostPanel({ race, trip, onSet, c, selectedGrandstand, onClearGrandstand }) {
  const depCluster = trip.departureCity ? trip.departureCity.cluster : null
  const isUKHome = race.isUKRace && UK_CLUSTERS.includes(depCluster || '')
  const depLabel = trip.departureCity ? trip.departureCity.label : ''

  const tot = c ? Math.max(c.pct.flight + c.pct.ticket + c.pct.accom + c.pct.transport, 1) : 1
  const w = (v, inc) => inc ? (v / tot * 100).toFixed(1) : 0

  const partyLabel = trip.party === 1 ? 'per person' : 'for ' + trip.party + ' people'
  const ticketLabel = selectedGrandstand ? selectedGrandstand.name : (['Standard', 'Advanced', 'Premium'][trip.ticketTier] + ' Tickets')
  const ticketSub = selectedGrandstand ? 'Selected grandstand' : race.ticketLabels[trip.ticketTier]

  const skyscannerUrl = buildSkyscannerUrl(race, depCluster, trip.party)
  const bookingUrl = buildBookingComUrl(race, trip.party, BOOKING_AFFILIATE_ID)

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
            <div className="cost-panel-total-range">
              {'Range: '}<span>{fmt(c.totalLow)}</span>{' – '}<span>{fmt(c.totalHigh)}</span>
            </div>
            {trip.party > 1 && (
              <div className="cost-panel-per-person">{'~' + fmt(c.ppMid) + ' per person'}</div>
            )}
          </div>

          <div className="cost-bar-outer">
            <div className="cost-bar-wrap">
              <div className="cost-bar-seg bar-flight" style={{ width: w(c.pct.flight, c.flight.included && !isUKHome) + '%' }} />
              <div className="cost-bar-seg bar-ticket" style={{ width: w(c.pct.ticket, c.ticket.included) + '%' }} />
              <div className="cost-bar-seg bar-accom" style={{ width: w(c.pct.accom, c.accom.included) + '%' }} />
              <div className="cost-bar-seg bar-transport" style={{ width: w(c.pct.transport, true) + '%' }} />
            </div>
          </div>

          <div className="cost-breakdown">
            <CostRow
              color="#3B82F6"
              label={isUKHome ? 'Local Travel' : 'Return Flights'}
              sub={isUKHome ? 'Local race — no flights needed' : ('From ' + depLabel)}
              mid={c.flight.mid} low={c.flight.low} high={c.flight.high}
              included={c.flight.included && !isUKHome}
            />
            <CostRow
              color="#E8002D"
              label={ticketLabel}
              sub={ticketSub}
              mid={c.ticket.mid} low={c.ticket.low} high={c.ticket.high}
              included={c.ticket.included}
            />
            <CostRow
              color="#F59E0B"
              label={'Accommodation (' + c.accom.nights + ' nights)'}
              sub={race.accumLabels[trip.accumTier]}
              mid={c.accom.mid} low={c.accom.low} high={c.accom.high}
              included={c.accom.included}
            />
            <CostRow
              color="#22C55E"
              label="Local Transport"
              sub="Return travel to circuit"
              mid={c.transport.mid} low={c.transport.low} high={c.transport.high}
              included={true}
              noRange
            />
          </div>
        </>
      )}

      <div className="cost-panel-section">
        <div className="cost-panel-section-label">Include in estimate</div>
        <div className="cost-toggles">
          {isUKHome ? (
            <div className="cost-toggle-item disabled">
              <div>
                <div className="cost-toggle-label">Flights / Travel</div>
                <div className="cost-toggle-sub">Local race — no flights needed</div>
              </div>
              <div className="cost-toggle-switch on" />
            </div>
          ) : (
            <div className="cost-toggle-item" onClick={() => toggleInc('incFlights')}>
              <div>
                <div className="cost-toggle-label">Flights</div>
                <div className="cost-toggle-sub">{'Return from ' + (depLabel || 'departure city')}</div>
              </div>
              <div className={'cost-toggle-switch' + (trip.incFlights ? ' on' : '')} />
            </div>
          )}
          <div className="cost-toggle-item" onClick={() => toggleInc('incTickets')}>
            <div>
              <div className="cost-toggle-label">Race Tickets</div>
              <div className="cost-toggle-sub">Already have tickets? Toggle off</div>
            </div>
            <div className={'cost-toggle-switch' + (trip.incTickets ? ' on' : '')} />
          </div>
          <div className="cost-toggle-item" onClick={() => toggleInc('incAccom')}>
            <div>
              <div className="cost-toggle-label">Accommodation</div>
              <div className="cost-toggle-sub">Already booked? Toggle off</div>
            </div>
            <div className={'cost-toggle-switch' + (trip.incAccom ? ' on' : '')} />
          </div>
        </div>
      </div>

      <div className="cost-panel-ctas">
        {!isUKHome && (
          
            className="cost-cta-primary"
            href={skyscannerUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Search Flights on Skyscanner ↗
          </a>
        )}
        
          className="cost-cta-secondary"
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Find Hotels for This Race ↗
        </a>
      </div>

      <div className="cost-disclaimer">
        Estimates based on advance bookings (3+ months). Always verify before purchasing.
      </div>
    </div>
  )
}
