
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MoveDown, ArrowRight, Terminal, Monitor, Cpu, Briefcase, Quote, Database, Figma, Code2 } from 'lucide-react';
import { SiteData } from '../types';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HomeProps {
  data: SiteData | null;
}

const IconMapper: Record<string, React.ReactNode> = {
  Figma: <Figma className="text-pink-500" />,
  Code2: <Code2 className="text-blue-500" />,
  Database: <Database className="text-emerald-500" />,
  Terminal: <Terminal className="text-indigo-600" />,
  Monitor: <Monitor className="text-purple-600" />,
  Cpu: <Cpu className="text-zinc-900" />,
};

const Home: React.FC<HomeProps> = ({ data }) => {
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 500], [0, 60]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);

  if (!data) return null;

  const { hero, experiences, projects, testimonials, technicalSkills = [] } = data;
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

  const sectionAnimation = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-150px" },
    transition: { duration: 0.3, ease: "easeOut" }
  };

  return (
    <div className="bg-white dark:bg-zinc-950 transition-colors overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] pt-32 md:pt-40 px-6 md:px-10 flex items-center justify-center overflow-hidden">
        
        {/* Abstract Background Animation - Optimized for performance */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" style={{ willChange: 'transform' }}>
          <motion.div 
            animate={{ 
              x: [0, 50, 0], 
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-5%] right-[-5%] w-[400px] h-[400px] bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-[70px]"
            style={{ willChange: 'transform, opacity' }}
          />
          <motion.div 
            animate={{ 
              x: [0, -40, 0], 
              y: [0, 60, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-500/15 rounded-full blur-[80px]"
            style={{ willChange: 'transform, opacity' }}
          />
        </div>

        <div className="container mx-auto max-w-[1400px] grid lg:grid-cols-2 gap-12 lg:gap-10 items-center relative z-10">
          <div className="relative z-20 order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex gap-8 md:gap-16 mb-8 md:mb-12"
            >
              <div>
                <span className="stat-number text-2xl md:text-3xl font-bold dark:text-white">+{hero.projectsCompleted}</span>
                <p className="text-[9px] md:text-[10px] uppercase font-bold text-zinc-400 mt-2 tracking-widest">Built & Deployed</p>
              </div>
              <div>
                <span className="stat-number text-2xl md:text-3xl font-bold dark:text-white">+{hero.startupsRaised}</span>
                <p className="text-[9px] md:text-[10px] uppercase font-bold text-zinc-400 mt-2 tracking-widest">SaaS Redesigns</p>
              </div>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[90px] leading-[0.95] md:leading-[0.9] mb-8 md:mb-10 font-black tracking-tighter dark:text-white flex flex-wrap">
              {titleWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.3, ease: "easeOut" }}
                  className={`mr-[0.2em] ${i === titleWords.length - 1 ? 'text-indigo-600 dark:text-indigo-400' : ''}`}
                >
                  {word}
                </motion.span>
              ))}
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="text-lg md:text-xl text-zinc-600 dark:text-zinc-300 font-medium max-w-lg mb-8 md:mb-10"
            >
              {hero.subheadline}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12 flex items-center gap-4 text-zinc-400 font-bold text-[10px] md:text-xs uppercase tracking-widest"
            >
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                <MoveDown size={20} />
              </motion.div>
              Explore Portfolio
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative aspect-[4/5] w-full max-w-[380px] md:max-w-[420px] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/10 dark:border-white/5 backdrop-blur-sm">
              <img 
                src={hero.image} 
                alt="Elite Web Engineering" 
                className="w-full h-full object-cover grayscale-0 transition-transform duration-[1s] hover:scale-105"
                style={{ willChange: 'transform' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Web Capabilities */}
      <motion.section 
        {...sectionAnimation}
        className="py-16 md:py-24 px-6 md:px-10 bg-zinc-50 dark:bg-zinc-925 transition-colors"
      >
        <div className="container mx-auto max-w-[1400px]">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">Capabilities</span>
              <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[1] dark:text-white">Precision Web <br/> Engineering.</h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl font-medium mb-8 md:mb-12 max-w-lg">I build digital tools for brands that refuse to settle for templates. Every line of code is handwritten for performance and impact.</p>
              <Link to="/services" className="px-8 md:px-10 py-5 md:py-6 bg-white dark:bg-zinc-800 rounded-full font-black uppercase tracking-widest text-[10px] md:text-xs flex items-center gap-4 border border-zinc-200 dark:border-zinc-700 hover:shadow-xl transition-all w-fit dark:text-white">
                 View All Services <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid gap-6 md:gap-8">
               {webServices.map((s, idx) => (
                 <motion.div 
                   key={idx}
                   initial={{ opacity: 0, y: 15 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: idx * 0.05, duration: 0.3 }}
                   className="p-10 md:p-12 rounded-[2.5rem] bg-zinc-950 text-white shadow-2xl border border-white/5 relative group overflow-hidden"
                 >
                   <div className="w-12 h-12 md:w-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm transition-transform group-hover:-rotate-6">
                      {s.icon}
                   </div>
                   <h3 className="text-2xl md:text-3xl font-black mb-6">{s.title}</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10">
                      {s.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-3 text-zinc-400 text-[12px] md:text-sm font-bold">
                           <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> {f}
                        </div>
                      ))}
                   </div>
                 </motion.div>
               ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Technical Arsenal Section */}
      <motion.section 
        {...sectionAnimation}
        className="py-16 md:py-24 px-6 md:px-10 dark:bg-zinc-950 transition-colors"
      >
        <div className="container mx-auto max-w-[1400px]">
          <div className="text-center mb-16 md:mb-20">
            <span className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">Technical Arsenal</span>
            <h2 className="text-5xl md:text-7xl font-black dark:text-white leading-none tracking-tighter">Core Mastery.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {technicalSkills.map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.03, duration: 0.3 }}
                className="p-10 rounded-[3rem] bg-zinc-50 dark:bg-zinc-925 border border-zinc-100 dark:border-zinc-800 hover:shadow-2xl hover:bg-white dark:hover:bg-zinc-900 transition-all group"
              >
                <div className="w-14 h-14 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-8 border border-zinc-100 dark:border-zinc-700 shadow-sm transition-transform group-hover:scale-110">
                  {IconMapper[cat.icon] || <Cpu size={24} />}
                </div>
                <h3 className="text-2xl font-black mb-8 dark:text-white font-display uppercase tracking-wider">{cat.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span key={skill} className="px-4 py-2 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[10px] md:text-[11px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400 group-hover:border-indigo-500/30 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Career Timeline */}
      <motion.section 
        {...sectionAnimation}
        className="py-16 md:py-24 px-6 md:px-10 dark:bg-zinc-950 transition-colors border-t border-zinc-100 dark:border-zinc-900"
      >
        <div className="container mx-auto max-w-[1400px]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-10">
            <div className="max-w-2xl">
              <span className="text-[10px] uppercase font-bold text-zinc-400 mb-4 block tracking-[0.2em]">• Career Graph</span>
              <h2 className="text-5xl md:text-7xl font-black dark:text-white leading-[0.95]">Web Development <br/> Experience</h2>
            </div>
          </div>

          <div className="grid gap-6">
            {experiences.map((exp, idx) => (
              <motion.div 
                key={exp.id || idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.03, duration: 0.3 }}
                className="group p-8 md:p-12 rounded-[2.5rem] bg-zinc-50 dark:bg-zinc-925 border border-zinc-100 dark:border-zinc-800 flex flex-col md:flex-row md:items-center justify-between hover:bg-white dark:hover:bg-zinc-900 transition-all hover:shadow-2xl"
              >
                <div className="flex items-center gap-6 md:gap-8">
                   <div className="w-16 h-16 md:w-20 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center border border-zinc-100 dark:border-zinc-700 shadow-sm text-zinc-900 dark:text-white group-hover:scale-105 transition-transform flex-shrink-0">
                      <Briefcase className="w-8 h-8 md:w-10" />
                   </div>
                   <div>
                      <h4 className="text-xl md:text-2xl font-black dark:text-white mb-2">{exp.company}</h4>
                      <p className="text-indigo-600 dark:text-indigo-400 font-black uppercase tracking-[0.2em] text-[9px] md:text-[11px]">{exp.role}</p>
                   </div>
                </div>
                
                <div className="mt-8 md:mt-0 flex flex-col md:items-end">
                   <span className="text-zinc-900 dark:text-white font-black text-xl md:text-2xl mb-4">{exp.date}</span>
                   <div className="flex flex-wrap gap-2 md:justify-end">
                      {exp.tags.map(t => (
                        <span key={t} className="px-4 py-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700">{t}</span>
                      ))}
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Works */}
      <motion.section 
        {...sectionAnimation}
        className="py-16 md:py-24 px-6 md:px-10 bg-zinc-50 dark:bg-zinc-925 transition-colors"
      >
        <div className="container mx-auto max-w-[1400px]">
          <div className="text-center mb-16 md:mb-20">
            <span className="text-[10px] uppercase font-bold text-zinc-400 mb-4 block tracking-[0.2em]">• Portfolio</span>
            <h2 className="text-5xl md:text-7xl font-black dark:text-white">Recent Deployments</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {projects.slice(0, 3).map((p, idx) => (
              <motion.div 
                key={p.id} 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.03, duration: 0.4 }}
                className="group relative rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl"
              >
                <div className="aspect-[4/5]">
                  <img src={p.image} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" style={{ willChange: 'transform' }} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/20 to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity p-8 flex flex-col justify-end z-10">
                   <h4 className="text-white text-2xl font-black mb-2">{p.title}</h4>
                   <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">{p.category}</p>
                   <div className="mt-6 flex justify-between items-center relative z-20">
                     <a 
                      href={p.liveLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-white text-[10px] font-black uppercase tracking-[0.2em] border-b-2 border-indigo-500 pb-1 hover:text-indigo-400 transition-colors cursor-pointer"
                     >
                       Explore Live
                     </a>
                     <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform shadow-2xl"><ArrowRight size={20} /></div>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section 
        {...sectionAnimation}
        className="py-16 md:py-24 px-6 md:px-10 bg-white dark:bg-zinc-950 transition-colors"
      >
        <div className="container mx-auto max-w-[1400px]">
          <div className="mb-16 md:mb-20">
             <span className="text-[10px] uppercase font-bold text-zinc-400 mb-4 block tracking-[0.2em]">• Social Proof</span>
             <h2 className="text-5xl md:text-7xl font-black dark:text-white leading-none">Client <br/> Verdicts.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
             {testimonials && testimonials.map((t, idx) => (
                <motion.div 
                  key={t.id || idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.03, duration: 0.3 }}
                  className="bg-zinc-50 dark:bg-zinc-925 p-8 md:p-12 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 relative group"
                >
                   <Quote className="text-indigo-600/20 absolute top-8 right-8 w-12 h-12 md:w-16" />
                   <p className="text-lg md:text-2xl font-medium text-zinc-600 dark:text-zinc-300 leading-relaxed mb-8 md:mb-10 relative z-10 italic">
                      "{t.content}"
                   </p>
                   <div className="flex items-center gap-4 md:gap-6">
                      <div className="w-14 h-14 md:w-16 rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all border-4 border-white dark:border-zinc-800 flex-shrink-0">
                         <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                         <h4 className="text-lg md:text-xl font-black dark:text-white">{t.name}</h4>
                         <p className="text-indigo-600 dark:text-indigo-400 text-[10px] md:text-xs font-black uppercase tracking-widest">{t.role}</p>
                      </div>
                   </div>
                </motion.div>
             ))}
          </div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section 
        {...sectionAnimation}
        className="py-24 md:py-32 px-6 md:px-10 text-center dark:bg-zinc-900 transition-colors relative overflow-hidden"
      >
        <div className="container mx-auto max-w-[1400px] relative z-10">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-8xl font-black mb-8 md:mb-12 tracking-tighter dark:text-white leading-[0.9]"
          >
            Ready for a <br/> Digital Overhaul?
          </motion.h2>
          <Link to="/contact" className="inline-flex items-center gap-4 border-b-[3px] md:border-b-[4px] border-indigo-600 dark:border-indigo-400 pb-3 md:pb-4 font-black text-xl md:text-4xl hover:opacity-50 transition-opacity dark:text-white">
            Schedule Discovery Call <ArrowUpRight size={28} className="md:w-10" />
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
