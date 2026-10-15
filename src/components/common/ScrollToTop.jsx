import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Scrolls to top on every route change — no more hunting for content after navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

export default ScrollToTop;
