
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ExternalLink, ArrowLeft, ArrowRight } from 'lucide-react';
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
  brief: `Humanitech asked us to explore how technology might empower urban communities to cope with climate impacts. We focused on delivery riders and heat-stress, aiming to augment existing rider apps with practical wellbeing features usable during shifts.`,
  problem: [
    `Heatwaves are australia’s deadliest natural hazard; urban heat is rising`,
    `Riders often prioritise income during busy periods, neglecting hydration and shade`,
    `Current apps lack contextual wellness support and inclusive language options`,
  ],
  opportunity: `Embed wellness features inside the rider apps they already use, with low-friction prompts and benefits that make staying safe the rational choice during heat events.`,
  solution: [
    `**Map markers for heat safety** — nearby water, shade, sunscreen points`,
    `**Daily check-ins with credits** — earn credits for reporting wellbeing and redeem at partner vendors`,
    `**Multilingual onboarding** — language options at first run`,
    `**Clearer concepts & icons** — rename “climate credits”→“credits”; switch to coin-stack icon; simplify legends`,
  ],
  solutionNote: `*Note: emergency contacts removed after testing showed low likelihood of use.*`,
  approach: {
    research: `Guerrilla and scheduled interviews with **14 riders** across Perth, Adelaide, Hong Kong; stakeholder sessions with Humanitech.`,
    synthesis: `Affinity maps, personas, journey maps; problem-scale model balancing rider, platform, and charity priorities.`,
    prototyping: `Crazy-8s with the client; mid-fi grayscale Figma; moderated/unmoderated tests in Useberry; refined to hi-fi.`,
  },
  outcomes: [
    `**66%** reported negative heat effects; **78%** expect platforms to do more; **81%** believe in-app health info could improve wellness`,
    `Comprehension of wellness screen and credits improved after iterations`,
    `Cross-sector model fits existing rider behaviour and platform incentives`,
  ],
  reflection: {
    worked: `Augmenting existing apps; on-shift cues; multilingual setup`,
    challenges: `Inconsistent early test scripts; explaining new concepts`,
    next: `Animated weather; smoother redemption flow; wearable integrations`,
  },
  fullResearch: `The extended write-up covers: literature and stats on heat; pivot from dengue to rider safety; recruitment tactics; interview guide design; hydration/shade/credit themes; mvp matrix; user-flow diagrams; icon ideation; client feedback (language options, credits rename, legend changes); testing limitations and lessons learned.`
};

const galleryImages = [
    { src: 'https://placehold.co/1200x800.png', alt: 'Map markers showing nearest water and shade to reduce heat exposure during shifts', hint: 'wireframe screen' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Daily check-ins to report wellbeing and earn credits', hint: 'wireframe flow' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Hi-fi map with clear markers for water and shade', hint: 'app screen map' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Intuitive check-in flow with simple UI elements', hint: 'app screen check-in' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Clear display of earned credits and how to redeem them', hint: 'app screen credits' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Multilingual support from the very first screen', hint: 'app screen language' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Dashboard integrating wellness features seamlessly', hint: 'app screen dashboard' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Contextual weather alerts to inform riders', hint: 'app screen alert' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Visualising the user journey for the credit system', hint: 'user flow diagram' },
    { src: 'https://placehold.co/1200x800.png', alt: 'A storyboard showing the feature in a real-world context', hint: 'storyboard illustration' },
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
            prevProject={{slug: 'gopro-app-redesign'}}
            nextProject={{slug: 'trip-approve-onboarding'}}
        />
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
                        <p className="text-foreground/80" dangerouslySetInnerHTML={{ __html: projectContent.approach.research.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
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
        <h3 className="text-2xl font-bold font-headline mb-2">Bring wellness into platforms riders already use</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Interested in the cross-sector model (platforms + retailers + charities)? I can walk through research artefacts and testing in detail.</p>
        <Button asChild>
            <Link href="/contact">Contact me</Link>
        </Button>
      </Card>
      <ScrollToTopButton />
    </CaseStudyLayout>
  );
}
