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

const RACE_SESSIONS = [
  { id: 'australia',  fp1: '2026-03-06T01:30Z', race: '2026-03-08T05:00Z' },
  { id: 'china',      fp1: '2026-03-13T03:30Z', race: '2026-03-15T07:00Z' },
  { id: 'japan',      fp1: '2026-03-27T02:30Z', race: '2026-03-29T05:00Z' },
  { id: 'miami',      fp1: '2026-05-01T17:30Z', race: '2026-05-03T20:00Z' },
  { id: 'canada',     fp1: '2026-05-22T17:30Z', race: '2026-05-24T20:00Z' },
  { id: 'monaco',     fp1: '2026-06-05T12:30Z', race: '2026-06-07T14:00Z' },
  { id: 'spain',      fp1: '2026-06-12T12:30Z', race: '2026-06-14T14:00Z' },
  { id: 'austria',    fp1: '2026-06-26T12:30Z', race: '2026-06-28T14:00Z' },
  { id: 'britain',    fp1: '2026-07-03T12:30Z', race: '2026-07-05T15:00Z' },
  { id: 'belgium',    fp1: '2026-07-17T12:30Z', race: '2026-07-19T14:00Z' },
  { id: 'hungary',    fp1: '2026-07-24T12:30Z', race: '2026-07-26T14:00Z' },
  { id: 'netherlands',fp1: '2026-08-21T11:30Z', race: '2026-08-23T14:00Z' },
  { id: 'italy',      fp1: '2026-09-04T11:30Z', race: '2026-09-06T14:00Z' },
  { id: 'madrid',     fp1: '2026-09-11T12:30Z', race: '2026-09-13T14:00Z' },
  { id: 'azerbaijan', fp1: '2026-09-24T09:30Z', race: '2026-09-26T12:00Z' },
  { id: 'singapore',  fp1: '2026-10-09T09:30Z', race: '2026-10-11T13:00Z' },
  { id: 'usa',        fp1: '2026-10-23T18:30Z', race: '2026-10-25T20:00Z' },
  { id: 'mexico',     fp1: '2026-10-30T18:30Z', race: '2026-11-01T20:00Z' },
  { id: 'brazil',     fp1: '2026-11-06T15:30Z', race: '2026-11-08T17:00Z' },
  { id: 'lasvegas',   fp1: '2026-11-20T00:30Z', race: '2026-11-22T04:00Z' },
  { id: 'qatar',      fp1: '2026-11-27T13:30Z', race: '2026-11-29T16:00Z' },
  { id: 'abudhabi',   fp1: '2026-12-04T09:30Z', race: '2026-12-06T13:00Z' },
]

const TAGLINES = [
  '22 circuits · 21 countries · 1 season to plan',
  'From Monaco to Singapore — every detail covered',
  'Grandstand guides for every race on the calendar',
  'Flights, hotels, visas and transport — all in one place',
  'Plan the trip. Then live the weekend.',
]

function getRaceStatus(sessions) {
  const now = new Date()
  for (let i = 0; i < sessions.length; i++) {
    const fp1 = new Date(sessions[i].fp1)
    const raceEnd = new Date(new Date(sessions[i].race).getTime() + 3 * 60 * 60 * 1000)
    if (now >= fp1 && now <= raceEnd) return { type: 'live', index: i }
    if (now < fp1) return { type: 'next', index: i }
  }
  return { type: 'finished', index: -1 }
}

function formatCountdown(targetDate) {
  const now = new Date()
  const diff = new Date(targetDate) - now
  if (diff <= 0) return null
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const secs = Math.floor((diff % (1000 * 60)) / 1000)
  return { days, hours, mins, secs }
}

