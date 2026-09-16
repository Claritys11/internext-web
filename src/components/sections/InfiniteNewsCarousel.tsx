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
          <div className="relative z-20 bg-[#0A0F1E]/95 shadow-[0_0_40px_30px_#0A0F1E] rounded-3xl p-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/30 text-xs font-mono text-[#06B6D4] mb-3">
              <Newspaper className="w-3.5 h-3.5" />
              <span>Warta Terkini & Pengumuman</span>
              <span className="text-white/30">•</span>
              <span className="text-[#A5B4FC]">GSAP Interactive Carousel</span>
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
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-[#06B6D4] hover:text-white ml-2 transition-colors"
            >
              <span>Arsip Berita</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Draggable Carousel Track Container */}
      <div ref={containerRef} className="w-full cursor-grab active:cursor-grabbing select-none px-4 sm:px-8">
        <div ref={trackRef} className="flex gap-6 will-change-transform py-4">
          {displayArticles.map((article, idx) => (
            <div
              key={`${article.id}-${idx}`}
              className="w-[300px] sm:w-[360px] shrink-0 glass-card overflow-hidden transition-all duration-300 hover:border-[#06B6D4]/50 flex flex-col justify-between group"
            >
              <div>
                {/* Cover Image */}
                <div className="relative w-full h-48 overflow-hidden bg-[#0A0F1E]">
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    sizes="360px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />

                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-[#4F46E5] text-white shadow-md">
                      {article.category}
                    </span>
                    {article.isPinned && (
                      <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-[#F59E0B] text-[#0A0F1E]">
                        📌 Highlight
                      </span>
                    )}
                  </div>
                </div>

                {/* Article Info */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#64748B] mb-2">
                    <span>{formatDate(article.date)}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#06B6D4]" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-white group-hover:text-[#06B6D4] transition-colors mb-2 leading-snug line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-3 mb-4">
                    {article.summary}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {article.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono text-[#64748B] bg-white/[0.04] px-2 py-0.5 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-5 pt-0 flex items-center justify-between border-t border-white/[0.06] mt-2 pt-3.5">
                <div className="flex items-center gap-2">
                  <div className="relative w-6 h-6 rounded-full overflow-hidden border border-white/[0.1]">
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
                  className="text-xs font-semibold text-[#06B6D4] group-hover:translate-x-1 transition-transform flex items-center gap-1"
                >
                  <span>Baca</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
