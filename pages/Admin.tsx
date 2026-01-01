
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSiteData, saveSiteData } from '../services/apiService';
import { SiteData, Experience, Project, Category } from '../types';
import { Save, Plus, Trash2, Layout, User, Briefcase, Image as ImageIcon, LogOut, CheckCircle, Upload, Activity, ShieldCheck, Link as LinkIcon, Tag, X, Key, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdminProps {
  onSaveSuccess?: () => void;
}

const Admin: React.FC<AdminProps> = ({ onSaveSuccess }) => {
  const [data, setData] = useState<SiteData | null>(null);
  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'experience' | 'projects' | 'tracking'>('hero');
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
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
      if (onSaveSuccess) onSaveSuccess();
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

  const addCategory = () => {
    if (!data || !newCategoryName.trim()) return;
    if (data.categories.includes(newCategoryName.trim())) {
      alert("Category already exists.");
      return;
    }
    setData({
      ...data,
      categories: [...data.categories, newCategoryName.trim()]
    });
    setNewCategoryName('');
  };

  const removeCategory = (cat: string) => {
    if (!data) return;
    setData({
      ...data,
      categories: data.categories.filter(c => c !== cat)
    });
  };

  const addExperience = () => {
    if (!data) return;
    const newExp: Experience = {
      id: Date.now().toString(),
      company: 'New Company',
      role: 'Role Name',
      date: '2025',
      tags: ['Development'],
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
      category: data.categories[0] || 'Uncategorized',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
      techStack: ['React'],
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
    <div className="min-h-screen pt-32 pb-20 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-10 max-w-[1400px]">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 bg-zinc-50 dark:bg-zinc-900/50 p-12 rounded-[3rem] border border-zinc-100 dark:border-zinc-800">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500">Live Server Connected</span>
            </div>
            <h1 className="text-5xl font-black tracking-tight dark:text-white">Cloud Console</h1>
          </div>
          <div className="flex gap-4">
             <button 
              onClick={handleLogout}
              className="px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all flex items-center gap-2 dark:text-white"
            >
              <LogOut size={16} /> Logout
            </button>
            <button 
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-3 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-600 dark:hover:bg-indigo-400 transition-all shadow-xl disabled:opacity-50"
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
              className="bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 p-6 rounded-2xl mb-10 flex items-center gap-4 font-bold border border-green-100 dark:border-green-900"
            >
              <CheckCircle size={24} /> Changes pushed to production!
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-3 space-y-3">
            {[
              { id: 'hero', label: 'Hero Display', icon: <Layout size={18}/> },
              { id: 'about', label: 'About Identity', icon: <User size={18}/> },
              { id: 'experience', label: 'Career Timeline', icon: <Briefcase size={18}/> },
              { id: 'projects', label: 'Portfolio', icon: <ImageIcon size={18}/> },
              { id: 'tracking', label: 'Ads & Tracking', icon: <Activity size={18}/> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center justify-between px-8 py-6 rounded-2xl font-black transition-all text-xs uppercase tracking-widest ${
                  activeTab === tab.id 
                    ? 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 shadow-2xl' 
                    : 'bg-white dark:bg-zinc-900/30 text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-transparent'
                }`}
              >
                <div className="flex items-center gap-4">
                  {tab.icon} {tab.label}
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-9 bg-zinc-50 dark:bg-zinc-900/30 p-12 rounded-[3.5rem] border border-zinc-100 dark:border-zinc-800 min-h-[600px]">
            
            {activeTab === 'hero' && (
              <div className="space-y-12">
                <header>
                  <h3 className="text-3xl font-black tracking-tight mb-2 dark:text-white">Hero Settings</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">Main website entrance configuration.</p>
                </header>
                <div className="grid gap-10">
                  <div className="space-y-4">
                    <label className="text-[11px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400 block ml-2">Headline</label>
                    <textarea 
                      className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-8 rounded-3xl font-black text-4xl focus:outline-none focus:border-indigo-500 transition-all leading-tight dark:text-white"
                      value={data.hero.headline}
                      onChange={e => setData({...data, hero: {...data.hero, headline: e.target.value}})}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-[11px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400 block ml-2">Projects Completed</label>
                      <input 
                        type="number"
                        className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-6 rounded-3xl font-black text-2xl dark:text-white"
                        value={data.hero.projectsCompleted}
                        onChange={e => setData({...data, hero: {...data.hero, projectsCompleted: parseInt(e.target.value)}})}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="space-y-12">
                <header>
                  <h3 className="text-3xl font-black tracking-tight mb-2 dark:text-white">About Identity</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">Control the storytelling elements of the brand.</p>
                </header>
                <div className="grid gap-10">
                  <div className="space-y-4">
                    <label className="text-[11px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400 block ml-2">About Section Title</label>
                    <input 
                      className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-6 rounded-3xl font-black text-2xl dark:text-white"
                      value={data.about.title}
                      onChange={e => setData({...data, about: {...data.about, title: e.target.value}})}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[11px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400 block ml-2">Main Description</label>
                    <textarea 
                      rows={4}
                      className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-8 rounded-3xl font-medium leading-relaxed dark:text-white focus:border-indigo-500 transition-all outline-none"
                      value={data.about.description}
                      onChange={e => setData({...data, about: {...data.about, description: e.target.value}})}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                     <div className="space-y-4">
                        <label className="text-[11px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400 block ml-2">Performance Stat (%)</label>
                        <input 
                          className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-6 rounded-3xl font-black text-xl dark:text-white"
                          value={data.about.engagementStat}
                          onChange={e => setData({...data, about: {...data.about, engagementStat: e.target.value}})}
                        />
                     </div>
                     <div className="space-y-4">
                        <label className="text-[11px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400 block ml-2">Core Point 1</label>
                        <input 
                          className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-6 rounded-3xl font-bold text-sm dark:text-white"
                          value={data.about.point1}
                          onChange={e => setData({...data, about: {...data.about, point1: e.target.value}})}
                        />
                     </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[11px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400 block ml-2">Images</label>
                    <div className="flex gap-10">
                       <div className="flex flex-col gap-4 items-center">
                          <div className="w-32 h-40 bg-zinc-200 dark:bg-zinc-800 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-700">
                             <img src={data.about.imageMain} className="w-full h-full object-cover" />
                          </div>
                          <label className="cursor-pointer text-[10px] font-black uppercase tracking-widest text-indigo-600">
                             Main Img <input type="file" className="hidden" onChange={e => handleImageUpload(e, (b) => setData({...data, about: {...data.about, imageMain: b}}))} />
                          </label>
                       </div>
                       <div className="flex flex-col gap-4 items-center">
                          <div className="w-32 h-40 bg-zinc-200 dark:bg-zinc-800 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-700">
                             <img src={data.about.imageSecondary} className="w-full h-full object-cover" />
                          </div>
                          <label className="cursor-pointer text-[10px] font-black uppercase tracking-widest text-indigo-600">
                             Secondary Img <input type="file" className="hidden" onChange={e => handleImageUpload(e, (b) => setData({...data, about: {...data.about, imageSecondary: b}}))} />
                          </label>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'tracking' && (
              <div className="space-y-12">
                <header>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-xl flex items-center justify-center">
                       <ShieldCheck size={20} />
                    </div>
                    <h3 className="text-3xl font-black tracking-tight dark:text-white">Ads & Analytics</h3>
                  </div>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">Configure Meta Pixel and Conversions API (CAPI).</p>
                </header>
                
                <div className="grid gap-10">
                  <div className="bg-white dark:bg-zinc-800/50 p-10 rounded-[3rem] border border-zinc-100 dark:border-zinc-700 space-y-10">
                    <div className="space-y-4">
                       <label className="text-[11px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400 block ml-2">Meta Pixel ID</label>
                       <input 
                        className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-6 rounded-3xl font-mono text-sm dark:text-white focus:border-indigo-500 outline-none transition-all"
                        placeholder="e.g. 123456789"
                        value={data.tracking?.pixelId || ''}
                        onChange={e => setData({...data, tracking: {...(data.tracking || {pixelId: '', capiToken: ''}), pixelId: e.target.value}})}
                       />
                    </div>

                    <div className="space-y-4">
                       <div className="flex items-center gap-2 ml-2">
                          <Key size={14} className="text-indigo-600" />
                          <label className="text-[11px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400 block">CAPI Access Token</label>
                       </div>
                       <textarea 
                        rows={3}
                        className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-6 rounded-3xl font-mono text-xs dark:text-white focus:border-indigo-500 outline-none transition-all"
                        placeholder="EAAB..."
                        value={data.tracking?.capiToken || ''}
                        onChange={e => setData({...data, tracking: {...(data.tracking || {pixelId: '', capiToken: ''}), capiToken: e.target.value}})}
                       />
                    </div>

                    <div className="space-y-4">
                       <div className="flex items-center gap-2 ml-2">
                          <Zap size={14} className="text-amber-600" />
                          <label className="text-[11px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400 block">Test Event Code</label>
                       </div>
                       <input 
                        className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-6 rounded-3xl font-mono text-sm dark:text-white focus:border-indigo-500 outline-none transition-all"
                        placeholder="TEST12345"
                        value={data.tracking?.testEventCode || ''}
                        onChange={e => setData({...data, tracking: {...(data.tracking || {pixelId: '', capiToken: ''}), testEventCode: e.target.value}})}
                       />
                       <p className="text-[10px] text-zinc-500 font-medium ml-4 uppercase tracking-widest">Only use this while testing events in Events Manager.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Other tabs remain fully functional ... */}
            {activeTab === 'experience' && (
               <div className="space-y-12">
                 <header className="flex justify-between items-end">
                   <div>
                     <h3 className="text-3xl font-black tracking-tight mb-2 dark:text-white">Career Graph</h3>
                     <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">Manage your professional milestones.</p>
                   </div>
                   <button onClick={addExperience} className="flex items-center gap-2 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-6 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-lg hover:bg-indigo-600 transition-all"><Plus size={16} /> Add Experience</button>
                 </header>
                 <div className="space-y-8">
                   {data.experiences.map((exp, idx) => (
                     <div key={exp.id} className="bg-white dark:bg-zinc-800/50 p-8 rounded-[3rem] border border-zinc-100 dark:border-zinc-700 relative">
                        <button onClick={() => removeExperience(exp.id)} className="absolute top-8 right-8 text-zinc-300 hover:text-red-500"><Trash2 size={20} /></button>
                        <div className="grid md:grid-cols-3 gap-6">
                           <input placeholder="Company" className="w-full bg-zinc-50 dark:bg-zinc-900 p-5 rounded-2xl font-black dark:text-white" value={exp.company} onChange={e => {
                              const newExps = [...data.experiences];
                              newExps[idx].company = e.target.value;
                              setData({...data, experiences: newExps});
                           }} />
                           <input placeholder="Role" className="w-full bg-zinc-50 dark:bg-zinc-900 p-5 rounded-2xl font-black dark:text-white" value={exp.role} onChange={e => {
                              const newExps = [...data.experiences];
                              newExps[idx].role = e.target.value;
                              setData({...data, experiences: newExps});
                           }} />
                           <input placeholder="Date" className="w-full bg-zinc-50 dark:bg-zinc-900 p-5 rounded-2xl font-black dark:text-white" value={exp.date} onChange={e => {
                              const newExps = [...data.experiences];
                              newExps[idx].date = e.target.value;
                              setData({...data, experiences: newExps});
                           }} />
                        </div>
                     </div>
                   ))}
                 </div>
               </div>
            )}

            {activeTab === 'projects' && (
               <div className="space-y-12">
                 <header className="flex justify-between items-end">
                   <div>
                     <h3 className="text-3xl font-black tracking-tight mb-2 dark:text-white">Portfolio Showcase</h3>
                     <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">Display your engineering masterpieces.</p>
                   </div>
                   <button onClick={addProject} className="flex items-center gap-2 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-6 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-lg hover:bg-indigo-600 transition-all"><Plus size={16} /> New Project</button>
                 </header>
                 <div className="grid gap-8">
                   {data.projects.map((proj, idx) => (
                     <div key={proj.id} className="bg-white dark:bg-zinc-800/50 p-8 rounded-[3rem] border border-zinc-100 dark:border-zinc-700 relative">
                        <button onClick={() => removeProject(proj.id)} className="absolute top-8 right-8 text-zinc-300 hover:text-red-500"><Trash2 size={20} /></button>
                        <div className="grid md:grid-cols-2 gap-8">
                           <div className="space-y-4">
                              <input placeholder="Project Title" className="w-full bg-zinc-50 dark:bg-zinc-900 p-5 rounded-2xl font-black text-xl dark:text-white" value={proj.title} onChange={e => {
                                 const newProjs = [...data.projects];
                                 newProjs[idx].title = e.target.value;
                                 setData({...data, projects: newProjs});
                              }} />
                              <select className="w-full bg-zinc-50 dark:bg-zinc-900 p-5 rounded-2xl font-bold text-xs dark:text-white" value={proj.category} onChange={e => {
                                 const newProjs = [...data.projects];
                                 newProjs[idx].category = e.target.value;
                                 setData({...data, projects: newProjs});
                              }}>
                                 {data.categories.map(c => <option key={c} value={c}>{c}</option>)}
                              </select>
                           </div>
                           <div className="space-y-4">
                              <input placeholder="Live Link" className="w-full bg-zinc-50 dark:bg-zinc-900 p-5 rounded-2xl font-mono text-xs dark:text-white" value={proj.liveLink} onChange={e => {
                                 const newProjs = [...data.projects];
                                 newProjs[idx].liveLink = e.target.value;
                                 setData({...data, projects: newProjs});
                              }} />
                              <div className="flex gap-4 items-center">
                                 <div className="w-20 h-20 rounded-2xl bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
                                    <img src={proj.image} className="w-full h-full object-cover" />
                                 </div>
                                 <label className="cursor-pointer text-[10px] font-black uppercase text-indigo-600">Change Img <input type="file" className="hidden" onChange={e => handleImageUpload(e, (b) => {
                                    const newP = [...data.projects];
                                    newP[idx].image = b;
                                    setData({...data, projects: newP});
                                 })} /></label>
                              </div>
                           </div>
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
