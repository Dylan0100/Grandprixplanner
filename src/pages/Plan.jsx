import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { races } from '../data/racesData'
import { calcCost } from '../utils/costCalc'
import RaceCard from '../components/RaceCard'
import DetailHeader from '../components/DetailHeader'
import TripInputs from '../components/TripInputs'
import SectionNav from '../components/SectionNav'
import SectionHeading from '../components/SectionHeading'
import CostPanel from '../components/CostPanel'
import GrandstandPicker from '../components/GrandstandPicker'
import Accommodation from '../components/Accommodation'
import FlightGuide from '../components/FlightGuide'
import LocalTransport from '../components/LocalTransport'
import Itinerary from '../components/Itinerary'
import VisaChecker from '../components/VisaChecker'

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
  var now = new Date()
  for (var i = 0; i < SESSIONS.length; i++) {
    var fp1 = new Date(SESSIONS[i].fp1)
    var raceEnd = new Date(SESSIONS[i].raceEnd)
    if (now >= fp1 && now <= raceEnd) return { type: 'live', session: SESSIONS[i] }
    if (now < fp1) return { type: 'next', session: SESSIONS[i] }
  }
  return { type: 'finished', session: null }
}

function isRaceComplete(round) {
  var session = SESSIONS.find(function(s) { return s.round === round })
  if (!session) return false
  return new Date() > new Date(session.raceEnd)
}

