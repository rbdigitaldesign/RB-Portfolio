
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — Rich Bartlett',
  description:
    'Learning Designer and UX practitioner based in Adelaide, Australia. 15+ years across tech and education.',
};

const SKILLS = [
  'UX Research',
  'UI Design',
  'Instructional Design',
  'Curriculum Development',
  'Prototyping',
  'Usability Testing',
  'Systems Thinking',
  'Agile Methodologies',
  'Frontend Development',
  'Facilitation',
];

const TOOLS = [
  'Figma',
  'Miro / FigJam',
  'Canvas LMS',
  'Canva',
  'Adobe Creative Suite',
  'Tiptap / Rich Editors',
  'ChatGPT / AI Tools',
  'Firebase Studio',
  'GitHub',
  'Google Suite',
];

const INTERESTS = [
  { emoji: '🏋️', text: 'CrossFit and Weightlifting — challenging my physical limits and having fun.' },
  { emoji: '⛺', text: 'Camping with family and friends across SA.' },
  { emoji: '🐕', text: 'Beach runs and park sessions with Jerry Boi Seinfeld (a Kelpie cross with strong opinions).' },
  { emoji: '🎧', text: 'Podcasts: Heavyweight, Science Vs, How I Built This. Diary of a CEO (Steve Bartlett, no relation).' },
  { emoji: '🎸', text: 'Slowly learning guitar. Very slowly.' },
  { emoji: '🍺', text: 'A good beer with good people.' },
  { emoji: '💍', text: 'Married to an incredible Nursey wifey.' },
];

const LIFE_LEFT = [
  { src: '/life-guitar.jpg', alt: 'Playing guitar with my daughter' },
  { src: '/life-beer.jpg', alt: 'A cold beer — priorities intact' },
  { src: '/life-crossfit.jpg', alt: 'CrossFit box jump' },
  { src: '/life-camping.jpg', alt: 'Camping across SA' },
];

