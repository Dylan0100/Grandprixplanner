import React from 'react';
import flightData from './flightData';

export default function FlightGuide({ race, onBack }) {
  const data = flightData[race ? race.name : ''];

  const s = {
    wrap: {
      padding: '0',
      fontFamily: "'Barlow', sans-serif",
      color: 'var(--text)',
    },
    backBtn: {
      background: 'none',
      border: 'none',
      color: 'var(--text-muted)',
      cursor: 'pointer',
      fontSize: '0.875rem',
      padding: '0 0 1.25rem 0',
      display: 'flex',
      alignItems: 'center',
      gap: '0.375rem',
      fontFamily: "'Barlow', sans-serif",
    },
    header: {
      marginBottom: '1.5rem',
    },
    headerLabel: {
      fontFamily: "'Barlow Condensed', sans-serif",
      fontSize: '0.7rem',
      fontWeight: '700',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      marginBottom: '0.25rem',
    },
    headerTitle: {
      fontFamily: "'Barlow Condensed', sans-serif",
      fontSize: '1.5rem',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '0.04em',
      color: 'var(--text)',
      margin: '0 0 0.2rem 0',
    },
    headerSub: {
      fontSize: '0.875rem',
      color: 'var(--text-muted)',
      margin: '0',
    },
    fareTag: {
      display: 'inline-block',
      marginTop: '0.75rem',
      background: 'var(--surface-3)',
      border: '1px solid var(--surface-3)',
      borderRadius: '6px',
      padding: '0.4rem 0.75rem',
      fontSize: '0.8rem',
      color: 'var(--text)',
      fontWeight: '600',
    },
    card: {
      background: 'var(--surface-2)',
      border: '1px solid var(--surface-3)',
      borderRadius: '10px',
      padding: '1rem 1.125rem',
      marginBottom: '0.75rem',
    },
    cardTitle: {
      fontFamily: "'Barlow Condensed', sans-serif",
      fontSize: '0.7rem',
      fontWeight: '700',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      marginBottom: '0.6rem',
    },
    airportCode: {
      fontFamily: "'Barlow Condensed', sans-serif",
      fontSize: '1.2rem',
      fontWeight: '700',
      color: 'var(--text)',
      letterSpacing: '0.06em',
    },
    airportName: {
      fontSize: '0.875rem',
      color: 'var(--text)',
      fontWeight: '500',
      marginBottom: '0.25rem',
    },
    transferTime: {
      fontSize: '0.8rem',
      color: 'var(--text-muted)',
      marginBottom: '0.75rem',
    },
    transferList: {
      listStyle: 'none',
      padding: '0',
      margin: '0',
    },
    transferItem: {
      fontSize: '0.82rem',
      color: 'var(--text-muted)',
      padding: '0.3rem 0',
      borderBottom: '1px solid var(--surface-3)',
      display: 'flex',
      gap: '0.5rem',
      alignItems: 'flex-start',
    },
    bullet: {
      color: 'var(--red)',
      flexShrink: '0',
      marginTop: '1px',
      fontSize: '0.7rem',
    },
    avoidBox: {
      background: 'rgba(232,0,45,0.08)',
      border: '1px solid rgba(232,0,45,0.25)',
      borderRadius: '7px',
      padding: '0.5rem 0.75rem',
      fontSize: '0.8rem',
      color: '#ff6b6b',
      marginTop: '0.75rem',
    },
    secondaryBox: {
      background: 'var(--surface-3)',
      borderRadius: '7px',
      padding: '0.5rem 0.75rem',
      fontSize: '0.8rem',
      color: 'var(--text-muted)',
      marginTop: '0.75rem',
      lineHeight: '1.5',
    },
    routeRow: {
      fontSize: '0.875rem',
      color: 'var(--text)',
      marginBottom: '0.5rem',
      lineHeight: '1.5',
    },
    routeLabel: {
      fontSize: '0.75rem',
      color: 'var(--text-muted)',
      marginBottom: '0.15rem',
      fontWeight: '500',
    },
    directBadge: {
      display: 'inline-block',
      padding: '0.2rem 0.55rem',
      borderRadius: '4px',
      fontSize: '0.72rem',
      fontWeight: '700',
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },
    hubPills: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.4rem',
      marginTop: '0.3rem',
    },
    hubPill: {
      background: 'var(--surface-3)',
      borderRadius: '4px',
      padding: '0.2rem 0.55rem',
      fontSize: '0.75rem',
      color: 'var(--text-muted)',
    },
    bookingGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '0.5rem',
    },
    bookingRow: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.625rem',
    },
    bookingDot: {
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      flexShrink: '0',
      marginTop: '4px',
    },
    bookingText: {
      fontSize: '0.82rem',
      lineHeight: '1.45',
    },
    bookingLabel: {
      fontWeight: '600',
      color: 'var(--text)',
    },
    bookingDesc: {
      color: 'var(--text-muted)',
      display: 'block',
      marginTop: '0.1rem',
    },
    tipList: {
      listStyle: 'none',
      padding: '0',
      margin: '0',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.45rem',
    },
    tipItem: {
      display: 'flex',
      gap: '0.5rem',
      fontSize: '0.82rem',
      color: 'var(--text-muted)',
      lineHeight: '1.5',
      alignItems: 'flex-start',
    },
    airlineList: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.4rem',
    },
    airlinePill: {
      background: 'var(--surface-3)',
      border: '1px solid rgba(244,244,246,0.08)',
      borderRadius: '5px',
      padding: '0.25rem 0.6rem',
      fontSize: '0.78rem',
      color: 'var(--text)',
      fontWeight: '500',
    },
    noData: {
      padding: '2rem 0',
      textAlign: 'center',
      color: 'var(--text-muted)',
      fontSize: '0.875rem',
    },
  };

  if (!data) {
    return (
      <div style={s.wrap}>
        <button onClick={onBack} style={s.backBtn}>
          ← Back to modules
        </button>
        <div style={s.noData}>
          <p>Flight guide for {race ? race.name : 'this race'} is coming soon.</p>
        </div>
      </div>
    );
  }

  const isDirect = data.ukRouting.directAvailable;

  return (
    <div style={s.wrap}>
      <button onClick={onBack} style={s.backBtn}>
        ← Back to modules
      </button>

      {/* Header */}
      <div style={s.header}>
        <div style={s.headerLabel}>✈ Flight Guide</div>
        <h2 style={s.headerTitle}>{race.name}</h2>
        <p style={s.headerSub}>{data.destination}</p>
        {data.typicalFareRange && (
          <div style={s.fareTag}>
            {'Typical return from UK: ' + data.typicalFareRange}
          </div>
        )}
      </div>

      {/* Airport & Transfers */}
      <div style={s.card}>
        <div style={s.cardTitle}>Best Airport</div>
        {data.primaryAirport.code && (
          <div style={{ ...s.airportCode, marginBottom: '0.15rem' }}>
            {data.primaryAirport.code}
          </div>
        )}
        <div style={s.airportName}>{data.primaryAirport.name}</div>
        <div style={s.transferTime}>{data.primaryAirport.transferTime}</div>
        <ul style={s.transferList}>
          {data.primaryAirport.transferOptions.map(function(opt, i) {
            return (
              <li key={i} style={s.transferItem}>
                <span style={s.bullet}>›</span>
                <span>{opt}</span>
              </li>
            );
          })}
        </ul>
        {data.avoidAirport && (
          <div style={s.avoidBox}>
            {'⚠ ' + data.avoidAirport}
          </div>
        )}
        {data.secondaryOption && (
          <div style={s.secondaryBox}>
            {'Also consider: ' + data.secondaryOption}
          </div>
        )}
      </div>

      {/* UK Routing */}
      <div style={s.card}>
        <div style={s.cardTitle}>Getting There from the UK</div>
        <div style={{ marginBottom: '0.75rem' }}>
          <div style={s.routeLabel}>Typical route</div>
          <div style={s.routeRow}>{data.ukRouting.typicalRoute}</div>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
          <div>
            <div style={s.routeLabel}>Total travel time</div>
            <div style={{ ...s.routeRow, marginBottom: '0' }}>{data.ukRouting.totalTravelTime}</div>
          </div>
          <div>
            <div style={s.routeLabel}>Direct flight</div>
            <div>
              <span style={{
                ...s.directBadge,
                background: isDirect ? 'rgba(34,197,94,0.12)' : 'rgba(107,107,128,0.15)',
                color: isDirect ? '#4ade80' : 'var(--text-muted)',
              }}>
                {isDirect ? '✓ Available' : '✗ Connection required'}
              </span>
            </div>
          </div>
        </div>
        {data.ukRouting.commonHubs && data.ukRouting.commonHubs.length > 0 && (
          <div>
            <div style={s.routeLabel}>{isDirect ? 'Also via hub' : 'Common connecting hubs'}</div>
            <div style={s.hubPills}>
              {data.ukRouting.commonHubs.map(function(hub, i) {
                return <span key={i} style={s.hubPill}>{hub}</span>;
              })}
            </div>
          </div>
        )}
      </div>

      {/* Recommended Airlines */}
      {data.recommendedAirlines && data.recommendedAirlines.length > 0 && (
        <div style={s.card}>
          <div style={s.cardTitle}>Recommended Airlines</div>
          <div style={s.airlineList}>
            {data.recommendedAirlines.map(function(airline, i) {
              return <span key={i} style={s.airlinePill}>{airline}</span>;
            })}
          </div>
        </div>
      )}

      {/* When to Book */}
      <div style={s.card}>
        <div style={s.cardTitle}>When to Book</div>
        <div style={s.bookingGrid}>
          <div style={s.bookingRow}>
            <div style={{ ...s.bookingDot, background: '#4ade80' }} />
            <div style={s.bookingText}>
              <span style={s.bookingLabel}>Ideal: </span>
              <span style={{ color: 'var(--text)' }}>{data.bookingWindow.ideal}</span>
            </div>
          </div>
          <div style={s.bookingRow}>
            <div style={{ ...s.bookingDot, background: 'var(--amber)' }} />
            <div style={s.bookingText}>
              <span style={s.bookingLabel}>Acceptable: </span>
              <span style={{ color: 'var(--text)' }}>{data.bookingWindow.acceptable}</span>
            </div>
          </div>
          <div style={s.bookingRow}>
            <div style={{ ...s.bookingDot, background: 'var(--red)' }} />
            <div style={s.bookingText}>
              <span style={{ ...s.bookingLabel, color: 'var(--red)' }}>Last minute: </span>
              <span style={{ color: 'var(--text-muted)', display: 'block', marginTop: '0.1rem', fontSize: '0.82rem', lineHeight: '1.45' }}>
                {data.bookingWindow.lastMinuteRisk}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Tips */}
      <div style={s.card}>
        <div style={s.cardTitle}>Pricing Tips</div>
        <ul style={s.tipList}>
          {data.pricingTips.map(function(tip, i) {
            return (
              <li key={i} style={s.tipItem}>
                <span style={{ color: 'var(--amber)', flexShrink: '0' }}>→</span>
                <span>{tip}</span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Destination Notes */}
      <div style={s.card}>
        <div style={s.cardTitle}>Destination Notes</div>
        <ul style={s.tipList}>
          {data.destinationNotes.map(function(note, i) {
            return (
              <li key={i} style={s.tipItem}>
                <span style={{ color: 'var(--text-dim)', flexShrink: '0' }}>·</span>
                <span>{note}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
