import { useState } from 'react'
import transportData from './transportData'

const RATING_CFG = {
  best:  { label: 'Best option', color: '#22C55E', bg: 'rgba(34,197,94,0.09)',   border: 'rgba(34,197,94,0.28)'   },
  good:  { label: 'Good option', color: '#F59E0B', bg: 'rgba(245,158,11,0.09)', border: 'rgba(245,158,11,0.28)' },
  avoid: { label: 'Avoid',       color: '#E8002D', bg: 'rgba(232,0,45,0.07)',    border: 'rgba(232,0,45,0.25)'   },
}

const DAYS = [
  { key: 'friday',   label: 'Friday'   },
  { key: 'saturday', label: 'Saturday' },
  { key: 'sunday',   label: 'Sunday'   },
]

const LT_CSS = `
.lt-wrap {
  font-family: 'Barlow', sans-serif;
  color: var(--text);
}
.lt-alert {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 13px 20px;
  background: rgba(232,0,45,0.08);
  border-bottom: 1px solid rgba(232,0,45,0.2);
  font-size: 13px;
  color: #f87171;
  line-height: 1.55;
}
.lt-alert-icon { flex-shrink: 0; font-size: 15px; margin-top: 1px; }
.lt-overview {
  padding: 18px 28px;
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.7;
  border-bottom: 1px solid var(--border);
  background: var(--surface-2);
}
.lt-section-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--text-dim);
  padding: 14px 28px 10px;
  display: block;
  background: var(--surface);
}
.lt-modes {
  display: flex;
  flex-direction: column;
  gap: 0;
  border-bottom: 1px solid var(--border);
}
.lt-mode-card {
  padding: 16px 28px;
  border-bottom: 1px solid var(--border);
  display: flex;
  gap: 16px;
  align-items: flex-start;
  transition: background 0.15s;
}
.lt-mode-card:last-child { border-bottom: none; }
.lt-mode-card.best  { border-left: 3px solid #22C55E; }
.lt-mode-card.good  { border-left: 3px solid var(--amber); }
.lt-mode-card.avoid { border-left: 3px solid var(--red); }
.lt-mode-icon-wrap {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
  border: 1px solid transparent;
}
.lt-mode-card.best  .lt-mode-icon-wrap { background: rgba(34,197,94,0.09);   border-color: rgba(34,197,94,0.2); }
.lt-mode-card.good  .lt-mode-icon-wrap { background: rgba(245,158,11,0.09); border-color: rgba(245,158,11,0.2); }
.lt-mode-card.avoid .lt-mode-icon-wrap { background: rgba(232,0,45,0.07);   border-color: rgba(232,0,45,0.18); }
.lt-mode-body { flex: 1; min-width: 0; }
.lt-mode-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 6px;
  flex-wrap: wrap;
}
.lt-mode-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 15px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text);
}
.lt-rating-badge {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 3px 9px;
  border-radius: 4px;
  flex-shrink: 0;
  border: 1px solid transparent;
}
.lt-mode-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 7px;
  flex-wrap: wrap;
}
.lt-mode-meta-item {
  font-size: 12px;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 5px;
}
.lt-mode-notes {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.6;
}
.lt-day-section {
  border-bottom: 1px solid var(--border);
}
.lt-day-tabs {
  display: flex;
  gap: 1px;
  background: var(--border);
  border-bottom: 1px solid var(--border);
  padding: 0 28px;
}
.lt-day-tab {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 10px 18px;
  background: var(--surface-2);
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.15s;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
}
.lt-day-tab:hover { color: var(--text); background: var(--surface-3); }
.lt-day-tab.active {
  color: var(--text);
  background: var(--surface);
  border-bottom-color: var(--red);
}
.lt-day-content {
  padding: 16px 28px 18px;
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.7;
  background: var(--surface);
}
.lt-tips-section { padding-bottom: 4px; }
.lt-tips-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0 28px 20px;
}
.lt-tip {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 11px 14px;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 8px;
}
.lt-tip-bullet {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--red);
  flex-shrink: 0;
  margin-top: 5px;
}
.lt-tip-text {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.6;
}
.lt-no-data {
  padding: 48px 28px;
  text-align: center;
  color: var(--text-muted);
  font-size: 14px;
}
@media (max-width: 640px) {
  .lt-mode-card { padding: 14px 18px; }
  .lt-section-label { padding: 12px 18px 8px; }
  .lt-day-tabs { padding: 0 18px; }
  .lt-day-content { padding: 14px 18px; }
  .lt-tips-list { padding: 0 18px 16px; }
  .lt-overview { padding: 14px 18px; }
  .lt-alert { padding: 12px 18px; }
}
`

export default function LocalTransport({ race, onBack }) {
  var [activeDay, setActiveDay] = useState('sunday')
  var data = transportData[race.name]

  if (!data) {
    return (
      <div className="lt-wrap">
        <style dangerouslySetInnerHTML={{ __html: LT_CSS }} />
        <div className="lt-no-data">
          <p>Transport information for this race is coming soon.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="lt-wrap">
      <style dangerouslySetInnerHTML={{ __html: LT_CSS }} />

      {data.alert && (
        <div className="lt-alert">
          <span className="lt-alert-icon">⚠️</span>
          <span>{data.alert}</span>
        </div>
      )}

      <div className="lt-overview">{data.overview}</div>

      <span className="lt-section-label">Getting there</span>
      <div className="lt-modes">
        {data.modes.map(function(mode, i) {
          var cfg = RATING_CFG[mode.rating] || RATING_CFG.good
          return (
            <div key={i} className={'lt-mode-card ' + mode.rating}>
              <div className="lt-mode-icon-wrap">{mode.icon}</div>
              <div className="lt-mode-body">
                <div className="lt-mode-top">
                  <span className="lt-mode-name">{mode.name}</span>
                  <span
                    className="lt-rating-badge"
                    style={{ background: cfg.bg, color: cfg.color, borderColor: cfg.border }}
                  >
                    {cfg.label}
                  </span>
                </div>
                <div className="lt-mode-meta">
                  <span className="lt-mode-meta-item">💰 {mode.cost}</span>
                  <span className="lt-mode-meta-item">⏱ {mode.time}</span>
                </div>
                <div className="lt-mode-notes">{mode.notes}</div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="lt-day-section">
        <span className="lt-section-label">Day by day</span>
        <div className="lt-day-tabs">
          {DAYS.map(function(d) {
            return (
              <button
                key={d.key}
                className={'lt-day-tab' + (activeDay === d.key ? ' active' : '')}
                onClick={function() { setActiveDay(d.key) }}
              >
                {d.label}
              </button>
            )
          })}
        </div>
        <div className="lt-day-content">{data.byDay[activeDay]}</div>
      </div>

      <div className="lt-tips-section">
        <span className="lt-section-label">Tips &amp; quirks</span>
        <div className="lt-tips-list">
          {data.tips.map(function(tip, i) {
            return (
              <div key={i} className="lt-tip">
                <div className="lt-tip-bullet" />
                <span className="lt-tip-text">{tip}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
