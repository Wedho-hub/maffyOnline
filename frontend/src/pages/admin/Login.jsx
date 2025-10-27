import React, { useState } from 'react';
import API from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ username:'', password:'' });
  const [useEnv, setUseEnv] = useState(true);
  const navigate = useNavigate();

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async e => {
    e.preventDefault();
    try{
      const url = useEnv ? '/api/auth/env-login' : '/api/auth/login';
      // env-login expects { username, password }, login expects { email, password }
      const payload = useEnv ? { username: form.username, password: form.password } : { email: form.username, password: form.password };
      const r = await API.post(url, payload);
      localStorage.setItem('token', r.data.token);
      // redirect to dashboard
      navigate('/admin/dashboard');
    }catch(err){
      console.error(err);
      alert(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={submit} style={{maxWidth:420}}>
      <div className="form-check mb-3">
        <input className="form-check-input" type="checkbox" checked={useEnv} id="useEnv" onChange={e=>setUseEnv(e.target.checked)} />
        <label className="form-check-label" htmlFor="useEnv">Use server admin credentials (from .env)</label>
      </div>
      <div className="mb-3"><input className="form-control" name="username" placeholder={useEnv ? 'Admin username' : 'Email'} value={form.username} onChange={handle} required/></div>
      <div className="mb-3"><input className="form-control" name="password" type="password" placeholder="Password" value={form.password} onChange={handle} required/></div>
      <div className="d-flex gap-2">
        <button className="btn btn-primary">Login</button>
        <button type="button" className="btn btn-outline-secondary" onClick={() => { setForm({ username:'', password:'' }); }}>Clear</button>
      </div>
    </form>
  );
};

export default Login;
