
'use client';

import { ProjectsClient } from '@/components/projects-client';
import projects from '@/data/projects.json';
import type { Project } from '@/lib/types';

export default function ProjectsPage() {
  const typedProjects: Project[] = projects;
  return <ProjectsClient projects={typedProjects} />;
}
