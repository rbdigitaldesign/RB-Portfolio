
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ExternalLink, Github, ArrowLeft, ArrowRight, Download } from 'lucide-react';
import { ScrollToTopButton } from '@/components/scroll-to-top-button';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import StatusNote from '@/components/StatusNote';
import { ProjectNavigation } from '@/components/project-navigation';
import { CaseStudyLayout } from '@/components/case-study-layout';
import { CaseStudyTOC } from '@/components/case-study-toc';
import { CaseStudyHeader } from '@/components/case-study-header';

const projectContent = {
  brief: `A UX-for-learning toolkit was needed to provide fast, repeatable, and accessible methods for course design. Success is defined by enabling learning designers and academics to consistently apply user-centred principles, improving the quality of educational experiences and streamlining the development process.`,
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
      chatbox: `Structured HTML on the fly; tailored CSS to the university's brand palette; added JavaScript for search and a "scroll-to-top" button; received step-by-step deployment guidance.`,
      github: 'Followed beginner-friendly flows (initialise repository, commit changes, push to remote, deploy via GitHub Pages); learned to recover from mistakes late at night.',
      toolkitShape: 'The site structure evolved to include: Home, Methodologies, Tools, Resources, and Contact, with a search.js file for functionality. Content was anchored in reputable sources like NN/g and IDF.',
      branding: "Applied the university's blue, purple, and limestone palette to ensure readability, consistency, and accessibility."
    },
    reflections: 'Skipping wireframes in favour of a fast build-and-learn cycle proved effective. The layout of the homepage and profile cards evolved through iteration. The "break one thing, fix three" loop became a familiar challenge, often solved with terse prompts when tired.',
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
      'Conduct further qualitative research to validate and refine the toolkit\'s methods.',
      'Collaborate with the UX group to map the toolkit\'s structure to a universal design process (Empathise, Define, Ideate, Prototype, Evaluate, Iterate, Share Outcomes).',
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

