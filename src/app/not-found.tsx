import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Terminal, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 flex items-center justify-center pt-32 sm:pt-36 pb-24 px-4">
        <div className="glass-card max-w-md w-full p-8 text-center border-white/[0.1]">
          <div className="w-16 h-16 rounded-2xl bg-[#F59E0B]/20 border border-[#F59E0B]/40 flex items-center justify-center mx-auto mb-6">
            <Terminal className="w-8 h-8 text-[#F59E0B]" />
          </div>

          <span className="text-xs font-mono font-bold text-[#EA580C] uppercase tracking-widest block mb-2">
            Error 404
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-8">
            Halaman yang Anda tuju mungkin telah dipindahkan, dihapus, atau sedang dalam tahap pemutakhiran oleh tim Internext.
          </p>

          <Link
            href="/"
            className="btn-gradient px-6 py-3 rounded-xl text-xs font-semibold inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
