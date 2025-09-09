
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ExternalLink, ArrowLeft, ArrowRight } from 'lucide-react';
import { ScrollToTopButton } from '@/components/scroll-to-top-button';
import { ProjectNavigation } from '@/components/project-navigation';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const CaseStudyLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="container mx-auto max-w-6xl py-16 px-4">{children}</div>;
};

const LocalTOC = () => (
  <nav className="sticky top-24">
    <h4 className="font-semibold mb-2 font-headline">On this page</h4>
    <ul className="space-y-2 text-sm text-muted-foreground">
      <li><a href="#overview" className="hover:text-primary">Overview</a></li>
      <li><a href="#plan_methods" className="hover:text-primary">Plan & methods</a></li>
      <li><a href="#phase1" className="hover:text-primary">Phase 1 — Evaluation</a></li>
      <li><a href="#collab_figma" className="hover:text-primary">Collaborative design (Figma)</a></li>
      <li><a href="#phase2" className="hover:text-primary">Phase 2 — Student engagement</a></li>
      <li><a href="#phase3" className="hover:text-primary">Phase 3 — Workshop development</a></li>
      <li><a href="#workshop_action" className="hover:text-primary">Workshop in action</a></li>
      <li><a href="#phase4" className="hover:text-primary">Phase 4 — Synthesis & decisions</a></li>
      <li><a href="#wireframes" className="hover:text-primary">Wireframes & implementation notes</a></li>
      <li><a href="#iterations" className="hover:text-primary">Iterations beyond the workshop</a></li>
      <li><a href="#assessments_modules" className="hover:text-primary">Assessment overview & module pages</a></li>
      <li><a href="#learnings" className="hover:text-primary">Learnings & acknowledgements</a></li>
      <li><a href="#gallery" className="hover:text-primary">Gallery</a></li>
      <li><a href="#references" className="hover:text-primary">References</a></li>
    </ul>
  </nav>
);

const galleryImages = [
    { src: 'https://i.imgur.com/ypMmfTs.png', alt: 'Screens showing the redesigned sequence', title: 'Redesigned orientation overview' },
    { src: 'https://i.imgur.com/gWovhCt.png', alt: 'Critique of current orientation', title: 'Original orientation critique' },
    { src: 'https://i.imgur.com/2CoZxAy.png', alt: 'Scope doc for student collaboration', title: 'Scope for Students as Partners' },
    { src: 'https://i.imgur.com/c8GRodH.png', alt: 'Prep plan and materials', title: 'Workshop planning' },
    { src: 'https://i.imgur.com/BtiAQZB.png', alt: 'Workshop in action', title: 'Live Zoom workshop' },
    { src: 'https://i.imgur.com/ACo8ze0.jpeg', alt: 'Activities board overview', title: 'Miro activity board' },
    { src: 'https://i.imgur.com/9vtA4bH.jpeg', alt: 'Feedback collated', title: 'Student feedback in Miro' },
    { src: 'https://i.imgur.com/o4fCNH3.png', alt: 'Insight notes (Sinead)', title: 'Sinead’s insights' },
    { src: 'https://i.imgur.com/bREUY4l.jpeg', alt: 'Insight notes (Rich)', title: 'Rich’s insights' },
    { src: 'https://i.imgur.com/HlRj5Iv.jpeg', alt: 'Shared board of decisions', title: 'Collaborative synthesis' },
    { src: 'https://i.imgur.com/8X3YxWz.png', alt: 'Iteration preview 1', title: 'Iteration 1' },
    { src: 'https://i.imgur.com/7gGaVp3.png', alt: 'Iteration preview 2', title: 'Iteration 2' },
    { src: 'https://i.imgur.com/VdUgOHi.png', alt: 'Iteration preview 3', title: 'Iteration 3' },
    { src: 'https://i.imgur.com/IqwFbZm.png', alt: 'Iteration preview 4', title: 'Iteration 4' },
];

