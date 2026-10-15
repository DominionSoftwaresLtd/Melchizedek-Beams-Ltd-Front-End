import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navigation = [
    { name: 'Home',       path: '/' },
    { name: 'About',      path: '/about' },
    { name: 'Programmes', path: '/programmes' },
    { name: 'Gallery',    path: '/gallery' },
    { name: 'News',       path: '/news' },
    { name: 'Resources',  path: '/resources' },
    { name: 'Donate',     path: '/donate' },
  ];

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-black tracking-tight">MB</span>
            </div>
            {/* Always visible — not hidden on mobile */}
            <div>
              <p className="text-primary font-bold text-sm leading-tight">Melchizedek Beams</p>
              <p className="text-[#D97706] text-[10px] font-semibold leading-tight">Equipping Believers</p>
            </div>
          </Link>

          {/* ── Desktop nav ── */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-1.5 rounded-md text-[13px] font-semibold transition-colors ${
                  isActive(item.path)
                    ? 'bg-[#E6F4F1] text-primary'
                    : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* ── Right CTAs ── */}
          <div className="hidden lg:flex items-center gap-2">
            {user ? (
              /* Logged-in user menu */
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-primary transition-colors text-sm font-semibold text-primary"
                >
                  <div className="w-7 h-7 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[120px] truncate">{user.name}</span>
                  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-1 w-44 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
                    {user.role === 'admin' ? (
                      <Link to="/admin/dashboard" onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" /></svg>
                        Admin Dashboard
                      </Link>
                    ) : (
                      <Link to="/dashboard" onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        My Dashboard
                      </Link>
                    )}
                    <button onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 border-t border-gray-100">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/signin" className="btn btn-teal py-2 px-4 text-sm border border-[#C7E8E2]">
                  Sign In
                </Link>
                <Link to="/programmes" className="btn btn-primary py-2 px-4 text-sm">
                  Join a Cohort
                </Link>
              </>
            )}
          </div>

          {/* ── Mobile toggle ── */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {/* ── Mobile menu ── */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-3">
            <div className="flex flex-col gap-0.5">
              {navigation.map((item) => (
                <Link key={item.name} to={item.path} onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive(item.path) ? 'bg-[#E6F4F1] text-primary' : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                  }`}>
                  {item.name}
                </Link>
              ))}
              <div className="pt-2 flex flex-col gap-2">
                {user ? (
                  <>
                    <Link to={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                      onClick={() => setIsMenuOpen(false)} className="btn btn-secondary text-sm w-full">
                      {user.role === 'admin' ? 'Admin Dashboard' : 'My Dashboard'}
                    </Link>
                    <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="btn btn-outline text-sm w-full text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300">Sign Out</button>
                  </>
                ) : (
                  <>
                    <Link to="/signin" onClick={() => setIsMenuOpen(false)} className="btn btn-teal border border-[#C7E8E2] text-sm w-full">Sign In</Link>
                    <Link to="/programmes" onClick={() => setIsMenuOpen(false)} className="btn btn-primary text-sm w-full">Join a Cohort</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
