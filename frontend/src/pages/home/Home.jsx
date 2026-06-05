import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import useCounter from '../../hooks/useCounter';
import {
  FaBrain, FaComments, FaChartLine, FaHandshake,
  FaUsers, FaTrophy, FaCalendarAlt, FaMapMarkerAlt, FaLaptop,
} from 'react-icons/fa';

/* ── Decorative mural SVG art ─────────────────────────────── */
const HeroMural = () => (
  <svg className="hero-mural" viewBox="0 0 420 640" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <polygon points="210,18 402,210 210,402 18,210"  fill="none" stroke="rgba(212,175,55,0.20)" strokeWidth="1.5"/>
    <polygon points="210,58 362,210 210,362 58,210"  fill="none" stroke="rgba(212,175,55,0.13)" strokeWidth="1.2"/>
    <polygon points="210,98 322,210 210,322 98,210"  fill="rgba(212,175,55,0.04)" stroke="rgba(212,175,55,0.09)" strokeWidth="1"/>
    <polygon points="210,18 402,210 210,210" fill="rgba(212,175,55,0.06)"/>
    <polygon points="18,210 210,402 210,210"  fill="rgba(212,175,55,0.04)"/>
    <line x1="210" y1="18"  x2="210" y2="402" stroke="rgba(212,175,55,0.07)" strokeWidth="0.8"/>
    <line x1="18"  y1="210" x2="402" y2="210" stroke="rgba(212,175,55,0.07)" strokeWidth="0.8"/>
    <polygon points="210,450 320,545 210,640 100,545" fill="none" stroke="rgba(212,175,55,0.14)" strokeWidth="1.2"/>
    <polygon points="210,480 295,545 210,610 125,545" fill="rgba(212,175,55,0.05)" stroke="rgba(212,175,55,0.08)" strokeWidth="1"/>
    {[0,1,2,3,4].flatMap(r => [0,1,2,3,4].map(c => (
      <circle key={`${r}-${c}`} cx={310+c*20} cy={450+r*20} r={1.8} fill="rgba(212,175,55,0.22)"/>
    )))}
    <polygon points="0,0 80,0 0,80" fill="rgba(212,175,55,0.07)"/>
    <polygon points="0,0 50,0 0,50" fill="rgba(212,175,55,0.06)"/>
  </svg>
);

const ProgramsMural = () => (
  <svg className="programs-mural" viewBox="0 0 280 520" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {[0,1,2,3,4,5].map(i => (
      <polygon key={i}
        points={`${i*48},0 ${i*48+48},0 ${i*48+24},42`}
        fill={i%2===0 ? 'rgba(212,175,55,0.07)' : 'rgba(212,175,55,0.04)'}
        stroke="rgba(212,175,55,0.1)" strokeWidth="0.8"
      />
    ))}
    {[0,1,2,3,4].map(i => (
      <path key={`ch${i}`}
        d={`M0 ${100+i*34} L70 ${73+i*34} L140 ${100+i*34} L210 ${73+i*34} L280 ${100+i*34}`}
        fill="none" stroke="rgba(212,175,55,0.09)" strokeWidth="1.5"
      />
    ))}
    <circle cx="140" cy="370" r="90"  fill="none" stroke="rgba(212,175,55,0.10)" strokeWidth="1.5"/>
    <circle cx="140" cy="370" r="62"  fill="none" stroke="rgba(212,175,55,0.08)" strokeWidth="1.2"/>
    <circle cx="140" cy="370" r="36"  fill="rgba(212,175,55,0.06)" stroke="rgba(212,175,55,0.12)" strokeWidth="1"/>
    <circle cx="140" cy="370" r="12"  fill="rgba(212,175,55,0.14)"/>
  </svg>
);

const StatsMural = () => (
  <svg className="stats-mural" viewBox="0 0 500 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {[0,1,2,3,4,5,6].map(i => (
      <path key={i}
        d={`M${i*80-40},160 L${i*80},0 L${i*80+40},160`}
        fill={i%2===0 ? 'rgba(212,175,55,0.05)' : 'rgba(255,255,255,0.03)'}
        stroke="rgba(212,175,55,0.08)" strokeWidth="0.8"
      />
    ))}
  </svg>
);

