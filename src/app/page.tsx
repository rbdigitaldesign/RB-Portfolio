
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronDown } from 'lucide-react';
import projectsData from '@/data/projects.json';
import { getAllPosts } from '@/lib/content';
import type { Project } from '@/lib/types';
import { ScrollReveal } from '@/components/scroll-reveal';

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

  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="min-h-[100svh] flex flex-col justify-between px-6 md:px-16 pt-28 pb-14 border-b border-border">
        <div />
        <div className="max-w-7xl w-full mx-auto">
          <p className="text-xs font-medium text-accent uppercase tracking-widest mb-8">
            Learning Designer &amp; UX — Brisbane, Australia
          </p>
          <h1
            className="max-w-5xl font-headline font-semibold tracking-tight"
            style={{ fontSize: 'clamp(2.8rem, 7.5vw, 6.5rem)', lineHeight: 1.03, letterSpacing: '-0.02em' }}
          >
            Designing learning<br />
            that actually works.
          </h1>
          <div className="mt-10 flex flex-wrap gap-6 items-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              View selected work <ArrowRight size={15} />
            </Link>
            <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
              <span>10+ years</span>
              <span className="hidden sm:inline">·</span>
              <span>FHEA</span>
              <span className="hidden sm:inline">·</span>
              <span>Group of Eight</span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl w-full mx-auto flex items-center gap-2 text-muted-foreground/40 text-xs">
          <ChevronDown size={15} className="animate-bounce" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ── Selected Work ─────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-14">
          <div className="flex items-baseline justify-between">
            <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Selected Work
            </h2>
            <Link
              href="/projects"
              className="text-xs text-muted-foreground hover:text-accent transition-colors flex items-center gap-1"
            >
              All projects <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {featuredProjects.map((project, i) => (
          <ScrollReveal key={project.slug}>
            <Link
              href={`/projects/${project.slug}`}
              className="group block border-t border-border hover:bg-muted/20 transition-colors"
            >
              <div
                className={`max-w-7xl mx-auto px-6 md:px-16 py-10 md:py-14 grid md:grid-cols-2 gap-8 md:gap-16 items-center`}
              >
                {/* Image — alternates side on desktop */}
                <div
                  className={`relative aspect-[16/10] overflow-hidden bg-muted ${
                    i % 2 === 1 ? 'md:order-2' : ''
                  }`}
                >
                  {project.coverImage && (
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  )}
                </div>
                {/* Text */}
                <div className={i % 2 === 1 ? 'md:order-1' : ''}>
                  <span className="text-xs font-mono text-muted-foreground mb-4 block">
                    0{i + 1}
                  </span>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {(project.tags ?? []).slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium text-muted-foreground uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-headline font-semibold leading-snug group-hover:text-accent transition-colors mb-4">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                    {project.summary}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-accent">
                    Read case study <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </section>

      {/* ── Credentials strip ─────────────────────────────────────── */}
      <ScrollReveal>
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-16 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-border">
            {[
              { stat: '10+', label: 'Years in L&D and UX' },
              { stat: 'FHEA', label: 'Fellow of the Higher Education Academy' },
              { stat: 'Go8', label: 'Group of Eight university' },
              { stat: 'LDX', label: 'Learning Design × UX hybrid' },
            ].map(({ stat, label }) => (
              <div key={stat} className="md:px-10 first:md:pl-0 last:md:pr-0">
                <p className="font-headline text-4xl md:text-5xl font-semibold text-accent mb-2">
                  {stat}
                </p>
                <p className="text-sm text-muted-foreground leading-snug">{label}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ── About ─────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-16 py-20 grid md:grid-cols-[2fr_3fr] gap-12 md:gap-20 items-start">
            <div className="relative aspect-square max-w-xs overflow-hidden">
              <Image
                src="https://i.imgur.com/X0EG5j2.png"
                alt="Rich Bartlett"
                fill
                className="object-cover"
              />
            </div>
            <div className="md:pt-6">
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-6">
                About
              </p>
              <p className="font-headline text-3xl md:text-4xl font-semibold leading-snug mb-6">
                I build bridges between learning theory and user-centred design.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Fellow of the Higher Education Academy (FHEA). 10+ years across Australia's tech
                and education sectors. Currently designing engaging online courses for thousands of
                students at a Group of Eight university.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Outside of that, I consult on UX and product design — helping teams build things
                that are both useful and genuinely enjoyable to use.
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
      </ScrollReveal>

      {/* ── Recent Writing ────────────────────────────────────────── */}
      {recentPosts.length > 0 && (
        <ScrollReveal>
          <section className="max-w-7xl mx-auto px-6 md:px-16 py-20">
            <div className="flex items-baseline justify-between mb-12">
              <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Recent Writing
              </h2>
              <Link
                href="/blog"
                className="text-xs text-muted-foreground hover:text-accent transition-colors flex items-center gap-1"
              >
                All posts <ArrowRight size={12} />
              </Link>
            </div>

            {/* Desktop list */}
            <div className="hidden md:block divide-y divide-border">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex items-baseline gap-10 py-7 hover:bg-muted/20 -mx-6 px-6 transition-colors"
                >
                  <span className="text-sm font-mono text-muted-foreground whitespace-nowrap w-10 shrink-0">
                    {new Date(post.date).getFullYear()}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="font-headline font-semibold text-xl group-hover:text-accent transition-colors leading-snug">
                      {post.title}
                    </span>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{post.summary}</p>
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-muted-foreground/30 group-hover:text-accent transition-colors shrink-0"
                  />
                </Link>
              ))}
            </div>

            {/* Mobile horizontal scroll cards */}
            <div className="md:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-6 px-6">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="snap-start shrink-0 w-72 border border-border p-6 hover:border-accent/50 transition-colors"
                >
                  <span className="text-xs font-mono text-muted-foreground block mb-3">
                    {new Date(post.date).getFullYear()}
                  </span>
                  <span className="font-headline font-semibold text-lg leading-snug block mb-2">
                    {post.title}
                  </span>
                  <p className="text-sm text-muted-foreground line-clamp-3">{post.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        </ScrollReveal>
      )}
    </div>
  );
}
