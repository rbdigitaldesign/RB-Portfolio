
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ExternalLink, Github, ArrowLeft, ArrowRight, Download } from 'lucide-react';
import { ScrollToTopButton } from '@/components/scroll-to-top-button';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import StatusNote from '@/components/StatusNote';
import { ProjectNavigation } from '@/components/project-navigation';
import { CaseStudyLayout } from '@/components/case-study-layout';
import { CaseStudyTOC } from '@/components/case-study-toc';
import { CaseStudyHeader } from '@/components/case-study-header';
import {
  projectContent,
  canvasContent,
  galleryImages,
  canvasGalleryImages,
  allGalleryImages,
  calculateReadingTime,
} from './data';

export default function TuxForLearningDesignPage() {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const allText = Object.values(projectContent).flat().map(i => typeof i === 'object' ? Object.values(i) : i).flat().join(' ');
  const readingTime = calculateReadingTime(allText);

  const handleNext = useCallback(() => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % allGalleryImages.length);
  }, []);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prevIndex) => (prevIndex - 1 + allGalleryImages.length) % allGalleryImages.length);
  }, []);

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setOpen(true);
  };
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (!open) return;
        if (e.key === 'ArrowRight') {
            handleNext();
        } else if (e.key === 'ArrowLeft') {
            handlePrev();
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, handleNext, handlePrev]);

  return (
    <CaseStudyLayout>
      <CaseStudyHeader slug="tux-for-learning-design" />
        <ProjectNavigation
            prevProject={{slug: 'rps-pod-battle'}}
            nextProject={{slug: 'canvas-quick-navigation'}}
        />
       <header className="mb-12">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-strong mb-8">
            <Image
                src="https://i.imgur.com/t8NXYGY.png"
                alt="Collage of toolkit cards and a learning design workshop in progress"
                fill
                priority
                className="object-cover"
                data-ai-hint="toolkit workshop collage"
            />
        </div>
        <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary dark:text-primary-foreground mb-2">
              UX Design Toolkit (TUX) for Learning Design
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Practical UX methods adapted for course and learning design
            </p>
             <p className="text-sm text-muted-foreground mt-2">Estimated reading time: {readingTime} minutes</p>
        </div>
         <StatusNote>
          Phase 1 complete (GitHub Pages prototype). Phase 2 in progress — building out Canvas LMS course (Sep 2025–ongoing).
        </StatusNote>
      </header>
      
      <div className="grid lg:grid-cols-4 gap-12">
        <aside className="hidden lg:block lg:col-span-1">
          <CaseStudyTOC items={[
            { href: '#brief', label: 'Project brief' },
            { href: '#problem', label: 'The problem' },
            { href: '#solution', label: 'The solution' },
            { href: '#design-approach', label: 'Design approach' },
            { href: '#team', label: 'The team' },
            { href: '#prompt-to-prototype', label: 'From prompt to prototype' },
            { href: '#toolkit-composition', label: 'Toolkit composition' },
            { href: '#outcomes', label: 'Outcomes' },
            { href: '#reflection', label: 'Reflection & next steps' },
            { href: '#resources', label: 'Resources' },
            { href: '#canvas-evolution', label: 'Phase 2: Canvas LMS' },
            { href: '#canvas-framework', label: 'Five-step process' },
            { href: '#canvas-design-thinking', label: 'Design thinking' },
            { href: '#canvas-team', label: 'The team' },
            { href: '#canvas-scope', label: 'Scope decisions' },
            { href: '#canvas-ethics', label: 'Ethics & consent' },
            { href: '#canvas-recruitment', label: 'Student recruitment' },
            { href: '#canvas-naming', label: 'Naming the resource' },
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
            <section id="solution" className="cs-section">
                <h3 className="cs-h2">The solution — TUX</h3>
                <ol className="list-decimal list-outside space-y-4 pl-5 text-foreground/80">
                   {projectContent.solution.map((item, i) => 
                     <li key={i}>
                        <strong className="font-semibold text-foreground">{item.title}</strong> — {item.description}
                     </li>
                   )}
                </ol>
            </section>
            <section id="design-approach" className="cs-section">
                <h3 className="cs-h2">Design approach</h3>
                <div className="space-y-4">
                    <div>
                        <h4 className="cs-h3">Research</h4>
                        <p className="text-foreground/80">{projectContent.designApproach.research}</p>
                    </div>
                    <div>
                        <h4 className="cs-h3">Synthesis</h4>
                        <p className="text-foreground/80">{projectContent.designApproach.synthesis}</p>
                    </div>
                    <div>
                        <h4 className="cs-h3">Prototyping & tests</h4>
                        <p className="text-foreground/80">{projectContent.designApproach.prototyping}</p>
                    </div>
                </div>
            </section>
            <section id="team" className="cs-section">
                <h3 className="cs-h2">The team — &ldquo;Cheese Bags&rdquo;</h3>
                <p className="text-foreground/80 mb-4">
                    The learning design team earned an unlikely nickname during this project. Team member Alex shared a meme — a box of &ldquo;Stay Fresh Cheese Bags&rdquo; captioned &ldquo;Found something new to say when I leave a room&rdquo; — and it stuck immediately. From that point on, &ldquo;Cheese Bags&rdquo; became the team&apos;s unofficial sign-off and a bit of shorthand for the group&apos;s spirit: practical, a little absurd, and always staying fresh.
                </p>
                <div className="flex justify-center">
                    <div className="relative w-56 rounded-lg overflow-hidden shadow-medium">
                        <Image
                            src="/cheese-bags.jpg"
                            alt="Stay Fresh Cheese Bags meme — Found something new to say when I leave a room"
                            width={224}
                            height={224}
                            className="object-contain"
                        />
                    </div>
                </div>
            </section>
            <section id="prompt-to-prototype" className="cs-section">
              <h3 className="cs-h2">From prompt to prototype (ChatGPT + GitHub)</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="cs-h3">Overview</h4>
                  <p className="text-foreground/80">{projectContent.promptToPrototype.overview}</p>
                </div>
                <div>
                  <h4 className="cs-h3">The challenge</h4>
                  <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    {projectContent.promptToPrototype.challenge.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="cs-h3">Process highlights</h4>
                  <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                      <li><strong className="font-semibold text-foreground">Opening Pandora's Chatbox:</strong> {projectContent.promptToPrototype.processHighlights.chatbox}</li>
                      <li><strong className="font-semibold text-foreground">GitHub, my frenemy:</strong> {projectContent.promptToPrototype.processHighlights.github}</li>
                      <li><strong className="font-semibold text-foreground">The toolkit takes shape (site structure):</strong> {projectContent.promptToPrototype.processHighlights.toolkitShape}</li>
                      <li><strong className="font-semibold text-foreground">Branded beauty:</strong> {projectContent.promptToPrototype.processHighlights.branding}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="cs-h3">Reflections on design process</h4>
                  <p className="text-foreground/80">{projectContent.promptToPrototype.reflections}</p>
                </div>
                <div>
                  <h4 className="cs-h3">The outcome</h4>
                  <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                      {projectContent.promptToPrototype.outcome.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
                 <div>
                  <h4 className="cs-h3">Lessons learned</h4>
                  <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                      {projectContent.promptToPrototype.lessons.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
                 <div>
                  <h4 className="cs-h3">Future directions</h4>
                  <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                      {projectContent.promptToPrototype.future.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
              </div>
            </section>
            <section id="toolkit-composition" className="cs-section">
                <h3 className="cs-h2">Toolkit composition</h3>
                 <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    {projectContent.toolkitComposition.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </section>
            <section id="outcomes" className="cs-section">
                <h3 className="cs-h2">Outcomes</h3>
                 <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    {projectContent.outcomes.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </section>
            <section id="reflection" className="cs-section">
                <h3 className="cs-h2">Reflection & next steps</h3>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    <li><strong className="font-semibold text-foreground">What worked:</strong> {projectContent.reflection.worked}</li>
                    <li><strong className="font-semibold text-foreground">Constraints:</strong> {projectContent.reflection.constraints}</li>
                    <li><strong className="font-semibold text-foreground">Next steps:</strong> {projectContent.reflection.next}</li>
                </ul>
                <div className="mt-6">
                    <h4 className="font-bold font-headline text-lg mb-2">Collaborative Toolkit Planning</h4>
                    <div 
                        className="group relative cursor-pointer aspect-video rounded-md overflow-hidden shadow-medium transition-transform hover:scale-105"
                        onClick={() => handleImageClick(galleryImages.findIndex(img => img.src === 'https://i.imgur.com/Py2dBmx.jpeg'))}
                    >
                        <Image
                            src="https://i.imgur.com/Py2dBmx.jpeg"
                            alt="Miro board for collaborative toolkit planning"
                            fill
                            className="object-contain rounded-lg"
                        />
                         <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-white text-center text-sm">View Full Size</p>
                        </div>
                    </div>
                     <Button asChild variant="outline" className="mt-4">
                        <a 
                            href="https://drive.google.com/file/d/1H95bGtCPi-VLadSFP0mP77AibjAEbZ9l/view?usp=sharing" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Download Scoping Document
                        </a>
                    </Button>
                </div>
            </section>
             <section id="resources" className="cs-section">
                <h3 className="cs-h2">Resources</h3>
                 <div className="flex flex-wrap gap-4">
                    <Button asChild><a href="https://rbdigitaldesign.github.io/ux-toolkit" target="_blank" rel="noopener noreferrer">View Live Site <ExternalLink className="ml-2 h-4 w-4" /></a></Button>
                    <Button asChild variant="outline"><a href="https://github.com/rbdigitaldesign/ux-toolkit" target="_blank" rel="noopener noreferrer"><Github className="mr-2 h-4 w-4" />View Repository</a></Button>
                 </div>
            </section>

            {/* ── PHASE DIVIDER ─────────────────────────────────────── */}
            <div className="mt-16 mb-4 text-center space-y-3">
              <div className="inline-block px-4 py-1 rounded-full border border-border bg-muted text-muted-foreground text-xs font-semibold tracking-widest uppercase">
                Phase 1 — GitHub Pages Prototype ↑
              </div>
            </div>
            <div className="border-y-2 border-accent/30 bg-accent/5 rounded-lg px-6 py-5 text-center mb-4">
              <p className="text-accent font-headline font-bold text-lg tracking-wide uppercase">
                Phase 2 — Canvas LMS Development (Sep 2025–ongoing)
              </p>
              <p className="text-sm text-foreground/60 mt-1">
                The toolkit evolves from a standalone prototype into an integrated institutional learning resource.
              </p>
            </div>

            {/* ── CANVAS EVOLUTION ──────────────────────────────────── */}
            <section id="canvas-evolution" className="cs-section">
              <h3 className="cs-h2">Taking TUX to Canvas</h3>
              <p className="text-foreground/80">{canvasContent.transition}</p>
              <div className="cs-callout mt-4">
                <p>{canvasContent.pivotRationale}</p>
              </div>
            </section>

            {/* ── FIVE-STEP FRAMEWORK ───────────────────────────────── */}
            <section id="canvas-framework" className="cs-section">
              <h3 className="cs-h2">Five-step testing process</h3>
              <ol className="list-decimal list-outside space-y-4 pl-5 text-foreground/80">
                {canvasContent.fiveSteps.map((item, i) => (
                  <li key={i}>
                    <strong className="font-semibold text-foreground">{item.step}</strong> — {item.description}
                  </li>
                ))}
              </ol>
              <div className="mt-8">
                <h4 className="cs-h3">Process planning board</h4>
                <p className="text-foreground/80 mb-4 text-sm">The Miro board below shows the structural planning work underpinning the five-step flow — including module mapping, content sequencing, and the minimum viable testing pathway.</p>
                <div className="rounded-lg overflow-hidden shadow-medium border border-border">
                  <iframe
                    width="768"
                    height="496"
                    src="https://miro.com/app/live-embed/uXjVIzQvlpA=/?focusWidget=3458764664590018742&embedMode=view_only_without_ui&embedId=64901361719"
                    frameBorder="0"
                    scrolling="no"
                    allow="fullscreen; clipboard-read; clipboard-write"
                    allowFullScreen
                    className="w-full"
                    title="Miro board: TUX Canvas course structural planning"
                  />
                </div>
              </div>
            </section>

            {/* ── DESIGN THINKING ───────────────────────────────────── */}
            <section id="canvas-design-thinking" className="cs-section">
              <h3 className="cs-h2">Design thinking as the backbone</h3>
              <p className="text-foreground/80">{canvasContent.designThinking}</p>
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {['Empathise', 'Define', 'Ideate', 'Prototype', 'Test & Evaluate'].map((stage, i) => (
                  <div key={i} className="rounded-lg border border-accent/30 bg-accent/5 p-3 text-center">
                    <span className="block text-xs font-bold text-accent/70 uppercase tracking-widest mb-1">{i + 1}</span>
                    <span className="text-sm font-semibold text-foreground">{stage}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* ── THE TEAM ──────────────────────────────────────────── */}
            <section id="canvas-team" className="cs-section">
              <h3 className="cs-h2">The team</h3>
              <p className="text-foreground/80">{canvasContent.teamOverview}</p>
              <div className="cs-callout mt-4">
                <p><strong>Working name:</strong> Cheesebags Anonymous — a signal of the psychological safety and collaborative trust that underpins the team's ability to experiment freely.</p>
              </div>
            </section>

            {/* ── SCOPE DECISIONS ───────────────────────────────────── */}
            <section id="canvas-scope" className="cs-section">
              <h3 className="cs-h2">Scope & structure decisions</h3>
              <ul className="list-disc list-outside space-y-3 pl-5 text-foreground/80">
                {canvasContent.scopeDecisions.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            {/* ── ETHICS & CONSENT ──────────────────────────────────── */}
            <section id="canvas-ethics" className="cs-section">
              <h3 className="cs-h2">Ethics & consent</h3>
              <p className="text-foreground/80">{canvasContent.ethics}</p>
            </section>

            {/* ── STUDENT RECRUITMENT ───────────────────────────────── */}
            <section id="canvas-recruitment" className="cs-section">
              <h3 className="cs-h2">Recruiting student testers</h3>
              <p className="text-foreground/80">{canvasContent.recruitment}</p>
              <div className="cs-callout mt-4">
                <p><strong>Students as Partners pathway:</strong> Staff provide requirements → SaP promotes via Student Leaders Network (560+ members) → Staff trains participants → Testing runs.</p>
              </div>
            </section>

            {/* ── NAMING ────────────────────────────────────────────── */}
            <section id="canvas-naming" className="cs-section">
              <h3 className="cs-h2">What's in a name?</h3>
              <p className="text-foreground/80">{canvasContent.naming}</p>
            </section>

            {/* ── CANVAS OUTCOMES ───────────────────────────────────── */}
            <section id="canvas-outcomes" className="cs-section">
              <h3 className="cs-h2">Phase 2 outcomes so far</h3>
              <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                {canvasContent.canvasOutcomes.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
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
                    <h4 className="font-semibold mb-1">Context</h4>
                    <p className="text-muted-foreground">Learning Enhancement & Innovation (University of Adelaide)</p>
                </div>
                <Separator />
                <div>
                    <h4 className="font-semibold mb-1">Role</h4>
                    <p className="text-muted-foreground">Rich Bartlett — Toolkit Author, Facilitator, UX/LD Integration</p>
                </div>
                <Separator />
                <div>
                    <h4 className="font-semibold mb-1">Collaborators</h4>
                    <p className="text-muted-foreground">Tim Churchward, Kelli Knuth, Alex Price</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Tools</h4>
                     <p className="text-muted-foreground">ChatGPT, Github Pages, Google Suite, Miro, HTML/CSS/JavaScript, Canvas LMS, SharePoint</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Timeline</h4>
                     <p className="text-muted-foreground">Ongoing — Phase 2 active (Sep 2025–present)</p>
                </div>
                 <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Audience</h4>
                     <p className="text-muted-foreground">Learning Designers, Academics, Professional Staff</p>
                </div>
                 <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Methods</h4>
                     <p className="text-muted-foreground">Literature scan, practitioner interviews, pilot workshops, Students as Partners testing</p>
                </div>
                <Separator />
                <div>
                    <h4 className="font-semibold mb-1">Status</h4>
                    <p className="text-muted-foreground">Phase 1 complete. Phase 2 in progress.</p>
                </div>
            </CardContent>
          </Card>
        </aside>
      </div>

       <section id="gallery" className="mt-16">
            <h3 className="cs-h2 text-center">Gallery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryImages.slice(0, 6).map((img, index) => (
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
                      src={allGalleryImages[selectedIndex].src}
                      alt={allGalleryImages[selectedIndex].alt}
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

      {/* ── PHASE 2 CANVAS GALLERY ────────────────────────────────── */}
      <section id="canvas-gallery" className="mt-16">
        <div className="border-y border-accent/20 bg-accent/5 rounded-lg px-6 py-4 mb-6 text-center">
          <h3 className="cs-h2 mb-0">Phase 2 — Canvas & planning screenshots</h3>
          <p className="text-sm text-foreground/60 mt-1">Screenshots from the Canvas LMS sandpit and Miro planning boards (Oct 2025)</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {canvasGalleryImages.map((img, index) => (
            <div
              key={index}
              className="group relative cursor-pointer aspect-video rounded-md overflow-hidden shadow-medium transition-transform hover:scale-105"
              onClick={() => { setSelectedIndex(galleryImages.length + index); setOpen(true); }}
            >
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
      </section>

      <Card className="mt-24 text-center p-8 md:p-12">
        <h3 className="cs-h2">Interested in the UX for Learning Design Toolkit?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Happy to walk through the toolkit, workshop formats, and facilitation notes.</p>
        <Button asChild>
            <Link href="/contact">Contact me</Link>
        </Button>
      </Card>
      <ScrollToTopButton />
    </CaseStudyLayout>
  );
}

    
