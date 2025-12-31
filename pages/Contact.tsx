
import React, { useState } from 'react';
import { Mail, Send, MapPin, MessageSquare, Linkedin, Twitter, Instagram, Loader2, CheckCircle2 } from 'lucide-react';
import { WHATSAPP_LINK, EMAIL_LINK } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { triggerLeadEvent } from '../services/apiService';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.name) return;
    
    setStatus('loading');

    // 1. Client-side Pixel Track (Lead)
    if ((window as any).fbq) {
      (window as any).fbq('track', 'Lead', {
        content_name: 'Contact Form Inquiry',
        value: 0.00,
        currency: 'USD'
      });
    }

    // 2. Server-side CAPI Track (Lead)
    await triggerLeadEvent(formData.name, formData.email);

    // Simulate sending time
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <div className="pt-40 pb-32 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <header className="max-w-4xl mb-24">
          <span className="text-indigo-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">Get In Touch</span>
          <h1 className="text-6xl md:text-9xl font-black mb-10 font-display tracking-tight text-zinc-950 leading-[0.9]">Let's Build.</h1>
          <p className="text-xl md:text-2xl text-zinc-500 leading-relaxed max-w-2xl font-medium">Ready to transform your online presence? Choose your preferred way to connect.</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-10 mb-32">
           <motion.a whileHover={{ y: -10 }} href={WHATSAPP_LINK} target="_blank" className="group glass-card p-14 rounded-[3.5rem] block shadow-sm border border-zinc-100">
              <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center mb-10 group-hover:rotate-12 transition-transform shadow-sm">
                 <MessageSquare className="text-green-600" size={30} />
              </div>
              <h3 className="text-4xl font-black mb-6 font-display text-zinc-950">WhatsApp</h3>
              <p className="text-zinc-500 mb-10 leading-relaxed text-lg">Direct chat for quick discovery.</p>
           </motion.a>

           <motion.a whileHover={{ y: -10 }} href={EMAIL_LINK} className="group glass-card p-14 rounded-[3.5rem] block shadow-sm border border-zinc-100">
              <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mb-10 group-hover:rotate-12 transition-transform shadow-sm">
                 <Mail className="text-indigo-600" size={30} />
              </div>
              <h3 className="text-4xl font-black mb-6 font-display text-zinc-950">Email</h3>
              <p className="text-zinc-500 mb-10 leading-relaxed text-lg">Send us your project brief.</p>
           </motion.a>

           <div className="glass-card p-14 rounded-[3.5rem] shadow-sm border border-zinc-100">
              <div className="w-20 h-20 bg-zinc-100 rounded-3xl flex items-center justify-center mb-10">
                 <MapPin className="text-zinc-900" size={30} />
              </div>
              <h3 className="text-4xl font-black mb-6 font-display text-zinc-950">Location</h3>
              <div className="flex gap-5">
                 {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                    <button key={i} className="w-12 h-12 rounded-2xl border border-zinc-200 flex items-center justify-center hover:bg-zinc-900 hover:text-white transition-all shadow-sm"><Icon size={20} /></button>
                 ))}
              </div>
           </div>
        </div>

        <div className="bg-zinc-50/50 p-12 md:p-24 rounded-[4rem] relative overflow-hidden border border-zinc-100 shadow-sm">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50/50 blur-[150px] pointer-events-none"></div>
           <div className="max-w-4xl mx-auto relative">
              <h2 className="text-4xl md:text-6xl font-black mb-16 text-center font-display text-zinc-950 tracking-tight">Let's Talk Business.</h2>
              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-10">
                 <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-4">Full Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="John Doe" 
                      className="w-full bg-white border border-zinc-200 rounded-[2rem] px-8 py-6 focus:outline-none focus:border-indigo-600 transition-all shadow-sm font-medium"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                 </div>
                 <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-4">Email Address</label>
                    <input 
                      required
                      type="email" 
                      placeholder="john@company.com" 
                      className="w-full bg-white border border-zinc-200 rounded-[2rem] px-8 py-6 focus:outline-none focus:border-indigo-600 transition-all shadow-sm font-medium"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                 </div>
                 <div className="md:col-span-2 space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-4">Project Overview</label>
                    <textarea 
                      rows={5} 
                      placeholder="I need a high-end redesign..." 
                      className="w-full bg-white border border-zinc-200 rounded-[2.5rem] px-8 py-6 focus:outline-none focus:border-indigo-600 transition-all shadow-sm resize-none font-medium"
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                 </div>
                 <div className="md:col-span-2">
                    <motion.button 
                      disabled={status !== 'idle'}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      type="submit"
                      className="w-full bg-white border border-zinc-100 py-8 rounded-[2rem] text-xl font-black text-indigo-600 flex items-center justify-center gap-4 transition-all shadow-xl shadow-zinc-200 disabled:opacity-50"
                    >
                       <AnimatePresence mode="wait">
                         {status === 'loading' ? (
                           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-3">
                              <Loader2 className="animate-spin" /> Syncing with Server...
                           </motion.div>
                         ) : status === 'success' ? (
                           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-3 text-green-600">
                              <CheckCircle2 /> Inquiry Launched!
                           </motion.div>
                         ) : (
                           <span className="flex items-center gap-4">Launch Inquiry <Send size={26} /></span>
                         )}
                       </AnimatePresence>
                    </motion.button>
                 </div>
              </form>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
