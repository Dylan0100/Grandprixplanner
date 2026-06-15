import { fmt, buildBookingComUrl } from '../utils/costCalc'
import stayAdvice from '../data/stayAdviceData'

const BOOKING_AFFILIATE_ID = null

const styles = `
  .accom-stay-card {
    margin-bottom: 16px;
    background: var(--surface-2);
    border: 1px solid var(--border-md);
    border-radius: 10px;
    overflow: hidden;
  }
  .accom-stay-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 11px 16px;
    background: var(--surface-3);
    border-bottom: 1px solid var(--border);
  }
  .accom-stay-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--text-dim);
  }
  .accom-stay-base {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px;
    font-weight: 400;
    letter-spacing: 0.04em;
    color: var(--text);
    line-height: 1;
    padding: 12px 16px 8px;
  }
  .accom-stay-why {
    font-size: 13px;
    color: var(--text-muted);
    line-height: 1.6;
    padding: 0 16px 12px;
  }
  .accom-stay-points {
    border-top: 1px solid var(--border);
    padding: 10px 16px 14px;
    display: flex;
    flex-direction: column;
    gap: 7px;
  }
  .accom-stay-point {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    font-size: 12px;
    color: var(--text-muted);
    line-height: 1.55;
  }
  .accom-stay-bullet {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--red);
    flex-shrink: 0;
    margin-top: 5px;
  }
`

export default function Accommodation(props) {
  var race = props.race
  var trip = props.trip
  var onSet = props.onSet
  var advice = stayAdvice[race.name]
  var bookingUrl = buildBookingComUrl(race, trip.party, BOOKING_AFFILIATE_ID)
  var hotelBtn = (
    <a className="accom-cta-btn" href={bookingUrl} target="_blank" rel="noopener noreferrer">
      Find Hotels for This Race Weekend ↗
    </a>
  )

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="accom-body">

        {advice && (
          <div className="accom-stay-card">
            <div className="accom-stay-header">
              <span className="accom-stay-label">📍 Where to Stay</span>
            </div>
            <div className="accom-stay-base">{advice.recommendedBase}</div>
            <div className="accom-stay-why">{advice.why}</div>
            <div className="accom-stay-points">
              {advice.points.map(function(point, i) {
                return (
                  <div key={i} className="accom-stay-point">
                    <div className="accom-stay-bullet" />
                    <span>{point}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <div className="accom-tier-grid">
          {race.accumLabels.map(function(label, i) {
            return (
              <button
                key={i}
                className={'accom-tier-btn' + (trip.accumTier === i ? ' active' : '')}
                onClick={function() { onSet('accumTier', i) }}
              >
                <div className="accom-tier-left">
                  <div className="accom-tier-name">{['Standard', 'Advanced', 'Premium'][i]}</div>
                  <div className="accom-tier-desc">{label}</div>
                </div>
                <div className="accom-tier-right">
                  <div className="accom-tier-price">
                    {fmt(race.accommodation[i])}
                    <span className="accom-per-night">/night</span>
                  </div>
                  <div className="accom-tier-total">
                    {'~' + fmt(race.accommodation[i] * race.nights) + ' total'}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        <div className="accom-cta-row">
          <div className="accom-cta-context">
            <span className="accom-cta-nights">{race.nights} nights</span>
            <span className="accom-cta-city">near {race.city}</span>
          </div>
          {hotelBtn}
          <div className="accom-cta-note">
            {'Opens Booking.com pre-filtered for ' + race.city + ' · ' + race.nights + ' nights · ' + trip.party + (trip.party === 1 ? ' guest' : ' guests')}
          </div>
        </div>

      </div>
    </>
  )
}
