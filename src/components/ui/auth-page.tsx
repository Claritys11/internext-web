"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "./button";
import { Input } from "./input";
import {
  User,
  Lock,
  ChevronLeftIcon,
  Terminal,
  ShieldCheck,
  AlertCircle,
  Loader2,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthPageProps {
  onSuccess?: () => void;
  redirectTo?: string;
}

export function AuthPage({ onSuccess, redirectTo = "/admin" }: AuthPageProps) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Username atau password salah");
      }

      if (onSuccess) {
        onSuccess();
      } else {
        router.push(redirectTo);
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || "Gagal masuk. Periksa username dan password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#02040A] text-[#F8FAFC] md:h-screen md:overflow-hidden lg:grid lg:grid-cols-2">
      {/* Left side: Class Identity & Dynamic Floating Paths */}
      <div className="bg-[#0F172A]/40 relative hidden h-full flex-col border-r border-white/[0.08] p-10 lg:flex overflow-hidden">
        <div className="from-[#02040A] absolute inset-0 z-0 bg-gradient-to-t via-transparent to-transparent opacity-90 pointer-events-none" />
        
        {/* Brand header */}
        <div className="relative z-20 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#EA580C] p-0.5 shadow-lg shadow-[#F59E0B]/20">
            <div className="w-full h-full bg-[#02040A] rounded-[10px] flex items-center justify-center">
              <Terminal className="w-5 h-5 text-[#F59E0B]" />
            </div>
          </div>
          <div>
            <p className="text-xl font-heading font-extrabold tracking-tight text-white">
              INTERNEXT
            </p>
            <p className="text-[10px] font-mono tracking-widest uppercase text-[#F59E0B]">
              XI Internasional • SMK Telkom Malang
            </p>
          </div>
        </div>

        {/* Quote */}
        <div className="relative z-20 mt-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-xs font-mono text-[#F59E0B]">
            <Sparkles className="w-3.5 h-3.5 text-[#EA580C]" />
            <span>Class Control HQ & Portfolio Hub</span>
          </div>

          <blockquote className="space-y-2 max-w-lg">
            <p className="text-lg sm:text-xl font-medium text-[#F8FAFC] leading-relaxed">
              &ldquo;Pusat identitas, dokumentasi kegiatan, komunikasi real-time, dan etalase karya digital siswa XI Internasional SMK Telkom Malang.&rdquo;
            </p>
            <footer className="font-mono text-xs text-[#94A3B8] flex items-center gap-2">
              <span className="w-4 h-px bg-[#F59E0B]" />
              <span>Radisty Dhisa Aqila (Ketua Kelas) & Tim Pengurus</span>
            </footer>
          </blockquote>
        </div>

        {/* Ambient Animated Paths */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <FloatingPaths position={1} />
          <FloatingPaths position={-1} />
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="relative flex h-full min-h-screen lg:min-h-0 flex-col justify-center p-6 sm:p-12 lg:p-16 overflow-y-auto">
        {/* Background glow effects */}
        <div
          aria-hidden
          className="absolute inset-0 isolate contain-strict -z-10 opacity-70 pointer-events-none"
        >
          <div className="bg-[radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.12),transparent_60%)] absolute inset-0" />
          <div className="bg-[radial-gradient(ellipse_at_bottom_left,rgba(234,88,12,0.08),transparent_60%)] absolute inset-0" />
        </div>

        {/* Return to Home link */}
        <Button
          variant="ghost"
          className="absolute top-6 left-6 text-xs text-[#94A3B8] hover:text-white hover:bg-white/[0.06] border border-white/[0.08] rounded-full px-4"
          asChild
        >
          <Link href="/">
            <ChevronLeftIcon className="size-4 me-1.5 text-[#F59E0B]" />
            Kembali ke Beranda
          </Link>
        </Button>

        <div className="mx-auto w-full max-w-sm space-y-6">
          {/* Mobile Logo */}
          <div className="flex items-center gap-2.5 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F59E0B] to-[#EA580C] p-0.5">
              <div className="w-full h-full bg-[#02040A] rounded-[6px] flex items-center justify-center">
                <Terminal className="w-4 h-4 text-[#F59E0B]" />
              </div>
            </div>
            <div>
              <p className="text-base font-heading font-bold text-white">INTERNEXT</p>
              <p className="text-[9px] font-mono text-[#F59E0B]">XI Internasional</p>
            </div>
          </div>

          {/* Form Heading */}
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#F59E0B]/10 text-[#F59E0B] text-[11px] font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Portal Admin & CMS</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Sign In ke Admin
            </h1>
            <p className="text-xs text-[#94A3B8]">
              Gunakan kredensial administrator untuk mengelola data anggota, karya, agenda, dan galeri.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-start gap-2.5"
            >
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Custom Username & Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#CBD5E1] block">
                Username Administrator
              </label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Masukkan username admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                  className="bg-[#02040A] border-white/15 focus-visible:border-[#F59E0B] focus-visible:ring-[#F59E0B]/30 text-white text-xs ps-9 h-11 rounded-xl"
                />
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-[#94A3B8]">
                  <User className="size-4" aria-hidden="true" />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#CBD5E1] block">
                Password Administrator
              </label>
              <div className="relative">
                <Input
                  type="password"
                  placeholder="Masukkan password admin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="bg-[#02040A] border-white/15 focus-visible:border-[#F59E0B] focus-visible:ring-[#F59E0B]/30 text-white text-xs ps-9 h-11 rounded-xl"
                />
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-[#94A3B8]">
                  <Lock className="size-4" aria-hidden="true" />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="btn-gradient w-full h-11 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-2 shadow-lg shadow-[#F59E0B]/20 transition-all hover:opacity-95"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Memverifikasi Kredensial...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Masuk ke Portal Admin</span>
                </>
              )}
            </Button>
          </form>

          {/* Security Notice */}
          <div className="pt-4 border-t border-white/[0.08] text-center">
            <p className="text-[11px] text-[#64748B] leading-relaxed">
              Area ini dilindungi sistem otorisasi server-side. Seluruh aktivitas pengelolaan data dicatat demi keamanan portal angkatan.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

const generateStaticPaths = (position: number) =>
  Array.from({ length: 24 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color:
      position === 1
        ? `rgba(245, 158, 11, ${0.07 + (i % 5) * 0.012})`
        : `rgba(234, 88, 12, ${0.05 + (i % 5) * 0.012})`,
    width: 0.6 + (i % 4) * 0.03,
    duration: 22 + (i % 6) * 2,
  }));

const STATIC_PATHS_POS = generateStaticPaths(1);
const STATIC_PATHS_NEG = generateStaticPaths(-1);

const FloatingPaths = React.memo(function FloatingPaths({ position }: { position: number }) {
  const paths = position === 1 ? STATIC_PATHS_POS : STATIC_PATHS_NEG;

  return (
    <div className="pointer-events-none absolute inset-0">
      <svg
        className="h-full w-full"
        viewBox="0 0 696 316"
        fill="none"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke={path.color}
            strokeWidth={path.width}
            initial={{ pathLength: 0.35, opacity: 0.45 }}
            animate={{
              pathLength: 1,
              pathOffset: [0, 1],
            }}
            transition={{
              duration: path.duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
});

