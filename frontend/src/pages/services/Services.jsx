import React, { useEffect, useState, useRef } from 'react';
import API from '../../services/api';
import './Services.css';
import { FaUserTie, FaUsers, FaClipboardList, FaHandshake, FaChartLine, FaChalkboardTeacher, FaFileContract, FaCog } from 'react-icons/fa';
// Map service keys to icons
const serviceIcons = {
  'global-recruitment': <FaUserTie size={48} color="var(--brand-gold)" />,
  'onboarding': <FaUsers size={48} color="var(--brand-gold)" />,
  'hr-policies': <FaClipboardList size={48} color="var(--brand-gold)" />,
  'industrial-relations': <FaHandshake size={48} color="var(--brand-gold)" />,
  'workforce-planning': <FaChartLine size={48} color="var(--brand-gold)" />,
  'training-development': <FaChalkboardTeacher size={48} color="var(--brand-gold)" />,
  'contracts': <FaFileContract size={48} color="var(--brand-gold)" />,
  'administrative-management': <FaCog size={48} color="var(--brand-gold)" />,
};

const canonical = [
  { key: 'global-recruitment', title: 'Global recruitment', summary: 'Sourcing international talent to fill critical roles quickly and reliably.', details: 'We manage end-to-end international recruitment including sourcing, vetting, interviews, compliance checks, and relocation assistance where required.' },
  { key: 'onboarding', title: 'Onboarding', summary: 'Structured onboarding to accelerate new hire productivity.', details: 'Custom onboarding journeys, buddy programs, induction training and probation monitoring to ensure retention and performance.' },
  { key: 'hr-policies', title: 'HR policies & procedures', summary: 'Create compliant, clear HR handbooks and SOPs.', details: 'Drafting employee handbooks, discipline procedures, leave policies, code of conduct, and bespoke SOPs aligned to local law.' },
  { key: 'industrial-relations', title: 'Industrial relations', summary: 'Managing employer-employee relations, disputes and negotiations.', details: 'We advise on collective bargaining, dispute resolution, disciplinary matters and negotiate with unions where needed.' },
  { key: 'workforce-planning', title: 'Strategic workforce planning/management', summary: 'Align workforce to business strategy through planning and analytics.', details: 'Workforce analytics, succession planning, role profiling and org design to ensure you have the right talent at the right time.' },
  { key: 'training-development', title: 'Training & development', summary: 'Upskilling programs designed for measurable outcomes.', details: 'Tailored training workshops, leadership development programs, and competency frameworks to grow staff capability.' },
  { key: 'contracts', title: 'Contracts of employment', summary: 'Legally sound, clear contracts and employment agreements.', details: 'Draft and review employment contracts, NDAs, and consultancy agreements that protect your business and comply with law.' },
  { key: 'administrative-management', title: 'Administrative management', summary: 'Back-office HR admin and systems support.', details: 'Payroll liaison, HRIS setup, record keeping and administrative processes to keep HR running smoothly.' },
];

const Services = () => {
  const [items, setItems] = useState([]);
  // unused inline expand replaced by modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalService, setModalService] = useState(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    API.get('/api/services').then(r => setItems(r.data)).catch(() => {});
  }, []);

  // merge canonical with API-provided items (API items appended if different)
  const merged = [...canonical];
  items.forEach(it => {
    if (!merged.find(m => m.title === it.title)) merged.push({ key: it._id, title: it.title, summary: it.description?.slice(0,140), details: it.description, image: it.image });
  });

  // handle Escape key and focus when modal opens
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setModalOpen(false);
    };
    if (modalOpen) {
      document.addEventListener('keydown', onKey);
      // lock background scroll
      document.body.style.overflow = 'hidden';
      // focus close button a tick later
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [modalOpen]);

  return (
    <div>
      {/* Hero Section */}
      <section className="services-hero">
        <div className="container">
          <h1 className="services-hero-title">Our Services</h1>
          <p className="services-hero-subtitle">Comprehensive HR and talent solutions tailored to your business needs</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-section container py-5">
        <div className="row services-list g-4">
          {merged.map((s, idx) => (
            <div className="col-lg-4 col-md-6 mb-4" key={s.key}>
              <div className="service-card bounce-top" style={{ animationDelay: `${idx * 80}ms` }}>
                <div className="service-icon">
                  {serviceIcons[s.key] || <FaCog size={48} color="var(--brand-gold)" />}
                </div>
                <h5 className="service-title">{s.title}</h5>
                <p className="service-summary">{s.summary}</p>
                <button className="btn-read" onClick={() => { setModalService(s); setModalOpen(true); }}>
                  Learn More →
                </button>
            </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {modalOpen && modalService && (
        <div className="services-modal" role="dialog" aria-modal="true">
          <div className="services-modal-backdrop" onClick={() => setModalOpen(false)} />
          <div className="services-modal-panel card animate-modal">
            <div className="card-body">
              <div className="d-flex gap-3 align-items-start mb-3">
                {/* image or icon */}
                {modalService.image ? (
                  <img src={modalService.image} alt={modalService.title} className="modal-image" />
                  ) : (
                  <svg className="modal-icon" width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="var(--brand-gold)" opacity="0.12" />
                    <circle cx="12" cy="12" r="4" fill="var(--brand-charcoal)" />
                  </svg>
                )}

                <div style={{flex:1}}>
                  <div className="d-flex justify-content-between align-items-start mb-1">
                    <h4 className="mb-0">{modalService.title}</h4>
                    <button ref={closeBtnRef} className="btn btn-sm btn-outline-secondary" onClick={() => setModalOpen(false)}>Close</button>
                  </div>
                  <div className="mt-3">{modalService.details}</div>
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
