import React from 'react'
import flightData from './flightData'

const FG_CSS = `
.fg-wrap {
  font-family: 'Barlow', sans-serif;
  color: var(--text);
  padding: 0;
}
.fg-fare-hero {
  padding: 20px 28px 18px;
  border-bottom: 1px solid var(--border);
  background: linear-gradient(135deg, var(--surface-3) 0%, var(--surface-2) 100%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}
.fg-fare-eyebrow {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--text-dim);
  margin-bottom: 4px;
  display: block;
}
.fg-fare-amount {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 36px;
  font-weight: 400;
  letter-spacing: 0.03em;
  line-height: 1.15;
  color: var(--text);
}
.fg-fare-note {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 3px;
}
.fg-personalised-fare {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 36px;
  font-weight: 400;
  letter-spacing: 0.03em;
  line-height: 1.15;
  color: var(--red);
}
.fg-personalised-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--red);
  opacity: 0.7;
  margin-bottom: 4px;
  display: block;
}
.fg-direct-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 16px;
  border-radius: 8px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border: 1px solid transparent;
  flex-shrink: 0;
}
.fg-direct-badge.yes {
  background: rgba(34,197,94,0.1);
  border-color: rgba(34,197,94,0.3);
  color: #4ade80;
}
.fg-direct-badge.no {
  background: var(--surface-4);
  border-color: var(--border-md);
  color: var(--text-muted);
}
.fg-direct-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}
.fg-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
}
.fg-cell {
  padding: 18px 22px;
  border-bottom: 1px solid var(--border);
}
.fg-cell:nth-child(odd) {
  border-right: 1px solid var(--border);
}
.fg-cell-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-dim);
  margin-bottom: 10px;
  display: block;
}
.fg-airport-code {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 32px;
  font-weight: 400;
  letter-spacing: 0.06em;
  line-height: 1;
  color: var(--text);
  margin-bottom: 2px;
}
.fg-airport-name {
  font-size: 13px;
  color: var(--text);
  font-weight: 500;
  margin-bottom: 2px;
}
.fg-airport-time {
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: 12px;
}
.fg-transfer-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.fg-transfer-item {
  display: flex;
  gap: 8px;
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.5;
  align-items: flex-start;
}
.fg-transfer-bullet {
  color: var(--red);
  flex-shrink: 0;
  font-size: 10px;
  margin-top: 3px;
}
.fg-avoid-box {
  margin-top: 12px;
  padding: 9px 12px;
  background: rgba(232,0,45,0.08);
  border: 1px solid rgba(232,0,45,0.22);
  border-radius: 7px;
  font-size: 12px;
  color: #f87171;
  line-height: 1.5;
}
.fg-secondary-box {
  margin-top: 8px;
  padding: 9px 12px;
  background: var(--surface-3);
  border: 1px solid var(--border-md);
  border-radius: 7px;
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.5;
}
.fg-route-text {
  font-size: 13px;
  color: var(--text);
  line-height: 1.5;
  margin-bottom: 12px;
  font-weight: 500;
}
.fg-meta-row {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}
.fg-meta-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-dim);
  display: block;
  margin-bottom: 2px;
}
.fg-meta-value {
  font-size: 13px;
  color: var(--text);
  font-weight: 500;
}
.fg-hubs-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-dim);
  display: block;
  margin-bottom: 6px;
}
.fg-hubs {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
.fg-hub-pill {
  background: var(--surface-3);
  border: 1px solid var(--border-md);
  border-radius: 5px;
  padding: 3px 9px;
  font-size: 12px;
  color: var(--text-muted);
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 600;
  letter-spacing: 0.04em;
}
.fg-airlines {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.fg-airline-pill {
  background: var(--surface-2);
  border: 1px solid var(--border-md);
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 12px;
  color: var(--text);
  font-weight: 500;
  font-family: 'Barlow', sans-serif;
}
.fg-booking-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  gap: 10px;
  flex-wrap: wrap;
}
.fg-booking-countdown {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--text-muted);
  background: var(--surface-3);
  border: 1px solid var(--border-md);
  border-radius: 100px;
  padding: 3px 10px;
  white-space: nowrap;
}
.fg-booking-now-wrap {
  position: relative;
  height: 15px;
}
.fg-booking-now-label {
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text);
  white-space: nowrap;
}
.fg-booking-bar {
  display: flex;
  gap: 2px;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 12px;
}
.fg-booking-seg {
  flex: 1;
  height: 100%;
  opacity: 0.35;
  transition: opacity 0.3s ease;
}
.fg-booking-seg.green { background: #22C55E; }
.fg-booking-seg.amber { background: var(--amber); }
.fg-booking-seg.red   { background: var(--red); }
.fg-booking-seg-now { opacity: 1; }
.fg-booking-tiers {
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.fg-booking-tier {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 10px 13px;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 8px;
  border-left: 3px solid transparent;
}
.fg-booking-tier.green { border-left-color: #22C55E; }
.fg-booking-tier.amber { border-left-color: var(--amber); }
.fg-booking-tier.red   { border-left-color: var(--red); }
.fg-booking-tier-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  white-space: nowrap;
  flex-shrink: 0;
  padding-top: 1px;
}
.fg-booking-tier.green .fg-booking-tier-label { color: #22C55E; }
.fg-booking-tier.amber .fg-booking-tier-label { color: var(--amber); }
.fg-booking-tier.red   .fg-booking-tier-label { color: var(--red); }
.fg-booking-tier-text {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.5;
}
.fg-tip-list {
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.fg-tip-item {
  display: flex;
  gap: 10px;
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.55;
  align-items: flex-start;
}
.fg-tip-arrow {
  color: var(--amber);
  flex-shrink: 0;
  font-size: 11px;
  margin-top: 2px;
}
.fg-note-item {
  display: flex;
  gap: 10px;
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.55;
  align-items: flex-start;
}
.fg-note-dot {
  color: var(--text-dim);
  flex-shrink: 0;
  margin-top: 2px;
}
.fg-personalised-banner {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 28px;
  background: rgba(232,0,45,0.06);
  border-bottom: 1px solid rgba(232,0,45,0.15);
  font-size: 12px;
  color: var(--text-muted);
}
.fg-personalised-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--red);
  flex-shrink: 0;
}
.fg-personalised-city {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text);
}
.fg-no-data {
  padding: 48px 28px;
  text-align: center;
  color: var(--text-muted);
  font-size: 14px;
}
@media (max-width: 700px) {
  .fg-grid { grid-template-columns: 1fr; }
  .fg-cell:nth-child(odd) { border-right: none; }
  .fg-fare-hero { padding: 16px 20px; }
  .fg-cell { padding: 16px 18px; }
  .fg-personalised-banner { padding: 10px 18px; }
}
`

