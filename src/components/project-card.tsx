
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const href = project.links?.page || `/projects/${project.slug}`;
  const isExternal = href.startsWith('http');

  return (
    <Link
      href={href}
      target={isExternal ? '_blank' : '_self'}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="group flex flex-col border border-border hover:border-foreground transition-colors duration-200 rounded-sm overflow-hidden"
    >
      {/* Cover image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Category + year */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-accent uppercase tracking-wider">
            {project.category}
          </span>
          <span className="text-xs text-muted-foreground font-mono">{project.year}</span>
        </div>

        {/* Title */}
        <h3 className="font-headline font-semibold text-lg leading-snug mb-2 group-hover:text-accent transition-colors">
          {project.title}
        </h3>

        {/* Summary */}
        <p className="text-sm text-muted-foreground line-clamp-2 flex-1 mb-4">
          {project.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs text-muted-foreground border border-border px-2 py-0.5 rounded-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <span className="inline-flex items-center gap-1 text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">
          View case study <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}
