
import React, { useState } from 'react';
import { Project, Category } from '../types';
import ProjectCard from '../components/ProjectCard';
import { motion, AnimatePresence } from 'framer-motion';

interface PortfolioProps {
  projects: Project[];
  categories: string[];
}

const Portfolio: React.FC<PortfolioProps> = ({ projects, categories }) => {
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="pt-40 pb-32 bg-white dark:bg-zinc-950 transition-colors">
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
            className="text-6xl md:text-9xl font-black mb-10 font-display tracking-tight leading-[0.9] dark:text-white"
          >
            Digital <br/> Mastery.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl font-medium"
          >
            A curated selection of high-performance solutions we've engineered for clients across the globe.
          </motion.p>
        </header>

        {/* Dynamic Categories Bar */}
        <div className="flex flex-wrap gap-2 mb-20">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-8 py-4 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${
              activeCategory === 'all' 
                ? 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 shadow-2xl' 
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900'
            }`}
          >
            All Projects
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-4 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${
                activeCategory === cat 
                  ? 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 shadow-2xl' 
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900'
              }`}
            >
              {cat}
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
              <div className="col-span-full py-40 text-center bg-zinc-50 dark:bg-zinc-900/50 rounded-[4rem] border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                <h3 className="text-2xl font-bold text-zinc-400 font-display">Archiving new masterworks...</h3>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Portfolio;
