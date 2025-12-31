
import React from 'react';
import { ExternalLink, MoveRight } from 'lucide-react';
import { Project } from '../types';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const handleLinkClick = (e: React.MouseEvent) => {
    // Prevent event bubbling if necessary, but ensure link works
    e.stopPropagation();
  };

  return (
    <div className="group relative rounded-[3rem] overflow-hidden bg-white border border-zinc-100 shadow-xl shadow-zinc-200/40">
      <div className="aspect-[16/11] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-700"></div>
      </div>

      <div className="absolute inset-0 p-12 flex flex-col justify-end z-20">
        <div className="mb-6 flex gap-3 pointer-events-none">
          <span className="px-5 py-2 rounded-full bg-white/20 backdrop-blur-2xl text-[10px] uppercase tracking-[0.2em] font-black text-white border border-white/20">
            {project.category}
          </span>
        </div>
        
        <h3 className="text-4xl md:text-5xl font-black text-white mb-8 font-display tracking-tight transition-transform duration-500 group-hover:-translate-y-2 pointer-events-none">
          {project.title}
        </h3>
        
        <div className="h-0 group-hover:h-14 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out overflow-hidden">
          <div className="flex items-center justify-between border-t border-white/20 pt-6">
             <div className="flex gap-5 pointer-events-none">
               {project.techStack.slice(0, 3).map(t => (
                 <span key={t} className="text-[10px] text-zinc-300 font-bold uppercase tracking-widest">{t}</span>
               ))}
             </div>
             <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick}
              className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-white hover:text-indigo-400 transition-colors cursor-pointer"
            >
              Visit Site <MoveRight size={16} />
            </a>
          </div>
        </div>
      </div>
      
      {/* Corner link visual - Always clickable */}
      <a 
        href={project.liveLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleLinkClick}
        className="absolute top-10 right-10 w-14 h-14 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100 shadow-2xl border-white/40 z-30 cursor-pointer"
      >
         <ExternalLink size={22} className="text-zinc-900" />
      </a>
    </div>
  );
};

export default ProjectCard;
