
import { SiteData } from '../types';

const API_URL = './api/data.php'; 

const DEFAULT_DATA: SiteData = {
  hero: {
    headline: "Hello",
    subheadline: "— It's khairulahsan a design wizard",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1200",
    projectsCompleted: 200,
    startupsRaised: 50
  },
  about: {
    title: "About Me",
    description: "I specialize in turning complex problems into elegant solutions.",
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
  experiences: [],
  services: [],
  projects: [],
  blogs: []
};

export const fetchSiteData = async (): Promise<SiteData> => {
  try {
    const response = await fetch(API_URL);
    if (response.ok) {
      const data = await response.json();
      if (data && !data.error) return data;
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
