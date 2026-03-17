
import { notFound } from 'next/navigation';
import Image from 'next/image';
import projectsData from '@/data/projects.json';
import type { Project, ProjectCategory } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, CalendarDays, Clock, Users, Wrench } from 'lucide-react';
import { ProjectNavigation } from '@/components/project-navigation';
import { CATEGORY_COLORS, CATEGORY_SECTIONS } from '@/lib/project-categories';

const projects: Project[] = projectsData as Project[];

// Slugs that have their own dedicated case-study pages — not rendered here
const CASE_STUDY_SLUGS = new Set([
  'gopro-app-redesign',
  'wellness-features-delivery-apps',
  'bestie-health-club',
  'trip-approve-onboarding',
  'flock-hackathon',
  'personal-professional-development-course-design',
  'oua-design-process',
  'lms-tabbed-navigation',
  'ux-group-user-testing',
  'h5p-student-handbook-conversion',
  'tux-for-learning-design',
  'canvas-quick-navigation',
  'expandable-references-ux',
  'rps-pod-battle',
  'ux-survey-2025',
  'when-not-to-code',
]);

export async function generateStaticParams() {
  return projects
    .filter((p) => !CASE_STUDY_SLUGS.has(p.slug) && !p.links?.page)
    .map((p) => ({ slug: p.slug }));
}

function getProjectData(slug: string) {
  const project = projects.find((p) => p.slug === slug);
  if (!project || CASE_STUDY_SLUGS.has(slug) || project.links?.page) return null;

  const pool = projects.filter((p) => !CASE_STUDY_SLUGS.has(p.slug) && !p.links?.page);
  const idx = pool.findIndex((p) => p.slug === slug);

  return {
    project,
    prevProject: idx > 0 ? pool[idx - 1] : null,
    nextProject: idx < pool.length - 1 ? pool[idx + 1] : null,
  };
}

// ── Section renderer ─────────────────────────────────────────────────────────

function ContentSection({
  title,
  content,
  accent,
}: {
  title: string;
  content: string;
  accent?: string;
}) {
  if (!content?.trim()) return null;
  return (
    <section>
      <h2 className={`text-2xl font-bold font-headline mb-4 ${accent ?? ''}`}>{title}</h2>
      <p className="text-foreground/80 whitespace-pre-line leading-relaxed">{content}</p>
    </section>
  );
}

// ── Detail sidebar ────────────────────────────────────────────────────────────

function ProjectSidebar({ project }: { project: Project }) {
  const colors = CATEGORY_COLORS[project.category] ?? CATEGORY_COLORS['User Experience'];

  return (
    <Card className={`sticky top-24 border ${colors.border}`}>
      <CardHeader className={`rounded-t-lg ${colors.bg}`}>
        <div className="flex items-center gap-2">
          <span className="text-lg">{colors.icon}</span>
          <CardTitle className={`font-headline text-base ${colors.text}`}>{project.category}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-4 space-y-4 text-sm">
        {project.role && (
          <DetailRow icon={<Users className="h-4 w-4 shrink-0 text-muted-foreground" />} label="Role" value={project.role} />
        )}
        {project.year && (
          <DetailRow icon={<CalendarDays className="h-4 w-4 shrink-0 text-muted-foreground" />} label="Year" value={String(project.year)} />
        )}
        {project.duration && (
          <DetailRow icon={<Clock className="h-4 w-4 shrink-0 text-muted-foreground" />} label="Duration" value={project.duration} />
        )}
        {project.team && (
          <DetailRow icon={<Users className="h-4 w-4 shrink-0 text-muted-foreground" />} label="Team" value={project.team} />
        )}

        {project.tools && project.tools.length > 0 && (
          <>
            <Separator />
            <div>
              <div className="flex items-center gap-1.5 mb-2 text-muted-foreground">
                <Wrench className="h-4 w-4" />
                <span className="font-semibold text-foreground">Tools</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.tools.map((tool) => (
                  <Badge key={tool} variant="outline" className="text-xs">{tool}</Badge>
                ))}
              </div>
            </div>
          </>
        )}

        {project.tags && project.tags.length > 0 && (
          <>
            <Separator />
            <div>
              <span className="font-semibold block mb-2">Tags</span>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                ))}
              </div>
            </div>
          </>
        )}

        {project.links && (project.links.live || project.links.github) && (
          <>
            <Separator />
            <div className="flex flex-col gap-2">
              {project.links.live && (
                <Button variant="outline" size="sm" asChild>
                  <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                    Live Site <ExternalLink className="ml-2 h-3.5 w-3.5" />
                  </a>
                </Button>
              )}
              {project.links.github && (
                <Button variant="outline" size="sm" asChild>
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                    GitHub <Github className="ml-2 h-3.5 w-3.5" />
                  </a>
                </Button>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function DetailRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex gap-2">
      {icon}
      <div>
        <span className="font-semibold text-foreground">{label}:</span>{' '}
        <span className="text-foreground/80">{value}</span>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const data = getProjectData(params.slug);
  if (!data) notFound();

  const { project, prevProject, nextProject } = data;
  const colors = CATEGORY_COLORS[project.category] ?? CATEGORY_COLORS['User Experience'];
  const sections = CATEGORY_SECTIONS[project.category] ?? CATEGORY_SECTIONS['User Experience'];

  return (
    <article className="container mx-auto max-w-6xl py-16 px-4">
      <ProjectNavigation
        prevProject={prevProject ? { slug: prevProject.slug } : null}
        nextProject={nextProject ? { slug: nextProject.slug } : null}
      />

      {/* Header */}
      <header className="text-center mb-12">
        <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 ${colors.badge}`}>
          <span>{colors.icon}</span>
          {project.category}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary dark:text-primary-foreground mb-4">
          {project.title}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">{project.summary}</p>
      </header>

      {/* Cover image */}
      <div className="relative w-full aspect-video mb-12 rounded-xl overflow-hidden shadow-strong">
        <Image
          src={project.coverImage}
          alt={`Cover image for ${project.title}`}
          fill
          priority
          className="object-cover"
          data-ai-hint="project screenshot abstract"
        />
        {/* Category accent bar */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 ${colors.bg}`} />
      </div>

      {/* Content grid */}
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          <ContentSection title={sections.overview} content={project.overview} />

          {project.overview?.trim() && project.problem?.trim() && <Separator />}
          <ContentSection title={sections.problem} content={project.problem} />

          {project.problem?.trim() && project.process?.trim() && <Separator />}
          <ContentSection title={sections.process} content={project.process} />

          {project.process?.trim() && project.outcomes?.trim() && <Separator />}
          <ContentSection title={sections.outcomes} content={project.outcomes} />

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <>
              <Separator />
              <section>
                <h2 className="text-2xl font-bold font-headline mb-6">Artefacts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.gallery.map((imgSrc, i) => (
                    <div key={i} className="relative aspect-video rounded-lg overflow-hidden shadow-medium">
                      <Image
                        src={imgSrc}
                        alt={`${project.title} artefact ${i + 1}`}
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
          <ProjectSidebar project={project} />
        </aside>
      </div>

      <Separator className="my-16" />

      <ProjectNavigation
        bottom
        prevProject={prevProject ? { slug: prevProject.slug } : null}
        nextProject={nextProject ? { slug: nextProject.slug } : null}
      />
    </article>
  );
}
