import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EventCard } from "@/components/features/EventCard";
import { getEvents } from "@/lib/api/services";
import { Calendar, Clock, MapPin, Sparkles } from "lucide-react";

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-xs font-mono text-[#10B981] mb-4">
              <Calendar className="w-3.5 h-3.5" />
              <span>Jadwal & Agenda Angkatan</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Agenda & <span className="text-gradient-cyan">Timeline Kegiatan</span>
            </h1>
            <p className="text-base text-[#94A3B8] leading-relaxed">
              Daftar kegiatan mendatang, jadwal ujian sertifikasi, pameran karya teknologi, dan agenda penting kelas lainnya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
