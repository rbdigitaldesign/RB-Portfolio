
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ExternalLink, ArrowLeft, ArrowRight } from 'lucide-react';
import { ScrollToTopButton } from '@/components/scroll-to-top-button';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ProjectNavigation } from '@/components/project-navigation';
import { CaseStudyLayout } from '@/components/case-study-layout';
import { CaseStudyTOC } from '@/components/case-study-toc';
import { CaseStudyHeader } from '@/components/case-study-header';

const projectContent = {
  objective: `Convert the "Communication Styles" PDF worksheet into a lightweight, mobile-friendly interactive that guides learners through 23 quick selections (one per screen), provides immediate, visible feedback per choice, produces a printable summary (browser print → save as PDF), and embeds cleanly in Canvas and also runs standalone.`,
  collaboration: [
    "Numbering conflict found in the PDF; confirmed with academics: Analytical = 2; Imaginative = 3.",
    "First live build verified; print-to-PDF flow confirmed.",
    "UX enhancements discussed; feasible quick wins implemented while preserving the simple one-per-screen model for Canvas embedding."
  ],
  quickWins: [
    `Copy: "Please select the option that best describes you", UK spelling "socialiser", fix "A schmoozer", progress label → "x/23 Selected."`,
    "Interaction: Subtle click animation + brief delay so feedback is visible.",
    `Results: Reset/Redo control near "Show results."`,
    "Repos: Moved to HMS interactives (not OUA)."
  ],
  notAdopted: [
    "Drag-and-drop (major logic overhaul, low ROI)",
    "Batch pages (navigation logic & clutter when embedded)",
    "Live running tally (risk of biasing choices)",
    "Keyboard shortcuts (potential conflicts inside Canvas—parked)"
  ],
  constraints: [
    "Must embed reliably in Canvas LMS (predictable layout, minimal maintenance)",
    "Single bundle, print snapshot of results",
    "Tight turnaround (½–1 day for polish)"
  ],
  deliverable: [
    "23 one-tap screens with animated confirmation",
    `Clear progress display ("x/23 Selected")`,
    "Results view with Print + Redo",
    "Copy refined for clarity and consistency",
    "Hosted under HMS interactives; Canvas-friendly"
  ],
  outcome: `Replaced a multi-page PDF with a focused interactive that's quicker to complete, easier to embed, and produces a clean PDF record. Creates a repeatable pattern for future PDF → interactive conversions with Media.`
};

const galleryImages = [
    { src: 'https://i.imgur.com/d1YEELa.png', alt: 'PDF version of quiz (pg1 – Rating communication style)' },
    { src: 'https://i.imgur.com/gXEIdcZ.png', alt: 'PDF version of quiz (pg2 – Scoring interpretation)' },
    { src: 'https://i.imgur.com/oovXd0j.png', alt: 'Interactive version' },
    { src: 'https://i.imgur.com/P7Ztn9y.png', alt: 'Example of completed quiz' },
];

