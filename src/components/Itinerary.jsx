import { useState } from 'react'

const ITIN_CSS = `
.itin-wrap {
  font-family: 'Barlow', sans-serif;
  color: var(--text);
}
.itin-body {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.itin-inputs-section {
  padding: 20px 28px;
  border-bottom: 1px solid var(--border);
  background: var(--surface-2);
}
.itin-section-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--text-dim);
  display: block;
  margin-bottom: 12px;
}
.itin-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.itin-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.itin-field-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-dim);
}
.itin-input {
  background: var(--surface-3);
  border: 1px solid var(--border-md);
  border-radius: 7px;
  padding: 10px 12px;
  color: var(--text);
  font-size: 13px;
  font-family: 'Barlow', sans-serif;
  outline: none;
  transition: border-color 0.15s;
  width: 100%;
  box-sizing: border-box;
}
.itin-input:focus { border-color: rgba(232,0,45,0.5); }
.itin-input::placeholder { color: var(--text-dim); }
.itin-meta-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 28px;
  border-bottom: 1px solid var(--border);
  background: var(--surface);
  flex-wrap: wrap;
}
.itin-meta-item {
  font-size: 12px;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 6px;
}
.itin-badge {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 3px 9px;
  border-radius: 4px;
  border: 1px solid transparent;
}
.itin-badge.sprint {
  background: rgba(245,158,11,0.12);
  border-color: rgba(245,158,11,0.3);
  color: var(--amber);
}
.itin-badge.four-day {
  background: rgba(232,0,45,0.1);
  border-color: rgba(232,0,45,0.28);
  color: var(--red);
}
.itin-days-section { padding: 0; }
.itin-days-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--text-dim);
  display: block;
  padding: 14px 28px 10px;
  background: var(--surface);
}
.itin-day-card {
  background: var(--surface-2);
  border-bottom: 1px solid var(--border);
}
.itin-day-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 28px 12px;
  border-bottom: 1px solid var(--border);
  flex-wrap: wrap;
}
.itin-day-name {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 20px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text);
  line-height: 1;
  margin-bottom: 3px;
}
.itin-day-sub {
  font-size: 11px;
  color: var(--text-muted);
  font-family: 'Barlow Condensed', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 700;
}
.itin-sessions {
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: flex-end;
}
.itin-session-pill {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--surface-3);
  border: 1px solid var(--border-md);
  border-radius: 6px;
  padding: 5px 10px;
  white-space: nowrap;
}
.itin-session-time {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  text-transform: uppercase;
}
.itin-session-name {
  font-size: 12px;
  color: var(--text);
  font-weight: 500;
}
.itin-notes-wrap {
  padding: 13px 28px 15px;
}
.itin-notes-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-dim);
  display: block;
  margin-bottom: 7px;
}
.itin-textarea {
  width: 100%;
  background: var(--surface-3);
  border: 1px solid var(--border-md);
  border-radius: 7px;
  padding: 10px 12px;
  color: var(--text);
  font-size: 12px;
  font-family: 'Barlow', sans-serif;
  line-height: 1.6;
  resize: vertical;
  outline: none;
  transition: border-color 0.15s;
  box-sizing: border-box;
  min-height: 72px;
}
.itin-textarea:focus { border-color: rgba(232,0,45,0.5); }
.itin-textarea::placeholder { color: var(--text-dim); }
.itin-disclaimer {
  margin: 0;
  padding: 13px 28px;
  font-size: 12px;
  color: var(--text-dim);
  line-height: 1.6;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  border-top: 1px solid var(--border);
}
.itin-generate-wrap {
  padding: 20px 28px;
  background: var(--surface-2);
}
.itin-generate-btn {
  background: var(--red);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 13px 28px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  cursor: pointer;
  transition: opacity 0.15s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.itin-generate-btn:hover { opacity: 0.88; }
.itin-preview {
  padding: 24px 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.itin-preview-label {
  font-size: 13px;
  color: var(--text-muted);
}
.itin-preview-block {
  background: var(--surface-2);
  border: 1px solid var(--border-md);
  border-radius: 10px;
  padding: 20px 22px;
  font-family: 'Barlow', sans-serif;
  font-size: 12px;
  color: var(--text);
  line-height: 1.8;
  white-space: pre-wrap;
  overflow-x: auto;
  margin: 0;
}
.itin-preview-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.itin-copy-btn {
  background: var(--red);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 11px 22px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.2s, opacity 0.15s;
}
.itin-copy-btn:hover { opacity: 0.88; }
.itin-copy-btn.copied { background: #22C55E; }
.itin-edit-btn {
  background: var(--surface-3);
  color: var(--text);
  border: 1px solid var(--border-md);
  border-radius: 8px;
  padding: 11px 22px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.15s;
}
.itin-edit-btn:hover { background: var(--surface-4); }
@media (max-width: 600px) {
  .itin-fields { grid-template-columns: 1fr; }
  .itin-day-header { flex-direction: column; }
  .itin-sessions { align-items: flex-start; }
  .itin-inputs-section { padding: 16px 18px; }
  .itin-day-header { padding: 12px 18px 10px; }
  .itin-notes-wrap { padding: 11px 18px 13px; }
  .itin-generate-wrap { padding: 16px 18px; }
  .itin-disclaimer { padding: 12px 18px; }
  .itin-days-label { padding: 12px 18px 8px; }
  .itin-meta-row { padding: 10px 18px; }
  .itin-preview { padding: 18px; }
}
`

