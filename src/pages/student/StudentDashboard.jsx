import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const Certificate = ({ cert, onClose }) => (
  <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
      {/* Certificate display */}
      <div className="bg-primary px-8 py-6 text-center">
        <p className="text-[#D97706] text-xs font-bold uppercase tracking-widest mb-1">Certificate of Completion</p>
        <h3 className="text-white text-xl font-extrabold">Melchizedek Beams Ltd</h3>
        <p className="text-white/60 text-xs mt-1">Equipping Believers, Beam by Beam</p>
      </div>
      <div className="p-8 text-center border-2 border-dashed border-gray-200 m-4 rounded-xl">
        <p className="text-gray-500 text-sm mb-2">This certifies that</p>
        <p className="text-primary text-2xl font-extrabold mb-2">{cert.studentName}</p>
        <p className="text-gray-500 text-sm mb-1">has successfully completed</p>
        <p className="text-[#D97706] text-lg font-bold mb-1">{cert.programmeName}</p>
        {cert.beamType && <p className="text-primary text-xs font-semibold mb-4">{cert.beamType}</p>}
        <div className="flex justify-center gap-8 text-xs text-gray-400 mt-4 pt-4 border-t border-gray-100">
          <div>
            <p className="font-semibold text-gray-600">Completed</p>
            <p>{cert.completedAt ? new Date(cert.completedAt).toLocaleDateString() : 'N/A'}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Issued By</p>
            <p>{cert.issuedBy}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Issued On</p>
            <p>{cert.issuedAt ? new Date(cert.issuedAt).toLocaleDateString() : 'N/A'}</p>
          </div>
        </div>
      </div>
      <div className="flex gap-3 p-4 pt-0">
        <button onClick={() => window.print()} className="btn btn-primary flex-1 text-sm py-2">Print / Save PDF</button>
        <button onClick={onClose} className="btn btn-outline flex-1 text-sm py-2">Close</button>
      </div>
    </div>
  </div>
);

const ProgressBar = ({ percent }) => (
  <div className="w-full bg-gray-100 rounded-full h-2">
    <div
      className="bg-[#D97706] h-2 rounded-full transition-all duration-700"
      style={{ width: `${Math.min(percent, 100)}%` }}
    />
  </div>
);

const StudentDashboard = () => {
  const { user, token } = useAuth();
  const [profile, setProfile]         = useState(null);
  const [applications, setApplications] = useState([]);
  const [cert, setCert]               = useState(null);
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    Promise.all([
      fetch(`${API}/students/me`, { headers }).then((r) => r.json()),
      fetch(`${API}/registrations`, { headers }).then((r) => r.json()),
    ])
      .then(([profileRes, appRes]) => {
        if (profileRes.success) setProfile(profileRes.data);
        if (appRes.success) setApplications(appRes.data);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const downloadCert = async (prog) => {
    if (!prog.certificateIssued) return;
    try {
      const res = await fetch(`${API}/students/${profile._id}/certificate/${prog.programmeId?._id || prog.programmeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setCert(data.certificate);
    } catch (e) {}
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F5] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F5]">
      {/* Header */}
      <div className="bg-primary text-white py-8">
        <div className="container-custom">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#D97706] flex items-center justify-center text-white font-extrabold text-lg">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-white text-xl font-bold">Welcome, {user?.name?.split(' ')[0]}</h2>
              <p className="text-white/60 text-sm">Student Dashboard · Melchizedek Beams</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid lg:grid-cols-3 gap-6">

          {/* ── My Programmes ── */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-base font-bold text-primary">My Enrolled Programmes</h3>

            {profile?.progress?.length ? (
              profile.progress.map((prog, i) => (
                <div key={i} className="card p-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <p className="text-[10px] font-bold text-[#D97706] uppercase tracking-wider mb-0.5">
                        {prog.programmeId?.beamType || 'Programme'}
                      </p>
                      <h4 className="text-sm font-bold text-primary leading-snug">
                        {prog.programmeId?.title || prog.programmeName}
                      </h4>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Enrolled {new Date(prog.enrolledAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 ${
                      prog.percentComplete >= 100 ? 'bg-green-100 text-green-700' : 'bg-[#E6F4F1] text-primary'
                    }`}>
                      {prog.percentComplete >= 100 ? 'Completed' : `${prog.percentComplete || 0}%`}
                    </span>
                  </div>

                  <ProgressBar percent={prog.percentComplete || 0} />
                  <p className="text-xs text-gray-400 mt-1.5">
                    {prog.completedModules?.length || 0} of {prog.totalModules || '?'} modules complete
                  </p>

                  {/* Completed modules */}
                  {prog.completedModules?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {prog.completedModules.map((m) => (
                        <span key={m} className="bg-green-50 text-green-700 text-[10px] font-medium px-2 py-0.5 rounded-full">
                          ✓ {m}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Certificate */}
                  {prog.certificateIssued && (
                    <button
                      onClick={() => downloadCert(prog)}
                      className="btn btn-primary text-xs py-2 px-4 mt-3"
                    >
                      <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download Certificate
                    </button>
                  )}
                </div>
              ))
            ) : (
              <div className="card p-8 text-center">
                <div className="w-12 h-12 bg-[#E6F4F1] rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-primary mb-1">No programmes yet</p>
                <p className="text-gray-400 text-xs mb-4">Your enrolled programmes will appear here once approved by admin.</p>
                <Link to="/programmes" className="btn btn-primary text-xs py-2 px-5">Browse Programmes</Link>
              </div>
            )}
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-4">
            {/* Profile card */}
            <div className="card p-5">
              <h4 className="text-sm font-bold text-primary mb-3">My Profile</h4>
              <div className="space-y-2 text-xs text-gray-600">
                <p><span className="font-semibold text-gray-800">Name:</span> {user?.name}</p>
                <p><span className="font-semibold text-gray-800">Email:</span> {user?.email}</p>
                <p><span className="font-semibold text-gray-800">Role:</span> <span className="capitalize">{user?.role}</span></p>
              </div>
            </div>

            {/* Applications */}
            <div className="card p-5">
              <h4 className="text-sm font-bold text-primary mb-3">My Applications</h4>
              {applications.length ? (
                <div className="space-y-2">
                  {applications.map((app) => (
                    <div key={app._id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <p className="text-xs text-gray-700 font-medium truncate pr-2">{app.programmeName}</p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                        app.status === 'Approved' ? 'bg-green-100 text-green-700' :
                        app.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                        'bg-amber-50 text-amber-700'
                      }`}>{app.status}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400">No applications yet.</p>
              )}
            </div>

            {/* Quick link */}
            <Link to="/programmes" className="card p-4 flex items-center gap-3 hover:border-[#D97706]/40 transition-colors group">
              <div className="w-9 h-9 bg-[#E6F4F1] rounded-lg flex items-center justify-center group-hover:bg-[#D97706] transition-colors">
                <svg className="w-4 h-4 text-primary group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-primary">Enroll in Another Programme</p>
                <p className="text-[11px] text-gray-400">Browse all 6 tracks</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {cert && <Certificate cert={cert} onClose={() => setCert(null)} />}
    </div>
  );
};

export default StudentDashboard;
