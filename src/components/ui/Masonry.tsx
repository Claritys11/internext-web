"use client";

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import "./Masonry.css";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export interface MasonryItem {
  id: string;
  img: string;
  url: string;
  height: number;
  title?: string;
  subtitle?: string;
  category?: string;
  badge?: string;
  date?: string;
  readTime?: string;
  tags?: string[];
  author?: {
    name: string;
    avatar: string;
    role?: string;
  };
  extra?: Record<string, unknown>;
}

export interface MasonryProps {
  items: MasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: "top" | "bottom" | "left" | "right" | "center" | "random";
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
  className?: string;
  renderItem?: (item: MasonryItem) => React.ReactNode;
}

const useMedia = (queries: string[], values: number[], defaultValue: number) => {
  const get = () => {
    if (typeof window === "undefined") return defaultValue;
    const index = queries.findIndex((q) => window.matchMedia(q).matches);
    return index !== -1 ? values[index] : defaultValue;
  };

  const [value, setValue] = useState(get);

  useEffect(() => {
    const handler = () => setValue(get);
    const mqlList = queries.map((q) => window.matchMedia(q));
    mqlList.forEach((mql) => mql.addEventListener("change", handler));
    return () => {
      mqlList.forEach((mql) => mql.removeEventListener("change", handler));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queries]);

  return value;
};

const useMeasure = (): [React.RefObject<HTMLDivElement | null>, { width: number; height: number }] => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({
    width: typeof window !== "undefined" ? Math.min(window.innerWidth - 32, 1200) : 1200,
    height: 0,
  });

  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return;
    const updateSize = () => {
      if (ref.current) {
        const clientWidth = ref.current.clientWidth;
        const rectWidth = ref.current.getBoundingClientRect().width;
        const w = clientWidth > 0 ? clientWidth : rectWidth > 0 ? rectWidth : (typeof window !== "undefined" ? window.innerWidth - 32 : 1200);
        setSize({ width: w, height: ref.current.clientHeight || 0 });
      }
    };
    updateSize();
    const ro = new ResizeObserver(([entry]) => {
      if (entry && entry.contentRect.width > 0) {
        setSize({ width: entry.contentRect.width, height: entry.contentRect.height });
      }
    });
    ro.observe(ref.current);
    window.addEventListener("resize", updateSize);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return [ref, size];
};

const preloadImages = async (urls: string[]) => {
  await Promise.all(
    urls.map(
      (src) =>
        new Promise<void>((resolve) => {
          if (!src) {
            resolve();
            return;
          }
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
          // Timeout failsafe to never block render on slow connections
          setTimeout(resolve, 800);
        })
    )
  );
};

