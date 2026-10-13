import { useState, useEffect } from 'react';
import Card from '../common/Card';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Mock data - will be replaced with API call
    const mockTestimonials = [
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
        programme: 'Men of Valor',
        quote: 'The Men of Valor programme challenged me to step up as a spiritual leader in my home and workplace. The accountability relationships I formed have been invaluable, and I\'ve seen real transformation in my character and relationships.',
        rating: 5,
      },
      {
        id: '3',
        name: 'Ruth Wambui',
        programme: 'School of Prayer',
        quote: 'I thought I knew how to pray, but this programme took my prayer life to a completely new level. I\'ve learned to pray with authority, hear God\'s voice more clearly, and see breakthrough in areas I\'ve been interceding for years.',
        rating: 5,
      },
    ];

    setTestimonials(mockTestimonials);

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mockTestimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (testimonials.length === 0) return null;

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="section-padding bg-gradient-to-br from-primary to-primary-dark text-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-white mb-4">Impact & Testimonials</h2>
          <p className="text-gray-300 text-lg">
            Hear from believers whose lives have been transformed through discipleship
          </p>
        </div>

        {/* Testimonial Slider */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-sm border border-white/20 text-center">
            {/* Quote Icon */}
            <div className="flex justify-center mb-6">
              <svg className="w-12 h-12 text-secondary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
            </div>

            {/* Testimonial Content */}
            <p className="text-xl text-white mb-6 leading-relaxed italic">
              "{currentTestimonial.quote}"
            </p>

            {/* Rating */}
            <div className="flex justify-center mb-4">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              ))}
            </div>

            {/* Author Info */}
            <div className="mb-6">
              <p className="text-white font-bold text-lg">{currentTestimonial.name}</p>
              <p className="text-secondary text-sm">{currentTestimonial.programme}</p>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-secondary w-8'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
