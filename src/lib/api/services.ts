import {
  Member,
  Project,
  Article,
  EventItem,
  GalleryItem,
  Achievement,
  GuestbookEntry,
  ClassProfile,
  ChatMessage,
  ChatChannel,
} from "../types";
import {
  mockMembers,
  mockProjects,
  mockArticles,
  mockEvents,
  mockGallery,
  mockAchievements,
  mockGuestbook,
} from "../data/mock";
import { siteConfig } from "@/config/site";
import { prisma } from "../db/prisma";

// Fallback in-memory state for local environments where PostgreSQL container is not yet initialized
let fallbackProfile: ClassProfile = {
  name: siteConfig.classInfo.name,
  generation: siteConfig.classInfo.generation,
  school: siteConfig.classInfo.school,
  tagline: siteConfig.tagline,
  description: siteConfig.description,
  homeroomTeacher: siteConfig.classInfo.homeroomTeacher,
  classPresident: siteConfig.classInfo.classPresident,
  vicePresident: siteConfig.classInfo.vicePresident,
  memberCount: siteConfig.classInfo.memberCount,
  projectCount: siteConfig.classInfo.projectCount,
  achievementCount: siteConfig.classInfo.achievementCount,
  eventCount: siteConfig.classInfo.eventCount,
  labLocation: siteConfig.classInfo.labLocation,
  email: siteConfig.socials.email,
  instagram: siteConfig.socials.instagram,
  github: siteConfig.socials.github,
  youtube: siteConfig.socials.youtube,
  tiktok: siteConfig.socials.tiktok,
};

let fallbackMembers: Member[] = [...mockMembers];
let fallbackProjects: Project[] = [...mockProjects];
let fallbackArticles: Article[] = [...mockArticles];
let fallbackEvents: EventItem[] = [...mockEvents];
let fallbackGallery: GalleryItem[] = [...mockGallery];

let fallbackChannels: ChatChannel[] = [
  {
    id: "apresiasi-publik",
    name: "apresiasi-publik",
    title: "Kanal Apresiasi & Buku Tamu",
    topic: "Ruang apresiasi, doa, dan motivasi bagi siswa XI Internasional SMK Telkom Malang.",
    badge: "Utama",
  },
  {
    id: "ngobrol-santai",
    name: "ngobrol-santai",
    title: "Obrolan Santai Siswa & Tamu",
    topic: "Kanal obrolan bebas tanpa bot untuk berdiskusi santai!",
    badge: "Komunitas",
  },
  {
    id: "tanya-pengurus",
    name: "tanya-pengurus",
    title: "Tanya & Kontak Pengurus",
    topic: "Saluran komunikasi langsung dengan ketua kelas dan wali kelas.",
    badge: "Resmi",
  },
  {
    id: "kolaborasi-proyek",
    name: "kolaborasi-proyek",
    title: "Kolaborasi & Ide Tech",
    topic: "Eksplorasi ide aplikasi dan kerja sama teknologi bareng anak Moklet.",
    badge: "Tech",
  },
];

