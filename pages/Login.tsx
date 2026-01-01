
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';
// Added AnimatePresence to the framer-motion imports
import { motion, AnimatePresence } from 'framer-motion';

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
      setError('AUTHENTICATION FAILED: INVALID ACCESS KEY');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center px-6 relative overflow-hidden">
      {/* Subtle Grid Background for Login */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="text-center mb-16">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="w-24 h-24 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl border border-zinc-100 dark:border-zinc-800"
          >
            <Lock size={40} className="text-indigo-600" />
          </motion.div>
          <h1 className="text-5xl font-black tracking-tighter mb-4 dark:text-white">Restricted Access</h1>
          <p className="text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-[0.2em] text-[11px]">System: Ahsan Engineering Node v4.0</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-8">
          <div className="relative group">
            <input 
              type="password"
              placeholder="••••••••"
              className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 px-8 py-8 rounded-[2.5rem] focus:outline-none focus:border-indigo-600 focus:bg-white dark:focus:bg-zinc-800 transition-all font-mono text-xl text-center tracking-[0.5em] dark:text-white shadow-inner"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if(error) setError('');
              }}
              autoFocus
            />
            <AnimatePresence>
              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-500 text-[10px] font-black text-center mt-6 uppercase tracking-[0.3em] bg-red-50 dark:bg-red-900/20 py-3 rounded-xl border border-red-100 dark:border-red-900/50"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <button 
            type="submit"
            className="w-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 py-7 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-[11px] flex items-center justify-center gap-4 hover:bg-indigo-600 dark:hover:bg-indigo-400 transition-all shadow-2xl hover:translate-y-[-4px]"
          >
            Authenticate <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-16 flex items-center justify-center gap-4 text-zinc-400 dark:text-zinc-600">
          <ShieldCheck size={18} className="text-green-500" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em]">Encrypted Handshake Required</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
