import React, { useState } from 'react';
import './Contact.css';
import { FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';

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
    <div className="contact-page container my-5">
      <h1>Contact Us</h1>
      <div className="row">
        <div className="col-lg-8">
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

        <aside className="col-lg-4">
          <div className="card p-3 mb-3">
            <h6 className="mb-2">Office</h6>
            <p className="mb-1">211 Josiah Tongogara Ave, Harare</p>
            <p className="mb-1">Phone: <a href="tel:+263773527905">+263 773 527 905</a></p>
            <p>Email: <a href="mailto:hello@maffyonline.co.zw">hello@maffyonline.co.zw</a></p>
          </div>
          <div className="card p-3 mb-3">
            <h6 className="mb-2">Opening Hours</h6>
            <p className="mb-0">Mon – Fri: 9:00am – 5:00pm</p>
          </div>
          <div className="card p-3">
            <h6 className="mb-2">Follow Us</h6>
            <div className="d-flex">
              <a href="https://www.facebook.com/share/18j3yEX3C3/" target="_blank" rel="noopener noreferrer" className="me-3"><FaFacebook size={24} /></a>
              <a href="https://www.linkedin.com/in/tinashe-moya-37729344?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="me-3"><FaLinkedin size={24} /></a>
              <a href="https://www.instagram.com/maffyonline_zw?igsh=b2xramgxZHV2YXc2" target="_blank" rel="noopener noreferrer"><FaInstagram size={24} /></a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Contact;
