import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getArticleBySlug, getArticles } from "@/lib/api/services";
import { formatDate } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { ArrowLeft, Clock, Calendar, Tag, Share2 } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { robots: { index: false, follow: false } };
  const metadata = pageMetadata(article.title, article.summary, `/news/${article.slug}`);
  return {
    ...metadata,
    openGraph: { ...metadata.openGraph, type: "article", publishedTime: article.date, authors: [article.author.name], images: article.coverImage ? [{ url: article.coverImage, alt: article.title }] : undefined },
    twitter: { ...metadata.twitter, images: article.coverImage ? [article.coverImage] : undefined },
  };
}

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#F59E0B] hover:text-[#EA580C] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Warta Berita</span>
          </Link>

          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#EA580C] text-[#02040A] font-bold">
                {article.category}
              </span>
              <span className="text-xs font-mono text-[#64748B] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
                {article.readTime}
              </span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
              {article.title}
            </h1>

            {/* Author bar */}
            <div className="flex items-center justify-between py-4 border-t border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/[0.1]">
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-sm font-semibold text-white block">
                    {article.author.name}
                  </span>
                  <span className="text-xs font-mono text-[#64748B]">
                    {article.author.role} • {formatDate(article.date)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden mb-10 border border-white/[0.1] shadow-2xl">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Article Content */}
          <div className="glass-card p-6 sm:p-10 mb-10">
            <div className="prose prose-invert max-w-none text-[#CBD5E1] text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line">
              {article.content}
            </div>

            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-2">
              <Tag className="w-4 h-4 text-[#64748B]" />
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono bg-white/[0.05] text-[#94A3B8] border border-white/[0.08] px-2.5 py-1 rounded-md"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
