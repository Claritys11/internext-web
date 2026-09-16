# Internext UI & Design System Guide

Authoritative design system specification for the Internext web platform.

## 1. Brand Concept
- **Brand Name**: Internext (*Internet* + *Next*)
- **School**: SMK Telkom Malang
- **Class**: Kelas XI Internasional (25 Siswa Kreator)
- **Tagline**: *"Connected. Forward. Together."*
- **Aesthetic Theme**: **Gargantua Glow (Black Hole Vibes)** — Deepest cosmic void with accretion disk gold & relativistic jet flame accents.

## 2. Color Palette — Gargantua Glow (Black Hole Vibes)

| Role | Token / Name | Hex Code | Purpose & Application |
| :--- | :--- | :--- | :--- |
| **Text** | `Foreground` | `#F8FAFC` | Clean, crisp, high-contrast readable text |
| **Background** | `Midnight Void` | `#02040A` | Deepest abyss background, backdrop blur anchors |
| **Primary** | `Accretion Gold` | `#F59E0B` | Primary CTAs, active states, luminous halo highlights |
| **Secondary** | `Accretion Slate` | `#0F172A` | Cards, container surfaces, elevate 1 layer |
| **Accent** | `Cosmic Flame` | `#EA580C` | High-energy secondary accent, badges, warning signals |

### Semantic Tokens & Gradients
- **Brand Gradient**: `linear-gradient(135deg, #F59E0B 0%, #EA580C 100%)`
- **Text Gradient**: `linear-gradient(to right, #F59E0B, #EA580C, #FDE68A)`
- **Accretion Halo Glow**: `radial-gradient(circle, rgba(245, 158, 11, 0.18) 0%, rgba(234, 88, 12, 0.12) 35%, transparent 70%)`
- **Surface Elevation 1**: `#0F172A` / `rgba(15, 23, 42, 0.8)`
- **Border Utility**: `1px solid rgba(255, 255, 255, 0.08)` / `border-[#F59E0B]/20`

## 3. Typography
- **Headings & Display**: `Space Grotesk` (Google Fonts) — Geometric, futuristic character.
- **Body UI & Content**: `Inter` (Google Fonts) — High readability, modern standard.
- **Numbers, Stats & Code**: `JetBrains Mono` — Monospace alignment for metrics, terminal tags, and dates.

## 4. Component Standards
- **Buttons (`.btn-gradient`)**:
  - Background: Gradient `#F59E0B` to `#EA580C`.
  - Text: Dark `#02040A` bold font for maximum readability and punch.
  - Hover: Scale `1.03`, drop-shadow glow `shadow-lg shadow-[#F59E0B]/25`.
- **Cards (`.glass-card`)**:
  - Background: `rgba(15, 23, 42, 0.75)` with `backdrop-blur-xl`.
  - Border: `1px solid rgba(255, 255, 255, 0.08)`.
  - Hover: `border-[#F59E0B]/40` and smooth `translateY(-3px)`.
- **Navigation (`Anime Navbar`)**:
  - Pill shape when scrolled (`bg-[#02040A]/95` border `border-[#F59E0B]/20`).
  - Active tab luminous particle aura with `#F59E0B` and `#EA580C` shimmer.
- **Motion Guidelines**:
  - Smooth GSAP scroll inertia and motion paths.
  - Strict compliance with `prefers-reduced-motion`.