let fallbackMessages: ChatMessage[] = [
  {
    id: "chat-apresiasi-1",
    channelId: "apresiasi-publik",
    name: "Drs. Hendra Kusuma, M.Kom",
    role: "Guru",
    message:
      "Bangga melihat dedikasi dan kerja sama anak-anak XI Internasional SMK Telkom Malang. Teruslah berkarya dan jadilah engineer berintegritas tinggi!",
    timestamp: "10 Feb 2026, 10:00",
    reactions: [
      { emoji: "❤️", count: 24, userReacted: false },
      { emoji: "👏", count: 16, userReacted: false },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "chat-apresiasi-2",
    channelId: "apresiasi-publik",
    name: "Kevin Pratama, S.Kom (Alumni Moklet)",
    role: "Alumni",
    message:
      "Website kelasnya luar biasa keren! Nuansa dark mode dan portofolio 360-nya serasa tech startup silicon valley. Keren banget adik-adik XI Internasional.",
    timestamp: "14 Feb 2026, 14:30",
    reactions: [
      { emoji: "🔥", count: 19, userReacted: false },
      { emoji: "🚀", count: 11, userReacted: false },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "chat-santai-1",
    channelId: "ngobrol-santai",
    name: "Fakhri Ramadhan",
    role: "Siswa",
    message:
      "Halo semuanya! Selamat datang di kanal ngobrol santai XI Internasional. Di sini bebas berdiskusi seputar projek, sharing ilmu, atau sekadar sapa-sapaan! ☕👋",
    timestamp: "Hari ini, 09:00",
    reactions: [{ emoji: "🚀", count: 8, userReacted: false }],
    createdAt: new Date().toISOString(),
  },
];

// =========================================================================
// 1. CLASS PROFILE SERVICES
// =========================================================================
export async function getClassProfile(): Promise<ClassProfile> {
  try {
    const profile = await prisma.classProfile.findUnique({
      where: { id: "default" },
    });
    if (profile) {
      return {
        name: profile.name,
        generation: profile.generation,
        school: profile.school,
        tagline: profile.tagline,
        description: profile.description,
        homeroomTeacher: profile.homeroomTeacher,
        classPresident: profile.classPresident,
        vicePresident: profile.vicePresident,
        memberCount: profile.memberCount,
        projectCount: profile.projectCount,
        achievementCount: profile.achievementCount,
        eventCount: profile.eventCount,
        labLocation: profile.labLocation,
        email: profile.email,
        instagram: profile.instagram,
        github: profile.github,
        youtube: profile.youtube,
        tiktok: profile.tiktok,
      };
    }
  } catch {
    // Fallback to local memory if database not connected yet
  }
  return fallbackProfile;
}

export async function updateClassProfile(
  data: Partial<ClassProfile>
): Promise<ClassProfile> {
  try {
    const updated = await prisma.classProfile.upsert({
      where: { id: "default" },
      update: data,
      create: {
        id: "default",
        ...fallbackProfile,
        ...data,
      },
    });
    fallbackProfile = { ...fallbackProfile, ...updated };
    return fallbackProfile;
  } catch {
    fallbackProfile = { ...fallbackProfile, ...data };
    return fallbackProfile;
  }
}

// =========================================================================
// 2. MEMBERS SERVICES (Cards & Nahkoda)
// =========================================================================
export async function getMembers(filterRole?: string): Promise<Member[]> {
  try {
    const members = await prisma.member.findMany({
      orderBy: { orderIndex: "asc" },
    });
    if (members && members.length > 0) {
      const mapped: Member[] = members.map((m) => ({
        id: m.id,
        name: m.name,
        nickname: m.nickname,
        role: m.role,
        department: m.department || undefined,
        quote: m.quote,
        bio: m.bio,
        avatar: m.avatar,
        skills: m.skills,
        portfolioUrl: m.portfolioUrl || undefined,
        githubUrl: m.githubUrl || undefined,
        instagramUrl: m.instagramUrl || undefined,
        linkedinUrl: m.linkedinUrl || undefined,
        isManagement: m.isManagement,
        isAlumni: m.isAlumni,
      }));

      if (!filterRole || filterRole === "all") return mapped;
      if (filterRole === "management") return mapped.filter((m) => m.isManagement);
      if (filterRole === "alumni") return mapped.filter((m) => m.isAlumni);
      return mapped.filter((m) => m.role.toLowerCase() === filterRole.toLowerCase());
    }
  } catch {
    // Fallback to local memory
  }

  if (!filterRole || filterRole === "all") return fallbackMembers;
  if (filterRole === "management") return fallbackMembers.filter((m) => m.isManagement);
  if (filterRole === "alumni") return fallbackMembers.filter((m) => m.isAlumni);
  return fallbackMembers.filter((m) => m.role.toLowerCase() === filterRole.toLowerCase());
}

export async function getMemberById(id: string): Promise<Member | null> {
  try {
    const m = await prisma.member.findUnique({ where: { id } });
    if (m) {
      return {
        id: m.id,
        name: m.name,
        nickname: m.nickname,
        role: m.role,
        department: m.department || undefined,
        quote: m.quote,
        bio: m.bio,
        avatar: m.avatar,
        skills: m.skills,
        portfolioUrl: m.portfolioUrl || undefined,
        githubUrl: m.githubUrl || undefined,
        instagramUrl: m.instagramUrl || undefined,
        linkedinUrl: m.linkedinUrl || undefined,
        isManagement: m.isManagement,
        isAlumni: m.isAlumni,
      };
    }
  } catch {
    // Fallback
  }
  return fallbackMembers.find((m) => m.id === id) || null;
}

export async function saveMember(member: Member): Promise<Member> {
  try {
    await prisma.member.upsert({
      where: { id: member.id },
      update: {
        name: member.name,
        nickname: member.nickname,
        role: member.role,
        department: member.department || null,
        quote: member.quote,
        bio: member.bio,
        avatar: member.avatar,
        skills: member.skills,
        portfolioUrl: member.portfolioUrl || null,
        githubUrl: member.githubUrl || null,
        instagramUrl: member.instagramUrl || null,
        linkedinUrl: member.linkedinUrl || null,
        isManagement: member.isManagement,
        isAlumni: member.isAlumni || false,
      },
      create: {
        id: member.id,
        name: member.name,
        nickname: member.nickname,
        role: member.role,
        department: member.department || null,
        quote: member.quote,
        bio: member.bio,
        avatar: member.avatar,
        skills: member.skills,
        portfolioUrl: member.portfolioUrl || null,
        githubUrl: member.githubUrl || null,
        instagramUrl: member.instagramUrl || null,
        linkedinUrl: member.linkedinUrl || null,
        isManagement: member.isManagement,
        isAlumni: member.isAlumni || false,
      },
    });
  } catch {
    // Fallback
  }
  const index = fallbackMembers.findIndex((m) => m.id === member.id);
  if (index >= 0) {
    fallbackMembers[index] = member;
  } else {
    fallbackMembers.push(member);
  }
  return member;
}

export async function deleteMember(id: string): Promise<boolean> {
  try {
    await prisma.member.delete({ where: { id } });
  } catch {
    // Fallback
  }
  fallbackMembers = fallbackMembers.filter((m) => m.id !== id);
  return true;
}

// =========================================================================
// 3. PROJECTS SERVICES (Showcase 360° & Portfolio)
// =========================================================================
export async function getProjects(category?: string): Promise<Project[]> {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    if (projects && projects.length > 0) {
      const mapped: Project[] = projects.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        tagline: p.tagline,
        description: p.description,
        category: p.category as any,
        thumbnail: p.thumbnail,
        screenshots: p.screenshots,
        demoUrl: p.demoUrl || undefined,
        githubUrl: p.githubUrl || undefined,
        techStack: p.techStack,
        team: p.team,
        featured: p.featured,
        likes: p.likes,
        year: p.year,
      }));
      if (!category || category === "all") return mapped;
      return mapped.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }
  } catch {
    // Fallback
  }

  if (!category || category === "all") return fallbackProjects;
  return fallbackProjects.filter((p) => p.category.toLowerCase() === category.toLowerCase());
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const decoded = decodeURIComponent(slug).trim();
  try {
    const p = await prisma.project.findFirst({
      where: {
        OR: [
          { slug: slug },
          { slug: decoded },
          { slug: decoded.toLowerCase() },
          { id: slug },
          { id: decoded },
        ],
      },
    });
    if (p) {
      return {
        id: p.id,
        title: p.title,
        slug: p.slug,
        tagline: p.tagline,
        description: p.description,
        category: p.category as any,
        thumbnail: p.thumbnail,
        screenshots: p.screenshots,
        demoUrl: p.demoUrl || undefined,
        githubUrl: p.githubUrl || undefined,
        techStack: p.techStack,
        team: p.team,
        featured: p.featured,
        likes: p.likes,
        year: p.year,
      };
    }
  } catch {
    // Fallback
  }
  return (
    fallbackProjects.find(
      (p) =>
        p.slug === slug ||
        p.slug.toLowerCase() === decoded.toLowerCase() ||
        p.id === slug ||
        p.id.toLowerCase() === decoded.toLowerCase()
    ) || null
  );
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const all = await getProjects();
  return all.filter((p) => p.featured);
}

