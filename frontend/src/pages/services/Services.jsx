import React, { useEffect, useState, useRef } from 'react';
import API from '../../services/api';
import './Services.css';
import {
  FaBrain, FaComments, FaChartLine, FaHandshake,
  FaUsers, FaTrophy, FaBuilding, FaChalkboardTeacher,
} from 'react-icons/fa';

const serviceIcons = {
  'emotional-intelligence': <FaBrain size={48} color="var(--brand-gold)" />,
  'communication': <FaComments size={48} color="var(--brand-gold)" />,
  'leadership': <FaChartLine size={48} color="var(--brand-gold)" />,
  'conflict-resolution': <FaHandshake size={48} color="var(--brand-gold)" />,
  'team-building': <FaUsers size={48} color="var(--brand-gold)" />,
  'performance-coaching': <FaTrophy size={48} color="var(--brand-gold)" />,
  'hr-advisory': <FaChalkboardTeacher size={48} color="var(--brand-gold)" />,
  'corporate-workshops': <FaBuilding size={48} color="var(--brand-gold)" />,
};

/* ── Decorative mural for hero ───────────────────────────── */
const ServicesMural = () => (
  <svg style={{ position:'absolute', right:0, top:0, height:'100%', width:'auto', maxWidth:'40vw', opacity:0.18, pointerEvents:'none' }}
    viewBox="0 0 340 420" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <polygon points="170,8 332,170 170,332 8,170"   fill="none" stroke="#D4AF37" strokeWidth="1.5"/>
    <polygon points="170,50 290,170 170,290 50,170"  fill="none" stroke="#D4AF37" strokeWidth="1"/>
    <polygon points="170,92 248,170 170,248 92,170"  fill="rgba(212,175,55,0.4)" stroke="#D4AF37" strokeWidth="0.8"/>
    {[0,1,2,3].map(i=>(
      <path key={i} d={`M0 ${340+i*20} L85 ${320+i*20} L170 ${340+i*20} L255 ${320+i*20} L340 ${340+i*20}`}
        fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.6"/>
    ))}
    {[0,1,2,3,4].flatMap(r=>[0,1,2,3,4].map(c=>(
      <circle key={`${r}-${c}`} cx={260+c*16} cy={60+r*16} r={2} fill="#D4AF37" opacity="0.5"/>
    )))}
  </svg>
);

const canonical = [
  {
    key: 'emotional-intelligence',
    title: '🧠 Emotional Intelligence Training',
    summary: 'Build self-awareness, empathy and emotional regulation across your organisation.',
    details: 'This flagship program covers the five pillars of EQ: self-awareness, self-regulation, motivation, empathy and social skills. Participants leave with practical tools to manage workplace emotions, handle stress productively and lead with greater authenticity. Available as a 1-day intensive, half-day workshop or 4-week virtual course.',
    badge: 'Most Popular',
  },
  {
    key: 'communication',
    title: '💬 Communication & Presentation Skills',
    summary: 'Confident, clear communication for meetings, presentations and difficult conversations.',
    details: 'From assertive communication and active listening to presenting under pressure and navigating difficult conversations — this program equips participants with skills they can apply the very next day. Suitable for all levels, with tailored tracks for managers and frontline staff.',
  },
  {
    key: 'leadership',
    title: '🎯 Leadership Development',
    summary: 'Practical skills that turn managers into people-first leaders who deliver results.',
    details: 'A comprehensive program covering leadership styles, situational leadership, coaching conversations, delegation and accountability frameworks. Designed for new managers and experienced leaders who want to refresh their approach and build more engaged, high-performing teams.',
  },
  {
    key: 'conflict-resolution',
    title: '🤝 Conflict Resolution & Mediation',
    summary: 'Turn workplace tension into productive dialogue and lasting resolution.',
    details: 'Using proven mediation frameworks and interest-based negotiation techniques, this program helps teams surface underlying tensions, understand different conflict styles and reach durable agreements. Also available as a standalone mediation service for specific interpersonal disputes.',
  },
  {
    key: 'team-building',
    title: '👥 Team Building & Collaboration',
    summary: 'Break silos, build trust and create teams that consistently outperform.',
    details: 'Experiential team-building sessions combined with practical frameworks for psychological safety, collaborative decision-making and accountability. Designed for newly formed teams, merging departments or teams experiencing tension. Delivered in-person or virtually.',
  },
  {
    key: 'performance-coaching',
    title: '🏆 Performance Coaching',
    summary: '1:1 and group coaching with measurable milestones and real accountability.',
    details: 'Structured coaching engagements using the GROW model and strengths-based frameworks. Clients work with Tinashe over 4, 8 or 12 weeks to set goals, identify blockers and build momentum. Available for individual executives, managers, or cohorts. Online via Zoom or in-person in Harare.',
  },
  {
    key: 'hr-advisory',
    title: '📋 HR Strategy Advisory',
    summary: 'Strategic HR support — policies, workforce planning and people analytics.',
    details: 'Retained or project-based HR advisory covering workforce planning, org design, HR policy review, performance management system design and people analytics. Ideal for growing SMEs that need senior HR expertise without a full-time hire.',
  },
  {
    key: 'corporate-workshops',
    title: '🏢 Custom Corporate Workshops',
    summary: 'Bespoke on-site or virtual training designed around your specific challenges.',
    details: 'Tinashe works with your leadership team to design a fully customised training experience — from a 2-hour lunch-and-learn to a multi-day residential workshop. Topics, exercises and case studies are tailored to your industry, team size and strategic goals. Includes post-workshop action planning and optional 30-day follow-up.',
  },
];

