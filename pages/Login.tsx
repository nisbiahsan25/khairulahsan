
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Login: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default password is admin123
    if (password === 'admin123') {
      sessionStorage.setItem('isAdminAuthenticated', 'true');
      navigate('/admin');
    } else {
      setError('Invalid access key. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Lock size={32} />
          </div>
          <h1 className="text-4xl font-black tracking-tight mb-2">Restricted Access</h1>
          <p className="text-zinc-500 font-medium italic">Enter your administrative key to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <input 
              type="password"
              placeholder="Enter Password"
              className="w-full bg-zinc-50 border border-zinc-100 px-8 py-6 rounded-[2rem] focus:outline-none focus:border-indigo-600 focus:bg-white transition-all font-bold text-center tracking-[0.5em]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-xs font-bold text-center mt-4 uppercase tracking-widest">{error}</p>}
          </div>

          <button 
            type="submit"
            className="w-full bg-zinc-950 text-white py-6 rounded-[2rem] font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-indigo-600 transition-all shadow-xl shadow-zinc-200"
          >
            Authenticate <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-12 flex items-center justify-center gap-2 text-zinc-400">
          <ShieldCheck size={16} />
          <span className="text-[10px] font-bold uppercase tracking-widest">End-to-End Encrypted Session</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
