import Image from 'next/image';
import { ProjectsClient } from '@/components/projects-client';
import projects from '@/data/projects.json';
import type { Project } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Home() {
  const typedProjects: Project[] = projects;

  return (
    <>
      <section className="relative w-full h-[50vh] flex items-center justify-center text-white">
        <Image
          src="https://i.imgur.com/wQFi674.jpeg"
          alt="Innovation concept with lightbulbs and paper airplanes"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center p-8 max-w-4xl mx-auto flex flex-col items-center">
           <div className="bg-background/70 backdrop-blur-sm p-8 rounded-lg">
             <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary dark:text-primary-foreground mb-4">
              Rich Bartlett — LDX Designer
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-foreground/80">
              Welcome to RB Digital Design. I’m a Learning Designer at a GO8 university with 9+ years in Australia’s tech sector. Combining educational design with UX/UI expertise, I create intuitive, impactful experiences.
            </p>
           </div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <ProjectsClient projects={typedProjects} />
      </div>
    </>
  );
}
