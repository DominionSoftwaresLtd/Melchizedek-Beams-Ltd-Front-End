import { Link } from 'react-router-dom';
import Button from '../common/Button';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary-dark to-primary bg-primary text-white section-padding">
      <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-10"></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-white mb-6 leading-tight">
            Equipping Believers, Beam by Beam
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            A discipleship and spiritual growth organization committed to raising up kingdom leaders 
            through prayer, Word study, mentorship, and accountability.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/programmes">
              <Button variant="primary" size="lg">
                Explore Programmes
              </Button>
            </Link>
            <Link to="/programmes">
              <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
                Join a Cohort
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-16 border-t border-primary-light">
            <div>
              <div className="text-4xl font-bold text-secondary mb-2">500+</div>
              <div className="text-gray-300 text-sm">Disciples Trained</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary mb-2">15+</div>
              <div className="text-gray-300 text-sm">Active Programmes</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary mb-2">10</div>
              <div className="text-gray-300 text-sm">Years of Ministry</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary mb-2">50+</div>
              <div className="text-gray-300 text-sm">Leaders Raised</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
