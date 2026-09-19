import type { Metadata } from "next";
import { pageMetadata, createBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Karya & Showcase Proyek Digital Siswa",
  "Eksplorasi showcase proyek dan karya teknologi kelas XI Internasional SMK Telkom Malang: Web App, IoT / Hardware, Game, AI, dan UI/UX interaktif.",
  "/projects",
  {
    keywords: [
      "Proyek Internext",
      "Karya Siswa Moklet",
      "Web App Siswa",
      "IoT Hardware",
      "Game AI SMK Telkom",
      "Portofolio Digital",
    ],
  }
);

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbs = createBreadcrumbJsonLd([
    { name: "Beranda", path: "/" },
    { name: "Karya & Proyek", path: "/projects" },
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
