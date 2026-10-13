import { Link } from 'react-router-dom';
import Button from '../common/Button';

const CTABanner = () => {
  return (
    <section className="section-padding bg-secondary">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-primary mb-6">
            Ready to Begin Your Discipleship Journey?
          </h2>
          <p className="text-primary text-lg mb-8 leading-relaxed">
            Join hundreds of believers who have been equipped for kingdom impact. 
            Whether you're new to faith or seeking deeper growth, we have a programme for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/programmes">
              <Button variant="secondary" size="lg">
                Browse Programmes
              </Button>
            </Link>
            <Link to="/donate">
              <Button 
                variant="outline" 
                size="lg"
                className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white"
              >
                Support Our Ministry
              </Button>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-12 pt-8 border-t border-primary/20">
            <p className="text-primary/80 text-sm">
              Have questions? <Link to="/about" className="font-semibold hover:underline">Contact us</Link> or 
              call <span className="font-semibold">+254 700 123 456</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
