import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home',       path: '/' },
    { name: 'About',      path: '/about' },
    { name: 'Programmes', path: '/programmes' },
    { name: 'Gallery',    path: '/gallery' },
    { name: 'News',       path: '/news' },
    { name: 'Resources',  path: '/resources' },
    { name: 'Donate',     path: '/donate' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-[72px]">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-black tracking-tight">MB</span>
            </div>
            <div>
              <p className="text-primary font-bold text-sm leading-tight">Melchizedek Beams</p>
              <p className="text-[#D97706] text-[11px] font-semibold leading-tight">Equipping Believers</p>
            </div>
          </Link>

          {/* ── Desktop nav (center) ── */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-colors ${
                  isActive(item.path)
                    ? 'bg-[#E6F4F1] text-primary'
                    : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* ── CTA (right) ── */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/programmes"
              className="btn btn-primary text-sm py-2 px-5"
            >
              Join a Cohort
            </Link>
          </div>

          {/* ── Mobile toggle ── */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen
                ? <path d="M6 18L18 6M6 6l12 12" />
                : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {/* ── Mobile menu ── */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-3">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    isActive(item.path)
                      ? 'bg-[#E6F4F1] text-primary'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2">
                <Link
                  to="/programmes"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn btn-primary text-sm w-full"
                >
                  Join a Cohort
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