export async function saveProject(project: Project): Promise<Project> {
  try {
    await prisma.project.upsert({
      where: { id: project.id },
      update: {
        title: project.title,
        slug: project.slug,
        tagline: project.tagline,
        description: project.description,
        category: project.category,
        thumbnail: project.thumbnail,
        screenshots: project.screenshots || [],
        demoUrl: project.demoUrl || null,
        githubUrl: project.githubUrl || null,
        techStack: project.techStack,
        team: project.team,
        featured: project.featured,
        likes: project.likes,
        year: project.year,
      },
      create: {
        id: project.id,
        title: project.title,
        slug: project.slug,
        tagline: project.tagline,
        description: project.description,
        category: project.category,
        thumbnail: project.thumbnail,
        screenshots: project.screenshots || [],
        demoUrl: project.demoUrl || null,
        githubUrl: project.githubUrl || null,
        techStack: project.techStack,
        team: project.team,
        featured: project.featured,
        likes: project.likes,
        year: project.year,
      },
    });
  } catch {
    // Fallback
  }
  const idx = fallbackProjects.findIndex((p) => p.id === project.id);
  if (idx >= 0) fallbackProjects[idx] = project;
  else fallbackProjects.unshift(project);
  return project;
}

export async function deleteProject(id: string): Promise<boolean> {
  try {
    await prisma.project.delete({ where: { id } });
  } catch {
    // Fallback
  }
  fallbackProjects = fallbackProjects.filter((p) => p.id !== id);
  return true;
}

