
import React from 'react';
import { Terminal, Monitor, Cpu, Globe, Layers, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Service } from '../types';

interface ServicesProps {
  services: Service[];
}

const IconMapper: Record<string, React.ReactNode> = {
  Monitor: <Monitor className="text-purple-600" />,
  Cpu: <Cpu className="text-indigo-600" />,
  Terminal: <Terminal className="text-blue-600" />,
  Globe: <Globe className="text-blue-400" />,
  Zap: <Zap className="text-amber-600" />,
};

const Services: React.FC<ServicesProps> = ({ services }) => {
  return (
    <div className="pt-40 pb-32 dark:bg-zinc-950 transition-colors">
      <div className="container mx-auto px-6 max-w-7xl">
        <header className="max-w-4xl mb-32 relative">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none opacity-50"></div>
          <span className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">Our Solutions</span>
          <h1 className="text-6xl md:text-9xl font-black mb-10 font-display tracking-tight text-zinc-950 dark:text-white leading-[0.9] relative z-10">Web Solutions.</h1>
          <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl font-medium relative z-10">We focus exclusively on the technical and visual development of world-class web products.</p>
        </header>

        <div className="grid lg:grid-cols-2 gap-10 mb-20">
          {/* Main Proposition */}
          <div className="bg-zinc-950 p-14 md:p-20 rounded-[4rem] text-white flex flex-col justify-center shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 blur-[100px] pointer-events-none"></div>
            <h2 className="text-4xl md:text-5xl font-black mb-10 leading-[1.1] font-display relative z-10">The High-Performance Standard</h2>
            <p className="text-xl text-zinc-400 mb-16 font-medium leading-relaxed relative z-10">We don't do 'simple sites'. We build technical assets optimized for speed, security, and elite aesthetics.</p>
            <Link to="/contact" className="w-fit bg-white text-zinc-950 px-12 py-6 rounded-full font-black flex items-center gap-4 transition-all shadow-2xl text-sm uppercase tracking-widest">
              Consult with our Architect <ArrowRight size={22} />
            </Link>
          </div>
          
          <div className="grid gap-10">
             {services.slice(0, 1).map((s) => (
                <div key={s.id} className="p-14 rounded-[4rem] bg-zinc-950 text-white shadow-2xl border border-white/5 group">
                  <div className="mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                      {IconMapper[s.icon] || <Cpu className="text-zinc-900" />}
                    </div>
                  </div>
                  <h3 className="text-3xl font-black mb-10 font-display">{s.title}</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
                    {(s.features || []).map(f => (
                      <li key={f} className="flex items-center gap-3 text-zinc-400 text-sm font-bold tracking-tight">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-600"></div> {f}
                      </li>
                    ))}
                  </ul>
                </div>
             ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10">
           {services.slice(1).map((s) => (
              <div key={s.id} className="p-14 rounded-[4rem] bg-zinc-950 text-white shadow-2xl border border-white/5 hover:border-white/10 transition-all group">
                <div className="mb-10">
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                    {IconMapper[s.icon] || <Cpu className="text-zinc-900" />}
                  </div>
                </div>
                <h3 className="text-3xl font-black mb-10 font-display">{s.title}</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
                  {(s.features || []).map(f => (
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
