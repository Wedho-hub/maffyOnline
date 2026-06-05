import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { Link } from 'react-router-dom';
import './Testimonials.css';
import { FaQuoteLeft, FaCheckCircle } from 'react-icons/fa';
import useScrollReveal from '../../hooks/useScrollReveal';

/* decorative mural for hero */
const StoriesMural = () => (
  <svg style={{ position:'absolute', right:0, top:0, height:'100%', width:'auto', maxWidth:'38vw', opacity:0.15, pointerEvents:'none' }}
    viewBox="0 0 320 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <polygon points="160,8 312,160 160,312 8,160"   fill="none" stroke="#D4AF37" strokeWidth="1.5"/>
    <polygon points="160,50 270,160 160,270 50,160"  fill="none" stroke="#D4AF37" strokeWidth="1"/>
    <polygon points="160,92 228,160 160,228 92,160"  fill="rgba(212,175,55,0.35)" stroke="#D4AF37" strokeWidth="0.8"/>
    {[0,1,2].map(i=>(
      <path key={i} d={`M0 ${320+i*22} L80 ${298+i*22} L160 ${320+i*22} L240 ${298+i*22} L320 ${320+i*22}`}
        fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.6"/>
    ))}
    {[0,1,2,3].flatMap(r=>[0,1,2,3].map(c=>(
      <circle key={`${r}-${c}`} cx={244+c*16} cy={52+r*16} r={2.2} fill="#D4AF37" opacity="0.45"/>
    )))}
  </svg>
);

const clientStories = [
  {
    _id: 'cs1',
    topic: 'Customer Experience & Soft Skills',
    title: 'Elevating Customer Experience in a Competitive Market',
    context:
      'A service-based business was investing heavily in marketing but struggling with low client retention and limited repeat engagement. Despite strong lead generation, the frontline team lacked structured training in customer service excellence and the soft skills needed to sustain client relationships.',
    intervention:
      'Maffy Online designed and implemented a bespoke Customer Experience and Soft Skills Development Programme tailored to the organisation\'s service standards — covering communication excellence, professionalism, emotional intelligence, and consistent service delivery.',
    outcomes: [
      'Strengthened end-to-end client experience delivery',
      'Improved client retention and relationship continuity',
      'Increased referral-driven business growth',
      'Alignment between brand promise and service execution',
    ],
    quote:
      'This intervention fundamentally changed how we view our clients. We are no longer just attracting business — we are intentionally building lasting relationships.',
    attribution: 'Business Owner · Service Industry, Zimbabwe',
  },
  {
    _id: 'cs2',
    topic: 'HR Structure & Workplace Governance',
    title: 'Strengthening Retention Through HR Structure',
    context:
      'An organisation was experiencing persistent staff turnover despite significant recruitment spend. A workplace assessment uncovered the root cause: no formal HR policies, inconsistent working conditions, salary structures unaligned to job levels, and breaches in pay confidentiality that created widespread employee dissatisfaction.',
    intervention:
      'Maffy Online established foundational HR governance frameworks — structured policies and procedures, role clarity, level-based salary structuring guidance, and reinforced confidentiality standards — transitioning the organisation from informal to professional workplace practices.',
    outcomes: [
      'Improved employee trust and workplace stability',
      'Enhanced clarity around roles and expectations',
      'Progress toward fair and transparent compensation',
      'Reduced internal dissatisfaction and workplace tension',
    ],
    quote:
      'We realised our retention problem was not recruitment — it was structure. Once we addressed the internal systems, the entire workplace dynamic began to shift.',
    attribution: 'Managing Director · Multi-Sector SME, Zimbabwe',
  },
  {
    _id: 'cs3',
    topic: 'Role Design & Delegation',
    title: 'Restoring Clarity Through Role Definition',
    context:
      'An organisation had hired across multiple functions but faced constant operational confusion. Tasks were duplicated by some employees and missed by others — work was assigned informally based on availability rather than defined responsibilities, leading to missed deadlines and last-minute disruptions.',
    intervention:
      'Maffy Online implemented foundational HR structuring: formal job descriptions for all roles, role clarification across departments, structured task allocation guidance, and coaching the business owner on delegation practices — shifting the organisation from reactive task management to a defined, role-based operating model.',
    outcomes: [
      'Clear ownership of responsibilities across all roles',
      'Reduced task duplication and operational confusion',
      'Improved workflow efficiency and accountability',
      'Stronger managerial control and delegation clarity',
    ],
    quote:
      'We realised we were not managing people incorrectly — we simply had no structure defining who was responsible for what. Once roles were clarified, everything started to function properly.',
    attribution: 'Operations Manager · Growing Business, Zimbabwe',
  },
  {
    _id: 'cs4',
    topic: 'Compliance & Risk Advisory',
    title: 'Mitigating Risk Through Compliance and Workplace Standards',
    context:
      'A client had deprioritised regulatory compliance, resulting in summons from a regulatory body for failing to meet CBA minimum requirements. Employees were simultaneously raising concerns about below-standard wages, lack of protective clothing, and unfair dismissals — exposing the business to serious legal, financial, and reputational risk.',
    intervention:
      'Maffy Online provided structured compliance advisory: education on statutory and CBA obligations, guidance on workplace safety standards, NSSA contribution requirements, and a full risk exposure analysis — highlighting that a workplace injury without NSSA compliance could result in the business bearing full liability with no cover.',
    outcomes: [
      'Clear understanding of legal and financial exposure',
      'Movement toward CBA and statutory compliance',
      'Improved employee safety and welfare consideration',
      'Reduced risk of regulatory penalties and workplace disputes',
    ],
    quote:
      'We underestimated the impact of non-compliance. This engagement opened our eyes to the real risks we were carrying as a business.',
    attribution: 'Business Owner · Labour-Intensive Industry, Zimbabwe',
  },
];

