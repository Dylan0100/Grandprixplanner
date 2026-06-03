function CalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ opacity: 0.4, flexShrink: 0 }}>
      <rect x="1" y="1.5" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M1 5h12" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4.5 0v2M9.5 0v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function regionLabel(r) {
  return { europe: 'Europe', americas: 'Americas', asia: 'Asia & Pacific', 'middle-east': 'Middle East' }[r] || r
}

export default function RaceCard({ race, selected, onClick }) {
  return (
    <div
      className={['race-card', race.status, selected ? 'selected' : ''].filter(Boolean).join(' ')}
      onClick={() => onClick(race.round)}
    >
      <div className="race-card-top">
        <span className="race-round">R{race.round}</span>
        <div className="race-badges">
          {race.status === 'next' && <span className="race-badge next">Next</span>}
          {race.sprint && <span className="race-badge sprint">Sprint</span>}
          {race.isNew && <span className="race-badge new-circuit">New</span>}
          {race.status === 'completed' && <span className="race-badge done">Done</span>}
        </div>
      </div>
      <div className="race-flag">{race.flag}</div>
      <div className="race-name">{race.short}</div>
      <div className="race-circuit">{race.circuit}</div>
      <div className="race-date"><CalIcon />{race.dates}</div>
      <div className="race-card-footer">
        <span className="region-tag">{regionLabel(race.region)}</span>
        <span className="plan-btn">{race.status === 'completed' ? 'View' : 'Plan'}<ArrowIcon /></span>
      </div>
    </div>
  )
}