const LIFE_RIGHT = [
  { src: '/life-family.jpg', alt: 'Family day at the coast' },
  { src: '/life-wedding.jpg', alt: 'Wedding day' },
  { src: '/life-beach.jpg', alt: 'Beach day with the little one' },
  { src: '/life-jerry.jpg', alt: 'Jerry Boi Seinfeld' },
];

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* ── Hero ────────────────────────────────────────────────── */}
      <header className="border-b border-border pb-12 mb-12 grid md:grid-cols-[200px_1fr] gap-10 items-start">
        <div className="relative aspect-square overflow-hidden rounded-full bg-muted max-w-[200px]">
          <Image
            src="/profile.jpg"
            alt="Rich Bartlett"
            fill
            priority
            className="object-cover object-center"
            style={{ objectPosition: '50% 30%' }}
          />
        </div>
        <div>
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">
            About
          </p>
          <h1 className="font-headline font-semibold text-4xl md:text-5xl leading-tight mb-4 max-w-xl">
            Rich Bartlett
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            LDX Designer · Adelaide, Australia
          </p>
          <a
            href="https://www.advance-he.ac.uk/fellowship/fellowship"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-accent transition-colors"
          >
            Fellow of the Higher Education Academy (FHEA)
            <ExternalLink size={13} />
          </a>
        </div>
      </header>

      {/* ── Bio ─────────────────────────────────────────────────── */}
      <section className="grid md:grid-cols-[2fr_1fr] gap-12 border-b border-border pb-12 mb-12">
        <div className="space-y-5 text-muted-foreground leading-relaxed">
          <p>
            I build bridges between learning theory and user-centred design to create experiences
            that are not just usable, but also meaningful and memorable.
          </p>
          <p>
            With over fifteen years of experience across Australia's technology and education sectors,
            I've developed a unique skill set that merges the rigour of learning design with the
            empathy of UX. My career began in tech support and evolved into roles where I could
            directly impact how people interact with and learn from technology.
          </p>
          <p>
            Currently, as a Learning Designer at the University of Adelaide, I apply these
            principles to create engaging and effective online courses for thousands of students.
            I thrive on complex challenges and am passionate about using design to solve problems
            and improve people's lives.
          </p>
          <p>
            My practice combines systems thinking, iterative design, and a genuine curiosity for
            how things work. I work collaboratively with academics, developers, and media specialists
            — because the best results come from shared insight and diverse perspectives.
          </p>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">
              Based in
            </p>
            <p className="font-medium">Adelaide, Australia</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">
              Current role
            </p>
            <p className="font-medium">Learning Designer, University of Adelaide</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">
              Experience
            </p>
            <p className="font-medium">15+ years</p>
          </div>
          <div className="pt-2">
            <a
              href="https://docs.google.com/document/d/1RIHsBSdbUdbeABwg0y3Ql_aiKISd0hpSJM7DIgJK3I8/export?format=pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Rich_Bartlett_Resume.pdf"
              className="inline-flex items-center gap-2 text-sm font-medium border border-border px-4 py-2 hover:border-foreground transition-colors rounded-sm"
            >
              Download Resume <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ── Skills & Tools ──────────────────────────────────────── */}
      <section className="grid md:grid-cols-2 gap-12 border-b border-border pb-12 mb-12">
        <div>
          <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-5">
            Skills
          </h2>
          <ul className="space-y-2">
            {SKILLS.map((s) => (
              <li key={s} className="flex items-center gap-2 text-sm">
                <span className="w-1 h-1 bg-accent flex-shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-5">
            Tools
          </h2>
          <ul className="space-y-2">
            {TOOLS.map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm">
                <span className="w-1 h-1 bg-muted-foreground flex-shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Life outside work ───────────────────────────────────── */}
      <section className="border-b border-border pb-12 mb-12">
        {/* Mobile: 2-col grid of circles then text */}
        <div className="md:hidden mb-6">
          <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-5">
            Life outside work
          </h2>
          <div className="grid grid-cols-4 gap-3 mb-6">
            {[...LIFE_LEFT, ...LIFE_RIGHT].map((img) => (
              <div key={img.src} className="relative w-full aspect-square rounded-full overflow-hidden ring-2 ring-border">
                <Image src={img.src} alt={img.alt} fill className="object-cover object-center" />
              </div>
            ))}
          </div>
          <ul className="space-y-3">
            {INTERESTS.map((item, i) => (
              <li key={i} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                <span className="flex-shrink-0">{item.emoji}</span>
                {item.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop: 4 circles | text | 4 circles */}
        <div className="hidden md:flex gap-8 items-center">
          {/* Left column: 4 circles */}
          <div className="flex-shrink-0 flex flex-col gap-4">
            {LIFE_LEFT.map((img) => (
              <div key={img.src} className="relative w-28 h-28 rounded-full overflow-hidden ring-2 ring-border">
                <Image src={img.src} alt={img.alt} fill className="object-cover object-center" />
              </div>
            ))}
          </div>

          {/* Centre: text */}
          <div className="flex-1">
            <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-5">
              Life outside work
            </h2>
            <ul className="space-y-3">
              {INTERESTS.map((item, i) => (
                <li key={i} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                  <span className="flex-shrink-0">{item.emoji}</span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>

          {/* Right column: 4 circles */}
          <div className="flex-shrink-0 flex flex-col gap-4">
            {LIFE_RIGHT.map((img) => (
              <div key={img.src} className="relative w-28 h-28 rounded-full overflow-hidden ring-2 ring-border">
                <Image src={img.src} alt={img.alt} fill className="object-cover object-center" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-4">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity rounded-sm"
        >
          View my work <ArrowRight size={16} />
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 border border-border px-5 py-2.5 text-sm font-medium hover:border-foreground transition-colors rounded-sm"
        >
          Get in touch
        </Link>
      </div>
    </div>
  );
}
