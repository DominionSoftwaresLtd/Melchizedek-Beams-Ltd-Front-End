import { Link } from 'react-router-dom';
import Button from '../common/Button';

const AboutSnippet = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image/Visual Side */}
          <div className="relative">
            <div className="aspect-square rounded-lg bg-gradient-to-br from-primary to-primary-light overflow-hidden">
              <img 
                src="/images/about-snippet.jpg" 
                alt="Discipleship" 
                className="w-full h-full object-cover mix-blend-overlay"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary rounded-lg opacity-20"></div>
          </div>

          {/* Content Side */}
          <div>
            <h2 className="mb-6">About Melchizedek Beams</h2>
            <div className="space-y-4 text-neutral leading-relaxed">
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
              <p className="font-semibold text-primary">
                "We are not building a program; we are building people."
              </p>
            </div>
            <div className="mt-8">
              <Link to="/about">
                <Button variant="secondary">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSnippet;
