import type { Metadata } from "next";
import { pageMetadata, createBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Galeri Dokumentasi & Momen Interaktif",
  "Koleksi visual dan dokumentasi interaktif 3D Dome momen kebersamaan, bootcamp teknologi, dan kehidupan siswa XI Internasional SMK Telkom Malang.",
  "/gallery",
  {
    keywords: [
      "Galeri Internext",
      "Foto XI Internasional",
      "Dokumentasi Moklet",
      "Momen Kelas SMK Telkom",
      "Dome Gallery 3D",
    ],
  }
);

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbs = createBreadcrumbJsonLd([
    { name: "Beranda", path: "/" },
    { name: "Galeri", path: "/gallery" },
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
