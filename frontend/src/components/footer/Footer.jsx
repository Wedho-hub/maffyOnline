import React from 'react';
import './Footer.css';

const Footer = () => (
	<footer className="site-footer bg-light py-4">
		<div className="container text-center">
			<p className="mb-1">© {new Date().getFullYear()} Maffy Online — HR & Talent Acquisition (Zimbabwe)</p>
			<small className="text-muted">Built with Bootstrap · Custom CSS · Simple admin API</small>
		</div>
	</footer>
);

export default Footer;
