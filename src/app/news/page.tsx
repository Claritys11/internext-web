import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NewsExplorer } from "@/components/features/NewsExplorer";
import { getArticles } from "@/lib/api/services";
import { Newspaper } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function NewsPage() {
  const articles = await getArticles();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-xs font-mono text-[#F59E0B] mb-4">
              <Newspaper className="w-3.5 h-3.5 text-[#EA580C]" />
              <span>Publikasi & Pengumuman Resmi</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Kabar & Warta <span className="text-gradient">Internext</span>
            </h1>
            <p className="text-base text-[#94A3B8] leading-relaxed">
              Arsip berita prestasi, kunjungan industri, pengumuman akademik, dan perkembangan terkini dari kelas kami.
            </p>
          </div>

          <NewsExplorer articles={articles} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