// =========================================================================
// 4. ARTICLES & NEWS SERVICES
// =========================================================================
export async function getArticles(category?: string): Promise<Article[]> {
  try {
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: "desc" },
    });
    if (articles && articles.length > 0) {
      const mapped: Article[] = articles.map((a) => ({
        id: a.id,
        title: a.title,
        slug: a.slug,
        summary: a.summary,
        content: a.content,
        category: a.category as any,
        author: {
          name: a.authorName,
          avatar: a.authorAvatar,
          role: a.authorRole,
        },
        date: a.date,
        coverImage: a.coverImage,
        isPinned: a.isPinned,
        readTime: a.readTime,
        tags: a.tags,
      }));
      if (!category || category === "all") return mapped;
      return mapped.filter((a) => a.category.toLowerCase() === category.toLowerCase());
    }
  } catch {
    // Fallback
  }

  if (!category || category === "all") return fallbackArticles;
  return fallbackArticles.filter((a) => a.category.toLowerCase() === category.toLowerCase());
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const all = await getArticles();
  return all.find((a) => a.slug === slug) || null;
}

export async function saveArticle(article: Article): Promise<Article> {
  try {
    await prisma.article.upsert({
      where: { id: article.id },
      update: {
        title: article.title,
        slug: article.slug,
        summary: article.summary,
        content: article.content,
        category: article.category,
        authorName: article.author.name,
        authorAvatar: article.author.avatar,
        authorRole: article.author.role,
        date: article.date,
        coverImage: article.coverImage,
        isPinned: article.isPinned || false,
        readTime: article.readTime,
        tags: article.tags,
      },
      create: {
        id: article.id,
        title: article.title,
        slug: article.slug,
        summary: article.summary,
        content: article.content,
        category: article.category,
        authorName: article.author.name,
        authorAvatar: article.author.avatar,
        authorRole: article.author.role,
        date: article.date,
        coverImage: article.coverImage,
        isPinned: article.isPinned || false,
        readTime: article.readTime,
        tags: article.tags,
      },
    });
  } catch {
    // Fallback
  }
  const idx = fallbackArticles.findIndex((a) => a.id === article.id);
  if (idx >= 0) fallbackArticles[idx] = article;
  else fallbackArticles.unshift(article);
  return article;
}

export async function deleteArticle(id: string): Promise<boolean> {
  try {
    await prisma.article.delete({ where: { id } });
  } catch {
    // Fallback
  }
  fallbackArticles = fallbackArticles.filter((a) => a.id !== id);
  return true;
}

// =========================================================================
// 5. EVENTS SERVICES
// =========================================================================
export async function getEvents(): Promise<EventItem[]> {
  try {
    const events = await prisma.event.findMany({
      orderBy: { createdAt: "desc" },
    });
    if (events && events.length > 0) {
      return events.map((e) => ({
        id: e.id,
        title: e.title,
        description: e.description,
        date: e.date,
        endDate: e.endDate || undefined,
        location: e.location,
        committee: e.committee,
        category: e.category as any,
        status: e.status as any,
        countdownTarget: e.countdownTarget || undefined,
        coverImage: e.coverImage,
      }));
    }
  } catch {
    // Fallback
  }
  return fallbackEvents;
}

