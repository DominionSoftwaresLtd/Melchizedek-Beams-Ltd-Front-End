import { useState } from 'react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const team = [
  { id: '1', name: 'Rev. Samuel Kariuki', title: 'Senior Leader & Lead Pastor', bio: 'Rev. Samuel is the founding leader of Melchizedek Beams Ltd, with over 20 years of pastoral experience and a passion for raising up kingdom leaders.', imageUrl: '/images/team/samuel.jpg' },
  { id: '2', name: 'Mama Esther Njeri',  title: 'Prayer Ministry Coordinator', bio: 'Mama Esther has led prayer ministries for 18 years and is known for her powerful intercessory gift.', imageUrl: '/images/team/esther.jpg' },
  { id: '3', name: 'Pastor David Kimani', title: 'Youth Ministry Leader', bio: "Pastor David has over 10 years of experience in youth discipleship and holds a Master's in Biblical Studies.", imageUrl: '/images/team/david.jpg' },
  { id: '4', name: 'Sister Grace Wanjiru', title: "Women's Ministry Leader", bio: "Sister Grace is a passionate teacher with a heart for women's spiritual formation and empowerment.", imageUrl: '/images/team/grace.jpg' },
  { id: '5', name: 'Elder John Mwangi',  title: "Men's Ministry Coordinator", bio: 'Elder John is a seasoned leader with 15 years in men\'s ministry and marketplace discipleship.', imageUrl: '/images/team/john.jpg' },
  { id: '6', name: 'Dr. Peter Ochieng',  title: 'Marketplace Ministry Director', bio: 'Dr. Peter is a business consultant and ordained minister with expertise in faith-work integration.', imageUrl: '/images/team/peter.jpg' },
];

const faith = [
  { id: 1, title: 'The Holy Scriptures', content: 'We believe the Bible is the inspired, infallible Word of God — the supreme authority for all matters of faith and practice (2 Timothy 3:16-17).' },
  { id: 2, title: 'Salvation by Grace',  content: 'We believe that salvation is by grace alone through faith alone in Jesus Christ alone. It is a gift of God, not by works (Ephesians 2:8-9).' },
  { id: 3, title: 'The Trinity',         content: 'We believe in one God eternally existing in three persons: Father, Son and Holy Spirit, co-equal in nature, attributes and perfection.' },
  { id: 4, title: 'The Great Commission',content: 'We believe every believer is called to make disciples — not just converts — teaching them to obey all that Christ commanded (Matthew 28:18-20).' },
  { id: 5, title: 'The Church',          content: 'We believe the Church is the body of Christ, called to worship, fellowship, discipleship and mission. Every believer is a minister with spiritual gifts for service.' },
  { id: 6, title: 'The Second Coming',   content: 'We believe in the personal, visible return of Jesus Christ to establish His kingdom and judge the living and the dead (Acts 1:11; Revelation 19-20).' },
];

