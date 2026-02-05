import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Calendar, CheckCircle, Clock, History,
    MapPin, ChevronRight, Bell, User as UserIcon,
    LogOut, Award, TrendingUp, Shield, FileCheck
} from 'lucide-react';

const StudentDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    // Mock data for exams attended (would come from API in real app)
    const examsAttended = [
        {
            id: 1,
            title: 'JEE Main Phase 1',
            date: '15 Jan 2026',
            location: 'Model Public School, Rohini',
            duration: '6 hours',
            payment: '₹800',
            status: 'completed'
        },
        {
            id: 2,
            title: 'UPSC Prelims Mock',
            date: '22 Jan 2026',
            location: 'Knowledge Hub, West Delhi',
            duration: '4 hours',
            payment: '₹600',
            status: 'completed'
        },
        {
            id: 3,
            title: 'National Talent Search Exam',
            date: '28 Jan 2026',
            location: 'Oxford High, Gurugram',
            duration: '5 hours',
            payment: '₹700',
            status: 'completed'
        },
        {
            id: 4,
            title: 'SSC CGL Preliminary',
            date: '02 Feb 2026',
            location: 'Central School, Noida',
            duration: '3 hours',
            payment: '₹500',
            status: 'completed'
        },
    ];

    const stats = {
        totalExams: examsAttended.length,
        totalHours: examsAttended.reduce((acc, exam) => acc + parseInt(exam.duration), 0),
        totalEarnings: examsAttended.reduce((acc, exam) => acc + parseInt(exam.payment.replace('₹', '')), 0),
        avgRating: 4.8
    };

    if (!user) {
        return null;
    }

    return (
        <div className="dashboard">
            {/* Sidebar */}
            <aside className="dashboard-sidebar">
                <div className="sidebar-header">
                    <Link to="/" className="sidebar-logo">
                        <div className="sidebar-logo-icon">
                            <Shield size={24} />
                        </div>
                        <span>Invi<span>Guard</span></span>
                    </Link>
                </div>

                <nav className="sidebar-nav">
                    <a href="#" className="sidebar-link active">
                        <History size={20} />
                        <span>My Exams</span>
                    </a>
                    <a href="#" className="sidebar-link">
                        <Award size={20} />
                        <span>Certificates</span>
                    </a>
                    <a href="#" className="sidebar-link">
                        <FileCheck size={20} />
                        <span>Verification</span>
                    </a>
                    <a href="#" className="sidebar-link">
                        <Bell size={20} />
                        <span>Notifications</span>
                    </a>
                </nav>

                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="sidebar-logout">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="dashboard-main">
                {/* Header */}
                <header className="dashboard-header">
                    <div className="dashboard-header-left">
                        <h1>Welcome back, <span>{user.name}</span>!</h1>
                        <p>Here's your invigilation summary</p>
                    </div>
                    <div className="dashboard-header-right">
                        <div className="dashboard-user">
                            <div className="dashboard-user-avatar">
                                <UserIcon size={24} />
                            </div>
                            <div className="dashboard-user-info">
                                <span className="dashboard-user-name">{user.name}</span>
                                <span className="dashboard-user-role">Student Invigilator</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="dashboard-stats">
                    <div className="stat-card stat-card-primary">
                        <div className="stat-icon">
                            <Calendar size={28} />
                        </div>
                        <div className="stat-content">
                            <span className="stat-value">{stats.totalExams}</span>
                            <span className="stat-label">Exams Attended</span>
                        </div>
                    </div>
                    <div className="stat-card stat-card-secondary">
                        <div className="stat-icon">
                            <Clock size={28} />
                        </div>
                        <div className="stat-content">
                            <span className="stat-value">{stats.totalHours}h</span>
                            <span className="stat-label">Total Hours</span>
                        </div>
                    </div>
                    <div className="stat-card stat-card-accent">
                        <div className="stat-icon">
                            <TrendingUp size={28} />
                        </div>
                        <div className="stat-content">
                            <span className="stat-value">₹{stats.totalEarnings}</span>
                            <span className="stat-label">Total Earnings</span>
                        </div>
                    </div>
                    <div className="stat-card stat-card-success">
                        <div className="stat-icon">
                            <Award size={28} />
                        </div>
                        <div className="stat-content">
                            <span className="stat-value">{stats.avgRating}</span>
                            <span className="stat-label">Avg. Rating</span>
                        </div>
                    </div>
                </div>

                {/* Exams Attended Table */}
                <div className="dashboard-section">
                    <div className="section-header">
                        <h2>Exams Attended</h2>
                        <span className="section-badge">{examsAttended.length} Total</span>
                    </div>

                    <div className="exams-table">
                        <div className="exams-table-header">
                            <span>Exam Name</span>
                            <span>Date</span>
                            <span>Location</span>
                            <span>Duration</span>
                            <span>Payment</span>
                            <span>Status</span>
                        </div>
                        {examsAttended.map((exam) => (
                            <div key={exam.id} className="exams-table-row">
                                <div className="exam-name">
                                    <Calendar size={18} />
                                    <span>{exam.title}</span>
                                </div>
                                <span className="exam-date">{exam.date}</span>
                                <div className="exam-location">
                                    <MapPin size={14} />
                                    <span>{exam.location}</span>
                                </div>
                                <span className="exam-duration">{exam.duration}</span>
                                <span className="exam-payment">{exam.payment}</span>
                                <span className="exam-status exam-status-completed">
                                    <CheckCircle size={14} />
                                    Completed
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Verification Status */}
                <div className="dashboard-section">
                    <div className="section-header">
                        <h2>Verification Status</h2>
                    </div>

                    <div className="verification-card">
                        <div className="verification-icon">
                            <Shield size={32} />
                        </div>
                        <div className="verification-content">
                            <h3>DigiLocker Verified</h3>
                            <p>Your identity has been verified via DigiLocker. You are eligible for all invigilation duties.</p>
                        </div>
                        <div className="verification-badge">
                            <CheckCircle size={20} />
                            Verified
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default StudentDashboard;
