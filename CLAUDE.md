# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio/resume website built as a React application, inspired by the JennyCraft portfolio design.

## Tech Stack

- **Vite** - Build tool and dev server
- **React 18** with TypeScript
- **Redux Toolkit** - State management (ui and contact slices)
- **Material UI** (@mui/material) - Component library
- **react-hook-form** + **Zod** - Form handling and validation

## Project Structure

```
src/
├── main.tsx                    # Entry with Redux/MUI providers
├── App.tsx                     # Root component with all sections
├── store/
│   ├── store.ts                # Redux store config
│   ├── hooks.ts                # Typed useAppDispatch/useAppSelector
│   └── slices/
│       ├── uiSlice.ts          # Navigation/mobile menu state
│       └── contactSlice.ts     # Form submission state
├── theme/
│   └── theme.ts                # MUI theme (purple primary, dark mode)
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Nav bar with smooth scroll
│   │   └── Footer.tsx          # Footer with links
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── PortfolioSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── ContactSection.tsx
│   └── ui/
│       ├── ServiceCard.tsx
│       ├── TimelineItem.tsx
│       ├── ProjectCard.tsx
│       └── TestimonialCard.tsx
├── features/
│   └── contact/
│       └── ContactForm.tsx     # Form with react-hook-form/Zod validation
├── data/
│   ├── services.ts
│   ├── experience.ts
│   ├── portfolio.ts
│   └── testimonials.ts
└── types/
    └── index.ts                # TypeScript interfaces
```

## Development Commands

```bash
npm install     # Install dependencies
npm run dev     # Start dev server (http://localhost:5173)
npm run build   # Build for production
npm run preview # Preview production build
```

## Key Features

- Responsive design with MUI breakpoints
- Smooth scroll navigation with scroll spy
- Mobile drawer menu
- Contact form with validation and async submission (mock API)
- Redux DevTools integration
- Dark theme with purple/pink gradient accents
