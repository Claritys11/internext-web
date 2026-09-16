"use client";

import { useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { mockGallery } from "@/lib/data/mock";
import { Camera, Video, Heart, Sparkles, Filter } from "lucide-react";

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<"all" | "photo" | "video">("all");
  const [likes, setLikes] = useState<Record<string, number>>({});

  const handleLike = (id: string) => {
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const filteredItems = mockGallery.filter((item) => {
    if (activeTab === "all") return true;
    return item.type === activeTab;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4F46E5]/10 border border-[#4F46E5]/30 text-xs font-mono text-[#A5B4FC] mb-4">
              <Camera className="w-3.5 h-3.5 text-[#06B6D4]" />
              <span>Dokumentasi & Memori Kelas</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Galeri Momen <span className="text-gradient-cyan">Internext</span>
            </h1>
            <p className="text-base text-[#94A3B8] leading-relaxed">
              Merekam setiap tawa, kerja keras, perlombaan, dan kenangan tak terlupakan selama masa sekolah.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center justify-center gap-2 mb-10">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                activeTab === "all"
                  ? "bg-[#4F46E5] text-white shadow-md shadow-[#4F46E5]/30"
                  : "bg-white/[0.04] text-[#94A3B8] hover:text-white"
              }`}
            >
              Semua Dokumentasi
            </button>
            <button
              onClick={() => setActiveTab("photo")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === "photo"
                  ? "bg-[#4F46E5] text-white shadow-md shadow-[#4F46E5]/30"
                  : "bg-white/[0.04] text-[#94A3B8] hover:text-white"
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Foto Album</span>
            </button>
            <button
              onClick={() => setActiveTab("video")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === "video"
                  ? "bg-[#4F46E5] text-white shadow-md shadow-[#4F46E5]/30"
                  : "bg-white/[0.04] text-[#94A3B8] hover:text-white"
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Video & Highlights</span>
            </button>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredItems.map((item) => {
              const currentLikes = item.likes + (likes[item.id] || 0);

              return (
                <div
                  key={item.id}
                  className="glass-card overflow-hidden group hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative w-full h-64 sm:h-80 overflow-hidden bg-[#0A0F1E]">
                    <Image
                      src={item.url}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] via-transparent to-transparent opacity-80" />

                    <div className="absolute top-3 left-3">
                      <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-black/60 text-[#06B6D4] backdrop-blur-md">
                        {item.album}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                      <div>
                        <h3 className="font-heading text-lg font-bold text-white mb-1">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#CBD5E1] line-clamp-2 max-w-sm">
                          {item.caption}
                        </p>
                        <span className="text-[10px] font-mono text-[#64748B] block mt-1">
                          📷 Oleh: {item.photographer} • {item.date}
                        </span>
                      </div>

                      <button
                        onClick={() => handleLike(item.id)}
                        className="px-3 py-1.5 rounded-lg bg-black/60 hover:bg-[#EF4444]/20 border border-white/[0.1] text-xs font-mono text-white flex items-center gap-1.5 backdrop-blur-md transition-colors"
                      >
                        <Heart className="w-3.5 h-3.5 text-[#EF4444] fill-[#EF4444]" />
                        <span>{currentLikes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
