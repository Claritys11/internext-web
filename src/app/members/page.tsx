"use client";

import { useState, useMemo, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MemberCard } from "@/components/features/MemberCard";
import { mockMembers } from "@/lib/data/mock";
import { Member } from "@/lib/types";
import { Search, Users, Sparkles, Filter } from "lucide-react";

export default function MembersPage() {
  const [membersList, setMembersList] = useState<Member[]>(mockMembers);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"all" | "management" | "member">("all");

  useEffect(() => {
    fetch("/api/members")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setMembersList(data);
        }
      })
      .catch(() => {});
  }, []);

  const filteredMembers = useMemo(() => {
    return membersList.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(search.toLowerCase()) ||
        member.nickname.toLowerCase().includes(search.toLowerCase()) ||
        member.role.toLowerCase().includes(search.toLowerCase()) ||
        member.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));

      if (!matchesSearch) return false;

      if (filterType === "management") return member.isManagement;
      if (filterType === "member") return !member.isManagement;
      return true;
    });
  }, [membersList, search, filterType]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-xs font-mono text-[#F59E0B] mb-4">
              <Users className="w-3.5 h-3.5 text-[#EA580C]" />
              <span>Direktori Lengkap Anggota</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Keluarga Besar <span className="text-gradient">Internext</span>
            </h1>
            <p className="text-base text-[#94A3B8] leading-relaxed">
              Profil, keahlian, dan kutipan personal 25 siswa yang siap berkolaborasi menghasilkan karya terbaik.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="glass-card p-4 sm:p-5 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
              <input
                type="text"
                placeholder="Cari berdasarkan nama, peran, atau skill..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#02040A] border border-white/[0.1] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] transition-colors"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              <button
                onClick={() => setFilterType("all")}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                  filterType === "all"
                    ? "bg-[#F59E0B] text-[#02040A] font-bold shadow-md shadow-[#F59E0B]/30"
                    : "bg-white/[0.04] text-[#94A3B8] hover:text-white hover:bg-white/[0.08]"
                }`}
              >
                Semua ({mockMembers.length})
              </button>
              <button
                onClick={() => setFilterType("management")}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                  filterType === "management"
                    ? "bg-[#F59E0B] text-[#02040A] font-bold shadow-md shadow-[#F59E0B]/30"
                    : "bg-white/[0.04] text-[#94A3B8] hover:text-white hover:bg-white/[0.08]"
                }`}
              >
                Pengurus Inti
              </button>
              <button
                onClick={() => setFilterType("member")}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                  filterType === "member"
                    ? "bg-[#F59E0B] text-[#02040A] font-bold shadow-md shadow-[#F59E0B]/30"
                    : "bg-white/[0.04] text-[#94A3B8] hover:text-white hover:bg-white/[0.08]"
                }`}
              >
                Anggota
              </button>
            </div>
          </div>

          {/* Members Grid */}
          {filteredMembers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMembers.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          ) : (
            <div className="glass-card p-12 text-center max-w-md mx-auto">
              <Users className="w-10 h-10 text-[#64748B] mx-auto mb-3" />
              <h3 className="font-heading text-lg font-bold text-white mb-1">
                Tidak ada anggota ditemukan
              </h3>
              <p className="text-xs text-[#94A3B8]">
                Coba sesuaikan kata kunci pencarian atau filter yang dipilih.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
