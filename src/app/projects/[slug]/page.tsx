import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import projectsData from '@/data/projects.json';
import type { Project } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, ArrowLeft, ArrowRight } from 'lucide-react';
import { CaseStudyHeader } from '@/components/case-study-header';

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

// ── Detail sidebar ─────────────────────────────────────────────────────────

function ProjectSidebar({ project }: { project: Project }) {
  return (
    <aside className="space-y-6">
      <div className="border border-border divide-y divide-border rounded-sm overflow-hidden">
        {[
          { label: 'Role', value: project.role },
          { label: 'Year', value: project.year ? String(project.year) : null },
          { label: 'Duration', value: project.duration },
          { label: 'Team', value: project.team },
        ]
          .filter((r) => r.value)
          .map(({ label, value }) => (
            <div key={label} className="px-4 py-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{label}</p>
              <p className="text-sm font-medium">{value}</p>
            </div>
          ))}
      </div>

      {project.tools && project.tools.length > 0 && (
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Tools</p>
          <div className="flex flex-wrap gap-1.5">
            {project.tools.map((tool) => (
              <span key={tool} className="text-xs border border-border px-2 py-0.5 rounded-sm">
                {tool}
              </span>
            ))}
          </div>
        </div>
      )}

      {project.tags && project.tags.length > 0 && (
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Tags</p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {project.links && (project.links.live || project.links.github) && (
        <div className="space-y-2">
          {project.links.live && (
            <a href={project.links.live} target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-2 text-sm text-accent hover:underline">
              <ExternalLink size={13} /> Live site
            </a>
          )}
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-2 text-sm text-accent hover:underline">
              <Github size={13} /> GitHub
            </a>
          )}
        </div>
      )}
    </aside>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const data = getProjectData(params.slug);
  if (!data) notFound();

  const { project, prevProject, nextProject } = data;

  return (
    <article className="max-w-6xl mx-auto px-6 md:px-10 pb-24">
      {/* Editorial header */}
      <CaseStudyHeader slug={project.slug} />

      {/* Content + sidebar */}
      <div className="grid lg:grid-cols-[1fr_280px] gap-12 lg:gap-16">
        <div>
          {/* Overview */}
          {project.overview?.trim() && (
            <section>
              <h2 className="cs-h2">Overview</h2>
              <p className="cs-body">{project.overview}</p>
            </section>
          )}

          {/* Problem */}
          {project.problem?.trim() && (
            <section className="cs-section">
              <h2 className="cs-h2">Problem</h2>
              <div className="cs-callout">
                <p className="cs-body not-italic">{project.problem}</p>
              </div>
            </section>
          )}

          {/* Process — numbered phases */}
          {project.process?.trim() && (
            <section className="cs-section">
              <h2 className="cs-h2">Process</h2>
              <div>
                {project.process.split('\n').filter(Boolean).map((step, i) => (
                  <div key={i} className="cs-phase">
                    <span className="cs-phase-num">0{i + 1}</span>
                    <p className="cs-body pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Outcomes */}
          {project.outcomes?.trim() && (
            <section className="cs-section">
              <h2 className="cs-h2">Outcomes</h2>
              <p className="cs-body">{project.outcomes}</p>
            </section>
          )}

          {/* Gallery — skip placeholder images */}
          {project.gallery && project.gallery.filter((g) => !g.includes('placehold')).length > 0 && (
            <section className="cs-section">
              <h2 className="cs-h2">Artefacts</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.gallery
                  .filter((g) => !g.includes('placehold'))
                  .map((imgSrc, i) => (
                    <div key={i} className="relative aspect-video overflow-hidden bg-muted group">
                      <Image
                        src={imgSrc}
                        alt={`${project.title} — artefact ${i + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                  ))}
              </div>
            </section>
          )}
        </div>

        {/* Sticky sidebar */}
        <div className="sticky top-24 self-start hidden lg:block">
          <ProjectSidebar project={project} />
        </div>
      </div>

      {/* Bottom navigation */}
      <nav className="mt-16 pt-8 border-t border-border flex justify-between items-center">
        {prevProject ? (
          <Link href={`/projects/${prevProject.slug}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group">
            <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
            Previous
          </Link>
        ) : <span />}

        <Link href="/projects" className="text-sm text-muted-foreground hover:text-accent transition-colors">
          All projects
        </Link>

        {nextProject ? (
          <Link href={`/projects/${nextProject.slug}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group">
            Next
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        ) : <span />}
      </nav>
    </article>
  );
}
