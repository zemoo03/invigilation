import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Shield, ArrowRight, UserCircle } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Solutions', path: '/#how-it-works' },
        { name: 'Contact', path: '/contact' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
                <div className="container">
                    <div className={`navbar-inner ${isScrolled ? 'navbar-inner-scrolled' : ''}`}>
                        <Link to="/" className="navbar-logo">
                            <div className="navbar-logo-icon">
                                <Shield size={24} />
                            </div>
                            <span className="navbar-logo-text">
                                Invi<span>Guard.</span>
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="navbar-desktop">
                            <div className="navbar-links">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        className={`navbar-link ${isActive(link.path) ? 'active' : ''}`}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="navbar-divider"></div>
                            <div className="navbar-buttons">
                                <button
                                    onClick={() => navigate('/login')}
                                    className="navbar-btn navbar-btn-text"
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={() => navigate('/register')}
                                    className="navbar-btn navbar-btn-primary"
                                >
                                    Get Started <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="navbar-mobile-btn"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="mobile-menu-overlay">
                    <div
                        className="mobile-menu-backdrop"
                        onClick={() => setIsMobileMenuOpen(false)}
                    ></div>
                    <div className="mobile-menu">
                        <div className="mobile-menu-header">
                            <span>Menu.</span>
                            <button onClick={() => setIsMobileMenuOpen(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className="mobile-menu-links">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="mobile-menu-link"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                        <div className="mobile-menu-buttons">
                            <button
                                onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }}
                                className="mobile-menu-btn mobile-menu-btn-outline"
                            >
                                <UserCircle size={24} /> Client Login
                            </button>
                            <button
                                onClick={() => { navigate('/register'); setIsMobileMenuOpen(false); }}
                                className="mobile-menu-btn mobile-menu-btn-primary"
                            >
                                Create Account <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
