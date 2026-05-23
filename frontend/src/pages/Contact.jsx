import { useState } from 'react';
import './StaticPages.css';

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="static-page page-enter">
      <div className="static-inner">
        <div className="static-header">
          <span className="section-label">Contact</span>
          <h1>Get in touch</h1>
          <p>Have a question or feedback? We&apos;d love to hear from you.</p>
        </div>

        <div className="static-content">
          <div className="card">
            {sent ? (
              <div className="contact-success">
                <span className="contact-success-icon">✓</span>
                <h2>Message sent!</h2>
                <p>Thanks for reaching out. We&apos;ll get back to you soon.</p>
                <button className="btn btn-ghost" onClick={() => setSent(false)}>
                  Send another message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="input-group">
                  <label htmlFor="name">Name</label>
                  <input id="name" type="text" placeholder="Your name" required />
                </div>
                <div className="input-group">
                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" placeholder="you@example.com" required />
                </div>
                <div className="input-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" placeholder="Your message…" rows={5} required />
                </div>
                <button type="submit" className="btn btn-primary">
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