function getPersonalisedFare(race, departureCity) {
  if (!departureCity || !departureCity.cluster) return null
  var cluster = departureCity.cluster
  var clusterMults = {
    'uk-south': 1.00, 'uk-midlands': 1.08, 'uk-north': 1.12,
    'uk-scotland': 1.15, 'uk-wales': 1.10, 'ireland': 0.97,
    'w-europe': 0.60, 'e-europe': 0.70, 'scandinavia': 0.82,
    'n-america': null, 'australia': null, 'other': 0.95
  }
  var ukClusters = ['uk-south','uk-midlands','uk-north','uk-scotland','uk-wales','ireland']
  if (race.isUKRace && ukClusters.includes(cluster)) return 0
  if (cluster === 'n-america') {
    var mid = race.flightNA
    return { low: Math.round(mid * 0.86), high: Math.round(mid * 1.16) }
  }
  if (cluster === 'australia') {
    var mid = race.flightAUS
    return { low: Math.round(mid * 0.86), high: Math.round(mid * 1.16) }
  }
  var mult = clusterMults[cluster]
  if (!mult) return null
  var mid = Math.round(race.flightBase * mult)
  return { low: Math.round(mid * 0.86), high: Math.round(mid * 1.16) }
}

/* Parses the race's date string (e.g. "5–7 Jun 2026" or "27 Feb–1 Mar 2026")
   into a real JS Date for the first day of the weekend. Same pattern already
   used elsewhere in the app for date handling. */
function parseRaceStartDate(dateStr) {
  var months = {Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11}
  var cross = dateStr.match(/(\d+)\s+(\w+)–(\d+)\s+(\w+)\s+(\d{4})/)
  if (cross) return new Date(parseInt(cross[5], 10), months[cross[2]], parseInt(cross[1], 10))
  var same = dateStr.match(/(\d+)–\d+\s+(\w+)\s+(\d{4})/)
  if (same) return new Date(parseInt(same[3], 10), months[same[2]], parseInt(same[1], 10))
  return null
}

