import { Link } from 'react-router-dom'

const footerTrustStyles = `
  .footer-trust {
    width: 100%;
    font-family: 'Barlow', sans-serif;
    font-size: 12.5px;
    line-height: 1.6;
    color: var(--text-dim);
    border-top: 1px solid var(--border);
    padding-top: 16px;
    margin-top: 4px;
  }
  .footer-trust a { color: var(--text-dim); text-decoration: underline; }
  .footer-trust a:hover { color: var(--text-muted); }
`

export default function Footer() {
  const contactLink = <a href="mailto:hello@grandprixplanner.com">Contact</a>

  return (
    <footer>
      <style dangerouslySetInnerHTML={{ __html: footerTrustStyles }} />
      <Link to="/" className="nav-logo"><div className="logo-mark">GP</div>Grand Prix Planner</Link>
      <div className="footer-links">
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/terms">Terms</Link>
        {contactLink}
      </div>
      <p className="footer-copy">© 2026 Grand Prix Planner. All rights reserved.</p>
      <p className="footer-trust">
        Grand Prix Planner is an independent, fan-built tool — not affiliated with, endorsed by, or sponsored by Formula 1, the FIA, or any team or circuit.
        Some links on this site (including to Booking.com and Skyscanner) are affiliate links — if you book through them we may earn a small commission at no extra cost to you, which is how we keep this tool free to use.
        See our <Link to="/terms">Terms</Link> for details.
      </p>
    </footer>
  )
}
