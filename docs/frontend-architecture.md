# Internext (internext.web.id) — Frontend Architecture

## 1. Architectural Principles
- **Separation of Concerns**: Presentation (UI components) is strictly separated from data access (API services/repositories).
- **TypeScript First**: Strict typing for all props, states, API contracts, and domain models. No `any` types.
- **Server vs Client Boundary**: Standard Next.js App Router rules:
  - Pages and layouts are Server Components by default to maximize SEO and minimize bundle size.
  - Interactive components (filters, search inputs, modal triggers, sliders, animations) are designated with `"use client"`.
- **Backend Decoupling**: Frontend interacts only through typed data service abstractions (`src/lib/api/*`). When the future NestJS backend is deployed, only the service layer needs to switch from local mock stores to `fetch`/axios calls, without altering UI components.

## 2. Directory Layout
```
webclass/
├── docs/                     # Architectural documentation & API contracts
├── public/                   # Static assets, logos, favicons, OG images
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── (public)/         # Public visitor facing routes with shared Navbar/Footer
│   │   │   ├── page.tsx      # Landing page
│   │   │   ├── about/        # About Class & Timeline
│   │   │   ├── members/      # Members Directory & Detail Profile
│   │   │   ├── projects/     # Student Projects Portfolio
│   │   │   ├── news/         # Announcements & Articles
│   │   │   ├── events/       # Calendar & Events
│   │   │   ├── gallery/      # Photo & Video Moments
│   │   │   └── contact/      # Contact & Guestbook
│   │   ├── admin/            # Content management dashboard
│   │   ├── layout.tsx        # Root HTML layout & font declarations
│   │   └── globals.css       # Design tokens & base styles
│   ├── components/
│   │   ├── ui/               # Reusable atomic UI primitives (Button, Card, Badge, Dialog)
│   │   ├── layout/           # Navbar, Footer, MobileNav, AdminSidebar
│   │   ├── sections/         # Landing Hero, StatsBar, Timeline, ProjectShowcase
│   │   ├── features/         # Domain-specific components (MemberCard, ProjectCard)
│   │   └── shared/           # LoadingSkeletons, EmptyStates, ErrorBoundary
│   ├── lib/
│   │   ├── api/              # Data services and mock repository adapters
│   │   ├── data/             # Realistic seed data for development
│   │   ├── types/            # Domain interfaces (Member, Project, Article, Event)
│   │   └── utils.ts          # Utility helpers (cn class merging, date formatters)
│   └── config/               # Site configuration (meta, navigation links, branding)
```
