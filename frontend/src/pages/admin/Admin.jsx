import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AdminDashboard from './Dashboard.jsx';
import AdminLogin from './Login.jsx';
import ServicesAdmin from './ServicesAdmin.jsx';
import PostsAdmin from './PostsAdmin.jsx';
import TestimonialsAdmin from './TestimonialsAdmin.jsx';
import SiteAdmin from './SiteAdmin.jsx';
import './admin.css';

const Admin = () => (
  <div>
    <h1>Admin</h1>
    <nav className="mb-3">
      <Link className="me-3" to="/admin/login">Login</Link>
      <Link className="me-3" to="/admin/dashboard">Dashboard</Link>
      <Link className="me-3" to="/admin/services">Services</Link>
      <Link className="me-3" to="/admin/posts">Posts</Link>
      <Link className="me-3" to="/admin/testimonials">Testimonials</Link>
      <Link className="me-3" to="/admin/site">Site</Link>
    </nav>

    <Routes>
      <Route path="/login" element={<AdminLogin/>} />
      <Route path="/dashboard" element={<AdminDashboard/>} />
      <Route path="/services" element={<ServicesAdmin/>} />
      <Route path="/posts" element={<PostsAdmin/>} />
      <Route path="/testimonials" element={<TestimonialsAdmin/>} />
      <Route path="/site" element={<SiteAdmin/>} />
    </Routes>
  </div>
);

export default Admin;
