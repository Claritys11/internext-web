"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { ClassProfile } from "@/lib/types";
import {
  MessageSquare,
  Users,
  Sparkles,
  BookOpen,
  Calendar,
  ShieldCheck,
  ArrowUp,
  Heart,
  ExternalLink,
} from "lucide-react";
import { InstagramIcon } from "@/components/ui/Icons";

// Register ScrollTrigger safely for React
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------
// 1. THEME-ADAPTIVE INLINE STYLES
// -------------------------------------------------------------------------
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

.cinematic-footer-wrapper {
  font-family: 'Plus Jakarta Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  
  /* Dynamic Variables using standard shadcn/tailwind tokens */
  --pill-bg-1: rgba(255, 255, 255, 0.05);
  --pill-bg-2: rgba(255, 255, 255, 0.02);
  --pill-shadow: rgba(0, 0, 0, 0.5);
  --pill-highlight: rgba(255, 255, 255, 0.15);
  --pill-inset-shadow: rgba(0, 0, 0, 0.8);
  --pill-border: rgba(255, 255, 255, 0.1);
  
  --pill-bg-1-hover: rgba(255, 255, 255, 0.12);
  --pill-bg-2-hover: rgba(255, 255, 255, 0.04);
  --pill-border-hover: #F59E0B;
  --pill-shadow-hover: rgba(245, 158, 11, 0.25);
  --pill-highlight-hover: rgba(255, 255, 255, 0.3);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.15); opacity: 1; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(239, 68, 68, 0.5)); }
  15%, 45% { transform: scale(1.25); filter: drop-shadow(0 0 10px rgba(239, 68, 68, 0.8)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe {
  animation: footer-breathe 7s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 35s linear infinite;
}

.animate-footer-heartbeat {
  animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

/* Theme-adaptive Grid Background */
.footer-bg-grid {
  background-size: 50px 50px;
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
}

/* Theme-adaptive Aurora Glow (Gargantua Glow Amber & Flare Orange) */
.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%, 
    rgba(245, 158, 11, 0.25) 0%, 
    rgba(234, 88, 12, 0.18) 40%, 
    transparent 70%
  );
}

/* Glass Pill Theming */
.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 
    0 10px 30px -10px var(--pill-shadow), 
    inset 0 1px 1px var(--pill-highlight), 
    inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 
    0 20px 40px -10px var(--pill-shadow-hover), 
    inset 0 1px 1px var(--pill-highlight-hover);
  color: #FFFFFF;
}

/* Giant Background Text Masking */
.footer-giant-bg-text {
  font-size: clamp(4rem, 19vw, 18rem);
  line-height: 0.8;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, transparent 70%);
  -webkit-background-clip: text;
  background-clip: text;
}

/* Metallic Text Glow */
.footer-text-glow {
  background: linear-gradient(180deg, #FFFFFF 0%, rgba(203, 213, 225, 0.7) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 30px rgba(245, 158, 11, 0.35));
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE (Zero Dependency)
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & 
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
    href?: string;
    target?: string;
    rel?: string;
  };

export const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.35,
            y: y * 0.35,
            rotationX: -y * 0.12,
            rotationY: x * 0.12,
            scale: 1.05,
            ease: "power2.out",
            duration: 0.35,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2,
          });
        };

        element.addEventListener("mousemove", handleMouseMove as unknown as EventListener);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove as unknown as EventListener);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement) => {
          (localRef as unknown as { current: HTMLElement | null }).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as unknown as { current: HTMLElement | null }).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// 3. MAIN COMPONENT
// -------------------------------------------------------------------------
const MarqueeItem = ({ profile }: { profile?: ClassProfile | null }) => (
  <div className="flex items-center space-x-12 px-6 select-none">
    <span>{profile?.tagline?.toUpperCase() || "CONNECTED. FORWARD. TOGETHER."}</span> <span className="text-[#EA580C]">✦</span>
    <span>{profile?.school ? profile.school.toUpperCase() : "SMK TELKOM MALANG"} • {profile?.name ? profile.name.toUpperCase() : "XI INTERNASIONAL"}</span> <span className="text-[#F59E0B]">✦</span>
    <span>DIGITAL IDENTITY & INNOVATION</span> <span className="text-[#EA580C]">✦</span>
    <span>{profile?.memberCount || 25} TALENTED STUDENT CREATORS</span> <span className="text-[#F59E0B]">✦</span>
    <span>CRAFTED WITH PRIDE & EXCELLENCE</span> <span className="text-[#EA580C]">✦</span>
  </div>
);

