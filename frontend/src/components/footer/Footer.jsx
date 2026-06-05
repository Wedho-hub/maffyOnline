import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaFacebook, FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer text-light pt-5 pb-3">
      <div className="container">
        <div className="row gy-4">

          {/* Brand & mission */}
          <div className="col-md-4">
            <h5 className="footer-brand mb-2">
              <span className="brand-highlight">Maffy</span> Online
            </h5>
            <p className="footer-tagline mb-2">People. Process. Performance.</p>
            <p className="footer-desc">
              Soft skills training and HR coaching by <strong>Tinashe Moya</strong> — helping
              Zimbabwean organisations build emotionally intelligent, high-performing teams.
              Online, in-person and on-site.
            </p>
          </div>

          {/* Quick links */}
          <div className="col-md-4">
            <h6 className="footer-heading mb-3">Quick Links</h6>
            <ul className="list-unstyled footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Tinashe</Link></li>
              <li><Link to="/services">Training Programs</Link></li>
              <li><Link to="/book">Book a Session</Link></li>
              <li><Link to="/testimonials">Success Stories</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-4">
            <h6 className="footer-heading mb-3">Get in Touch</h6>
            <p className="mb-1"><FaMapMarkerAlt className="me-2" />211 Josiah Tongogara Ave, Harare</p>
            <p className="mb-1"><FaEnvelope className="me-2" /><a href="mailto:hello@maffyonline.co.zw">hello@maffyonline.co.zw</a></p>
            <p className="mb-1"><FaPhone className="me-2" /><a href="tel:+263773527905">+263 773 527 905</a></p>
            <p><FaWhatsapp className="me-2" /><a href="https://wa.me/263773527905?text=Hi%20Tinashe" target="_blank" rel="noopener noreferrer">WhatsApp Tinashe</a></p>
            <div className="footer-social mt-3">
              <a href="https://www.facebook.com/share/18j3yEX3C3/" target="_blank" rel="noopener noreferrer" className="me-3" aria-label="Facebook"><FaFacebook /></a>
              <a href="https://www.linkedin.com/in/tinashe-moya-37729344" target="_blank" rel="noopener noreferrer" className="me-3" aria-label="LinkedIn"><FaLinkedin /></a>
              <a href="https://www.instagram.com/maffyonline_zw" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
            </div>
          </div>
        </div>

        <hr className="footer-divider my-4" />

        <div className="text-center small text-muted">
          <p className="mb-1">© {year} Maffy Online · Soft Skills Training &amp; HR Coaching · Zimbabwe</p>
          <p>Designed with care by <a id="tishbite-link" href="https://tishbitedigital.co.za" target="_blank" rel="noopener noreferrer">Tishbite Digital</a> · Let's build better workplaces together.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
