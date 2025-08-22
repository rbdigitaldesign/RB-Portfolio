
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ExternalLink, Quote } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollToTopButton } from '@/components/scroll-to-top-button';
import { ProjectNavigation } from '@/components/project-navigation';

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
      <li><a href="#objectives" className="hover:text-primary">Objectives</a></li>
      <li><a href="#solution" className="hover:text-primary">The solution</a></li>
      <li><a href="#approach" className="hover:text-primary">Design approach</a></li>
      <li><a href="#manager-flow" className="hover:text-primary">Manager flow</a></li>
      <li><a href="#employee-flow" className="hover:text-primary">Employee flow</a></li>
      <li><a href="#outcomes" className="hover:text-primary">Outcomes</a></li>
      <li><a href="#feedback" className="hover:text-primary">Client feedback</a></li>
      <li><a href="#accessibility" className="hover:text-primary">Accessibility & style</a></li>
      <li><a href="#reflection" className="hover:text-primary">Reflection & next steps</a></li>
      <li><a href="#prototypes" className="hover:text-primary">Interactive prototypes</a></li>
    </ul>
  </nav>
);

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
        `**Checklist-led onboarding** — manager & employee checklists with direct navigation (skip “pointer overlays”; send users straight to the target screen).`,
        `**Faster first-run** — minimal initial fields (name + email / SSO); defer non-critical details.`,
        `**Data import options** — csv template upload and “connect system” placeholder for future integrations.`,
        `**Copy & email polish** — branded verification email; redirect back after verify; clearer CTA text.`,
        `**UI clarity** — larger inputs/buttons; readable left-panel content; progress indicators.`,
    ],
    approach: {
        research: `6 interviews; 55 survey responses; 5-competitor review (sign-up, trials, ui copy, guidance). key needs: time-efficient onboarding, simple language, SSO, basic-first data entry, on-screen guidance.`,
        synthesis: `Affinity maps, empathy maps, personas (manager/employee), ‘how might we’ prompts (make set-up easy, intuitive, skippable).`,
        prototyping: `Sketches → mid-fi → hi-fi in figma; moderated/unmoderated tests (useberry); iterated checklist behaviour, label clarity, and page copy.`,
    },
    managerFlow: [
        `Sign up/sign in (3 screens) with benefits panel`,
        `Checklist appears → add business units → add users & invites (manual or csv) → approval rights → high-risk rights → done`,
        `Direct navigation from checklist to target page (no hamburger detour)`,
    ],
    employeeFlow: [
        `Sign up/sign in (3 screens); choose “set up an account”`,
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
        `Retained tripapprove’s steel blue primary; added complementary palette; consistent iconography.`,
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
    { src: 'https://placehold.co/1200x800.png', alt: 'Before: old email verification screen', hint: 'app screen before', value: 'Before: old email verification screen' },
    { src: 'https://placehold.co/1200x800.png', alt: 'After: new verification with clear redirect', hint: 'app screen after', value: 'After: new verification with clear redirect' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Manager checklist with direct links to set-up tasks', hint: 'app screen manager', value: 'Manager checklist with direct links to set-up tasks' },
    { src: 'https://placehold.co/1200x800.png', alt: 'CSV upload option for bulk user import', hint: 'app screen csv', value: 'CSV upload option for bulk user import' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Simplified approval rights assignment screen', hint: 'app screen rights', value: 'Simplified approval rights assignment screen' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Employee onboarding checklist', hint: 'app screen employee', value: 'Employee onboarding checklist' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Employee travel preferences screen', hint: 'app screen preferences', value: 'Employee travel preferences screen' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Information architecture overview diagram', hint: 'diagram ia', value: 'Information architecture overview diagram' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Mid-fidelity wireframe of manager flow', hint: 'wireframe manager', value: 'Mid-fidelity wireframe of manager flow' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Mid-fidelity wireframe of employee flow', hint: 'wireframe employee', value: 'Mid-fidelity wireframe of employee flow' },
];

function calculateReadingTime(text: string) {
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
}

export default function TripApproveProjectPage() {
  const allText = Object.values(projectContent).flat().join(' ');
  const readingTime = calculateReadingTime(allText);

  return (
    <CaseStudyLayout>
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

            <section id="objectives">
                <h3 className="text-2xl font-bold font-headline mb-4">Objectives</h3>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    {projectContent.objectives.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </section>

            <Separator />

            <section id="solution">
                <h3 className="text-2xl font-bold font-headline mb-4">The solution</h3>
                <ol className="list-decimal list-outside space-y-2 pl-5 text-foreground/80">
                   {projectContent.solution.map((item, i) => 
                     <li key={i} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                   )}
                </ol>
            </section>

            <Separator />

            <section id="approach">
                <h3 className="text-2xl font-bold font-headline mb-4">Design approach</h3>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-bold font-headline text-lg">Research</h4>
                        <p className="text-foreground/80">{projectContent.approach.research}</p>
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

            <section id="manager-flow">
                <h3 className="text-2xl font-bold font-headline mb-4">Manager flow (summary)</h3>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    {projectContent.managerFlow.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </section>

            <Separator />

            <section id="employee-flow">
                <h3 className="text-2xl font-bold font-headline mb-4">Employee flow (summary)</h3>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    {projectContent.employeeFlow.map((item, i) => <li key={i}>{item}</li>)}
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
                <blockquote className="border-l-2 pl-6 italic text-foreground/80">
                    “{projectContent.feedback}”
                </blockquote>
            </section>

            <Separator />
            
            <section id="accessibility">
                <h3 className="text-2xl font-bold font-headline mb-4">Accessibility & style</h3>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    {projectContent.accessibility.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
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
            
            <Separator />

            <section id="prototypes">
                 <h3 className="text-2xl font-bold font-headline mb-4">Interactive prototypes</h3>
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
            <h3 className="text-3xl font-bold font-headline mb-6 text-center">Gallery (Before & After)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryImages.map((img, index) => (
                <div key={index} className="group relative aspect-video rounded-md overflow-hidden shadow-medium transition-transform hover:scale-105">
                  <Image 
                    src={img.src} 
                    alt={img.alt} 
                    fill 
                    className="object-cover"
                    data-ai-hint={img.hint}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                     <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-center text-sm">{img.value}</p>
                    </div>
                </div>
              ))}
            </div>
      </section>

      <Card className="mt-24 text-center p-8 md:p-12">
        <h3 className="text-2xl font-bold font-headline mb-2">Want to streamline B2B onboarding?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">I can walk through the research artefacts, test scripts, and the implementation-ready ui patterns for SME vs enterprise.</p>
        <Button asChild>
            <Link href="/contact">Contact me</Link>
        </Button>
      </Card>
      <ScrollToTopButton />
    </CaseStudyLayout>
  );
}
