import './StaticPages.css';

export default function About() {
  return (
    <div className="static-page page-enter">
      <div className="static-inner">
        <div className="static-header">
          <span className="section-label">About</span>
          <h1>About TaskFlow</h1>
          <p>Simple task management for modern productivity.</p>
        </div>

        <div className="static-content">
          <div className="card">
            <h2>Our Mission</h2>
            <p>
              TaskFlow was built with a simple mission: help people get things done
              without unnecessary complexity. We believe task management should be
              intuitive, fast, and accessible to everyone.
            </p>
          </div>

          <div className="card">
            <h2>Why TaskFlow?</h2>
            <p>
              Unlike bloated productivity tools, TaskFlow focuses on what matters:
              creating, organizing, and completing tasks. No boards, no tags, no
              overwhelming menus — just a clean, focused experience.
            </p>
          </div>

          <div className="card">
            <h2>Tech Stack</h2>
            <p>
              Built with React on the frontend and Django REST Framework on the
              backend. TaskFlow uses JWT authentication for secure access and
              SQLite for fast, reliable data storage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
