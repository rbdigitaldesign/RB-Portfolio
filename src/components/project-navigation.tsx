
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

type NavProject = {
  slug: string;
} | null;

interface ProjectNavigationProps {
  prevProject: NavProject;
  nextProject: NavProject;
  bottom?: boolean;
}

export function ProjectNavigation({ prevProject, nextProject, bottom = false }: ProjectNavigationProps) {
  if (bottom) {
    return (
      <nav className="flex justify-between items-center">
        {prevProject ? (
          <Button variant="secondary" asChild>
            <Link href={`/projects/${prevProject.slug}`} className="group">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Previous
            </Link>
          </Button>
        ) : <div className="flex-1" />}
        {nextProject ? (
          <Button variant="secondary" asChild>
            <Link href={`/projects/${nextProject.slug}`} className="group">
              Next
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        ) : <div className="flex-1" />}
      </nav>
    );
  }

  return (
    <nav className="flex justify-between items-center mb-8 flex-wrap gap-4">
      <div className="flex-1 flex justify-start">
        {prevProject && (
          <Button variant="secondary" asChild>
            <Link href={`/projects/${prevProject.slug}`} className="group">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Previous
            </Link>
          </Button>
        )}
      </div>
      
      <div className="flex-shrink-0">
        <Button variant="secondary" asChild>
          <Link href="/#projects-gallery">
            <Home className="mr-2 h-4 w-4" />
            Projects Home
          </Link>
        </Button>
      </div>

      <div className="flex-1 flex justify-end">
        {nextProject && (
          <Button variant="secondary" asChild>
            <Link href={`/projects/${nextProject.slug}`} className="group">
              Next
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        )}
      </div>
    </nav>
  );
}
