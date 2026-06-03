const sections = [
  { id: 'sec-grandstands', icon: '🏟️', label: 'Grandstands' },
  { id: 'sec-flights', icon: '✈️', label: 'Flights' },
  { id: 'sec-accom', icon: '🏨', label: 'Hotels' },
  { id: 'sec-transport', icon: '🗺️', label: 'Transport' },
  { id: 'sec-itinerary', icon: '📋', label: 'Itinerary' },
  { id: 'sec-visa', icon: '🛂', label: 'Visa' },
]

export default function SectionNav({ navRef }) {
  function scrollTo(id) {
    var el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="section-nav-row" ref={navRef}>
      {sections.map(function (s) {
        return (
          <button
            key={s.id}
            className="section-nav-btn"
            onClick={function () { scrollTo(s.id) }}
          >
            <span className="snb-icon">{s.icon}</span>
            <span className="snb-label">{s.label}</span>
          </button>
        )
      })}
    </div>
  )
}
