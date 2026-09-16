"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";
import {
  MessageSquare,
  Send,
  Hash,
  Users,
  Mail,
  MapPin,
  Sparkles,
  Copy,
  Check,
  CornerDownRight,
  Smile,
  Search,
  Menu,
  X,
  Bot,
  Heart,
  Flame,
  Rocket,
  Lightbulb,
  ThumbsUp,
  RefreshCw,
  Award,
} from "lucide-react";

type Role = "Siswa" | "Alumni" | "Guru" | "Umum" | "Admin";

interface Reaction {
  emoji: string;
  count: number;
  userReacted?: boolean;
}

interface ChatMessage {
  id: string;
  channelId: string;
  name: string;
  role: Role;
  message: string;
  timestamp: string;
  isSelf?: boolean;
  isBot?: boolean;
  replyTo?: {
    name: string;
    message: string;
  };
  reactions: Reaction[];
  createdAt?: string;
}

interface Channel {
  id: string;
  name: string;
  title: string;
  topic: string;
  icon: React.ElementType;
  badge?: string;
}

const CHANNELS: Channel[] = [
  {
    id: "apresiasi-publik",
    name: "apresiasi-publik",
    title: "Kanal Apresiasi & Buku Tamu",
    topic: "Ruang khusus apresiasi, pesan motivasi & jejak buku tamu resmi siswa XI Internasional SMK Telkom Malang.",
    icon: Award,
    badge: "Apresiasi",
  },
  {
    id: "ngobrol-santai",
    name: "ngobrol-santai",
    title: "Obrolan Santai & Komunitas",
    topic: "Ruang diskusi bebas siswa, alumni, dan teman-teman tanpa bot. Tempat bertukar sapa dan obrolan seru!",
    icon: Hash,
    badge: "Komunitas",
  },
  {
    id: "tanya-pengurus",
    name: "tanya-pengurus",
    title: "Tanya & Kontak Pengurus",
    topic: "Saluran komunikasi dan koordinasi langsung dengan ketua kelas, wali kelas, dan tim pengurus XI Internasional.",
    icon: MessageSquare,
    badge: "Resmi",
  },
  {
    id: "kolaborasi-proyek",
    name: "kolaborasi-proyek",
    title: "Kolaborasi & Ide Tech",
    topic: "Eksplorasi proyek perangkat lunak, hackathon, dan inovasi teknologi bersama siswa SMK Telkom Malang.",
    icon: Sparkles,
    badge: "Tech",
  },
];

const QUICK_EMOJIS = ["🚀", "🔥", "✨", "❤️", "👏", "💡", "🎉", "💻"];

const ROLE_STYLES: Record<Role, { badge: string; text: string; bg: string }> = {
  Admin: {
    badge: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
    text: "text-indigo-400",
    bg: "from-indigo-600 to-cyan-600",
  },
  Guru: {
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    text: "text-emerald-400",
    bg: "from-emerald-600 to-teal-600",
  },
  Alumni: {
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    text: "text-amber-400",
    bg: "from-amber-600 to-orange-600",
  },
  Siswa: {
    badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    text: "text-cyan-400",
    bg: "from-cyan-600 to-blue-600",
  },
  Umum: {
    badge: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    text: "text-purple-400",
    bg: "from-purple-600 to-pink-600",
  },
};

