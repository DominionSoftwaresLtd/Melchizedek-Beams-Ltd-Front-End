import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative w-full min-h-[85vh] flex items-end overflow-hidden bg-[#0F383E]">

      {/* Background image — set your own in /public/images/hero.jpg */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
        aria-hidden="true"
      />

      {/* Dark gradient overlay — heavier at bottom where text sits */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" aria-hidden="true" />

      {/* Content */}
      <div className="container-custom relative z-10 pb-16 md:pb-24 pt-32 md:pt-48">
        <div className="max-w-2xl">

          {/* Eyebrow */}
          <span className="inline-block bg-[#D97706] text-white text-xs font-bold px-3 py-1 rounded-sm mb-5 uppercase tracking-widest">
            Discipleship · Prayer · Mentorship
          </span>

          {/* Headline — large, serif weight like reference */}
          <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4">
            Equipping<br />
            <span className="text-[#D97706]">Believers,</span><br />
            Beam by Beam.
          </h1>

          {/* Sub-text */}
          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
            A discipleship and spiritual growth organization committed to raising up kingdom leaders
            through prayer, Word study, mentorship, and accountability.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link to="/programmes" className="btn btn-primary px-7 py-3 text-base">
              Explore Programmes
            </Link>
            <Link
              to="/about"
              className="btn bg-white/15 border border-white/40 text-white hover:bg-white hover:text-primary px-7 py-3 text-base backdrop-blur-sm"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