const Services = () => {
  const [items, setItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalService, setModalService] = useState(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    API.get('/api/services').then(r => setItems(r.data)).catch(() => {});
  }, []);

  const merged = [...canonical];
  items.forEach(it => {
    if (!merged.find(m => m.title === it.title))
      merged.push({ key: it._id, title: it.title, summary: it.description?.slice(0, 140), details: it.description, image: it.image });
  });

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setModalOpen(false); };
    if (modalOpen) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [modalOpen]);

  return (
    <div>
      {/* Hero */}
      <section className="services-hero" style={{ position:'relative', overflow:'hidden' }}>
        <ServicesMural />
        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <p className="services-hero-eyebrow">✨ Soft Skills &amp; HR Coaching</p>
          <h1 className="services-hero-title">Training Programs</h1>
          <p className="services-hero-subtitle">
            People-centred workshops and coaching that turn insight into behaviour change
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="services-section container py-5">
        <div className="row services-list g-4">
          {merged.map((s, idx) => (
            <div className="col-lg-4 col-md-6 mb-4" key={s.key}>
              <div className="service-card bounce-top" style={{ animationDelay: `${idx * 80}ms` }}>
                {s.badge && <span className="service-badge">{s.badge}</span>}
                <div className="service-icon">
                  {serviceIcons[s.key] || <FaBuilding size={48} color="var(--brand-gold)" />}
                </div>
                <h5 className="service-title">{s.title}</h5>
                <p className="service-summary">{s.summary}</p>
                <button
                  className="btn-read"
                  onClick={() => { setModalService(s); setModalOpen(true); }}
                >
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {modalOpen && modalService && (
        <div className="services-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="services-modal-backdrop" onClick={() => setModalOpen(false)} />
          <div className="services-modal-panel card animate-modal">
            <div className="card-body">
              <div className="d-flex gap-3 align-items-start mb-3">
                {modalService.image ? (
                  <img src={modalService.image} alt={modalService.title} className="modal-image" />
                ) : (
                  <div className="modal-icon-wrap">
                    {serviceIcons[modalService.key] || <FaBuilding size={40} color="var(--brand-gold)" />}
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  <div className="d-flex justify-content-between align-items-start mb-1">
                    <h4 id="modal-title" className="mb-0">{modalService.title}</h4>
                    <button ref={closeBtnRef} className="btn btn-sm btn-outline-secondary ms-2" onClick={() => setModalOpen(false)}>Close</button>
                  </div>
                  <p className="text-muted small mt-1 mb-3">{modalService.summary}</p>
                  <div className="mt-2">{modalService.details}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
