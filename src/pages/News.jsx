import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const TYPE_COLORS = {
  Event:      'bg-purple-100 text-purple-700',
  Devotional: 'bg-orange-100 text-orange-700',
  Article:    'bg-[#E6F4F1] text-primary',
};
const CAT_COLORS = {
  Devotionals:           'bg-orange-100 text-orange-700',
  Events:                'bg-purple-100 text-purple-700',
  Announcements:         'bg-blue-50 text-blue-700',
  'Discipleship Insights':'bg-[#E6F4F1] text-primary',
  'Study Notes':          'bg-gray-100 text-gray-600',
};

const fmt = (d) => new Date(d).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' });

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [filter,   setFilter]   = useState('All');

  useEffect(() => {
    fetch(`${API}/articles?published=true`)
      .then(r => r.json())
      .then(d => { if (d.success) setArticles(d.data); })
      .finally(() => setLoading(false));
  }, []);

  const tabs = ['All', 'Article', 'Devotional', 'Event'];
  const shown = filter === 'All' ? articles : articles.filter(a => (a.type || 'Article') === filter);

  return (
    <div className="min-h-screen bg-[#FAF9F5]">

      {/* Hero */}
      <section className="bg-primary py-12 text-white">
        <div className="container-custom text-center max-w-2xl mx-auto">
          <span className="inline-block bg-[#D97706]/20 text-[#D97706] text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">From the Word</span>
          <h1 className="text-white text-3xl md:text-4xl mb-3">News, Events & Devotionals</h1>
          <p className="text-white/70 text-sm">
            Fresh insights, upcoming events and devotional messages from the Melchizedek Beams community.
          </p>
        </div>
      </section>

      {/* Filter tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="container-custom px-4 py-3 flex gap-2 overflow-x-auto">
          {tabs.map(t => (
            <button key={t} onClick={() => setFilter(t)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition-colors ${
                filter === t ? 'bg-primary text-white border-primary' : 'border-gray-200 text-gray-500 hover:border-primary hover:text-primary'
              }`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <section className="py-10">
        <div className="container-custom px-4">
          {loading ? (
            <div className="py-20 text-center">
              <div className="w-7 h-7 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : shown.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-sm">No posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {shown.map(a => (
                <Link key={a._id} to={`/news/${a.slug}`} className="group">
                  <div className="card h-full flex flex-col hover:-translate-y-1 transition-transform duration-300">
                    {/* Image */}
                    {a.featuredImage && !a.featuredImage.includes('default') && (
                      <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                        <img src={a.featuredImage} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    )}
                    <div className="p-4 flex flex-col flex-grow">
                      {/* Type + category */}
                      <div className="flex gap-2 mb-2.5 flex-wrap">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${TYPE_COLORS[a.type||'Article']}`}>
                          {a.type || 'Article'}
                        </span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${CAT_COLORS[a.category]||'bg-gray-100 text-gray-500'}`}>
                          {a.category}
                        </span>
                      </div>

                      {/* Event date */}
                      {a.type === 'Event' && a.eventDate && (
                        <div className="flex items-center gap-1.5 mb-2 text-purple-700 text-xs font-semibold">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {fmt(a.eventDate)}{a.eventVenue && ` · ${a.eventVenue}`}
                        </div>
                      )}

                      <h5 className="text-sm font-bold leading-snug mb-2 line-clamp-2 group-hover:text-[#D97706] transition-colors">
                        {a.title}
                      </h5>
                      <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 flex-grow mb-3">{a.summary}</p>

                      <div className="flex items-center justify-between text-[11px] text-gray-400 pt-3 border-t border-gray-100">
                        <span className="font-medium text-gray-600 truncate">{a.author}</span>
                        <span>{fmt(a.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default News;
