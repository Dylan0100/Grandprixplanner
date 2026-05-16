import { useState } from 'react'

const BackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ITIN_CSS = `
.itin-topbar{display:flex;justify-content:space-between;align-items:flex-start;padding:20px 24px 16px;border-bottom:1px solid var(--surface-3);}
.itin-body{padding:24px;display:flex;flex-direction:column;gap:20px;}
.itin-section-title{font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--text-muted);}
.itin-fields{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
@media(max-width:600px){.itin-fields{grid-template-columns:1fr;}}
.itin-field{display:flex;flex-direction:column;gap:6px;}
.itin-label{font-size:12px;color:var(--text-muted);font-family:'Barlow Condensed',sans-serif;text-transform:uppercase;letter-spacing:.06em;}
.itin-input{background:var(--surface-3);border:1px solid var(--surface-3);border-radius:8px;padding:10px 12px;color:var(--text);font-size:14px;font-family:'Barlow',sans-serif;outline:none;transition:border-color .15s;width:100%;box-sizing:border-box;}
.itin-input:focus{border-color:var(--red);}
.itin-input::placeholder{color:var(--text-dim);}
.itin-ctx{background:var(--surface-3);border-radius:8px;padding:10px 14px;font-size:13px;color:var(--text-muted);display:flex;align-items:center;gap:12px;flex-wrap:wrap;}
.itin-sprint-badge,.itin-monaco-badge{border-radius:4px;padding:2px 8px;font-size:11px;font-family:'Barlow Condensed',sans-serif;font-weight:600;letter-spacing:.06em;text-transform:uppercase;}
.itin-sprint-badge{background:rgba(245,158,11,.15);color:var(--amber);border:1px solid rgba(245,158,11,.3);}
.itin-monaco-badge{background:rgba(232,0,45,.1);color:var(--red);border:1px solid rgba(232,0,45,.25);}
.itin-day-card{background:var(--surface-2);border:1px solid var(--surface-3);border-radius:10px;overflow:hidden;margin-bottom:12px;}
.itin-day-card:last-child{margin-bottom:0;}
.itin-day-header{padding:16px 18px 12px;display:flex;justify-content:space-between;align-items:flex-start;gap:16px;border-bottom:1px solid var(--surface-3);flex-wrap:wrap;}
.itin-day-name{font-family:'Barlow Condensed',sans-serif;font-size:18px;font-weight:700;color:var(--text);text-transform:uppercase;letter-spacing:.04em;}
.itin-day-sublabel{font-size:12px;color:var(--text-muted);margin-top:2px;}
.itin-sessions{display:flex;flex-direction:column;gap:6px;align-items:flex-end;}
@media(max-width:600px){.itin-sessions{align-items:flex-start;}}
.itin-pill{background:var(--surface-3);border-radius:6px;padding:5px 10px;display:flex;align-items:center;gap:8px;}
.itin-pill-time{font-size:11px;color:var(--text-muted);font-family:'Barlow Condensed',sans-serif;}
.itin-pill-name{font-size:12px;color:var(--text);font-weight:500;}
.itin-notes-wrap{padding:14px 18px;}
.itin-notes-lbl{font-size:11px;color:var(--text-dim);font-family:'Barlow Condensed',sans-serif;text-transform:uppercase;letter-spacing:.06em;display:block;margin-bottom:8px;}
.itin-textarea{width:100%;background:var(--surface-3);border:1px solid transparent;border-radius:7px;padding:10px 12px;color:var(--text);font-size:13px;font-family:'Barlow',sans-serif;line-height:1.5;resize:vertical;outline:none;transition:border-color .15s;box-sizing:border-box;}
.itin-textarea:focus{border-color:var(--red);}
.itin-textarea::placeholder{color:var(--text-dim);}
.itin-disclaimer{font-size:12px;color:var(--text-dim);background:var(--surface-2);border:1px solid var(--surface-3);border-radius:8px;padding:10px 14px;line-height:1.5;}
.itin-gen-btn{background:var(--red);color:#fff;border:none;border-radius:8px;padding:14px 28px;font-family:'Barlow Condensed',sans-serif;font-size:15px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;transition:opacity .15s;align-self:flex-start;}
.itin-gen-btn:hover{opacity:.88;}
.itin-preview{padding:24px;display:flex;flex-direction:column;gap:16px;}
.itin-preview-lbl{font-size:13px;color:var(--text-muted);}
.itin-preview-block{background:var(--surface-2);border:1px solid var(--surface-3);border-radius:10px;padding:20px 22px;font-family:'Barlow',sans-serif;font-size:13px;color:var(--text);line-height:1.7;white-space:pre-wrap;overflow-x:auto;margin:0;}
.itin-actions{display:flex;gap:12px;flex-wrap:wrap;}
.itin-copy-btn{background:var(--red);color:#fff;border:none;border-radius:8px;padding:12px 24px;font-family:'Barlow Condensed',sans-serif;font-size:14px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;transition:background .2s,opacity .15s;}
.itin-copy-btn:hover{opacity:.88;}
.itin-copy-btn.copied{background:#22C55E;}
.itin-edit-btn{background:var(--surface-3);color:var(--text);border:1px solid var(--surface-3);border-radius:8px;padding:12px 24px;font-family:'Barlow Condensed',sans-serif;font-size:14px;font-weight:600;letter-spacing:.04em;cursor:pointer;transition:background .15s;}
.itin-edit-btn:hover{background:var(--surface-2);}
`

