import { fmt, buildBookingComUrl } from '../utils/costCalc'

// Booking.com affiliate ID — add here once account is approved
const BOOKING_AFFILIATE_ID = null

export default function Accommodation({ race, trip, onSet }) {
  const bookingUrl = buildBookingComUrl(race, trip.party, BOOKING_AFFILIATE_ID)

  return (
    <div className="accom-body">
      <div className="accom-tier-grid">
        {race.accumLabels.map(function (label, i) {
          return (
            <button
              key={i}
              className={'accom-tier-btn' + (trip.accumTier === i ? ' active' : '')}
              onClick={function () { onSet('accumTier', i) }}
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
        
          className="accom-cta-btn"
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Find Hotels for This Race Weekend ↗
        </a>
        <div className="accom-cta-note">
          Opens Booking.com pre-filtered for {race.city} · {race.nights} nights · {trip.party} {trip.party === 1 ? 'guest' : 'guests'}
        </div>
      </div>
    </div>
  )
}
