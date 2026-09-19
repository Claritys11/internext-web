import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getMemberById, getMembers, getProjects, getClassProfile } from "@/lib/api/services";
import {
  ArrowLeft,
  Sparkles,
  ExternalLink,
  Code2,
  Briefcase,
  GraduationCap,
  Quote,
  MessageSquare,
  Share2,
  FolderGit2,
  Layers,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/ui/Icons";
import { pageMetadata, absoluteUrl, createBreadcrumbJsonLd } from "@/lib/seo";
import type { Metadata } from "next";

interface MemberProfilePageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: MemberProfilePageProps): Promise<Metadata> {
  const { id } = await params;
  const member = await getMemberById(id);
  if (!member) return { robots: { index: false, follow: false } };
  const title = `${member.name} (${member.nickname}) — ${member.role}`;
  const description =
    member.bio ||
    `${member.name} adalah talenta digital kelas XI Internasional SMK Telkom Malang dengan fokus keahlian di bidang ${member.skills.join(", ")}.`;
  return pageMetadata(title, description, `/members/${member.id}`, {
    image: member.avatar,
    keywords: [member.name, member.nickname, member.role, ...member.skills, "Internext", "SMK Telkom Malang"],
    type: "profile",
  });
}

export async function generateStaticParams() {
  const members = await getMembers();
  return members.map((member) => ({
    id: member.id,
  }));
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function MemberProfilePage({ params }: MemberProfilePageProps) {
  const { id } = await params;

  const [member, allMembers, allProjects, profile] = await Promise.all([
    getMemberById(id),
    getMembers(),
    getProjects(),
    getClassProfile(),
  ]);

  if (!member) {
    notFound();
  }

  // Find all projects where this student was involved
  // Match by member name, nickname, or id in project.team
  const linkedProjects = allProjects.filter((p) => {
    if (!p.team || !Array.isArray(p.team)) return false;
    return p.team.some(
      (t) =>
        t.toLowerCase().includes(member.name.toLowerCase()) ||
        t.toLowerCase().includes(member.nickname.toLowerCase()) ||
        t.toLowerCase() === member.id.toLowerCase()
    );
  });

  // Find next and previous student for sleek portfolio switching
  const currentIndex = allMembers.findIndex((m) => m.id === member.id);
  const prevMember =
    currentIndex > 0 ? allMembers[currentIndex - 1] : allMembers[allMembers.length - 1];
  const nextMember =
    currentIndex < allMembers.length - 1 ? allMembers[currentIndex + 1] : allMembers[0];

  const profileJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: member.name,
      alternateName: member.nickname,
      description: member.bio,
      image: member.avatar.startsWith("http") ? member.avatar : absoluteUrl(member.avatar),
      jobTitle: member.role,
      worksFor: {
        "@type": "EducationalOrganization",
        name: profile?.school || "SMK Telkom Malang",
      },
      memberOf: {
        "@type": "Organization",
        name: "Internext",
      },
      knowsAbout: member.skills,
      sameAs: [member.githubUrl, member.linkedinUrl, member.instagramUrl, member.portfolioUrl].filter(Boolean),
    },
  };

  const breadcrumbsJsonLd = createBreadcrumbJsonLd([
    { name: "Beranda", path: "/" },
    { name: "Anggota", path: "/members" },
    { name: member.name, path: `/members/${member.id}` },
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-[#02040A] text-[#F8FAFC]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <Navbar />

      <main className="flex-1 pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8]">
            <Link
              href="/members"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[#F59E0B] hover:text-[#EA580C] transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Kembali ke Direktori 25 Siswa</span>
            </Link>

            <div className="hidden sm:flex items-center gap-2">
              <span>SMK TELKOM MALANG</span>
              <span>•</span>
              <span className="text-[#F59E0B]">XI INTERNASIONAL</span>
            </div>
          </div>

          {/* 1. LinkedIn-Style Profile Header Card */}
          <div className="glass-card rounded-3xl border border-white/[0.1] overflow-hidden shadow-2xl relative">
            {/* Ambient Top Cover Banner */}
            <div className="h-40 sm:h-52 w-full bg-gradient-to-r from-[#0F172A] via-[#1E1B4B] to-[#0F172A] relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-30" />
              <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#F59E0B]/20 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#EA580C]/20 blur-3xl pointer-events-none" />

              <div className="absolute top-4 right-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-black/50 backdrop-blur-md border border-white/10 text-white/80">
                  Angkatan 2026
                </span>
              </div>
            </div>

            {/* Profile Info Container */}
            <div className="px-6 sm:px-10 pb-8 pt-0 relative">
              {/* Avatar Positioned Overlapping Cover */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 -mt-16 sm:-mt-20 mb-6">
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden border-4 border-[#02040A] shadow-2xl bg-[#0F172A] flex items-center justify-center">
                  {member.avatar ? (
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      fill
                      priority
                      sizes="(max-width: 640px) 112px, 144px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-heading font-black text-3xl sm:text-4xl text-[#F59E0B] bg-gradient-to-br from-white/10 to-white/5">
                      {member.nickname ? member.nickname.slice(0, 2).toUpperCase() : member.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  {member.isManagement && (
                    <div
                      title="Nahkoda / Pengurus Kelas"
                      className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#EA580C] p-0.5 shadow-lg"
                    >
                      <div className="w-full h-full bg-[#02040A] rounded-full flex items-center justify-center text-[#F59E0B]">
                        <Sparkles className="w-3 h-3 text-[#F59E0B]" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Top Action Buttons (Connect, Message, Portfolio) */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <Link
                    href="/contact"
                    className="btn-gradient px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-[#F59E0B]/20 hover:scale-105 transition-transform"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Kirim Pesan / Apresiasi</span>
                  </Link>

                  {member.portfolioUrl && (
                    <a
                      href={member.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-medium text-white flex items-center gap-1.5 transition-colors"
                    >
                      <span>Website Pribadi</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#F59E0B]" />
                    </a>
                  )}
                </div>
              </div>

              {/* Name, Headline & Roles */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-[#F8FAFC] tracking-tight">
                    {member.name}
                  </h1>
                  <span className="text-sm font-mono text-[#EA580C] font-semibold">
                    @{member.nickname.toLowerCase()}
                  </span>
                  <span
                    className={`text-xs font-mono px-3 py-1 rounded-full border ${
                      member.isManagement
                        ? "bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/40 shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                        : "bg-white/[0.06] text-[#CBD5E1] border-white/10"
                    }`}
                  >
                    {member.role}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[#94A3B8] max-w-3xl leading-relaxed">
                  {member.department
                    ? `${member.department} Specialist`
                    : "Software & Digital Creator"}{" "}
                  • Siswa Kelas XI Internasional SMK Telkom Malang
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#64748B] pt-1">
                  <span className="flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-[#F59E0B]" />
                    SMK Telkom Malang
                  </span>
                  <span>•</span>
                  <span>📍 Sawojajar, Kota Malang</span>
                  <span>•</span>
                  <span className="text-[#10B981] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Terverifikasi Siswa
                  </span>
                </div>

                {/* Social Connect Icons Bar */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/[0.08]">
                  {member.linkedinUrl && (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-xs font-medium text-[#94A3B8] hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      <LinkedinIcon className="w-3.5 h-3.5 text-[#0A66C2]" />
                      <span>LinkedIn</span>
                      <ExternalLink className="w-3 h-3 text-[#64748B]" />
                    </a>
                  )}

                  {member.githubUrl && (
                    <a
                      href={member.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-xs font-medium text-[#94A3B8] hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                      <ExternalLink className="w-3 h-3 text-[#64748B]" />
                    </a>
                  )}

                  {member.instagramUrl && (
                    <a
                      href={member.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-xs font-medium text-[#94A3B8] hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      <InstagramIcon className="w-3.5 h-3.5 text-[#E4405F]" />
                      <span>Instagram</span>
                      <ExternalLink className="w-3 h-3 text-[#64748B]" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 2. Grid: About & Quote + Skills */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Col: Biodata & About Me (2 cols) */}
            <div className="md:col-span-2 space-y-6">
              {/* About Me Card */}
              <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/[0.08] space-y-4 shadow-lg">
                <h2 className="text-lg font-bold font-heading text-white flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[#F59E0B]" />
                  <span>Tentang Profil Siswa</span>
                </h2>
                <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed whitespace-pre-line">
                  {member.bio}
                </p>

                {/* Personal Quote Card */}
                <div className="p-4 rounded-2xl bg-[#02040A] border border-[#F59E0B]/20 relative overflow-hidden mt-4">
                  <div className="flex items-start gap-3">
                    <Quote className="w-6 h-6 text-[#F59E0B] shrink-0 opacity-80 mt-0.5" />
                    <div>
                      <p className="text-sm italic text-[#F8FAFC] font-medium leading-relaxed">
                        &quot;{member.quote}&quot;
                      </p>
                      <span className="text-[11px] font-mono text-[#EA580C] block mt-1">
                        — Moto Hidup & Prinsip Kerja
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Linked Projects & Portofolio Karya */}
              <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/[0.08] space-y-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold font-heading text-white flex items-center gap-2">
                    <FolderGit2 className="w-5 h-5 text-[#EA580C]" />
                    <span>Karya & Proyek Terkait ({linkedProjects.length})</span>
                  </h2>
                  <Link
                    href="/projects"
                    className="text-xs font-mono text-[#F59E0B] hover:underline flex items-center gap-1"
                  >
                    <span>Jelajahi Semua Karya</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {linkedProjects.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {linkedProjects.map((project) => (
                      <div
                        key={project.id}
                        className="rounded-2xl border border-white/[0.08] bg-[#02040A] hover:border-[#F59E0B]/40 transition-all p-4 flex flex-col justify-between group overflow-hidden"
                      >
                        <div>
                          {project.thumbnail && (
                            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-3 border border-white/5">
                              <Image
                                src={project.thumbnail}
                                alt={project.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <span className="absolute top-2 right-2 text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/10">
                                {project.category}
                              </span>
                            </div>
                          )}

                          <h3 className="font-heading font-bold text-base text-[#F8FAFC] group-hover:text-[#F59E0B] transition-colors leading-snug mb-1">
                            {project.title}
                          </h3>
                          <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed mb-3">
                            {project.tagline || project.description}
                          </p>
                        </div>

                        <div>
                          {/* Tech stack */}
                          <div className="flex flex-wrap gap-1 mb-3">
                            {project.techStack.slice(0, 3).map((t) => (
                              <span
                                key={t}
                                className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] text-[#CBD5E1] border border-white/5"
                              >
                                {t}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs font-mono">
                            <span className="text-[#64748B]">Tahun {project.year}</span>
                            {project.demoUrl ? (
                              <a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#F59E0B] hover:text-[#EA580C] inline-flex items-center gap-1 font-semibold"
                              >
                                <span>Buka Demo</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ) : (
                              <Link
                                href="/projects"
                                className="text-[#F59E0B] hover:text-[#EA580C] inline-flex items-center gap-1"
                              >
                                <span>Detail</span>
                                <ChevronRight className="w-3 h-3" />
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 rounded-2xl bg-[#02040A] border border-dashed border-white/15 text-center space-y-3">
                    <FolderGit2 className="w-10 h-10 text-[#64748B] mx-auto" />
                    <p className="text-sm text-[#94A3B8]">
                      Belum ada proyek yang dikaitkan langsung ke profil {member.name}.
                    </p>
                    <p className="text-xs text-[#64748B]">
                      Admin dapat mengaitkan peran siswa saat membuat atau mengedit proyek di portal{" "}
                      <Link href="/admin" className="text-[#F59E0B] hover:underline">
                        /admin
                      </Link>
                      .
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Col: Skills & Fast Facts (1 col) */}
            <div className="space-y-6">
              {/* Skills Card */}
              <div className="glass-card p-6 rounded-3xl border border-white/[0.08] space-y-4 shadow-lg">
                <h3 className="text-base font-bold font-heading text-white flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-[#F59E0B]" />
                  <span>Keahlian & Tech Stack</span>
                </h3>

                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-mono px-3 py-1 rounded-xl bg-white/[0.05] hover:bg-[#F59E0B]/10 hover:border-[#F59E0B]/40 hover:text-[#F59E0B] border border-white/10 text-[#CBD5E1] transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Class Community Fast Facts */}
              <div className="glass-card p-6 rounded-3xl border border-white/[0.08] space-y-4 shadow-lg text-xs">
                <h3 className="text-base font-bold font-heading text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#EA580C]" />
                  <span>Informasi Anggota</span>
                </h3>

                <ul className="space-y-3 font-mono text-[#94A3B8]">
                  <li className="flex justify-between py-1.5 border-b border-white/5">
                    <span>Sekolah:</span>
                    <span className="text-white font-semibold">{profile.school}</span>
                  </li>
                  <li className="flex justify-between py-1.5 border-b border-white/5">
                    <span>Kelas:</span>
                    <span className="text-white font-semibold">{profile.name}</span>
                  </li>
                  <li className="flex justify-between py-1.5 border-b border-white/5">
                    <span>Peran:</span>
                    <span className="text-[#F59E0B] font-semibold">{member.role}</span>
                  </li>
                  <li className="flex justify-between py-1.5 border-b border-white/5">
                    <span>Departemen:</span>
                    <span className="text-white font-semibold">
                      {member.department || "Teknologi"}
                    </span>
                  </li>
                  <li className="flex justify-between py-1.5">
                    <span>Status:</span>
                    <span className="text-emerald-400 font-semibold">Aktif Siswa</span>
                  </li>
                </ul>

                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="w-full py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-center block text-xs font-semibold text-[#F59E0B] hover:text-[#EA580C] transition-colors"
                  >
                    Beri Reaksi & Sambutan
                  </Link>
                </div>
              </div>

              {/* Next / Previous Member Switcher */}
              <div className="p-4 rounded-2xl bg-[#02040A] border border-white/10 flex items-center justify-between text-xs font-mono">
                <Link
                  href={`/members/${prevMember.id}`}
                  className="text-[#94A3B8] hover:text-[#F59E0B] flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>@{prevMember.nickname}</span>
                </Link>
                <span className="text-[#64748B]">•</span>
                <Link
                  href={`/members/${nextMember.id}`}
                  className="text-[#94A3B8] hover:text-[#F59E0B] flex items-center gap-1"
                >
                  <span>@{nextMember.nickname}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer profile={profile} />
    </div>
  );
}
