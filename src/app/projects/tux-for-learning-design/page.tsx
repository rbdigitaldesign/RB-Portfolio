
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ExternalLink, ArrowLeft, ArrowRight } from 'lucide-react';
import { ScrollToTopButton } from '@/components/scroll-to-top-button';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import StatusNote from '@/components/StatusNote';

const CaseStudyLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="container mx-auto max-w-6xl py-16 px-4">{children}</div>;
};

const LocalTOC = () => (
  <nav className="sticky top-24">
    <h4 className="font-semibold mb-2 font-headline">On this page</h4>
    <ul className="space-y-2 text-sm text-muted-foreground">
      <li><a href="#brief" className="hover:text-primary">Project brief</a></li>
      <li><a href="#problem" className="hover:text-primary">The problem</a></li>
      <li><a href="#solution" className="hover:text-primary">The solution</a></li>
      <li><a href="#design-approach" className="hover:text-primary">Design approach</a></li>
      <li><a href="#prompt-to-prototype" className="hover:text-primary">From prompt to prototype</a></li>
      <li><a href="#toolkit-composition" className="hover:text-primary">Toolkit composition</a></li>
      <li><a href="#outcomes" className="hover:text-primary">Outcomes</a></li>
      <li><a href="#reflection" className="hover:text-primary">Reflection & next steps</a></li>
      <li><a href="#resources" className="hover:text-primary">Resources</a></li>
    </ul>
  </nav>
);

const projectContent = {
  brief: `A UX-for-learning toolkit was needed to provide fast, repeatable, and accessible methods for course design. Success is defined by enabling learning designers and academics to consistently apply user-centered principles, improving the quality of educational experiences and streamlining the development process.`,
  problem: [
    `Inconsistent methods used across different course design projects.`,
    `Scattered artefacts and documentation leading to lost knowledge.`,
    `Tight schedules with academics leaving little time for deep UX research.`,
    `Weak decision trails making it hard to justify design choices.`,
    `Uneven application of accessibility standards.`
  ],
  solution: [
    { title: 'Curated methods for learning design', description: 'Adapted UX activities mapped to common course problems.' },
    { title: 'Ready-to-run assets', description: 'Method cards, canvases, and facilitator scripts to use out-of-the-box.' },
    { title: 'Time-boxed formats', description: '15, 30, and 60-minute variants for busy contributors.' },
    { title: 'Evidence & decision trails', description: 'Lightweight capture methods to link insights directly to design choices.' },
    { title: 'Accessibility by default', description: 'Templates with readable typescale, high contrast, and printable black & white versions.' },
  ],
  designApproach: {
    research: 'The process began with a brief literature scan and interviews with learning designers and academics to understand their current workflows and pain points.',
    synthesis: 'Needs were mapped to established UX techniques, and common constraints (like time and resources) were defined to shape the workshop formats.',
    prototyping: 'Several pilot workshops were run to test and iterate on the templates, timings, and language, ensuring they were practical and easy to understand for the target audience.'
  },
  promptToPrototype: {
    overview: 'As a coding partner, ChatGPT helped scaffold the initial toolkit website, which was then hosted on GitHub Pages. This allowed for rapid, vibe-driven development.',
    challenge: [
      'Translating abstract "UX vibes" into concrete HTML, CSS, and JavaScript.',
      'Navigating version control and deployment for the first time.',
      'Keeping UX testing of the toolkit distinct from generic feedback on the website itself.',
      'Integrating reputable methods and accessible tools into the content.'
    ],
    processHighlights: {
      chatbox: 'Structured HTML on the fly; tailored CSS to the university’s brand palette; added JavaScript for search and a "scroll-to-top" button; received step-by-step deployment guidance.',
      github: 'Followed beginner-friendly flows (initialize repository, commit changes, push to remote, deploy via GitHub Pages); learned to recover from mistakes late at night.',
      toolkitShape: 'The site structure evolved to include: Home, Methodologies, Tools, Resources, and Contact, with a search.js file for functionality. Content was anchored in reputable sources like NN/g and IDF.',
      branding: 'Applied the university’s blue, purple, and limestone palette to ensure readability, consistency, and accessibility.'
    },
    reflections: 'Skipping wireframes in favor of a fast build-and-learn cycle proved effective. The layout of the homepage and profile cards evolved through iteration. The "break one thing, fix three" loop became a familiar challenge, often solved with terse prompts when tired.',
    outcome: [
      'A live prototype site successfully stood up on GitHub Pages.',
      'Structured guidance for educators was made available.',
      'Integrated recommendations for external tools.',
      'Demonstrated a powerful blend of human creativity and AI assistance.'
    ],
    lessons: [
      'Vibe-driven coding with clear prompts unleashes progress for non-developers.',
      'Iteration is painful but powerful, especially with version control for diffs and rollbacks.',
      'Clarity is crucial—separating UX testing from generic feedback is key.',
      'GitHub is a universal toolkit that extends far beyond software teams.'
    ],
    future: [
      'Implement a dark-mode toggle.',
      'Integrate live forms using Jotform.',
      'Create short video walkthroughs for key methods.',
      'Improve repository hygiene and documentation.',
      'Collaborate with media and engineering teams for advanced features.',
      'Advocate for broader adoption across the institution.'
    ]
  },
  toolkitComposition: [
      `Method cards detailing when and how to use each technique.`,
      `Canvases for mapping learner jobs, journeys, risks, assumptions, and a decision trail.`,
      `Workshop run sheets with step-by-step instructions.`,
      `Completed examples to provide clear reference points.`,
      `A master slide deck for presenting methods and findings.`,
      `A facilitator checklist to ensure smooth session delivery.`
  ],
  outcomes: [
      `A clearer, more consistent facilitation flow for workshops.`,
      `Reduced preparation time thanks to ready-to-use assets.`,
      `Reusable and transparent decision trails for better project documentation.`,
      `Positive feedback and requests for further sessions from participants.`
  ],
  reflection: {
    worked: 'The ready-to-run assets and time-boxed formats were highly effective. The decision trail provided immediate value.',
    constraints: 'Piloting was limited to willing participants; broader adoption requires more strategic advocacy.',
    next: 'The next major step is to re-author the toolkit as a native Canvas LMS course to increase accessibility and integration. Short video explainers will be added for each method, and a governance model for versioning will be established.'
  }
};

