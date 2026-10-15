import { useState, useEffect } from 'react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const CATS = ['All','General','Programmes','Events','Team','Fellowship Meetings','Conferences','Community Outreach','Graduation Days'];

const Gallery = () => {
  const [images,  setImages]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter,  setFilter]  = useState('All');
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    const url = filter === 'All' ? `${API}/gallery` : `${API}/gallery?category=${encodeURIComponent(filter)}`;
    fetch(url).then(r => r.json()).then(d => { if (d.success) setImages(d.data); }).finally(() => setLoading(false));
  }, [filter]);

  return (
    <div className="min-h-screen bg-[#FAF9F5]">

      {/* Hero */}
      <section className="bg-primary py-12 text-white">
        <div className="container-custom text-center max-w-2xl mx-auto">
          <span className="inline-block bg-[#D97706]/20 text-[#D97706] text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">Gallery</span>
          <h1 className="text-white text-3xl md:text-4xl mb-3">Moments of Ministry</h1>
          <p className="text-white/70 text-sm">Snapshots from our discipleship journey — programmes, events and community life.</p>
        </div>
      </section>

      {/* Category filter */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="container-custom px-4 py-3 flex gap-2 overflow-x-auto">
          {CATS.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition-colors ${
                filter === c ? 'bg-primary text-white border-primary' : 'border-gray-200 text-gray-500 hover:border-primary hover:text-primary'
              }`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="py-10">
        <div className="container-custom px-4">
          {loading ? (
            <div className="py-20 text-center">
              <div className="w-7 h-7 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-sm">No images yet in this category.</p>
            </div>
          ) : (
            <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
              {images.map(img => (
                <div key={img._id}
                  className="break-inside-avoid rounded-xl overflow-hidden cursor-pointer group relative"
                  onClick={() => setLightbox(img)}
                >
                  <img src={img.imageUrl} alt={img.title}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.parentElement.style.display='none'; }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <p className="text-white text-xs font-semibold line-clamp-2">{img.title}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 bg-black/90 z-[200] flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 text-white/70 hover:text-white p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div onClick={e => e.stopPropagation()} className="max-w-3xl w-full">
            <img src={lightbox.imageUrl} alt={lightbox.title} className="w-full rounded-xl max-h-[80vh] object-contain" />
            <p className="text-white text-sm text-center mt-3 font-semibold">{lightbox.title}</p>
            {lightbox.caption && <p className="text-white/60 text-xs text-center mt-1">{lightbox.caption}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
