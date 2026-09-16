"use client";

import Image from "next/image";
import Link from "next/link";
import { Member } from "@/lib/types";
import { ArrowRight, Sparkles, ExternalLink } from "lucide-react";

interface LeadershipShowcaseProps {
  members: Member[];
}

export function LeadershipShowcase({ members }: LeadershipShowcaseProps) {
  // Find each management leader with robust matching
  const ketua =
    members.find(
      (m) =>
        m.role.toLowerCase().includes("ketua kelas") &&
        !m.role.toLowerCase().includes("wakil")
    ) ||
    members.find(
      (m) =>
        m.name.toLowerCase().includes("radisty") ||
        m.name.toLowerCase().includes("dhisa")
    );

  const wakilKetua =
    members.find((m) => m.role.toLowerCase().includes("wakil")) ||
    members.find((m) => m.name.toLowerCase().includes("elang"));

  const bendahara1 =
    members.find((m) => m.role.toLowerCase().includes("bendahara 1")) ||
    members.find((m) => m.name.toLowerCase().includes("berlian"));

  const bendahara2 =
    members.find((m) => m.role.toLowerCase().includes("bendahara 2")) ||
    members.find(
      (m) =>
        m.name.toLowerCase().includes("wiryateja") ||
        m.name.toLowerCase().includes("teja")
    );

  const sekretaris1 =
    members.find((m) => m.role.toLowerCase().includes("sekretaris 1")) ||
    members.find((m) => m.name.toLowerCase().includes("zahira"));

  const sekretaris2 =
    members.find((m) => m.role.toLowerCase().includes("sekretaris 2")) ||
    members.find((m) => m.name.toLowerCase().includes("fatih"));

  // Ordered layout:
  // Row 1 (atas): [Col 1: Ketua (Pojok Kiri Atas)] [Col 2: Bendahara 1] [Col 3: Wakil Ketua (Pojok Kanan Atas)]
  // Row 2 (bawah): [Col 1: Sekretaris 1 (Pojok Kiri Bawah)] [Col 2: Bendahara 2] [Col 3: Sekretaris 2]
  const orderedLeaders = [
    {
      member: ketua,
      desktopClass: "lg:col-start-1 lg:row-start-1",
      style: {
        rotate: "rotate-[-4deg] hover:rotate-0",
        offset: "sm:-translate-y-3 sm:translate-x-1",
        badgeColor: "from-[#F59E0B] to-[#EA580C]",
        glowHalo: "bg-[#F59E0B]/40",
      },
    },
    {
      member: bendahara1,
      desktopClass: "lg:col-start-2 lg:row-start-1",
      style: {
        rotate: "rotate-[5deg] hover:rotate-0",
        offset: "sm:translate-y-3 sm:translate-x-1",
        badgeColor: "from-[#F59E0B] to-[#D97706]",
        glowHalo: "bg-[#F59E0B]/30",
      },
    },
    {
      member: wakilKetua,
      desktopClass: "lg:col-start-3 lg:row-start-1",
      style: {
        rotate: "rotate-[6deg] hover:rotate-0",
        offset: "sm:-translate-y-4 sm:translate-x-2",
        badgeColor: "from-[#EA580C] to-[#F59E0B]",
        glowHalo: "bg-[#EA580C]/30",
      },
    },
    {
      member: sekretaris1,
      desktopClass: "lg:col-start-1 lg:row-start-2",
      style: {
        rotate: "rotate-[7deg] hover:rotate-0",
        offset: "sm:translate-y-3 sm:-translate-x-1",
        badgeColor: "from-[#EA580C] to-[#D97706]",
        glowHalo: "bg-[#EA580C]/30",
      },
    },
    {
      member: bendahara2,
      desktopClass: "lg:col-start-2 lg:row-start-2",
      style: {
        rotate: "rotate-[-5deg] hover:rotate-0",
        offset: "sm:-translate-y-2 sm:translate-x-1",
        badgeColor: "from-[#F59E0B] to-[#B45309]",
        glowHalo: "bg-[#F59E0B]/30",
      },
    },
    {
      member: sekretaris2,
      desktopClass: "lg:col-start-3 lg:row-start-2",
      style: {
        rotate: "rotate-[6deg] hover:rotate-0",
        offset: "sm:translate-y-4 sm:translate-x-2",
        badgeColor: "from-[#EA580C] to-[#F59E0B]",
        glowHalo: "bg-[#EA580C]/30",
      },
    },
  ].filter(
    (
      item
    ): item is {
      member: Member;
      desktopClass: string;
      style: {
        rotate: string;
        offset: string;
        badgeColor: string;
        glowHalo: string;
      };
    } => Boolean(item.member)
  );

  // Fallback to first 6 if filtering didn't resolve all 6
  const finalLeaders =
    orderedLeaders.length === 6
      ? orderedLeaders
      : members.slice(0, 6).map((m, idx) => ({
          member: m,
          desktopClass: "",
          style: {
            rotate: idx % 2 === 0 ? "rotate-[-5deg]" : "rotate-[5deg]",
            offset: "",
            badgeColor: "from-[#F59E0B] to-[#EA580C]",
            glowHalo: "bg-[#F59E0B]/30",
          },
        }));


  return (
    <section className="relative py-28 overflow-hidden bg-transparent">
      {/* Huge Bold Background Typography from reference image */}
      <div className="absolute inset-0 pointer-events-none select-none flex flex-col items-center justify-center overflow-hidden opacity-90 z-0">
        <span className="font-heading font-black text-6xl sm:text-8xl md:text-9xl tracking-tighter text-[#F59E0B] drop-shadow-[0_8px_0_rgba(0,0,0,0.8)] leading-none -rotate-2">
          #CREW
        </span>
        <span className="font-heading font-black text-7xl sm:text-9xl md:text-[11rem] tracking-tighter text-white drop-shadow-[0_12px_0_rgba(0,0,0,0.9)] leading-none mt-[-1rem] sm:mt-[-2rem]">
          LEADERS
        </span>
        <span className="font-heading font-black text-5xl sm:text-8xl md:text-9xl tracking-tighter text-[#EA580C] drop-shadow-[0_8px_0_rgba(0,0,0,0.8)] leading-none mt-[-1rem]">
          PEOPLE
        </span>
      </div>

      {/* Decorative Hand-Drawn Doodle Arrows */}
      <div className="absolute top-16 left-8 sm:left-24 pointer-events-none z-10 hidden sm:block">
        <svg width="80" height="80" viewBox="0 0 100 100" fill="none" className="text-[#F59E0B] stroke-current stroke-[4] stroke-linecap-round">
          <path d="M20,20 Q60,10 70,50 Q80,90 40,80" />
          <polyline points="45,95 35,80 50,70" />
        </svg>
      </div>

      <div className="absolute bottom-16 right-8 sm:right-24 pointer-events-none z-10 hidden sm:block">
        <svg width="90" height="90" viewBox="0 0 100 100" fill="none" className="text-[#EA580C] stroke-current stroke-[4] stroke-linecap-round">
          <path d="M80,20 Q20,30 30,70" />
          <polyline points="20,60 30,75 45,65" />
        </svg>
      </div>

      {/* Huge Background Typographic Layer (Gargantua Accretion Glow) */}
      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center select-none overflow-hidden z-0 opacity-15">
        <span className="font-heading font-black text-6xl sm:text-8xl md:text-9xl tracking-tighter text-[#F59E0B] drop-shadow-[0_8px_0_rgba(0,0,0,0.8)] leading-none -rotate-2">
          #CREW
        </span>
        <span className="font-heading font-black text-5xl sm:text-8xl md:text-9xl tracking-tighter text-[#EA580C] drop-shadow-[0_8px_0_rgba(0,0,0,0.8)] leading-none mt-[-1rem]">
          WARRIORS
        </span>
      </div>

      {/* Decorative Stamp Seal */}
      <div className="absolute top-12 right-6 sm:right-16 z-20 pointer-events-none hidden lg:block opacity-75">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#F59E0B] to-[#EA580C] text-[#02040A] shadow-2xl flex items-center justify-center animate-[spin_12s_linear_infinite]">
          <svg viewBox="0 0 100 100" className="w-full h-full p-2">
            <path
              id="circlePath"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              fill="none"
            />
            <text className="text-[10px] font-mono font-black uppercase tracking-widest fill-current">
              <textPath href="#circlePath" startOffset="0%">
                ★ NAHKODA • INTERNEXT • MOKLET •
              </textPath>
            </text>
          </svg>
          <div className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-[#02040A] text-[#F59E0B] flex items-center justify-center font-bold text-xs">
            2026
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with opaque backdrop shielding */}
        <div className="relative z-20 text-center max-w-3xl mx-auto mb-16 sm:mb-24 bg-[#02040A]/95 shadow-[0_0_50px_40px_#02040A] rounded-3xl p-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-[#F59E0B] backdrop-blur-md mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Core Leadership Team</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Nahkoda & Penggerak <span className="text-[#F59E0B]">Internext</span>
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            Struktur kepemimpinan kelas yang bertanggung jawab mengawal visi, memelihara kultur belajar, dan mengorkestrasi proyek digital angkatan.
          </p>
        </div>

        {/* Cards Grid with Non-Parallel Playful Angles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 pt-4 pb-12">
          {finalLeaders.map((item) => {
            const { member, style, desktopClass } = item;

            return (
              <div
                key={member.id}
                className={`relative transition-all duration-500 transform ${style.rotate} ${style.offset} ${desktopClass}`}
              >
                {/* Glow Halo behind card */}
                <div
                  className={`absolute -inset-2 rounded-[36px] blur-xl opacity-30 group-hover:opacity-60 transition-opacity ${style.glowHalo} pointer-events-none`}
                />

                {/* Main Card */}
                <div className="relative z-20 rounded-[32px] p-6 backdrop-blur-xl bg-[#0F172A]/85 hover:bg-[#1E293B]/90 border border-white/10 hover:border-[#F59E0B]/40 shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-300 flex flex-col items-center text-center group">
                  {/* Avatar with gradient border */}
                  <div className="relative mb-5">
                    <div
                      className={`w-28 h-28 sm:w-32 sm:h-32 rounded-2xl p-1 bg-gradient-to-tr ${style.badgeColor} shadow-xl group-hover:scale-105 transition-transform duration-300`}
                    >
                      <div className="relative w-full h-full rounded-[14px] overflow-hidden bg-[#02040A]">
                        <Image
                          src={member.avatar}
                          alt={member.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    </div>
                  </div>

                  {/* Name and Role */}
                  <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-tight mb-1 group-hover:text-[#F59E0B] transition-colors">
                    {member.name}
                  </h3>

                  {/* Role Pill */}
                  <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-white/10 text-[#F59E0B] border border-white/10 mb-2">
                    {member.role}
                  </span>

                  {/* Quote */}
                  <p className="text-xs text-[#CBD5E1] italic line-clamp-2 px-2 leading-relaxed">
                    &quot;{member.quote}&quot;
                  </p>

                  <Link
                    href={`/members/${member.id}`}
                    className="mt-4 inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-[#F59E0B] hover:text-white transition-colors"
                  >
                    <span>Profil Lengkap</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Link to Full 25 Members */}
        <div className="text-center pt-8">
          <Link
            href="/members"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 hover:border-[#F59E0B]/50 bg-white/[0.04] text-xs font-mono text-white hover:bg-white/[0.08] transition-all hover:scale-105"
          >
            <span>Lihat Direktori Seluruh 25 Siswa</span>
            <ArrowRight className="w-4 h-4 text-[#F59E0B]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
