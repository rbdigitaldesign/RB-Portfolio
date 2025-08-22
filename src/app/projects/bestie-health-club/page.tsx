
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
      <li><a href="#challenge" className="hover:text-primary">The design challenge</a></li>
      <li><a href="#solution" className="hover:text-primary">The solution</a></li>
      <li><a href="#approach" className="hover:text-primary">Design approach</a></li>
      <li><a href="#insights" className="hover:text-primary">Key insights</a></li>
      <li><a href="#outcomes" className="hover:text-primary">Outcomes</a></li>
      <li><a href="#feedback" className="hover:text-primary">Client feedback</a></li>
      <li><a href="#reflection" className="hover:text-primary">Reflection & next steps</a></li>
      <li><a href="#prototype" className="hover:text-primary">Interactive prototype</a></li>
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
  brief: `Discover needs, pains, and gains for first-time dog owners; validate the MVP; recommend UX/UI improvements without changing core flows.`,
  problem: [
    `The web MVP existed, but key ideas needed evidence before build.`,
    `Unclear UI in onboarding/home/profile; health assessment flow felt long.`,
    `Owners see vets every 6–12 months; supplementary telehealth could fill gaps.`,
  ],
  challenge: `What needs, pains, and gains do dog owners have—especially in the first two years— and how should the app evolve to support them?`,
  solution: [
    `**Clarified value and flows** in sign-up/login and home CTAs`,
    `**Engagement milestones** to recognise progress and prompt care`,
    `**Faster profile build** with compressed steps and progress feedback`,
    `**Assessment results overhaul** with clearer meaning and next actions`,
  ],
  solutionNote: `*Designs adhered to existing MVP structure for feasibility.*`,
  approach: {
    discovery: `Qualitative interviews (5+ owners, varied backgrounds), quantitative survey on habits and pet health, competitive review of Australian tele-vet providers.`,
    synthesis: `Affinity mapping, personas, and opportunity areas (triage, forgotten questions, behaviour tips).`,
    prototyping: `Replicated the MVP in Figma; defined clearer test scripts; ran short usability sessions to validate UI changes; iterated on language and component clarity.`,
  },
  insights: [
      `First 1–2 years rarely show overwhelming issues, but timely guidance is valued.`,
      `Owners want reassurance between vet visits; telehealth and concise tips support this.`,
      `Unclear labelling and long sequences reduced completion motivation.`,
  ],
  outcomes: [
      `Redesigned home and profile screens improved clarity and calls to action.`,
      `Milestones added structure and motivation for care routines.`,
      `Compressed profile build reduced perceived effort.`,
      `Results screens now highlight “what this means” and “what to do next”.`,
  ],
  testimonial: {
      quote: `While not all elements of Rich’s redesign will be implemented in our MVP version, a number of key ideas will be. These will help take the MVP from ‘rational and functional’ to more of a minimum lovable product… greater appeal and engagement, without adding more functionality at this early stage.`,
      author: 'Amanda Falconer',
      company: 'Founder, Bestie Health Club'
  },
  reflection: {
    worked: `MVP-faithful redesign; milestone framing; streamlined results.`,
    challenges: `Early tests varied in scripts; some processes initially under-tested.`,
    next: `Broaden test scope; refine health assessment cadence; consider light tele-vet handoff patterns.`,
  },
  fullResearch: `The extended write-up covers the interview plan and screener; survey highlights; competitor SWOT (AU tele-vet); persona summary; testing protocol changes (think-aloud, scope expansion); constraints (adhere to existing flows); and IP protection (blurred artefacts).`
};

