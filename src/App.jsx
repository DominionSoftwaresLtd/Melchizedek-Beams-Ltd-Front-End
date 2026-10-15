import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ScrollToTop from './components/common/ScrollToTop';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Public pages
import Home        from './pages/Home';
import About       from './pages/About';
import Programmes  from './pages/Programmes';
import Gallery     from './pages/Gallery';
import News        from './pages/News';
import ArticleDetail from './pages/ArticleDetail';
import Donate      from './pages/Donate';
import Resources   from './pages/Resources';

// Auth pages
import SignIn          from './pages/auth/SignIn';
import ForgotPassword  from './pages/auth/ForgotPassword';
import StudentDashboard from './pages/student/StudentDashboard';

// Admin pages
import AdminLogin     from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

// Route guards
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  if (!user) return <Navigate to="/signin" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
};

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            {/* Public */}
            <Route path="/"            element={<Home />} />
            <Route path="/about"       element={<About />} />
            <Route path="/programmes"  element={<Programmes />} />
            <Route path="/gallery"     element={<Gallery />} />
            <Route path="/news"        element={<News />} />
            <Route path="/news/:slug"  element={<ArticleDetail />} />
            <Route path="/donate"      element={<Donate />} />
            <Route path="/resources"   element={<Resources />} />

            {/* Auth */}
            <Route path="/signin"          element={<SignIn />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/admin/login"     element={<AdminLogin />} />

            {/* Student portal */}
            <Route path="/dashboard" element={
              <ProtectedRoute allowedRoles={['student', 'admin']}>
                <StudentDashboard />
              </ProtectedRoute>
            } />

            {/* Admin portal */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
