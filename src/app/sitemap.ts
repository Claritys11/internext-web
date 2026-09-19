import type { MetadataRoute } from "next";
import { getArticles, getMembers } from "@/lib/api/services";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, members] = await Promise.all([
    getArticles().catch(() => []),
    getMembers().catch(() => []),
  ]);

  const now = new Date();

  const staticRoutes: {
    path: string;
    priority: number;
    changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  }[] = [
    { path: "/", priority: 1.0, changeFrequency: "daily" },
    { path: "/projects", priority: 0.9, changeFrequency: "weekly" },
    { path: "/news", priority: 0.9, changeFrequency: "daily" },
    { path: "/members", priority: 0.8, changeFrequency: "weekly" },
    { path: "/events", priority: 0.8, changeFrequency: "weekly" },
    { path: "/gallery", priority: 0.8, changeFrequency: "weekly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: absoluteUrl(`/news/${article.slug}`),
    lastModified: article.date ? new Date(article.date) : now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const memberEntries: MetadataRoute.Sitemap = members.map((member) => ({
    url: absoluteUrl(`/members/${member.id}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticEntries, ...articleEntries, ...memberEntries];
}
