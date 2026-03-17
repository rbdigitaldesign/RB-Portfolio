'use client';

import { useState, useMemo } from 'react';
import { ProjectCard } from './project-card';
import type { Project, ProjectCategory } from '@/lib/types';
import { ALL_CATEGORIES } from '@/lib/project-categories';
import { cn } from '@/lib/utils';

interface ProjectsClientProps {
  projects: Project[];
}

const ALL_LABEL = 'All';

export function ProjectsClient({ projects }: ProjectsClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>(ALL_LABEL);

  const categories = useMemo(() => {
    const used = ALL_CATEGORIES.filter((cat) =>
      projects.some((p) => p.category === cat)
    );
    return [ALL_LABEL, ...used];
  }, [projects]);

  const filtered = useMemo(() => {
    const list =
      activeCategory === ALL_LABEL
        ? projects
        : projects.filter((p) => p.category === activeCategory);
    return [...list].sort((a, b) => b.year - a.year);
  }, [projects, activeCategory]);

  return (
    <section>
      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              'text-sm px-4 py-1.5 border transition-colors',
              activeCategory === cat
                ? 'border-foreground bg-foreground text-background'
                : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground py-16 text-center">No projects in this category.</p>
      )}
    </section>
  );
}
