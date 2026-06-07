import { useEffect, useRef } from 'react'
import { fmt } from '../utils/costCalc'

const TWEMOJI_ID = 'twemoji-script'
const TWEMOJI_SRC = 'https://unpkg.com/twemoji@14.0.2/dist/twemoji.min.js'

function loadTwemoji(callback) {
  if (document.getElementById(TWEMOJI_ID)) {
    if (window.twemoji) { callback() }
    else { document.getElementById(TWEMOJI_ID).addEventListener('load', callback) }
    return
  }
  var script = document.createElement('script')
  script.id = TWEMOJI_ID
  script.src = TWEMOJI_SRC
  script.crossOrigin = 'anonymous'
  script.onload = callback
  document.head.appendChild(script)
}

export default function DetailHeader({ race, onClose }) {
  var flagRef = useRef(null)

  useEffect(function() {
    loadTwemoji(function() {
      if (flagRef.current && window.twemoji) {
        window.twemoji.parse(flagRef.current, {
          folder: 'svg',
          ext: '.svg',
          base: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/'
        })
      }
    })
  }, [race.flag])

  return (
    <div className="detail-header">
      <div>
        <div className="detail-flag" ref={flagRef}>{race.flag}</div>
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
