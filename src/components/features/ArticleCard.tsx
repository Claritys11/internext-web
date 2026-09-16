import Image from "next/image";
import Link from "next/link";
import { Article } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Clock, Tag, ArrowRight } from "lucide-react";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="glass-card overflow-hidden transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group">
      <div>
        <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-[#0A0F1E]">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />

          <div className="absolute top-3 left-3 flex gap-2">
            <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-[#4F46E5] text-white shadow-md">
              {article.category}
            </span>
            {article.isPinned && (
              <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-[#F59E0B] text-[#0A0F1E]">
                📌 Highlight
              </span>
            )}
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-2 text-xs font-mono text-[#64748B] mb-2">
            <span>{formatDate(article.date)}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#06B6D4]" />
              {article.readTime}
            </span>
          </div>

          <h3 className="font-heading text-lg font-bold text-white group-hover:text-[#06B6D4] transition-colors mb-2 leading-snug">
            {article.title}
          </h3>

          <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-3 mb-4">
            {article.summary}
          </p>

          <div className="flex flex-wrap gap-1 mb-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono text-[#64748B] bg-white/[0.04] px-2 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-5 pt-0 flex items-center justify-between border-t border-white/[0.06] mt-4 pt-3.5">
        <div className="flex items-center gap-2.5">
          <div className="relative w-6 h-6 rounded-full overflow-hidden border border-white/[0.1]">
            <Image
              src={article.author.avatar}
              alt={article.author.name}
              fill
              className="object-cover"
            />
          </div>
          <span className="text-xs text-[#CBD5E1] font-medium">
            {article.author.name}
          </span>
        </div>

        <Link
          href={`/news/${article.slug}`}
          className="text-xs font-semibold text-[#06B6D4] group-hover:translate-x-1 transition-transform flex items-center gap-1"
        >
          <span>Baca</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}
