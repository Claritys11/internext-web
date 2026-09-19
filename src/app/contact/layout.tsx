import type { Metadata } from "next";
import { pageMetadata, createBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Buku Tamu & Hubungi Kami",
  "Kirimkan pesan apresiasi, kesan pesan, dan buka peluang kolaborasi teknologi dengan kelas XI Internasional SMK Telkom Malang.",
  "/contact",
  {
    keywords: [
      "Buku Tamu Internext",
      "Kontak XI Internasional",
      "Kesan Pesan Moklet",
      "Kolaborasi Siswa Telkom",
    ],
  }
);

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbs = createBreadcrumbJsonLd([
    { name: "Beranda", path: "/" },
    { name: "Buku Tamu", path: "/contact" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      {children}
    </>
  );
}
