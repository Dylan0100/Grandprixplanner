import { fmt } from '../utils/costCalc'

export default function DetailHeader({ race, onClose }) {
  return (
    <div className="detail-header">
      <div>
        <div className="detail-flag">{race.flag}</div>
        <div className="detail-title">{race.name}</div>
        <div className="detail-sub">
          {race.circuit + ' · ' + race.city + ', ' + race.country}
        </div>
        <div className="detail-meta">
          <div className="detail-meta-item">
            <span className="detail-meta-label">Race Weekend</span>
            <span className="detail-meta-value">{race.dates}</span>
          </div>
          <div className="detail-meta-item">
            <span className="detail-meta-label">Round</span>
            <span className="detail-meta-value">{race.round + ' of 22'}</span>
          </div>
          <div className="detail-meta-item">
            <span className="detail-meta-label">Tickets from</span>
            <span className="detail-meta-value">{fmt(race.tickets[0])}</span>
          </div>
          <div className="detail-meta-item">
            <span className="detail-meta-label">Nearest Airport</span>
            <span className="detail-meta-value">{race.airport.split('—')[0].trim()}</span>
          </div>
        </div>
      </div>
      <button className="close-btn" onClick={onClose}>✕</button>
    </div>
  )
}
