import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';

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
            <p className="mb-1"><FaMapMarkerAlt className="me-2" />211 Josiah Tongogara Ave, Harare</p>
            <p className="mb-1"><FaEnvelope className="me-2" /><a href="mailto:hello@maffyonline.co.zw">hello@maffyonline.co.zw</a></p>
            <p><FaPhone className="me-2" /><a href="tel:+263773527905">+263 773 527 905</a></p>
            <div className="footer-social mt-3">
              <a href="https://www.facebook.com/share/18j3yEX3C3/" target="_blank" rel="noopener noreferrer" className="me-3"><FaFacebook /></a>
              <a href="https://www.linkedin.com/in/tinashe-moya-37729344?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="me-3"><FaLinkedin /></a>
              <a href="https://www.instagram.com/maffyonline_zw?igsh=b2xramgxZHV2YXc2" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            </div>
          </div>
        </div>

        <hr className="footer-divider my-4" />

        <div className="text-center small text-muted">
          <p className="mb-1">© {year} Maffy Online · Zimbabwe HR & Talent Acquisition Agency</p>
          <p>Designed with ❤️ by <a id="tishbite-link" href="https://wedhoportfolio.netlify.app/" target="_blank" rel="noopener noreferrer">Wedho</a> · Empowering professionals globally.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
