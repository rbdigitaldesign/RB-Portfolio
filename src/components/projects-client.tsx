
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ProjectCard } from './project-card';
import type { Project, ProjectCategory } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { CATEGORY_COLORS, ALL_CATEGORIES } from '@/lib/project-categories';

interface ProjectsClientProps {
  projects: Project[];
}

export function ProjectsClient({ projects }: ProjectsClientProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTag, setActiveTag] = useState('All');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const allTags = useMemo(() => {
    const tags = new Set<string>(['All']);
    const source = activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);
    source.forEach((p) => p.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags).sort((a, b) => {
      if (a === 'All') return -1;
      if (b === 'All') return 1;
      return a.localeCompare(b);
    });
  }, [projects, activeCategory]);

  const filteredProjects = useMemo(() => {
    let filtered = [...projects];
    if (activeCategory !== 'All') {
      filtered = filtered.filter((p) => p.category === activeCategory);
    }
    if (activeTag !== 'All') {
      filtered = filtered.filter((p) => p.tags.includes(activeTag));
    }
    filtered.sort((a, b) => b.year - a.year);
    return filtered;
  }, [projects, activeCategory, activeTag]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory((prev) => (prev === category ? 'All' : category));
    setActiveTag('All');
  };

  // Count per category for display
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: projects.length };
    ALL_CATEGORIES.forEach((cat) => {
      counts[cat] = projects.filter((p) => p.category === cat).length;
    });
    return counts;
  }, [projects]);

  return (
    <section id="projects-gallery" className="py-12">
      <div className="mb-8 flex flex-col items-center gap-4">
        {/* Category filter buttons */}
        <div className="flex flex-wrap justify-center gap-2">
          <Button
            variant={activeCategory === 'All' ? 'default' : 'outline'}
            onClick={() => handleCategoryChange('All')}
            className="transition-all duration-200"
            size="sm"
          >
            All ({categoryCounts['All']})
          </Button>
          {ALL_CATEGORIES.filter((cat) => categoryCounts[cat] > 0).map((category) => {
            const colors = CATEGORY_COLORS[category as ProjectCategory];
            const isActive = activeCategory === category;
            return (
              <Button
                key={category}
                variant={isActive ? 'default' : 'outline'}
                onClick={() => handleCategoryChange(category)}
                className={`transition-all duration-200 gap-1.5 ${!isActive ? `hover:${colors.bg}` : ''}`}
                size="sm"
              >
                <span>{colors.icon}</span>
                {category} ({categoryCounts[category]})
              </Button>
            );
          })}
        </div>

        <Separator className="max-w-md" />

        {/* Tag filter */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">Filter by tag:</span>
          <Select onValueChange={setActiveTag} value={activeTag}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Select a tag" />
            </SelectTrigger>
            <SelectContent>
              {allTags.map((tag) => (
                <SelectItem key={tag} value={tag}>
                  {tag === 'All' ? '— All tags —' : tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mounted && filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {mounted && filteredProjects.length === 0 && (
        <div className="text-center col-span-full py-16">
          <h3 className="text-2xl font-headline">No Projects Found</h3>
          <p className="text-muted-foreground mt-2">Try adjusting your filter criteria.</p>
        </div>
      )}
    </section>
  );
}
