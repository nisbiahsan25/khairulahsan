
import React from 'react';
import { Mail, Send, MapPin, MessageSquare, Linkedin, Twitter, Instagram } from 'lucide-react';
import { WHATSAPP_LINK, EMAIL_LINK } from '../constants';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  return (
    <div className="pt-40 pb-32 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <header className="max-w-4xl mb-24">
          <span className="text-indigo-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">Get In Touch</span>
          <h1 className="text-6xl md:text-9xl font-black mb-10 font-display tracking-tight text-zinc-950 leading-[0.9]">Let's Build.</h1>
          <p className="text-xl md:text-2xl text-zinc-500 leading-relaxed max-w-2xl font-medium">Ready to transform your online presence? Choose your preferred way to connect. We typically respond within 2 hours.</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-10 mb-32">
           <motion.a 
            whileHover={{ y: -10 }}
            href={WHATSAPP_LINK} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group glass-card p-14 rounded-[3.5rem] block shadow-sm border border-zinc-100"
           >
              <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center mb-10 group-hover:rotate-12 transition-transform shadow-sm">
                 <MessageSquare className="text-green-600" size={30} />
              </div>
              <h3 className="text-4xl font-black mb-6 font-display text-zinc-950">WhatsApp</h3>
              <p className="text-zinc-500 mb-10 leading-relaxed text-lg">Direct chat for quick questions and project discovery.</p>
              <span className="text-green-600 font-black uppercase tracking-widest text-xs flex items-center gap-3 group-hover:translate-x-3 transition-transform">
                Start Chatting <Send size={18} />
              </span>
           </motion.a>

           <motion.a 
            whileHover={{ y: -10 }}
            href={EMAIL_LINK}
            className="group glass-card p-14 rounded-[3.5rem] block shadow-sm border border-zinc-100"
           >
              <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mb-10 group-hover:rotate-12 transition-transform shadow-sm">
                 <Mail className="text-indigo-600" size={30} />
              </div>
              <h3 className="text-4xl font-black mb-6 font-display text-zinc-950">Email</h3>
              <p className="text-zinc-500 mb-10 leading-relaxed text-lg">Send us your project brief or RFP for a formal quote.</p>
              <span className="text-indigo-600 font-black uppercase tracking-widest text-xs flex items-center gap-3 group-hover:translate-x-3 transition-transform">
                Send Inquiry <Send size={18} />
              </span>
           </motion.a>

           <div className="glass-card p-14 rounded-[3.5rem] shadow-sm border border-zinc-100">
              <div className="w-20 h-20 bg-zinc-100 rounded-3xl flex items-center justify-center mb-10">
                 <MapPin className="text-zinc-900" size={30} />
              </div>
              <h3 className="text-4xl font-black mb-6 font-display text-zinc-950">Location</h3>
              <p className="text-zinc-500 mb-10 leading-relaxed text-lg">Global operations focused on premium digital assets.</p>
              <div className="flex gap-5">
                 {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                    <button key={i} className="w-12 h-12 rounded-2xl border border-zinc-200 flex items-center justify-center hover:bg-zinc-900 hover:text-white transition-all shadow-sm">
                       <Icon size={20} />
                    </button>
                 ))}
              </div>
           </div>
        </div>

        {/* Lead Generation Form (Refined for visibility) */}
        <div className="bg-zinc-50/50 p-12 md:p-24 rounded-[4rem] relative overflow-hidden border border-zinc-100 shadow-sm">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50/50 blur-[150px] pointer-events-none"></div>
           <div className="max-w-4xl mx-auto relative">
              <h2 className="text-4xl md:text-6xl font-black mb-16 text-center font-display text-zinc-950 tracking-tight">Let's Talk Business.</h2>
              <form className="grid md:grid-cols-2 gap-10">
                 <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-4">Full Name</label>
                    <input type="text" placeholder="John Doe" className="w-full bg-white border border-zinc-200 rounded-[2rem] px-8 py-6 focus:outline-none focus:border-indigo-600 transition-all shadow-sm font-medium" />
                 </div>
                 <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-4">Email Address</label>
                    <input type="email" placeholder="john@company.com" className="w-full bg-white border border-zinc-200 rounded-[2rem] px-8 py-6 focus:outline-none focus:border-indigo-600 transition-all shadow-sm font-medium" />
                 </div>
                 <div className="md:col-span-2 space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-4">Project Overview</label>
                    <textarea rows={5} placeholder="I need a high-end redesign for my fintech startup..." className="w-full bg-white border border-zinc-200 rounded-[2.5rem] px-8 py-6 focus:outline-none focus:border-indigo-600 transition-all shadow-sm resize-none font-medium"></textarea>
                 </div>
                 <div className="md:col-span-2">
                    {/* Fixed styling to match screenshot: White button with indigo text */}
                    <motion.button 
                      whileHover={{ scale: 1.01, boxShadow: '0 20px 40px -10px rgba(99, 102, 241, 0.2)' }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full bg-white border border-zinc-100 py-8 rounded-[2rem] text-xl font-black text-indigo-600 flex items-center justify-center gap-4 transition-all shadow-xl shadow-zinc-200"
                    >
                       Launch Inquiry <Send size={26} />
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
