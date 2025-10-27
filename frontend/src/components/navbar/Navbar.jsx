import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggle = () => setOpen(o => !o);
  const close = () => setOpen(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
      <div className="container">
        <Link className="navbar-brand fw-bold brand-text" to="/" onClick={close}>
          <span className="brand-highlight">Maffy</span> Online
        </Link>

        <button
          className={`navbar-toggler ${open ? 'collapsed' : ''}`}
          type="button"
          aria-controls="nav"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={toggle}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`collapse navbar-collapse ${open ? 'show mobile-show' : ''}`} id="nav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" onClick={close}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about" onClick={close}>About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/services" onClick={close}>Services</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/blog" onClick={close}>Blog</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/testimonials" onClick={close}>Testimonials</NavLink>
            </li>
            <li className="nav-item ms-lg-2">
              <NavLink className="btn btn-main nav-btn" to="/contact" onClick={close}>
                Contact
              </NavLink>
            </li>
            {/* auth / admin links */}
            {localStorage.getItem('token') ? (
              <>
                <li className="nav-item ms-2"><NavLink className="nav-link" to="/admin/dashboard" onClick={close}>Admin</NavLink></li>
                <li className="nav-item ms-2"><button className="btn btn-outline-secondary" onClick={() => { localStorage.removeItem('token'); close(); navigate('/'); }}>Logout</button></li>
              </>
            ) : (
              <li className="nav-item ms-2"><NavLink className="nav-link" to="/admin/login" onClick={close}>Admin Login</NavLink></li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