export default function CommunicationStylesQuizPage() {
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
      <CaseStudyHeader slug="communication-styles-quiz" />
       <ProjectNavigation 
            prevProject={{slug: 'oua-design-process'}}
            nextProject={{slug: 'oua-orientation-redesign'}}
        />
       <header className="mb-12">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-strong mb-8">
            <Image
                src="https://i.imgur.com/P7Ztn9y.png"
                alt="Communication Styles quiz—card interface preview"
                fill
                priority
                className="object-cover"
                data-ai-hint="quiz interface screenshot"
            />
        </div>
        <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary dark:text-primary-foreground mb-2">
              Communication Styles Quiz
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              A static PDF activity was transformed into an accessible, embeddable web quiz for the Create. Connect. Communicate. course. Built in collaboration with Media, the tool adds clear micro-interactions, printable results, and a streamlined single-choice flow that works standalone or inside Canvas.
            </p>
        </div>
      </header>
      
      <div className="grid lg:grid-cols-4 gap-12">
        <aside className="hidden lg:block lg:col-span-1">
          <CaseStudyTOC items={[
            { href: '#objective', label: 'Objective' },
            { href: '#collaboration', label: 'Collaboration summary' },
            { href: '#quick-wins', label: 'Quick wins' },
            { href: '#not-adopted', label: 'Considered but not adopted' },
            { href: '#constraints', label: 'Constraints' },
            { href: '#deliverable', label: 'Final deliverable' },
            { href: '#outcome', label: 'Outcome & impact' },
            { href: '#demo', label: 'Embedded Quiz' },
            { href: '#gallery', label: 'Gallery' },
            { href: '#credits', label: 'Credits' },
          ]} />
        </aside>

        <main className="lg:col-span-2 space-y-12">
            <section id="objective">
                <h3 className="cs-h2">Objective</h3>
                <p className="text-foreground/80">{projectContent.objective}</p>
            </section>
            
            <section id="collaboration" className="cs-section">
                <h3 className="cs-h2">Collaboration summary</h3>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                   {projectContent.collaboration.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </section>
            
            <section id="quick-wins" className="cs-section">
                <h3 className="cs-h2">Quick wins implemented</h3>
                 <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                   {projectContent.quickWins.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </section>

            <section id="not-adopted" className="cs-section">
                <h3 className="cs-h2">Considered but not adopted (reasons)</h3>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                   {projectContent.notAdopted.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </section>
            
            <section id="constraints" className="cs-section">
                <h3 className="cs-h2">Constraints</h3>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                   {projectContent.constraints.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </section>

            <section id="deliverable" className="cs-section">
                <h3 className="cs-h2">Final deliverable</h3>
                 <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                   {projectContent.deliverable.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </section>

            <section id="outcome" className="cs-section">
                <h3 className="cs-h2">Outcome & impact</h3>
                <div className="cs-callout"><p>{projectContent.outcome}</p></div>
            </section>

             <section id="demo" className="cs-section">
                <h3 className="cs-h2">Embedded Quiz (interactive)</h3>
                 <div className="w-full h-[750px]">
                    <iframe className="w-full h-full rounded-lg shadow-medium border" src="https://mediaproduction.adelaide.edu.au/hms-interactives/#/communication-styles-quiz" title="Communication Styles Quiz"></iframe>
                 </div>
            </section>
            
            <section id="gallery" className="cs-section">
                <h3 className="cs-h2">Gallery</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {galleryImages.map((img, index) => (
                    <div key={index} className="group relative cursor-pointer aspect-video rounded-md overflow-hidden shadow-medium transition-transform hover:scale-105"
                         onClick={() => { setSelectedIndex(index); setOpen(true); }}>
                      <Image 
                        src={img.src} 
                        alt={img.alt} 
                        fill 
                        className="object-cover"
                        data-ai-hint="quiz screenshot"
                        sizes="(max-width: 768px) 100vw, 50vw"
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
            
            <section id="credits" className="cs-section">
                <h3 className="cs-h2">Credits</h3>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    <li>Media engineering & interaction: Hui Mu</li>
                    <li>UX/content & liaison: Rich Bartlett</li>
                    <li>Academics: CCIP teaching team (HMS)</li>
                </ul>
            </section>
        </main>
        
        <aside className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Project at a glance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                <div>
                    <h4 className="font-semibold mb-1">Role</h4>
                    <p className="text-muted-foreground">Product/UX, copy review, academic liaison, QA</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Collaborators</h4>
                     <p className="text-muted-foreground">Hui Mu (Media—engineering/interaction); Course Academics</p>
                </div>
                <Separator />
                <div>
                    <h4 className="font-semibold mb-1">Context</h4>
                    <p className="text-muted-foreground">CCIP uplift (HMS); Canvas embed + standalone use</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Timeline</h4>
                     <p className="text-muted-foreground">February 2024</p>
                </div>
                 <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Tools & Tech</h4>
                    <p className="text-muted-foreground">Custom JS/HTML/CSS interactive (HMS repo), Canvas LMS, Browser print-to-PDF</p>
                </div>
            </CardContent>
          </Card>
        </aside>
      </div>

      <Card className="mt-24 text-center p-8 md:p-12">
        <h3 className="cs-h2">Want to turn static content into engaging interactives?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Happy to walk through the collaboration process between Learning Design and Media teams.</p>
        <Button asChild>
            <Link href="/contact" target="_blank" rel="noopener noreferrer">Contact me</Link>
        </Button>
      </Card>
      <ScrollToTopButton />
    </CaseStudyLayout>
  );
}

    