export default function ContactChatPage() {
  const [activeChannelId, setActiveChannelId] = useState<string>("apresiasi-publik");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userName, setUserName] = useState<string>("Tamu Pengunjung");
  const [userRole, setUserRole] = useState<Role>("Umum");
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [typingSender, setTypingSender] = useState<string>("");
  const [replyingTo, setReplyingTo] = useState<ChatMessage | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isInitialMount = useRef(true);

  // Fetch messages from database API
  const fetchMessages = useCallback(async (channelId: string) => {
    try {
      const res = await fetch(`/api/chat?channelId=${channelId}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
      }
    } catch {
      // Fallback handled in services
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages(activeChannelId);
  }, [activeChannelId, fetchMessages]);

  // Scoped Auto Scroll: only within the chat messages container, never the window
  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior,
      });
    }
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
      return;
    }

    scrollToBottom("smooth");
  }, [messages, isTyping, activeChannelId]);

  const activeChannel =
    CHANNELS.find((c) => c.id === activeChannelId) || CHANNELS[0];

  const currentChannelMessages = messages.filter((m) => {
    if (m.channelId !== activeChannelId) return false;
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      m.name.toLowerCase().includes(query) ||
      m.message.toLowerCase().includes(query) ||
      m.role.toLowerCase().includes(query)
    );
  });

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = inputMessage.trim();
    if (!trimmed) return;

    const senderName = userName.trim() || "Pengunjung Anonim";

    const payload = {
      channelId: activeChannelId,
      name: senderName,
      role: userRole,
      message: trimmed,
      timestamp: "Baru saja",
      replyTo: replyingTo
        ? {
            name: replyingTo.name,
            message: replyingTo.message.slice(0, 75) + (replyingTo.message.length > 75 ? "..." : ""),
          }
        : undefined,
      reactions: [],
    };

    // Optimistic append
    const tempId = `msg-${Date.now()}`;
    const optimisticMessage: ChatMessage = {
      ...payload,
      id: tempId,
      isSelf: true,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, optimisticMessage]);
    setInputMessage("");
    setReplyingTo(null);

    // Save to Database via API
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const savedMsg = await res.json();
        // Replace temp id with real db id
        setMessages((prev) =>
          prev.map((m) => (m.id === tempId ? { ...savedMsg, isSelf: true } : m))
        );
      }
    } catch {
      // Handled gracefully
    }

    // Bot response logic: ONLY in #apresiasi-publik (not in #ngobrol-santai)
    if (activeChannelId === "apresiasi-publik") {
      triggerSimulatedBotReply(senderName, trimmed, activeChannelId);
    }
  };

  const triggerSimulatedBotReply = (
    name: string,
    userText: string,
    channelId: string
  ) => {
    const sender = "Internext Assistant";
    setIsTyping(true);
    setTypingSender(sender);

    setTimeout(async () => {
      const greetings = [
        `Halo ${name}! Terima kasih banyak atas apresiasi dan doa terbaiknya untuk seluruh siswa XI Internasional SMK Telkom Malang. Semoga sukses selalu menyertaimu! 🚀✨`,
        `Salam hangat ${name}! Pesan apresiasimu telah abadi tersimpan di buku tamu digital XI Internasional Moklet. Salam sukses selalu dari kami semua! 🎓🎉`,
      ];
      const botResponse = greetings[Math.floor(Math.random() * greetings.length)];

      const botPayload = {
        channelId,
        name: sender,
        role: "Admin" as Role,
        message: botResponse,
        timestamp: "Baru saja",
        isBot: true,
        reactions: [{ emoji: "❤️", count: 1, userReacted: false }],
      };

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(botPayload),
        });
        if (res.ok) {
          const savedBot = await res.json();
          setMessages((prev) => [...prev, savedBot]);
        }
      } catch {
        // Fallback
      }

      setIsTyping(false);
      setTypingSender("");
    }, 1200);
  };

  const handleToggleReaction = async (msgId: string, emoji: string) => {
    // Optimistic UI update
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id !== msgId) return msg;
        const existing = msg.reactions.find((r) => r.emoji === emoji);
        if (existing) {
          const nextReacted = !existing.userReacted;
          const updatedReactions = msg.reactions
            .map((r) =>
              r.emoji === emoji
                ? {
                    ...r,
                    count: nextReacted ? r.count + 1 : Math.max(0, r.count - 1),
                    userReacted: nextReacted,
                  }
                : r
            )
            .filter((r) => r.count > 0);
          return { ...msg, reactions: updatedReactions };
        } else {
          return {
            ...msg,
            reactions: [...msg.reactions, { emoji, count: 1, userReacted: true }],
          };
        }
      })
    );

    // Save reaction to database
    try {
      await fetch("/api/chat/react", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageId: msgId, emoji }),
      });
    } catch {
      // Ignored
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.socials.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleInsertEmoji = (emoji: string) => {
    setInputMessage((prev) => prev + emoji);
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0F1E] text-slate-100 selection:bg-[#06B6D4]/30 selection:text-cyan-200">
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 pt-24 pb-16 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Page Top Title */}
        <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4F46E5]/15 border border-[#4F46E5]/30 text-xs font-mono text-[#A5B4FC] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
              <span>Database Integrated • PostgreSQL Ready</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Kontak & <span className="text-gradient-cyan">Buku Tamu Interaktif</span>
            </h1>
            <p className="text-sm text-[#94A3B8] mt-1">
              Ruang obrolan langsung dan buku tamu digital kelas XI Internasional SMK Telkom Malang. Tersimpan permanen ke database!
            </p>
          </div>

          {/* Quick status pill */}
          <div className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] px-4 py-2.5 rounded-2xl self-start md:self-auto text-xs">
            <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981]" />
            <div>
              <p className="font-medium text-white">{siteConfig.classInfo.memberCount} Siswa Moklet</p>
              <p className="text-[11px] text-[#06B6D4]">Lab TI & IoT Aktif • Terhubung Database</p>
            </div>
          </div>
        </div>

        {/* Chat Application Layout */}
        <div className="glass-card border-white/[0.1] rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row h-[720px] max-h-[82vh] relative">
          {/* ============================================================ */}
          {/* LEFT COLUMN: Channels & Direct Contacts (Sidebar)             */}
          {/* ============================================================ */}
          <aside
            className={`
              fixed lg:static inset-y-0 left-0 z-40
              w-72 sm:w-80 lg:w-72 xl:w-80 shrink-0
              bg-[#0E1528] lg:bg-transparent
              border-r border-white/[0.08] flex flex-col
              transition-transform duration-300 ease-in-out
              ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}
          >
            {/* Sidebar Header */}
            <div className="p-4 border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] flex items-center justify-center text-white shadow-md">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm text-white leading-tight">
                    Internext Chat
                  </h3>
                  <span className="text-[10px] font-mono text-[#06B6D4] block">
                    XI Internasional • Moklet
                  </span>
                </div>
              </div>

              {/* Close button on mobile */}
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/[0.08]"
                aria-label="Tutup sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Channels List */}
            <div className="p-3 space-y-1">
              <span className="px-3 text-[11px] font-mono uppercase tracking-wider text-[#64748B] block mb-2">
                Kanal Obrolan
              </span>
              {CHANNELS.map((ch) => {
                const IconComponent = ch.icon;
                const isActive = ch.id === activeChannelId;

                return (
                  <button
                    key={ch.id}
                    onClick={() => {
                      setActiveChannelId(ch.id);
                      setSidebarOpen(false);
                    }}
                    className={`
                      w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-medium transition-all group
                      ${
                        isActive
                          ? "bg-gradient-to-r from-[#4F46E5]/30 to-[#06B6D4]/15 text-white border border-[#06B6D4]/40 shadow-sm"
                          : "text-[#94A3B8] hover:text-white hover:bg-white/[0.05]"
                      }
                    `}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <IconComponent
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive ? "text-[#06B6D4]" : "text-[#64748B] group-hover:text-[#A5B4FC]"
                        }`}
                      />
                      <span className="truncate font-mono">{ch.name}</span>
                    </div>

                    {ch.badge && (
                      <span
                        className={`text-[9px] px-2 py-0.5 rounded-full font-mono shrink-0 ${
                          ch.id === "apresiasi-publik"
                            ? "bg-[#CCFF00]/20 text-[#CCFF00] border border-[#CCFF00]/30 font-bold"
                            : "bg-[#06B6D4]/20 text-[#06B6D4]"
                        }`}
                      >
                        {ch.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Direct Official Contact Cards */}
            <div className="mt-auto p-4 border-t border-white/[0.08] space-y-3 bg-white/[0.02]">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#64748B] block">
                Kontak Resmi Tim
              </span>

              {/* Email Card with Copy Button */}
              <div className="p-3 rounded-xl bg-[#0A0F1E]/60 border border-white/[0.06] flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-[#64748B] block">Email Resmi</span>
                  <a
                    href={`mailto:${siteConfig.socials.email}`}
                    className="text-xs text-white hover:text-[#06B6D4] truncate font-mono block transition-colors"
                  >
                    {siteConfig.socials.email}
                  </a>
                </div>
                <button
                  onClick={handleCopyEmail}
                  title="Salin alamat email"
                  className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-[#94A3B8] hover:text-white transition-all shrink-0 relative"
                >
                  {copiedEmail ? (
                    <Check className="w-3.5 h-3.5 text-[#10B981]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  {copiedEmail && (
                    <span className="absolute -top-7 right-0 text-[10px] bg-[#10B981] text-black font-semibold px-2 py-0.5 rounded shadow">
                      Tersalin!
                    </span>
                  )}
                </button>
              </div>

              {/* Campus Location Card */}
              <div className="p-3 rounded-xl bg-[#0A0F1E]/60 border border-white/[0.06] flex items-start gap-2.5 text-xs">
                <MapPin className="w-4 h-4 text-[#06B6D4] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-mono text-[#64748B] block">Lokasi Kampus</span>
                  <p className="text-white font-medium">{siteConfig.classInfo.school}</p>
                  <p className="text-[11px] text-[#94A3B8]">{siteConfig.classInfo.labLocation}</p>
                </div>
              </div>

              {/* Class Leadership Pill */}
              <div className="p-3 rounded-xl bg-[#0A0F1E]/60 border border-white/[0.06] text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#64748B]">Ketua Kelas</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#10B981]/15 text-[#10B981] font-mono">
                    Online
                  </span>
                </div>
                <p className="text-white font-medium mt-0.5">
                  {siteConfig.classInfo.classPresident}
                </p>
                <p className="text-[11px] text-[#64748B]">
                  Wali Kelas: {siteConfig.classInfo.homeroomTeacher}
                </p>
              </div>
            </div>
          </aside>

          {/* Backdrop for mobile drawer */}
          {sidebarOpen && (
            <div
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
            />
          )}

          {/* ============================================================ */}
          {/* RIGHT COLUMN: Active Chat Stream & Message Input              */}
          {/* ============================================================ */}
          <div className="flex-1 flex flex-col h-full bg-[#0A0F1E]/90 min-w-0">
            {/* Chat Top Header */}
            <div className="h-16 px-4 sm:px-6 border-b border-white/[0.08] flex items-center justify-between gap-3 bg-white/[0.01]">
              <div className="flex items-center gap-3 min-w-0">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white shrink-0"
                  aria-label="Buka saluran"
                >
                  <Menu className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 min-w-0">
                  <activeChannel.icon className="w-5 h-5 text-[#06B6D4] shrink-0" />
                  <div className="min-w-0">
                    <h2 className="font-heading font-bold text-sm sm:text-base text-white truncate">
                      #{activeChannel.name}
                    </h2>
                    <p className="text-[11px] text-[#94A3B8] truncate hidden sm:block">
                      {activeChannel.topic}
                    </p>
                  </div>
                </div>
              </div>

              {/* Search & Refresh in channel */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => fetchMessages(activeChannelId)}
                  title="Segarkan pesan dari database"
                  className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-[#94A3B8] hover:text-white transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                </button>

                <div className="relative w-32 sm:w-52 shrink-0">
                  <Search className="w-3.5 h-3.5 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Cari pesan..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#06B6D4] transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 scroll-smooth"
            >
              {/* Channel Welcome Banner Card */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#4F46E5]/10 via-[#06B6D4]/5 to-transparent border border-white/[0.06] mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#06B6D4]/15 text-[#06B6D4] flex items-center justify-center shrink-0">
                    <activeChannel.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-white">
                      Selamat datang di #{activeChannel.name}
                    </h4>
                    <p className="text-xs text-[#94A3B8] mt-0.5">
                      {activeChannel.topic}
                    </p>
                    {activeChannel.id === "apresiasi-publik" && (
                      <span className="inline-block mt-2 text-[10px] font-mono px-2 py-0.5 rounded bg-[#CCFF00]/15 text-[#CCFF00] border border-[#CCFF00]/30 font-semibold">
                        ✨ Kanal Apresiasi Resmi • Jejak Buku Tamu Digital
                      </span>
                    )}
                    {activeChannel.id === "ngobrol-santai" && (
                      <span className="inline-block mt-2 text-[10px] font-mono px-2 py-0.5 rounded bg-[#06B6D4]/15 text-[#06B6D4] border border-[#06B6D4]/30 font-semibold">
                        💬 Obrolan Murni • Tanpa Bot Otomatis
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Filter Notice */}
              {searchQuery && (
                <div className="text-xs font-mono text-[#06B6D4] bg-[#06B6D4]/10 border border-[#06B6D4]/20 p-2 rounded-lg flex items-center justify-between">
                  <span>Hasil pencarian untuk: &ldquo;{searchQuery}&rdquo; ({currentChannelMessages.length} ditemukan)</span>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="underline hover:text-white text-[11px]"
                  >
                    Reset
                  </button>
                </div>
              )}

              {/* Empty State */}
              {currentChannelMessages.length === 0 && !loading && (
                <div className="text-center py-12 text-[#64748B]">
                  <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p className="text-sm">Belum ada pesan di kanal #{activeChannel.name}.</p>
                  <p className="text-xs text-[#475569]">Jadilah yang pertama menulis pesan!</p>
                </div>
              )}

              {/* Message Items */}
              {currentChannelMessages.map((msg) => {
                const roleStyle = ROLE_STYLES[msg.role] || ROLE_STYLES.Umum;
                const isUser = msg.isSelf;

                return (
                  <div
                    key={msg.id}
                    className={`group flex items-start gap-3 transition-colors rounded-xl p-2 sm:p-2.5 -mx-2 hover:bg-white/[0.02] ${
                      isUser ? "flex-row-reverse" : ""
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs text-white shadow-md bg-gradient-to-br ${
                        msg.isBot
                          ? "from-violet-600 to-fuchsia-600"
                          : roleStyle.bg
                      }`}
                    >
                      {msg.isBot ? (
                        <Bot className="w-4 h-4" />
                      ) : (
                        msg.name.charAt(0).toUpperCase()
                      )}
                    </div>

                    {/* Content Column */}
                    <div
                      className={`flex flex-col max-w-[85%] sm:max-w-[78%] ${
                        isUser ? "items-end" : "items-start"
                      }`}
                    >
                      {/* Meta header (Name, Role, Timestamp) */}
                      <div
                        className={`flex items-center gap-2 mb-1 text-xs ${
                          isUser ? "flex-row-reverse" : ""
                        }`}
                      >
                        <span className="font-heading font-bold text-white">
                          {msg.name}
                        </span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${roleStyle.badge}`}
                        >
                          {msg.role}
                        </span>
                        {isUser && (
                          <span className="text-[10px] font-mono text-[#06B6D4] bg-[#06B6D4]/10 px-1.5 py-0.5 rounded">
                            Anda
                          </span>
                        )}
                        <span className="text-[10px] font-mono text-[#64748B]">
                          {msg.timestamp}
                        </span>
                      </div>

                      {/* Quoted reply if any */}
                      {msg.replyTo && (
                        <div
                          className={`mb-1.5 px-3 py-1 rounded-lg bg-white/[0.04] border-l-2 border-[#06B6D4] text-[11px] text-[#94A3B8] flex items-center gap-1.5 ${
                            isUser ? "text-right" : ""
                          }`}
                        >
                          <CornerDownRight className="w-3 h-3 text-[#06B6D4] shrink-0" />
                          <span>
                            Membalas <strong className="text-white">{msg.replyTo.name}</strong>: &ldquo;{msg.replyTo.message}&rdquo;
                          </span>
                        </div>
                      )}

                      {/* Message Bubble */}
                      <div
                        className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                          isUser
                            ? "bg-gradient-to-r from-[#4F46E5]/90 to-[#06B6D4]/90 text-white rounded-tr-none border border-cyan-400/30"
                            : msg.isBot
                            ? "bg-[#161F38] text-[#E2E8F0] rounded-tl-none border border-violet-500/30 shadow-violet-500/5"
                            : "bg-[#111827] text-[#CBD5E1] rounded-tl-none border border-white/[0.08]"
                        }`}
                      >
                        <p className="whitespace-pre-line">{msg.message}</p>
                      </div>

                      {/* Action & Reaction Bar */}
                      <div
                        className={`flex flex-wrap items-center gap-1.5 mt-2 ${
                          isUser ? "justify-end" : "justify-start"
                        }`}
                      >
                        {/* Render Reactions */}
                        {msg.reactions.map((r, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleToggleReaction(msg.id, r.emoji)}
                            className={`
                              inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-mono transition-all
                              ${
                                r.userReacted
                                  ? "bg-[#06B6D4]/25 text-[#06B6D4] border border-[#06B6D4]/50 scale-105"
                                  : "bg-white/[0.04] text-[#94A3B8] hover:bg-white/[0.08] border border-white/[0.05]"
                              }
                            `}
                          >
                            <span>{r.emoji}</span>
                            <span className="text-[10px]">{r.count}</span>
                          </button>
                        ))}

                        {/* Quick Reaction Shortcut Buttons */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                          {["❤️", "🔥", "🚀"].map((emoji) => (
                            <button
                              key={emoji}
                              onClick={() => handleToggleReaction(msg.id, emoji)}
                              className="text-[11px] p-1 rounded hover:bg-white/[0.1] transition-transform hover:scale-125"
                              title={`Beri reaksi ${emoji}`}
                            >
                              {emoji}
                            </button>
                          ))}

                          <button
                            onClick={() => {
                              setReplyingTo(msg);
                              inputRef.current?.focus();
                            }}
                            className="text-[10px] font-mono text-[#64748B] hover:text-[#06B6D4] px-1.5 py-0.5 rounded hover:bg-white/[0.06] flex items-center gap-1 ml-1"
                          >
                            <CornerDownRight className="w-3 h-3" />
                            <span>Balas</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Bot Typing Indicator */}
              {isTyping && (
                <div className="flex items-center gap-3 text-xs text-[#94A3B8] p-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white shrink-0">
                    <Bot className="w-4 h-4 animate-pulse" />
                  </div>
                  <div className="bg-[#161F38] border border-violet-500/20 px-3.5 py-2 rounded-2xl rounded-tl-none flex items-center gap-2">
                    <span className="font-semibold text-white text-[11px]">
                      {typingSender}
                    </span>
                    <span className="text-[11px] text-[#94A3B8]">sedang mengetik</span>
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-bounce [animation-delay:0.4s]" />
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* ============================================================ */}
            {/* BOTTOM INPUT BAR: Identity, Emojis, Input & Send Button      */}
            {/* ============================================================ */}
            <div className="p-3 sm:p-4 border-t border-white/[0.08] bg-[#0E1528]/80 backdrop-blur-md">
              {replyingTo && (
                <div className="mb-2 px-3 py-1.5 rounded-xl bg-[#4F46E5]/15 border border-[#4F46E5]/30 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 truncate text-[#A5B4FC]">
                    <CornerDownRight className="w-3.5 h-3.5 shrink-0 text-[#06B6D4]" />
                    <span className="truncate">
                      Membalas <strong>{replyingTo.name}</strong>: &ldquo;{replyingTo.message}&rdquo;
                    </span>
                  </div>
                  <button
                    onClick={() => setReplyingTo(null)}
                    className="p-1 text-[#94A3B8] hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* User Identity Selector Strip */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5 pb-2 border-b border-white/[0.05] text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-[#64748B]">Kirim sebagai:</span>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Nama Anda"
                    className="bg-white/[0.05] border border-white/[0.08] rounded-lg px-2.5 py-1 text-xs text-white font-medium focus:outline-none focus:border-[#06B6D4] w-32 sm:w-40"
                  />
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-mono text-[#64748B] hidden sm:inline">Peran:</span>
                  {(["Siswa", "Alumni", "Guru", "Umum"] as Role[]).map((role) => {
                    const isSelected = userRole === role;
                    return (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setUserRole(role)}
                        className={`
                          px-2 py-0.5 rounded-md text-[10px] font-mono transition-all
                          ${
                            isSelected
                              ? "bg-[#06B6D4] text-black font-bold shadow-sm"
                              : "bg-white/[0.04] text-[#94A3B8] hover:text-white hover:bg-white/[0.08]"
                          }
                        `}
                      >
                        {role}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message Input & Actions */}
              <form onSubmit={handleSendMessage} className="space-y-2">
                <div className="relative flex items-center">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={
                      activeChannel.id === "apresiasi-publik"
                        ? "Tuliskan ucapan apresiasi & motivasi untuk XI Internasional..."
                        : `Kirim pesan santai ke #${activeChannel.name}...`
                    }
                    className="w-full bg-[#0A0F1E] border border-white/[0.1] rounded-xl pl-4 pr-24 py-3 text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#06B6D4] transition-colors"
                  />

                  {/* Send Button */}
                  <button
                    type="submit"
                    disabled={!inputMessage.trim()}
                    className={`
                      absolute right-1.5 px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all
                      ${
                        inputMessage.trim()
                          ? "btn-gradient shadow-md cursor-pointer"
                          : "bg-white/[0.05] text-[#64748B] cursor-not-allowed"
                      }
                    `}
                  >
                    <span>Kirim</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Quick Emoji Bar & Hint */}
                <div className="flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1 overflow-x-auto py-0.5 no-scrollbar">
                    <span className="text-[10px] font-mono text-[#64748B] mr-1 hidden sm:inline">
                      Cepat:
                    </span>
                    {QUICK_EMOJIS.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => handleInsertEmoji(emoji)}
                        className="p-1 hover:bg-white/[0.1] rounded text-xs transition-transform hover:scale-125"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>

                  <span className="text-[10px] font-mono text-[#475569] hidden md:inline">
                    Tekan <strong>Enter ↵</strong> untuk kirim • Tersimpan ke database
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
