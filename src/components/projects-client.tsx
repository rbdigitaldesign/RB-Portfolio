'use client';

import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ProjectCard } from './project-card';
import type { Project } from '@/lib/types';

interface ProjectsClientProps {
  projects: Project[];
}

const categories = ['All', 'User Experience', 'Learning Design', 'Hackathons', 'Coding Projects'];

export function ProjectsClient({ projects }: ProjectsClientProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredProjects = useMemo(() => {
    let filtered = projects;

    if (activeCategory !== 'All') {
      filtered = filtered.filter((p) => p.category === activeCategory);
    }
    
    // Default sort by year
    filtered.sort((a, b) => b.year - a.year);

    return filtered;
  }, [projects, activeCategory]);

  return (
    <section className="py-12">
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? 'default' : 'outline'}
            onClick={() => setActiveCategory(category)}
            className="transition-all duration-200"
          >
            {category}
          </Button>
        ))}
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
