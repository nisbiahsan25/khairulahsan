
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import { BRAND_NAME } from '../constants';

const Navbar: React.FC = () => {
  const navLinks = [
    { name: 'About Me', path: '/about' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md py-6 border-b border-zinc-100">
      <div className="container mx-auto px-10 max-w-[1400px]">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <Cpu size={28} className="group-hover:rotate-12 transition-transform text-zinc-900" />
            <span className="font-display font-black text-base uppercase tracking-[0.2em] text-zinc-950">
              {BRAND_NAME}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-[13px] font-bold text-zinc-500 hover:text-black transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <Link
            to="/contact"
            className="flex items-center gap-2 text-[13px] font-bold hover:opacity-70 transition-opacity"
          >
            Book A Call <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
