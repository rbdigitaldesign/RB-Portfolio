
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ExternalLink, Gamepad2 } from 'lucide-react';
import { ScrollToTopButton } from '@/components/scroll-to-top-button';
import StatusNote from '@/components/StatusNote';

const CaseStudyLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="container mx-auto max-w-6xl py-16 px-4">{children}</div>;
};

const LocalTOC = () => (
  <nav className="sticky top-24">
    <h4 className="font-semibold mb-2 font-headline">On this page</h4>
    <ul className="space-y-2 text-sm text-muted-foreground">
      <li><a href="#overview" className="hover:text-primary">Project overview</a></li>
      <li><a href="#context" className="hover:text-primary">Context</a></li>
      <li><a href="#early-approach" className="hover:text-primary">Early approach</a></li>
      <li><a href="#pivot" className="hover:text-primary">The pivot</a></li>
      <li><a href="#problem" className="hover:text-primary">Problem & constraints</a></li>
      <li><a href="#approach" className="hover:text-primary">Approach & evolution</a></li>
      <li><a href="#design" className="hover:text-primary">Design & presentation</a></li>
      <li><a href="#testing" className="hover:text-primary">Testing & facilitation</a></li>
      <li><a href="#deployment" className="hover:text-primary">Deployment</a></li>
      <li><a href="#learning" className="hover:text-primary">What I learned</a></li>
      <li><a href="#next-steps" className="hover:text-primary">Next steps</a></li>
      <li><a href="#demo" className="hover:text-primary">Interactive demo</a></li>
    </ul>
  </nav>
);