const galleryImages = [
    { src: 'https://placehold.co/1200x800.png', alt: 'Before: Original homepage design', hint: 'app screen before', value: 'Before: Original homepage design with unclear calls to action.' },
    { src: 'https://placehold.co/1200x800.png', alt: 'After: Redesigned homepage with clear CTAs', hint: 'app screen after', value: 'After: Redesigned homepage with clearer primary actions and navigation.' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Before: Original profile creation flow', hint: 'app screen before', value: 'Before: Multi-step profile creation that felt lengthy.' },
    { src: 'https://placehold.co/1200x800.png', alt: 'After: Condensed profile build with clearer steps', hint: 'app screen after', value: 'After: A condensed profile builder with improved progress feedback.' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Milestone tracking feature UI', hint: 'app screen feature', value: 'Milestone markers to recognise progress and prompt proactive pet care.' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Redesigned health assessment results screen', hint: 'app screen results', value: 'Overhauled assessment results with simpler summaries and clear next actions.' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Comparison of user flows before and after redesign', hint: 'user flow diagram', value: 'Visual comparison of user flows, highlighting streamlined pathways.' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Summary of the primary user persona', hint: 'persona document', value: 'A summary of the primary user persona for first-time dog owners.' },
];

function calculateReadingTime(text: string) {
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
}

export default function BestieHealthClubProjectPage() {
  const allText = Object.values(projectContent).flat().join(' ');
  const readingTime = calculateReadingTime(allText);

  return (
    <CaseStudyLayout>
        <ProjectNavigation 
            prevProject={{slug: 'trip-approve-onboarding'}}
            nextProject={{slug: 'wellness-features-delivery-apps'}}
        />
       <header className="mb-12">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-strong mb-8">
            <Image
                src="https://placehold.co/1200x675.png"
                alt="Screens from a pet health web app showing onboarding, milestones, and assessment"
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

             <section id="challenge">
                <h3 className="text-2xl font-bold font-headline mb-4">The design challenge</h3>
                <p className="text-foreground/80 italic">“{projectContent.challenge}”</p>
            </section>

            <Separator />

            <section id="solution">
                <h3 className="text-2xl font-bold font-headline mb-4">The solution</h3>
                <ol className="list-decimal list-outside space-y-2 pl-5 text-foreground/80">
                   {projectContent.solution.map((item, i) => 
                     <li key={i} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                   )}
                </ol>
                <p className="mt-4 text-sm text-muted-foreground">{projectContent.solutionNote}</p>
            </section>

            <Separator />

            <section id="approach">
                <h3 className="text-2xl font-bold font-headline mb-4">Design approach</h3>
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
            
            <Separator />

            <section id="prototype">
                 <h3 className="text-2xl font-bold font-headline mb-4">Interactive prototype</h3>
                 <p className="text-foreground/80 mb-4">Try the clickable flows.</p>
                 <div className="flex flex-wrap gap-4 items-center">
                    <Button asChild>
                        <a href="#" target="_blank" rel="noopener noreferrer">View Prototype <ExternalLink className="ml-2 h-4 w-4" /></a>
                    </Button>
                    <Button variant="link" asChild>
                        <a href="#gallery">See UI before/after</a>
                    </Button>
                    <Accordion type="single" collapsible className="w-full border-none">
                      <AccordionItem value="item-1" className="border-b-0">
                        <AccordionTrigger className="p-0 hover:no-underline text-sm font-medium text-primary hover:underline underline-offset-4">Read full research details</AccordionTrigger>
                        <AccordionContent className="pt-4 text-foreground/80">
                           {projectContent.fullResearch}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                 </div>
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
                    <p className="text-muted-foreground">Bestie Health Club — define owner needs, test MVP, refine UX/UI</p>
                </div>
                <Separator />
                <div>
                    <h4 className="font-semibold mb-1">Team</h4>
                    <p className="text-muted-foreground">Amanda Falconer (Founder), Jonathan Milgate (Dev), Jordan Boswood (Dev), Rich Bartlett (UX/UI)</p>
                </div>
                 <Separator />
                <div>
                    <h4 className="font-semibold mb-1">Role</h4>
                    <p className="text-muted-foreground">UX/UI Designer (Discovery, Testing, UI Uplift)</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Tools</h4>
                     <p className="text-muted-foreground">Canva, Zoom, Trello, Slack, Google Suite, Otter.ai</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Timeline</h4>
                     <p className="text-muted-foreground">Discovery 30 Mar → 11 Apr 2021, Testing 18–23 May 2021, UI Uplift 24–28 May 2021</p>
                </div>
                 <Separator />
                <div>
                    <h4 className="font-semibold mb-1">Audience</h4>
                     <p className="text-muted-foreground">First-time dog owners in Australia</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Methods</h4>
                     <p className="text-muted-foreground">5+ qualitative interviews, quantitative survey, competitive analysis (AU tele-vet)</p>
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

      <Card className="mt-24 text-center p-8 md:p-12 bg-muted/50">
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
