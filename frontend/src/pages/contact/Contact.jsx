import React, { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name:'', email:'', message:'' });
  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = e => { e.preventDefault(); alert('Thanks! Message would be sent to Maffy Online.'); };

  return (
    <div>
      <h1>Contact Us</h1>
      <form onSubmit={submit} className="row g-3" style={{maxWidth:700}}>
        <div className="col-12"><input name="name" onChange={handle} value={form.name} className="form-control" placeholder="Your name" required/></div>
        <div className="col-12"><input name="email" type="email" onChange={handle} value={form.email} className="form-control" placeholder="Email" required/></div>
        <div className="col-12"><textarea name="message" onChange={handle} value={form.message} className="form-control" rows="6" placeholder="Message" required/></div>
        <div className="col-12"><button className="btn btn-primary">Send</button></div>
      </form>
    </div>
  );
};

export default Contact;
