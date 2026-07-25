import { useState, useEffect, useRef } from 'react'

const sections = [
  { id: 'sec-grandstands', icon: '🏟️', label: 'Grandstands' },
  { id: 'sec-flights', icon: '✈️', label: 'Flights' },
  { id: 'sec-accom', icon: '🏨', label: 'Hotels' },
  { id: 'sec-transport', icon: '🗺️', label: 'Transport' },
  { id: 'sec-itinerary', icon: '📋', label: 'Itinerary' },
  { id: 'sec-visa', icon: '🛂', label: 'Visa' },
]

export default function SectionNav({ navRef }) {
  var [active, setActive] = useState(null)
  var visibleMapRef = useRef({})

  useEffect(function() {
    var elements = sections
      .map(function(s) { return document.getElementById(s.id) })
      .filter(Boolean)

    if (elements.length === 0) return undefined

    var observer = new IntersectionObserver(
      function(entries) {
        entries.forEach(function(entry) {
          visibleMapRef.current[entry.target.id] = entry.isIntersecting
        })
        var currentlyVisible = sections.filter(function(s) {
          return visibleMapRef.current[s.id]
        })
        if (currentlyVisible.length > 0) {
          setActive(currentlyVisible[0].id)
        }
      },
      { rootMargin: '-150px 0px -65% 0px', threshold: 0 }
    )

    elements.forEach(function(el) { observer.observe(el) })

    return function() { observer.disconnect() }
  }, [])

  function scrollTo(id) {
    var el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="section-nav-row" ref={navRef}>
      {sections.map(function (s) {
        var isActive = active === s.id
        return (
          <button
            key={s.id}
            className={'section-nav-btn' + (isActive ? ' active' : '')}
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
