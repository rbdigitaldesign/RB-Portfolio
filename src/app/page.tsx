
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronDown, ExternalLink, Award } from 'lucide-react';
import projectsData from '@/data/projects.json';
import { getAllPosts } from '@/lib/content';
import type { Project } from '@/lib/types';
import { ScrollReveal } from '@/components/scroll-reveal';
import { HeroParallax } from '@/components/hero-parallax';

export const revalidate = 86400; // Rebuild at most once per day

function seededRandom(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 0x100000000;
  };
}

function getDailyFeaturedProjects(projects: Project[], count = 4): Project[] {
  const eligible = projects.filter(
    (p) => p.featured && (!p.status || p.status === 'published')
  );
  const today = new Date();
  const seed =
    today.getUTCFullYear() * 10000 +
    (today.getUTCMonth() + 1) * 100 +
    today.getUTCDate();
  const rand = seededRandom(seed);
  const shuffled = [...eligible];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

export default function Home() {
  const allProjects = projectsData as Project[];
  const featuredProjects = getDailyFeaturedProjects(allProjects);

  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <div>
      {/* ── Hero (parallax) ───────────────────────────────────────── */}
      <HeroParallax>
        <div />
        <div className="max-w-7xl w-full mx-auto">
          <p className="text-sm font-medium text-white/80 uppercase tracking-widest mb-8" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
            Learning Designer &amp; UX — Adelaide, Australia
          </p>
          <h1
            className="max-w-5xl font-headline font-semibold tracking-tight text-white"
            style={{ fontSize: 'clamp(2.8rem, 7.5vw, 6.5rem)', lineHeight: 1.03, letterSpacing: '-0.02em', textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
          >
            Where UX meets<br />
            learning design.
          </h1>
          <div className="mt-10 flex flex-wrap gap-6 items-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-white text-foreground px-6 py-3 text-sm font-medium hover:bg-white/90 transition-opacity"
            >
              View selected work <ArrowRight size={15} />
            </Link>
            <div className="flex flex-wrap gap-x-5 gap-y-1 text-base font-medium text-white/90" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
              <span>15+ yrs across tech, UX &amp; learning</span>
              <span className="hidden sm:inline">·</span>
              <a
                href="https://www.advance-he.ac.uk/fellowship"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Award size={14} className="text-amber-300" />
                FHEA <ExternalLink size={10} className="opacity-60" />
              </a>
              <span className="hidden sm:inline">·</span>
              <span>Adelaide University</span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl w-full mx-auto flex items-center gap-2 text-white/30 text-xs">
          <ChevronDown size={15} className="animate-bounce" />
          <span>Scroll</span>
        </div>
      </HeroParallax>

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
              <div className="max-w-7xl mx-auto px-6 md:px-16 py-10 md:py-14 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
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

            <div className="md:px-10 first:md:pl-0">
              <p className="font-headline text-4xl md:text-5xl font-semibold text-accent mb-2">15+</p>
              <p className="text-sm text-muted-foreground leading-snug">Yrs in L&amp;D &amp; UX</p>
            </div>

            <div className="md:px-10">
              <a
                href="https://www.advance-he.ac.uk/fellowship"
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <p className="font-headline text-4xl md:text-5xl font-semibold text-accent mb-2 flex items-end gap-2 group-hover:opacity-80 transition-opacity">
                  FHEA
                  <ExternalLink size={16} className="mb-1.5 opacity-40 group-hover:opacity-70 transition-opacity" />
                </p>
                <p className="text-sm text-muted-foreground leading-snug">Advance HE Fellow</p>
              </a>
            </div>

            <div className="md:px-10">
              <p className="font-headline text-4xl md:text-5xl font-semibold text-accent mb-2">AU</p>
              <p className="text-sm text-muted-foreground leading-snug">Adelaide University</p>
            </div>

            <div className="md:px-10 last:md:pr-0">
              <p className="font-headline text-4xl md:text-5xl font-semibold text-accent mb-2">LDX</p>
              <p className="text-sm text-muted-foreground leading-snug">Learning Design × UX hybrid</p>
            </div>

          </div>
        </section>
      </ScrollReveal>

      {/* ── About ─────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-16 py-20 grid md:grid-cols-[2fr_3fr] gap-12 md:gap-20 items-stretch">

            {/* Circular profile photo */}
            <div className="flex items-center justify-center">
              <div className="relative aspect-square w-full rounded-full overflow-hidden ring-4 ring-border">
                <Image
                  src="/profile.jpg"
                  alt="Rich Bartlett"
                  fill
                  className="object-cover object-center"
                  style={{ objectPosition: '50% 30%' }}
                />
              </div>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-6">
                About
              </p>
              <p className="font-headline text-3xl md:text-4xl font-semibold leading-snug mb-6">
                I build bridges between learning theory and user-centred design.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Fellow of the Higher Education Academy (
                <a
                  href="https://www.advance-he.ac.uk/fellowship"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline underline-offset-2 hover:text-accent transition-colors"
                >
                  FHEA
                </a>
                ). 15+ years across Australia's tech and education sectors. Currently designing
                engaging online courses at Adelaide University.
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
                  className="snap-start shrink-0 w-72 border border-border p-6 hover:border-accent/50 transition-colors rounded-sm"
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
