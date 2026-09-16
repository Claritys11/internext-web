"use client";

import React, { useState, useMemo } from "react";
import { Article } from "@/lib/types";
import { Masonry, MasonryItem } from "@/components/ui/Masonry";
import { ArticleCard } from "@/components/features/ArticleCard";
import { Search, LayoutGrid, Sparkles, Newspaper } from "lucide-react";

export function NewsExplorer({ articles }: { articles: Article[] }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"masonry" | "grid">("masonry");

  const categories = [
    { label: "Semua Kategori", value: "all" },
    { label: "Akademik", value: "Akademik" },
    { label: "Prestasi", value: "Prestasi" },
    { label: "Event", value: "Event" },
    { label: "Pengumuman", value: "Pengumuman" },
    { label: "Sosial", value: "Sosial" },
  ];

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        selectedCategory === "all" || article.category === selectedCategory;

      const matchesSearch =
        article.title.toLowerCase().includes(search.toLowerCase()) ||
        article.summary.toLowerCase().includes(search.toLowerCase()) ||
        article.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
        article.author.name.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [articles, search, selectedCategory]);

  // Dynamic heights for organic staggered masonry layout
  const masonryItems = useMemo<MasonryItem[]>(() => {
    const heights = [360, 440, 380, 480, 350, 420, 390, 460];
    return filteredArticles.map((article, idx) => ({
      id: article.id,
      img: article.coverImage,
      url: `/news/${article.slug}`,
      height: heights[idx % heights.length],
      title: article.title,
      subtitle: article.summary,
      category: article.category,
      badge: article.isPinned ? "📌 Highlight" : undefined,
      date: article.date,
      readTime: article.readTime,
      tags: article.tags,
      author: article.author,
    }));
  }, [filteredArticles]);

  return (
    <div className="w-full">
      {/* Search, Filter & View Mode Bar */}
      <div className="glass-card p-4 sm:p-5 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 border-white/[0.08]">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
          <input
            type="text"
            placeholder="Cari warta, topik, penulis..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0A0F1E] border border-white/[0.1] rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#06B6D4] transition-colors"
          />
        </div>

        {/* Categories Horizontal Tabs */}
        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all ${
                selectedCategory === cat.value
                  ? "bg-[#06B6D4] text-[#0A0F1E] font-bold shadow-md shadow-[#06B6D4]/20"
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
                ? "bg-[#06B6D4]/20 text-[#06B6D4] font-semibold border border-[#06B6D4]/40"
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

      {/* Articles Display */}
      {filteredArticles.length > 0 ? (
        viewMode === "masonry" ? (
          <div className="w-full">
            <Masonry
              items={masonryItems}
              ease="power3.out"
              duration={0.6}
              stagger={0.05}
              animateFrom="bottom"
              scaleOnHover={true}
              hoverScale={0.98}
              blurToFocus={true}
              colorShiftOnHover={false}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )
      ) : (
        <div className="glass-card p-12 text-center max-w-md mx-auto">
          <Newspaper className="w-10 h-10 text-[#64748B] mx-auto mb-3" />
          <h3 className="font-heading text-lg font-bold text-white mb-1">
            Tidak ada warta yang sesuai
          </h3>
          <p className="text-xs text-[#94A3B8]">
            Coba sesuaikan kata kunci pencarian atau pilih kategori warta lain.
          </p>
        </div>
      )}
    </div>
  );
}
