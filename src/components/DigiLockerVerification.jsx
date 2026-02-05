import React, { useState } from 'react';
import { ShieldCheck, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import { digilockerAPI } from '../services/api';

const DigiLockerVerification = ({ onVerificationComplete }) => {
    const [step, setStep] = useState('initial'); // initial, input, verifying, success, error
    const [aadhaarNumber, setAadhaarNumber] = useState('');
    const [error, setError] = useState('');
    const [verificationData, setVerificationData] = useState(null);

    const handleStartVerification = async () => {
        try {
            // Get DigiLocker auth URL
            const response = await digilockerAPI.getAuthUrl();

            if (response.mode === 'demo') {
                // Show manual input for demo mode
                setStep('input');
            } else {
                // Redirect to actual DigiLocker
                window.location.href = response.authUrl;
            }
        } catch (err) {
            setError(err.message);
            setStep('error');
        }
    };

    const handleMockVerify = async () => {
        if (aadhaarNumber.length !== 12 || !/^\d+$/.test(aadhaarNumber)) {
            setError('Please enter a valid 12-digit Aadhaar number');
            return;
        }

        setStep('verifying');
        setError('');

        try {
            const response = await digilockerAPI.mockVerify(aadhaarNumber);
            setVerificationData(response.verification);
            setStep('success');

            if (onVerificationComplete) {
                onVerificationComplete(response.verification);
            }
        } catch (err) {
            setError(err.message);
            setStep('error');
        }
    };

    const formatAadhaar = (value) => {
        const digits = value.replace(/\D/g, '').slice(0, 12);
        return digits;
    };

    return (
        <div className="digilocker-verification">
            {step === 'initial' && (
                <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl">
                        <ShieldCheck size={40} className="text-white" />
                    </div>
                    <h3 className="text-xl font-black mb-2">Verify with DigiLocker</h3>
                    <p className="text-sm text-text-muted mb-6">
                        Instantly verify your identity using your Aadhaar via DigiLocker.
                        No need to upload documents!
                    </p>
                    <button
                        onClick={handleStartVerification}
                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:scale-105 transition-all shadow-xl flex items-center justify-center gap-3"
                    >
                        <img
                            src="https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/DigiLocker_logo.svg/1200px-DigiLocker_logo.svg.png"
                            alt="DigiLocker"
                            className="w-6 h-6 object-contain bg-white rounded p-0.5"
                        />
                        Verify with DigiLocker
                    </button>
                    <p className="text-xs text-text-muted mt-4">
                        Powered by Government of India's DigiLocker
                    </p>
                </div>
            )}

            {step === 'input' && (
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-100 flex items-center justify-center">
                        <ShieldCheck size={32} className="text-blue-600" />
                    </div>
                    <h3 className="text-lg font-black mb-2">Enter Aadhaar Number</h3>
                    <p className="text-xs text-text-muted mb-6">
                        Demo Mode: Enter your 12-digit Aadhaar number for verification
                    </p>

                    <input
                        type="text"
                        value={aadhaarNumber}
                        onChange={(e) => setAadhaarNumber(formatAadhaar(e.target.value))}
                        placeholder="XXXX XXXX XXXX"
                        maxLength={12}
                        className="w-full px-6 py-4 text-center text-xl font-mono tracking-[0.5em] bg-surface rounded-2xl border-2 border-border focus:border-primary outline-none mb-4"
                    />

                    {error && (
                        <p className="text-red-500 text-sm mb-4">{error}</p>
                    )}

                    <div className="flex gap-4">
                        <button
                            onClick={() => setStep('initial')}
                            className="flex-1 py-3 bg-surface text-text-muted font-bold text-sm rounded-xl hover:bg-border transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleMockVerify}
                            disabled={aadhaarNumber.length !== 12}
                            className="flex-1 py-3 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Verify Now
                        </button>
                    </div>
                </div>
            )}

            {step === 'verifying' && (
                <div className="text-center py-8">
                    <Loader size={48} className="animate-spin text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-black mb-2">Verifying with DigiLocker...</h3>
                    <p className="text-sm text-text-muted">
                        Please wait while we fetch your verified details
                    </p>
                </div>
            )}

            {step === 'success' && verificationData && (
                <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle size={48} className="text-green-600" />
                    </div>
                    <h3 className="text-xl font-black mb-2 text-green-600">Verification Successful!</h3>
                    <p className="text-sm text-text-muted mb-6">
                        Your identity has been verified via DigiLocker
                    </p>

                    <div className="bg-surface rounded-2xl p-6 text-left mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xs font-bold text-text-muted uppercase">Verified Name</span>
                            <span className="font-bold">{verificationData.name}</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xs font-bold text-text-muted uppercase">Aadhaar (Masked)</span>
                            <span className="font-mono font-bold">{verificationData.maskedAadhaar}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-text-muted uppercase">Verified At</span>
                            <span className="text-sm">{new Date(verificationData.verifiedAt).toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-green-600 text-sm font-bold">
                        <ShieldCheck size={18} />
                        DigiLocker Verified
                    </div>
                </div>
            )}

            {step === 'error' && (
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                        <AlertCircle size={32} className="text-red-600" />
                    </div>
                    <h3 className="text-lg font-black mb-2 text-red-600">Verification Failed</h3>
                    <p className="text-sm text-text-muted mb-6">{error}</p>
                    <button
                        onClick={() => { setStep('initial'); setError(''); }}
                        className="px-8 py-3 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary-hover transition-all"
                    >
                        Try Again
                    </button>
                </div>
            )}
        </div>
    );
};

export default DigiLockerVerification;
