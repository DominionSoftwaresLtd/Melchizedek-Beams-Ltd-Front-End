import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative w-full min-h-[88vh] flex items-end overflow-hidden bg-[#0F383E]">

      {/* Background image — bg-top on mobile shows the DISCIPLESHIP text, bg-center on larger screens */}
      <div
        className="absolute inset-0 bg-cover bg-top md:bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/discipleship-hero.jpg')" }}
        aria-hidden="true"
      />

      {/* Gradient — stronger at top on mobile so header stays readable, heavier at bottom for text */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/80 md:bg-gradient-to-t md:from-black/80 md:via-black/40 md:to-black/20" aria-hidden="true" />

      {/* Content pushed down enough on mobile that the hero image top (DISCIPLESHIP) stays visible */}
      <div className="container-custom relative z-10 pb-12 md:pb-20 pt-[55%] sm:pt-[40%] md:pt-32 w-full">
        <div className="max-w-xl md:mx-auto md:text-center">

          {/* Brand name — desktop only */}
          <p className="hidden md:block text-white/60 text-xs font-bold uppercase tracking-[0.3em] mb-2">
            Melchizedek Beams
          </p>

          {/* Eyebrow */}
          <span className="inline-block bg-[#D97706] text-white text-[11px] font-bold px-3 py-1 rounded-sm mb-4 uppercase tracking-[0.15em]">
            Discipleship · Prayer · Mentorship
          </span>

          {/* Headline — smaller on mobile so it fits without hiding the bg image text */}
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-4">
            Equipping<br />
            <span className="text-[#D97706]">Believers,</span><br />
            Beam by Beam.
          </h1>

          {/* Subtitle */}
          <p className="text-white/80 text-sm md:text-base leading-relaxed mb-7 max-w-md md:mx-auto">
            A discipleship and spiritual growth organization raising up kingdom leaders
            through prayer, Word study, mentorship and accountability.
          </p>

          {/* CTAs — stacked full-width on mobile, inline on sm+ */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto md:justify-center">
            <Link
              to="/programmes"
              className="btn btn-primary px-6 py-3 text-sm w-full sm:w-auto justify-center"
            >
              Explore Programmes
            </Link>
            <Link
              to="/about"
              className="btn bg-white/15 border border-white/40 text-white hover:bg-white hover:text-primary px-6 py-3 text-sm w-full sm:w-auto justify-center backdrop-blur-sm"
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
