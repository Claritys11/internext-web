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
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "z-50 transition-all duration-300",
          isScrolled
            ? "fixed top-5 sm:top-6 inset-x-0 flex justify-center px-3 sm:px-4 pointer-events-none"
            : "sticky top-0 w-full glass-nav"
        )}
      >
        {isScrolled ? (
          /* =========================================================================
             1. SCROLLED STATE: Floating Rounded Pill with Anime NavBar & Mascot
             ========================================================================= */
          <motion.div
            key="scrolled-nav"
            initial={{ y: -20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="pointer-events-auto flex items-center gap-1.5 sm:gap-2.5 bg-[#0A0F1E]/90 border border-white/10 backdrop-blur-xl py-1.5 px-2.5 sm:px-3.5 rounded-full shadow-2xl shadow-black/90 relative max-w-max"
          >
            {/* Compact Brand Logo Pill */}
            <Link
              href="/"
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-white/[0.06] transition-colors group"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] p-0.5 shadow-md shadow-[#06B6D4]/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-[#0A0F1E] rounded-[6px] flex items-center justify-center">
                  <Terminal className="w-3.5 h-3.5 text-[#06B6D4]" />
                </div>
              </div>
              <span className="font-heading font-black text-xs tracking-tight text-white hidden lg:inline">
                INTERNEXT
              </span>
            </Link>

            <div className="w-[1px] h-4 bg-white/10 hidden sm:block" />

            {/* Anime Navigation Links with Mascot */}
            <nav className="flex items-center gap-0.5 sm:gap-1">
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
                      "relative cursor-pointer text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-full transition-all duration-300",
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
                    <span className="hidden xl:inline relative z-10 font-medium">
                      {item.name}
                    </span>
                    <span className="xl:hidden relative z-10 flex items-center justify-center p-0.5">
                      <Icon size={16} strokeWidth={2.2} />
                    </span>

                    {/* Hover Glow */}
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

                    {/* Animated Anime Mascot on Active Tab */}
                    {isActive && (
                      <motion.div
                        layoutId="anime-mascot-scrolled"
                        className="absolute -top-11 left-1/2 -translate-x-1/2 pointer-events-none"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      >
                        <div className="relative w-10 h-10">
                          <motion.div
                            className="absolute w-8 h-8 bg-white rounded-full left-1/2 -translate-x-1/2 shadow-lg"
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
                                    y: [0, -3, 0],
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
                              className="absolute w-1.5 h-1.5 bg-black rounded-full"
                              animate={
                                hoveredTab
                                  ? {
                                      scaleY: [1, 0.2, 1],
                                      transition: {
                                        duration: 0.2,
                                        times: [0, 0.5, 1],
                                      },
                                    }
                                  : {}
                              }
                              style={{ left: "24%", top: "38%" }}
                            />
                            <motion.div
                              className="absolute w-1.5 h-1.5 bg-black rounded-full"
                              animate={
                                hoveredTab
                                  ? {
                                      scaleY: [1, 0.2, 1],
                                      transition: {
                                        duration: 0.2,
                                        times: [0, 0.5, 1],
                                      },
                                    }
                                  : {}
                              }
                              style={{ right: "24%", top: "38%" }}
                            />

                            {/* Cheeks */}
                            <motion.div
                              className="absolute w-2 h-1.5 bg-pink-400/80 rounded-full"
                              animate={{
                                opacity: hoveredTab ? 0.9 : 0.6,
                              }}
                              style={{ left: "14%", top: "52%" }}
                            />
                            <motion.div
                              className="absolute w-2 h-1.5 bg-pink-400/80 rounded-full"
                              animate={{
                                opacity: hoveredTab ? 0.9 : 0.6,
                              }}
                              style={{ right: "14%", top: "52%" }}
                            />

                            {/* Mouth */}
                            <motion.div
                              className="absolute w-3 h-1.5 border-b-2 border-black rounded-full"
                              animate={
                                hoveredTab
                                  ? {
                                      scaleY: 1.5,
                                      y: -1,
                                    }
                                  : {
                                      scaleY: 1,
                                      y: 0,
                                    }
                              }
                              style={{ left: "31%", top: "56%" }}
                            />

                            {/* Sparkles on Hover */}
                            <AnimatePresence>
                              {hoveredTab && (
                                <>
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0 }}
                                    className="absolute -top-1 -right-1 w-2 h-2 text-yellow-300 select-none text-[10px]"
                                  >
                                    ✨
                                  </motion.div>
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="absolute -top-2 left-0 w-2 h-2 text-yellow-300 select-none text-[10px]"
                                  >
                                    ✨
                                  </motion.div>
                                </>
                              )}
                            </AnimatePresence>
                          </motion.div>

                          {/* Pointer triangle */}
                          <motion.div
                            className="absolute -bottom-1 left-1/2 w-3 h-3 -translate-x-1/2"
                            animate={
                              hoveredTab
                                ? {
                                    y: [0, -3, 0],
                                    transition: {
                                      duration: 0.3,
                                      repeat: Infinity,
                                      repeatType: "reverse",
                                    },
                                  }
                                : {
                                    y: [0, 2, 0],
                                    transition: {
                                      duration: 1,
                                      repeat: Infinity,
                                      ease: "easeInOut",
                                      delay: 0.5,
                                    },
                                  }
                            }
                          >
                            <div className="w-full h-full bg-white rotate-45 transform origin-center" />
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="w-[1px] h-4 bg-white/10 hidden sm:block" />

            {/* Quick Action in Pill */}
            <div className="flex items-center gap-1.5 pl-1">
              <Link
                href="/projects"
                className="btn-gradient px-3 py-1.5 rounded-full text-[11px] font-semibold flex items-center gap-1 shadow-sm"
              >
                <span>Karya</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>
        ) : (
          /* =========================================================================
             2. TOP STATE: Full-Width Fixed Header
             ========================================================================= */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            {/* Brand Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4] rounded-lg"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] p-0.5 shadow-lg shadow-[#4F46E5]/20 group-hover:shadow-[#06B6D4]/30 transition-all duration-300">
                <div className="w-full h-full bg-[#0A0F1E] rounded-[10px] flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-[#06B6D4] group-hover:text-white transition-colors duration-200" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-xl tracking-tight text-white group-hover:text-[#06B6D4] transition-colors">
                  INTERNEXT
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#64748B] -mt-1">
                  Class HQ
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-full px-3.5 py-1.5 backdrop-blur-md">
              {siteConfig.navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-[#4F46E5] text-white shadow-sm shadow-[#4F46E5]/40"
                        : "text-[#94A3B8] hover:text-white hover:bg-white/[0.05]"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/admin"
                className="text-xs font-mono px-3.5 py-2 rounded-lg text-[#94A3B8] hover:text-white border border-white/[0.08] hover:border-white/[0.2] transition-colors flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#A5B4FC]" />
                <span>Portal Admin</span>
              </Link>
              <Link
                href="/projects"
                className="btn-gradient px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5"
              >
                <span>Eksplorasi Karya</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle navigation menu"
                className="p-2 rounded-lg bg-white/[0.05] border border-white/[0.1] text-[#F8FAFC] hover:bg-white/[0.1] focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer Menu (Accessible from either state when clicked) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 inset-x-0 z-40 md:hidden border-b border-white/[0.08] bg-[#0A0F1E]/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 shadow-2xl"
          >
            <nav className="flex flex-col space-y-1">
              {siteConfig.navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-[#4F46E5] text-white font-semibold"
                        : "text-[#94A3B8] hover:text-white hover:bg-white/[0.05]"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-2">
              <Link
                href="/admin"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-2.5 rounded-lg border border-white/[0.1] text-xs font-mono text-[#94A3B8] hover:text-white"
              >
                Portal Admin
              </Link>
              <Link
                href="/projects"
                onClick={() => setMobileOpen(false)}
                className="btn-gradient w-full text-center py-2.5 rounded-lg text-xs font-semibold"
              >
                Eksplorasi Karya
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
