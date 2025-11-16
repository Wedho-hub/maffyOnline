import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/admin/login');
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <div className="admin-area">
      <h2>Admin Dashboard</h2>
      <p>From here admin can create services, posts and testimonials via the API.</p>
      <p>This is intentionally minimal — you can build forms to POST to the endpoints.</p>
      <button className="btn btn-outline-secondary" onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
