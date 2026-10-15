import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const [form, setForm]       = useState({ email: 'info@melchizedekbeams.org', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const { login }             = useAuth();
  const navigate              = useNavigate();

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = await login(form.email, form.password);
      if (user.role !== 'admin') {
        setError('This login is for admins only.');
        return;
      }
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-[#FAF9F5] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-7">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-3">
            <span className="text-white font-black text-base">MB</span>
          </div>
          <h2 className="text-xl font-bold text-primary">Admin Login</h2>
          <p className="text-gray-500 text-sm mt-1">Melchizedek Beams Administration</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 text-red-700 text-sm mb-4">{error}</div>
          )}
          <form onSubmit={submit} className="space-y-4">
            {[
              { label: 'Admin Email', name: 'email', type: 'email' },
              { label: 'Password',    name: 'password', type: 'password' },
            ].map(({ label, name, type }) => (
              <div key={name}>
                <label className="block text-xs font-semibold text-primary mb-1">{label}</label>
                <input type={type} name={name} value={form[name]} onChange={handle} required
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706]/40 focus:border-[#D97706]" />
              </div>
            ))}
            <button type="submit" disabled={loading} className="btn btn-secondary w-full text-sm py-2.5 disabled:opacity-50">
              {loading ? 'Signing In...' : 'Access Dashboard'}
            </button>
          </form>
          <p className="text-center text-[11px] text-gray-400 mt-4 bg-gray-50 rounded-lg py-2 px-3">
            Default: <span className="font-mono font-bold text-primary">info@melchizedekbeams.org</span> / <span className="font-mono font-bold text-primary">MelchizedekBeams</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
