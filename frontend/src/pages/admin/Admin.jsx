import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AdminDashboard from './Dashboard.jsx';
import AdminLogin from './Login.jsx';

const Admin = () => (
  <div>
    <h1>Admin</h1>
    <p><Link to="/admin/login">Login</Link> to manage content.</p>
    <Routes>
      <Route path="/login" element={<AdminLogin/>} />
      <Route path="/dashboard" element={<AdminDashboard/>} />
    </Routes>
  </div>
);

export default Admin;
