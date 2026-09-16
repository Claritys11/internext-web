"use client";

import { useState } from "react";
import Link from "next/link";
import { mockArticles, mockMembers, mockProjects, mockGuestbook } from "@/lib/data/mock";
import { formatDate } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  Users,
  Code2,
  MessageSquare,
  ShieldCheck,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  Search,
  ArrowLeft,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "articles" | "projects" | "members" | "guestbook">("overview");
  const [articlesList, setArticlesList] = useState(mockArticles);
  const [projectsList, setProjectsList] = useState(mockProjects);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDeleteArticle = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus artikel ini?")) {
      setArticlesList(articlesList.filter((a) => a.id !== id));
    }
  };

  const handleDeleteProject = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus proyek ini?")) {
      setProjectsList(projectsList.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E] flex flex-col md:flex-row">
      {/* Sidebar (Desktop) */}
      <aside className="w-full md:w-64 border-r border-white/[0.08] bg-[#0A0F1E] p-5 flex flex-col justify-between shrink-0">
        <div>
          {/* Brand header */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center gap-2 text-white group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#4F46E5] to-[#06B6D4] flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
              <span className="font-heading font-extrabold text-base tracking-tight">
                ADMIN HQ
              </span>
            </Link>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#4F46E5]/20 text-[#A5B4FC]">
              Editor
            </span>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1 text-sm">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl font-medium transition-colors ${
                activeTab === "overview"
                  ? "bg-[#4F46E5] text-white shadow-md shadow-[#4F46E5]/30"
                  : "text-[#94A3B8] hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Ringkasan Metrik</span>
            </button>

            <button
              onClick={() => setActiveTab("articles")}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl font-medium transition-colors ${
                activeTab === "articles"
                  ? "bg-[#4F46E5] text-white shadow-md shadow-[#4F46E5]/30"
                  : "text-[#94A3B8] hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Warta & Artikel ({articlesList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("projects")}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl font-medium transition-colors ${
                activeTab === "projects"
                  ? "bg-[#4F46E5] text-white shadow-md shadow-[#4F46E5]/30"
                  : "text-[#94A3B8] hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>Karya Siswa ({projectsList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("members")}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl font-medium transition-colors ${
                activeTab === "members"
                  ? "bg-[#4F46E5] text-white shadow-md shadow-[#4F46E5]/30"
                  : "text-[#94A3B8] hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Anggota Kelas ({mockMembers.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("guestbook")}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl font-medium transition-colors ${
                activeTab === "guestbook"
                  ? "bg-[#4F46E5] text-white shadow-md shadow-[#4F46E5]/30"
                  : "text-[#94A3B8] hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Buku Tamu ({mockGuestbook.length})</span>
            </button>
          </nav>
        </div>

        {/* Back to public site */}
        <div className="pt-6 border-t border-white/[0.08] mt-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-mono text-[#94A3B8] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Ke Halaman Publik</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
              {activeTab === "overview" && "Dashboard Ringkasan"}
              {activeTab === "articles" && "Manajemen Warta & Berita"}
              {activeTab === "projects" && "Manajemen Portofolio Karya"}
              {activeTab === "members" && "Direktori Anggota Kelas"}
              {activeTab === "guestbook" && "Moderasi Pesan Buku Tamu"}
            </h1>
            <p className="text-xs text-[#94A3B8] font-mono mt-1">
              Internext CMS Shell • Mock Database State
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => alert("Fitur formulir penambahan baru telah dipersiapkan untuk integrasi backend.")}
              className="btn-gradient px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Baru</span>
            </button>
          </div>
        </div>

        {/* 1. OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass-card p-5">
                <span className="text-xs font-mono text-[#64748B] block">Total Artikel</span>
                <span className="font-heading text-3xl font-extrabold text-white mt-1 block">
                  {articlesList.length}
                </span>
                <span className="text-[11px] text-[#10B981] font-mono mt-1 block">
                  ✓ Terpublikasi
                </span>
              </div>
              <div className="glass-card p-5">
                <span className="text-xs font-mono text-[#64748B] block">Karya Terdaftar</span>
                <span className="font-heading text-3xl font-extrabold text-white mt-1 block">
                  {projectsList.length}
                </span>
                <span className="text-[11px] text-[#06B6D4] font-mono mt-1 block">
                  ✓ Siap Ditampilkan
                </span>
              </div>
              <div className="glass-card p-5">
                <span className="text-xs font-mono text-[#64748B] block">Anggota Terdata</span>
                <span className="font-heading text-3xl font-extrabold text-white mt-1 block">
                  {mockMembers.length}
                </span>
                <span className="text-[11px] text-[#A5B4FC] font-mono mt-1 block">
                  ✓ Terverifikasi
                </span>
              </div>
              <div className="glass-card p-5">
                <span className="text-xs font-mono text-[#64748B] block">Pesan Tamu</span>
                <span className="font-heading text-3xl font-extrabold text-white mt-1 block">
                  {mockGuestbook.length}
                </span>
                <span className="text-[11px] text-[#10B981] font-mono mt-1 block">
                  ✓ Moderasi Aktif
                </span>
              </div>
            </div>

            {/* Quick Actions / Integration notice */}
            <div className="glass-card p-6 border-white/[0.08]">
              <h3 className="font-heading text-lg font-bold text-white mb-2">
                Status Integrasi Backend (NestJS Contract)
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed mb-4">
                Antarmuka dashboard admin ini berjalan menggunakan Mock Service Adapter (`@/lib/api/services.ts`).
                Saat backend NestJS diimplementasikan pada fase berikutnya, API endpoint `/api/v1/admin/*` akan otomatis terhubung tanpa mengubah arsitektur visual ini.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] text-xs font-mono text-[#06B6D4]">
                <span>Dokumentasi kontrak API: docs/frontend-contract.md</span>
              </div>
            </div>
          </div>
        )}

        {/* 2. ARTICLES TAB */}
        {activeTab === "articles" && (
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#111827] border-b border-white/[0.08] text-[#94A3B8] font-mono uppercase">
                  <tr>
                    <th className="p-4">Judul Artikel</th>
                    <th className="p-4">Kategori</th>
                    <th className="p-4">Penulis</th>
                    <th className="p-4">Tanggal</th>
                    <th className="p-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06] text-[#CBD5E1]">
                  {articlesList.map((article) => (
                    <tr key={article.id} className="hover:bg-white/[0.02]">
                      <td className="p-4 font-semibold text-white max-w-xs truncate">
                        {article.title}
                      </td>
                      <td className="p-4 font-mono text-[#06B6D4]">{article.category}</td>
                      <td className="p-4">{article.author.name}</td>
                      <td className="p-4 font-mono text-[#64748B]">{formatDate(article.date)}</td>
                      <td className="p-4 text-right space-x-2">
                        <Link
                          href={`/news/${article.slug}`}
                          className="p-1.5 rounded-lg hover:bg-white/[0.05] text-[#94A3B8] hover:text-white inline-block"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDeleteArticle(article.id)}
                          className="p-1.5 rounded-lg hover:bg-[#EF4444]/20 text-[#EF4444] inline-block"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. PROJECTS TAB */}
        {activeTab === "projects" && (
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#111827] border-b border-white/[0.08] text-[#94A3B8] font-mono uppercase">
                  <tr>
                    <th className="p-4">Nama Proyek</th>
                    <th className="p-4">Kategori</th>
                    <th className="p-4">Tim Pengembang</th>
                    <th className="p-4">Tahun</th>
                    <th className="p-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06] text-[#CBD5E1]">
                  {projectsList.map((project) => (
                    <tr key={project.id} className="hover:bg-white/[0.02]">
                      <td className="p-4 font-semibold text-white max-w-xs truncate">
                        {project.title}
                      </td>
                      <td className="p-4 font-mono text-[#A5B4FC]">{project.category}</td>
                      <td className="p-4 text-[#94A3B8]">{project.team.join(", ")}</td>
                      <td className="p-4 font-mono text-[#64748B]">{project.year}</td>
                      <td className="p-4 text-right space-x-2">
                        <Link
                          href={`/projects#${project.slug}`}
                          className="p-1.5 rounded-lg hover:bg-white/[0.05] text-[#94A3B8] hover:text-white inline-block"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="p-1.5 rounded-lg hover:bg-[#EF4444]/20 text-[#EF4444] inline-block"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. MEMBERS TAB */}
        {activeTab === "members" && (
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#111827] border-b border-white/[0.08] text-[#94A3B8] font-mono uppercase">
                  <tr>
                    <th className="p-4">Nama Siswa</th>
                    <th className="p-4">Peran / Jabatan</th>
                    <th className="p-4">Divisi</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06] text-[#CBD5E1]">
                  {mockMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-white/[0.02]">
                      <td className="p-4 font-semibold text-white">
                        {member.name} ({member.nickname})
                      </td>
                      <td className="p-4 font-mono text-[#06B6D4]">{member.role}</td>
                      <td className="p-4 text-[#94A3B8]">{member.department || "-"}</td>
                      <td className="p-4 font-mono">
                        <span className="px-2 py-0.5 rounded bg-[#10B981]/20 text-[#10B981]">
                          Aktif
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 5. GUESTBOOK TAB */}
        {activeTab === "guestbook" && (
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#111827] border-b border-white/[0.08] text-[#94A3B8] font-mono uppercase">
                  <tr>
                    <th className="p-4">Pengirim</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Pesan</th>
                    <th className="p-4">Waktu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06] text-[#CBD5E1]">
                  {mockGuestbook.map((entry) => (
                    <tr key={entry.id} className="hover:bg-white/[0.02]">
                      <td className="p-4 font-semibold text-white whitespace-nowrap">
                        {entry.name}
                      </td>
                      <td className="p-4 font-mono text-[#A5B4FC]">{entry.role}</td>
                      <td className="p-4 text-[#CBD5E1] max-w-md truncate">{entry.message}</td>
                      <td className="p-4 font-mono text-[#64748B] whitespace-nowrap">
                        {formatDate(entry.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
