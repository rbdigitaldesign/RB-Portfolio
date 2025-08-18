
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import projectsData from '@/data/projects.json';
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
import { ScrollToTopButton } from '@/components/scroll-to-top-button';

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
      <li><a href="#solution" className="hover:text-primary">The solution</a></li>
      <li><a href="#approach" className="hover:text-primary">Design approach</a></li>
      <li><a href="#outcomes" className="hover:text-primary">Outcomes & impact</a></li>
      <li><a href="#reflection" className="hover:text-primary">Reflection & next steps</a></li>
      <li><a href="#prototype" className="hover:text-primary">Interactive prototype</a></li>
    </ul>
  </nav>
);

const projectContent = {
  brief: `Redesign the GoPro iOS app to go beyond basic viewing/editing and appeal to millennials. All proposed features must be available now or within 12 months.`,
  problem: [
    `Limited creative features and low engagement versus peers`,
    `Unintuitive QuikStory flow; no clear home or workflow`,
    `Weak cloud/social integration; higher cognitive load`,
  ],
  solution: [
    `**Magic Movie**: faster, guided movie creation replaces QuikStory`,
    `**Clear Navigation + Home**: obvious start point and consistent task flow`,
    `**Cloud + Social**: import from Drive/Dropbox/iCloud; sharing made simple`,
  ],
  solutionResult: `The hi-fi prototype achieved **SUS 84.25**, with users praising the intuitive flow and reduced effort.`,
  approach: {
    research: `Surveys, 1:1 interviews, contextual enquiry, competitor analysis.`,
    synthesis: `Personas, affinity mapping, heuristic evaluation (home clarity, guidance, workflow, minimalism).`,
    prototyping: `Lo-fi → hi-fi in Figma; Maze and face-to-face sessions; Useberry for final remote test.`,
  },
  outcomes: [
    `**Time to first movie** reduced from ~25 min to **<10 min** (guided steps)`,
    `**Satisfaction** for creating/sharing: **80% happy or very satisfied**`,
    `**Consistency** improved (iOS HIG, WCAG AA/AAA contrast)`,
  ],
  reflection: {
    worked: `Clear start, simpler selections (checkboxes), loading states`,
    challenges: `Remote testing on desktop for a mobile flow; early question bias`,
    next: `Landscape editing, refine editing toolset, explore social channel value`,
  },
  fullResearch: `The extended write-up includes constraints and opportunity; research plan and methods with justification; key findings from surveys, interviews, and contextual enquiry; competitor insights (cloud integration, music and visual editors, auto-movie features); heuristic notes (home, guidance, workflow, focus); and testing notes (remote vs face-to-face, prototype limits, and design changes made).`
};

const galleryImages = [
    { src: 'https://placehold.co/1200x800.png', alt: 'hi-fi magic movie selection step with checkboxes', hint: 'app screen' },
    { src: 'https://placehold.co/1200x800.png', alt: 'lo-fi wireframe of the home screen', hint: 'wireframe' },
    { src: 'https://placehold.co/1200x800.png', alt: 'hi-fi prototype screen for editing a clip', hint: 'app screen' },
    { src: 'https://placehold.co/1200x800.png', alt: 'user persona for the target audience', hint: 'persona document' },
    { src: 'https://placehold.co/1200x800.png', alt: 'before and after comparison of the home screen', hint: 'comparison ui' },
    { src: 'https://placehold.co/1200x800.png', alt: 'before and after comparison of the editing flow', hint: 'comparison ui' },
]

// Estimated reading time
function calculateReadingTime(text: string) {
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
}

export default function GoProProjectPage() {
  const project = (projectsData as Project[]).find(p => p.slug === 'gopro-app-redesign');
  if (!project) {
    notFound();
  }

  const allText = Object.values(projectContent).flat().join(' ');
  const readingTime = calculateReadingTime(allText);

  return (
    <CaseStudyLayout>
       <header className="mb-12">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-strong mb-8">
            <Image
                src="https://i.imgur.com/Ukax7tl.png"
                alt="GoPro mobile app screens in dark theme showing magic movie flow"
                fill
                priority
                className="object-cover"
                data-ai-hint="gopro app hero"
            />
        </div>
        <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary dark:text-primary-foreground mb-2">
              GoPro app redesign — making GoPro fun & easy for all
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              A faster path from capture to share with ‘Magic Movie’
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

            <section id="solution">
                <h3 className="text-2xl font-bold font-headline mb-4">The solution</h3>
                <ol className="list-decimal list-outside space-y-2 pl-5 text-foreground/80">
                   {projectContent.solution.map((item, i) => 
                     <li key={i} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                   )}
                </ol>
                <p className="mt-4 text-foreground/90 font-semibold" dangerouslySetInnerHTML={{ __html: projectContent.solutionResult.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
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
                <h3 className="text-2xl font-bold font-headline mb-4">Outcomes & impact</h3>
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
                 <p className="text-foreground/80 mb-4">Try the flow in Figma (desktop preview).</p>
                 <div className="flex flex-wrap gap-4 items-center">
                    <Button asChild>
                        <a href="#" target="_blank" rel="noopener noreferrer">View Interactive Prototype <ExternalLink className="ml-2 h-4 w-4" /></a>
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
                    <h4 className="font-semibold mb-1">Role</h4>
                    <p className="text-muted-foreground">Team Leader, UX Researcher, UI Designer</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Tools</h4>
                     <p className="text-muted-foreground">Figma, Miro, Canva, Maze, Slack, Google Suite</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Timeline</h4>
                     <p className="text-muted-foreground">6 weeks (1 March – 16 April 2021)</p>
                </div>
                <Separator />
                <div>
                    <h4 className="font-semibold mb-1">Platform</h4>
                     <p className="text-muted-foreground">iOS</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Audience</h4>
                     <p className="text-muted-foreground">Millennials who document adventures</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Metric highlight</h4>
                     <Badge variant="secondary">SUS 84.25 (80th percentile, Grade ‘A’)</Badge>
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
                </div>
              ))}
            </div>
      </section>

      <footer className="mt-24 text-center bg-muted/50 py-12 rounded-lg">
        <h3 className="text-2xl font-bold font-headline mb-2">Interested in the process behind the polish?</h3>
        <p className="text-muted-foreground mb-6">I can walk you through research artefacts and test recordings on request.</p>
        <Button asChild>
            <Link href="/contact">Contact me</Link>
        </Button>
      </footer>
      <ScrollToTopButton />
    </CaseStudyLayout>
  );
}