/* Turns free text like "5–6 months out" or "6+ months out" into a day range.
   Returns null if the text doesn't match a recognisable pattern rather than
   guessing — a handful of entries in flightData.js use a different format
   and are deliberately left unhighlighted rather than misread. */
function parseWindowToDays(str) {
  if (!str) return null
  var perUnit = { month: 30, week: 7 }
  var range = str.match(/(\d+)\s*[–-]\s*(\d+)\s*(month|week)/i)
  if (range) {
    var unit = range[3].toLowerCase()
    return { loDays: parseInt(range[1], 10) * perUnit[unit], hiDays: parseInt(range[2], 10) * perUnit[unit] }
  }
  var plus = str.match(/(\d+)\+\s*(month|week)/i)
  if (plus) {
    var unit2 = plus[2].toLowerCase()
    var n = parseInt(plus[1], 10) * perUnit[unit2]
    return { loDays: n, hiDays: n }
  }
  return null
}

function getBookingZone(daysUntilRace, idealText, acceptableText) {
  if (daysUntilRace === null || daysUntilRace <= 0) return null
  var ideal = parseWindowToDays(idealText)
  var acceptable = parseWindowToDays(acceptableText)
  if (!ideal || !acceptable) return null
  if (daysUntilRace >= ideal.loDays) return 'ideal'
  if (daysUntilRace >= acceptable.loDays) return 'acceptable'
  return 'last'
}

var ZONE_OFFSET = { ideal: '16.67%', acceptable: '50%', last: '83.33%' }

