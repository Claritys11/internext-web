import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsBar } from "@/components/sections/StatsBar";
import { CircularGalleryShowcase } from "@/components/sections/CircularGalleryShowcase";
import { LeadershipShowcase } from "@/components/sections/LeadershipShowcase";
import { InfiniteNewsCarousel } from "@/components/sections/InfiniteNewsCarousel";
import { EventCard } from "@/components/features/EventCard";
import { ScrollMotionPath } from "@/components/shared/ScrollMotionPath";
import { getProjects, getArticles, getEvents, getMembers } from "@/lib/api/services";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";

export default async function HomePage() {
  const [allProjects, articles, events, members] = await Promise.all([
    getProjects(),
    getArticles(),
    getEvents(),
    getMembers("management"),
  ]);

  return (
    <div className="flex flex-col min-h-screen relative bg-[#0A0F1E] overflow-x-hidden">
      {/* GSAP MotionPath scroll tracker guide down the page (z-0, strictly behind all content & text in main) */}
      <ScrollMotionPath />

      <Navbar />

      <main className="flex-1 relative z-10 bg-[#0A0F1E] shadow-2xl">
        {/* 1. Hero Section (Clean, without countdown) */}
        <HeroSection />

        {/* 2. Key Metrics Stats Bar */}
        <StatsBar />

        {/* 3. Interactive Adapted 360° Circular Showcase with Left & Right 3-Card Featured Highlights */}
        <CircularGalleryShowcase projects={allProjects} maxItems={12} />

        {/* 4. Leadership Showcase (Tilted Frosted Glass Cards with Bold Background Typography) */}
        <LeadershipShowcase members={members} />

        {/* 5. Infinite Draggable & Snapping News Carousel (GSAP CodePen RwKwLWK style) */}
        <InfiniteNewsCarousel articles={articles} />

        {/* 6. Upcoming Events & Activities */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div className="relative z-20 bg-[#0A0F1E]/95 shadow-[0_0_40px_30px_#0A0F1E] rounded-3xl p-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-xs font-mono text-[#10B981] mb-3">
                <Calendar className="w-3.5 h-3.5" />
                <span>Agenda & Dokumentasi</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Kegiatan & <span className="text-gradient-cyan">Timeline Mendatang</span>
              </h2>
            </div>
            <Link
              href="/events"
              className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-[#06B6D4] hover:text-white transition-colors"
            >
              <span>Lihat Kalender Lengkap</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.slice(0, 3).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>

        {/* 7. Call To Action Banner (translucent frosted glass so path shines faintly through) */}
        <section className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16 border border-white/[0.1] bg-gradient-to-r from-[#4F46E5]/20 via-[#111827]/70 to-[#06B6D4]/15 backdrop-blur-2xl shadow-2xl">
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.08] text-xs font-mono text-white mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#06B6D4]" />
                <span>Buku Tamu Digital</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-4xl font-extrabold text-white mb-4">
                Punya Pesan atau Saran untuk Kelas Kami?
              </h3>
              <p className="text-sm sm:text-base text-[#CBD5E1] mb-8 leading-relaxed">
                Tinggalkan jejak ucapan, kesan, atau motivasi bagi rekan-rekan dan alumni di buku tamu resmi Internext.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="btn-gradient px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2"
                >
                  <span>Tulis di Buku Tamu</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/about"
                  className="px-6 py-3 rounded-xl border border-white/[0.15] text-sm font-semibold text-white hover:bg-white/[0.05] transition-colors"
                >
                  Pelajari Visi Kelas
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <CinematicFooter />
    </div>
  );
}
