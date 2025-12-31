
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Plus, MoveDown, ArrowRight, Cpu } from 'lucide-react';
import { SiteData } from '../types';
import { motion } from 'framer-motion';

interface HomeProps {
  data: SiteData | null;
}

const Home: React.FC<HomeProps> = ({ data }) => {
  if (!data) return null;

  const { hero, about, experiences, projects, blogs } = data;

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen pt-40 px-10 flex items-center justify-center overflow-hidden">
        <div className="container mx-auto max-w-[1400px] grid lg:grid-cols-2 gap-10 items-center">
          <div className="relative z-20">
            <div className="flex gap-16 mb-20">
              <div>
                <span className="stat-number text-3xl font-bold">+{hero.projectsCompleted}</span>
                <p className="text-[10px] uppercase font-bold text-zinc-400 mt-2 tracking-widest">Project completed</p>
              </div>
              <div>
                <span className="stat-number text-3xl font-bold">+{hero.startupsRaised}</span>
                <p className="text-[10px] uppercase font-bold text-zinc-400 mt-2 tracking-widest">Startup raised</p>
              </div>
            </div>
            
            <h1 className="text-8xl md:text-[140px] leading-[0.85] mb-8 font-black tracking-tighter">
              {hero.headline}
            </h1>
            <p className="text-xl md:text-2xl text-zinc-600 font-medium max-w-lg mb-12">
              {hero.subheadline}
            </p>
            
            <div className="mt-20 flex items-center gap-4 text-zinc-400 font-bold text-xs uppercase tracking-widest">
              <MoveDown size={20} /> Scroll down
            </div>
          </div>
          
          <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden grayscale">
            <img 
              src={hero.image} 
              alt="Designer" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-40 px-10 bg-[#FAFAFA]">
        <div className="container mx-auto max-w-[1400px]">
          <div className="grid lg:grid-cols-12 gap-20">
            <div className="lg:col-span-4">
              <h2 className="text-5xl font-black mb-8">{about.title}</h2>
              <p className="text-zinc-500 leading-relaxed font-medium">{about.description}</p>
            </div>
            <div className="lg:col-span-8 grid md:grid-cols-2 gap-10">
              <div className="bg-white p-12 rounded-[2rem] shadow-sm border border-zinc-100 flex flex-col justify-between">
                <Cpu className="mb-6 text-zinc-900" size={32} />
                <div>
                  <h3 className="text-6xl font-black mb-4">{about.engagementStat}</h3>
                  <p className="text-zinc-500 font-medium text-sm">Average increase in client engagement</p>
                </div>
              </div>
              <div className="aspect-square rounded-[2rem] overflow-hidden grayscale">
                <img src={about.imageMain} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Works */}
      <section className="py-40 px-10">
        <div className="container mx-auto max-w-[1400px]">
          <div className="text-center mb-24">
            <span className="text-[10px] uppercase font-bold text-zinc-400 mb-4 block tracking-[0.2em]">• Portfolio</span>
            <h2 className="text-7xl font-black">Latest Works</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {projects.slice(0, 3).map((p) => (
              <div key={p.id} className="group relative rounded-[2rem] overflow-hidden cursor-pointer">
                <div className="aspect-[4/5]">
                  <img src={p.image} className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-10 flex flex-col justify-end z-10">
                   <h4 className="text-white text-2xl font-black mb-2">{p.title}</h4>
                   <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest">{p.category}</p>
                   <div className="mt-6 flex justify-between items-center relative z-20">
                     <a 
                      href={p.liveLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-white text-xs font-bold underline hover:text-indigo-400 transition-colors cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                     >
                       Visit Site
                     </a>
                     <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform"><ArrowRight size={20} /></div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-60 px-10 text-center">
        <div className="container mx-auto max-w-[1400px]">
          <h2 className="text-6xl md:text-8xl font-black mb-12 tracking-tighter">Got a Vision? <br/> Let's Bring It to Life!</h2>
          <Link to="/contact" className="inline-flex items-center gap-2 border-b-2 border-black pb-2 font-black text-xl hover:opacity-50 transition-opacity">Book A Call <ArrowUpRight size={24} /></Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
