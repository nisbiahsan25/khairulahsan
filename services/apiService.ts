
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
    },
    {
      id: "exp-3",
      company: "Webflow Agency",
      role: "Frontend Developer",
      date: "2020 - 2022",
      tags: ["React", "Animations", "API Integration"],
      highlight: false
    }
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
    },
    {
      id: "p2",
      title: "Luxury E-Shop",
      category: "E-commerce",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
      techStack: ["Next.js", "Stripe", "Prisma"],
      liveLink: "https://example.com"
    },
    {
      id: "p3",
      title: "Innovate SaaS",
      category: "SaaS Interface",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      techStack: ["Node.js", "Express", "MongoDB"],
      liveLink: "https://example.com"
    }
  ],
  testimonials: [
    {
      id: "t1",
      name: "Marcus Thorne",
      role: "CTO, NexaCorp",
      content: "The frontend engineering was impeccable. Our Lighthouse scores jumped from 40 to 100 instantly, significantly reducing our customer bounce rate.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
    },
    {
      id: "t2",
      name: "Sarah Jenkins",
      role: "Lead Designer, Bloom Digital",
      content: "A masterclass in React development. They took our complex design specs and turned them into a fluid, pixel-perfect web application that feels premium.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
    },
    {
      id: "t3",
      name: "Julian Vane",
      role: "Head of Tech, Vane SaaS",
      content: "Finding a developer who understands both aesthetic UI and scalable system architecture is rare. The clean code and API structure were world-class.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
    },
    {
      id: "t4",
      name: "Elena Rodriguez",
      role: "E-commerce Director",
      content: "The Next.js optimization they implemented for our store was a game changer. Site load times are under 1 second, and our mobile conversion has doubled.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
    },
    {
      id: "t5",
      name: "David Chen",
      role: "Founder, TechFlow Systems",
      content: "Elite-level fullstack work. The custom dashboard they developed handles our data complex logic effortlessly while maintaining a sleek, modern user interface.",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200"
    },
    {
      id: "t6",
      name: "Sophia Wright",
      role: "Product Manager, Luxe Web",
      content: "The GSAP animations and motion design provided a level of polish we didn't think was possible on the web. It truly set our brand apart from competitors.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
    }
  ],
  technicalSkills: [
    {
      category: "Interface Design",
      icon: "Figma",
      skills: ["UI/UX Strategy", "Prototyping", "Figma Systems", "Brand Identity", "Motion Design", "Adobe CC"]
    },
    {
      category: "Frontend Engineering",
      icon: "Code2",
      skills: ["React & Next.js", "TypeScript", "Tailwind CSS", "GSAP Animations", "Performance Lab", "Redux Toolkit"]
    },
    {
      category: "Backend & Systems",
      icon: "Database",
      skills: ["Node.js / Express", "PostgreSQL", "MongoDB", "Cloud Architecture", "RESTful APIs", "Docker"]
    }
  ],
  blogs: []
};

export const fetchSiteData = async (): Promise<SiteData> => {
  try {
    const response = await fetch(API_URL);
    if (response.ok) {
      const data = await response.json();
      if (data && !data.error) {
        if (!data.categories) data.categories = DEFAULT_DATA.categories;
        if (!data.testimonials) data.testimonials = DEFAULT_DATA.testimonials;
        if (!data.technicalSkills) data.technicalSkills = DEFAULT_DATA.technicalSkills;
        return data;
      }
    }
  } catch (e) {
    console.warn("Server fetch failed, using default data.", e);
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
