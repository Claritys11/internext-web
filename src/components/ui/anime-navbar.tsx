"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

export interface NavBarProps {
  items: NavItem[];
  className?: string;
  defaultActive?: string;
}

export function AnimeNavBar({ items, className, defaultActive = "Home" }: NavBarProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>(defaultActive);
  const [, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sync active tab with pathname
  useEffect(() => {
    const matched = items.find((item) => item.url === pathname);
    if (matched) {
      setActiveTab(matched.name);
    }
  }, [pathname, items]);

  if (!mounted) return null;

  return (
    <div className={cn("fixed top-4 left-0 right-0 z-[9999] pointer-events-none", className)}>
      <div className="flex justify-center pt-2 px-4 pointer-events-auto">
        <motion.div
          className="flex items-center gap-1.5 sm:gap-2 bg-[#0A0F1E]/80 border border-white/10 backdrop-blur-xl py-1.5 px-2 rounded-full shadow-2xl shadow-black/80 relative"
          initial={{ y: -20, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name || pathname === item.url;
            const isHovered = hoveredTab === item.name;

            return (
              <Link
                key={item.name}
                href={item.url}
                onClick={() => {
                  setActiveTab(item.name);
                }}
                onMouseEnter={() => setHoveredTab(item.name)}
                onMouseLeave={() => setHoveredTab(null)}
                className={cn(
                  "relative cursor-pointer text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 sm:py-2.5 rounded-full transition-all duration-300",
                  "text-white/70 hover:text-white",
                  isActive && "text-white"
                )}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full -z-10 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0.3, 0.55, 0.3],
                      scale: [1, 1.03, 1],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="absolute inset-0 bg-[#06B6D4]/30 rounded-full blur-md" />
                    <div className="absolute inset-[-4px] bg-[#4F46E5]/25 rounded-full blur-xl" />
                    <div className="absolute inset-[-8px] bg-[#06B6D4]/15 rounded-full blur-2xl" />

                    <div
                      className="absolute inset-0 bg-gradient-to-r from-[#06B6D4]/0 via-[#06B6D4]/30 to-[#06B6D4]/0"
                      style={{
                        animation: "shine 3s ease-in-out infinite",
                      }}
                    />
                  </motion.div>
                )}

                <motion.span
                  className="hidden md:inline relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.name}
                </motion.span>
                <motion.span
                  className="md:hidden relative z-10 flex items-center justify-center p-1"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={18} strokeWidth={2.2} />
                </motion.span>

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
                    layoutId="anime-mascot"
                    className="absolute -top-11 left-1/2 -translate-x-1/2 pointer-events-none"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    <div className="relative w-11 h-11">
                      <motion.div
                        className="absolute w-9 h-9 bg-white rounded-full left-1/2 -translate-x-1/2 shadow-lg"
                        animate={
                          hoveredTab
                            ? {
                                scale: [1, 1.1, 1],
                                rotate: [0, -5, 5, 0],
                                transition: {
                                  duration: 0.5,
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
                          style={{ left: "26%", top: "40%" }}
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
                          style={{ right: "26%", top: "40%" }}
                        />

                        {/* Cheeks */}
                        <motion.div
                          className="absolute w-2 h-1.5 bg-pink-400/80 rounded-full"
                          animate={{
                            opacity: hoveredTab ? 0.9 : 0.6,
                          }}
                          style={{ left: "15%", top: "54%" }}
                        />
                        <motion.div
                          className="absolute w-2 h-1.5 bg-pink-400/80 rounded-full"
                          animate={{
                            opacity: hoveredTab ? 0.9 : 0.6,
                          }}
                          style={{ right: "15%", top: "54%" }}
                        />

                        {/* Mouth */}
                        <motion.div
                          className="absolute w-3.5 h-1.5 border-b-2 border-black rounded-full"
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
                          style={{ left: "31%", top: "58%" }}
                        />

                        {/* Sparkles on Hover */}
                        <AnimatePresence>
                          {hoveredTab && (
                            <>
                              <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                className="absolute -top-1 -right-1 w-2 h-2 text-yellow-300 select-none"
                              >
                                ✨
                              </motion.div>
                              <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{ delay: 0.1 }}
                                className="absolute -top-2 left-0 w-2 h-2 text-yellow-300 select-none"
                              >
                                ✨
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      {/* Small tail/pointer */}
                      <motion.div
                        className="absolute -bottom-1 left-1/2 w-3.5 h-3.5 -translate-x-1/2"
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
        </motion.div>
      </div>
    </div>
  );
}

export default AnimeNavBar;
