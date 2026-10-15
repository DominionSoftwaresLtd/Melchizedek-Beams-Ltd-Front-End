import { Link } from 'react-router-dom';

const articles = [
  { id: '1', title: 'The Heart of Discipleship: Following Christ Daily', slug: 'heart-of-discipleship', category: 'Devotionals', author: 'Rev. Samuel Kariuki', publishedDate: '2026-10-10', readTime: '5 min', summary: 'Discover what it truly means to be a disciple of Jesus in everyday life, beyond Sunday services and church activities.' },
  { id: '2', title: 'Prayer: The Foundation of Kingdom Impact', slug: 'prayer-foundation-kingdom-impact', category: 'Devotionals', author: 'Mama Esther Njeri', publishedDate: '2026-10-08', readTime: '6 min', summary: 'How prayer is not just a spiritual discipline but the very foundation of all effective ministry.' },
  { id: '3', title: 'Walking in Holiness in a Compromising World', slug: 'walking-holiness', category: 'Discipleship Insights', author: 'Sister Grace Wanjiru', publishedDate: '2026-10-05', readTime: '7 min', summary: 'Practical guidance on maintaining biblical standards and living a set-apart life.' },
];

const catColors = {
  'Devotionals':           'bg-orange-100 text-orange-700',
  'Discipleship Insights': 'bg-[#E6F4F1] text-primary',
};

const fmt = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const LatestDevotionals = () => (
  <section className="py-12 bg-white">
    <div className="container-custom">
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="inline-block bg-[#E6F4F1] text-primary text-[10px] font-bold px-3 py-1 rounded-full mb-2 uppercase tracking-wider">From the Word</span>
        <h2 className="text-2xl md:text-3xl mb-2">Latest Devotionals & Articles</h2>
        <p className="text-gray-500 text-sm">Fresh insights to encourage and challenge your walk with Christ.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {articles.map((a) => (
          <Link key={a.id} to={`/news/${a.slug}`} className="group">
            <div className="card h-full flex flex-col p-5 group-hover:border-[#D97706]/40 transition-colors">
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold mb-2.5 ${catColors[a.category] || 'bg-[#E6F4F1] text-primary'}`}>
                {a.category}
              </span>
              <h5 className="text-sm font-bold mb-2 line-clamp-2 group-hover:text-[#D97706] transition-colors leading-snug">{a.title}</h5>
              <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 flex-grow mb-3">{a.summary}</p>
              <div className="flex items-center justify-between text-[11px] text-gray-400 pt-3 border-t border-gray-100">
                <span className="font-medium text-gray-600 truncate">{a.author}</span>
                <span>{fmt(a.publishedDate)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-6">
        <Link to="/news" className="inline-flex items-center gap-1.5 text-[#D97706] hover:text-[#B45309] font-semibold text-sm group">
          View All Articles
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  </section>
);

export default LatestDevotionals;
