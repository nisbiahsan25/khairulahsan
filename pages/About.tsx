
import React from 'react';
import { Award, Users, Target, Zap, Cpu } from 'lucide-react';
import { BRAND_NAME } from '../constants';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="pt-40 pb-32 dark:bg-zinc-950 transition-colors">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-12 gap-20 items-start mb-40"
        >
          <div className="lg:col-span-7">
             <header className="mb-16">
              <motion.span variants={itemVariants} className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">Our Philosophy</motion.span>
              <motion.h1 variants={itemVariants} className="text-6xl md:text-9xl font-black mb-12 font-display tracking-tight leading-[0.85] dark:text-white">We Code <br/> The Future.</motion.h1>
              <motion.p variants={itemVariants} className="text-2xl text-zinc-600 dark:text-zinc-400 leading-relaxed mb-12 font-medium">Khairul Ahsan is more than an agency. We are a digital engineering lab focused on high-stakes web architecture and premium user experience.</p>
              
              <div className="space-y-8 text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed">
                <motion.p variants={itemVariants}>Based in Dhaka, we bridge the gap between Asian cost-efficiency and International quality standards. Our code is currently powering businesses across Europe, North America, and the Middle East.</motion.p>
                <motion.p variants={itemVariants}>We believe that luxury in the digital space isn't just about visuals; it's about the "feel" of interaction—the speed of a transition, the logic of a user flow, and the stability of a server.</motion.p>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <motion.div variants={itemVariants} className="p-10 rounded-[2.5rem] bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm">
                  <span className="text-6xl font-black block mb-4 font-display text-zinc-950 dark:text-white">50+</span>
                  <span className="text-zinc-600 dark:text-zinc-500 font-bold uppercase tracking-[0.2em] text-[10px]">Global Deployments</span>
               </motion.div>
               <motion.div variants={itemVariants} className="p-10 rounded-[2.5rem] bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm">
                  <span className="text-6xl font-black block mb-4 font-display text-zinc-950 dark:text-white">5+</span>
                  <span className="text-zinc-600 dark:text-zinc-500 font-bold uppercase tracking-[0.2em] text-[10px]">Years of Innovation</span>
               </motion.div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative lg:sticky lg:top-40"
          >
             <div className="aspect-[4/5] rounded-[4rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 border border-zinc-100 dark:border-zinc-800 group shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" 
                  alt="Founder" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
                />
             </div>
             <motion.div 
               initial={{ scale: 0.8, opacity: 0 }}
               whileInView={{ scale: 1, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.5 }}
               className="absolute -bottom-10 -left-10 bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl"
             >
                <h4 className="text-xl font-bold font-display text-zinc-950 dark:text-white">Khairul Ahsan</h4>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-widest mt-1">Lead Engineer & Architect</p>
             </motion.div>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <Target className="text-indigo-600" />, title: "Precision Strategy", desc: "Every project begins with a 48-hour deep dive into your market and conversion goals." },
            { icon: <Zap className="text-yellow-600" />, title: "Ultra Performance", desc: "We aim for 100/100 Lighthouse scores on every production build we ship." },
            { icon: <Award className="text-purple-600" />, title: "Bespoke Design", desc: "No generic frameworks. We build custom design systems that scale with your brand." },
            { icon: <Users className="text-blue-600" />, title: "Global Sync", desc: "24/7 communication across all timezones to ensure seamless delivery." }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-10 rounded-[2.5rem] hover:bg-white dark:hover:bg-zinc-800 hover:shadow-xl hover:border-zinc-200 dark:hover:border-zinc-700 transition-all group"
            >
              <div className="w-12 h-12 bg-white dark:bg-zinc-800 rounded-xl flex items-center justify-center mb-8 border border-zinc-200 dark:border-zinc-700 shadow-sm transition-transform group-hover:scale-110">{item.icon}</div>
              <h3 className="text-lg font-black mb-4 font-display uppercase tracking-wider text-zinc-950 dark:text-white">{item.title}</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
