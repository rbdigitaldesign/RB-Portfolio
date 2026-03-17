
'use client';

import { ProjectsClient } from '@/components/projects-client';
import projects from '@/data/projects.json';
import type { Project } from '@/lib/types';

export default function ProjectsPage() {
  // Only show published projects (or those without a status field, for backwards compatibility)
  const typedProjects: Project[] = (projects as Project[]).filter(
    (p) => !p.status || p.status === 'published'
  );
  return <ProjectsClient projects={typedProjects} />;
}
