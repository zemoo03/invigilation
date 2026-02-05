import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Calendar, Users, Plus, Search, Edit2, Trash2,
    CheckCircle, XCircle, Clock, Shield, LogOut,
    BarChart3, FileText, Settings, Bell, User as UserIcon,
    MapPin, Eye, X
} from 'lucide-react';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('exams');
    const [showAddExamModal, setShowAddExamModal] = useState(false);
    const [newExam, setNewExam] = useState({
        title: '',
        date: '',
        location: '',
        invigilatorsNeeded: '',
        paymentPerInvigilator: ''
    });

    // Mock exams data
    const [exams, setExams] = useState([
        {
            id: 1,
            title: 'JEE Main Phase 2',
            date: '2026-02-15',
            location: 'Model Public School, Rohini',
            invigilatorsNeeded: 25,
            invigilatorsAssigned: 18,
            paymentPerInvigilator: 800,
            status: 'active'
        },
        {
            id: 2,
            title: 'UPSC Prelims 2026',
            date: '2026-03-01',
            location: 'Knowledge Hub, West Delhi',
            invigilatorsNeeded: 40,
            invigilatorsAssigned: 35,
            paymentPerInvigilator: 1000,
            status: 'active'
        },
        {
            id: 3,
            title: 'NEET UG 2026',
            date: '2026-03-20',
            location: 'Oxford High, Gurugram',
            invigilatorsNeeded: 50,
            invigilatorsAssigned: 12,
            paymentPerInvigilator: 900,
            status: 'upcoming'
        },
    ]);

    // Mock students data
    const [students, setStudents] = useState([
        { id: 1, name: 'Rahul Sharma', email: 'rahul@email.com', verified: true, examsAttended: 8 },
        { id: 2, name: 'Priya Singh', email: 'priya@email.com', verified: true, examsAttended: 12 },
        { id: 3, name: 'Amit Kumar', email: 'amit@email.com', verified: false, examsAttended: 0 },
        { id: 4, name: 'Neha Gupta', email: 'neha@email.com', verified: true, examsAttended: 5 },
        { id: 5, name: 'Vikram Patel', email: 'vikram@email.com', verified: false, examsAttended: 0 },
    ]);

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

    const handleAddExam = (e) => {
        e.preventDefault();
        const exam = {
            id: exams.length + 1,
            ...newExam,
            invigilatorsNeeded: parseInt(newExam.invigilatorsNeeded),
            invigilatorsAssigned: 0,
            paymentPerInvigilator: parseInt(newExam.paymentPerInvigilator),
            status: 'upcoming'
        };
        setExams([...exams, exam]);
        setNewExam({ title: '', date: '', location: '', invigilatorsNeeded: '', paymentPerInvigilator: '' });
        setShowAddExamModal(false);
    };

    const handleVerifyStudent = (studentId) => {
        setStudents(students.map(s =>
            s.id === studentId ? { ...s, verified: true } : s
        ));
    };

    const stats = {
        totalExams: exams.length,
        activeExams: exams.filter(e => e.status === 'active').length,
        totalStudents: students.length,
        verifiedStudents: students.filter(s => s.verified).length
    };

    if (!user) {
        return null;
    }

    return (
        <div className="dashboard">
            {/* Sidebar */}
            <aside className="dashboard-sidebar dashboard-sidebar-admin">
                <div className="sidebar-header">
                    <Link to="/" className="sidebar-logo">
                        <div className="sidebar-logo-icon">
                            <Shield size={24} />
                        </div>
                        <span>Invi<span>Guard</span></span>
                    </Link>
                </div>

                <nav className="sidebar-nav">
                    <button
                        onClick={() => setActiveTab('exams')}
                        className={`sidebar-link ${activeTab === 'exams' ? 'active' : ''}`}
                    >
                        <Calendar size={20} />
                        <span>Manage Exams</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('students')}
                        className={`sidebar-link ${activeTab === 'students' ? 'active' : ''}`}
                    >
                        <Users size={20} />
                        <span>Students</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('reports')}
                        className={`sidebar-link ${activeTab === 'reports' ? 'active' : ''}`}
                    >
                        <BarChart3 size={20} />
                        <span>Reports</span>
                    </button>
                    <button className="sidebar-link">
                        <Settings size={20} />
                        <span>Settings</span>
                    </button>
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
                        <h1>Admin <span>Dashboard</span></h1>
                        <p>Manage exams and invigilators</p>
                    </div>
                    <div className="dashboard-header-right">
                        <div className="dashboard-user">
                            <div className="dashboard-user-avatar admin-avatar">
                                <UserIcon size={24} />
                            </div>
                            <div className="dashboard-user-info">
                                <span className="dashboard-user-name">{user.name}</span>
                                <span className="dashboard-user-role">Administrator</span>
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
                            <span className="stat-label">Total Exams</span>
                        </div>
                    </div>
                    <div className="stat-card stat-card-secondary">
                        <div className="stat-icon">
                            <Clock size={28} />
                        </div>
                        <div className="stat-content">
                            <span className="stat-value">{stats.activeExams}</span>
                            <span className="stat-label">Active Exams</span>
                        </div>
                    </div>
                    <div className="stat-card stat-card-accent">
                        <div className="stat-icon">
                            <Users size={28} />
                        </div>
                        <div className="stat-content">
                            <span className="stat-value">{stats.totalStudents}</span>
                            <span className="stat-label">Total Students</span>
                        </div>
                    </div>
                    <div className="stat-card stat-card-success">
                        <div className="stat-icon">
                            <CheckCircle size={28} />
                        </div>
                        <div className="stat-content">
                            <span className="stat-value">{stats.verifiedStudents}</span>
                            <span className="stat-label">Verified Students</span>
                        </div>
                    </div>
                </div>

                {/* Exams Tab */}
                {activeTab === 'exams' && (
                    <div className="dashboard-section">
                        <div className="section-header">
                            <h2>Manage Exams</h2>
                            <button
                                onClick={() => setShowAddExamModal(true)}
                                className="section-btn"
                            >
                                <Plus size={18} />
                                Add New Exam
                            </button>
                        </div>

                        <div className="exams-grid">
                            {exams.map((exam) => (
                                <div key={exam.id} className="exam-card">
                                    <div className="exam-card-header">
                                        <h3>{exam.title}</h3>
                                        <span className={`exam-card-status ${exam.status}`}>
                                            {exam.status}
                                        </span>
                                    </div>
                                    <div className="exam-card-details">
                                        <div className="exam-card-detail">
                                            <Calendar size={16} />
                                            <span>{new Date(exam.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                        </div>
                                        <div className="exam-card-detail">
                                            <MapPin size={16} />
                                            <span>{exam.location}</span>
                                        </div>
                                    </div>
                                    <div className="exam-card-invigilators">
                                        <div className="invigilator-progress">
                                            <div className="invigilator-progress-bar">
                                                <div
                                                    className="invigilator-progress-fill"
                                                    style={{ width: `${(exam.invigilatorsAssigned / exam.invigilatorsNeeded) * 100}%` }}
                                                ></div>
                                            </div>
                                            <span className="invigilator-count">
                                                {exam.invigilatorsAssigned}/{exam.invigilatorsNeeded} Invigilators
                                            </span>
                                        </div>
                                        <span className="exam-payment">₹{exam.paymentPerInvigilator}/person</span>
                                    </div>
                                    <div className="exam-card-actions">
                                        <button className="exam-action-btn">
                                            <Eye size={16} /> View
                                        </button>
                                        <button className="exam-action-btn">
                                            <Edit2 size={16} /> Edit
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Students Tab */}
                {activeTab === 'students' && (
                    <div className="dashboard-section">
                        <div className="section-header">
                            <h2>Manage Students</h2>
                            <div className="section-search">
                                <Search size={18} />
                                <input type="text" placeholder="Search students..." />
                            </div>
                        </div>

                        <div className="students-table">
                            <div className="students-table-header">
                                <span>Name</span>
                                <span>Email</span>
                                <span>Verification</span>
                                <span>Exams Attended</span>
                                <span>Actions</span>
                            </div>
                            {students.map((student) => (
                                <div key={student.id} className="students-table-row">
                                    <div className="student-name">
                                        <div className="student-avatar">
                                            <UserIcon size={18} />
                                        </div>
                                        <span>{student.name}</span>
                                    </div>
                                    <span className="student-email">{student.email}</span>
                                    <span className={`student-status ${student.verified ? 'verified' : 'pending'}`}>
                                        {student.verified ? (
                                            <><CheckCircle size={14} /> Verified</>
                                        ) : (
                                            <><Clock size={14} /> Pending</>
                                        )}
                                    </span>
                                    <span className="student-exams">{student.examsAttended}</span>
                                    <div className="student-actions">
                                        {!student.verified && (
                                            <button
                                                onClick={() => handleVerifyStudent(student.id)}
                                                className="verify-btn"
                                            >
                                                <CheckCircle size={14} /> Verify
                                            </button>
                                        )}
                                        <button className="view-btn">
                                            <Eye size={14} /> View
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Reports Tab */}
                {activeTab === 'reports' && (
                    <div className="dashboard-section">
                        <div className="section-header">
                            <h2>Reports & Analytics</h2>
                        </div>
                        <div className="reports-placeholder">
                            <BarChart3 size={64} />
                            <h3>Reports Coming Soon</h3>
                            <p>Detailed analytics and reports will be available here.</p>
                        </div>
                    </div>
                )}
            </main>

            {/* Add Exam Modal */}
            {showAddExamModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h2>Add New Exam</h2>
                            <button onClick={() => setShowAddExamModal(false)} className="modal-close">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleAddExam} className="modal-form">
                            <div className="form-group">
                                <label>Exam Title</label>
                                <input
                                    type="text"
                                    value={newExam.title}
                                    onChange={(e) => setNewExam({ ...newExam, title: e.target.value })}
                                    placeholder="e.g., JEE Advanced 2026"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Date</label>
                                <input
                                    type="date"
                                    value={newExam.date}
                                    onChange={(e) => setNewExam({ ...newExam, date: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Location</label>
                                <input
                                    type="text"
                                    value={newExam.location}
                                    onChange={(e) => setNewExam({ ...newExam, location: e.target.value })}
                                    placeholder="e.g., Model Public School, Delhi"
                                    required
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Invigilators Needed</label>
                                    <input
                                        type="number"
                                        value={newExam.invigilatorsNeeded}
                                        onChange={(e) => setNewExam({ ...newExam, invigilatorsNeeded: e.target.value })}
                                        placeholder="25"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Payment per Invigilator (₹)</label>
                                    <input
                                        type="number"
                                        value={newExam.paymentPerInvigilator}
                                        onChange={(e) => setNewExam({ ...newExam, paymentPerInvigilator: e.target.value })}
                                        placeholder="800"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="modal-actions">
                                <button type="button" onClick={() => setShowAddExamModal(false)} className="btn-secondary">
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary">
                                    <Plus size={18} /> Add Exam
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
