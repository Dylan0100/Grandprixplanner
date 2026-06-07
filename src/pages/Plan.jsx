import { useState, useEffect } from 'react'
import { races } from '../data/racesData'
import RaceCard from '../components/RaceCard'
import DetailHeader from '../components/DetailHeader'
import TripInputs from '../components/TripInputs'
import SectionNav from '../components/SectionNav'
import CostPanel from '../components/CostPanel'
import GrandstandPicker from '../components/GrandstandPicker'
import Accommodation from '../components/Accommodation'
import FlightGuide from '../components/FlightGuide'
import LocalTransport from '../components/LocalTransport'
import Itinerary from '../components/Itinerary'
import VisaChecker from '../components/VisaChecker'
import { calcCost } from '../utils/costCalc'

const SESSIONS = [
  { round:1,  fp1:'2026-03-06T01:30Z', raceEnd:'2026-03-08T08:00Z' },
  { round:2,  fp1:'2026-03-13T03:30Z', raceEnd:'2026-03-15T10:00Z' },
  { round:3,  fp1:'2026-03-27T02:30Z', raceEnd:'2026-03-29T08:00Z' },
  { round:4,  fp1:'2026-05-01T17:30Z', raceEnd:'2026-05-03T23:00Z' },
  { round:5,  fp1:'2026-05-22T17:30Z', raceEnd:'2026-05-24T23:00Z' },
  { round:6,  fp1:'2026-06-05T12:30Z', raceEnd:'2026-06-07T17:00Z' },
  { round:7,  fp1:'2026-06-12T12:30Z', raceEnd:'2026-06-14T17:00Z' },
  { round:8,  fp1:'2026-06-26T12:30Z', raceEnd:'2026-06-28T17:00Z' },
  { round:9,  fp1:'2026-07-03T12:30Z', raceEnd:'2026-07-05T18:00Z' },
  { round:10, fp1:'2026-07-17T12:30Z', raceEnd:'2026-07-19T17:00Z' },
  { round:11, fp1:'2026-07-24T12:30Z', raceEnd:'2026-07-26T17:00Z' },
  { round:12, fp1:'2026-08-21T11:30Z', raceEnd:'2026-08-23T17:00Z' },
  { round:13, fp1:'2026-09-04T11:30Z', raceEnd:'2026-09-06T17:00Z' },
  { round:14, fp1:'2026-09-11T12:30Z', raceEnd:'2026-09-13T17:00Z' },
  { round:15, fp1:'2026-09-24T09:30Z', raceEnd:'2026-09-26T15:00Z' },
  { round:16, fp1:'2026-10-09T09:30Z', raceEnd:'2026-10-11T16:00Z' },
  { round:17, fp1:'2026-10-23T18:30Z', raceEnd:'2026-10-25T23:00Z' },
  { round:18, fp1:'2026-10-30T18:30Z', raceEnd:'2026-11-01T23:00Z' },
  { round:19, fp1:'2026-11-06T15:30Z', raceEnd:'2026-11-08T20:00Z' },
  { round:20, fp1:'2026-11-20T00:30Z', raceEnd:'2026-11-22T07:00Z' },
  { round:21, fp1:'2026-11-27T13:30Z', raceEnd:'2026-11-29T19:00Z' },
  { round:22, fp1:'2026-12-04T09:30Z', raceEnd:'2026-12-06T16:00Z' },
]

const TAGLINES = [
  'From first-timers to seasoned fans — everything you need to get to the grid.',
  'Pick a race. Build your weekend. Show up ready.',
  'Grandstand guides, cost estimates, flights and more — all in one place.',
  'The only tool built around the full F1 weekend experience.',
  'Plan the trip. Then live the weekend.',
]

function getSeasonStatus() {
  const now = new Date()
  for (var i = 0; i < SESSIONS.length; i++) {
    var fp1 = new Date(SESSIONS[i].fp1)
    var raceEnd = new Date(SESSIONS[i].raceEnd)
    if (now >= fp1 && now <= raceEnd) return { type: 'live', session: SESSIONS[i] }
    if (now < fp1) return { type: 'next', session: SESSIONS[i] }
  }
  return { type: 'finished', session: null }
}

