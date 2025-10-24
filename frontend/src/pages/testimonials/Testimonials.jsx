import React, { useEffect, useState } from 'react';
import API from '../../services/api';

const Testimonials = () => {
  const [items, setItems] = useState([]);
  useEffect(() => { API.get('/api/testimonials').then(r=>setItems(r.data)).catch(()=>{}); }, []);
  return (
    <div>
      <h1>Testimonials</h1>
      <div className="row">
        {items.map(t=> (
          <div className="col-md-6 mb-3" key={t._id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{t.name} {t.company && <small className="text-muted"> — {t.company}</small>}</h5>
                <p className="card-text">{t.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
