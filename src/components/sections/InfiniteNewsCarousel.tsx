"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Article } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Clock, ArrowRight, ArrowLeft, Newspaper, Sparkles } from "lucide-react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

interface InfiniteNewsCarouselProps {
  articles: Article[];
}

export function InfiniteNewsCarousel({ articles }: InfiniteNewsCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Duplicate articles so we have enough items for seamless infinite dragging & wrapping
  const displayArticles = [...articles, ...articles, ...articles];

  useEffect(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    // Card width + gap calculation
    const cards = track.children;
    if (cards.length === 0) return;

    const firstCard = cards[0] as HTMLElement;
    const cardWidth = firstCard.offsetWidth + 24; // 24px gap
    const totalWidth = cardWidth * articles.length;

    // Draggable instance with snapping to card increments
    const draggable = Draggable.create(track, {
      type: "x",
      edgeResistance: 0.65,
      cursor: "grab",
      activeCursor: "grabbing",
      onPress: () => setIsDragging(true),
      onRelease: () => setIsDragging(false),
      snap: {
        x: (endValue) => Math.round(endValue / cardWidth) * cardWidth,
      },
      onDrag: function () {
        // Infinite wrap logic
        if (this.x < -totalWidth) {
          this.x += totalWidth;
          gsap.set(this.target, { x: this.x });
        } else if (this.x > 0) {
          this.x -= totalWidth;
          gsap.set(this.target, { x: this.x });
        }
      },
      onThrowUpdate: function () {
        if (this.x < -totalWidth) {
          this.x += totalWidth;
          gsap.set(this.target, { x: this.x });
        } else if (this.x > 0) {
          this.x -= totalWidth;
          gsap.set(this.target, { x: this.x });
        }
      },
    })[0];

    // Auto-scroll loop with pause on hover/drag
    let tween: gsap.core.Tween | null = null;
    const startAutoScroll = () => {
      tween = gsap.to(track, {
        x: `-=${totalWidth}`,
        duration: 35,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
        },
      });
    };

    startAutoScroll();

    const onMouseEnter = () => tween?.pause();
    const onMouseLeave = () => {
      if (!isDragging) tween?.resume();
    };

    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mouseleave", onMouseLeave);

    return () => {
      draggable.kill();
      tween?.kill();
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [articles, isDragging]);

  const slidePrev = () => {
    if (!trackRef.current) return;
    const firstCard = trackRef.current.children[0] as HTMLElement;
    const cardWidth = (firstCard?.offsetWidth || 340) + 24;
    gsap.to(trackRef.current, {
      x: `+=${cardWidth}`,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const slideNext = () => {
    if (!trackRef.current) return;
    const firstCard = trackRef.current.children[0] as HTMLElement;
    const cardWidth = (firstCard?.offsetWidth || 340) + 24;
    gsap.to(trackRef.current, {
      x: `-=${cardWidth}`,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <section className="py-24 overflow-hidden bg-white/[0.01] border-t border-b border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="relative z-20 bg-[#02040A]/95 shadow-[0_0_40px_30px_#02040A] rounded-3xl p-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-xs font-mono text-[#F59E0B] mb-3">
              <Newspaper className="w-3.5 h-3.5" />
              <span>Warta Terkini & Pengumuman</span>
              <span className="text-white/30">•</span>
              <span className="text-[#EA580C]">GSAP Interactive Carousel</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Kabar Terbaru <span className="text-gradient">Internext</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
              Geser (drag) ke kiri atau kanan untuk menjelajahi kartu berita.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={slidePrev}
              aria-label="Previous Article"
              className="p-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={slideNext}
              aria-label="Next Article"
              className="p-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-white transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/news"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-[#F59E0B] hover:text-[#EA580C] ml-2 transition-colors"
            >
              <span>Arsip Berita</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Draggable Carousel Track Container */}
      <div ref={containerRef} className="overflow-hidden cursor-grab active:cursor-grabbing -mx-4 px-4 py-2">
          <div
            ref={trackRef}
            className="flex gap-6 select-none will-change-transform"
            style={{ width: "max-content" }}
          >
            {displayArticles.map((article, index) => (
              <article
                key={`${article.id}-${index}`}
                className="w-[300px] sm:w-[360px] shrink-0 glass-card overflow-hidden transition-all duration-300 hover:border-[#F59E0B]/50 flex flex-col justify-between group"
              >
                <div>
                  {/* Image with category pill */}
                  <div className="relative w-full h-48 overflow-hidden bg-[#02040A]">
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#EA580C] text-[#02040A] shadow-md">
                        {article.category}
                      </span>
                      {article.isPinned && (
                        <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-[#EA580C] text-white">
                          Disematkan
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#64748B] mb-2">
                      <span>{formatDate(article.date)}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#F59E0B]" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    <h3 className="font-heading text-lg font-bold text-white group-hover:text-[#F59E0B] transition-colors mb-2 leading-snug line-clamp-2">
                      <Link href={`/news/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-3 mb-4">
                      {article.summary}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono text-[#94A3B8] bg-white/[0.04] px-2 py-0.5 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Metadata */}
                <div className="px-5 pb-5 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative w-6 h-6 rounded-full overflow-hidden border border-white/20">
                      <Image
                        src={article.author.avatar}
                        alt={article.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-xs text-[#CBD5E1] font-medium truncate max-w-[120px]">
                      {article.author.name}
                    </span>
                  </div>

                  <Link
                    href={`/news/${article.slug}`}
                    className="text-xs font-semibold text-[#F59E0B] group-hover:translate-x-1 transition-transform flex items-center gap-1"
                  >
                    <span>Baca</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
    </section>
  );
}
