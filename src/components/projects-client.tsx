'use client';

import { useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ProjectCard } from './project-card';
import type { Project } from '@/lib/types';

interface ProjectsClientProps {
  projects: Project[];
}

const categories = ['All', 'User Experience', 'Learning Design', 'Hackathons', 'Coding Projects'];

export function ProjectsClient({ projects }: ProjectsClientProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('recent');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects;

    if (activeCategory !== 'All') {
      filtered = filtered.filter((p) => p.category === activeCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.summary.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder === 'recent') {
      filtered.sort((a, b) => b.year - a.year);
    } else if (sortOrder === 'a-z') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [projects, activeCategory, searchTerm, sortOrder]);

  return (
    <section className="py-12">
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          <Input
            type="search"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex items-center gap-4">
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recent → Oldest</SelectItem>
              <SelectItem value="a-z">A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
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
        {mounted && filteredAndSortedProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
      {mounted && filteredAndSortedProjects.length === 0 && (
        <div className="text-center col-span-full py-16">
          <h3 className="text-2xl font-headline">No Projects Found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </section>
  );
}
