"use client";

import Image from "next/image";
import Link from "next/link";
import { Member } from "@/lib/types";
import { ArrowRight, Sparkles, ExternalLink } from "lucide-react";

interface LeadershipShowcaseProps {
  members: Member[];
}

export function LeadershipShowcase({ members }: LeadershipShowcaseProps) {
  // Take 6 core management leaders
  const leaders = members.slice(0, 6);

  // Non-parallel playful tilt angles and staggered offsets inspired by the reference image
  const cardStyles = [
    {
      rotate: "rotate-[-6deg] hover:rotate-0",
      offset: "sm:-translate-y-4 sm:-translate-x-1",
      badgeColor: "from-[#CCFF00] to-[#06B6D4]",
      glowHalo: "bg-[#CCFF00]/30",
      handle: "fakhri.eth",
      points: "98 420 points",
    },
    {
      rotate: "rotate-[7deg] hover:rotate-0",
      offset: "sm:translate-y-5 sm:translate-x-2",
      badgeColor: "from-[#06B6D4] to-[#4F46E5]",
      glowHalo: "bg-[#06B6D4]/30",
      handle: "alya.design",
      points: "84 150 points",
    },
    {
      rotate: "rotate-[-4deg] hover:rotate-0",
      offset: "sm:-translate-y-2 sm:-translate-x-2",
      badgeColor: "from-[#F59E0B] to-[#EF4444]",
      glowHalo: "bg-[#F59E0B]/30",
      handle: "rafi.dev",
      points: "76 300 points",
    },
    {
      rotate: "rotate-[8deg] hover:rotate-0",
      offset: "sm:translate-y-4 sm:translate-x-1",
      badgeColor: "from-[#10B981] to-[#06B6D4]",
      glowHalo: "bg-[#10B981]/30",
      handle: "zahra.finance",
      points: "92 880 points",
    },
    {
      rotate: "rotate-[-5deg] hover:rotate-0",
      offset: "sm:-translate-y-3 sm:-translate-x-2",
      badgeColor: "from-[#6366F1] to-[#8B5CF6]",
      glowHalo: "bg-[#6366F1]/30",
      handle: "bima.build",
      points: "88 910 points",
    },
    {
      rotate: "rotate-[6deg] hover:rotate-0",
      offset: "sm:translate-y-4 sm:translate-x-2",
      badgeColor: "from-[#EC4899] to-[#F43F5E]",
      glowHalo: "bg-[#EC4899]/30",
      handle: "nabila.sys",
      points: "81 240 points",
    },
  ];

  return (
    <section className="relative py-28 overflow-hidden bg-transparent">
      {/* Huge Bold Background Typography from reference image */}
      <div className="absolute inset-0 pointer-events-none select-none flex flex-col items-center justify-center overflow-hidden opacity-90 z-0">
        <span className="font-heading font-black text-6xl sm:text-8xl md:text-9xl tracking-tighter text-[#CCFF00] drop-shadow-[0_8px_0_rgba(0,0,0,0.8)] leading-none -rotate-2">
          #CREW
        </span>
        <span className="font-heading font-black text-7xl sm:text-9xl md:text-[11rem] tracking-tighter text-white drop-shadow-[0_12px_0_rgba(0,0,0,0.9)] leading-none mt-[-1rem] sm:mt-[-2rem]">
          LEADERS
        </span>
        <span className="font-heading font-black text-5xl sm:text-8xl md:text-9xl tracking-tighter text-[#4F46E5] drop-shadow-[0_8px_0_rgba(0,0,0,0.8)] leading-none mt-[-1rem]">
          PEOPLE
        </span>
      </div>

      {/* Decorative Hand-Drawn Doodle Arrows */}
      <div className="absolute top-16 left-8 sm:left-24 pointer-events-none z-10 hidden sm:block">
        <svg width="80" height="80" viewBox="0 0 100 100" fill="none" className="text-[#CCFF00] stroke-current stroke-[4] stroke-linecap-round">
          <path d="M20,20 Q60,10 70,50 Q80,90 40,80" />
          <polyline points="45,95 35,80 50,70" />
        </svg>
      </div>

      <div className="absolute bottom-16 right-8 sm:right-24 pointer-events-none z-10 hidden sm:block">
        <svg width="90" height="90" viewBox="0 0 100 100" fill="none" className="text-[#CCFF00] stroke-current stroke-[4] stroke-linecap-round">
          <path d="M80,20 Q20,30 30,70" />
          <polyline points="20,60 30,75 45,65" />
        </svg>
      </div>

      {/* Rotating Badge Sticker (from reference bottom-right) */}
      <div className="absolute bottom-6 right-6 sm:bottom-12 sm:right-16 z-20 pointer-events-none">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#CCFF00] text-black shadow-2xl flex items-center justify-center animate-[spin_12s_linear_infinite]">
          <svg viewBox="0 0 100 100" className="w-full h-full p-1.5 font-mono text-[9px] font-black uppercase tracking-widest fill-black">
            <path
              id="circlePath"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              fill="none"
            />
            <text>
              <textPath href="#circlePath" startOffset="0%">
                ★ INTERNEXT LEADERS ★ CLASS OF 2026 ★
              </textPath>
            </text>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold">↗</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title with opaque text shielding (so background motion path never bleeds through text) */}
        <div className="relative z-20 text-center max-w-3xl mx-auto mb-16 sm:mb-24 bg-[#0A0F1E]/95 shadow-[0_0_50px_40px_#0A0F1E] rounded-3xl p-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-[#CCFF00] backdrop-blur-md mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pilar Kepemimpinan Kelas</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
            Nahkoda & Penggerak <span className="text-[#CCFF00]">Internext</span>
          </h2>
          <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto mt-3">
            Struktur kepengurusan yang solid, dinamis, dan berdedikasi mengawal inovasi kelas dari masa ke masa.
          </p>
        </div>

        {/* Tilted Non-Parallel Frosted Glass Cards Container (6 Leaders in 3-column symmetrical grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6 lg:gap-8 pt-4 pb-8 items-center justify-center max-w-6xl mx-auto">
          {leaders.map((member, index) => {
            const style = cardStyles[index % cardStyles.length];

            return (
              <div
                key={member.id}
                className={`transition-all duration-500 ease-out transform ${style.rotate} ${style.offset} hover:z-30 hover:scale-105`}
              >
                {/* Frosted Glassmorphism Card (translucent so motion path backlight shines softly through) */}
                <div className="relative z-20 rounded-[32px] p-6 backdrop-blur-xl bg-[#0F172A]/65 hover:bg-[#1E293B]/80 border border-white/20 hover:border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-300 flex flex-col items-center text-center group">
                  {/* Subtle glass reflection highlight */}
                  <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                  {/* Avatar with Glowing Halo */}
                  <div className="relative mb-5 mt-1">
                    <div className={`absolute -inset-2.5 rounded-full blur-xl ${style.glowHalo} group-hover:scale-125 transition-transform duration-500`} />
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-white/60 shadow-xl">
                      <Image
                        src={member.avatar}
                        alt={member.name}
                        fill
                        sizes="112px"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Web3 / Tech Handle */}
                  <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-tight mb-1 group-hover:text-[#CCFF00] transition-colors">
                    {style.handle}
                  </h3>

                  {/* Member Real Name & Role */}
                  <span className="text-xs font-semibold text-white/90 block mb-1">
                    {member.name}
                  </span>

                  <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-white/10 text-[#06B6D4] border border-white/10 mb-2">
                    {member.role}
                  </span>

                  {/* Points Badge (reference style) */}
                  <span className="text-[11px] font-mono text-white/60 tracking-wider">
                    {style.points}
                  </span>

                  {/* Short Quote / Bio tooltip on hover */}
                  <p className="text-[11px] text-white/70 italic mt-3 line-clamp-2 px-1">
                    &quot;{member.quote}&quot;
                  </p>

                  {/* Action Link */}
                  <Link
                    href={`/members#${member.id}`}
                    className="mt-4 inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-[#CCFF00] hover:text-white transition-colors"
                  >
                    <span>Lihat Portofolio</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Members CTA */}
        <div className="text-center mt-12">
          <Link
            href="/members"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono font-semibold text-white backdrop-blur-md transition-all duration-200 hover:scale-105"
          >
            <span>Buka Direktori Lengkap 36 Anggota Kelas</span>
            <ArrowRight className="w-4 h-4 text-[#CCFF00]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