const galleryImages = [
    { src: 'https://i.imgur.com/tYwY7Xp.png', alt: 'overview of toolkit cards and canvas in use', hint: 'toolkit cards canvas' },
    { src: 'https://i.imgur.com/your-image-url.png', alt: 'first live build of the toolkit on github pages showing navigation and search', hint: 'github pages home' },
    { src: 'https://i.imgur.com/your-image-url.png', alt: 'repository layout illustrating assets, pages, and search.js', hint: 'repo structure' },
    { src: 'https://i.imgur.com/your-image-url.png', alt: 'search interaction returning methods and resources', hint: 'search js' },
    { src: 'https://i.imgur.com/your-image-url.png', alt: 'application of university colour palette to ensure readability and contrast', hint: 'brand tokens' },
    { src: 'https://i.imgur.com/your-image-url.png', alt: 'before/after header and profile card alignment after css refinements', hint: 'header before after' },
    { src: 'https://i.imgur.com/your-image-url.png', alt: 'evidence capture sheet linking insights to design choices', hint: 'decision trail' }
];

function calculateReadingTime(text: string) {
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
}


export default function TuxForLearningDesignPage() {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const allText = Object.values(projectContent).flat().map(i => typeof i === 'object' ? Object.values(i) : i).flat().join(' ');
  const readingTime = calculateReadingTime(allText);

  const handleNext = useCallback(() => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
  }, []);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prevIndex) => (prevIndex - 1 + galleryImages.length) % galleryImages.length);
  }, []);

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
       <header className="mb-12">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-strong mb-8">
            <Image
                src="https://i.imgur.com/tYwY7Xp.png"
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
          Working prototype — the final delivery is expected to be a Canvas LMS course, with different visuals and functionality.
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

            <section id="solution">
                <h3 className="text-2xl font-bold font-headline mb-4">The solution — TUX</h3>
                <ol className="list-decimal list-outside space-y-4 pl-5 text-foreground/80">
                   {projectContent.solution.map((item, i) => 
                     <li key={i}>
                        <strong className="font-semibold text-foreground">{item.title}</strong> — {item.description}
                     </li>
                   )}
                </ol>
            </section>

            <Separator />

            <section id="design-approach">
                <h3 className="text-2xl font-bold font-headline mb-4">Design approach</h3>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-bold font-headline text-lg">Research</h4>
                        <p className="text-foreground/80">{projectContent.designApproach.research}</p>
                    </div>
                    <div>
                        <h4 className="font-bold font-headline text-lg">Synthesis</h4>
                        <p className="text-foreground/80">{projectContent.designApproach.synthesis}</p>
                    </div>
                    <div>
                        <h4 className="font-bold font-headline text-lg">Prototyping & tests</h4>
                        <p className="text-foreground/80">{projectContent.designApproach.prototyping}</p>
                    </div>
                </div>
            </section>

            <Separator />

            <section id="prompt-to-prototype">
              <h3 className="text-2xl font-bold font-headline mb-4">From prompt to prototype (ChatGPT + GitHub)</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold font-headline text-lg">Overview</h4>
                  <p className="text-foreground/80">{projectContent.promptToPrototype.overview}</p>
                </div>
                <div>
                  <h4 className="font-bold font-headline text-lg">The challenge</h4>
                  <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    {projectContent.promptToPrototype.challenge.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold font-headline text-lg">Process highlights</h4>
                  <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                      <li><strong className="font-semibold text-foreground">Opening Pandora’s Chatbox:</strong> {projectContent.promptToPrototype.processHighlights.chatbox}</li>
                      <li><strong className="font-semibold text-foreground">GitHub, my frenemy:</strong> {projectContent.promptToPrototype.processHighlights.github}</li>
                      <li><strong className="font-semibold text-foreground">The toolkit takes shape (site structure):</strong> {projectContent.promptToPrototype.processHighlights.toolkitShape}</li>
                      <li><strong className="font-semibold text-foreground">Branded beauty:</strong> {projectContent.promptToPrototype.processHighlights.branding}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold font-headline text-lg">Reflections on design process</h4>
                  <p className="text-foreground/80">{projectContent.promptToPrototype.reflections}</p>
                </div>
                <div>
                  <h4 className="font-bold font-headline text-lg">The outcome</h4>
                  <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                      {projectContent.promptToPrototype.outcome.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
                 <div>
                  <h4 className="font-bold font-headline text-lg">Lessons learned</h4>
                  <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                      {projectContent.promptToPrototype.lessons.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
                 <div>
                  <h4 className="font-bold font-headline text-lg">Future directions</h4>
                  <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                      {projectContent.promptToPrototype.future.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
              </div>
            </section>
            
            <Separator />
            
            <section id="toolkit-composition">
                <h3 className="text-2xl font-bold font-headline mb-4">Toolkit composition</h3>
                 <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    {projectContent.toolkitComposition.map((item, i) => <li key={i}>{item}</li>)}
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

            <section id="reflection">
                <h3 className="text-2xl font-bold font-headline mb-4">Reflection & next steps</h3>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    <li><strong className="font-semibold text-foreground">What worked:</strong> {projectContent.reflection.worked}</li>
                    <li><strong className="font-semibold text-foreground">Constraints:</strong> {projectContent.reflection.constraints}</li>
                    <li><strong className="font-semibold text-foreground">Next steps:</strong> {projectContent.reflection.next}</li>
                </ul>
            </section>

            <Separator />

             <section id="resources">
                <h3 className="text-2xl font-bold font-headline mb-4">Resources</h3>
                 <div className="flex flex-wrap gap-4">
                    <Button asChild><a href="#" target="_blank" rel="noopener noreferrer">View GitHub Pages Site <ExternalLink className="ml-2 h-4 w-4" /></a></Button>
                    <Button asChild variant="outline"><a href="#" target="_blank" rel="noopener noreferrer">View Repository</a></Button>
                    <Button asChild variant="outline"><a href="#" target="_blank" rel="noopener noreferrer">Download Sample Pack</a></Button>
                    <Button asChild variant="outline"><a href="#" target="_blank" rel="noopener noreferrer">View Slides</a></Button>
                    <Button asChild variant="outline"><a href="#" target="_blank" rel="noopener noreferrer">Facilitator Notes</a></Button>
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
                    <h4 className="font-semibold mb-1">Tools</h4>
                     <p className="text-muted-foreground">ChatGPT, Github Pages, Figma (templates), Google Suite, Miro, HTML/CSS/JavaScript</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Timeline</h4>
                     <p className="text-muted-foreground">Ongoing</p>
                </div>
                 <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Audience</h4>
                     <p className="text-muted-foreground">Learning Designers, Academics, Professional Staff</p>
                </div>
                 <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Methods</h4>
                     <p className="text-muted-foreground">Literature scan, practitioner interviews, pilot workshops</p>
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

      <footer className="mt-24 text-center bg-muted/50 py-12 rounded-lg">
        <h3 className="text-2xl font-bold font-headline mb-2">Interested in the UX for Learning Design Toolkit?</h3>
        <p className="text-muted-foreground mb-6">Happy to walk through the toolkit, workshop formats, and facilitation notes.</p>
        <Button asChild>
            <Link href="/contact">Contact me</Link>
        </Button>
      </footer>
      <ScrollToTopButton />
    </CaseStudyLayout>
  );
}
