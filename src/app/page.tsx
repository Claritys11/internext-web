import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsBar } from "@/components/sections/StatsBar";
import { CircularGalleryShowcase } from "@/components/sections/CircularGalleryShowcase";
import { LeadershipShowcase } from "@/components/sections/LeadershipShowcase";
import { InfiniteNewsCarousel } from "@/components/sections/InfiniteNewsCarousel";
import { EventsTimelineSection } from "@/components/sections/EventsTimelineSection";
import { ScrollMotionPath } from "@/components/shared/ScrollMotionPath";
import { getProjects, getArticles, getEvents, getMembers, getClassProfile } from "@/lib/api/services";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const [allProjects, articles, events, members, profile] = await Promise.all([
    getProjects(),
    getArticles(),
    getEvents(),
    getMembers("management"),
    getClassProfile(),
  ]);

  return (
    <div className="flex flex-col min-h-screen relative bg-[#02040A] overflow-x-hidden">
      {/* GSAP MotionPath scroll tracker guide down the page (z-0, strictly behind all content & text in main) */}
      <ScrollMotionPath />

      <Navbar />

      <main className="flex-1 relative z-10">
        {/* 1. Hero Section (Clean, without countdown) */}
        <HeroSection profile={profile} />

        {/* 2. Key Metrics Stats Bar */}
        <StatsBar profile={profile} />

        {/* 3. Interactive Adapted 360° Circular Showcase with Left & Right 3-Card Featured Highlights */}
        <CircularGalleryShowcase projects={allProjects} maxItems={12} />

        {/* 4. Leadership Showcase (Tilted Frosted Glass Cards with Bold Background Typography) */}
        <LeadershipShowcase members={members} />

        {/* 5. Infinite Draggable & Snapping News Carousel (GSAP CodePen RwKwLWK style) */}
        <InfiniteNewsCarousel articles={articles} />

        {/* 6. Upcoming Events & Activities Timeline (4 Focused Items: 1 Previous, 1 Today, 2 Next) */}
        <EventsTimelineSection events={events} isHome={true} />
      </main>

      <CinematicFooter initialProfile={profile} />
    </div>
  );
}
