import { useState } from 'react';

const testimonials = [
  {
    id: '1',
    name: 'Sarah Mutua',
    programme: 'Virtuous Women Programme',
    quote: 'This programme transformed my understanding of my identity in Christ. I learned to walk in confidence as a daughter of the King.',
    rating: 5,
  },
  {
    id: '2',
    name: 'James Omondi',
    programme: 'Leadership Cohort',
    quote: 'The Leadership Cohort challenged me to step up as a spiritual leader in my home. The accountability relationships formed have been invaluable.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Ruth Wambui',
    programme: 'Foundations of Faith',
    quote: 'My prayer life went to a completely new level. I learned to pray with authority and have seen real breakthrough in areas I\'d interceded for years.',
    rating: 5,
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const t = testimonials[current];

  return (
    <section className="py-10 bg-primary relative overflow-hidden">
      {/* Subtle decoration */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#D97706]/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="text-center mb-6">
          <span className="inline-block bg-[#D97706]/20 text-[#D97706] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-2">Testimonials</span>
          <h3 className="text-white text-xl">Impact & Transformation</h3>
        </div>

        {/* Card */}
        <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-xl px-6 py-6 text-center backdrop-blur-sm">
          {/* Stars */}
          <div className="flex justify-center gap-0.5 mb-3">
            {[...Array(t.rating)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-[#D97706]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          <p className="text-white/85 text-sm leading-relaxed italic mb-4">"{t.quote}"</p>

          <p className="text-white font-bold text-sm">{t.name}</p>
          <p className="text-[#D97706] text-xs mt-0.5">{t.programme}</p>

          {/* Dots */}
          <div className="flex justify-center gap-1.5 mt-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'bg-[#D97706] w-6' : 'bg-white/25 w-1.5 hover:bg-white/40'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
