
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ExternalLink, Download } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollToTopButton } from '@/components/scroll-to-top-button';
import StatusNote from '@/components/StatusNote';
import ReactMarkdown from 'react-markdown';

const CaseStudyLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="container mx-auto max-w-6xl py-16 px-4">{children}</div>;
};

const LocalTOC = () => (
  <nav className="sticky top-24">
    <h4 className="font-semibold mb-2 font-headline">On this page</h4>
    <ul className="space-y-2 text-sm text-muted-foreground">
      <li><a href="#overview" className="hover:text-primary">Project overview</a></li>
      <li><a href="#problem" className="hover:text-primary">The problem</a></li>
      <li><a href="#constraints" className="hover:text-primary">Constraints</a></li>
      <li><a href="#solution" className="hover:text-primary">The solution</a></li>
      <li><a href="#process" className="hover:text-primary">Process</a></li>
      <li><a href="#consultation" className="hover:text-primary">Media team consultation & feedback</a></li>
      <li><a href="#variants" className="hover:text-primary">Variants</a></li>
      <li><a href="#accessibility" className="hover:text-primary">Accessibility</a></li>
      <li><a href="#outcomes" className="hover:text-primary">Outcomes</a></li>
      <li><a href="#reflection" className="hover:text-primary">Reflection & next steps</a></li>
      <li><a href="#resources" className="hover:text-primary">Resources</a></li>
      <li><a href="#gallery" className="hover:text-primary">Gallery</a></li>
      <li><a href="#code" className="hover:text-primary">Code</a></li>
    </ul>
  </nav>
);

const galleryMdx = `
![nav bar implemented on teaching page](https://i.imgur.com/QMwbgwF.png "Nav bar implemented on teaching page")

![academic’s original attempt](https://i.imgur.com/WX6pm7r.png "Academics original attempt")

![weekly nav page instances set up as template for academic](https://i.imgur.com/3QkDDcx.png "Weekly nav page instances set up as template for academic")
`

const codeSnippet = `
<!-- scoped page-level styles -->
<style>
  .rb-quicknav { display:flex; flex-wrap:wrap; gap:.5rem; padding:.75rem; background:#0f0e2b; border-radius:.75rem; }
  .rb-quicknav a { display:inline-flex; align-items:center; padding:.55rem .9rem; font-weight:600; border-radius:.5rem; text-decoration:none; border:1px solid rgba(255,255,255,.18); }
  .rb-quicknav a:focus { outline:3px solid #fff; outline-offset:2px; }
  .rb-quicknav a[aria-current="page"] { box-shadow:0 0 0 2px rgba(255,255,255,.3) inset; }
  /* token-friendly colours (swap via brand tokens if available) */
  .rb-quicknav { color:#fff; }
  .rb-quicknav a { background:#1a1750; color:#fff; }
  .rb-quicknav a:hover { background:#2a2680; }
  .rb-quicknav .is-active { background:#5b47ff; }
</style>

<nav class="rb-quicknav" aria-label="quick navigation">
  <a href="/courses/XXXX/pages/schedule">schedule</a>
  <a href="/courses/XXXX/pages/topic-1" class="is-active" aria-current="page">topic 1</a>
  <a href="/courses/XXXX/pages/topic-2">topic 2</a>
  <a href="/courses/XXXX/pages/topic-3">topic 3</a>
  <a href="/courses/XXXX/pages/assignments">assignments</a>
  <a href="/courses/XXXX/pages/resources">extra resources</a>
</nav>
`;

