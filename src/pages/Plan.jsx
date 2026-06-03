import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { races } from '../data/racesData'
import { calcCost } from '../utils/costCalc'
import RaceCard from '../components/RaceCard'
import DetailHeader from '../components/DetailHeader'
import TripInputs from '../components/TripInputs'
import SectionNav from '../components/SectionNav'
import CostPanel from '../components/CostPanel'
import Accommodation from '../components/Accommodation'
import GrandstandPicker from '../components/GrandstandPicker'
import FlightGuide from '../components/FlightGuide'
import LocalTransport from '../components/LocalTransport'
import Itinerary from '../components/Itinerary'
import VisaChecker from '../components/VisaChecker'

const filters = [
  { id: 'all', label: 'All 22 Races' },
  { id: 'europe', label: 'Europe' },
  { id: 'americas', label: 'Americas' },
  { id: 'asia', label: 'Asia & Pacific' },
  { id: 'middle-east', label: 'Middle East' },
  { id: 'sprint', label: 'Sprint Weekends' },
  { id: 'upcoming', label: 'Upcoming Only' },
]

function PlanSectionHeading({ number, icon, title, sub }) {
  const num = number < 10 ? '0' + number : '' + number
  return (
    <div className="psh">
      <span className="psh-num">{num}</span>
      <span className="psh-icon">{icon}</span>
      <div className="psh-text">
        <div className="psh-title">{title}</div>
        {sub && <div className="psh-sub">{sub}</div>}
      </div>
    </div>
  )
}

