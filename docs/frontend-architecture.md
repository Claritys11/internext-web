# Internext (internext.web.id) — Platform Architecture

## 1. Architectural Principles
- **Separation of Concerns**: Presentation (UI components) is strictly separated from data access (API services/repositories & Prisma client).
- **TypeScript First**: Strict typing for all props, states, API contracts, and domain models. Zero `any` types.
- **Server vs Client Boundary**: Standard Next.js App Router rules:
  - Pages and layouts are Server Components by default to maximize SEO and minimize bundle size.
  - Interactive components (GSAP Masonry, DomeGallery, Chat, Anime Navbar) are designated with `"use client"`.
- **Database & Persistence Layer**: Integrated with Prisma ORM (`prisma/schema.prisma`) connected to PostgreSQL. The data service layer (`src/lib/api/services.ts`) automatically falls back to an in-memory mock store if `DATABASE_URL` is unavailable during local development, ensuring seamless zero-config developer onboarding.
- **Coolify Docker Deployment**: Standard multi-stage containerized architecture (`Dockerfile` + `docker-compose.yml`) supporting direct deployment on Coolify VPS.

## 2. Directory Layout
```
webclass/
├── prisma/                   # Prisma Schema & PostgreSQL database definitions
│   └── schema.prisma         # Prisma data models (Profile, Member, Project, Article, Event, Gallery, ChatMessage)
├── docs/                     # Architectural documentation, UI system & API contracts
├── public/                   # Static assets, logos, favicons, OG images
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── page.tsx          # Landing page (Hero, Stats, Circular 360, Leadership, Draggable News)
│   │   ├── about/            # About Class, Philosophy & Timeline
│   │   ├── members/          # 25 Student Members Directory & Detail Profile
│   │   ├── projects/         # Student Projects Portfolio with React Bits Masonry
│   │   ├── news/             # Announcements & Articles with React Bits Masonry
│   │   ├── events/           # Calendar & Events
│   │   ├── gallery/          # React Bits DomeGallery (3D spherical 360°) & Albums
│   │   ├── contact/          # Interactive Live Chat & Guestbook (Multi-channel)
│   │   ├── admin/            # Centralized Live CMS Dashboard
│   │   ├── layout.tsx        # Root HTML layout & font declarations
│   │   └── globals.css       # Gargantua Glow Design tokens & base styles
│   ├── components/
│   │   ├── ui/               # Reusable UI primitives (Masonry, DomeGallery, motion-footer, anime-navbar)
│   │   ├── layout/           # Navbar, Footer
│   │   ├── sections/         # HeroSection, StatsBar, CircularGalleryShowcase, LeadershipShowcase, InfiniteNewsCarousel
│   │   ├── features/         # MemberCard, ProjectCard, ArticleCard, EventCard, NewsExplorer
│   │   └── shared/           # ScrollMotionPath, CountdownTimer
│   ├── lib/
│   │   ├── api/              # Data services & Prisma/Mock repository adapters
│   │   ├── types/            # Domain interfaces (Member, Project, Article, Event, ChatMessage)
│   │   └── utils.ts          # Utility helpers (cn class merging, date formatters)
│   └── config/               # Site configuration (meta, navigation links, branding)
├── Dockerfile                # Multi-stage production build container
├── docker-compose.yml        # Multi-service setup (Next.js App + PostgreSQL)
└── README.md                 # Project handbook & Coolify deployment instructions
```