function isRaceLive(round) {
  var session = SESSIONS.find(function(s) { return s.round === round })
  if (!session) return false
  var now = new Date()
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

const heroStyles = `
  .gp-hero-wrap { background: var(--surface); border-bottom: 1px solid var(--border-md); margin-top: 65px; }
  .gp-hero-inner { max-width: 1200px; margin: 0 auto; padding: 32px 40px 0; }
  .gp-hero-top { display: flex; align-items: flex-start; gap: 40px; }
  .gp-hero-left { flex: 1; }
  .gp-eyebrow { display: flex; align-items: center; gap: 8px; font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 11px; letter-spacing: 0.12em; color: var(--text-muted); text-transform: uppercase; margin-bottom: 10px; }
  .gp-eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--red); flex-shrink: 0; }
  .gp-hero-title { font-family: 'Bebas Neue', sans-serif; font-size: 56px; line-height: 0.92; color: var(--text); margin: 0 0 10px; }
  .gp-hero-title-red { color: var(--red); display: block; }
  .gp-hero-sub { font-size: 14px; color: var(--text-muted); margin: 0 0 18px; line-height: 1.5; max-width: 400px; }
  .gp-hero-pills { display: flex; gap: 7px; flex-wrap: wrap; }
  .gp-pill { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 11px; letter-spacing: 0.07em; text-transform: uppercase; padding: 4px 10px; border-radius: 4px; background: rgba(100,120,255,0.07); border: 1px solid var(--border-md); color: var(--text-muted); }
  .gp-pill-hot { background: rgba(232,0,45,0.1); border-color: rgba(232,0,45,0.25); color: var(--red); }
  .gp-hero-right { flex-shrink: 0; width: 276px; }
  .gp-cd-card { background: var(--surface-2); border: 1px solid var(--border-md); border-radius: 10px; padding: 20px; }
  .gp-cd-label { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 10px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px; }
  .gp-cd-race { font-family: 'Bebas Neue', sans-serif; font-size: 22px; color: var(--text); line-height: 1; margin-bottom: 2px; }
  .gp-cd-dates { font-size: 12px; color: var(--text-muted); margin-bottom: 14px; font-family: 'Barlow', sans-serif; }
  .gp-cd-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 6px; margin-bottom: 14px; }
  .gp-cd-cell { background: var(--surface-3); border-radius: 6px; padding: 8px 4px; text-align: center; }
  .gp-cd-num { font-family: 'Bebas Neue', sans-serif; font-size: 26px; color: var(--text); line-height: 1; }
  .gp-cd-unit { font-family: 'Barlow Condensed', sans-serif; font-size: 9px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em; }
  .gp-cd-btn { width: 100%; background: var(--red); color: #fff; font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; border: none; border-radius: 6px; padding: 10px; cursor: pointer; }
  .gp-cd-btn:hover { background: var(--red-dark); }
  .gp-live-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(34,197,94,0.12); border: 1px solid rgba(34,197,94,0.3); border-radius: 4px; padding: 4px 10px; margin-bottom: 10px; font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 11px; letter-spacing: 0.1em; color: #22c55e; text-transform: uppercase; }
  .gp-live-dot { width: 6px; height: 6px; border-radius: 50%; background: #22c55e; animation: gplivepulse 1s infinite; }
  @keyframes gplivepulse { 0%,100%{opacity:1} 50%{opacity:0.2} }
  .gp-ticker { border-top: 1px solid var(--border); margin-top: 24px; padding: 11px 0; display: flex; gap: 26px; overflow: hidden; }
  .gp-ticker-item { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 11px; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.08em; white-space: nowrap; flex-shrink: 0; }
  .gp-ticker-item span { color: var(--text-muted); margin-left: 4px; }
  .gp-ticker-live { color: var(--red); }
  .gp-ticker-live span { color: var(--red); }
  .gp-filters-wrap { border-top: 1px solid var(--border); }
  .gp-filters { max-width: 1200px; margin: 0 auto; padding: 14px 40px; display: flex; align-items: center; gap: 7px; flex-wrap: wrap; }
  .gp-filter-lbl { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 10px; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.1em; margin-right: 4px; }
  .gp-chip { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; padding: 5px 12px; border-radius: 20px; border: 1px solid var(--border-md); background: transparent; color: var(--text-muted); cursor: pointer; transition: all 0.15s; }
  .gp-chip:hover { color: var(--text); border-color: rgba(100,120,255,0.3); }
  .gp-chip-active { background: var(--red); border-color: var(--red); color: #fff; }
  .gp-calendar { max-width: 1200px; margin: 0 auto; padding: 16px 40px 80px; display: flex; flex-direction: column; gap: 5px; }
  .gp-detail-wrap { margin-top: 65px; }
  .gp-breadcrumb { max-width: 1280px; margin: 0 auto; padding: 14px 40px 0; display: flex; align-items: center; gap: 8px; font-family: 'Barlow Condensed', sans-serif; font-size: 12px; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700; }
  .gp-breadcrumb a { color: var(--text-muted); text-decoration: none; transition: color 0.15s; }
  .gp-breadcrumb a:hover { color: var(--text); }
  .gp-back-btn { display: inline-flex; align-items: center; gap: 8px; background: var(--surface-2); border: 1px solid var(--border-md); color: var(--text-muted); padding: 7px 14px; border-radius: 6px; font-family: 'Barlow Condensed', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; transition: all 0.15s; margin: 12px 40px 0; max-width: fit-content; }
  .gp-back-btn:hover { color: var(--text); border-color: var(--border-hover); background: var(--surface-3); }

  @media (max-width: 640px) {
    .gp-hero-inner { padding: 20px 16px 0; }
    .gp-hero-top { flex-direction: column; gap: 20px; }
    .gp-hero-title { font-size: 38px; margin: 0 0 8px; }
    .gp-hero-sub { max-width: 100%; margin: 0 0 14px; }
    .gp-hero-right { width: 100%; }
    .gp-cd-card { padding: 16px; }
    .gp-cd-num { font-size: 22px; }
    .gp-ticker { gap: 16px; padding: 9px 0; overflow-x: auto; -webkit-overflow-scrolling: touch; }
    .gp-filters { padding: 12px 16px; gap: 6px; }
    .gp-calendar { padding: 14px 16px 60px; }
  }
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

  var costTrip = {
    departure: trip.departureCity ? trip.departureCity.cluster : null,
    party: trip.party,
    ticketTier: trip.ticketTier,
    accumTier: trip.accumTier,
    incFlights: trip.incFlights,
    incTickets: trip.incTickets,
    incAccom: trip.incAccom,
    ticketPriceOverride: selectedGrandstand ? selectedGrandstand.price : null,
  }
  var costData = selectedRace ? calcCost(selectedRace, costTrip) : null

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
    var target = seasonStatus.type === 'live'
      ? seasonStatus.session.raceEnd
      : seasonStatus.session.fp1
    var tick = function() {
      setCountdown(formatCountdown(target))
      var fresh = getSeasonStatus()
      var roundChanged = fresh.session && seasonStatus.session && fresh.session.round !== seasonStatus.session.round
      if (fresh.type !== seasonStatus.type || roundChanged) {
        setSeasonStatus(fresh)
        if (fresh.session) {
          var matched = races.find(function(r) { return r.round === fresh.session.round })
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
    window.scrollTo(0, 0)
  }, [selectedRace])

  function handleSelectRace(race) {
    if (isRaceComplete(race.round)) return
    setSelectedRace(race)
    setSelectedGrandstand(null)
    setTrip(function(prev) {
      return Object.assign({}, prev, {
        ticketTier: 1, accumTier: 1,
        incFlights: true, incTickets: true, incAccom: true,
      })
    })
  }

  function handleBack() {
    setSelectedRace(null)
    setSelectedGrandstand(null)
  }

  function handleGrandstandSelect(gs) {
    setSelectedGrandstand(gs)
    if (gs && gs.tierIndex !== undefined) {
      handleSet('ticketTier', gs.tierIndex)
    }
  }

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

  var tickerRaces = races.slice(0, 9)

  var navEl = (
    <nav>
      <Link to="/" className="nav-logo">
        <div className="logo-mark">GP</div>
        Grand Prix Planner
      </Link>
      <Link to="/" className="nav-link">Home</Link>
    </nav>
  )

  if (selectedRace) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: heroStyles }} />
        {navEl}
        <div className="gp-detail-wrap">
          <div className="gp-breadcrumb">
            <a href="#" onClick={function(e){ e.preventDefault(); handleBack() }}>Home</a>
            <span>›</span>
            <a href="#" onClick={function(e){ e.preventDefault(); handleBack() }}>Plan a Race</a>
            <span>›</span>
            <span style={{color:'var(--text-muted)'}}>{selectedRace.name}</span>
          </div>
          <button className="gp-back-btn" onClick={handleBack}>
            ← Back to Calendar
          </button>
          <div className="main">
            <div className="plan-layout">
              <div className="plan-content">
                <div className="detail-panel">
                  <DetailHeader race={selectedRace} onClose={handleBack} />
                  <TripInputs trip={trip} onSet={handleSet} />
                  <SectionNav />

                  <div className="plan-section" id="sec-grandstands">
                    <SectionHeading
                      num={1}
                      icon="🏟️"
                      title="Grandstand Picker"
                      sub="Expert guide to every viewing area"
                    />
                    <GrandstandPicker
                      race={selectedRace}
                      onSelect={handleGrandstandSelect}
                      selectedId={selectedGrandstand ? selectedGrandstand.id : null}
                    />
                  </div>

                  <div className="plan-section plan-section-alt" id="sec-flights">
                    <SectionHeading
                      num={2}
                      icon="✈️"
                      title="Flight Guide"
                      sub="Routes, airports and booking windows"
                    />
                    <FlightGuide race={selectedRace} trip={trip} />
                  </div>

                  <div className="plan-section" id="sec-accom">
                    <SectionHeading
                      num={3}
                      icon="🏨"
                      title="Accommodation"
                      sub="Nightly rates across three tiers"
                    />
                    <Accommodation race={selectedRace} trip={trip} onSet={handleSet} />
                  </div>

                  <div className="plan-section plan-section-alt" id="sec-transport">
                    <SectionHeading
                      num={4}
                      icon="🗺️"
                      title="Local Transport"
                      sub="Getting to and from the circuit"
                    />
                    <LocalTransport race={selectedRace} />
                  </div>

                  <div className="plan-section" id="sec-itinerary">
                    <SectionHeading
                      num={5}
                      icon="📋"
                      title="Weekend Itinerary"
                      sub="Build and export your race schedule"
                    />
                    <Itinerary race={selectedRace} grandstand={selectedGrandstand} />
                  </div>

                  <div className="plan-section plan-section-alt" id="sec-visa">
                    <SectionHeading
                      num={6}
                      icon="🛂"
                      title="Visa Checker"
                      sub="Entry requirements by passport"
                    />
                    <VisaChecker race={selectedRace} passport={trip.passport} />
                  </div>

                </div>
              </div>
              <div className="plan-sidebar">
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
        </div>
      </>
    )
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: heroStyles }} />
      {navEl}

      <div className="gp-hero-wrap">
        <div className="gp-hero-inner">
          <div className="gp-hero-top">
            <div className="gp-hero-left">
              <div className="gp-eyebrow">
                <span className="gp-eyebrow-dot" />
                Formula 1 · 2026 Season
              </div>
              <div className="gp-hero-title">
                Plan Your
                <span className="gp-hero-title-red">Grand Prix</span>
              </div>
              <div className="gp-hero-sub">{TAGLINES[taglineIdx]}</div>
              <div className="gp-hero-pills">
                {['Tickets & Grandstands','Flights','Hotels','Local Transport','Visa Checker','Cost Estimator'].map(function(p, i) {
                  return <span key={p} className={'gp-pill' + (i === 0 ? ' gp-pill-hot' : '')}>{p}</span>
                })}
              </div>
            </div>

            <div className="gp-hero-right">
              <div className="gp-cd-card">
                {seasonStatus && seasonStatus.type === 'live' && nextRace && (
                  <div>
                    <div className="gp-live-badge"><span className="gp-live-dot" />Live This Weekend</div>
                    <div className="gp-cd-race">{nextRace.name}</div>
                    <div className="gp-cd-dates">{nextRace.circuit + ' · ' + nextRace.dates}</div>
                    {countdown && (
                      <div className="gp-cd-grid">
                        <div className="gp-cd-cell"><div className="gp-cd-num">{pad(countdown.hours)}</div><div className="gp-cd-unit">Hrs</div></div>
                        <div className="gp-cd-cell"><div className="gp-cd-num">{pad(countdown.mins)}</div><div className="gp-cd-unit">Min</div></div>
                        <div className="gp-cd-cell"><div className="gp-cd-num">{pad(countdown.secs)}</div><div className="gp-cd-unit">Sec</div></div>
                        <div className="gp-cd-cell"><div className="gp-cd-num" style={{fontSize:12,paddingTop:7}}>ends</div><div className="gp-cd-unit">Race</div></div>
                      </div>
                    )}
                    <button className="gp-cd-btn" onClick={function(){ handleSelectRace(nextRace) }}>Open Race Planner</button>
                  </div>
                )}
                {seasonStatus && seasonStatus.type === 'next' && nextRace && (
                  <div>
                    <div className="gp-cd-label">Next Race Weekend</div>
                    <div className="gp-cd-race">{nextRace.name}</div>
                    <div className="gp-cd-dates">{nextRace.circuit + ' · ' + nextRace.dates}</div>
                    {countdown && (
                      <div className="gp-cd-grid">
                        <div className="gp-cd-cell"><div className="gp-cd-num">{pad(countdown.days)}</div><div className="gp-cd-unit">Days</div></div>
                        <div className="gp-cd-cell"><div className="gp-cd-num">{pad(countdown.hours)}</div><div className="gp-cd-unit">Hrs</div></div>
                        <div className="gp-cd-cell"><div className="gp-cd-num">{pad(countdown.mins)}</div><div className="gp-cd-unit">Min</div></div>
                        <div className="gp-cd-cell"><div className="gp-cd-num">{pad(countdown.secs)}</div><div className="gp-cd-unit">Sec</div></div>
                      </div>
                    )}
                    <button className="gp-cd-btn" onClick={function(){ handleSelectRace(nextRace) }}>Plan This Race</button>
                  </div>
                )}
                {seasonStatus && seasonStatus.type === 'finished' && (
                  <div>
                    <div className="gp-cd-label">2026 Season</div>
                    <div className="gp-cd-race">Season Complete</div>
                    <div className="gp-cd-dates">Browse the full calendar below.</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="gp-ticker">
            {tickerRaces.map(function(r) {
              var done = isRaceComplete(r.round)
              var live = isRaceLive(r.round)
              var isNext = seasonStatus && seasonStatus.type === 'next' && seasonStatus.session && seasonStatus.session.round === r.round
              var cls = (live || isNext) ? 'gp-ticker-item gp-ticker-live' : 'gp-ticker-item'
              var label = live ? 'Live Now →' : isNext ? 'Next →' : done ? 'Done' : r.dates.split('–')[1] || r.dates
              return (
                <div key={r.round} className={cls}>
                  {'R' + r.round + ' ' + r.short} <span>{label}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="gp-filters-wrap">
          <div className="gp-filters">
            <span className="gp-filter-lbl">Filter:</span>
            {filters.map(function(f) {
              return (
                <button
                  key={f.key}
                  className={'gp-chip' + (filter === f.key ? ' gp-chip-active' : '')}
                  onClick={function(){ setFilter(f.key) }}
                >
                  {f.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="gp-calendar">
        {filteredRaces.map(function(race) {
          return (
            <RaceCard
              key={race.round}
              race={race}
              isComplete={isRaceComplete(race.round)}
              isLive={isRaceLive(race.round)}
              isNext={seasonStatus && seasonStatus.type === 'next' && seasonStatus.session && seasonStatus.session.round === race.round}
              onSelect={function(){ handleSelectRace(race) }}
            />
          )
        })}
      </div>
    </>
  )
}
