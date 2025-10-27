import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer text-light pt-5 pb-3">
      <div className="container">
        <div className="row gy-4">
          {/* Brand & Mission */}
          <div className="col-md-4">
            <h5 className="footer-brand mb-3">
              <span className="brand-highlight">Maffy</span> Online
            </h5>
            <p className="footer-desc">
              A Zimbabwe-based HR and Talent Acquisition agency helping businesses find, vet, 
              and place exceptional talent. Building bridges between African excellence and global opportunities.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4">
            <h6 className="footer-heading mb-3">Quick Links</h6>
            <ul className="list-unstyled footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Our Services</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4">
            <h6 className="footer-heading mb-3">Contact Us</h6>
            <p className="mb-1"><i className="bi bi-geo-alt-fill me-2"></i>Harare, Zimbabwe</p>
            <p className="mb-1"><i className="bi bi-envelope-fill me-2"></i>info@maffyonline.co.zw</p>
            <p><i className="bi bi-telephone-fill me-2"></i>+263 77 123 4567</p>
            <div className="footer-social mt-3">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="me-3"><i className="bi bi-facebook"></i></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="me-3"><i className="bi bi-linkedin"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer"><i className="bi bi-instagram"></i></a>
            </div>
          </div>
        </div>

        <hr className="footer-divider my-4" />

        <div className="text-center small text-muted">
          <p className="mb-1">© {year} Maffy Online · Zimbabwe HR & Talent Acquisition Agency</p>
          <p>Designed with ❤️ by <a id="tishbite-link" href="#" target="_blank" rel="noreferrer">Tishbite Digital</a> · Empowering professionals globally.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
