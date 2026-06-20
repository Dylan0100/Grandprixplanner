import { Link } from 'react-router-dom'

export default function Footer() {
  const contactLink = <a href="mailto:hello@grandprixplanner.com">Contact</a>

  return (
    <footer>
      <Link to="/" className="nav-logo"><div className="logo-mark">GP</div>Grand Prix Planner</Link>
      <div className="footer-links">
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/terms">Terms</Link>
        {contactLink}
      </div>
      <p className="footer-copy">© 2026 Grand Prix Planner. All rights reserved.</p>
    </footer>
  )
}
