
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
import StatusNote from '@/components/StatusNote';
import { ProjectNavigation } from '@/components/project-navigation';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const CaseStudyLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="container mx-auto max-w-6xl py-16 px-4">{children}</div>;
};

const LocalTOC = () => (
  <nav className="sticky top-24">
    <h4 className="font-semibold mb-2 font-headline">On this page</h4>
    <ul className="space-y-2 text-sm text-muted-foreground">
      <li><a href="#brief" className="hover:text-primary">Project brief</a></li>
      <li><a href="#problem" className="hover:text-primary">The problem</a></li>
      <li><a href="#approach" className="hover:text-primary">The approach</a></li>
      <li><a href="#concept" className="hover:text-primary">The concept</a></li>
      <li><a href="#ethics" className="hover:text-primary">Ethics & governance</a></li>
      <li><a href="#outcomes" className="hover:text-primary">Outcomes</a></li>
      <li><a href="#reflection" className="hover:text-primary">Reflection & next steps</a></li>
      <li><a href="#artefacts" className="hover:text-primary">Interactive artefacts</a></li>
    </ul>
  </nav>
);

const projectContent = {
  brief: `Design an equitable, cooperative online platform for creators—an alternative to extractive models (Patreon-style)—grounded in feminist principles and ‘care before code’.`,
  problem: [
    `Layered fees and extractive economics disadvantage creators.`,
    `Creators bring audiences yet lack governance power and upside.`,
    `Equity, inclusion, and sustainability are often peripheral to product choices.`,
  ],
  approach: {
    formation: `Community call → The Codehers; shared Slack; expert wall.`,
    discovery: `Business Model Canvas; rapid survey; light competitive scan; principles first.`,
    shaping: `Narrowed to a creator co-op with transparent governance and revenue.`,
  },
  testimonial: {
      quote: `Our question is: what could a cooperative, equitable online platform (like Patreon and let’s call it Matreon for now) that will disrupt patriarchy, look and feel like?`,
      author: 'Moira Were',
      company: ''
  },
  concept: [
    `**Co-op ownership & governance** with member voting and transparent policy hub`,
    `**Distributive revenue** with clear fee split and member dividends`,
    `**Inclusive onboarding** with safer community guidelines and identity options`,
    `**Supportive growth** via spotlights and peer boosts, not just paywalls`,
    `**Ethical tech** with privacy-respecting defaults and anti-harassment tools`
  ],
  ethics: `Feminist principles; safe-workplace policies; diverse advisory board; income-distribution scenarios; sustainability and carbon considerations.`,
  outcomes: [
      `Pitch deck and concept brand delivered; presented to judges and peers.`,
      `Feedback: strong visual identity and values; requested deeper identity/distribution design.`,
      `Clarified next-step questions on niche focus and early partners.`,
  ],
  reflection: {
    worked: `Principles-first framing; co-op model clarity; fast identity.`,
    challenges: `Sharpening target segment; robust policies; limited time for interviews.`,
    next: `Validate a niche creator group; prototype governance flows; test fee scenarios; pilot with local partners.`,
  },
  fullResearch: `The extended write-up covers the origin story (Heaps Good Dev Slack); team naming; the expert wall; Business Model Canvas sessions; mentor notes; judges’ feedback; and post-event context (the platform is inactive as of 2024).`
};

const galleryImages = [
    { src: 'https://placehold.co/1200x800.png', alt: 'Slack announcement for the hackathon', hint: 'slack message screenshot' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Team photo of The Codehers', hint: 'team photo' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Event brief slide', hint: 'presentation slide' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Business Model Canvas in Miro', hint: 'miro board' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Slide outlining the feminist principles of the project', hint: 'presentation slide principles' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Early sketch of the onboarding flow', hint: 'wireframe sketch' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Brand exploration concepts in Figma', hint: 'figma screenshot' },
    { src: 'https://placehold.co/1200x800.png', alt: 'The Phone-a-Friend expert wall', hint: 'event photo' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Cover of the final pitch deck', hint: 'pitch deck slide' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Presenting the concept to judges', hint: 'presentation photo' },
];

function calculateReadingTime(text: string) {
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
}

const Testimonial = ({ quote, author, company }: { quote: string, author: string, company?: string }) => (
    <blockquote>
        <p>{quote}</p>
        <cite>— {author}{company && `, ${company}`}</cite>
    </blockquote>
);

