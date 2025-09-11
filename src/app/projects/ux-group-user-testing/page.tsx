
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ExternalLink, ArrowLeft, ArrowRight } from 'lucide-react';
import { ScrollToTopButton } from '@/components/scroll-to-top-button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ProjectNavigation } from '@/components/project-navigation';

const CaseStudyLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="container mx-auto max-w-6xl py-16 px-4">{children}</div>;
};

const LocalTOC = () => (
  <nav className="sticky top-24">
    <h4 className="font-semibold mb-2 font-headline">On this page</h4>
    <ul className="space-y-2 text-sm text-muted-foreground">
      <li><a href="#background" className="hover:text-primary">Project background</a></li>
      <li><a href="#goals" className="hover:text-primary">Research goals</a></li>
      <li><a href="#methods" className="hover:text-primary">Methods</a></li>
      <li><a href="#tested" className="hover:text-primary">What we tested</a></li>
      <li><a href="#findings" className="hover:text-primary">Key findings</a></li>
      <li><a href="#changes" className="hover:text-primary">Design changes we made</a></li>
      <li><a href="#reflection" className="hover:text-primary">What we’d do differently</a></li>
      <li><a href="#credits" className="hover:text-primary">Acknowledgements</a></li>
      <li><a href="#gallery" className="hover:text-primary">Gallery</a></li>
    </ul>
  </nav>
);

const galleryImages = [
    { src: 'https://i.imgur.com/yDylY67.jpeg', alt: 'A student and facilitator during a one-on-one usability test', hint: 'User testing in progress (1:1 session)' },
    { src: 'https://i.imgur.com/Fufl9bG.jpeg', alt: 'Small group of students sharing feedback with facilitators', hint: 'Group discussion after testing' },
    { src: 'https://i.imgur.com/IBVcXjL.jpeg', alt: 'Students using laptops and phones to submit survey responses', hint: 'Students completing the JotForm survey' },
    { src: 'https://i.imgur.com/4YlqXC6.png', alt: 'Building the survey in JotForm, showing question types', hint: 'Building the JotForm survey (1)' },
    { src: 'https://i.imgur.com/YvjODJB.png', alt: 'Configuring conditional logic in the JotForm survey builder', hint: 'Building the JotForm survey (2)' },
    { src: 'https://i.imgur.com/Bvywvg0.png', alt: 'Setting up the thank you page and redirects in JotForm', hint: 'Building the JotForm survey (3)' },
    { src: 'https://i.imgur.com/b7bXELv.jpeg', alt: 'Large Miro board showing research lanes and sticky notes', hint: 'UX subgroup’s Miro board (overview)' },
    { src: 'https://i.imgur.com/DTKxzVY.jpeg', alt: 'Miro frame defining the problem, constraints, and design question', hint: 'Framing the design challenge' },
    { src: 'https://i.imgur.com/vzQPwjU.jpeg', alt: 'Miro column with examples, issues and early concepts', hint: 'Initial research lane' },
    { src: 'https://i.imgur.com/QyGP980.jpeg', alt: 'Miro frame with early UI ideas and poll feedback', hint: 'Ideation Station' },
    { src: 'https://i.imgur.com/VEWgxzo.jpeg', alt: 'Miro panel comparing module/page naming options', hint: 'Prototype solutions' },
    { src: 'https://i.imgur.com/BE0yHNt.png', alt: 'Early static mock exploring content layout and quick navigation', hint: 'Rich’s pre-design home-page contribution' },
    { src: 'https://i.imgur.com/4MxDl7v.png', alt: 'Prototype screenshot of the Dynamic Home page with integrated navigation', hint: 'Early Dynamic Home by Tim' }
];

