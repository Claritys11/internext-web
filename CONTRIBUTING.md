# Panduan Kontribusi (Contributing Guidelines) — Internext

Terima kasih atas ketertarikan Anda untuk berkontribusi pada pengembangan platform digital **Internext (`internext.web.id`)**! Dokumen ini memuat panduan alur kerja (*workflow*), standar penulisan kode, dan konvensi *commit* agar repositori tetap rapi dan terkelola secara profesional.

---

## 🧭 Alur Kerja Pengembangan (Git Workflow)

1. **Fork atau Buat Branch Baru**:
   Sebelum mulai menulis kode, buat branch dari branch `main` dengan format penamaan standar:
   - `feat/nama-fitur` (untuk penambahan fitur baru)
   - `fix/deskripsi-bug` (untuk perbaikan bug atau error)
   - `docs/pembaruan-dokumentasi` (untuk pembaruan markdown/panduan)
   - `style/penyesuaian-ui` (untuk pemolesan kosmetik dan CSS)
   - `refactor/perbaikan-arsitektur` (untuk perombakan struktur kode tanpa mengubah fungsi)

   ```bash
   git checkout main
   git pull origin main
   git checkout -b feat/tambah-portofolio-baru
   ```

2. **Jalankan Secara Lokal & Uji Perubahan**:
   Pastikan kode berjalan normal di lokal tanpa error di terminal maupun di peramban:
   ```bash
   npm run dev
   ```

3. **Verifikasi Validasi Tipe & Kompilasi**:
   Wajib menjalankan kedua perintah ini sebelum melakukan commit:
   ```bash
   # 1. Pastikan tidak ada error tipe data TypeScript
   npx tsc --noEmit

   # 2. Pastikan build Next.js sukses tanpa kendala
   npm run build
   ```

---

## 📝 Konvensi Pesan Commit (Conventional Commits)

Gunakan format [Conventional Commits](https://www.conventionalcommits.org/) dalam bahasa Indonesia atau Inggris yang jelas dan ringkas:

* `feat(showcase): tambah 6 kartu karya unggulan pada studio 360`
* `fix(motion-path): perbaiki penataan layer z-index di belakang kartu`
* `docs(readme): tambahkan panduan kontribusi dan keamanan`
* `style(footer): integrasikan animasi curtain reveal pada motion-footer`
* `refactor(types): perluas union role pada entitas Member`

---

## 🎨 Standar Rekayasa Frontend

1. **TypeScript Strict Mode**:
   - Selalu berikan tipe eksplisit untuk *props*, fungsi, dan *state*.
   - Hindari penggunaan tipe `any` sebisa mungkin.

2. **Desain & Gaya Tampilan (Tailwind CSS v4)**:
   - Manfaatkan token warna resmi Internext (`#0A0F1E` Midnight Blue, `#06B6D4` Cyan, `#CCFF00` Lime Yellow, `#4F46E5` Indigo).
   - Pertahankan estetika *glassmorphism* menggunakan utilitas `.glass-card` dan *backdrop-blur*.
   - Utamakan responsivitas penuh dari layar ponsel (*mobile-first*), tablet, hingga monitor lebar (*desktop-first grid*).

3. **Animasi & Interaktivitas (GSAP)**:
   - Selalu bersihkan *timeline* atau *context* animasi dengan `gsap.context(() => {}, scope)` dan `ctx.revert()` di dalam `useEffect` agar bebas dari *memory leak*.
   - Perhatikan kinerja performa (*60fps smooth rendering*).

---

## 🚀 Mengajukan Pull Request (PR)

1. Lakukan *push* branch ke repositori:
   ```bash
   git push origin feat/tambah-portofolio-baru
   ```
2. Buka GitHub dan buat **Pull Request** ke branch `main`.
3. Jelaskan perubahan yang dilakukan:
   - Apa tujuan dari PR ini?
   - Komponen apa saja yang diubah?
   - Sertakan tangkapan layar (*screenshot*) atau rekaman singkat jika ada perubahan antarmuka pengguna (UI/UX).
4. Tunggu ulasan (*review*) dari rekan tim atau Koordinator Frontend/Tech Lead.
