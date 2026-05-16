import React, { useState } from 'react';
import transportData from './transportData';

const ratingConfig = {
  best: { label: 'Best', color: '#22c55e' },
  good: { label: 'Good', color: '#F59E0B' },
  avoid: { label: 'Avoid', color: '#E8002D' }
};

const days = [
  { key: 'friday', label: 'Friday' },
  { key: 'saturday', label: 'Saturday' },
  { key: 'sunday', label: 'Sunday' }
];

export default function LocalTransport({ race, onBack }) {
  const [activeDay, setActiveDay] = useState('sunday');

  const data = transportData[race.name];

  const styles = `
    .lt-wrap {
      padding: 0;
    }
    .lt-back {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: none;
      border: none;
      color: var(--text-muted);
      font-family: 'Barlow', sans-serif;
      font-size: 0.85rem;
      cursor: pointer;
      padding: 0 0 20px 0;
      transition: color 0.2s;
    }
    .lt-back:hover {
      color: var(--text);
    }
    .lt-header {
      margin-bottom: 24px;
    }
    .lt-eyebrow {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--red);
      margin-bottom: 6px;
    }
    .lt-title {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 1.6rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: var(--text);
      margin: 0 0 4px 0;
    }
    .lt-subtitle {
      font-family: 'Barlow', sans-serif;
      font-size: 0.85rem;
      color: var(--text-muted);
    }
    .lt-alert {
      background: rgba(232, 0, 45, 0.1);
      border: 1px solid rgba(232, 0, 45, 0.35);
      border-radius: 8px;
      padding: 12px 16px;
      margin-bottom: 24px;
      display: flex;
      align-items: flex-start;
      gap: 10px;
    }
    .lt-alert-icon {
      font-size: 1rem;
      flex-shrink: 0;
      margin-top: 1px;
    }
    .lt-alert-text {
      font-family: 'Barlow', sans-serif;
      font-size: 0.875rem;
      color: #f87171;
      line-height: 1.5;
    }
    .lt-overview {
      font-family: 'Barlow', sans-serif;
      font-size: 0.9rem;
      color: var(--text-muted);
      line-height: 1.65;
      margin-bottom: 28px;
    }
    .lt-section-label {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--text-dim);
      margin-bottom: 12px;
    }
    .lt-modes {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 28px;
    }
    .lt-mode-card {
      background: var(--surface-2);
      border: 1px solid var(--surface-3);
      border-radius: 10px;
      padding: 14px 16px;
    }
    .lt-mode-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
      gap: 10px;
    }
    .lt-mode-left {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 0;
    }
    .lt-mode-icon {
      font-size: 1.2rem;
      flex-shrink: 0;
    }
    .lt-mode-name {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 1rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: var(--text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .lt-rating-badge {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 0.65rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 3px 8px;
      border-radius: 4px;
      flex-shrink: 0;
    }
    .lt-mode-meta {
      display: flex;
      gap: 16px;
      margin-bottom: 8px;
      flex-wrap: wrap;
    }
    .lt-meta-item {
      display: flex;
      align-items: center;
      gap: 5px;
      font-family: 'Barlow', sans-serif;
      font-size: 0.8rem;
      color: var(--text-muted);
    }
    .lt-meta-dot {
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: var(--text-dim);
      flex-shrink: 0;
    }
    .lt-mode-notes {
      font-family: 'Barlow', sans-serif;
      font-size: 0.82rem;
      color: var(--text-muted);
      line-height: 1.55;
    }
    .lt-day-tabs {
      display: flex;
      gap: 6px;
      margin-bottom: 14px;
    }
    .lt-day-tab {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 7px 14px;
      border-radius: 6px;
      border: 1px solid var(--surface-3);
      background: var(--surface-2);
      color: var(--text-muted);
      cursor: pointer;
      transition: all 0.15s;
    }
    .lt-day-tab:hover {
      color: var(--text);
      border-color: var(--text-dim);
    }
    .lt-day-tab.active {
      background: var(--red);
      border-color: var(--red);
      color: #fff;
    }
    .lt-day-content {
      background: var(--surface-2);
      border: 1px solid var(--surface-3);
      border-radius: 10px;
      padding: 14px 16px;
      margin-bottom: 28px;
    }
    .lt-day-text {
      font-family: 'Barlow', sans-serif;
      font-size: 0.875rem;
      color: var(--text-muted);
      line-height: 1.65;
    }
    .lt-tips {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 12px;
    }
    .lt-tip {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      background: var(--surface-2);
      border: 1px solid var(--surface-3);
      border-radius: 8px;
      padding: 12px 14px;
    }
    .lt-tip-bullet {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--red);
      flex-shrink: 0;
      margin-top: 7px;
    }
    .lt-tip-text {
      font-family: 'Barlow', sans-serif;
      font-size: 0.84rem;
      color: var(--text-muted);
      line-height: 1.55;
    }
    .lt-no-data {
      background: var(--surface-2);
      border: 1px solid var(--surface-3);
      border-radius: 10px;
      padding: 40px 24px;
      text-align: center;
    }
    .lt-no-data-text {
      font-family: 'Barlow', sans-serif;
      font-size: 0.9rem;
      color: var(--text-muted);
    }
  `;

  if (!data) {
    return (
      <div className="lt-wrap">
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        <button className="lt-back" onClick={onBack}>
          ← Back
        </button>
        <div className="lt-no-data">
          <p className="lt-no-data-text">Transport information for this race is coming soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lt-wrap">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <button className="lt-back" onClick={onBack}>
        ← Back
      </button>

      <div className="lt-header">
        <div className="lt-eyebrow">Local Transport</div>
        <h2 className="lt-title">{race.name}</h2>
        <div className="lt-subtitle">{race.circuit} · {race.city}</div>
      </div>

      {data.alert && (
        <div className="lt-alert">
          <span className="lt-alert-icon">⚠️</span>
          <span className="lt-alert-text">{data.alert}</span>
        </div>
      )}

      <p className="lt-overview">{data.overview}</p>

      <div className="lt-section-label">Getting There</div>
      <div className="lt-modes">
        {data.modes.map(function(mode, i) {
          var cfg = ratingConfig[mode.rating] || ratingConfig.good;
          return (
            <div className="lt-mode-card" key={i}>
              <div className="lt-mode-top">
                <div className="lt-mode-left">
                  <span className="lt-mode-icon">{mode.icon}</span>
                  <span className="lt-mode-name">{mode.name}</span>
                </div>
                <span
                  className="lt-rating-badge"
                  style={{
                    background: cfg.color + '22',
                    color: cfg.color,
                    border: '1px solid ' + cfg.color + '55'
                  }}
                >
                  {cfg.label}
                </span>
              </div>
              <div className="lt-mode-meta">
                <span className="lt-meta-item">💰 {mode.cost}</span>
                <span className="lt-meta-dot" />
                <span className="lt-meta-item">⏱ {mode.time}</span>
              </div>
              <div className="lt-mode-notes">{mode.notes}</div>
            </div>
          );
        })}
      </div>

      <div className="lt-section-label">Day by Day</div>
      <div className="lt-day-tabs">
        {days.map(function(d) {
          return (
            <button
              key={d.key}
              className={'lt-day-tab' + (activeDay === d.key ? ' active' : '')}
              onClick={function() { setActiveDay(d.key); }}
            >
              {d.label}
            </button>
          );
        })}
      </div>
      <div className="lt-day-content">
        <p className="lt-day-text">{data.byDay[activeDay]}</p>
      </div>

      <div className="lt-section-label">Tips &amp; Quirks</div>
      <div className="lt-tips">
        {data.tips.map(function(tip, i) {
          return (
            <div className="lt-tip" key={i}>
              <div className="lt-tip-bullet" />
              <span className="lt-tip-text">{tip}</span>
            </div>
          );
        })}
      </div>

    </div>
  );
}