export default function UxGroupUserTestingPage() {
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
            prevProject={{slug: 'ux-survey-2025'}}
            nextProject={{slug: 'flock-hackathon'}}
        />
       <header className="mb-12">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-strong mb-8">
            <Image
                src="https://i.imgur.com/yDylY67.jpeg"
                alt="Student participating in a 1:1 usability test of the Adelaide University course home page"
                fill
                priority
                className="object-cover"
                data-ai-hint="usability test"
            />
        </div>
        <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary dark:text-primary-foreground mb-2">
              Learning From Students: Usability testing the new Adelaide University course home page
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              We tested four designs (current, numbered variant, Dynamic Home, and course info patterns) with 42 students. One-on-one testing proved most valuable; results are now shaping the template and navigation.
            </p>
            <p className="text-sm text-muted-foreground mt-2">Estimated reading time: 6 minutes</p>
        </div>
      </header>
      
      <div className="grid lg:grid-cols-4 gap-12">
        <aside className="hidden lg:block lg:col-span-1">
          <LocalTOC />
        </aside>

        <main className="lg:col-span-2 space-y-12">
            <section id="background">
                <h3 className="text-2xl font-bold font-headline mb-4">Project background</h3>
                <p className="text-foreground/80">In early 2025 our UX subgroup formed to address a long-standing pain point: page titling and navigation clarity in Canvas, particularly where numbers couldn’t be used because of stackable curriculum requirements.<br/><br/>We met weekly in Miro to collect examples, frame a shared design challenge, and prototype naming conventions that improved readability, accessibility, and wayfinding. As those explorations progressed, Tim Churchward produced an early Dynamic Home concept—an integrated course home page that surfaces the essentials (course info, modules, assessments) without forcing students to detour through Modules.<br/><br/>That pivot set us up to validate four approaches directly with students and let the evidence guide the next iteration of the template.</p>
            </section>
            
            <Separator />
            
            <section id="goals">
                <h3 className="text-2xl font-bold font-headline mb-4">Research goals</h3>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    <li>Check whether our home-page patterns are fit for purpose on desktop and mobile.</li>
                    <li>Identify navigation pain points and points of confusion.</li>
                    <li>Learn student preferences for course information layouts, roadmap readability, and banner usage.</li>
                    <li>Use findings to shape the default design, not run a popularity contest.</li>
                </ul>
            </section>
            
            <Separator />

            <section id="methods">
                <h3 className="text-2xl font-bold font-headline mb-4">Methods</h3>
                <p className="text-foreground/80 mb-4">We used a mixed-methods approach:</p>
                <ol className="list-decimal list-outside space-y-2 pl-5 text-foreground/80">
                    <li>1:1 usability tests (n≈10) with regional/online students.</li>
                    <li>JotForm survey (n=32) run during on-campus sessions, plus small-group discussions.</li>
                    <li>Facilitator + note-taker setup, with de-identified notes and AI-assisted transcription/synthesis.</li>
                </ol>
                <p className="text-foreground/80 mt-4">Combined, 42 students contributed to the findings below.</p>
                <p className="text-foreground/80 mt-4"><strong>Biggest lesson:</strong> one-on-one testing surfaced first-impression friction we couldn’t see in surveys alone.</p>
            </section>
            
            <Separator />
            
            <section id="tested">
                <h3 className="text-2xl font-bold font-headline mb-4">What we tested</h3>
                <p className="text-foreground/80 mb-4">We put four elements in front of students:</p>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    <li><strong>Home page variants</strong> — the current template, a numbered/home variant, and Tim’s Dynamic Home.</li>
                    <li><strong>Course information</strong> — a three-separate-pages pattern vs a single tabbed page.</li>
                    <li><strong>Course roadmap</strong> — a table showing weeks, events, and assessments.</li>
                    <li><strong>Banners</strong> — five banner treatments and image-type preferences.</li>
                </ul>
            </section>
            
            <Separator />

            <section id="findings">
                <h3 className="text-2xl font-bold font-headline mb-4">Key findings</h3>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-bold font-headline text-lg">Home page</h4>
                        <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80 mt-2">
                            <li>Clear preference for the Dynamic Home. Students described it as “easier on my brain,” with better module & topic numbering and less visual clutter.</li>
                            <li>Mobile matters: many students access the LMS on phones; single-column layouts and compact sections help.</li>
                            <li>Students wanted: a quick assessment area, concise course summary/contacts, and on-page navigation (avoid the detour to Modules).</li>
                        </ul>
                    </div>
                     <div>
                        <h4 className="font-bold font-headline text-lg">Course information</h4>
                        <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80 mt-2">
                            <li>80% preferred the tabbed page over three separate pages—fewer clicks, easier scanning.</li>
                            <li>Usability tests showed why: routing via the Modules page added an unexpected middle step and cognitive load.</li>
                            <li>Improvements students asked for: CLOs above PLOs, clearer table typography, and consistent list styles.</li>
                        </ul>
                    </div>
                     <div>
                        <h4 className="font-bold font-headline text-lg">Course roadmap</h4>
                        <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80 mt-2">
                            <li>Roadmaps are valued (most students said they’re useful) but readability created errors: some students misread event dates or couldn’t spot due dates quickly.</li>
                            <li>Expectations: explicit dates/times for assessments, clickable items that lead to details, and lighter, snappier tables (some effects lagged on low-powered devices).</li>
                        </ul>
                    </div>
                     <div>
                        <h4 className="font-bold font-headline text-lg">Banners</h4>
                        <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80 mt-2">
                            <li>No single visual winner. Many students preferred no image or authentic course-related images over marketing/stock.</li>
                            <li>Strong expectation that the course code appears on the banner.</li>
                            <li>Overall sentiment: banners are nice-to-have, not a priority—get structure/navigation right first.</li>
                        </ul>
                    </div>
                </div>
            </section>

            <Separator />
            
            <section id="changes">
                <h3 className="text-2xl font-bold font-headline mb-4">Design changes we made</h3>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    <li>Adopt Dynamic Home as the default direction; refine for compactness and integrated on-page navigation (minimise page hops).</li>
                    <li>Course information: reorder to CLOs → PLOs, unify list styles, and rebuild tables for readability and mobile.</li>
                    <li>Roadmap: increase type size, tighten spacing, remove hover/cursor effects, show date ranges more clearly, and give Modules its own row to behave better on mobile.</li>
                    <li>Banner tool: endorse use of the Media Team’s tool, add a slimline height option, and include a course-code field.</li>
                </ul>
            </section>
            
            <Separator />

            <section id="reflection">
                <h3 className="text-2xl font-bold font-headline mb-4">What we’d do differently next time</h3>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    <li>Split testing into two tracks:
                        <ol className="list-decimal list-outside pl-5 my-2">
                            <li>Continuous improvement with small, frequent 1:1 sessions run by the UX Group, and</li>
                            <li>Verification testing (larger cohorts) for major changes.</li>
                        </ol>
                    </li>
                    <li>Bring stimulus sheets for group discussions to focus conversation (screens/printouts).</li>
                    <li>Treat “don’t make me think” as a design constraint—every extra hop or ambiguous label compounds cognitive load.</li>
                </ul>
            </section>
            
            <Separator />
            
            <section id="credits">
                <h3 className="text-2xl font-bold font-headline mb-4">Acknowledgements</h3>
                <p className="text-foreground/80">Final student-testing report compiled by Tim Churchward, with contributions from Rich Bartlett, Kelli Knuth, and Alex Price and support from Kat Alchin, Josh Cramp, and Andrew Beatton. Thanks to the Media Team for advice on banner production and template feasibility.</p>
            </section>
        </main>
        
        <aside className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Quick facts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                <div>
                    <h4 className="font-semibold mb-1">Audience</h4>
                    <p className="text-muted-foreground">Undergraduate students (mixed on-campus and online)</p>
                </div>
                <Separator />
                <div>
                    <h4 className="font-semibold mb-1">Sample</h4>
                    <p className="text-muted-foreground">42 students across survey, group discussions, and 1:1 tests</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Primary device usage</h4>
                    <p className="text-muted-foreground">High mobile usage observed; designs reviewed on desktop and phone</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Focus areas</h4>
                     <p className="text-muted-foreground">Navigation, course information, roadmap clarity, banners</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Team & roles</h4>
                    <p className="text-muted-foreground">
                        <strong>UX subgroup contributors:</strong><br/>
                        Tim Churchward — lead designer for the Dynamic Home<br/>
                        Rich Bartlett — research and facilitation<br/>
                        Kelli Knuth — research and facilitation<br/>
                        Alex Price — research and facilitation<br/><br/>
                        <strong>Reference/team coordination:</strong><br/>
                        Kat Alchin, Josh Cramp, Andrew Beatton
                    </p>
                </div>
                <Separator />
                <div>
                    <h4 className="font-semibold mb-1">Outcome</h4>
                     <p className="text-muted-foreground">Dynamic Home endorsed; roadmap and course-info patterns refined; banner tool updates proposed</p>
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
                      <p className="text-white text-center text-sm">{img.hint}</p>
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
        <h3 className="text-2xl font-bold font-headline mb-2">Interested in improving the student experience?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">I can walk you through the research artefacts and testing process on request.</p>
        <Button asChild>
            <Link href="/contact">Contact me</Link>
        </Button>
      </Card>
      <ScrollToTopButton />
    </CaseStudyLayout>
  );
}
