import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Finance Dashboard',
    category: 'Web Design',
    tools: ['Figma', 'React', 'D3.js'],
    image: '/images/project-1.jpg',
  },
  {
    id: '2',
    title: 'Mobile Banking App',
    category: 'UI/UX Design',
    tools: ['Sketch', 'Principle', 'Swift'],
    image: '/images/project-2.jpg',
  },
  {
    id: '3',
    title: 'E-commerce Platform',
    category: 'Web Design',
    tools: ['Figma', 'Shopify', 'JavaScript'],
    image: '/images/project-3.jpg',
  },
  {
    id: '4',
    title: 'SaaS Landing Page',
    category: 'Landing Page',
    tools: ['Figma', 'Webflow'],
    image: '/images/project-4.jpg',
  },
  {
    id: '5',
    title: 'Health & Fitness App',
    category: 'UI/UX Design',
    tools: ['Adobe XD', 'Lottie', 'React Native'],
    image: '/images/project-5.jpg',
  },
  {
    id: '6',
    title: 'Travel Booking Website',
    category: 'Web Design',
    tools: ['Figma', 'Next.js', 'Tailwind'],
    image: '/images/project-6.jpg',
  },
];

export const categories = ['All', 'UI/UX Design', 'Web Design', 'Landing Page'];
