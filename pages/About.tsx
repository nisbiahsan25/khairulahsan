
import React from 'react';
import { Target, Zap, Cpu, Code } from 'lucide-react';
import { motion } from 'framer-motion';
import { SiteData } from '../types';

interface AboutProps {
  data: SiteData | null;
}

const About: React.FC<AboutProps> = ({ data }) => {
  if (!data) return null;
  const { about } = data;

  // Fix: added 'as const' to ease to ensure it's treated as a specific literal string for framer-motion compatibility
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  return (
    <div className="pt-40 pb-32 dark:bg-zinc-950 transition-colors">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-12 gap-20 items-start mb-40"
        >
          <div className="lg:col-span-7">
             <header className="mb-16">
              <motion.span variants={itemVariants} className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">Philosophy</motion.span>
              <motion.h1 variants={itemVariants} className="text-6xl md:text-9xl font-black mb-12 font-display tracking-tight leading-[0.85] dark:text-white">
                {about.title}
              </motion.h1>
              <motion.p variants={itemVariants} className="text-2xl text-zinc-600 dark:text-zinc-400 leading-relaxed mb-12 font-medium">
                {about.point1}
              </motion.p>
              
              <div className="space-y-8 text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed">
                <motion.p variants={itemVariants}>
                  {about.description}
                </motion.p>
                <motion.p variants={itemVariants}>
                  {about.point2}
                </motion.p>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <motion.div variants={itemVariants} className="p-10 rounded-[2.5rem] bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm">
                  <span className="text-6xl font-black block mb-4 font-display text-zinc-950 dark:text-white">
                    {about.engagementStat}
                  </span>
                  <span className="text-zinc-600 dark:text-zinc-500 font-bold uppercase tracking-[0.2em] text-[10px]">Technical Performance</span>
               </motion.div>
               <motion.div variants={itemVariants} className="p-10 rounded-[2.5rem] bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm">
                  <span className="text-6xl font-black block mb-4 font-display text-zinc-950 dark:text-white">0%</span>
                  <span className="text-zinc-600 dark:text-zinc-500 font-bold uppercase tracking-[0.2em] text-[10px]">Template Usage</span>
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
                  src={about.imageMain || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"} 
                  alt="Ahsan" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
                />
             </div>
             {about.imageSecondary && (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 className="absolute -bottom-10 -left-10 w-48 h-48 rounded-[2.5rem] overflow-hidden border-8 border-white dark:border-zinc-950 shadow-2xl hidden md:block"
               >
                 <img src={about.imageSecondary} className="w-full h-full object-cover" />
               </motion.div>
             )}
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <Code className="text-indigo-600" />, title: "Custom Logic", desc: "Hand-written code for unique business requirements." },
            { icon: <Zap className="text-yellow-600" />, title: "Web Vitals", desc: "Optimized for the latest Google search standards." },
            { icon: <Target className="text-purple-600" />, title: "User Flows", desc: "Interfaces engineered for maximum user retention." },
            { icon: <Cpu className="text-blue-600" />, title: "Stack Choice", desc: "Using only the most stable, modern web technologies." }
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
