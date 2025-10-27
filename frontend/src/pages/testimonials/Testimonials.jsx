import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import './Testimonials.css';

const placeholders = [
  { _id: 't1', name: 'Miriam Chikowore', role: 'HR Manager', company: 'TechCo', message: 'Maffy Online helped us fill a hard-to-find role in under 4 weeks. Their screening was excellent.' },
  { _id: 't2', name: 'Tendai Moyo', role: 'Operations Lead', company: 'AgriPlus', message: 'Professional and responsive; the onboarding programme made new hires productive quickly.' },
];

const Testimonials = () => {
  const [items, setItems] = useState([]);
  useEffect(() => { API.get('/api/testimonials').then(r=>setItems(r.data)).catch(()=>{}); }, []);
  const list = items.length ? items : placeholders;

  return (
    <div>
      <h1>Testimonials</h1>
      <div className="row testimonials-grid">
        {list.map(t=> (
          <div className="col-md-6 mb-3" key={t._id}>
            <div className="testimonial-card">
              <div className="d-flex gap-3 align-items-start">
                <img src={t.image || '/images/avatar-placeholder.png'} alt={t.name} className="testimonial-avatar" />
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role} {t.company && <>· {t.company}</>}</div>
                  <div className="testimonial-message">{t.message}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
