import { useState, useEffect } from 'react';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const mock = [
      {
        id: '1',
        name: 'Sarah Mutua',
        programme: 'Virtuous Women Programme',
        quote: 'This programme transformed my understanding of my identity in Christ. I learned to walk in confidence as a daughter of the King and discovered my gifts for ministry. The sisterhood and mentorship I received continue to impact my life daily.',
        rating: 5,
      },
      {
        id: '2',
        name: 'James Omondi',
        programme: 'Melchizedek Leadership Cohort',
        quote: 'The Leadership Cohort challenged me to step up as a spiritual leader in my home and workplace. The accountability relationships I formed have been invaluable, and I\'ve seen real transformation in my character and relationships.',
        rating: 5,
      },
      {
        id: '3',
        name: 'Ruth Wambui',
        programme: 'Foundations of Faith',
        quote: 'I thought I knew how to pray, but this programme took my prayer life to a completely new level. I\'ve learned to pray with authority, hear God\'s voice more clearly, and see breakthrough in areas I\'ve been interceding for years.',
        rating: 5,
      },
    ];

    setTestimonials(mock);

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mock.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  if (testimonials.length === 0) return null;

  const t = testimonials[currentIndex];

  return (
    <section className="section-padding bg-primary relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/3 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">

        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block bg-secondary/20 text-secondary text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-white mb-4">Impact & Transformation</h2>
          <p className="text-white/60 text-lg">
            Hear from believers whose lives have been transformed through discipleship.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 text-center backdrop-blur-sm">

            {/* Quote icon */}
            <svg className="w-10 h-10 text-secondary mx-auto mb-6 opacity-60" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>

            <p className="text-xl text-white/90 mb-8 leading-relaxed italic">
              "{t.quote}"
            </p>

            {/* Stars */}
            <div className="flex justify-center gap-1 mb-5">
              {[...Array(t.rating)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            <p className="text-white font-bold text-base">{t.name}</p>
            <p className="text-secondary text-sm mt-1">{t.programme}</p>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex ? 'bg-secondary w-8' : 'bg-white/20 w-2 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
