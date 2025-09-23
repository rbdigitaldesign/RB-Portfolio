
'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ProjectsClient } from '@/components/projects-client';
import projects from '@/data/projects.json';
import type { Project } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Download, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from 'next-themes';

export default function Home() {
  const typedProjects: Project[] = projects;
  const { toast } = useToast();
  const { resolvedTheme } = useTheme();

  const handleDownload = () => {
    toast({
      title: "Resume Download Started",
      description: "Your download should begin shortly.",
    })
  }

  const heroImageSrc = resolvedTheme === 'dark'
    ? 'https://i.imgur.com/CnWro2G.png'
    : 'https://i.imgur.com/vIvG73T.png';

  return (
    <>
      <section className="relative w-full h-[50vh] flex items-center justify-center text-foreground overflow-hidden">
        <Image
          src={heroImageSrc}
          alt="Abstract hero image"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 w-full h-full bg-black/30" />
        <div className="relative z-10 text-center p-8 max-w-4xl mx-auto flex flex-col items-center">
          <div className="bg-background/80 backdrop-blur-md p-8 rounded-lg shadow-strong">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary dark:text-primary-foreground">
              Rich Bartlett
            </h1>
            <p className="text-lg md:text-xl text-primary/90 dark:text-primary-foreground/90 font-medium mb-4">
               <a
                  href="https://www.advance-he.ac.uk/fellowship/fellowship"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-headline text-primary hover:underline underline-offset-4 inline-flex items-center gap-1"
                >
                  <Award className="inline-block h-4 w-4" />
                  <span className="font-medium">FHEA</span>
                </a> — LDX Designer
            </p>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-foreground/80">
              Welcome to RB Digital Design. I’m a Learning Designer at a GO8 university with 9+ years in Australia’s tech sector. Combining educational design with UX/UI expertise, I create intuitive, impactful experiences.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center pt-8 pb-2">
        <Button asChild size="lg">
            <a
              href="https://docs.google.com/document/d/1RIHsBSdbUdbeABwg0y3Ql_aiKISd0hpSJM7DIgJK3I8/export?format=pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Rich_Bartlett_Resume.pdf"
              onClick={handleDownload}
            >
                <Download className="mr-2 h-5 w-5" />
                Download Resume
            </a>
        </Button>
      </section>

      <div className="container mx-auto px-4">
        <ProjectsClient projects={typedProjects} />
      </div>
    </>
  );
}
