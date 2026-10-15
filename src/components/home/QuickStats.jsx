import { Link } from 'react-router-dom';

const stats = [
  { eyebrow: 'DISCIPLES TRAINED', value: 'Our Programmes', sub: 'Structured cohort tracks', link: '/programmes' },
  { eyebrow: 'WORD & STUDY',      value: 'Scripture Resources', sub: 'Curated tools & guides', link: '/resources' },
  { eyebrow: 'COMMUNITY',         value: 'Beam Groups', sub: 'Micro mentorship circles', link: '/programmes' },
  { eyebrow: 'LATEST',            value: 'News & Devotionals', sub: 'Fresh insights from the Word', link: '/news' },
];

const QuickStats = () => (
  <section className="bg-white border-b border-gray-200 shadow-sm">
    <div className="container-custom">
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">
        {stats.map((s) => (
          <Link key={s.eyebrow} to={s.link} className="px-5 py-4 hover:bg-[#FAF9F5] transition-colors group">
            <p className="text-[10px] font-bold text-[#D97706] uppercase tracking-widest mb-0.5">{s.eyebrow}</p>
            <p className="text-primary font-bold text-sm leading-tight group-hover:text-[#D97706] transition-colors">{s.value}</p>
            <p className="text-gray-400 text-[11px] mt-0.5">{s.sub}</p>
            <p className="text-[#D97706] text-[11px] font-semibold mt-1.5 group-hover:underline">Open →</p>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default QuickStats;
