
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ExternalLink, Github, Gamepad2, ArrowLeft, ArrowRight } from 'lucide-react';
import { ScrollToTopButton } from '@/components/scroll-to-top-button';
import StatusNote from '@/components/StatusNote';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProjectNavigation } from '@/components/project-navigation';
import { CaseStudyLayout } from '@/components/case-study-layout';
import { CaseStudyTOC } from '@/components/case-study-toc';
import { CaseStudyHeader } from '@/components/case-study-header';

const projectContent = {
  overview: `Began as a novice to Firebase/Stackblitz; used AI guidance to scaffold, commit, and iterate. Goal: a fast, inclusive rock–paper–scissors tournament for our division's monthly meeting.`,
  context: `In LEI (Learning Enhancement and Innovation) at the University of Adelaide, pods host the monthly meeting. The Orcas hosted 27 August 2025; topic was decision-making, coinciding with international RPS day. With 50+ colleagues on Teams, we needed something interactive, quick to facilitate, and simple.`,
  earlyApproach: `Two failed Mentimeter trials highlighted limitations around state, ties, and bracket progression. An initial 50+ player idea was impractical, so we reframed to pod managers as players. Existing RPS games were evaluated but found unsuitable for a quick start or clear facilitation. Used Firebase Studio to scaffold quickly; iterated on arena styling, bracket, and "latest result".`,
  pivot: `Multiplayer was the main challenge; while Gemini understood the requirement to create a match between two players, it struggled to generate correct tournament bracketing. With 14 teams, it would try to create byes but wouldn't progress them to the next round automatically, only seeming to work with a perfect power of two, like 16 players. My developer partner, Aaron, was able to successfully engineer the logic to handle the brackets correctly. We paired over several builds to stabilise real-time reads/writes and repair regressions from rapid AI-led edits. We registered the domain, connected hosting, and ran ad-hoc tests which proved compatible with MS Teams breakout rooms.`,
  problem: [
    `Run a lightweight tournament many can follow on one call, with minimal setup.`,
    `Handle ties and bracket progression; clearly show who plays next.`,
    `Keep interaction simple so pod managers can represent teams without confusion.`,
  ],
  approach: {
    title: "Six build cycles (high level)",
    cycles: [
        `**Base arena** — Intro screens, single match, result message.`,
        `**Bracket & pods** — Tournament view, pod names/emojis, "latest result" panel.`,
        `**Admin panel** — Start/reset controls; match announcements; player links (future).`,
        `**Draw handling** — Replay mechanics and clearer status text.`,
        `**Multiplayer** — Real-time state; pairing with Aaron to stabilise sync and fix edge cases.`,
        `**Hardening** — Regressions from AI edits; typography/spacing polish; hosting/domain prep.`
    ]
  },
  design: [
      `**Aesthetic:** 8-bit/arcade, bold headings, high-contrast CTAs, dark theme.`,
      `**Information design:** Left-anchored bracket; right-rail for "in progress" + "latest result"; prominent reset for facilitators.`,
      `**Accessibility:** Large type, clear focus states, plain-language statuses (e.g., "It's a draw — play again"); keyboard-only facilitation checks planned.`
  ],
  testing: [
      `Ad-hoc tests with colleagues validated round flow, draw handling, and visibility of the bracket.`,
      `Facilitation model: pods play in breakout rooms; host advances bracket via admin panel; reconvene to view results.`,
      `Success indicators: no state collisions when multiple pods finish at once; clear "who's next"; easy recovery after reset.`
  ],
  deployment: `Domain leipodbattle.com.au mapped to Firebase Hosting; pre-flight checks completed ahead of the meeting.`,
  learning: [
      `AI accelerates scaffolding but isn't a substitute for engineering judgement.`,
      `Rapid prompt → run → observe → fix loops worked best.`,
      `Pairing with an engineer (Aaron) was essential for multiplayer stability.`
  ],
  nextSteps: [
      `Collect structured feedback (quick pulse + short facilitator retro).`,
      `Harden multiplayer (loading states, retries, defensive checks).`,
      `Explore spectator mode, optional sound cues, and lightweight analytics.`,
      `Extend accessibility (keyboard-only facilitation; alt text across UI imagery).`
  ],
  acknowledgements: `Huge thanks to Aaron from the media team in our LEI division at the University of Adelaide was essential in making the live build possible, particularly in stabilising the multiplayer functionality and state synchronisation.`,
  aiDisclosure: `AI guided the environment setup (Firebase/Stackblitz), generated starter code, adjusted presentation elements, and created background imagery. Human review and iteration were responsible for the overall experience design, fixing bugs, and stabilising the multiplayer behaviour.`
};