function isRaceComplete(round) {
  var now = new Date()
  var session = SESSIONS.find(function(s) { return s.round === round })
  if (!session) return false
  return now > new Date(session.raceEnd)
}

function isRaceLive(round) {
  var now = new Date()
  var session = SESSIONS.find(function(s) { return s.round === round })
  if (!session) return false
  return now >= new Date(session.fp1) && now <= new Date(session.raceEnd)
}

function formatCountdown(target) {
  var diff = new Date(target) - new Date()
  if (diff <= 0) return null
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    mins: Math.floor((diff % 3600000) / 60000),
    secs: Math.floor((diff % 60000) / 1000),
  }
}

function pad(n) { return String(n).padStart(2, '0') }

const styles = `
  .gp-page { min-height:100vh; background:var(--black); }
  .gp-hero { background:var(--surface); border-bottom:1px solid var(--border-md); }
  .hero-inner { max-width:1200px; margin:0 auto; padding:28px 40px 0; }
  .hero-top { display:flex; align-items:flex-start; gap:40px; }
  .hero-left { flex:1; }
  .hero-eyebrow { display:flex; align-items:center; gap:8px; font-family:'Barlow Condensed',sans-serif; font-weight:700; font-size:11px; letter-spacing:0.12em; color:var(--text-muted); text-transform:uppercase; margin-bottom:10px; }
  .eyebrow-dot { width:6px; height:6px; border-radius:50%; background:var(--red); flex-shrink:0; }
  .hero-title { font-family:'Bebas Neue',sans-serif; font-size:56px; line-height:0.92; color:var(--text); margin:0 0 10px; }
  .hero-title-red { color:var(--red); display:block; }
  .hero-sub { font-size:14px; color:var(--text-muted); margin:0 0 18px; line-height:1.5; max-width:400px; }
  .hero-pills { display:flex; gap:7px; flex-wrap:wrap; }
  .hero-pill { font-family:'Barlow Condensed',sans-serif; font-weight:700; font-size:11px; letter-spacing:0.07em; text-transform:uppercase; padding:4px 10px; border-radius:4px; background:rgba(100,120,255,0.07); border:1px solid var(--border-md); color:var(--text-muted); }
  .hero-pill-hot { background:rgba(232,0,45,0.1); border-color:rgba(232,0,45,0.25); color:var(--red); }
  .hero-right { flex-shrink:0; width:276px; }
  .cd-card { background:var(--surface-2); border:1px solid var(--border-md); border-radius:10px; padding:20px; }
  .cd-label { font-family:'Barlow Condensed',sans-serif; font-weight:700; font-size:10px; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.1em; margin-bottom:4px; }
  .cd-race-name { font-family:'Bebas Neue',sans-serif; font-size:22px; color:var(--text); line-height:1; margin-bottom:2px; }
  .cd-race-dates { font-size:12px; color:var(--text-muted); margin-bottom:14px; font-family:'Barlow',sans-serif; }
  .cd-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:6px; margin-bottom:14px; }
  .cd-cell { background:var(--surface-3); border-radius:6px; padding:8px 4px; text-align:center; }
  .cd-num { font-family:'Bebas Neue',sans-serif; font-size:26px; color:var(--text); line-height:1; }
  .cd-unit { font-family:'Barlow Condensed',sans-serif; font-size:9px; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.08em; }
  .cd-btn { width:100%; background:var(--red); color:#fff; font-family:'Barlow Condensed',sans-serif; font-weight:700; font-size:12px; letter-spacing:0.08em; text-transform:uppercase; border:none; border-radius:6px; padding:10px; cursor:pointer; }
  .cd-btn:hover { background:var(--red-dark); }
  .cd-live-badge { display:inline-flex; align-items:center; gap:6px; background:rgba(34,197,94,0.12); border:1px solid rgba(34,197,94,0.3); border-radius:4px; padding:4px 10px; margin-bottom:10px; font-family:'Barlow Condensed',sans-serif; font-weight:700; font-size:11px; letter-spacing:0.1em; color:#22c55e; text-transform:uppercase; }
  .live-dot { width:6px; height:6px; border-radius:50%; background:#22c55e; animation:livepulse 1s infinite; }
  @keyframes livepulse { 0%,100%{opacity:1} 50%{opacity:0.2} }
  .hero-ticker { border-top:1px solid var(--border); margin-top:22px; padding:11px 0; display:flex; gap:26px; overflow:hidden; max-width:100%; }
  .ticker-item { font-family:'Barlow Condensed',sans-serif; font-weight:700; font-size:11px; color:var(--text-dim); text-transform:uppercase; letter-spacing:0.08em; white-space:nowrap; flex-shrink:0; }
  .ticker-item span { color:var(--text-muted); margin-left:4px; }
  .ticker-item-live { color:var(--red); }
  .ticker-item-live span { color:var(--red); }
  .hero-filters { max-width:1200px; margin:0 auto; padding:14px 40px; display:flex; align-items:center; gap:7px; flex-wrap:wrap; }
  .filter-lbl { font-family:'Barlow Condensed',sans-serif; font-weight:700; font-size:10px; color:var(--text-dim); text-transform:uppercase; letter-spacing:0.1em; margin-right:4px; }
  .fchip { font-family:'Barlow Condensed',sans-serif; font-weight:700; font-size:11px; letter-spacing:0.06em; text-transform:uppercase; padding:5px 12px; border-radius:20px; border:1px solid var(--border-md); background:transparent; color:var(--text-muted); cursor:pointer; transition:all 0.15s; }
  .fchip:hover { color:var(--text); border-color:rgba(100,120,255,0.3); }
  .fchip-active { background:var(--red); border-color:var(--red); color:#fff; }
  .calendar-list { max-width:1200px; margin:0 auto; padding:16px 40px 60px; display:flex; flex-direction:column; gap:5px; }
  .overlay-back { position:fixed; inset:0; background:rgba(0,0,0,0.75); z-index:200; overflow-y:auto; padding:20px; box-sizing:border-box; }
  .overlay-box { background:var(--surface); border-radius:16px; width:100%; max-width:1300px; margin:0 auto; display:flex; min-height:calc(100vh - 40px); }
  .overlay-main { flex:1; padding:32px 40px; overflow-y:auto; }
  .overlay-side { width:360px; flex-shrink:0; border-left:1px solid var(--border); }
`

