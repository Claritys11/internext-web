# Kebijakan Keamanan (Security Policy) — Internext

Keamanan platform web **Internext (`internext.web.id`)** dan perlindungan privasi data seluruh siswa/anggota kelas merupakan prioritas fundamental kami.

---

## 🛡️ Versi yang Didukung

Pembaruan keamanan aktif secara teratur diterapkan pada branch utama (`main`):

| Versi | Didukung Keamanan | Catatan |
| :--- | :---: | :--- |
| `v0.1.x` (Main Branch) | ✅ Ya | Versi aktif pengembangan kelas |
| Versi lawas / cadangan | ❌ Tidak | Silakan mutakhirkan ke branch `main` |

---

## 🔒 Praktik Keamanan Utama dalam Repositori

1. **Larangan Keras Menyimpan Kunci Rahasia (*Secrets*)**:
   - Dilarang keras melakukan *commit* terhadap file lingkungan (`.env`, `.env.local`), kunci API (*API keys*), token otentikasi, atau kredensial basis data ke dalam repositori publik.
   - Gunakan file template `.env.example` untuk mendokumentasikan variabel yang dibutuhkan tanpa nilai aslinya.

2. **Sanitasi Data Masukan Pengguna (*Input Sanitization*)**:
   - Seluruh data yang dimasukkan melalui formulir publik (seperti Buku Tamu Digital / Contact Form) harus divalidasi dan disanitasi sebelum diproses guna mencegah serangan *Cross-Site Scripting (XSS)* atau *injection*.

3. **Audit Dependensi Rutin**:
   - Kami secara berkala menjalankan `npm audit` untuk memastikan pustaka pihak ketiga bebas dari kerentanan (*CVE*).

---

## 🚨 Melaporkan Kerentanan Keamanan

Jika Anda menemukan celah keamanan, bug kritis, atau kebocoran data pada platform ini:

1. **JANGAN membuka Issue publik di GitHub** untuk masalah keamanan yang belum diperbaiki.
2. Laporkan secara privat dan langsung melalui email:
   - **Email Keamanan**: `security@internext.web.id`
   - **Alternatif**: Hubungi Lead Engineer / Tim Pengurus Kelas melalui kanal komunikasi internal kelas.
3. Sertakan informasi berikut dalam laporan:
   - Deskripsi singkat mengenai celah yang ditemukan.
   - Langkah-langkah untuk mereproduksi masalah (*proof of concept*).
   - Saran perbaikan (bila ada).

Kami berkomitmen untuk meninjau laporan keamanan dalam waktu **1x24 jam** dan segera merilis perbaikan (*patch*). Terima kasih telah membantu menjaga keamanan ekosistem digital Internext!