const galleryImages = [
    { src: 'https://i.imgur.com/0DY7gk0.png', alt: 'First iteration example of start page with Ai generate image of animal pod teams, spectator and Dev test view', hint: 'start page ai image' },
    { src: 'https://i.imgur.com/L2ljmom.png', alt: 'First iteration of the Tournament bracket', hint: 'tournament bracket first iteration' },
    { src: 'https://i.imgur.com/qOmuSKJ.png', alt: 'Example of Dev Test view Gemini was prompted to create to help me with real-time testing.', hint: 'dev test view' },
    { src: 'https://i.imgur.com/rHXhAQ7.png', alt: 'Second iteration of Battle page showcasing tournament view on the same page', hint: 'battle page second iteration' },
    { src: 'https://i.imgur.com/n3wmwa5.png', alt: 'Second iteration of start page with 8-bit font and start button', hint: 'start page second iteration' },
    { src: 'https://i.imgur.com/nYaJboX.png', alt: 'First iteration of winner announcement overlay', hint: 'winner overlay first iteration' },
    { src: 'https://i.imgur.com/0WkXTa9.png', alt: 'Second iteration of tournament bracket', hint: 'tournament bracket second iteration' },
    { src: 'https://i.imgur.com/3UumLCf.png', alt: 'Final iteration of start page with 8-bit font, retro 8-bit theme music, pixelated Ai background and press start button', hint: 'start page final' },
    { src: 'https://i.imgur.com/vR7Wx1X.png', alt: 'Final iteration of tournament bracket showing winner of each battle and tournament progress of eliminated teams', hint: 'tournament bracket final' },
    { src: 'https://i.imgur.com/y53UeKM.png', alt: 'First iteration of battle page where players select Rock, Paper or Scissors', hint: 'battle page first iteration' },
    { src: 'https://i.imgur.com/1WUCALh.png', alt: 'Final iteration of battle page with LEI commentary box to engage players with game play tips, silly jokes and RPS facts', hint: 'battle page final' },
    { src: 'https://i.imgur.com/Y7f7ww6.png', alt: 'Added a Hollywood movie-style intro page for humour and dramatic effect to start the tournament', hint: 'movie intro page' },
];

const iterationGalleryImages = [
    { src: 'https://i.imgur.com/QdwX6Uk.png', alt: 'Teams/pod page overview' },
    { src: 'https://i.imgur.com/roFGY6d.png', alt: 'Waiting for pods status boxes on main bracket page' },
    { src: 'https://i.imgur.com/roFGY6d.png', alt: 'UI of showing pods status changing' },
    { src: 'https://i.imgur.com/MFt4PSB.png', alt: 'View of pod for human players when they first join' },
];

function calculateReadingTime(text: string) {
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
}

