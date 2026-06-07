import { useEffect, useRef } from 'react'

const TWEMOJI_ID = 'twemoji-script'
const TWEMOJI_SRC = 'https://unpkg.com/twemoji@14.0.2/dist/twemoji.min.js'

function loadTwemoji(callback) {
  if (document.getElementById(TWEMOJI_ID)) {
    if (window.twemoji) { callback() }
    else {
      document.getElementById(TWEMOJI_ID).addEventListener('load', callback)
    }
    return
  }
  var script = document.createElement('script')
  script.id = TWEMOJI_ID
  script.src = TWEMOJI_SRC
  script.crossOrigin = 'anonymous'
  script.onload = callback
  document.head.appendChild(script)
}

const styles = `
  .rc {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 13px 20px;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: var(--surface);
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s;
    position: relative;
    overflow: hidden;
  }
  .rc:hover {
    border-color: var(--border-md);
    background: var(--surface-2);
  }
  .rc-next { border-color: var(--red); }
  .rc-live { border-color: #22c55e; }
  .rc-done {
    opacity: 0.28;
    cursor: default;
    pointer-events: none;
    padding-top: 7px;
    padding-bottom: 7px;
  }
  .rc-done .rc-circuit { display: none; }
  .rc-done .rc-name { font-size: 14px; }
  .rc-accent {
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
  }
  .rc-accent-next { background: var(--red); }
  .rc-accent-live { background: #22c55e; }
  .rc-round {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 10px;
    letter-spacing: 0.08em;
    color: var(--text-dim);
    width: 22px;
    text-align: center;
    flex-shrink: 0;
    text-transform: uppercase;
  }
  .rc-flag {
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0;
  }
  .rc-flag img {
    width: 22px;
    height: 22px;
    display: block;
    object-fit: contain;
  }
  .rc-main {
    flex: 1;
    min-width: 0;
  }
  .rc-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 19px;
    color: var(--text);
    line-height: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .rc-circuit {
    font-family: 'Barlow', sans-serif;
    font-size: 12px;
    color: var(--text-muted);
    margin-top: 1px;
  }
  .rc-badges {
    display: flex;
    align-items: center;
    gap: 5px;
    flex-shrink: 0;
  }
  .rcb {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 2px 7px;
    border-radius: 3px;
    border: 1px solid transparent;
  }
  .rcb-next { background: var(--red); border-color: var(--red); color: #fff; }
  .rcb-live { background: #22c55e; border-color: #22c55e; color: #fff; }
  .rcb-sprint { background: transparent; border-color: #F59E0B; color: #F59E0B; }
  .rcb-new { background: transparent; border-color: #22c55e; color: #22c55e; }
  .rcb-done { background: transparent; border-color: var(--border-md); color: var(--text-dim); }
  .rc-dates {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 12px;
    color: var(--text-muted);
    flex-shrink: 0;
    white-space: nowrap;
    text-align: right;
    min-width: 108px;
  }
  .rc-plan {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 12px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--red);
    flex-shrink: 0;
    min-width: 48px;
    text-align: right;
  }
`

export default function RaceCard({ race, isComplete, isLive, isNext, onSelect }) {
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

  var cardClass = [
    'rc',
    isNext ? 'rc-next' : '',
    isLive ? 'rc-live' : '',
    isComplete ? 'rc-done' : '',
  ].filter(Boolean).join(' ')

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className={cardClass} onClick={onSelect}>

        {isNext && !isLive && <div className="rc-accent rc-accent-next" />}
        {isLive && <div className="rc-accent rc-accent-live" />}

        <div className="rc-round">R{race.round}</div>
        <div className="rc-flag" ref={flagRef}>{race.flag}</div>

        <div className="rc-main">
          <div className="rc-name">{race.name}</div>
          <div className="rc-circuit">{race.circuit}</div>
        </div>

        <div className="rc-badges">
          {isLive && <span className="rcb rcb-live">Live</span>}
          {isNext && !isLive && <span className="rcb rcb-next">Next Race</span>}
          {race.sprint && <span className="rcb rcb-sprint">Sprint</span>}
          {race.isNew && <span className="rcb rcb-new">New</span>}
          {isComplete && <span className="rcb rcb-done">Done</span>}
        </div>

        <div className="rc-dates">{race.dates}</div>

        <div className="rc-plan">{!isComplete ? 'Plan \u2192' : ''}</div>

      </div>
    </>
  )
}
