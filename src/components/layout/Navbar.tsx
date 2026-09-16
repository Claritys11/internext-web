"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Menu, X, Terminal, ChevronRight } from "lucide-react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full glass-nav transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4] rounded-lg">
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
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-full px-4 py-1.5 backdrop-blur-md">
          {siteConfig.navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#4F46E5] text-white shadow-sm shadow-[#4F46E5]/40"
                    : "text-[#94A3B8] hover:text-white hover:bg-white/[0.05]"
                }`}
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
            className="text-xs font-mono px-3.5 py-2 rounded-lg text-[#94A3B8] hover:text-white border border-white/[0.08] hover:border-white/[0.2] transition-colors"
          >
            Portal Admin
          </Link>
          <Link
            href="/projects"
            className="btn-gradient px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5"
          >
            Eksplorasi Karya
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

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#0A0F1E]/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-1">
            {siteConfig.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#4F46E5] text-white font-semibold"
                      : "text-[#94A3B8] hover:text-white hover:bg-white/[0.05]"
                  }`}
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
        </div>
      )}
    </header>
  );
}
