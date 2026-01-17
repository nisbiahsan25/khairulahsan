
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSiteData, saveSiteData } from '../services/apiService';
import { SiteData, Experience, Project, Testimonial, SkillCategory, Niche, Service, BlogPost } from '../types';
import { 
  Save, Plus, Trash2, Layout, User, Briefcase, 
  Image as ImageIcon, LogOut, CheckCircle, Activity, 
  MessageSquareQuote, Cpu, ChevronRight, Upload, 
  ShieldCheck, Globe, Link as LinkIcon, Calendar, Layers, Target, 
  Wrench, FileText, Clock, Tag, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Admin: React.FC<{ onSaveSuccess?: () => void }> = ({ onSaveSuccess }) => {
  const [data, setData] = useState<SiteData | null>(null);
  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'niches' | 'services' | 'skills' | 'experience' | 'projects' | 'testimonials' | 'blog' | 'tracking'>('hero');
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
      if (onSaveSuccess) onSaveSuccess();
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

  // Robust Add Handlers
  const handleAddNiche = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setData(prev => {
      if (!prev) return null;
      const newNiche: Niche = { 
        id: `niche-${Date.now()}-${Math.floor(Math.random() * 1000)}`, 
        title: "New Niche", 
        description: "Expertise details here." 
      };
      const currentNiches = Array.isArray(prev.niches) ? prev.niches : [];
      return {
        ...prev,
        niches: [newNiche, ...currentNiches]
      };
    });
  };

  const handleAddService = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setData(prev => {
      if (!prev) return null;
      const newService: Service = { 
        id: `service-${Date.now()}-${Math.floor(Math.random() * 1000)}`, 
        title: "New Service", 
        description: "Service details...", 
        icon: "Monitor", 
        features: [] 
      };
      const currentServices = Array.isArray(prev.services) ? prev.services : [];
      return {
        ...prev,
        services: [newService, ...currentServices]
      };
    });
  };

  const handleAddExperience = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setData(prev => {
      if (!prev) return null;
      const newExp: Experience = { 
        id: `exp-${Date.now()}`, 
        company: "Company Name", 
        date: "Year - Year", 
        role: "Job Role", 
        tags: ["Skill"] 
      };
      return {
        ...prev,
        experiences: [newExp, ...(prev.experiences || [])]
      };
    });
  };

  const handleAddProject = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setData(prev => {
      if (!prev) return null;
      const newProj: Project = { 
        id: `proj-${Date.now()}`, 
        title: "New Project", 
        category: "Web App", 
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800", 
        techStack: ["React"], 
        liveLink: "#" 
      };
      return {
        ...prev,
        projects: [newProj, ...(prev.projects || [])]
      };
    });
  };

  const handleAddBlog = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setData(prev => {
      if (!prev) return null;
      const newBlog: BlogPost = { 
        id: `blog-${Date.now()}`, 
        category: "TECH", 
        time: "5 min", 
        title: "New Article", 
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800", 
        date: "NEW 2024" 
      };
      return {
        ...prev,
        blogs: [newBlog, ...(prev.blogs || [])]
      };
    });
  };

  const handleAddTestimonial = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setData(prev => {
      if (!prev) return null;
      const newTest: Testimonial = { 
        id: `test-${Date.now()}`, 
        name: "Client Name", 
        role: "CEO", 
        content: "Client Feedback", 
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200" 
      };
      return {
        ...prev,
        testimonials: [newTest, ...(prev.testimonials || [])]
      };
    });
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
    { id: 'niches', label: 'Industry Niches', icon: <Target size={18}/> },
    { id: 'services', label: 'Services', icon: <Wrench size={18}/> },
    { id: 'skills', label: 'Core Mastery', icon: <Cpu size={18}/> },
    { id: 'experience', label: 'Timeline', icon: <Briefcase size={18}/> },
    { id: 'projects', label: 'Portfolio', icon: <ImageIcon size={18}/> },
    { id: 'testimonials', label: 'Verdicts', icon: <MessageSquareQuote size={18}/> },
    { id: 'blog', label: 'Blog Posts', icon: <FileText size={18}/> },
    { id: 'tracking', label: 'Ads & CAPI', icon: <Activity size={18}/> },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 bg-white dark:bg-zinc-950 transition-colors selection:bg-indigo-600 selection:text-white">
      <div className="container mx-auto px-6 md:px-10 max-w-[1400px]">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8 bg-zinc-50 dark:bg-zinc-925 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600 dark:text-indigo-400">System Core v4.3</span>
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

          <div className="lg:col-span-9 bg-zinc-50 dark:bg-zinc-925 p-8 md:p-14 rounded-[3.5rem] md:rounded-[4.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm min-h-[700px]">
            <AnimatePresence mode="wait">
              {activeTab === 'hero' && (
                <motion.div key="hero" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-12">
                  <header><h3 className="text-3xl font-black mb-2 dark:text-white">Hero Configuration</h3></header>
                  <div className="space-y-10">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block ml-4">Main Headline</label>
                      <textarea className="w-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-8 rounded-[2.5rem] font-black text-3xl dark:text-white leading-tight focus:border-indigo-500 outline-none" rows={3} value={data.hero.headline} onChange={e => setData({...data, hero: {...data.hero, headline: e.target.value}})} />
                    </div>
                    <div className="grid md:grid-cols-2 gap-10">
                       <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block ml-4">Subheadline</label>
                          <input className="w-full bg-white dark:bg-zinc-900 p-6 rounded-3xl font-bold dark:text-white outline-none" value={data.hero.subheadline} onChange={e => setData({...data, hero: {...data.hero, subheadline: e.target.value}})} />
                       </div>
                       <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block ml-4">Projects</label>
                            <input type="number" className="w-full bg-white dark:bg-zinc-900 p-6 rounded-3xl font-black text-2xl dark:text-white outline-none" value={data.hero.projectsCompleted} onChange={e => setData({...data, hero: {...data.hero, projectsCompleted: parseInt(e.target.value)}})} />
                          </div>
                          <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block ml-4">Startups</label>
                            <input type="number" className="w-full bg-white dark:bg-zinc-900 p-6 rounded-3xl font-black text-2xl dark:text-white outline-none" value={data.hero.startupsRaised} onChange={e => setData({...data, hero: {...data.hero, startupsRaised: parseInt(e.target.value)}})} />
                          </div>
                       </div>
                    </div>
                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block ml-4">Hero Image</label>
                       <div className="relative group w-48 h-64 rounded-3xl overflow-hidden shadow-xl border border-zinc-200 dark:border-zinc-800">
                          <img src={data.hero.image} className="w-full h-full object-cover" />
                          <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-all text-white"><Upload size={24}/><input type="file" className="hidden" onChange={e => handleImageUpload(e, (b) => setData({...data, hero: {...data.hero, image: b}}))}/></label>
                       </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'about' && (
                <motion.div key="about" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-12">
                   <header><h3 className="text-3xl font-black mb-2 dark:text-white">Brand Story</h3></header>
                  <div className="space-y-8">
                    <input className="w-full bg-white dark:bg-zinc-900 p-8 rounded-[2rem] font-black text-2xl dark:text-white outline-none border border-transparent focus:border-indigo-500" value={data.about.title} onChange={e => setData({...data, about: {...data.about, title: e.target.value}})} />
                    <textarea rows={6} className="w-full bg-white dark:bg-zinc-900 p-8 rounded-[2rem] font-medium dark:text-white outline-none" value={data.about.description} onChange={e => setData({...data, about: {...data.about, description: e.target.value}})} />
                  </div>
                </motion.div>
              )}

              {activeTab === 'niches' && (
                <motion.div key="niches" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-12">
                   <header className="flex justify-between items-end gap-6">
                    <div><h3 className="text-3xl font-black mb-2 dark:text-white">Industry Niches</h3></div>
                    <button type="button" onClick={handleAddNiche} className="flex items-center gap-3 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95"><Plus size={18} /> Add Niche</button>
                  </header>
                  <div className="grid gap-6">
                    {data.niches && data.niches.map((n, idx) => (
                      <div key={n.id} className="bg-white dark:bg-zinc-900/50 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 relative">
                        <button onClick={() => setData(prev => prev ? ({...prev, niches: prev.niches?.filter(item => item.id !== n.id)}) : null)} className="absolute top-6 right-6 text-zinc-300 hover:text-red-500 transition-colors"><Trash2 size={20} /></button>
                        <div className="grid md:grid-cols-3 gap-8 pt-4">
                           <div className="space-y-2">
                             <label className="text-[9px] font-black uppercase text-zinc-400 ml-4 tracking-widest">Industry Title</label>
                             <input className="w-full bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl font-black text-lg dark:text-white outline-none" value={n.title} onChange={e => {
                               setData(prev => {
                                 if (!prev || !prev.niches) return prev;
                                 const arr = [...prev.niches];
                                 arr[idx] = { ...arr[idx], title: e.target.value };
                                 return { ...prev, niches: arr };
                               });
                             }} />
                           </div>
                           <div className="md:col-span-2 space-y-2">
                             <label className="text-[9px] font-black uppercase text-zinc-400 ml-4 tracking-widest">Expertise Description</label>
                             <input className="w-full bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl font-medium text-sm dark:text-white outline-none" value={n.description} onChange={e => {
                               setData(prev => {
                                 if (!prev || !prev.niches) return prev;
                                 const arr = [...prev.niches];
                                 arr[idx] = { ...arr[idx], description: e.target.value };
                                 return { ...prev, niches: arr };
                               });
                             }} />
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'services' && (
                <motion.div key="services" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-12">
                   <header className="flex justify-between items-end gap-6">
                    <div><h3 className="text-3xl font-black mb-2 dark:text-white">Our Services</h3></div>
                    <button type="button" onClick={handleAddService} className="bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-8 py-4 rounded-xl font-black text-[11px] uppercase tracking-widest flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-xl"><Plus size={16}/> Add Service</button>
                  </header>
                  <div className="grid gap-6">
                    {data.services && data.services.map((svc, idx) => (
                      <div key={svc.id} className="bg-white dark:bg-zinc-900/50 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 relative group">
                        <button onClick={() => setData(prev => prev ? ({...prev, services: prev.services.filter(s => s.id !== svc.id)}) : null)} className="absolute top-6 right-6 text-zinc-300 hover:text-red-500 transition-colors"><Trash2 size={20} /></button>
                        <div className="grid md:grid-cols-4 gap-6">
                           <div className="space-y-4">
                              <label className="text-[9px] font-black uppercase text-zinc-400 ml-4 tracking-widest">Service Title</label>
                              <input className="w-full bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl font-black text-lg dark:text-white outline-none" value={svc.title} onChange={e => {
                                setData(prev => {
                                  if (!prev) return prev;
                                  const n = [...prev.services];
                                  n[idx] = { ...n[idx], title: e.target.value };
                                  return { ...prev, services: n };
                                });
                              }} />
                              <label className="text-[9px] font-black uppercase text-zinc-400 ml-4 tracking-widest">Icon Style</label>
                              <select className="w-full bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl font-bold text-[10px] uppercase dark:text-white outline-none" value={svc.icon} onChange={e => {
                                setData(prev => {
                                  if (!prev) return prev;
                                  const n = [...prev.services];
                                  n[idx] = { ...n[idx], icon: e.target.value };
                                  return { ...prev, services: n };
                                });
                              }}>
                                 <option value="Monitor">Monitor (Design)</option>
                                 <option value="Cpu">Cpu (Frontend)</option>
                                 <option value="Terminal">Terminal (Backend)</option>
                                 <option value="Globe">Globe (Web)</option>
                                 <option value="Zap">Zap (Performance)</option>
                              </select>
                           </div>
                           <div className="md:col-span-3 space-y-4">
                             <div className="space-y-2">
                               <label className="text-[9px] font-black uppercase text-zinc-400 ml-4 tracking-widest">Brief Description</label>
                               <textarea rows={2} className="w-full bg-zinc-50 dark:bg-zinc-800 p-5 rounded-2xl font-medium text-sm dark:text-white outline-none" value={svc.description} onChange={e => {
                                 setData(prev => {
                                   if (!prev) return prev;
                                   const n = [...prev.services];
                                   n[idx] = { ...n[idx], description: e.target.value };
                                   return { ...prev, services: n };
                                 });
                               }} />
                             </div>
                             <div className="space-y-2">
                               <label className="text-[9px] font-black uppercase text-zinc-400 ml-4 tracking-widest">Features List (Comma Separated)</label>
                               <textarea rows={3} className="w-full bg-zinc-50 dark:bg-zinc-800 p-5 rounded-2xl font-bold text-xs dark:text-zinc-400 outline-none" value={svc.features?.join(', ') || ''} onChange={e => { 
                                  setData(prev => {
                                    if (!prev) return prev;
                                    const n = [...prev.services];
                                    n[idx] = { ...n[idx], features: e.target.value.split(',').map(f => f.trim()).filter(f => f !== '') };
                                    return { ...prev, services: n };
                                  });
                               }} placeholder="e.g. Next.js Mastery, UI Systems, React Engineering" />
                             </div>
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'skills' && (
                <motion.div key="skills" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-12">
                   <header className="flex justify-between items-end gap-6">
                    <div><h3 className="text-3xl font-black dark:text-white">Core Mastery</h3></div>
                    <button onClick={() => setData(prev => prev ? ({...prev, technicalSkills: [...(prev.technicalSkills || []), { category: "New", icon: "Code2", skills: ["Skill"] }]}) : null)} className="bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-8 py-4 rounded-xl font-black text-[11px] uppercase tracking-widest shadow-xl flex items-center gap-2"><Plus size={16}/> Add Category</button>
                  </header>
                  <div className="grid gap-6">
                    {data.technicalSkills && data.technicalSkills.map((cat, idx) => (
                      <div key={idx} className="bg-white dark:bg-zinc-900/50 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 relative">
                        <button onClick={() => {
                          setData(prev => {
                            if (!prev || !prev.technicalSkills) return prev;
                            const n = [...prev.technicalSkills];
                            n.splice(idx, 1);
                            return { ...prev, technicalSkills: n };
                          });
                        }} className="absolute top-6 right-6 text-zinc-300 hover:text-red-500"><Trash2 size={20} /></button>
                        <div className="grid md:grid-cols-2 gap-6">
                           <input className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl font-black dark:text-white outline-none" value={cat.category} onChange={e => {
                             setData(prev => {
                               if (!prev || !prev.technicalSkills) return prev;
                               const n = [...prev.technicalSkills];
                               n[idx] = { ...n[idx], category: e.target.value };
                               return { ...prev, technicalSkills: n };
                             });
                           }} />
                           <input className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl font-medium dark:text-white outline-none" value={cat.skills.join(', ')} onChange={e => {
                             setData(prev => {
                               if (!prev || !prev.technicalSkills) return prev;
                               const n = [...prev.technicalSkills];
                               n[idx] = { ...n[idx], skills: e.target.value.split(',').map(s => s.trim()) };
                               return { ...prev, technicalSkills: n };
                             });
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
                    <div><h3 className="text-3xl font-black dark:text-white">Career Timeline</h3></div>
                    <button onClick={handleAddExperience} className="bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-8 py-4 rounded-xl font-black text-[11px] uppercase tracking-widest flex items-center gap-2"><Plus size={16}/> Add Milestone</button>
                  </header>
                  <div className="grid gap-6">
                    {data.experiences.map((exp, idx) => (
                      <div key={exp.id} className="bg-white dark:bg-zinc-900/50 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 relative">
                         <button onClick={() => setData(prev => prev ? ({...prev, experiences: prev.experiences.filter(e => e.id !== exp.id)}) : null)} className="absolute top-6 right-6 text-zinc-300 hover:text-red-500"><Trash2 size={20} /></button>
                         <div className="grid md:grid-cols-4 gap-4">
                           <input className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl font-black dark:text-white" value={exp.company} onChange={e => { setData(prev => { if (!prev) return prev; const n = [...prev.experiences]; n[idx] = { ...n[idx], company: e.target.value }; return { ...prev, experiences: n }; }); }} />
                           <input className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl font-bold dark:text-indigo-400" value={exp.role} onChange={e => { setData(prev => { if (!prev) return prev; const n = [...prev.experiences]; n[idx] = { ...n[idx], role: e.target.value }; return { ...prev, experiences: n }; }); }} />
                           <input className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl font-medium dark:text-zinc-400" value={exp.date} onChange={e => { setData(prev => { if (!prev) return prev; const n = [...prev.experiences]; n[idx] = { ...n[idx], date: e.target.value }; return { ...prev, experiences: n }; }); }} />
                           <input className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl font-medium dark:text-zinc-500 text-xs" value={exp.tags.join(', ')} onChange={e => { setData(prev => { if (!prev) return prev; const n = [...prev.experiences]; n[idx] = { ...n[idx], tags: e.target.value.split(',').map(t => t.trim()) }; return { ...prev, experiences: n }; }); }} />
                         </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'projects' && (
                <motion.div key="projects" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-12">
                   <header className="flex justify-between items-end gap-6">
                    <div><h3 className="text-3xl font-black dark:text-white">Portfolio</h3></div>
                    <button onClick={handleAddProject} className="bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-8 py-4 rounded-xl font-black text-[11px] uppercase tracking-widest flex items-center gap-2"><Plus size={16}/> New Project</button>
                  </header>
                  <div className="grid gap-10">
                    {data.projects.map((proj, idx) => (
                      <div key={proj.id} className="bg-white dark:bg-zinc-900/50 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 flex flex-col md:flex-row gap-8 relative">
                        <button onClick={() => setData(prev => prev ? ({...prev, projects: prev.projects.filter(p => p.id !== proj.id)}) : null)} className="absolute top-6 right-6 text-zinc-300 hover:text-red-500"><Trash2 size={24} /></button>
                        <div className="w-48 h-32 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0 relative group">
                           <img src={proj.image} className="w-full h-full object-cover" />
                           <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-white"><Upload size={20}/><input type="file" className="hidden" onChange={e => handleImageUpload(e, b => { setData(prev => { if (!prev) return prev; const n = [...prev.projects]; n[idx] = { ...n[idx], image: b }; return { ...prev, projects: n }; }); })} /></label>
                        </div>
                        <div className="grow grid md:grid-cols-2 gap-4">
                           <input className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl font-black dark:text-white" value={proj.title} onChange={e => { setData(prev => { if (!prev) return prev; const n = [...prev.projects]; n[idx] = { ...n[idx], title: e.target.value }; return { ...prev, projects: n }; }); }} />
                           <input className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl font-bold text-xs uppercase dark:text-zinc-400" value={proj.category} onChange={e => { setData(prev => { if (!prev) return prev; const n = [...prev.projects]; n[idx] = { ...n[idx], category: e.target.value }; return { ...prev, projects: n }; }); }} />
                           <input className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl font-medium text-xs dark:text-zinc-500 md:col-span-2" value={proj.liveLink} onChange={e => { setData(prev => { if (!prev) return prev; const n = [...prev.projects]; n[idx] = { ...n[idx], liveLink: e.target.value }; return { ...prev, projects: n }; }); }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'testimonials' && (
                <motion.div key="testimonials" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-12">
                   <header className="flex justify-between items-end gap-6">
                    <div><h3 className="text-3xl font-black dark:text-white">Verdicts</h3></div>
                    <button onClick={handleAddTestimonial} className="bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-8 py-4 rounded-xl font-black text-[11px] uppercase tracking-widest flex items-center gap-2"><Plus size={16}/> Add Testimonial</button>
                  </header>
                  <div className="grid gap-6">
                    {data.testimonials && data.testimonials.map((t, idx) => (
                      <div key={t.id} className="bg-white dark:bg-zinc-900/50 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 relative">
                        <button onClick={() => setData(prev => prev ? ({...prev, testimonials: prev.testimonials.filter(item => item.id !== t.id)}) : null)} className="absolute top-6 right-6 text-zinc-300 hover:text-red-500"><Trash2 size={20} /></button>
                        <div className="grid md:grid-cols-3 gap-6">
                           <div className="space-y-4">
                             <input className="w-full bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl font-black dark:text-white" value={t.name} onChange={e => { setData(prev => { if (!prev) return prev; const n = [...prev.testimonials]; n[idx] = { ...n[idx], name: e.target.value }; return { ...prev, testimonials: n }; }); }} />
                             <input className="w-full bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl font-bold text-[10px] uppercase dark:text-zinc-500" value={t.role} onChange={e => { setData(prev => { if (!prev) return prev; const n = [...prev.testimonials]; n[idx] = { ...n[idx], role: e.target.value }; return { ...prev, testimonials: n }; }); }} />
                           </div>
                           <textarea className="md:col-span-2 bg-zinc-50 dark:bg-zinc-800 p-6 rounded-2xl font-medium text-sm italic dark:text-white outline-none" rows={4} value={t.content} onChange={e => { setData(prev => { if (!prev) return prev; const n = [...prev.testimonials]; n[idx] = { ...n[idx], content: e.target.value }; return { ...prev, testimonials: n }; }); }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'blog' && (
                <motion.div key="blog" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-12">
                   <header className="flex justify-between items-end gap-6">
                    <div><h3 className="text-3xl font-black mb-2 dark:text-white">Blog Repository</h3></div>
                    <button onClick={handleAddBlog} className="bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-8 py-4 rounded-xl font-black text-[11px] uppercase tracking-widest flex items-center gap-2"><Plus size={16}/> New Article</button>
                  </header>
                  <div className="grid gap-10">
                    {data.blogs && data.blogs.map((post, idx) => (
                      <div key={post.id} className="bg-white dark:bg-zinc-900/50 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 relative group">
                        <button onClick={() => setData(prev => prev ? ({...prev, blogs: prev.blogs.filter(b => b.id !== post.id)}) : null)} className="absolute top-6 right-6 text-zinc-300 hover:text-red-500 transition-colors"><Trash2 size={24} /></button>
                        <div className="flex flex-col md:flex-row gap-8">
                           <div className="w-48 h-36 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0 relative">
                              <img src={post.image} className="w-full h-full object-cover" />
                              <label className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 flex items-center justify-center cursor-pointer text-white transition-opacity"><Upload size={20}/><input type="file" className="hidden" onChange={e => handleImageUpload(e, b => { setData(prev => { if (!prev) return prev; const n = [...prev.blogs]; n[idx] = { ...n[idx], image: b }; return { ...prev, blogs: n }; }); })} /></label>
                           </div>
                           <div className="grow space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                 <div className="space-y-1">
                                    <label className="text-[9px] font-black text-zinc-400 uppercase tracking-widest flex items-center gap-1"><Tag size={10}/> Category</label>
                                    <input className="w-full bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg font-black text-xs dark:text-white" value={post.category} onChange={e => { setData(prev => { if (!prev) return prev; const n = [...prev.blogs]; n[idx] = { ...n[idx], category: e.target.value }; return { ...prev, blogs: n }; }); }} />
                                 </div>
                                 <div className="space-y-1">
                                    <label className="text-[9px] font-black text-zinc-400 uppercase tracking-widest flex items-center gap-1"><Clock size={10}/> Read Time</label>
                                    <input className="w-full bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg font-bold text-xs dark:text-zinc-400" value={post.time} onChange={e => { setData(prev => { if (!prev) return prev; const n = [...prev.blogs]; n[idx] = { ...n[idx], time: e.target.value }; return { ...prev, blogs: n }; }); }} />
                                 </div>
                              </div>
                              <div className="space-y-1">
                                 <label className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Article Title</label>
                                 <textarea className="w-full bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl font-black text-sm dark:text-white leading-tight resize-none" rows={2} value={post.title} onChange={e => { setData(prev => { if (!prev) return prev; const n = [...prev.blogs]; n[idx] = { ...n[idx], title: e.target.value }; return { ...prev, blogs: n }; }); }} />
                              </div>
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'tracking' && (
                <motion.div key="tracking" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-12">
                   <header><h3 className="text-3xl font-black dark:text-white">Tracking & Conversion</h3></header>
                   <div className="space-y-8">
                      <div className="space-y-4">
                         <label className="text-[10px] font-black uppercase text-zinc-400 block ml-4 tracking-widest">Pixel ID</label>
                         <input className="w-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-6 rounded-2xl font-mono dark:text-white outline-none" value={data.tracking?.pixelId || ''} onChange={e => setData({...data, tracking: {...(data.tracking || {pixelId: '', capiToken: ''}), pixelId: e.target.value}})} />
                      </div>
                      <div className="space-y-4">
                         <label className="text-[10px] font-black uppercase text-zinc-400 block ml-4 tracking-widest">CAPI Token</label>
                         <textarea rows={4} className="w-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-6 rounded-2xl font-mono text-[10px] dark:text-white outline-none" value={data.tracking?.capiToken || ''} onChange={e => setData({...data, tracking: {...(data.tracking || {pixelId: '', capiToken: ''}), capiToken: e.target.value}})} />
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
