import React, { useState } from 'react';
import {
    Plus, Users, Calendar, MapPin, Search,
    MoreVertical, CheckCircle2, XCircle, Clock, Filter,
    Building2, Trash2, Edit3, ArrowUpRight, BarChart2,
    ChevronRight, MoreHorizontal, FileText, Star
} from 'lucide-react';

const InstitutionDashboard = () => {
    const [activeTab, setActiveTab] = useState('exams');

    const postedExams = [
        { id: 1, title: 'JEE Main Phase 1: CBT Mode', date: 'Feb 15, 2026', slots: 20, filled: 15, status: 'Active' },
        { id: 2, title: 'Medical Entrance NEET 2026', date: 'Mar 10, 2026', slots: 50, filled: 0, status: 'Scheduled' },
    ];

    const applicantRequests = [
        { id: 501, name: 'Siddharth Varma', college: 'DTU, Delhi', year: '4th Year', exam: 'JEE Main', rating: '4.8', status: 'Pending' },
        { id: 502, name: 'Priya Sharma', college: 'IGDTUW', year: '3rd Year', exam: 'JEE Main', rating: '4.9', status: 'Pending' },
        { id: 503, name: 'Rahul Kumar', college: 'NSUT', year: '2nd Year', exam: 'JEE Main', rating: '3.5', status: 'Rejected' },
    ];

    return (
        <div className="bg-mesh min-h-screen pt-12 pb-20">
            <div className="container">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 mb-16 animate-up">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-3xl bg-secondary text-white flex items-center justify-center shadow-2xl shadow-secondary/20 border-4 border-white -rotate-2">
                            <Building2 size={36} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black font-outfit tracking-tight">Apex International Institute</h1>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs font-bold text-secondary uppercase tracking-widest">Premium Partner</span>
                                <span className="text-xs text-text-muted">• ID: #INST-9821</span>
                            </div>
                        </div>
                    </div>
                    <button className="flex items-center justify-center gap-3 px-10 py-5 bg-text-main text-white font-bold rounded-2xl shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all text-lg">
                        <FileText size={22} strokeWidth={2.5} />
                        Request Schedule Publish
                    </button>
                </div>

                {/* Stats Summary Panel */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 animate-up" style={{ animationDelay: '0.1s' }}>
                    {[
                        { label: 'Total Personnel', value: '70', icon: Users, color: 'primary' },
                        { label: 'Published Exams', value: '4', icon: Calendar, color: 'secondary' },
                        { label: 'Review Pending', value: '12', icon: Clock, color: 'accent' },
                        { label: 'Facility Rating', value: '4.5', icon: Star, color: 'primary' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-[2rem] border border-border shadow-sm flex flex-col gap-2">
                            <div className={`w-10 h-10 rounded-xl bg-${stat.color}/10 text-${stat.color} flex items-center justify-center mb-2`}>
                                <stat.icon size={20} />
                            </div>
                            <span className="text-[10px] font-black uppercase text-text-muted tracking-widest">{stat.label}</span>
                            <span className="text-2xl font-black font-outfit">{stat.value}</span>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-12 mb-10 border-b border-border relative animate-up" style={{ animationDelay: '0.2s' }}>
                    <button
                        onClick={() => setActiveTab('exams')}
                        className={`pb-5 text-sm font-black transition-all relative uppercase tracking-widest ${activeTab === 'exams' ? 'text-primary' : 'text-text-muted hover:text-text-main'}`}
                    >
                        Requested Schedules
                        {activeTab === 'exams' && <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-t-full"></div>}
                    </button>
                    <button
                        onClick={() => setActiveTab('applicants')}
                        className={`pb-5 text-sm font-black transition-all relative uppercase tracking-widest ${activeTab === 'applicants' ? 'text-primary' : 'text-text-muted hover:text-text-main'}`}
                    >
                        Applicant Personnel
                        <span className="ml-2 px-2 py-0.5 bg-accent text-white text-[10px] rounded-full">12</span>
                        {activeTab === 'applicants' && <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-t-full"></div>}
                    </button>
                </div>

                {activeTab === 'exams' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 animate-up" style={{ animationDelay: '0.3s' }}>
                        {postedExams.map((exam) => (
                            <div key={exam.id} className="card-premium group relative overflow-hidden">
                                <div className={`absolute top-0 right-0 px-5 py-1.5 text-[10px] font-black uppercase rounded-bl-2xl ${exam.status === 'Active' ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'}`}>
                                    {exam.status}
                                </div>
                                <h3 className="text-xl font-black mb-6 font-outfit pr-12 leading-tight">{exam.title}</h3>

                                <div className="flex flex-col gap-5 mb-8">
                                    <div className="flex items-center gap-4 text-sm font-medium text-text-muted">
                                        <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center text-primary"><Calendar size={16} /></div>
                                        <span>{exam.date}</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm font-medium text-text-muted">
                                        <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center text-primary"><MapPin size={16} /></div>
                                        <span>Sector 4 Campus Labs 1-4</span>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-xs font-bold text-text-muted uppercase">Fill Capacity ({Math.round((exam.filled / exam.slots) * 100)}%)</span>
                                        <span className="text-sm font-black">{exam.filled} <span className="text-text-muted">/ {exam.slots}</span></span>
                                    </div>
                                    <div className="w-full bg-surface h-3 rounded-full overflow-hidden border border-border">
                                        <div
                                            className="bg-secondary h-full rounded-full transition-all duration-1000"
                                            style={{ width: `${(exam.filled / exam.slots) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-surface">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-text-muted uppercase">Status</span>
                                        <span className="text-sm font-black text-secondary">Verified & Live</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-3 bg-white border border-border rounded-xl text-text-muted hover:text-primary hover:border-primary transition-all">
                                            <Edit3 size={18} />
                                        </button>
                                        <button className="p-3 bg-white border border-border rounded-xl text-text-muted hover:text-primary transition-all">
                                            <MoreHorizontal size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-[2.5rem] border border-border overflow-hidden shadow-premium animate-up" style={{ animationDelay: '0.3s' }}>
                        <div className="p-10 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-6 bg-surface/30">
                            <div className="relative flex-grow max-w-lg">
                                <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted" />
                                <input type="text" placeholder="Search applicants..." className="w-full pl-16 pr-6 py-4 bg-white border border-border rounded-2xl text-sm font-medium focus:outline-none focus:border-primary transition-all" />
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="flex items-center gap-2 px-6 py-4 bg-white border border-border rounded-2xl text-sm font-bold text-text-muted hover:text-primary transition-all uppercase tracking-widest">
                                    <Filter size={18} /> Sort
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-surface/50 text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">
                                        <th className="px-10 py-6">Applicant Name</th>
                                        <th className="px-10 py-6">Credentials</th>
                                        <th className="px-10 py-6">Assignment</th>
                                        <th className="px-10 py-6 text-center">Score</th>
                                        <th className="px-10 py-6 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-surface">
                                    {applicantRequests.map((req) => (
                                        <tr key={req.id} className="hover:bg-primary/[0.02] transition-colors group">
                                            <td className="px-10 py-8">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-sm font-black text-primary border border-primary/10 group-hover:scale-110 transition-transform">
                                                        {req.name.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-black text-lg tracking-tight">{req.name}</span>
                                                        <span className="text-[10px] font-bold text-text-muted uppercase italic">Verified Identity</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-sm text-text-main">{req.college}</span>
                                                    <span className="text-xs font-medium text-text-muted uppercase tracking-wider">{req.year} Student</span>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                                                    <span className="text-sm font-black text-primary uppercase tracking-tighter">{req.exam}</span>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8 text-center">
                                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-400/10 text-yellow-600 rounded-lg border border-yellow-400/20">
                                                    <Star size={12} fill="currentColor" />
                                                    <span className="text-xs font-black">{req.rating}</span>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8 text-right">
                                                <div className="flex items-center justify-end gap-3">
                                                    <button className="w-10 h-10 flex items-center justify-center bg-secondary/10 text-secondary rounded-xl hover:bg-secondary hover:text-white transition-all shadow-sm" title="Approve">
                                                        <CheckCircle2 size={20} />
                                                    </button>
                                                    <button className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm" title="Reject">
                                                        <XCircle size={20} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InstitutionDashboard;