const canvasContent = {
  transition: `By September 2025, the GitHub Pages prototype had served its purpose: it proved the concept, surfaced real pain points through early user feedback, and gave the team a tangible artefact to rally around. But a standalone website — however polished — asked something of its audience that an institutional learning team couldn't reliably deliver: a link, a bookmark, a habit of going somewhere new. The decision was made to rebuild TUX as a native Canvas LMS course.`,

  pivotRationale: `Canvas is where staff already live. Lectures are uploaded there, announcements go out through it, and professional development is increasingly delivered inside it. Moving TUX into Canvas meant the toolkit would appear in the same environment where learning designers and academics do their daily work — no new logins, no separate tab to remember, no friction at the point of need. The shift also addressed persistent accessibility concerns: Canvas's built-in accessibility checker, captioning tools, and screen-reader compatibility offered guarantees that a hand-rolled GitHub Pages site simply couldn't match. Finally, embedding TUX inside the institutional ecosystem opens the door to formal integration with onboarding pathways, quality frameworks, and professional learning catalogues — giving it a sustainability and reach the prototype could never have.`,

  fiveSteps: [
    { step: 'Plan', description: 'Define the testing question, select the most appropriate UX method, and scope the session to the time and resources available. This is where you choose what you are actually trying to learn.' },
    { step: 'Recruit', description: 'Identify who should participate and how many people are needed. This step covers writing recruitment briefs, coordinating with Students as Partners or staff panels, and confirming logistics ahead of the session.' },
    { step: 'Test', description: 'Facilitate the session using one of the toolkit methods — whether that is a think-aloud walkthrough, a card sort, a structured interview, or a rapid heuristic review. The focus is on observing and listening, not on defending design decisions.' },
    { step: 'Analyse', description: 'Make sense of what emerged. Cluster findings, identify patterns, and connect insights back to the original design question. Lightweight synthesis tools from the toolkit help turn raw notes into actionable takeaways.' },
    { step: 'Deliver', description: 'Share findings in a format that suits the audience and drives action — whether that is a short slide deck, a populated decision trail canvas, or a verbal debrief with a course team. The aim is to close the loop and keep the evidence visible.' },
  ],

  designThinking: `For Phase 2, the team adopted the five-stage Design Thinking model — Empathise, Define, Ideate, Prototype, and Test & Evaluate — as the backbone of the Canvas course structure. The choice was deliberate. Design Thinking is well documented, visually intuitive, and widely taught, which means novice practitioners can orient themselves within a familiar map even when the specific UX methods are new to them. Rather than inventing a proprietary process, TUX maps its activities to stages most learning designers can already name. Each Canvas module anchors a cluster of methods to a stage of the model, giving users a clear answer to the question: "When do I use this?" The framework was also selected because it is non-linear in practice — it invites return visits and iteration — which mirrors the reality of course design work, where teams often revisit earlier stages as new evidence surfaces.`,

  teamOverview: `Phase 2 is a collaborative effort. The core team — Tim Churchward, Kelli Knuth, Alex Price, and Rich Bartlett — came together from across Learning Enhancement and Innovation, each bringing a different lens to the work. Tim contributes strategic oversight and learning design expertise; Kelli brings a sharp eye for content structure and instructional clarity; Alex anchors the accessibility and student experience perspective; and Rich leads the UX design integration and Canvas build. The group adopted the working name "Cheesebags Anonymous" — a tongue-in-cheek label that signals the psychological safety the team has built to experiment, debate, and occasionally get things wrong together. Collaboration happens across two primary environments: a shared SharePoint Word document for drafting and co-authoring content (with a deliberate no-track-changes rule to keep the document clean and readable), and a Canvas sandpit where module structures, page designs, and interaction patterns are tested before anything moves into the live course environment.`,

  scopeDecisions: [
    `Course Essentials was selected as the home for the TUX Canvas course — a dedicated section within the institution's Canvas environment designed specifically for professional learning and staff resources, making it a natural fit.`,
    `The scope was intentionally scaled back from the Phase 1 prototype. Rather than attempting to document every possible UX method, the team agreed to focus on a curated set of high-value, high-feasibility techniques suited to the constraints of learning design work.`,
    `Where strong external resources already exist — particularly from Nielsen Norman Group (NN/g) and the Interaction Design Foundation (IDF) — the course links out rather than attempting to replicate or paraphrase established guidance. This keeps the content focused and avoids unnecessary maintenance burden.`,
    `Track changes were deliberately disabled in the shared Word documents. The decision prioritised readability over revision history, with version control handled through file naming conventions and SharePoint version history instead.`,
  ],

  ethics: `Because TUX involves gathering feedback from participants — including students — the team sought clarity on the ethics obligations early. A Quality Assurance exemption from the university's Human Research Ethics process was confirmed, meaning the testing activity sits within normal quality improvement practice rather than formal research. In place of a heavy legal consent form, the team designed a simple checkbox acknowledgement that participants complete at the start of each testing session. The checkbox confirms informed participation without creating bureaucratic friction that would discourage staff and students from volunteering. This streamlined approach reflects a broader principle the team is building into the toolkit itself: ethics should be visible and genuine, but never so cumbersome that it becomes a barrier to running tests in the first place.`,

  recruitment: `Student testers are being recruited through the Students as Partners (SaP) programme, coordinated by Anthea D'Aloia. SaP provides access to the Student Leaders Network — a pool of more than 560 engaged students who have opted in to contribute to university improvement initiatives. The agreed process is straightforward: staff from the TUX team provide the requirements and session brief; the SaP team promotes the opportunity through the Network; staff then train and onboard any students who agree to participate. One question remains open: remuneration. Options under discussion include applying for small project grants or providing gift vouchers, but no final model has been confirmed. Resolving this will be a priority before the first formal testing round.`,

  naming: `The question of what to call the resource ran longer than expected. "Guide" was the early front-runner — it is familiar, modest, and accurately describes a document that points people toward methods. But the team kept returning to "Toolkit." A toolkit implies something physical, something you carry with you and reach for when you need it. It suggests completeness without being encyclopaedic, and it positions the user as someone who does things, not just reads them. The naming debate also shaped a broader convention that now runs across the course documents: action-oriented language. Page titles, module headings, and navigation labels are written as things you do or decide, not things you consume. The word "Toolkit" won because it felt solid — and the naming convention that came out of that debate made the rest of the content more purposeful.`,

  contentProgress: [
    { module: 'Getting Started', page: 'Why should I run UX testing?', assigned: 'Rich Bartlett', status: 'Ready for review' },
    { module: 'Getting Started', page: 'What exactly am I testing and what outcomes do I want?', assigned: 'Rich Bartlett', status: 'Ready for review' },
    { module: 'Getting Started', page: 'Who needs to be involved and give approval for my testing?', assigned: 'Rich Bartlett', status: 'Ready for review' },
    { module: 'Planning and Running Testing', page: 'How do I choose the right testing method and tools?', assigned: 'Kelli Knuth', status: 'Ready for review' },
    { module: 'Planning and Running Testing', page: 'How do I recruit and prepare users for testing?', assigned: 'Kelli Knuth', status: 'In progress' },
    { module: 'Planning and Running Testing', page: 'How do I run a testing session?', assigned: 'Tim Churchward', status: 'In progress' },
    { module: 'Planning and Running Testing', page: 'How do I capture meaningful data?', assigned: 'Kelli Knuth', status: 'In progress' },
    { module: 'Iterating and Improving', page: 'How do I turn testing results into insights and reports?', assigned: 'Alex Price', status: 'Ready for review' },
    { module: 'Iterating and Improving', page: 'How do I use testing insights to improve designs over time?', assigned: 'Alex Price', status: 'In progress' },
  ],

  canvasOutcomes: [
    `A working Canvas LMS prototype has been established in the university sandpit environment, with the course structure, module scaffolding, and initial pages in place.`,
    `A sustainable team collaboration model is running — combining SharePoint co-authoring with Canvas sandpit testing and regular synchronous check-ins.`,
    `Content allocation across the nine core pages has been agreed and assigned, giving each team member clear ownership of their contribution.`,
    `The ethics pathway has been clarified: QA exemption confirmed, checkbox consent designed, and the approach documented so future testing rounds can proceed without delay.`,
  ],
};

