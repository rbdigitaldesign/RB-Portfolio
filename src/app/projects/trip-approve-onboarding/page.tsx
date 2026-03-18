
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
import { CaseStudyLayout } from '@/components/case-study-layout';
import { CaseStudyTOC } from '@/components/case-study-toc';
import { CaseStudyHeader } from '@/components/case-study-header';

const projectContent = {
    brief: `Engineer an onboarding experience that SMEs can self-serve, while allowing a more manual, assisted path for larger organisations managed by tripapprove. focus on managers and employees for this iteration.`,
    problem: [
        `Existing flow involved long sequences, unclear redirections after email verification, and low-impact ui copy.`,
        `Early configuration screens felt overwhelming (settings/terms too soon).`,
        `Approval rights and high-risk flows needed clearer guidance.`,
    ],
    objectives: [
        `Primary: easy self-service onboarding for an SME office manager.`,
        `Secondary: straightforward assisted onboarding for large organisations (tripapprove-managed).`
    ],
    solution: [
        `**Two clear paths** — SME self-service vs enterprise assisted (request demo / guided setup).`,
        `**Checklist-led onboarding** — manager & employee checklists with direct navigation (skip "pointer overlays"; send users straight to the target screen).`,
        `**Faster first-run** — minimal initial fields (name + email / SSO); defer non-critical details.`,
        `**Data import options** — csv template upload and "connect system" placeholder for future integrations.`,
        `**Copy & email polish** — branded verification email; redirect back after verify; clearer CTA text.`,
        `**UI clarity** — larger inputs/buttons; readable left-panel content; progress indicators.`,
    ],
    approach: {
        research: `6 interviews; 55 survey responses; 5-competitor review (sign-up, trials, ui copy, guidance). key needs: time-efficient onboarding, simple language, SSO, basic-first data entry, on-screen guidance.`,
        synthesis: `Affinity maps, empathy maps, personas (manager/employee), 'how might we' prompts (make set-up easy, intuitive, skippable).`,
        prototyping: `Sketches → mid-fi → hi-fi in figma; moderated/unmoderated tests (useberry); iterated checklist behaviour, label clarity, and page copy.`,
    },
    managerFlow: [
        `Sign up/sign in (3 screens) with benefits panel`,
        `Checklist appears → add business units → add users & invites (manual or csv) → approval rights → high-risk rights → done`,
        `Direct navigation from checklist to target page (no hamburger detour)`,
    ],
    employeeFlow: [
        `Sign up/sign in (3 screens); choose "set up an account"`,
        `Checklist: profile, additional travellers, travel preferences (flight, accommodation, vehicle) → done`,
    ],
    outcomes: [
        `Clearer sign-up with redirect after verification; improved email copy.`,
        `Reduced perceived effort via minimal initial fields and checklist guidance.`,
        `CSV upload path defined for managers; preferences retained for delegated bookings.`,
        `Improved readability on landing/left panels; simplified access-rights steps.`,
    ],
    feedback: `Early feedback welcomed the quick set-up, checklist approach, and clarified preferences for delegated bookings. Approval-rights and certain fields were flagged for refinement and were iterated accordingly.`,
    accessibility: [
        `WCAG 2.0 AA considerations (perceivable, operable, understandable, robust).`,
        `Retained tripapprove's steel blue primary; added complementary palette; consistent iconography.`,
        `Larger tap targets, visible focus, and clear headings in sentence case.`,
    ],
    reflection: {
        worked: `Checklist-led flow; defer-non-critical; csv/SSO expectations captured.`,
        challenges: `Long sequences; early tests showed users disliking overlay-guided navigation.`,
        next: `Unify approval-rights ux; refine info architecture; finalise email templates; expand enterprise assisted path details.`,
    },
    fullResearch: `The extended write-up covers survey highlights (e.g., 66% basic-first fields, 64% want on-screen guidance, 30-day trial expectation), interview themes (time efficiency, understandability), competitor notes (some demo-only), and testing lessons (readability of left panel; checklist should take me there, not just point).`,
};