function getSchedule(race) {
  if (race.nights === 4) {
    return [
      {
        day: 'Thursday', label: 'Practice Day', key: 'thu',
        sessions: [
          { name: 'Free Practice 1', time: '~13:30 local' },
          { name: 'Free Practice 2', time: '~17:00 local' },
        ],
        placeholder: 'Arrive at Nice airport · Check in · Walk the harbour · Collect wristbands from the circuit...',
      },
      {
        day: 'Saturday', label: 'Qualifying Day', key: 'sat',
        sessions: [
          { name: 'Free Practice 3', time: '~12:30 local' },
          { name: 'Qualifying',      time: '~16:00 local' },
        ],
        placeholder: 'Train from Nice to Monaco · Arrive before FP3 · Qualifying here is extraordinary — stay for it all...',
      },
      {
        day: 'Sunday', label: 'Race Day', key: 'sun',
        sessions: [
          { name: 'Grand Prix', time: '~15:00 local' },
        ],
        placeholder: 'Arrive very early — streets fill fast · Post-race celebration on the waterfront is unmissable...',
      },
    ]
  }
  if (race.sprint) {
    return [
      {
        day: 'Friday', label: 'Practice & Sprint Shootout', key: 'fri',
        sessions: [
          { name: 'Free Practice 1',  time: '~13:30 local' },
          { name: 'Sprint Shootout',  time: '~17:30 local' },
        ],
        placeholder: 'Arrive at circuit · Collect tickets and wristbands · FP1 then Sprint Shootout — two sessions back to back...',
      },
      {
        day: 'Saturday', label: 'Sprint Race & Qualifying', key: 'sat',
        sessions: [
          { name: 'Sprint Race', time: '~12:00 local' },
          { name: 'Qualifying',  time: '~16:00 local' },
        ],
        placeholder: 'The biggest day — Sprint Race then Qualifying · Stay in your seat all day · Evening: explore the city...',
      },
      {
        day: 'Sunday', label: 'Race Day', key: 'sun',
        sessions: [
          { name: 'Grand Prix', time: '~14:00 local' },
        ],
        placeholder: 'Race day — arrive early · Gates open 3–4 hours before lights out · Post-race podium ceremony...',
      },
    ]
  }
  return [
    {
      day: 'Friday', label: 'Practice Day', key: 'fri',
      sessions: [
        { name: 'Free Practice 1', time: '~13:30 local' },
        { name: 'Free Practice 2', time: '~17:00 local' },
      ],
      placeholder: 'Arrive at circuit · Explore the fan zone and food areas · Two practice sessions to settle in...',
    },
    {
      day: 'Saturday', label: 'Qualifying Day', key: 'sat',
      sessions: [
        { name: 'Free Practice 3', time: '~12:30 local' },
        { name: 'Qualifying',      time: '~16:00 local' },
      ],
      placeholder: "FP3 warm-up · Grab food before Qualifying starts · Often more exciting than the race — don't leave early...",
    },
    {
      day: 'Sunday', label: 'Race Day', key: 'sun',
      sessions: [
        { name: 'Grand Prix', time: '~14:00 local' },
      ],
      placeholder: 'Race day — arrive early for the full atmosphere · Pre-race grid walk · Post-race podium ceremony...',
    },
  ]
}

function buildText(race, grandstand, accom, notes, schedule) {
  var div = '─'.repeat(42)
  var lines = []
  lines.push('🏁 ' + race.name.toUpperCase() + ' — RACE WEEKEND ITINERARY')
  lines.push(race.circuit + ' · ' + race.city + ', ' + race.country + ' · ' + race.dates)
  if (grandstand) lines.push('Grandstand / Seating: ' + grandstand)
  if (accom)      lines.push('Accommodation: ' + accom)
  lines.push('')
  lines.push(div)
  schedule.forEach(function(dayObj, i) {
    lines.push('')
    lines.push(dayObj.day.toUpperCase() + ' — ' + dayObj.label.toUpperCase())
    dayObj.sessions.forEach(function(s) {
      lines.push('  🕐 ' + s.time + ' · ' + s.name)
    })
    if (notes[i] && notes[i].trim()) {
      lines.push('  📝 Notes: ' + notes[i].trim())
    }
  })
  lines.push('')
  lines.push(div)
  lines.push('Nearest airport: ' + race.airport)
  lines.push('Session times are approximate — confirm exact times on the official F1 app or formula1.com.')
  lines.push('Generated by Grand Prix Planner · grandprixplanner.com')
  return lines.join('\n')
}