const galleryImages = [
    { src: 'https://i.imgur.com/r4LoKz6.png', alt: 'ive build of the toolkit on github pages showing navigation and search', hint: 'live build toolkit' },
    { src: 'https://i.imgur.com/MaiMjSF.png', alt: 'home page with search bar, main tool kit buttons, team info', hint: 'home page search team' },
    { src: 'https://i.imgur.com/K3pvDbr.png', alt: 'Example of UX methods page', hint: 'ux methods page' },
    { src: 'https://i.imgur.com/tGQbFmp.png', alt: 'Example of UX tools page', hint: 'ux tools page' },
    { src: 'https://i.imgur.com/UfgW5a0.png', alt: 'UX/ review checklist tool, utilising a mix of Uni Quality framework and UX checklist to create a report for designers', hint: 'checklist tool report' },
    { src: 'https://i.imgur.com/gZVNi9r.png', alt: 'Personas page, with PPTX developer by team mate Kelli Knuth', hint: 'personas page presentation' },
    { src: 'https://i.imgur.com/Py2dBmx.jpeg', alt: 'Miro board for collaborative toolkit planning', hint: 'miro board planning' },
];

const canvasGalleryImages = [
  { src: '/tux-canvas-why-test.png', alt: 'Canvas LMS page: Why should I run UX testing?', hint: 'canvas lms why test' },
  { src: '/tux-canvas-who-involved.png', alt: 'Canvas LMS page: Who needs to be involved for my testing?', hint: 'canvas lms who involved' },
  { src: '/tux-miro-mvt-flow.png', alt: 'Miro board: Minimum viable testing flow', hint: 'miro minimum viable testing' },
  { src: '/tux-miro-design-thinking.png', alt: 'Miro board: Design thinking framework map', hint: 'miro design thinking map' },
  { src: '/tux-miro-modules.png', alt: 'Miro board: Five-module course structure', hint: 'miro course modules structure' },
];

const allGalleryImages = [...galleryImages, ...canvasGalleryImages];

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
            { href: '#canvas-progress', label: 'Content progress' },
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

            {/* ── CONTENT PROGRESS ──────────────────────────────────── */}
            <section id="canvas-progress" className="cs-section">
              <h3 className="cs-h2">Content progress (Oct 2025)</h3>
              <p className="text-foreground/80 mb-4 text-sm">The table below reflects the content allocation agreed by the team as of October 2025. Each page is assigned to a primary author, with status tracked against the shared working document.</p>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="bg-muted border-b border-border">
                      <th className="px-4 py-3 font-semibold text-foreground">Module</th>
                      <th className="px-4 py-3 font-semibold text-foreground">Page</th>
                      <th className="px-4 py-3 font-semibold text-foreground">Assigned to</th>
                      <th className="px-4 py-3 font-semibold text-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {canvasContent.contentProgress.map((row, i) => (
                      <tr key={i} className="border-b border-border last:border-0">
                        <td className="px-4 py-3 text-foreground/60 text-xs">{row.module}</td>
                        <td className="px-4 py-3 text-foreground/80">{row.page}</td>
                        <td className="px-4 py-3 text-foreground/80">{row.assigned}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                            row.status === 'Ready for review'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                              : row.status === 'In progress'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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

    
