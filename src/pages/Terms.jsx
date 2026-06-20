import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const tosStyles = `
  .tos-wrap { margin-top: 65px; background: var(--black); min-height: 100vh; }
  .tos-container { max-width: 760px; margin: 0 auto; padding: 56px 40px 80px; }
  .tos-eyebrow { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 11px; letter-spacing: 0.12em; color: var(--text-dim); text-transform: uppercase; margin-bottom: 10px; }
  .tos-title { font-family: 'Bebas Neue', sans-serif; font-size: 44px; color: var(--text); margin: 0 0 8px; }
  .tos-updated { font-size: 13px; color: var(--text-muted); margin: 0 0 40px; font-family: 'Barlow', sans-serif; }
  .tos-section { margin-bottom: 32px; }
  .tos-h2 { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 15px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text); margin: 0 0 12px; padding-bottom: 8px; border-bottom: 1px solid var(--border-md); }
  .tos-body { font-family: 'Barlow', sans-serif; font-size: 15px; line-height: 1.7; color: var(--text-muted); margin: 0 0 12px; }
  .tos-body strong { color: var(--text); font-weight: 600; }
  .tos-body a { color: var(--red); text-decoration: none; }
  .tos-body a:hover { text-decoration: underline; }
  .tos-list { font-family: 'Barlow', sans-serif; font-size: 15px; line-height: 1.7; color: var(--text-muted); margin: 0 0 12px; padding-left: 20px; }
  .tos-list li { margin-bottom: 6px; }
  .tos-back { display: inline-flex; align-items: center; gap: 6px; font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-muted); text-decoration: none; margin-bottom: 24px; }
  .tos-back:hover { color: var(--text); }

  @media (max-width: 640px) {
    .tos-container { padding: 32px 18px 60px; }
    .tos-title { font-size: 32px; }
  }
`

export default function Terms() {
  const contactLink = <a href="mailto:hello@grandprixplanner.com">hello@grandprixplanner.com</a>

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: tosStyles }} />
      <nav>
        <Link to="/" className="nav-logo"><div className="logo-mark">GP</div>Grand Prix Planner</Link>
        <Link to="/" className="nav-link">Home</Link>
      </nav>

      <div className="tos-wrap">
        <div className="tos-container">
          <Link to="/" className="tos-back">← Back to Home</Link>
          <div className="tos-eyebrow">Legal</div>
          <h1 className="tos-title">Terms of Use</h1>
          <p className="tos-updated">Last updated: 20 June 2026</p>

          <div className="tos-section">
            <p className="tos-body">These terms cover your use of Grand Prix Planner ("we," "us," "GP Planner"), a free tool for planning Formula 1 race weekends. By using the site, you're agreeing to them. They're written in plain language because there's no reason for them not to be.</p>
          </div>

          <div className="tos-section">
            <h2 className="tos-h2">What the Site Does</h2>
            <p className="tos-body">Grand Prix Planner helps you plan an F1 race weekend — grandstand recommendations, cost estimates, flight and airport guidance, accommodation suggestions, local transport advice, visa requirement guidance, and an itinerary builder. It's free to use, requires no account, and doesn't process any payments or bookings directly.</p>
          </div>

          <div className="tos-section">
            <h2 className="tos-h2">Information Is Guidance, Not Guarantees</h2>
            <p className="tos-body">Everything on this site — cost estimates, visa requirements, flight prices, accommodation suggestions, transport advice — is provided as general guidance to help with planning. It is <strong>not</strong> professional travel, legal, or immigration advice, and we can't guarantee it's accurate, complete, or up to date at the moment you read it. Prices change, visa rules change, and circuits change.</p>
            <p className="tos-body">Before booking anything or travelling, always verify details — prices, visa and entry requirements, dates, and ticket availability — directly with the airline, hotel, ticket provider, or official government source. We accept no liability for losses arising from decisions made based on information found on this site.</p>
          </div>

          <div className="tos-section">
            <h2 className="tos-h2">Affiliate Links and Commissions</h2>
            <p className="tos-body">Some links on this site — including links to Booking.com and Skyscanner — are affiliate links. If you click through and make a booking, we may earn a small commission. This comes at no extra cost to you, and it's how we keep Grand Prix Planner free to use. We only link to services we think are genuinely useful for race weekend planning, and the commission has no bearing on the planning advice or recommendations shown elsewhere on the site.</p>
            <p className="tos-body">Once you click through to a third-party site, you're subject to that site's own terms, pricing, and availability — not ours.</p>
          </div>

          <div className="tos-section">
            <h2 className="tos-h2">Acceptable Use</h2>
            <p className="tos-body">The site is for personal, non-commercial planning use. Please don't:</p>
            <ul className="tos-list">
              <li>Scrape, copy, or republish the site's content or data wholesale elsewhere</li>
              <li>Attempt to disrupt, overload, or interfere with the site's normal operation</li>
              <li>Use the site for any unlawful purpose</li>
            </ul>
          </div>

          <div className="tos-section">
            <h2 className="tos-h2">Ownership</h2>
            <p className="tos-body">The site's design, branding, and written content belong to Grand Prix Planner. The Formula 1 race calendar, circuit names, and related event details are factual public information and aren't owned by us. Grand Prix Planner is an independent fan-built tool and is not affiliated with, endorsed by, or sponsored by Formula 1, the FIA, or any team or circuit referenced on this site.</p>
          </div>

          <div className="tos-section">
            <h2 className="tos-h2">No Warranty</h2>
            <p className="tos-body">The site is provided "as is." We make a genuine effort to keep race dates, costs, and guidance accurate, but we don't warrant that the site will be error-free, uninterrupted, or perfectly up to date at all times.</p>
          </div>

          <div className="tos-section">
            <h2 className="tos-h2">Changes to These Terms</h2>
            <p className="tos-body">As the site develops, these terms may be updated. We'll change the date at the top whenever that happens.</p>
          </div>

          <div className="tos-section">
            <h2 className="tos-h2">Governing Law</h2>
            <p className="tos-body">These terms are governed by the laws of England and Wales.</p>
          </div>

          <div className="tos-section">
            <h2 className="tos-h2">Contact</h2>
            <p className="tos-body">Questions about these terms? Email us at {contactLink}.</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
