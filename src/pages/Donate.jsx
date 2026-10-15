import { useState } from 'react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const AMOUNTS = [100, 500, 1000, 2500, 5000];
const CAUSES  = ['General Ministry', 'Discipleship Materials', 'Mission Outreaches', 'Other'];

const Donate = () => {
  const [form, setForm] = useState({
    donorName: '', email: '', phone: '', amount: '', cause: 'General Ministry', anonymous: false,
  });
  const [customAmount, setCustomAmount] = useState(false);
  const [step, setStep]   = useState('form');   // form | pending | confirm | done | error
  const [donationId, setDonationId] = useState('');
  const [txCode, setTxCode] = useState('');
  const [resultMsg, setResultMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState('');

  const handle = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const selectAmount = (amt) => {
    setCustomAmount(false);
    setForm((f) => ({ ...f, amount: amt }));
  };

  /* Step 1: initiate STK push */
  const initiate = async (e) => {
    e.preventDefault();
    if (!form.amount || Number(form.amount) < 1)
      return setError('Please enter or select a donation amount.');
    setLoading(true); setError('');
    try {
      const res  = await fetch(`${API}/donations/initiate`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, amount: Number(form.amount) }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setDonationId(data.donationId);
      setResultMsg(data.message);
      setStep('pending');
    } catch (err) {
      setError(err.message || 'Could not initiate payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /* Step 2: confirm (user enters M-Pesa code after phone prompt) */
  const confirm = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res  = await fetch(`${API}/donations/confirm`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ donationId, transactionCode: txCode }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setStep('done');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5]">

      {/* Hero */}
      <section className="bg-primary py-12 text-white">
        <div className="container-custom text-center max-w-2xl mx-auto">
          <span className="inline-block bg-[#D97706]/20 text-[#D97706] text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">Give</span>
          <h1 className="text-white text-3xl md:text-4xl mb-3">Support Our Ministry</h1>
          <p className="text-white/70 text-sm leading-relaxed">
            Your generosity directly funds discipleship programmes, ministry materials and outreaches
            that equip believers for kingdom impact.
          </p>
        </div>
      </section>

      <div className="container-custom py-10 px-4">
        <div className="max-w-lg mx-auto">

          {/* Test credentials banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-6 text-xs text-amber-800">
            <p className="font-bold mb-1">🧪 M-Pesa Test Mode</p>
            <p>Use phone <span className="font-mono font-bold">0798398350</span> to simulate payment.</p>
            <p>Any M-Pesa code (e.g. <span className="font-mono font-bold">QK4ABC12DE</span>) can be entered to confirm.</p>
          </div>

          {/* ── FORM ── */}
          {step === 'form' && (
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
              <h3 className="text-base font-bold text-primary mb-5">Donation Details</h3>

              {error && <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 text-red-700 text-sm mb-4">{error}</div>}

              <form onSubmit={initiate} className="space-y-4">
                {/* Amount selector */}
                <div>
                  <label className="block text-xs font-semibold text-primary mb-2">Amount (KES)</label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-2">
                    {AMOUNTS.map((a) => (
                      <button key={a} type="button" onClick={() => selectAmount(a)}
                        className={`py-2 rounded-lg text-xs font-bold border transition-colors ${
                          form.amount === a && !customAmount
                            ? 'bg-primary text-white border-primary'
                            : 'border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
                        }`}>
                        {a.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <div>
                    <button type="button" onClick={() => { setCustomAmount(true); setForm(f => ({...f, amount: ''})); }}
                      className={`text-xs font-semibold mb-1.5 ${customAmount ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}>
                      + Custom amount
                    </button>
                    {customAmount && (
                      <input type="number" name="amount" value={form.amount} onChange={handle}
                        placeholder="Enter amount in KES" min={10}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706]/40 focus:border-[#D97706]" />
                    )}
                  </div>
                </div>

                {/* Cause */}
                <div>
                  <label className="block text-xs font-semibold text-primary mb-1">Giving Towards</label>
                  <select name="cause" value={form.cause} onChange={handle}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                    {CAUSES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>

                {/* Anonymous toggle */}
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="anon" name="anonymous" checked={form.anonymous} onChange={handle}
                    className="w-4 h-4 accent-[#D97706]" />
                  <label htmlFor="anon" className="text-xs text-gray-600">Give anonymously</label>
                </div>

                {/* Donor details */}
                {!form.anonymous && (
                  <>
                    {[
                      { label: 'Full Name',     name: 'donorName', type: 'text',  placeholder: 'Your name' },
                      { label: 'Email (for receipt)', name: 'email', type: 'email', placeholder: 'your@email.com' },
                    ].map(({ label, name, type, placeholder }) => (
                      <div key={name}>
                        <label className="block text-xs font-semibold text-primary mb-1">{label}</label>
                        <input type={type} name={name} value={form[name]} onChange={handle} placeholder={placeholder}
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706]/40 focus:border-[#D97706]" />
                      </div>
                    ))}
                  </>
                )}

                {/* Phone — always needed for M-Pesa */}
                <div>
                  <label className="block text-xs font-semibold text-primary mb-1">M-Pesa Phone Number</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handle} required
                    placeholder="07XX XXX XXX"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706]/40 focus:border-[#D97706]" />
                  <p className="text-[11px] text-gray-400 mt-1">An STK push will be sent to this number.</p>
                </div>

                <button type="submit" disabled={loading}
                  className="btn btn-primary w-full text-sm py-3 disabled:opacity-50 justify-center">
                  {loading ? 'Processing...' : `Donate KES ${Number(form.amount || 0).toLocaleString()}`}
                </button>
              </form>
            </div>
          )}

          {/* ── PENDING: waiting for M-Pesa prompt ── */}
          {step === 'pending' && (
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[#E6F4F1] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="font-bold text-primary mb-1">Check Your Phone</h4>
                <p className="text-gray-500 text-sm">{resultMsg}</p>
                <p className="text-gray-400 text-xs mt-2">
                  Enter your M-Pesa PIN when prompted on <strong>{form.phone}</strong>.
                  Then enter the transaction code below.
                </p>
              </div>

              {error && <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 text-red-700 text-sm mb-4">{error}</div>}

              <form onSubmit={confirm} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-primary mb-1">M-Pesa Transaction Code</label>
                  <input type="text" value={txCode} onChange={(e) => setTxCode(e.target.value.toUpperCase())} required
                    placeholder="e.g. QK4ABC12DE"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-[#D97706]/40 focus:border-[#D97706]" />
                </div>
                <button type="submit" disabled={loading} className="btn btn-primary w-full text-sm py-3 disabled:opacity-50 justify-center">
                  {loading ? 'Confirming...' : 'Confirm Payment'}
                </button>
                <button type="button" onClick={() => setStep('form')} className="text-xs text-gray-400 hover:text-primary w-full text-center">
                  ← Try again
                </button>
              </form>
            </div>
          )}

          {/* ── DONE ── */}
          {step === 'done' && (
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-bold text-primary text-xl mb-2">Thank You!</h3>
              <p className="text-gray-500 text-sm mb-1">Your donation has been received.</p>
              <p className="text-gray-500 text-sm mb-5">A thank-you receipt has been sent to <strong>{form.email || 'your email'}</strong>.</p>
              <p className="text-primary text-xs italic mb-6">"Each of you should give what you have decided in your heart to give, for God loves a cheerful giver." — 2 Corinthians 9:7</p>
              <button onClick={() => { setStep('form'); setForm({ donorName:'', email:'', phone:'', amount:'', cause:'General Ministry', anonymous:false }); }}
                className="btn btn-primary text-sm px-8 py-2.5 w-full sm:w-auto justify-center">
                Give Again
              </button>
            </div>
          )}

          {/* Scripture */}
          {step === 'form' && (
            <p className="text-center text-gray-400 text-xs mt-5 italic">
              "Each of you should give what you have decided in your heart to give, for God loves a cheerful giver." — 2 Corinthians 9:7
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Donate;
