import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="brand-icon">✓</span>
          <span className="brand-text">TaskFlow</span>
        </div>

        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login">Log in</Link>
          <Link to="/register">Sign up</Link>
        </div>

        <p className="footer-copy">&copy; {new Date().getFullYear()} TaskFlow</p>
      </div>
    </footer>
  );
}
