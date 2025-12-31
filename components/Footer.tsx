
import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND_NAME } from '../constants';

const Footer: React.FC = () => {
  const emailAddress = "khairulhossain478@gmail.com";
  
  const footerLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Me', path: '/about' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
  ];
  
  return (
    <footer className="bg-zinc-950 text-white py-32 px-10">
      <div className="container mx-auto max-w-[1400px]">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-8 mb-10">
              {footerLinks.map(link => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className="text-xs font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-widest"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="text-zinc-700 text-[10px] font-bold uppercase tracking-[0.4em]">
              Contact Directly
            </div>
            <a 
              href={`mailto:${emailAddress}`} 
              className="text-2xl md:text-4xl lg:text-5xl font-black hover:text-indigo-400 transition-all block tracking-tight break-all md:break-normal"
            >
              {emailAddress}
            </a>
          </div>
        </div>
        <div className="mt-24 pt-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
           <span>© {new Date().getFullYear()} {BRAND_NAME} Studio</span>
           <div className="flex gap-10">
             <a href="#" className="hover:text-white transition-colors">Twitter</a>
             <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
             <a href="#" className="hover:text-white transition-colors">Behance</a>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
