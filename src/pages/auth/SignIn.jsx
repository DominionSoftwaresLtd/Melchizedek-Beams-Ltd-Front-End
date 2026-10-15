import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const SignIn = () => {
  const [form, setForm]       = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const { login }             = useAuth();
  const navigate              = useNavigate();
  const location              = useLocation();

  const from = location.state?.from?.pathname || null;

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = await login(form.email, form.password);
      if (from) return navigate(from, { replace: true });
      navigate(user.role === 'admin' ? '/admin/dashboard' : '/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
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
          <h2 className="text-xl font-bold text-primary">Welcome Back</h2>
          <p className="text-gray-500 text-sm mt-1">Sign in to your Melchizedek Beams account</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 text-red-700 text-sm mb-4">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-primary mb-1">Email Address</label>
              <input
                type="email" name="email" value={form.email} onChange={handle}
                placeholder="your@email.com" required autoComplete="email"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706]/40 focus:border-[#D97706]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-primary mb-1">Password</label>
              <input
                type="password" name="password" value={form.password} onChange={handle}
                placeholder="••••••••" required autoComplete="current-password"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706]/40 focus:border-[#D97706]"
              />
            </div>

            <button type="submit" disabled={loading}
              className="btn btn-primary w-full text-sm py-2.5 disabled:opacity-50 mt-1">
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-4">
            Don't have an account?{' '}
            <Link to="/programmes" className="text-[#D97706] font-semibold hover:underline">
              Apply for a programme
            </Link>
          </p>
        </div>

        {/* Admin hint */}
        <div className="mt-4 bg-[#E6F4F1] border border-[#C7E8E2] rounded-xl p-3 text-center">
          <p className="text-xs text-primary font-semibold">Admin?</p>
          <p className="text-[11px] text-gray-500 mt-0.5">
            Use <span className="font-mono font-bold">info@melchizedekbeams.org</span> to access the admin dashboard
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