export default function Plan() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedRound, setSelectedRound] = useState(null)
  const [selectedGrandstand, setSelectedGrandstand] = useState(null)
  const [trip, setTripState] = useState({
    departureCity: null,
    passport: null,
    party: 2,
    ticketTier: 1,
    accumTier: 1,
    incFlights: true,
    incTickets: true,
    incAccom: true,
  })

  const detailRef = useRef(null)
  const navRef = useRef(null)

  const selectedRace = races.find(function (r) { return r.round === selectedRound })

  function onSet(key, val) {
    setTripState(function (prev) { return Object.assign({}, prev, { [key]: val }) })
  }

  function handleGrandstandSelect(gs) {
    if (selectedGrandstand && selectedGrandstand.id === gs.id) {
      setSelectedGrandstand(null)
      onSet('ticketTier', 1)
    } else {
      const price = selectedRace ? selectedRace.tickets[gs.tierIndex] : 0
      setSelectedGrandstand({ name: gs.name, id: gs.id, price: price })
      onSet('ticketTier', gs.tierIndex)
    }
  }

  function handleGrandstandClear() {
    setSelectedGrandstand(null)
  }

  function selectRace(round) {
    setSelectedRound(round)
    setSelectedGrandstand(null)
    setTimeout(function () {
      if (detailRef.current) detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  function closePanel() {
    setSelectedRound(null)
    setSelectedGrandstand(null)
  }

  function scrollToNav() {
    if (navRef.current) navRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const est = {
    departure: trip.departureCity ? trip.departureCity.cluster : null,
    party: trip.party,
    ticketTier: trip.ticketTier,
    ticketPriceOverride: selectedGrandstand ? selectedGrandstand.price : null,
    accumTier: trip.accumTier,
    incFlights: trip.incFlights,
    incTickets: trip.incTickets,
    incAccom: trip.incAccom,
  }

  const c = selectedRace ? calcCost(selectedRace, est) : null

  const filtered = races.filter(function (r) {
    if (activeFilter === 'all') return true
    if (activeFilter === 'sprint') return r.sprint
    if (activeFilter === 'upcoming') return r.status !== 'completed'
    return r.region === activeFilter
  })

  return (
    <>
      <nav className="sticky-nav" style={{ padding: '16px 40px' }}>
        <Link to="/" className="nav-logo">
          <div className="logo-mark">GP</div>Grand Prix Planner
        </Link>
        <div className="nav-right">
          <Link to="/" className="nav-link">Home</Link>
        </div>
      </nav>

      <div className="page-header">
        <div className="page-header-inner">
          <div className="breadcrumb">
            <Link to="/">Home</Link><span>›</span><span>Plan a Race</span>
          </div>
          <h1>Choose Your<br /><em>2026 Grand Prix</em></h1>
          <p>Select a race to start building your perfect weekend — tickets, travel, accommodation and everything in between.</p>
          <div className="stats-row">
            <div className="stat-item"><span className="stat-dot next" /><span>Next race: Miami — 1–3 May</span></div>
            <div className="stat-item"><span className="stat-dot sprint" /><span>Sprint weekend</span></div>
            <div className="stat-item"><span className="stat-dot upcoming" /><span>Upcoming</span></div>
            <div className="stat-item"><span className="stat-dot completed" /><span>Completed</span></div>
          </div>
        </div>
      </div>

      <div className="filters-bar">
        <span className="filter-label">Filter:</span>
        {filters.map(function (f) {
          return (
            <button
              key={f.id}
              className={'filter-btn' + (activeFilter === f.id ? ' active' : '')}
              onClick={function () { setActiveFilter(f.id) }}
            >
              {f.label}
            </button>
          )
        })}
      </div>

      <div className="main">
        {!selectedRace ? (
          <div className="pick-prompt">
            <div className="pick-prompt-icon">🏁</div>
            <h3>Pick a Race to Start Planning</h3>
            <p>Select any Grand Prix from the calendar below to access grandstand guides, cost estimates, flight information, and everything else for your race weekend.</p>
          </div>
        ) : (
          <div className="detail-panel" ref={detailRef}>
            <DetailHeader race={selectedRace} onClose={closePanel} />
            <div className="plan-layout">
              <div className="plan-content">
                <TripInputs trip={trip} onSet={onSet} />
                <SectionNav navRef={navRef} />

                <div id="sec-grandstands" className="plan-section">
                  <PlanSectionHeading
                    number={1} icon="🏟️"
                    title="Tickets & Grandstands"
                    sub={'Compare every grandstand at ' + selectedRace.circuit}
                  />
                  <div className="psh-tier-bar">
                    <span className="psh-tier-label">Ticket estimate:</span>
                    {!selectedGrandstand && ['Standard', 'Advanced', 'Premium'].map(function (t, i) {
                      return (
                        <button
                          key={i}
                          className={'psh-tier-btn' + (trip.ticketTier === i ? ' active' : '')}
                          onClick={function () { onSet('ticketTier', i) }}
                        >
                          {t}<span className="psh-tier-price">{' £' + selectedRace.tickets[i]}</span>
                        </button>
                      )
                    })}
                    {selectedGrandstand && (
                      <div className="psh-gs-selected">
                        <span className="psh-gs-name">{selectedGrandstand.name}</span>
                        <span className="psh-gs-price">{'£' + selectedGrandstand.price}</span>
                        <button className="psh-gs-clear" onClick={handleGrandstandClear}>clear</button>
                      </div>
                    )}
                  </div>
                  <GrandstandPicker
                    race={selectedRace}
                    onSelect={handleGrandstandSelect}
                    selectedId={selectedGrandstand ? selectedGrandstand.id : null}
                  />
                </div>

                <div id="sec-flights" className="plan-section plan-section-alt">
                  <PlanSectionHeading
                    number={2} icon="✈️"
                    title="Flights"
                    sub={'Routes, airports and booking tips for ' + selectedRace.country}
                  />
                  <FlightGuide race={selectedRace} onBack={scrollToNav} />
                </div>

                <div id="sec-accom" className="plan-section">
                  <PlanSectionHeading
                    number={3} icon="🏨"
                    title="Accommodation"
                    sub={selectedRace.nights + ' nights — select your level'}
                  />
                  <Accommodation race={selectedRace} trip={trip} onSet={onSet} />
                </div>

                <div id="sec-transport" className="plan-section plan-section-alt">
                  <PlanSectionHeading
                    number={4} icon="🗺️"
                    title="Local Transport"
                    sub={'Getting to and from ' + selectedRace.circuit}
                  />
                  <LocalTransport race={selectedRace} onBack={scrollToNav} />
                </div>

                <div id="sec-itinerary" className="plan-section">
                  <PlanSectionHeading
                    number={5} icon="📋"
                    title="Race Weekend Itinerary"
                    sub={selectedRace.name}
                  />
                  <Itinerary race={selectedRace} onBack={scrollToNav} />
                </div>

                <div id="sec-visa" className="plan-section plan-section-alt">
                  <PlanSectionHeading
                    number={6} icon="🛂"
                    title="Visa & Entry Requirements"
                    sub={'Entry requirements for ' + selectedRace.country}
                  />
                  <VisaChecker race={selectedRace} onBack={scrollToNav} passport={trip.passport} />
                </div>

                <div className="tip-bar">
                  <p>{'💡 '}<strong style={{ color: 'var(--text)', fontWeight: 600 }}>Expert tip:</strong>{' ' + selectedRace.tip}</p>
                </div>
              </div>

              <div className="plan-sidebar">
                <CostPanel
                  race={selectedRace}
                  trip={trip}
                  onSet={onSet}
                  c={c}
                  selectedGrandstand={selectedGrandstand}
                  onClearGrandstand={handleGrandstandClear}
                />
              </div>
            </div>
          </div>
        )}

        <div>
          <div className="section-heading">
            <h2>2026 Season Calendar</h2>
            <span className="race-count">{filtered.length + ' races'}</span>
          </div>
          <div className="race-grid">
            {filtered.map(function (race) {
              return (
                <RaceCard
                  key={race.round}
                  race={race}
                  selected={selectedRound === race.round}
                  onClick={selectRace}
                />
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
