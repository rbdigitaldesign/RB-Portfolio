'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { useFormStatus } from 'react-dom';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ExternalLink, ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { ScrollToTopButton } from '@/components/scroll-to-top-button';
import { ProjectNavigation } from '@/components/project-navigation';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { CaseStudyLayout } from '@/components/case-study-layout';
import { CaseStudyTOC } from '@/components/case-study-toc';
import { CaseStudyHeader } from '@/components/case-study-header';
import { joinWaitlist } from '@/app/actions/waitlist';

// ─── Content ──────────────────────────────────────────────────────────────────

const content = {
  overview: `Used AI-assisted design (Lovable) to rapidly prototype a product concept landing page for ShowerBoost — a portable, battery-powered shower pressure booster. The goal: create a credible, investor-ready prototype site that communicates the product vision, validates the concept with potential users, and collects early feedback.`,

  context: `Millions of renters, apartment dwellers, and travellers endure weak shower pressure with no practical fix. Whole-house pumps are expensive and require permanent installation; high-pressure showerheads barely make a difference. There's no portable, renter-friendly solution on the market. The target audience spans two groups: potential investors evaluating feasibility, and everyday consumers who'd want the product.`,

  constraints: [
    'Communicate a hardware product concept convincingly without a physical prototype.',
    'Build trust with investors by addressing obvious objections (safety, engineering complexity, market gap).',
    'Keep the experience fast, mobile-friendly, and visually polished — first impressions matter for fundraising.',
    'Collect genuine user interest and feedback to validate demand.',
  ],

  designCycles: [
    {
      title: 'Hero & value proposition',
      desc: `Full-viewport hero with parallax water imagery, clear tagline ("Boost Your Shower. No Plumber Needed."), and primary CTA.`,
    },
    {
      title: 'Problem framing',
      desc: `Dedicated section establishing the pain point with relatable language and a pressure comparison visual (before/after).`,
    },
    {
      title: 'Product concept & features',
      desc: `Interactive product breakdown: micro-recirculation system, removable battery with "charge it like your toothbrush" positioning, 30-second installation, and sediment filter.`,
    },
    {
      title: 'Comparison table',
      desc: `Side-by-side matrix against whole-house pumps, high-pressure heads, and electric showers to position ShowerBoost clearly.`,
    },
    {
      title: '"Why doesn\'t this already exist?"',
      desc: `Investor-facing section addressing engineering barriers, regulatory hurdles, and market gap — builds credibility by acknowledging the hard questions.`,
    },
    {
      title: 'Feedback capture',
      desc: `Embedded form to gauge interest and collect early signal from real users.`,
    },
  ],

  designDecisions: [
    {
      title: 'Removable battery framing',
      desc: `Rather than explaining lithium battery safety in technical terms, reframed charging as "Charge It Like Your Toothbrush" — familiar, non-threatening, immediately understood.`,
    },
    {
      title: '"Why doesn\'t this exist?" section',
      desc: `Instead of ignoring the elephant in the room, addressed it head-on. This builds investor confidence by showing awareness of barriers and a clear thesis for why the timing is right.`,
    },
    {
      title: 'Parallax and motion',
      desc: `Used sparingly to create a premium product-launch feel without sacrificing performance or accessibility.`,
    },
    {
      title: 'Comparison table over feature list',
      desc: `Investors and consumers both benefit from seeing ShowerBoost positioned against known alternatives rather than listed features in isolation.`,
    },
  ],

  tools: [
    { name: 'Lovable (AI-assisted)', desc: 'Rapid prototyping of the React/TypeScript/Tailwind site with iterative prompt-driven design.' },
    { name: 'ChatGPT', desc: 'Initial market research, product naming, copy iteration, and objection mapping.' },
    { name: 'Framer Motion', desc: 'Scroll-triggered reveal animations for section-by-section storytelling.' },
    { name: 'Shadcn/UI', desc: 'Consistent component library for cards, buttons, and layout primitives.' },
    { name: 'AI Image Generation', desc: 'Product renders and lifestyle imagery created to support the concept in the absence of a physical prototype.' },
  ],

  learnings: [
    'AI-assisted tools like Lovable dramatically compress the concept-to-prototype timeline — this site went from idea to functional prototype in hours, not weeks.',
    'Narrative structure matters more than visual polish for investor-facing concepts. Addressing objections proactively ("why doesn\'t this exist?") was more persuasive than adding more feature sections.',
    'Designing for a product that doesn\'t physically exist yet requires careful balance: enough specificity to feel real, enough restraint to avoid overpromising.',
    'Iterative prompt-driven design mirrors traditional design iteration — the loop is just faster. Each cycle still requires human judgement on hierarchy, tone, and information architecture.',
  ],

  nextSteps: [
    'Conduct structured user testing on the landing page to measure comprehension, trust, and intent-to-buy signals.',
    'Add an FAQ section (accordion format) covering safety, battery life, water compatibility, and shipping.',
    'Explore a short product animation or explainer video embedded in the hero.',
    'Build a waitlist integration to capture email addresses and measure conversion.',
    'Iterate on mobile experience based on analytics and session recordings.',
  ],

  aiDisclosure: `AI (Lovable / GPT) was used to scaffold the React codebase, generate product imagery, and iterate on copy and layout. All design decisions — information architecture, narrative structure, visual hierarchy, and strategic framing — were human-directed. Each AI-generated output was reviewed, refined, and often substantially reworked to serve the project's goals.`,
};