/* ── Animated stat counter ──────────────────────────────────── */
const AnimatedStat = ({ value, suffix = '', label }) => {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const count = useCounter(value, 1600, active);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setActive(true); obs.unobserve(el); } },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="stat-item reveal reveal-scale">
      <div className="stat-num shimmer-text">{count}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

/* ── Data ───────────────────────────────────────────────────── */
const programs = [
  { emoji: '🧠', icon: <FaBrain size={30}/>,      title: 'Emotional Intelligence',  desc: 'Master self-awareness, empathy and emotional regulation to lead with impact and build resilient teams.' },
  { emoji: '💬', icon: <FaComments size={30}/>,   title: 'Communication Mastery',   desc: 'Build confident, clear communication for high-stakes meetings, presentations and difficult conversations.' },
  { emoji: '🎯', icon: <FaChartLine size={30}/>,  title: 'Leadership Development',  desc: 'Practical skills that turn managers into people-first leaders who consistently deliver results.' },
  { emoji: '🤝', icon: <FaHandshake size={30}/>,  title: 'Conflict Resolution',      desc: 'Turn workplace tension into productive dialogue and lasting resolution through proven mediation tools.' },
  { emoji: '👥', icon: <FaUsers size={30}/>,      title: 'Team Building',            desc: 'Break silos, build psychological safety and create teams that consistently outperform.' },
  { emoji: '🏆', icon: <FaTrophy size={30}/>,     title: 'Performance Coaching',    desc: '1:1 and group coaching with measurable milestones — tailored to your goals and growth pace.' },
];

const pillars = [
  { emoji: '🤝', label: 'Stronger relationships' },
  { emoji: '💬', label: 'Better communication'   },
  { emoji: '📈', label: 'Improved performance'   },
  { emoji: '🌱', label: 'Positive work culture'  },
];

const bookingOptions = [
  { emoji: '💻', icon: <FaLaptop />,       label: 'Online Coaching',     sub: 'Via Zoom — flexible scheduling'   },
  { emoji: '👥', icon: <FaUsers />,        label: 'Virtual Workshop',    sub: 'Live team training, any timezone' },
  { emoji: '📍', icon: <FaMapMarkerAlt />, label: 'In-Person Session',   sub: 'Harare office or your venue'      },
  { emoji: '🏢', icon: <FaCalendarAlt />,  label: 'Corporate Site Visit', sub: 'Tinashe comes to you'            },
];

