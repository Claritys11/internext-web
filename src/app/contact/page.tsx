"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";
import { mockGuestbook } from "@/lib/data/mock";
import { GuestbookEntry } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Mail, MapPin, MessageSquare, Send, CheckCircle2, User, Sparkles } from "lucide-react";

export default function ContactPage() {
  const [entries, setEntries] = useState<GuestbookEntry[]>(mockGuestbook);
  const [form, setForm] = useState({
    name: "",
    role: "Umum" as "Siswa" | "Alumni" | "Guru" | "Umum",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;

    const newEntry: GuestbookEntry = {
      id: `gb-${Date.now()}`,
      name: form.name.trim(),
      role: form.role,
      message: form.message.trim(),
      createdAt: new Date().toISOString(),
      approved: true,
    };

    setEntries([newEntry, ...entries]);
    setForm({ name: "", role: "Umum", message: "" });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4F46E5]/10 border border-[#4F46E5]/30 text-xs font-mono text-[#A5B4FC] mb-4">
              <MessageSquare className="w-3.5 h-3.5 text-[#06B6D4]" />
              <span>Komunikasi & Buku Tamu</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Kontak & <span className="text-gradient-cyan">Buku Tamu</span>
            </h1>
            <p className="text-base text-[#94A3B8] leading-relaxed">
              Hubungi perwakilan kelas untuk kolaborasi, atau tinggalkan jejak pesan dan apresiasi di buku tamu kami.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Col: Contact Info (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="glass-card p-6 sm:p-8">
                <h3 className="font-heading text-xl font-bold text-white mb-6">
                  Pusat Komunikasi Resmi
                </h3>

                <div className="space-y-5 text-sm">
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-[#4F46E5]/20 flex items-center justify-center shrink-0 mt-0.5 text-[#A5B4FC]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-[#64748B] block">Email Resmi</span>
                      <a
                        href={`mailto:${siteConfig.socials.email}`}
                        className="text-white hover:text-[#06B6D4] font-medium transition-colors"
                      >
                        {siteConfig.socials.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-[#06B6D4]/20 flex items-center justify-center shrink-0 mt-0.5 text-[#06B6D4]">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-[#64748B] block">Lokasi Kampus</span>
                      <p className="text-white font-medium">
                        {siteConfig.classInfo.school}
                      </p>
                      <p className="text-xs text-[#94A3B8] mt-0.5">
                        Gedung Teknologi & Informatika, Ruang Lab RPL 3
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-[#10B981]/20 flex items-center justify-center shrink-0 mt-0.5 text-[#10B981]">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-[#64748B] block">Perwakilan Tim</span>
                      <p className="text-white font-medium">
                        {siteConfig.classInfo.classPresident} (Ketua Kelas)
                      </p>
                      <p className="text-xs text-[#94A3B8]">
                        Wali Kelas: {siteConfig.classInfo.homeroomTeacher}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Guestbook Form & Message Wall (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              {/* Form Card */}
              <div className="glass-card p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-4 h-4 text-[#06B6D4]" />
                  <h3 className="font-heading text-lg font-bold text-white">
                    Tulis Ucapan di Buku Tamu
                  </h3>
                </div>

                {submitted && (
                  <div className="mb-6 p-4 rounded-xl bg-[#10B981]/15 border border-[#10B981]/30 flex items-center gap-3 text-sm text-[#10B981]">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>Terima kasih! Pesan Anda telah berhasil ditampilkan di buku tamu.</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[#CBD5E1] mb-1.5">
                        Nama Lengkap *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Budi Santoso"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-[#0A0F1E] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#06B6D4] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#CBD5E1] mb-1.5">
                        Status / Hubungan
                      </label>
                      <select
                        value={form.role}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            role: e.target.value as "Siswa" | "Alumni" | "Guru" | "Umum",
                          })
                        }
                        className="w-full bg-[#0A0F1E] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#06B6D4] transition-colors"
                      >
                        <option value="Siswa">Siswa</option>
                        <option value="Alumni">Alumni</option>
                        <option value="Guru">Guru / Staff</option>
                        <option value="Umum">Tamu Umum</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#CBD5E1] mb-1.5">
                      Pesan / Kesan / Motivasi *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Tuliskan pesan terbaik Anda untuk kelas Internext..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-[#0A0F1E] border border-white/[0.1] rounded-xl p-4 text-sm text-white focus:outline-none focus:border-[#06B6D4] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-gradient px-6 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim ke Buku Tamu</span>
                  </button>
                </form>
              </div>

              {/* Guestbook Wall */}
              <div className="space-y-4">
                <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-[#94A3B8]">
                  Pesan Terbaru ({entries.length})
                </h4>

                <div className="space-y-3">
                  {entries.map((entry) => (
                    <div
                      key={entry.id}
                      className="glass-card p-4 sm:p-5 border-white/[0.06] hover:border-white/[0.12] transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-heading font-bold text-sm text-white">
                            {entry.name}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-[#06B6D4]">
                            {entry.role}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-[#64748B]">
                          {formatDate(entry.createdAt)}
                        </span>
                      </div>
                      <p className="text-xs text-[#CBD5E1] leading-relaxed">
                        {entry.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
