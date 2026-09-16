"use client";

import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

interface TimelineProps {
  data: TimelineEntry[];
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  badge?: string;
  hideHeader?: boolean;
  actionLink?: {
    label: string;
    href: string;
  };
}

export const Timeline = ({
  data,
  title,
  subtitle,
  badge = "Agenda & Linimasa",
  hideHeader = false,
  actionLink,
}: TimelineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setHeight(rect.height);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 15%", "end 80%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <div
      className="w-full bg-[#02040A] font-sans px-4 sm:px-6 md:px-10 relative overflow-hidden"
      ref={containerRef}
    >
      {!hideHeader && (
        <div className="max-w-7xl mx-auto pt-16 pb-8 md:py-16 px-2 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              {badge && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-xs font-mono text-[#F59E0B] mb-4 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
                  <Calendar className="w-3.5 h-3.5 text-[#EA580C]" />
                  <span>{badge}</span>
                </div>
              )}
              {title ? (
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F8FAFC] tracking-tight max-w-3xl">
                  {title}
                </h2>
              ) : (
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F8FAFC] tracking-tight max-w-3xl">
                  Agenda & <span className="text-gradient">Timeline Perjalanan</span>
                </h2>
              )}
              {subtitle && (
                <p className="text-[#94A3B8] text-sm md:text-base max-w-2xl mt-3 leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>

            {actionLink && (
              <Link
                href={actionLink.href}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0F172A] hover:bg-[#1E293B] border border-[#F59E0B]/30 text-[#F59E0B] hover:text-[#EA580C] text-sm font-semibold transition-all group self-start md:self-auto shadow-md"
              >
                <span>{actionLink.label}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </div>
      )}

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-24 md:gap-10"
          >
            {/* Left Sticky Node */}
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-28 sm:top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              {/* Outer circular indicator */}
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-[#02040A] border border-[#F59E0B]/30 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                {/* Inner glowing pulse dot */}
                <div className="h-3.5 w-3.5 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#EA580C] shadow-[0_0_10px_#F59E0B]" />
              </div>

              {/* Desktop Title / Date Label */}
              <h3 className="hidden md:block text-lg md:text-2xl lg:text-3xl md:pl-20 font-extrabold text-[#F8FAFC] tracking-tight">
                {item.title}
              </h3>
            </div>

            {/* Right Content */}
            <div className="relative pl-16 pr-2 sm:pl-20 md:pl-4 w-full">
              {/* Mobile Title */}
              <h3 className="md:hidden block text-xl mb-4 text-left font-extrabold text-[#F8FAFC] tracking-tight">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        {/* Vertical Progress Beam Line */}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-gradient-to-b from-transparent via-white/10 to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-[#F59E0B] via-[#EA580C] to-transparent from-[0%] via-[20%] rounded-full shadow-[0_0_12px_#F59E0B]"
          />
        </div>
      </div>
    </div>
  );
};
