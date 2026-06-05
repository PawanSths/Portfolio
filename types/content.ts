export type PublishState = "published" | "draft";

export type SocialLink = {
  id: string;
  label: string;
  url: string;
  icon: string;
};

export type Skill = {
  id: string;
  name: string;
  category: "Languages" | "AI & Data" | "Engineering" | "Tools";
  level: number;
  featured: boolean;
  status: PublishState;
};

export type Project = {
  id: string;
  title: string;
  summary: string;
  description: string;
  stack: string[];
  image: string;
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  status: PublishState;
};

export type TimelineEntry = {
  id: string;
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  summary: string;
  status: PublishState;
};

export type Achievement = {
  id: string;
  title: string;
  summary: string;
  year: string;
  status: PublishState;
};

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  summary: string;
  status: PublishState;
};

export type MediaAsset = {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: string;
};

export type PortfolioContent = {
  profile: {
    name: string;
    headline: string;
    shortBio: string;
    bio: string;
    avatar: string;
    resumeUrl: string;
    email: string;
    location: string;
    availability: string;
  };
  settings: {
    siteTitle: string;
    metaDescription: string;
    theme: "system" | "light" | "dark";
    sectionOrder: string[];
  };
  socials: SocialLink[];
  skills: Skill[];
  projects: Project[];
  education: TimelineEntry[];
  experience: TimelineEntry[];
  achievements: Achievement[];
  certifications: Certification[];
  media: MediaAsset[];
};
