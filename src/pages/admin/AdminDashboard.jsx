import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
const ah   = (token) => ({ Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' });

/* ── Time-based greeting ── */
const greeting = (name) => {
  const h = new Date().getHours();
  const g = h < 12 ? 'Good Morning' : h < 17 ? 'Good Afternoon' : 'Good Evening';
  return `${g}, ${name || 'Admin'} 👋`;
};

/* ── Shared status badge ── */
const SBadge = ({ s }) => {
  const c = { Pending:'bg-amber-50 text-amber-700', Approved:'bg-green-100 text-green-700', Rejected:'bg-red-100 text-red-700',
    New:'bg-blue-50 text-blue-700', Read:'bg-gray-100 text-gray-500', Responded:'bg-green-100 text-green-700' };
  return <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c[s]||'bg-gray-100 text-gray-500'}`}>{s}</span>;
};

/* ── File or URL upload input ── */
const MediaInput = ({ label, urlVal, onUrl, onFile, accept = 'image/*', token, uploadType = 'articles' }) => {
  const [mode, setMode]       = useState('url');
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');

  const handleFile = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5001/api').replace('/api', '');
      const res  = await fetch(`${API}/upload?type=${uploadType}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        const fullUrl = `${BASE_URL}${data.url}`;
        setUploadedUrl(fullUrl);
        onUrl(fullUrl); // pass the URL up like a normal URL input
      } else {
        alert(data.message || 'Upload failed');
      }
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-1.5">
        <label className="text-xs font-semibold text-primary">{label}</label>
        <div className="flex gap-2 text-[11px]">
          {['url','file'].map(m => (
            <button key={m} type="button" onClick={() => setMode(m)}
              className={`px-2 py-0.5 rounded-full font-semibold transition-colors ${mode===m?'bg-primary text-white':'text-gray-400 hover:text-primary'}`}>
              {m === 'url' ? 'Paste URL' : 'My device'}
            </button>
          ))}
        </div>
      </div>
      {mode === 'url' ? (
        <input type="url" value={urlVal} onChange={(e) => onUrl(e.target.value)}
          placeholder="https://..."
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#D97706]/40" />
      ) : (
        <div>
          <input type="file" accept={accept}
            onChange={(e) => handleFile(e.target.files[0])}
            disabled={uploading}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs file:mr-2 file:text-xs file:font-semibold file:bg-[#E6F4F1] file:text-primary file:border-0 file:rounded file:py-1 file:px-2 disabled:opacity-50" />
          {uploading && <p className="text-xs text-[#D97706] mt-1">Uploading...</p>}
          {uploadedUrl && !uploading && (
            <div className="flex items-center gap-2 mt-1.5">
              <img src={uploadedUrl} alt="Preview" className="w-12 h-12 rounded object-cover border border-gray-200" />
              <p className="text-xs text-green-600 font-semibold">✓ Uploaded</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════
   REGISTRATIONS TAB
══════════════════════════════════════════════════════════════════ */
const RegistrationsTab = ({ token }) => {
  const [items, setItems]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState({});

  useEffect(() => {
    fetch(`${API}/registrations`, { headers: ah(token) })
      .then(r => r.json()).then(d => { if (d.success) setItems(d.data); }).finally(() => setLoading(false));
  }, []);

  const act = async (id, action) => {
    setActing(a => ({ ...a, [id]: action }));
    const res  = await fetch(`${API}/registrations/${id}/${action}`, { method:'PATCH', headers: ah(token) });
    const data = await res.json();
    if (data.success) {
      setItems(p => p.map(r => r._id === id ? { ...r, status: action==='approve'?'Approved':'Rejected' } : r));
      if (action === 'approve' && data.tempPassword)
        alert(`✅ Approved!\n\nTemp password sent to ${data.data.email}:\n${data.tempPassword}\n\n(Email also sent automatically)`);
    } else alert(data.message);
    setActing(a => { const n={...a}; delete n[id]; return n; });
  };

  if (loading) return <Spinner />;
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-primary text-sm">Enrollment Applications</h3>
        <span className="text-xs text-gray-400">{items.length} total · {items.filter(r=>r.status==='Pending').length} pending</span>
      </div>
      {!items.length ? <Empty msg="No registrations yet." /> : (
        <div className="space-y-3">
          {items.map(r => (
            <div key={r._id} className="card p-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="font-bold text-sm text-primary">{r.fullName}</p>
                    <SBadge s={r.status} />
                  </div>
                  <p className="text-xs text-gray-500 truncate">{r.email} · {r.phone}</p>
                  <p className="text-xs text-[#D97706] font-semibold mt-0.5">{r.programmeName}</p>
                  {r.statementOfIntent && <p className="text-xs text-gray-400 mt-1 italic line-clamp-2">"{r.statementOfIntent}"</p>}
                  <p className="text-[11px] text-gray-300 mt-1">{new Date(r.createdAt).toLocaleDateString()}</p>
                </div>
                {r.status === 'Pending' && (
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => act(r._id,'approve')} disabled={!!acting[r._id]}
                      className="btn bg-green-600 text-white text-xs py-1.5 px-3 hover:bg-green-700 disabled:opacity-50">
                      {acting[r._id]==='approve'?'…':'Approve'}
                    </button>
                    <button onClick={() => act(r._id,'reject')} disabled={!!acting[r._id]}
                      className="btn bg-red-500 text-white text-xs py-1.5 px-3 hover:bg-red-600 disabled:opacity-50">
                      {acting[r._id]==='reject'?'…':'Reject'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════
   STUDENTS TAB
══════════════════════════════════════════════════════════════════ */
const StudentsTab = ({ token }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    fetch(`${API}/students`, { headers: ah(token) })
      .then(r => r.json()).then(d => { if (d.success) setStudents(d.data); }).finally(() => setLoading(false));
  }, []);

  const markModule = async (sid, programmeId, moduleLabel) => {
    const res  = await fetch(`${API}/students/${sid}/progress`, { method:'PATCH', headers: ah(token), body: JSON.stringify({ programmeId, moduleLabel }) });
    const data = await res.json();
    if (data.success) setStudents(p => p.map(s => s._id===sid ? { ...s, progress: data.data } : s));
  };

  const issueCert = async (sid, programmeId) => {
    const res  = await fetch(`${API}/students/${sid}/certificate`, { method:'POST', headers: ah(token), body: JSON.stringify({ programmeId }) });
    const data = await res.json();
    if (data.success) {
      alert(`✅ Certificate issued for ${data.certificate.studentName}`);
      setStudents(p => p.map(s => s._id===sid ? { ...s, progress: s.progress.map(pr => pr.programmeId?._id?.toString()===programmeId ? {...pr,certificateIssued:true} : pr) } : s));
    } else alert(data.message);
  };

  if (loading) return <Spinner />;
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-primary text-sm">Enrolled Students</h3>
        <span className="text-xs text-gray-400">{students.length} students</span>
      </div>
      {!students.length ? <Empty msg="No students yet. Approve an enrollment to create a student account." /> : (
        <div className="space-y-3">
          {students.map(s => (
            <div key={s._id} className="card overflow-hidden">
              <button onClick={() => setExpanded(expanded===s._id?null:s._id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50">
                <div>
                  <p className="font-bold text-sm text-primary">{s.name}</p>
                  <p className="text-xs text-gray-400">{s.email} · {s.progress?.length||0} programme(s)</p>
                </div>
                <svg className={`w-4 h-4 text-gray-400 transition-transform ${expanded===s._id?'rotate-180':''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expanded===s._id && s.progress?.map((prog,i) => {
                const pid   = prog.programmeId?._id||prog.programmeId;
                const mods  = prog.programmeId?.syllabus||[];
                return (
                  <div key={i} className="px-4 pb-4 border-t border-gray-100">
                    <div className="flex items-center justify-between mt-3 mb-2">
                      <p className="text-xs font-bold text-[#D97706]">{prog.programmeId?.title||prog.programmeName}</p>
                      <span className="text-xs text-gray-400">{prog.percentComplete||0}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 mb-3">
                      <div className="bg-[#D97706] h-1.5 rounded-full" style={{width:`${prog.percentComplete||0}%`}} />
                    </div>
                    {mods.map(mod => {
                      const done = prog.completedModules?.includes(mod);
                      return (
                        <div key={mod} className="flex items-center justify-between text-xs py-0.5">
                          <span className={done?'text-green-600 font-medium':'text-gray-500'}>{done?'✓ ':'○ '}{mod}</span>
                          {!done && <button onClick={()=>markModule(s._id,pid,mod)} className="text-[10px] text-[#D97706] hover:underline font-semibold">Mark Complete</button>}
                        </div>
                      );
                    })}
                    {prog.percentComplete>=100 && !prog.certificateIssued && (
                      <button onClick={()=>issueCert(s._id,pid)} className="btn bg-green-600 text-white text-xs py-1.5 px-4 hover:bg-green-700 mt-2">Issue Certificate</button>
                    )}
                    {prog.certificateIssued && <p className="text-xs text-green-600 font-semibold mt-2">✓ Certificate Issued</p>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════
   NEWS / EVENTS / DEVOTIONALS TAB
══════════════════════════════════════════════════════════════════ */
const NewsTab = ({ token }) => {
  const [items, setItems]   = useState([]);
  const [loading, setLoading] = useState(true);
  const blank = { title:'', type:'Article', category:'Announcements', author:'Admin', summary:'', content:'', eventDate:'', eventVenue:'', imageUrl:'', published:true };
  const [form, setForm]     = useState(blank);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const load = () => {
    fetch(`${API}/articles`).then(r=>r.json()).then(d=>{ if(d.success) setItems(d.data); }).finally(()=>setLoading(false));
  };
  useEffect(load,[]);

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    let payload = { ...form };
    if (form.imageUrl) {
      payload.featuredImage = form.imageUrl;
    }
    delete payload.imageUrl;

    const res  = await fetch(`${API}/articles`, { method:'POST', headers: ah(token), body: JSON.stringify(payload) });
    const data = await res.json();
    if (data.success) { setItems(p=>[data.data,...p]); setForm(blank); setShowForm(false); }
    else alert(data.message);
    setSaving(false);
  };

  const typeOptions = ['Article','Devotional','Event'];
  const catMap = {
    Article: ['Announcements','Discipleship Insights','Study Notes'],
    Devotional: ['Devotionals'],
    Event: ['Events','Announcements'],
  };

  if (loading) return <Spinner />;
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-primary text-sm">News, Events & Devotionals</h3>
        <button onClick={()=>setShowForm(s=>!s)} className="btn btn-primary text-xs py-1.5 px-4">
          {showForm ? '− Close' : '+ Add New'}
        </button>
      </div>

      {showForm && (
        <div className="card p-5 mb-5">
          <form onSubmit={save} className="space-y-3">
            {/* Type selector */}
            <div className="flex gap-2">
              {typeOptions.map(t => (
                <button key={t} type="button" onClick={()=>setForm(f=>({...f,type:t,category:catMap[t][0]}))}
                  className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${form.type===t?'bg-primary text-white border-primary':'border-gray-200 text-gray-500 hover:border-primary hover:text-primary'}`}>
                  {t}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-primary mb-1">Title</label>
                <input required value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} placeholder="Title"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#D97706]/40" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-primary mb-1">Category</label>
                <select value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs">
                  {catMap[form.type].map(c=><option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-primary mb-1">Author</label>
                <input value={form.author} onChange={e=>setForm(f=>({...f,author:e.target.value}))} placeholder="Author name"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#D97706]/40" />
              </div>
            </div>

            {form.type === 'Event' && (
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-primary mb-1">Event Date</label>
                  <input type="datetime-local" value={form.eventDate} onChange={e=>setForm(f=>({...f,eventDate:e.target.value}))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-primary mb-1">Venue</label>
                  <input value={form.eventVenue} onChange={e=>setForm(f=>({...f,eventVenue:e.target.value}))} placeholder="Location or Online"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#D97706]/40" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-primary mb-1">Summary</label>
              <textarea required value={form.summary} onChange={e=>setForm(f=>({...f,summary:e.target.value}))} rows={2}
                placeholder="Short summary shown in listings..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs resize-none focus:outline-none focus:ring-2 focus:ring-[#D97706]/40" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-primary mb-1">Full Content / Message</label>
              <textarea required value={form.content} onChange={e=>setForm(f=>({...f,content:e.target.value}))} rows={5}
                placeholder="Write the full article, devotional or event details here..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs resize-none focus:outline-none focus:ring-2 focus:ring-[#D97706]/40" />
            </div>

            <MediaInput label="Featured Image (poster / banner)"
              urlVal={form.imageUrl}
              onUrl={v=>setForm(f=>({...f,imageUrl:v}))}
              onFile={f=>setImageFile(f)}
              accept="image/*"
              token={token}
              uploadType="articles"
            />

            <div className="flex items-center gap-2">
              <input type="checkbox" id="pub" checked={form.published} onChange={e=>setForm(f=>({...f,published:e.target.checked}))} className="w-4 h-4 accent-[#D97706]" />
              <label htmlFor="pub" className="text-xs text-gray-600">Publish immediately</label>
            </div>

            <button type="submit" disabled={saving} className="btn btn-primary text-xs py-2 px-5 disabled:opacity-50">
              {saving ? 'Publishing...' : `Publish ${form.type}`}
            </button>
          </form>
        </div>
      )}

      {!items.length ? <Empty msg="No posts yet. Add your first article, event or devotional." /> : (
        <div className="space-y-2">
          {items.map(a => (
            <div key={a._id} className="card p-4 flex items-center gap-4">
              {a.featuredImage && !a.featuredImage.startsWith('/images/articles/default') && (
                <img src={a.featuredImage} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" />
              )}
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <p className="text-sm font-semibold text-primary truncate">{a.title}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${a.type==='Event'?'bg-purple-100 text-purple-700':a.type==='Devotional'?'bg-orange-100 text-orange-700':'bg-[#E6F4F1] text-primary'}`}>{a.type||'Article'}</span>
                  {!a.published && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">Draft</span>}
                </div>
                <p className="text-xs text-gray-400">{a.author} · {new Date(a.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════
   GALLERY TAB
══════════════════════════════════════════════════════════════════ */
const GalleryTab = ({ token }) => {
  const [items, setItems]   = useState([]);
  const [form, setForm]     = useState({ title:'', imageUrl:'', category:'General' });
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetch(`${API}/gallery`).then(r=>r.json()).then(d=>{ if(d.success) setItems(d.data); }); },[]);

  const save = async (e) => {
    e.preventDefault(); setSaving(true);
    const url = form.imageUrl; // already resolved by MediaInput (either pasted URL or uploaded file URL)
    const res  = await fetch(`${API}/gallery`, { method:'POST', headers: ah(token), body: JSON.stringify({...form,imageUrl:url}) });
    const data = await res.json();
    if (data.success) { setItems(p=>[data.data,...p]); setForm({title:'',imageUrl:'',category:'General'}); }
    setSaving(false);
  };

  const del = async (id) => {
    if (!confirm('Delete this image?')) return;
    await fetch(`${API}/gallery/${id}`, { method:'DELETE', headers: ah(token) });
    setItems(p=>p.filter(i=>i._id!==id));
  };

  return (
    <div>
      <h3 className="font-bold text-primary text-sm mb-4">Gallery Management</h3>
      <div className="card p-5 mb-5">
        <h4 className="text-xs font-bold text-primary mb-3">Add Gallery Image</h4>
        <form onSubmit={save} className="space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-primary mb-1">Image Title</label>
              <input required value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} placeholder="e.g. Leadership Summit 2026"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#D97706]/40" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-primary mb-1">Category</label>
              <select value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs">
                {['General','Programmes','Events','Team','Fellowship Meetings','Conferences','Community Outreach','Graduation Days'].map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <MediaInput label="Image" urlVal={form.imageUrl} onUrl={v=>setForm(f=>({...f,imageUrl:v}))} onFile={f=>setImageFile(f)}
            token={token} uploadType="gallery" />
          <button type="submit" disabled={saving} className="btn btn-primary text-xs py-2 px-5 disabled:opacity-50">
            {saving?'Adding...':'Add Image'}
          </button>
        </form>
      </div>
      {!items.length ? <Empty msg="No gallery items yet." /> : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {items.map(img => (
            <div key={img._id} className="relative group rounded-xl overflow-hidden bg-gray-100 aspect-square">
              <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                <p className="text-white text-[11px] font-semibold text-center line-clamp-2">{img.title}</p>
                <button onClick={()=>del(img._id)} className="bg-red-500 text-white text-[10px] px-3 py-1 rounded-full hover:bg-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════
   RESOURCES TAB
══════════════════════════════════════════════════════════════════ */
const ResourcesTab = ({ token }) => {
  const [items, setItems]   = useState([]);
  const blank = { title:'', category:'Devotional', description:'', externalUrl:'', provider:'', format:'External Link' };
  const [form, setForm]     = useState(blank);
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetch(`${API}/resources`).then(r=>r.json()).then(d=>{ if(d.success) setItems(d.data); }); },[]);

  const save = async (e) => {
    e.preventDefault(); setSaving(true);
    const res  = await fetch(`${API}/resources`, { method:'POST', headers: ah(token), body: JSON.stringify(form) });
    const data = await res.json();
    if (data.success) { setItems(p=>[data.data,...p]); setForm(blank); }
    else alert(data.message);
    setSaving(false);
  };

  return (
    <div>
      <h3 className="font-bold text-primary text-sm mb-4">Resource Management</h3>
      <div className="card p-5 mb-5">
        <h4 className="text-xs font-bold text-primary mb-3">Add External Resource</h4>
        <form onSubmit={save} className="grid sm:grid-cols-2 gap-3">
          {[
            {l:'Title',       n:'title',       p:'Resource title'},
            {l:'Provider',    n:'provider',    p:'e.g. Desiring God'},
            {l:'External URL',n:'externalUrl', p:'https://...'},
            {l:'Description', n:'description', p:'Brief description'},
          ].map(({l,n,p})=>(
            <div key={n}>
              <label className="block text-xs font-semibold text-primary mb-1">{l}</label>
              <input value={form[n]} onChange={e=>setForm(f=>({...f,[n]:e.target.value}))} placeholder={p} required
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#D97706]/40" />
            </div>
          ))}
          <div>
            <label className="block text-xs font-semibold text-primary mb-1">Category</label>
            <select value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs">
              {['Devotional','Study Guide','Audio / Video','Reading Plan'].map(c=><option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-primary mb-1">Format</label>
            <select value={form.format} onChange={e=>setForm(f=>({...f,format:e.target.value}))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs">
              {['External Link','PDF','Video','App Plan'].map(f=><option key={f}>{f}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2">
            <button type="submit" disabled={saving} className="btn btn-primary text-xs py-2 px-5 disabled:opacity-50">
              {saving?'Adding...':'Add Resource'}
            </button>
          </div>
        </form>
      </div>
      {!items.length ? <Empty msg="No resources yet." /> : (
        <div className="space-y-2">
          {items.map(r=>(
            <div key={r._id} className="card p-4 flex items-center justify-between gap-4">
              <div className="flex-grow min-w-0">
                <p className="text-sm font-semibold text-primary truncate">{r.title}</p>
                <p className="text-xs text-gray-400">{r.provider} · {r.category}</p>
              </div>
              <a href={r.externalUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] text-[#D97706] hover:underline shrink-0">Open →</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════
   MESSAGES TAB
══════════════════════════════════════════════════════════════════ */
const MessagesTab = ({ token }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    fetch(`${API}/contact`, { headers: ah(token) })
      .then(r=>r.json()).then(d=>{ if(d.success) setMessages(d.data); }).finally(()=>setLoading(false));
  }, []);

  const markRead = async (id) => {
    const res  = await fetch(`${API}/contact/${id}/read`, { method:'PATCH', headers: ah(token) });
    const data = await res.json();
    if (data.success) setMessages(p=>p.map(m=>m._id===id ? {...m,status:'Read'} : m));
  };

  const del = async (id) => {
    if (!confirm('Delete this message?')) return;
    await fetch(`${API}/contact/${id}`, { method:'DELETE', headers: ah(token) });
    setMessages(p=>p.filter(m=>m._id!==id));
  };

  const unread = messages.filter(m=>m.status==='New').length;
  if (loading) return <Spinner />;
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-primary text-sm">Inbox</h3>
        <span className="text-xs text-gray-400">{messages.length} total{unread>0 && ` · `}{unread>0 && <span className="text-blue-600 font-bold">{unread} unread</span>}</span>
      </div>
      {!messages.length ? <Empty msg="No messages yet." /> : (
        <div className="space-y-3">
          {messages.map(m=>(
            <div key={m._id} className={`card overflow-hidden border-l-4 ${m.status==='New'?'border-l-blue-500':'border-l-transparent'}`}>
              <button onClick={()=>setExpanded(expanded===m._id?null:m._id)}
                className="w-full flex items-start justify-between p-4 text-left hover:bg-gray-50">
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-sm text-primary">{m.fullName}</p>
                    <SBadge s={m.status} />
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{m.email}{m.phone && ` · ${m.phone}`}</p>
                  <p className="text-xs text-[#D97706] font-semibold mt-0.5">{m.subject}</p>
                  <p className="text-[11px] text-gray-300 mt-0.5">{new Date(m.createdAt).toLocaleDateString()}</p>
                </div>
                <svg className={`w-4 h-4 text-gray-400 shrink-0 mt-1 transition-transform ${expanded===m._id?'rotate-180':''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expanded===m._id && (
                <div className="px-4 pb-4 border-t border-gray-100">
                  <p className="text-sm text-gray-700 leading-relaxed mt-3 whitespace-pre-wrap">{m.message}</p>
                  <div className="flex gap-2 mt-3">
                    {m.status==='New' && (
                      <button onClick={()=>markRead(m._id)} className="btn bg-blue-600 text-white text-xs py-1.5 px-3 hover:bg-blue-700">Mark as Read</button>
                    )}
                    <a href={`mailto:${m.email}?subject=Re: ${m.subject}`} className="btn bg-[#E6F4F1] text-primary text-xs py-1.5 px-3 hover:bg-[#C7E8E2]">Reply by Email</a>
                    <button onClick={()=>del(m._id)} className="btn bg-red-50 text-red-600 text-xs py-1.5 px-3 hover:bg-red-100">Delete</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ── Shared helpers ── */
const Spinner = () => (
  <div className="py-10 text-center"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" /></div>
);
const Empty = ({ msg }) => (
  <div className="card p-8 text-center text-gray-400 text-sm">{msg}</div>
);

/* ══════════════════════════════════════════════════════════════════
   MAIN DASHBOARD
══════════════════════════════════════════════════════════════════ */
const TABS = [
  { id:'Registrations', label:'Registrations', icon:'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  { id:'Students',      label:'Students',      icon:'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  { id:'News',          label:'News & Events', icon:'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
  { id:'Gallery',       label:'Gallery',       icon:'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { id:'Resources',     label:'Resources',     icon:'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  { id:'Messages',      label:'Messages',      icon:'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
];

const AdminDashboard = () => {
  const { user, token, logout } = useAuth();
  const [tab, setTab] = useState('Registrations');

  return (
    <div className="min-h-screen bg-[#FAF9F5]">

      {/* ── Top bar ── */}
      <div className="bg-primary text-white">
        <div className="container-custom px-4 py-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-white text-base md:text-lg font-bold leading-tight">{greeting(user?.name?.split(' ')[0])}</h2>
            <p className="text-white/55 text-xs mt-0.5 hidden sm:block">
              Melchizedek Beams Ltd Admin Panel · {user?.email}
            </p>
          </div>
          <button
            onClick={logout}
            className="btn text-xs py-2 px-4 border-2 border-white/30 text-white hover:bg-[#D97706] hover:border-[#D97706] transition-all whitespace-nowrap"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* ── Welcome Hero ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom px-4 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-[#D97706] text-[10px] font-bold uppercase tracking-widest mb-0.5">Admin Dashboard</p>
              <p className="text-primary text-sm font-semibold">
                Manage enrollments, students, content and communications — all in one place.
              </p>
            </div>
            {/* Quick stats pills */}
            <div className="flex flex-wrap gap-2 text-[11px]">
              {[
                { label:'Programmes', val:'6', bg:'bg-[#E6F4F1] text-primary' },
                { label:'Admin',      val:'1', bg:'bg-[#D97706]/10 text-[#B45309]' },
              ].map(({label,val,bg})=>(
                <span key={label} className={`${bg} px-3 py-1 rounded-full font-bold`}>{val} {label}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Tab bar ── */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40 overflow-x-auto">
        <div className="container-custom px-4">
          <div className="flex gap-0.5 py-2 min-w-max">
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                  tab===t.id ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-100 hover:text-primary'
                }`}>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={t.icon} />
                </svg>
                <span className="hidden sm:inline">{t.label}</span>
                <span className="sm:hidden">{t.id}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="container-custom px-4 py-6">
        {tab==='Registrations' && <RegistrationsTab token={token} />}
        {tab==='Students'      && <StudentsTab token={token} />}
        {tab==='News'          && <NewsTab token={token} />}
        {tab==='Gallery'       && <GalleryTab token={token} />}
        {tab==='Resources'     && <ResourcesTab token={token} />}
        {tab==='Messages'      && <MessagesTab token={token} />}
      </div>
    </div>
  );
};

export default AdminDashboard;
