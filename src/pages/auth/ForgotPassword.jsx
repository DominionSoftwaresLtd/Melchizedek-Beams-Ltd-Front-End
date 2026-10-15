import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const STEPS = { EMAIL: 'email', OTP: 'otp', RESET: 'reset', DONE: 'done' };

const ForgotPassword = () => {
  const [step, setStep]           = useState(STEPS.EMAIL);
  const [email, setEmail]         = useState('');
  const [otp, setOtp]             = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm]     = useState('');
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');
  const [devOtp, setDevOtp]       = useState(''); // shown in dev when email not configured
  const navigate                  = useNavigate();

  const requestOtp = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res  = await fetch(`${API}/auth/forgot-password`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      if (data.devOtp) setDevOtp(data.devOtp); // dev fallback
      setStep(STEPS.OTP);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res  = await fetch(`${API}/auth/verify-otp`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setResetToken(data.resetToken);
      setStep(STEPS.RESET);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirm) return setError('Passwords do not match.');
    if (newPassword.length < 6)  return setError('Password must be at least 6 characters.');
    setLoading(true); setError('');
    try {
      const res  = await fetch(`${API}/auth/reset-password`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resetToken, newPassword }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setStep(STEPS.DONE);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-[#FAF9F5] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-7">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-3">
            <span className="text-white font-black text-base">MB</span>
          </div>
          <h2 className="text-xl font-bold text-primary">Reset Password</h2>
          <p className="text-gray-500 text-sm mt-1">Melchizedek Beams Account</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {[STEPS.EMAIL, STEPS.OTP, STEPS.RESET].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${
                step === s ? 'bg-primary text-white' :
                Object.values(STEPS).indexOf(step) > Object.values(STEPS).indexOf(s) ? 'bg-[#D97706] text-white' : 'bg-gray-200 text-gray-400'
              }`}>{i + 1}</div>
              {i < 2 && <div className="w-6 h-px bg-gray-300" />}
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          {error && <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 text-red-700 text-sm mb-4">{error}</div>}

          {/* Step 1 — email */}
          {step === STEPS.EMAIL && (
            <form onSubmit={requestOtp} className="space-y-4">
              <p className="text-gray-500 text-xs mb-2">Enter the email address on your account. We'll send a 6-digit code.</p>
              <div>
                <label className="block text-xs font-semibold text-primary mb-1">Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email"
                  placeholder="your@email.com"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706]/40 focus:border-[#D97706]" />
              </div>
              <button type="submit" disabled={loading} className="btn btn-primary w-full text-sm py-2.5 disabled:opacity-50">
                {loading ? 'Sending...' : 'Send OTP Code'}
              </button>
            </form>
          )}

          {/* Step 2 — OTP */}
          {step === STEPS.OTP && (
            <form onSubmit={verifyOtp} className="space-y-4">
              <p className="text-gray-500 text-xs mb-2">
                Enter the 6-digit code sent to <strong>{email}</strong>. It expires in 15 minutes.
              </p>
              {devOtp && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2.5 text-amber-800 text-xs">
                  <strong>Dev mode:</strong> OTP = <span className="font-mono font-bold">{devOtp}</span>
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold text-primary mb-1">OTP Code</label>
                <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required maxLength={6}
                  placeholder="123456"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-center tracking-[0.3em] font-mono font-bold text-lg focus:outline-none focus:ring-2 focus:ring-[#D97706]/40 focus:border-[#D97706]" />
              </div>
              <button type="submit" disabled={loading} className="btn btn-primary w-full text-sm py-2.5 disabled:opacity-50">
                {loading ? 'Verifying...' : 'Verify Code'}
              </button>
              <button type="button" onClick={() => setStep(STEPS.EMAIL)} className="text-xs text-gray-400 hover:text-primary w-full text-center mt-1">
                ← Back to email
              </button>
            </form>
          )}

          {/* Step 3 — new password */}
          {step === STEPS.RESET && (
            <form onSubmit={resetPassword} className="space-y-4">
              <p className="text-gray-500 text-xs mb-2">Choose a new password for your account.</p>
              {[
                { label: 'New Password',     val: newPassword, set: setNewPassword },
                { label: 'Confirm Password', val: confirm,     set: setConfirm },
              ].map(({ label, val, set }) => (
                <div key={label}>
                  <label className="block text-xs font-semibold text-primary mb-1">{label}</label>
                  <input type="password" value={val} onChange={(e) => set(e.target.value)} required minLength={6}
                    placeholder="••••••••"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706]/40 focus:border-[#D97706]" />
                </div>
              ))}
              <button type="submit" disabled={loading} className="btn btn-primary w-full text-sm py-2.5 disabled:opacity-50">
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          )}

          {/* Done */}
          {step === STEPS.DONE && (
            <div className="text-center py-4">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="font-bold text-primary mb-2">Password Reset!</h4>
              <p className="text-gray-500 text-sm mb-4">Your password has been reset successfully. You can now sign in.</p>
              <Link to="/signin" className="btn btn-primary text-sm px-6 py-2 w-full justify-center">Sign In</Link>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          Remembered your password?{' '}
          <Link to="/signin" className="text-[#D97706] font-semibold hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
