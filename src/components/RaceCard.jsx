import { useState, useEffect } from 'react'

const cardStyles = `
  .rc-card {
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 16px 24px;
    border-radius: 10px;
    border: 1px solid var(--border);
    background: var(--surface);
    cursor: pointer;
    transition: all 0.15s ease;
    position: relative;
    overflow: hidden;
  }
  .rc-card:hover { border-color: var(--border-md); background: var(--surface-2); }
  .rc-card.is-next {
    border-color: var(--red);
    background: var(--surface-2);
    box-shadow: 0 0 0 1px var(--red) inset;
  }
  .rc-card.is-live {
    border-color: #22c55e;
    background: var(--surface-2);
    box-shadow: 0 0 0 1px #22c55e inset;
  }
  .rc-card.is-done {
    opacity: 0.42;
    cursor: default;
    background: var(--surface);
  }
  .rc-card.is-done:hover { border-color: var(--border); background: var(--surface); }
  .rc-round {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-dim);
    width: 28px;
    flex-shrink: 0;
    text-align: center;
  }
  .rc-flag {
    font-size: 26px;
    flex-shrink: 0;
    width: 36px;
    text-align: center;
  }
  .rc-main { flex: 1; min-width: 0; }
  .rc-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px;
    color: var(--text);
    line-height: 1;
    margin-bottom: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .rc-circuit {
    font-family: 'Barlow', sans-serif;
    font-size: 13px;
    color: var(--text-muted);
  }
  .rc-dates {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 13px;
    color: var(--text-muted);
    text-align: right;
    flex-shrink: 0;
    white-space: nowrap;
  }
  .rc-badges { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
  .rc-badge {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 3px 8px;
    border-radius: 4px;
  }
  .badge-next { background: var(--red); color: #fff; }
  .badge-live { background: #22c55e; color: #fff; }
  .badge-sprint { background: var(--amber); color: var(--black); }
  .badge-done {
    background: transparent;
    border: 1px solid var(--border);
    color: var(--text-dim);
  }
  .rc-action {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 12px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--red);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 4px;
    min-width: 52px;
    justify-content: flex-end;
  }
  .rc-card.is-done .rc-action { display: none; }
  .rc-left-bar {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
  }
  .rc-left-bar.next { background: var(--red); }
  .rc-left-bar.live { background: #22c55e; }
`

const FLAG_MAP = {
  australia: '🇦🇺', china: '🇨🇳', japan: '🇯🇵', miami: '🇺🇸',
  canada: '🇨🇦', monaco: '🇲🇨', spain: '🇪🇸', austria: '🇦🇹',
  britain: '🇬🇧', belgium: '🇧🇪', hungary: '🇭🇺', netherlands: '🇳🇱',
  italy: '🇮🇹', madrid: '🇪🇸', azerbaijan: '🇦🇿', singapore: '🇸🇬',
  usa: '🇺🇸', mexico: '🇲🇽', brazil: '🇧🇷', lasvegas: '🇺🇸',
  qatar: '🇶🇦', abudhabi: '🇦🇪',
}

export default function RaceCard({ race, isNext, isLive, onSelect }) {
  const [styleInjected, setStyleInjected] = useState(false)

  useEffect(() => { setStyleInjected(true) }, [])

  const raceDate = new Date(race.raceDate)
  const isPast = raceDate < new Date() && !isNext && !isLive

  const cardClass = [
    'rc-card',
    isNext ? 'is-next' : '',
    isLive ? 'is-live' : '',
    isPast ? 'is-done' : '',
  ].filter(Boolean).join(' ')

  const flag = FLAG_MAP[race.id] || '🏁'

  const handleClick = () => {
    if (!isPast) onSelect()
  }

  return (
    <>
      {styleInjected && (
        <style dangerouslySetInnerHTML={{ __html: cardStyles }} />
      )}
      <div className={cardClass} onClick={handleClick}>
        {isNext && <div className="rc-left-bar next" />}
        {isLive && <div className="rc-left-bar live" />}

        <div className="rc-round">R{race.round}</div>
        <div className="rc-flag">{flag}</div>

        <div className="rc-main">
          <div className="rc-name">{race.name}</div>
          <div className="rc-circuit">{race.circuit}</div>
        </div>

        <div className="rc-dates">{race.dates}</div>

        <div className="rc-badges">
          {isLive && <span className="rc-badge badge-live">Live</span>}
          {isNext && !isLive && <span className="rc-badge badge-next">Next Race</span>}
          {race.sprint && <span className="rc-badge badge-sprint">Sprint</span>}
          {isPast && <span className="rc-badge badge-done">Done</span>}
        </div>

        <div className="rc-action">
          {!isPast && (
            <>Plan <span>→</span></>
          )}
        </div>
      </div>
    </>
  )
}
