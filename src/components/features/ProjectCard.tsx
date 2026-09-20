import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/types";
import { ExternalLink, Heart, Users, Code2 } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      id={project.slug}
      className="glass-card overflow-hidden transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
    >
      <div>
        {/* Project Thumbnail Image */}
        <Link
          href={`/projects/${project.slug}`}
          className="block relative w-full h-48 sm:h-52 overflow-hidden bg-[#02040A] group/thumb"
        >
          {project.thumbnail ? (
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              unoptimized={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover/thumb:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0F172A] to-[#02040A] text-[#64748B]">
              <Code2 className="w-12 h-12 text-[#F59E0B]/40 mb-2" />
              <span className="text-xs font-mono text-[#94A3B8]">Showcase Karya</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />

          {/* Category Pill */}
          <div className="absolute top-3 left-3">
            <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-[#02040A]/80 text-[#F59E0B] border border-[#F59E0B]/30 backdrop-blur-md">
              {project.category}
            </span>
          </div>

          {/* Likes counter */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/60 text-white text-xs font-mono backdrop-blur-md">
            <Heart className="w-3.5 h-3.5 text-[#EF4444] fill-[#EF4444]" />
            <span>{project.likes}</span>
          </div>
        </Link>

        {/* Project Info */}
        <div className="p-5">
          <Link href={`/projects/${project.slug}`} className="block group/title">
            <h3 className="font-heading text-lg font-bold text-white group-hover/title:text-[#F59E0B] transition-colors mb-1.5 leading-snug">
              {project.title}
            </h3>
          </Link>

          <p className="text-xs text-[#94A3B8] leading-relaxed mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Team Contributors */}
          <div className="flex items-center gap-1.5 mb-4 text-xs text-[#64748B]">
            <Users className="w-3.5 h-3.5 text-[#EA580C]" />
            <span className="truncate">{project.team.join(", ")}</span>
          </div>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-mono bg-white/[0.04] text-[#CBD5E1] border border-white/[0.06] px-2 py-0.5 rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-5 py-3.5 border-t border-white/[0.06] bg-black/20 flex items-center justify-between">
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-[#94A3B8] hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>Source Code</span>
          </a>
        ) : (
          <span className="text-xs font-mono text-[#64748B]">Internal Project</span>
        )}

        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gradient px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5"
          >
            <span>Live Demo</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
}
