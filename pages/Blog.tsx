
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
      date: "Oct 12, 2024"
    },
    {
      id: 2,
      category: "DESIGN",
      time: "8 min read",
      title: "Designing cohesive strategies and visual identities for the modern web",
      image: "https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80&w=800",
      date: "Sep 28, 2024"
    },
    {
      id: 3,
      category: "STRATEGY",
      time: "6 min read",
      title: "Providing expert advice and strategic guidance to scaling startups",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
      date: "Sep 15, 2024"
    },
    {
      id: 4,
      category: "ENGINEERING",
      time: "10 min read",
      title: "How we achieved 100/100 Lighthouse scores on complex React apps",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
      date: "Aug 30, 2024"
    },
    {
      id: 5,
      category: "BUSINESS",
      time: "4 min read",
      title: "The ROI of premium UI/UX: Why cheap websites are costing you clients",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      date: "Aug 12, 2024"
    }
  ];

  return (
    <div className="pt-40 pb-32 bg-white">
      <div className="container mx-auto px-10 max-w-[1400px]">
        <header className="mb-24 text-center max-w-4xl mx-auto">
          <span className="text-[10px] uppercase font-bold text-zinc-400 mb-6 block tracking-[0.3em]">• Insights</span>
          <h1 className="text-6xl md:text-9xl font-black mb-10 tracking-tighter leading-[0.85]">Design Insights & Trends</h1>
          <p className="text-xl text-zinc-500 font-medium leading-relaxed">Thoughts on design engineering, user experience, and the intersection of business and technology.</p>
        </header>

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
              <div className="aspect-[4/3] rounded-[2rem] overflow-hidden mb-8 bg-zinc-100">
                <img src={post.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
              </div>
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-zinc-900 text-white text-[8px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">{post.category}</span>
                <span className="text-zinc-400 text-[10px] font-bold tracking-widest uppercase">{post.time}</span>
              </div>
              <h4 className="text-2xl font-black mb-6 group-hover:text-indigo-600 transition-colors leading-tight">{post.title}</h4>
              <div className="flex items-center justify-between border-t border-zinc-100 pt-6 mt-auto">
                <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">{post.date}</span>
                <div className="w-10 h-10 rounded-full border border-zinc-100 flex items-center justify-center group-hover:bg-zinc-900 group-hover:text-white transition-all">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <section className="mt-60 py-20 px-10 bg-zinc-50 rounded-[4rem] text-center">
           <h2 className="text-4xl font-black mb-8">Subscribe to our newsletter</h2>
           <p className="text-zinc-500 font-medium mb-12 max-w-xl mx-auto">Get the latest insights on design engineering and digital growth delivered straight to your inbox.</p>
           <form className="max-w-md mx-auto flex gap-4">
              <input type="email" placeholder="email@company.com" className="flex-grow bg-white border border-zinc-200 px-8 py-4 rounded-full focus:outline-none focus:border-indigo-600 font-medium" />
              <button className="bg-zinc-900 text-white px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-black transition-colors">Join</button>
           </form>
        </section>
      </div>
    </div>
  );
};

export default Blog;
