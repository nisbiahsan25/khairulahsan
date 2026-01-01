
import { SiteData } from '../types';

const API_URL = './api/data.php'; 

const DEFAULT_DATA: SiteData = {
  hero: {
    headline: "Scaling Businesses with Elite Digital Engineering",
    subheadline: "— High-performance web architecture for world-class brands",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1200",
    projectsCompleted: 200,
    startupsRaised: 50
  },
  about: {
    title: "High Stakes Engineering",
    description: "I specialize in turning complex business problems into elegant, high-converting digital solutions through precision code and bespoke design.",
    engagementStat: "120%",
    imageMain: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800",
    imageSecondary: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
    point1: "With 4+ years of experience in high-end design.",
    point2: "Blending creativity with strategy for global brands."
  },
  tracking: {
    pixelId: "",
    capiToken: "",
    testEventCode: ""
  },
  categories: ["Law", "Medical", "E-commerce", "Business", "Education", "Personal"],
  experiences: [
    {
      id: "exp-1",
      company: "CreaDev",
      role: "Senior Web Developer",
      date: "2025 - Present",
      tags: ["Next.js", "Architecture", "Scalability"],
      highlight: true
    },
    {
      id: "exp-2",
      company: "GxDev",
      role: "Lead Web Designer",
      date: "2023 - 2024",
      tags: ["UI/UX", "Figma", "Design Systems"],
      highlight: false
    },
    {
      id: "exp-3",
      company: "Innovate Lab",
      role: "Frontend Engineer",
      date: "2021 - 2022",
      tags: ["React", "Animations", "Tailwind"],
      highlight: false
    }
  ],
  services: [],
  projects: [
    {
      id: "p1",
      title: "Lexington Law",
      category: "Law",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800",
      techStack: ["React", "Next.js", "Tailwind"],
      liveLink: "https://example.com"
    },
    {
      id: "p2",
      title: "MediCore Health",
      category: "Medical",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
      techStack: ["TypeScript", "Node.js", "PostgreSQL"],
      liveLink: "https://example.com"
    },
    {
      id: "p3",
      title: "E-Shop Premium",
      category: "E-commerce",
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=800",
      techStack: ["Shopify", "Liquid", "React"],
      liveLink: "https://example.com"
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
        // Ensure categories exist in old data
        if (!data.categories) {
           data.categories = ["Law", "Medical", "E-commerce", "Business", "Education", "Personal"];
        }
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