export default function FlockHackathonProjectPage() {
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
            prevProject={{slug: 'ux-group-user-testing'}}
            nextProject={{slug: 'rps-pod-battle'}}
        />
       <header className="mb-12">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-strong mb-8">
            <Image
                src="https://placehold.co/1200x675.png"
                alt="Team at Stone & Chalk with concept slides and early wireframes on screens"
                fill
                priority
                className="object-cover"
                data-ai-hint="hackathon team working"
            />
        </div>
        <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary dark:text-primary-foreground mb-2">
              How the ‘Flock’ do you smash the techno-capitalist patriarchy?
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              A cooperative creator-platform concept built in a weekend hackathon
            </p>
            <p className="text-sm text-muted-foreground mt-2">Estimated reading time: {readingTime} minutes</p>
        </div>
        <StatusNote>
          This is a weekend hackathon concept case study. The platform is no longer active (context as of 2024).
        </StatusNote>
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

             <section id="approach">
                <h3 className="text-2xl font-bold font-headline mb-4">The approach</h3>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-bold font-headline text-lg">Team formation & setup</h4>
                        <p className="text-foreground/80">{projectContent.approach.formation}</p>
                    </div>
                    <div>
                        <h4 className="font-bold font-headline text-lg">Discovery in a weekend</h4>
                        <p className="text-foreground/80">{projectContent.approach.discovery}</p>
                    </div>
                    <div>
                        <h4 className="font-bold font-headline text-lg">Shaping the opportunity</h4>
                        <p className="text-foreground/80">{projectContent.approach.shaping}</p>
                    </div>
                </div>
                <Testimonial {...projectContent.testimonial} />
            </section>

            <Separator />

            <section id="concept">
                <h3 className="text-2xl font-bold font-headline mb-4">The concept — Flock (working name: “Matreon”)</h3>
                <ol className="list-decimal list-outside space-y-2 pl-5 text-foreground/80">
                   {projectContent.concept.map((item, i) => 
                     <li key={i} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                   )}
                </ol>
            </section>

            <Separator />

            <section id="ethics">
                <h3 className="text-2xl font-bold font-headline mb-4">Ethics & governance</h3>
                <p className="text-foreground/80">{projectContent.ethics}</p>
            </section>

            <Separator />

            <section id="outcomes">
                <h3 className="text-2xl font-bold font-headline mb-4">Outcomes</h3>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    {projectContent.outcomes.map((item, i) => <li key={i}>{item}</li>)}
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

            <section id="artefacts">
                 <h3 className="text-2xl font-bold font-headline mb-4">Interactive artefacts</h3>
                 <div className="flex flex-wrap gap-4 items-center">
                    <Button asChild>
                        <a href="#" target="_blank" rel="noopener noreferrer">View Pitch Deck <ExternalLink className="ml-2 h-4 w-4" /></a>
                    </Button>
                    <Button variant="outline" asChild>
                        <a href="#" target="_blank" rel="noopener noreferrer">See Early Wireframes</a>
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
                    <h4 className="font-semibold mb-1">Event</h4>
                    <p className="text-muted-foreground">Hen House Hackathon — Lot 14 / Stone & Chalk (Adelaide)</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Dates</h4>
                    <p className="text-muted-foreground">26–27 June 2021</p>
                </div>
                <Separator />
                <div>
                    <h4 className="font-semibold mb-1">Team</h4>
                    <p className="text-muted-foreground">The Codehers: Rich Bartlett, Lauren Byleveld, Margot White, Feagaimaalii Soti (Nai), Hehea Tukuafu-Vaioleti, Leesa Ward, Sarah Brown</p>
                </div>
                 <Separator />
                <div>
                    <h4 className="font-semibold mb-1">Role</h4>
                    <p className="text-muted-foreground">UX Researcher, UI Designer, Collaborative Presenter</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Tools</h4>
                     <p className="text-muted-foreground">Figma, Canva, Miro, Typeform, Slack, Zoom</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Process</h4>
                     <p className="text-muted-foreground">Compressed Double Diamond, Business Model Canvas, Rapid Survey, Concept Pitch</p>
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
        <h3 className="text-2xl font-bold font-headline mb-2">Interested in the process behind the concept?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Happy to walk through the Business Model Canvas, survey results, and final pitch deck.</p>
        <Button asChild>
            <Link href="/contact">Contact me</Link>
        </Button>
      </Card>
      <ScrollToTopButton />
    </CaseStudyLayout>
  );
}