function getSchedule(race) {
  if (race.nights === 4) {
    return [
      {day:'Thursday',label:'Practice Day',key:'thu',
        sessions:[{name:'Free Practice 1',time:'~13:30 local'},{name:'Free Practice 2',time:'~17:00 local'}],
        placeholder:'Arrive at Nice airport · Check in · Walk the harbour · Collect wristbands from the circuit...'},
      {day:'Saturday',label:'Qualifying Day',key:'sat',
        sessions:[{name:'Free Practice 3',time:'~12:30 local'},{name:'Qualifying',time:'~16:00 local'}],
        placeholder:'Train from Nice to Monaco · Arrive before FP3 · Qualifying here is extraordinary — stay for it all...'},
      {day:'Sunday',label:'Race Day',key:'sun',
        sessions:[{name:'Grand Prix',time:'~15:00 local'}],
        placeholder:'Arrive very early — streets fill fast · Post-race celebration on the waterfront is unmissable...'}
    ]
  }
  if (race.sprint) {
    return [
      {day:'Friday',label:'Practice & Sprint Shootout',key:'fri',
        sessions:[{name:'Free Practice 1',time:'~13:30 local'},{name:'Sprint Shootout',time:'~17:30 local'}],
        placeholder:'Arrive at circuit · Collect tickets and wristbands · FP1 then Sprint Shootout — two sessions back to back...'},
      {day:'Saturday',label:'Sprint Race & Qualifying',key:'sat',
        sessions:[{name:'Sprint Race',time:'~12:00 local'},{name:'Qualifying',time:'~16:00 local'}],
        placeholder:'The biggest day — Sprint Race then Qualifying · Stay in your seat all day · Evening: explore the city...'},
      {day:'Sunday',label:'Race Day',key:'sun',
        sessions:[{name:'Grand Prix',time:'~14:00 local'}],
        placeholder:'Race day — arrive early · Gates open 3–4 hours before lights out · Post-race podium ceremony...'}
    ]
  }
  return [
    {day:'Friday',label:'Practice Day',key:'fri',
      sessions:[{name:'Free Practice 1',time:'~13:30 local'},{name:'Free Practice 2',time:'~17:00 local'}],
      placeholder:'Arrive at circuit · Explore the fan zone and food areas · Two practice sessions to settle in...'},
    {day:'Saturday',label:'Qualifying Day',key:'sat',
      sessions:[{name:'Free Practice 3',time:'~12:30 local'},{name:'Qualifying',time:'~16:00 local'}],
      placeholder:"FP3 warm-up · Grab food before Qualifying starts · Often more exciting than the race — don't leave early..."},
    {day:'Sunday',label:'Race Day',key:'sun',
      sessions:[{name:'Grand Prix',time:'~14:00 local'}],
      placeholder:'Race day — arrive early for the full atmosphere · Pre-race grid walk · Post-race podium ceremony...'}
  ]
}

function buildText(race, grandstand, accom, notes, schedule) {
  const div = '\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500'
  const lines = []
  lines.push('\uD83C\uDFC1 ' + race.name.toUpperCase() + ' \u2014 RACE WEEKEND ITINERARY')
  lines.push(race.circuit + ' \u00B7 ' + race.city + ', ' + race.country + ' \u00B7 ' + race.dates)
  if (grandstand) lines.push('Grandstand / Seating: ' + grandstand)
  if (accom) lines.push('Accommodation: ' + accom)
  lines.push('')
  lines.push(div)
  schedule.forEach((dayObj, i) => {
    lines.push('')
    lines.push(dayObj.day.toUpperCase() + ' \u2014 ' + dayObj.label.toUpperCase())
    dayObj.sessions.forEach(s => lines.push('  \uD83D\uDD50 ' + s.time + ' \u00B7 ' + s.name))
    if (notes[i] && notes[i].trim()) lines.push('  \uD83D\uDCDD Notes: ' + notes[i].trim())
  })
  lines.push('')
  lines.push(div)
  lines.push('Nearest airport: ' + race.airport)
  lines.push('Session times are approximate \u2014 confirm exact times on the official F1 app or formula1.com.')
  lines.push('Generated by Grand Prix Planner \u00B7 grandprixplanner.com')
  return lines.join('\n')
}

