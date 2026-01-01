
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const Blog: React.FC = () => {
  const posts = [
    {
      id: 1,
      category: "MARKETING",
      time: "5 min read",
      title: "Conducting in-depth research and usability testing for high-stakes projects",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800",
      date: "OCT 12, 2024"
    },
    {
      id: 2,
      category: "DESIGN",
      time: "8 min read",
      title: "Designing cohesive strategies and visual identities for the modern web",
      image: "https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80&w=800",
      date: "SEP 28, 2024"
    },
    {
      id: 3,
      category: "STRATEGY",
      time: "6 min read",
      title: "Providing expert advice and strategic guidance to scaling startups",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
      date: "SEP 15, 2024"
    },
    {
      id: 4,
      category: "ENGINEERING",
      time: "10 min read",
      title: "How we achieved 100/100 Lighthouse scores on complex React apps",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
      date: "AUG 30, 2024"
    },
    {
      id: 5,
      category: "BUSINESS",
      time: "4 min read",
      title: "The ROI of premium UI/UX: Why cheap websites are costing you clients",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      date: "AUG 12, 2024"
    }
  ];

  return (
    <div className="pt-40 pb-32 bg-white dark:bg-zinc-950 transition-colors">
      <div className="container mx-auto px-10 max-w-[1400px]">
        {/* Hero Section matching Reference */}
        <header className="mb-32 text-center relative">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] uppercase font-bold text-zinc-400 mb-8 block tracking-[0.4em]"
          >
            • INSIGHTS
          </motion.span>
          <div className="relative inline-block">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[80px] md:text-[160px] font-black tracking-tighter leading-[0.8] text-zinc-100 dark:text-zinc-900 absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap -z-10 pointer-events-none select-none"
            >
              Design Insights
            </motion.h1>
            <h1 className="text-6xl md:text-9xl font-black mb-10 tracking-tighter leading-[0.85] dark:text-white relative z-10">
              Design Insights <br/> & Trends
            </h1>
          </div>
          <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed max-w-2xl mx-auto mt-12">
            Thoughts on design engineering, user experience, and the intersection of business and technology.
          </p>
        </header>

        {/* Blog Grid matching Reference Card Style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
          {posts.map((post, i) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/3] rounded-[3rem] overflow-hidden mb-10 bg-zinc-100 dark:bg-zinc-900 shadow-sm">
                <img 
                  src={post.image} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                  alt={post.title}
                />
              </div>
              <div className="flex items-center gap-6 mb-8">
                <span className="bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-[8px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">
                  {post.category}
                </span>
                <span className="text-zinc-400 dark:text-zinc-500 text-[10px] font-black tracking-widest uppercase">
                  {post.time}
                </span>
              </div>
              <h4 className="text-2xl font-bold mb-10 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400 transition-colors leading-tight min-h-[4em] transition-all">
                {post.title}
              </h4>
              <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-900 pt-8 mt-auto">
                <span className="text-zinc-400 dark:text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">{post.date}</span>
                <div className="w-12 h-12 rounded-full border border-zinc-100 dark:border-zinc-800 flex items-center justify-center group-hover:bg-zinc-950 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-zinc-950 transition-all shadow-sm">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <section className="mt-60 py-24 px-10 bg-zinc-50 dark:bg-zinc-925 rounded-[4rem] text-center border border-zinc-100 dark:border-zinc-800">
           <h2 className="text-4xl md:text-5xl font-black mb-8 dark:text-white">Subscribe to the insight loop</h2>
           <p className="text-zinc-500 dark:text-zinc-400 font-medium mb-12 max-w-xl mx-auto text-lg leading-relaxed">
             Get the latest field reports on web engineering and high-end design delivered straight to your workstation.
           </p>
           <form className="max-w-md mx-auto flex flex-col md:flex-row gap-4" onSubmit={e => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="email@company.com" 
                className="flex-grow bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-8 py-5 rounded-full focus:outline-none focus:border-indigo-600 font-bold dark:text-white" 
              />
              <button className="bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-indigo-600 dark:hover:bg-indigo-400 transition-colors shadow-lg">
                Join
              </button>
           </form>
        </section>
      </div>
    </div>
  );
};

export default Blog;
