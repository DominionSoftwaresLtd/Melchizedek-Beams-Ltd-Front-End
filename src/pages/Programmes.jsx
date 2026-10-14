import { Link } from 'react-router-dom';

const tracks = [
  {
    id: 'foundation-beams',
    beamType: 'Foundation Beams',
    beamIcon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: 'Foundations of Faith',
    duration: '8 Weeks',
    format: 'Online / Hybrid',
    status: 'Open for Enrollment',
    statusKey: 'open',
    description:
      'Core spiritual discipline training covering prayer, Scripture study, salvation, and basic Christian living. Ideal for new believers and those seeking to strengthen their foundational walk with Christ.',
    topics: ['Prayer & Devotion', 'Understanding Salvation', 'Scripture Study Methods', 'Christian Living'],
    ctaLabel: 'Enroll Now',
    ctaLink: '/programmes#enroll-foundations',
  },
  {
    id: 'pillar-beams',
    beamType: 'Pillar Beams',
    beamIcon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Melchizedek Leadership Cohort',
    duration: '12 Weeks',
    format: 'Cohort-based',
    status: 'Applications Open',
    statusKey: 'applications',
    description:
      'Specialized training designed to equip mentors, cell group leaders, and ministry heads for kingdom impact. Combines practical leadership skills with deep spiritual formation.',
    topics: ['Servant Leadership', 'Cell Group Facilitation', 'Conflict Resolution', 'Kingdom Vision'],
    ctaLabel: 'Apply Now',
    ctaLink: '/programmes#apply-leadership',
  },
  {
    id: 'structural-beams',
    beamType: 'Structural Beams',
    beamIcon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: 'Scripture Exegesis Intensive',
    duration: '6 Weeks',
    format: 'Group Study',
    status: 'Upcoming',
    statusKey: 'upcoming',
    description:
      'Deep-dive study focused on biblical interpretation, hermeneutics, and systematic theology. Designed for believers who want to handle the Word of God with precision and confidence.',
    topics: ['Hermeneutics', 'Biblical Context & Culture', 'Systematic Theology', 'Expository Study'],
    ctaLabel: 'Join Waitlist',
    ctaLink: '/programmes#waitlist-exegesis',
  },
  {
    id: 'beam-groups',
    beamType: 'Beam Groups',
    beamIcon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: '1-on-1 & Micro-Group Mentorship',
    duration: 'Ongoing',
    format: 'Peer-to-Peer',
    status: 'Active',
    statusKey: 'active',
    description:
      'Micro accountability groups of 3–5 people focusing on scripture memory, daily reflection, and prayer watches. Join or start a Beam Group in your area or online.',
    topics: ['Scripture Memory', 'Daily Reflection', 'Prayer Watches', 'Mutual Accountability'],
    ctaLabel: 'Find a Group',
    ctaLink: '/programmes#find-group',
  },
];

const statusStyles = {
  open: 'status-open',
  applications: 'status-applications',
  upcoming: 'status-upcoming',
  active: 'status-active',
};

const TrackCard = ({ track }) => (
  <div className="card flex flex-col">
    {/* Card Header */}
    <div className="bg-primary px-6 py-5">
      <div className="flex items-center justify-between mb-3">
        {/* Beam type badge */}
        <span className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-semibold px-3 py-1 rounded-full">
          <span className="text-secondary">{track.beamIcon}</span>
          {track.beamType}
        </span>
        {/* Status badge */}
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${statusStyles[track.statusKey]}`}>
          {track.status}
        </span>
      </div>
      <h3 className="text-white text-xl font-bold leading-snug">{track.title}</h3>

      {/* Meta row */}
      <div className="flex flex-wrap gap-4 mt-3 text-sm text-white/70">
        <span className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {track.duration}
        </span>
        <span className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {track.format}
        </span>
      </div>
    </div>

    {/* Card Body */}
    <div className="p-6 flex flex-col flex-grow">
      <p className="text-neutral text-sm leading-relaxed mb-5">{track.description}</p>

      {/* Topics */}
      <div className="mb-6 flex-grow">
        <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">What You'll Cover</p>
        <div className="flex flex-wrap gap-2">
          {track.topics.map((topic) => (
            <span
              key={topic}
              className="bg-accent text-primary text-xs font-medium px-3 py-1 rounded-full"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <a
        href={track.ctaLink}
        className="btn btn-primary w-full text-sm mt-auto"
      >
        {track.ctaLabel}
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
    </div>
  </div>
);

const Programmes = () => {
  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <section className="bg-primary text-white py-20">
        <div className="container-custom text-center max-w-3xl mx-auto">
          {/* Eyebrow */}
          <span className="inline-block bg-secondary/20 text-secondary text-sm font-semibold px-4 py-1 rounded-full mb-4">
            Discipleship Tracks
          </span>
          <h1 className="text-white mb-4">Structured Growth, Beam by Beam</h1>
          <p className="text-white/70 text-lg leading-relaxed">
            Every beam has a purpose. Our programmes are designed as load-bearing structures—
            each one strengthening a specific area of your walk with God and preparing you for
            greater kingdom impact.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="#tracks" className="btn btn-primary">Browse Tracks</a>
            <Link to="/about" className="btn btn-teal border border-white/20">Learn About Us</Link>
          </div>
        </div>
      </section>

      {/* ── Beam Metaphor Banner ── */}
      <section className="bg-accent border-b border-surface-border">
        <div className="container-custom py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: 'Foundation Beams', sub: 'Core faith training' },
              { label: 'Pillar Beams', sub: 'Leadership & ministry' },
              { label: 'Structural Beams', sub: 'Word & theology' },
              { label: 'Beam Groups', sub: 'Mentorship & accountability' },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-primary font-bold text-sm">{item.label}</p>
                <p className="text-neutral-light text-xs mt-0.5">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Track Cards ── */}
      <section id="tracks" className="section-padding">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="mb-3">Our Cohort Tracks</h2>
            <p className="text-neutral text-lg">
              Choose the beam that fits your current season of growth. All tracks run in cohorts
              so you grow alongside a community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {tracks.map((track) => (
              <TrackCard key={track.id} track={track} />
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="section-padding bg-white border-t border-surface-border">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="mb-3">How It Works</h2>
            <p className="text-neutral text-lg">
              From application to graduation, every step is intentional.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Choose a Track', desc: 'Browse the four beam types and pick the one that matches your current season of growth.' },
              { step: '02', title: 'Apply or Enroll', desc: 'Complete a short application or enrollment form. Some cohorts have limited spaces.' },
              { step: '03', title: 'Join the Cohort', desc: 'Connect with your cohort group, meet your facilitator, and receive your materials.' },
              { step: '04', title: 'Grow & Multiply', desc: 'Complete the track, be assessed, and go on to disciple others in what you\'ve learned.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-accent border-2 border-secondary/30 flex items-center justify-center mx-auto mb-4">
                  <span className="text-secondary font-bold text-lg">{item.step}</span>
                </div>
                <h5 className="mb-2">{item.title}</h5>
                <p className="text-neutral text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="section-padding bg-primary">
        <div className="container-custom text-center max-w-2xl mx-auto">
          <h2 className="text-white mb-4">Not Sure Where to Start?</h2>
          <p className="text-white/70 text-lg mb-8">
            Reach out and one of our programme coordinators will help you find the right track.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/about" className="btn btn-primary">Contact Us</Link>
            <Link to="/resources" className="btn btn-teal border border-white/20">Browse Resources</Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Programmes;
