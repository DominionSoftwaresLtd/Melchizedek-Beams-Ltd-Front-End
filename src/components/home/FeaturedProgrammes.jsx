import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const statusStyles = {
  'Open for Enrollment': 'bg-green-100 text-green-700',
  'Applications Open':   'bg-secondary/10 text-secondary-dark',
  'Upcoming':            'bg-accent text-primary',
  'Active':              'bg-primary/10 text-primary',
};

const FeaturedProgrammes = () => {
  const [programmes, setProgrammes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mock = [
      {
        id: 'foundation-beams',
        beamType: 'Foundation Beams',
        title: 'Foundations of Faith',
        duration: '8 Weeks',
        format: 'Online / Hybrid',
        status: 'Open for Enrollment',
        overview: 'Core spiritual discipline training covering prayer, Scripture study, salvation, and basic Christian living.',
      },
      {
        id: 'pillar-beams',
        beamType: 'Pillar Beams',
        title: 'Melchizedek Leadership Cohort',
        duration: '12 Weeks',
        format: 'Cohort-based',
        status: 'Applications Open',
        overview: 'Specialized training designed to equip mentors, cell group leaders, and ministry heads for kingdom impact.',
      },
      {
        id: 'beam-groups',
        beamType: 'Beam Groups',
        title: '1-on-1 & Micro-Group Mentorship',
        duration: 'Ongoing',
        format: 'Peer-to-Peer',
        status: 'Active',
        overview: 'Micro accountability groups of 3–5 people focusing on scripture memory, daily reflection, and prayer watches.',
      },
    ];

    setTimeout(() => {
      setProgrammes(mock);
      setLoading(false);
    }, 300);
  }, []);

  if (loading) {
    return (
      <section className="section-padding bg-background">
        <div className="container-custom text-center">
          <div className="flex justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-secondary animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">

        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
            Cohort Tracks
          </span>
          <h2 className="mb-4">Featured Programmes</h2>
          <p className="text-neutral text-lg">
            Structured discipleship journeys designed to equip you for kingdom impact.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programmes.map((programme) => (
            <div key={programme.id} className="card flex flex-col">
              {/* Teal header stripe */}
              <div className="bg-primary px-6 py-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-secondary text-xs font-bold uppercase tracking-wider">
                    {programme.beamType}
                  </span>
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusStyles[programme.status]}`}>
                    {programme.status}
                  </span>
                </div>
                <h5 className="text-white font-bold leading-snug">{programme.title}</h5>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex gap-4 mb-4 text-xs text-neutral-light">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {programme.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {programme.format}
                  </span>
                </div>

                <p className="text-neutral text-sm leading-relaxed flex-grow mb-5">
                  {programme.overview}
                </p>

                <Link to="/programmes" className="btn btn-teal border border-accent-dark w-full text-sm hover:bg-secondary hover:text-white hover:border-secondary transition-all">
                  View Track Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/programmes" className="btn btn-outline">
            View All Tracks
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProgrammes;
