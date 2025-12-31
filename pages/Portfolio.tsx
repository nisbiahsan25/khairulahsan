
import React, { useState } from 'react';
import { Project, Category } from '../types';
import ProjectCard from '../components/ProjectCard';
import { CATEGORIES } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

interface PortfolioProps {
  projects: Project[];
}

const Portfolio: React.FC<PortfolioProps> = ({ projects }) => {
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="pt-40 pb-32">
      <div className="container mx-auto px-6 max-w-7xl">
        <header className="max-w-4xl mb-24">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-indigo-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block"
          >
            Proof of Excellence
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-black mb-10 font-display tracking-tight leading-[0.9]"
          >
            Digital <br/> Mastery.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-zinc-500 leading-relaxed max-w-2xl font-medium"
          >
            A curated selection of high-performance solutions we've engineered for clients across the globe.
          </motion.p>
        </header>

        {/* Categories Bar */}
        <div className="flex flex-wrap gap-2 mb-20">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as Category | 'all')}
              className={`px-8 py-4 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${
                activeCategory === cat.id 
                  ? 'bg-white text-black shadow-2xl shadow-white/10' 
                  : 'text-zinc-500 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 gap-12"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-40 text-center glass rounded-[4rem] border-dashed border-white/10">
                <h3 className="text-2xl font-bold text-zinc-600 font-display">Archiving new masterworks...</h3>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Portfolio;
