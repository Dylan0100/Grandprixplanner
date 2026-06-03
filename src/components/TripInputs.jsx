import { departureCities, passports } from '../data/racesData'

export default function TripInputs({ trip, onSet }) {
  function handleCityChange(e) {
    if (!e.target.value) { onSet('departureCity', null); return }
    for (var i = 0; i < departureCities.length; i++) {
      var found = departureCities[i].cities.find(function (c) { return c.label === e.target.value })
      if (found) { onSet('departureCity', found); return }
    }
  }

  return (
    <div className="trip-inputs">
      <div className="trip-inputs-eyebrow">Your Trip Details</div>
      <div className="trip-inputs-row">

        <div className="trip-input-group trip-input-wide">
          <label className="trip-input-label">Flying from</label>
          <select
            className="trip-select"
            value={trip.departureCity ? trip.departureCity.label : ''}
            onChange={handleCityChange}
          >
            <option value="">Select city or airport...</option>
            {departureCities.map(function (g) {
              return (
                <optgroup key={g.group} label={g.group}>
                  {g.cities.map(function (city) {
                    return <option key={city.label} value={city.label}>{city.label}</option>
                  })}
                </optgroup>
              )
            })}
          </select>
        </div>

        <div className="trip-input-group trip-input-wide">
          <label className="trip-input-label">Passport / nationality</label>
          <select
            className="trip-select"
            value={trip.passport || ''}
            onChange={function (e) { onSet('passport', e.target.value || null) }}
          >
            <option value="">Select nationality...</option>
            {passports.map(function (p) {
              return <option key={p.id} value={p.id}>{p.label}</option>
            })}
          </select>
        </div>

        <div className="trip-input-group">
          <label className="trip-input-label">Party size</label>
          <div className="trip-party-row">
            {[1, 2, 3, 4].map(function (n) {
              return (
                <button
                  key={n}
                  className={'trip-party-btn' + (trip.party === n ? ' active' : '')}
                  onClick={function () { onSet('party', n) }}
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
  )
}
