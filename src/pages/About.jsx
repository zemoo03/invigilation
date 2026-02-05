import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { Shield, Target, Eye, Heart, Zap, Users, Globe, ArrowRight } from 'lucide-react';

const About = () => {
    return (
        <div className="bg-mesh min-h-screen pt-20">
            <div className="container py-24">
                {/* Cinematic Header */}
                <div className="max-w-4xl mx-auto text-center mb-32 animate-up">
                    <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">The InviGuard Story</span>
                    <h1 className="text-6xl md:text-8xl font-black mb-10 tracking-tighter leading-[0.95]">
                        Redefining <br />
                        <span className="text-primary relative inline-block">
                            Exam Governance.
                            <svg className="absolute -bottom-4 left-0 w-full opacity-50" viewBox="0 0 358 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 9C118.957 4.46351 239.428 3.32459 355 9" stroke="#4F46E5" strokeWidth="8" strokeLinecap="round" />
                            </svg>
                        </span>
                    </h1>
                    <p className="text-2xl text-text-muted font-medium leading-relaxed max-w-3xl mx-auto">
                        We are India's premier manpower engine, dedicated to building a transparent and ethical ecosystem for student employment and institutional support.
                    </p>
                </div>

                {/* Vision Blocks */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40 animate-up" style={{ animationDelay: '0.1s' }}>
                    <div className="relative">
                        <div className="absolute -inset-10 bg-primary/5 rounded-full blur-[100px]"></div>
                        <div className="relative glass p-12 rounded-[3.5rem] shadow-premium border-white group">
                            <div className="w-20 h-20 rounded-[2rem] bg-indigo-600 text-white flex items-center justify-center mb-10 shadow-2xl shadow-indigo-200 rotate-3 group-hover:rotate-0 transition-transform">
                                <Shield size={40} strokeWidth={2.5} />
                            </div>
                            <h3 className="text-4xl font-black mb-6 tracking-tight">Our Core Mission</h3>
                            <p className="text-xl text-text-muted font-medium leading-relaxed mb-8">
                                To empower 1,000,000+ students with dignified work opportunities that respect their academic schedules while providing institutions with absolute integrity in exam conduct.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <div className="px-5 py-2 bg-surface rounded-full border border-border text-xs font-black uppercase tracking-widest">Ethical</div>
                                <div className="px-5 py-2 bg-surface rounded-full border border-border text-xs font-black uppercase tracking-widest">Scalable</div>
                                <div className="px-5 py-2 bg-surface rounded-full border border-border text-xs font-black uppercase tracking-widest">Secure</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-10">
                        {[
                            {
                                title: 'Organized Infrastructure',
                                desc: 'Turning scattered manpower into a high-tech verified pool.',
                                icon: Globe, color: 'secondary'
                            },
                            {
                                title: 'Radical Transparency',
                                desc: 'Every coin earned is tracked and released within 24 hours.',
                                icon: Zap, color: 'accent'
                            },
                            {
                                title: 'Soft Skill Incubator',
                                desc: 'Teaching responsibility and leadership early in college life.',
                                icon: Heart, color: 'primary'
                            }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-8 group cursor-default">
                                <div className={`w-16 h-16 rounded-2xl bg-${item.color}/10 text-${item.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                                    <item.icon size={28} />
                                </div>
                                <div>
                                    <h4 className="text-2xl font-black mb-2 tracking-tight">{item.title}</h4>
                                    <p className="text-lg text-text-muted font-medium leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats / Numbers Section */}
                <div className="bg-text-main rounded-[4rem] p-16 md:p-24 text-white relative overflow-hidden animate-up" style={{ animationDelay: '0.2s' }}>
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/20 -skew-x-12 translate-x-1/2"></div>
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
                        <div>
                            <span className="text-7xl font-black font-outfit text-primary block mb-4">120+</span>
                            <p className="text-xs font-black uppercase tracking-[0.3em] opacity-50">Partner Institutions</p>
                        </div>
                        <div>
                            <span className="text-7xl font-black font-outfit text-white block mb-4">15k+</span>
                            <p className="text-xs font-black uppercase tracking-[0.3em] opacity-50">Staff Network</p>
                        </div>
                        <div>
                            <span className="text-7xl font-black font-outfit text-secondary block mb-4">₹2.5M</span>
                            <p className="text-xs font-black uppercase tracking-[0.3em] opacity-50">Student Earnings</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
