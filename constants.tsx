
import React from 'react';
import { Shield, Activity, ShoppingBag, Briefcase, GraduationCap, User } from 'lucide-react';

export const BRAND_NAME = "khairulahsan";
export const WHATSAPP_LINK = "https://wa.me/8801712395967";
export const EMAIL_LINK = "mailto:khairulhossain478@gmail.com";

export const CATEGORIES = [
  { id: 'all', label: 'All Projects', icon: null },
  { id: 'Law', label: 'Law', icon: <Shield size={16} /> },
  { id: 'Medical', label: 'Medical', icon: <Activity size={16} /> },
  { id: 'E-commerce', label: 'E-commerce', icon: <ShoppingBag size={16} /> },
  { id: 'Business', label: 'Business', icon: <Briefcase size={16} /> },
  { id: 'Education', label: 'Education', icon: <GraduationCap size={16} /> },
  { id: 'Personal', label: 'Personal', icon: <User size={16} /> },
];
