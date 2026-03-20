'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, LayoutGrid } from 'lucide-react';
import projectsData from '@/data/projects.json';
import type { Project } from '@/lib/types';

type NavProject = { slug: string } | null;

interface ProjectNavigationProps {
  prevProject: NavProject;
  nextProject: NavProject;
}

function getTitle(slug: string): string {
  const p = (projectsData as Project[]).find((p) => p.slug === slug);
  return p?.title ?? slug;
}

function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n - 1) + '…' : s;
}

export function ProjectNavigation({ prevProject, nextProject }: ProjectNavigationProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const prevTitle = prevProject ? truncate(getTitle(prevProject.slug), 30) : null;
  const nextTitle = nextProject ? truncate(getTitle(nextProject.slug), 30) : null;

  return (
    <nav
      aria-label="Case study navigation"
      className={`fixed bottom-0 left-0 right-0 z-40 h-12 border-t border-border bg-background/95 backdrop-blur-sm transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-6xl mx-auto h-full px-4 md:px-10 flex items-center justify-between gap-4">

        {/* Prev */}
        <div className="flex-1 flex justify-start min-w-0">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors group min-w-0"
            >
              <ChevronLeft
                size={15}
                className="shrink-0 transition-transform duration-150 group-hover:-translate-x-0.5"
              />
              <span className="hidden md:block truncate">{prevTitle}</span>
            </Link>
          ) : (
            <span />
          )}
        </div>

        {/* All projects */}
        <Link
          href="/projects"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0 px-3 py-1 rounded-sm hover:bg-muted/60"
        >
          <LayoutGrid size={13} />
          <span className="hidden sm:block">All projects</span>
        </Link>

        {/* Next */}
        <div className="flex-1 flex justify-end min-w-0">
          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors group min-w-0"
            >
              <span className="hidden md:block truncate">{nextTitle}</span>
              <ChevronRight
                size={15}
                className="shrink-0 transition-transform duration-150 group-hover:translate-x-0.5"
              />
            </Link>
          ) : (
            <span />
          )}
        </div>

      </div>
    </nav>
  );
}
