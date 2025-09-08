
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ExternalLink, Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollToTopButton } from '@/components/scroll-to-top-button';
import { ProjectNavigation } from '@/components/project-navigation';
import { Dialog, DialogContent } from '@/components/ui/dialog';


// This would ideally be in a separate layout component
const CaseStudyLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="container mx-auto max-w-6xl py-16 px-4">{children}</div>;
};

// This would ideally be in a separate file.
const LocalTOC = () => (
  <nav className="sticky top-24">
    <h4 className="font-semibold mb-2 font-headline">On this page</h4>
    <ul className="space-y-2 text-sm text-muted-foreground">
      <li><a href="#brief" className="hover:text-primary">Project brief</a></li>
      <li><a href="#problem" className="hover:text-primary">The problem</a></li>
      <li><a href="#challenge" className="hover:text-primary">The design challenge</a></li>
      <li><a href="#solution" className="hover:text-primary">The solution</a></li>
      <li><a href="#approach" className="hover:text-primary">Design approach</a></li>
      <li><a href="#insights" className="hover:text-primary">Key insights</a></li>
      <li><a href="#outcomes" className="hover:text-primary">Outcomes</a></li>
      <li><a href="#feedback" className="hover:text-primary">Client feedback</a></li>
      <li><a href="#reflection" className="hover:text-primary">Reflection & next steps</a></li>
    </ul>
  </nav>
);

const Testimonial = ({ quote, author, company }: { quote: string, author: string, company: string }) => (
    <blockquote className="mt-6 border-l-2 pl-6 italic text-foreground/80">
        "{quote}"
        <cite className="block mt-4 not-italic font-semibold text-foreground/90">— {author}, <span className="font-normal">{company}</span></cite>
    </blockquote>
);

const projectContent = {
  brief: `Discover needs, pains, and gains for first-time dog owners; validate the live MVP; and recommend UX/UI improvements that preserve existing engineering flows.`,
  problem: [
    `The web MVP existed, but ideas needed evidence before build.`,
    `Onboarding/home/profile lacked clarity; health-assessment felt long.`,
    `Owners typically see vets every 6–12 months—leaving guidance gaps between visits.`,
  ],
  challenge: `“What do first-time dog owners actually need in the first two years—and how should the app evolve to support them?”`,
  solution: [
    `**Clearer starts:** crisper sign-up/login, strong CTAs on Home.`,
    `**Momentum:** milestone markers to recognise progress and prompt care.`,
    `**Faster setup:** compressed profile build with progress feedback.`,
    `**Results that act:** redesigned assessment results with “what this means” and “what to do next.”`,
  ],
  solutionNote: `All changes respected the current MVP flow for feasibility.`,
  approach: {
    discovery: `8 qualitative interviews; 41-response survey on habits/health; AU tele-vet competitor review (4 focal competitors).`,
    synthesis: `Affinity mapping, personas, opportunity areas (triage, “forgot-to-ask” questions, behaviour tips).`,
    prototyping: `Replicated the MVP in Figma; tighter test scripts; short moderated sessions; iterations on language, hierarchy, and component clarity.`,
  },
  insights: [
      `First 1–2 years rarely exhibit persistent problems—but timely reassurance matters.`,
      `Tele-health add-ons fill the “between-visits” gap.`,
      `Long sequences + unclear labels reduced motivation and completion.`,
  ],
  outcomes: [
      `Home & profile screens clarified purpose and next actions.`,
      `Milestones added structure and motivation.`,
      `Profile build felt lighter with compressed steps.`,
      `Results screens now guide action, not just report status.`,
      `Recommendations positioned the product to shift from MVP → MLP.`
  ],
  testimonial: {
      quote: `While not all elements of Rich’s redesign will be implemented in our MVP version, a number of key ideas will be. These will help take the MVP from ‘rational and functional’ to more of a minimum lovable product… greater appeal and engagement, without adding more functionality at this early stage.`,
      author: 'Amanda Falconer',
      company: 'Founder, Bestie Health Club'
  },
  reflection: {
    worked: `MVP-faithful redesign; milestone framing; clearer results.`,
    challenges: `Early test scripts varied; limited process coverage in the first round.`,
    next: `Broaden test scope; refine assessment cadence; explore light tele-vet hand-off patterns.`,
  }
};

