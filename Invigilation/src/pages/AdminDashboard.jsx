import React, { useState } from 'react';
import {
    BarChart3, Users, Building2, Wallet,
    ShieldCheck, AlertCircle, TrendingUp, DollarSign,
    Briefcase, ArrowUpRight, Search, Zap, ArrowRight,
    TrendingDown, Activity, Globe, Shield, Calendar, Plus,
    MessageSquare, Send, Clock
} from 'lucide-react';

const AdminDashboard = () => {
    const [showPublishForm, setShowPublishForm] = useState(false);

    const stats = [
        { label: 'Published Exams', value: '42', change: '+5', icon: Calendar, color: 'primary' },
        { label: 'Active Students', value: '1,240', change: '+5.2%', icon: Users, color: 'secondary' },
        { label: 'Institute Partners', value: '42', change: '+2', icon: Building2, color: 'accent' },
        { label: 'Notifications Sent', value: '12k', change: 'Live', icon: Send, color: 'primary' },
    ];

    const pendingVerifications = [
        { id: 1, name: 'Rahul Sharma', type: 'Student', details: 'DU South Campus', date: '2h ago', level: 'High' },
        { id: 2, name: 'Modern Academy', type: 'Institution', details: 'Noida, Sector 62', date: '5h ago', level: 'Medium' },
        { id: 3, name: 'Sneha Gupta', type: 'Student', details: 'IIT Delhi', date: '1d ago', level: 'Low' },
    ];

    return (
        <div className="bg-mesh min-h-screen pt-12 pb-20">
            <div className="container">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 mb-16 animate-up">
                    <div>
                        <span className="text-primary font-black uppercase tracking-widest text-[10px] mb-2 block">Central Management Systems</span>
                        <h1 className="text-4xl font-black font-outfit tracking-tight">Admin Executive Suite</h1>
                        <p className="text-lg text-text-muted mt-2 font-medium">Publish schedules, manage personnel, and broadcast notifications.</p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={() => setShowPublishForm(true)}
                            className="px-8 py-4 bg-primary text-white font-black text-xs uppercase tracking-widest rounded-2xl flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-primary-glow"
                        >
                            <Plus size={18} strokeWidth={3} /> Publish New Exam
                        </button>
                        <button className="px-8 py-4 bg-text-main text-white font-black text-xs uppercase tracking-widest rounded-2xl flex items-center gap-3 hover:bg-black transition-all shadow-xl shadow-indigo-100">
                            <MessageSquare size={18} /> Broadcast Alert
                        </button>
                    </div>
                </div>

                {showPublishForm && (
                    <div className="mb-16 animate-up">
                        <div className="bg-white p-10 rounded-[3rem] border-2 border-primary shadow-premium relative overflow-hidden">
                            <div className="flex justify-between items-center mb-10">
                                <h2 className="text-2xl font-black font-outfit tracking-tight">Publish New Exam Details</h2>
                                <button onClick={() => setShowPublishForm(false)} className="text-text-muted hover:text-red-500 font-bold">Close Form</button>
                            </div>
                            <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={e => { e.preventDefault(); setShowPublishForm(false); }}>
                                <div className="flex flex-col gap-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Exam Name</label>
                                    <input type="text" placeholder="JEE Main Phase 1" className="w-full px-8 py-4 bg-surface rounded-2xl border border-border focus:border-primary outline-none transition-all font-bold" />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Target Institution</label>
                                    <input type="text" placeholder="Search Institute ID..." className="w-full px-8 py-4 bg-surface rounded-2xl border border-border focus:border-primary outline-none transition-all font-bold" />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Exam Date</label>
                                    <input type="date" className="w-full px-8 py-4 bg-surface rounded-2xl border border-border focus:border-primary outline-none transition-all font-bold" />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Available Slots</label>
                                    <input type="number" placeholder="50" className="w-full px-8 py-4 bg-surface rounded-2xl border border-border focus:border-primary outline-none transition-all font-bold" />
                                </div>
                                <div className="md:col-span-2">
                                    <button className="w-full py-5 bg-primary text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary-glow">Publish and Notify Users</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 animate-up" style={{ animationDelay: '0.1s' }}>
                    {stats.map((stat, i) => (
                        <div key={i} className="card-premium relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-125 transition-transform">
                                <stat.icon size={80} />
                            </div>
                            <div className="flex items-center justify-between mb-8">
                                <div className={`w-14 h-14 rounded-2xl bg-${stat.color}/10 text-${stat.color} flex items-center justify-center`}>
                                    <stat.icon size={28} />
                                </div>
                                <div className={`flex items-center gap-1 text-[10px] font-black px-3 py-1 rounded-full bg-surface text-text-main border border-border`}>
                                    {stat.change}
                                </div>
                            </div>
                            <h4 className="text-xs text-text-muted font-bold uppercase tracking-widest mb-1">{stat.label}</h4>
                            <div className="text-3xl font-black font-outfit">{stat.value}</div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Main List */}
                    <div className="lg:col-span-8 flex flex-col gap-8 animate-up" style={{ animationDelay: '0.2s' }}>
                        <h2 className="text-2xl font-black font-outfit tracking-tight">Active Exam Schedules</h2>
                        <div className="flex flex-col gap-6">
                            {[
                                { title: 'GATE 2026 Entrance', institute: 'Model Public School', date: 'Feb 15', slots: '50', status: 'Published' },
                                { title: 'Medical Mock Test', institute: 'Apex Global Inst', date: 'Feb 20', slots: '20', status: 'Published' },
                                { title: 'CUET Phase 1', institute: 'Delhi Univ South', date: 'Mar 05', slots: '100', status: 'Draft' },
                            ].map((exam, idx) => (
                                <div key={idx} className="card-premium flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                                    <div className="flex items-center gap-6">
                                        <div className="w-14 h-14 rounded-2xl bg-surface flex items-center justify-center text-primary border border-border">
                                            <Calendar size={28} />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-lg">{exam.title}</h4>
                                            <p className="text-xs font-bold text-text-muted uppercase tracking-widest italic">{exam.institute}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-8">
                                        <div className="text-right">
                                            <span className="text-[10px] font-black text-text-muted uppercase block">Exam Date</span>
                                            <span className="text-sm font-black">{exam.date}</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[10px] font-black text-text-muted uppercase block">Personnel</span>
                                            <span className="text-sm font-black text-secondary">{exam.slots} Slots</span>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${exam.status === 'Published' ? 'bg-secondary/10 text-secondary' : 'bg-amber-100 text-amber-600'}`}>
                                            {exam.status}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Action Center Sidebar */}
                    <div className="lg:col-span-4 flex flex-col gap-8 animate-up" style={{ animationDelay: '0.3s' }}>
                        <h2 className="text-2xl font-black font-outfit tracking-tight px-2">Verification Queue</h2>

                        <div className="flex flex-col gap-5">
                            {pendingVerifications.map((item) => (
                                <div key={item.id} className="card-premium group hover:bg-surface/50">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <span className={`text-[10px] font-black px-3 py-1 rounded-full mb-3 inline-block uppercase tracking-[0.15em] border ${item.type === 'Student' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                                                {item.type}
                                            </span>
                                            <h4 className="font-black text-lg tracking-tight">{item.name}</h4>
                                        </div>
                                    </div>
                                    <p className="text-sm font-medium text-text-muted mb-6 flex items-center gap-2">
                                        <Globe size={14} className="opacity-40" /> {item.details}
                                    </p>
                                    <div className="flex gap-3">
                                        <button className="flex-1 py-3.5 bg-secondary text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-secondary-hover transition-all shadow-lg flex items-center justify-center gap-2">
                                            <ShieldCheck size={14} /> Approve
                                        </button>
                                        <button className="flex-1 py-3.5 bg-white border border-border text-text-muted text-[10px] font-black uppercase tracking-widest rounded-xl hover:text-red-500 hover:border-red-200 transition-all">
                                            Details
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <button className="w-full py-5 bg-white border-2 border-dashed border-border rounded-[2rem] text-xs font-black uppercase tracking-widest text-text-muted hover:text-primary hover:border-primary transition-all flex items-center justify-center gap-3">
                                Manage Full Queue (14) <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
