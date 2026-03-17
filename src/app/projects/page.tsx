
import { ProjectsClient } from '@/components/projects-client';
import projectsData from '@/data/projects.json';
import type { Project } from '@/lib/types';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects — Rich Bartlett',
  description: 'Learning Design and UX case studies by Rich Bartlett.',
};

export default function ProjectsPage() {
  const projects = (projectsData as Project[]).filter(
    (p) => !p.status || p.status === 'published'
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <header className="border-b border-border pb-10 mb-12">
        <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">
          Projects
        </p>
        <h1 className="text-4xl md:text-5xl font-headline font-semibold max-w-2xl leading-tight">
          Selected work in Learning Design &amp; UX.
        </h1>
      </header>

      <ProjectsClient projects={projects} />
    </div>
  );
}
