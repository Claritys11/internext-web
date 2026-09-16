import {
  Member,
  Project,
  Article,
  EventItem,
  GalleryItem,
  Achievement,
  GuestbookEntry,
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

// In-memory guestbook storage for client-side demo mutations
let clientGuestbook: GuestbookEntry[] = [...mockGuestbook];

export async function getMembers(filterRole?: string): Promise<Member[]> {
  // Simulates brief async fetch
  if (!filterRole || filterRole === "all") return mockMembers;
  if (filterRole === "management") return mockMembers.filter((m) => m.isManagement);
  if (filterRole === "alumni") return mockMembers.filter((m) => m.isAlumni);
  return mockMembers.filter((m) => m.role.toLowerCase() === filterRole.toLowerCase());
}

export async function getMemberById(id: string): Promise<Member | null> {
  return mockMembers.find((m) => m.id === id) || null;
}

export async function getProjects(category?: string): Promise<Project[]> {
  if (!category || category === "all") return mockProjects;
  return mockProjects.filter((p) => p.category.toLowerCase() === category.toLowerCase());
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return mockProjects.find((p) => p.slug === slug) || null;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return mockProjects.filter((p) => p.featured);
}

export async function getArticles(category?: string): Promise<Article[]> {
  if (!category || category === "all") return mockArticles;
  return mockArticles.filter((a) => a.category.toLowerCase() === category.toLowerCase());
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return mockArticles.find((a) => a.slug === slug) || null;
}

export async function getEvents(): Promise<EventItem[]> {
  return mockEvents;
}

export async function getGallery(type?: "photo" | "video"): Promise<GalleryItem[]> {
  if (!type) return mockGallery;
  return mockGallery.filter((g) => g.type === type);
}

export async function getAchievements(): Promise<Achievement[]> {
  return mockAchievements;
}

export async function getGuestbook(): Promise<GuestbookEntry[]> {
  return clientGuestbook;
}

export async function submitGuestbook(
  entry: Omit<GuestbookEntry, "id" | "createdAt" | "approved">
): Promise<GuestbookEntry> {
  const newEntry: GuestbookEntry = {
    ...entry,
    id: `gb-${Date.now()}`,
    createdAt: new Date().toISOString(),
    approved: true,
  };
  clientGuestbook = [newEntry, ...clientGuestbook];
  return newEntry;
}
