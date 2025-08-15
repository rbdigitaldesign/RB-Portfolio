
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import type { Project } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ExternalLink } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// This would ideally be in a separate layout component
const CaseStudyLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="container mx-auto max-w-6xl py-16 px-4">{children}</div>;
};

// This would ideally be in a separate file, but for this request it's here.
// In a real app, this would need more work to be truly dynamic.
const LocalTOC = () => (
  <nav className="sticky top-24">
    <h4 className="font-semibold mb-2 font-headline">On this page</h4>
    <ul className="space-y-2 text-sm text-muted-foreground">
      <li><a href="#brief" className="hover:text-primary">Project brief</a></li>
      <li><a href="#problem" className="hover:text-primary">The problem</a></li>
      <li><a href="#opportunity" className="hover:text-primary">The opportunity</a></li>
      <li><a href="#solution" className="hover:text-primary">The solution</a></li>
      <li><a href="#approach" className="hover:text-primary">Design approach</a></li>
      <li><a href="#outcomes" className="hover:text-primary">Outcomes & insight</a></li>
      <li><a href="#reflection" className="hover:text-primary">Reflection & next steps</a></li>
      <li><a href="#prototype" className="hover:text-primary">Interactive prototype</a></li>
    </ul>
  </nav>
);

const projectContent = {
  brief: `Humanitech asked us to explore how technology might empower urban communities to cope with climate impacts. We focused on delivery riders and heat-stress, aiming to augment existing rider apps with wellbeing features that are practical during shifts.`,
  problem: [
    `Australia’s heatwaves are the deadliest natural hazard; urban heat is rising.`,
    `Delivery riders work outdoors, often prioritising income over self-care during peaks.`,
    `Current apps lack contextual wellness support (water/shade access, quick guidance, inclusive language).`,
  ],
  opportunity: `Rather than invent a new platform, embed wellness features inside the rider apps they already use—meeting riders where they are, with low-friction prompts and benefits that make staying safe a rational choice during heat events.`,
  solution: [
    `**Map markers for heat safety** — nearby water, shade, sunscreen points, visible on the job.`,
    `**Lightweight daily check-ins** — riders log how they feel and earn credits redeemable at participating vendors (BP, 7-Eleven, cafés).`,
    `**Multilingual onboarding** — language options at first run to support migrant workers.`,
    `**Clearer concepts & icons** — rename “climate credits” to “credits”; update credit icon to coin stack; simplify legend usage.`,
  ],
  solutionNote: `*Note: emergency contacts were removed after testing showed low likelihood of use.*`,
  approach: {
    research: `Guerrilla and scheduled interviews with 14 riders; stakeholder touchpoints with Humanitech; desk research into urban heat.`,
    synthesis: `Affinity mapping; personas (primary/secondary); journey maps; problem-scale framing to reconcile rider vs platform vs charity priorities.`,
    prototyping: `Crazy-8s with the client; grayscale mid-fi in Figma; iterative usability tests (moderated & unmoderated via Useberry); refined to hi-fi.`,
  },
  outcomes: [
    `**66%** reported negative effects from heat while delivering; **81%** said in-app health info could improve wellness; **78%** believed platforms could do more.`,
    `Post-iteration tests showed improved comprehension of the rider wellness screen and credits; simplified flows reduced confusion.`,
    `The approach is cross-sector friendly (platforms + retailers + charities) and fits existing rider behaviour.`,
  ],
  reflection: {
    worked: `Augmenting existing apps; on-shift cues (map markers, check-ins); multilingual setup.`,
    challenges: `Early testing inconsistencies (varied scripts/metrics); educating users on new features.`,
    next: `Animate weather on wellness screen; refine credit redemption flow (QR & vendor UX); explore wearables (Fitbit/Apple Watch).`,
  },
  fullResearch: `The extended write-up covers: the heat context; pivot from dengue to riders; recruitment tactics; interview guide design; key insights (hydration, shade, motivation, platform duty of care); MVP matrix; user flows; icon ideation; client feedback and iterations (language, credits rename, legend changes); and testing notes and limitations.`
};

const galleryImages = [
    { src: 'https://placehold.co/1200x800.png', alt: 'mid-fi wireframe of the main wellness screen', hint: 'wireframe screen', value: 'Map markers showing nearest water and shade to reduce heat exposure during shifts' },
    { src: 'https://placehold.co/1200x800.png', alt: 'mid-fi wireframe of the check-in flow', hint: 'wireframe flow', value: 'Map markers showing nearest water and shade to reduce heat exposure during shifts' },
    { src: 'https://placehold.co/1200x800.png', alt: 'hi-fi map screen showing water and shade markers', hint: 'app screen map', value: 'Map markers showing nearest water and shade to reduce heat exposure during shifts' },
    { src: 'https://placehold.co/1200x800.png', alt: 'hi-fi check-in screen with mood selectors', hint: 'app screen check-in', value: 'Map markers showing nearest water and shade to reduce heat exposure during shifts' },
    { src: 'https://placehold.co/1200x800.png', alt: 'credits screen showing balance and redemption options', hint: 'app screen credits', value: 'Map markers showing nearest water and shade to reduce heat exposure during shifts' },
    { src: 'https://placehold.co/1200x800.png', alt: 'language selection screen during onboarding', hint: 'app screen language', value: 'Map markers showing nearest water and shade to reduce heat exposure during shifts' },
    { src: 'https://placehold.co/1200x800.png', alt: 'hi-fi prototype screen for the main dashboard', hint: 'app screen dashboard', value: 'Map markers showing nearest water and shade to reduce heat exposure during shifts' },
    { src: 'https://placehold.co/1200x800.png', alt: 'hi-fi prototype screen showing weather alerts', hint: 'app screen alert', value: 'Map markers showing nearest water and shade to reduce heat exposure during shifts' },
    { src: 'https://placehold.co/1200x800.png', alt: 'diagram of the user flow for checking in and earning credits', hint: 'user flow diagram', value: 'Map markers showing nearest water and shade to reduce heat exposure during shifts' },
    { src: 'https://placehold.co/1200x800.png', alt: 'storyboard illustrating a rider using the wellness features', hint: 'storyboard illustration', value: 'Map markers showing nearest water and shade to reduce heat exposure during shifts' },
]

