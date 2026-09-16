import type { MetadataRoute } from "next";
import { getArticles, getMembers } from "@/lib/api/services";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, members] = await Promise.all([getArticles(), getMembers()]);
  const now = new Date();
  const staticRoutes = ["/", "/about", "/members", "/projects", "/news", "/events", "/gallery", "/contact"];
  return [
    ...staticRoutes.map((path) => ({ url: absoluteUrl(path), lastModified: now, changeFrequency: path === "/" ? "weekly" as const : "monthly" as const, priority: path === "/" ? 1 : 0.7 })),
    ...articles.map((article) => ({ url: absoluteUrl(`/news/${article.slug}`), lastModified: new Date(article.date), changeFrequency: "monthly" as const, priority: 0.6 })),
    ...members.map((member) => ({ url: absoluteUrl(`/members/${member.id}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.5 })),
  ];
}
