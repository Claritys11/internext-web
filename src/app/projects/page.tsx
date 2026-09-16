"use client";

import { useState, useMemo, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProjectCard } from "@/components/features/ProjectCard";
import { Masonry, MasonryItem } from "@/components/ui/Masonry";
import { mockProjects } from "@/lib/data/mock";
import { Project } from "@/lib/types";
import { Code2, Search, Sparkles, LayoutGrid } from "lucide-react";

export default function ProjectsPage() {
  const [projectsList, setProjectsList] = useState<Project[]>(mockProjects);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"masonry" | "grid">("masonry");

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjectsList(data);
        }
      })
      .catch(() => {});
  }, []);

  const categories = [
    { label: "Semua Kategori", value: "all" },
    { label: "Web App", value: "Web App" },
    { label: "IoT / Hardware", value: "IoT / Hardware" },
    { label: "Game / AI", value: "Game / AI" },
    { label: "UI/UX", value: "UI/UX" },
  ];

  const filteredProjects = useMemo(() => {
    return projectsList.filter((project) => {
      const matchesCategory =
        selectedCategory === "all" || project.category === selectedCategory;

      const matchesSearch =
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase()) ||
        project.techStack.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
        project.team.some((m) => m.toLowerCase().includes(search.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [projectsList, search, selectedCategory]);

  // Dynamic varied heights for organic staggered masonry layout
  const masonryItems = useMemo<MasonryItem[]>(() => {
    const heights = [380, 480, 420, 520, 360, 460, 400, 500];
    return filteredProjects.map((project, idx) => ({
      id: project.id,
      img: project.thumbnail,
      url: `/projects/${project.slug}`,
      height: heights[idx % heights.length],
      title: project.title,
      subtitle: project.tagline,
      category: project.category,
      badge: project.featured ? "★ Featured" : undefined,
      tags: project.techStack,
    }));
  }, [filteredProjects]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-xs font-mono text-[#F59E0B] mb-4">
              <Code2 className="w-3.5 h-3.5 text-[#EA580C]" />
              <span>Portofolio & Showcase Digital</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Karya & Proyek <span className="text-gradient">Siswa</span>
            </h1>
            <p className="text-base text-[#94A3B8] leading-relaxed">
              Kumpulan inovasi aplikasi web, mobile, Internet of Things, dan kecerdasan buatan yang dirancang dan dibangun oleh siswa Internext.
            </p>
          </div>

          {/* Search, Filter & View Mode Bar */}
          <div className="glass-card p-4 sm:p-5 mb-10 flex flex-col md:flex-row items-center justify-between gap-4 border-white/[0.08]">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
              <input
                type="text"
                placeholder="Cari karya, teknologi, tim..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#02040A] border border-white/[0.1] rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#F59E0B] transition-colors"
              />
            </div>

            <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all ${
                    selectedCategory === cat.value
                      ? "bg-[#F59E0B] text-[#02040A] font-bold shadow-md shadow-[#F59E0B]/20"
                      : "bg-white/[0.04] text-[#94A3B8] hover:text-white hover:bg-white/[0.08]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Layout Mode Switcher */}
            <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-xl border border-white/[0.08] shrink-0">
              <button
                onClick={() => setViewMode("masonry")}
                title="Tampilan Masonry GSAP"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  viewMode === "masonry"
                    ? "bg-[#F59E0B]/20 text-[#F59E0B] font-semibold border border-[#F59E0B]/40"
                    : "text-[#64748B] hover:text-white"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Masonry</span>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                title="Tampilan Kisi Standar"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  viewMode === "grid"
                    ? "bg-white/[0.1] text-white font-semibold border border-white/[0.15]"
                    : "text-[#64748B] hover:text-white"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>
            </div>
          </div>

          {/* Projects Display */}
          {filteredProjects.length > 0 ? (
            viewMode === "masonry" ? (
              <Masonry
                items={masonryItems}
                ease="power3.out"
                duration={0.6}
                stagger={0.05}
                animateFrom="bottom"
                scaleOnHover={true}
                hoverScale={0.98}
                blurToFocus={true}
                colorShiftOnHover={true}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )
          ) : (
            <div className="glass-card p-12 text-center max-w-md mx-auto">
              <Code2 className="w-10 h-10 text-[#64748B] mx-auto mb-3" />
              <h3 className="font-heading text-lg font-bold text-white mb-1">
                Tidak ada karya yang sesuai
              </h3>
              <p className="text-xs text-[#94A3B8]">
                Coba sesuaikan kata kunci pencarian atau pilih kategori lain.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
