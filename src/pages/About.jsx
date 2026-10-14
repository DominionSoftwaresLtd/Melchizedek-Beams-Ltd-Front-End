import { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const About = () => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const team = [
    {
      id: '1',
      name: 'Rev. Samuel Kariuki',
      title: 'Senior Leader & Lead Pastor',
      bio: 'Rev. Samuel is the founding leader of Melchizedek Beams Ltd, with over 20 years of pastoral experience and a passion for raising up kingdom leaders.',
      imageUrl: '/images/team/samuel.jpg',
    },
    {
      id: '2',
      name: 'Mama Esther Njeri',
      title: 'Prayer Ministry Coordinator',
      bio: 'Mama Esther has led prayer ministries for 18 years and is known for her powerful intercessory gift.',
      imageUrl: '/images/team/esther.jpg',
    },
    {
      id: '3',
      name: 'Pastor David Kimani',
      title: 'Youth Ministry Leader',
      bio: 'Pastor David has over 10 years of experience in youth discipleship and holds a Master\'s in Biblical Studies.',
      imageUrl: '/images/team/david.jpg',
    },
    {
      id: '4',
      name: 'Sister Grace Wanjiru',
      title: 'Women\'s Ministry Leader',
      bio: 'Sister Grace is a passionate teacher with a heart for women\'s spiritual formation and empowerment.',
      imageUrl: '/images/team/grace.jpg',
    },
    {
      id: '5',
      name: 'Elder John Mwangi',
      title: 'Men\'s Ministry Coordinator',
      bio: 'Elder John is a seasoned leader with 15 years in men\'s ministry and marketplace discipleship.',
      imageUrl: '/images/team/john.jpg',
    },
    {
      id: '6',
      name: 'Dr. Peter Ochieng',
      title: 'Marketplace Ministry Director',
      bio: 'Dr. Peter is a business consultant and ordained minister with expertise in faith-work integration.',
      imageUrl: '/images/team/peter.jpg',
    },
  ];

  const statementOfFaith = [
    {
      id: 1,
      title: 'The Holy Scriptures',
      content: 'We believe the Bible is the inspired, infallible Word of God, the supreme authority for all matters of faith and practice (2 Timothy 3:16-17).',
    },
    {
      id: 2,
      title: 'Salvation by Grace',
      content: 'We believe that salvation is by grace alone through faith alone in Jesus Christ alone. It is a gift of God, not by works (Ephesians 2:8-9).',
    },
    {
      id: 3,
      title: 'The Trinity',
      content: 'We believe in one God eternally existing in three persons: Father, Son, and Holy Spirit, co-equal in nature, attributes, and perfection.',
    },
    {
      id: 4,
      title: 'The Great Commission',
      content: 'We believe every believer is called to make disciples, not just converts, teaching them to obey all that Christ commanded (Matthew 28:18-20).',
    },
    {
      id: 5,
      title: 'The Church',
      content: 'We believe the Church is the body of Christ, called to worship, fellowship, discipleship, and mission. Every believer is a minister with spiritual gifts for service.',
    },
    {
      id: 6,
      title: 'The Second Coming',
      content: 'We believe in the personal, visible return of Jesus Christ to establish His kingdom and judge the living and the dead (Acts 1:11; Revelation 19-20).',
    },
  ];

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-white mb-4">About Melchizedek Beams Ltd</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Building believers, beam by beam, into a royal priesthood equipped for kingdom impact
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="mb-3">Our Vision</h3>
                  <p className="text-neutral leading-relaxed">
                    A community of Spirit-filled believers who are firmly established in the Word, 
                    committed to prayer, walking in holiness, and actively making disciples across all 
                    spheres of society for the glory of God.
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="mb-3">Our Mission</h3>
                  <p className="text-neutral leading-relaxed">
                    To equip believers for kingdom impact through intentional discipleship, biblical 
                    teaching, intercessory prayer, mentorship relationships, and leadership development—
                    raising up a generation that knows God intimately and serves Him wholeheartedly.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* The Meaning of "Melchizedek Beams" */}
      <section className="section-padding bg-[#FAF9F5]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-12">The Meaning of "Melchizedek Beams"</h2>
            <Card>
              <div className="prose prose-lg max-w-none">
                <p className="text-neutral leading-relaxed mb-4">
                  Our name carries profound biblical significance, reflecting both our identity and calling:
                </p>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-secondary mb-2">Melchizedek - The Priesthood</h4>
                    <p className="text-neutral">
                      Melchizedek, whose name means "king of righteousness," was both king and priest (Genesis 14:18). 
                      The book of Hebrews reveals that Jesus Christ is a priest forever in the order of Melchizedek—
                      a priesthood superior to the Levitical priesthood. As believers, we are called a "royal priesthood" 
                      (1 Peter 2:9), set apart to offer spiritual sacrifices and minister reconciliation to the world.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-secondary mb-2">Beams - Structural Support</h4>
                    <p className="text-neutral">
                      Just as beams provide structural support, carry weight, and hold buildings together, we are called 
                      to bear one another's burdens (Galatians 6:2), support the weak (1 Thessalonians 5:14), and be 
                      light-bearers in darkness (Matthew 5:14-16). We are structural elements in God's temple—the Church—
                      providing strength, stability, and support to the body of Christ.
                    </p>
                  </div>
                  <p className="text-primary font-semibold italic">
                    "Together, we are a royal priesthood called to carry weight, provide support, and shine light—
                    equipping believers, beam by beam, for kingdom impact."
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Statement of Faith */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-12">Statement of Faith</h2>
            <div className="space-y-4">
              {statementOfFaith.map((item) => (
                <Card 
                  key={item.id} 
                  className="cursor-pointer"
                  onClick={() => toggleAccordion(item.id)}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg">{item.title}</h4>
                    <svg 
                      className={`w-6 h-6 text-secondary transition-transform ${
                        openAccordion === item.id ? 'rotate-180' : ''
                      }`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </div>
                  {openAccordion === item.id && (
                    <p className="mt-4 text-neutral leading-relaxed">
                      {item.content}
                    </p>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Team */}
      <section className="section-padding bg-[#FAF9F5]">
        <div className="container-custom">
          <h2 className="text-center mb-12">Our Leadership Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <Card key={member.id} className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary overflow-hidden">
                  <img 
                    src={member.imageUrl} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <h4 className="mb-1">{member.name}</h4>
                <p className="text-secondary text-sm font-semibold mb-3">{member.title}</p>
                <p className="text-neutral text-sm leading-relaxed">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-primary text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-white mb-6">Get in Touch</h2>
            <p className="text-gray-300 mb-8">
              Have questions about our ministry or interested in partnering with us? We'd love to hear from you.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div>
                <div className="text-secondary text-sm font-semibold mb-2">Email</div>
                <div className="text-white">info@melchizedekbeams.org</div>
              </div>
              <div>
                <div className="text-secondary text-sm font-semibold mb-2">Phone</div>
                <div className="text-white">+254 700 123 456</div>
              </div>
              <div>
                <div className="text-secondary text-sm font-semibold mb-2">Location</div>
                <div className="text-white">Nairobi, Kenya</div>
              </div>
            </div>
            <Button variant="primary" size="lg">
              Send Us a Message
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
