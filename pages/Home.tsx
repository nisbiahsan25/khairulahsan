
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MoveDown, ArrowRight, Terminal, Monitor, Cpu, Briefcase, Quote } from 'lucide-react';
import { SiteData } from '../types';
import { motion } from 'framer-motion';

interface HomeProps {
  data: SiteData | null;
}

const Home: React.FC<HomeProps> = ({ data }) => {
  if (!data) return null;

  const { hero, experiences, projects, testimonials } = data;
  const titleWords = hero.headline.split(" ");

  const webServices = [
    {
      title: "Elite Web Engineering",
      icon: <Terminal className="text-indigo-600" />,
      features: ["Next.js & React Mastery", "Scalable Serverless Code", "Dynamic API Design", "Database Optimization"],
    },
    {
      title: "Technical UI/UX Design",
      icon: <Monitor className="text-purple-600" />,
      features: ["Precision Prototyping", "Design System Architecture", "Interaction Engineering", "Accessibility Standards"],
    }
  ];

  return (
    <div className="bg-white dark:bg-zinc-950 transition-colors">
      {/* Hero Section */}
      <section className="relative min-h-screen pt-40 px-10 flex items-center justify-center overflow-hidden">
        <div className="container mx-auto max-w-[1400px] grid lg:grid-cols-2 gap-10 items-center">
          <div className="relative z-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex gap-16 mb-20"
            >
              <div>
                <span className="stat-number text-3xl font-bold dark:text-white">+{hero.projectsCompleted}</span>
                <p className="text-[10px] uppercase font-bold text-zinc-400 mt-2 tracking-widest">Built & Deployed</p>
              </div>
              <div>
                <span className="stat-number text-3xl font-bold dark:text-white">+{hero.startupsRaised}</span>
                <p className="text-[10px] uppercase font-bold text-zinc-400 mt-2 tracking-widest">SaaS Redesigns</p>
              </div>
            </motion.div>
            
            <h1 className="text-7xl md:text-[110px] leading-[0.8] mb-12 font-black tracking-tighter dark:text-white flex flex-wrap">
              {titleWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  className={`mr-[0.2em] ${i === titleWords.length - 1 ? 'text-indigo-600 dark:text-indigo-400' : ''}`}
                >
                  {word}
                </motion.span>
              ))}
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 font-medium max-w-lg mb-12"
            >
              {hero.subheadline}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-20 flex items-center gap-4 text-zinc-400 font-bold text-xs uppercase tracking-widest"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <MoveDown size={20} />
              </motion.div>
              Explore Portfolio
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            whileHover={{ scale: 1.02 }}
            className="relative aspect-[3/4] rounded-[3.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] dark:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)]"
          >
            <img 
              src={hero.image} 
              alt="Elite Web Engineering" 
              className="w-full h-full object-cover grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent"></div>
          </motion.div>
        </div>
      </section>

      {/* Web Capabilities */}
      <section className="py-40 px-10 bg-zinc-50 dark:bg-zinc-925 transition-colors">
        <div className="container mx-auto max-w-[1400px]">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
            >
              <span className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">Capabilities</span>
              <h2 className="text-6xl md:text-8xl font-black mb-10 leading-[0.9] dark:text-white">Precision Web <br/> Engineering.</h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-xl font-medium mb-12 max-w-lg">I build digital tools for brands that refuse to settle for templates. Every line of code is handwritten for performance and impact.</p>
              <Link to="/services" className="px-10 py-6 bg-white dark:bg-zinc-800 rounded-full font-black uppercase tracking-widest text-xs flex items-center gap-4 border border-zinc-200 dark:border-zinc-700 hover:shadow-xl transition-all w-fit dark:text-white">
                 View All Services <ArrowRight size={18} />
              </Link>
            </motion.div>

            <div className="grid gap-8">
               {webServices.map((s, idx) => (
                 <motion.div 
                   key={idx}
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: idx * 0.2 }}
                   className="p-14 rounded-[3.5rem] bg-zinc-950 text-white shadow-2xl border border-white/5 relative group overflow-hidden"
                 >
                   <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-10 shadow-sm transition-transform group-hover:-rotate-6">
                      {s.icon}
                   </div>
                   <h3 className="text-3xl font-black mb-8">{s.title}</h3>
                   <div className="grid grid-cols-2 gap-y-4 gap-x-10">
                      {s.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-3 text-zinc-400 text-sm font-bold">
                           <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> {f}
                        </div>
                      ))}
                   </div>
                 </motion.div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Career Timeline */}
      <section className="py-40 px-10 dark:bg-zinc-950 transition-colors">
        <div className="container mx-auto max-w-[1400px]">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
            <div className="max-w-2xl">
              <span className="text-[10px] uppercase font-bold text-zinc-400 mb-4 block tracking-[0.2em]">• Career Graph</span>
              <h2 className="text-6xl md:text-8xl font-black dark:text-white leading-[0.9]">Web Development <br/> Experience</h2>
            </div>
          </div>

          <div className="grid gap-8">
            {experiences.map((exp, idx) => (
              <motion.div 
                key={exp.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-10 md:p-14 rounded-[4rem] bg-zinc-50 dark:bg-zinc-925 border border-zinc-100 dark:border-zinc-800 flex flex-col md:flex-row md:items-center justify-between hover:bg-white dark:hover:bg-zinc-900 transition-all hover:shadow-2xl"
              >
                <div className="flex items-center gap-10">
                   <div className="w-24 h-24 bg-white dark:bg-zinc-800 rounded-[2.5rem] flex items-center justify-center border border-zinc-100 dark:border-zinc-700 shadow-sm text-zinc-900 dark:text-white group-hover:scale-110 transition-transform">
                      <Briefcase size={32} />
                   </div>
                   <div>
                      <h4 className="text-3xl font-black dark:text-white mb-2">{exp.company}</h4>
                      <p className="text-indigo-600 dark:text-indigo-400 font-black uppercase tracking-[0.2em] text-[11px]">{exp.role}</p>
                   </div>
                </div>
                
                <div className="mt-8 md:mt-0 flex flex-col md:items-end">
                   <span className="text-zinc-900 dark:text-white font-black text-2xl mb-4">{exp.date}</span>
                   <div className="flex flex-wrap gap-3 md:justify-end">
                      {exp.tags.map(t => (
                        <span key={t} className="px-5 py-2 rounded-full bg-zinc-200 dark:bg-zinc-800 text-[10px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700">{t}</span>
                      ))}
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Works */}
      <section className="py-40 px-10 bg-zinc-50 dark:bg-zinc-925 transition-colors">
        <div className="container mx-auto max-w-[1400px]">
          <div className="text-center mb-24">
            <span className="text-[10px] uppercase font-bold text-zinc-400 mb-4 block tracking-[0.2em]">• Portfolio</span>
            <h2 className="text-7xl font-black dark:text-white">Recent Web Deployments</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {projects.slice(0, 3).map((p, idx) => (
              <motion.div 
                key={p.id} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative rounded-[3rem] overflow-hidden cursor-pointer shadow-xl"
              >
                <div className="aspect-[4/5]">
                  <img src={p.image} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-12 flex flex-col justify-end z-10">
                   <h4 className="text-white text-3xl font-black mb-2">{p.title}</h4>
                   <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">{p.category}</p>
                   <div className="mt-8 flex justify-between items-center relative z-20">
                     <a 
                      href={p.liveLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-white text-xs font-black uppercase tracking-[0.2em] border-b-2 border-indigo-500 pb-1 hover:text-indigo-400 transition-colors cursor-pointer"
                     >
                       Explore Live
                     </a>
                     <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform shadow-2xl"><ArrowRight size={24} /></div>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-40 px-10 bg-white dark:bg-zinc-950 transition-colors">
        <div className="container mx-auto max-w-[1400px]">
          <div className="mb-24">
             <span className="text-[10px] uppercase font-bold text-zinc-400 mb-4 block tracking-[0.2em]">• Social Proof</span>
             <h2 className="text-6xl md:text-8xl font-black dark:text-white leading-none">Client <br/> Verdicts.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10">
             {testimonials && testimonials.map((t, idx) => (
                <motion.div 
                  key={t.id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-zinc-50 dark:bg-zinc-925 p-16 rounded-[4rem] border border-zinc-100 dark:border-zinc-800 relative group"
                >
                   <Quote className="text-indigo-600/20 absolute top-12 right-12" size={80} />
                   <p className="text-2xl md:text-3xl font-medium text-zinc-600 dark:text-zinc-300 leading-relaxed mb-12 relative z-10 italic">
                      "{t.content}"
                   </p>
                   <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all border-4 border-white dark:border-zinc-800">
                         <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                         <h4 className="text-xl font-black dark:text-white">{t.name}</h4>
                         <p className="text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-widest">{t.role}</p>
                      </div>
                   </div>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-60 px-10 text-center dark:bg-zinc-900 transition-colors relative overflow-hidden">
        <div className="container mx-auto max-w-[1400px] relative z-10">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-6xl md:text-9xl font-black mb-12 tracking-tighter dark:text-white leading-[0.85]"
          >
            Ready for a <br/> Digital Overhaul?
          </motion.h2>
          <Link to="/contact" className="inline-flex items-center gap-4 border-b-[4px] border-indigo-600 dark:border-indigo-400 pb-4 font-black text-2xl md:text-4xl hover:opacity-50 transition-opacity dark:text-white">
            Schedule Discovery Call <ArrowUpRight size={40} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
