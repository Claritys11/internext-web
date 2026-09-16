import Image from "next/image";
import { EventItem } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Calendar, MapPin, Users, Clock } from "lucide-react";

export function EventCard({ event }: { event: EventItem }) {
  const isUpcoming = event.status === "upcoming";

  return (
    <div className="glass-card overflow-hidden transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group">
      <div>
        <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-[#0A0F1E]">
          <Image
            src={event.coverImage}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-black/30" />

          <div className="absolute top-3 left-3 flex gap-2">
            <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-[#06B6D4] text-[#0A0F1E] font-bold">
              {event.category}
            </span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-white">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md">
              <Calendar className="w-3.5 h-3.5 text-[#06B6D4]" />
              {formatDate(event.date)}
            </span>
            <span
              className={`px-2 py-0.5 rounded-md text-[10px] uppercase font-bold ${
                isUpcoming
                  ? "bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30"
                  : "bg-white/10 text-white/70"
              }`}
            >
              {event.status}
            </span>
          </div>
        </div>

        <div className="p-5">
          <h3 className="font-heading text-lg font-bold text-white group-hover:text-[#06B6D4] transition-colors mb-2 leading-snug">
            {event.title}
          </h3>

          <p className="text-xs text-[#94A3B8] leading-relaxed mb-4 line-clamp-3">
            {event.description}
          </p>

          <div className="space-y-1.5 text-xs text-[#64748B] font-mono">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#EF4444]" />
              <span className="text-[#CBD5E1] truncate">{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-[#A5B4FC]" />
              <span className="text-[#CBD5E1] truncate">{event.committee}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 pt-0 border-t border-white/[0.06] mt-3 pt-3.5 flex items-center justify-between">
        <span className="text-[11px] font-mono text-[#64748B]">
          Agenda Resmi
        </span>
        <span className="text-xs font-semibold text-[#06B6D4]">
          Lihat Jadwal →
        </span>
      </div>
    </div>
  );
}
