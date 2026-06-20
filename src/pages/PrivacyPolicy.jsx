import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const ppStyles = `
  .pp-wrap { margin-top: 65px; background: var(--black); min-height: 100vh; }
  .pp-container { max-width: 760px; margin: 0 auto; padding: 56px 40px 80px; }
  .pp-eyebrow { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 11px; letter-spacing: 0.12em; color: var(--text-dim); text-transform: uppercase; margin-bottom: 10px; }
  .pp-title { font-family: 'Bebas Neue', sans-serif; font-size: 44px; color: var(--text); margin: 0 0 8px; }
  .pp-updated { font-size: 13px; color: var(--text-muted); margin: 0 0 40px; font-family: 'Barlow', sans-serif; }
  .pp-section { margin-bottom: 32px; }
  .pp-h2 { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 15px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text); margin: 0 0 12px; padding-bottom: 8px; border-bottom: 1px solid var(--border-md); }
  .pp-body { font-family: 'Barlow', sans-serif; font-size: 15px; line-height: 1.7; color: var(--text-muted); margin: 0 0 12px; }
  .pp-body strong { color: var(--text); font-weight: 600; }
  .pp-body a { color: var(--red); text-decoration: none; }
  .pp-body a:hover { text-decoration: underline; }
  .pp-list { font-family: 'Barlow', sans-serif; font-size: 15px; line-height: 1.7; color: var(--text-muted); margin: 0 0 12px; padding-left: 20px; }
  .pp-list li { margin-bottom: 6px; }
  .pp-back { display: inline-flex; align-items: center; gap: 6px; font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-muted); text-decoration: none; margin-bottom: 24px; }
  .pp-back:hover { color: var(--text); }

  @media (max-width: 640px) {
    .pp-container { padding: 32px 18px 60px; }
    .pp-title { font-size: 32px; }
  }
`

export default function PrivacyPolicy() {
  const contactLink = <a href="mailto:hello@grandprixplanner.com">hello@grandprixplanner.com</a>

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ppStyles }} />
      <nav>
        <Link to="/" className="nav-logo"><div className="logo-mark">GP</div>Grand Prix Planner</Link>
        <Link to="/" className="nav-link">Home</Link>
      </nav>

      <div className="pp-wrap">
        <div className="pp-container">
          <Link to="/" className="pp-back">← Back to Home</Link>
          <div className="pp-eyebrow">Legal</div>
          <h1 className="pp-title">Privacy Policy</h1>
          <p className="pp-updated">Last updated: 20 June 2026</p>

          <div className="pp-section">
            <p className="pp-body">Grand Prix Planner ("we," "us," "GP Planner") provides a free planning tool for Formula 1 race weekends. This page explains what information we collect when you use the site, and what we do with it. We've kept this short and plain because, honestly, we don't collect very much.</p>
          </div>

          <div className="pp-section">
            <h2 className="pp-h2">What We Collect</h2>
            <p className="pp-body">The planning tool itself — the cost estimator, grandstand picker, flight guide, visa checker, and itinerary builder — runs entirely in your browser. Anything you type into it (departure city, passport, party size, and so on) stays on your device and is not sent to us or stored on any server.</p>
            <p className="pp-body">The only personal information we collect is your <strong>email address</strong>, and only if you choose to sign up for race guides using the form on the homepage. We don't ask for your name, and we don't require an account to use any part of the site.</p>
          </div>

          <div className="pp-section">
            <h2 className="pp-h2">How We Use It</h2>
            <p className="pp-body">If you sign up, your email address is used to send you race guides and planning tips ahead of upcoming Grand Prix weekends. We don't use it for anything else, and we don't sell or rent it to anyone.</p>
          </div>

          <div className="pp-section">
            <h2 className="pp-h2">Third-Party Services</h2>
            <p className="pp-body">We rely on a small number of outside services to run the site:</p>
            <ul className="pp-list">
              <li><strong>Brevo</strong> — our email provider. If you sign up for guides, your email address is stored with Brevo so we can send those emails. You can unsubscribe at any time using the link in any email we send.</li>
              <li><strong>Booking.com and Skyscanner</strong> — when you click through to search for flights or hotels, you leave our site and land on theirs. We may earn a commission if you book — see our <Link to="/terms">Terms</Link> for more on that. Once you're on their site, their own privacy policy applies, not ours. We don't receive or store any details of what you search for or book there.</li>
              <li><strong>Vercel</strong> — our hosting provider. Like any website, basic technical request logs (such as IP address) pass through as part of standard web server operation. We don't actively use this data for anything beyond keeping the site running.</li>
            </ul>
          </div>

          <div className="pp-section">
            <h2 className="pp-h2">Cookies</h2>
            <p className="pp-body">We don't currently run our own analytics or tracking cookies. If that changes — for example, if we add basic usage analytics to understand how the tool is used — we'll update this policy to reflect it.</p>
          </div>

          <div className="pp-section">
            <h2 className="pp-h2">Your Rights</h2>
            <p className="pp-body">You can unsubscribe from our emails at any time. You can also ask us to delete your email address from our records entirely by contacting us — see below. We'll action that promptly.</p>
          </div>

          <div className="pp-section">
            <h2 className="pp-h2">Children's Privacy</h2>
            <p className="pp-body">Grand Prix Planner is not directed at children, and we don't knowingly collect personal information from anyone under 16.</p>
          </div>

          <div className="pp-section">
            <h2 className="pp-h2">Changes to This Policy</h2>
            <p className="pp-body">As the site grows, this policy may be updated. We'll change the date at the top whenever that happens. We'd encourage checking back occasionally, particularly before sharing your email with us.</p>
          </div>

          <div className="pp-section">
            <h2 className="pp-h2">Contact</h2>
            <p className="pp-body">Questions about this policy, or want your data removed? Email us at {contactLink}.</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
