import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';

const FeaturedProgrammes = () => {
  const [programmes, setProgrammes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - will be replaced with API call
    const mockProgrammes = [
      {
        id: 'foundations-of-faith',
        title: 'Foundations of Faith',
        targetAudience: 'Youth',
        duration: '12 Weeks',
        schedule: 'Saturdays, 10:00 AM - 12:00 PM',
        overview: 'A comprehensive introduction to core Christian beliefs, designed to establish a firm biblical foundation for young believers.',
        imageUrl: '/images/programmes/foundations.jpg',
      },
      {
        id: 'mens-warrior-discipleship',
        title: 'Men of Valor - Warrior Discipleship',
        targetAudience: 'Men',
        duration: '16 Weeks',
        schedule: 'Wednesday Evenings, 6:30 PM - 8:30 PM',
        overview: 'Equipping men to stand firm in their faith, lead their families with integrity, and impact their communities for Christ.',
        imageUrl: '/images/programmes/men-valor.jpg',
      },
      {
        id: 'virtuous-women',
        title: 'Virtuous Women - Daughters of the King',
        targetAudience: 'Women',
        duration: '12 Weeks',
        schedule: 'Tuesday Afternoons, 2:00 PM - 4:00 PM',
        overview: 'Empowering women to walk in their God-given identity, cultivate godly character, and fulfill their calling with grace and strength.',
        imageUrl: '/images/programmes/virtuous-women.jpg',
      },
    ];

    setTimeout(() => {
      setProgrammes(mockProgrammes);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <p className="text-neutral">Loading programmes...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="mb-4">Featured Programmes</h2>
          <p className="text-neutral text-lg">
            Structured discipleship journeys designed to equip you for kingdom impact
          </p>
        </div>

        {/* Programmes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programmes.map((programme) => (
            <Card key={programme.id} className="flex flex-col" padding={false}>
              {/* Programme Image */}
              <div className="h-48 bg-gradient-to-br from-primary to-primary-light overflow-hidden">
                <img 
                  src={programme.imageUrl} 
                  alt={programme.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>

              {/* Programme Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-3">
                  <Badge variant="accent">{programme.targetAudience}</Badge>
                </div>
                
                <h4 className="mb-3 line-clamp-2">{programme.title}</h4>
                
                <div className="space-y-2 mb-4 text-sm text-neutral">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>{programme.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <span>{programme.schedule}</span>
                  </div>
                </div>

                <p className="text-neutral text-sm mb-6 line-clamp-3 flex-grow">
                  {programme.overview}
                </p>

                <Link to="/programmes" className="mt-auto">
                  <Button variant="secondary" className="w-full">
                    View Details
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link to="/programmes">
            <Button variant="outline">
              View All Programmes
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProgrammes;
