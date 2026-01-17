
import { SiteData } from '../types';

// Updated to absolute URL as per user instruction and screenshot
const API_URL = 'https://khairulahsan.xyz/api/data.php'; 
const CACHE_KEY = 'khairulahsan_site_data_cache';

export const DEFAULT_DATA: SiteData = {
  hero: {
    headline: "Architecting Elite Web Experiences.",
    subheadline: "— Where high-end design meets world-class engineering.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1200",
    projectsCompleted: 150,
    startupsRaised: 12
  },
  about: {
    title: "The Web Engineering Lab",
    description: "I specialize in building performance-driven web products.",
    engagementStat: "99.9%",
    imageMain: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800",
    imageSecondary: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
    point1: "Expertise in React and Next.js.",
    point2: "Focused on conversion-centric UX."
  },
  categories: ["Web App", "E-commerce"],
  experiences: [],
  services: [],
  projects: [],
  blogs: [],
  testimonials: [],
  technicalSkills: [],
  niches: []
};

export const fetchSiteData = async (): Promise<SiteData> => {
  try {
    // Cache busting with timestamp
    const response = await fetch(`${API_URL}?t=${Date.now()}`, {
      method: 'GET',
      mode: 'cors', // Ensure CORS is handled
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

    const serverData = await response.json();
    
    // Check if we got a valid object from server
    if (serverData && typeof serverData === 'object' && !serverData.error) {
      
      // If it's a new system or has real data, we treat it as successful server hit
      const mergedData: SiteData = {
        ...DEFAULT_DATA,
        ...serverData
      };
      
      // Update local cache with server data to ensure persistency
      localStorage.setItem(CACHE_KEY, JSON.stringify(mergedData));
      return mergedData;
    }
  } catch (e) {
    console.warn("Cloud synchronization inactive. System relying on local cache.", e);
  }
  
  // Fallback chain: 1. Cache -> 2. Default Demo
  const cached = localStorage.getItem(CACHE_KEY);
  return cached ? JSON.parse(cached) : DEFAULT_DATA;
};

export const saveSiteData = async (data: SiteData): Promise<void> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (response.ok) {
       localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } else {
      const errorText = await response.text();
      throw new Error(`Server failed to save: ${errorText}`);
    }
  } catch (e) {
    console.error("Critical Save Error:", e);
    throw e;
  }
};

export const triggerLeadEvent = async (name: string, email: string) => {
    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action_type: 'lead_event',
                user_name: name,
                user_email: email
            })
        });
    } catch (e) {
        console.error("Lead tracking offline");
    }
};
