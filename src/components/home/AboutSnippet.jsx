import { Link } from 'react-router-dom';

const AboutSnippet = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-14 items-center">

          {/* Visual side */}
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary to-primary-light overflow-hidden">
              <img
                src="/images/about-snippet.jpg"
                alt="Discipleship community"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
            {/* Accent block */}
            <div className="absolute -bottom-5 -right-5 w-28 h-28 bg-secondary/20 rounded-2xl -z-10" />
            {/* Quote chip */}
            <div className="absolute bottom-6 left-6 bg-white border border-surface-border rounded-xl shadow-md px-4 py-3 max-w-[200px]">
              <p className="text-xs text-neutral-light uppercase tracking-wide font-semibold mb-1">Our mission</p>
              <p className="text-primary text-sm font-semibold leading-snug">
                "Building people, not just programmes."
              </p>
            </div>
          </div>

          {/* Content side */}
          <div>
            <span className="inline-block bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
              About Us
            </span>
            <h2 className="mb-6">About Melchizedek Beams</h2>
            <div className="space-y-4 text-neutral text-base leading-relaxed">
              <p>
                We are a faith-based discipleship organization dedicated to equipping believers
                for kingdom impact. Our name, "Melchizedek Beams," reflects our calling as a
                royal priesthood (1 Peter 2:9) and our mission to be structural supports—beams—
                that bear burdens and provide strength to the body of Christ.
              </p>
              <p>
                Through intentional programmes in prayer, Word study, mentorship, and leadership
                development, we raise up disciples who don't just know about Jesus, but who walk
                with Him daily and reproduce their faith in others.
              </p>
            </div>
            <div className="mt-8">
              <Link to="/about" className="btn btn-secondary">
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSnippet;
