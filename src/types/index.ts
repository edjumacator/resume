export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  sortOrder?: number;
}

export interface SkillWithYears {
  name: string;
  years: number;
}

export interface Experience {
  id: string;
  startDate: string;
  endDate: string;
  company: string;
  role: string;
  description: string;
  summary?: string | null;
  skills?: string[];
  skillsWithYears?: SkillWithYears[];
  sortOrder?: number;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  tools: string[];
  imageUrl: string;
  link?: string | null;
  sortOrder?: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  rating: number;
  quote: string;
  sortOrder?: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  privacyAccepted: boolean;
}
