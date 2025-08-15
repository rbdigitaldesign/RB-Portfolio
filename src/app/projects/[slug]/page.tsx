import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import projectsData from '@/data/projects.json';
import type { Project } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';

const projects: Project[] = projectsData;

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

function getProjectData(slug: string) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    return null;
  }
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return { project, prevProject, nextProject };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const data = getProjectData(params.slug);

  if (!data) {
    notFound();
  }

  const { project, prevProject, nextProject } = data;

  return (
    <article className="container mx-auto max-w-6xl py-16 px-4">
      <header className="text-center mb-12">
        <Badge variant="secondary" className="mb-2">{project.category}</Badge>
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary dark:text-primary-foreground mb-4">{project.title}</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">{project.summary}</p>
      </header>

      <div className="relative w-full aspect-video mb-12 rounded-lg overflow-hidden shadow-strong">
         <Image
            src={project.coverImage}
            alt={`Cover image for ${project.title}`}
            fill
            priority
            className="object-cover"
            data-ai-hint="project screenshot abstract"
          />
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-bold font-headline mb-4">Overview</h2>
            <p className="text-foreground/80 whitespace-pre-line">{project.overview}</p>
          </section>
          <Separator />
          <section>
            <h2 className="text-2xl font-bold font-headline mb-4">The Problem</h2>
            <p className="text-foreground/80 whitespace-pre-line">{project.problem}</p>
          </section>
          <Separator />
          <section>
            <h2 className="text-2xl font-bold font-headline mb-4">Process & Solution</h2>
            <p className="text-foreground/80 whitespace-pre-line">{project.process}</p>
          </section>
          <Separator />
          <section>
            <h2 className="text-2xl font-bold font-headline mb-4">Outcomes & Reflections</h2>
            <p className="text-foreground/80 whitespace-pre-line">{project.outcomes}</p>
          </section>

           {project.gallery.length > 0 && (
             <>
              <Separator />
              <section>
                <h2 className="text-2xl font-bold font-headline mb-4">Artefacts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.gallery.map((imgSrc, index) => (
                    <div key={index} className="relative aspect-video rounded-md overflow-hidden shadow-medium">
                      <Image 
                        src={imgSrc} 
                        alt={`${project.title} gallery image ${index + 1}`} 
                        fill 
                        className="object-cover"
                        data-ai-hint="design artifact prototype"
                        />
                    </div>
                  ))}
                </div>
              </section>
            </>
           )}
        </div>
        
        <aside className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline">Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                <div className="flex justify-between"><strong>Role:</strong> <span>{project.role}</span></div>
                <Separator />
                <div className="flex justify-between"><strong>Year:</strong> <span>{project.year}</span></div>
                <Separator />
                <div className="flex justify-between"><strong>Duration:</strong> <span>{project.duration}</span></div>
                <Separator />
                <div className="flex justify-between"><strong>Team:</strong> <span>{project.team}</span></div>
                <Separator />
                <div>
                    <h4 className="font-semibold mb-2">Tools & Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                        {project.tools.map(tool => <Badge key={tool} variant="outline">{tool}</Badge>)}
                    </div>
                </div>
                 {project.links && (project.links.live || project.links.github) && (
                  <>
                  <Separator />
                   <div>
                    <h4 className="font-semibold mb-2">Links</h4>
                    <div className="flex flex-col space-y-2">
                      {project.links.live && (
                        <Button variant="outline" asChild><a href={project.links.live} target="_blank" rel="noopener noreferrer">Live Site <ExternalLink className="ml-2 h-4 w-4" /></a></Button>
                      )}
                      {project.links.github && (
                        <Button variant="outline" asChild><a href={project.links.github} target="_blank" rel="noopener noreferrer">GitHub Repo <ExternalLink className="ml-2 h-4 w-4" /></a></Button>
                      )}
                    </div>
                  </div>
                  </>
                )}
            </CardContent>
          </Card>
        </aside>
      </div>
      
      <Separator className="my-16" />

      <nav className="flex justify-between items-center">
        {prevProject ? (
          <Button variant="outline" asChild>
            <Link href={`/projects/${prevProject.slug}`} className="group">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Previous
            </Link>
          </Button>
        ) : <div />}
        {nextProject ? (
          <Button variant="outline" asChild>
            <Link href={`/projects/${nextProject.slug}`} className="group">
              Next
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        ) : <div />}
      </nav>
    </article>
  );
}
