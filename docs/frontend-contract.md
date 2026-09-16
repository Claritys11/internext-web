# Internext (internext.web.id) — Frontend to Backend API Contract

> **Target Audience**: Hermes / NestJS Backend Engineering Team  
> **Author**: Frontend Lead / UI Engineer  
> **Status**: Ready for Implementation  
> **Base URL Target**: `http://localhost:4000/api/v1` (or VPS reverse proxy domain)

---

## 1. Authentication & Security Expectations
- **Auth Strategy**: JWT Bearer Token (`Authorization: Bearer <access_token>`).
- **Roles**: `admin` | `editor` | `member` | `public`.
- **Protected Endpoints**:
  - `POST /api/v1/articles` (admin/editor)
  - `PUT /api/v1/articles/:id` (admin/editor)
  - `DELETE /api/v1/articles/:id` (admin)
  - `POST /api/v1/projects` (admin/editor)
  - `PATCH /api/v1/guestbook/:id/status` (admin)
- **CORS**: Must permit `https://internext.web.id`, `http://localhost:3500`, and `http://localhost:3000`.

---

## 2. API Endpoints Specification

### A. Members (`/api/v1/members`)
#### `GET /api/v1/members`
- **Query Params**: `?role=management|member|all&search=<query>`
- **Response**: `200 OK`
```json
[
  {
    "id": "m-1",
    "name": "Fakhri Ramadhan",
    "nickname": "Fakhri",
    "role": "Ketua Kelas",
    "department": "Executive & Project Management",
    "quote": "Membangun masa depan bukan tentang menunggu, tapi mengeksekusi.",
    "bio": "Tech enthusiast yang berfokus pada Fullstack Development...",
    "avatar": "https://...",
    "skills": ["TypeScript", "Next.js", "Team Leadership"],
    "githubUrl": "https://github.com",
    "linkedinUrl": "https://linkedin.com",
    "instagramUrl": "https://instagram.com",
    "isManagement": true,
    "isAlumni": false
  }
]
```

---

### B. Projects (`/api/v1/projects`)
#### `GET /api/v1/projects`
- **Query Params**: `?category=Web App|Mobile App|IoT / Hardware|Game / AI|UI/UX&featured=true`
- **Response**: `200 OK`
```json
[
  {
    "id": "p-1",
    "title": "Simas — Smart Attendance Hub",
    "slug": "simas-smart-attendance",
    "tagline": "Platform presensi kelas berbasis geolokasi & QR token terenkripsi.",
    "description": "Sistem presensi terpusat...",
    "category": "Web App",
    "thumbnail": "https://...",
    "techStack": ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    "team": ["Fakhri Ramadhan", "Nabila Eka Khairunnisa"],
    "featured": true,
    "likes": 42,
    "year": 2025,
    "demoUrl": "https://...",
    "githubUrl": "https://..."
  }
]
```

#### `POST /api/v1/projects/:id/like`
- **Response**: `200 OK` `{ "likes": 43 }`

---

### C. Articles & News (`/api/v1/articles`)
#### `GET /api/v1/articles`
- **Query Params**: `?category=Prestasi|Event|Akademik|Pengumuman&page=1&limit=10`
- **Response**: `200 OK`
```json
[
  {
    "id": "a-1",
    "title": "Juara 1 Lomba Kompetensi Siswa (LKS) Web Technologies 2025",
    "slug": "juara-1-lks-web-technologies-2025",
    "summary": "Perwakilan kelas berhasil meraih medali emas...",
    "content": "Rich text markdown or HTML string...",
    "category": "Prestasi",
    "author": {
      "name": "Rafi Arya Pratama",
      "avatar": "https://...",
      "role": "Sekretaris & Editor"
    },
    "date": "2025-11-20T00:00:00.000Z",
    "coverImage": "https://...",
    "isPinned": true,
    "readTime": "3 menit",
    "tags": ["LKS", "Juara", "Web Tech"]
  }
]
```

---

### D. Events & Timeline (`/api/v1/events`)
#### `GET /api/v1/events`
- **Response**: `200 OK`
```json
[
  {
    "id": "e-1",
    "title": "Internext Tech Expo & Final Showcase 2026",
    "description": "Pameran karya digital akhir angkatan...",
    "date": "2026-05-18T08:30:00+07:00",
    "location": "Auditorium Utama Kampus Digital",
    "committee": "Divisi Project & Event Internext",
    "category": "Akademik",
    "status": "upcoming",
    "countdownTarget": "2026-05-18T08:30:00+07:00",
    "coverImage": "https://..."
  }
]
```

---

### E. Guestbook (`/api/v1/guestbook`)
#### `GET /api/v1/guestbook`
- **Query Params**: `?approved=true`
- **Response**: `200 OK` array of guestbook entries.

#### `POST /api/v1/guestbook`
- **Body**:
```json
{
  "name": "Budi Santoso",
  "role": "Alumni",
  "message": "Keren sekali website angkatannya!"
}
```
- **Response**: `201 Created`
```json
{
  "id": "gb-1718000000",
  "name": "Budi Santoso",
  "role": "Alumni",
  "message": "Keren sekali website angkatannya!",
  "createdAt": "2026-09-16T00:30:00.000Z",
  "approved": true
}
```

---

## 3. Standard Error Envelope
All error responses from NestJS should adhere to standard RFC 7807 problem details:
```json
{
  "statusCode": 400,
  "message": "Validation failed: 'email' must be an email address",
  "error": "Bad Request",
  "timestamp": "2026-09-16T00:30:00.000Z"
}
```