const faqs = [
  {
    q: 'Is it safe to use a battery-powered device in the shower?',
    a: 'Yes — ShowerBoost is designed with an IPX-rated waterproof housing that meets international standards for water resistance in wet environments. The lithium battery unit is fully sealed and removable, so it never comes into direct contact with water. All electrical components are isolated from the water flow path.',
  },
  {
    q: 'How long does the battery last?',
    a: 'The target battery life is 45–90 minutes of continuous use per charge, depending on water pressure conditions and pump load. For most showers (5–10 minutes), that\'s 5–15 showers per charge. The battery charges via USB-C in approximately 2 hours — similar to a toothbrush or shaver.',
  },
  {
    q: 'Will it work with my existing shower fitting?',
    a: 'ShowerBoost is designed to use a standard ½-inch BSP thread fitting — the most common shower connection in Australia, the UK, and most of Europe. It screws onto the existing pipe where your showerhead connects, requiring no tools and no plumber. Adaptors for other thread types are planned.',
  },
  {
    q: 'How much will it cost?',
    a: 'The target retail price is $89–$129 AUD ($55–$80 USD), making it significantly cheaper than whole-house pump systems ($500–$2,000+) or electric shower replacement ($300–$800 installed). Exact pricing will depend on manufacturing volumes and material choices.',
  },
  {
    q: 'When will it be available to buy?',
    a: 'ShowerBoost is currently in the concept validation and investor-pitch phase. The prototype site exists to test market demand and gather early feedback. Join the waitlist to be notified when development progresses, and to have input on features and pricing.',
  },
  {
    q: 'Does it work with all water types?',
    a: 'The built-in sediment filter is designed to handle typical municipal water supplies, including mildly hard water. The filter is user-replaceable (target: every 3–6 months). Extremely hard water or water with high iron content may require additional pre-filtration — this will be addressed in the product specs.',
  },
];

// Gallery images — real product renders from the ShowerBoost Lovable project
// Note: save the ChatGPT conversation screenshot to /images/showerboost/chatgpt-ideation.png
const galleryImages = [
  {
    src: '/images/showerboost/product-wall-mounted.png',
    alt: 'ShowerBoost device installed on a shower wall — the full product concept',
    hint: 'product wall mounted render',
    label: 'Product Concept Render',
  },
  {
    src: '/images/showerboost/product-handheld.png',
    alt: 'ShowerBoost compact inline device — handheld product render',
    hint: 'product handheld render',
    label: 'Device Close-Up',
  },
  {
    src: '/images/showerboost/before-after-pressure.png',
    alt: 'Before and after pressure comparison — problem framing visual',
    hint: 'before after water pressure comparison',
    label: 'Pressure Comparison',
  },
  {
    src: '/images/showerboost/product-battery-charging.png',
    alt: 'ShowerBoost removable battery — "charge it like your toothbrush" framing',
    hint: 'battery charging product shot',
    label: 'Battery & Charging',
  },
  {
    src: '/images/showerboost/product-installation.png',
    alt: 'ShowerBoost 30-second installation — screws onto existing shower fitting',
    hint: 'product installation diagram',
    label: '30-Second Installation',
  },
];

// ─── Waitlist Form ────────────────────────────────────────────────────────────

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Joining…
        </>
      ) : (
        'Join the waitlist'
      )}
    </Button>
  );
}

