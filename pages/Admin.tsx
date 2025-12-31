
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSiteData, saveSiteData } from '../services/apiService';
import { SiteData, Experience, Project, Service } from '../types';
import { Save, Plus, Trash2, Layout, User, Briefcase, Image as ImageIcon, LogOut, CheckCircle, Upload, Link as LinkIcon, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Admin: React.FC = () => {
  const [data, setData] = useState<SiteData | null>(null);
  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'experience' | 'projects'>('hero');
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
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3 block ml-2">Intro Phrase</label>
                      <input 
                        className="w-full bg-white border border-zinc-200 p-6 rounded-3xl font-bold focus:outline-none focus:border-indigo-500 transition-all"
                        value={data.hero.subheadline}
                        onChange={e => setData({...data, hero: {...data.hero, subheadline: e.target.value}})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3 block ml-2">Master Image</label>
                    <div className="flex flex-col gap-4">
                      <div className="flex gap-4">
                        <input 
                          className="flex-grow bg-white border border-zinc-200 p-6 rounded-3xl font-medium focus:outline-none"
                          placeholder="Image URL"
                          value={data.hero.image}
                          onChange={e => setData({...data, hero: {...data.hero, image: e.target.value}})}
                        />
                        <label className="cursor-pointer shrink-0 w-20 h-20 bg-indigo-600 text-white rounded-2xl flex items-center justify-center hover:bg-indigo-700 transition-colors">
                          <Upload size={24} />
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, (base64) => setData({...data, hero: {...data.hero, image: base64}}))}
                          />
                        </label>
                        <div className="w-20 h-20 rounded-2xl bg-white border border-zinc-200 overflow-hidden shrink-0">
                           <img src={data.hero.image} alt="preview" className="w-full h-full object-cover" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="space-y-12">
                <header>
                  <h3 className="text-3xl font-black tracking-tight mb-2">Identity Details</h3>
                  <p className="text-zinc-500 text-sm font-medium">Describe your mission and professional values.</p>
                </header>
                <div className="grid gap-8">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3 block ml-2">Bio Description</label>
                    <textarea 
                      rows={6}
                      className="w-full bg-white border border-zinc-200 p-8 rounded-[2.5rem] font-medium leading-relaxed focus:outline-none focus:border-indigo-500"
                      value={data.about.description}
                      onChange={e => setData({...data, about: {...data.about, description: e.target.value}})}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3 block ml-2">Engagement Proof (%)</label>
                      <input 
                        className="w-full bg-white border border-zinc-200 p-6 rounded-3xl font-black text-3xl text-indigo-600 focus:outline-none"
                        value={data.about.engagementStat}
                        onChange={e => setData({...data, about: {...data.about, engagementStat: e.target.value}})}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'experience' && (
              <div className="space-y-12">
                <div className="flex justify-between items-center border-b border-zinc-200 pb-8">
                  <div>
                    <h3 className="text-3xl font-black tracking-tight mb-2">Professional Journey</h3>
                    <p className="text-zinc-500 text-sm font-medium">Add or remove career milestones.</p>
                  </div>
                  <button 
                    onClick={() => {
                      const newExp: Experience = { id: Date.now().toString(), company: 'Studio Name', date: '2024 - Present', role: 'Design Lead', tags: ['Fullstack'] };
                      setData({...data, experiences: [newExp, ...data.experiences]});
                    }}
                    className="flex items-center gap-3 bg-zinc-950 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-600 transition-all"
                  >
                    <Plus size={14}/> Add New Entry
                  </button>
                </div>
                <div className="space-y-6">
                  {data.experiences.map((exp, idx) => (
                    <div key={exp.id} className="p-10 bg-white rounded-[2.5rem] border border-zinc-100 shadow-sm relative group">
                      <button 
                        onClick={() => {
                          const updated = data.experiences.filter(e => e.id !== exp.id);
                          setData({...data, experiences: updated});
                        }}
                        className="absolute top-10 right-10 w-10 h-10 rounded-full border border-zinc-100 flex items-center justify-center text-zinc-300 hover:text-red-500 hover:bg-red-50 transition-all"
                      >
                        <Trash2 size={16}/>
                      </button>
                      <div className="grid md:grid-cols-2 gap-8 mb-6">
                        <input 
                          placeholder="Company Name"
                          className="bg-transparent font-black text-xl focus:outline-none border-b border-zinc-100 py-2"
                          value={exp.company}
                          onChange={e => {
                            const updated = [...data.experiences];
                            updated[idx].company = e.target.value;
                            setData({...data, experiences: updated});
                          }}
                        />
                        <input 
                          placeholder="Time Period"
                          className="bg-transparent font-bold text-zinc-400 focus:outline-none border-b border-zinc-100 py-2"
                          value={exp.date}
                          onChange={e => {
                            const updated = [...data.experiences];
                            updated[idx].date = e.target.value;
                            setData({...data, experiences: updated});
                          }}
                        />
                      </div>
                      <input 
                        placeholder="Job Role / Description"
                        className="w-full bg-transparent font-medium text-zinc-600 focus:outline-none border-b border-zinc-100 py-2"
                        value={exp.role}
                        onChange={e => {
                          const updated = [...data.experiences];
                          updated[idx].role = e.target.value;
                          setData({...data, experiences: updated});
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-12">
                <div className="flex justify-between items-center border-b border-zinc-200 pb-8">
                  <div>
                    <h3 className="text-3xl font-black tracking-tight mb-2">Global Portfolio</h3>
                    <p className="text-zinc-500 text-sm font-medium">Manage your featured projects and case studies.</p>
                  </div>
                  <button 
                    onClick={() => {
                      const newProj: Project = { id: Date.now().toString(), title: 'Project Title', category: 'E-commerce', image: '', techStack: ['React'], liveLink: '#' };
                      setData({...data, projects: [newProj, ...data.projects]});
                    }}
                    className="flex items-center gap-3 bg-zinc-950 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-600 transition-all"
                  >
                    <Plus size={14}/> Add New Project
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  {data.projects.map((proj, idx) => (
                    <div key={proj.id} className="p-8 bg-white rounded-[3rem] border border-zinc-100 shadow-sm flex flex-col">
                      <div className="aspect-video bg-zinc-50 rounded-[2rem] mb-6 overflow-hidden border border-zinc-100 relative group/img">
                        {proj.image ? <img src={proj.image} className="w-full h-full object-cover"/> : <div className="w-full h-full flex items-center justify-center text-[10px] font-black text-zinc-300 uppercase tracking-widest">Image Missing</div>}
                        <label className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white gap-2 font-bold text-xs uppercase tracking-widest">
                          <Upload size={16} /> Replace Image
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, (base64) => {
                              const updated = [...data.projects];
                              updated[idx].image = base64;
                              setData({...data, projects: updated});
                            })}
                          />
                        </label>
                      </div>
                      
                      <input 
                        className="w-full bg-transparent font-black text-lg mb-4 focus:outline-none border-b border-zinc-100 pb-2"
                        placeholder="Project Title"
                        value={proj.title}
                        onChange={e => {
                          const updated = [...data.projects];
                          updated[idx].title = e.target.value;
                          setData({...data, projects: updated});
                        }}
                      />

                      <div className="space-y-4 mb-8">
                        <div>
                          <label className="text-[8px] font-black uppercase tracking-widest text-zinc-400 block mb-1">Live Deployment Link</label>
                          <div className="flex items-center gap-2 bg-zinc-50 px-4 py-3 rounded-xl border border-zinc-100 focus-within:border-indigo-500 transition-all">
                            <Globe size={14} className="text-zinc-400" />
                            <input 
                              className="w-full bg-transparent text-[11px] font-bold focus:outline-none"
                              placeholder="https://your-website.com"
                              value={proj.liveLink}
                              onChange={e => {
                                const updated = [...data.projects];
                                updated[idx].liveLink = e.target.value;
                                setData({...data, projects: updated});
                              }}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-[8px] font-black uppercase tracking-widest text-zinc-400 block mb-1">Category</label>
                            <select 
                              className="w-full bg-zinc-50 px-4 py-3 rounded-xl text-xs font-bold focus:outline-none border border-zinc-100"
                              value={proj.category}
                              onChange={e => {
                                 const updated = [...data.projects];
                                 updated[idx].category = e.target.value as any;
                                 setData({...data, projects: updated});
                              }}
                            >
                              {['Law', 'Medical', 'E-commerce', 'Business', 'Education', 'Personal'].map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                          </div>
                          <div>
                             <label className="text-[8px] font-black uppercase tracking-widest text-zinc-400 block mb-1">Direct Image URL</label>
                             <input 
                              className="w-full bg-zinc-50 px-4 py-3 rounded-xl text-[10px] font-medium focus:outline-none border border-zinc-100"
                              placeholder="Paste URL here..."
                              value={proj.image.startsWith('data:') ? 'Custom Uploaded' : proj.image}
                              onChange={e => {
                                const updated = [...data.projects];
                                updated[idx].image = e.target.value;
                                setData({...data, projects: updated});
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                         <a 
                          href={proj.liveLink} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex-grow flex items-center justify-center gap-2 py-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:bg-zinc-100 transition-all"
                         >
                           <LinkIcon size={12} /> Test Live Link
                         </a>
                         <button 
                          onClick={() => {
                             if(confirm("Are you sure you want to delete this project?")) {
                               const updated = data.projects.filter(p => p.id !== proj.id);
                               setData({...data, projects: updated});
                             }
                          }}
                          className="w-14 h-14 flex items-center justify-center rounded-2xl border border-zinc-100 text-zinc-300 hover:text-red-500 hover:bg-red-50 transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