export default function OuaOrientationRedesignPage() {
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
            prevProject={{slug: 'communication-styles-quiz'}}
            nextProject={{slug: 'ppd-course-design'}}
        />
       <header className="mb-12">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-strong mb-8">
            <Image
                src="https://i.imgur.com/ypMmfTs.png"
                alt="Overview of redesigned OUA orientation sequence pages"
                fill
                priority
                className="object-cover"
            />
        </div>
        <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary dark:text-primary-foreground mb-2">
              Redesigning Course Orientation (OUA)
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              A ground-up rethink of the OUA orientation sequence: evaluate the current experience, co-design with students, prototype in Figma, and iterate from real feedback.
            </p>
            <p className="text-sm text-muted-foreground mt-2">Estimated reading time: 7 minutes</p>
        </div>
      </header>
      
      <div className="grid lg:grid-cols-4 gap-12">
        <aside className="hidden lg:block lg:col-span-1">
          <LocalTOC />
        </aside>

        <main className="lg:col-span-2 space-y-12 prose dark:prose-invert max-w-none">
            <section id="overview">
                <h3>Overview</h3>
                <p>When I joined the Online Programs Team, one of my first tasks was to re-imagine orientation for OUA students. Guided by my manager Tim and working closely with my colleague Sinead, we audited existing orientation patterns across courses, then shaped a version that fits OUA learners: informative, engaging, and easy to navigate online.</p>
            </section>
            
            <Separator />

            <section id="plan_methods">
                <h3>Plan & methods</h3>
                <h4>Plan</h4>
                <ol>
                    <li>Phase 1 — Evaluation: Critique the current orientation sequence and its fitness for OUA students.</li>
                    <li>Phase 2 — Student engagement: Form a Students as Partners focus group.</li>
                    <li>Phase 3 — Workshop development & facilitation: Build a Miro-based session and run it on Zoom.</li>
                    <li>Phase 4 — Data synthesis & iteration: Turn insights into prototypes, then refine.</li>
                    <li>Phase 5 — Implementation & review: Hand off clear specs; establish a feedback loop.</li>
                </ol>
                <h4>Methodologies — Surveys · Focus group (Students as Partners)</h4>
                <p>Tools — Miro · Jira · Canvas LMS · Zoom · Google Docs/Forms</p>
            </section>

            <Separator />
            
            <section id="phase1">
                <h3>Phase 1 — Evaluation</h3>
                <p>Current OUA MyUni Orientation (critique)</p>
                <img src="https://i.imgur.com/gWovhCt.png" alt="Critique of current OUA orientation sequences" className="rounded-md shadow-md" />
                <p>Sinead produced a detailed review covering copy, videos, visuals, HTML, and Google comment threads. Together we captured strengths, gaps, and actionable fixes—becoming the foundation for our redesign plan.</p>
                <h4>Ideas for iteration</h4>
                <ul>
                    <li>Calendar buttons for iCal/Outlook/Gmail to add dates easily</li>
                    <li>Printable tutorial schedule</li>
                    <li>UoA logo in the top-left for trust and recognition</li>
                    <li>Auto-closing accordions to keep focus</li>
                    <li>Interactive “Meet the team” with wave/tap reveals and comment bubbles</li>
                </ul>
            </section>

            <Separator />

            <section id="collab_figma">
                <h3>Collaborative design (Figma)</h3>
                <p>We explored sequence and layout options together and individually in Figma, aligning with the UoA Style Guide for consistency and accessibility.</p>
                <iframe style={{border: '1px solid rgba(0,0,0,.1)', width: '100%', height: '450px', borderRadius: '8px'}} src="https://embed.figma.com/design/nj2YTaMyxgCvazvW3qTcnj/Orientation-Workshop-before-and-after?node-id=0-1&embed-host=share" allowFullScreen></iframe>
            </section>

            <Separator />

            <section id="phase2">
                <h3>Phase 2 — Student engagement</h3>
                <img src="https://i.imgur.com/2CoZxAy.png" alt="Requirements scoped for Students as Partners" className="rounded-md shadow-md" />
                <p>We scoped collaboration with a Students as Partners cohort reflecting our OUA audience to ground decisions in authentic needs and expectations.</p>
            </section>
            
            <Separator />

            <section id="phase3">
                <h3>Phase 3 — Workshop development & facilitation</h3>
                <img src="https://i.imgur.com/c8GRodH.png" alt="Workshop preparation plan and materials" className="rounded-md shadow-md" />
                <p>We prepared pre-workshop quizzes, a facilitator script, and a Miro activity board stored in a shared drive. Activities included:</p>
                <ul>
                    <li>Orientation feedback (sticky notes + arrows + emoji reactions)</li>
                    <li>Pit stop Q&A</li>
                    <li>Card sort of orientation pages for logic and flow</li>
                    <li>Workshop feedback via emoji + comments</li>
                </ul>
                <img src="https://i.imgur.com/BtiAQZB.png" alt="Workshop running live on Zoom" className="rounded-md shadow-md" />
            </section>

            <Separator />

            <section id="workshop_action">
                <h3>Workshop in action</h3>
                <img src="https://i.imgur.com/ACo8ze0.jpeg" alt="Miro board with interactive activities" className="rounded-md shadow-md" />
                <img src="https://i.imgur.com/9vtA4bH.jpeg" alt="Overview of student feedback captured in Miro" className="rounded-md shadow-md mt-4" />
                <p>Nine students joined online. Keeping cameras on helped sustain engagement and let us read reactions in real time.</p>
            </section>

            <Separator />
            
            <section id="phase4">
                <h3>Phase 4 — Data synthesis & design decisions</h3>
                <div className="insights-row my-4">
                    <img src="https://i.imgur.com/o4fCNH3.png" alt="Sinead’s insights" className="rounded-md shadow-md" />
                    <img src="https://i.imgur.com/bREUY4l.jpeg" alt="Rich’s insights" className="rounded-md shadow-md" />
                    <img src="https://i.imgur.com/HlRj5Iv.jpeg" alt="Collaborative synthesis" className="rounded-md shadow-md" />
                </div>
                <h4>Key takeaways from students</h4>
                <ul>
                    <li>Welcome video works — keep it.</li>
                    <li>Simplify the home/orientation page — remove module boxes; streamline the start.</li>
                    <li>Prioritise critical links at the top (orientation, modules, assignment help).</li>
                    <li>Make important help persistent on the home hub.</li>
                    <li>Headings & typography need stronger hierarchy; rename “About this Course” → “Orientation”.</li>
                    <li>Clarify academic conventions (e.g., referencing) up front.</li>
                </ul>
                <h4>Decisions</h4>
                <ul>
                    <li>Retain the welcome video.</li>
                    <li>Restructure the home page as a central hub beyond day one.</li>
                    <li>Elevate critical links above the fold.</li>
                    <li>Use clearer heading weights and labels.</li>
                    <li>Surface academic expectations on the home page.</li>
                </ul>
            </section>

            <Separator />

            <section id="wireframes">
                <h3>Wireframes & implementation notes</h3>
                <p>We translated insights into Figma wireframes and handed a precise implementation brief to the media/LMS teams (MyUni). Sinead’s Google Sheets framework helped us turn free-form feedback into clear, testable requirements.</p>
                <div className="aspect-video mt-4">
                  <iframe style={{border: "1px solid rgba(0, 0, 0, 0.1)", width: '100%', height: '450px', borderRadius: '8px'}} src="https://embed.figma.com/design/F476boAOQLIeuZ2HbbBNH2/Proposed-new-Orientation--post-workshop-?node-id=0-1&embed-host=share" allowFullScreen></iframe>
                </div>
            </section>
            
            <Separator />

            <section id="iterations">
                <h3>Iterations beyond the workshop</h3>
                <p>The work continued—technology and policy shifted, so did the UX. We introduced cue boxes, refined assessment timelines, and explored ChatGPT integration for targeted student support.</p>
                <div className="iphone-row my-4">
                    <img src="https://i.imgur.com/8X3YxWz.png" alt="Iteration 1" className="rounded-md shadow-md" />
                    <img src="https://i.imgur.com/7gGaVp3.png" alt="Iteration 2" className="rounded-md shadow-md" />
                    <img src="https://i.imgur.com/VdUgOHi.png" alt="Iteration 3" className="rounded-md shadow-md" />
                    <img src="https://i.imgur.com/IqwFbZm.png" alt="Iteration 4" className="rounded-md shadow-md" />
                </div>
            </section>

            <Separator />
            
            <section id="assessments_modules">
                <h3>Assessment overview & module pages</h3>
                <h4>Assessment overview</h4>
                <ul>
                    <li>Direction & cue boxes standardised to the UoA style guide</li>
                    <li>Timeline evolved from coloured placeholders to an editable table</li>
                    <li>Academic integrity overview (thanks, Dani)</li>
                </ul>
                <h4>Welcome to Module pages</h4>
                <ul>
                    <li>Replaced old support boxes with targeted cue boxes (thanks, Alexis)</li>
                    <li>Cleaner, less cluttered entry experience</li>
                </ul>
            </section>

            <Separator />

            <section id="learnings">
                <h3>Learnings, appreciation & reflection</h3>
                <p>This was iterative by design (Buxton, 2007), grounded in students-as-partners (Healey, Flint & Harrington, 2016), simplified by Hick’s Law (McLeod, 2007), and steered by user-centred thinking (Norman, 2013). I’m especially grateful to Sinead for her collaboration, to Marziah for student engagement support, and to our Media, LD and DED colleagues for the shared style guide and ongoing refinements.</p>
            </section>
            
            <Separator />

            <section id="references">
                <h3>References</h3>
                <p>
                    Buxton, B. (2007). Sketching User Experiences. Morgan Kaufmann.<br/>
                    Goodman, E., Kuniavsky, M., & Moed, A. (2012). Observing the User Experience. Elsevier.<br/>
                    Healey, M., Flint, A., & Harrington, K. (2016). Students as partners… Teaching & Learning Inquiry, 4(2).<br/>
                    McLeod, S. (2007). Hick’s Law. Simply Psychology.<br/>
                    Norman, D. (2013). The Design of Everyday Things (rev.). Basic Books.
                </p>
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
                    <p className="text-muted-foreground">Learning Designer</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Collaborators</h4>
                    <p className="text-muted-foreground">Tim Klapdor (Manager), Sinead O'Brien (Colleague), Marziah Zad (Student Engagement)</p>
                </div>
                <Separator />
                <div>
                    <h4 className="font-semibold mb-1">Tools</h4>
                    <p className="text-muted-foreground">Miro, Jira, Canvas LMS, Zoom, Google Docs/Forms, Figma</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Timeline</h4>
                    <p className="text-muted-foreground">August - October 2021 (8 weeks)</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Methods</h4>
                    <p className="text-muted-foreground">Surveys, Focus Group (Students as Partners), Workshop Facilitation</p>
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
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                     <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-center text-sm">{img.title}</p>
                    </div>
                </div>
              ))}
            </div>
      </section>

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
      <ScrollToTopButton />
    </CaseStudyLayout>
  );
}

