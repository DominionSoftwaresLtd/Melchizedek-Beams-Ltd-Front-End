import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const STATIC_TRACKS = [
  {
    id: 'foundation-beams',
    beamType: 'Foundation Beams',
    title: 'Foundations of Faith',
    duration: '8 Weeks',
    format: 'Online / Hybrid',
    status: 'Open for Enrollment',
    statusKey: 'open',
    description: 'Core spiritual discipline training covering prayer, Scripture study, salvation, and basic Christian living.',
    topics: ['Prayer & Devotion', 'Understanding Salvation', 'Scripture Study Methods', 'Christian Living'],
    ctaLabel: 'Enroll Now',
  },
  {
    id: 'pillar-beams',
    beamType: 'Pillar Beams',
    title: 'Melchizedek Leadership Cohort',
    duration: '12 Weeks',
    format: 'Cohort-based',
    status: 'Applications Open',
    statusKey: 'applications',
    description: 'Specialized training to equip mentors, cell group leaders, and ministry heads for kingdom impact.',
    topics: ['Servant Leadership', 'Cell Group Facilitation', 'Conflict Resolution', 'Kingdom Vision'],
    ctaLabel: 'Apply Now',
  },
  {
    id: 'structural-beams',
    beamType: 'Structural Beams',
    title: 'Scripture Exegesis Intensive',
    duration: '6 Weeks',
    format: 'Group Study',
    status: 'Upcoming',
    statusKey: 'upcoming',
    description: 'Deep-dive study on biblical interpretation, hermeneutics, and systematic theology.',
    topics: ['Hermeneutics', 'Biblical Context', 'Systematic Theology', 'Expository Study'],
    ctaLabel: 'Join Waitlist',
  },
  {
    id: 'beam-groups',
    beamType: 'Beam Groups',
    title: '1-on-1 & Micro-Group Mentorship',
    duration: 'Ongoing',
    format: 'Peer-to-Peer',
    status: 'Active',
    statusKey: 'active',
    description: 'Micro accountability groups of 3–5 people for scripture memory, daily reflection, and prayer watches.',
    topics: ['Scripture Memory', 'Daily Reflection', 'Prayer Watches', 'Accountability'],
    ctaLabel: 'Find a Group',
  },
  {
    id: 'apologetics',
    beamType: 'Structural Beams',
    title: 'Apologetics & Christian Defence',
    duration: '8 Weeks',
    format: 'Online / In-person',
    status: 'Open for Enrollment',
    statusKey: 'open',
    description: 'Equipping believers to defend the faith intelligently and engage culture with Gospel truth.',
    topics: ['What Is Apologetics?', 'Evidence for God', 'Responding to Objections', 'Cultural Engagement'],
    ctaLabel: 'Enroll Now',
  },
  {
    id: 'hermeneutics',
    beamType: 'Structural Beams',
    title: 'Biblical Hermeneutics Masterclass',
    duration: '10 Weeks',
    format: 'Cohort-based',
    status: 'Applications Open',
    statusKey: 'applications',
    description: 'Advanced biblical interpretation for teachers and preachers — grammatical, historical, and canonical methods.',
    topics: ['History of Interpretation', 'Grammatical Analysis', 'Historical Context', 'Preaching Application'],
    ctaLabel: 'Apply Now',
  },
];

const statusStyles = {
  open:         'bg-green-100 text-green-700',
  applications: 'bg-amber-50 text-amber-700',
  upcoming:     'bg-[#E6F4F1] text-[#0F383E]',
  active:       'bg-[#0F383E]/10 text-[#0F383E]',
};