const Testimonials = () => {
  const [apiItems, setApiItems] = useState([]);
  useEffect(() => { API.get('/api/testimonials').then(r => setApiItems(r.data)).catch(() => {}); }, []);

  const heroRef = useScrollReveal();
  const ctaRef  = useScrollReveal();

  return (
    <div className="stories-page">

      {/* Hero */}
      <section className="stories-hero text-center" style={{ position:'relative', overflow:'hidden' }}>
        <StoriesMural />
        <div className="container reveal" style={{ position:'relative', zIndex:1 }} ref={heroRef}>
          <p className="stories-eyebrow">🌟 Results That Speak</p>
          <h1 className="stories-title">Client Success Stories</h1>
          <p className="stories-subtitle">
            Real challenges. Real interventions. Real outcomes — from organisations across Zimbabwe
            that invested in people, process and performance.
          </p>
        </div>
      </section>

      {/* Stories */}
      <section className="container stories-body py-5">
        <div className="row g-5">
          {clientStories.map(s => (
            <div key={s._id} className="col-12 reveal">
              <article className="story-card story-card--full">

                <div className="story-card-header">
                  <span className="story-topic-tag">{s.topic}</span>
                  <h3 className="story-card-title">{s.title}</h3>
                </div>

                <div className="story-card-body">
                  <div className="story-col">
                    <p className="story-section-label">The Challenge</p>
                    <p className="story-text">{s.context}</p>
                    <p className="story-section-label mt-3">The Intervention</p>
                    <p className="story-text">{s.intervention}</p>
                  </div>

                  <div className="story-col">
                    <p className="story-section-label">Key Outcomes</p>
                    <ul className="story-outcomes-list">
                      {s.outcomes.map((o, i) => (
                        <li key={i}>
                          <FaCheckCircle className="outcome-check" aria-hidden="true" />
                          <span>{o}</span>
                        </li>
                      ))}
                    </ul>

                    <blockquote className="story-blockquote">
                      <FaQuoteLeft className="story-quote-icon-lg" aria-hidden="true" />
                      <p>"{s.quote}"</p>
                      <footer className="story-attribution">— {s.attribution}</footer>
                    </blockquote>
                  </div>
                </div>

              </article>
            </div>
          ))}
        </div>

        {/* API-provided testimonials (short quotes) */}
        {apiItems.length > 0 && (
          <div className="row g-4 mt-4">
            <div className="col-12">
              <h2 className="stories-section-sub-title text-center mb-4">What clients say</h2>
            </div>
            {apiItems.map(t => (
              <div key={t._id} className="col-md-6">
                <article className="story-card">
                  <FaQuoteLeft className="story-quote-icon" aria-hidden="true" />
                  {t.topic && <span className="story-topic-tag">{t.topic}</span>}
                  <p className="story-message">"{t.message}"</p>
                  <div className="story-footer">
                    <img
                      src={t.image || '/images/avatar-placeholder.png'}
                      alt={t.name}
                      className="story-avatar"
                    />
                    <div>
                      <div className="story-name">{t.name}</div>
                      <div className="story-role">{t.role}{t.company && <> · <em>{t.company}</em></>}</div>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="stories-cta text-center mt-5 py-4 reveal" ref={ctaRef}>
          <h3 className="stories-cta-title">Ready to write your success story?</h3>
          <p className="stories-cta-sub">
            Join organisations across Zimbabwe that have transformed their teams through targeted
            soft skills training and structured HR advisory.
          </p>
          <Link to="/book" className="btn btn-main btn-lg me-3">Book a Session</Link>
          <Link to="/services" className="btn btn-outline-main">View Training Programs</Link>
        </div>
      </section>

    </div>
  );
};

export default Testimonials;
