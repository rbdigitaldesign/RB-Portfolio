
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ProjectCard } from './project-card';
import type { Project } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

interface ProjectsClientProps {
  projects: Project[];
}

const categories = ['User Experience', 'Learning Design', 'All', 'Hackathons', 'Coding Projects', 'Publications'];

export function ProjectsClient({ projects }: ProjectsClientProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTag, setActiveTag] = useState('All');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const allTags = useMemo(() => {
    const tags = new Set<string>(['All']);
    projects.forEach(p => {
      p.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort((a, b) => {
      if (a === 'All') return -1;
      if (b === 'All') return 1;
      return a.localeCompare(b);
    });
  }, [projects]);

  const filteredProjects = useMemo(() => {
    let filtered = projects;

    if (activeCategory !== 'All') {
      filtered = filtered.filter((p) => p.category === activeCategory);
    }

    if (activeTag !== 'All') {
      filtered = filtered.filter((p) => p.tags.includes(activeTag));
    }
    
    // Default sort by year
    filtered.sort((a, b) => b.year - a.year);

    return filtered;
  }, [projects, activeCategory, activeTag]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    // Reset tag filter when category changes to avoid empty states
    setActiveTag('All');
  };
  
  const handleTagChange = (tag: string) => {
    setActiveTag(tag);
  };

  return (
    <section id="projects-gallery" className="py-12">
      <div className="mb-8 flex flex-col items-center gap-4">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'outline'}
              onClick={() => handleCategoryChange(category)}
              className="transition-all duration-200"
            >
              {category}
            </Button>
          ))}
        </div>
        <Separator className="max-w-md" />
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-muted-foreground">Filter by tag:</span>
           <Select onValueChange={handleTagChange} value={activeTag}>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Select a tag" />
            </SelectTrigger>
            <SelectContent>
              {allTags.map((tag) => (
                <SelectItem key={tag} value={tag}>
                  {tag}
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
          <p className="text-muted-foreground">Try adjusting your filter criteria.</p>
        </div>
      )}
    </section>
  );
}
