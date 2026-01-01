
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSiteData, saveSiteData } from '../services/apiService';
import { SiteData, Experience, Project, Category } from '../types';
import { Save, Plus, Trash2, Layout, User, Briefcase, Image as ImageIcon, LogOut, CheckCircle, Upload, Globe, Activity, ShieldCheck, Key, Link as LinkIcon, Cpu } from 'lucide-react';
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

  const addExperience = () => {
    if (!data) return;
    const newExp: Experience = {
      id: Date.now().toString(),
      company: 'New Company',
      role: 'Role Name',
      date: '2024 - Present',
      tags: ['React', 'Design'],
      highlight: false
    };
    setData({ ...data, experiences: [newExp, ...data.experiences] });
  };

  const removeExperience = (id: string) => {
    if (!data) return;
    setData({ ...data, experiences: data.experiences.filter(e => e.id !== id) });
  };

  const addProject = () => {
    if (!data) return;
    const newProj: Project = {
      id: Date.now().toString(),
      title: 'New Project',
      category: 'Business',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
      techStack: ['React', 'Tailwind'],
      liveLink: 'https://'
    };
    setData({ ...data, projects: [newProj, ...data.projects] });
  };

  const removeProject = (id: string) => {
    if (!data) return;
    setData({ ...data, projects: data.projects.filter(p => p.id !== id) });
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
          <div className="lg:col-span-9 bg-zinc-50 p-12 rounded-[3.5rem] border border-zinc-100 min-h-[600px]">
            
            {/* HERO TAB */}
            {activeTab === 'hero' && (
              <div className="space-y-12">
                <header>
                  <h3 className="text-3xl font-black tracking-tight mb-2">Home Display</h3>
                  <p className="text-zinc-500 text-sm font-medium">Control the first impression of your website.</p>
                </header>
                <div className="grid gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block ml-2">Main Headline</label>
                    <textarea 
                      className="w-full bg-white border border-zinc-200 p-8 rounded-3xl font-black text-4xl focus:outline-none focus:border-indigo-500 transition-all leading-tight"
                      value={data.hero.headline}
                      onChange={e => setData({...data, hero: {...data.hero, headline: e.target.value}})}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block ml-2">Subheadline</label>
                    <input 
                      className="w-full bg-white border border-zinc-200 p-6 rounded-3xl font-medium text-lg focus:outline-none"
                      value={data.hero.subheadline}
                      onChange={e => setData({...data, hero: {...data.hero, subheadline: e.target.value}})}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block ml-2">Projects Count</label>
                      <input 
                        type="number"
                        className="w-full bg-white border border-zinc-200 p-6 rounded-3xl font-black text-2xl"
                        value={data.hero.projectsCompleted}
                        onChange={e => setData({...data, hero: {...data.hero, projectsCompleted: parseInt(e.target.value)}})}
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block ml-2">Startups Raised</label>
                      <input 
                        type="number"
                        className="w-full bg-white border border-zinc-200 p-6 rounded-3xl font-black text-2xl"
                        value={data.hero.startupsRaised}
                        onChange={e => setData({...data, hero: {...data.hero, startupsRaised: parseInt(e.target.value)}})}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block ml-2">Hero Image</label>
                    <div className="flex gap-6 items-center">
                      <div className="w-32 h-32 rounded-3xl overflow-hidden border border-zinc-200 bg-white">
                        <img src={data.hero.image} className="w-full h-full object-cover" />
                      </div>
                      <label className="cursor-pointer bg-white border border-zinc-200 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-zinc-100 transition-all">
                        Change Image
                        <input type="file" className="hidden" accept="image/*" onChange={e => handleImageUpload(e, (b) => setData({...data, hero: {...data.hero, image: b}}))} />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* IDENTITY (ABOUT) TAB */}
            {activeTab === 'about' && (
              <div className="space-y-12">
                <header>
                  <h3 className="text-3xl font-black tracking-tight mb-2">Identity</h3>
                  <p className="text-zinc-500 text-sm font-medium">Define your brand story and core values.</p>
                </header>
                <div className="grid gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block ml-2">About Title</label>
                    <input 
                      className="w-full bg-white border border-zinc-200 p-6 rounded-3xl font-black text-2xl"
                      value={data.about.title}
                      onChange={e => setData({...data, about: {...data.about, title: e.target.value}})}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block ml-2">Description</label>
                    <textarea 
                      rows={4}
                      className="w-full bg-white border border-zinc-200 p-8 rounded-3xl font-medium leading-relaxed"
                      value={data.about.description}
                      onChange={e => setData({...data, about: {...data.about, description: e.target.value}})}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block ml-2">Engagement Stat (%)</label>
                    <input 
                      className="w-full bg-white border border-zinc-200 p-6 rounded-3xl font-black text-2xl"
                      value={data.about.engagementStat}
                      onChange={e => setData({...data, about: {...data.about, engagementStat: e.target.value}})}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TIMELINE (EXPERIENCE) TAB */}
            {activeTab === 'experience' && (
              <div className="space-y-12">
                <header className="flex justify-between items-end">
                  <div>
                    <h3 className="text-3xl font-black tracking-tight mb-2">Timeline</h3>
                    <p className="text-zinc-500 text-sm font-medium">Manage your professional career highlights.</p>
                  </div>
                  <button 
                    onClick={addExperience}
                    className="flex items-center gap-2 bg-zinc-950 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all"
                  >
                    <Plus size={14} /> Add Event
                  </button>
                </header>

                <div className="space-y-6">
                  {data.experiences.map((exp, idx) => (
                    <div key={exp.id} className="bg-white p-8 rounded-[2.5rem] border border-zinc-100 group">
                      <div className="flex justify-between items-start mb-6">
                        <div className="grid md:grid-cols-3 gap-6 flex-grow">
                          <div>
                            <label className="text-[8px] font-black uppercase tracking-widest text-zinc-400 block mb-2">Company</label>
                            <input 
                              className="w-full bg-zinc-50 p-4 rounded-xl font-bold"
                              value={exp.company}
                              onChange={e => {
                                const newExps = [...data.experiences];
                                newExps[idx].company = e.target.value;
                                setData({...data, experiences: newExps});
                              }}
                            />
                          </div>
                          <div>
                            <label className="text-[8px] font-black uppercase tracking-widest text-zinc-400 block mb-2">Role</label>
                            <input 
                              className="w-full bg-zinc-50 p-4 rounded-xl font-bold"
                              value={exp.role}
                              onChange={e => {
                                const newExps = [...data.experiences];
                                newExps[idx].role = e.target.value;
                                setData({...data, experiences: newExps});
                              }}
                            />
                          </div>
                          <div>
                            <label className="text-[8px] font-black uppercase tracking-widest text-zinc-400 block mb-2">Date</label>
                            <input 
                              className="w-full bg-zinc-50 p-4 rounded-xl font-bold"
                              value={exp.date}
                              onChange={e => {
                                const newExps = [...data.experiences];
                                newExps[idx].date = e.target.value;
                                setData({...data, experiences: newExps});
                              }}
                            />
                          </div>
                        </div>
                        <button 
                          onClick={() => removeExperience(exp.id)}
                          className="ml-4 p-4 text-zinc-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SHOWCASE (PROJECTS) TAB */}
            {activeTab === 'projects' && (
              <div className="space-y-12">
                <header className="flex justify-between items-end">
                  <div>
                    <h3 className="text-3xl font-black tracking-tight mb-2">Showcase</h3>
                    <p className="text-zinc-500 text-sm font-medium">Display your best digital engineering works.</p>
                  </div>
                  <button 
                    onClick={addProject}
                    className="flex items-center gap-2 bg-zinc-950 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all"
                  >
                    <Plus size={14} /> New Project
                  </button>
                </header>

                <div className="grid gap-10">
                  {data.projects.map((proj, idx) => (
                    <div key={proj.id} className="bg-white p-10 rounded-[3rem] border border-zinc-100 shadow-sm relative overflow-hidden group">
                      <div className="grid md:grid-cols-12 gap-10">
                        <div className="md:col-span-4 space-y-4">
                          <div className="aspect-video rounded-3xl overflow-hidden border border-zinc-100 relative">
                            <img src={proj.image} className="w-full h-full object-cover" />
                            <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                              <Upload className="text-white" />
                              <input type="file" className="hidden" accept="image/*" onChange={e => handleImageUpload(e, (b) => {
                                const newProjs = [...data.projects];
                                newProjs[idx].image = b;
                                setData({...data, projects: newProjs});
                              })} />
                            </label>
                          </div>
                          <div className="flex items-center gap-2">
                            <LinkIcon size={14} className="text-zinc-400" />
                            <input 
                              placeholder="Live Link"
                              className="text-[10px] font-bold w-full bg-zinc-50 p-2 rounded-lg"
                              value={proj.liveLink}
                              onChange={e => {
                                const newProjs = [...data.projects];
                                newProjs[idx].liveLink = e.target.value;
                                setData({...data, projects: newProjs});
                              }}
                            />
                          </div>
                        </div>
                        <div className="md:col-span-8 space-y-6">
                          <div className="flex justify-between">
                            <input 
                              className="text-3xl font-black w-full bg-transparent focus:outline-none focus:border-b-2 focus:border-indigo-500"
                              value={proj.title}
                              onChange={e => {
                                const newProjs = [...data.projects];
                                newProjs[idx].title = e.target.value;
                                setData({...data, projects: newProjs});
                              }}
                            />
                            <button 
                              onClick={() => removeProject(proj.id)}
                              className="p-2 text-zinc-300 hover:text-red-500"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-[8px] font-black uppercase tracking-widest text-zinc-400 block mb-2">Category</label>
                              <select 
                                className="w-full bg-zinc-50 p-4 rounded-xl font-bold text-xs"
                                value={proj.category}
                                onChange={e => {
                                  const newProjs = [...data.projects];
                                  newProjs[idx].category = e.target.value as Category;
                                  setData({...data, projects: newProjs});
                                }}
                              >
                                {['Law', 'Medical', 'E-commerce', 'Business', 'Education', 'Personal'].map(c => (
                                  <option key={c} value={c}>{c}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="text-[8px] font-black uppercase tracking-widest text-zinc-400 block mb-2">Stack (Comma separated)</label>
                              <input 
                                className="w-full bg-zinc-50 p-4 rounded-xl font-bold text-xs"
                                value={proj.techStack.join(', ')}
                                onChange={e => {
                                  const newProjs = [...data.projects];
                                  newProjs[idx].techStack = e.target.value.split(',').map(s => s.trim());
                                  setData({...data, projects: newProjs});
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TRACKING TAB */}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
