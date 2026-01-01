
import React, { useState, useEffect, useCallback } from 'react';
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

    const f = window as any;
    const b = document;
    const e = 'script';
    const v = 'https://connect.facebook.net/en_US/fbevents.js';

    if (f.fbq) return;

    const n: any = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    
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
    if ((window as any).fbq) {
      (window as any).fbq('track', 'PageView');
    }
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [siteData, setSiteData] = useState<SiteData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const data = await fetchSiteData();
      setSiteData(data);
    } catch (error) {
      console.error("Failed to load site data", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-zinc-950 flex items-center justify-center">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-4 border-zinc-100 dark:border-zinc-800 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <MetaPixel pixelId={siteData?.tracking?.pixelId} />
      <div className="min-h-screen flex flex-col selection:bg-indigo-600 selection:text-white bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home data={siteData} />} />
            <Route path="/portfolio" element={<Portfolio projects={siteData?.projects || []} categories={siteData?.categories || []} />} />
            <Route path="/services" element={<Services services={siteData?.services || []} />} />
            <Route path="/about" element={<About data={siteData} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin onSaveSuccess={loadData} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
