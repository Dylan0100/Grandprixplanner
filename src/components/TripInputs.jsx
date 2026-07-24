import { useState, useEffect, useRef } from 'react'
import { departureCities, passports } from '../data/racesData'

const styles = `
  .ti-dropdown { position: relative; width: 100%; }
  .ti-trigger {
    width: 100%;
    background: var(--surface-3);
    border: 1px solid var(--border-md);
    color: var(--text);
    padding: 10px 36px 10px 14px;
    border-radius: 8px;
    font-family: 'Barlow', sans-serif;
    font-size: 14px;
    cursor: pointer;
    text-align: left;
    transition: border-color 0.15s;
    display: flex;
    align-items: center;
    gap: 8px;
    line-height: 1.4;
  }
  .ti-trigger:focus { outline: none; border-color: rgba(232,0,45,0.5); }
  .ti-trigger.placeholder { color: var(--text-dim); }
  .ti-trigger-label {
    flex: 1;
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .ti-filled-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #22C55E;
    box-shadow: 0 0 0 3px rgba(34,197,94,0.15);
    flex-shrink: 0;
  }
  .ti-arrow {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: var(--text-muted);
    font-size: 10px;
    transition: transform 0.15s;
  }
  .ti-arrow.open { transform: translateY(-50%) rotate(180deg); }
  .ti-menu {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    background: var(--surface-3);
    border: 1px solid var(--border-md);
    border-radius: 8px;
    z-index: 200;
    max-height: 240px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--surface-4) transparent;
    box-shadow: 0 8px 24px rgba(0,0,0,0.4);
  }
  .ti-menu::-webkit-scrollbar { width: 4px; }
  .ti-menu::-webkit-scrollbar-track { background: transparent; }
  .ti-menu::-webkit-scrollbar-thumb { background: var(--surface-4); border-radius: 2px; }
  .ti-group-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--text-dim);
    padding: 10px 14px 4px;
  }
  .ti-option {
    padding: 8px 14px;
    font-family: 'Barlow', sans-serif;
    font-size: 13px;
    color: var(--text-muted);
    cursor: pointer;
    transition: background 0.1s, color 0.1s;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .ti-option:hover { background: var(--surface-4); color: var(--text); }
  .ti-option.selected { color: var(--text); background: rgba(232,0,45,0.08); }
  .ti-divider { height: 1px; background: var(--border); margin: 4px 0; }
`

function CustomSelect({ placeholder, value, onChange, groups, flat }) {
  var [open, setOpen] = useState(false)
  var ref = useRef(null)

  useEffect(function() {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return function() { document.removeEventListener('mousedown', handleClick) }
  }, [])

  function handleSelect(val) {
    onChange(val)
    setOpen(false)
  }

  var displayLabel = placeholder
  if (value && groups) {
    for (var i = 0; i < groups.length; i++) {
      var found = groups[i].cities.find(function(c) { return c.label === value })
      if (found) { displayLabel = found.label; break }
    }
  }
  if (value && flat) {
    var flatFound = flat.find(function(p) { return p.id === value })
    if (flatFound) displayLabel = flatFound.label
  }

  return (
    <div className="ti-dropdown" ref={ref}>
      <button
        className={'ti-trigger' + (!value ? ' placeholder' : '')}
        onClick={function() { setOpen(function(o) { return !o }) }}
      >
        {value && <span className="ti-filled-dot gp-reveal" aria-hidden="true" />}
        <span className="ti-trigger-label">{displayLabel}</span>
      </button>
      <span className={'ti-arrow' + (open ? ' open' : '')}>▼</span>
      {open && (
        <div className="ti-menu">
          <div
            className={'ti-option' + (!value ? ' selected' : '')}
            onClick={function() { handleSelect('') }}
          >
            {placeholder}
          </div>
          <div className="ti-divider" />
          {groups && groups.map(function(g, gi) {
            return (
              <div key={g.group}>
                {gi > 0 && <div className="ti-divider" />}
                <div className="ti-group-label">{g.group}</div>
                {g.cities.map(function(city) {
                  return (
                    <div
                      key={city.label}
                      className={'ti-option' + (value === city.label ? ' selected' : '')}
                      onClick={function() { handleSelect(city.label) }}
                    >
                      {city.label}
                    </div>
                  )
                })}
              </div>
            )
          })}
          {flat && flat.map(function(p) {
            return (
              <div
                key={p.id}
                className={'ti-option' + (value === p.id ? ' selected' : '')}
                onClick={function() { handleSelect(p.id) }}
              >
                {p.label}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function TripInputs({ trip, onSet }) {
  function handleCityChange(val) {
    if (!val) { onSet('departureCity', null); return }
    for (var i = 0; i < departureCities.length; i++) {
      var found = departureCities[i].cities.find(function(c) { return c.label === val })
      if (found) { onSet('departureCity', found); return }
    }
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="trip-inputs">
        <div className="trip-inputs-eyebrow">Your Trip Details</div>
        <div className="trip-inputs-row">
          <div className="trip-input-group trip-input-wide">
            <label className="trip-input-label">Flying from</label>
            <CustomSelect
              placeholder="Select city or airport..."
              value={trip.departureCity ? trip.departureCity.label : ''}
              onChange={handleCityChange}
              groups={departureCities}
            />
          </div>
          <div className="trip-input-group trip-input-wide">
            <label className="trip-input-label">Passport / nationality</label>
            <CustomSelect
              placeholder="Select nationality..."
              value={trip.passport || ''}
              onChange={function(val) { onSet('passport', val || null) }}
              flat={passports}
            />
          </div>
          <div className="trip-input-group">
            <label className="trip-input-label">Party size</label>
            <div className="trip-party-row">
              {[1, 2, 3, 4].map(function(n) {
                return (
                  <button
                    key={n}
                    className={'trip-party-btn' + (trip.party === n ? ' active' : '')}
                    onClick={function() { onSet('party', n) }}
                  >
                    {n}{n === 4 ? '+' : ''}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
        <div className="trip-inputs-note">
          All fields optional — fill in what you know to personalise cost estimates and visa information
        </div>
      </div>
    </>
  )
}
