import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const nfStyles = `
  .nf-wrap { margin-top: 65px; background: var(--black); min-height: calc(100vh - 65px); display: flex; align-items: center; justify-content: center; }
  .nf-container { max-width: 560px; margin: 0 auto; padding: 56px 40px 80px; text-align: center; }
  .nf-eyebrow { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 11px; letter-spacing: 0.12em; color: var(--text-dim); text-transform: uppercase; margin-bottom: 10px; }
  .nf-title { font-family: 'Bebas Neue', sans-serif; font-size: 88px; line-height: 1; color: var(--text); margin: 0 0 8px; }
  .nf-sub { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 18px; letter-spacing: 0.02em; text-transform: uppercase; color: var(--text); margin: 0 0 12px; }
  .nf-body { font-family: 'Barlow', sans-serif; font-size: 15px; line-height: 1.7; color: var(--text-muted); margin: 0 0 32px; }
  .nf-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
  .nf-btn-primary { display: inline-flex; align-items: center; gap: 8px; background: var(--red); color: #fff; font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 13px; letter-spacing: 0.04em; text-transform: uppercase; text-decoration: none; padding: 13px 24px; border-radius: 6px; transition: background 0.15s; }
  .nf-btn-primary:hover { background: var(--red-dark); }
  .nf-btn-secondary { display: inline-flex; align-items: center; gap: 8px; background: var(--surface-2); border: 1px solid var(--border-md); color: var(--text); font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 13px; letter-spacing: 0.04em; text-transform: uppercase; text-decoration: none; padding: 13px 24px; border-radius: 6px; transition: background 0.15s, border-color 0.15s; }
  .nf-btn-secondary:hover { background: var(--surface-3); border-color: var(--border-hover); }

  @media (max-width: 640px) {
    .nf-container { padding: 40px 20px 60px; }
    .nf-title { font-size: 64px; }
  }
`

export default function NotFound() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: nfStyles }} />
      <nav>
        <Link to="/" className="nav-logo"><div className="logo-mark">GP</div>Grand Prix Planner</Link>
        <Link to="/" className="nav-link">Home</Link>
      </nav>

      <div className="nf-wrap">
        <div className="nf-container">
          <div className="nf-eyebrow">Error 404</div>
          <div className="nf-title">Off Track</div>
          <div className="nf-sub">This page has left the circuit</div>
          <p className="nf-body">
            The page you're looking for doesn't exist, may have moved, or the
            link you followed might be out of date. Let's get you back on track.
          </p>
          <div className="nf-actions">
            <Link to="/" className="nf-btn-primary">Back to Home</Link>
            <Link to="/plan" className="nf-btn-secondary">Start Planning</Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