export default function Itinerary({ race, onBack }) {
  const schedule = getSchedule(race)
  const [grandstand, setGrandstand] = useState('')
  const [accom, setAccom] = useState('')
  const [notes, setNotes] = useState(() => schedule.map(() => ''))
  const [phase, setPhase] = useState('build')
  const [copied, setCopied] = useState(false)

  const updateNote = (i, val) => setNotes(prev => { const n = [...prev]; n[i] = val; return n })

  const handleCopy = () => {
    const text = buildText(race, grandstand, accom, notes, schedule)
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const isMonaco = race.nights === 4

  return (
    <div>
      <style dangerouslySetInnerHTML={{__html: ITIN_CSS}} />
      <div className="itin-topbar">
        <button className="est-back" onClick={onBack}><BackIcon /> Back to options</button>
        <div style={{textAlign:'right'}}>
          <div className="est-title">Build Itinerary</div>
          <div className="est-subtitle">{race.flag + ' ' + race.name}</div>
        </div>
      </div>

      {phase === 'build' ? (
        <div className="itin-body">
          <div>
            <div className="itin-section-title" style={{marginBottom:'12px'}}>Your Trip Details</div>
            <div className="itin-fields">
              <div className="itin-field">
                <label className="itin-label">Grandstand / seating area</label>
                <input className="itin-input" type="text" value={grandstand}
                  onChange={e => setGrandstand(e.target.value)}
                  placeholder={'e.g. ' + (race.ticketLabels[1] || 'Main Grandstand')} />
              </div>
              <div className="itin-field">
                <label className="itin-label">Accommodation</label>
                <input className="itin-input" type="text" value={accom}
                  onChange={e => setAccom(e.target.value)}
                  placeholder={'e.g. ' + (race.accumLabels[1] || 'Hotel near circuit')} />
              </div>
            </div>
          </div>

          <div className="itin-ctx">
            <span>{'✈️ ' + race.airport}</span>
            {race.sprint && <span className="itin-sprint-badge">Sprint Weekend</span>}
            {isMonaco && <span className="itin-monaco-badge">4-Day Weekend</span>}
          </div>

          <div>
            <div className="itin-section-title" style={{marginBottom:'12px'}}>Your Weekend Schedule</div>
            {schedule.map((dayObj, i) => (
              <div key={dayObj.key} className="itin-day-card">
                <div className="itin-day-header">
                  <div>
                    <div className="itin-day-name">{dayObj.day}</div>
                    <div className="itin-day-sublabel">{dayObj.label}</div>
                  </div>
                  <div className="itin-sessions">
                    {dayObj.sessions.map(s => (
                      <div key={s.name} className="itin-pill">
                        <span className="itin-pill-time">{s.time}</span>
                        <span className="itin-pill-name">{s.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="itin-notes-wrap">
                  <label className="itin-notes-lbl">{'Your notes for ' + dayObj.day.toLowerCase()}</label>
                  <textarea className="itin-textarea" value={notes[i]} rows={3}
                    onChange={e => updateNote(i, e.target.value)}
                    placeholder={dayObj.placeholder} />
                </div>
              </div>
            ))}
          </div>

          <div className="itin-disclaimer">
            ℹ️ Session times are approximate local times based on typical F1 scheduling. Confirm exact times on the official F1 app or formula1.com closer to race weekend.
          </div>

          <button className="itin-gen-btn" onClick={() => setPhase('preview')}>
            Generate My Itinerary →
          </button>
        </div>
      ) : (
        <div className="itin-preview">
          <div className="itin-preview-lbl">Your race weekend itinerary — ready to copy and share</div>
          <pre className="itin-preview-block">{buildText(race, grandstand, accom, notes, schedule)}</pre>
          <div className="itin-actions">
            <button className={'itin-copy-btn' + (copied ? ' copied' : '')} onClick={handleCopy}>
              {copied ? 'Copied ✓' : 'Copy to Clipboard'}
            </button>
            <button className="itin-edit-btn" onClick={() => setPhase('build')}>
              ← Edit Itinerary
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
