import { useState } from 'react'
import { Link } from 'react-router-dom'

const BREVO_API_KEY = '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'

async function submitToBrevo(email) {
  const response = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'api-key': BREVO_API_KEY },
    body: JSON.stringify({ email, listIds: [2], updateEnabled: true })
  })
  if (response.ok || response.status === 204) return true
  const errorData = await response.json()
  if (response.status === 400 && errorData.message?.includes('already exists')) return true
  throw new Error(`Brevo API error: ${response.status}`)
}

function EmailForm({ buttonText }) {
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await submitToBrevo(email)
      setSuccess(true)
    } catch (err) {
      console.error(err)
      setLoading(false)
      alert('There was an issue signing you up. Please try again or email hello@grandprixplanner.com.')
    }
  }

  if (success) {
    return <div className="success-msg">✓ &nbsp;You're on the list — we'll be in touch soon.</div>
  }

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <input type="email" placeholder="your@email.com" required aria-label="Email address" value={email} onChange={e => setEmail(e.target.value)} />
      <button type="submit" disabled={loading}>{loading ? 'Signing up...' : buttonText}</button>
    </form>
  )
}

const features = [
  { icon: '🏁', title: 'Grandstand Picker', desc: 'Expert insights on every grandstand at every circuit. Know exactly where to sit for your budget, preferred team, and viewing preferences.' },
  { icon: '✈️', title: 'Flight & Hotel Finder', desc: 'Smart recommendations on the best airports to fly into, when to book, and where to stay — with real cost estimates built in.' },
  { icon: '💷', title: 'Real-Time Cost Tracker', desc: 'See your full trip budget broken down as you build it. No surprises. Adjust until the numbers work for you.' },
  { icon: '🛂', title: 'Visa & Entry Checker', desc: 'Instant guidance on visa requirements based on your passport. Know before you book, not after.' },
  { icon: '🗺️', title: 'Local Transport Guide', desc: 'Getting to and from the circuit is half the battle. We map out every option — shuttle, train, walk, and more.' },
  { icon: '📋', title: 'Itinerary Builder', desc: 'Export a beautiful, shareable race weekend plan. Everything in one document, ready to go offline.' },
]

const stats = [
  { num: '12+', label: 'Websites visited when planning a typical race trip' },
  { num: '8h', label: 'Average time spent researching before making a single booking' },
  { num: '£400+', label: 'Typically overpaid due to poor timing and fragmented information' },
  { num: '1', label: 'Place to plan your entire race weekend — coming very soon' },
]

const venues = ['Silverstone', 'Monza', 'Spa', 'Monaco', 'Singapore', 'Suzuka']

export default function Home() {
  return (
    <>
      <nav>
        <Link to="/" className="nav-logo"><div className="logo-mark">GP</div>Grand Prix Planner</Link>
        <Link to="/plan" className="nav-cta">Start Planning</Link>
      </nav>

      <div className="hero">
        <div className="circuit-bg" />
        <div className="badge"><span className="badge-dot" />Now accepting early access signups</div>
        <h1>Your F1 Race Weekend.<br /><span className="accent">Planned Perfectly.</span></h1>
        <p>Stop spending days across dozens of websites. Grand Prix Planner is the only tool that handles flights, hotels, tickets, grandstands, visas, and local transport — all in one place.</p>

        <Link to="/plan" style={{
          background: 'var(--red)',
          color: '#fff',
          padding: '16px 36px',
          borderRadius: '8px',
          fontFamily: "'Barlow', sans-serif",
          fontSize: '16px',
          fontWeight: '600',
          textDecoration: 'none',
          marginBottom: '20px',
          display: 'inline-block',
          transition: 'background 0.15s',
          position: 'relative',
        }}>
          Start Planning Your Race Weekend →
        </Link>

        <p style={{ fontSize: '13px', color: 'var(--text-dim)', marginBottom: '32px' }}>
          Free to use · No account needed
        </p>

        <div style={{
          width: '100%',
          maxWidth: '460px',
          borderTop: '1px solid var(--border)',
          paddingTop: '28px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          position: 'relative',
        }}>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Or join the waitlist for launch updates</p>
          <EmailForm buttonText="Get Early Access" />
        </div>
      </div>

      <div className="logos-bar">
        <p>Designed for fans planning races at</p>
        <div className="logos">{venues.map(v => <span key={v} className="logo-item">{v}</span>)}</div>
      </div>

      <hr className="divider" style={{ marginTop: '80px' }} />

      <section>
        <div className="section-label">The problem</div>
        <h2 className="section-title">Planning an F1 race shouldn't be a second job</h2>
        <p className="section-sub">The average fan visits 12+ websites and spends over 8 hours researching before booking a Grand Prix trip. We're fixing that.</p>
        <div className="problem-grid">
          {stats.map(s => (
            <div key={s.num} className="problem-item">
              <div className="problem-num">{s.num}</div>
              <div className="problem-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <hr className="divider" />

      <section>
        <div className="section-label">What's included</div>
        <h2 className="section-title">Everything your race weekend needs</h2>
        <p className="section-sub">From the moment you pick a circuit to the moment you're back home, Grand Prix Planner has you covered.</p>
        <div className="features-grid">
          {features.map(f => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="divider" />

      <div className="cta-section" id="signup">
        <div className="section-label">Get early access</div>
        <h2 className="section-title" style={{ maxWidth: '700px', margin: '0 auto 20px' }}>Be first when we launch</h2>
        <p className="section-sub" style={{ margin: '0 auto 40px' }}>Join the waitlist and get early access before we open to the public. Help shape the product and never overpay for an F1 trip again.</p>
        <EmailForm buttonText="Join the Waitlist" />
        <p className="form-note" style={{ marginTop: '14px', color: 'var(--text-muted)' }}>No spam. Unsubscribe any time.</p>
      </div>

      <footer>
        <Link to="/" className="nav-logo"><div className="logo-mark">GP</div>Grand Prix Planner</Link>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms</a>
          <a href="mailto:hello@grandprixplanner.com">Contact</a>
        </div>
        <p className="footer-copy">© 2026 Grand Prix Planner. All rights reserved.</p>
      </footer>
    </>
  )
}
