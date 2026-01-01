
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

    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <div className="pt-40 pb-32 bg-white dark:bg-zinc-950 transition-colors">
      <div className="container mx-auto px-6 max-w-7xl">
        <header className="max-w-4xl mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl md:text-9xl font-black mb-10 font-display tracking-tight text-zinc-950 dark:text-white leading-[0.9]"
          >
            Let's Build.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl font-medium"
          >
            Ready to transform your online presence? Choose your preferred way to connect.
          </motion.p>
        </header>

        {/* Contact Method Cards matching Screenshot */}
        <div className="grid lg:grid-cols-3 gap-10 mb-32">
           <motion.a 
            whileHover={{ y: -8 }} 
            href={WHATSAPP_LINK} 
            target="_blank" 
            className="group bg-zinc-950 dark:bg-zinc-925 p-16 rounded-[4rem] block shadow-2xl relative overflow-hidden"
           >
              <div className="w-20 h-20 bg-[#E8F5E9] dark:bg-green-950/30 rounded-[2rem] flex items-center justify-center mb-12 group-hover:scale-110 transition-transform">
                 <MessageSquare className="text-green-600" size={30} />
              </div>
              <h3 className="text-4xl font-black mb-4 font-display text-white">WhatsApp</h3>
              <p className="text-zinc-400 text-lg font-medium">Direct chat for quick discovery.</p>
           </motion.a>

           <motion.a 
            whileHover={{ y: -8 }} 
            href={EMAIL_LINK} 
            className="group bg-zinc-950 dark:bg-zinc-925 p-16 rounded-[4rem] block shadow-2xl relative overflow-hidden"
           >
              <div className="w-20 h-20 bg-[#E8EAF6] dark:bg-indigo-950/30 rounded-[2rem] flex items-center justify-center mb-12 group-hover:scale-110 transition-transform">
                 <Mail className="text-indigo-600" size={30} />
              </div>
              <h3 className="text-4xl font-black mb-4 font-display text-white">Email</h3>
              <p className="text-zinc-400 text-lg font-medium">Send us your project brief.</p>
           </motion.a>

           <div className="bg-zinc-950 dark:bg-zinc-925 p-16 rounded-[4rem] shadow-2xl relative">
              <div className="w-20 h-20 bg-white dark:bg-zinc-800 rounded-[2rem] flex items-center justify-center mb-12">
                 <MapPin className="text-zinc-950 dark:text-white" size={30} />
              </div>
              <h3 className="text-4xl font-black mb-10 font-display text-white">Location</h3>
              <div className="flex gap-4">
                 {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                    <button key={i} className="w-12 h-12 rounded-2xl border border-white/20 dark:border-zinc-700 flex items-center justify-center hover:bg-white hover:text-zinc-950 dark:hover:bg-zinc-800 transition-all text-white">
                      <Icon size={20} />
                    </button>
                 ))}
              </div>
           </div>
        </div>

        {/* Form Section matching Screenshot */}
        <div className="bg-zinc-50/50 dark:bg-zinc-900/30 p-12 md:p-32 rounded-[5rem] relative overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-sm">
           <div className="max-w-4xl mx-auto relative">
              <h2 className="text-5xl md:text-7xl font-black mb-20 text-center font-display text-zinc-950 dark:text-white tracking-tight">Let's Talk Business.</h2>
              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-x-12 gap-y-12">
                 <div className="space-y-6">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 ml-6">Full Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="John Doe" 
                      className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-[2.5rem] px-10 py-7 focus:outline-none focus:border-indigo-600 transition-all shadow-sm font-bold text-lg dark:text-white"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                 </div>
                 <div className="space-y-6">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 ml-6">Email Address</label>
                    <input 
                      required
                      type="email" 
                      placeholder="john@company.com" 
                      className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-[2.5rem] px-10 py-7 focus:outline-none focus:border-indigo-600 transition-all shadow-sm font-bold text-lg dark:text-white"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                 </div>
                 <div className="md:col-span-2 space-y-6">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 ml-6">Project Overview</label>
                    <textarea 
                      rows={6} 
                      placeholder="I need a high-end redesign..." 
                      className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-[3.5rem] px-10 py-8 focus:outline-none focus:border-indigo-600 transition-all shadow-sm resize-none font-bold text-lg dark:text-white"
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                 </div>
                 <div className="md:col-span-2 pt-10">
                    <motion.button 
                      disabled={status !== 'idle'}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      type="submit"
                      className="w-full bg-zinc-950 dark:bg-white py-9 rounded-[3rem] text-xl font-black text-white dark:text-zinc-950 flex items-center justify-center gap-6 transition-all shadow-2xl disabled:opacity-50"
                    >
                       <AnimatePresence mode="wait">
                         {status === 'loading' ? (
                           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-3">
                              <Loader2 className="animate-spin" /> Transmitting...
                           </motion.div>
                         ) : status === 'success' ? (
                           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-3 text-green-500">
                              <CheckCircle2 /> Project Brief Received
                           </motion.div>
                         ) : (
                           <span className="flex items-center gap-6 uppercase tracking-[0.2em] text-xs">Launch Project Inquiry <Send size={20} /></span>
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
