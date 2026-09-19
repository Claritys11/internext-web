import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EventsTimelineSection } from "@/components/sections/EventsTimelineSection";
import { getEvents, getClassProfile } from "@/lib/api/services";
import { pageMetadata, createBreadcrumbJsonLd, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Agenda & Linimasa Kegiatan",
  "Linimasa agenda kegiatan, workshop teknologi, persiapan uji kompetensi, hackathon, dan milestone kelas XI Internasional SMK Telkom Malang.",
  "/events",
  {
    keywords: [
      "Agenda Internext",
      "Linimasa Kegiatan Kelas",
      "Event SMK Telkom Malang",
      "Workshop XI Internasional",
      "Bootcamp Coding Siswa",
    ],
  }
);

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function EventsPage() {
  const [events, profile] = await Promise.all([
    getEvents(),
    getClassProfile(),
  ]);

  const breadcrumbs = createBreadcrumbJsonLd([
    { name: "Beranda", path: "/" },
    { name: "Agenda", path: "/events" },
  ]);

  const eventsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Agenda Kegiatan Kelas XI Internasional",
    description: "Daftar agenda kegiatan dan workshop siswa XI Internasional SMK Telkom Malang.",
    itemListElement: events.map((ev, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Event",
        name: ev.title,
        description: ev.description,
        startDate: ev.date,
        location: {
          "@type": "Place",
          name: ev.location,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Kota Malang",
            addressCountry: "ID",
          },
        },
        organizer: {
          "@type": "Organization",
          name: "Internext",
          url: absoluteUrl("/"),
        },
      },
    })),
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#02040A] text-[#F8FAFC]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsJsonLd) }}
      />
      <Navbar />

      <main className="flex-1 py-12 md:py-16">
        {/* Full Interactive Aceternity Timeline for all events */}
        <EventsTimelineSection events={events} isHome={false} />
      </main>

      <Footer profile={profile} />
    </div>
  );
}