export default function Plan() {
  const [selectedRace, setSelectedRace] = useState(null)
  const [filter, setFilter] = useState('all')
  const [departure, setDeparture] = useState('')
  const [passport, setPassport] = useState('')
  const [partySize, setPartySize] = useState(2)
  const [selectedGrandstand, setSelectedGrandstand] = useState(null)
  const [countdown, setCountdown] = useState(null)
  const [taglineIndex, setTaglineIndex] = useState(0)
  const [raceStatus, setRaceStatus] = useState(null)
  const [currentRaceData, setCurrentRaceData] = useState(null)

  useEffect(() => {
    const status = getRaceStatus(RACE_SESSIONS)
    setRaceStatus(status)
    if (status.type === 'next') {
      const session = RACE_SESSIONS[status.index]
      const matched = races.find(r => r.id === session.id)
      setCurrentRaceData({ session, race: matched })
    } else if (status.type === 'live') {
      const session = RACE_SESSIONS[status.index]
      const matched = races.find(r => r.id === session.id)
      setCurrentRaceData({ session, race: matched })
    }
  }, [])

  useEffect(() => {
    if (!currentRaceData || raceStatus?.type !== 'next') return
    const tick = setInterval(() => {
      setCountdown(formatCountdown(currentRaceData.session.fp1))
    }, 1000)
    setCountdown(formatCountdown(currentRaceData.session.fp1))
    return () => clearInterval(tick)
  }, [currentRaceData, raceStatus])

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex(i => (i + 1) % TAGLINES.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  const filters = [
    { key: 'all', label: 'All 22 Races' },
    { key: 'europe', label: 'Europe' },
    { key: 'americas', label: 'Americas' },
    { key: 'asia', label: 'Asia & Pacific' },
    { key: 'middleeast', label: 'Middle East' },
    { key: 'sprint', label: 'Sprint Weekends' },
    { key: 'upcoming', label: 'Upcoming Only' },
  ]

  const now = new Date()
  const filteredRaces = races.filter(r => {
    if (filter === 'europe') return r.region === 'Europe'
    if (filter === 'americas') return r.region === 'Americas'
    if (filter === 'asia') return r.region === 'Asia & Pacific'
    if (filter === 'middleeast') return r.region === 'Middle East'
    if (filter === 'sprint') return r.sprint === true
    if (filter === 'upcoming') return new Date(r.raceDate) > now
    return true
  })

  const nextSessionId = raceStatus?.type === 'next' || raceStatus?.type === 'live'
    ? RACE_SESSIONS[raceStatus.index]?.id
    : null

  const heroStyles = `
    .race-hero { background: var(--surface); border-bottom: 1px solid var(--border-md); padding: 0; }
    .hero-inner { max-width: 1200px; margin: 0 auto; padding: 32px 40px 0; }
    .hero-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 40px; margin-bottom: 24px; }
    .hero-left { flex: 1; }
    .hero-eyebrow { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 11px; letter-spacing: 0.12em; color: var(--text-muted); text-transform: uppercase; margin-bottom: 8px; }
    .hero-title { font-family: 'Bebas Neue', sans-serif; font-size: 52px; line-height: 1; color: var(--text); margin: 0 0 4px; }
    .hero-title span { color: var(--red); }
    .hero-tagline { font-family: 'Barlow', sans-serif; font-size: 14px; color: var(--text-muted); min-height: 20px; transition: opacity 0.4s; }
    .hero-right { flex-shrink: 0; }
    .hero-panel { background: var(--surface-2); border: 1px solid var(--border-md); border-radius: 12px; padding: 20px 24px; min-width: 280px; }
    .panel-live-badge { display: inline-flex; align-items: center; gap: 6px; background: var(--red); color: #fff; font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; padding: 4px 10px; border-radius: 4px; margin-bottom: 10px; }
    .panel-live-dot { width: 6px; height: 6px; border-radius: 50%; background: #fff; animation: pulse 1s infinite; }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
    .panel-next-label { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 6px; }
    .panel-race-name { font-family: 'Bebas Neue', sans-serif; font-size: 28px; color: var(--text); line-height: 1; margin-bottom: 12px; }
    .countdown-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 14px; }
    .countdown-cell { background: var(--surface-3); border-radius: 6px; padding: 8px 4px; text-align: center; }
    .countdown-num { font-family: 'Bebas Neue', sans-serif; font-size: 28px; color: var(--text); line-height: 1; }
    .countdown-label { font-family: 'Barlow Condensed', sans-serif; font-size: 10px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em; }
    .panel-cta { display: block; width: 100%; text-align: center; background: var(--red); color: #fff; font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; border: none; border-radius: 6px; padding: 10px; cursor: pointer; }
    .panel-cta:hover { background: var(--red-dark); }
    .hero-filters { border-top: 1px solid var(--border); padding: 16px 40px; max-width: 1200px; margin: 0 auto; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
    .filter-label { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted); margin-right: 4px; }
    .filter-chip { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase; padding: 6px 14px; border-radius: 20px; border: 1px solid var(--border-md); background: transparent; color: var(--text-muted); cursor: pointer; transition: all 0.15s; }
    .filter-chip:hover { color: var(--text); border-color: var(--text-muted); }
    .filter-chip.active { background: var(--red); border-color: var(--red); color: #fff; }
    .calendar-list { max-width: 1200px; margin: 0 auto; padding: 24px 40px 60px; display: flex; flex-direction: column; gap: 8px; }
    .overlay-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.7); z-index: 100; overflow-y: auto; }
    .overlay-inner { min-height: 100vh; display: flex; padding: 20px; box-sizing: border-box; }
    .overlay-content { background: var(--surface); border-radius: 16px; width: 100%; max-width: 1300px; margin: auto; display: flex; flex-direction: column; position: relative; }
    .detail-layout { display: flex; gap: 0; flex: 1; }
    .detail-main { flex: 1; overflow-y: auto; padding: 32px 40px; }
    .detail-sidebar { width: 360px; flex-shrink: 0; border-left: 1px solid var(--border); }
  `

  return (
    <div style={{ minHeight: '100vh', background: 'var(--black)' }}>
      <style dangerouslySetInnerHTML={{ __html: heroStyles }} />

      <div className="race-hero">
        <div className="hero-inner">
          <div className="hero-top">
            <div className="hero-left">
              <div className="hero-eyebrow">Formula 1 · 2026 Season</div>
              <div className="hero-title">RACE<br /><span>CONTROL</span></div>
              <div className="hero-tagline">{TAGLINES[taglineIndex]}</div>
            </div>

            <div className="hero-right">
              <div className="hero-panel">
                {raceStatus?.type === 'live' && currentRaceData?.race && (
                  <>
                    <div className="panel-live-badge">
                      <span className="panel-live-dot" />
                      Live This Weekend
                    </div>
                    <div className="panel-race-name">{currentRaceData.race.name}</div>
                    <button
                      className="panel-cta"
                      onClick={() => setSelectedRace(currentRaceData.race)}
                    >
                      Open Race Planner
                    </button>
                  </>
                )}

                {raceStatus?.type === 'next' && currentRaceData?.race && countdown && (
                  <>
                    <div className="panel-next-label">Next Race Weekend</div>
                    <div className="panel-race-name">{currentRaceData.race.name}</div>
                    <div className="countdown-grid">
                      <div className="countdown-cell">
                        <div className="countdown-num">{String(countdown.days).padStart(2,'0')}</div>
                        <div className="countdown-label">Days</div>
                      </div>
                      <div className="countdown-cell">
                        <div className="countdown-num">{String(countdown.hours).padStart(2,'0')}</div>
                        <div className="countdown-label">Hrs</div>
                      </div>
                      <div className="countdown-cell">
                        <div className="countdown-num">{String(countdown.mins).padStart(2,'0')}</div>
                        <div className="countdown-label">Min</div>
                      </div>
                      <div className="countdown-cell">
                        <div className="countdown-num">{String(countdown.secs).padStart(2,'0')}</div>
                        <div className="countdown-label">Sec</div>
                      </div>
                    </div>
                    <button
                      className="panel-cta"
                      onClick={() => setSelectedRace(currentRaceData.race)}
                    >
                      Plan This Race
                    </button>
                  </>
                )}

                {raceStatus?.type === 'finished' && (
                  <>
                    <div className="panel-next-label">2026 Season</div>
                    <div className="panel-race-name">Season Complete</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'Barlow, sans-serif', marginBottom: 14 }}>
                      Browse the full calendar below to revisit any race.
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="hero-filters">
          <span className="filter-label">Filter:</span>
          {filters.map(f => (
            <button
              key={f.key}
              className={'filter-chip' + (filter === f.key ? ' active' : '')}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="calendar-list">
        {filteredRaces.map(race => (
          <RaceCard
            key={race.id}
            race={race}
            isNext={race.id === nextSessionId && raceStatus?.type === 'next'}
            isLive={race.id === nextSessionId && raceStatus?.type === 'live'}
            onSelect={() => setSelectedRace(race)}
          />
        ))}
      </div>

      {selectedRace && (
        <div className="overlay-backdrop" onClick={e => { if (e.target === e.currentTarget) setSelectedRace(null) }}>
          <div className="overlay-inner">
            <div className="overlay-content">
              <div className="detail-layout">
                <div className="detail-main">
                  <DetailHeader race={selectedRace} onBack={() => setSelectedRace(null)} />
                  <TripInputs
                    departure={departure} setDeparture={setDeparture}
                    passport={passport} setPassport={setPassport}
                    partySize={partySize} setPartySize={setPartySize}
                  />
                  <SectionNav />
                  <GrandstandPicker race={selectedRace} onSelect={setSelectedGrandstand} />
                  <FlightGuide race={selectedRace} departure={departure} />
                  <Accommodation race={selectedRace} partySize={partySize} />
                  <LocalTransport race={selectedRace} />
                  <Itinerary race={selectedRace} grandstand={selectedGrandstand} />
                  <VisaChecker race={selectedRace} passport={passport} />
                </div>
                <div className="detail-sidebar">
                  <CostPanel
                    race={selectedRace}
                    departure={departure}
                    partySize={partySize}
                    selectedGrandstand={selectedGrandstand}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
