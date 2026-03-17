
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import projectsData from '@/data/projects.json';
import postsData from '@/data/posts.json';
import type { Project } from '@/lib/types';

// Projects to feature on the home page
const FEATURED_SLUGS = [
  'wellness-features-heat-safe-riding',
  'trip-approve-onboarding',
  'oua-orientation-redesign',
  'ppd-course-design',
];

export default function Home() {
  const allProjects = projectsData as Project[];
  const featuredProjects = FEATURED_SLUGS
    .map((slug) => allProjects.find((p) => p.slug === slug))
    .filter(Boolean) as Project[];

  const recentPosts = (postsData as any[]).slice(0, 2);

  return (
    <div className="max-w-5xl mx-auto px-6">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 border-b border-border">
        <p className="text-sm font-medium text-accent uppercase tracking-widest mb-6">
          Learning Designer &amp; UX — Australia
        </p>
        <h1 className="max-w-3xl">
          Designing learning<br className="hidden sm:block" /> that actually works.
        </h1>
        <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
          I'm Rich Bartlett — an LDX Designer at a Group of Eight university with 10+ years
          across Australia's tech and education sectors. I bridge learning science and UX
          to create experiences people remember.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            View all projects <ArrowRight size={16} />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 border border-border px-5 py-2.5 text-sm font-medium hover:border-foreground transition-colors"
          >
            About me
          </Link>
        </div>
      </section>

      {/* ── Selected Work ─────────────────────────────────────── */}
      <section className="py-16 border-b border-border">
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Selected Work
          </h2>
          <Link
            href="/projects"
            className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-center gap-1"
          >
            All projects <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 gap-px bg-border">
          {featuredProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group bg-background p-8 hover:bg-muted/40 transition-colors"
            >
              {project.coverImage && (
                <div className="relative w-full aspect-[4/3] mb-6 overflow-hidden bg-muted">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              )}
              <div className="flex flex-wrap gap-2 mb-3">
                {(project.tags ?? []).slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium text-muted-foreground uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-lg font-semibold font-headline leading-snug group-hover:text-accent transition-colors mb-2">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{project.summary}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                Read case study <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── About strip ───────────────────────────────────────── */}
      <section className="py-16 border-b border-border">
        <div className="grid md:grid-cols-[1fr_2fr] gap-10 items-start">
          <div className="relative aspect-square max-w-[220px] overflow-hidden">
            <Image
              src="https://i.imgur.com/X0EG5j2.png"
              alt="Rich Bartlett"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-4">
              About
            </h2>
            <p className="text-xl md:text-2xl font-headline font-semibold leading-snug mb-4">
              I build bridges between learning theory and user-centred design.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Fellow of the Higher Education Academy (FHEA). 10+ years in Australia's tech and
              education sectors. Currently designing engaging online courses for thousands of
              students at a Group of Eight university — and consulting on UX and product design
              outside of that.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors"
            >
              More about me <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Recent Writing ────────────────────────────────────── */}
      {recentPosts.length > 0 && (
        <section className="py-16">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Recent Writing
            </h2>
            <Link
              href="/blog"
              className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-center gap-1"
            >
              All posts <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-0 divide-y divide-border">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 py-6 hover:bg-muted/30 -mx-4 px-4 transition-colors"
              >
                <span className="text-sm text-muted-foreground whitespace-nowrap font-mono">
                  {new Date(post.publishedDate).getFullYear()}
                </span>
                <div>
                  <span className="font-headline font-semibold text-lg group-hover:text-accent transition-colors">
                    {post.title}
                  </span>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{post.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
