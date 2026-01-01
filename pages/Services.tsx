
import React from 'react';
import { Service } from '../types';
import { Layers, Monitor, Rocket, Terminal, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Services: React.FC = () => {
  const detailedServices = [
    {
      title: "Fullstack Development",
      icon: <Terminal className="text-indigo-600" />,
      features: ["React & Next.js", "Node.js Backends", "PostgreSQL / MongoDB / Mysql", "API Integrations"],
    },
    {
      title: "UI/UX Research & Design",
      icon: <Monitor className="text-purple-600" />,
      features: ["User Journey Mapping", "Figma Prototyping", "Design Systems", "Conversion Analysis"],
    },
    {
      title: "Scalability & Cloud",
      icon: <Globe className="text-blue-600" />,
      features: ["Vercel / AWS Deployment", "Serverless Functions", "CDN Configuration", "Load Balancing"],
    },
    {
      title: "Performance Audits",
      icon: <Rocket className="text-amber-600" />,
      features: ["Core Web Vitals", "Image Optimization", "Code Splitting", "SEO Optimization"],
    },
    {
      title: "Maintenance & Growth",
      icon: <Layers className="text-rose-600" />,
      features: ["Security Updates", "New Feature Rollout", "Analytics Tracking", "A/B Testing"],
    }
  ];

  return (
    <div className="pt-40 pb-32 dark:bg-zinc-950 transition-colors">
      <div className="container mx-auto px-6 max-w-7xl">
        <header className="max-w-4xl mb-32 relative">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none opacity-50"></div>
          <span className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">Our Expertise</span>
          <h1 className="text-6xl md:text-9xl font-black mb-10 font-display tracking-tight text-zinc-950 dark:text-white leading-[0.9] relative z-10">Digital Engineering.</h1>
          <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl font-medium relative z-10">We don't just build websites. We build digital assets that help you dominate your market and automate your sales process.</p>
        </header>

        <div className="grid lg:grid-cols-2 gap-10 mb-20">
          {/* Main Value Proposition Card */}
          <div className="bg-zinc-950 p-14 md:p-20 rounded-[4rem] text-white flex flex-col justify-center shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 blur-[100px] pointer-events-none"></div>
            <h2 className="text-4xl md:text-5xl font-black mb-10 leading-[1.1] font-display relative z-10">The Khairul Ahsan Standard</h2>
            <p className="text-xl text-zinc-400 mb-16 font-medium leading-relaxed relative z-10">Every pixel we place and every line of code we write is optimized for performance, security, and conversion.</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative z-10">
              <Link to="/contact" className="w-fit bg-white text-zinc-950 px-12 py-6 rounded-full font-black flex items-center gap-4 transition-all shadow-2xl text-sm uppercase tracking-widest">
                Discuss Your Project <ArrowRight size={22} />
              </Link>
            </motion.div>
          </div>
          
          {/* First Service Grid Card */}
          <div className="grid gap-10">
             {detailedServices.slice(0, 1).map((s, i) => (
                <div key={i} className="p-14 rounded-[4rem] bg-zinc-950 text-white shadow-2xl border border-white/5 group">
                  <div className="mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                      {s.icon}
                    </div>
                  </div>
                  <h3 className="text-3xl font-black mb-10 font-display">{s.title}</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
                    {s.features.map(f => (
                      <li key={f} className="flex items-center gap-3 text-zinc-400 text-sm font-bold tracking-tight">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-600"></div> {f}
                      </li>
                    ))}
                  </ul>
                </div>
             ))}
          </div>
        </div>

        {/* Remaining Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10">
           {detailedServices.slice(1).map((s, i) => (
              <div key={i} className="p-14 rounded-[4rem] bg-zinc-950 text-white shadow-2xl border border-white/5 hover:border-white/10 transition-all group">
                <div className="mb-10">
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                    {s.icon}
                  </div>
                </div>
                <h3 className="text-3xl font-black mb-10 font-display">{s.title}</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
                  {s.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-zinc-400 text-sm font-bold tracking-tight">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-600"></div> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
