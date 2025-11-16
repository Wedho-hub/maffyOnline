import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  // core short list for the home page (brief display)
  const coreServices = [
    { title: 'Global recruitment', description: 'Sourcing and placing top talent across borders to meet your strategic hiring needs.' },
    { title: 'Onboarding', description: 'Smooth, structured onboarding programs to integrate new hires quickly and effectively.' },
    { title: 'HR policies & procedures', description: 'Clear, compliant HR policies and practical procedures tailored to your business.' },
    { title: 'Training & development', description: 'Upskilling programs and training pathways to grow employee capability.' },
  ];

  return (
    <div className="home-page">
      {/* HERO SECTION */}
      <section className="hero text-center d-flex align-items-center">
        <div className="container">
          <h1 className="display-4 fw-bold hero-title">Maffy Online</h1>
            <p className="hero-tagline">HR & Talent Acquisition — recruitment, training and HR advisory</p>
            <p className="lead hero-subtitle decorated small">
            <svg className="decoration-svg left s-left" viewBox="0 0 120 56" aria-hidden="true" focusable="false">
              <path d="M6,26 C22,6 74,2 98,10 C122,18 118,42 92,48 C66,54 20,48 6,26 Z" fill="var(--brand-burgundy)" />
            </svg>
            Empowering Zimbabwean businesses with top-tier talent acquisition and HR solutions.
            We find, vet, and place exceptional professionals so you can focus on growing your brand.
          </p>
          <Link to="/services" className="btn btn-lg btn-main mt-3">Explore Our Services</Link>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="services-section py-5">
        <div className="container">
          <h2 className="section-title text-center mb-5">Our Core Services</h2>
          <div className="row g-4 services-list">
            {coreServices.map((s, idx) => (
              <div key={idx} className="col-6 col-md-3 service-item">
                <div className="service-name">{s.title}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/services" className="btn btn-outline-main">View All Services</Link>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="cta-section py-5 text-center">
        <div className="container">
          <h3 className="fw-bold mb-3">Ready to Hire or Get Hired?</h3>
          <p className="mb-4">
            Join hundreds of professionals and companies across Zimbabwe and beyond 
            who trust Maffy Online for recruitment excellence.
          </p>
          <Link to="/contact" className="btn btn-main">Get In Touch</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
