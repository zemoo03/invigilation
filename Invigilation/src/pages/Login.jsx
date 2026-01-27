import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    return (
        <div className="auth-container">
            <div className="auth-card">
                {/* Left Side: Visual/Illustration */}
                <div className="auth-visual">
                    <div className="relative w-full max-w-[320px] scale-x-[-1]">
                        {/* Mirrored SVG for variation */}
                        <svg viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="50" y="100" width="300" height="250" rx="20" fill="#E2E8F0" opacity="0.5" />
                            <rect x="30" y="150" width="300" height="250" rx="20" fill="#CBD5E1" opacity="0.3" />
                            <rect x="110" y="50" width="180" height="380" rx="30" fill="#1e293b" />
                            <rect x="120" y="60" width="160" height="360" rx="22" fill="white" />
                            <circle cx="200" cy="90" r="15" fill="#f1f5f9" />
                            <rect x="150" y="120" width="100" height="8" rx="4" fill="#f1f5f9" />
                            <rect x="140" y="145" width="120" height="40" rx="8" fill="white" stroke="#f1f5f9" strokeWidth="2" />
                            <rect x="140" y="200" width="120" height="40" rx="8" fill="white" stroke="#f1f5f9" strokeWidth="2" />
                            <rect x="140" y="255" width="120" height="40" rx="8" fill="white" stroke="#f1f5f9" strokeWidth="2" />
                            <rect x="140" y="320" width="120" height="40" rx="20" fill="#FF6B4E" />
                            <circle cx="90" cy="300" r="40" fill="#2d3748" />
                            <rect x="80" y="340" width="60" height="100" rx="10" fill="#FF6B4E" />
                            <path d="M140 300 Q 180 250 200 180" stroke="#FF6B4E" strokeWidth="4" strokeLinecap="round" />
                        </svg>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="auth-form-side">
                    <div className="mb-10">
                        <h1 className="text-4xl font-extrabold mb-2 font-outfit">
                            Log <span className="text-primary">In</span>
                        </h1>
                        <p className="text-sm font-bold text-text-muted">
                            Don't have an account? <Link to="/register" className="text-primary">Sign up</Link>
                        </p>
                    </div>

                    <form onSubmit={(e) => { e.preventDefault(); navigate('/student/dashboard'); }}>
                        <div className="auth-input-group">
                            <label className="auth-label">Email Address</label>
                            <input type="email" placeholder="examples@gmail.com" className="auth-input" />
                        </div>

                        <div className="auth-input-group">
                            <div className="flex justify-between items-center mb-0.8">
                                <label className="auth-label mb-0">Password</label>
                                <span className="text-[10px] text-primary font-black uppercase tracking-widest cursor-pointer hover:underline">Forgot?</span>
                            </div>
                            <input type="password" placeholder="Enter password" className="auth-input" />
                        </div>

                        <div className="flex items-center gap-3 mb-8">
                            <input type="checkbox" className="auth-checkbox" id="remember" />
                            <label htmlFor="remember" className="text-xs font-bold text-text-muted">
                                Keep me logged in for 30 days
                            </label>
                        </div>

                        {/* Divider */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-[1px] flex-1 bg-border/50"></div>
                            <span className="text-xs font-bold text-text-muted uppercase">Or</span>
                            <div className="h-[1px] flex-1 bg-border/50"></div>
                        </div>

                        {/* Social Buttons */}
                        <div className="flex gap-4 mb-8">
                            <button className="auth-social-btn">
                                <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" className="w-5 h-5" />
                                Log in with Google
                            </button>
                            <button className="auth-social-btn">
                                <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                Log in with Facebook
                            </button>
                        </div>

                        <button type="submit" className="auth-submit-btn">
                            Authorize Access
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