/* ── Contact Modal ── */
const ContactModal = ({ onClose }) => {
  const [form, setForm]       = useState({ fullName: '', email: '', phone: '', subject: 'General Enquiry', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone]       = useState(false);
  const [error, setError]     = useState('');

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res  = await fetch(`${API}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setDone(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-primary px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div>
            <p className="text-[#D97706] text-xs font-bold uppercase tracking-wider">Get in Touch</p>
            <h4 className="text-white text-base font-bold">Send Us a Message</h4>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white p-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {done ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-primary mb-2">Message Received!</h4>
              <p className="text-gray-500 text-sm mb-1">Thank you for reaching out.</p>
              <p className="text-gray-500 text-sm mb-5">We'll get back to you within 24–48 hours. A confirmation has been sent to your email.</p>
              <button onClick={onClose} className="btn btn-primary text-sm px-6 py-2">Close</button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 text-red-700 text-sm">{error}</div>
              )}

              {[
                { label: 'Full Name',     name: 'fullName', type: 'text',  placeholder: 'Your full name' },
                { label: 'Email Address', name: 'email',    type: 'email', placeholder: 'your@email.com' },
                { label: 'Phone (optional)', name: 'phone', type: 'tel',   placeholder: '+254 7XX XXX XXX', required: false },
              ].map(({ label, name, type, placeholder, required = true }) => (
                <div key={name}>
                  <label className="block text-xs font-semibold text-primary mb-1">{label}</label>
                  <input
                    type={type} name={name} value={form[name]} onChange={handle}
                    placeholder={placeholder} required={required}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706]/40 focus:border-[#D97706]"
                  />
                </div>
              ))}

              <div>
                <label className="block text-xs font-semibold text-primary mb-1">Subject</label>
                <select name="subject" value={form.subject} onChange={handle}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706]/40">
                  {['General Enquiry', 'Programme Information', 'Partnership', 'Prayer Request', 'Feedback', 'Complaint'].map(s => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-primary mb-1">Your Message</label>
                <textarea
                  name="message" value={form.message} onChange={handle} rows={4} required
                  placeholder="Tell us how we can help, share feedback, a recommendation or a prayer request..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706]/40 focus:border-[#D97706] resize-none"
                />
              </div>

              <button type="submit" disabled={submitting}
                className="btn btn-primary w-full text-sm py-2.5 disabled:opacity-50">
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const About = () => {
  const [openAccordion, setOpenAccordion] = useState(null);
  const [showContact, setShowContact]     = useState(false);

  return (
    <div>
      {/* ── Hero ── */}
      <section className="bg-primary text-white py-14">
        <div className="container-custom text-center">
          <span className="inline-block bg-[#D97706]/20 text-[#D97706] text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">Our Story</span>
          <h1 className="text-white text-3xl md:text-4xl mb-3">About Melchizedek Beams Ltd</h1>
          <p className="text-white/70 text-sm md:text-base max-w-2xl mx-auto">
            Building believers, beam by beam, into a royal priesthood equipped for kingdom impact.
          </p>
        </div>
      </section>

      {/* ── Vision & Mission ── */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
                label: 'Our Vision', bg: 'bg-[#D97706]/10', iconColor: 'text-[#D97706]',
                text: 'A community of Spirit-filled believers firmly established in the Word, committed to prayer, walking in holiness and actively making disciples across all spheres of society for the glory of God.',
              },
              {
                icon: 'M13 10V3L4 14h7v7l9-11h-7z',
                label: 'Our Mission', bg: 'bg-[#E6F4F1]', iconColor: 'text-primary',
                text: 'To equip believers for kingdom impact through intentional discipleship, biblical teaching, intercessory prayer, mentorship relationships and leadership development — raising up a generation that knows God intimately and serves Him wholeheartedly.',
              },
            ].map(({ icon, label, bg, iconColor, text }) => (
              <div key={label} className="card p-6 flex gap-4">
                <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center shrink-0`}>
                  <svg className={`w-5 h-5 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon} />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold mb-2">{label}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Name ── */}
      <section className="py-12 bg-[#FAF9F5]">
        <div className="container-custom max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-block bg-[#E6F4F1] text-primary text-[10px] font-bold px-3 py-1 rounded-full mb-2 uppercase tracking-wider">Our Identity</span>
            <h2 className="text-2xl md:text-3xl">The Meaning of "Melchizedek Beams"</h2>
          </div>
          <div className="card p-6 space-y-5">
            <div>
              <h5 className="text-[#D97706] text-sm font-bold mb-1.5">Melchizedek — The Priesthood</h5>
              <p className="text-gray-600 text-sm leading-relaxed">
                Melchizedek, whose name means "king of righteousness," was both king and priest (Genesis 14:18). Hebrews reveals that Jesus Christ is a priest forever in the order of Melchizedek. As believers, we are called a "royal priesthood" (1 Peter 2:9), set apart to offer spiritual sacrifices and minister reconciliation to the world.
              </p>
            </div>
            <div>
              <h5 className="text-[#D97706] text-sm font-bold mb-1.5">Beams — Structural Support</h5>
              <p className="text-gray-600 text-sm leading-relaxed">
                Just as beams provide structural support and carry weight, we are called to bear one another's burdens (Galatians 6:2), support the weak (1 Thessalonians 5:14) and be light-bearers in darkness (Matthew 5:14-16). We are structural elements in God's temple providing strength, stability and support to the body of Christ.
              </p>
            </div>
            <p className="text-primary font-semibold italic text-sm border-l-4 border-[#D97706] pl-4">
              "Together, we are a royal priesthood called to carry weight, provide support and shine light — equipping believers, beam by beam, for kingdom impact."
            </p>
          </div>
        </div>
      </section>

      {/* ── Statement of Faith ── */}
      <section className="py-12 bg-white">
        <div className="container-custom max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-block bg-[#E6F4F1] text-primary text-[10px] font-bold px-3 py-1 rounded-full mb-2 uppercase tracking-wider">What We Believe</span>
            <h2 className="text-2xl md:text-3xl">Statement of Faith</h2>
          </div>
          <div className="space-y-3">
            {faith.map((item) => (
              <div key={item.id}
                className="card cursor-pointer hover:border-[#D97706]/40 transition-colors"
                onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}
              >
                <div className="p-4 flex items-center justify-between">
                  <h5 className="text-sm font-bold">{item.title}</h5>
                  <svg className={`w-4 h-4 text-[#D97706] transition-transform shrink-0 ml-3 ${openAccordion === item.id ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {openAccordion === item.id && (
                  <div className="px-4 pb-4">
                    <p className="text-gray-600 text-sm leading-relaxed">{item.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership Team ── */}
      <section className="py-12 bg-[#FAF9F5]">
        <div className="container-custom">
          <div className="text-center mb-8">
            <span className="inline-block bg-[#E6F4F1] text-primary text-[10px] font-bold px-3 py-1 rounded-full mb-2 uppercase tracking-wider">The Team</span>
            <h2 className="text-2xl md:text-3xl">Our Leadership Team</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {team.map((m) => (
              <div key={m.id} className="card p-5 text-center hover:-translate-y-1 transition-transform duration-300">
                <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary to-[#D97706] overflow-hidden">
                  <img src={m.imageUrl} alt={m.name} className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; }} />
                </div>
                <h5 className="text-sm font-bold mb-0.5">{m.name}</h5>
                <p className="text-[#D97706] text-xs font-semibold mb-2">{m.title}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section className="py-12 bg-primary">
        <div className="container-custom max-w-2xl mx-auto text-center px-4">
          <h2 className="text-white text-2xl md:text-3xl mb-3">Get in Touch</h2>
          <p className="text-white/70 text-sm mb-6">
            Have questions about our ministry or interested in partnering with us? We'd love to hear from you.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-8 text-sm">
            {[
              { label: 'Email',    value: 'info@melchizedekbeams.org' },
              { label: 'Phone',    value: '+254798398350' },
              { label: 'Location', value: 'Nairobi, Kenya' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[#D97706] text-xs font-bold uppercase tracking-wider mb-1">{label}</p>
                <p className="text-white text-xs">{value}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => setShowContact(true)}
            className="btn btn-primary text-sm px-8 py-3 w-full sm:w-auto justify-center"
          >
            Send Us a Message
          </button>
        </div>
      </section>

      {showContact && <ContactModal onClose={() => setShowContact(false)} />}
    </div>
  );
};

export default About;
