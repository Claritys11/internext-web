"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { Timeline, TimelineEntry } from "@/components/ui/timeline";
import { EventItem } from "@/lib/types";
import {
  MapPin,
  Users,
  Clock,
  CheckCircle2,
  Sparkles,
  CalendarDays,
  Tag,
} from "lucide-react";

interface EventsTimelineSectionProps {
  events: EventItem[];
  isHome?: boolean;
}

export function EventsTimelineSection({
  events,
  isHome = false,
}: EventsTimelineSectionProps) {
  // Filter events: if isHome, pick exactly 4: 1 previous, 1 today, 2 next
  const filteredEvents = useMemo(() => {
    if (!isHome) {
      // Sort all events by date ascending for full timeline
      return [...events].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    }

    // Home timeline: pick 1 previous, 1 today, 2 next
    const sorted = [...events].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Reference date (2026-09-16)
    const nowTime = new Date("2026-09-16T12:00:00+07:00").getTime();

    // 1. Previous/completed events (date < now and status !== 'ongoing')
    const pastEvents = sorted.filter(
      (e) => new Date(e.date).getTime() < nowTime && e.status !== "ongoing"
    );
    const prevEvent =
      pastEvents.length > 0 ? pastEvents[pastEvents.length - 1] : sorted[0];

    // 2. Today/ongoing event
    const todayEvents = sorted.filter((e) => {
      const d = new Date(e.date);
      return (
        e.status === "ongoing" ||
        (d.getFullYear() === 2026 && d.getMonth() === 8 && d.getDate() === 16)
      );
    });
    const todayEvent =
      todayEvents.length > 0
        ? todayEvents[0]
        : sorted.find((e) => e.status === "ongoing") || sorted[1];

    // 3. Next 2 upcoming events (date > todayEvent's date)
    const todayTime = todayEvent
      ? new Date(todayEvent.date).getTime()
      : nowTime;
    const upcomingEvents = sorted.filter(
      (e) =>
        new Date(e.date).getTime() > todayTime &&
        e.id !== todayEvent?.id &&
        e.id !== prevEvent?.id
    );
    const next1 = upcomingEvents[0];
    const next2 = upcomingEvents[1];

    const result: EventItem[] = [];
    if (prevEvent) result.push(prevEvent);
    if (todayEvent && !result.some((e) => e.id === todayEvent.id))
      result.push(todayEvent);
    if (next1 && !result.some((e) => e.id === next1.id)) result.push(next1);
    if (next2 && !result.some((e) => e.id === next2.id)) result.push(next2);

    // Ensure we have 4 events
    for (const ev of sorted) {
      if (result.length >= 4) break;
      if (!result.some((e) => e.id === ev.id)) result.push(ev);
    }

    return result.slice(0, 4);
  }, [events, isHome]);

  // Convert filtered events into TimelineEntry data
  const timelineData: TimelineEntry[] = useMemo(() => {
    return filteredEvents.map((event) => {
      const d = new Date(event.date);
      const isToday =
        event.status === "ongoing" ||
        (d.getFullYear() === 2026 && d.getMonth() === 8 && d.getDate() === 16);
      const isCompleted = event.status === "completed";

      // Formatted date string for the sticky title
      const shortDate = d.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

      const fullDateStr = d.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      const timeStr = event.date.includes("T") || event.date.includes(":")
        ? `${d.getHours().toString().padStart(2, "0")}.${d.getMinutes().toString().padStart(2, "0")} WIB`
        : "";

      const titleNode = (
        <div className="flex flex-col">
          <span className="text-xl sm:text-2xl lg:text-3xl font-black font-heading text-[#F8FAFC]">
            {shortDate}
          </span>
          {isToday && (
            <span className="text-xs font-mono font-bold text-[#F59E0B] flex items-center gap-1 mt-0.5 animate-pulse">
              <Sparkles className="w-3 h-3 text-[#EA580C]" />
              HARI INI
            </span>
          )}
          {isCompleted && (
            <span className="text-xs font-mono text-emerald-400 mt-0.5">
              TERLAKSANA
            </span>
          )}
          {!isToday && !isCompleted && (
            <span className="text-xs font-mono text-[#EA580C] mt-0.5">
              MENDATANG
            </span>
          )}
        </div>
      );

      const contentNode = (
        <div className="glass-card p-5 sm:p-7 rounded-3xl border border-white/[0.08] hover:border-[#F59E0B]/40 transition-all duration-300 group shadow-xl mb-6">
          {/* Header Badges */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex flex-wrap items-center gap-2">
              {isToday ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/40 shadow-[0_0_15px_rgba(245,158,11,0.25)] animate-pulse">
                  <Sparkles className="w-3.5 h-3.5 text-[#EA580C]" />
                  <span>Sedang Berlangsung / Hari Ini</span>
                </span>
              ) : isCompleted ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Telah Terlaksana</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EA580C]/15 text-[#EA580C] border border-[#EA580C]/30">
                  <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Agenda Mendatang</span>
                </span>
              )}

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono bg-white/[0.05] text-[#94A3B8] border border-white/10">
                <Tag className="w-3 h-3 text-[#64748B]" />
                <span>{event.category}</span>
              </span>
            </div>

            <div className="text-xs font-mono text-[#64748B] flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>{fullDateStr}{timeStr ? ` • ${timeStr}` : ""}</span>
            </div>
          </div>

          {/* Event Title */}
          <h4 className="text-xl sm:text-2xl md:text-3xl font-heading font-extrabold text-[#F8FAFC] tracking-tight group-hover:text-[#F59E0B] transition-colors leading-snug mb-3">
            {event.title}
          </h4>

          {/* Event Description */}
          <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed mb-5">
            {event.description}
          </p>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-white/[0.06] text-xs font-medium text-[#CBD5E1] mb-5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-white/[0.05] flex items-center justify-center text-[#F59E0B]">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <span className="truncate">{event.location}</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-white/[0.05] flex items-center justify-center text-[#EA580C]">
                <Users className="w-3.5 h-3.5" />
              </div>
              <span className="truncate">{event.committee}</span>
            </div>
          </div>

          {/* Cover Image */}
          {event.coverImage && (
            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] border border-white/10 shadow-lg">
              <Image
                src={event.coverImage}
                alt={event.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#02040A] via-transparent to-transparent opacity-60" />
            </div>
          )}
        </div>
      );

      return {
        title: titleNode as any,
        content: contentNode,
      };
    });
  }, [filteredEvents]);

  return (
    <Timeline
      data={timelineData}
      badge={isHome ? "Linimasa Agenda Terpilih" : "Kalender Seluruh Agenda"}
      title={
        isHome ? (
          <>
            Linimasa Kegiatan & <span className="text-gradient">Agenda Kelas</span>
          </>
        ) : (
          <>
            Jadwal Lengkap & <span className="text-gradient">Linimasa Angkatan</span>
          </>
        )
      }
      subtitle={
        isHome
          ? "Rangkaian agenda terdekat kelas XI Internasional SMK Telkom Malang: kilas balik kegiatan terakhir, agenda hari ini, dan 2 milestone mendatang."
          : "Daftar menyeluruh seluruh agenda akademik, workshop kejuruan, ujian sertifikasi, hingga selebrasi akhir angkatan kelas XI Internasional."
      }
      actionLink={
        isHome
          ? {
              label: "Lihat Semua Agenda (" + events.length + ")",
              href: "/events",
            }
          : undefined
      }
    />
  );
}
