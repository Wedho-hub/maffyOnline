import React, { useEffect } from 'react';
import './About.css';

const About = () => {
  useEffect(() => {
    document.title = 'About — Maffy Online | HR & Talent Acquisition (Zimbabwe)';
    const meta = document.querySelector("meta[name='description']");
    const desc = "Maffy Online is a Zimbabwe-based HR and talent acquisition firm offering recruitment, executive search, HR advisory and training to help organisations attract and retain top talent.";
    if (meta) meta.setAttribute('content', desc);
    else {
      const m = document.createElement('meta');
      m.name = 'description';
      m.content = desc;
      document.head.appendChild(m);
    }
  }, []);

  const vision = `To be recognized as one of the best Human Resources specialists regionally, who offer sound, and strategic solutions to everyday problems related to recruitment, performance, training, and retention.`;
  const mission = `To help our clients attract and retain its key human resources team and foster a rewarding system anchored on performance. We develop training programs designed to offer solutions and the growth of the business to all stakeholders.`;
  const values = ['Client Focus', 'Integrity', 'Professionalism', 'Compassion', 'Dependability'];

  return (
    <article className="about-page container my-5">
      <div className="row align-items-start">
        <div className="col-md-4 mb-3">
          <figure className="about-figure">
            <img
              src="https://th.bing.com/th/id/OIP.pinGTgCwsCnVUjmyk8uH4AHaE8?w=276&h=184&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
              alt="Maffy Online — HR consulting"
              className="img-fluid about-image"
            />
          </figure>
        </div>

        <div className="col-md-8">
          <header>
            <h1 className="display-6 mb-3">About Maffy Online</h1>
            <p className="lead text-muted">Professional HR & Talent Acquisition services for Zimbabwean organisations and regional clients.</p>
          </header>

          <section className="mt-4">
            <h2 className="h5">Vision</h2>
            <p>{vision}</p>
          </section>

          <section className="mt-4">
            <h2 className="h5">Mission Statement</h2>
            <p className="fst-italic">“{mission}”</p>
          </section>

          <section className="mt-4">
            <h2 className="h5">Our Values</h2>
            <ul className="values-list">
              {values.map((v) => (
                <li key={v} className="value-item">
                  <i className="bi bi-check2-circle value-icon" aria-hidden></i>
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </section>

        </div>
      </div>

      {/* Structured data for SEO (Organization) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Maffy Online",
          description: "HR and Talent Acquisition services (Zimbabwe)",
          url: typeof window !== 'undefined' ? window.location.origin : 'https://maffyonline.example',
          sameAs: [],
        })}
      </script>
    </article>
  );
};

export default About;
