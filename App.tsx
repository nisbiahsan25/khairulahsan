
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

const MetaPixel = ({ pixelId }: { pixelId?: string }) => {
  useEffect(() => {
    if (!pixelId) return;
    const f = window as any;
    const b = document;
    if (f.fbq) return;
    const n: any = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
    const t = b.createElement('script') as HTMLScriptElement;
    t.async = !0; t.src = 'https://connect.facebook.net/en_US/fbevents.js';
    const s = b.getElementsByTagName('script')[0];
    if (s && s.parentNode) s.parentNode.insertBefore(t, s);
    f.fbq('init', pixelId);
    f.fbq('track', 'PageView');
  }, [pixelId]);
  return null;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  // Start with null to prevent demo data flicker. 
  // We only fill this from cache if it exists, ensuring 0-second load of REAL data.
  const [siteData, setSiteData] = useState<SiteData | null>(() => {
    try {
      const cached = localStorage.getItem('khairulahsan_site_data_cache');
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });

  const loadData = useCallback(async () => {
    const data = await fetchSiteData();
    setSiteData(data);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

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
            <Route path="/blog" element={<Blog blogs={siteData?.blogs || []} />} />
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
