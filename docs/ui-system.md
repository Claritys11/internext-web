# Internext UI & Design System Guide

Authoritative design system specification based on Notion Master Project Plan.

## 1. Brand Concept
- **Brand Name**: Internext (*Internet* + *Next*)
- **Tagline**: *"Connected. Forward. Together."*
- **Aesthetic**: Futuristic, tech-forward, clean, digital headquarters.

## 2. Color Palette
- **Dark Mode Background (Midnight Blue)**: `#0A0F1E`
- **Surface Elevation 1 (Card/Container)**: `#111827`
- **Surface Elevation 2 (Hover/Active)**: `#1E293B`
- **Primary Accent (Electric Indigo)**: `#4F46E5`
- **Secondary Accent (Neon Cyan)**: `#06B6D4`
- **Primary Text (Pure White)**: `#F8FAFC`
- **Muted Text / Subtle Borders (Slate Gray)**: `#64748B` / `rgba(255, 255, 255, 0.08)`
- **Brand Gradient**: `linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%)`

### Semantic Colors
- **Success**: `#10B981` (Emerald)
- **Warning**: `#F59E0B` (Amber)
- **Error / Destructive**: `#EF4444` (Rose / Red)
- **Info**: `#3B82F6` (Sky Blue)

## 3. Typography
- **Headings & Display**: `Space Grotesk` (Google Fonts) — Geometric, futuristic character.
- **Body UI & Content**: `Inter` (Google Fonts) — High readability, modern standard.
- **Numbers, Stats & Code**: `JetBrains Mono` — Monospace alignment for metrics and tags.

## 4. Component Standards
- **Buttons**:
  - Primary: Gradient Indigo-to-Cyan, subtle glow on hover, scale `1.02`.
  - Secondary: Ghost / Outline with Indigo border, translucent hover state.
- **Cards**:
  - Border radius: `12px` to `16px`.
  - Border: `1px solid rgba(255, 255, 255, 0.08)`.
  - Hover: Subtle translateY(-3px) and box-shadow glow.
- **Navigation**:
  - Sticky glassmorphism header with backdrop blur (`backdrop-blur-md bg-[#0A0F1E]/80`).
- **Motion Guidelines**:
  - Purposeful transitions (`duration-200` to `duration-300`).
  - Strict compliance with `prefers-reduced-motion`.
