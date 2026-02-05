import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Send, Check, ChevronRight, ShieldCheck, Loader, ArrowLeft, ArrowRight } from 'lucide-react';
import DigiLockerVerification from '../components/DigiLockerVerification';
import { authAPI } from '../services/api';

const Register = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [role, setRole] = useState(searchParams.get('role') === 'center' ? 'center' : 'student');
    const [step, setStep] = useState(1); // 1: Basic Info, 2: DigiLocker Verification, 3: Complete
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isVerified, setIsVerified] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        agreeTerms: false
    });

    useEffect(() => {
        const r = searchParams.get('role');
        if (r === 'center') setRole('center');
        else setRole('student');
    }, [searchParams]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleBasicInfoSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.name || !formData.email || !formData.password) {
            setError('Please fill in all required fields');
            return;
        }

        if (!formData.agreeTerms) {
            setError('Please agree to the Terms of Service');
            return;
        }

        setLoading(true);

        try {
            // Register user first
            const response = await authAPI.register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                role
            });

            // Store token
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));

            // Move to verification step for students
            if (role === 'student') {
                setStep(2);
            } else {
                // Centers go directly to dashboard
                navigate('/center/dashboard');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerificationComplete = (verificationData) => {
        setIsVerified(true);
        setStep(3);
    };

    const handleSkipVerification = () => {
        // Allow skipping for now, but show warning
        if (window.confirm('Skipping verification will limit your access to some features. You can verify later from your dashboard. Continue?')) {
            navigate('/student/dashboard');
        }
    };

    const handleComplete = () => {
        navigate('/student/dashboard');
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                {/* Left Side: Visual/Illustration */}
                <div className="auth-visual">
                    <div className="relative w-full max-w-[320px]">
                        {/* Progress indicator for steps */}
                        <div className="absolute top-0 left-0 right-0 flex justify-center gap-3 mb-8">
                            {[1, 2, 3].map((s) => (
                                <div
                                    key={s}
                                    className={`w-3 h-3 rounded-full transition-all ${step >= s ? 'bg-primary scale-110' : 'bg-white/30'
                                        }`}
                                />
                            ))}
                        </div>

                        {step === 1 && (
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
                            </svg>
                        )}

                        {step === 2 && (
                            <div className="flex flex-col items-center justify-center h-full py-12">
                                <div className="w-32 h-32 rounded-[2rem] bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-2xl mb-8">
                                    <ShieldCheck size={64} className="text-white" />
                                </div>
                                <h3 className="text-2xl font-black text-white text-center mb-4">Identity Verification</h3>
                                <p className="text-white/70 text-center text-sm">
                                    Verify your identity instantly using DigiLocker - No document uploads needed!
                                </p>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="flex flex-col items-center justify-center h-full py-12">
                                <div className="w-32 h-32 rounded-full bg-green-500 flex items-center justify-center shadow-2xl mb-8 animate-pulse">
                                    <Check size={64} className="text-white" />
                                </div>
                                <h3 className="text-2xl font-black text-white text-center mb-4">All Set!</h3>
                                <p className="text-white/70 text-center text-sm">
                                    Your account is ready. You're verified and good to go!
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="auth-form-side">
                    {step === 1 && (
                        <>
                            <div className="mb-10">
                                <h1 className="text-4xl font-extrabold mb-2 font-outfit">
                                    Sign <span className="text-primary">Up</span>
                                </h1>
                                <p className="text-sm font-bold text-text-muted">
                                    Already have an account? <Link to="/login" className="text-primary">Log in</Link>
                                </p>
                            </div>

                            {/* Role Toggle */}
                            <div className="flex gap-3 mb-8 p-1.5 bg-surface rounded-2xl">
                                <button
                                    type="button"
                                    onClick={() => setRole('student')}
                                    className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${role === 'student' ? 'bg-primary text-white shadow-lg' : 'text-text-muted hover:text-primary'
                                        }`}
                                >
                                    Student
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole('center')}
                                    className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${role === 'center' ? 'bg-primary text-white shadow-lg' : 'text-text-muted hover:text-primary'
                                        }`}
                                >
                                    Exam Center
                                </button>
                            </div>

                            {error && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleBasicInfoSubmit}>
                                <div className="auth-input-group">
                                    <label className="auth-label">Full Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Your Full Name"
                                        className="auth-input"
                                        required
                                    />
                                </div>

                                <div className="auth-input-group">
                                    <label className="auth-label">Email Address *</label>
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
                                    <label className="auth-label">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="+91 9876543210"
                                        className="auth-input"
                                    />
                                </div>

                                <div className="auth-input-group">
                                    <label className="auth-label">Password *</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Create a strong password"
                                        className="auth-input"
                                        required
                                        minLength={6}
                                    />
                                </div>

                                <div className="flex items-center gap-3 mb-8">
                                    <input
                                        type="checkbox"
                                        name="agreeTerms"
                                        checked={formData.agreeTerms}
                                        onChange={handleInputChange}
                                        className="auth-checkbox"
                                        id="terms"
                                    />
                                    <label htmlFor="terms" className="text-xs font-bold text-text-muted">
                                        I agree to <span className="text-primary cursor-pointer">Platform's Terms of Service</span> and <span className="text-primary cursor-pointer">Privacy Policy</span>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="auth-submit-btn flex items-center justify-center gap-3"
                                >
                                    {loading ? (
                                        <Loader size={20} className="animate-spin" />
                                    ) : (
                                        <>
                                            Continue
                                            <ArrowRight size={20} />
                                        </>
                                    )}
                                </button>
                            </form>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <div className="mb-8">
                                <button
                                    onClick={() => setStep(1)}
                                    className="flex items-center gap-2 text-text-muted hover:text-primary text-sm font-bold mb-4"
                                >
                                    <ArrowLeft size={18} /> Back
                                </button>
                                <h1 className="text-3xl font-extrabold mb-2 font-outfit">
                                    Verify Your <span className="text-primary">Identity</span>
                                </h1>
                                <p className="text-sm font-bold text-text-muted">
                                    Complete verification to access all features
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl mb-8 border border-blue-100">
                                <DigiLockerVerification onVerificationComplete={handleVerificationComplete} />
                            </div>

                            <div className="text-center">
                                <button
                                    onClick={handleSkipVerification}
                                    className="text-text-muted hover:text-primary text-sm font-bold underline"
                                >
                                    Skip for now (verify later)
                                </button>
                            </div>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <div className="text-center">
                                <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-green-100 flex items-center justify-center">
                                    <Check size={48} className="text-green-600" />
                                </div>

                                <h1 className="text-3xl font-extrabold mb-4 font-outfit">
                                    Welcome Aboard! 🎉
                                </h1>

                                <p className="text-text-muted mb-8">
                                    Your account has been created and your identity is verified via DigiLocker.
                                    You're all set to access the platform!
                                </p>

                                <div className="bg-green-50 p-6 rounded-2xl mb-8 border border-green-200">
                                    <div className="flex items-center justify-center gap-3 text-green-700 font-bold">
                                        <ShieldCheck size={24} />
                                        <span>DigiLocker Verified Account</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleComplete}
                                    className="w-full py-5 bg-primary text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-primary-hover transition-all shadow-xl shadow-primary-glow flex items-center justify-center gap-3"
                                >
                                    Go to Dashboard
                                    <ArrowRight size={20} />
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Register;
