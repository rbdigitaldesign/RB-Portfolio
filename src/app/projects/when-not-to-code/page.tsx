
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

const galleryImages = [
    { src: 'https://i.imgur.com/JuPBs0w.png', alt: 'Mentimeter mockup 1', hint: 'mentimeter mockup' },
    { src: 'https://i.imgur.com/ag31b1x.png', alt: 'Mentimeter mockup 2', hint: 'mentimeter mockup' },
    { src: 'https://i.imgur.com/5glc4iX.png', alt: 'Mentimeter mockup 3', hint: 'mentimeter mockup' },
    { src: 'https://i.imgur.com/y6SH5D2.png', alt: 'VibeCheck first iteration home', hint: 'vibecheck prototype' },
    { src: 'https://i.imgur.com/Dd6ECHE.png', alt: 'VibeCheck first iteration results', hint: 'vibecheck prototype' },
    { src: 'https://i.imgur.com/UT5LkAU.png', alt: 'VibeCheck second iteration home', hint: 'vibecheck prototype' },
    { src: 'https://i.imgur.com/xQ7UcOY.png', alt: 'VibeCheck second iteration results', hint: 'vibecheck prototype' },
    { src: 'https://i.imgur.com/Yo6MIoX.png', alt: 'VibeCheck login', hint: 'vibecheck prototype' },
    { src: 'https://i.imgur.com/5CcD80E.png', alt: 'Firebase fork with heat bars', hint: 'firebase prototype' },
    { src: 'https://i.imgur.com/aoNlNGl.png', alt: 'Miro heat maps overview', hint: 'miro board' },
    { src: 'https://i.imgur.com/k9JCff0.png', alt: 'Miro heat maps close-up', hint: 'miro board' },
];

