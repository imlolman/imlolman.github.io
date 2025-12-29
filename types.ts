export interface SocialLink {
  name: string;
  url: string;
  badgeUrl: string;
}

export interface Skill {
  name: string;
  badgeUrl: string;
  category: 'Language' | 'Framework' | 'Database' | 'DevOps' | 'Tool';
}

export interface Project {
  title: string;
  url?: string;
  description: string;
  techStack: string[];
}

export interface WorkExperience {
  company: string;
  role: string;
  period: string;
  stats: { label: string; value: string; icon: string }[];
  description: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  badgeUrl: string;
}

export interface OpenSourceProject {
  name: string;
  url: string;
  description: string;
}

export interface OpenSourceCategory {
  name: string;
  items: OpenSourceProject[];
}

export interface VideoItem {
  title: string;
  url: string;
  thumbnail: string;
  views: string;
  date: string;
  description: string;
}

export interface ArticleItem {
  title: string;
  source: string;
  date: string;
  url: string;
  snippet: string;
  thumbnail?: string;
}

export interface ImageItem {
  title: string;
  url: string; // The actual image
  source: string; // The website it comes from
  contextLink: string;
}

export interface ProjectItem {
  name: string;
  fullName: string;
  description: string;
  homepage: string;
  htmlUrl: string;
  language: string;
  stargazersCount: number;
  forksCount: number;
  topics: string[];
  createdAt: string;
  updatedAt: string;
  hasPages: boolean;
  imagePath: string;
}

export interface ProfileData {
  name: string;
  handle: string;
  titles: string[];
  summary: string;
  location: string;
  socials: SocialLink[];
  currentWork: WorkExperience;
  projects: Project[];
  skills: Skill[];
  certifications: Certification[];
  achievements: string[];
  specializations: string[];
  interests: string[];
  openSource: {
    projects: {
      title: string;
      subtitle: string;
      categories: OpenSourceCategory[];
    };
    maccy: {
      title: string;
      subtitle: string;
      project: OpenSourceProject;
    };
  };
  videos: VideoItem[];
  articles: ArticleItem[];
  images: ImageItem[];
}