export default function Itinerary({ race, onBack }) {
  var schedule = getSchedule(race)
  var [grandstand, setGrandstand] = useState('')
  var [accom, setAccom] = useState('')
  var [notes, setNotes] = useState(function() { return schedule.map(function() { return '' }) })
  var [phase, setPhase] = useState('build')
  var [copied, setCopied] = useState(false)

  var isMonaco = race.nights === 4

  function updateNote(i, val) {
    setNotes(function(prev) {
      var n = prev.slice()
      n[i] = val
      return n
    })
  }

  function handleCopy() {
    var text = buildText(race, grandstand, accom, notes, schedule)
    navigator.clipboard.writeText(text).then(function() {
      setCopied(true)
      setTimeout(function() { setCopied(false) }, 2000)
    })
  }

  return (
    <div className="itin-wrap">
      <style dangerouslySetInnerHTML={{ __html: ITIN_CSS }} />

      {phase === 'build' ? (
        <div className="itin-body">
          <div className="itin-inputs-section">
            <span className="itin-section-label">Your trip details</span>
            <div className="itin-fields">
              <div className="itin-field">
                <label className="itin-field-label">Grandstand / seating area</label>
                <input
                  className="itin-input"
                  type="text"
                  value={grandstand}
                  onChange={function(e) { setGrandstand(e.target.value) }}
                  placeholder={'e.g. ' + (race.ticketLabels ? race.ticketLabels[1] : 'Main Grandstand')}
                />
              </div>
              <div className="itin-field">
                <label className="itin-field-label">Accommodation</label>
                <input
                  className="itin-input"
                  type="text"
                  value={accom}
                  onChange={function(e) { setAccom(e.target.value) }}
                  placeholder={'e.g. ' + (race.accumLabels ? race.accumLabels[1] : 'Hotel near circuit')}
                />
              </div>
            </div>
          </div>

          <div className="itin-meta-row">
            <span className="itin-meta-item">{'✈️ ' + race.airport}</span>
            {race.sprint && <span className="itin-badge sprint">Sprint Weekend</span>}
            {isMonaco && <span className="itin-badge four-day">4-Day Weekend</span>}
          </div>

          <div className="itin-days-section">
            <span className="itin-days-label">Your weekend schedule</span>
            {schedule.map(function(dayObj, i) {
              return (
                <div key={dayObj.key} className="itin-day-card">
                  <div className="itin-day-header">
                    <div>
                      <div className="itin-day-name">{dayObj.day}</div>
                      <div className="itin-day-sub">{dayObj.label}</div>
                    </div>
                    <div className="itin-sessions">
                      {dayObj.sessions.map(function(s) {
                        return (
                          <div key={s.name} className="itin-session-pill">
                            <span className="itin-session-time">{s.time}</span>
                            <span className="itin-session-name">{s.name}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div className="itin-notes-wrap">
                    <label className="itin-notes-label">{'Notes for ' + dayObj.day.toLowerCase()}</label>
                    <textarea
                      className="itin-textarea"
                      value={notes[i]}
                      rows={3}
                      onChange={function(e) { updateNote(i, e.target.value) }}
                      placeholder={dayObj.placeholder}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="itin-disclaimer">
            ℹ️ Session times are approximate local times based on typical F1 scheduling. Confirm exact times on the official F1 app or formula1.com closer to race weekend.
          </div>

          <div className="itin-generate-wrap">
            <button className="itin-generate-btn" onClick={function() { setPhase('preview') }}>
              Generate My Itinerary →
            </button>
          </div>
        </div>
      ) : (
        <div className="itin-preview">
          <div className="itin-preview-label">Your race weekend itinerary — ready to copy and share</div>
          <pre className="itin-preview-block">
            {buildText(race, grandstand, accom, notes, schedule)}
          </pre>
          <div className="itin-preview-actions">
            <button
              className={'itin-copy-btn' + (copied ? ' copied' : '')}
              onClick={handleCopy}
            >
              {copied ? '✓ Copied' : 'Copy to Clipboard'}
            </button>
            <button className="itin-edit-btn" onClick={function() { setPhase('build') }}>
              ← Edit Itinerary
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
