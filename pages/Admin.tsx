
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSiteData, saveSiteData } from '../services/apiService';
import { SiteData, Experience, Project, Testimonial, SkillCategory } from '../types';
import { 
  Save, Plus, Trash2, Layout, User, Briefcase, 
  Image as ImageIcon, LogOut, CheckCircle, Activity, 
  MessageSquareQuote, Cpu, ChevronRight, Upload, 
  ShieldCheck, Globe, Link as LinkIcon, Calendar, Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Admin: React.FC = () => {
  const [data, setData] = useState<SiteData | null>(null);
  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'skills' | 'experience' | 'projects' | 'testimonials' | 'tracking'>('hero');
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
      alert("System Error: Cloud synchronization failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File too large. Max 2MB allowed.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!data) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-zinc-950 font-black uppercase tracking-[0.3em] text-zinc-400">
      <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-6"></div>
      Accessing Database...
    </div>
  );

  const tabs = [
    { id: 'hero', label: 'Hero Display', icon: <Layout size={18}/> },
    { id: 'about', label: 'About Brand', icon: <User size={18}/> },
    { id: 'skills', label: 'Core Mastery', icon: <Cpu size={18}/> },
    { id: 'experience', label: 'Timeline', icon: <Briefcase size={18}/> },
    { id: 'projects', label: 'Portfolio', icon: <ImageIcon size={18}/> },
    { id: 'testimonials', label: 'Verdicts', icon: <MessageSquareQuote size={18}/> },
    { id: 'tracking', label: 'Ads & CAPI', icon: <Activity size={18}/> },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 bg-white dark:bg-zinc-950 transition-colors selection:bg-indigo-600 selection:text-white">
      <div className="container mx-auto px-6 md:px-10 max-w-[1400px]">
        
        {/* Header Panel */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8 bg-zinc-50 dark:bg-zinc-925 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600 dark:text-indigo-400">System Core v4.2</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter dark:text-white">Control Panel</h1>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={handleLogout} className="px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all flex items-center gap-3 dark:text-white">
              <LogOut size={16} /> Logout
            </button>
            <button onClick={handleSave} disabled={saving} className="flex items-center gap-4 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-600 dark:hover:bg-indigo-400 transition-all shadow-xl disabled:opacity-50">
              <Save size={18} /> {saving ? 'Pushing...' : 'Save & Deploy'}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showSuccess && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 p-6 rounded-[2rem] mb-10 flex items-center gap-4 font-bold border border-emerald-100 dark:border-emerald-900 shadow-lg">
              <CheckCircle size={22} className="text-emerald-500" />
              <span className="uppercase tracking-widest text-[11px]">Deploy Successful: Cloud Synchronized</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-3 sticky top-32 h-fit">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center justify-between px-8 py-6 rounded-2xl md:rounded-[2.2rem] font-black transition-all text-[11px] uppercase tracking-[0.2em] ${
                  activeTab === tab.id 
                    ? 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 shadow-2xl scale-[1.03]' 
                    : 'bg-white dark:bg-zinc-900/40 text-zinc-400 hover:text-zinc-950 dark:hover:text-white border border-transparent'
                }`}
              >
                <div className="flex items-center gap-4">
                  {tab.icon} {tab.label}
                </div>
                {activeTab === tab.id && <ChevronRight size={14} />}
              </button>
            ))}
          </div>

          {/* Main Workspace */}
          <div className="lg:col-span-9 bg-zinc-50 dark:bg-zinc-925 p-8 md:p-14 rounded-[3.5rem] md:rounded-[4.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm min-h-[700px]">
            <AnimatePresence mode="wait">
              {activeTab === 'hero' && (
                <motion.div key="hero" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-12">
                  <header>
                    <h3 className="text-3xl font-black mb-2 dark:text-white">Hero Configuration</h3>
                    <p className="text-zinc-500 text-sm">Control the primary entrance visuals and text.</p>
                  </header>
                  <div className="space-y-10">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block ml-4">Main Headline</label>
                      <textarea className="w-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-8 rounded-[2.5rem] font-black text-3xl dark:text-white leading-tight focus:border-indigo-500 outline-none" rows={3} value={data.hero.headline} onChange={e => setData({...data, hero: {...data.hero, headline: e.target.value}})} />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-10 items-start">
                       <div className="space-y-8">
                          <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block ml-4">Subheadline</label>
                            <input className="w-full bg-white dark:bg-zinc-900 p-6 rounded-3xl font-bold dark:text-white outline-none border border-transparent focus:border-indigo-500" value={data.hero.subheadline} onChange={e => setData({...data, hero: {...data.hero, subheadline: e.target.value}})} />
                          </div>
                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block ml-4">Projects Done</label>
                              <input type="number" className="w-full bg-white dark:bg-zinc-900 p-6 rounded-3xl font-black text-2xl dark:text-white outline-none" value={data.hero.projectsCompleted} onChange={e => setData({...data, hero: {...data.hero, projectsCompleted: parseInt(e.target.value)}})} />
                            </div>
                            <div className="space-y-4">
                              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block ml-4">SaaS Raised</label>
                              <input type="number" className="w-full bg-white dark:bg-zinc-900 p-6 rounded-3xl font-black text-2xl dark:text-white outline-none" value={data.hero.startupsRaised} onChange={e => setData({...data, hero: {...data.hero, startupsRaised: parseInt(e.target.value)}})} />
                            </div>
                          </div>
                       </div>
                       
                       <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block ml-4">Hero Visual</label>
                          <div className="relative group aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-xl">
                            <img src={data.hero.image} className="w-full h-full object-cover" alt="Hero Preview" />
                            <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-all gap-4 text-white">
                               <Upload size={32} />
                               <span className="font-black uppercase tracking-widest text-xs">Upload New Image</span>
                               <input type="file" className="hidden" accept="image/*" onChange={e => handleImageUpload(e, (base64) => setData({...data, hero: {...data.hero, image: base64}}))} />
                            </label>
                          </div>
                       </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'about' && (
                <motion.div key="about" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-12">
                   <header>
                    <h3 className="text-3xl font-black mb-2 dark:text-white">Brand Story</h3>
                    <p className="text-zinc-500 text-sm">Control the narrative and identity images.</p>
                  </header>
                  <div className="space-y-10">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block ml-4">About Title</label>
                      <input className="w-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-8 rounded-[2.5rem] font-black text-3xl dark:text-white focus:border-indigo-500 outline-none" value={data.about.title} onChange={e => setData({...data, about: {...data.about, title: e.target.value}})} />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block ml-4">Main Description</label>
                      <textarea rows={6} className="w-full bg-white dark:bg-zinc-900 p-8 rounded-[3rem] font-medium dark:text-white text-lg leading-relaxed outline-none" value={data.about.description} onChange={e => setData({...data, about: {...data.about, description: e.target.value}})} />
                    </div>
                    <div className="grid md:grid-cols-2 gap-10">
                       <div className="space-y-6">
                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block ml-4">Primary Identity Image</label>
                          <div className="relative group aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-lg">
                            <img src={data.about.imageMain} className="w-full h-full object-cover" />
                            <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-all text-white gap-3">
                               <Upload size={24} />
                               <span className="font-black text-[10px] uppercase tracking-widest">Update Primary</span>
                               <input type="file" className="hidden" accept="image/*" onChange={e => handleImageUpload(e, (base64) => setData({...data, about: {...data.about, imageMain: base64}}))} />
                            </label>
                          </div>
                       </div>
                       <div className="space-y-6">
                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block ml-4">Secondary Brand Image</label>
                          <div className="relative group aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-lg">
                            <img src={data.about.imageSecondary} className="w-full h-full object-cover" />
                            <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-all text-white gap-3">
                               <Upload size={24} />
                               <span className="font-black text-[10px] uppercase tracking-widest">Update Secondary</span>
                               <input type="file" className="hidden" accept="image/*" onChange={e => handleImageUpload(e, (base64) => setData({...data, about: {...data.about, imageSecondary: base64}}))} />
                            </label>
                          </div>
                       </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'skills' && (
                <motion.div key="skills" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-12">
                   <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                      <h3 className="text-3xl font-black mb-2 dark:text-white">Technical Mastery</h3>
                      <p className="text-zinc-500 text-sm">Control the expertise cards on the Home page.</p>
                    </div>
                    <button onClick={() => setData({...data, technicalSkills: [...(data.technicalSkills || []), { category: "New Area", icon: "Code2", skills: ["Skill 1"] }]})} className="flex items-center gap-3 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl">
                      <Plus size={18} /> Add Category
                    </button>
                  </header>
                  <div className="grid gap-10">
                    {data.technicalSkills && data.technicalSkills.map((cat, idx) => (
                      <div key={idx} className="bg-white dark:bg-zinc-900/50 p-10 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 relative group">
                        <button onClick={() => {
                          const newS = [...(data.technicalSkills || [])];
                          newS.splice(idx, 1);
                          setData({...data, technicalSkills: newS});
                        }} className="absolute top-8 right-8 text-zinc-300 hover:text-red-500 transition-colors">
                          <Trash2 size={22} />
                        </button>
                        <div className="grid md:grid-cols-2 gap-10">
                           <div className="space-y-6">
                              <input className="w-full bg-zinc-50 dark:bg-zinc-800 p-6 rounded-2xl font-black text-2xl dark:text-white outline-none focus:border-indigo-500 border border-transparent" value={cat.category} onChange={e => {
                                 const newS = [...(data.technicalSkills || [])];
                                 newS[idx].category = e.target.value;
                                 setData({...data, technicalSkills: newS});
                              }} />
                              <select className="w-full bg-zinc-50 dark:bg-zinc-800 p-6 rounded-2xl font-bold text-xs uppercase dark:text-white appearance-none outline-none" value={cat.icon} onChange={e => {
                                 const newS = [...(data.technicalSkills || [])];
                                 newS[idx].icon = e.target.value;
                                 setData({...data, technicalSkills: newS});
                              }}>
                                 <option value="Figma">Design (Figma)</option>
                                 <option value="Code2">React (Code2)</option>
                                 <option value="Database">Backend (Database)</option>
                                 <option value="Terminal">DevOps (Terminal)</option>
                                 <option value="Monitor">Interface (Monitor)</option>
                              </select>
                           </div>
                           <textarea rows={5} className="w-full bg-zinc-50 dark:bg-zinc-800 p-8 rounded-[2rem] font-medium text-sm dark:text-white outline-none" value={cat.skills.join(', ')} onChange={e => {
                              const newS = [...(data.technicalSkills || [])];
                              newS[idx].skills = e.target.value.split(',').map(s => s.trim()).filter(s => s !== '');
                              setData({...data, technicalSkills: newS});
                           }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'experience' && (
                <motion.div key="experience" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-12">
                   <header className="flex justify-between items-end gap-6">
                    <div>
                      <h3 className="text-3xl font-black mb-2 dark:text-white">Experience Graph</h3>
                      <p className="text-zinc-500 text-sm">Chronological history of roles.</p>
                    </div>
                    <button onClick={() => setData({...data, experiences: [{ id: Date.now().toString(), company: "New Co", role: "Developer", date: "2024 - Present", tags: ["React"], highlight: false }, ...data.experiences]})} className="flex items-center gap-3 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl">
                      <Plus size={18} /> New Milestone
                    </button>
                  </header>
                  <div className="grid gap-6">
                    {data.experiences.map((exp, idx) => (
                      <div key={exp.id} className="bg-white dark:bg-zinc-900/50 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 flex flex-col md:flex-row items-center gap-6 relative group">
                        <button onClick={() => setData({...data, experiences: data.experiences.filter(e => e.id !== exp.id)})} className="absolute top-6 right-6 text-zinc-300 hover:text-red-500 transition-colors">
                          <Trash2 size={20} />
                        </button>
                        <div className="flex-grow grid md:grid-cols-3 gap-6 w-full pt-4 md:pt-0">
                           <div className="space-y-2">
                             <label className="text-[9px] font-black uppercase text-zinc-400 ml-4 tracking-widest flex items-center gap-2"><Briefcase size={10}/> Company</label>
                             <input className="w-full bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl font-black text-lg dark:text-white outline-none" value={exp.company} onChange={e => {
                               const n = [...data.experiences]; n[idx].company = e.target.value; setData({...data, experiences: n});
                             }} />
                           </div>
                           <div className="space-y-2">
                             <label className="text-[9px] font-black uppercase text-zinc-400 ml-4 tracking-widest flex items-center gap-2"><User size={10}/> Role</label>
                             <input className="w-full bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl font-bold text-xs uppercase text-indigo-500 tracking-widest outline-none" value={exp.role} onChange={e => {
                               const n = [...data.experiences]; n[idx].role = e.target.value; setData({...data, experiences: n});
                             }} />
                           </div>
                           <div className="space-y-2">
                             <label className="text-[9px] font-black uppercase text-zinc-400 ml-4 tracking-widest flex items-center gap-2"><Calendar size={10}/> Date / Year</label>
                             <input className="w-full bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl font-black text-sm dark:text-white outline-none" value={exp.date} placeholder="e.g. 2024 - Present" onChange={e => {
                               const n = [...data.experiences]; n[idx].date = e.target.value; setData({...data, experiences: n});
                             }} />
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'projects' && (
                <motion.div key="projects" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-12">
                   <header className="flex justify-between items-end gap-6">
                    <div>
                      <h3 className="text-3xl font-black mb-2 dark:text-white">Masterworks Portfolio</h3>
                      <p className="text-zinc-500 text-sm">Update your project showcase images and links.</p>
                    </div>
                    <button onClick={() => setData({...data, projects: [{ id: Date.now().toString(), title: "New Project", category: "Web App", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800", techStack: ["React"], liveLink: "#" }, ...data.projects]})} className="flex items-center gap-3 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl">
                      <Plus size={18} /> New Masterwork
                    </button>
                  </header>
                  <div className="grid gap-10">
                    {data.projects.map((proj, idx) => (
                      <div key={proj.id} className="bg-white dark:bg-zinc-900/50 p-10 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 flex flex-col md:flex-row items-center gap-10 relative group">
                        <button onClick={() => setData({...data, projects: data.projects.filter(p => p.id !== proj.id)})} className="absolute top-8 right-8 text-zinc-300 hover:text-red-500 transition-colors">
                          <Trash2 size={24} />
                        </button>
                        
                        <div className="relative w-full md:w-60 h-44 rounded-[2rem] overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex-shrink-0 border border-zinc-200 dark:border-zinc-700">
                          <img src={proj.image} className="w-full h-full object-cover" />
                          <label className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-all text-white gap-2">
                             <Upload size={20} />
                             <span className="font-black text-[9px] uppercase tracking-widest">Update Image</span>
                             <input type="file" className="hidden" accept="image/*" onChange={e => handleImageUpload(e, (base64) => {
                               const newP = [...data.projects];
                               newP[idx].image = base64;
                               setData({...data, projects: newP});
                             })} />
                          </label>
                        </div>

                        <div className="flex-grow grid md:grid-cols-2 gap-8 w-full">
                           <div className="space-y-4">
                              <label className="text-[9px] font-black uppercase text-zinc-400 ml-4 tracking-widest flex items-center gap-2">Project Title</label>
                              <input className="w-full bg-zinc-50 dark:bg-zinc-800 p-5 rounded-2xl font-black text-xl dark:text-white outline-none border border-transparent focus:border-indigo-500" value={proj.title} onChange={e => {
                                const newP = [...data.projects];
                                newP[idx].title = e.target.value;
                                setData({...data, projects: newP});
                              }} />
                           </div>
                           <div className="space-y-4">
                              <label className="text-[9px] font-black uppercase text-zinc-400 ml-4 tracking-widest flex items-center gap-2"><Layers size={12}/> Category</label>
                              <input className="w-full bg-zinc-50 dark:bg-zinc-800 p-5 rounded-2xl font-bold text-xs uppercase dark:text-white outline-none" value={proj.category} placeholder="e.g. Web App" onChange={e => {
                                const newP = [...data.projects];
                                newP[idx].category = e.target.value;
                                setData({...data, projects: newP});
                              }} />
                           </div>
                           <div className="md:col-span-2 space-y-4">
                              <label className="text-[9px] font-black uppercase text-zinc-400 ml-4">Live URL</label>
                              <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-800 p-5 rounded-2xl border border-transparent focus-within:border-indigo-500">
                                 <LinkIcon size={16} className="text-zinc-400" />
                                 <input className="w-full bg-transparent font-bold text-xs dark:text-white outline-none" value={proj.liveLink} onChange={e => {
                                    const newP = [...data.projects];
                                    newP[idx].liveLink = e.target.value;
                                    setData({...data, projects: newP});
                                 }} />
                              </div>
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'testimonials' && (
                <motion.div key="testimonials" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-12">
                   <header className="flex justify-between items-end gap-6">
                    <div>
                      <h3 className="text-3xl font-black mb-2 dark:text-white">Client Verdicts</h3>
                      <p className="text-zinc-500 text-sm">Manage feedback and social proof.</p>
                    </div>
                    <button onClick={() => setData({...data, testimonials: [{ id: Date.now().toString(), name: "Client Name", role: "CTO", content: "Amazing experience...", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200" }, ...data.testimonials]})} className="flex items-center gap-3 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl">
                      <Plus size={18} /> New Verdict
                    </button>
                  </header>
                  <div className="grid gap-10">
                    {data.testimonials && data.testimonials.map((t, idx) => (
                       <div key={t.id} className="bg-white dark:bg-zinc-900/50 p-10 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 relative group">
                          <button onClick={() => setData({...data, testimonials: data.testimonials.filter(item => item.id !== t.id)})} className="absolute top-8 right-8 text-zinc-300 hover:text-red-500 transition-colors">
                            <Trash2 size={22} />
                          </button>
                          <div className="grid md:grid-cols-3 gap-10">
                             <div className="space-y-6">
                                <div className="space-y-2">
                                  <label className="text-[9px] font-black uppercase text-zinc-400 ml-4">Client Name</label>
                                  <input className="w-full bg-zinc-50 dark:bg-zinc-800 p-5 rounded-2xl font-black text-xl dark:text-white outline-none" value={t.name} onChange={e => {
                                     const newT = [...data.testimonials];
                                     newT[idx].name = e.target.value;
                                     setData({...data, testimonials: newT});
                                  }} />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-[9px] font-black uppercase text-zinc-400 ml-4">Role / Title</label>
                                  <input className="w-full bg-zinc-50 dark:bg-zinc-800 p-5 rounded-2xl font-bold text-[10px] uppercase tracking-widest dark:text-zinc-400 outline-none" value={t.role} onChange={e => {
                                     const newT = [...data.testimonials];
                                     newT[idx].role = e.target.value;
                                     setData({...data, testimonials: newT});
                                  }} />
                                </div>
                             </div>
                             <div className="md:col-span-2 space-y-2">
                                <label className="text-[9px] font-black uppercase text-zinc-400 ml-4">Feedback Content</label>
                                <textarea rows={5} className="w-full bg-zinc-50 dark:bg-zinc-800 p-8 rounded-[2.5rem] font-medium text-lg italic dark:text-white leading-relaxed resize-none outline-none" value={t.content} onChange={e => {
                                   const newT = [...data.testimonials];
                                   newT[idx].content = e.target.value;
                                   setData({...data, testimonials: newT});
                                }} />
                             </div>
                          </div>
                       </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'tracking' && (
                <motion.div key="tracking" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-12">
                   <header>
                    <h3 className="text-3xl font-black mb-2 dark:text-white">Ad & Conversion Node</h3>
                    <p className="text-zinc-500 text-sm">Configure Meta Pixel and Server-side CAPI events.</p>
                   </header>
                   <div className="space-y-12">
                      <div className="bg-indigo-50 dark:bg-indigo-950/20 p-8 rounded-[2.5rem] border border-indigo-100 dark:border-indigo-900/50 flex items-center gap-6">
                         <div className="w-14 h-14 bg-white dark:bg-indigo-900 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm"><ShieldCheck size={28} /></div>
                         <div>
                            <h4 className="font-black dark:text-white mb-1">CAPI Active Status</h4>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-widest">Server-side lead events are transmitted via Cloud API</p>
                         </div>
                      </div>
                      
                      <div className="grid gap-10">
                        <div className="space-y-4">
                           <label className="text-[10px] font-black uppercase text-zinc-400 block ml-4 tracking-[0.2em]">Meta Pixel ID</label>
                           <input className="w-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-8 rounded-[2.5rem] font-mono text-xl dark:text-white focus:border-indigo-500 outline-none" placeholder="Enter Pixel ID..." value={data.tracking?.pixelId || ''} onChange={e => setData({...data, tracking: {...(data.tracking || {pixelId: '', capiToken: ''}), pixelId: e.target.value}})} />
                        </div>
                        <div className="space-y-4">
                           <label className="text-[10px] font-black uppercase text-zinc-400 block ml-4 tracking-[0.2em]">CAPI Access Token (Server Token)</label>
                           <textarea rows={6} className="w-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-8 rounded-[3rem] font-mono text-xs dark:text-white break-all leading-relaxed focus:border-indigo-500 outline-none" placeholder="Paste CAPI Token here..." value={data.tracking?.capiToken || ''} onChange={e => setData({...data, tracking: {...(data.tracking || {pixelId: '', capiToken: ''}), capiToken: e.target.value}})} />
                        </div>
                      </div>
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
