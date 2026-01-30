export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  category?: string;
  skills?: SkillWithYears[];
  sortOrder?: number;
}

export interface SkillWithYears {
  name: string;
  years: number;
  category?: string;
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
  company?: string;
  message: string;
  privacyAccepted: boolean;
}

export interface ContactSubmissionResult {
  success: boolean;
  message: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  proficiency: number;
  sortOrder: number;
  color?: string;
}
