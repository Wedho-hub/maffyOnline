import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name:'', email:'', message:'' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const validEmail = (v) => /\S+@\S+\.\S+/.test(v);

  const submit = async e => {
    e.preventDefault();
    if (!validEmail(form.email)) return alert('Please enter a valid email');
    setLoading(true);
    try{
      // placeholder: replace with API call if you wire /api/contact
      await new Promise(r=>setTimeout(r, 700));
      setSuccess(true);
      setForm({ name:'', email:'', message:'' });
    }catch(err){ console.error(err); alert('Send failed'); }
    finally{ setLoading(false); }
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <div className="contact-card card">
        <div className="card-body">
          <form onSubmit={submit} className="row g-3">
            <div className="col-md-6"><input name="name" onChange={handle} value={form.name} className="form-control" placeholder="Your name" required/></div>
            <div className="col-md-6"><input name="email" type="email" onChange={handle} value={form.email} className="form-control" placeholder="Email" required/></div>
            <div className="col-12"><textarea name="message" onChange={handle} value={form.message} className="form-control" rows="6" placeholder="Message" required/></div>
            <div className="col-12 d-flex justify-content-between align-items-center">
              <div className="contact-note">We aim to respond within 48 hours.</div>
              <div className="contact-actions">
                <button className="btn btn-main" disabled={loading}>{loading ? 'Sending…' : 'Send'}</button>
                <button type="button" className="btn btn-outline-secondary" onClick={()=>setForm({ name:'', email:'', message:'' })}>Clear</button>
              </div>
            </div>
          </form>

          {success && <div className="mt-3 contact-success">Thanks — your message has been received. We'll be in touch shortly.</div>}
        </div>
      </div>
    </div>
  );
};

export default Contact;
