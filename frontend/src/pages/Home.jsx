import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const features = [
  {
    icon: '✓',
    title: 'Task Management',
    desc: 'Create, organize, and track your tasks with ease. Stay on top of your work.',
  },
  {
    icon: '⚡',
    title: 'Lightning Fast',
    desc: 'Built for speed. No unnecessary bloat, just pure productivity.',
  },
  {
    icon: '🔒',
    title: 'Secure & Private',
    desc: 'Your data is protected with industry-standard authentication and encryption.',
  },
  {
    icon: '📱',
    title: 'Responsive Design',
    desc: 'Works seamlessly on desktop, tablet, and mobile devices.',
  },
];

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="home">
      <section className="hero-section">
        <div className="hero-bg" />
        <div className="hero-content">
          <div className="hero-badge">Your productivity hub</div>
          <h1 className="hero-title">
            Organize your<br />
            <span className="hero-gradient">tasks, amplify</span><br />
            your output
          </h1>
          <p className="hero-desc">
            TaskFlow helps you manage your daily tasks, track progress, and
            achieve more with less effort.
          </p>
          <div className="hero-actions">
            {user ? (
              <Link to="/dashboard" className="btn btn-primary btn-lg">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary btn-lg">
                  Get Started Free
                </Link>
                <Link to="/login" className="btn btn-ghost btn-lg">
                  Log in
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="features-inner">
          <div className="section-header">
            <span className="section-label">Features</span>
            <h2>Everything you need to stay productive</h2>
            <p>Simple, powerful, and designed for how you work.</p>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div className="feature-card card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="feature-icon">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-card card-glass">
          <h2>Ready to take control of your tasks?</h2>
          <p>Join TaskFlow today and start organizing your work efficiently.</p>
          {!user && (
            <Link to="/register" className="btn btn-primary btn-lg">
              Create Free Account
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
