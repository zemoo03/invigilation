import React from 'react';
import {
    Calendar, CheckCircle, Clock, History,
    MapPin, ChevronRight, Bell, User as UserIcon,
    Search, Filter, Map, Zap, Info
} from 'lucide-react';

const StudentDashboard = () => {
    const stats = [
        { label: 'Upcoming Duties', value: '3', icon: Calendar, color: 'primary' },
        { label: 'Completed Duties', value: '14', icon: CheckCircle, color: 'secondary' },
        { label: 'Pending Notifications', value: '5', icon: Bell, color: 'accent' },
    ];

    const upcomingOpportunities = [
        { id: 1, title: 'JEE Main Phase 1: National Entrance', date: 'Sunday, Feb 1st', location: 'Model Public School, Rohini', slots: '12 Left', level: 'Published' },
        { id: 2, title: 'UPSC Prelims Mock Examination', date: 'Saturday, Feb 7th', location: 'Knowledge Cube, West Delhi', slots: '5 Left', level: 'Urgent' },
        { id: 3, title: 'National Talent Search Exam', date: 'Feb 12th', location: 'Oxford High, Gurugram', slots: '20 Left', level: 'Published' },
    ];

    return (
        <div className="bg-mesh min-h-screen pt-12 pb-20">
            <div className="container">
                {/* Top bar with Profile & Notifications */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 animate-up">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-[2rem] bg-indigo-600 text-white flex items-center justify-center shadow-2xl shadow-indigo-200 border-4 border-white rotate-3">
                            <UserIcon size={36} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black font-outfit">Hi, Abhishek Sharma</h1>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs font-bold uppercase tracking-widest text-secondary flex items-center gap-1">
                                    <CheckCircle size={14} /> Registered Personnel
                                </span>
                                <span className="text-xs text-text-muted">• Student ID: #IG-8821</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex flex-col text-right">
                            <span className="text-xs font-bold text-text-muted uppercase">Next Scheduled Exam</span>
                            <span className="text-sm font-black text-primary">Sunday, Feb 1st</span>
                        </div>
                        <button className="p-4 bg-white rounded-2xl border border-border text-text-main hover:bg-surface relative group transition-all shadow-sm">
                            <Bell size={24} />
                            <span className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full border-2 border-white group-hover:scale-125 transition-transform"></span>
                        </button>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-up" style={{ animationDelay: '0.1s' }}>
                    {stats.map((stat, i) => (
                        <div key={i} className="card-premium flex items-center gap-8 relative overflow-hidden group">
                            <div className="absolute top-[-20%] right-[-10%] w-24 h-24 bg-surface rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
                            <div className={`p-5 rounded-2xl bg-${stat.color}/10 text-${stat.color} relative z-10`}>
                                <stat.icon size={32} />
                            </div>
                            <div className="flex flex-col relative z-10">
                                <span className="text-sm text-text-muted font-bold uppercase tracking-wider">{stat.label}</span>
                                <span className="text-3xl font-black font-outfit">{stat.value}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Main Feed */}
                    <div className="lg:col-span-8 flex flex-col gap-8 animate-up" style={{ animationDelay: '0.2s' }}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <h2 className="text-2xl font-black font-outfit tracking-tight">Published Exam Dates</h2>
                                <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase rounded-lg">Recently Published</span>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 bg-white rounded-lg border border-border text-text-muted hover:text-primary transition-colors">
                                    <Filter size={18} />
                                </button>
                                <button className="p-2 bg-white rounded-lg border border-border text-text-muted hover:text-primary transition-colors">
                                    <Search size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            {upcomingOpportunities.map((op, idx) => (
                                <div key={op.id} className="card-premium hover:border-primary/50 group">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                                        <div className="flex gap-6">
                                            <div className="w-16 h-16 rounded-2xl bg-surface border border-border flex items-center justify-center shrink-0 group-hover:bg-primary/5 transition-colors">
                                                <Calendar size={28} className="text-primary" />
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h4 className="font-black text-xl leading-tight">{op.title}</h4>
                                                    <span className={`px-2 py-0.5 text-[8px] font-black uppercase rounded-md ${op.level === 'Urgent' ? 'bg-red-50 text-red-600' : 'bg-secondary/10 text-secondary'}`}>
                                                        {op.level}
                                                    </span>
                                                </div>
                                                <p className="text-sm font-medium text-text-muted flex items-center gap-2">
                                                    <MapPin size={14} className="opacity-50" /> {op.location}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between md:flex-col md:items-end gap-2 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-8">
                                            <div className="flex flex-col md:items-end">
                                                <span className="text-sm font-bold text-text-muted">Availability</span>
                                                <span className="text-2xl font-black text-primary">{op.slots}</span>
                                            </div>
                                            <button className="px-8 py-3 bg-text-main text-white font-bold rounded-xl hover:bg-primary transition-all shadow-lg hover:shadow-primary-glow">
                                                Register Attendance
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex items-center gap-6 text-[10px] font-black uppercase text-text-muted tracking-widest border-t border-surface pt-4">
                                        <span className="flex items-center gap-1.5"><Calendar size={12} className="text-primary" /> {op.date}</span>
                                        <span className="flex items-center gap-1.5"><Clock size={12} className="text-primary" /> Reporting: 07:30 AM</span>
                                        <span className="flex items-center gap-1.5"><Info size={12} className="text-primary" /> Guidelines Released</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar Area */}
                    <div className="lg:col-span-4 flex flex-col gap-8 animate-up" style={{ animationDelay: '0.3s' }}>
                        <h2 className="text-2xl font-black font-outfit tracking-tight">Recent Notifications</h2>

                        <div className="bg-white rounded-[2.5rem] shadow-premium border border-border overflow-hidden">
                            <div className="p-8">
                                {[
                                    { title: 'Dates Published', sub: 'For JEE Phase 1 Duty', time: '2h ago', level: 'important' },
                                    { title: 'Guidelines Updated', sub: 'UPSC Prelims Mock', time: '5h ago', level: 'neutral' },
                                    { title: 'Registration Success', sub: 'NDA Written Exam', time: '1d ago', level: 'success' },
                                ].map((item, i) => (
                                    <div key={i} className={`flex items-center justify-between py-5 ${i !== 2 ? 'border-b border-surface' : ''}`}>
                                        <div className="flex gap-4">
                                            <div className={`w-2 h-2 rounded-full mt-2 ${item.level === 'important' ? 'bg-primary' : item.level === 'success' ? 'bg-secondary' : 'bg-slate-300'}`}></div>
                                            <div>
                                                <p className="text-sm font-black">{item.title}</p>
                                                <p className="text-[10px] font-bold text-text-muted uppercase">{item.sub}</p>
                                            </div>
                                        </div>
                                        <div className="text-[10px] font-black text-text-muted">
                                            {item.time}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full py-5 bg-surface text-xs font-black uppercase tracking-widest text-text-muted hover:text-primary transition-colors flex items-center justify-center gap-2">
                                View All Notifications <ChevronRight size={14} />
                            </button>
                        </div>

                        {/* Support Widget */}
                        <div className="bg-text-main p-10 rounded-[2.5rem] text-white relative overflow-hidden group">
                            <div className="absolute top-[-20%] right-[-20%] w-40 h-40 bg-primary/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                                    <Zap size={28} className="text-primary" />
                                </div>
                                <h3 className="text-2xl font-black mb-4 tracking-tight">Exam Protocol?</h3>
                                <p className="text-sm font-medium text-white/60 mb-8 leading-relaxed">
                                    Access the latest invigilation protocols and training material here.
                                </p>
                                <button className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-white hover:text-text-main transition-all flex items-center justify-center gap-2 shadow-xl shadow-primary/20">
                                    View Guidelines
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
