
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Admin from './pages/Admin';
import Login from './pages/Login';
import { fetchSiteData } from './services/apiService';
import { SiteData } from './types';

// Meta Pixel Component
const MetaPixel = ({ pixelId }: { pixelId?: string }) => {
  useEffect(() => {
    if (!pixelId) return;

    // Standard Pixel Initialization
    // Fix: Using any for window to avoid Property existence and void check errors on standard snippet
    const f = window as any;
    const b = document;
    const e = 'script';
    const v = 'https://connect.facebook.net/en_US/fbevents.js';

    // Fix Error: An expression of type 'void' cannot be tested for truthiness.
    // This happens when fbq is inferred from a global type that returns void.
    if (f.fbq) return;

    const n: any = f.fbq = function () {
      // Fix: Property 'fbq' does not exist on type 'Window'.
      // Use any to allow access to dynamic properties added by the script.
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    
    // Fix: Property '_fbq' does not exist on type 'Window'.
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    
    const t = b.createElement(e) as HTMLScriptElement;
    t.async = !0;
    t.src = v;
    const s = b.getElementsByTagName(e)[0];
    if (s && s.parentNode) {
      s.parentNode.insertBefore(t, s);
    }

    f.fbq('init', pixelId);
    f.fbq('track', 'PageView');
  }, [pixelId]);

  return null;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    // Track PageView on route change if pixel is loaded
    if ((window as any).fbq) {
      (window as any).fbq('track', 'PageView');
    }
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [siteData, setSiteData] = useState<SiteData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const data = await fetchSiteData();
      setSiteData(data);
    } catch (error) {
      console.error("Failed to load site data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center font-bold text-xs tracking-widest uppercase opacity-50 text-indigo-900">
            KA
          </div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <MetaPixel pixelId={siteData?.tracking?.pixelId} />
      <div className="min-h-screen flex flex-col selection:bg-indigo-600 selection:text-white bg-white text-zinc-900">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home data={siteData} />} />
            <Route path="/portfolio" element={<Portfolio projects={siteData?.projects || []} />} />
            <Route path="/services" element={<Services services={siteData?.services || []} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
