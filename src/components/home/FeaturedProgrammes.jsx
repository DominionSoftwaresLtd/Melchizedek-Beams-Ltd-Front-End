import { Link } from 'react-router-dom';

const statusStyles = {
  'Open for Enrollment': 'bg-green-100 text-green-700',
  'Applications Open':   'bg-amber-50 text-amber-700',
  'Upcoming':            'bg-[#E6F4F1] text-primary',
  'Active':              'bg-primary/10 text-primary',
};

const featured = [
  { id: 1, beamType: 'Foundation Beams', title: 'Foundations of Faith', duration: '8 Weeks', format: 'Online / Hybrid', status: 'Open for Enrollment', overview: 'Core spiritual discipline training covering prayer, Scripture study, salvation, and basic Christian living.' },
  { id: 2, beamType: 'Pillar Beams', title: 'Melchizedek Leadership Cohort', duration: '12 Weeks', format: 'Cohort-based', status: 'Applications Open', overview: 'Specialized training to equip mentors, cell group leaders, and ministry heads for kingdom impact.' },
  { id: 3, beamType: 'Beam Groups', title: '1-on-1 & Micro-Group Mentorship', duration: 'Ongoing', format: 'Peer-to-Peer', status: 'Active', overview: 'Micro accountability groups of 3–5 people for scripture memory, daily reflection, and prayer watches.' },
];

const FeaturedProgrammes = () => (
  <section className="py-12 bg-[#FAF9F5]">
    <div className="container-custom">
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="inline-block bg-[#E6F4F1] text-primary text-[10px] font-bold px-3 py-1 rounded-full mb-2 uppercase tracking-wider">Cohort Tracks</span>
        <h2 className="text-2xl md:text-3xl mb-2">Featured Programmes</h2>
        <p className="text-gray-500 text-sm">Structured discipleship journeys designed to equip you for kingdom impact.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {featured.map((p) => (
          <div key={p.id} className="card flex flex-col">
            <div className="bg-primary px-4 py-3.5">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[#D97706] text-[10px] font-bold uppercase tracking-wider">{p.beamType}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusStyles[p.status]}`}>{p.status}</span>
              </div>
              <h5 className="text-white text-sm font-bold leading-snug">{p.title}</h5>
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <div className="flex gap-3 mb-2.5 text-[11px] text-gray-400">
                <span>⏱ {p.duration}</span><span>💻 {p.format}</span>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed flex-grow mb-4">{p.overview}</p>
              <Link to="/programmes" className="btn btn-teal border border-[#C7E8E2] w-full text-xs py-2 hover:bg-[#D97706] hover:text-white hover:border-[#D97706] transition-all">
                View Track Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link to="/programmes" className="btn btn-outline text-sm py-2 px-6">View All 6 Tracks</Link>
      </div>
    </div>
  </section>
);

export default FeaturedProgrammes;
