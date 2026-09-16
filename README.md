# Internext (`internext.web.id`) — Connected. Forward. Together.

[![Next.js](https://img.shields.io/badge/Next.js-16.3.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?style=for-the-badge&logo=greensock)](https://greensock.com/gsap/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**Internext** adalah platform web resmi identitas digital, dokumentasi kegiatan, dan portofolio komprehensif bagi **Kelas XII Rekayasa Perangkat Lunak (RPL)**. Dibangun dengan standar rekayasa perangkat lunak modern, arsitektur yang tangguh, serta pengalaman visual interaktif tingkat tinggi (*cinematic web aesthetics*).

---

## ✨ Fitur Utama & Pengalaman Interaktif

### 1. 🌐 Galeri & Inovasi Internext 360° (Studio Showcase)
- **Adaptif & Dinamis**: Terhubung langsung ke katalog data portofolio siswa; proyek baru otomatis muncul pada arena lingkaran orbital 360°.
- **Studio Flanked Highlights**: Diapit oleh 3 kartu unggulan di sayap kiri (#01–#03) dan 3 kartu riset di sayap kanan (#04–#06), membingkai arena 360° di bagian tengah.
- **Interaksi 3D Flip Card**: Kartu berputar 180° untuk menampilkan *tech stack*, deskripsi riset, dan tautan langsung ke detail karya.

### 2. ⚡ Nahkoda & Penggerak Internext (6 Pimpinan Kelas)
- Menampilkan 6 pengurus inti kelas (*Ketua Kelas, Wakil Ketua, Sekretaris, Bendahara, Divisi IT & Riset, Divisi Media & Humas*).
- Desain *tilted non-parallel frosted glassmorphism* terinspirasi Web3/Tech handle branding (`fakhri.eth`, `alya.design`, `rafi.dev`, `zahra.finance`, `bima.build`, `nabila.sys`) lengkap dengan *rank points* dan efek rotasi hover asimetris.

### 3. 🌀 GSAP Scroll MotionPath (Pelacak Kedalaman & Inertia)
- Jalur kurva SVG bercahaya neon ganda (*lime yellow* & *electric cyan*) mengalir mengikuti progres scroll dari puncak Hero hingga ke footer.
- **Arsitektur Layering Cerdas**: Jalur berada di lapisan `z-0` di balik semua elemen kartu (*frosted glass backlight* terpancar halus), sementara seluruh teks judul dilindungi dengan perisai solid sehingga teks 100% tajam dan bebas dari bias garis.

### 4. 📰 Kabar & Warta Terkini (Infinite Draggable News Carousel)
- Didukung GSAP `Draggable` dengan *momentum throwing* dan *snap-to-card*.
- Mendukung geser bebas (*free drag*), tombol navigasi Next/Prev, serta *auto-ticker loop* yang otomatis berhenti saat kursor diarahkan ke kartu.

### 5. 🎬 Cinematic / Motion Footer (Curtain Reveal & Magnetic Navigation)
- Efek *theatrical curtain reveal* saat pengguna mencapai akhir halaman beranda.
- Teks raksasa latar belakang *parallax* `INTERNEXT`, pendaran aurora animasi *breathe*, pita *marquee* diagonal, serta tombol interaktif berbasis fisika magnetik (*Magnetic Buttons*).

### 6. 👥 Direktori 36 Anggota Kelas & Buku Tamu Digital
- Profil mendalam tiap siswa lengkap dengan *skills*, portofolio, tautan GitHub/LinkedIn, dan kutipan motivasi.
- Formulir Buku Tamu Digital untuk menerima aspirasi, pesan, dan kesan dari rekan siswa, guru, serta alumni.

---

## 🛠️ Tech Stack & Ekosistem

- **Framework**: [Next.js 16.3.5](https://nextjs.org/) (App Router, Turbopack)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS Modules
- **Animasi & Interaktivitas**: [GSAP 3](https://greensock.com/gsap/) (`ScrollTrigger`, `Draggable`, `MotionPathPlugin`)
- **Ikonografi**: [Lucide React](https://lucide.dev/)
- **Typography**: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk), [Inter](https://fonts.google.com/specimen/Inter), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)

---

## 📁 Struktur Direktori

```text
webclass/
├── src/
│   ├── app/                    # Next.js App Router (Pages, Layouts, Route Handlers)
│   │   ├── about/              # Halaman Visi, Misi & Filosofi
│   │   ├── admin/              # Portal Manajemen & Pengawasan
│   │   ├── contact/            # Buku Tamu Digital
│   │   ├── events/             # Agenda, Kalender & Dokumentasi
│   │   ├── gallery/            # Galeri Foto & Kilas Balik
│   │   ├── members/            # Direktori Lengkap 36 Anggota
│   │   ├── news/               # Warta Berita & Pengumuman
│   │   ├── projects/           # Eksplorasi Karya Siswa
│   │   ├── globals.css         # Design Tokens & Utilitas Glassmorphism
│   │   ├── layout.tsx          # Root Layout
│   │   └── page.tsx            # Beranda Utama
│   ├── components/
│   │   ├── features/           # Kartu Fitur (EventCard, MemberCard, ProjectCard, dll.)
│   │   ├── layout/             # Navbar, Footer
│   │   ├── sections/           # HeroSection, StatsBar, CircularGallery, Leadership, Carousel
│   │   ├── shared/             # ScrollMotionPath, DynamicParticles
│   │   └── ui/                 # UI Primitives & motion-footer.tsx
│   ├── config/                 # Metadata Situs & Konfigurasi Kelas
│   └── lib/                    # API Services, Mock Data, Utilities, Types
├── public/                     # Aset Gambar, Logo, & Font Statis
├── CONTRIBUTING.md             # Panduan Kontribusi
├── CODE_OF_CONDUCT.md         # Pedoman Etika & Komunitas
├── SECURITY.md                 # Kebijakan Keamanan
└── LICENSE                     # Lisensi MIT
```

---

## 🚀 Memulai Pengembangan Lokal

### Prasyarat
- [Node.js](https://nodejs.org/) v18.18.0 atau yang lebih baru
- `npm`, `pnpm`, atau `yarn`

### Instalasi & Menjalankan Server

1. **Clone repository**:
   ```bash
   git clone https://github.com/your-org/internext-web.git
   cd internext-web
   ```

2. **Install dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan server pengembangan**:
   ```bash
   npm run dev
   ```
   Buka peramban di [http://localhost:3000](http://localhost:3000) atau [http://localhost:3001](http://localhost:3001).

4. **Kompilasi produksi**:
   ```bash
   npm run build
   npm run start
   ```

5. **Pemeriksaan Type Safety**:
   ```bash
   npx tsc --noEmit
   ```

---

## 🤝 Kontribusi & Kebijakan Proyek

Kami menyambut partisipasi dari seluruh rekan kelas dan komunitas. Silakan baca dokumen pendukung:
- 📖 [Panduan Kontribusi](CONTRIBUTING.md)
- 📜 [Code of Conduct](CODE_OF_CONDUCT.md)
- 🔒 [Kebijakan Keamanan](SECURITY.md)

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE) — bebas digunakan dan dikembangkan untuk keperluan edukasi dan komunitas kelas.
