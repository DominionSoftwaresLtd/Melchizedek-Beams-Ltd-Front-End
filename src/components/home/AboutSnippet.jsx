import { Link } from 'react-router-dom';

const AboutSnippet = () => {
  return (
    <>
      {/* ── Who We Are ── */}
      <section className="py-14 bg-[#FAF9F5]">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-10 items-center">

            {/* Text side */}
            <div>
              <p className="text-[#D97706] text-[11px] font-bold uppercase tracking-widest mb-2">Who We Are</p>
              <h2 className="text-2xl md:text-3xl mb-4 leading-snug">Welcome to Melchizedek Beams Ltd</h2>

              <div className="border-l-4 border-primary pl-4 mb-4">
                <p className="text-primary font-semibold text-sm leading-relaxed">
                  A faith-based discipleship organization dedicated to equipping believers
                  for kingdom impact through prayer, Word study, and mentorship.
                </p>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-2">
                Our name, "Melchizedek Beams," reflects our calling as a royal priesthood
                (1 Peter 2:9) and our mission to be structural supports — beams — that bear
                burdens and provide strength to the body of Christ.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Through intentional programmes, we raise up disciples who don't just know
                about Jesus, but who walk with Him daily and reproduce their faith in others.
              </p>

              <div className="flex flex-wrap gap-2">
                <Link to="/about" className="btn btn-secondary py-2 px-5 text-sm">Learn More</Link>
                <Link to="/programmes" className="btn btn-outline py-2 px-5 text-sm">View Programmes</Link>
              </div>
            </div>

            {/* Image side */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#E6F4F1]">
                <img
                  src="/images/about-snippet.jpg"
                  alt="Discipleship community"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
              <div className="absolute -bottom-3 -left-3 bg-white border border-gray-200 rounded-xl shadow-md px-4 py-2.5">
                <p className="text-xl font-extrabold text-primary leading-none">500+</p>
                <p className="text-[11px] text-gray-500 mt-0.5">Believers Equipped</p>
              </div>
              <div className="absolute -top-3 -right-3 bg-[#D97706] rounded-xl shadow-md px-4 py-2.5">
                <p className="text-xl font-extrabold text-white leading-none">10+</p>
                <p className="text-[11px] text-white/80 mt-0.5">Years of Ministry</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Discipleship Process ── */}
      <section className="py-10 bg-white border-t border-gray-100">
        <div className="container-custom">
          <div className="text-center mb-6">
            <p className="text-[#D97706] text-[11px] font-bold uppercase tracking-widest mb-1">Our Journey Together</p>
            <h3 className="text-xl md:text-2xl">The Discipleship Process</h3>
          </div>
          <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <img
              src="/images/discipleship-process.jpg"
              alt="The Discipleship Process — from Spiritually Dead through Spiritual Infant, Child, Young Adult, Parent to Spiritual Grandparent"
              className="w-full h-auto object-contain"
              onError={(e) => {
                // Fallback if image not yet placed
                e.target.parentElement.classList.add('p-8', 'bg-[#E6F4F1]');
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = `
                  <div class="text-center py-8">
                    <p class="text-primary font-bold text-lg mb-2">The Discipleship Process</p>
                    <p class="text-gray-500 text-sm">Add discipleship-process.jpg to /public/images/</p>
                    <div class="flex justify-center gap-4 mt-4 flex-wrap text-xs text-primary font-semibold">
                      ${['Spiritually Dead','Spiritual Infant','Spiritual Child','Kingdom Focused','Disciple Maker','Making Disciple Makers'].map(s=>`<span class="bg-[#E6F4F1] px-3 py-1 rounded-full">${s}</span>`).join('')}
                    </div>
                  </div>`;
              }}
            />
          </div>
          <p className="text-center text-xs text-gray-400 mt-3">
            Save this image to <code className="bg-gray-100 px-1 rounded">public/images/discipleship-process.jpg</code>
          </p>
        </div>
      </section>
    </>
  );
};

export default AboutSnippet;
