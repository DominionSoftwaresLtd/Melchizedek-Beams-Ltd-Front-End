import { useState } from 'react';

/**
 * @typedef {Object} Resource
 * @property {string} id
 * @property {string} title
 * @property {'Devotional' | 'Study Guide' | 'Audio / Video' | 'Reading Plan'} category
 * @property {string} description
 * @property {string} externalUrl
 * @property {string} provider
 * @property {'PDF' | 'External Link' | 'Video' | 'App Plan'} format
 */

/** @type {Resource[]} */
const resources = [
  // ── Devotionals ──────────────────────────────────────────────
  {
    id: 'our-daily-bread',
    title: 'Our Daily Bread — Daily Devotional',
    category: 'Devotional',
    description:
      'Short, Scripture-rooted daily readings from one of the most trusted devotional publishers. Available online, as a PDF, or through their app.',
    externalUrl: 'https://odb.org/',
    provider: 'Our Daily Bread Ministries',
    format: 'External Link',
  },
  {
    id: 'devo-spurgeon',
    title: 'Morning & Evening by C.H. Spurgeon',
    category: 'Devotional',
    description:
      'Classic twice-daily devotional by the "Prince of Preachers." Deep, rich, and saturated in Scripture. Free to read online.',
    externalUrl: 'https://www.ccel.org/ccel/spurgeon/moreve.html',
    provider: 'Christian Classics Ethereal Library',
    format: 'External Link',
  },
  {
    id: 'youversion-devotionals',
    title: 'YouVersion Bible App Devotionals',
    category: 'Devotional',
    description:
      'Hundreds of guided devotional plans on topics like prayer, faith, and spiritual growth. Syncs across devices and available offline.',
    externalUrl: 'https://www.bible.com/reading-plans',
    provider: 'YouVersion / Life.Church',
    format: 'App Plan',
  },

  // ── Study Guides ─────────────────────────────────────────────
  {
    id: 'precept-ministries',
    title: 'Inductive Bible Study Method Guide',
    category: 'Study Guide',
    description:
      'Comprehensive guide to the Inductive Bible Study method — observe, interpret, apply. Ideal for the Scripture Exegesis Intensive track.',
    externalUrl: 'https://www.precept.org/study/inductive-bible-study/',
    provider: 'Precept Ministries International',
    format: 'External Link',
  },
  {
    id: 'blue-letter-bible',
    title: 'Blue Letter Bible — Study Tools',
    category: 'Study Guide',
    description:
      'Free online tool for word studies, concordances, commentaries, and interlinear Scripture. Excellent for hermeneutics and exegesis.',
    externalUrl: 'https://www.blueletterbible.org/',
    provider: 'Blue Letter Bible',
    format: 'External Link',
  },
  {
    id: 'discipleship-library',
    title: 'The Navigators — Discipleship Tools',
    category: 'Study Guide',
    description:
      'Practical tools for personal discipleship, including the Wheel illustration, topical memory system, and one-on-one mentorship guides.',
    externalUrl: 'https://www.navigators.org/resource-library/',
    provider: 'The Navigators',
    format: 'External Link',
  },

  // ── Audio / Video ─────────────────────────────────────────────
  {
    id: 'tim-keller-sermons',
    title: 'Tim Keller Sermon Archive',
    category: 'Audio / Video',
    description:
      'Hundreds of free sermons on the Gospel, discipleship, suffering, and cultural engagement from one of the most influential preachers of our generation.',
    externalUrl: 'https://gospelinlife.com/downloads/sermons/',
    provider: 'Gospel in Life / Redeemer City to City',
    format: 'Video',
  },
  {
    id: 'desiringgod-messages',
    title: 'Desiring God — Messages & Articles',
    category: 'Audio / Video',
    description:
      'Thousands of free articles, sermons, and videos on Christian hedonism, Bible theology, and practical godliness from John Piper and others.',
    externalUrl: 'https://www.desiringgod.org/messages',
    provider: 'Desiring God Ministries',
    format: 'Video',
  },
  {
    id: 'africans-study-bible-video',
    title: 'Africa Study Bible — Contextual Resources',
    category: 'Audio / Video',
    description:
      'Video resources and articles from African theologians and pastors, applying Scripture to the African context and experience.',
    externalUrl: 'https://africastudybible.com/resources/',
    provider: 'Oasis International',
    format: 'External Link',
  },

  // ── Reading Plans ─────────────────────────────────────────────
  {
    id: 'bible-project-plan',
    title: 'The Bible Project — Read Scripture Plans',
    category: 'Reading Plan',
    description:
      'Beautifully animated overviews and reading plans that walk you through the entire Bible with theological depth and narrative context.',
    externalUrl: 'https://bibleproject.com/guides/',
    provider: 'BibleProject',
    format: 'App Plan',
  },
  {
    id: 'mcheyne-plan',
    title: 'Robert Murray M\'Cheyne Bible Reading Plan',
    category: 'Reading Plan',
    description:
      'The classic plan that takes you through the New Testament and Psalms twice, and the rest of the Old Testament once, in a year.',
    externalUrl: 'https://www.mcheyne.info/calendar.pdf',
    provider: 'Public Domain',
    format: 'PDF',
  },
  {
    id: 'chronological-plan',
    title: 'Chronological Bible Reading Plan',
    category: 'Reading Plan',
    description:
      'Read the Bible in the order events occurred — from Creation to Revelation. Helpful for understanding the grand narrative of Scripture.',
    externalUrl: 'https://www.bible.com/reading-plans/17290-chronological-bible-reading-plan',
    provider: 'YouVersion / Life.Church',
    format: 'App Plan',
  },
];