export async function saveEvent(event: EventItem): Promise<EventItem> {
  try {
    await prisma.event.upsert({
      where: { id: event.id },
      update: {
        title: event.title,
        description: event.description,
        date: event.date,
        endDate: event.endDate || null,
        location: event.location,
        committee: event.committee,
        category: event.category,
        status: event.status,
        countdownTarget: event.countdownTarget || null,
        coverImage: event.coverImage,
      },
      create: {
        id: event.id,
        title: event.title,
        description: event.description,
        date: event.date,
        endDate: event.endDate || null,
        location: event.location,
        committee: event.committee,
        category: event.category,
        status: event.status,
        countdownTarget: event.countdownTarget || null,
        coverImage: event.coverImage,
      },
    });
  } catch {
    // Fallback
  }
  const idx = fallbackEvents.findIndex((e) => e.id === event.id);
  if (idx >= 0) fallbackEvents[idx] = event;
  else fallbackEvents.push(event);
  return event;
}

export async function deleteEvent(id: string): Promise<boolean> {
  try {
    await prisma.event.delete({ where: { id } });
  } catch {
    // Fallback
  }
  fallbackEvents = fallbackEvents.filter((e) => e.id !== id);
  return true;
}

// =========================================================================
// 6. GALLERY SERVICES
// =========================================================================
export async function getGallery(type?: "photo" | "video"): Promise<GalleryItem[]> {
  try {
    const gallery = await prisma.gallery.findMany({
      orderBy: { createdAt: "desc" },
    });
    if (gallery && gallery.length > 0) {
      const mapped: GalleryItem[] = gallery.map((g) => ({
        id: g.id,
        title: g.title,
        type: g.type as any,
        url: g.url,
        thumbnail: g.thumbnail,
        album: g.album,
        date: g.date,
        photographer: g.photographer,
        caption: g.caption,
        likes: g.likes,
      }));
      if (!type) return mapped;
      return mapped.filter((g) => g.type === type);
    }
  } catch {
    // Fallback
  }
  if (!type) return fallbackGallery;
  return fallbackGallery.filter((g) => g.type === type);
}

export async function saveGallery(item: GalleryItem): Promise<GalleryItem> {
  try {
    await prisma.gallery.upsert({
      where: { id: item.id },
      update: {
        title: item.title,
        type: item.type,
        url: item.url,
        thumbnail: item.thumbnail,
        album: item.album,
        date: item.date,
        photographer: item.photographer,
        caption: item.caption,
        likes: item.likes,
      },
      create: {
        id: item.id,
        title: item.title,
        type: item.type,
        url: item.url,
        thumbnail: item.thumbnail,
        album: item.album,
        date: item.date,
        photographer: item.photographer,
        caption: item.caption,
        likes: item.likes,
      },
    });
  } catch {
    // Fallback
  }
  const idx = fallbackGallery.findIndex((g) => g.id === item.id);
  if (idx >= 0) {
    fallbackGallery[idx] = item;
  } else {
    fallbackGallery.unshift(item);
  }
  return item;
}

export async function deleteGallery(id: string): Promise<boolean> {
  try {
    await prisma.gallery.delete({ where: { id } });
  } catch {
    // Fallback
  }
  fallbackGallery = fallbackGallery.filter((g) => g.id !== id);
  return true;
}

export async function getAchievements(): Promise<Achievement[]> {
  return mockAchievements;
}

// =========================================================================
// 7. CHAT & APPRECIATION SERVICES
// =========================================================================
export async function getChatChannels(): Promise<ChatChannel[]> {
  try {
    const channels = await prisma.chatChannel.findMany({
      orderBy: { orderIndex: "asc" },
    });
    if (channels && channels.length > 0) {
      return channels.map((c) => ({
        id: c.id,
        name: c.name,
        title: c.title,
        topic: c.topic,
        badge: c.badge || undefined,
      }));
    }
  } catch {
    // Fallback
  }
  return fallbackChannels;
}

