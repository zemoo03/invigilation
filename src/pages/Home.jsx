import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    CheckCircle, GraduationCap, Building2, ShieldCheck,
    ArrowRight, Star, Clock, Zap, Shield, Users
} from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-bg-gradient"></div>
                <div className="hero-bg-gradient-2"></div>

                <div className="container">
                    <div className="hero-grid">
                        {/* Left Content */}
                        <div className="hero-content animate-up">
                            <div className="hero-badge">
                                <span className="hero-badge-dot"></span>
                                <span className="hero-badge-text">Over 5,000 slots this month</span>
                            </div>

                            <h1 className="hero-title">
                                Empowering the <br />
                                <span className="hero-title-highlight">Next Generation</span>
                                <br /> of Professionals.
                            </h1>

                            <p className="hero-description">
                                Connect with India's top educational institutions. Get verified via DigiLocker, pick your slots, and earn professionally as an exam invigilator.
                            </p>

                            <div className="hero-buttons">
                                <button
                                    onClick={() => navigate('/register?role=student')}
                                    className="hero-btn hero-btn-primary"
                                >
                                    <GraduationCap size={22} />
                                    Start Earning
                                </button>
                                <button
                                    onClick={() => navigate('/register?role=center')}
                                    className="hero-btn hero-btn-secondary"
                                >
                                    <Building2 size={22} />
                                    Hire Talent
                                </button>
                            </div>

                            <div className="hero-stats">
                                <div className="hero-stats-rating">
                                    <div className="hero-avatars">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="hero-avatar">
                                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=student${i}`} alt="avatar" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="hero-rating-info">
                                        <div className="hero-stars">
                                            {[1, 2, 3, 4, 5].map(i => (
                                                <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                                            ))}
                                        </div>
                                        <span className="hero-rating-text">4.9/5 Student Rating</span>
                                    </div>
                                </div>
                                <div className="hero-stats-divider"></div>
                                <div className="hero-stats-number">
                                    <span className="hero-stats-value">5,000+</span>
                                    <span className="hero-stats-label">Duties Assigned</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Visual */}
                        <div className="hero-visual">
                            <div className="hero-visual-glow"></div>

                            {/* Main Card */}
                            <div className="hero-card animate-float">
                                <div className="hero-card-header">
                                    <h3>Published Schedules</h3>
                                    <div className="hero-card-dots">
                                        <span className="dot dot-red"></span>
                                        <span className="dot dot-yellow"></span>
                                        <span className="dot dot-green"></span>
                                    </div>
                                </div>

                                <div className="hero-card-items">
                                    {[
                                        { title: 'JEE Advanced 2026', slots: '20 Slots Left', time: '8 AM - 2 PM' },
                                        { title: 'National Medical Mock', slots: '15 Slots Left', time: '1 PM - 5 PM' },
                                        { title: 'Standard Chartered Test', slots: '8 Slots Left', time: '9 AM - 6 PM' }
                                    ].map((job, idx) => (
                                        <div key={idx} className="hero-card-item">
                                            <div className="hero-card-item-left">
                                                <div className="hero-card-item-icon">
                                                    <Zap size={20} />
                                                </div>
                                                <div>
                                                    <h4>{job.title}</h4>
                                                    <p><Clock size={10} /> {job.time}</p>
                                                </div>
                                            </div>
                                            <div className="hero-card-item-right">
                                                <span className="slots">{job.slots}</span>
                                                <span className="status">Published</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button className="hero-card-btn">
                                    View Latest Slots <ArrowRight size={18} />
                                </button>
                            </div>

                            {/* Floating Cards */}
                            <div className="floating-card floating-card-top">
                                <div className="floating-card-icon floating-card-icon-green">
                                    <CheckCircle size={20} />
                                </div>
                                <div>
                                    <p className="floating-card-label">Verification</p>
                                    <p className="floating-card-value">100% Success</p>
                                </div>
                            </div>

                            <div className="floating-card floating-card-bottom">
                                <div className="floating-card-icon floating-card-icon-yellow">
                                    <Star size={20} />
                                </div>
                                <div>
                                    <p className="floating-card-label">Reliability</p>
                                    <p className="floating-card-value">Grade-A Staff</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trusted By Section */}
            <section className="trusted-section">
                <div className="container">
                    <div className="trusted-content">
                        <h4>Trusted By</h4>
                        <div className="trusted-logos">
                            <div className="trusted-logo"></div>
                            <div className="trusted-logo"></div>
                            <div className="trusted-logo"></div>
                            <div className="trusted-logo"></div>
                            <div className="trusted-logo"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <div className="features-header animate-up">
                        <span className="features-tag">Why Choose Us</span>
                        <h2 className="features-title">Designed for Excellence</h2>
                        <p className="features-description">We've built the most reliable manpower engine for examinations in India.</p>
                    </div>

                    <div className="features-grid">
                        {[
                            {
                                title: 'High Transparency',
                                desc: 'Every slot has fixed pay rates. No hidden commissions or delayed payments.',
                                icon: Shield, color: '#FF6B4E'
                            },
                            {
                                title: 'DigiLocker Verified',
                                desc: 'Only verified students with Aadhaar verification via DigiLocker are allowed.',
                                icon: ShieldCheck, color: '#10B981'
                            },
                            {
                                title: 'Instant Support',
                                desc: 'Dedicated 24/7 WhatsApp support for students and exam coordinators.',
                                icon: Zap, color: '#F59E0B'
                            }
                        ].map((feature, i) => (
                            <div key={i} className="feature-card">
                                <div className="feature-icon" style={{ backgroundColor: `${feature.color}15`, color: feature.color }}>
                                    <feature.icon size={32} />
                                </div>
                                <h3>{feature.title}</h3>
                                <p>{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-card">
                        <div className="cta-bg"></div>
                        <div className="cta-content">
                            <div className="cta-text">
                                <h2>
                                    Revolutionize Your <br />
                                    <span>Exam Operations.</span>
                                </h2>
                                <p>Whether you're a venue owner or a student looking for dignity and pay—we are your partners.</p>
                                <div className="cta-buttons">
                                    <button onClick={() => navigate('/register')} className="cta-btn-primary">
                                        Get Started
                                    </button>
                                    <button onClick={() => navigate('/contact')} className="cta-btn-secondary">
                                        Contact Sales
                                    </button>
                                </div>
                            </div>
                            <div className="cta-stats">
                                <div className="cta-stats-row">
                                    <div className="cta-stat">
                                        <h4>99%</h4>
                                        <p>Accuracy Rate</p>
                                    </div>
                                    <div className="cta-stat">
                                        <h4>24h</h4>
                                        <p>Payment Cycle</p>
                                    </div>
                                </div>
                                <div className="cta-stats-row">
                                    <div className="cta-stat cta-stat-highlight">
                                        <h4>15k+</h4>
                                        <p>Active Pool</p>
                                    </div>
                                    <div className="cta-stat">
                                        <h4>100+</h4>
                                        <p>Exam Centers</p>
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
