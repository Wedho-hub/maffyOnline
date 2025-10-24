import React, { useEffect, useState } from 'react';
import Article from '../../components/article/Article';
import API from '../../services/api';
import './Home.css';

const Home = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    API.get('/api/services')
      .then(res => setServices(res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="home-page">
      {/* HERO SECTION */}
      <section className="hero text-center d-flex align-items-center">
        <div className="container">
          <h1 className="display-4 fw-bold hero-title">Maffy Online</h1>
          <p className="lead hero-subtitle">
            Empowering Zimbabwean businesses with top-tier talent acquisition and HR solutions.
            We find, vet, and place exceptional professionals so you can focus on growing your brand.
          </p>
          <a href="/services" className="btn btn-lg btn-main mt-3">Explore Our Services</a>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="services-section py-5">
        <div className="container">
          <h2 className="section-title text-center mb-5">Our Core Services</h2>
          <div className="row g-4">
            {services.length ? (
              services.slice(0, 3).map((s) => (
                <div key={s._id} className="col-md-4">
                  <Article
                    title={s.title}
                    excerpt={s.description}
                    href={`/services`}
                  />
                </div>
              ))
            ) : (
              <div className="col-12 text-center text-muted">No services available yet.</div>
            )}
          </div>
          <div className="text-center mt-4">
            <a href="/services" className="btn btn-outline-main">View All Services</a>
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
          <a href="/contact" className="btn btn-main">Get In Touch</a>
        </div>
      </section>
    </div>
  );
};

export default Home;
