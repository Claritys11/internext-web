import type { Metadata } from "next";
import { pageMetadata, createBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Direktori Anggota & Talenta Siswa",
  "Daftar profil 25 talenta digital kelas XI Internasional SMK Telkom Malang: keahlian pemrograman, desain, portofolio, dan kontak.",
  "/members",
  {
    keywords: [
      "Anggota Internext",
      "Siswa XI Internasional",
      "Talenta Digital Moklet",
      "Portofolio Siswa",
      "Web Developer Muda",
    ],
  }
);

export default function MembersLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbs = createBreadcrumbJsonLd([
    { name: "Beranda", path: "/" },
    { name: "Anggota", path: "/members" },
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
