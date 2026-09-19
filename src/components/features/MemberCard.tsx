import Image from "next/image";
import Link from "next/link";
import { Member } from "@/lib/types";
import { Sparkles, ExternalLink, ChevronRight } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/ui/Icons";

export function MemberCard({ member }: { member: Member }) {
  return (
    <div className="glass-card overflow-hidden transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group">
      <div>
        {/* Top Avatar & Role Header */}
        <div className="relative p-5 pb-0 flex items-start justify-between gap-4">
          <Link
            href={`/members/${member.id}`}
            className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-white/[0.1] group-hover:border-[#F59E0B]/50 transition-colors shadow-md block bg-[#0F172A]"
          >
            {member.avatar ? (
              <Image
                src={member.avatar}
                alt={member.name}
                fill
                sizes="(max-width: 640px) 64px, 80px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-heading font-black text-lg sm:text-xl text-[#F59E0B] bg-gradient-to-br from-white/10 to-white/5">
                {member.nickname ? member.nickname.slice(0, 2).toUpperCase() : member.name.slice(0, 2).toUpperCase()}
              </div>
            )}
          </Link>

          <div className="flex flex-col items-end gap-1">
            <span
              className={`text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full border ${
                member.isManagement
                  ? "bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]/40"
                  : "bg-white/[0.05] text-[#94A3B8] border-white/[0.08]"
              }`}
            >
              {member.role}
            </span>
            {member.department && (
              <span className="text-[10px] text-[#64748B] font-mono text-right max-w-[140px] truncate">
                {member.department}
              </span>
            )}
          </div>
        </div>

        {/* Member Details */}
        <div className="p-5">
          <Link href={`/members/${member.id}`}>
            <h3 className="font-heading text-lg font-bold text-white group-hover:text-[#F59E0B] transition-colors leading-tight mb-1">
              {member.name}
            </h3>
          </Link>
          <p className="text-xs text-[#EA580C] font-mono mb-3">
            @{member.nickname.toLowerCase()}
          </p>

          <p className="text-xs text-[#94A3B8] italic leading-relaxed mb-4 line-clamp-2">
            &quot;{member.quote}&quot;
          </p>

          {/* Skills Badges */}
          <div className="flex flex-wrap gap-1.5">
            {member.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="text-[10px] font-mono bg-white/[0.04] text-[#CBD5E1] border border-white/[0.06] px-2 py-0.5 rounded-md"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Socials & View Profile */}
      <div className="px-5 py-3.5 border-t border-white/[0.06] bg-black/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {member.githubUrl && (
            <a
              href={member.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/[0.05] transition-colors"
              aria-label={`GitHub ${member.name}`}
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}
          {member.linkedinUrl && (
            <a
              href={member.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/[0.05] transition-colors"
              aria-label={`LinkedIn ${member.name}`}
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          )}
          {member.instagramUrl && (
            <a
              href={member.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/[0.05] transition-colors"
              aria-label={`Instagram ${member.name}`}
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
          )}
        </div>

        <Link
          href={`/members/${member.id}`}
          className="text-[11px] font-mono text-[#F59E0B] hover:text-[#EA580C] hover:underline flex items-center gap-1 font-semibold"
        >
          <span>Profil & Karya</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
