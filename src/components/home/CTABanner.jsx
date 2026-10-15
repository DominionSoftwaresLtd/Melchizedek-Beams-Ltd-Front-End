import { Link } from 'react-router-dom';

const CTABanner = () => (
  <section className="py-12 bg-[#D97706] relative overflow-hidden">
    <div className="absolute top-0 right-0 w-56 h-56 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
    <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
    <div className="container-custom relative z-10 text-center max-w-2xl mx-auto px-4">
      <h2 className="text-white text-2xl md:text-3xl mb-3">Ready to Begin Your Discipleship Journey?</h2>
      <p className="text-white/80 text-sm mb-6 leading-relaxed">
        Join hundreds of believers equipped for kingdom impact. There's a beam track for every season of growth.
      </p>
      {/* Full-width stacked on mobile, inline on sm+ */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
        <Link to="/programmes" className="btn bg-primary text-white hover:bg-[#0A2428] text-sm px-6 py-3 w-full sm:w-auto justify-center">
          Browse Programmes
        </Link>
        <Link to="/donate" className="btn border-2 border-white/40 text-white hover:bg-white hover:text-[#D97706] text-sm px-6 py-3 w-full sm:w-auto justify-center">
          Support Our Ministry
        </Link>
      </div>
    </div>
  </section>
);

export default CTABanner;
