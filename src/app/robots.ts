import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/", "/_next/", "/private/"],
      },
      {
        userAgent: ["Googlebot", "Bingbot", "Applebot", "DuckDuckBot", "YandexBot"],
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/", "/_next/", "/private/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
