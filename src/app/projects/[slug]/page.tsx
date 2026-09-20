import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getProjectBySlug, getProjects, getMembers } from "@/lib/api/services";
import { pageMetadata, absoluteUrl, createBreadcrumbJsonLd } from "@/lib/seo";
import type { Metadata } from "next";
import {
  ArrowLeft,
  Sparkles,
  ExternalLink,
  Code2,
  Calendar,
  Heart,
  Users,
  Layers,
  ChevronRight,
  Share2,
  FolderGit2,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { ProjectCard } from "@/components/features/ProjectCard";

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Karya Tidak Ditemukan | Internext XI",
      robots: { index: false, follow: false },
    };
  }

  const title = `${project.title} — Karya Siswa Internext`;
  const description =
    project.tagline ||
    project.description.slice(0, 160) ||
    `Showcase karya ${project.title} buatan siswa kelas XI Internasional SMK Telkom Malang.`;

  return pageMetadata(title, description, `/projects/${project.slug}`, {
    image: project.thumbnail || undefined,
    keywords: [
      project.title,
      project.category,
      ...project.techStack,
      ...project.team,
      "Karya Siswa",
      "Internext",
      "SMK Telkom Malang",
    ],
    type: "website",
  });
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const [allProjects, allMembers] = await Promise.all([
    getProjects().catch(() => []),
    getMembers().catch(() => []),
  ]);

  // Find related projects (excluding current project)
  const relatedProjects = allProjects
    .filter((p) => p.id !== project.id && p.slug !== project.slug)
    .slice(0, 3);

  // Match project team contributors with member profiles
  const teamMembers = project.team.map((teamName) => {
    const matched = allMembers.find(
      (m) =>
        m.name.toLowerCase() === teamName.toLowerCase() ||
        m.nickname.toLowerCase() === teamName.toLowerCase() ||
        teamName.toLowerCase().includes(m.nickname.toLowerCase())
    );
    return {
      name: teamName,
      member: matched || null,
    };
  });

  // Schema.org Structured Data
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    headline: project.tagline || project.title,
    description: project.description,
    applicationCategory: project.category,
    image: project.thumbnail
      ? [project.thumbnail.startsWith("http") ? project.thumbnail : absoluteUrl(project.thumbnail)]
      : [absoluteUrl("/opengraph-image")],
    url: absoluteUrl(`/projects/${project.slug}`),
    dateCreated: `${project.year}-01-01`,
    author: project.team.map((member) => ({
      "@type": "Person",
      name: member,
    })),
    publisher: {
      "@type": "Organization",
      name: "Internext — XI Internasional SMK Telkom Malang",
      url: absoluteUrl("/"),
    },
  };

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Beranda", path: "/" },
    { name: "Karya Siswa", path: "/projects" },
    { name: project.title, path: `/projects/${project.slug}` },
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-[#02040A]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Navbar />

      <main className="flex-1 pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Navigation & Breadcrumbs */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs font-mono text-[#94A3B8] hover:text-white transition-colors bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 px-3 py-1.5 rounded-xl"
            >
              <ArrowLeft className="w-4 h-4 text-[#F59E0B]" />
              <span>Kembali ke Katalog Karya</span>
            </Link>

            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-xs font-mono text-[#64748B]"
            >
              <Link href="/" className="hover:text-[#CBD5E1] transition-colors">
                Beranda
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#475569]" />
              <Link
                href="/projects"
                className="hover:text-[#CBD5E1] transition-colors"
              >
                Karya
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#475569]" />
              <span className="text-[#F59E0B] truncate max-w-[150px] sm:max-w-[220px]">
                {project.title}
              </span>
            </nav>
          </div>

          {/* Project Hero Header */}
          <div className="mb-10">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30">
                {project.category}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-white/[0.05] text-[#94A3B8] border border-white/10">
                <Calendar className="w-3 h-3 text-[#EA580C]" />
                <span>{project.year}</span>
              </span>
              {project.featured && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-gradient-to-r from-[#EA580C]/20 to-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/40">
                  <Sparkles className="w-3 h-3 text-[#EA580C]" />
                  <span>Featured Project</span>
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-black/40 text-white border border-white/10 ml-auto">
                <Heart className="w-3.5 h-3.5 text-[#EF4444] fill-[#EF4444]" />
                <span>{project.likes} likes</span>
              </span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3 leading-tight">
              {project.title}
            </h1>

            {project.tagline && (
              <p className="text-base sm:text-lg text-[#CBD5E1] font-medium leading-relaxed max-w-3xl mb-6">
                {project.tagline}
              </p>
            )}

            {/* Action Buttons: Demo & Source Code */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gradient px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-lg shadow-[#EA580C]/20 hover:scale-[1.02] transition-transform"
                >
                  <span>Buka Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 flex items-center gap-2 transition-all"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Lihat Source Code</span>
                </a>
              )}
            </div>
          </div>

          {/* Project Main Hero Showcase Media */}
          <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-12 bg-[#0F172A]">
            {project.thumbnail ? (
              <div className="relative w-full aspect-video sm:aspect-[21/9] max-h-[500px]">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  priority
                  unoptimized={true}
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#02040A] via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>
            ) : (
              <div className="w-full h-64 sm:h-80 flex flex-col items-center justify-center bg-gradient-to-br from-[#0F172A] via-[#02040A] to-[#02040A] text-[#64748B]">
                <Code2 className="w-16 h-16 text-[#F59E0B]/30 mb-3" />
                <span className="text-sm font-mono text-[#94A3B8]">
                  Showcase Portofolio Digital
                </span>
              </div>
            )}
          </div>

          {/* Project Content Sections: Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Left 2 Cols: Description & Screenshots */}
            <div className="lg:col-span-2 space-y-8">
              {/* Deskripsi Karya */}
              <div className="glass-card p-6 sm:p-8 rounded-2xl border-white/[0.08]">
                <div className="flex items-center gap-2 mb-4 text-[#F59E0B]">
                  <FolderGit2 className="w-4 h-4 text-[#EA580C]" />
                  <h2 className="font-heading text-lg sm:text-xl font-bold text-white">
                    Tentang Karya & Solusi
                  </h2>
                </div>
                <div className="text-sm sm:text-base text-[#94A3B8] leading-relaxed whitespace-pre-line space-y-4">
                  {project.description}
                </div>
              </div>

              {/* Screenshots Gallery if available */}
              {project.screenshots && project.screenshots.length > 0 && (
                <div className="glass-card p-6 sm:p-8 rounded-2xl border-white/[0.08]">
                  <h3 className="font-heading text-base sm:text-lg font-bold text-white mb-4">
                    Cuplikan Tampilan (Screenshots)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.screenshots.map((shot, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-[#02040A]"
                      >
                        <Image
                          src={shot}
                          alt={`${project.title} screenshot ${idx + 1}`}
                          fill
                          unoptimized={true}
                          sizes="(max-width: 640px) 100vw, 50vw"
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right 1 Col: Tech Stack & Contributors */}
            <div className="space-y-6">
              {/* Tech Stack */}
              <div className="glass-card p-5 sm:p-6 rounded-2xl border-white/[0.08]">
                <div className="flex items-center gap-2 mb-3.5 text-[#F59E0B]">
                  <Layers className="w-4 h-4 text-[#EA580C]" />
                  <h3 className="font-heading text-base font-bold text-white">
                    Teknologi & Tools
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-3 py-1.5 rounded-xl bg-white/[0.04] text-[#CBD5E1] border border-white/[0.08] hover:border-[#F59E0B]/30 hover:text-white transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contributor Team */}
              <div className="glass-card p-5 sm:p-6 rounded-2xl border-white/[0.08]">
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-2 text-[#F59E0B]">
                    <Users className="w-4 h-4 text-[#EA580C]" />
                    <h3 className="font-heading text-base font-bold text-white">
                      Tim Pengembang
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-[#64748B]">
                    {project.team.length} Siswa
                  </span>
                </div>

                <div className="space-y-2.5">
                  {teamMembers.map(({ name, member }) => {
                    if (member) {
                      return (
                        <Link
                          key={name}
                          href={`/members/${member.id}`}
                          className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] hover:border-[#F59E0B]/30 transition-all group"
                        >
                          <div className="w-9 h-9 rounded-full overflow-hidden relative border border-white/10 shrink-0">
                            {member.avatar ? (
                              <Image
                                src={member.avatar}
                                alt={member.name}
                                fill
                                unoptimized={true}
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-[#1E293B] flex items-center justify-center text-xs font-mono text-white">
                                {member.nickname?.slice(0, 2) || member.name.slice(0, 2)}
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-semibold text-white group-hover:text-[#F59E0B] transition-colors truncate">
                              {member.name}
                            </h4>
                            <p className="text-[10px] font-mono text-[#64748B] truncate">
                              {member.role}
                            </p>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-[#64748B] group-hover:text-[#F59E0B] transition-colors" />
                        </Link>
                      );
                    }

                    return (
                      <div
                        key={name}
                        className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06]"
                      >
                        <div className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-xs font-mono text-[#94A3B8] shrink-0">
                          {name.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-white truncate">
                            {name}
                          </h4>
                          <p className="text-[10px] font-mono text-[#64748B]">
                            Kontributor Karya
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Related Projects Section */}
          {relatedProjects.length > 0 && (
            <div className="border-t border-white/[0.08] pt-12">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Karya Siswa <span className="text-gradient">Lainnya</span>
                  </h3>
                  <p className="text-xs text-[#94A3B8] mt-1">
                    Jelajahi inovasi dan portofolio rekan sekelas lainnya
                  </p>
                </div>
                <Link
                  href="/projects"
                  className="text-xs font-mono text-[#F59E0B] hover:underline flex items-center gap-1"
                >
                  <span>Lihat Semua</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProjects.map((p) => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