export default function RpsPodBattlePage() {
  const allText = Object.values(projectContent).flat().join(' ');
  const readingTime = calculateReadingTime(allText);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleNext = useCallback(() => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
  }, [galleryImages.length]);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prevIndex) => (prevIndex - 1 + galleryImages.length) % galleryImages.length);
  }, [galleryImages.length]);

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
      <CaseStudyHeader slug="rps-pod-battle" />
       <ProjectNavigation 
            prevProject={{slug: 'flock-hackathon'}}
            nextProject={{slug: 'tux-for-learning-design'}}
        />
       <header className="mb-12">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-strong mb-8">
            <Image
                src="https://i.imgur.com/Orr8zIw.png"
                alt="Retro tournament title screen with start button"
                fill
                priority
                className="object-cover"
                data-ai-hint="retro game tournament"
            />
        </div>
        <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary dark:text-primary-foreground mb-2">
              Rock, Paper, Scissors - online battle tournament
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              AI-assisted build with Firebase Studio for a 50+ person meeting
            </p>
            <p className="text-sm text-muted-foreground mt-2">Estimated reading time: {readingTime} minutes</p>
        </div>
      </header>
      
      <div className="grid lg:grid-cols-4 gap-12">
        <aside className="hidden lg:block lg:col-span-1">
          <CaseStudyTOC items={[
            { href: '#overview', label: 'Project overview' },
            { href: '#context', label: 'Context' },
            { href: '#early-approach', label: 'Early approach' },
            { href: '#pivot', label: 'The pivot' },
            { href: '#problem', label: 'Problem & constraints' },
            { href: '#approach', label: 'Approach & evolution' },
            { href: '#design', label: 'Design & presentation' },
            { href: '#testing', label: 'Testing & facilitation' },
            { href: '#deployment', label: 'Deployment' },
            { href: '#learning', label: 'What I learned' },
            { href: '#next-steps', label: 'Next steps' },
            { href: '#demo', label: 'Interactive demo' },
          ]} />
        </aside>

        <main className="lg:col-span-2 space-y-12">
            <section id="overview">
                <h3 className="cs-h2">Project overview</h3>
                <div className="cs-callout"><p className="text-foreground/80">{projectContent.overview}</p></div>
            </section>
            <section id="context" className="cs-section">
                <h3 className="cs-h2">Context — the division, the theme, and the audience</h3>
                <p className="text-foreground/80">{projectContent.context}</p>
            </section>
            <section id="early-approach" className="cs-section">
                <h3 className="cs-h2">Early approach — Mentimeter and a rethink</h3>
                 <p className="text-foreground/80">{projectContent.earlyApproach}</p>
            </section>
            <section id="pivot" className="cs-section">
                <h3 className="cs-h2">Pivot — AI-assisted build with Firebase + Stackblitz</h3>
                <p className="text-foreground/80">{projectContent.pivot}</p>
            </section>
            <section id="problem" className="cs-section">
                <h3 className="cs-h2">Problem and constraints</h3>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                   {projectContent.problem.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </section>
            <section id="approach" className="cs-section">
                <h3 className="cs-h2">Approach and evolution</h3>
                <div>
                    <h4 className="cs-h3">{projectContent.approach.title}</h4>
                    <ol className="list-decimal list-outside space-y-2 pl-5 mt-2 text-foreground/80">
                        {projectContent.approach.cycles.map((item, i) => 
                            <li key={i} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        )}
                    </ol>
                </div>
            </section>
            <section id="design" className="cs-section">
                <h3 className="cs-h2">Design and presentation</h3>
                 <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    {projectContent.design.map((item, i) => 
                        <li key={i} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    )}
                </ul>
            </section>
            <section id="testing" className="cs-section">
                <h3 className="cs-h2">Testing and facilitation plan</h3>
                 <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    {projectContent.testing.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </section>
            <section id="deployment" className="cs-section">
                <h3 className="cs-h2">Deployment</h3>
                <p className="text-foreground/80">{projectContent.deployment}</p>
            </section>
            <section id="learning" className="cs-section">
                <h3 className="cs-h2">What I learned</h3>
                 <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    {projectContent.learning.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </section>
            <section id="next-steps" className="cs-section">
                <h3 className="cs-h2">Next steps after the live run</h3>
                 <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    {projectContent.nextSteps.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </section>
            <section id="acknowledgements" className="cs-section">
                <h3 className="cs-h2">Acknowledgements</h3>
                <p className="text-foreground/80">{projectContent.acknowledgements}</p>
            </section>
            <section id="ai-disclosure" className="cs-section">
                <h3 className="cs-h2">Disclosure on AI use</h3>
                <p className="text-foreground/80">{projectContent.aiDisclosure}</p>
            </section>
            <section id="demo" className="cs-section">
                 <h3 className="cs-h2">Interactive demo</h3>
                 <div className="flex flex-wrap gap-4 items-center">
                    <Button asChild>
                        <a href="https://www.leipodbattle.com.au" target="_blank" rel="noopener noreferrer">Open Tournament <ExternalLink className="ml-2 h-4 w-4" /></a>
                    </Button>
                     <Button variant="outline" asChild>
                        <a href="https://github.com/rbdigitaldesign/LEI-Pod-Battle" target="_blank" rel="noopener noreferrer"><Github className="mr-2 h-4 w-4" />View Code</a>
                    </Button>
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
                    <p className="text-muted-foreground">Product Owner, Facilitator, UX/UI, Prototyper</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Tools</h4>
                     <p className="text-muted-foreground">Firebase Studio, Firebase Hosting, AI</p>
                </div>
                <Separator />
                <div>
                    <h4 className="font-semibold mb-1">Timeline</h4>
                    <p className="text-muted-foreground">~1 week (evenings)</p>
                </div>
                 <Separator />
                <div>
                    <h4 className="font-semibold mb-1">Collaborators</h4>
                    <p className="text-muted-foreground">Aaron (Developer Partner) — stabilised multiplayer and state</p>
                </div>
                 <Separator />
                <div>
                    <h4 className="font-semibold mb-1">Deployment</h4>
                    <p className="text-muted-foreground">leipodbattle.com.au on Firebase Hosting</p>
                </div>
                <Separator />
                <div>
                    <h4 className="font-semibold mb-1">Status</h4>
                    <p className="text-muted-foreground">First live run on 27 Aug 2025; feedback to follow</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Audience</h4>
                     <p className="text-muted-foreground">50+ colleagues on Microsoft Teams (pods represented by managers)</p>
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
                      src={[...galleryImages, ...iterationGalleryImages][selectedIndex].src} 
                      alt={[...galleryImages, ...iterationGalleryImages][selectedIndex].alt} 
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
      
       <section id="post-run-iteration" className="mt-16">
          <h3 className="cs-h2 text-center">Post-run iteration (v1.1)</h3>
          <div className="max-w-2xl mx-auto space-y-8">
              <p className="text-foreground/80 text-center">Following the first live tournament and colleague feedback, I shipped a small uplift to improve reliability, flow, and facilitation speed. These changes preserve the core experience while reducing accidental starts and streamlining the match loop.</p>
              
              <div>
                <h4 className="font-bold font-headline text-xl mb-2">Why we iterated (from observations & feedback)</h4>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                  <li>A few folks wanted to jump back in immediately after the first run, surfacing small friction points worth fixing.</li>
                  <li>We observed the risk of a tournament starting unexpectedly (accidental click or flaky state).</li>
                  <li>We wanted to simplify the flow and remove distractions to keep the pace high.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold font-headline text-xl mb-2">What changed in v1.1</h4>
                <ol className="list-decimal list-outside space-y-4 pl-5 text-foreground/80">
                  <li>
                    <strong className="font-semibold text-foreground">Ready gate to prevent accidental starts</strong>
                    <p className="mt-1"><strong className="font-medium">Before:</strong> The tournament could begin as soon as "Start tournament" was pressed.<br/>
                    <strong className="font-medium">Now:</strong> Each pod page includes a Ready button. The bracket only launches once all pods have clicked Ready. This prevents accidental starts and any edge-case auto-starts from backend state glitches.<br/>
                    <strong className="font-medium">Result:</strong> A deliberate, human-confirmed start that gives facilitators confidence and reduces "false starts".</p>
                  </li>
                  <li>
                    <strong className="font-semibold text-foreground">Roster & seeding tweaks for better brackets</strong>
                     <p className="mt-1"><strong className="font-medium">Merged pod:</strong> Travis + Associate Director are now combined as "The Big Bosses."<br/>
                     <strong className="font-medium">Balancing entrants:</strong> Added Cox and a new AI bot "The Terminator" to keep bracket numbers even.<br/>
                     <strong className="font-medium">AI behaviour:</strong> Bots are intentionally biased to lose against human players, keeping the event people-first while cleanly filling the bracket.<br/>
                     <strong className="font-medium">Result:</strong> Cleaner seeding, simpler facilitation, and less lonely solo play for Travis 😊.</p>
                  </li>
                  <li>
                    <strong className="font-semibold text-foreground">Faster match loop (removed intro & chat overlay)</strong>
                    <p className="mt-1">Removed the "Hollywood intro" screen.<br/>
                    Removed the LEI chat box overlay.<br/>
                    <strong className="font-medium">Result:</strong> Fewer distractions and quicker round-to-round progression.</p>
                  </li>
                </ol>
              </div>

              <div>
                <h4 className="font-bold font-headline text-xl mb-2">Impact</h4>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                  <li><strong className="font-semibold text-foreground">Reliability:</strong> Human-confirmed "Ready" gate stops accidental tournament starts.</li>
                  <li><strong className="font-semibold text-foreground">Clarity:</strong> Pod consolidation and bracket balancing keep play smooth.</li>
                  <li><strong className="font-semibold text-foreground">Speed:</strong> Removing non-essentials tightens the loop and reduces downtime.</li>
                </ul>
              </div>
              
               <div>
                <h4 className="font-bold font-headline text-xl mb-2">What's next (still on the roadmap)</h4>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                  <li>Optional spectator mode</li>
                  <li>Subtle sound cues for match state transitions</li>
                  <li>Defensive checks around slow clients and retries</li>
                  <li>Expanded keyboard-only facilitation and alt text coverage</li>
                </ul>
              </div>
          </div>
        </section>
        
        <section id="iteration-gallery" className="mt-16">
            <h3 className="cs-h2 text-center">Iteration screenshots (v1.1)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {iterationGalleryImages.map((img, index) => (
                <div key={index} className="group relative cursor-pointer aspect-video rounded-md overflow-hidden shadow-medium transition-transform hover:scale-105"
                     onClick={() => { setSelectedIndex(galleryImages.length + index); setOpen(true); }}>
                  <Image 
                    src={img.src} 
                    alt={img.alt} 
                    fill 
                    className="object-cover"
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
        <h3 className="cs-h2">Interested in lightweight multiplayer for events?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">I can walk through the Firebase Studio setup, state model, and facilitation pattern used for the live run.</p>
        <Button asChild>
            <Link href="/contact" target="_blank" rel="noopener noreferrer">Contact me</Link>
        </Button>
      </Card>
      <ScrollToTopButton />
    </CaseStudyLayout>
  );
}
