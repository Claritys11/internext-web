"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DomeGallery } from "@/components/ui/DomeGallery";
import { mockGallery } from "@/lib/data/mock";
import { GalleryItem } from "@/lib/types";
import {
  Camera,
  Video,
  Heart,
  Sparkles,
  Compass,
  Palette,
  Eye,
  Maximize2,
} from "lucide-react";

export default function GalleryPage() {
  const [galleryList, setGalleryList] = useState<GalleryItem[]>(mockGallery);
  const [activeTab, setActiveTab] = useState<"all" | "photo" | "video">("all");
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [grayscale, setGrayscale] = useState<boolean>(false);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setGalleryList(data);
        }
      })
      .catch(() => {});
  }, []);

  const handleLike = (id: string) => {
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const filteredItems = galleryList.filter((item) => {
    if (activeTab === "all") return true;
    return item.type === activeTab;
  });

  // Rich photographic pool for the 3D Dome Gallery
  const domeImages = useMemo(() => {
    return [
      {
        src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=800&fit=crop",
        alt: "Presentasi Karya Akhir Semester",
      },
      {
        src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=800&fit=crop",
        alt: "Workshop UI/UX Design System",
      },
      {
        src: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=800&h=800&fit=crop",
        alt: "Pekan Olahraga & Class Meeting",
      },
      {
        src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=800&fit=crop",
        alt: "Bakti Sosial & Santunan Masyarakat",
      },
      {
        src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=800&fit=crop",
        alt: "Kolaborasi Tim & Coding Session",
      },
      {
        src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=800&fit=crop",
        alt: "Diskusi Desain Produk Digital",
      },
      {
        src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=800&fit=crop",
        alt: "Kebersamaan Angkatan Internext",
      },
      {
        src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=800&fit=crop",
        alt: "Brainstorming Sprint Mingguan",
      },
      {
        src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=800&fit=crop",
        alt: "Kelas Interaktif & Pemrograman",
      },
      {
        src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=800&fit=crop",
        alt: "Perayaan Kelulusan & Prestasi",
      },
      {
        src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=800&fit=crop",
        alt: "Tech Expo & Inovasi Digital",
      },
      {
        src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=800&fit=crop",
        alt: "Ujian Sertifikasi Internasional",
      },
      {
        src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=800&fit=crop",
        alt: "Farewell Night & Graduation",
      },
      {
        src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=800&fit=crop",
        alt: "Cyber Security Lab Session",
      },
      {
        src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&h=800&fit=crop",
        alt: "Virtual Reality Simulation Hub",
      },
      {
        src: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=800&fit=crop",
        alt: "Studio Musik & Sound Engineering",
      },
    ];
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#02040A]">
      <Navbar />

      <main className="flex-1 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 1. Header: Judul & Penjelasan Singkat */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-xs font-mono text-[#F59E0B] mb-4 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#EA580C]" />
              <span>Eksplorasi Kubah 3D Interaktif • Momen & Memori Kelas</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4 leading-tight">
              Kubah Galeri 3D <span className="text-gradient">Internext</span>
            </h1>
            <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-2xl mx-auto">
              Eksplorasi rekaman visual perjalanan, prestasi, dan kenangan tak terlupakan siswa XI Internasional SMK Telkom Malang dalam kubah 360° interaktif. Geser untuk memutar sudut pandang dan klik foto mana saja untuk memperbesar memori.
            </p>
          </div>

          {/* 2. Interactive Hint & Controls Bar */}
          <div className="glass-card p-3.5 sm:p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-white/[0.08]">
            <div className="flex items-center gap-2 text-xs font-mono text-[#CBD5E1]">
              <Compass className="w-4 h-4 text-[#F59E0B] animate-spin" style={{ animationDuration: "12s" }} />
              <span>
                <strong className="text-white">Interaksi:</strong> Drag / geser kubah untuk memutar 360° • Klik tile foto untuk memperbesar
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setGrayscale(!grayscale)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  grayscale
                    ? "bg-[#EA580C]/20 text-[#EA580C] border border-[#EA580C]/40 font-semibold"
                    : "bg-white/[0.05] text-[#94A3B8] hover:text-white border border-white/[0.08]"
                }`}
                title="Beralih efek warna / hitam-putih"
              >
                <Palette className="w-3.5 h-3.5" />
                <span>{grayscale ? "Mode Monokrom" : "Mode Warna Asli"}</span>
              </button>
            </div>
          </div>

          {/* 3. The 3D Dome Gallery Container */}
          <div className="w-full h-[65vh] sm:h-[72vh] md:h-[78vh] relative rounded-3xl overflow-hidden border border-white/[0.1] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] bg-[#02040A] mb-20">
            <DomeGallery
              images={domeImages}
              overlayBlurColor="#02040A"
              grayscale={grayscale}
              openedImageWidth="450px"
              openedImageHeight="450px"
              imageBorderRadius="20px"
              openedImageBorderRadius="28px"
              fit={0.58}
              segments={35}
              dragSensitivity={22}
            />

            {/* Corner Decorative Tech Badges */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-[#02040A]/80 border border-white/[0.08] backdrop-blur-md text-[10px] font-mono text-[#F59E0B]">
              <span className="w-2 h-2 rounded-full bg-[#EA580C] animate-pulse" />
              <span>3D SPHERICAL PROJECTION • ACTIVE</span>
            </div>

            <div className="absolute bottom-4 right-4 z-10 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-[#02040A]/80 border border-white/[0.08] backdrop-blur-md text-[10px] font-mono text-[#64748B]">
              <span>TOTAL 35 SEGMENTS • GESTURE ENGINE</span>
            </div>
          </div>

          {/* 4. Koleksi Album & Arsip Dokumentasi Grid */}
          <div className="pt-4 border-t border-white/[0.08]">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-xs font-mono text-[#F59E0B] mb-2">
                  <Camera className="w-3.5 h-3.5 text-[#EA580C]" />
                  <span>Arsip Foto & Video Terkurasi</span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Koleksi Album <span className="text-gradient">Dokumentasi</span>
                </h2>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                    activeTab === "all"
                      ? "bg-[#F59E0B] text-[#02040A] shadow-md shadow-[#F59E0B]/30 font-bold"
                      : "bg-white/[0.04] text-[#94A3B8] hover:text-white"
                  }`}
                >
                  Semua
                </button>
                <button
                  onClick={() => setActiveTab("photo")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all ${
                    activeTab === "photo"
                      ? "bg-[#F59E0B] text-[#02040A] shadow-md shadow-[#F59E0B]/30 font-bold"
                      : "bg-white/[0.04] text-[#94A3B8] hover:text-white"
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Foto</span>
                </button>
                <button
                  onClick={() => setActiveTab("video")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all ${
                    activeTab === "video"
                      ? "bg-[#F59E0B] text-[#02040A] shadow-md shadow-[#F59E0B]/30 font-bold"
                      : "bg-white/[0.04] text-[#94A3B8] hover:text-white"
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Video</span>
                </button>
              </div>
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
                    <div className="relative w-full h-64 sm:h-80 overflow-hidden bg-[#02040A]">
                      <Image
                        src={item.url}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#02040A] via-transparent to-transparent opacity-85" />

                      <div className="absolute top-3 left-3">
                        <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-black/60 text-[#F59E0B] backdrop-blur-md border border-[#F59E0B]/30">
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
        </div>
      </main>

      <Footer />
    </div>
  );
}