export default function Plan() {
  const [selectedRace, setSelectedRace] = useState(null)
  const [filter, setFilter] = useState('all')
  const [selectedGrandstand, setSelectedGrandstand] = useState(null)
  const [countdown, setCountdown] = useState(null)
  const [taglineIdx, setTaglineIdx] = useState(0)
  const [seasonStatus, setSeasonStatus] = useState(null)
  const [nextRace, setNextRace] = useState(null)

  const [trip, setTrip] = useState({
    departureCity: null,
    passport: null,
    party: 2,
    ticketTier: 1,
    accumTier: 1,
    incFlights: true,
    incTickets: true,
    incAccom: true,
  })

  function handleSet(key, val) {
    setTrip(function(prev) {
      var next = Object.assign({}, prev)
      next[key] = val
      return next
    })
  }

  var costData = selectedRace ? calcCost(selectedRace, trip) : null

  useEffect(function() {
    var status = getSeasonStatus()
    setSeasonStatus(status)
    if (status.session) {
      var matched = races.find(function(r) { return r.round === status.session.round })
      setNextRace(matched || null)
    }
  }, [])

  useEffect(function() {
    if (!seasonStatus || seasonStatus.type === 'finished' || !seasonStatus.session) return
    var target = seasonStatus.type === 'live' ? seasonStatus.session.raceEnd : seasonStatus.session.fp1
    var tick = function() {
      setCountdown(formatCountdown(target))
      var newStatus = getSeasonStatus()
      if (newStatus.type !== seasonStatus.type || (newStatus.session && seasonStatus.session && newStatus.session.round !== seasonStatus.session.round)) {
        setSeasonStatus(newStatus)
        if (newStatus.session) {
          var matched = races.find(function(r) { return r.round === newStatus.session.round })
          setNextRace(matched || null)
        }
      }
    }
    tick()
    var interval = setInterval(tick, 1000)
    return function() { clearInterval(interval) }
  }, [seasonStatus])

  useEffect(function() {
    var interval = setInterval(function() {
      setTaglineIdx(function(i) { return (i + 1) % TAGLINES.length })
    }, 4000)
    return function() { clearInterval(interval) }
  }, [])

  useEffect(function() {
    if (selectedRace) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return function() { document.body.style.overflow = '' }
  }, [selectedRace])

  var filters = [
    { key:'all', label:'All 22 Races' },
    { key:'europe', label:'Europe' },
    { key:'americas', label:'Americas' },
    { key:'asia', label:'Asia & Pacific' },
    { key:'middleeast', label:'Middle East' },
    { key:'sprint', label:'Sprint Weekends' },
    { key:'upcoming', label:'Upcoming Only' },
  ]

  var filteredRaces = races.filter(function(r) {
    if (filter === 'europe') return r.region === 'europe'
    if (filter === 'americas') return r.region === 'americas'
    if (filter === 'asia') return r.region === 'asia'
    if (filter === 'middleeast') return r.region === 'middle-east'
    if (filter === 'sprint') return r.sprint === true
    if (filter === 'upcoming') return !isRaceComplete(r.round)
    return true
  })

  function handleSelectRace(race) {
    if (isRaceComplete(race.round)) return
    setSelectedRace(race)
    setSelectedGrandstand(null)
    setTrip(function(prev) {
      return Object.assign({}, prev, {
        ticketTier: 1,
        accumTier: 1,
        incFlights: true,
        incTickets: true,
        incAccom: true,
      })
    })
  }

  function handleClose() {
    setSelectedRace(null)
    setSelectedGrandstand(null)
  }

  var tickerRaces = races.slice(0, 9)

  return (
    <div className="gp-page">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="gp-hero">
        <div className="hero-inner">
          <div className="hero-top">
            <div className="hero-left">
              <div className="hero-eyebrow">
                <span className="eyebrow-dot" />
                Formula 1 · 2026 Season
              </div>
              <div className="hero-title">
                Plan Your
                <span className="hero-title-red">Grand Prix</span>
              </div>
              <div className="hero-sub">{TAGLINES[taglineIdx]}</div>
              <div className="hero-pills">
                {['Tickets & Grandstands','Flights','Hotels','Local Transport','Visa Checker','Cost Estimator'].map(function(p, i) {
                  return (
                    <span key={p} className={'hero-pill' + (i === 0 ? ' hero-pill-hot' : '')}>{p}</span>
                  )
                })}
              </div>
            </div>

            <div className="hero-right">
              <div className="cd-card">
                {seasonStatus && seasonStatus.type === 'live' && nextRace && (
                  <div>
                    <div className="cd-live-badge">
                      <span className="live-dot" />
                      Live This Weekend
                    </div>
                    <div className="cd-race-name">{nextRace.name}</div>
                    <div className="cd-race-dates">{nextRace.circuit + ' · ' + nextRace.dates}</div>
                    {countdown && (
                      <div className="cd-grid">
                        <div className="cd-cell"><div className="cd-num">{pad(countdown.hours)}</div><div className="cd-unit">Hrs</div></div>
                        <div className="cd-cell"><div className="cd-num">{pad(countdown.mins)}</div><div className="cd-unit">Min</div></div>
                        <div className="cd-cell"><div className="cd-num">{pad(countdown.secs)}</div><div className="cd-unit">Sec</div></div>
                        <div className="cd-cell"><div className="cd-num" style={{fontSize:13,paddingTop:7}}>ends</div><div className="cd-unit">Race</div></div>
                      </div>
                    )}
                    <button className="cd-btn" onClick={function() { handleSelectRace(nextRace) }}>Open Race Planner</button>
                  </div>
                )}

                {seasonStatus && seasonStatus.type === 'next' && nextRace && (
                  <div>
                    <div className="cd-label">Next Race Weekend</div>
                    <div className="cd-race-name">{nextRace.name}</div>
                    <div className="cd-race-dates">{nextRace.circuit + ' · ' + nextRace.dates}</div>
                    {countdown && (
                      <div className="cd-grid">
                        <div className="cd-cell"><div className="cd-num">{pad(countdown.days)}</div><div className="cd-unit">Days</div></div>
                        <div className="cd-cell"><div className="cd-num">{pad(countdown.hours)}</div><div className="cd-unit">Hrs</div></div>
                        <div className="cd-cell"><div className="cd-num">{pad(countdown.mins)}</div><div className="cd-unit">Min</div></div>
                        <div className="cd-cell"><div className="cd-num">{pad(countdown.secs)}</div><div className="cd-unit">Sec</div></div>
                      </div>
                    )}
                    <button className="cd-btn" onClick={function() { handleSelectRace(nextRace) }}>Plan This Race</button>
                  </div>
                )}

                {seasonStatus && seasonStatus.type === 'finished' && (
                  <div>
                    <div className="cd-label">2026 Season</div>
                    <div className="cd-race-name">Season Complete</div>
                    <div className="cd-race-dates">Browse the full calendar below.</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="hero-ticker">
            {tickerRaces.map(function(r) {
              var done = isRaceComplete(r.round)
              var live = isRaceLive(r.round)
              var isNext = seasonStatus && seasonStatus.type === 'next' && seasonStatus.session && seasonStatus.session.round === r.round
              var cls = (live || isNext) ? 'ticker-item ticker-item-live' : 'ticker-item'
              var label = live ? 'Live Now →' : isNext ? 'Next →' : done ? 'Done' : r.dates.split('–')[1] || r.dates
              return (
                <div key={r.round} className={cls}>
                  {'R' + r.round + ' ' + r.short} <span>{label}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div style={{borderTop:'1px solid var(--border)'}}>
          <div className="hero-filters">
            <span className="filter-lbl">Filter:</span>
            {filters.map(function(f) {
              return (
                <button
                  key={f.key}
                  className={'fchip' + (filter === f.key ? ' fchip-active' : '')}
                  onClick={function() { setFilter(f.key) }}
                >
                  {f.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="calendar-list">
        {filteredRaces.map(function(race) {
          return (
            <RaceCard
              key={race.round}
              race={race}
              isComplete={isRaceComplete(race.round)}
              isLive={isRaceLive(race.round)}
              isNext={seasonStatus && seasonStatus.type === 'next' && seasonStatus.session && seasonStatus.session.round === race.round}
              onSelect={function() { handleSelectRace(race) }}
            />
          )
        })}
      </div>

      {selectedRace && (
        <div
          className="overlay-back"
          onClick={function(e) { if (e.target.classList.contains('overlay-back')) handleClose() }}
        >
          <div className="overlay-box">
            <div className="overlay-main">
              <DetailHeader race={selectedRace} onBack={handleClose} />
              <TripInputs trip={trip} onSet={handleSet} />
              <SectionNav />
              <GrandstandPicker race={selectedRace} trip={trip} onSet={handleSet} onSelect={setSelectedGrandstand} />
              <FlightGuide race={selectedRace} trip={trip} />
              <Accommodation race={selectedRace} trip={trip} onSet={handleSet} />
              <LocalTransport race={selectedRace} />
              <Itinerary race={selectedRace} grandstand={selectedGrandstand} />
              <VisaChecker race={selectedRace} passport={trip.passport} />
            </div>
            <div className="overlay-side">
              <CostPanel
                race={selectedRace}
                trip={trip}
                onSet={handleSet}
                c={costData}
                selectedGrandstand={selectedGrandstand}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
