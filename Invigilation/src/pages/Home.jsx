import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    CheckCircle, GraduationCap, Building2, TrendingUp,
    Calendar, ShieldCheck, ArrowRight, Star,
    Clock, Zap, Shield, Users
} from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-page bg-mesh min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-40 overflow-hidden">
                {/* Animated background circles */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-secondary/10 rounded-full blur-[100px]"></div>

                <div className="container relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-20">
                        <div className="flex flex-col gap-8 animate-up">
                            <div className="flex items-center gap-2 px-4 py-1.5 bg-white shadow-sm border border-border rounded-full w-fit">
                                <span className="flex h-2 w-2 rounded-full bg-secondary"></span>
                                <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Over 5,000 slots this month</span>
                            </div>

                            <h1 className="text-6xl md:text-7xl font-black leading-[1.05] tracking-tight">
                                Empowering the <br />
                                <span className="text-primary relative inline-block">
                                    Next Generation
                                    <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 358 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 9C118.957 4.46351 239.428 3.32459 355 9" stroke="var(--primary)" strokeWidth="6" strokeLinecap="round" />
                                    </svg>
                                </span>
                                <br /> of Professionals.
                            </h1>

                            <p className="text-xl text-text-muted max-w-lg font-medium leading-relaxed">
                                Connect with India's top educational institutions. Get verified, pick your slots, and earn professionally as an exam invigilator.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-5 mt-4">
                                <button
                                    onClick={() => navigate('/register?role=student')}
                                    className="px-10 py-5 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary-glow hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-lg"
                                >
                                    <GraduationCap size={22} strokeWidth={2.5} />
                                    Start Earning
                                </button>
                                <button
                                    onClick={() => navigate('/register?role=center')}
                                    className="px-10 py-5 bg-white text-text-main font-bold rounded-2xl border-2 border-border hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-3 text-lg"
                                >
                                    <Building2 size={22} strokeWidth={2.5} />
                                    Hire Talent
                                </button>
                            </div>

                            <div className="flex items-center gap-10 mt-6 bg-white/50 backdrop-blur-sm p-4 rounded-3xl border border-white w-fit">
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-200 overflow-hidden">
                                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=student${i}`} alt="avatar" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-1 text-accent">
                                            <Star size={14} fill="currentColor" />
                                            <Star size={14} fill="currentColor" />
                                            <Star size={14} fill="currentColor" />
                                            <Star size={14} fill="currentColor" />
                                            <Star size={14} fill="currentColor" />
                                        </div>
                                        <span className="text-xs font-bold">4.9/5 Student Rating</span>
                                    </div>
                                </div>
                                <div className="h-10 w-[1px] bg-border"></div>
                                <div>
                                    <span className="text-2xl font-black text-primary">5,000+</span>
                                    <p className="text-[10px] font-bold text-text-muted uppercase">Duties Assigned</p>
                                </div>
                            </div>
                        </div>

                        {/* Floating Visual Elements */}
                        <div className="relative hidden lg:block">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-[100px]"></div>

                            {/* Main Card */}
                            <div className="relative glass p-10 rounded-[3rem] shadow-premium border-white animate-float">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-2xl font-black">Published Schedules</h3>
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-5">
                                    {[
                                        { title: 'JEE Advanced 2026', campus: 'IIT Delhi Campus', slots: '20 Slots Left', time: '8 AM - 2 PM' },
                                        { title: 'National Medical Mock', campus: 'AIIMS Convocation Hall', slots: '15 Slots Left', time: '1 PM - 5 PM' },
                                        { title: 'Standard Chartered Test', campus: 'World Trade Center', slots: '8 Slots Left', time: '9 AM - 6 PM' }
                                    ].map((job, idx) => (
                                        <div key={idx} className="bg-white/70 p-5 rounded-2xl border border-white hover:border-primary transition-all group flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                                    <Zap size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-sm tracking-tight">{job.title}</h4>
                                                    <p className="text-[10px] text-text-muted flex items-center gap-1 font-bold italic">
                                                        <Clock size={10} /> {job.time}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-sm font-black text-primary">{job.slots}</span>
                                                <p className="text-[8px] font-black uppercase text-secondary">Published</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button className="w-full mt-8 py-4 bg-text-main text-white font-bold rounded-2xl hover:bg-black transition-all flex items-center justify-center gap-2">
                                    View Latest Slots <ArrowRight size={18} />
                                </button>
                            </div>

                            {/* Decorative Floating Mini-cards */}
                            <div className="absolute -top-10 -right-10 glass p-5 rounded-2xl shadow-xl flex items-center gap-4 animate-float" style={{ animationDelay: '1s' }}>
                                <div className="w-10 h-10 rounded-full bg-secondary/20 text-secondary flex items-center justify-center">
                                    <CheckCircle size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-text-muted uppercase">Verification</p>
                                    <p className="text-sm font-bold">100% Success</p>
                                </div>
                            </div>

                            <div className="absolute -bottom-10 -left-10 glass p-5 rounded-2xl shadow-xl flex items-center gap-4 animate-float" style={{ animationDelay: '2s' }}>
                                <div className="w-10 h-10 rounded-full bg-accent/20 text-accent flex items-center justify-center">
                                    <Star size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-text-muted uppercase">Reliability</p>
                                    <p className="text-sm font-bold">Grade-A Staff</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modern Proof Section */}
            <section className="py-20 bg-white">
                <div className="container">
                    <div className="flex flex-wrap justify-between items-center gap-10 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                        <h4 className="font-black text-xl italic uppercase tracking-tighter">Trusted By</h4>
                        <div className="h-8 w-[150px] bg-slate-100 rounded-lg"></div>
                        <div className="h-8 w-[120px] bg-slate-100 rounded-lg"></div>
                        <div className="h-8 w-[140px] bg-slate-100 rounded-lg"></div>
                        <div className="h-8 w-[110px] bg-slate-100 rounded-lg"></div>
                        <div className="h-8 w-[130px] bg-slate-100 rounded-lg"></div>
                    </div>
                </div>
            </section>

            {/* Feature Grids */}
            <section className="section bg-surface overflow-hidden relative">
                <div className="container relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-20 animate-up">
                        <span className="text-primary font-black uppercase tracking-widest text-xs mb-3 block">Why Choose Us</span>
                        <h2 className="text-4xl md:text-5xl font-black mb-6">Designed for Excellence</h2>
                        <p className="text-lg text-text-muted font-medium">We've built the most reliable manpower engine for examinations in India.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'High Transparency',
                                desc: 'Every slot has fix pay rates. No hidden commissions or delayed payments.',
                                icon: Shield, color: 'primary'
                            },
                            {
                                title: 'Elite Manpower',
                                desc: 'Only verified college students with clean records are allowed on the platform.',
                                icon: Users, color: 'secondary'
                            },
                            {
                                title: 'Instant Support',
                                desc: 'Dedicated 24/7 WhatsApp support for students and exam coordinators.',
                                icon: Zap, color: 'accent'
                            }
                        ].map((feature, i) => (
                            <div key={i} className="card-premium group">
                                <div className={`w-16 h-16 rounded-2xl bg-${feature.color}/10 text-${feature.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                                    <feature.icon size={32} />
                                </div>
                                <h3 className="text-2xl font-black mb-4">{feature.title}</h3>
                                <p className="text-text-muted font-medium leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Powerful CTA */}
            <section className="section overflow-hidden">
                <div className="container">
                    <div className="relative rounded-[3rem] bg-text-main p-12 md:p-24 overflow-hidden group">
                        {/* Dynamic background element */}
                        <div className="absolute top-[-50%] right-[-10%] w-[80%] h-[200%] bg-primary/20 rotate-12 transition-transform duration-1000 group-hover:rotate-6"></div>

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight">
                                    Revolutionize Your <br />
                                    <span className="text-primary italic">Exam Operations.</span>
                                </h2>
                                <p className="text-xl text-white/70 mb-12 max-w-md font-medium">
                                    Whether you're a venue owner or a student looking for dignity and pay—we are your partners.
                                </p>
                                <div className="flex gap-4">
                                    <button className="px-10 py-5 bg-white text-text-main font-bold rounded-2xl hover:scale-105 transition-all text-lg shadow-2xl">
                                        Get Started
                                    </button>
                                    <button className="px-10 py-5 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all text-lg backdrop-blur-sm border border-white/10">
                                        Contact Sales
                                    </button>
                                </div>
                            </div>
                            <div className="hidden lg:grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-4">
                                    <div className="h-40 bg-white/5 rounded-3xl backdrop-blur-sm p-6 border border-white/10">
                                        <h4 className="text-4xl font-black text-white mb-2">99%</h4>
                                        <p className="text-xs font-bold text-white/50 uppercase tracking-widest">Accuracy Rate</p>
                                    </div>
                                    <div className="h-40 bg-white/5 rounded-3xl backdrop-blur-sm p-6 border border-white/10">
                                        <h4 className="text-4xl font-black text-white mb-2">24h</h4>
                                        <p className="text-xs font-bold text-white/50 uppercase tracking-widest">Payment Cycle</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4 mt-8">
                                    <div className="h-40 bg-primary/20 rounded-3xl backdrop-blur-sm p-6 border border-white/20">
                                        <h4 className="text-4xl font-black text-white mb-2">15k+</h4>
                                        <p className="text-xs font-bold text-white/50 uppercase tracking-widest">Active Pool</p>
                                    </div>
                                    <div className="h-40 bg-white/5 rounded-3xl backdrop-blur-sm p-6 border border-white/10">
                                        <h4 className="text-4xl font-black text-white mb-2">100+</h4>
                                        <p className="text-xs font-bold text-white/50 uppercase tracking-widest">Exam Centers</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
