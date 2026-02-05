import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { Mail, MessageCircle, MapPin, Send, Phone, ArrowRight, Zap, Globe } from 'lucide-react';

const Contact = () => {
    return (
        <div className="bg-mesh min-h-screen pt-20">
            <div className="container py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                    <div className="animate-up">
                        <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Let's Connect</span>
                        <h1 className="text-6xl md:text-8xl font-black mb-10 tracking-tighter leading-[0.95]">
                            Get in <br />
                            <span className="text-primary italic">Touch.</span>
                        </h1>
                        <p className="text-xl text-text-muted font-medium mb-16 max-w-md leading-relaxed">
                            Whether you're a student looking for work or an institution seeking staff, we respond in minutes.
                        </p>

                        <div className="flex flex-col gap-10">
                            {[
                                { label: 'General Support', val: 'support@inviguard.com', icon: Mail, color: 'primary' },
                                { label: 'Instant WhatsApp', val: '+91 98765 43210', icon: MessageCircle, color: 'secondary' },
                                { label: 'Corporate Office', val: 'Electronic City, Noida', icon: MapPin, color: 'accent' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-8 group cursor-pointer">
                                    <div className={`w-16 h-16 rounded-3xl bg-white shadow-premium flex items-center justify-center text-${item.color} group-hover:bg-${item.color} group-hover:text-white transition-all`}>
                                        <item.icon size={24} strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black uppercase tracking-widest text-text-muted mb-1">{item.label}</h4>
                                        <p className="text-xl font-black tracking-tight">{item.val}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="animate-up" style={{ animationDelay: '0.1s' }}>
                        <div className="bg-white p-12 md:p-16 rounded-[4rem] shadow-premium border border-border relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16"></div>

                            <h3 className="text-3xl font-black mb-10 tracking-tight">Drop a Message</h3>

                            <form className="flex flex-col gap-8" onSubmit={e => e.preventDefault()}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="flex flex-col gap-3">
                                        <label className="text-xs font-black uppercase tracking-widest text-text-muted">Full Name</label>
                                        <input type="text" placeholder="John Doe" className="w-full px-8 py-5 bg-surface rounded-2xl border border-border focus:border-primary outline-none transition-all font-medium" />
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <label className="text-xs font-black uppercase tracking-widest text-text-muted">Email Address</label>
                                        <input type="email" placeholder="john@example.com" className="w-full px-8 py-5 bg-surface rounded-2xl border border-border focus:border-primary outline-none transition-all font-medium" />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <label className="text-xs font-black uppercase tracking-widest text-text-muted">Inquiry Type</label>
                                    <select className="w-full px-8 py-5 bg-surface rounded-2xl border border-border focus:border-primary outline-none transition-all font-bold appearance-none">
                                        <option>I'm a Student</option>
                                        <option>I'm an Institution</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <label className="text-xs font-black uppercase tracking-widest text-text-muted">Message</label>
                                    <textarea placeholder="Write your message here..." className="w-full px-8 py-6 bg-surface rounded-2xl border border-border focus:border-primary outline-none transition-all h-40 resize-none font-medium" />
                                </div>

                                <button className="w-full py-6 bg-primary text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-primary-glow hover:translate-y-[-4px] active:translate-y-0 transition-all flex items-center justify-center gap-3">
                                    <Send size={18} strokeWidth={2.5} /> Deliver Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
