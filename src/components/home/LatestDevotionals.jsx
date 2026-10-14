import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const categoryColors = {
  'Devotionals':          'bg-orange-100 text-orange-700',
  'Discipleship Insights':'bg-accent text-primary',
};

const LatestDevotionals = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    setArticles([
      {
        id: '1',
        title: 'The Heart of Discipleship: Following Christ Daily',
        slug: 'heart-of-discipleship-following-christ-daily',
        category: 'Devotionals',
        author: 'Rev. Samuel Kariuki',
        publishedDate: '2026-10-10',
        readTime: '5 min',
        summary: 'Discover what it truly means to be a disciple of Jesus in everyday life, beyond Sunday services and church activities.',
      },
      {
        id: '2',
        title: 'Prayer: The Foundation of Kingdom Impact',
        slug: 'prayer-foundation-kingdom-impact',
        category: 'Devotionals',
        author: 'Mama Esther Njeri',
        publishedDate: '2026-10-08',
        readTime: '6 min',
        summary: 'Exploring how prayer is not just a spiritual discipline but the very foundation of all effective ministry and kingdom work.',
      },
      {
        id: '3',
        title: 'Walking in Holiness in a Compromising World',
        slug: 'walking-holiness-compromising-world',
        category: 'Discipleship Insights',
        author: 'Sister Grace Wanjiru',
        publishedDate: '2026-10-05',
        readTime: '7 min',
        summary: 'Practical guidance on maintaining biblical standards and living a set-apart life in a culture that increasingly rejects God\'s ways.',
      },
    ]);
  }, []);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">

        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
            From the Word
          </span>
          <h2 className="mb-4">Latest Devotionals & Articles</h2>
          <p className="text-neutral text-lg">
            Fresh insights from God's Word to encourage and challenge your walk with Christ.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link key={article.id} to={`/news/${article.slug}`} className="group">
              <div className="card h-full flex flex-col p-6 group-hover:border-secondary/40 transition-colors">
                <div className="mb-3">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[article.category] || 'bg-accent text-primary'}`}>
                    {article.category}
                  </span>
                </div>

                <h5 className="mb-3 line-clamp-2 group-hover:text-secondary transition-colors">
                  {article.title}
                </h5>

                <p className="text-neutral text-sm mb-4 line-clamp-3 flex-grow leading-relaxed">
                  {article.summary}
                </p>

                <div className="flex items-center justify-between text-xs text-neutral-light mt-auto pt-4 border-t border-surface-border">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-neutral">{article.author}</span>
                    <span>·</span>
                    <span>{article.readTime} read</span>
                  </div>
                  <span>{formatDate(article.publishedDate)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-secondary hover:text-secondary-dark font-semibold group"
          >
            View All Articles
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestDevotionals;
