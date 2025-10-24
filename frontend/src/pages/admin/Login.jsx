import React, { useState } from 'react';
import API from '../../services/api';

const Login = () => {
  const [form, setForm] = useState({ email:'', password:'' });
  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async e => {
    e.preventDefault();
    try{
      const r = await API.post('/api/auth/login', form);
      localStorage.setItem('token', r.data.token);
      alert('Logged in — go to /admin/dashboard');
  }catch{ alert('Login failed'); }
  };
  return (
    <form onSubmit={submit} style={{maxWidth:420}}>
      <div className="mb-3"><input className="form-control" name="email" placeholder="Email" value={form.email} onChange={handle} required/></div>
      <div className="mb-3"><input className="form-control" name="password" type="password" placeholder="Password" value={form.password} onChange={handle} required/></div>
      <button className="btn btn-primary">Login</button>
    </form>
  );
};

export default Login;
