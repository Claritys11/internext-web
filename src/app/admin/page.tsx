"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  FileText,
  Users,
  Code2,
  Calendar,
  Camera,
  MessageSquare,
  ShieldCheck,
  Plus,
  Trash2,
  Edit,
  Save,
  Check,
  ExternalLink,
  Search,
  RefreshCw,
  School,
  GraduationCap,
  Star,
  Send,
  ArrowLeft,
  X,
  Sliders,
  Sparkles,
  LogOut,
} from "lucide-react";
import {
  ClassProfile,
  Member,
  Project,
  Article,
  EventItem,
  GalleryItem,
  ChatMessage,
  ChatChannel,
} from "@/lib/types";
import { ImageUploadInput } from "@/components/ui/ImageUploadInput";
import { AuthPage } from "@/components/ui/auth-page";

type AdminTab =
  | "overview"
  | "profile"
  | "members"
  | "projects"
  | "articles"
  | "events"
  | "gallery"
  | "chat";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Core Data States
  const [profile, setProfile] = useState<ClassProfile | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [channels, setChannels] = useState<ChatChannel[]>([]);
  const [selectedChatChannel, setSelectedChatChannel] = useState<string>("apresiasi-publik");

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [memberRoleFilter, setMemberRoleFilter] = useState<"all" | "management" | "member">("all");

  // Profile Form State
  const [profileForm, setProfileForm] = useState<ClassProfile | null>(null);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Modal States
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);

  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  const [newGalleryForm, setNewGalleryForm] = useState<{
    title: string;
    album: string;
    url: string;
    caption: string;
  }>({
    title: "",
    album: "Kegiatan",
    url: "",
    caption: "Dokumentasi kegiatan siswa XI Internasional.",
  });
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

  // Admin Broadcast Chat State
  const [broadcastName, setBroadcastName] = useState("Admin Kelas");
  const [broadcastRole, setBroadcastRole] = useState<"Admin" | "Guru" | "Siswa">("Admin");
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [isSendingBroadcast, setIsSendingBroadcast] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Fetch all initial data
  const loadAllData = async () => {
    setRefreshing(true);
    try {
      const [
        profileRes,
        membersRes,
        projectsRes,
        articlesRes,
        eventsRes,
        galleryRes,
        chatRes,
      ] = await Promise.all([
        fetch("/api/profile"),
        fetch("/api/members"),
        fetch("/api/projects"),
        fetch("/api/articles"),
        fetch("/api/events"),
        fetch("/api/gallery"),
        fetch("/api/chat"),
      ]);

      if (profileRes.ok) {
        const pData = await profileRes.json();
        setProfile(pData);
        setProfileForm(pData);
      }
      if (membersRes.ok) setMembers(await membersRes.json());
      if (projectsRes.ok) setProjects(await projectsRes.json());
      if (articlesRes.ok) setArticles(await articlesRes.json());
      if (eventsRes.ok) setEvents(await eventsRes.json());
      if (galleryRes.ok) setGallery(await galleryRes.json());
      if (chatRes.ok) {
        const cData = await chatRes.json();
        setMessages(cData.messages || []);
        setChannels(cData.channels || []);
      }
    } catch (err) {
      console.error("Failed to load admin data:", err);
      showToast("Gagal memuat data dari API. Memakai data cadangan.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const checkAuthAndLoad = async () => {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if (data.authenticated) {
        setIsAuthenticated(true);
        loadAllData();
      } else {
        setIsAuthenticated(false);
        setLoading(false);
      }
    } catch {
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthAndLoad();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      setIsAuthenticated(false);
      showToast("Berhasil keluar dari Portal Admin.");
    }
  };

  // 1. PROFILE HANDLER
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileForm) return;
    setIsSavingProfile(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileForm),
      });
      if (res.ok) {
        const updated = await res.json();
        setProfile(updated);
        setProfileForm(updated);
        showToast("Profil kelas SMK Telkom Malang berhasil diperbarui!");
      } else {
        throw new Error("Gagal menyimpan profil");
      }
    } catch (err: any) {
      showToast(err.message || "Terjadi kesalahan saat menyimpan profil.");
    } finally {
      setIsSavingProfile(false);
    }
  };

  // 2. MEMBER HANDLERS
  const handleOpenNewMember = () => {
    setEditingMember({
      id: "",
      name: "",
      nickname: "",
      role: "Software Engineer",
      bio: "Siswa bersemangat dalam pengembangan web dan teknologi digital.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
      quote: "Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.",
      skills: ["Next.js", "TypeScript", "Tailwind CSS"],
      isManagement: false,
      instagramUrl: "https://instagram.com",
      githubUrl: "https://github.com",
    });
    setIsMemberModalOpen(true);
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;
    try {
      const isNew = !editingMember.id;
      const url = isNew ? "/api/members" : `/api/members/${editingMember.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingMember),
      });

      if (res.ok) {
        const saved = await res.json();
        if (isNew) {
          setMembers((prev) => [saved, ...prev]);
          showToast(`Siswa ${saved.name} berhasil ditambahkan!`);
        } else {
          setMembers((prev) => prev.map((m) => (m.id === saved.id ? saved : m)));
          showToast(`Data ${saved.name} berhasil diperbarui!`);
        }
        setIsMemberModalOpen(false);
      }
    } catch (err) {
      showToast("Gagal menyimpan data anggota.");
    }
  };

  const handleDeleteMember = async (id: string, name: string) => {
    if (!confirm(`Hapus siswa ${name} dari daftar anggota?`)) return;
    try {
      const res = await fetch(`/api/members/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMembers((prev) => prev.filter((m) => m.id !== id));
        showToast(`Siswa ${name} telah dihapus.`);
      }
    } catch (err) {
      showToast("Gagal menghapus anggota.");
    }
  };

  // 3. PROJECT HANDLERS
  const handleOpenNewProject = () => {
    setEditingProject({
      id: "",
      title: "",
      slug: `proyek-${Date.now()}`,
      tagline: "",
      description: "",
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
      category: "Web App",
      techStack: ["Next.js", "TypeScript", "PostgreSQL"],
      team: ["Fakhri Ramadhan", "Alya Izzah"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: true,
      likes: 35,
      year: 2026,
    });
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    try {
      const isNew = !editingProject.id;
      const url = isNew ? "/api/projects" : `/api/projects/${editingProject.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProject),
      });

      if (res.ok) {
        const saved = await res.json();
        if (isNew) {
          setProjects((prev) => [saved, ...prev]);
          showToast(`Proyek ${saved.title} berhasil ditambahkan!`);
        } else {
          setProjects((prev) => prev.map((p) => (p.id === saved.id ? saved : p)));
          showToast(`Proyek ${saved.title} berhasil diperbarui!`);
        }
        setIsProjectModalOpen(false);
      }
    } catch (err) {
      showToast("Gagal menyimpan proyek.");
    }
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (!confirm(`Hapus proyek "${title}"?`)) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        showToast(`Proyek "${title}" telah dihapus.`);
      }
    } catch (err) {
      showToast("Gagal menghapus proyek.");
    }
  };

  // 4. ARTICLE HANDLERS
  const handleOpenNewArticle = () => {
    setEditingArticle({
      id: "",
      title: "",
      slug: `artikel-${Date.now()}`,
      summary: "",
      content: "",
      category: "Prestasi",
      coverImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=500&fit=crop",
      date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
      author: {
        name: profileForm?.homeroomTeacher || "Hendra Kusuma",
        role: "Wali Kelas & Pembina",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      },
      readTime: "4 min baca",
      tags: ["SMK Telkom Malang", "XI Internasional"],
    });
    setIsArticleModalOpen(true);
  };

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;
    try {
      const isNew = !editingArticle.id;
      const url = isNew ? "/api/articles" : `/api/articles/${editingArticle.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingArticle),
      });

      if (res.ok) {
        const saved = await res.json();
        if (isNew) {
          setArticles((prev) => [saved, ...prev]);
          showToast(`Artikel "${saved.title}" berhasil dipublikasikan!`);
        } else {
          setArticles((prev) => prev.map((a) => (a.id === saved.id ? saved : a)));
          showToast(`Artikel "${saved.title}" berhasil diperbarui!`);
        }
        setIsArticleModalOpen(false);
      }
    } catch (err) {
      showToast("Gagal menyimpan artikel.");
    }
  };

  const handleDeleteArticle = async (id: string, title: string) => {
    if (!confirm(`Hapus artikel "${title}"?`)) return;
    try {
      const res = await fetch(`/api/articles/${id}`, { method: "DELETE" });
      if (res.ok) {
        setArticles((prev) => prev.filter((a) => a.id !== id));
        showToast(`Artikel "${title}" telah dihapus.`);
      }
    } catch (err) {
      showToast("Gagal menghapus artikel.");
    }
  };

  // 5. EVENT HANDLERS
  const handleOpenNewEvent = () => {
    setEditingEvent({
      id: "",
      title: "",
      date: "28 Feb 2026",
      location: "Aula Graha Moklet, SMK Telkom Malang",
      category: "Akademik",
      description: "Deskripsi agenda kegiatan siswa XI Internasional.",
      status: "upcoming",
      committee: "Pengurus Kelas",
      coverImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=500&fit=crop",
    });
    setIsEventModalOpen(true);
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;
    try {
      const isNew = !editingEvent.id;
      const url = isNew ? "/api/events" : `/api/events/${editingEvent.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingEvent),
      });

      if (res.ok) {
        const saved = await res.json();
        if (isNew) {
          setEvents((prev) => [saved, ...prev]);
          showToast(`Agenda "${saved.title}" berhasil ditambahkan!`);
        } else {
          setEvents((prev) => prev.map((ev) => (ev.id === saved.id ? saved : ev)));
          showToast(`Agenda "${saved.title}" berhasil diperbarui!`);
        }
        setIsEventModalOpen(false);
      }
    } catch (err) {
      showToast("Gagal menyimpan agenda.");
    }
  };

  const handleDeleteEvent = async (id: string, title: string) => {
    if (!confirm(`Hapus agenda "${title}"?`)) return;
    try {
      const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
      if (res.ok) {
        setEvents((prev) => prev.filter((ev) => ev.id !== id));
        showToast(`Agenda "${title}" telah dihapus.`);
      }
    } catch (err) {
      showToast("Gagal menghapus agenda.");
    }
  };

  // 6. GALLERY HANDLERS
  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryForm.title || !newGalleryForm.url) return;
    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newGalleryForm.title,
          album: newGalleryForm.album,
          url: newGalleryForm.url,
          thumbnail: newGalleryForm.url,
          caption: newGalleryForm.caption,
          date: "Feb 2026",
          type: "photo",
          photographer: "Dokumentasi Kelas",
          likes: 12,
        }),
      });

      if (res.ok) {
        const saved = await res.json();
        setGallery((prev) => [saved, ...prev]);
        setNewGalleryForm({
          title: "",
          album: "Kegiatan",
          url: "",
          caption: "Dokumentasi kegiatan siswa XI Internasional.",
        });
        setIsGalleryModalOpen(false);
        showToast("Foto dokumentasi berhasil ditambahkan ke galeri!");
      }
    } catch (err) {
      showToast("Gagal menambahkan foto galeri.");
    }
  };

  const handleDeleteGallery = async (id: string, title: string) => {
    if (!confirm(`Hapus foto "${title}" dari galeri?`)) return;
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (res.ok) {
        setGallery((prev) => prev.filter((g) => g.id !== id));
        showToast(`Foto "${title}" telah dihapus.`);
      }
    } catch (err) {
      showToast("Gagal menghapus foto galeri.");
    }
  };

  // 7. CHAT MODERATION & BROADCAST
  const handleDeleteChatMessage = async (id: string) => {
    if (!confirm("Hapus pesan ini dari basis data obrolan?")) return;
    try {
      const res = await fetch(`/api/chat?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        showToast("Pesan obrolan berhasil dihapus.");
      }
    } catch (err) {
      showToast("Gagal menghapus pesan obrolan.");
    }
  };

  const handleSendAdminBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;
    setIsSendingBroadcast(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channelId: selectedChatChannel,
          name: broadcastName,
          role: broadcastRole,
          message: broadcastMessage.trim(),
        }),
      });

      if (res.ok) {
        const saved = await res.json();
        setMessages((prev) => [...prev, saved]);
        setBroadcastMessage("");
        showToast("Pesan resmi admin terkirim ke kanal obrolan!");
      }
    } catch (err) {
      showToast("Gagal mengirim pesan resmi.");
    } finally {
      setIsSendingBroadcast(false);
    }
  };

  // Filtered members list
  const filteredMembers = useMemo(() => {
    return members.filter((m) => {
      const matchesSearch =
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.role.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;
      if (memberRoleFilter === "management") return m.isManagement;
      if (memberRoleFilter === "member") return !m.isManagement;
      return true;
    });
  }, [members, searchQuery, memberRoleFilter]);

  // Filtered messages list by channel
  const filteredMessages = useMemo(() => {
    return messages.filter((m) => m.channelId === selectedChatChannel);
  }, [messages, selectedChatChannel]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#02040A] flex flex-col items-center justify-center text-white">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#F59E0B] to-[#EA580C] p-0.5 shadow-xl shadow-[#F59E0B]/20 mb-4">
          <div className="w-full h-full bg-[#02040A] rounded-[14px] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-[#F59E0B]" />
          </div>
        </div>
        <p className="font-mono text-xs text-[#94A3B8]">Memeriksa sesi admin...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <AuthPage
        onSuccess={() => {
          setIsAuthenticated(true);
          setLoading(true);
          loadAllData();
        }}
      />
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#02040A] flex flex-col items-center justify-center text-white">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#F59E0B] to-[#EA580C] p-0.5 shadow-xl shadow-[#F59E0B]/20 mb-4">
          <div className="w-full h-full bg-[#02040A] rounded-[14px] flex items-center justify-center">
            <RefreshCw className="w-5 h-5 text-[#F59E0B] animate-spin" />
          </div>
        </div>
        <p className="font-mono text-xs text-[#94A3B8]">Menghubungkan ke CMS Admin...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#02040A] flex flex-col md:flex-row text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-[#F59E0B] text-white px-5 py-3.5 rounded-xl shadow-2xl border border-white/20 animate-in fade-in slide-in-from-top-4 duration-300">
          <Check className="w-5 h-5 text-[#F59E0B]" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 border-r border-white/[0.08] bg-[#02040A]/95 backdrop-blur-xl p-5 flex flex-col justify-between shrink-0">
        <div>
          {/* Header Brand */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center gap-2.5 text-white group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#F59E0B] to-[#EA580C] flex items-center justify-center shadow-md shadow-[#F59E0B]/20">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-heading font-extrabold text-base tracking-tight block leading-none">
                  ADMIN HQ
                </span>
                <span className="text-[10px] font-mono text-[#F59E0B]">
                  XI Internasional
                </span>
              </div>
            </Link>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30">
              Live CMS
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-sm font-medium">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "overview"
                  ? "bg-[#F59E0B] text-[#02040A] shadow-md shadow-[#F59E0B]/30 font-bold font-semibold"
                  : "text-[#94A3B8] hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Ringkasan Metrik</span>
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "profile"
                  ? "bg-[#F59E0B] text-[#02040A] shadow-md shadow-[#F59E0B]/30 font-bold font-semibold"
                  : "text-[#94A3B8] hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <School className="w-4 h-4" />
              <span>Profil & Identitas</span>
            </button>

            <button
              onClick={() => setActiveTab("members")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "members"
                  ? "bg-[#F59E0B] text-[#02040A] shadow-md shadow-[#F59E0B]/30 font-bold font-semibold"
                  : "text-[#94A3B8] hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span>25 Siswa & Nahkoda</span>
              </div>
              <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-white/10">
                {members.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("projects")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "projects"
                  ? "bg-[#F59E0B] text-[#02040A] shadow-md shadow-[#F59E0B]/30 font-bold font-semibold"
                  : "text-[#94A3B8] hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Code2 className="w-4 h-4" />
                <span>Karya & 360°</span>
              </div>
              <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-white/10">
                {projects.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("articles")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "articles"
                  ? "bg-[#F59E0B] text-[#02040A] shadow-md shadow-[#F59E0B]/30 font-bold font-semibold"
                  : "text-[#94A3B8] hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4" />
                <span>Warta & Berita</span>
              </div>
              <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-white/10">
                {articles.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("events")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "events"
                  ? "bg-[#F59E0B] text-[#02040A] shadow-md shadow-[#F59E0B]/30 font-bold font-semibold"
                  : "text-[#94A3B8] hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4" />
                <span>Agenda Kelas</span>
              </div>
              <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-white/10">
                {events.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("gallery")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "gallery"
                  ? "bg-[#F59E0B] text-[#02040A] shadow-md shadow-[#F59E0B]/30 font-bold font-semibold"
                  : "text-[#94A3B8] hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Camera className="w-4 h-4" />
                <span>Galeri Foto</span>
              </div>
              <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-white/10">
                {gallery.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("chat")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "chat"
                  ? "bg-[#F59E0B] text-[#02040A] shadow-md shadow-[#F59E0B]/30 font-bold font-semibold"
                  : "text-[#94A3B8] hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4" />
                <span>Moderasi Chat</span>
              </div>
              <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-[#EA580C]/20 text-[#F59E0B]">
                {messages.length}
              </span>
            </button>
          </nav>
        </div>

        {/* Bottom Status & Links */}
        <div className="pt-6 border-t border-white/[0.08] space-y-3">
          <div className="px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs">
            <div className="flex items-center gap-2 text-[#94A3B8] mb-1">
              <span className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981]" />
              <span className="font-mono text-[11px]">Prisma & PostgreSQL</span>
            </div>
            <span className="text-[10px] text-[#64748B] block truncate">
              Coolify Docker Ready
            </span>
          </div>

          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-semibold text-[#94A3B8] hover:text-[#F59E0B] px-3.5 py-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 px-3.5 py-2 rounded-xl border border-red-500/20 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar Sesi Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/[0.08]">
          <div>
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <span>
                {activeTab === "overview" && "Ringkasan & Status Sistem"}
                {activeTab === "profile" && "Edit Profil & Identitas Kelas"}
                {activeTab === "members" && "Kelola 25 Siswa & Nahkoda"}
                {activeTab === "projects" && "Kelola Karya & Portofolio 360°"}
                {activeTab === "articles" && "Manajemen Warta & Berita"}
                {activeTab === "events" && "Jadwal & Agenda Kegiatan"}
                {activeTab === "gallery" && "Dokumentasi & Galeri Foto"}
                {activeTab === "chat" && "Moderasi Internext Chat & Apresiasi"}
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
              SMK Telkom Malang • Kelas XI Internasional (25 Siswa)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadAllData}
              disabled={refreshing}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] hover:bg-white/[0.08] text-xs font-mono text-[#CBD5E1] transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-[#F59E0B]" : ""}`} />
              <span>{refreshing ? "Memperbarui..." : "Segarkan"}</span>
            </button>
            <Link
              href="/contact"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 hover:bg-[#F59E0B]/25 text-xs font-semibold text-[#F59E0B] transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Buka Live Chat</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-500/15 border border-red-500/30 hover:bg-red-500/25 text-xs font-semibold text-red-300 transition-colors"
              title="Keluar dari Portal Admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="glass-card p-5 border-white/[0.08]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/20 flex items-center justify-center text-[#F59E0B]">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-2xl font-heading font-extrabold text-white">
                      {members.length} Siswa
                    </span>
                    <span className="text-xs text-[#94A3B8] block">XI Internasional</span>
                  </div>
                </div>
                <div className="text-[11px] font-mono text-[#64748B] pt-2 border-t border-white/[0.05]">
                  {members.filter((m) => m.isManagement).length} Pengurus / Nahkoda
                </div>
              </div>

              <div className="glass-card p-5 border-white/[0.08]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EA580C]/20 flex items-center justify-center text-[#F59E0B]">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-2xl font-heading font-extrabold text-white">
                      {projects.length} Proyek
                    </span>
                    <span className="text-xs text-[#94A3B8] block">Portofolio Siswa</span>
                  </div>
                </div>
                <div className="text-[11px] font-mono text-[#64748B] pt-2 border-t border-white/[0.05]">
                  {projects.filter((p) => p.featured).length} Featured Showcase 360°
                </div>
              </div>

              <div className="glass-card p-5 border-white/[0.08]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#10B981]/20 flex items-center justify-center text-[#10B981]">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-2xl font-heading font-extrabold text-white">
                      {articles.length} Artikel
                    </span>
                    <span className="text-xs text-[#94A3B8] block">Warta & Kabar</span>
                  </div>
                </div>
                <div className="text-[11px] font-mono text-[#64748B] pt-2 border-t border-white/[0.05]">
                  {events.length} Agenda Mendatang
                </div>
              </div>

              <div className="glass-card p-5 border-white/[0.08]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/20 flex items-center justify-center text-[#F59E0B]">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-2xl font-heading font-extrabold text-white">
                      {messages.length} Pesan
                    </span>
                    <span className="text-xs text-[#94A3B8] block">Obrolan & Apresiasi</span>
                  </div>
                </div>
                <div className="text-[11px] font-mono text-[#64748B] pt-2 border-t border-white/[0.05]">
                  4 Kanal Chat Terhubung DB
                </div>
              </div>
            </div>

            {/* School Profile Summary Card */}
            {profile && (
              <div className="glass-card p-6 sm:p-8 border-white/[0.08]">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-xs font-mono text-[#F59E0B] mb-2">
                      <GraduationCap className="w-3.5 h-3.5 text-[#F59E0B]" />
                      <span>Identitas Resmi Kelas</span>
                    </div>
                    <h2 className="text-xl font-heading font-bold text-white">
                      {profile.school} • {profile.name}
                    </h2>
                    <p className="text-xs text-[#94A3B8] mt-1">{profile.tagline}</p>
                  </div>

                  <button
                    onClick={() => setActiveTab("profile")}
                    className="btn-gradient px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Ubah Profil Sekolah</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <span className="text-[#64748B] block mb-1">Wali Kelas:</span>
                    <span className="text-white font-semibold">{profile.homeroomTeacher}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <span className="text-[#64748B] block mb-1">Ketua Kelas:</span>
                    <span className="text-white font-semibold">{profile.classPresident}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <span className="text-[#64748B] block mb-1">Wakil Ketua:</span>
                    <span className="text-white font-semibold">{profile.vicePresident}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <span className="text-[#64748B] block mb-1">Lokasi Lab:</span>
                    <span className="text-[#F59E0B] font-semibold">{profile.labLocation}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => {
                  setActiveTab("members");
                  handleOpenNewMember();
                }}
                className="p-5 rounded-2xl bg-[#F59E0B]/10 border border-[#F59E0B]/30 hover:bg-[#F59E0B]/20 text-left transition-all group"
              >
                <Users className="w-6 h-6 text-[#F59E0B] mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-white text-sm mb-1">+ Tambah Siswa Baru</h3>
                <p className="text-xs text-[#94A3B8]">Daftarkan siswa baru ke direktori 25 anggota kelas.</p>
              </button>

              <button
                onClick={() => {
                  setActiveTab("projects");
                  handleOpenNewProject();
                }}
                className="p-5 rounded-2xl bg-[#F59E0B]/10 border border-[#F59E0B]/30 hover:bg-[#EA580C]/20 text-left transition-all group"
              >
                <Code2 className="w-6 h-6 text-[#F59E0B] mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-white text-sm mb-1">+ Tambah Karya Siswa</h3>
                <p className="text-xs text-[#94A3B8]">Tambahkan aplikasi atau riset baru ke showcase 360°.</p>
              </button>

              <button
                onClick={() => {
                  setActiveTab("articles");
                  handleOpenNewArticle();
                }}
                className="p-5 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/30 hover:bg-[#10B981]/20 text-left transition-all group"
              >
                <FileText className="w-6 h-6 text-[#10B981] mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-white text-sm mb-1">+ Tulis Warta Baru</h3>
                <p className="text-xs text-[#94A3B8]">Publikasikan berita prestasi atau info akademik terbaru.</p>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: PROFIL & IDENTITAS */}
        {activeTab === "profile" && profileForm && (
          <div className="max-w-4xl space-y-6 animate-in fade-in duration-300">
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="glass-card p-6 sm:p-8 border-white/[0.08] space-y-6">
                <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                  <School className="w-5 h-5 text-[#F59E0B]" />
                  <span>Identitas Sekolah & Kelas</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#94A3B8] mb-1.5">
                      Nama Sekolah
                    </label>
                    <input
                      type="text"
                      value={profileForm.school}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, school: e.target.value })
                      }
                      required
                      className="w-full bg-[#02040A] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#94A3B8] mb-1.5">
                      Nama Kelas
                    </label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, name: e.target.value })
                      }
                      required
                      className="w-full bg-[#02040A] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#94A3B8] mb-1.5">
                      Angkatan
                    </label>
                    <input
                      type="text"
                      value={profileForm.generation}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, generation: e.target.value })
                      }
                      className="w-full bg-[#02040A] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#94A3B8] mb-1.5">
                      Jumlah Siswa (Keluarga Besar)
                    </label>
                    <input
                      type="number"
                      value={profileForm.memberCount}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          memberCount: parseInt(e.target.value) || 25,
                        })
                      }
                      className="w-full bg-[#02040A] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#94A3B8] mb-1.5">
                    Tagline Utama
                  </label>
                  <input
                    type="text"
                    value={profileForm.tagline}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, tagline: e.target.value })
                    }
                    className="w-full bg-[#02040A] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#94A3B8] mb-1.5">
                    Deskripsi Profil Kelas
                  </label>
                  <textarea
                    rows={3}
                    value={profileForm.description}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, description: e.target.value })
                    }
                    className="w-full bg-[#02040A] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B]"
                  />
                </div>
              </div>

              {/* Leadership & Location */}
              <div className="glass-card p-6 sm:p-8 border-white/[0.08] space-y-6">
                <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-[#EA580C]" />
                  <span>Struktur & Laboratorium</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#94A3B8] mb-1.5">
                      Wali Kelas
                    </label>
                    <input
                      type="text"
                      value={profileForm.homeroomTeacher}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, homeroomTeacher: e.target.value })
                      }
                      className="w-full bg-[#02040A] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#94A3B8] mb-1.5">
                      Ketua Kelas
                    </label>
                    <input
                      type="text"
                      value={profileForm.classPresident}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, classPresident: e.target.value })
                      }
                      className="w-full bg-[#02040A] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#94A3B8] mb-1.5">
                      Wakil Ketua Kelas
                    </label>
                    <input
                      type="text"
                      value={profileForm.vicePresident}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, vicePresident: e.target.value })
                      }
                      className="w-full bg-[#02040A] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#94A3B8] mb-1.5">
                    Lokasi Basecamp / Lab
                  </label>
                  <input
                    type="text"
                    value={profileForm.labLocation}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, labLocation: e.target.value })
                    }
                    className="w-full bg-[#02040A] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B]"
                  />
                </div>
              </div>

              {/* Contact & Socials (Tersinkronisasi dengan Footer) */}
              <div className="glass-card p-6 sm:p-8 border-white/[0.08] space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-[#F59E0B]" />
                    <span>Kontak & Media Sosial Resmi</span>
                  </h3>
                  <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/30 self-start sm:self-auto flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#EA580C]" />
                    <span>Tersinkron Otomatis ke Seluruh Footer Website</span>
                  </span>
                </div>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Tautan akun media sosial resmi (khususnya Instagram) serta identitas sekolah dan kelas di bawah ini langsung mengatur tampilan tombol, tautan, dan marquee teks pada Footer di Beranda dan seluruh halaman website.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#94A3B8] mb-1.5">
                      Email Resmi Kelas
                    </label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, email: e.target.value })
                      }
                      placeholder="contact@internext.web.id"
                      className="w-full bg-[#02040A] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#94A3B8] mb-1.5 flex items-center justify-between">
                      <span>Instagram URL Resmi (Footer Button)</span>
                      <span className="text-[10px] text-[#F59E0B]">Tombol Footer</span>
                    </label>
                    <input
                      type="text"
                      value={profileForm.instagram}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, instagram: e.target.value })
                      }
                      placeholder="https://instagram.com/internext.class"
                      className="w-full bg-[#02040A] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#94A3B8] mb-1.5">
                      GitHub URL
                    </label>
                    <input
                      type="text"
                      value={profileForm.github}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, github: e.target.value })
                      }
                      className="w-full bg-[#02040A] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#94A3B8] mb-1.5">
                      YouTube URL
                    </label>
                    <input
                      type="text"
                      value={profileForm.youtube}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, youtube: e.target.value })
                      }
                      className="w-full bg-[#02040A] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B]"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSavingProfile}
                  className="btn-gradient px-8 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-lg shadow-[#F59E0B]/20 hover:scale-105 transition-transform"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSavingProfile ? "Menyimpan ke Database..." : "Simpan Perubahan Profil"}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: MEMBERS (25 SISWA) */}
        {activeTab === "members" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1 max-w-md">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                  <input
                    type="text"
                    placeholder="Cari siswa atau peran..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#02040A] border border-white/[0.1] rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#F59E0B]"
                  />
                </div>

                <div className="flex rounded-xl bg-white/[0.04] p-1 border border-white/[0.08] text-xs">
                  <button
                    onClick={() => setMemberRoleFilter("all")}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      memberRoleFilter === "all" ? "bg-[#F59E0B] text-white" : "text-[#94A3B8]"
                    }`}
                  >
                    Semua
                  </button>
                  <button
                    onClick={() => setMemberRoleFilter("management")}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      memberRoleFilter === "management" ? "bg-[#F59E0B] text-white" : "text-[#94A3B8]"
                    }`}
                  >
                    Nahkoda
                  </button>
                  <button
                    onClick={() => setMemberRoleFilter("member")}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      memberRoleFilter === "member" ? "bg-[#F59E0B] text-white" : "text-[#94A3B8]"
                    }`}
                  >
                    Anggota
                  </button>
                </div>
              </div>

              <button
                onClick={handleOpenNewMember}
                className="btn-gradient px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Siswa Baru</span>
              </button>
            </div>

            {/* Member Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="glass-card p-5 border-white/[0.08] flex flex-col justify-between hover:border-[#F59E0B]/40 transition-colors group"
                >
                  <div>
                    <div className="flex items-start gap-3.5 mb-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white/10">
                        <Image
                          src={member.avatar}
                          alt={member.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-heading font-bold text-white text-sm truncate">
                            {member.name}
                          </h4>
                          {member.isManagement && (
                            <span className="px-1.5 py-0.5 rounded bg-[#F59E0B]/20 border border-[#F59E0B]/40 text-[10px] font-mono text-[#F59E0B]">
                              Nahkoda
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-[#F59E0B] font-medium block truncate">
                          {member.role} ({member.nickname})
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-[#94A3B8] italic line-clamp-2 mb-3">
                      &quot;{member.quote}&quot;
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {member.skills.slice(0, 3).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-white/[0.04] text-[10px] font-mono text-[#CBD5E1]"
                        >
                          {skill}
                        </span>
                      ))}
                      {member.skills.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded-md bg-white/[0.04] text-[10px] font-mono text-[#64748B]">
                          +{member.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#64748B]">ID: {member.id}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingMember(member);
                          setIsMemberModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-[#F59E0B] transition-colors"
                        title="Edit Siswa"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteMember(member.id, member.name)}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                        title="Hapus Siswa"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PROJECTS (KARYA & SHOWCASE 360) */}
        {activeTab === "projects" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-lg text-white">
                  Daftar Proyek & Showcase 360°
                </h3>
                <p className="text-xs text-[#94A3B8]">
                  Proyek dengan tanda &quot;Featured&quot; akan otomatis ditampilkan di 360° Circular Gallery beranda.
                </p>
              </div>

              <button
                onClick={handleOpenNewProject}
                className="btn-gradient px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Proyek Baru</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="glass-card overflow-hidden border-white/[0.08] flex flex-col justify-between group hover:border-[#F59E0B]/40 transition-colors"
                >
                  <div>
                    <div className="relative h-44 w-full bg-[#02040A]">
                      <Image
                        src={proj.thumbnail}
                        alt={proj.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#02040A] via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-md bg-[#02040A]/80 backdrop-blur-md text-[10px] font-mono text-[#F59E0B] border border-[#F59E0B]/30">
                          {proj.category}
                        </span>
                        {proj.featured && (
                          <span className="px-2 py-0.5 rounded-md bg-[#F59E0B]/80 backdrop-blur-md text-[10px] font-mono text-white flex items-center gap-1">
                            <Star className="w-2.5 h-2.5 fill-current" />
                            <span>360° Featured</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-5">
                      <h4 className="font-heading font-bold text-white text-base mb-1">
                        {proj.title}
                      </h4>
                      <p className="text-xs text-[#F59E0B] font-medium mb-2">{proj.tagline}</p>
                      <p className="text-xs text-[#94A3B8] line-clamp-2 mb-4">
                        {proj.description}
                      </p>

                      <div className="flex flex-wrap gap-1">
                        {proj.techStack.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded bg-white/[0.04] text-[10px] font-mono text-[#94A3B8]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-white/[0.06] mt-4 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#64748B]">
                      Oleh: {proj.team.slice(0, 2).join(", ")}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingProject(proj);
                          setIsProjectModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-[#F59E0B] transition-colors"
                        title="Edit Proyek"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj.id, proj.title)}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                        title="Hapus Proyek"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: ARTICLES (WARTA & BERITA) */}
        {activeTab === "articles" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-lg text-white">
                  Publikasi & Warta Kelas
                </h3>
                <p className="text-xs text-[#94A3B8]">
                  Artikel yang diterbitkan akan langsung muncul di halaman warta dan carousel beranda.
                </p>
              </div>

              <button
                onClick={handleOpenNewArticle}
                className="btn-gradient px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Tulis Warta Baru</span>
              </button>
            </div>

            <div className="space-y-3">
              {articles.map((art) => (
                <div
                  key={art.id}
                  className="glass-card p-4 sm:p-5 border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#10B981]/40 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10">
                      <Image
                        src={art.coverImage}
                        alt={art.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded bg-[#10B981]/15 text-[10px] font-mono text-[#10B981]">
                          {art.category}
                        </span>
                        <span className="text-[11px] font-mono text-[#64748B]">
                          {art.date} • {art.readTime}
                        </span>
                      </div>
                      <h4 className="font-heading font-bold text-white text-sm sm:text-base">
                        {art.title}
                      </h4>
                      <p className="text-xs text-[#94A3B8] line-clamp-1 max-w-xl">
                        {art.summary}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => {
                        setEditingArticle(art);
                        setIsArticleModalOpen(true);
                      }}
                      className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-[#10B981] transition-colors"
                      title="Edit Artikel"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteArticle(art.id, art.title)}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                      title="Hapus Artikel"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: EVENTS (AGENDA & KEGIATAN) */}
        {activeTab === "events" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-lg text-white">
                  Jadwal & Agenda Angkatan
                </h3>
                <p className="text-xs text-[#94A3B8]">
                  Kelola tanggal penting, agenda sertifikasi, kunjungan industri, dan pameran karya.
                </p>
              </div>

              <button
                onClick={handleOpenNewEvent}
                className="btn-gradient px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Agenda Baru</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((ev) => (
                <div
                  key={ev.id}
                  className="glass-card p-5 border-white/[0.08] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-1 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 text-[10px] font-mono text-[#10B981]">
                        {ev.category}
                      </span>
                      <span className="text-xs font-mono text-[#F59E0B] font-semibold">
                        {ev.date}
                      </span>
                    </div>

                    <h4 className="font-heading font-bold text-white text-base mb-1">
                      {ev.title}
                    </h4>
                    <p className="text-xs text-[#94A3B8] mb-3">{ev.description}</p>

                    <div className="space-y-1 text-xs text-[#CBD5E1] font-mono">
                      <div>📍 {ev.location}</div>
                      <div>👥 {ev.committee}</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] mt-4 flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingEvent(ev);
                        setIsEventModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-[#F59E0B] transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(ev.id, ev.title)}
                      className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: GALLERY (DOKUMENTASI FOTO) */}
        {activeTab === "gallery" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* SEKSI 1: KUBAH GALERI 3D INTERNEXT */}
            <div className="glass-card p-6 border-[#F59E0B]/30 bg-gradient-to-br from-[#F59E0B]/10 via-[#02040A] to-[#02040A] rounded-2xl relative overflow-hidden space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F59E0B]/20 border border-[#F59E0B]/40 text-xs font-mono text-[#F59E0B] mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#EA580C]" />
                    <span>Kubah 3D Interaktif (360° Dome Gallery)</span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
                    <span>Pengaturan Kubah Galeri 3D</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F59E0B]/20 text-[#F59E0B] font-mono">
                      {gallery.filter((i) => i.album === "Kubah 3D").length} Foto Aktif
                    </span>
                  </h3>
                  <p className="text-xs text-[#94A3B8] max-w-2xl mt-1">
                    Foto-foto di bawah ini adalah foto yang tampil dan berputar di dalam Kubah 3D Interaktif pada halaman{" "}
                    <Link href="/gallery" target="_blank" className="text-[#F59E0B] underline hover:text-[#EA580C]">
                      /gallery
                    </Link>
                    . Anda dapat menambah atau mengganti foto kubah 3D langsung dengan memilih album &ldquo;Kubah 3D&rdquo; atau mengunggah gambar.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setNewGalleryForm({
                      title: "",
                      album: "Kubah 3D",
                      url: "",
                      caption: "Momen dokumentasi Kubah 3D XI Internasional.",
                    });
                    setIsGalleryModalOpen(true);
                  }}
                  className="btn-gradient px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 shrink-0 shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Foto ke Kubah 3D</span>
                </button>
              </div>

              {/* Grid Foto Kubah 3D */}
              {gallery.filter((i) => i.album === "Kubah 3D").length === 0 ? (
                <div className="p-8 text-center border border-dashed border-white/10 rounded-xl">
                  <p className="text-xs text-[#94A3B8]">Belum ada foto khusus Kubah 3D. Klik tombol di atas untuk menambahkan foto ke kubah 3D!</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {gallery
                    .filter((item) => item.album === "Kubah 3D")
                    .map((item) => (
                      <div
                        key={item.id}
                        className="glass-card overflow-hidden border-white/[0.1] hover:border-[#F59E0B]/40 group relative transition-all rounded-xl"
                      >
                        <div className="relative h-28 w-full bg-[#02040A]">
                          <Image
                            src={item.url}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            unoptimized
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#02040A] via-transparent to-transparent opacity-80" />
                          <button
                            onClick={() => handleDeleteGallery(item.id, item.title)}
                            className="absolute top-1.5 right-1.5 p-1 rounded-lg bg-red-500/80 hover:bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Hapus dari Kubah 3D"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="p-2">
                          <h6 className="text-[11px] font-semibold text-white truncate" title={item.title}>
                            {item.title}
                          </h6>
                          <span className="text-[9px] font-mono text-[#F59E0B]">Kubah 3D</span>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* SEKSI 2: SEMUA DOKUMENTASI & GALERI LAINNYA */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-bold text-base text-white">
                    Semua Foto Dokumentasi & Album Kegiatan
                  </h4>
                  <p className="text-xs text-[#94A3B8]">
                    Daftar lengkap seluruh foto kegiatan, perlombaan, dan arsip visual kelas.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setNewGalleryForm({
                      title: "",
                      album: "Kegiatan",
                      url: "",
                      caption: "Dokumentasi kegiatan siswa XI Internasional.",
                    });
                    setIsGalleryModalOpen(true);
                  }}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white flex items-center gap-2 transition-colors"
                >
                  <Plus className="w-4 h-4 text-[#F59E0B]" />
                  <span>Tambah Foto Lainnya</span>
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {gallery.map((item) => (
                  <div
                    key={item.id}
                    className="glass-card overflow-hidden border-white/[0.08] group relative"
                  >
                    <div className="relative h-44 w-full bg-[#02040A]">
                      <Image
                        src={item.url}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#02040A] via-transparent to-transparent opacity-80" />
                      <button
                        onClick={() => handleDeleteGallery(item.id, item.title)}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Hapus Foto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="p-3">
                      <span className="text-[10px] font-mono text-[#F59E0B] block mb-0.5">
                        {item.album}
                      </span>
                      <h5 className="text-xs font-semibold text-white truncate">
                        {item.title}
                      </h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: CHAT MODERATION & BROADCAST */}
        {activeTab === "chat" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Channel Tabs */}
            <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-white/[0.08]">
              {channels.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => setSelectedChatChannel(ch.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
                    selectedChatChannel === ch.id
                      ? "bg-[#F59E0B] text-white shadow-md font-semibold"
                      : "bg-white/[0.04] text-[#94A3B8] hover:text-white"
                  }`}
                >
                  <span>#{ch.name}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/20">
                    {messages.filter((m) => m.channelId === ch.id).length}
                  </span>
                </button>
              ))}
            </div>

            {/* Admin Broadcast Box */}
            <div className="glass-card p-5 border-white/[0.08]">
              <h4 className="font-heading font-bold text-sm text-white mb-2 flex items-center gap-2">
                <Send className="w-4 h-4 text-[#F59E0B]" />
                <span>Kirim Pesan Resmi Admin ke #{selectedChatChannel}</span>
              </h4>
              <p className="text-xs text-[#94A3B8] mb-4">
                Pesan ini akan langsung tersimpan di basis data PostgreSQL dan terbaca oleh seluruh pengunjung website.
              </p>

              <form onSubmit={handleSendAdminBroadcast} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-mono text-[#64748B] block mb-1">
                      Nama Pengirim
                    </label>
                    <input
                      type="text"
                      value={broadcastName}
                      onChange={(e) => setBroadcastName(e.target.value)}
                      className="w-full bg-[#02040A] border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-[#64748B] block mb-1">
                      Peran / Label
                    </label>
                    <select
                      value={broadcastRole}
                      onChange={(e) => setBroadcastRole(e.target.value as any)}
                      className="w-full bg-[#02040A] border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-white"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Guru">Guru / Pembina</option>
                      <option value="Siswa">Siswa</option>
                    </select>
                  </div>
                </div>

                <div>
                  <textarea
                    rows={2}
                    placeholder={`Tulis pesan atau pengumuman resmi untuk kanal #${selectedChatChannel}...`}
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                    className="w-full bg-[#02040A] border border-white/[0.1] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#F59E0B]"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSendingBroadcast || !broadcastMessage.trim()}
                    className="btn-gradient px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSendingBroadcast ? "Mengirim..." : "Kirim Pesan Resmi"}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Messages Feed */}
            <div className="glass-card p-5 border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <span className="text-xs font-mono text-[#94A3B8]">
                  Menampilkan {filteredMessages.length} pesan di #{selectedChatChannel}
                </span>
                <span className="text-[11px] font-mono text-[#64748B]">
                  Terhubung ke Database
                </span>
              </div>

              {filteredMessages.length === 0 ? (
                <p className="text-xs text-center py-8 text-[#64748B] font-mono">
                  Belum ada pesan di kanal ini.
                </p>
              ) : (
                <div className="space-y-3">
                  {filteredMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-start justify-between gap-4 group"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-xs text-white">{msg.name}</span>
                          <span className="px-1.5 py-0.5 rounded bg-[#F59E0B]/20 text-[10px] font-mono text-[#F59E0B]">
                            {msg.role}
                          </span>
                          <span className="text-[10px] font-mono text-[#64748B]">
                            {msg.timestamp}
                          </span>
                        </div>
                        <p className="text-xs text-[#CBD5E1] leading-relaxed">{msg.message}</p>
                      </div>

                      <button
                        onClick={() => handleDeleteChatMessage(msg.id)}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 opacity-60 hover:opacity-100 transition-all shrink-0"
                        title="Hapus Pesan Spam"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* MODAL 1: EDIT / CREATE MEMBER */}
      {/* ========================================================================= */}
      {isMemberModalOpen && editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#02040A] border border-white/20 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-heading font-bold text-base text-white">
                {editingMember.id ? "Edit Siswa / Nahkoda" : "Tambah Siswa Baru"}
              </h3>
              <button
                onClick={() => setIsMemberModalOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-[#94A3B8]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveMember} className="space-y-4 text-xs">
              <div>
                <label className="block font-mono text-[#94A3B8] mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  value={editingMember.name}
                  onChange={(e) =>
                    setEditingMember({ ...editingMember, name: e.target.value })
                  }
                  required
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[#94A3B8] mb-1">Nama Panggilan</label>
                  <input
                    type="text"
                    value={editingMember.nickname}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, nickname: e.target.value })
                    }
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[#94A3B8] mb-1">Peran / Role</label>
                  <input
                    type="text"
                    value={editingMember.role}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, role: e.target.value })
                    }
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <ImageUploadInput
                label="Foto Avatar Siswa (URL atau Unggah File)"
                value={editingMember.avatar}
                onChange={(url) =>
                  setEditingMember({ ...editingMember, avatar: url })
                }
                aspectRatio="square"
                helperText="Foto profil siswa (format persegi)"
              />

              <div>
                <label className="block font-mono text-[#94A3B8] mb-1">Personal Quote</label>
                <textarea
                  rows={2}
                  value={editingMember.quote}
                  onChange={(e) =>
                    setEditingMember({ ...editingMember, quote: e.target.value })
                  }
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block font-mono text-[#94A3B8] mb-1">
                  Skills (Pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  value={editingMember.skills.join(", ")}
                  onChange={(e) =>
                    setEditingMember({
                      ...editingMember,
                      skills: e.target.value.split(",").map((s) => s.trim()),
                    })
                  }
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isManagementCheckbox"
                  checked={editingMember.isManagement}
                  onChange={(e) =>
                    setEditingMember({ ...editingMember, isManagement: e.target.checked })
                  }
                  className="rounded bg-white/10 border-white/20 text-[#EA580C]"
                />
                <label htmlFor="isManagementCheckbox" className="font-mono text-[#CBD5E1]">
                  Tandai sebagai Pengurus Kelas / Nahkoda
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsMemberModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-gradient px-4 py-2 rounded-xl text-white font-semibold"
                >
                  Simpan Siswa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: EDIT / CREATE PROJECT */}
      {/* ========================================================================= */}
      {isProjectModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#02040A] border border-white/20 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-heading font-bold text-base text-white">
                {editingProject.id ? "Edit Karya Siswa" : "Tambah Karya Baru"}
              </h3>
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-[#94A3B8]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
              <div>
                <label className="block font-mono text-[#94A3B8] mb-1">Judul Proyek</label>
                <input
                  type="text"
                  value={editingProject.title}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, title: e.target.value })
                  }
                  required
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[#94A3B8] mb-1">Kategori</label>
                  <select
                    value={editingProject.category}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        category: e.target.value as any,
                      })
                    }
                    className="w-full bg-[#02040A] border border-white/10 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Web App">Web App</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="IoT / Hardware">IoT / Hardware</option>
                    <option value="Game / AI">Game / AI</option>
                    <option value="UI/UX">UI/UX</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[#94A3B8] mb-1">Tagline Singkat</label>
                  <input
                    type="text"
                    value={editingProject.tagline}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, tagline: e.target.value })
                    }
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <ImageUploadInput
                label="Thumbnail Proyek (URL atau Unggah File)"
                value={editingProject.thumbnail}
                onChange={(url) =>
                  setEditingProject({ ...editingProject, thumbnail: url })
                }
                aspectRatio="video"
                helperText="Thumbnail proyek untuk showcase karya"
              />

              {/* Pemilihan Siswa Kontributor / Nahkoda yang Berperan */}
              <div>
                <label className="block font-mono text-[#94A3B8] mb-1.5 flex items-center justify-between">
                  <span>Siswa Kontributor / Nahkoda yang Berperan</span>
                  <span className="text-[10px] font-mono text-[#F59E0B]">
                    {editingProject.team.length} siswa terpilih
                  </span>
                </label>
                <p className="text-[11px] text-[#64748B] mb-2 leading-tight">
                  Pilih siswa kelas XI Internasional yang berkontribusi dalam karya ini. Proyek ini akan otomatis tampil di portofolio profil LinkedIn masing-masing siswa.
                </p>

                {/* Selected chips with avatar */}
                {editingProject.team.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-2.5 p-2 bg-black/40 rounded-xl border border-white/10">
                    {editingProject.team.map((memberName) => {
                      const found = members.find(
                        (m) =>
                          m.name.toLowerCase() === memberName.toLowerCase() ||
                          m.nickname.toLowerCase() === memberName.toLowerCase()
                      );
                      return (
                        <span
                          key={memberName}
                          className="inline-flex items-center gap-1.5 pl-1.5 pr-2 py-0.5 rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/30 text-xs text-[#F59E0B] font-mono"
                        >
                          {found?.avatar && (
                            <span className="w-4 h-4 rounded-full overflow-hidden relative inline-block">
                              <Image src={found.avatar} alt={memberName} fill className="object-cover" />
                            </span>
                          )}
                          <span>{memberName}</span>
                          <button
                            type="button"
                            onClick={() =>
                              setEditingProject({
                                ...editingProject,
                                team: editingProject.team.filter((t) => t !== memberName),
                              })
                            }
                            className="hover:text-white ml-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      );
                    })}
                  </div>
                )}

                {/* Member selector grid */}
                <div className="max-h-36 overflow-y-auto p-2 bg-white/[0.02] rounded-xl border border-white/10 space-y-1">
                  <div className="grid grid-cols-2 gap-1.5">
                    {members.map((m) => {
                      const isSelected = editingProject.team.some(
                        (t) =>
                          t.toLowerCase() === m.name.toLowerCase() ||
                          t.toLowerCase() === m.nickname.toLowerCase()
                      );
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => {
                            if (isSelected) {
                              setEditingProject({
                                ...editingProject,
                                team: editingProject.team.filter(
                                  (t) =>
                                    t.toLowerCase() !== m.name.toLowerCase() &&
                                    t.toLowerCase() !== m.nickname.toLowerCase()
                                ),
                              });
                            } else {
                              setEditingProject({
                                ...editingProject,
                                team: [...editingProject.team, m.nickname || m.name],
                              });
                            }
                          }}
                          className={`flex items-center gap-2 p-1.5 rounded-lg text-left transition-colors border ${
                            isSelected
                              ? "bg-[#F59E0B]/20 border-[#F59E0B]/50 text-white"
                              : "bg-white/[0.03] border-white/5 text-[#94A3B8] hover:bg-white/[0.08]"
                          }`}
                        >
                          <div className="w-5 h-5 rounded-full overflow-hidden relative shrink-0">
                            <Image src={m.avatar} alt={m.name} fill className="object-cover" />
                          </div>
                          <span className="truncate text-[11px] font-medium">{m.nickname || m.name}</span>
                          {isSelected && <Check className="w-3 h-3 text-[#F59E0B] ml-auto shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-mono text-[#94A3B8] mb-1">Deskripsi Lengkap</label>
                <textarea
                  rows={3}
                  value={editingProject.description}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, description: e.target.value })
                  }
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block font-mono text-[#94A3B8] mb-1">
                  Tech Stack (Pisahkan koma)
                </label>
                <input
                  type="text"
                  value={editingProject.techStack.join(", ")}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      techStack: e.target.value.split(",").map((s) => s.trim()),
                    })
                  }
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="featuredCheckbox"
                  checked={editingProject.featured}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, featured: e.target.checked })
                  }
                  className="rounded bg-white/10 border-white/20 text-[#F59E0B]"
                />
                <label htmlFor="featuredCheckbox" className="font-mono text-[#CBD5E1]">
                  Tampilkan di 360° Circular Gallery Beranda (Featured)
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-gradient px-4 py-2 rounded-xl text-white font-semibold"
                >
                  Simpan Proyek
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: EDIT / CREATE ARTICLE */}
      {/* ========================================================================= */}
      {isArticleModalOpen && editingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#02040A] border border-white/20 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-heading font-bold text-base text-white">
                {editingArticle.id ? "Edit Warta / Artikel" : "Tulis Warta Baru"}
              </h3>
              <button
                onClick={() => setIsArticleModalOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-[#94A3B8]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="space-y-4 text-xs">
              <div>
                <label className="block font-mono text-[#94A3B8] mb-1">Judul Artikel</label>
                <input
                  type="text"
                  value={editingArticle.title}
                  onChange={(e) =>
                    setEditingArticle({ ...editingArticle, title: e.target.value })
                  }
                  required
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[#94A3B8] mb-1">Kategori</label>
                  <select
                    value={editingArticle.category}
                    onChange={(e) =>
                      setEditingArticle({
                        ...editingArticle,
                        category: e.target.value as any,
                      })
                    }
                    className="w-full bg-[#02040A] border border-white/10 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Prestasi">Prestasi</option>
                    <option value="Event">Event</option>
                    <option value="Akademik">Akademik</option>
                    <option value="Sosial">Sosial</option>
                    <option value="Pengumuman">Pengumuman</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[#94A3B8] mb-1">Estimasi Baca</label>
                  <input
                    type="text"
                    value={editingArticle.readTime}
                    onChange={(e) =>
                      setEditingArticle({ ...editingArticle, readTime: e.target.value })
                    }
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <ImageUploadInput
                label="Gambar Sampul Warta (URL atau Unggah File)"
                value={editingArticle.coverImage}
                onChange={(url) =>
                  setEditingArticle({ ...editingArticle, coverImage: url })
                }
                aspectRatio="video"
                helperText="Sampul artikel warta & pengumuman"
              />

              <div>
                <label className="block font-mono text-[#94A3B8] mb-1">Ringkasan (Summary)</label>
                <textarea
                  rows={2}
                  value={editingArticle.summary}
                  onChange={(e) =>
                    setEditingArticle({ ...editingArticle, summary: e.target.value })
                  }
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block font-mono text-[#94A3B8] mb-1">Konten Lengkap</label>
                <textarea
                  rows={4}
                  value={editingArticle.content}
                  onChange={(e) =>
                    setEditingArticle({ ...editingArticle, content: e.target.value })
                  }
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsArticleModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-gradient px-4 py-2 rounded-xl text-white font-semibold"
                >
                  Publikasikan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: EDIT / CREATE EVENT */}
      {/* ========================================================================= */}
      {isEventModalOpen && editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#02040A] border border-white/20 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-heading font-bold text-base text-white">
                {editingEvent.id ? "Edit Agenda Kelas" : "Tambah Agenda Baru"}
              </h3>
              <button
                onClick={() => setIsEventModalOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-[#94A3B8]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="space-y-4 text-xs">
              <div>
                <label className="block font-mono text-[#94A3B8] mb-1">Judul Kegiatan</label>
                <input
                  type="text"
                  value={editingEvent.title}
                  onChange={(e) =>
                    setEditingEvent({ ...editingEvent, title: e.target.value })
                  }
                  required
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[#94A3B8] mb-1">Tanggal</label>
                  <input
                    type="text"
                    value={editingEvent.date}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, date: e.target.value })
                    }
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[#94A3B8] mb-1">Kategori</label>
                  <select
                    value={editingEvent.category}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        category: e.target.value as any,
                      })
                    }
                    className="w-full bg-[#02040A] border border-white/10 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Akademik">Akademik</option>
                    <option value="Sosial">Sosial</option>
                    <option value="Olahraga">Olahraga</option>
                    <option value="Seni">Seni</option>
                    <option value="Nasional">Nasional</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-mono text-[#94A3B8] mb-1">Lokasi</label>
                <input
                  type="text"
                  value={editingEvent.location}
                  onChange={(e) =>
                    setEditingEvent({ ...editingEvent, location: e.target.value })
                  }
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block font-mono text-[#94A3B8] mb-1">Panitia / Penanggung Jawab</label>
                <input
                  type="text"
                  value={editingEvent.committee}
                  onChange={(e) =>
                    setEditingEvent({ ...editingEvent, committee: e.target.value })
                  }
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <ImageUploadInput
                label="Banner / Cover Agenda (URL atau Unggah File)"
                value={editingEvent.coverImage}
                onChange={(url) =>
                  setEditingEvent({ ...editingEvent, coverImage: url })
                }
                aspectRatio="video"
                helperText="Banner visual kegiatan kelas"
              />

              <div>
                <label className="block font-mono text-[#94A3B8] mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  value={editingEvent.description}
                  onChange={(e) =>
                    setEditingEvent({ ...editingEvent, description: e.target.value })
                  }
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsEventModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-gradient px-4 py-2 rounded-xl text-white font-semibold"
                >
                  Simpan Agenda
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 5: ADD PHOTO TO GALLERY */}
      {/* ========================================================================= */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#02040A] border border-white/20 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-heading font-bold text-base text-white">
                Tambah Foto Galeri
              </h3>
              <button
                onClick={() => setIsGalleryModalOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-[#94A3B8]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveGallery} className="space-y-4 text-xs">
              <div>
                <label className="block font-mono text-[#94A3B8] mb-1">Judul Foto</label>
                <input
                  type="text"
                  placeholder="Contoh: Workshop Cloud & DevOps"
                  value={newGalleryForm.title}
                  onChange={(e) =>
                    setNewGalleryForm({ ...newGalleryForm, title: e.target.value })
                  }
                  required
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block font-mono text-[#94A3B8] mb-1">Album / Kategori</label>
                <select
                  value={newGalleryForm.album}
                  onChange={(e) =>
                    setNewGalleryForm({ ...newGalleryForm, album: e.target.value })
                  }
                  className="w-full bg-[#02040A] border border-white/10 rounded-xl px-3 py-2 text-white"
                >
                  <option value="Kubah 3D">Kubah 3D (360° Dome Gallery)</option>
                  <option value="Kegiatan">Kegiatan</option>
                  <option value="Prestasi">Prestasi</option>
                  <option value="Akademik">Akademik</option>
                  <option value="Sosial">Sosial</option>
                  <option value="Workshop">Workshop</option>
                </select>
              </div>

              <ImageUploadInput
                label="Foto Galeri (URL atau Unggah File)"
                value={newGalleryForm.url}
                onChange={(url) =>
                  setNewGalleryForm({ ...newGalleryForm, url })
                }
                aspectRatio="video"
                helperText="Foto dokumentasi angkatan"
              />

              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsGalleryModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-gradient px-4 py-2 rounded-xl text-white font-semibold"
                >
                  Tambahkan Foto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
