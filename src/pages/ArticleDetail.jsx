import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const fmt = (d) => d ? new Date(d).toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' }) : '';

const ArticleDetail = () => {
  const { slug }              = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    fetch(`${API}/articles/${slug}`)
      .then(r => r.json())
      .then(d => {
        if (d.success) setArticle(d.data);
        else setError('Article not found.');
      })
      .catch(() => setError('Could not load article.'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen bg-[#FAF9F5] flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (error || !article) return (
    <div className="min-h-screen bg-[#FAF9F5] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-gray-500 mb-4">{error || 'Article not found.'}</p>
        <Link to="/news" className="btn btn-primary text-sm px-6 py-2">← Back to News</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF9F5]">
      {/* Hero */}
      <section className="bg-primary py-10">
        <div className="container-custom max-w-3xl mx-auto px-4">
          <Link to="/news" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-xs mb-4 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to News
          </Link>

          <div className="flex gap-2 mb-3 flex-wrap">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              article.type==='Event' ? 'bg-purple-200 text-purple-800' :
              article.type==='Devotional' ? 'bg-orange-200 text-orange-800' : 'bg-[#E6F4F1] text-primary'
            }`}>{article.type || 'Article'}</span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/10 text-white/70">
              {article.category}
            </span>
          </div>

          <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-white/60">
            <span className="font-medium text-white/80">{article.author}</span>
            <span>{fmt(article.createdAt)}</span>
            {article.readTime && <span>{article.readTime} read</span>}
            {article.type==='Event' && article.eventDate && (
              <span className="text-purple-300 font-semibold">📅 {fmt(article.eventDate)}{article.eventVenue && ` · ${article.eventVenue}`}</span>
            )}
          </div>
        </div>
      </section>

      {/* Featured image */}
      {article.featuredImage && !article.featuredImage.includes('default') && (
        <div className="container-custom max-w-3xl mx-auto px-4 -mt-6">
          <div className="rounded-xl overflow-hidden shadow-lg aspect-[16/9] bg-gray-100">
            <img src={article.featuredImage} alt={article.title} className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      {/* Content */}
      <article className="container-custom max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
          {/* Summary */}
          <p className="text-primary font-semibold text-sm border-l-4 border-[#D97706] pl-4 mb-6 leading-relaxed">
            {article.summary}
          </p>

          {/* Body */}
          <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
            {article.content}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <Link to="/news" className="inline-flex items-center gap-1.5 text-primary hover:text-[#D97706] text-sm font-semibold transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            All Articles
          </Link>
          <Link to="/programmes" className="inline-flex items-center gap-1.5 text-[#D97706] hover:text-[#B45309] text-sm font-semibold transition-colors">
            Explore Programmes
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </article>
    </div>
  );
};

export default ArticleDetail;