// Estimated reading time
function calculateReadingTime(text: string) {
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
}

export default function WellnessProjectPage() {
  const allText = Object.values(projectContent).flat().join(' ');
  const readingTime = calculateReadingTime(allText);

  return (
    <CaseStudyLayout>
       <header className="mb-12">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-strong mb-8">
            <Image
                src="https://placehold.co/1200x675.png"
                alt="Delivery rider app screens showing water points, shade markers, and credits"
                fill
                priority
                className="object-cover"
                data-ai-hint="delivery app hero"
            />
        </div>
        <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary dark:text-primary-foreground mb-2">
              Wellness features in food delivery apps — heat-safe riding in a warming city
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              A humanitarian brief: wellbeing by design for delivery riders
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

            <section id="opportunity">
                <h3 className="text-2xl font-bold font-headline mb-4">The opportunity</h3>
                <p className="text-foreground/80">{projectContent.opportunity}</p>
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

            <section id="outcomes">
                <h3 className="text-2xl font-bold font-headline mb-4">Outcomes & insight</h3>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    {projectContent.outcomes.map((item, i) => 
                        <li key={i} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    )}
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

            <section id="prototype">
                 <h3 className="text-2xl font-bold font-headline mb-4">Interactive prototype</h3>
                 <p className="text-foreground/80 mb-4">Try the mid-fi/hi-fi flows.</p>
                 <div className="flex flex-wrap gap-4 items-center">
                    <Button asChild>
                        <a href="#" target="_blank" rel="noopener noreferrer">View Interactive Prototype <ExternalLink className="ml-2 h-4 w-4" /></a>
                    </Button>
                     <Button variant="outline" asChild>
                        <a href="#" target="_blank" rel="noopener noreferrer">Watch mid-fi walkthrough</a>
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
                    <p className="text-muted-foreground">Humanitech (Australian Red Cross) — Climate Change & Urban Heat</p>
                </div>
                <Separator />
                <div>
                    <h4 className="font-semibold mb-1">Team</h4>
                    <p className="text-muted-foreground">Rich Bartlett (Team Lead), Osama Mah, Ash Cheuk</p>
                </div>
                <Separator />
                <div>
                    <h4 className="font-semibold mb-1">Role</h4>
                    <p className="text-muted-foreground">Team Leader/Client Contact, UX Researcher, UI Designer, Collaborative Presenter</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Tools</h4>
                     <p className="text-muted-foreground">Figma, Miro, Canva, Useberry, Zoom, Trello, Slack, Google Suite</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Timeline</h4>
                     <p className="text-muted-foreground">6 weeks (Discover/Define/Develop/Deliver — ~1.5 weeks each)</p>
                </div>
                <Separator />
                <div>
                    <h4 className="font-semibold mb-1">Audience</h4>
                     <p className="text-muted-foreground">Delivery riders (Uber Eats, Deliveroo) in hot urban environments</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Research Sample</h4>
                     <p className="text-muted-foreground">14 rider interviews across Perth, Adelaide, Hong Kong</p>
                </div>
            </CardContent>
          </Card>
        </aside>
      </div>

       <section id="gallery" className="mt-16">
            <h3 className="text-3xl font-bold font-headline mb-6 text-center">Gallery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryImages.map((img, index) => (
                <div key={index} className="relative aspect-video rounded-md overflow-hidden shadow-medium transition-transform hover:scale-105">
                  <Image 
                    src={img.src} 
                    alt={img.alt} 
                    fill 
                    className="object-cover"
                    data-ai-hint={img.hint}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                     <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <p className="text-white text-center text-sm p-2">{img.value}</p>
                    </div>
                </div>
              ))}
            </div>
      </section>

      <footer className="mt-24 text-center bg-muted/50 py-12 rounded-lg">
        <h3 className="text-2xl font-bold font-headline mb-2">Bring wellness into platforms riders already use</h3>
        <p className="text-muted-foreground mb-6">Interested in the cross-sector model (platforms + retailers + charities)? I can walk through research artefacts and testing in detail.</p>
        <Button asChild>
            <Link href="/contact">Contact me</Link>
        </Button>
      </footer>
    </CaseStudyLayout>
  );
}
