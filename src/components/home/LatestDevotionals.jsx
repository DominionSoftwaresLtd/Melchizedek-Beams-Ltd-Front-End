import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import Badge from '../common/Badge';

const LatestDevotionals = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Mock data - will be replaced with API call
    const mockArticles = [
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
    ];

    setArticles(mockArticles);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="mb-4">Latest Devotionals & Articles</h2>
          <p className="text-neutral text-lg">
            Fresh insights from God's Word to encourage and challenge your walk with Christ
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link key={article.id} to={`/news/${article.slug}`}>
              <Card className="h-full flex flex-col hover:border-secondary transition-all">
                <div className="mb-3">
                  <Badge variant="secondary">{article.category}</Badge>
                </div>
                
                <h4 className="mb-3 line-clamp-2">{article.title}</h4>
                
                <p className="text-neutral text-sm mb-4 line-clamp-3 flex-grow">
                  {article.summary}
                </p>

                <div className="flex items-center justify-between text-xs text-neutral-light mt-auto pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-3">
                    <span>{article.author}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <span>{formatDate(article.publishedDate)}</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link to="/news" className="text-secondary hover:text-secondary-dark font-semibold inline-flex items-center space-x-2 group">
            <span>View All Articles</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestDevotionals;
