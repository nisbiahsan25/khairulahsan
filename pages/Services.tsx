
import React from 'react';
import { Service } from '../types';
import { Layers, Monitor, Rocket, Terminal, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ServicesProps {
  services: Service[];
}

const Services: React.FC<ServicesProps> = ({ services }) => {
  const detailedServices = [
    {
      title: "Fullstack Development",
      icon: <Terminal className="text-indigo-600" />,
      features: ["React & Next.js", "Node.js Backends", "PostgreSQL / MongoDB / Mysql", "API Integrations"],
      bg: "bg-indigo-50/50",
      border: "border-indigo-100"
    },
    {
      title: "UI/UX Research & Design",
      icon: <Monitor className="text-purple-600" />,
      features: ["User Journey Mapping", "Figma Prototyping", "Design Systems", "Conversion Analysis"],
      bg: "bg-purple-50/50",
      border: "border-purple-100"
    },
    {
      title: "Scalability & Cloud",
      icon: <Globe className="text-blue-600" />,
      features: ["Vercel / AWS Deployment", "Serverless Functions", "CDN Configuration", "Load Balancing"],
      bg: "bg-blue-50/50",
      border: "border-blue-100"
    },
    {
      title: "Performance Audits",
      icon: <Rocket className="text-amber-600" />,
      features: ["Core Web Vitals", "Image Optimization", "Code Splitting", "SEO Optimization"],
      bg: "bg-amber-50/50",
      border: "border-amber-100"
    },
    {
      title: "Maintenance & Growth",
      icon: <Layers className="text-rose-600" />,
      features: ["Security Updates", "New Feature Rollout", "Analytics Tracking", "A/B Testing"],
      bg: "bg-rose-50/50",
      border: "border-rose-100"
    }
  ];

  return (
    <div className="pt-40 pb-32 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <header className="max-w-4xl mb-32 relative">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-50 rounded-full blur-[100px] pointer-events-none opacity-50"></div>
          <span className="text-indigo-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">Our Expertise</span>
          <h1 className="text-6xl md:text-9xl font-black mb-10 font-display tracking-tight text-zinc-950 leading-[0.9] relative z-10">Digital Engineering.</h1>
          <p className="text-xl md:text-2xl text-zinc-500 leading-relaxed max-w-2xl font-medium relative z-10">We don't just build websites. We build digital assets that help you dominate your market and automate your sales process.</p>
        </header>

        <div className="grid lg:grid-cols-2 gap-10 mb-32">
          <div className="accent-gradient p-14 md:p-20 rounded-[4rem] text-white flex flex-col justify-center shadow-2xl shadow-indigo-200">
            <h2 className="text-4xl md:text-5xl font-black mb-10 leading-[1.1] font-display">The "Khairul Ahsan" Standard</h2>
            <p className="text-xl text-white/80 mb-16 font-medium leading-relaxed">Every pixel we place and every line of code we write is optimized for performance, security, and conversion.</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/contact" className="w-fit bg-white text-zinc-950 px-12 py-6 rounded-full font-black flex items-center gap-4 transition-all shadow-2xl shadow-black/10 text-sm uppercase tracking-widest">
                Discuss Your Project <ArrowRight size={22} />
              </Link>
            </motion.div>
          </div>
          
          <div className="grid gap-10">
            {detailedServices.slice(0, 2).map((s, i) => (
              <div key={i} className={`glass-card p-14 rounded-[4rem] group border ${s.bg} ${s.border}`}>
                <div className="mb-10">
                  <motion.div 
                    animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-16 h-16 rounded-2xl bg-white border border-zinc-100 flex items-center justify-center shadow-sm"
                  >
                    {s.icon}
                  </motion.div>
                </div>
                <h3 className="text-3xl font-black mb-10 font-display text-zinc-950">{s.title}</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {s.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-zinc-500 text-sm font-bold tracking-tight">
                      <div className="w-2 h-2 rounded-full bg-indigo-600"></div> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
           {detailedServices.slice(2).map((s, i) => (
              <div key={i} className={`glass-card p-14 rounded-[4rem] group border ${s.bg} ${s.border}`}>
                <div className="mb-10">
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                    className="w-16 h-16 rounded-2xl bg-white border border-zinc-100 flex items-center justify-center shadow-sm"
                  >
                    {s.icon}
                  </motion.div>
                </div>
                <h3 className="text-2xl font-black mb-8 font-display text-zinc-950">{s.title}</h3>
                <ul className="space-y-4">
                  {s.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-zinc-400 text-sm font-bold tracking-tight">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-200"></div> {f}
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
