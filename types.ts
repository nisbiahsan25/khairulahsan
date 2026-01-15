
export type Category = string;

export interface Experience {
  id: string;
  company: string;
  date: string;
  role: string;
  tags: string[];
  highlight?: boolean;
}

export interface Niche {
  id: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar?: string;
}

export interface BlogPost {
  id: string;
  category: string;
  time: string;
  title: string;
  image: string;
  date: string;
}

export interface Project {
  id: string;
  title: string;
  category: Category;
  image: string;
  techStack: string[];
  liveLink: string;
  description?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: string[];
}

export interface SiteData {
  hero: {
    headline: string;
    subheadline: string;
    image: string;
    projectsCompleted: number;
    startupsRaised: number;
  };
  about: {
    title: string;
    description: string;
    engagementStat: string;
    imageMain: string;
    imageSecondary: string;
    point1: string;
    point2: string;
  };
  tracking?: {
    pixelId: string;
    capiToken: string;
    testEventCode?: string;
  };
  categories: string[];
  experiences: Experience[];
  services: Service[];
  projects: Project[];
  blogs: BlogPost[];
  testimonials: Testimonial[];
  technicalSkills?: SkillCategory[];
  niches?: Niche[];
}
