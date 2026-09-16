"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import {
  Menu,
  X,
  Terminal,
  ChevronRight,
  Home,
  Info,
  Users,
  Code2,
  Newspaper,
  Calendar,
  Camera,
  MessageSquare,
  ShieldCheck,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItemConfig {
  name: string;
  url: string;
  icon: LucideIcon;
}

const navItems: NavItemConfig[] = [
  { name: "Beranda", url: "/", icon: Home },
  { name: "Tentang", url: "/about", icon: Info },
  { name: "Anggota", url: "/members", icon: Users },
  { name: "Karya", url: "/projects", icon: Code2 },
  { name: "Berita", url: "/news", icon: Newspaper },
  { name: "Agenda", url: "/events", icon: Calendar },
  { name: "Galeri", url: "/gallery", icon: Camera },
  { name: "Buku Tamu", url: "/contact", icon: MessageSquare },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Smooth threshold with a small buffer
      setIsScrolled(window.scrollY > 25);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* 
        Always Fixed Header Container (z-50)
        Never changes layout flow height, eliminating double-scrollbars and jumping.
      */}
      <header className="fixed top-0 inset-x-0 z-50 pointer-events-none flex justify-center px-3 sm:px-6 pt-4 sm:pt-5 transition-all duration-300">
        <motion.div
          layout
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 24,
          }}
          className={cn(
            "pointer-events-auto flex items-center justify-between transition-all duration-300 relative",
            isScrolled
              ? "w-auto max-w-fit mx-auto bg-[#0A0F1E]/92 border border-white/15 backdrop-blur-2xl py-1.5 px-3 sm:px-4 rounded-full shadow-2xl shadow-black/85 gap-2 sm:gap-3"
              : "w-full max-w-7xl mx-auto bg-[#0A0F1E]/80 border border-white/10 backdrop-blur-xl py-2.5 sm:py-3 px-4 sm:px-6 rounded-2xl sm:rounded-full shadow-lg shadow-black/40 gap-4"
          )}
        >
          {/* ========================================================= */}
          {/* Brand Logo                                                */}
          {/* ========================================================= */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4] rounded-lg"
          >
            <div
              className={cn(
                "rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] p-0.5 shadow-md shadow-[#4F46E5]/25 group-hover:shadow-[#06B6D4]/35 transition-all duration-300",
                isScrolled ? "w-8 h-8" : "w-9 h-9 sm:w-10 sm:h-10"
              )}
            >
              <div className="w-full h-full bg-[#0A0F1E] rounded-[10px] flex items-center justify-center">
                <Terminal
                  className={cn(
                    "text-[#06B6D4] group-hover:text-white transition-colors duration-200",
                    isScrolled ? "w-4 h-4" : "w-4 h-4 sm:w-5 sm:h-5"
                  )}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <span
                className={cn(
                  "font-heading font-extrabold tracking-tight text-white group-hover:text-[#06B6D4] transition-colors",
                  isScrolled
                    ? "text-xs sm:text-sm hidden sm:inline"
                    : "text-sm sm:text-lg"
                )}
              >
                INTERNEXT
              </span>
              {!isScrolled && (
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[#64748B] -mt-1 hidden sm:inline">
                  Class HQ
                </span>
              )}
            </div>
          </Link>

          {/* Divider in compact mode */}
          {isScrolled && <div className="w-[1px] h-4 bg-white/10 hidden md:block" />}

          {/* ========================================================= */}
          {/* Navigation Links with Anime Mascot & Glow Aura            */}
          {/* ========================================================= */}
          <nav
            className={cn(
              "hidden md:flex items-center",
              isScrolled
                ? "gap-0.5 sm:gap-1"
                : "gap-1 bg-white/[0.03] border border-white/[0.06] rounded-full px-2 py-1 backdrop-blur-md"
            )}
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.url;
              const isHovered = hoveredTab === item.name;

              return (
                <Link
                  key={item.name}
                  href={item.url}
                  onMouseEnter={() => setHoveredTab(item.name)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className={cn(
                    "relative cursor-pointer text-xs font-semibold rounded-full transition-all duration-300",
                    isScrolled
                      ? "px-2.5 sm:px-3 py-1.5"
                      : "px-3 sm:px-3.5 py-1.5",
                    "text-[#94A3B8] hover:text-white",
                    isActive && "text-white"
                  )}
                >
                  {/* Glowing Anime Active Aura */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full -z-10 overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.03, 1],
                      }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="absolute inset-0 bg-[#06B6D4]/30 rounded-full blur-sm" />
                      <div className="absolute inset-[-4px] bg-[#4F46E5]/20 rounded-full blur-md" />
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-[#06B6D4]/0 via-[#06B6D4]/30 to-[#06B6D4]/0"
                        style={{
                          animation: "shine 3s ease-in-out infinite",
                        }}
                      />
                    </motion.div>
                  )}

                  {/* Text on larger screens, Icon on smaller screens */}
                  <span
                    className={cn(
                      "relative z-10 font-medium",
                      isScrolled ? "hidden xl:inline" : "hidden lg:inline"
                    )}
                  >
                    {item.name}
                  </span>
                  <span
                    className={cn(
                      "relative z-10 flex items-center justify-center p-0.5",
                      isScrolled ? "xl:hidden" : "lg:hidden"
                    )}
                  >
                    <Icon size={16} strokeWidth={2.2} />
                  </span>

                  {/* Hover Glow Pill */}
                  <AnimatePresence>
                    {isHovered && !isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-0 bg-white/10 rounded-full -z-10"
                      />
                    )}
                  </AnimatePresence>

                  {/* Animated Anime Mascot on Active Tab (Safely anchored with headroom) */}
                  {isActive && (
                    <motion.div
                      layoutId="anime-mascot-pill"
                      className="absolute -top-8 left-1/2 -translate-x-1/2 pointer-events-none"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      <div className="relative w-9 h-9">
                        <motion.div
                          className="absolute w-7 h-7 bg-white rounded-full left-1/2 -translate-x-1/2 shadow-lg"
                          animate={
                            hoveredTab
                              ? {
                                  scale: [1, 1.12, 1],
                                  rotate: [0, -6, 6, 0],
                                  transition: {
                                    duration: 0.45,
                                    ease: "easeInOut",
                                  },
                                }
                              : {
                                  y: [0, -2.5, 0],
                                  transition: {
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                  },
                                }
                          }
                        >
                          {/* Eyes */}
                          <motion.div
                            className="absolute w-1 h-1 bg-black rounded-full"
                            style={{ left: "24%", top: "38%" }}
                          />
                          <motion.div
                            className="absolute w-1 h-1 bg-black rounded-full"
                            style={{ right: "24%", top: "38%" }}
                          />

                          {/* Cheeks */}
                          <motion.div
                            className="absolute w-1.5 h-1 bg-pink-400/80 rounded-full"
                            style={{ left: "14%", top: "52%" }}
                          />
                          <motion.div
                            className="absolute w-1.5 h-1 bg-pink-400/80 rounded-full"
                            style={{ right: "14%", top: "52%" }}
                          />

                          {/* Mouth */}
                          <motion.div
                            className="absolute w-2.5 h-1 border-b-2 border-black rounded-full"
                            style={{ left: "31%", top: "56%" }}
                          />

                          {/* Sparkles on Hover */}
                          <AnimatePresence>
                            {hoveredTab && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                className="absolute -top-1 -right-1 text-yellow-300 select-none text-[8px]"
                              >
                                ✨
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>

                        {/* Pointer triangle */}
                        <motion.div className="absolute -bottom-1 left-1/2 w-2.5 h-2.5 -translate-x-1/2">
                          <div className="w-full h-full bg-white rotate-45 transform origin-center" />
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ========================================================= */}
          {/* Right Actions (Wide vs Compact)                           */}
          {/* ========================================================= */}
          <div className="flex items-center gap-2">
            {!isScrolled && (
              <Link
                href="/admin"
                className="hidden lg:flex text-xs font-mono px-3 py-1.5 rounded-full text-[#94A3B8] hover:text-white border border-white/[0.08] hover:border-white/[0.2] transition-colors items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#A5B4FC]" />
                <span>Portal Admin</span>
              </Link>
            )}

            <Link
              href="/projects"
              className={cn(
                "btn-gradient rounded-full font-semibold flex items-center gap-1 shadow-sm transition-all",
                isScrolled
                  ? "px-3 py-1.5 text-[11px]"
                  : "px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs"
              )}
            >
              <span>Karya</span>
              <ChevronRight className="w-3 h-3" />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-1.5 rounded-lg bg-white/[0.05] border border-white/[0.1] text-[#F8FAFC] hover:bg-white/[0.1] focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </motion.div>
      </header>

      {/* ========================================================= */}
      {/* Mobile Drawer Menu                                        */}
      {/* ========================================================= */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed top-20 inset-x-4 z-50 md:hidden rounded-2xl border border-white/[0.1] bg-[#0A0F1E]/95 backdrop-blur-2xl p-4 shadow-2xl space-y-3 max-w-sm mx-auto"
            >
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#06B6D4]" />
                  <span className="font-heading font-bold text-sm text-white">Menu Navigasi</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1 rounded-lg text-[#94A3B8] hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <nav className="grid grid-cols-2 gap-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.url;
                  return (
                    <Link
                      key={item.name}
                      href={item.url}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-colors",
                        isActive
                          ? "bg-[#4F46E5] text-white font-semibold shadow-sm"
                          : "text-[#94A3B8] hover:text-white hover:bg-white/[0.05]"
                      )}
                    >
                      <Icon className="w-3.5 h-3.5 text-[#06B6D4]" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-2 border-t border-white/[0.08] flex flex-col gap-2">
                <Link
                  href="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center py-2 rounded-xl border border-white/[0.1] text-xs font-mono text-[#94A3B8] hover:text-white bg-white/[0.02]"
                >
                  Portal Admin
                </Link>
                <Link
                  href="/projects"
                  onClick={() => setMobileOpen(false)}
                  className="btn-gradient w-full text-center py-2 rounded-xl text-xs font-semibold"
                >
                  Eksplorasi Karya
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
