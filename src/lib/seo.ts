import type { Metadata } from "next";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://internext.web.id";

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export interface PageMetadataOptions {
  image?: string;
  keywords?: string[];
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  authors?: string[];
}

export function pageMetadata(
  title: string,
  description: string,
  path: string,
  options?: PageMetadataOptions
): Metadata {
  const url = absoluteUrl(path);
  const ogImage = options?.image
    ? options.image.startsWith("http")
      ? options.image
      : absoluteUrl(options.image)
    : absoluteUrl("/opengraph-image");

  return {
    title,
    description,
    keywords: options?.keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: options?.type === "article" ? "article" : "website",
      locale: "id_ID",
      siteName: "Internext",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(options?.publishedTime ? { publishedTime: options.publishedTime } : {}),
      ...(options?.authors ? { authors: options.authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function noIndexMetadata(): Metadata {
  return { robots: { index: false, follow: false, noarchive: true, nosnippet: true } };
}

export function createBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
