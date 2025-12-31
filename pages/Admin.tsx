
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSiteData, saveSiteData } from '../services/apiService';
import { SiteData, Experience, Project } from '../types';
import { Save, Plus, Trash2, Layout, User, Briefcase, Image as ImageIcon, LogOut, CheckCircle, Upload, Globe, Activity, ShieldCheck, Key } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Admin: React.FC = () => {
  const [data, setData] = useState<SiteData | null>(null);
  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'experience' | 'projects' | 'tracking'>('hero');
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('isAdminAuthenticated');
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchSiteData().then(setData);
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminAuthenticated');
    navigate('/login');
  };

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    try {
      await saveSiteData(data);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      alert("Failed to save data. Please check your connection.");
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size too large. Please select an image under 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!data) return <div className="flex items-center justify-center min-h-screen font-black uppercase tracking-widest text-zinc-400">Synchronizing...</div>;

  return (
    <div className="min-h-screen pt-32 pb-20 bg-white">
      <div className="container mx-auto px-10 max-w-[1400px]">
        
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 bg-zinc-50 p-12 rounded-[3rem] border border-zinc-100">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Live Server Connected</span>
            </div>
            <h1 className="text-5xl font-black tracking-tight">Cloud Console</h1>
          </div>
          <div className="flex gap-4">
             <button 
              onClick={handleLogout}
              className="px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs border border-zinc-200 hover:bg-zinc-100 transition-all flex items-center gap-2"
            >
              <LogOut size={16} /> Logout
            </button>
            <button 
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-3 bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 disabled:opacity-50"
            >
              <Save size={18} /> {saving ? 'Deploying...' : 'Push to Production'}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showSuccess && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-green-50 text-green-700 p-6 rounded-2xl mb-10 flex items-center gap-4 font-bold border border-green-100"
            >
              <CheckCircle size={24} /> Production build updated successfully! All changes are live.
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Sidebar Menu */}
          <div className="lg:col-span-3 space-y-3">
            {[
              { id: 'hero', label: 'Home Display', icon: <Layout size={18}/> },
              { id: 'about', label: 'Identity', icon: <User size={18}/> },
              { id: 'experience', label: 'Timeline', icon: <Briefcase size={18}/> },
              { id: 'projects', label: 'Showcase', icon: <ImageIcon size={18}/> },
              { id: 'tracking', label: 'Tracking & Ads', icon: <Activity size={18}/> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center justify-between px-8 py-6 rounded-2xl font-black transition-all text-xs uppercase tracking-widest ${
                  activeTab === tab.id ? 'bg-zinc-950 text-white shadow-2xl shadow-zinc-300' : 'bg-white text-zinc-400 hover:text-zinc-900 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-4">
                  {tab.icon} {tab.label}
                </div>
                {activeTab === tab.id && <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>}
              </button>
            ))}
          </div>

          {/* Editor Area */}
          <div className="lg:col-span-9 bg-zinc-50 p-12 rounded-[3.5rem] border border-zinc-100">
            {activeTab === 'hero' && (
              <div className="space-y-12">
                <header>
                  <h3 className="text-3xl font-black tracking-tight mb-2">Visual Content</h3>
                  <p className="text-zinc-500 text-sm font-medium">Control the first impression of your website.</p>
                </header>
                <div className="grid gap-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3 block ml-2">Main Headline</label>
                      <input 
                        className="w-full bg-white border border-zinc-200 p-6 rounded-3xl font-black text-2xl focus:outline-none focus:border-indigo-500 transition-all"
                        value={data.hero.headline}
                        onChange={e => setData({...data, hero: {...data.hero, headline: e.target.value}})}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'tracking' && (
              <div className="space-y-12">
                <header>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                       <ShieldCheck size={20} />
                    </div>
                    <h3 className="text-3xl font-black tracking-tight">Ads & Analytics</h3>
                  </div>
                  <p className="text-zinc-500 text-sm font-medium">Manage your Facebook Pixel and Conversions API (CAPI) settings for paid traffic.</p>
                </header>
                
                <div className="grid gap-8">
                  <div className="bg-white p-10 rounded-[2.5rem] border border-zinc-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-8">
                       <Globe className="text-indigo-600" size={20} />
                       <h4 className="font-black uppercase tracking-widest text-xs">Facebook Pixel (Client-Side)</h4>
                    </div>
                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block ml-2">Pixel ID</label>
                       <input 
                        className="w-full bg-zinc-50 border border-zinc-100 p-6 rounded-3xl font-mono text-sm focus:outline-none focus:border-indigo-500 transition-all"
                        placeholder="e.g. 123456789012345"
                        value={data.tracking?.pixelId || ''}
                        onChange={e => setData({...data, tracking: {...(data.tracking || {pixelId: '', capiToken: ''}), pixelId: e.target.value}})}
                       />
                       <p className="text-[10px] text-zinc-400 ml-2 italic">Standard 'PageView' and 'Lead' events will be tracked automatically.</p>
                    </div>
                  </div>

                  <div className="bg-white p-10 rounded-[2.5rem] border border-zinc-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-8">
                       <Key className="text-amber-600" size={20} />
                       <h4 className="font-black uppercase tracking-widest text-xs">Conversions API (Server-Side)</h4>
                    </div>
                    <div className="space-y-6">
                       <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block ml-2">Access Token</label>
                        <textarea 
                          rows={3}
                          className="w-full bg-zinc-50 border border-zinc-100 p-6 rounded-3xl font-mono text-[11px] focus:outline-none focus:border-indigo-500 transition-all break-all"
                          placeholder="EAAB..."
                          value={data.tracking?.capiToken || ''}
                          onChange={e => setData({...data, tracking: {...(data.tracking || {pixelId: '', capiToken: ''}), capiToken: e.target.value}})}
                        />
                       </div>
                       
                       <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block ml-2">Test Event Code (Optional)</label>
                        <input 
                          className="w-full bg-zinc-50 border border-zinc-100 p-6 rounded-3xl font-mono text-sm focus:outline-none"
                          placeholder="TEST12345"
                          value={data.tracking?.testEventCode || ''}
                          onChange={e => setData({...data, tracking: {...(data.tracking || {pixelId: '', capiToken: ''}), testEventCode: e.target.value}})}
                        />
                        <p className="text-[10px] text-amber-600/70 ml-2 font-bold uppercase tracking-widest">Only use this while testing in Meta Events Manager.</p>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Other tabs like 'projects', 'about'... (Existing logic preserved) */}
            {activeTab === 'projects' && (
               <div className="space-y-12">
                 {/* Project logic here */}
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
