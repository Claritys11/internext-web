import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { siteUrl } from "@/lib/seo";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], display: "swap" });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${siteConfig.name} — ${siteConfig.tagline}`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  category: "education",
  keywords: [
    "Internext",
    "internext.web.id",
    "XI Internasional",
    "SMK Telkom Malang",
    "Moklet",
    "website kelas",
    "portofolio siswa",
    "karya siswa",
    "komunitas teknologi",
    "rekayasa perangkat lunak",
    "talenta digital muda",
    "showcase proyek",
  ],
  authors: [{ name: "Internext Class Community", url: siteUrl }],
  creator: "Kelas XI Internasional SMK Telkom Malang",
  publisher: "Internext Class Community",
  alternates: { canonical: siteUrl },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteUrl,
    siteName: siteConfig.name,
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [`${siteUrl}/opengraph-image`],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "EducationalOrganization"],
  name: siteConfig.name,
  url: siteUrl,
  logo: `${siteUrl}/opengraph-image`,
  description: siteConfig.description,
  email: siteConfig.socials.email,
  sameAs: Object.values(siteConfig.socials).filter((value) => value.startsWith("http")),
  parentOrganization: {
    "@type": "EducationalOrganization",
    name: siteConfig.classInfo.school,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.classInfo.labLocation,
      addressLocality: "Kota Malang",
      addressRegion: "Jawa Timur",
      addressCountry: "ID",
    },
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: siteConfig.socials.email,
    contactType: "Class Representative",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteUrl,
  inLanguage: "id-ID",
  publisher: { "@type": "Organization", name: siteConfig.name },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/projects?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} dark scroll-smooth`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      </head>
      <body className="min-h-screen bg-[#02040A] text-[#F8FAFC] font-sans antialiased selection:bg-[#F59E0B]/30 selection:text-[#EA580C]">{children}</body>
    </html>
  );
}