export const Masonry: React.FC<MasonryProps> = ({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.98,
  blurToFocus = true,
  colorShiftOnHover = false,
  className = "",
  renderItem,
}) => {
  const router = useRouter();

  const columns = useMedia(
    [
      "(min-width:1500px)",
      "(min-width:1100px)",
      "(min-width:768px)",
      "(min-width:480px)",
    ],
    [4, 3, 2, 2],
    1
  );

  const [containerRef, { width }] = useMeasure();
  const [imagesReady, setImagesReady] = useState(true);

  const getInitialPosition = (item: { x: number; y: number; w: number; h: number }) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;

    if (animateFrom === "random") {
      const directions = ["top", "bottom", "left", "right"];
      direction = directions[Math.floor(Math.random() * directions.length)] as
        | "top"
        | "bottom"
        | "left"
        | "right";
    }

    switch (direction) {
      case "top":
        return { x: item.x, y: -200 };
      case "bottom":
        return { x: item.x, y: window.innerHeight + 200 };
      case "left":
        return { x: -200, y: item.y };
      case "right":
        return { x: window.innerWidth + 200, y: item.y };
      case "center":
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2,
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  useEffect(() => {
    if (items.length > 0) {
      preloadImages(items.map((i) => i.img).filter(Boolean));
    }
  }, [items]);

  const { grid, totalHeight } = useMemo(() => {
    const effectiveWidth = width > 0 ? width : (typeof window !== "undefined" ? window.innerWidth - 32 : 1200);
    if (items.length === 0) return { grid: [], totalHeight: 0 };

    const colHeights = new Array(columns).fill(0);
    const columnWidth = effectiveWidth / columns;

    const positioned = items.map((child) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = columnWidth * col;
      const height = child.height || 420;
      const y = colHeights[col];

      colHeights[col] += height;

      return { ...child, x, y, w: columnWidth, h: height };
    });

    return {
      grid: positioned,
      totalHeight: Math.max(...colHeights, 0),
    };
  }, [columns, items, width]);

  const hasMounted = useRef(false);

  useIsomorphicLayoutEffect(() => {
    if (grid.length === 0) return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animationProps = {
        x: item.x,
        y: item.y,
        width: item.w,
        height: item.h,
      };

      if (!hasMounted.current) {
        const initialPos = getInitialPosition(item);
        const initialState = {
          opacity: 0,
          x: initialPos.x,
          y: initialPos.y,
          width: item.w,
          height: item.h,
          ...(blurToFocus && { filter: "blur(10px)" }),
        };

        gsap.fromTo(selector, initialState, {
          opacity: 1,
          ...animationProps,
          ...(blurToFocus && { filter: "blur(0px)" }),
          duration: 0.6,
          ease: "power3.out",
          delay: index * stagger,
        });
      } else {
        gsap.to(selector, {
          opacity: 1,
          ...animationProps,
          duration: duration,
          ease: ease,
          overwrite: "auto",
        });
      }
    });

    hasMounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid, stagger, animateFrom, blurToFocus, duration, ease]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, item: MasonryItem) => {
    const element = e.currentTarget;
    const selector = `[data-key="${item.id}"]`;

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: hoverScale,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector(".color-overlay");
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0.3,
          duration: 0.3,
        });
      }
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>, item: MasonryItem) => {
    const element = e.currentTarget;
    const selector = `[data-key="${item.id}"]`;

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector(".color-overlay");
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3,
        });
      }
    }
  };

  const handleItemClick = (item: MasonryItem) => {
    if (item.url.startsWith("http://") || item.url.startsWith("https://")) {
      window.open(item.url, "_blank", "noopener,noreferrer");
    } else {
      router.push(item.url);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`list ${className}`}
      style={{ minHeight: totalHeight > 0 ? `${totalHeight}px` : "300px" }}
    >
      {grid.map((item) => {
        return (
          <div
            key={item.id}
            data-key={item.id}
            className="item-wrapper group"
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              transform: `translate3d(${item.x}px, ${item.y}px, 0)`,
              width: `${item.w}px`,
              height: `${item.h}px`,
              opacity: 1,
              visibility: "visible",
            }}
            onClick={() => handleItemClick(item)}
            onMouseEnter={(e) => handleMouseEnter(e, item)}
            onMouseLeave={(e) => handleMouseLeave(e, item)}
          >
            <div
              className="item-img relative"
              style={{
                backgroundImage: item.img ? `url("${item.img}")` : undefined,
                backgroundColor: "#0d1527",
              }}
            >
              {/* Optional Custom Card Content or Default Rich Brand Overlay */}
              {renderItem ? (
                renderItem(item)
              ) : (
                <>
                  {/* Subtle Dark Gradient Overlay for Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#02040A] via-[#02040A]/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none z-10">
                    {item.category && (
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase bg-[#F59E0B]/20 border border-[#F59E0B]/40 text-[#F59E0B] backdrop-blur-md shadow-sm">
                        {item.category}
                      </span>
                    )}
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium text-[#EA580C] bg-[#EA580C]/10 border border-[#EA580C]/30 backdrop-blur-md">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Bottom Information */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10 flex flex-col gap-1.5 pointer-events-none">
                    {item.date && (
                      <span className="text-[10px] font-mono text-[#64748B]">
                        {item.date} {item.readTime ? `• ${item.readTime}` : ""}
                      </span>
                    )}
                    {item.title && (
                      <h4 className="font-heading text-sm sm:text-base font-bold text-white group-hover:text-[#F59E0B] transition-colors line-clamp-2 leading-snug">
                        {item.title}
                      </h4>
                    )}
                    {item.subtitle && (
                      <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed font-normal">
                        {item.subtitle}
                      </p>
                    )}

                    {/* Tags */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-0.5">
                        {item.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/[0.08] text-[#CBD5E1] border border-white/[0.1]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Author info (for news/articles) */}
                    {item.author && (
                      <div className="flex items-center gap-2 mt-1.5 pt-2 border-t border-white/[0.08]">
                        {item.author.avatar && (
                          <img
                            src={item.author.avatar}
                            alt={item.author.name}
                            className="w-5 h-5 rounded-full object-cover border border-white/[0.15]"
                          />
                        )}
                        <span className="text-[11px] font-medium text-[#CBD5E1]">
                          {item.author.name}
                        </span>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Color Shift Overlay (from prompt) */}
              {colorShiftOnHover && <div className="color-overlay" />}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Masonry;