/* ── Enroll Modal ── */
const EnrollModal = ({ track, programmeId, onClose }) => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    statementOfIntent: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch(`${API}/registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          programmeId: programmeId || track.id,
          programmeName: track.title,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setDone(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-primary px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-[#D97706] text-xs font-bold uppercase tracking-wider">{track.beamType}</p>
            <h4 className="text-white text-base font-bold leading-tight">{track.title}</h4>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white p-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {done ? (
            <div className="text-center py-4">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-primary mb-2">Application Submitted!</h4>
              <p className="text-gray-500 text-sm mb-4">
                Thank you! The admin will review your application and contact you. Once approved, your account will be created.
              </p>
              <button onClick={onClose} className="btn btn-primary text-sm px-6 py-2">Close</button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <p className="text-gray-500 text-xs">All fields are required. Your application will be reviewed by admin before your account is created.</p>

              {error && <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 text-red-700 text-sm">{error}</div>}

              {[
                { label: 'Full Name', name: 'fullName', type: 'text', placeholder: 'Your full name' },
                { label: 'Email Address', name: 'email', type: 'email', placeholder: 'your@email.com' },
                { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: '+254 7XX XXX XXX' },
              ].map(({ label, name, type, placeholder }) => (
                <div key={name}>
                  <label className="block text-xs font-semibold text-primary mb-1">{label}</label>
                  <input
                    type={type}
                    name={name}
                    value={form[name]}
                    onChange={handle}
                    placeholder={placeholder}
                    required
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706]/40 focus:border-[#D97706]"
                  />
                </div>
              ))}

              <div>
                <label className="block text-xs font-semibold text-primary mb-1">Why do you want to join this programme?</label>
                <textarea
                  name="statementOfIntent"
                  value={form.statementOfIntent}
                  onChange={handle}
                  rows={3}
                  required
                  placeholder="Tell us briefly about your spiritual journey and what you hope to gain..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706]/40 focus:border-[#D97706] resize-none"
                />
              </div>

              <button type="submit" disabled={submitting} className="btn btn-primary w-full text-sm py-2.5 disabled:opacity-50">
                {submitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

/* ── Track Card ── */
const TrackCard = ({ track, dbProgrammes, onEnroll }) => {
  const dbMatch = dbProgrammes.find((p) =>
    p.title.toLowerCase().includes(track.title.split(' ')[0].toLowerCase())
  );

  return (
    <div className="card flex flex-col transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Header */}
      <div className="bg-primary px-4 py-3.5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[#D97706] text-[10px] font-bold uppercase tracking-wider">{track.beamType}</span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusStyles[track.statusKey]}`}>
            {track.status}
          </span>
        </div>
        <h4 className="text-white text-sm font-bold leading-snug">{track.title}</h4>
        <div className="flex gap-3 mt-2 text-[11px] text-white/60">
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3 text-[#D97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {track.duration}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3 text-[#D97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {track.format}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-gray-600 text-xs leading-relaxed mb-3">{track.description}</p>

        <div className="mb-4 flex-grow">
          <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1.5">What You'll Cover</p>
          <div className="flex flex-wrap gap-1">
            {track.topics.map((t) => (
              <span key={t} className="bg-[#E6F4F1] text-primary text-[10px] font-medium px-2 py-0.5 rounded-full">{t}</span>
            ))}
          </div>
        </div>

        <button
          onClick={() => onEnroll(track, dbMatch?._id)}
          className="btn btn-primary w-full text-xs py-2.5 mt-auto justify-center"
        >
          {track.ctaLabel}
          <svg className="w-3.5 h-3.5 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

/* ── Page ── */
const Programmes = () => {
  const [dbProgrammes, setDbProgrammes] = useState([]);
  const [enrollTarget, setEnrollTarget] = useState(null); // { track, programmeId }

  useEffect(() => {
    fetch(`${API}/programmes`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setDbProgrammes(d.data); })
      .catch(() => {});
  }, []);

  const openEnroll = (track, programmeId) => setEnrollTarget({ track, programmeId });
  const closeEnroll = () => setEnrollTarget(null);

  return (
    <div className="min-h-screen bg-[#FAF9F5]">

      {/* ── Hero ── */}
      <section className="bg-primary text-white py-12">
        <div className="container-custom text-center max-w-2xl mx-auto">
          <span className="inline-block bg-[#D97706]/20 text-[#D97706] text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
            Discipleship Tracks
          </span>
          <h1 className="text-white text-3xl md:text-4xl mb-3">Structured Growth, Beam by Beam</h1>
          <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-xl mx-auto">
            Every beam has a purpose. Our programmes strengthen specific areas of your walk
            with God and prepare you for greater kingdom impact.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3">
            <a href="#tracks" className="btn btn-primary text-sm py-2.5 px-5 w-full sm:w-auto justify-center">Browse Tracks</a>
            <Link to="/about" className="btn bg-white/10 border border-white/20 text-white hover:bg-white/20 text-sm py-2.5 px-5 w-full sm:w-auto justify-center">Learn About Us</Link>
          </div>
        </div>
      </section>

      {/* ── Beam type strip ── */}
      <section className="bg-[#E6F4F1] border-b border-gray-200">
        <div className="container-custom py-5 px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { label: 'Foundation Beams', sub: 'Core faith training' },
              { label: 'Pillar Beams', sub: 'Leadership & ministry' },
              { label: 'Structural Beams', sub: 'Word & theology' },
              { label: 'Beam Groups', sub: 'Mentorship & accountability' },
            ].map((item) => (
              <div key={item.label} className="py-1">
                <p className="text-primary font-bold text-xs">{item.label}</p>
                <p className="text-gray-500 text-[11px] mt-0.5">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3-column track cards ── */}
      <section id="tracks" className="py-12">
        <div className="container-custom">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-2xl md:text-3xl mb-2">Our Cohort Tracks</h2>
            <p className="text-gray-600 text-sm">
              Six structured tracks. Choose the beam that fits your season of growth.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {STATIC_TRACKS.map((track) => (
              <TrackCard
                key={track.id}
                track={track}
                dbProgrammes={dbProgrammes}
                onEnroll={openEnroll}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="container-custom">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-2xl md:text-3xl mb-2">How It Works</h2>
            <p className="text-gray-600 text-sm">From application to graduation, every step is intentional.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Choose a Track', desc: 'Browse the six tracks and pick the one that matches your current season of growth.' },
              { step: '02', title: 'Apply or Enroll', desc: 'Complete a short enrollment form. The admin reviews and approves your application.' },
              { step: '03', title: 'Account Created', desc: 'Once approved, your student account is created and you receive login credentials.' },
              { step: '04', title: 'Grow & Multiply', desc: 'Complete the track, track your progress, and download your certificate upon graduation.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-11 h-11 rounded-full bg-[#E6F4F1] border-2 border-[#D97706]/30 flex items-center justify-center mx-auto mb-3">
                  <span className="text-[#D97706] font-bold text-sm">{item.step}</span>
                </div>
                <h5 className="text-sm font-bold mb-1.5">{item.title}</h5>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-12 bg-primary">
        <div className="container-custom text-center max-w-xl mx-auto">
          <h2 className="text-white text-2xl mb-3">Not Sure Where to Start?</h2>
          <p className="text-white/70 text-sm mb-6">Reach out and a programme coordinator will help you find the right track.</p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3">
            <Link to="/about" className="btn btn-primary text-sm py-2.5 px-5 w-full sm:w-auto justify-center">Contact Us</Link>
            <Link to="/resources" className="btn bg-white/10 border border-white/20 text-white hover:bg-white/20 text-sm py-2.5 px-5 w-full sm:w-auto justify-center">Browse Resources</Link>
          </div>
        </div>
      </section>

      {/* ── Enroll Modal ── */}
      {enrollTarget && (
        <EnrollModal
          track={enrollTarget.track}
          programmeId={enrollTarget.programmeId}
          onClose={closeEnroll}
        />
      )}
    </div>
  );
};

export default Programmes;
