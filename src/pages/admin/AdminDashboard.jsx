import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

/* ── helpers ── */
const authHeaders = (token) => ({ Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' });

const StatusBadge = ({ status }) => {
  const styles = {
    Pending:  'bg-amber-50 text-amber-700',
    Approved: 'bg-green-100 text-green-700',
    Rejected: 'bg-red-100 text-red-700',
  };
  return <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${styles[status] || 'bg-gray-100 text-gray-600'}`}>{status}</span>;
};

/* ── Tab components ── */

/* Registrations tab */
const RegistrationsTab = ({ token }) => {
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [acting, setActing]   = useState({});

  const load = () => {
    fetch(`${API}/registrations`, { headers: authHeaders(token) })
      .then((r) => r.json())
      .then((d) => { if (d.success) setItems(d.data); })
      .finally(() => setLoading(false));
  };
  useEffect(load, []);

  const act = async (id, action) => {
    setActing((a) => ({ ...a, [id]: action }));
    const res = await fetch(`${API}/registrations/${id}/${action}`, {
      method: 'PATCH', headers: authHeaders(token),
    });
    const data = await res.json();
    if (data.success) {
      setItems((prev) => prev.map((r) => r._id === id ? { ...r, status: action === 'approve' ? 'Approved' : 'Rejected' } : r));
      if (action === 'approve' && data.tempPassword) {
        alert(`✅ Approved!\n\nTemp password for ${data.data.email}:\n${data.tempPassword}\n\n(In production this would be emailed automatically.)`);
      }
    } else {
      alert(data.message);
    }
    setActing((a) => { const n = { ...a }; delete n[id]; return n; });
  };

  if (loading) return <div className="py-12 text-center"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-primary text-base">Enrollment Applications</h3>
        <span className="text-xs text-gray-400">{items.length} total</span>
      </div>
      {items.length === 0 ? (
        <div className="card p-8 text-center text-gray-400 text-sm">No registrations yet.</div>
      ) : (
        <div className="space-y-3">
          {items.map((r) => (
            <div key={r._id} className="card p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-grow">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="font-bold text-sm text-primary">{r.fullName}</p>
                    <StatusBadge status={r.status} />
                  </div>
                  <p className="text-xs text-gray-500">{r.email} · {r.phone}</p>
                  <p className="text-xs text-[#D97706] font-semibold mt-0.5">{r.programmeName}</p>
                  {r.statementOfIntent && (
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2 italic">"{r.statementOfIntent}"</p>
                  )}
                  <p className="text-[11px] text-gray-300 mt-1">{new Date(r.createdAt).toLocaleDateString()}</p>
                </div>
                {r.status === 'Pending' && (
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => act(r._id, 'approve')}
                      disabled={!!acting[r._id]}
                      className="btn bg-green-600 text-white text-xs py-1.5 px-3 hover:bg-green-700 disabled:opacity-50"
                    >
                      {acting[r._id] === 'approve' ? '...' : 'Approve'}
                    </button>
                    <button
                      onClick={() => act(r._id, 'reject')}
                      disabled={!!acting[r._id]}
                      className="btn bg-red-500 text-white text-xs py-1.5 px-3 hover:bg-red-600 disabled:opacity-50"
                    >
                      {acting[r._id] === 'reject' ? '...' : 'Reject'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* Students tab */
const StudentsTab = ({ token }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [marking, setMarking]   = useState(false);

  useEffect(() => {
    fetch(`${API}/students`, { headers: authHeaders(token) })
      .then((r) => r.json())
      .then((d) => { if (d.success) setStudents(d.data); })
      .finally(() => setLoading(false));
  }, []);

  const markModule = async (studentId, programmeId, moduleLabel) => {
    setMarking(true);
    const res = await fetch(`${API}/students/${studentId}/progress`, {
      method: 'PATCH',
      headers: authHeaders(token),
      body: JSON.stringify({ programmeId, moduleLabel }),
    });
    const data = await res.json();
    if (data.success) {
      setStudents((prev) => prev.map((s) =>
        s._id === studentId ? { ...s, progress: data.data } : s
      ));
    }
    setMarking(false);
  };

  const issueCert = async (studentId, programmeId) => {
    const res = await fetch(`${API}/students/${studentId}/certificate`, {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify({ programmeId }),
    });
    const data = await res.json();
    alert(data.success ? `✅ Certificate issued for ${data.certificate.studentName}` : data.message);
    if (data.success) {
      setStudents((prev) => prev.map((s) =>
        s._id === studentId
          ? { ...s, progress: s.progress.map((p) => p.programmeId?._id?.toString() === programmeId ? { ...p, certificateIssued: true } : p) }
          : s
      ));
    }
  };

  if (loading) return <div className="py-12 text-center"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-primary text-base">Enrolled Students</h3>
        <span className="text-xs text-gray-400">{students.length} students</span>
      </div>
      {students.length === 0 ? (
        <div className="card p-8 text-center text-gray-400 text-sm">No students yet. Approve an enrollment to create a student account.</div>
      ) : (
        <div className="space-y-3">
          {students.map((s) => (
            <div key={s._id} className="card overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === s._id ? null : s._id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
              >
                <div>
                  <p className="font-bold text-sm text-primary">{s.name}</p>
                  <p className="text-xs text-gray-400">{s.email} · {s.progress?.length || 0} programme(s)</p>
                </div>
                <svg className={`w-4 h-4 text-gray-400 transition-transform ${expanded === s._id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {expanded === s._id && s.progress?.map((prog, i) => {
                const progId = prog.programmeId?._id || prog.programmeId;
                const modules = prog.programmeId?.syllabus || [];
                return (
                  <div key={i} className="px-4 pb-4 border-t border-gray-100">
                    <div className="flex items-center justify-between mt-3 mb-2">
                      <p className="text-xs font-bold text-[#D97706]">{prog.programmeId?.title || prog.programmeName}</p>
                      <span className="text-xs text-gray-400">{prog.percentComplete || 0}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 mb-3">
                      <div className="bg-[#D97706] h-1.5 rounded-full" style={{ width: `${prog.percentComplete || 0}%` }} />
                    </div>

                    {/* Mark modules */}
                    {modules.length > 0 && (
                      <div className="space-y-1 mb-3">
                        {modules.map((mod) => {
                          const done = prog.completedModules?.includes(mod);
                          return (
                            <div key={mod} className="flex items-center justify-between text-xs">
                              <span className={done ? 'text-green-600 font-medium' : 'text-gray-500'}>{done ? '✓ ' : '○ '}{mod}</span>
                              {!done && (
                                <button
                                  onClick={() => markModule(s._id, progId, mod)}
                                  disabled={marking}
                                  className="text-[10px] text-[#D97706] hover:underline font-semibold disabled:opacity-50"
                                >
                                  Mark Complete
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Issue cert */}
                    {prog.percentComplete >= 100 && !prog.certificateIssued && (
                      <button
                        onClick={() => issueCert(s._id, progId)}
                        className="btn bg-green-600 text-white text-xs py-1.5 px-4 hover:bg-green-700"
                      >
                        Issue Certificate
                      </button>
                    )}
                    {prog.certificateIssued && (
                      <span className="text-xs text-green-600 font-semibold">✓ Certificate Issued</span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* Gallery tab */
const GalleryTab = ({ token }) => {
  const [items, setItems]     = useState([]);
  const [form, setForm]       = useState({ title: '', imageUrl: '', category: 'General' });
  const [saving, setSaving]   = useState(false);

  useEffect(() => {
    fetch(`${API}/gallery`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setItems(d.data); });
  }, []);

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch(`${API}/gallery`, {
      method: 'POST', headers: authHeaders(token), body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.success) { setItems((prev) => [data.data, ...prev]); setForm({ title: '', imageUrl: '', category: 'General' }); }
    setSaving(false);
  };

  const del = async (id) => {
    if (!confirm('Delete this image?')) return;
    await fetch(`${API}/gallery/${id}`, { method: 'DELETE', headers: authHeaders(token) });
    setItems((prev) => prev.filter((i) => i._id !== id));
  };

  return (
    <div>
      <h3 className="font-bold text-primary text-base mb-4">Gallery Management</h3>

      {/* Upload form */}
      <div className="card p-5 mb-5">
        <h4 className="text-sm font-bold text-primary mb-3">Add Gallery Image</h4>
        <form onSubmit={save} className="grid sm:grid-cols-3 gap-3">
          {[
            { label: 'Image Title', name: 'title', placeholder: 'e.g. Leadership Summit 2026' },
            { label: 'Image URL', name: 'imageUrl', placeholder: 'https://...' },
          ].map(({ label, name, placeholder }) => (
            <div key={name}>
              <label className="block text-xs font-semibold text-primary mb-1">{label}</label>
              <input type="text" value={form[name]} onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                placeholder={placeholder} required
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#D97706]/40" />
            </div>
          ))}
          <div>
            <label className="block text-xs font-semibold text-primary mb-1">Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none">
              {['General', 'Programmes', 'Events', 'Team'].map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="sm:col-span-3">
            <button type="submit" disabled={saving} className="btn btn-primary text-xs py-2 px-5 disabled:opacity-50">
              {saving ? 'Adding...' : 'Add Image'}
            </button>
          </div>
        </form>
      </div>

      {/* Grid */}
      {items.length === 0 ? (
        <div className="card p-6 text-center text-gray-400 text-sm">No gallery items yet.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {items.map((img) => (
            <div key={img._id} className="relative group rounded-xl overflow-hidden bg-gray-100 aspect-square">
              <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover" onError={(e) => { e.target.src = ''; e.target.style.display = 'none'; }} />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                <p className="text-white text-[11px] font-semibold text-center line-clamp-2">{img.title}</p>
                <button onClick={() => del(img._id)} className="bg-red-500 text-white text-[10px] px-3 py-1 rounded-full hover:bg-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* Resources tab */
const ResourcesTab = ({ token }) => {
  const [items, setItems]   = useState([]);
  const [form, setForm]     = useState({ title: '', category: 'Devotional', description: '', externalUrl: '', provider: '', format: 'External Link' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`${API}/resources`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setItems(d.data); });
  }, []);

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch(`${API}/resources`, {
      method: 'POST', headers: authHeaders(token), body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.success) { setItems((prev) => [data.data, ...prev]); setForm({ title: '', category: 'Devotional', description: '', externalUrl: '', provider: '', format: 'External Link' }); }
    setSaving(false);
  };

  return (
    <div>
      <h3 className="font-bold text-primary text-base mb-4">Resource Management</h3>

      <div className="card p-5 mb-5">
        <h4 className="text-sm font-bold text-primary mb-3">Add External Resource</h4>
        <form onSubmit={save} className="grid sm:grid-cols-2 gap-3">
          {[
            { label: 'Title', name: 'title', placeholder: 'Resource title' },
            { label: 'Provider', name: 'provider', placeholder: 'e.g. Desiring God' },
            { label: 'External URL', name: 'externalUrl', placeholder: 'https://' },
            { label: 'Description', name: 'description', placeholder: 'Brief description' },
          ].map(({ label, name, placeholder }) => (
            <div key={name}>
              <label className="block text-xs font-semibold text-primary mb-1">{label}</label>
              <input type="text" value={form[name]} onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                placeholder={placeholder} required
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#D97706]/40" />
            </div>
          ))}
          <div>
            <label className="block text-xs font-semibold text-primary mb-1">Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs">
              {['Devotional', 'Study Guide', 'Audio / Video', 'Reading Plan'].map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-primary mb-1">Format</label>
            <select value={form.format} onChange={(e) => setForm({ ...form, format: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs">
              {['External Link', 'PDF', 'Video', 'App Plan'].map((f) => <option key={f}>{f}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2">
            <button type="submit" disabled={saving} className="btn btn-primary text-xs py-2 px-5 disabled:opacity-50">
              {saving ? 'Adding...' : 'Add Resource'}
            </button>
          </div>
        </form>
      </div>

      {items.length === 0 ? (
        <div className="card p-6 text-center text-gray-400 text-sm">No resources added yet.</div>
      ) : (
        <div className="space-y-2">
          {items.map((r) => (
            <div key={r._id} className="card p-4 flex items-center justify-between gap-4">
              <div className="flex-grow min-w-0">
                <p className="text-sm font-semibold text-primary truncate">{r.title}</p>
                <p className="text-xs text-gray-400">{r.provider} · {r.category}</p>
              </div>
              <a href={r.externalUrl} target="_blank" rel="noopener noreferrer"
                className="text-[11px] text-[#D97706] hover:underline shrink-0">Open →</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ── Main Dashboard ── */
const TABS = ['Registrations', 'Students', 'Gallery', 'Resources'];

const AdminDashboard = () => {
  const { user, token, logout } = useAuth();
  const [tab, setTab] = useState('Registrations');

  return (
    <div className="min-h-screen bg-[#FAF9F5]">
      {/* Top bar */}
      <div className="bg-primary text-white py-5">
        <div className="container-custom flex items-center justify-between">
          <div>
            <h2 className="text-white text-lg font-bold">Admin Dashboard</h2>
            <p className="text-white/60 text-xs">Melchizedek Beams Ltd · {user?.email}</p>
          </div>
          <button onClick={logout} className="btn bg-white/10 border border-white/20 text-white text-xs py-2 px-4 hover:bg-white/20">
            Sign Out
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="container-custom flex gap-1 overflow-x-auto py-2">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                tab === t ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-7">
        {tab === 'Registrations' && <RegistrationsTab token={token} />}
        {tab === 'Students'      && <StudentsTab token={token} />}
        {tab === 'Gallery'       && <GalleryTab token={token} />}
        {tab === 'Resources'     && <ResourcesTab token={token} />}
      </div>
    </div>
  );
};

export default AdminDashboard;
