import Image from 'next/image';
import { ProjectsClient } from '@/components/projects-client';
import projects from '@/data/projects.json';
import type { Project } from '@/lib/types';
import { Button } from '@/components/ui/button';

export default function Home() {
  const typedProjects: Project[] = projects;

  return (
    <div className="container mx-auto px-4">
      <section className="py-16 md:py-24 text-center flex flex-col items-center">
        <Image
          src="https://placehold.co/128x128.png"
          alt="Rich Bartlett"
          width={128}
          height={128}
          className="rounded-full mb-6"
          data-ai-hint="profile picture"
        />
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary dark:text-primary-foreground mb-4">
          Rich Bartlett — LDX Designer
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-foreground/80">
          Welcome to RB Digital Design. I’m a Learning Designer at a GO8 university with 9+ years in Australia’s tech sector. Combining educational design with UX/UI expertise, I create intuitive, impactful experiences.
        </p>
      </section>

      <ProjectsClient projects={typedProjects} />
    </div>
  );
}
