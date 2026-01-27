import React from 'react';
import { Link } from 'react-router-dom';
import {
    Shield, Mail, Phone, MapPin,
    Facebook, Twitter, Instagram, Linkedin,
    ArrowUpRight, Globe, Github, ChevronRight
} from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-text-main text-white pt-24 pb-12 overflow-hidden relative">
            {/* Decorative background circle */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>

            <div className="container relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
                    {/* Brand & Mission */}
                    <div className="lg:col-span-5 flex flex-col gap-8">
                        <Link to="/" className="flex items-center gap-3">
                            <div className="bg-primary p-2.5 rounded-2xl">
                                <Shield size={28} fill="currentColor" />
                            </div>
                            <span className="text-3xl font-black font-outfit tracking-tighter">
                                Invi<span className="text-primary">Guard.</span>
                            </span>
                        </Link>
                        <p className="text-xl text-white/50 font-medium leading-relaxed max-w-md">
                            The premier manpower infrastructure for India's examination ecosystem. Ethical earning for students, elite support for institutions.
                        </p>
                        <div className="flex gap-4">
                            {[Instagram, Twitter, Linkedin, Facebook].map((Icon, i) => (
                                <a key={i} href="#" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary transition-all group">
                                    <Icon size={20} className="text-white group-hover:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Nav Links */}
                    <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
                        <div>
                            <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-8">Platform</h4>
                            <ul className="flex flex-col gap-5 text-white/60 font-bold">
                                <li><Link to="/" className="hover:text-white transition-colors">How it Works</Link></li>
                                <li><Link to="/register?role=student" className="hover:text-white transition-colors">For Students</Link></li>
                                <li><Link to="/register?role=center" className="hover:text-white transition-colors">For Institutes</Link></li>
                                <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing Plans</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-8">Company</h4>
                            <ul className="flex flex-col gap-5 text-white/60 font-bold">
                                <li><Link to="/about" className="hover:text-white transition-colors">Our Mission</Link></li>
                                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
                                <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                                <li><Link to="/blog" className="hover:text-white transition-colors">Agency Blog</Link></li>
                            </ul>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-8">Headquarters</h4>
                            <div className="flex flex-col gap-6 text-white/60 font-medium">
                                <div className="flex items-start gap-4">
                                    <MapPin size={20} className="text-primary mt-1 shrink-0" />
                                    <p className="text-sm">Sector 62, Electronic City,<br />Noida, UP 201301</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Mail size={20} className="text-primary shrink-0" />
                                    <p className="text-sm">ops@inviguard.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-6">
                        <p className="text-xs font-bold text-white/30 uppercase tracking-widest">
                            &copy; {new Date().getFullYear()} InviGuard Solutions Pvt. Ltd.
                        </p>
                        <div className="h-4 w-[1px] bg-white/10"></div>
                        <div className="flex gap-6 text-xs font-bold text-white/30 uppercase tracking-widest">
                            <a href="#" className="hover:text-white transition-colors">Privacy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms</a>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/5">
                        <Globe size={14} className="text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/50">Current Region: India</span>
                        <ChevronRight size={14} className="text-white/20" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
