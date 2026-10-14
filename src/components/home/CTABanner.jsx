import { Link } from 'react-router-dom';

const CTABanner = () => {
  return (
    <section className="section-padding bg-secondary relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-white mb-4">
            Ready to Begin Your Discipleship Journey?
          </h2>
          <p className="text-white/80 text-lg mb-8 leading-relaxed">
            Join hundreds of believers who have been equipped for kingdom impact.
            Whether you're new to faith or seeking deeper growth, there's a beam track for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/programmes" className="btn bg-primary text-white hover:bg-primary-dark text-base px-8 py-3.5">
              Browse Programmes
            </Link>
            <Link
              to="/donate"
              className="btn border-2 border-white/40 text-white hover:bg-white hover:text-secondary text-base px-8 py-3.5"
            >
              Support Our Ministry
            </Link>
          </div>

          <p className="text-white/60 text-sm mt-8">
            Have questions?{' '}
            <Link to="/about" className="text-white font-semibold hover:underline">
              Contact us
            </Link>{' '}
            or call{' '}
            <span className="text-white font-semibold">+254 700 123 456</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
