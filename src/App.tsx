import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import BackgroundEffects from "./components/BackgroundEffects";
import ChatAssistant from "./components/ChatAssistant";
import ScrollProgress from "./components/ScrollProgress";
import { useSectionTracking } from "./hooks/useSectionTracking";
import { UserAuthProvider } from "./contexts/UserAuthContext";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

function AppContent() {
  useSectionTracking();
  const location = useLocation();
  const isProfilePage = location.pathname.startsWith('/profile');

  return (
    <div className="relative min-h-screen bg-brand-black text-brand-gray-100 overflow-x-hidden selection:bg-brand-white selection:text-brand-black">
      {/* Scroll Progress Bar */}
      {!isProfilePage && <ScrollProgress />}
      
      {/* Premium Background Shader, Grid & Noise */}
      <BackgroundEffects />

      {/* Main Page Content Wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Sticky Header Navigation */}
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* Footer */}
        {!isProfilePage && <Footer />}
        
        {/* Persistent Floating AI Chat Assistant */}
        {!isProfilePage && <ChatAssistant />}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <UserAuthProvider>
      <Router>
        <AppContent />
      </Router>
    </UserAuthProvider>
  );
}

