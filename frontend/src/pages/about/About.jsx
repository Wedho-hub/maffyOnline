import React, { useEffect } from 'react';
import './About.css';
import { FaCheckCircle } from 'react-icons/fa';

const aboutImage1 = '/images/about1.jpg';
const aboutImage2 = '/images/about2.jpg';

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
            <img src={aboutImage1} alt="Maffy Online — team" className="img-fluid about-image" />
            <img src={aboutImage2} alt="Maffy Online — office" className="img-fluid about-image mt-3" />
          </figure>
        </div>

        <div className="col-md-8">
          <header>
            <h1 className="display-6 mb-3">About Maffy Online</h1>
            <p className="lead text-muted">Professional HR & Talent Acquisition services for Zimbabwean organisations and regional clients.</p>
          </header>

          <section className="mt-4">
            <h2 className="h5">Meet the Senior Consultant</h2>
            <p>
              Tinashe Moya is the Senior Consultant at Maffy Online — an experienced HR practitioner and public speaker
              with a decade-long track record in recruitment, training and organisational development. She partners with
              organisations to design people-centred solutions that reduce turnover, sharpen performance and build resilient
              teams tuned to strategic goals.
            </p>
            <p>
              Her expertise spans full-cycle recruitment, bespoke onboarding programmes, HR policy design and practical
              training across leadership, performance management and compliance. Tinashe combines hands-on consulting with
              classroom-style training to help staff and managers translate HR strategy into measurable outcomes.
            </p>
            <ul className="mt-2">
              <li><strong>Experience:</strong> Over 10 years consulting in HR, learning & development and talent acquisition.</li>
              <li><strong>Reach:</strong> A strong professional network (25,000+ LinkedIn followers) that helps surface
                high-quality candidates and market insights for clients.</li>
              <li><strong>Qualifications:</strong> BSc (Hons) Political Science — University of Zimbabwe (2010); Diploma in
                Human Resources Management (Alison, 2022); additional certifications in Public Relations and Sales Management.</li>
              <li><strong>Professional focus:</strong> Strategic HR, people analytics, competency-based training and practical
                talent-selection frameworks.</li>
            </ul>
            <p className="fst-italic mt-2">
              Tinashe believes "staff issues are like an iceberg — the unsaid must be unearthed for the visible problems to fade." She
              is committed to partnership-led approaches and plans to pursue a Master’s degree in Strategic Management when her
              professional schedule allows.
            </p>
          </section>

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
                  <FaCheckCircle className="value-icon" aria-hidden />
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
      {/* Person structured data for the senior consultant */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Tinashe Moya",
          jobTitle: "Senior HR Consultant",
          worksFor: { "@type": "Organization", name: "Maffy Online" },
          description: "Senior HR consultant specialising in recruitment, training and organisational development with over 10 years' experience.",
          image: typeof window !== 'undefined' ? `${window.location.origin}/images/about1.jpg` : '/images/about1.jpg'
        })}
      </script>
    </article>
  );
};

export default About;
