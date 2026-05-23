import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ConfirmModal from './ConfirmModal';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
    setShowConfirm(false);
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className={`navbar${scrolled ? ' navbar-scrolled' : ''}`}>
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand" onClick={closeMobile}>
          <span className="brand-icon">✓</span>
          <span className="brand-text">TaskFlow</span>
        </Link>

        <button
          className={`hamburger${mobileOpen ? ' active' : ''}`}
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>

        <div className={`navbar-menu${mobileOpen ? ' open' : ''}`}>
          <div className="nav-links">
            <NavLink to="/" end onClick={closeMobile}>Home</NavLink>
            <NavLink to="/about" onClick={closeMobile}>About</NavLink>
            <NavLink to="/contact" onClick={closeMobile}>Contact</NavLink>
            {user && (
              <>
                <NavLink to="/dashboard" onClick={closeMobile}>Dashboard</NavLink>
                <NavLink to="/profile" onClick={closeMobile}>Profile</NavLink>
              </>
            )}
          </div>

          <div className="nav-actions">
            {user ? (
              <>
                <Link to="/profile" className="nav-user" onClick={closeMobile}>
                  <span className="nav-avatar">
                    {user.pfp ? (
                      <img src={user.pfp} alt="" className="nav-avatar-img" />
                    ) : (
                      user.fullname?.charAt(0)?.toUpperCase() || user.email?.charAt(0).toUpperCase()
                    )}
                  </span>
                  <span className="nav-username">{user.fullname || user.email}</span>
                </Link>
                <button className="btn btn-ghost btn-sm" onClick={() => setShowConfirm(true)}>
                  Log out
                </button>
                <ConfirmModal
                  open={showConfirm}
                  title="Log out"
                  message="Are you sure you want to log out?"
                  onConfirm={handleLogout}
                  onCancel={() => setShowConfirm(false)}
                />
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost btn-sm" onClick={closeMobile}>Log in</Link>
                <Link to="/register" className="btn btn-primary btn-sm" onClick={closeMobile}>Get started</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
