export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface Experience {
  id: string;
  startDate: string;
  endDate: string;
  company: string;
  role: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  tools: string[];
  image: string;
  link?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  quote: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  privacyAccepted: boolean;
}