export default function WhenNotToCodePage() {
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
        <CaseStudyHeader slug="when-not-to-code" />
        <ProjectNavigation
            prevProject={{slug: 'canvas-quick-navigation'}}
            nextProject={{slug: 'oua-design-process'}}
        />
      
      <div className="grid lg:grid-cols-4 gap-12">
        <aside className="hidden lg:block lg:col-span-1">
          <CaseStudyTOC items={[
            { href: '#overview', label: 'Project overview' },
            { href: '#context', label: 'Context' },
            { href: '#mentimeter', label: 'Early approach: Mentimeter' },
            { href: '#firebase', label: 'Bespoke: Firebase Studio' },
            { href: '#miro', label: 'The parallel solution: Miro' },
            { href: '#problem', label: 'Problem & constraints' },
            { href: '#approach', label: 'Approach & evolution' },
            { href: '#decision', label: 'Decision & next steps' },
            { href: '#learning', label: 'What I learned' },
          ]} />
        </aside>

        <main className="lg:col-span-2 space-y-12">
            <section id="overview">
                <h3 className="cs-h2">Project overview</h3>
                <p className="text-foreground/80">A short, fast exploration of ways to run an in-class vibe/mental-health check-in. I mocked up options in Mentimeter (using its AI tool), built a bespoke prototype in Firebase Studio ("VibeCheck"), and tested a first-time Miro approach created by Dr Elysia Sokolenko.</p>
                <div className="cs-callout">
                  <p><strong>Headline insight:</strong> where an existing platform already fits the workflow (Canvas + Miro), building a custom app can be unnecessary overhead.</p>
                </div>
            </section>
            
            <Separator />
            
            <section id="context" className="cs-section">
                <h3 className="cs-h2">Context — the prompt and the constraints</h3>
                <p className="text-foreground/80">Academics asked for a quick way to sense how a cohort was feeling during workshops. Needs:</p>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80 mt-4">
                    <li>Low friction for students;</li>
                    <li>Fast, interpretable visual for facilitators;</li>
                    <li>Ideally embeddable in Canvas and easy to reuse.</li>
                </ul>
            </section>

            <Separator />
            
            <section id="mentimeter" className="cs-section">
                <h3 className="cs-h2">Early approach — Mentimeter AI mocks</h3>
                <p className="text-foreground/80">Mentimeter's AI assistant produced a workable flow in minutes. It gave us slider-style prompts and optional reflection text.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
                    <img src="https://i.imgur.com/JuPBs0w.png" alt="Mentimeter mockup 1" className="rounded-md shadow-md" />
                    <img src="https://i.imgur.com/ag31b1x.png" alt="Mentimeter mockup 2" className="rounded-md shadow-md" />
                    <img src="https://i.imgur.com/5glc4iX.png" alt="Mentimeter mockup 3" className="rounded-md shadow-md" />
                </div>
                <p className="text-foreground/80"><strong>Pros:</strong> speed, existing SSO, easy sharing.<br/><strong>Trade-offs:</strong> limited layout control and visual customisation.</p>
            </section>
            
            <Separator />
            
            <section id="firebase" className="cs-section">
                <h3 className="cs-h2">Bespoke exploration — Firebase Studio "VibeCheck"</h3>
                <p className="text-foreground/80">In parallel I built a lightweight prototype to see what extra value a custom tool could offer: circumplex mood input, individual rows, class distribution, AI summary, and QR sharing.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                    <img src="https://i.imgur.com/y6SH5D2.png" alt="VibeCheck first iteration home page" className="rounded-md shadow-md" />
                    <img src="https://i.imgur.com/Dd6ECHE.png" alt="VibeCheck first iteration results page" className="rounded-md shadow-md" />
                </div>
                <h4 className="cs-h3">Second iteration improvements</h4>
                <p className="text-foreground/80">Clearer UI and typography, aggregated cohort dot-plot, facilitator "AI-powered vibe summary", and a share modal with QR code.</p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                    <img src="https://i.imgur.com/UT5LkAU.png" alt="VibeCheck second iteration home page" className="rounded-md shadow-md" />
                    <img src="https://i.imgur.com/xQ7UcOY.png" alt="VibeCheck second iteration results page" className="rounded-md shadow-md" />
                    <img src="https://i.imgur.com/Yo6MIoX.png" alt="VibeCheck login" />
                </div>
                 <h4 className="cs-h3">Iteration to match the Miro heat map</h4>
                 <p className="text-foreground/80">After seeing Elysia's heat-bar design in Miro, I forked the Firebase Studio project to test whether the bespoke tool could mirror that look and feel (gradients, simple sliders, relatable labels).</p>
                  <div className="my-4">
                    <img src="https://i.imgur.com/5CcD80E.png" alt="Firebase fork with gradient heat bars" className="rounded-md shadow-md" />
                </div>
                <p className="text-foreground/80"><strong>Outcome:</strong> I could replicate the visuals, but the effortless drag-and-drop, everyone-on-one-board interaction still required hours of additional engineering (state sync, collisions, role controls, etc.). With a working solution already in place, more build time wasn't justified.</p>
            </section>
            
            <Separator />
            
            <section id="miro" className="cs-section">
                <h3 className="cs-h2">The parallel solution — Elysia's Miro board</h3>
                <p className="text-foreground/80">As a first-time Miro user, Elysia created a vibe-check board with draggable circles over gradient heat bars ("big bleh" → "11/10 awake & keen", "strong yikes" → "totally fine"). Students understood it instantly; it embedded into Canvas; QR sharing was trivial.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                    <img src="https://i.imgur.com/aoNlNGl.png" alt="Miro heat maps overview" className="rounded-md shadow-md" />
                    <img src="https://i.imgur.com/k9JCff0.png" alt="Miro heat maps close-up" className="rounded-md shadow-md" />
                </div>
                <h4 className="cs-h3">Why it won for this context</h4>
                 <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80 mt-4">
                    <li>Zero new logins or onboarding</li>
                    <li>One screen for the class; live movement is self-explanatory</li>
                    <li>Rapid authoring and reuse as a template</li>
                    <li>Clean embed in Canvas, plus QR option</li>
                </ul>
            </section>

             <Separator />

            <section id="problem" className="cs-section">
                <h3 className="cs-h2">Problem and constraints (across options)</h3>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80 mt-4">
                    <li>Keep student effort near-zero; anonymity toggle desirable</li>
                    <li>Show a cohort-level visual at a glance</li>
                    <li>Avoid maintenance burden; use existing systems where possible</li>
                </ul>
            </section>

            <Separator />
            
            <section id="approach" className="cs-section">
                 <h3 className="cs-h2">Approach and evolution (quick cycles)</h3>
                  <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80 mt-4">
                    <li><strong>Need shaping:</strong> define facilitator goal and outputs.</li>
                    <li><strong>Platform scan:</strong> Mentimeter AI prototypes; feasibility check.</li>
                    <li><strong>Custom spike:</strong> Firebase Studio app to test value beyond slides.</li>
                    <li><strong>Evidence check:</strong> trial Elysia's Miro board with a real class.</li>
                    <li><strong>Fork & style test:</strong> match Miro gradients in Firebase; assess effort.</li>
                    <li><strong>Decision:</strong> pause bespoke; adopt Miro template; document rationale.</li>
                </ul>
            </section>

            <Separator />
            
            <section id="decision" className="cs-section">
                <h3 className="cs-h2">Decision and next steps</h3>
                 <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80 mt-4">
                    <li>Adopt Elysia's Miro board as a reusable template for workshops.</li>
                    <li>Pause Firebase Studio build; keep the repo as a reference for future needs (e.g., analytics, longitudinal trends).</li>
                    <li>Share template with LEI as part of a curated Miro template set.</li>
                </ul>
            </section>

            <Separator />

             <section id="learning" className="cs-section">
                <h3 className="cs-h2">What I learned</h3>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80 mt-4">
                    <li>Sometimes not coding is the user-centred choice when an existing platform meets the need with less friction.</li>
                    <li>Visual parity ≠ usability parity; replicating "simple" behaviours often hides significant engineering effort.</li>
                    <li>Embedding into the LMS trumps novelty when facilitation time is tight.</li>
                </ul>
            </section>

            <Separator />

            <section id="acknowledgements" className="cs-section">
                <h3 className="cs-h2">Acknowledgements</h3>
                <p className="text-foreground/80">Thanks to Dr Elysia Sokolenko, Dr Bonnie Williams, and Anna Leonard for the collaboration and rapid feedback.</p>
            </section>

            <Separator />

            <section id="ai-disclosure" className="cs-section">
                 <h3 className="cs-h2">Disclosure on AI use</h3>
                <p className="text-foreground/80">Mentimeter's AI assisted the initial survey flow; Firebase Studio hosted the bespoke prototype; I used AI to accelerate copy and UI ideas. Final design and decisions were human-led.</p>
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
                    <p className="text-muted-foreground">Learning Design, Prototyping, Facilitation Support</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Timeline</h4>
                     <p className="text-muted-foreground">2–3 days (Aug 2025)</p>
                </div>
                <Separator />
                <div>
                    <h4 className="font-semibold mb-1">Tools</h4>
                    <p className="text-muted-foreground">Mentimeter (AI), Firebase Studio (App Hosting), Miro, Canvas (LMS)</p>
                </div>
                 <Separator />
                <div>
                    <h4 className="font-semibold mb-1">Status</h4>
                    <p className="text-muted-foreground">Miro template adopted; bespoke app paused</p>
                </div>
                <Separator />
                <div>
                    <h4 className="font-semibold mb-1">Collaborators</h4>
                    <p className="text-muted-foreground">Dr Elysia Sokolenko, Dr Bonnie Williams, Anna Leonard (School of Biomedicine)</p>
                </div>
                <Separator />
                <div>
                    <h4 className="font-semibold mb-1">Audience</h4>
                    <p className="text-muted-foreground">Workshop cohorts in biomedicine</p>
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
        <h3 className="cs-h2">Want to explore rapid prototyping for learning?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">I can walk through the different prototypes and the decision-making framework used.</p>
        <Button asChild>
            <Link href="/contact">Contact me</Link>
        </Button>
      </Card>
      <ScrollToTopButton />
    </CaseStudyLayout>
  );
}