const galleryImages = [
    { src: 'https://i.imgur.com/j6YBUah.png', alt: 'Project Canvas overview', hint: 'project canvas' },
    { src: 'https://i.imgur.com/GfUmirx.jpeg', alt: 'Competitor overview (tele-vet, AU)', hint: 'competitor analysis' },
    { src: 'https://i.imgur.com/1iAomdl.png', alt: 'Early UI sketches', hint: 'ui sketch' },
    { src: 'https://i.imgur.com/cHRuMG0.jpeg', alt: 'Figma prototype (blurred to protect IP)', hint: 'figma prototype' },
    { src: 'https://i.imgur.com/upW0RHX.jpeg', alt: 'Competitor analysis boards (blurred)', hint: 'miro board analysis' },
    { src: 'https://i.imgur.com/B0atzVi.png', alt: 'User persona #1 (blurred to protect IP)', hint: 'persona document' },
];

export default function BestieHealthClubProjectPage() {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleNext = useCallback(() => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
  }, []);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prevIndex) => (prevIndex - 1 + galleryImages.length) % galleryImages.length);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (!open) return;
        if (e.key === 'ArrowRight') handleNext();
        else if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, handleNext, handlePrev]);

  return (
    <CaseStudyLayout>
        <ProjectNavigation 
            prevProject={{slug: 'trip-approve-onboarding'}}
            nextProject={{slug: 'wellness-features-delivery-apps'}}
        />
       <header className="mb-12">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-strong mb-8">
            <Image
                src="https://i.imgur.com/ii2Rb5x.jpeg"
                alt="Hero image for Bestie Health Club discovery and MVP uplift."
                fill
                priority
                className="object-cover"
                data-ai-hint="pet health app hero"
            />
        </div>
        <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary dark:text-primary-foreground mb-2">
              Bestie Health Club — MVP discovery, user testing, and UI improvements
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              From minimum viable to minimum lovable for first-time dog owners
            </p>
            <p className="text-md text-muted-foreground mt-4 max-w-3xl mx-auto">
              A discovery-led engagement to understand early dog-owner needs, validate Bestie’s MVP, and uplift key journeys (onboarding, home, profile, assessment) without changing core flows—moving from MVP to Minimum Lovable Product.
            </p>
        </div>
      </header>
      
      <div className="grid lg:grid-cols-4 gap-12">
        <aside className="hidden lg:block lg:col-span-1">
          <LocalTOC />
        </aside>

        <main className="lg:col-span-2 space-y-12">
            <section id="brief">
                <h3 className="text-2xl font-bold font-headline mb-4">Project brief</h3>
                <p className="text-foreground/80">{projectContent.brief}</p>
            </section>
            
            <Separator />
            
            <section id="problem">
                <h3 className="text-2xl font-bold font-headline mb-4">The problem</h3>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    {projectContent.problem.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </section>
            
            <Separator />

             <section id="challenge">
                <h3 className="text-2xl font-bold font-headline mb-4">The design challenge</h3>
                <p className="text-foreground/80 italic">{projectContent.challenge}</p>
            </section>

            <Separator />

            <section id="solution">
                <h3 className="text-2xl font-bold font-headline mb-4">The solution (overview)</h3>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                   {projectContent.solution.map((item, i) => 
                     <li key={i} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                   )}
                </ul>
                <p className="mt-4 text-sm text-muted-foreground">{projectContent.solutionNote}</p>
            </section>

            <Separator />

            <section id="approach">
                <h3 className="text-2xl font-bold font-headline mb-4">Process</h3>
                 <p className="text-foreground/80 mb-4">Discovery → Synthesis → Prototyping & Tests (Double Diamond)</p>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-bold font-headline text-lg">Discovery</h4>
                        <p className="text-foreground/80">{projectContent.approach.discovery}</p>
                    </div>
                    <div>
                        <h4 className="font-bold font-headline text-lg">Synthesis</h4>
                        <p className="text-foreground/80">{projectContent.approach.synthesis}</p>
                    </div>
                    <div>
                        <h4 className="font-bold font-headline text-lg">Prototyping & tests</h4>
                        <p className="text-foreground/80">{projectContent.approach.prototyping}</p>
                    </div>
                </div>
            </section>

            <Separator />

            <section id="insights">
                <h3 className="text-2xl font-bold font-headline mb-4">Key insights</h3>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    {projectContent.insights.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </section>

            <Separator />

            <section id="outcomes">
                <h3 className="text-2xl font-bold font-headline mb-4">Outcomes</h3>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    {projectContent.outcomes.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </section>

            <Separator />

            <section id="feedback">
                <h3 className="text-2xl font-bold font-headline mb-4">Client feedback</h3>
                <Testimonial {...projectContent.testimonial} />
            </section>
            
            <Separator />

            <section id="reflection">
                <h3 className="text-2xl font-bold font-headline mb-4">Reflection & next steps</h3>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    <li><strong className="font-semibold">What worked:</strong> {projectContent.reflection.worked}</li>
                    <li><strong className="font-semibold">Challenges:</strong> {projectContent.reflection.challenges}</li>
                    <li><strong className="font-semibold">Next:</strong> {projectContent.reflection.next}</li>
                </ul>
            </section>
        </main>
        
        <aside className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Quick facts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                <div>
                    <h4 className="font-semibold mb-1">Role</h4>
                    <p className="text-muted-foreground">UX/UI Designer (Discovery, Testing, UI uplift)</p>
                </div>
                <Separator />
                <div>
                    <h4 className="font-semibold mb-1">Team</h4>
                    <p className="text-muted-foreground">Amanda Falconer (Founder), Jonathan Milgate (Dev), Jordan Boswood (Dev), Rich Bartlett (UX/UI)</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Tools</h4>
                     <p className="text-muted-foreground">Canva, Zoom, Trello, Slack, Google Suite, Otter.ai, Figma</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Timeline</h4>
                     <p className="text-muted-foreground">Discovery (30 Mar–11 Apr 2021) • Testing (18–23 May 2021) • UI uplift (24–28 May 2021)</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Audience</h4>
                     <p className="text-muted-foreground">First-time dog owners in Australia</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Methods</h4>
                     <p className="text-muted-foreground">8 interviews • 41-response survey • AU tele-vet competitive analysis (4)</p>
                </div>
            </CardContent>
          </Card>
        </aside>
      </div>

       <section id="gallery" className="mt-16">
            <h3 className="text-3xl font-bold font-headline mb-6 text-center">Gallery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryImages.map((img, index) => (
                <div key={index} className="group relative cursor-pointer aspect-video rounded-md overflow-hidden shadow-medium transition-transform hover:scale-105"
                     onClick={() => { setSelectedIndex(index); setOpen(true); }}>
                  <Image 
                    src={img.src} 
                    alt={img.alt} 
                    fill 
                    className="object-cover"
                    data-ai-hint={img.hint}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                     <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-center text-sm">{img.alt}</p>
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
                  <Button variant="ghost" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 hover:bg-black/75 text-white" onClick={handlePrev}>
                      <ArrowLeft className="h-6 w-6" />
                  </Button>
                  <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 hover:bg-black/75 text-white" onClick={handleNext}>
                      <ArrowRight className="h-6 w-6" />
                  </Button>
              </DialogContent>
            </Dialog>
      </section>

      <Card className="mt-24 text-center p-8 md:p-12">
        <h3 className="text-2xl font-bold font-headline mb-2">Want help moving from MVP to minimum lovable?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Happy to walk through discovery artefacts, test plans, and the implementation-ready UI kit.</p>
        <Button asChild>
            <Link href="/contact">Contact me</Link>
        </Button>
      </Card>
      <ScrollToTopButton />
    </CaseStudyLayout>
  );
}
