import { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

async function subscribeEmail(email) {
  const response = await fetch('/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  })
  if (response.ok) return true
  const errorData = await response.json().catch(() => ({}))
  throw new Error(errorData.error || `Signup error: ${response.status}`)
}

function EmailForm({ buttonText }) {
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await subscribeEmail(email)
      setSuccess(true)
    } catch (err) {
      console.error(err)
      setError('There was an issue signing you up. Please try again, or email hello@grandprixplanner.com.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return <div className="lp-success-msg">&#10003; &nbsp;You're on the list — race guides and planning tips on their way.</div>
  }

  return (
    <div>
      <form className="lp-signup-form" onSubmit={handleSubmit}>
        <input type="email" placeholder="your@email.com" required aria-label="Email address" value={email} onChange={e => setEmail(e.target.value)} />
        <button type="submit" disabled={loading}>{loading ? 'Signing up...' : buttonText}</button>
      </form>
      {error && <div className="lp-error-msg">{error}</div>}
    </div>
  )
}

const compactFeatures = [
  { icon: '🏁', label: 'Grandstands' },
  { icon: '✈️', label: 'Flights' },
  { icon: '🏨', label: 'Hotels' },
  { icon: '🛂', label: 'Visas' },
  { icon: '🗺️', label: 'Transport' },
  { icon: '📋', label: 'Itinerary' },
]

const routeStops = [
  { pos: 0,   label: 'Australia',  side: 'above' },
  { pos: 3,   label: null },
  { pos: 8,   label: 'Suzuka',     side: 'below', minor: true },
  { pos: 21,  label: null },
  { pos: 28,  label: null },
  { pos: 34,  label: 'Monaco',     side: 'above', minor: true },
  { pos: 36,  label: null },
  { pos: 41,  label: null },
  { pos: 44,  label: 'Silverstone',side: 'below' },
  { pos: 49,  label: 'Spa',        side: 'above', minor: true },
  { pos: 51,  label: null },
  { pos: 61,  label: null },
  { pos: 67,  label: 'Monza',      side: 'below', minor: true },
  { pos: 70,  label: null },
  { pos: 72,  label: null },
  { pos: 77,  label: 'Singapore',  side: 'above' },
  { pos: 85,  label: null },
  { pos: 87,  label: null },
  { pos: 90,  label: null },
  { pos: 95,  label: null },
  { pos: 97,  label: null },
  { pos: 100, label: 'Abu Dhabi',  side: 'below' },
]

const circuitPath = 'M 72.1,119.7 C 60.3,144.1 60.6,147.9 51.6,190.0 C 42.6,232.2 40.0,238.5 40.0,270.2 C 40.0,301.8 37.4,282.9 51.6,303.1 C 65.8,323.3 74.5,330.3 90.8,342.3 C 107.0,354.3 101.0,347.9 109.5,345.9 C 117.9,343.9 118.3,341.7 121.0,335.2 C 123.8,328.7 126.5,334.7 119.2,322.7 C 112.0,310.7 98.4,307.4 95.2,292.4 C 92.0,277.5 64.3,299.2 107.7,269.3 C 151.1,239.4 200.5,211.8 250.1,185.6 C 299.8,159.4 271.2,177.3 284.9,175.8 C 298.6,174.3 292.4,176.0 299.1,180.2 C 305.8,184.5 306.7,185.7 308.9,190.9 C 311.1,196.2 312.9,194.2 307.1,198.9 C 301.4,203.7 295.4,202.4 288.4,207.8 C 281.4,213.3 279.2,197.8 282.2,218.5 C 285.2,239.2 294.6,258.6 299.1,281.7 C 303.6,304.9 302.2,285.1 298.2,301.3 C 294.2,317.5 288.6,322.9 284.9,339.6 C 281.1,356.3 279.4,344.8 284.9,361.0 C 290.3,377.2 280.8,362.1 304.5,397.5 C 328.1,432.9 345.5,459.3 369.5,487.4 C 393.4,515.6 376.5,496.1 389.9,498.1 C 403.4,500.1 400.1,507.5 417.5,494.6 C 435.0,481.6 418.4,472.3 452.3,451.8 C 486.2,431.4 509.2,434.5 538.6,421.5 C 568.0,408.6 551.3,415.0 557.3,405.5 C 563.3,396.0 563.0,400.2 560.0,387.7 C 557.0,375.2 591.0,411.9 546.6,361.0 C 502.3,310.1 452.1,266.1 401.5,206.1 C 350.9,146.0 387.3,163.9 365.9,146.4 C 344.4,129.0 350.1,150.2 324.9,143.7 C 299.8,137.3 300.6,129.5 276.0,123.3 C 251.3,117.0 274.2,127.5 236.8,121.5 C 199.4,115.5 182.5,107.1 142.4,101.9 C 102.3,96.6 113.1,97.8 93.4,102.8 C 73.7,107.8 83.8,95.3 72.1,119.7'

const styles = `
/* ─── HERO ─── */
.lp-hero {
  position: relative;
  text-align: center;
  padding: 150px 24px 110px;
  overflow: hidden;
  background: radial-gradient(ellipse 75% 60% at 50% -10%, rgba(232,0,45,0.18) 0%, transparent 60%);
}
.lp-hero-line {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 620px;
  height: 620px;
  transform: translate(-50%, -50%);
  pointer-events: none;
}
.lp-hero-inner { position: relative; z-index: 1; max-width: 640px; margin: 0 auto; }
.lp-lights { display: flex; gap: 12px; justify-content: center; margin-bottom: 22px; }
.lp-light {
  width: 10px; height: 10px; border-radius: 50%;
  background: var(--text-dim);
  animation-duration: 4.4s;
  animation-iteration-count: infinite;
  animation-timing-function: steps(1, end);
}
.lp-light:nth-child(1) { animation-name: lpL1; }
.lp-light:nth-child(2) { animation-name: lpL2; }
.lp-light:nth-child(3) { animation-name: lpL3; }
.lp-light:nth-child(4) { animation-name: lpL4; }
.lp-light:nth-child(5) { animation-name: lpL5; }
@keyframes lpL1 { 0%,50%{background:var(--text-dim);box-shadow:none} 55%,95%{background:var(--red);box-shadow:0 0 8px rgba(232,0,45,0.6)} 100%{background:var(--text-dim);box-shadow:none} }
@keyframes lpL2 { 0%,58%{background:var(--text-dim);box-shadow:none} 63%,95%{background:var(--red);box-shadow:0 0 8px rgba(232,0,45,0.6)} 100%{background:var(--text-dim);box-shadow:none} }
@keyframes lpL3 { 0%,66%{background:var(--text-dim);box-shadow:none} 71%,95%{background:var(--red);box-shadow:0 0 8px rgba(232,0,45,0.6)} 100%{background:var(--text-dim);box-shadow:none} }
@keyframes lpL4 { 0%,74%{background:var(--text-dim);box-shadow:none} 79%,95%{background:var(--red);box-shadow:0 0 8px rgba(232,0,45,0.6)} 100%{background:var(--text-dim);box-shadow:none} }
@keyframes lpL5 { 0%,82%{background:var(--text-dim);box-shadow:none} 87%,95%{background:var(--red);box-shadow:0 0 8px rgba(232,0,45,0.6)} 100%{background:var(--text-dim);box-shadow:none} }
@media (prefers-reduced-motion: reduce) {
  .lp-light { animation: none; background: var(--red); }
}
.lp-badge {
  display: inline-flex; align-items: center; gap: 6px;
  background: rgba(232,0,45,0.1);
  border: 1px solid rgba(232,0,45,0.28);
  color: #ff4d6d;
  padding: 6px 16px; border-radius: 100px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 12px; font-weight: 700;
  letter-spacing: 0.1em; text-transform: uppercase;
  margin-bottom: 28px;
}
.lp-hero h1 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(48px, 8vw, 88px);
  font-weight: 400; line-height: 0.95;
  letter-spacing: 0.02em; text-transform: uppercase;
  margin: 0 0 24px;
}
.lp-hero h1 .lp-accent { color: var(--red); }
.lp-hero p {
  font-size: clamp(15px, 2vw, 17px);
  color: var(--text-muted); max-width: 460px;
  margin: 0 auto 36px; line-height: 1.65;
}
.lp-hero-cta {
  display: inline-block; background: var(--red); color: #fff;
  padding: 16px 34px; border-radius: 8px;
  font-family: 'Barlow', sans-serif; font-size: 16px; font-weight: 600;
  text-decoration: none; margin-bottom: 14px; transition: background 0.15s;
}
.lp-hero-cta:hover { background: var(--red-dark); }
.lp-hero-trust { font-size: 13px; color: var(--text-dim); }

/* ─── SHARED ─── */
.lp-section { max-width: 1100px; margin: 0 auto; padding: 100px 24px; }
.lp-divider { border: none; border-top: 1px solid var(--border); margin: 0; }
.lp-label {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 11px; text-transform: uppercase;
  letter-spacing: 0.16em; color: var(--red); font-weight: 700; margin-bottom: 16px;
}
.lp-label::before { content: ''; width: 20px; height: 2px; background: var(--red); border-radius: 1px; }
.lp-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(34px, 5vw, 54px); font-weight: 400;
  text-transform: uppercase; letter-spacing: 0.02em; line-height: 1; margin: 0 0 20px;
}
.lp-sub { font-size: 16px; color: var(--text-muted); max-width: 480px; line-height: 1.65; margin: 0; }

/* ─── PROBLEM ─── */
.lp-problem { text-align: center; }
.lp-problem .lp-label, .lp-problem .lp-title { justify-content: center; }
.lp-problem .lp-sub { margin: 0 auto; }
.lp-tabs-visual { display: flex; align-items: center; justify-content: center; gap: 24px; margin: 48px 0 32px; }
.lp-tab-stack { position: relative; width: 130px; height: 70px; }
.lp-tab {
  position: absolute; width: 80px; height: 52px;
  background: var(--surface); border: 1px solid var(--border-md);
  border-top: 3px solid var(--text-dim); border-radius: 6px 6px 4px 4px;
}
.lp-arrow { color: var(--text-dim); font-size: 26px; }
.lp-dest {
  width: 52px; height: 52px; background: var(--red); border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Bebas Neue', sans-serif; color: #fff; font-size: 18px;
}
.lp-caption { font-size: 15px; color: var(--text-muted); max-width: 420px; margin: 0 auto; line-height: 1.6; }

/* ─── FEATURES ─── */
.lp-feature-hero {
  display: flex; align-items: center; gap: 48px;
  background: var(--surface); border: 1px solid var(--border-md);
  border-radius: 14px; padding: 44px; margin-top: 56px;
}
.lp-feature-hero-text { flex: 1; min-width: 0; }
.lp-feature-hero-eyebrow {
  font-family: 'Barlow Condensed', sans-serif; font-size: 11px;
  color: var(--red); font-weight: 700; letter-spacing: 0.14em;
  text-transform: uppercase; margin-bottom: 12px;
}
.lp-feature-hero h3 {
  font-family: 'Bebas Neue', sans-serif; font-size: 30px; font-weight: 400;
  text-transform: uppercase; letter-spacing: 0.02em; margin: 0 0 14px;
}
.lp-feature-hero p { font-size: 15px; color: var(--text-muted); line-height: 1.65; margin: 0; max-width: 400px; }
.lp-feature-hero-visual { flex: 0 0 280px; }
.lp-mini-panel { background: var(--surface-2); border: 1px solid var(--border); border-radius: 10px; padding: 22px; }
.lp-mini-total-label {
  font-family: 'Barlow Condensed', sans-serif; font-size: 10px;
  text-transform: uppercase; letter-spacing: 0.12em; color: var(--text-dim); font-weight: 700; margin-bottom: 6px;
}
.lp-mini-total { font-family: 'Bebas Neue', sans-serif; font-size: 38px; color: var(--text); margin-bottom: 14px; }
.lp-mini-bar { display: flex; gap: 2px; height: 8px; border-radius: 4px; overflow: hidden; margin-bottom: 12px; }
.lp-mini-seg { height: 100%; }
.lp-mini-key { display: flex; flex-wrap: wrap; gap: 10px; }
.lp-mini-key-item { display: flex; align-items: center; gap: 6px; font-size: 11px; color: var(--text-muted); }
.lp-mini-key-dot { width: 7px; height: 7px; border-radius: 50%; display: inline-block; }
.lp-feature-strip {
  display: grid; grid-template-columns: repeat(6, 1fr);
  gap: 1px; margin-top: 2px;
  background: var(--border); border: 1px solid var(--border);
  border-radius: 12px; overflow: hidden; list-style: none; padding: 0;
}
.lp-feature-chip {
  background: var(--surface); padding: 26px 16px;
  display: flex; flex-direction: column; align-items: center; gap: 12px;
  text-align: center; transition: background 0.15s;
}
.lp-feature-chip:hover { background: var(--surface-2); }
.lp-feature-chip-icon { font-size: 24px; }
.lp-feature-chip span:last-child {
  font-family: 'Barlow Condensed', sans-serif; font-size: 12px; font-weight: 700;
  letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-muted);
}

/* ─── COVERAGE ─── */
.lp-coverage { text-align: center; }
.lp-coverage .lp-label, .lp-coverage .lp-title { justify-content: center; }
.lp-coverage .lp-sub { margin: 0 auto; }
.lp-route { position: relative; height: 2px; background: var(--border-md); margin: 56px 8px; }
.lp-route-dot {
  position: absolute; top: 50%; transform: translate(-50%, -50%);
  width: 6px; height: 6px; border-radius: 50%; background: var(--text-dim);
}
.lp-route-dot.marquee { width: 9px; height: 9px; background: var(--red); }
.lp-route-label {
  position: absolute; left: 50%; transform: translateX(-50%);
  font-family: 'Barlow Condensed', sans-serif; font-size: 11px; font-weight: 700;
  letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-muted); white-space: nowrap;
}
.lp-route-label.above { bottom: 14px; }
.lp-route-label.below { top: 14px; }
@media (max-width: 600px) { .lp-route-label.minor { display: none; } }

/* ─── CTA ─── */
.lp-cta { position: relative; text-align: center; padding: 100px 24px; overflow: hidden; }
.lp-cta-inner { position: relative; z-index: 1; }
.lp-signup-form { display: flex; gap: 10px; width: 100%; max-width: 460px; margin: 0 auto; }
.lp-signup-form input {
  flex: 1; background: var(--surface-2); border: 1px solid var(--border-md);
  color: var(--text); padding: 14px 18px; border-radius: 8px;
  font-family: 'Barlow', sans-serif; font-size: 15px; outline: none;
}
.lp-signup-form input:focus { border-color: rgba(232,0,45,0.5); }
.lp-signup-form input::placeholder { color: var(--text-dim); }
.lp-signup-form button {
  background: var(--red); color: #fff; border: none;
  padding: 14px 24px; border-radius: 8px;
  font-family: 'Barlow', sans-serif; font-size: 15px; font-weight: 600;
  cursor: pointer; white-space: nowrap; transition: background 0.15s;
}
.lp-signup-form button:hover { background: var(--red-dark); }
.lp-signup-form button:disabled { opacity: 0.7; cursor: not-allowed; }
.lp-form-note { margin-top: 14px; font-size: 13px; color: var(--text-dim); }
.lp-success-msg {
  display: flex; align-items: center; justify-content: center; gap: 10px;
  background: rgba(0,200,100,0.1); border: 1px solid rgba(0,200,100,0.2);
  color: #4ade80; padding: 14px 20px; border-radius: 8px;
  font-size: 15px; max-width: 460px; margin: 0 auto;
}
.lp-error-msg {
  background: rgba(245,158,11,0.1); border: 1px solid rgba(245,158,11,0.25);
  color: var(--amber); padding: 12px 18px; border-radius: 8px;
  font-size: 13.5px; line-height: 1.5; max-width: 460px; margin: 14px auto 0;
  text-align: center;
}

/* ─── RESPONSIVE ─── */
@media (max-width: 860px) {
  .lp-feature-hero { flex-direction: column; }
  .lp-feature-hero-visual { flex: 1 1 auto; width: 100%; }
  .lp-feature-strip { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 600px) {
  .lp-hero { padding: 130px 20px 80px; }
  .lp-hero-line { width: 340px; height: 340px; }
  .lp-section { padding: 70px 20px; }
  .lp-feature-hero { padding: 28px; gap: 28px; }
  .lp-tabs-visual { gap: 14px; }
  .lp-signup-form { flex-direction: column; }
  .lp-signup-form button { width: 100%; }
}
@media (max-width: 420px) {
  .lp-feature-strip { grid-template-columns: repeat(2, 1fr); }
}
`

export default function Home() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <nav>
        <Link to="/" className="nav-logo"><div className="logo-mark">GP</div>Grand Prix Planner</Link>
        <Link to="/plan" className="nav-cta">Start Planning</Link>
      </nav>

      <div className="lp-hero">
        <svg className="lp-hero-line" viewBox="0 0 600 600" aria-hidden="true">
          <path d={circuitPath} fill="none" stroke="rgba(140,160,255,0.22)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="lp-hero-inner">
          <div className="lp-lights" aria-hidden="true">
            <span className="lp-light" />
            <span className="lp-light" />
            <span className="lp-light" />
            <span className="lp-light" />
            <span className="lp-light" />
          </div>
          <span className="lp-badge">Free &#183; No account needed &#183; All 22 races</span>
          <h1>Your F1 race weekend.<br /><span className="lp-accent">Planned properly.</span></h1>
          <p>The free tool for planning a Grand Prix trip — flights, hotels, grandstands, visas, and transport, sorted in one place.</p>
          <Link to="/plan" className="lp-hero-cta">Start planning your race weekend &#8594;</Link>
          <div className="lp-hero-trust">No signup required to try it</div>
        </div>
      </div>

      <hr className="lp-divider" />

      <section className="lp-section lp-problem">
        <div className="lp-label">The reality</div>
        <h2 className="lp-title">Planning a race weekend shouldn't feel like a research project</h2>
        <div className="lp-tabs-visual" aria-hidden="true">
          <div className="lp-tab-stack">
            <div className="lp-tab" style={{ left: '0px', top: '12px', transform: 'rotate(-9deg)' }} />
            <div className="lp-tab" style={{ left: '20px', top: '2px', transform: 'rotate(5deg)' }} />
            <div className="lp-tab" style={{ left: '42px', top: '14px', transform: 'rotate(-4deg)' }} />
            <div className="lp-tab" style={{ left: '28px', top: '0px', transform: 'rotate(8deg)' }} />
            <div className="lp-tab" style={{ left: '10px', top: '8px', transform: 'rotate(-2deg)' }} />
          </div>
          <span className="lp-arrow">&#8594;</span>
          <div className="lp-dest">GP</div>
        </div>
        <p className="lp-caption">What normally takes a dozen browser tabs and a lost afternoon, in one place.</p>
      </section>

      <hr className="lp-divider" />

      <section className="lp-section">
        <div className="lp-label">What's included</div>
        <h2 className="lp-title">Everything your race weekend needs</h2>
        <p className="lp-sub">Seven tools covering every decision, from picking a grandstand to getting home.</p>

        <div className="lp-feature-hero">
          <div className="lp-feature-hero-text">
            <div className="lp-feature-hero-eyebrow">Core tool</div>
            <h3>See your full budget, updating live</h3>
            <p>Pick your flight, ticket tier, grandstand, and hotel — watch the total adjust as you go, no surprises.</p>
          </div>
          <div className="lp-feature-hero-visual">
            <div className="lp-mini-panel">
              <div className="lp-mini-total-label">Estimated total</div>
              <div className="lp-mini-total">&#163;1,240</div>
              <div className="lp-mini-bar">
                <div className="lp-mini-seg" style={{ width: '35%', background: '#3B82F6' }} />
                <div className="lp-mini-seg" style={{ width: '30%', background: 'var(--red)' }} />
                <div className="lp-mini-seg" style={{ width: '25%', background: 'var(--amber)' }} />
                <div className="lp-mini-seg" style={{ width: '10%', background: '#22C55E' }} />
              </div>
              <div className="lp-mini-key">
                <div className="lp-mini-key-item"><span className="lp-mini-key-dot" style={{ background: '#3B82F6' }} aria-hidden="true" />Flight</div>
                <div className="lp-mini-key-item"><span className="lp-mini-key-dot" style={{ background: 'var(--red)' }} aria-hidden="true" />Ticket</div>
                <div className="lp-mini-key-item"><span className="lp-mini-key-dot" style={{ background: 'var(--amber)' }} aria-hidden="true" />Hotel</div>
                <div className="lp-mini-key-item"><span className="lp-mini-key-dot" style={{ background: '#22C55E' }} aria-hidden="true" />Transport</div>
              </div>
            </div>
          </div>
        </div>

        <ul className="lp-feature-strip">
          {compactFeatures.map(f => (
            <li key={f.label} className="lp-feature-chip">
              <span className="lp-feature-chip-icon" aria-hidden="true">{f.icon}</span>
              <span>{f.label}</span>
            </li>
          ))}
        </ul>
      </section>

      <hr className="lp-divider" />

      <section className="lp-section lp-coverage">
        <div className="lp-label">Built for every race</div>
        <h2 className="lp-title">All 22 races. One season, fully mapped.</h2>
        <p className="lp-sub">Every round on the calendar — not just the headline circuits like Silverstone, Monaco, and Monza.</p>
        <div className="lp-route" aria-hidden="true">
          {routeStops.map((stop, i) => (
            <span key={i} className={stop.label ? 'lp-route-dot marquee' : 'lp-route-dot'} style={{ left: stop.pos + '%' }}>
              {stop.label && (
                <span className={'lp-route-label ' + stop.side + (stop.minor ? ' minor' : '')}>{stop.label}</span>
              )}
            </span>
          ))}
        </div>
      </section>

      <hr className="lp-divider" />

      <div className="lp-cta" id="signup">
        <svg className="lp-hero-line" style={{ opacity: 0.55 }} viewBox="0 0 600 600" aria-hidden="true">
          <path d={circuitPath} fill="none" stroke="rgba(140,160,255,0.22)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="lp-cta-inner">
          <div className="lp-label" style={{ justifyContent: 'center' }}>Stay in the loop</div>
          <h2 className="lp-title">Race guides straight to your inbox</h2>
          <p className="lp-sub" style={{ margin: '0 auto 40px' }}>Get grandstand tips, planning guides, and travel advice for every 2026 Grand Prix — delivered before each race weekend.</p>
          <EmailForm buttonText="Send Me the Guides" />
          <p className="lp-form-note">No spam. Unsubscribe any time.</p>
        </div>
      </div>

      <Footer />
    </>
  )
}
