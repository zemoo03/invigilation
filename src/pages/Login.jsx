import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Loader, Eye, EyeOff } from 'lucide-react';
import { authAPI } from '../services/api';

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await authAPI.login({
                email: formData.email,
                password: formData.password
            });

            // Store token and user data
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));

            // Redirect based on role
            if (response.user.role === 'admin') {
                navigate('/admin/dashboard');
            } else if (response.user.role === 'center') {
                navigate('/center/dashboard');
            } else {
                navigate('/student/dashboard');
            }
        } catch (err) {
            setError(err.message || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    // Demo login for testing
    const handleDemoLogin = (role) => {
        localStorage.setItem('token', 'demo-token');
        localStorage.setItem('user', JSON.stringify({
            id: 'demo-user',
            name: role === 'admin' ? 'Admin User' : 'Student User',
            email: `demo@${role}.com`,
            role
        }));

        if (role === 'admin') {
            navigate('/admin/dashboard');
        } else {
            navigate('/student/dashboard');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                {/* Left Side: Visual/Illustration */}
                <div className="auth-visual">
                    <div className="auth-visual-content">
                        <div className="auth-visual-icon">
                            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="50" cy="50" r="45" fill="#FF6B4E" opacity="0.1" />
                                <circle cx="50" cy="35" r="15" fill="#FF6B4E" />
                                <path d="M25 75C25 60 35 52 50 52C65 52 75 60 75 75" stroke="#FF6B4E" strokeWidth="6" strokeLinecap="round" />
                            </svg>
                        </div>
                        <h2 className="auth-visual-title">Welcome Back!</h2>
                        <p className="auth-visual-text">
                            Access your invigilation dashboard and manage exams seamlessly.
                        </p>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="auth-form-side">
                    <div className="auth-form-header">
                        <h1 className="auth-title">
                            Log <span className="text-primary">In</span>
                        </h1>
                        <p className="auth-subtitle">
                            Don't have an account? <Link to="/register" className="text-primary">Sign up</Link>
                        </p>
                    </div>

                    {error && (
                        <div className="auth-error">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="auth-input-group">
                            <label className="auth-label">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="example@gmail.com"
                                className="auth-input"
                                required
                            />
                        </div>

                        <div className="auth-input-group">
                            <div className="auth-label-row">
                                <label className="auth-label">Password</label>
                                <span className="auth-forgot">Forgot?</span>
                            </div>
                            <div className="auth-input-wrapper">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Enter password"
                                    className="auth-input"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="auth-input-icon"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="auth-checkbox-group">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={formData.remember}
                                onChange={handleInputChange}
                                className="auth-checkbox"
                                id="remember"
                            />
                            <label htmlFor="remember" className="auth-checkbox-label">
                                Keep me logged in for 30 days
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="auth-submit-btn auth-submit-btn-primary"
                        >
                            {loading ? (
                                <Loader size={20} className="animate-spin" />
                            ) : (
                                <>
                                    Login to Dashboard
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="auth-divider">
                        <span>Or try demo</span>
                    </div>

                    {/* Demo Buttons */}
                    <div className="auth-demo-buttons">
                        <button
                            type="button"
                            onClick={() => handleDemoLogin('student')}
                            className="auth-demo-btn"
                        >
                            👨‍🎓 Student Demo
                        </button>
                        <button
                            type="button"
                            onClick={() => handleDemoLogin('admin')}
                            className="auth-demo-btn"
                        >
                            👨‍💼 Admin Demo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
