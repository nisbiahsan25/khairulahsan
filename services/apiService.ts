
import { SiteData } from '../types';

const API_URL = './api/data.php'; 

const DEFAULT_DATA: SiteData = {
  hero: {
    headline: "Architecting Elite Web Experiences.",
    subheadline: "— Where high-end design meets world-class engineering.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1200",
    projectsCompleted: 150,
    startupsRaised: 12
  },
  about: {
    title: "The Web Engineering Lab",
    description: "I specialize in building performance-driven web products. By bridging the gap between pixel-perfect UI and scalable architecture, I help brands dominate the digital landscape.",
    engagementStat: "99.9%",
    imageMain: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800",
    imageSecondary: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
    point1: "Expertise in React, Next.js, and Modern Web Standards.",
    point2: "Focused on conversion-centric UX and rapid performance."
  },
  tracking: {
    pixelId: "",
    capiToken: "",
    testEventCode: ""
  },
  categories: ["Web App", "E-commerce", "Corporate Site", "Landing Page", "SaaS Interface"],
  experiences: [
    {
      id: "exp-1",
      company: "EliteTech Labs",
      role: "Senior Fullstack Engineer",
      date: "2024 - Present",
      tags: ["TypeScript", "Next.js", "PostgreSQL"],
      highlight: true
    },
    {
      id: "exp-2",
      company: "Pixel Studio",
      role: "Lead UI/UX Architect",
      date: "2022 - 2024",
      tags: ["Figma", "Interaction Design", "SCSS"],
      highlight: false
    }
  ],
  niches: [
    { id: "n1", title: "Real Estate", description: "High-end property portals and automated lead systems for luxury agencies." },
    { id: "n2", title: "Law Firms", description: "Authoritative digital presences for top-tier legal practices with secure client portals." },
    { id: "n3", title: "SaaS Startups", description: "Scalable product interfaces and high-converting marketing engines for tech founders." },
    { id: "n4", title: "E-commerce", description: "Bespoke online stores optimized for performance and conversion." }
  ],
  services: [
    {
      id: "s1",
      title: "UI/UX Web Design",
      description: "Bespoke visual identities designed specifically for high-conversion web interfaces.",
      icon: "Monitor"
    },
    {
      id: "s2",
      title: "Frontend Engineering",
      description: "Developing lightning-fast user interfaces with React, Next.js, and GSAP animations.",
      icon: "Cpu"
    },
    {
      id: "s3",
      title: "Fullstack Architecture",
      description: "Robust server-side systems and database management for scalable web products.",
      icon: "Terminal"
    }
  ],
  projects: [
    {
      id: "p1",
      title: "CyberBank Interface",
      category: "Web App",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      techStack: ["React", "Redux", "Tailwind"],
      liveLink: "https://example.com"
    }
  ],
  testimonials: [
    {
      id: "t1",
      name: "Marcus Thorne",
      role: "CTO, NexaCorp",
      content: "The frontend engineering was impeccable. Our Lighthouse scores jumped from 40 to 100 instantly.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
    }
  ],
  technicalSkills: [
    {
      category: "Frontend Engineering",
      icon: "Code2",
      skills: ["React & Next.js", "TypeScript", "Tailwind CSS"]
    }
  ],
  blogs: []
};

export const fetchSiteData = async (): Promise<SiteData> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 1500); // 1.5s timeout for faster loading

  try {
    const response = await fetch(API_URL, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (response.ok) {
      const data = await response.json();
      if (data && !data.error) {
        return {
          ...DEFAULT_DATA,
          ...data,
          niches: data.niches || DEFAULT_DATA.niches,
        };
      }
    }
  } catch (e) {
    console.warn("Server fetch timed out or failed, using local defaults for speed.", e);
  }
  return DEFAULT_DATA;
};

export const saveSiteData = async (data: SiteData): Promise<void> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.message || "Failed to save on server");
    }
  } catch (e) {
    console.error("Critical Error: Could not save to server.", e);
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
        console.error("Failed to trigger CAPI lead event", e);
    }
};