const projectContent = {
  overview: `Began as a novice to Firebase/Stackblitz; used AI guidance to scaffold, commit, and iterate. Goal: a fast, inclusive rock–paper–scissors tournament for our division’s monthly meeting.`,
  context: `In LEI (Learning Enhancement and Innovation) at the University of Adelaide, pods host the monthly meeting. The Orcas hosted 27 August 2025; topic was decision-making, coinciding with international RPS day. With 50+ colleagues on Teams, we needed something interactive, quick to facilitate, and simple.`,
  earlyApproach: `Two failed Mentimeter trials highlighted limitations around state, ties, and bracket progression. An initial 50+ player idea was impractical, so we reframed to pod managers as players. Existing RPS games were evaluated but found unsuitable for a quick start or clear facilitation.`,
  pivot: `Used Firebase Studio to scaffold quickly; iterated on arena styling, bracket, and “latest result”. Multiplayer was the main challenge; while Gemini understood the requirement to create a match between two players, it struggled to generate correct tournament bracketing. With 14 teams, it would try to create byes but wouldn't progress them to the next round automatically, only seeming to work with a perfect power of two, like 16 players. My developer partner, Aaron, was able to successfully engineer the logic to handle the brackets correctly. We paired over several builds to stabilise real-time reads/writes and repair regressions from rapid AI-led edits. We registered the domain, connected hosting, and ran ad-hoc tests which proved compatible with MS Teams breakout rooms.`,
  problem: [
    `Run a lightweight tournament many can follow on one call, with minimal setup.`,
    `Handle ties and bracket progression; clearly show who plays next.`,
    `Keep interaction simple so pod managers can represent teams without confusion.`,
  ],
  approach: {
    title: "Six build cycles (high level)",
    cycles: [
        `**Base arena** — Intro screens, single match, result message.`,
        `**Bracket & pods** — Tournament view, pod names/emojis, “latest result” panel.`,
        `**Admin panel** — Start/reset controls; match announcements; player links (future).`,
        `**Draw handling** — Replay mechanics and clearer status text.`,
        `**Multiplayer** — Real-time state; pairing with Aaron to stabilise sync and fix edge cases.`,
        `**Hardening** — Regressions from AI edits; typography/spacing polish; hosting/domain prep.`
    ]
  },
  design: [
      `**Aesthetic:** 8-bit/arcade, bold headings, high-contrast CTAs, dark theme.`,
      `**Information design:** Left-anchored bracket; right-rail for “in progress” + “latest result”; prominent reset for facilitators.`,
      `**Accessibility:** Large type, clear focus states, plain-language statuses (e.g., “It’s a draw — play again”); keyboard-only facilitation checks planned.`
  ],
  testing: [
      `Ad-hoc tests with colleagues validated round flow, draw handling, and visibility of the bracket.`,
      `Facilitation model: pods play in breakout rooms; host advances bracket via admin panel; reconvene to view results.`,
      `Success indicators: no state collisions when multiple pods finish at once; clear “who’s next”; easy recovery after reset.`
  ],
  deployment: `Domain leipodbattle.com.au mapped to Firebase Hosting; pre-flight checks completed ahead of the meeting.`,
  learning: [
      `AI accelerates scaffolding but isn’t a substitute for engineering judgement.`,
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
    { src: 'https://placehold.co/1200x800.png', alt: 'Retro intro text teasing the rock–paper–scissors tournament', hint: 'retro game text' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Title screen with ‘start tournament’ call-to-action', hint: 'game title screen' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Matchup cards for two pods with a draw message and replay prompt', hint: 'game arena' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Admin modal with tournament controls and player links', hint: 'admin panel' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Single-elimination bracket with latest result and eliminated teams panel', hint: 'tournament bracket' },
];

function calculateReadingTime(text: string) {
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
}

export default function RpsPodBattlePage() {
  const allText = Object.values(projectContent).flat().join(' ');
  const readingTime = calculateReadingTime(allText);

  return (
    <CaseStudyLayout>
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
        <div className="flex flex-col items-center mt-6 gap-4">
             <Button asChild size="lg">
                <a href="https://www.leipodbattle.com.au" target="_blank" rel="noopener noreferrer">
                    <Gamepad2 className="mr-2 h-5 w-5" />
                    Play the Game!
                </a>
            </Button>
            <StatusNote>
              First live run scheduled for 27 August 2025 (Adelaide time); structured feedback to follow.
            </StatusNote>
        </div>
      </header>
      
      <div className="grid lg:grid-cols-4 gap-12">
        <aside className="hidden lg:block lg:col-span-1">
          <LocalTOC />
        </aside>

        <main className="lg:col-span-2 space-y-12">
            <section id="overview">
                <h3 className="text-2xl font-bold font-headline mb-4">Project overview</h3>
                <p className="text-foreground/80">{projectContent.overview}</p>
            </section>
            
            <Separator />
            
            <section id="context">
                <h3 className="text-2xl font-bold font-headline mb-4">Context — the division, the theme, and the audience</h3>
                <p className="text-foreground/80">{projectContent.context}</p>
            </section>
            
            <Separator />

            <section id="early-approach">
                <h3 className="text-2xl font-bold font-headline mb-4">Early approach — Mentimeter and a rethink</h3>
                <p className="text-foreground/80">{projectContent.earlyApproach}</p>
            </section>

            <Separator />

            <section id="pivot">
                <h3 className="text-2xl font-bold font-headline mb-4">Pivot — AI-assisted build with Firebase + Stackblitz</h3>
                <p className="text-foreground/80">{projectContent.pivot}</p>
            </section>

            <Separator />

            <section id="problem">
                <h3 className="text-2xl font-bold font-headline mb-4">Problem and constraints</h3>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                   {projectContent.problem.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </section>

            <Separator />

            <section id="approach">
                <h3 className="text-2xl font-bold font-headline mb-4">Approach and evolution</h3>
                <div>
                    <h4 className="font-bold font-headline text-lg">{projectContent.approach.title}</h4>
                    <ol className="list-decimal list-outside space-y-2 pl-5 mt-2 text-foreground/80">
                        {projectContent.approach.cycles.map((item, i) => 
                            <li key={i} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        )}
                    </ol>
                </div>
            </section>

            <Separator />

            <section id="design">
                <h3 className="text-2xl font-bold font-headline mb-4">Design and presentation</h3>
                 <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    {projectContent.design.map((item, i) => 
                        <li key={i} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    )}
                </ul>
            </section>
            
            <Separator />

            <section id="testing">
                <h3 className="text-2xl font-bold font-headline mb-4">Testing and facilitation plan</h3>
                 <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    {projectContent.testing.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </section>

            <Separator />

            <section id="deployment">
                <h3 className="text-2xl font-bold font-headline mb-4">Deployment</h3>
                <p className="text-foreground/80">{projectContent.deployment}</p>
            </section>

            <Separator />

            <section id="learning">
                <h3 className="text-2xl font-bold font-headline mb-4">What I learned</h3>
                 <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    {projectContent.learning.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </section>

            <Separator />

            <section id="next-steps">
                <h3 className="text-2xl font-bold font-headline mb-4">Next steps after the live run</h3>
                 <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    {projectContent.nextSteps.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </section>

             <Separator />

            <section id="acknowledgements">
                <h3 className="text-2xl font-bold font-headline mb-4">Acknowledgements</h3>
                <p className="text-foreground/80">{projectContent.acknowledgements}</p>
            </section>

             <Separator />

            <section id="ai-disclosure">
                <h3 className="text-2xl font-bold font-headline mb-4">Disclosure on AI use</h3>
                <p className="text-foreground/80">{projectContent.aiDisclosure}</p>
            </section>
            
            <Separator />

            <section id="demo">
                 <h3 className="text-2xl font-bold font-headline mb-4">Interactive demo</h3>
                 <div className="flex flex-wrap gap-4 items-center">
                    <Button asChild>
                        <a href="https://www.leipodbattle.com.au" target="_blank" rel="noopener noreferrer">Open Tournament <ExternalLink className="ml-2 h-4 w-4" /></a>
                    </Button>
                     <Button variant="outline" asChild>
                        <a href="https://github.com/rbdigitaldesign/LEI-Pod-Battle.git" target="_blank" rel="noopener noreferrer">View Code <ExternalLink className="ml-2 h-4 w-4" /></a>
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
                     <p className="text-muted-foreground">Firebase Studio, Firebase Hosting, Stackblitz, AI</p>
                </div>
                <Separator />
                <div>
                    <h4 className="font-semibold mb-1">Timeline</h4>
                    <p className="text-muted-foreground">~1 week (evenings) + short daytime cycles; ~6 builds</p>
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
            <h3 className="text-3xl font-bold font-headline mb-6 text-center">Gallery</h3>
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
                      <p className="text-white text-center text-sm">{img.alt}</p>
                    </div>
                </div>
              ))}
            </div>
      </section>

      <footer className="mt-24 text-center bg-muted/50 py-12 rounded-lg">
        <h3 className="text-2xl font-bold font-headline mb-2">Interested in lightweight multiplayer for events?</h3>
        <p className="text-muted-foreground mb-6">I can walk through the Firebase Studio setup, state model, and facilitation pattern used for the live run.</p>
        <Button asChild>
            <Link href="/contact">Contact me</Link>
        </Button>
      </footer>
      <ScrollToTopButton />
    </CaseStudyLayout>
  );
}
