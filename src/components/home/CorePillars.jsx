const pillars = [
  {
    id: 1,
    title: 'Prayer & Intercession',
    description: 'Building a foundation of powerful, persistent prayer that moves heaven and changes circumstances.',
    iconPath: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    iconBg: 'bg-secondary/10',
    iconColor: 'text-secondary',
  },
  {
    id: 2,
    title: 'Word & Discipleship',
    description: 'Grounding believers in Scripture through systematic Bible study and theological foundations.',
    iconPath: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    iconBg: 'bg-accent',
    iconColor: 'text-primary',
  },
  {
    id: 3,
    title: 'Mentorship & Accountability',
    description: 'Creating intentional relationships where believers grow together in faith and character.',
    iconPath: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    id: 4,
    title: 'Kingdom Leadership',
    description: 'Raising up servant leaders who influence their spheres with integrity and Christ-like character.',
    iconPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    iconBg: 'bg-secondary/10',
    iconColor: 'text-secondary',
  },
];

const CorePillars = () => {
  return (
    <section className="section-padding bg-[#FAF9F5]">
      <div className="container-custom">

        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
            Our Foundation
          </span>
          <h2 className="mb-4">Our Core Pillars</h2>
          <p className="text-neutral text-lg">
            Four foundational areas that shape every aspect of our discipleship approach.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="card p-7 text-center group cursor-default hover:border-secondary/40 transition-colors"
            >
              <div className={`w-14 h-14 ${pillar.iconBg} rounded-xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform`}>
                <svg className={`w-7 h-7 ${pillar.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={pillar.iconPath} />
                </svg>
              </div>
              <h5 className="mb-3">{pillar.title}</h5>
              <p className="text-neutral text-sm leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CorePillars;
