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

    const isHome = location.pathname === '/';

    return (
        <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled ? 'py-4' : 'py-8'}`}>
            <div className={`container mx-auto px-6`}>
                <div className={`flex items-center justify-between p-2 rounded-[1.5rem] transition-all duration-500 ${isScrolled ? 'glass shadow-premium px-6 py-3 border border-white/50' : 'bg-transparent'}`}>
                    <Link to="/" className="flex items-center gap-3 active:scale-95 transition-transform">
                        <div className="bg-primary p-2.5 rounded-2xl shadow-lg shadow-primary-glow">
                            <Shield size={24} className="text-white" fill="currentColor" />
                        </div>
                        <span className="text-2xl font-black font-outfit tracking-tighter">
                            Invi<span className="text-primary">Guard.</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-10">
                        <div className="flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="text-sm font-bold text-text-muted hover:text-primary transition-colors tracking-wide uppercase"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                        <div className="h-6 w-[1px] bg-border"></div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/login')}
                                className="text-sm font-bold text-text-main hover:text-primary transition-colors px-4 py-2"
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => navigate('/register')}
                                className="px-8 py-3.5 bg-primary text-white text-sm font-bold rounded-xl shadow-xl shadow-primary-glow hover:bg-primary-dark hover:-translate-y-1 active:translate-y-0 transition-all flex items-center gap-2"
                            >
                                Get Started <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-3 rounded-xl bg-white shadow-sm border border-border"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} className="text-primary" /> : <Menu size={24} className="text-primary" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-[110] p-6 animate-up">
                    <div className="absolute inset-0 bg-text-main/20 backdrop-blur-md" onClick={() => setIsMobileMenuOpen(false)}></div>
                    <div className="relative glass-dark rounded-[2.5rem] p-10 flex flex-col gap-8 shadow-2xl h-full">
                        <div className="flex items-center justify-between">
                            <span className="text-2xl font-black tracking-tighter">Menu.</span>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-white/10 rounded-full"><X size={20} /></button>
                        </div>
                        <div className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-3xl font-black hover:text-primary transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                        <div className="mt-auto flex flex-col gap-4">
                            <button
                                onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }}
                                className="w-full py-5 bg-white/10 text-white font-bold rounded-2xl flex items-center justify-center gap-3"
                            >
                                <UserCircle size={24} /> Client Login
                            </button>
                            <button
                                onClick={() => { navigate('/register'); setIsMobileMenuOpen(false); }}
                                className="w-full py-5 bg-primary text-white font-bold rounded-2xl flex items-center justify-center gap-3"
                            >
                                Create Account <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
