import { siteConfig } from "@/config/site";
import { Users, Code2, Trophy, CalendarCheck } from "lucide-react";

export function StatsBar() {
  const stats = [
    {
      label: "Anggota Kelas",
      value: `${siteConfig.classInfo.memberCount}`,
      sub: "Siswa Berbakat",
      icon: Users,
      color: "from-[#4F46E5] to-[#6366F1]",
    },
    {
      label: "Karya Siswa",
      value: `${siteConfig.classInfo.projectCount}+`,
      sub: "Aplikasi & Riset",
      icon: Code2,
      color: "from-[#06B6D4] to-[#3B82F6]",
    },
    {
      label: "Prestasi Diraih",
      value: `${siteConfig.classInfo.achievementCount}`,
      sub: "Tingkat LKS & Nasional",
      icon: Trophy,
      color: "from-[#F59E0B] to-[#EF4444]",
    },
    {
      label: "Agenda & Kegiatan",
      value: `${siteConfig.classInfo.eventCount}`,
      sub: "Dokumentasi Lengkap",
      icon: CalendarCheck,
      color: "from-[#10B981] to-[#059669]",
    },
  ];

  return (
    <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-16">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="glass-card p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} p-0.5 shadow-md group-hover:scale-105 transition-transform`}
                >
                  <div className="w-full h-full bg-[#0A0F1E]/80 rounded-[10px] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <span className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight block">
                    {item.value}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-[#E2E8F0] block">
                    {item.label}
                  </span>
                  <span className="text-[11px] font-mono text-[#64748B]">
                    {item.sub}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