const galleryImages = [
    { src: 'https://placehold.co/1200x800.png', alt: 'Before: old email verification screen', hint: 'app screen before' },
    { src: 'https://placehold.co/1200x800.png', alt: 'After: new verification with clear redirect', hint: 'app screen after' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Manager checklist with direct links to set-up tasks', hint: 'app screen manager' },
    { src: 'https://placehold.co/1200x800.png', alt: 'CSV upload option for bulk user import', hint: 'app screen csv' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Simplified approval rights assignment screen', hint: 'app screen rights' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Employee onboarding checklist', hint: 'app screen employee' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Employee travel preferences screen', hint: 'app screen preferences' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Information architecture overview diagram', hint: 'diagram ia' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Mid-fidelity wireframe of manager flow', hint: 'wireframe manager' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Mid-fidelity wireframe of employee flow', hint: 'wireframe employee' },
];

function calculateReadingTime(text: string) {
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
}

export default function TripApproveProjectPage() {
  const allText = Object.values(projectContent).flat().join(' ');
  const readingTime = calculateReadingTime(allText);
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
      <CaseStudyHeader slug="trip-approve-onboarding" />
        <ProjectNavigation 
            prevProject={{slug: 'wellness-features-delivery-apps'}}
            nextProject={{slug: 'bestie-health-club'}}
        />
       <header className="mb-12">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-strong mb-8">
            <Image
                src="https://placehold.co/1200x675.png"
                alt="Onboarding screens showing checklist, csv upload, and access rights"
                fill
                priority
                className="object-cover"
                data-ai-hint="b2b saas onboarding"
            />
        </div>
        <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary dark:text-primary-foreground mb-2">
              Trip Approve — designing a smooth user onboarding experience
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Self-service for SMEs, guided setup for enterprise
            </p>
            <p className="text-sm text-muted-foreground mt-2">Estimated reading time: {readingTime} minutes</p>
        </div>
      </header>
      
      <div className="grid lg:grid-cols-4 gap-12">
        <aside className="hidden lg:block lg:col-span-1">
          <CaseStudyTOC items={[
            { href: '#brief', label: 'Project brief' },
            { href: '#problem', label: 'The problem' },
            { href: '#objectives', label: 'Objectives' },
            { href: '#solution', label: 'The solution' },
            { href: '#approach', label: 'Design approach' },
            { href: '#manager-flow', label: 'Manager flow' },
            { href: '#employee-flow', label: 'Employee flow' },
            { href: '#outcomes', label: 'Outcomes' },
            { href: '#feedback', label: 'Client feedback' },
            { href: '#accessibility', label: 'Accessibility & style' },
            { href: '#reflection', label: 'Reflection & next steps' },
            { href: '#prototypes', label: 'Interactive prototypes' },
          ]} />
        </aside>

        <main className="lg:col-span-2 space-y-12">
            <section id="brief">
                <h3 className="cs-h2">Project brief</h3>
                <div className="cs-callout"><p className="text-foreground/80">{projectContent.brief}</p></div>
            </section>
            <section id="problem" className="cs-section">
                <h3 className="cs-h2">The problem</h3>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    {projectContent.problem.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </section>
            <section id="objectives" className="cs-section">
                <h3 className="cs-h2">Objectives</h3>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    {projectContent.objectives.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </section>
            <section id="solution" className="cs-section">
                <h3 className="cs-h2">The solution</h3>
                <ol className="list-decimal list-outside space-y-2 pl-5 text-foreground/80">
                   {projectContent.solution.map((item, i) => 
                     <li key={i} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                   )}
                </ol>
            </section>
            <section id="approach" className="cs-section">
                <h3 className="cs-h2">Design approach</h3>
                <div className="space-y-4">
                    <div>
                        <h4 className="cs-h3">Research</h4>
                        <p className="text-foreground/80">{projectContent.approach.research}</p>
                    </div>
                    <div>
                        <h4 className="cs-h3">Synthesis</h4>
                        <p className="text-foreground/80">{projectContent.approach.synthesis}</p>
                    </div>
                    <div>
                        <h4 className="cs-h3">Prototyping & tests</h4>
                        <p className="text-foreground/80">{projectContent.approach.prototyping}</p>
                    </div>
                </div>
            </section>
            <section id="manager-flow" className="cs-section">
                <h3 className="cs-h2">Manager flow (summary)</h3>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    {projectContent.managerFlow.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </section>
            <section id="employee-flow" className="cs-section">
                <h3 className="cs-h2">Employee flow (summary)</h3>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    {projectContent.employeeFlow.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </section>
            <section id="outcomes" className="cs-section">
                <h3 className="cs-h2">Outcomes</h3>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    {projectContent.outcomes.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </section>
            <section id="feedback" className="cs-section">
                <h3 className="cs-h2">Client feedback</h3>
                <blockquote className="border-l-2 pl-6 italic text-foreground/80">
                    "{projectContent.feedback}"
                </blockquote>
            </section>
            <section id="accessibility" className="cs-section">
                <h3 className="cs-h2">Accessibility & style</h3>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    {projectContent.accessibility.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </section>
            <section id="reflection" className="cs-section">
                <h3 className="cs-h2">Reflection & next steps</h3>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    <li><strong className="font-semibold">What worked:</strong> {projectContent.reflection.worked}</li>
                    <li><strong className="font-semibold">Challenges:</strong> {projectContent.reflection.challenges}</li>
                    <li><strong className="font-semibold">Next:</strong> {projectContent.reflection.next}</li>
                </ul>
            </section>
            <section id="prototypes" className="cs-section">
                 <h3 className="cs-h2">Interactive prototypes</h3>
                 <div className="flex flex-col sm:flex-row gap-4 items-start">
                    <Button asChild>
                        <a href="#" target="_blank" rel="noopener noreferrer">View Manager Flow Prototype <ExternalLink className="ml-2 h-4 w-4" /></a>
                    </Button>
                     <Button asChild>
                        <a href="#" target="_blank" rel="noopener noreferrer">View Employee Flow Prototype <ExternalLink className="ml-2 h-4 w-4" /></a>
                    </Button>
                 </div>
                 <Accordion type="single" collapsible className="w-full border-none mt-4">
                    <AccordionItem value="item-1" className="border-b-0">
                    <AccordionTrigger className="p-0 hover:no-underline text-sm font-medium text-primary hover:underline underline-offset-4">Read full research details</AccordionTrigger>
                    <AccordionContent className="pt-4 text-foreground/80">
                        {projectContent.fullResearch}
                    </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </section>
        </main>
        
        <aside className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Quick facts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                <div>
                    <h4 className="font-semibold mb-1">Client/Brief</h4>
                    <p className="text-muted-foreground">TripApprove — smooth onboarding for hiring managers and employees</p>
                </div>
                <Separator />
                <div>
                    <h4 className="font-semibold mb-1">Stakeholders</h4>
                    <p className="text-muted-foreground">Maria Borsaru, Duy Trinh</p>
                </div>
                 <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Team</h4>
                    <p className="text-muted-foreground">Belinda Ha, Wendy Chen, Leonardo Montealegre, Yvonne (Feeney) Hill, Rich Bartlett</p>
                </div>
                <Separator />
                <div>
                    <h4 className="font-semibold mb-1">Role</h4>
                    <p className="text-muted-foreground">UX Researcher, UI Designer, Collaborative Presenter</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Tools</h4>
                     <p className="text-muted-foreground">Figma, Miro, Canva, Useberry, Zoom, Trello, Slack, Google Suite</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Timeline</h4>
                     <p className="text-muted-foreground">19 April – 27 May 2021 (6 weeks)</p>
                </div>
                <Separator />
                <div>
                    <h4 className="font-semibold mb-1">Process</h4>
                     <p className="text-muted-foreground">Double Diamond; Convergent/Divergent; Agile; Multiple Iterations</p>
                </div>
            </CardContent>
          </Card>
        </aside>
      </div>

       <section id="gallery" className="mt-16">
            <h3 className="cs-h2 text-center">Gallery</h3>
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
        <h3 className="cs-h2">Want to streamline B2B onboarding?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">I can walk through the research artefacts, test scripts, and the implementation-ready ui patterns for SME vs enterprise.</p>
        <Button asChild>
            <Link href="/contact">Contact me</Link>
        </Button>
      </Card>
      <ScrollToTopButton />
    </CaseStudyLayout>
  );
}