export default function FlightGuide({ race, trip }) {
  var data = flightData[race ? race.name : '']
  var departureCity = trip ? trip.departureCity : null
  var personalisedFare = race ? getPersonalisedFare(race, departureCity) : null

  var raceStart = race ? parseRaceStartDate(race.dates) : null
  var daysUntilRace = raceStart ? Math.ceil((raceStart - new Date()) / 86400000) : null

  if (!data) {
    return (
      <div className="fg-wrap">
        <style dangerouslySetInnerHTML={{ __html: FG_CSS }} />
        <div className="fg-no-data">
          <p>{'Flight guide for ' + (race ? race.name : 'this race') + ' is coming soon.'}</p>
        </div>
      </div>
    )
  }

  var isDirect = data.ukRouting.directAvailable
  var bookingZone = getBookingZone(daysUntilRace, data.bookingWindow.ideal, data.bookingWindow.acceptable)

  return (
    <div className="fg-wrap">
      <style dangerouslySetInnerHTML={{ __html: FG_CSS }} />

      {departureCity && (
        <div className="fg-personalised-banner">
          <div className="fg-personalised-dot" />
          <span>Showing estimates for</span>
          <span className="fg-personalised-city">{departureCity.label}</span>
        </div>
      )}

      <div className="fg-fare-hero">
        <div>
          {personalisedFare !== null ? (
            <>
              {personalisedFare === 0 ? (
                <>
                  <span className="fg-personalised-label">Your flight cost</span>
                  <div className="fg-personalised-fare">No flight needed</div>
                  <div className="fg-fare-note">This is your home race</div>
                </>
              ) : (
                <>
                  <span className="fg-personalised-label">Estimated return fare</span>
                  <div className="fg-personalised-fare">
                    {'£' + personalisedFare.low.toLocaleString('en-GB') + ' – £' + personalisedFare.high.toLocaleString('en-GB')}
                  </div>
                  <div className="fg-fare-note">{'from ' + departureCity.label + ' · return'}</div>
                </>
              )}
            </>
          ) : (
            <>
              <span className="fg-fare-eyebrow">Typical return fare from UK</span>
              <div className="fg-fare-amount">{data.typicalFareRange || '—'}</div>
              <div className="fg-fare-note">{data.destination}</div>
            </>
          )}
        </div>
        <div className={'fg-direct-badge ' + (isDirect ? 'yes' : 'no')}>
          <div className="fg-direct-dot" style={{ background: isDirect ? '#4ade80' : 'var(--text-dim)' }} />
          {isDirect ? 'Direct flights available' : 'Connection required'}
        </div>
      </div>

      <div className="fg-grid">

        <div className="fg-cell">
          <span className="fg-cell-label">Best airport</span>
          {data.primaryAirport.code && (
            <div className="fg-airport-code">{data.primaryAirport.code}</div>
          )}
          <div className="fg-airport-name">{data.primaryAirport.name}</div>
          <div className="fg-airport-time">{data.primaryAirport.transferTime}</div>
          <ul className="fg-transfer-list">
            {data.primaryAirport.transferOptions.map(function(opt, i) {
              return (
                <li key={i} className="fg-transfer-item">
                  <span className="fg-transfer-bullet">›</span>
                  <span>{opt}</span>
                </li>
              )
            })}
          </ul>
          {data.avoidAirport && (
            <div className="fg-avoid-box">{'⚠ ' + data.avoidAirport}</div>
          )}
          {data.secondaryOption && (
            <div className="fg-secondary-box">{'Also consider: ' + data.secondaryOption}</div>
          )}
        </div>

        <div className="fg-cell">
          <span className="fg-cell-label">
            {departureCity ? 'Getting there from ' + departureCity.label.split(' ')[0] : 'Getting there from the UK'}
          </span>
          <div className="fg-route-text">{data.ukRouting.typicalRoute}</div>
          <div className="fg-meta-row">
            <div>
              <span className="fg-meta-label">Total travel time</span>
              <span className="fg-meta-value">{data.ukRouting.totalTravelTime}</span>
            </div>
          </div>
          {data.ukRouting.commonHubs && data.ukRouting.commonHubs.length > 0 && (
            <div>
              <span className="fg-hubs-label">
                {isDirect ? 'Also via hub' : 'Common connecting hubs'}
              </span>
              <div className="fg-hubs">
                {data.ukRouting.commonHubs.map(function(hub, i) {
                  return <span key={i} className="fg-hub-pill">{hub}</span>
                })}
              </div>
            </div>
          )}
        </div>

        {data.recommendedAirlines && data.recommendedAirlines.length > 0 && (
          <div className="fg-cell">
            <span className="fg-cell-label">Recommended airlines</span>
            <div className="fg-airlines">
              {data.recommendedAirlines.map(function(airline, i) {
                return <span key={i} className="fg-airline-pill">{airline}</span>
              })}
            </div>
          </div>
        )}

        <div className="fg-cell">
          <div className="fg-booking-head">
            <span className="fg-cell-label" style={{marginBottom: 0}}>When to book</span>
            {daysUntilRace !== null && daysUntilRace > 0 && (
              <span className="fg-booking-countdown">{daysUntilRace + ' days to go'}</span>
            )}
          </div>
          {bookingZone && (
            <div className="fg-booking-now-wrap">
              <span className="fg-booking-now-label" style={{left: ZONE_OFFSET[bookingZone]}}>You're here</span>
            </div>
          )}
          <div className="fg-booking-bar">
            <div className={'fg-booking-seg green' + (bookingZone === 'ideal' ? ' fg-booking-seg-now' : '')} />
            <div className={'fg-booking-seg amber' + (bookingZone === 'acceptable' ? ' fg-booking-seg-now' : '')} />
            <div className={'fg-booking-seg red' + (bookingZone === 'last' ? ' fg-booking-seg-now' : '')} />
          </div>
          <div className="fg-booking-tiers">
            <div className="fg-booking-tier green">
              <span className="fg-booking-tier-label">Ideal</span>
              <span className="fg-booking-tier-text">{data.bookingWindow.ideal}</span>
            </div>
            <div className="fg-booking-tier amber">
              <span className="fg-booking-tier-label">Acceptable</span>
              <span className="fg-booking-tier-text">{data.bookingWindow.acceptable}</span>
            </div>
            <div className="fg-booking-tier red">
              <span className="fg-booking-tier-label">Last minute</span>
              <span className="fg-booking-tier-text">{data.bookingWindow.lastMinuteRisk}</span>
            </div>
          </div>
        </div>

        <div className="fg-cell" style={{gridColumn:'1/-1'}}>
          <span className="fg-cell-label">Pricing tips</span>
          <div className="fg-tip-list">
            {data.pricingTips.map(function(tip, i) {
              return (
                <div key={i} className="fg-tip-item">
                  <span className="fg-tip-arrow">→</span>
                  <span>{tip}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="fg-cell" style={{gridColumn:'1/-1', borderBottom:'none'}}>
          <span className="fg-cell-label">On the ground</span>
          <div className="fg-tip-list">
            {data.destinationNotes.map(function(note, i) {
              return (
                <div key={i} className="fg-note-item">
                  <span className="fg-note-dot">·</span>
                  <span>{note}</span>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}
