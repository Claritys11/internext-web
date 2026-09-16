const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function runSeed() {
  if (!process.env.DATABASE_URL) {
    console.log("No DATABASE_URL set, skipping seed.");
    return;
  }
  console.log("🌱 Checking database state for SMK Telkom Malang XI Internasional...");

  try {
    // 1. Class Profile
    const profileCount = await prisma.classProfile.count();
    if (profileCount === 0) {
      console.log("Creating default ClassProfile in PostgreSQL...");
      await prisma.classProfile.create({
        data: {
          id: "default",
          name: "XI Internasional",
          generation: "Angkatan 2026",
          school: "SMK Telkom Malang",
          tagline: "Connected. Forward. Together.",
          description:
            "Pusat identitas, dokumentasi, komunikasi, showcase, dan portofolio kelas yang dibangun dengan standar produk digital modern.",
          homeroomTeacher: "Andree Rivan Kurniawan, M.Pd",
          classPresident: "Radisty Dhisa Aqila",
          vicePresident: "Elang Dimas Syadewa",
          memberCount: 25,
          projectCount: 24,
          achievementCount: 15,
          eventCount: 18,
          labLocation: "Ruang 34, SMK Telkom Malang, Jl. Danau Ranau, Sawojajar, Kota Malang",
          email: "contact@internext.web.id",
          instagram: "https://instagram.com/internext.class",
          github: "https://github.com/internext-class",
          youtube: "https://youtube.com/@internext",
          tiktok: "https://tiktok.com/@internext.class",
        },
      });
    }

    // 2. Chat Channels
    const channels = [
      {
        id: "apresiasi-publik",
        name: "apresiasi-publik",
        title: "Kanal Apresiasi & Buku Tamu",
        topic: "Ruang apresiasi, doa, dan motivasi bagi siswa XI Internasional SMK Telkom Malang. Bot menyambut setiap ucapan hangat!",
        badge: "Utama",
        orderIndex: 0,
      },
      {
        id: "ngobrol-santai",
        name: "ngobrol-santai",
        title: "Obrolan Santai Siswa & Tamu",
        topic: "Kanal obrolan bebas antar siswa, alumni, dan teman-teman tanpa bot. Mengalir bebas untuk berdiskusi santai!",
        badge: "Komunitas",
        orderIndex: 1,
      },
      {
        id: "tanya-pengurus",
        name: "tanya-pengurus",
        title: "Tanya & Kontak Pengurus",
        topic: "Saluran komunikasi langsung dengan ketua kelas, wali kelas, dan tim pengurus XI Internasional.",
        badge: "Resmi",
        orderIndex: 2,
      },
      {
        id: "kolaborasi-proyek",
        name: "kolaborasi-proyek",
        title: "Kolaborasi & Ide Tech",
        topic: "Eksplorasi ide aplikasi, open source, persiapan LKS, dan kerja sama teknologi bareng siswa Moklet.",
        badge: "Tech",
        orderIndex: 3,
      },
    ];

    for (const ch of channels) {
      await prisma.chatChannel.upsert({
        where: { id: ch.id },
        update: {},
        create: ch,
      });
    }

    // 3. Initial Chat Messages
    const chatCount = await prisma.chatMessage.count();
    if (chatCount === 0) {
      const initialChat = [
        {
          id: "chat-apresiasi-1",
          channelId: "apresiasi-publik",
          name: "Andree Rivan Kurniawan, M.Pd",
          role: "Guru",
          message: "Bangga melihat dedikasi dan karya hebat anak-anak XI Internasional SMK Telkom Malang. Teruslah berkarya dan jadilah engineer berintegritas tinggi!",
          timestamp: "10 Feb 2026, 10:00",
          reactions: [{ emoji: "❤️", count: 24, userReacted: false }, { emoji: "👏", count: 16, userReacted: false }],
        },
        {
          id: "chat-apresiasi-2",
          channelId: "apresiasi-publik",
          name: "Kevin Pratama, S.Kom (Alumni Moklet)",
          role: "Alumni",
          message: "Website kelasnya luar biasa keren! Nuansa dark mode dan portofolio 360-nya serasa tech startup silicon valley. Keren banget adik-adik XI Internasional!",
          timestamp: "14 Feb 2026, 14:30",
          reactions: [{ emoji: "🔥", count: 19, userReacted: false }, { emoji: "🚀", count: 11, userReacted: false }],
        },
        {
          id: "chat-santai-1",
          channelId: "ngobrol-santai",
          name: "Radisty Dhisa Aqila",
          role: "Siswa",
          message: "Halo semuanya! Selamat datang di kanal ngobrol santai XI Internasional. Di sini bebas ngobrol santai seputar projek, sharing ilmu, atau sekadar sapa-sapaan! ☕👋",
          timestamp: "Hari ini, 09:00",
          reactions: [{ emoji: "🚀", count: 8, userReacted: false }],
        },
      ];

      for (const m of initialChat) {
        await prisma.chatMessage.upsert({
          where: { id: m.id },
          update: {},
          create: m,
        });
      }
    }

    // 4. Members (25 Students)
    const memberCount = await prisma.member.count();
    if (memberCount === 0) {
      console.log("Seeding 25 students into database...");
      const students = [
        {
          id: "m-1",
          name: "Radisty Dhisa Aqila",
          nickname: "Dhisa",
          role: "Ketua Kelas",
          department: "Executive & Project Management",
          quote: "Membangun masa depan bukan tentang menunggu, tapi mengeksekusi dengan tekun.",
          bio: "Ketua kelas XI Internasional SMK Telkom Malang. Tech enthusiast dengan fokus pada Fullstack Next.js dan agile leadership.",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=faces",
          skills: ["TypeScript", "Next.js", "Team Leadership", "Product Management"],
          githubUrl: "https://github.com",
          linkedinUrl: "https://linkedin.com",
          instagramUrl: "https://instagram.com",
          isManagement: true,
          orderIndex: 1,
        },
        {
          id: "m-2",
          name: "Elang Dimas Syadewa",
          nickname: "Elang",
          role: "Wakil Ketua",
          department: "Operations & Community",
          quote: "Kreativitas dan disiplin adalah dua sisi dari koin yang sama.",
          bio: "UI/UX Designer yang berorientasi pada riset pengguna dan sistem desain inklusif. Mengkoordinasikan jalannya operasional tim.",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces",
          skills: ["Figma", "Design Systems", "User Research", "Tailwind CSS"],
          instagramUrl: "https://instagram.com",
          linkedinUrl: "https://linkedin.com",
          isManagement: true,
          orderIndex: 2,
        },
        {
          id: "m-3",
          name: "Rafi Arya Pratama",
          nickname: "Rafi",
          role: "Sekretaris",
          department: "Documentation & Content",
          quote: "Dokumentasi yang rapi adalah cerminan dari arsitektur yang kokoh.",
          bio: "Menjaga keteraturan log proyek, arsip keputusan teknis, dan manajemen konten publikasi kelas XI Internasional.",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces",
          skills: ["Technical Writing", "Markdown", "Git", "Content Strategy"],
          githubUrl: "https://github.com",
          isManagement: true,
          orderIndex: 3,
        },
        {
          id: "m-4",
          name: "Zahra Salsabila",
          nickname: "Zahra",
          role: "Bendahara",
          department: "Finance & Logistics",
          quote: "Transparansi dan ketelitian melahirkan rasa saling percaya.",
          bio: "Mengelola transparansi kas kelas, pendanaan kegiatan, dan perencanaan budget project bersama.",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces",
          skills: ["Budgeting", "Data Analysis", "Spreadsheet", "Project Estimation"],
          instagramUrl: "https://instagram.com",
          isManagement: true,
          orderIndex: 4,
        },
        {
          id: "m-5",
          name: "Bima Satria Nugraha",
          nickname: "Bima",
          role: "Divisi IT & Riset",
          department: "Frontend Engineering",
          quote: "Pixel-perfect adalah standar minimal, bukan tujuan akhir.",
          bio: "Spesialis animasi UI modern, micro-interactions, 3D WebGL, dan Web Performance Optimization.",
          avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=faces",
          skills: ["React", "Tailwind CSS", "GSAP", "Three.js"],
          githubUrl: "https://github.com",
          isManagement: true,
          orderIndex: 5,
        },
        {
          id: "m-6",
          name: "Nabila Eka Khairunnisa",
          nickname: "Nabila",
          role: "Divisi Media & Humas",
          department: "Backend & Systems",
          quote: "Arsitektur yang baik tidak terlihat sampai ada masalah.",
          bio: "Pengembang sistem backend berbasis Node.js dan PostgreSQL dengan ketertarikan tinggi pada distributed systems dan API design.",
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces",
          skills: ["NestJS", "PostgreSQL", "Docker", "REST API"],
          githubUrl: "https://github.com",
          isManagement: true,
          orderIndex: 6,
        },
        {
          id: "m-7",
          name: "Dimas Aditya Wardhana",
          nickname: "Dimas",
          role: "Anggota",
          department: "DevOps & Infrastructure",
          quote: "Automate everything, monitor continuously.",
          bio: "Fokus pada CI/CD pipelines, container orchestration, Linux systems, dan cloud deployment Coolify.",
          avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&h=400&fit=crop&crop=faces",
          skills: ["Linux", "Docker", "GitHub Actions", "Nginx"],
          githubUrl: "https://github.com",
          isManagement: false,
          orderIndex: 7,
        },
        {
          id: "m-8",
          name: "Tiara Anindya Putri",
          nickname: "Tiara",
          role: "Anggota",
          department: "UI/UX & Mobile",
          quote: "Design is not just what it looks like, it is how it works.",
          bio: "Mobile app enthusiast mengembangkan antarmuka ramah pengguna dengan Flutter dan React Native.",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=faces",
          skills: ["Flutter", "Figma", "Mobile UI", "Prototyping"],
          isManagement: false,
          orderIndex: 8,
        },
        {
          id: "m-9",
          name: "Rizky Pratama Putra",
          nickname: "Rizky",
          role: "Anggota",
          department: "Cyber Security & Networks",
          quote: "Security is a process, not a product.",
          bio: "Mendalami network pentesting, secure coding, dan implementasi zero-trust security.",
          avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces",
          skills: ["Network Security", "Linux", "Python", "Wireshark"],
          isManagement: false,
          orderIndex: 9,
        },
        {
          id: "m-10",
          name: "Salsabila Maharani",
          nickname: "Salsa",
          role: "Anggota",
          department: "Data Science & AI",
          quote: "In God we trust, all others must bring data.",
          bio: "Mengeksplorasi LLM, machine learning, dan visualisasi data interaktif untuk problem solving sekolah.",
          avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop&crop=faces",
          skills: ["Python", "Pandas", "Scikit-Learn", "FastAPI"],
          isManagement: false,
          orderIndex: 10,
        },
        {
          id: "m-11",
          name: "Arya Wijaya Kusuma",
          nickname: "Arya",
          role: "Anggota",
          department: "Game Development & 3D",
          quote: "Games are the interactive canvas of modern imagination.",
          bio: "Spesialis gameplay programming di Godot dan Unity serta modeling asset 3D di Blender.",
          avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=faces",
          skills: ["Godot", "C#", "Blender", "Shaders"],
          isManagement: false,
          orderIndex: 11,
        },
        {
          id: "m-12",
          name: "Jessica Evelyn Tan",
          nickname: "Jessica",
          role: "Anggota",
          department: "Fullstack Web",
          quote: "Ship early, iterate fast, listen to users.",
          bio: "Pengembang solusi web berbasis TypeScript, Tailwind, dan Next.js dengan fokus pada clean architecture.",
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces",
          skills: ["React", "TypeScript", "Prisma", "PostgreSQL"],
          isManagement: false,
          orderIndex: 12,
        },
        {
          id: "m-13",
          name: "Muhammad Fadhil",
          nickname: "Fadhil",
          role: "Anggota",
          department: "Embedded Systems & IoT",
          quote: "Connecting the physical and digital world seamlessly.",
          bio: "Menghubungkan mikrokontroler ESP32, sensor cerdas, dan dashboard analitik berbasis cloud.",
          avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop&crop=faces",
          skills: ["C++", "ESP32", "MQTT", "Arduino"],
          isManagement: false,
          orderIndex: 13,
        },
        {
          id: "m-14",
          name: "Amanda Kirana",
          nickname: "Amanda",
          role: "Anggota",
          department: "Creative Design & Motion",
          quote: "Great design makes the complex feel effortlessly simple.",
          bio: "Menciptakan motion graphic, teaser video kegiatan, dan visual branding kelas.",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=faces",
          skills: ["After Effects", "Illustrator", "Motion Graphic", "Branding"],
          isManagement: false,
          orderIndex: 14,
        },
        {
          id: "m-15",
          name: "Bagas Putra Perkasa",
          nickname: "Bagas",
          role: "Anggota",
          department: "Backend & Microservices",
          quote: "Scalability begins at the first line of code.",
          bio: "Membangun microservices tangguh dengan Go dan Redis untuk high-throughput handling.",
          avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces",
          skills: ["Golang", "Redis", "Docker", "PostgreSQL"],
          isManagement: false,
          orderIndex: 15,
        },
        {
          id: "m-16",
          name: "Clarissa Aurelia",
          nickname: "Clarissa",
          role: "Anggota",
          department: "Product Research & Strategy",
          quote: "Fall in love with the problem, not the solution.",
          bio: "Riset kebutuhan siswa dan merancang alur pengalaman digital terintegrasi di lingkungan sekolah.",
          avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop&crop=faces",
          skills: ["Product Management", "User Journey", "Analytics", "Wireframing"],
          isManagement: false,
          orderIndex: 16,
        },
        {
          id: "m-17",
          name: "Daffa Al-Ghifari",
          nickname: "Daffa",
          role: "Anggota",
          department: "QA & Automated Testing",
          quote: "Quality is not an act, it is a habit.",
          bio: "Membangun unit testing, end-to-end testing di Playwright, dan standardisasi kualitas kode tim.",
          avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=faces",
          skills: ["Playwright", "Jest", "CI Testing", "Debugging"],
          isManagement: false,
          orderIndex: 17,
        },
        {
          id: "m-18",
          name: "Ezza Novalino",
          nickname: "Ezza",
          role: "Anggota",
          department: "Cloud Architecture",
          quote: "Resilience over perfection in modern architecture.",
          bio: "Eksplorasi cloud providers, serverless computing, dan arsitektur database modern.",
          avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop&crop=faces",
          skills: ["AWS", "Terraform", "Serverless", "PostgreSQL"],
          isManagement: false,
          orderIndex: 18,
        },
        {
          id: "m-19",
          name: "Farhan Maulana",
          nickname: "Farhan",
          role: "Anggota",
          department: "Frontend & Performance",
          quote: "Speed is the best feature any application can have.",
          bio: "Fokus pada optimasi Core Web Vitals, SSR caching, dan rendering arsitektur Next.js.",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces",
          skills: ["Next.js", "Lighthouse", "TypeScript", "Performance"],
          isManagement: false,
          orderIndex: 19,
        },
        {
          id: "m-20",
          name: "Gita Permata",
          nickname: "Gita",
          role: "Anggota",
          department: "Technical Writing & Branding",
          quote: "Code without words is a story without a voice.",
          bio: "Menyusun dokumentasi API yang jelas, blog teknis, dan rilis warta kegiatan kelas.",
          avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=faces",
          skills: ["Tech Writing", "Copywriting", "SEO", "Markdown"],
          isManagement: false,
          orderIndex: 20,
        },
        {
          id: "m-21",
          name: "Haikal Rasyid",
          nickname: "Haikal",
          role: "Anggota",
          department: "Mobile Engineering",
          quote: "Every tap should feel instant and delightful.",
          bio: "Pengembang aplikasi multiplatform berorientasi performa tinggi dan animasi transisi halus.",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces",
          skills: ["Flutter", "Dart", "Firebase", "State Management"],
          isManagement: false,
          orderIndex: 21,
        },
        {
          id: "m-22",
          name: "Indah Cahyani",
          nickname: "Indah",
          role: "Anggota",
          department: "UI Interaction Design",
          quote: "Micro-interactions turn software into magic.",
          bio: "Merancang gesture animations, scroll reveals, dan glassmorphism components.",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces",
          skills: ["Figma", "CSS Animations", "Framer Motion", "Design"],
          isManagement: false,
          orderIndex: 22,
        },
        {
          id: "m-23",
          name: "Jonathan Adrian",
          nickname: "Jonathan",
          role: "Anggota",
          department: "System Administration",
          quote: "Uptime is not just a metric, it is our pride.",
          bio: "Pengelolaan server homelab sekolah, reverse proxy Nginx, dan backup otomatis berkala.",
          avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&h=400&fit=crop&crop=faces",
          skills: ["Linux Server", "Nginx", "Bash", "Networking"],
          isManagement: false,
          orderIndex: 23,
        },
        {
          id: "m-24",
          name: "Karina Larasati",
          nickname: "Karina",
          role: "Anggota",
          department: "Emerging Tech & Web3",
          quote: "Decentralized systems empower the next generation.",
          bio: "Riset smart contracts, decentralized identity, dan integrasi wallet authentication.",
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces",
          skills: ["Solidity", "Ethers.js", "Web3", "JavaScript"],
          isManagement: false,
          orderIndex: 24,
        },
        {
          id: "m-25",
          name: "Kevin Sanjaya",
          nickname: "Kevin",
          role: "Anggota",
          department: "Fullstack Engineering",
          quote: "Write code that the next engineer will love to read.",
          bio: "Membangun sistem integrasi backend-frontend modern dengan Next.js App Router dan GraphQL/REST.",
          avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces",
          skills: ["Node.js", "React", "PostgreSQL", "Tailwind CSS"],
          isManagement: false,
          orderIndex: 25,
        },
      ];

      for (const s of students) {
        await prisma.member.upsert({
          where: { id: s.id },
          update: {},
          create: s,
        });
      }
    }

    // 5. Projects
    const projectCount = await prisma.project.count();
    if (projectCount === 0) {
      console.log("Seeding initial projects...");
      const projects = [
        {
          id: "p-1",
          title: "Simas — Smart Attendance Hub",
          slug: "simas-smart-attendance",
          tagline: "Platform presensi kelas berbasis geolokasi & QR token terenkripsi.",
          description: "Sistem presensi terpusat yang memudahkan wali kelas dan siswa mencatat kehadiran secara real-time dengan validasi radius GPS sekolah dan rotasi token otomatis setiap 30 detik.",
          category: "Web App",
          thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
          screenshots: [],
          techStack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
          team: ["Radisty Dhisa Aqila", "Nabila Eka Khairunnisa"],
          featured: true,
          likes: 42,
          year: 2025,
          demoUrl: "https://internext.web.id/projects",
          githubUrl: "https://github.com",
        },
        {
          id: "p-2",
          title: "EduQuest — Interactive Learning LMS",
          slug: "eduquest-learning-lms",
          tagline: "Gamified learning management system untuk tugas dan kuis harian.",
          description: "Platform belajar interaktif yang mengintegrasikan leaderboard, achievement badges, dan modul latihan soal untuk meningkatkan partisipasi belajar kelompok di kelas.",
          category: "Web App",
          thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop",
          screenshots: [],
          techStack: ["React", "TypeScript", "Node.js", "Tailwind CSS"],
          team: ["Bima Satria Nugraha", "Elang Dimas Syadewa"],
          featured: true,
          likes: 38,
          year: 2025,
          demoUrl: "https://internext.web.id/projects",
          githubUrl: "https://github.com",
        },
        {
          id: "p-3",
          title: "HydroSense — IoT Smart Farming",
          slug: "hydrosense-iot-smart-farming",
          tagline: "Pemantauan nutrisi hidroponik dan pH air berbasis sensor ESP32.",
          description: "Solusi otomatisasi kebun hidroponik sekolah dengan telemetry dashboard yang menampilkan metrik suhu air, PPM nutrisi, dan level cairan secara visual.",
          category: "IoT / Hardware",
          thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop",
          screenshots: [],
          techStack: ["ESP32", "C++", "MQTT", "Next.js Dashboard"],
          team: ["Dimas Aditya Wardhana", "Muhammad Fadhil"],
          featured: true,
          likes: 56,
          year: 2025,
          demoUrl: "https://internext.web.id/projects",
          githubUrl: "https://github.com",
        },
        {
          id: "p-4",
          title: "EcoSort — AI Waste Identifier",
          slug: "ecosort-ai-waste-identifier",
          tagline: "Deteksi klasifikasi sampah otomatis menggunakan Computer Vision.",
          description: "Aplikasi cerdas untuk membantu pemilahan sampah anorganik dan organik di lingkungan sekolah dengan model klasifikasi gambar TensorFlow Lite.",
          category: "AI / Machine Learning",
          thumbnail: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=500&fit=crop",
          screenshots: [],
          techStack: ["Python", "TensorFlow", "FastAPI", "React Native"],
          team: ["Salsabila Maharani", "Rizky Pratama Putra"],
          featured: true,
          likes: 47,
          year: 2025,
          demoUrl: "https://internext.web.id/projects",
          githubUrl: "https://github.com",
        },
      ];

      for (const p of projects) {
        await prisma.project.upsert({
          where: { slug: p.slug },
          update: {},
          create: p,
        });
      }
    }

    // 6. Articles
    const articleCount = await prisma.article.count();
    if (articleCount === 0) {
      console.log("Seeding initial articles...");
      const articles = [
        {
          id: "a-1",
          title: "Juara 1 LKS Bidang Web Technologies: Dedikasi & Kolaborasi Tim",
          slug: "juara-1-lks-web-technologies",
          summary: "Perjalanan intensif perwakilan kelas dalam kompetisi keahlian tingkat provinsi hingga meraih podium tertinggi.",
          content: "Keberhasilan ini merupakan buah dari persiapan panjang selama enam bulan. Tim mendedikasikan waktu sepulang sekolah untuk memperdalam arsitektur web modern, optimasi performa, dan implementasi automated testing.\n\nDukungan penuh dari wali kelas dan teman-teman sekelas menjadi pilar moral terpenting di setiap tahap kompetisi.",
          category: "Prestasi",
          authorName: "Rafi Arya Pratama",
          authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
          authorRole: "Sekretaris & Editor",
          date: "2025-11-20",
          coverImage: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=1000&h=600&fit=crop",
          isPinned: true,
          readTime: "3 menit baca",
          tags: ["LKS", "Juara", "Web Tech", "Prestasi"],
        },
        {
          id: "a-2",
          title: "Kunjungan Industri & Tech Talk di Silicon Valley Jakarta Hub",
          slug: "kunjungan-industri-tech-talk-jakarta",
          summary: "Eksplorasi langsung kultur kerja tech unicorn, mendalami standar clean code dan observability bersama para senior software engineers.",
          content: "Rombongan kelas Internext berkesempatan melakukan kunjungan industri edukatif ke salah satu pusat inovasi teknologi terkemuka di Jakarta. Kegiatan ini bertujuan memperluas wawasan siswa terhadap lanskap industri perangkat lunak modern.\n\nSiswa diajak memahami pipeline deployment modern, monitoring microservices, dan berdiskusi langsung dengan tech leads mengenai jalur karier di bidang software engineering.",
          category: "Event",
          authorName: "Radisty Dhisa Aqila",
          authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces",
          authorRole: "Ketua Kelas",
          date: "2025-10-12",
          coverImage: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1000&h=600&fit=crop",
          isPinned: false,
          readTime: "4 menit baca",
          tags: ["TechTalk", "Industri", "Edukasi"],
        },
        {
          id: "a-3",
          title: "Peluncuran Portal Resmi Internext.web.id Menuju Era Baru",
          slug: "peluncuran-portal-resmi-internext",
          summary: "Website resmi kelas resmi diluncurkan sebagai pusat identitas, dokumentasi kegiatan, dan showcase karya siswa berstandar industri.",
          content: "Setelah melalui proses perencanaan dan pengembangan bertahap, portal digital internext.web.id kini resmi beroperasi. Website ini dirancang sebagai wadah jangka panjang yang merekam seluruh perjalanan kelas.\n\nSetiap siswa memiliki profil pribadi, ruang showcase portofolio, dan dokumentasi momen yang dapat diakses oleh publik, guru, dan para alumni.",
          category: "Pengumuman",
          authorName: "Elang Dimas Syadewa",
          authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
          authorRole: "Wakil Ketua",
          date: "2025-09-01",
          coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1000&h=600&fit=crop",
          isPinned: false,
          readTime: "2 menit baca",
          tags: ["Peluncuran", "Portal", "Internext"],
        },
      ];

      for (const a of articles) {
        await prisma.article.upsert({
          where: { slug: a.slug },
          update: {},
          create: a,
        });
      }
    }

    // 7. Events
    const eventCount = await prisma.event.count();
    if (eventCount === 0) {
      console.log("Seeding initial events...");
      const events = [
        {
          id: "e-1",
          title: "Bootcamp Web Architecture & UI/UX Moklet 2026",
          description: "Sesi intensif pematangan arsitektur web modern, design token, dan integrasi API bagi seluruh siswa XI Internasional SMK Telkom Malang.",
          date: "2026-08-28T08:00:00+07:00",
          location: "Laboratorium Komputer 3, SMK Telkom Malang",
          committee: "Divisi IT & Riset Internext",
          category: "Akademik",
          status: "completed",
          countdownTarget: "2026-08-28T08:00:00+07:00",
          coverImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1000&h=600&fit=crop",
        },
        {
          id: "e-2",
          title: "Sprint Showcase & Review Portofolio Digital Kelas",
          description: "Agenda sinkronisasi karya 25 siswa, presentasi fitur showcase 360°, dan evaluasi kesiapan rilis platform digital angkatan bersama wali kelas.",
          date: "2026-09-16T09:00:00+07:00",
          location: "Ruang 34, SMK Telkom Malang",
          committee: "Pengurus Harian & Nahkoda Kelas",
          category: "Akademik",
          status: "ongoing",
          countdownTarget: "2026-09-16T09:00:00+07:00",
          coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&h=600&fit=crop",
        },
        {
          id: "e-3",
          title: "Moklet International Coding Camp & Hackathon",
          description: "Kompetisi hackathon dan kolaborasi lintas minat merancang solusi perangkat lunak berbasis AI dan IoT berstandar industri internasional.",
          date: "2026-10-12T08:30:00+07:00",
          location: "Auditorium Utama & Cloud Lab, SMK Telkom Malang",
          committee: "Tim Kolaborasi & Event Sekolah",
          category: "Akademik",
          status: "upcoming",
          countdownTarget: "2026-10-12T08:30:00+07:00",
          coverImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1000&h=600&fit=crop",
        },
        {
          id: "e-4",
          title: "Internext Tech Expo & Final Showcase 2026",
          description: "Pameran akbar karya inovasi teknologi kelas XI Internasional yang dihadiri oleh praktisi industri teknologi, alumni, dan dewan guru.",
          date: "2026-11-20T08:30:00+07:00",
          location: "Auditorium Utama Kampus Digital",
          committee: "Divisi Project & Event Internext",
          category: "Akademik",
          status: "upcoming",
          countdownTarget: "2026-11-20T08:30:00+07:00",
          coverImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1000&h=600&fit=crop",
        },
      ];

      for (const ev of events) {
        await prisma.event.upsert({
          where: { id: ev.id },
          update: {},
          create: ev,
        });
      }
    }

    // 8. Gallery
    const galleryCount = await prisma.gallery.count();
    if (galleryCount === 0) {
      console.log("Seeding initial gallery...");
      const gallery = [
        {
          id: "g-1",
          title: "Sesi Diskusi Arsitektur Sistem Bersama Wali Kelas",
          type: "photo",
          url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=800&fit=crop",
          thumbnail: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&h=500&fit=crop",
          album: "Kegiatan",
          date: "Sep 2026",
          photographer: "Dokumentasi Kelas",
          caption: "Pematangan arsitektur dan pembagian peran proyek angkatan di Ruang 34.",
          likes: 31,
        },
        {
          id: "g-2",
          title: "Hackathon Internal: Coding Sprint 24 Jam",
          type: "photo",
          url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=800&fit=crop",
          thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=500&fit=crop",
          album: "Kompetisi",
          date: "Agu 2026",
          photographer: "Dokumentasi Kelas",
          caption: "Antusiasme siswa merancang prototipe aplikasi cerdas.",
          likes: 45,
        },
      ];

      for (const g of gallery) {
        await prisma.gallery.upsert({
          where: { id: g.id },
          update: {},
          create: g,
        });
      }
    }

    console.log("✅ Seed runner finished successfully!");
  } catch (err) {
    console.error("Seed runner error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

runSeed();
