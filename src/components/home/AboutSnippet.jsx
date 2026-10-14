import { Link } from 'react-router-dom';

const AboutSnippet = () => {
  return (
    <section className="section-padding bg-[#FAF9F5]">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-14 items-center">

          {/* Text side */}
          <div>
            <p className="text-[#D97706] text-xs font-bold uppercase tracking-widest mb-3">
              Who We Are
            </p>
            <h2 className="mb-6 text-3xl md:text-4xl">
              Welcome to Melchizedek Beams Ltd
            </h2>

            {/* Left-border quote block like reference */}
            <div className="border-l-4 border-primary pl-5 mb-6">
              <p className="text-primary font-semibold text-base leading-relaxed">
                A faith-based discipleship organization dedicated to equipping believers
                for kingdom impact through prayer, Word study, and mentorship.
              </p>
            </div>

            <p className="text-gray-600 text-base leading-relaxed mb-3">
              Our name, "Melchizedek Beams," reflects our calling as a royal priesthood
              (1 Peter 2:9) and our mission to be structural supports — beams — that bear
              burdens and provide strength to the body of Christ.
            </p>
            <p className="text-gray-600 text-base leading-relaxed mb-8">
              Through intentional programmes, we raise up disciples who don't just know
              about Jesus, but who walk with Him daily and reproduce their faith in others.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link to="/about" className="btn btn-secondary py-2.5 px-6 text-sm">
                Learn More About Us
              </Link>
              <Link to="/programmes" className="btn btn-outline py-2.5 px-6 text-sm">
                View Programmes
              </Link>
            </div>
          </div>

          {/* Image side */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200">
              <img
                src="/images/about-snippet.jpg"
                alt="Discipleship community"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.parentElement.classList.add('flex', 'items-center', 'justify-center', 'bg-[#E6F4F1]');
                  e.target.style.display = 'none';
                  const el = document.createElement('span');
                  el.textContent = '📖';
                  el.className = 'text-6xl';
                  e.target.parentElement.appendChild(el);
                }}
              />
            </div>
            {/* Floating stat chip */}
            <div className="absolute -bottom-4 -left-4 bg-white border border-gray-200 rounded-xl shadow-lg px-5 py-3">
              <p className="text-2xl font-extrabold text-primary leading-none">500+</p>
              <p className="text-xs text-gray-500 mt-0.5">Believers Equipped</p>
            </div>
            <div className="absolute -top-4 -right-4 bg-[#D97706] rounded-xl shadow-lg px-5 py-3">
              <p className="text-2xl font-extrabold text-white leading-none">10+</p>
              <p className="text-xs text-white/80 mt-0.5">Years of Ministry</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSnippet;