function WaitlistForm() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setError(null);
    const result = await joinWaitlist(formData);
    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error ?? 'Something went wrong. Please try again.');
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center">
        <CheckCircle2 className="h-10 w-10 text-green-500" />
        <p className="font-semibold text-lg">You&apos;re on the list!</p>
        <p className="text-muted-foreground text-sm max-w-sm">
          Thanks for your interest in ShowerBoost. We&apos;ll be in touch as the project
          develops.
        </p>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="waitlist-name">Name</Label>
          <Input id="waitlist-name" name="name" placeholder="Your name" required minLength={2} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="waitlist-email">Email</Label>
          <Input
            id="waitlist-email"
            name="email"
            type="email"
            placeholder="your@email.com"
            required
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="waitlist-interest">
          What would make ShowerBoost a must-have for you?{' '}
          <span className="text-muted-foreground font-normal">(optional)</span>
        </Label>
        <Textarea
          id="waitlist-interest"
          name="interest"
          placeholder="e.g. I rent and hate my weak shower pressure…"
          className="resize-none"
          rows={3}
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <SubmitButton />
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ShowerBoostPage() {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleNext = useCallback(() => {
    setSelectedIndex((i) => (i + 1) % galleryImages.length);
  }, []);
  const handlePrev = useCallback(() => {
    setSelectedIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, handleNext, handlePrev]);

  return (
    <CaseStudyLayout>
      <CaseStudyHeader slug="showerboost" />

      <ProjectNavigation prevProject={null} nextProject={null} />

      <div className="grid lg:grid-cols-4 gap-12">
        {/* ── Sidebar TOC ── */}
        <aside className="hidden lg:block lg:col-span-1">
          <CaseStudyTOC
            items={[
              { href: '#overview', label: 'Overview' },
              { href: '#ideation', label: 'Ideation — ChatGPT' },
              { href: '#context', label: 'Context & audience' },
              { href: '#constraints', label: 'Constraints' },
              { href: '#design-cycles', label: 'Design cycles' },
              { href: '#design-decisions', label: 'Key design decisions' },
              { href: '#gallery', label: 'Gallery' },
              { href: '#tools', label: 'Tools & technology' },
              { href: '#learnings', label: 'What I learned' },
              { href: '#next-steps', label: 'Next steps' },
              { href: '#faq', label: 'FAQ' },
              { href: '#waitlist', label: 'Join the waitlist' },
              { href: '#ai-disclosure', label: 'AI disclosure' },
            ]}
          />
        </aside>

        {/* ── Main Content ── */}
        <main className="lg:col-span-2 space-y-12">
          {/* Overview */}
          <section id="overview">
            <h3 className="cs-h2">Project overview</h3>
            <p className="text-foreground/80">{content.overview}</p>
            <div className="mt-4">
              <Button asChild>
                <a
                  href="https://boost-flow-innovate.lovable.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View live prototype <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </section>

          <Separator />

          {/* Ideation screenshot */}
          <section id="ideation" className="cs-section">
            <h3 className="cs-h2">Where it started — ChatGPT ideation</h3>
            <p className="text-foreground/80 mb-4">
              The concept began with a research conversation with ChatGPT to explore whether a
              product like this already existed in the market — and to map the problem space before
              any design work started.
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/showerboost/chatgpt-ideation.png"
              alt="Initial ChatGPT conversation exploring the ShowerBoost product concept and market research"
              className="w-full h-auto rounded-md border border-border shadow-medium"
            />
            <p className="text-xs text-muted-foreground mt-2">
              ChatGPT market research conversation — the starting point for the ShowerBoost concept.{' '}
              <span className="text-accent">                          
              </span>
            </p>
          </section>

          <Separator />

          {/* Context */}
          <section id="context" className="cs-section">
            <h3 className="cs-h2">Context — the problem space & audience</h3>
            <p className="text-foreground/80">{content.context}</p>
          </section>

          <Separator />

          {/* Constraints */}
          <section id="constraints" className="cs-section">
            <h3 className="cs-h2">Problem & constraints</h3>
            <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
              {content.constraints.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </section>

          <Separator />

          {/* Design Cycles */}
          <section id="design-cycles" className="cs-section">
            <h3 className="cs-h2">Approach & evolution — design cycles</h3>
            <p className="text-foreground/80 mb-6">
              Six iterative design cycles shaped the final prototype, each building on the last:
            </p>
            <ol className="space-y-5">
              {content.designCycles.map((cycle, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent/15 text-accent flex items-center justify-center text-sm font-semibold">
                    {i + 1}
                  </span>
                  <div>
                    <h4 className="cs-h3 mb-1">{cycle.title}</h4>
                    <p className="text-foreground/80 text-sm">{cycle.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <Separator />

          {/* Design Decisions */}
          <section id="design-decisions" className="cs-section">
            <h3 className="cs-h2">Key design decisions</h3>
            <div className="space-y-6">
              {content.designDecisions.map((d, i) => (
                <div key={i} className="cs-callout">
                  <h4 className="cs-h3 mb-1">{d.title}</h4>
                  <p className="text-foreground/80 text-sm">{d.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <Separator />

          {/* Tools */}
          <section id="tools" className="cs-section">
            <h3 className="cs-h2">Tools & technology</h3>
            <ul className="space-y-3">
              {content.tools.map((t, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="font-semibold min-w-[160px] text-foreground">{t.name}</span>
                  <span className="text-foreground/80">{t.desc}</span>
                </li>
              ))}
            </ul>
          </section>

          <Separator />

          {/* Learnings */}
          <section id="learnings" className="cs-section">
            <h3 className="cs-h2">What I learned</h3>
            <ul className="list-disc list-outside space-y-3 pl-5 text-foreground/80">
              {content.learnings.map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ul>
          </section>

          <Separator />

          {/* Next Steps */}
          <section id="next-steps" className="cs-section">
            <h3 className="cs-h2">Next steps</h3>
            <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
              {content.nextSteps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </section>

          <Separator />

          {/* AI Disclosure */}
          <section id="ai-disclosure" className="cs-section">
            <h3 className="cs-h2">Disclosure on AI use</h3>
            <div className="cs-callout">
              <p className="text-foreground/80 text-sm italic">{content.aiDisclosure}</p>
            </div>
          </section>
        </main>

        {/* ── Right Sidebar ── */}
        <aside className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Quick facts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold mb-1">Type</h4>
                <p className="text-muted-foreground">AI-assisted product concept prototype</p>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-1">Year</h4>
                <p className="text-muted-foreground">2025</p>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-1">Timeline</h4>
                <p className="text-muted-foreground">Idea to prototype in ~1 day</p>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-1">Role</h4>
                <p className="text-muted-foreground">
                  Concept Designer & AI Prompt Engineer
                </p>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-1">Stack</h4>
                <p className="text-muted-foreground">
                  React · TypeScript · Tailwind · Framer Motion · Shadcn/UI
                </p>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-1">AI tools</h4>
                <p className="text-muted-foreground">Lovable · ChatGPT</p>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-1">Status</h4>
                <p className="text-muted-foreground">
                  Live prototype — concept/validation phase
                </p>
              </div>
              <Separator />
              <Button asChild className="w-full" size="sm">
                <a
                  href="https://boost-flow-innovate.lovable.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View live prototype <ExternalLink className="ml-2 h-3 w-3" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>

      {/* ── Gallery ── */}
      <section id="gallery" className="mt-16">
        <h3 className="cs-h2 text-center">Gallery</h3>
        <p className="text-center text-muted-foreground text-sm mb-6">
          Screenshots from the live Lovable prototype and initial ideation.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((img, index) => (
            <div
              key={index}
              className="group relative cursor-pointer aspect-video rounded-md overflow-hidden shadow-medium transition-transform hover:scale-105"
              onClick={() => {
                setSelectedIndex(index);
                setOpen(true);
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                data-ai-hint={img.hint}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-center text-sm font-medium">{img.label}</p>
                <p className="text-white/70 text-center text-xs mt-1">{img.alt}</p>
              </div>
            </div>
          ))}
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-5xl p-0 bg-transparent border-none shadow-none">
            <div className="relative aspect-video">
              <Image
                src={galleryImages[selectedIndex].src}
                alt={galleryImages[selectedIndex].alt}
                fill
                className="rounded-lg object-contain"
              />
            </div>
            <p className="text-center text-white text-sm mt-2">
              {galleryImages[selectedIndex].label}
            </p>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 hover:bg-black/75 text-white"
              onClick={handlePrev}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 hover:bg-black/75 text-white"
              onClick={handleNext}
            >
              <ArrowRight className="h-6 w-6" />
            </Button>
          </DialogContent>
        </Dialog>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="mt-16">
        <h3 className="cs-h2 text-center">Frequently asked questions</h3>
        <p className="text-center text-muted-foreground text-sm mb-8">
          Common questions about ShowerBoost — the product concept.
        </p>
        <Accordion type="single" collapsible className="max-w-2xl mx-auto">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left font-medium">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-foreground/80">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* ── Waitlist ── */}
      <section id="waitlist" className="mt-16">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <p className="text-xs font-medium uppercase tracking-widest text-accent mb-1">
              Early Access
            </p>
            <CardTitle className="font-headline text-2xl">
              Interested in ShowerBoost?
            </CardTitle>
            <p className="text-muted-foreground text-sm mt-2">
              Join the waitlist to get notified when the product moves into development, and to
              have your say on features, pricing, and availability.
            </p>
          </CardHeader>
          <CardContent>
            <WaitlistForm />
          </CardContent>
        </Card>
      </section>

      <ProjectNavigation prevProject={null} nextProject={null} bottom />

      <ScrollToTopButton />
    </CaseStudyLayout>
  );
}
