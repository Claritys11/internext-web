# Internext (`internext.web.id`) — Connected. Forward. Together.

[![Next.js](https://img.shields.io/badge/Next.js-16.3.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?style=for-the-badge&logo=greensock)](https://greensock.com/gsap/)
[![Prisma](https://img.shields.io/badge/Prisma-6.x-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Coolify](https://img.shields.io/badge/Deploy-Coolify-6B21A8?style=for-the-badge)](https://coolify.io/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**Internext** adalah platform web resmi identitas digital, dokumentasi kegiatan, dan portofolio komprehensif bagi **Kelas XI Internasional SMK Telkom Malang** (25 siswa). Dibangun dengan standar rekayasa perangkat lunak modern, arsitektur yang tangguh, integrasi database PostgreSQL via Prisma ORM, serta palet visual **Gargantua Glow (Black Hole Vibes)**.

---

## 🎨 Palet Desain: Gargantua Glow (Black Hole Vibes)

Platform mengadopsi tema estetika kosmik berdaya pikat tinggi dengan kontras tajam:

| Komponen | Token Hex | Karakteristik Visual |
| :--- | :--- | :--- |
| **Text** | `#F8FAFC` | Slate White — Tipografi tajam & kontras tinggi |
| **Background** | `#02040A` | Deepest Void — Kedalaman ruang hampa kosmik |
| **Primary** | `#F59E0B` | Accretion Disk Gold — Emas amber cakram akresi lubang hitam |
| **Secondary** | `#0F172A` | Accretion Slate — Permukaan wadah & kartu berlatar gelap |
| **Accent** | `#EA580C` | Cosmic Jet Flame — Pendaran oranye semburan relativistik |

- **Brand Gradient**: `linear-gradient(135deg, #F59E0B 0%, #EA580C 100%)`
- **Buttons (`.btn-gradient`)**: Menggunakan teks gelap `#02040A` di atas latar emas-oranye gradasi untuk visual punch yang tegas.

---

## ✨ Fitur Utama & Pengalaman Interaktif

### 1. 🧭 Navigasi Dinamis Morphing (`anime-navbar.tsx`)
- Menggunakan pendekatan responsif scroll cerdas:
  - **Di Posisi Teratas**: Tampil sebagai bar navigasi penuh (*full-width header*) dengan logo dan tautan terbentang luas.
  - **Saat Di-Scroll**: Bertransisi halus (*spring physics*) menjadi *compact floating pill* rounded-full tanpa memicu *double-scrollbar* atau perubahan tinggi layout halaman.
  - Dilengkapi pendaran aura partikel aktif (*luminous anime active aura*) dengan gradasi `#EA580C` dan `#F59E0B`.

### 2. 🧱 React Bits `<Masonry />` (Warta Berita & Eksplorasi Karya)
- Diintegrasikan di halaman `/news` dan `/projects`.
- Menghadirkan tata letak bertingkat (*staggered masonry*) yang dinamis dengan animasi GSAP smooth entrance, filter kategori instan, serta tombol pengalih mode (*Masonry* vs *Grid*).

### 3. 🌐 React Bits `<DomeGallery />` 360° (Galeri Kubah Interaktif)
- Diintegrasikan di halaman `/gallery`.
- Menampilkan foto-foto memori dan kegiatan siswa dalam proyeksi kubah bola 3D interaktif berbasis gestur drag/swipe dengan dukungan pembesaran foto (*click to enlarge*).

### 4. 💬 Live Chat & Buku Tamu Digital (`/contact`)
- Menggantikan buku tamu konvensional menjadi aplikasi percakapan multi-kanal:
  - **#apresiasi-publik**: Kanal resmi pesan apresiasi dan motivasi publik dari pengunjung, alumni, dan guru.
  - **#ngobrol-santai**: Kanal interaksi terbuka tanpa bot otomatis.
- Terintegrasi langsung dengan database PostgreSQL melalui Prisma ORM dengan *mock fallback store* otomatis jika database belum tersambung.

### 5. ⚙️ Portal Admin CMS Terpusat (`/admin`)
- Seluruh konten dinamis dapat dikelola secara langsung melalui antarmuka admin:
  - Profil & identitas kelas (wali kelas, ketua kelas, lokasi lab, bio).
  - Direktori 25 siswa anggota kelas (nama, peran, keahlian, quote, sosial media).
  - Portofolio proyek & karya digital siswa.
  - Warta berita, agenda kalender, dan album galeri.
  - Moderasi pesan obrolan & ucapan tamu.

### 6. 🎬 Cinematic Motion Footer
- Efek *theatrical curtain reveal* di dasar halaman beranda.
- Teks latar *parallax* `INTERNEXT`, animasi pernapasan aurora pendaran Gargantua Glow, *marquee ticker* diagonal, serta tombol magnetik (*Magnetic Buttons*).

---

## 🛠️ Tech Stack & Ekosistem

- **Framework**: [Next.js 16.3.5](https://nextjs.org/) (App Router, Turbopack)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Database & ORM**: [PostgreSQL 16](https://www.postgresql.org/) & [Prisma ORM 6](https://www.prisma.io/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS Tokens
- **Animasi & Interaktivitas**: [GSAP 3](https://greensock.com/gsap/) (`ScrollTrigger`, `Draggable`, `MotionPathPlugin`) & [Framer Motion](https://www.framer.com/motion/)
- **Ikonografi**: [Lucide React](https://lucide.dev/)
- **Containerization & Deployment**: Docker Compose & [Coolify](https://coolify.io/)

---

## 🚀 Panduan Menjalankan & Deploy

### A. Pengembangan Lokal

1. **Clone repository & install dependensi**:
   ```bash
   git clone git@github.com:Claritys11/internext-web.git
   cd webclass
   npm install
   ```

2. **Setup Environment**:
   Salin `.env.example` ke `.env`:
   ```bash
   cp .env.example .env
   ```
   Atur `DATABASE_URL` sesuai konfigurasi PostgreSQL lokal Anda (opsional, aplikasi memiliki fallback mock store otomatis):
   ```env
   DATABASE_URL="postgresql://internext:internext_secure_pwd@localhost:5432/internext_db?schema=public"
   ```

3. **Inisialisasi Prisma ORM**:
   ```bash
   npx prisma generate
   # Jika database aktif:
   # npx prisma db push
   ```

4. **Jalankan server dev**:
   ```bash
   npm run dev
   ```
   Akses di [http://localhost:3000](http://localhost:3000) atau [http://localhost:3001](http://localhost:3001).

5. **Validasi Type Safety**:
   ```bash
   npx tsc --noEmit
   ```

---

### B. Deployment ke Coolify via Docker Compose

Proyek ini telah dikonfigurasi siap pakai untuk dideploy pada platform **Coolify** menggunakan resource terpisah atau Docker Compose gabungan:

1. Buat resource baru di Coolify bertipe **Docker Compose**.
2. Masukkan file `docker-compose.yml` yang tersedia di root proyek:
   - Service `app`: Menjalankan Next.js standalone container pada port `3000`.
   - Service `postgres`: Menyediakan instance database PostgreSQL dengan volume data persisten.
3. Atur environment variables di dashboard Coolify:
   - `DATABASE_URL`: URL koneksi PostgreSQL ke container `postgres`.
   - `NODE_ENV`: `production`.
4. Klik **Deploy** — Coolify akan otomatis melakukan *build* multi-stage dan menjalankan platform.

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE) — dibangun dengan dedikasi dan bangga oleh siswa **Kelas XI Internasional SMK Telkom Malang**.

