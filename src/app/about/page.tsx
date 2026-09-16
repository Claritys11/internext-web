import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";
import { getClassProfile } from "@/lib/api/services";
import { Sparkles, Target, Compass, Flag, Award, History, Users } from "lucide-react";

export default async function AboutPage() {
  const profile = await getClassProfile();
  const school = profile.school || siteConfig.classInfo.school;
  const className = profile.name || siteConfig.classInfo.name;
  const generation = profile.generation || siteConfig.classInfo.generation;
  const homeroomTeacher = profile.homeroomTeacher || siteConfig.classInfo.homeroomTeacher;
  const memberCount = profile.memberCount || siteConfig.classInfo.memberCount;

  const milestones = [
    {
      year: "Juli 2023",
      title: "Kick-off & Masa Pengenalan Lingkungan Sekolah",
      desc: `Pertemuan perdana ${memberCount} siswa kelas ${className} ${school} dari berbagai latar belakang, pembentukan pengurus kelas dan visi kebersamaan.`,
    },
    {
      year: "Desember 2023",
      title: "Hackathon Internal & Kolaborasi Pertama",
      desc: "Inisiasi proyek coding bersama tingkat pemula, eksplorasi dasar algoritma dan web frontend.",
    },
    {
      year: "Oktober 2024",
      title: "Kunjungan Industri & Pembentukan Divisi",
      desc: "Studi ekskursi teknologi dan perancangan pembagian divisi fungsional kelas berstandar agile.",
    },
    {
      year: "November 2025",
      title: "Juara 1 LKS Web Technologies Provinsi",
      desc: "Prestasi bergengsi yang membuktikan ketangguhan teknis dan kultur kolaboratif seluruh tim.",
    },
    {
      year: "2026 (Sekarang)",
      title: "Peluncuran Internext & Persiapan Wisuda",
      desc: "Puncak karya digital angkatan: peluncuran portal resmi dan persiapan menuju gerbang industri.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-xs font-mono text-[#F59E0B] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#EA580C]" />
              <span>Profil & Identitas Kelas</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Tentang <span className="text-gradient">Internext</span>
            </h1>
            <p className="text-base text-[#94A3B8] leading-relaxed">
              Mengenal lebih dekat identitas, sejarah, visi misi, serta semangat di balik perjalanan kelas kami.
            </p>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="glass-card p-6 border-white/[0.08]">
              <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/20 flex items-center justify-center mb-4 text-[#F59E0B]">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white mb-2">Identitas Kelas</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed mb-4">
                Komunitas belajar beranggotakan {memberCount} siswa kelas {className} {school} yang berdedikasi membangun solusi digital berstandar global.
              </p>
              <div className="text-xs font-mono space-y-1 text-[#CBD5E1]">
                <p>• Angkatan: <span className="text-white font-semibold">{generation}</span></p>
                <p>• Wali Kelas: <span className="text-white font-semibold">{homeroomTeacher}</span></p>
              </div>
            </div>

            <div className="glass-card p-6 border-white/[0.08]">
              <div className="w-10 h-10 rounded-xl bg-[#EA580C]/20 flex items-center justify-center mb-4 text-[#EA580C]">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white mb-2">Visi Kelas</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Menjadi wadah generasi digital yang unggul dalam penguasaan rekayasa perangkat lunak, berintegritas, solid dalam kebersamaan, dan siap bersaing di kancah industri global.
              </p>
            </div>

            <div className="glass-card p-6 border-white/[0.08]">
              <div className="w-10 h-10 rounded-xl bg-[#10B981]/20 flex items-center justify-center mb-4 text-[#10B981]">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white mb-2">Misi Utama</h3>
              <ul className="text-xs text-[#94A3B8] space-y-2 leading-relaxed">
                <li>1. Mendorong budaya riset, peer-learning, dan clean architecture.</li>
                <li>2. Mewujudkan portofolio karya nyata berstandar industri.</li>
                <li>3. Membangun solidaritas dan etika profesional tanpa batas.</li>
              </ul>
            </div>
          </div>

          {/* Philosophy Section */}
          <div className="glass-card p-8 sm:p-10 mb-16 relative overflow-hidden">
            <div className="relative z-10 max-w-3xl">
              <span className="text-xs font-mono uppercase tracking-widest text-[#EA580C] font-semibold">
                Filosofi Nama
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mt-1 mb-4">
                &quot;Connected. Forward. Together.&quot;
              </h2>
              <p className="text-sm text-[#CBD5E1] leading-relaxed mb-4">
                Nama <strong className="text-white">Internext</strong> adalah peleburan dari kata <em>&quot;Internet&quot;</em> yang melambangkan konektivitas tanpa sekat dan <em>&quot;Next&quot;</em> yang merepresentasikan langkah berani menuju masa depan.
              </p>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Kami meyakini bahwa teknologi bukan sekadar kode baris-per-baris, melainkan medium pemersatu yang mengantarkan generasi muda melangkah maju bersama.
              </p>
            </div>
          </div>

          {/* Timeline Section */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] text-xs font-mono text-[#94A3B8] mb-2">
                <History className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Jejak Perjalanan</span>
              </div>
              <h2 className="font-heading text-3xl font-extrabold text-white">
                Timeline Kelas dari Awal Hingga Sekarang
              </h2>
            </div>

            <div className="relative border-l border-white/[0.1] ml-4 sm:ml-32 space-y-10 pl-6 sm:pl-8">
              {milestones.map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#02040A] border-2 border-[#F59E0B] group-hover:scale-125 transition-transform" />

                  {/* Year Tag */}
                  <span className="sm:absolute sm:-left-36 top-1 text-xs font-mono text-[#F59E0B] font-semibold block mb-1 sm:mb-0">
                    {item.year}
                  </span>

                  {/* Card */}
                  <div className="glass-card p-5 hover:border-[#F59E0B]/40 transition-colors">
                    <h4 className="font-heading text-base font-bold text-white mb-1.5">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
