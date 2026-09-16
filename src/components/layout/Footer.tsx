import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Terminal, Heart, ExternalLink, Sparkles } from "lucide-react";
import { InstagramIcon } from "@/components/ui/Icons";
import { getClassProfile } from "@/lib/api/services";
import { ClassProfile } from "@/lib/types";

export async function Footer({ profile: customProfile }: { profile?: ClassProfile }) {
  let profile = customProfile;
  if (!profile) {
    try {
      profile = await getClassProfile();
    } catch {
      // Fallback
    }
  }

  const school = profile?.school || siteConfig.classInfo.school;
  const name = profile?.name || siteConfig.classInfo.name;
  const generation = profile?.generation || siteConfig.classInfo.generation;
  const memberCount = profile?.memberCount || siteConfig.classInfo.memberCount;
  const description = profile?.description || siteConfig.description;
  const instagram = profile?.instagram || siteConfig.socials.instagram;

  return (
    <footer className="border-t border-white/[0.08] bg-[#02040A] relative overflow-hidden">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#F59E0B]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#EA580C] p-0.5 shadow-md shadow-[#F59E0B]/20">
                <div className="w-full h-full bg-[#02040A] rounded-[10px] flex items-center justify-center">
                  <Terminal className="w-4 h-4 text-[#F59E0B]" />
                </div>
              </div>
              <span className="font-heading font-extrabold text-xl tracking-tight text-white">
                INTERNEXT
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B] font-mono">
                {name}
              </span>
            </div>
            <p className="text-sm text-[#94A3B8] max-w-md leading-relaxed">
              {description}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono text-[#64748B]">
              <span>📍 {school}</span>
              <span>•</span>
              <span>🎓 {generation}</span>
              <span>•</span>
              <span>👥 {memberCount} Siswa</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-[#F8FAFC]">
              Menu Navigasi
            </h4>
            <ul className="space-y-2 text-sm text-[#94A3B8]">
              {siteConfig.navLinks.slice(0, 5).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-[#F59E0B] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community & Legal */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-[#F8FAFC]">
              Keluarga Besar
            </h4>
            <ul className="space-y-2.5 text-sm text-[#94A3B8]">
              <li>
                <Link href="/about" className="hover:text-[#F59E0B] transition-colors">
                  Visi & Misi Kelas
                </Link>
              </li>
              <li>
                <Link href="/members" className="hover:text-[#F59E0B] transition-colors">
                  Direktori {memberCount} Anggota
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[#F59E0B] transition-colors">
                  Agenda Kegiatan Kelas
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#F59E0B] transition-colors">
                  Buku Tamu & Live Chat
                </Link>
              </li>
              <li>
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#F59E0B] hover:text-[#EA580C] transition-colors font-medium"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-[#EA580C]" />
                  <span>Instagram Resmi</span>
                  <ExternalLink className="w-3 h-3 text-[#64748B]" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <p>© {new Date().getFullYear()} {school} • {name}. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Dibuat dengan dedikasi oleh tim siswa</span>
            <Heart className="w-3.5 h-3.5 text-[#EF4444] fill-[#EF4444] inline" />
            <span>Internext</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
