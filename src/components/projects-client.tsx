'use client';

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { ProjectCard } from './project-card';
import type { Project, ProjectCategory } from '@/lib/types';
import { ALL_CATEGORIES } from '@/lib/project-categories';
import { cn } from '@/lib/utils';

interface ProjectsClientProps {
  projects: Project[];
}

const ALL_LABEL = 'All';
type SortBy = 'date' | 'alpha';

function fuzzyMatch(text: string, query: string): boolean {
  const t = text.toLowerCase();
  const q = query.toLowerCase().trim();
  if (!q) return true;
  // Simple substring match across words
  return q.split(/\s+/).every((word) => t.includes(word));
}

export function ProjectsClient({ projects }: ProjectsClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>(ALL_LABEL);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('date');

  const categories = useMemo(() => {
    const used = ALL_CATEGORIES.filter((cat) =>
      projects.some((p) => p.category === cat)
    );
    return [ALL_LABEL, ...used];
  }, [projects]);

  const filtered = useMemo(() => {
    let list =
      activeCategory === ALL_LABEL
        ? projects
        : projects.filter((p) => p.category === activeCategory);

    if (searchQuery.trim()) {
      list = list.filter((p) =>
        fuzzyMatch(p.title, searchQuery) ||
        fuzzyMatch(p.summary, searchQuery) ||
        p.tags.some((tag) => fuzzyMatch(tag, searchQuery))
      );
    }

    return [...list].sort((a, b) =>
      sortBy === 'alpha'
        ? a.title.localeCompare(b.title)
        : b.year - a.year
    );
  }, [projects, activeCategory, searchQuery, sortBy]);

  return (
    <section>
      {/* Search + Sort toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            type="search"
            placeholder="Search projects…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring rounded-sm"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortBy)}
          aria-label="Sort projects"
          className="text-sm border border-border bg-background text-foreground px-3 py-2 focus:outline-none focus:ring-1 focus:ring-ring rounded-sm"
        >
          <option value="date">Date: Recent → Oldest</option>
          <option value="alpha">A → Z</option>
        </select>
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              'text-sm px-4 py-1.5 border transition-colors rounded-sm',
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
        <p className="text-muted-foreground py-16 text-center">
          {searchQuery ? `No projects matching "${searchQuery}".` : 'No projects in this category.'}
        </p>
      )}
    </section>
  );
}
