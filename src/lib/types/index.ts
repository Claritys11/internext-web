export interface Member {
  id: string;
  name: string;
  nickname: string;
  role: "Ketua Kelas" | "Wakil Ketua" | "Sekretaris" | "Bendahara" | "Seksi" | "Anggota" | "Divisi IT & Riset" | "Divisi Media & Humas" | string;
  department?: string;
  quote: string;
  bio: string;
  avatar: string;
  skills: string[];
  portfolioUrl?: string;
  githubUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  isManagement: boolean;
  isAlumni?: boolean;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  category: "Web App" | "Mobile App" | "UI/UX" | "IoT / Hardware" | "Game / AI";
  thumbnail: string;
  screenshots?: string[];
  demoUrl?: string;
  githubUrl?: string;
  techStack: string[];
  team: string[];
  featured: boolean;
  likes: number;
  year: number;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: "Akademik" | "Event" | "Prestasi" | "Sosial" | "Pengumuman";
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  date: string;
  coverImage: string;
  isPinned?: boolean;
  readTime: string;
  tags: string[];
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  location: string;
  committee: string;
  category: "Akademik" | "Sosial" | "Olahraga" | "Seni" | "Nasional";
  status: "upcoming" | "ongoing" | "completed";
  countdownTarget?: string;
  coverImage: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  type: "photo" | "video";
  url: string;
  thumbnail: string;
  album: string;
  date: string;
  photographer: string;
  caption: string;
  likes: number;
}

export interface Achievement {
  id: string;
  title: string;
  eventName: string;
  recipient: string;
  level: "Sekolah" | "Kota" | "Provinsi" | "Nasional" | "Internasional";
  rank: string;
  year: number;
  certificateUrl?: string;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  role: "Siswa" | "Alumni" | "Guru" | "Umum";
  message: string;
  createdAt: string;
  approved: boolean;
}