export async function getChatMessages(channelId?: string): Promise<ChatMessage[]> {
  try {
    const messages = await prisma.chatMessage.findMany({
      where: channelId ? { channelId } : undefined,
      orderBy: { createdAt: "asc" },
    });
    if (messages && messages.length > 0) {
      return messages.map((m) => ({
        id: m.id,
        channelId: m.channelId,
        name: m.name,
        role: m.role as any,
        message: m.message,
        timestamp: m.timestamp,
        isBot: m.isBot,
        replyTo:
          m.replyToName && m.replyToMessage
            ? { name: m.replyToName, message: m.replyToMessage }
            : undefined,
        reactions: (m.reactions as any) || [],
        createdAt: m.createdAt.toISOString(),
      }));
    }
  } catch {
    // Fallback
  }
  if (!channelId) return fallbackMessages;
  return fallbackMessages.filter((m) => m.channelId === channelId);
}

export async function saveChatMessage(
  message: Omit<ChatMessage, "id" | "createdAt">
): Promise<ChatMessage> {
  const newId = `msg-${Date.now()}`;
  const now = new Date().toISOString();

  const createdMessage: ChatMessage = {
    ...message,
    id: newId,
    createdAt: now,
  };

  try {
    await prisma.chatMessage.create({
      data: {
        id: newId,
        channelId: message.channelId,
        name: message.name,
        role: message.role,
        message: message.message,
        timestamp: message.timestamp,
        isBot: message.isBot || false,
        replyToName: message.replyTo?.name || null,
        replyToMessage: message.replyTo?.message || null,
        reactions: (message.reactions as any) || [],
      },
    });
  } catch {
    // Fallback
  }

  fallbackMessages.push(createdMessage);
  return createdMessage;
}

export async function toggleChatReaction(
  messageId: string,
  emoji: string
): Promise<ChatMessage | null> {
  let target = fallbackMessages.find((m) => m.id === messageId);

  // Update in-memory fallback
  if (target) {
    const existing = target.reactions.find((r) => r.emoji === emoji);
    if (existing) {
      const nextUserReacted = !existing.userReacted;
      target.reactions = target.reactions
        .map((r) =>
          r.emoji === emoji
            ? {
                ...r,
                count: nextUserReacted ? r.count + 1 : Math.max(0, r.count - 1),
                userReacted: nextUserReacted,
              }
            : r
        )
        .filter((r) => r.count > 0);
    } else {
      target.reactions.push({ emoji, count: 1, userReacted: true });
    }
  }

  // Update in database if connected
  try {
    const dbMsg = await prisma.chatMessage.findUnique({
      where: { id: messageId },
    });
    if (dbMsg) {
      const reactions = (dbMsg.reactions as any[]) || [];
      const existing = reactions.find((r: any) => r.emoji === emoji);
      let updatedReactions;
      if (existing) {
        const nextUserReacted = !existing.userReacted;
        updatedReactions = reactions
          .map((r: any) =>
            r.emoji === emoji
              ? {
                  ...r,
                  count: nextUserReacted ? r.count + 1 : Math.max(0, r.count - 1),
                  userReacted: nextUserReacted,
                }
              : r
          )
          .filter((r: any) => r.count > 0);
      } else {
        updatedReactions = [...reactions, { emoji, count: 1, userReacted: true }];
      }

      const updated = await prisma.chatMessage.update({
        where: { id: messageId },
        data: { reactions: updatedReactions },
      });

      return {
        id: updated.id,
        channelId: updated.channelId,
        name: updated.name,
        role: updated.role as any,
        message: updated.message,
        timestamp: updated.timestamp,
        isBot: updated.isBot,
        reactions: updated.reactions as any,
        createdAt: updated.createdAt.toISOString(),
      };
    }
  } catch {
    // Fallback
  }

  return target || null;
}

export async function deleteChatMessage(id: string): Promise<boolean> {
  try {
    await prisma.chatMessage.delete({ where: { id } });
  } catch {
    // Fallback
  }
  fallbackMessages = fallbackMessages.filter((m) => m.id !== id);
  return true;
}

export async function getGuestbook(): Promise<GuestbookEntry[]> {
  const msgs = await getChatMessages("apresiasi-publik");
  return msgs.map((m) => ({
    id: m.id,
    name: m.name,
    role: (m.role as any) || "Umum",
    message: m.message,
    createdAt: m.createdAt,
    approved: true,
  }));
}
