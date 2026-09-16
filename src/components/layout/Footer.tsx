import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Terminal, Heart, ExternalLink } from "lucide-react";

export function Footer() {
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
            </div>
            <p className="text-sm text-[#94A3B8] max-w-md leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs font-mono text-[#64748B]">
              <span>📍 {siteConfig.classInfo.school}</span>
              <span>•</span>
              <span>🎓 {siteConfig.classInfo.generation}</span>
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
            <ul className="space-y-2 text-sm text-[#94A3B8]">
              <li>
                <Link href="/about" className="hover:text-[#F59E0B] transition-colors">
                  Visi & Misi Kelas
                </Link>
              </li>
              <li>
                <Link href="/members" className="hover:text-[#F59E0B] transition-colors">
                  Direktori {siteConfig.classInfo.memberCount} Anggota
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#F59E0B] transition-colors">
                  Dokumentasi & Galeri
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#F59E0B] transition-colors">
                  Buku Tamu & Pesan
                </Link>
              </li>
              <li>
                <a
                  href={siteConfig.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#F59E0B] hover:underline"
                >
                  Instagram Resmi
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <p>© {new Date().getFullYear()} Internext. All rights reserved.</p>
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
