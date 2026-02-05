import React from 'react';
import { Link } from 'react-router-dom';
import {
    Shield, Mail, MapPin,
    Facebook, Twitter, Instagram, Linkedin,
    Globe, ChevronRight
} from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-bg-glow"></div>

            <div className="container">
                <div className="footer-grid">
                    {/* Brand & Mission */}
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">
                            <div className="footer-logo-icon">
                                <Shield size={28} />
                            </div>
                            <span className="footer-logo-text">
                                Invi<span>Guard.</span>
                            </span>
                        </Link>
                        <p className="footer-description">
                            The premier manpower infrastructure for India's examination ecosystem. DigiLocker verified students, elite support for institutions.
                        </p>
                        <div className="footer-social">
                            {[
                                { icon: Instagram, href: '#' },
                                { icon: Twitter, href: '#' },
                                { icon: Linkedin, href: '#' },
                                { icon: Facebook, href: '#' }
                            ].map((social, i) => (
                                <a key={i} href={social.href} className="footer-social-link">
                                    <social.icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Nav Links */}
                    <div className="footer-links-grid">
                        <div className="footer-links-column">
                            <h4>Platform</h4>
                            <ul>
                                <li><Link to="/">How it Works</Link></li>
                                <li><Link to="/register?role=student">For Students</Link></li>
                                <li><Link to="/register?role=center">For Institutes</Link></li>
                                <li><Link to="/about">About Us</Link></li>
                            </ul>
                        </div>
                        <div className="footer-links-column">
                            <h4>Company</h4>
                            <ul>
                                <li><Link to="/about">Our Mission</Link></li>
                                <li><Link to="/contact">Contact Support</Link></li>
                                <li><Link to="/login">Login</Link></li>
                                <li><Link to="/register">Register</Link></li>
                            </ul>
                        </div>
                        <div className="footer-links-column">
                            <h4>Headquarters</h4>
                            <div className="footer-contact">
                                <div className="footer-contact-item">
                                    <MapPin size={18} />
                                    <p>Sector 62, Electronic City,<br />Noida, UP 201301</p>
                                </div>
                                <div className="footer-contact-item">
                                    <Mail size={18} />
                                    <p>ops@inviguard.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-bottom-left">
                        <p className="footer-copyright">
                            © {new Date().getFullYear()} InviGuard Solutions Pvt. Ltd.
                        </p>
                        <div className="footer-bottom-divider"></div>
                        <div className="footer-legal">
                            <a href="#">Privacy</a>
                            <a href="#">Terms</a>
                        </div>
                    </div>

                    <div className="footer-region">
                        <Globe size={14} />
                        <span>Current Region: India</span>
                        <ChevronRight size={14} />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