/* ── Page ───────────────────────────────────────────────────── */
const Home = () => (
  <div className="home-page">

    {/* ── HERO ─────────────────────────────────── */}
    <section className="hero d-flex align-items-center">
      <HeroMural />
      <div className="container text-center" style={{ position: 'relative', zIndex: 2 }}>
        <p className="hero-eyebrow hero-enter hero-enter-1">✨ Soft Skills Training &amp; HR Coaching</p>
        <h1 className="display-4 fw-bold hero-title hero-enter hero-enter-2">Maffy Online</h1>
        <p className="hero-tagline hero-enter hero-enter-3">People · Process · Performance</p>
        <p className="lead hero-subtitle hero-enter hero-enter-4">
          It&apos;s not about being soft. It&apos;s about <strong>understanding people</strong>,
          managing emotions, and building <strong>stronger workplaces</strong> — with Tinashe Moya.
        </p>
        <div className="hero-cta-group hero-enter hero-enter-5">
          <Link to="/book" className="btn btn-lg btn-main pulse-gold">📅 Book a Session</Link>
          <Link to="/services" className="btn btn-lg btn-outline-hero">Explore Programs</Link>
        </div>
      </div>
    </section>

    {/* ── EQ QUOTE BAND ────────────────────────── */}
    <section className="eq-band py-4 text-center">
      <div className="container">
        <blockquote className="eq-quote reveal mb-0">
          "When people feel <span className="eq-highlight">seen</span> and <span className="eq-highlight">heard</span>, they perform better."
        </blockquote>
        <p className="eq-attribution reveal reveal-d1">— Tinashe Moya, Senior HR Consultant &amp; Soft Skills Trainer</p>
      </div>
    </section>

    {/* ── EQ PILLARS ───────────────────────────── */}
    <section className="pillars-section py-5">
      <div className="container text-center">
        <p className="pillars-label reveal">⚡ High Emotional Intelligence leads to:</p>
        <div className="pillars-row">
          {pillars.map((p, i) => (
            <div key={i} className={`pillar-chip reveal reveal-d${i+1}`}>
              <span className="pillar-emoji">{p.emoji}</span> {p.label}
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── TRAINING PROGRAMS ────────────────────── */}
    <section className="programs-section py-5">
      <ProgramsMural />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="section-title text-center mb-2 reveal">Training Programs ✨</h2>
        <p className="section-sub text-center mb-5 reveal reveal-d1">
          Practical, people-centred workshops and coaching for individuals and organisations
        </p>
        <div className="row g-4">
          {programs.map((p, i) => (
            <div key={i} className={`col-md-4 col-sm-6 reveal reveal-d${(i % 3) + 1}`}>
              <div className="program-card">
                <div className="program-icon-wrap">
                  <span className="program-emoji">{p.emoji}</span>
                  <span className="program-icon float-icon">{p.icon}</span>
                </div>
                <h5 className="program-title">{p.title}</h5>
                <p className="program-desc">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-5 reveal">
          <Link to="/services" className="btn btn-outline-main">View All Programs →</Link>
        </div>
      </div>
    </section>

    {/* ── IMPACT STATS ─────────────────────────── */}
    <section className="stats-section py-5">
      <StatsMural />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="row text-center g-4">
          <div className="col-6 col-md-3"><AnimatedStat value={10}  suffix="+" label="Years Experience ⭐"/></div>
          <div className="col-6 col-md-3"><AnimatedStat value={25}  suffix="K+" label="LinkedIn Network 🌐"/></div>
          <div className="col-6 col-md-3"><AnimatedStat value={100} suffix="+" label="Organisations Trained 🏢"/></div>
          <div className="col-6 col-md-3"><AnimatedStat value={4}   suffix=""  label="Session Formats 📅"/></div>
        </div>
      </div>
    </section>

    {/* ── HOW TO WORK WITH TINASHE ─────────────── */}
    <section className="booking-options-section py-5">
      <div className="container text-center">
        <h2 className="section-title mb-2 reveal">Work With Tinashe 🤝</h2>
        <p className="section-sub mb-5 reveal reveal-d1">Choose a format that fits — online, in-person or on-site</p>
        <div className="row g-4 justify-content-center">
          {bookingOptions.map((b, i) => (
            <div key={i} className={`col-6 col-md-3 reveal reveal-d${i+1}`}>
              <div className="booking-option-card">
                <div className="booking-option-emoji">{b.emoji}</div>
                <div className="booking-option-label">{b.label}</div>
                <div className="booking-option-sub">{b.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 reveal">
          <Link to="/book" className="btn btn-main btn-lg pulse-gold">📅 Book Your Session</Link>
        </div>
      </div>
    </section>

    {/* ── CTA BAND ─────────────────────────────── */}
    <section className="cta-section py-5 text-center">
      <div className="container reveal">
        <h3 className="fw-bold mb-3">Ready to Transform Your Workplace? 🚀</h3>
        <p className="mb-4">
          Join organisations across Zimbabwe and beyond that have invested in soft skills
          training and seen measurable improvements in culture, communication and performance.
        </p>
        <Link to="/book" className="btn btn-main me-3">📅 Book a Session</Link>
        <Link to="/testimonials" className="btn btn-outline-hero">🌟 Read Success Stories</Link>
      </div>
    </section>

  </div>
);

export default Home;
