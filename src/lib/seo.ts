import type { Metadata } from "next";

export const siteUrl = "https://internext.web.id";

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website", locale: "id_ID", siteName: "Internext" },
    twitter: { card: "summary", title, description },
  };
}

export function noIndexMetadata(): Metadata {
  return { robots: { index: false, follow: false, noarchive: true, nosnippet: true } };
}