export default function CanvasQuickNavPage() {
    return (
        <CaseStudyLayout>
            <header className="mb-12">
                <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-strong mb-8">
                    <Image
                        src="https://i.imgur.com/QMwbgwF.png"
                        alt="nav bar implemented on a teaching page in canvas lms"
                        fill
                        priority
                        className="object-cover"
                        data-ai-hint="canvas lms navigation"
                    />
                </div>
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary dark:text-primary-foreground mb-2">
                        Canvas LMS quick navigation bar
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                        Reducing clicks with an accessible, reusable on-page nav for modules and topics
                    </p>
                </div>
                 <StatusNote>
                    Important context — This component was created as a custom solution for an academic request. It is not a standard university pattern, as a global navigation feature is planned for the LMS. This page demonstrates a collaborative coding solution.
                </StatusNote>
            </header>

            <div className="grid lg:grid-cols-4 gap-12">
                <aside className="hidden lg:block lg:col-span-1">
                    <LocalTOC />
                </aside>

                <main className="lg:col-span-2 space-y-12">
                    <section id="overview">
                        <h3 className="text-2xl font-bold font-headline mb-4">Project overview</h3>
                        <p className="text-foreground/80">A lightweight, consistent quick navigation element embedded on Canvas pages to jump between topics, assignments and key resources with fewer clicks.</p>
                    </section>
                    
                    <Separator />
                    
                    <section id="problem">
                        <h3 className="text-2xl font-bold font-headline mb-4">The problem</h3>
                        <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                            <li>Frequent navigation requires multiple clicks and context switching</li>
                            <li>Patterns vary across courses, increasing cognitive load</li>
                            <li>Designers often lack theme access, restricting global changes</li>
                        </ul>
                    </section>
                    
                    <Separator />

                    <section id="constraints">
                        <h3 className="text-2xl font-bold font-headline mb-4">Constraints</h3>
                         <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                            <li>Page-level only (no theme/LTI); must be keyboard navigable</li>
                            <li>Maintain AA contrast; responsive; easy to duplicate</li>
                            <li>Should sit above/below page content without breaking layout</li>
                        </ul>
                    </section>

                    <Separator />

                    <section id="solution">
                        <h3 className="text-2xl font-bold font-headline mb-4">The solution</h3>
                        <p className="text-foreground/80">A page-embedded nav bar using semantic HTML and a small CSS block, styled with brand tokens; supports icon + label buttons, an active state, previous/next anchors, and optional grouped links.</p>
                    </section>

                    <Separator />

                    <section id="process">
                        <h3 className="text-2xl font-bold font-headline mb-4">Process</h3>
                        <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                            <li>Review current course pages and common journeys</li>
                            <li>Prototype HTML/CSS in a test shell; scope styles locally</li>
                            <li>Confirm contrast, focus states and tab order</li>
                            <li>Create variants (topic rail, compact quick nav, instances)</li>
                            <li>Duplicate across pages; validate active-state consistency</li>
                            <li>Walkthrough with the academic; capture feedback</li>
                            <li>Consult the media team on alignment with upcoming global navigation</li>
                        </ul>
                    </section>

                    <Separator />
                    
                    <section id="consultation">
                        <h3 className="text-2xl font-bold font-headline mb-4">Media team consultation & feedback</h3>
                        <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                            <li>Confirmed that global navigation is being delivered at the theme level, and should remain the system standard.</li>
                            <li>Supportive of this page-level component as a temporary, course-specific aid when clearly labelled as non-standard.</li>
                            <li>Guidance: keep AA contrast, visible focus rings, and generous hit areas; check spacing on smaller viewports.</li>
                            <li>Recommendation: provide a template page and short “how to” so academics don’t fork styles; avoid conflicting with theme CSS.</li>
                             <li>Governance note: any theme-level change should route through Media for review and release cadence.</li>
                        </ul>
                    </section>

                    <Separator />
                    
                    <section id="variants">
                        <h3 className="text-2xl font-bold font-headline mb-4">Variants</h3>
                        <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                           <li>Topic rail — topics 1–10 with active state and prev/next</li>
                           <li>Compact quick nav — home, topics, assignments, extra resources</li>
                           <li>Instances view — repeated bars across pages to confirm consistency</li>
                        </ul>
                    </section>

                    <Separator />

                     <section id="accessibility">
                        <h3 className="text-2xl font-bold font-headline mb-4">Accessibility</h3>
                        <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                            <li>Semantic &lt;nav&gt; landmark with labelled list structure</li>
                            <li>Visible focus indicators; aria-current="page" for the active item</li>
                            <li>Minimum AA contrast; large hit areas; keyboard-only operation</li>
                            <li>Meaningful labels for any icon-only buttons</li>
                        </ul>
                    </section>

                    <Separator />
                    
                    <section id="outcomes">
                        <h3 className="text-2xl font-bold font-headline mb-4">Outcomes</h3>
                        <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                            <li>Consistent in-page pattern ready for wider trial</li>
                            <li>Faster setup for designers (copy/paste then update targets)</li>
                            <li>Positive pilot feedback; media team alignment achieved; candidates identified for templating</li>
                        </ul>
                    </section>

                    <Separator />

                    <section id="reflection">
                        <h3 className="text-2xl font-bold font-headline mb-4">Reflection & next steps</h3>
                        <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                            <li>Convert snippet into a canvas template page for adoption at scale</li>
                            <li>Explore auto-highlighting of the current week/topic</li>
                            <li>Produce a short setup video and a redacted example course</li>
                            <li>Coordinate with the media team on timing and governance for any future theme-level include or retirement of the page-level pattern once global nav is live</li>
                        </ul>
                    </section>
                    
                    <Separator />

                     <section id="resources">
                        <h3 className="text-2xl font-bold font-headline mb-4">Resources</h3>
                        <div className="flex flex-wrap gap-4">
                            <Button asChild variant="outline"><a href="#">Download HTML snippet<Download className="ml-2 h-4 w-4" /></a></Button>
                            <Button asChild variant="outline"><a href="#">Setup Guide (PDF)<Download className="ml-2 h-4 w-4" /></a></Button>
                            <Button asChild variant="outline"><a href="#">A11y Checklist (PDF)<Download className="ml-2 h-4 w-4" /></a></Button>
                        </div>
                    </section>

                    <Separator />

                    <section id="gallery">
                        <h3 className="text-2xl font-bold font-headline mb-4">Gallery</h3>
                        <div className="prose dark:prose-invert max-w-none [&_img]:rounded-md [&_img]:shadow-medium">
                            <ReactMarkdown>{galleryMdx}</ReactMarkdown>
                        </div>
                    </section>
                    
                    <Separator />

                    <section id="code">
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    <h3 className="text-2xl font-bold font-headline">Minimal HTML/CSS example</h3>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                                        <code>
                                            {codeSnippet}
                                        </code>
                                    </pre>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
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
                            <p className="text-muted-foreground">Learning Enhancement & Innovation — University of Adelaide</p>
                        </div>
                        <Separator />
                         <div>
                            <h4 className="font-semibold mb-1">Role</h4>
                            <p className="text-muted-foreground">Rich Bartlett — Product Owner, UX/UI, Prototyper</p>
                        </div>
                        <Separator />
                        <div>
                            <h4 className="font-semibold mb-1">Collaborators</h4>
                            <p className="text-muted-foreground">Eden Blazejak (Academic)</p>
                        </div>
                        <Separator />
                         <div>
                            <h4 className="font-semibold mb-1">Stakeholders Consulted</h4>
                            <p className="text-muted-foreground">Media Team (Review & Guidance on Global Nav)</p>
                        </div>
                        <Separator />
                         <div>
                            <h4 className="font-semibold mb-1">Tools</h4>
                             <p className="text-muted-foreground">Canvas LMS (Pages), HTML, CSS</p>
                        </div>
                        <Separator />
                         <div>
                            <h4 className="font-semibold mb-1">Timeline</h4>
                             <p className="text-muted-foreground">August 2025 (initial build and variants)</p>
                        </div>
                        <Separator />
                        <div>
                            <h4 className="font-semibold mb-1">Audience</h4>
                            <p className="text-muted-foreground">Course Designers, Academics, Students</p>
                        </div>
                        <Separator />
                        <div>
                            <h4 className="font-semibold mb-1">Deployment</h4>
                            <p className="text-muted-foreground">Embedded on Canvas pages within pilot shells</p>
                        </div>
                    </CardContent>
                  </Card>
                </aside>
            </div>

            <footer className="mt-24 text-center bg-muted/50 py-12 rounded-lg">
                <h3 className="text-2xl font-bold font-headline mb-2">Interested in accessible component design for LMS?</h3>
                <p className="text-muted-foreground mb-6">I can walk you through the process of creating reusable, accessible components for Canvas.</p>
                <Button asChild>
                    <Link href="/contact">Contact me</Link>
                </Button>
            </footer>
            <ScrollToTopButton />
        </CaseStudyLayout>
    );
}
