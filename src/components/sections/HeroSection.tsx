import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ArrowRight, Sparkles, Quote, Terminal } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-grid-pattern pt-16 pb-24 lg:pt-24 lg:pb-32">
      {/* Dynamic ambient gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#4F46E5]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[300px] h-[250px] bg-[#06B6D4]/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Hero Title & Info with clean frosted backdrop */}
        <div className="relative z-20 max-w-4xl mx-auto mb-6">
          {/* Badge Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-mono text-[#E2E8F0] backdrop-blur-md mb-8 hover:border-[#06B6D4]/40 transition-colors">
            <Terminal className="w-3.5 h-3.5 text-[#06B6D4]" />
            <span>{siteConfig.classInfo.school}</span>
            <span className="text-white/30">•</span>
            <span className="text-[#06B6D4] font-semibold">{siteConfig.classInfo.name}</span>
          </div>

          {/* Hero Title */}
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl mb-6">
            Pusat Identitas, Dokumentasi & Portofolio{" "}
            <span className="text-gradient">Digital Kelas</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-[#94A3B8] max-w-2xl mx-auto leading-relaxed font-normal">
            {siteConfig.description}
          </p>
        </div>

        {/* CTA Action Buttons - high z-index and clear positioning */}
        <div className="relative z-30 flex flex-col sm:flex-row items-center gap-4 mb-12">
          <Link
            href="/members"
            className="btn-gradient px-7 py-3.5 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
          >
            <span>Jelajahi 36 Anggota</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/projects"
            className="btn-outline-indigo px-7 py-3.5 rounded-xl text-sm font-semibold flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <Sparkles className="w-4 h-4 text-[#06B6D4]" />
            <span>Lihat Galeri Karya</span>
          </Link>
        </div>

        {/* Daily Quote Card (from Notion Spec) */}
        <div className="glass-card max-w-xl p-4 sm:p-5 flex items-start gap-3.5 text-left border-white/[0.08]">
          <div className="w-8 h-8 rounded-lg bg-[#4F46E5]/20 flex items-center justify-center shrink-0 mt-0.5">
            <Quote className="w-4 h-4 text-[#06B6D4]" />
          </div>
          <div>
            <p className="text-xs sm:text-sm text-[#CBD5E1] italic leading-relaxed">
              &quot;Teknologi terbaik bukan yang paling rumit, melainkan yang paling berdampak dan dikerjakan bersama dengan rasa saling percaya.&quot;
            </p>
            <p className="text-[11px] font-mono text-[#64748B] mt-1">
              — Filosofi Angkatan Internext 2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
