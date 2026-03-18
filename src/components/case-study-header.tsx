import Image from 'next/image';
import projectsData from '@/data/projects.json';
import type { Project } from '@/lib/types';

interface CaseStudyHeaderProps {
  /** Project slug — used to look up metadata from projects.json */
  slug: string;
  /** Override the default cover image from projects.json */
  coverImage?: string;
}

/**
 * CaseStudyHeader — shared editorial hero section for all case study pages.
 * Looks up project metadata (title, summary, category, role, year, duration, tags)
 * from projects.json by slug. Pass coverImage to override the default.
 */
export function CaseStudyHeader({ slug, coverImage }: CaseStudyHeaderProps) {
  const project = (projectsData as Project[]).find((p) => p.slug === slug);
  if (!project) return null;

  const image = coverImage ?? project.coverImage;

  return (
    <header className="mb-12 md:mb-16">
      {/* Full-bleed cover image */}
      {image && (
        <div className="relative w-full aspect-[21/9] overflow-hidden mb-0 bg-muted">
          <Image
            src={image}
            alt={`Cover image for ${project.title}`}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Terracotta accent bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent" />
        </div>
      )}

      {/* Header text */}
      <div className="mt-8">
        {/* Category */}
        <p className="text-xs font-medium uppercase tracking-widest text-accent mb-3">
          {project.category}
        </p>

        {/* Title */}
        <h1
          className="font-headline font-semibold tracking-tight leading-[1.05] mb-5"
          style={{ fontSize: 'clamp(1.9rem, 4vw, 3.5rem)' }}
        >
          {project.title}
        </h1>

        {/* Summary */}
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mb-6">
          {project.summary}
        </p>

        {/* Meta strip */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-muted-foreground border-t border-border pt-4">
          {project.role && (
            <span>
              <span className="text-foreground/50 uppercase tracking-wider mr-1.5">Role</span>
              {project.role}
            </span>
          )}
          {project.year && (
            <span>
              <span className="text-foreground/50 uppercase tracking-wider mr-1.5">Year</span>
              {project.year}
            </span>
          )}
          {project.duration && (
            <span>
              <span className="text-foreground/50 uppercase tracking-wider mr-1.5">Duration</span>
              {project.duration}
            </span>
          )}
          {project.team && (
            <span>
              <span className="text-foreground/50 uppercase tracking-wider mr-1.5">Team</span>
              {project.team}
            </span>
          )}
        </div>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="text-xs text-muted-foreground border border-border px-2.5 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
