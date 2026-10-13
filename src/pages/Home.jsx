import Hero from '../components/home/Hero';
import AboutSnippet from '../components/home/AboutSnippet';
import CorePillars from '../components/home/CorePillars';
import FeaturedProgrammes from '../components/home/FeaturedProgrammes';
import LatestDevotionals from '../components/home/LatestDevotionals';
import Testimonials from '../components/home/Testimonials';
import CTABanner from '../components/home/CTABanner';

const Home = () => {
  return (
    <>
      <Hero />
      <AboutSnippet />
      <CorePillars />
      <FeaturedProgrammes />
      <LatestDevotionals />
      <Testimonials />
      <CTABanner />
    </>
  );
};

export default Home;
