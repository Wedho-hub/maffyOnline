import React, { useEffect, useState } from 'react';
import API from '../../services/api';

const Services = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    API.get('/api/services').then(r => setItems(r.data)).catch(() => {});
  }, []);

  return (
    <div>
      <h1>Our Services</h1>
      <div className="row">
        {items.map(s => (
          <div className="col-md-6 mb-3" key={s._id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{s.title}</h5>
                <p className="card-text">{s.description}</p>
                {s.features && <ul>{s.features.map((f,i)=>(<li key={i}>{f}</li>))}</ul>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
