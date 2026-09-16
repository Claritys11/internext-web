"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Sparkles, ArrowRight, ExternalLink } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FlipCardProps {
  project: Project;
  className?: string;
  style?: React.CSSProperties;
  isActive?: boolean;
  onSelect?: () => void;
}

function FlipCard({ project, className, style, isActive, onSelect }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={cn(
        "group w-24 h-36 sm:w-28 sm:h-40 md:w-30 md:h-42 rounded-2xl [perspective:1000px] transition-transform duration-300 ease-in-out cursor-pointer select-none",
        isActive ? "scale-110 z-30 ring-2 ring-[#06B6D4]" : "hover:scale-105 hover:z-20",
        className
      )}
      style={style}
      onClick={() => {
        setIsFlipped(!isFlipped);
        onSelect?.();
      }}
      role="button"
      tabIndex={0}
      aria-label={`Lihat karya ${project.title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsFlipped(!isFlipped);
          onSelect?.();
        }
      }}
    >
      <div
        className={cn(
          "relative w-full h-full rounded-2xl shadow-xl transition-all duration-500 [transform-style:preserve-3d]",
          isFlipped ? "[transform:rotateY(180deg)]" : "group-hover:[transform:rotateY(180deg)]"
        )}
      >
        {/* Front side - Project Image & Badge */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden [backface-visibility:hidden] border border-white/[0.15] bg-[#111827]/60 backdrop-blur-md">
          <div className="relative w-full h-full">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              sizes="(max-width: 640px) 96px, 120px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] via-transparent to-black/40" />
            <div className="absolute top-2 left-2 right-2 flex justify-between items-center">
              <span className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#4F46E5]/90 text-white backdrop-blur-md">
                {project.category}
              </span>
            </div>
            <div className="absolute bottom-2 left-2 right-2">
              <p className="text-xs font-bold text-white leading-tight truncate">
                {project.title.split("—")[0]}
              </p>
              <p className="text-[10px] text-[#06B6D4] font-mono">
                {project.year}
              </p>
            </div>
          </div>
        </div>

        {/* Back side - Tech Stack & Detail */}
        <div className="absolute inset-0 rounded-2xl bg-[#0F172A]/70 backdrop-blur-md border border-[#06B6D4]/50 p-3 flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-lg shadow-[#4F46E5]/30">
          <div>
            <h4 className="font-heading font-bold text-xs text-white leading-snug mb-1 line-clamp-2">
              {project.title}
            </h4>
            <p className="text-[10px] text-[#94A3B8] leading-tight line-clamp-3 mb-2">
              {project.tagline}
            </p>
          </div>
          <div>
            <div className="flex flex-wrap gap-1 mb-2">
              {project.techStack.slice(0, 2).map((tech) => (
                <span
                  key={tech}
                  className="text-[8px] font-mono bg-white/[0.08] text-[#E2E8F0] px-1.5 py-0.5 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
            <Link
              href={`/projects#${project.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="w-full py-1 rounded-md bg-[#06B6D4] text-[#0A0F1E] font-bold text-[10px] flex items-center justify-center gap-1 hover:bg-white transition-colors"
            >
              <span>Detail</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

interface FeaturedCardProps {
  project: Project;
  badgeText: string;
  badgeColor?: string;
  rank: string;
}

function FeaturedHighlightCard({
  project,
  badgeText,
  badgeColor = "#06B6D4",
  rank,
}: FeaturedCardProps) {
  return (
    <Link
      href={`/projects#${project.slug}`}
      className="group relative z-20 block rounded-2xl bg-[#111827]/65 hover:bg-[#1E293B]/80 border border-white/[0.1] hover:border-[#06B6D4]/50 p-3.5 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_32px_rgba(6,182,212,0.18)] select-none"
    >
      <div className="flex items-start gap-3">
        {/* Thumbnail */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-[#0A0F1E]">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes="80px"
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <span className="absolute bottom-1 left-1 text-[8px] font-mono font-bold px-1 py-0.5 rounded bg-black/80 text-white">
            {project.year}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1 mb-1">
            <span
              className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider"
              style={{
                backgroundColor: `${badgeColor}20`,
                color: badgeColor,
                border: `1px solid ${badgeColor}40`,
              }}
            >
              {rank} • {badgeText}
            </span>
            <span className="text-[9px] font-mono text-[#94A3B8]">
              {project.category}
            </span>
          </div>

          <h4 className="font-heading font-bold text-xs sm:text-sm text-white truncate group-hover:text-[#06B6D4] transition-colors">
            {project.title.split("—")[0]}
          </h4>
          <p className="text-[10px] text-[#94A3B8] line-clamp-2 leading-tight mt-0.5 mb-2">
            {project.tagline}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 overflow-hidden">
              {project.techStack.slice(0, 2).map((tech) => (
                <span
                  key={tech}
                  className="text-[8px] font-mono bg-white/[0.06] text-[#CBD5E1] px-1.5 py-0.5 rounded truncate"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-1 text-[10px] font-semibold text-[#06B6D4] group-hover:translate-x-0.5 transition-transform shrink-0">
              <span>Detail</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function CircularGalleryShowcase({
  projects,
  maxItems = 12,
}: {
  projects: Project[];
  maxItems?: number;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const expansionWrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState(620);
  const [rotation, setRotation] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Dynamic project slice capped at maxItems (supports up to 12 projects in the 360 circle)
  const safeLimit = Math.min(Math.max(maxItems, 6), 12);
  const displayProjects = projects.slice(0, safeLimit);
  const totalItems = displayProjects.length;

  // 3 featured cards for Left Flank and 3 for Right Flank
  const featuredLeft = projects.slice(0, 3);
  const featuredRight = projects.slice(3, 6);

  // Resize observer to keep the circular diameter responsive
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        if (w > 100) {
          setSize(w);
        }
      }
    };

    updateSize();
    const rafId = requestAnimationFrame(updateSize);
    const timer = setTimeout(updateSize, 150);
    const observer = new ResizeObserver(updateSize);
    if (containerRef.current) observer.observe(containerRef.current);
    window.addEventListener("resize", updateSize);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  // Scroll Media Expansion:
  // Scales and elevates smoothly from the header down through the 360 arena without any boxy card borders
  useEffect(() => {
    if (!sectionRef.current || !expansionWrapperRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        expansionWrapperRef.current,
        {
          scale: 0.9,
          opacity: 0.7,
          y: 60,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 25%",
            scrub: 1.2,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Continuous subtle rotation loop with pause on hover/interaction
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || isPaused) return;

    let animId: number;
    const animate = () => {
      setRotation((prev) => prev + 0.0005);
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isPaused]);

  // Radius optimized for up to 12 cards to ensure clean orbital spacing without clipping
  const radiusMultiplier = totalItems >= 12 ? 0.38 : totalItems >= 8 ? 0.37 : 0.35;
  const radius = size * radiusMultiplier;
  const centerX = size / 2;
  const centerY = size / 2;

  return (
    <section
      ref={sectionRef}
      className="relative py-20 overflow-visible [perspective:1200px]"
    >
      {/* Scroll Media Expansion Container: Seamless, unboxed flow with page */}
      <div
        ref={expansionWrapperRef}
        className="w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 transition-transform will-change-transform"
      >
        {/* Clean, sleek header with opaque text shielding (so background motion path never bleeds through text) */}
        <div className="relative z-20 text-center max-w-3xl mx-auto mb-10 sm:mb-14 bg-[#0A0F1E]/95 shadow-[0_0_50px_40px_#0A0F1E] rounded-3xl p-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#4F46E5]/15 border border-[#4F46E5]/40 text-xs font-mono text-[#A5B4FC] mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#06B6D4]" />
            <span className="font-semibold">Interactive Student Showcase</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Karya & Inovasi <span className="text-gradient-cyan">Internext 360°</span>
          </h2>

          <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            Pusat demonstrasi karya interaktif 360 derajat portofolio unggulan siswa. Diapit oleh 6 karya unggulan pilihan di samping kiri dan kanan.
          </p>
        </div>

        {/* Desktop Layout (xl and up): 3 Left Cards - Center 360 Arena - 3 Right Cards */}
        {/* Tablet & Mobile Layout: Center 360 Arena + Responsive Featured Cards Grid Below */}
        <div className="grid grid-cols-1 xl:grid-cols-12 xl:gap-8 items-center py-4">
          {/* Left Flank: 3 Featured Highlights (Visible on xl+) */}
          <div className="hidden xl:block xl:col-span-3 space-y-4">
            <div className="flex items-center gap-2 px-1 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#06B6D4] animate-ping" />
              <span className="text-xs font-mono font-bold text-[#06B6D4] uppercase tracking-wider">
                Unggulan Pilihan • 01-03
              </span>
            </div>
            {featuredLeft.map((project, idx) => (
              <FeaturedHighlightCard
                key={`left-${project.id}`}
                project={project}
                badgeText="Pilihan Utama"
                badgeColor="#06B6D4"
                rank={`#0${idx + 1}`}
              />
            ))}
          </div>

          {/* Center Column: The Single Unified 360 Arena */}
          <div
            className="xl:col-span-6 w-full flex justify-center items-center relative overflow-visible py-4 sm:py-6"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              ref={containerRef}
              className="relative w-full max-w-[580px] sm:max-w-[620px] md:max-w-[660px] aspect-square flex items-center justify-center overflow-visible"
            >
              {/* Ambient Background Circular Guide Rings */}
              <div
                className="absolute rounded-full border border-white/[0.08] pointer-events-none"
                style={{
                  width: `${radius * 2}px`,
                  height: `${radius * 2}px`,
                }}
              />
              <div
                className="absolute rounded-full border border-[#06B6D4]/15 pointer-events-none animate-pulse"
                style={{
                  width: `${radius * 2 + 40}px`,
                  height: `${radius * 2 + 40}px`,
                }}
              />

              {/* Central Hub Display */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none p-6 text-center">
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-[#111827]/70 border border-white/[0.12] shadow-2xl backdrop-blur-xl flex flex-col items-center justify-center p-3">
                  <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-tr from-[#4F46E5] to-[#06B6D4] flex items-center justify-center mb-1.5 shadow-lg shadow-[#4F46E5]/30">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-heading font-extrabold text-xs md:text-sm text-white">
                    Showcase 360°
                  </span>
                  <span className="text-[9px] font-mono text-[#06B6D4] mt-0.5">
                    {totalItems} Karya Unggulan
                  </span>
                </div>
              </div>

              {/* Dynamic Circular Arrangement of all active projects */}
              {size > 0 &&
                displayProjects.map((project, index) => {
                  const angle = (index / totalItems) * 2 * Math.PI - Math.PI / 2 + rotation;
                  const x = centerX + radius * Math.cos(angle);
                  const y = centerY + radius * Math.sin(angle);

                  return (
                    <FlipCard
                      key={project.id}
                      project={project}
                      isActive={selectedProject?.id === project.id}
                      onSelect={() => setSelectedProject(project)}
                      className="absolute"
                      style={{
                        left: `${x}px`,
                        top: `${y}px`,
                        transform: `translate(-50%, -50%) rotate(${(angle + Math.PI / 2) * (180 / Math.PI) * 0.08}deg)`,
                      }}
                    />
                  );
                })}
            </div>
          </div>

          {/* Right Flank: 3 Featured Highlights (Visible on xl+) */}
          <div className="hidden xl:block xl:col-span-3 space-y-4">
            <div className="flex items-center gap-2 px-1 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-ping" />
              <span className="text-xs font-mono font-bold text-[#CCFF00] uppercase tracking-wider">
                Riset & Inovasi • 04-06
              </span>
            </div>
            {featuredRight.map((project, idx) => (
              <FeaturedHighlightCard
                key={`right-${project.id}`}
                project={project}
                badgeText="Riset AI / Web"
                badgeColor="#CCFF00"
                rank={`#0${idx + 4}`}
              />
            ))}
          </div>
        </div>

        {/* Responsive Featured Cards for Tablet & Laptop (< xl screens) */}
        <div className="xl:hidden mt-8 sm:mt-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#06B6D4] animate-ping" />
            <h3 className="text-xs sm:text-sm font-mono font-bold text-[#06B6D4] uppercase tracking-wider text-center">
              ⭐ 6 Karya Unggulan Pilihan Siswa
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...featuredLeft, ...featuredRight].map((project, idx) => (
              <FeaturedHighlightCard
                key={`responsive-${project.id}`}
                project={project}
                badgeText={idx < 3 ? "Pilihan Utama" : "Inovasi Riset"}
                badgeColor={idx < 3 ? "#06B6D4" : "#CCFF00"}
                rank={`#0${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA to full projects page */}
        <div className="mt-14 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/projects"
            className="btn-gradient px-6 py-3 rounded-xl text-xs font-semibold inline-flex items-center gap-2 shadow-lg hover:shadow-[#06B6D4]/25 transition-shadow"
          >
            <span>Eksplorasi Semua Portofolio Karya Siswa</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
