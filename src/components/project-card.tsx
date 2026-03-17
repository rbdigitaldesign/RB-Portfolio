
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
import type { Project, ProjectCategory } from '@/lib/types';
import { CATEGORY_COLORS } from '@/lib/project-categories';
import { Button } from './ui/button';

const CTA_LABELS: Record<ProjectCategory, string> = {
  'User Experience': 'View Case Study',
  'Learning Design': 'View Case Study',
  'Hackathons': 'View Project',
  'Coding Projects': 'View Project',
  'Publications': 'View Publication',
};

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const href = project.links?.page || `/projects/${project.slug}`;
  const isExternal = href.startsWith('http');
  const colors = CATEGORY_COLORS[project.category] ?? CATEGORY_COLORS['User Experience'];
  const ctaLabel = CTA_LABELS[project.category] ?? 'View Project';

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-medium focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
      <CardHeader className="p-0">
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint="project screenshot abstract"
          />
          {/* Category strip at top of image */}
          <div className={`absolute top-0 left-0 right-0 px-3 py-1.5 flex items-center gap-1.5 text-xs font-semibold ${colors.bg} ${colors.text} backdrop-blur-sm`}>
            <span>{colors.icon}</span>
            <span>{project.category}</span>
          </div>
        </div>
        <div className="px-6 pt-4 pb-0">
          <CardTitle className="font-headline leading-snug">
            <Link href={href} target={isExternal ? '_blank' : '_self'} rel={isExternal ? "noopener noreferrer" : ""}>
              <span className="hover:underline">{project.title}</span>
            </Link>
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-1">{project.year} · {project.duration || 'Self-directed'}</p>
          <CardDescription className="mt-2">{project.summary}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow px-6 pt-4">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 5).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-5">
        <Button asChild variant="link" className="p-0 h-auto">
          <Link href={href} className="group" target={isExternal ? '_blank' : '_self'} rel={isExternal ? "noopener noreferrer" : ""}>
            {ctaLabel}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
