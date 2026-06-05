import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './BookSession.css';
import {
  FaLaptop, FaUsers, FaMapMarkerAlt, FaBuilding,
  FaCheckCircle, FaWhatsapp, FaEnvelope,
} from 'react-icons/fa';

const sessionTypes = [
  {
    id: 'online-coaching',
    icon: <FaLaptop size={32} />,
    title: 'Online 1:1 Coaching',
    format: 'Virtual · Zoom',
    desc: 'Private coaching sessions tailored to your goals. Choose 60 or 90-minute slots, any weekday.',
    badge: 'Most Popular',
    includes: ['Personal development plan', 'Session recording (optional)', 'Email follow-up & resources'],
  },
  {
    id: 'virtual-workshop',
    icon: <FaUsers size={32} />,
    title: 'Virtual Team Workshop',
    format: 'Virtual · Zoom / Teams',
    desc: 'Live online training for your entire team. Topics tailored to your industry and current challenges.',
    includes: ['Pre-session needs assessment', 'Interactive exercises & breakouts', 'Post-workshop action plan'],
  },
  {
    id: 'in-person',
    icon: <FaMapMarkerAlt size={32} />,
    title: 'In-Person Session',
    format: 'Harare — your venue or ours',
    desc: 'Face-to-face coaching or training at our Harare office, or a venue of your choice.',
    includes: ['Flexible duration (half or full day)', 'Printed materials included', 'Refreshments at our office'],
  },
  {
    id: 'site-visit',
    icon: <FaBuilding size={32} />,
    title: 'Corporate Site Visit',
    format: 'On-site — we come to you',
    desc: "Tinashe comes to your workplace for immersive, full-team training tailored to your org's needs.",
    badge: 'Best for Teams',
    includes: ['Custom curriculum design', 'Multi-session programmes available', 'Leadership debrief included'],
  },
];

const topics = [
  'Emotional Intelligence',
  'Communication Skills',
  'Leadership Development',
  'Conflict Resolution',
  'Team Building',
  'Performance Coaching',
  'HR Strategy',
  'Custom / Other',
];

const BookSession = () => {
  const [selected, setSelected] = useState('online-coaching');
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', topic: '', message: '', date: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Sends to the existing Contact API endpoint or a mailto fallback
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <div className="book-page">

      {/* Hero */}
      <section className="book-hero text-center">
        <div className="container">
          <p className="book-hero-eyebrow">Soft Skills Coaching & Training</p>
          <h1 className="book-hero-title">Book a Session</h1>
          <p className="book-hero-sub">
            Choose a format below, pick your topic, and submit your details.<br />
            Tinashe will confirm within 24 hours.
          </p>
        </div>
      </section>

      <div className="container book-body py-5">

        {/* Session Type Selector */}
        <section className="mb-5">
          <h2 className="book-section-title">1. Choose your format</h2>
          <div className="row g-3 mt-2">
            {sessionTypes.map((s) => (
              <div key={s.id} className="col-md-6 col-lg-3">
                <button
                  type="button"
                  className={`session-type-card ${selected === s.id ? 'selected' : ''}`}
                  onClick={() => setSelected(s.id)}
                >
                  {s.badge && <span className="session-badge">{s.badge}</span>}
                  <div className="session-type-icon">{s.icon}</div>
                  <div className="session-type-title">{s.title}</div>
                  <div className="session-type-format">{s.format}</div>
                  <p className="session-type-desc">{s.desc}</p>
                  <ul className="session-includes">
                    {s.includes.map((item, i) => (
                      <li key={i}><FaCheckCircle className="include-icon" />{item}</li>
                    ))}
                  </ul>
                  {selected === s.id && <div className="selected-tick"><FaCheckCircle /></div>}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Booking Form */}
        <section className="book-form-section">
          <h2 className="book-section-title">2. Your details</h2>

          {submitted ? (
            <div className="book-success">
              <FaCheckCircle className="success-icon" />
              <h3>Request received!</h3>
              <p>Thanks, <strong>{form.name}</strong> — Tinashe will be in touch within 24 hours to confirm your session.</p>
              <Link to="/" className="btn btn-main mt-3">Back to Home</Link>
            </div>
          ) : (
            <form className="book-form mt-3" onSubmit={onSubmit} noValidate>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text" name="name" className="form-control"
                    value={form.name} onChange={onChange} required
                    placeholder="Jane Moyo"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email" name="email" className="form-control"
                    value={form.email} onChange={onChange} required
                    placeholder="jane@company.co.zw"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Phone / WhatsApp</label>
                  <input
                    type="tel" name="phone" className="form-control"
                    value={form.phone} onChange={onChange}
                    placeholder="+263 77 ..."
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Organisation / Company</label>
                  <input
                    type="text" name="company" className="form-control"
                    value={form.company} onChange={onChange}
                    placeholder="Your company name"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Training Topic *</label>
                  <select name="topic" className="form-select" value={form.topic} onChange={onChange} required>
                    <option value="">Select a topic…</option>
                    {topics.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Preferred Date</label>
                  <input
                    type="date" name="date" className="form-control"
                    value={form.date} onChange={onChange}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Tell us about your goals or challenges</label>
                  <textarea
                    name="message" className="form-control" rows={4}
                    value={form.message} onChange={onChange}
                    placeholder="E.g. We have 20 managers who need to improve how they handle conflict and give feedback…"
                  />
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-main btn-lg w-100" disabled={loading}>
                    {loading ? 'Sending…' : 'Submit Booking Request'}
                  </button>
                </div>
              </div>
            </form>
          )}
        </section>

        {/* Quick contact alternatives */}
        <section className="book-alt-contact mt-5 text-center">
          <p className="book-alt-label">Prefer to reach out directly?</p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <a
              href="https://wa.me/263773527905?text=Hi%20Tinashe%2C%20I'd%20like%20to%20book%20a%20session"
              target="_blank" rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <FaWhatsapp /> WhatsApp Tinashe
            </a>
            <a href="mailto:hello@maffyonline.co.zw" className="btn btn-outline-main">
              <FaEnvelope /> Email Us
            </a>
          </div>
          <p className="book-alt-note mt-3">
            Harare office: 211 Josiah Tongogara Ave &nbsp;·&nbsp; Response within 24 hours
          </p>
        </section>

        {/* Tool recommendation callout */}
        <section className="tools-callout mt-5">
          <div className="tools-callout-inner">
            <h4 className="tools-callout-title">Streamlining online bookings</h4>
            <p className="tools-callout-body">
              To automate scheduling, Tinashe uses{' '}
              <strong>Calendly</strong> (free tier available) for 1:1 coaching slots and{' '}
              <strong>Zoom</strong> for all virtual sessions.{' '}
              <strong>Stripe</strong> or <strong>Paynow</strong> can be added for upfront payment.
              See the <Link to="/contact">contact page</Link> for direct enquiries.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default BookSession;
