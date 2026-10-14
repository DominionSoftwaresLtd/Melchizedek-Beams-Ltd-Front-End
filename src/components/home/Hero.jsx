import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative bg-primary text-white section-padding overflow-hidden">
      {/* Subtle decorative rings */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-white/5" />
      <div className="absolute -top-12 -right-12 w-72 h-72 rounded-full border border-white/5" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* Eyebrow */}
          <span className="inline-block bg-secondary/20 text-secondary text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            Equipping Believers, Beam by Beam
          </span>

          {/* Heading */}
          <h1 className="text-white mb-6 leading-tight">
            Raising Kingdom Leaders Through Discipleship
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-white/70 mb-10 leading-relaxed max-w-2xl mx-auto">
            A discipleship and spiritual growth organization committed to raising up kingdom leaders
            through prayer, Word study, mentorship, and accountability — one beam at a time.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/programmes" className="btn btn-primary text-base px-8 py-3.5">
              Explore Programmes
            </Link>
            <Link
              to="/programmes"
              className="btn border-2 border-white/30 text-white hover:bg-white hover:text-primary text-base px-8 py-3.5"
            >
              Join a Cohort
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-10 border-t border-white/10">
            {[
              { value: '500+', label: 'Disciples Trained' },
              { value: '15+',  label: 'Active Programmes' },
              { value: '10',   label: 'Years of Ministry' },
              { value: '50+',  label: 'Leaders Raised' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-4xl font-bold text-secondary mb-1">{value}</div>
                <div className="text-white/60 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