const categories = ['All', 'Devotional', 'Study Guide', 'Audio / Video', 'Reading Plan'];

const formatIcons = {
  PDF: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  Video: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
  'App Plan': (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  'External Link': (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  ),
};

const categoryColors = {
  Devotional:     'bg-orange-100 text-orange-700',
  'Study Guide':  'bg-accent text-primary',
  'Audio / Video':'bg-purple-100 text-purple-700',
  'Reading Plan': 'bg-green-100 text-green-700',
};

const ResourceCard = ({ resource }) => (
  <div className="card flex flex-col group">
    <div className="p-6 flex flex-col flex-grow">
      {/* Top row: category + format */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[resource.category]}`}>
          {resource.category}
        </span>
        <span className="inline-flex items-center gap-1 text-xs text-neutral-light bg-background px-2 py-1 rounded-full border border-surface-border">
          {formatIcons[resource.format]}
          {resource.format}
        </span>
      </div>

      <h5 className="mb-2 leading-snug group-hover:text-secondary transition-colors">
        {resource.title}
      </h5>

      <p className="text-xs font-semibold text-neutral-light uppercase tracking-wide mb-3">
        {resource.provider}
      </p>

      <p className="text-neutral text-sm leading-relaxed flex-grow mb-5">
        {resource.description}
      </p>

      {/* External link CTA */}
      <a
        href={resource.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-teal border border-accent-dark w-full text-sm mt-auto group-hover:bg-secondary group-hover:text-white group-hover:border-secondary transition-all"
      >
        Open Resource
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  </div>
);

const Resources = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = resources.filter((r) => {
    const matchesCategory = activeCategory === 'All' || r.category === activeCategory;
    const matchesQuery =
      query.trim() === '' ||
      r.title.toLowerCase().includes(query.toLowerCase()) ||
      r.provider.toLowerCase().includes(query.toLowerCase()) ||
      r.description.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <section className="bg-primary text-white py-20">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <span className="inline-block bg-secondary/20 text-secondary text-sm font-semibold px-4 py-1 rounded-full mb-4">
            External Resources Hub
          </span>
          <h1 className="text-white mb-4">Curated Tools for Your Growth</h1>
          <p className="text-white/70 text-lg leading-relaxed">
            We don't host files — we point you to the best. Every resource below has been
            hand-picked to complement our discipleship tracks and support your personal
            study, devotion, and spiritual formation.
          </p>
        </div>
      </section>

      {/* ── Filters ── */}
      <section className="sticky top-[80px] z-30 bg-white border-b border-surface-border shadow-sm">
        <div className="container-custom py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                    activeCategory === cat
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-neutral border-surface-border hover:border-primary hover:text-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-64">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-light"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search resources..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-surface-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary bg-background"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Resource Grid ── */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Result count */}
          <p className="text-sm text-neutral-light mb-8">
            Showing <span className="font-semibold text-primary">{filtered.length}</span> resource{filtered.length !== 1 ? 's' : ''}
            {activeCategory !== 'All' && <> in <span className="font-semibold text-primary">{activeCategory}</span></>}
          </p>

          {filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <svg className="w-12 h-12 text-neutral-light mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-neutral font-semibold text-lg">No resources found</p>
              <p className="text-neutral-light text-sm mt-1">Try a different category or search term.</p>
              <button
                onClick={() => { setActiveCategory('All'); setQuery(''); }}
                className="btn btn-teal mt-4 text-sm"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Suggest a Resource ── */}
      <section className="bg-white border-t border-surface-border section-padding">
        <div className="container-custom text-center max-w-xl mx-auto">
          <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="mb-2">Know a Great Resource?</h3>
          <p className="text-neutral text-sm mb-6">
            If you've found a devotional, study tool, or reading plan that has helped your
            discipleship journey, we'd love to review it for inclusion here.
          </p>
          <a
            href="mailto:info@melchizedekbeams.org?subject=Resource Suggestion"
            className="btn btn-primary"
          >
            Suggest a Resource
          </a>
        </div>
      </section>

    </div>
  );
};

export default Resources;
