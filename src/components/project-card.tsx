import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Project } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const isCaseStudy = [
    'gopro-app-redesign', 
    'wellness-features-delivery-apps',
    'bestie-health-club'
  ].includes(project.slug);
  const href = `/projects/${project.slug}`;

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-medium focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
      <CardHeader>
        <div className="relative aspect-video w-full mb-4">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover rounded-t-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint="project screenshot abstract"
          />
        </div>
        <Badge variant="secondary" className="w-fit">{project.category}</Badge>
        <CardTitle className="pt-2 font-headline">{project.title}</CardTitle>
        <CardDescription>{project.summary}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="link" className="p-0 h-auto">
          <Link href={href} className="group">
            View Case Study
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
