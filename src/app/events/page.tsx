import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EventsTimelineSection } from "@/components/sections/EventsTimelineSection";
import { getEvents, getClassProfile } from "@/lib/api/services";

export default async function EventsPage() {
  const [events, profile] = await Promise.all([
    getEvents(),
    getClassProfile(),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-[#02040A] text-[#F8FAFC]">
      <Navbar />

      <main className="flex-1 py-12 md:py-16">
        {/* Full Interactive Aceternity Timeline for all events */}
        <EventsTimelineSection events={events} isHome={false} />
      </main>

      <Footer profile={profile} />
    </div>
  );
}