export function CinematicFooter({ initialProfile }: { initialProfile?: ClassProfile }) {
  const [profile, setProfile] = useState<ClassProfile | null>(initialProfile || null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        }
      } catch (err) {
        // Fallback to initial or default
      }
    }
    fetchProfile();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    // React strict mode compatible GSAP context cleanup
    const ctx = gsap.context(() => {
      // Parallax effect on giant watermark text
      if (giantTextRef.current) {
        gsap.fromTo(
          giantTextRef.current,
          { y: "8vh", scale: 0.85, opacity: 0.4 },
          {
            y: "0vh",
            scale: 1,
            opacity: 1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top 80%",
              end: "bottom bottom",
              scrub: 0.8,
            },
          }
        );
      }

      // Smooth staggered entrance reveal
      if (headingRef.current && linksRef.current) {
        gsap.fromTo(
          [headingRef.current, linksRef.current],
          { y: 35, opacity: 0.6 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top 75%",
              end: "bottom bottom",
              scrub: 0.8,
            },
          }
        );
      }
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* 
        The "Curtain Reveal" Wrapper:
        It sits in standard document flow taking up 100vh (h-screen). 
        Because it has clip-path, its fixed contents are ONLY visible within its bounding box. 
      */}
      <div
        ref={wrapperRef}
        className="relative h-screen w-full"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        {/* The actual footer stays fixed to the viewport underneath everything, filling the screen */}
        <footer className="fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-[#02040A] text-white cinematic-footer-wrapper">
          {/* Ambient Light & Grid Background */}
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[65vh] w-[85vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[110px] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          {/* Giant Watermark Background Text (with smooth scroll parallax) */}
          <div
            ref={giantTextRef}
            className="footer-giant-bg-text absolute -bottom-3 sm:-bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none tracking-tight text-center will-change-transform"
          >
            INTERNEXT
          </div>

          {/* 1. Diagonal Sleek Infinite Marquee Ticker (pinned near top of footer) */}
          <div className="absolute top-6 sm:top-10 left-0 w-full overflow-hidden border-y border-white/[0.08] bg-[#02040A]/80 backdrop-blur-md py-3 sm:py-3.5 z-10 -rotate-1 scale-105 shadow-2xl">
            <div className="flex w-max animate-footer-scroll-marquee text-xs md:text-sm font-bold tracking-[0.25em] text-[#94A3B8] uppercase">
              <MarqueeItem profile={profile} />
              <MarqueeItem profile={profile} />
            </div>
          </div>

          {/* 2. Main Center Hero Content */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 sm:px-6 pt-16 sm:pt-20 w-full max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-[#F59E0B]/30 text-xs font-mono text-[#F59E0B] mb-4 sm:mb-6 backdrop-blur-md shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#EA580C]" />
              <span>Official Digital Platform • {profile?.school || "SMK Telkom Malang"} • {profile?.name || "XI Internasional"}</span>
            </div>

            <h2
              ref={headingRef}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black footer-text-glow tracking-tighter mb-6 sm:mb-8 leading-[1.05]"
            >
              Siap Terhubung <br className="hidden sm:block" />
              <span className="text-gradient">Bersama Kami?</span>
            </h2>

            {/* Interactive Magnetic Pills Layout */}
            <div ref={linksRef} className="flex flex-col items-center gap-4 sm:gap-5 w-full">
              {/* Primary Action Magnetic Buttons */}
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 w-full">
                <MagneticButton
                  as={Link}
                  href="/contact"
                  className="footer-glass-pill px-6 sm:px-9 py-3 sm:py-4 rounded-full text-white font-bold text-sm sm:text-base flex items-center gap-2.5 sm:gap-3 group shadow-lg"
                >
                  <MessageSquare className="w-4 sm:w-5 h-4 sm:h-5 text-[#F59E0B] group-hover:scale-110 transition-transform" />
                  <span>Buku Tamu Digital</span>
                </MagneticButton>

                <MagneticButton
                  as={Link}
                  href="/members"
                  className="footer-glass-pill px-6 sm:px-9 py-3 sm:py-4 rounded-full text-white font-bold text-sm sm:text-base flex items-center gap-2.5 sm:gap-3 group shadow-lg"
                >
                  <Users className="w-4 sm:w-5 h-4 sm:h-5 text-[#EA580C] group-hover:scale-110 transition-transform" />
                  <span>Direktori {profile?.memberCount || 25} Anggota</span>
                </MagneticButton>

                <MagneticButton
                  as={Link}
                  href="/projects"
                  className="footer-glass-pill px-6 sm:px-9 py-3 sm:py-4 rounded-full text-white font-bold text-sm sm:text-base flex items-center gap-2.5 sm:gap-3 group shadow-lg"
                >
                  <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-[#F59E0B] group-hover:scale-110 transition-transform" />
                  <span>Galeri Karya 360°</span>
                </MagneticButton>
              </div>

              {/* Secondary Navigation Magnetic Pills */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 w-full mt-0.5">
                <MagneticButton
                  as={Link}
                  href="/about"
                  className="footer-glass-pill px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-[#CBD5E1] font-medium text-xs sm:text-sm hover:text-white flex items-center gap-1.5 sm:gap-2"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Visi & Misi Kelas</span>
                </MagneticButton>

                <MagneticButton
                  as={Link}
                  href="/events"
                  className="footer-glass-pill px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-[#CBD5E1] font-medium text-xs sm:text-sm hover:text-white flex items-center gap-1.5 sm:gap-2"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#EA580C]" />
                  <span>Agenda Kegiatan</span>
                </MagneticButton>

                <MagneticButton
                  as={Link}
                  href="/news"
                  className="footer-glass-pill px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-[#CBD5E1] font-medium text-xs sm:text-sm hover:text-white"
                >
                  <span>Warta Berita</span>
                </MagneticButton>

                <MagneticButton
                  as="a"
                  href={profile?.instagram || "https://instagram.com/internext.class"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-glass-pill px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-[#CBD5E1] font-medium text-xs sm:text-sm hover:text-white flex items-center gap-1.5"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-[#EA580C]" />
                  <span>Instagram Resmi</span>
                  <ExternalLink className="w-3 h-3 text-[#64748B]" />
                </MagneticButton>

                <MagneticButton
                  as={Link}
                  href="/admin"
                  className="footer-glass-pill px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-[#CBD5E1] font-medium text-xs sm:text-sm hover:text-white flex items-center gap-1.5 sm:gap-2"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Portal Admin</span>
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* 3. Bottom Credits & Back To Top */}
          <div className="relative z-20 w-full pb-6 sm:pb-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/[0.06]">
            {/* Copyright & School Info */}
            <div className="text-[#64748B] text-[11px] sm:text-xs font-semibold tracking-wider uppercase order-2 md:order-1 font-mono text-center md:text-left">
              © {new Date().getFullYear()} INTERNEXT • {profile?.school ? profile.school.toUpperCase() : "SMK TELKOM MALANG"} • {profile?.name ? profile.name.toUpperCase() : "XI INTERNASIONAL"}. ALL RIGHTS RESERVED.
            </div>

            {/* "Crafted with Love" Badge */}
            <div className="footer-glass-pill px-4 sm:px-5 py-1.5 sm:py-2 rounded-full flex items-center gap-2 order-1 md:order-2 cursor-default border-white/10 shadow-sm">
              <span className="text-[#94A3B8] text-[10px] sm:text-[11px] font-bold uppercase tracking-widest font-mono">
                Crafted with
              </span>
              <Heart className="w-3.5 h-3.5 text-[#EF4444] animate-footer-heartbeat fill-current" />
              <span className="text-[#94A3B8] text-[10px] sm:text-[11px] font-bold uppercase tracking-widest font-mono">
                by
              </span>
              <span className="text-white font-black text-xs tracking-normal font-heading">
                Internext Crew
              </span>
            </div>

            {/* Magnetic Back to Top Button */}
            <MagneticButton
              as="button"
              onClick={scrollToTop}
              aria-label="Kembali ke atas"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full footer-glass-pill flex items-center justify-center text-[#94A3B8] hover:text-white group order-3 shadow-md"
            >
              <ArrowUp className="w-4 sm:w-5 h-4 sm:h-5 transform group-hover:-translate-y-1 transition-transform duration-300 text-[#F59E0B]" />
            </MagneticButton>
          </div>
        </footer>
      </div>
    </>
  );
}
