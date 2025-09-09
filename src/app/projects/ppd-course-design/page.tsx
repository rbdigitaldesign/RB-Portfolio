
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
      <li><a href="#intro" className="hover:text-primary">Project scope & tools</a></li>
      <li><a href="#team" className="hover:text-primary">Team & timeline</a></li>
      <li><a href="#process" className="hover:text-primary">Process overview</a></li>
      <li><a href="#alignment" className="hover:text-primary">Constructive alignment</a></li>
      <li><a href="#concept_map" className="hover:text-primary">Concept map</a></li>
      <li><a href="#artefacts" className="hover:text-primary">Key design artefacts (PPD cycle)</a></li>
      <li><a href="#personas" className="hover:text-primary">Personas & narrative</a></li>
      <li><a href="#ux_copy" className="hover:text-primary">UX copy & student resources</a></li>
      <li><a href="#visual_concepts" className="hover:text-primary">Visual concepts (Maslow)</a></li>
      <li><a href="#presentations" className="hover:text-primary">Presentations (embedded)</a></li>
      <li><a href="#assessments" className="hover:text-primary">Assessment exemplars</a></li>
      <li><a href="#visualising_data" className="hover:text-primary">Visualising data</a></li>
      <li><a href="#gallery" className="hover:text-primary">Gallery</a></li>
      <li><a href="#references" className="hover:text-primary">References</a></li>
    </ul>
  </nav>
);

const galleryImages = [
    { src: 'https://i.imgur.com/d7AFaMh.jpeg', alt: 'Planning board for 12 weeks', title: '12-week alignment board' },
    { src: 'https://i.imgur.com/WRbjIbv.jpeg', alt: 'Concept map of course structure', title: 'Concept map' },
    { src: 'https://i.imgur.com/xrDvepw.png', alt: 'Early circular sketch', title: 'PPD cycle — initial sketch' },
    { src: 'https://i.imgur.com/O96zrC2.png', alt: 'Mocked cycle diagram', title: 'PPD cycle — mock with branding' },
    { src: 'https://i.imgur.com/V6n9uM5.gif', alt: 'Animated PPD cycle', title: 'PPD cycle — animated final' },
    { src: 'https://i.imgur.com/ZmlHyvo.jpeg', alt: 'Three emotional journey maps', title: 'Emotional journey maps' },
    { src: 'https://i.imgur.com/csdmzNv.jpeg', alt: 'Two journey maps final', title: 'Sarah & Alex journeys' },
    { src: 'https://i.imgur.com/mJf5gtS.png', alt: 'Persona overview styled to UoA', title: 'Persona overview' },
    { src: 'https://i.imgur.com/wZ7uEQO.png', alt: 'Resources framing card', title: 'UX copy — resources' },
    { src: 'https://i.imgur.com/8T0yIKx.png', alt: 'Minimal hierarchy graphic', title: 'Maslow visual' },
    { src: 'https://i.imgur.com/3fajjWX.jpeg', alt: 'Slide visual preview', title: 'Professionalism mini-deck' },
    { src: 'https://i.imgur.com/jeu3Z5y.jpeg', alt: 'Portfolio support materials', title: 'Assessment exemplar' },
    { src: 'https://i.imgur.com/Ye3mdd6.png', alt: 'Raw text sample', title: 'Pre-visualisation copy' },
    { src: 'https://i.imgur.com/nfzOA70.png', alt: 'Final visualised content', title: 'Inclusion infographic' },
];

export default function PpdCourseDesignPage() {
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
            prevProject={{slug: 'redesigning-course-orientation'}}
            nextProject={{slug: 'expandable-references-ux'}}
        />
       <header className="mb-12">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-strong mb-8">
            <Image
                src="https://i.imgur.com/y42LS7F.jpeg"
                alt="12-week course planning board showing assessments, knowledge and weekly tasks"
                fill
                priority
                className="object-cover"
                data-ai-hint="learning design planning"
            />
        </div>
        <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary dark:text-primary-foreground mb-2">
              Personal Professional Development — Course Design (ENTREP1002)
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              A full design and build of ENTREP1002 Personal Professional Development: aligning outcomes, assessments and weekly learning to help students form a professional identity and portfolio.
            </p>
            <p className="text-sm text-muted-foreground mt-2">Estimated reading time: 7 minutes</p>
             <div className="mt-4 text-center text-muted-foreground">
              <Badge>Course design</Badge> <Badge>Constructive alignment</Badge> <Badge>UX writing</Badge>
            </div>
        </div>
      </header>
      
      <div className="grid lg:grid-cols-4 gap-12">
        <aside className="hidden lg:block lg:col-span-1">
          <LocalTOC />
        </aside>

        <main className="lg:col-span-2 space-y-12">
            <section id="intro">
                <h3 className="text-2xl font-bold font-headline mb-4">Project scope & tools</h3>
                 <p className="text-foreground/80 mb-4">
                    The Personal Professional Development course equips students with practical professional skills and a strong sense of professional identity. It blends theory with application so learners can navigate ethics, build personal learning ecosystems, and work cooperatively.
                </p>
                <h4 className="font-semibold mb-2">Tools</h4>
                <p className="text-muted-foreground">Canva · Canvas (LMS) · Zoom</p>
            </section>
            
            <Separator />
            
            <section id="team">
                <h3 className="text-2xl font-bold font-headline mb-4">Team & timeline</h3>
                 <p className="text-foreground/80">
                    <strong>Course Authors</strong> — Stella Bachtis, Rea Bachtis<br/>
                    <strong>Learning Designers</strong> — Andrew Beatton, Richard Bartlett, Danielle Rhianna Lemieux, Tim Klapdor<br/>
                    <strong>Media Team</strong> — Aaron Honson, Michael Brockhouse<br/><br/>
                    <strong>Timeline</strong> — August 2021 → March 2022
                </p>
            </section>

            <Separator />

            <section id="process">
                <h3 className="text-2xl font-bold font-headline mb-4">Process overview</h3>
                 <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    <li>Course alignment</li>
                    <li>PPD personas</li>
                    <li>UX copywriting</li>
                    <li>Assessment exemplars</li>
                    <li>Visualising data</li>
                    <li>Polish & publish in Canvas</li>
                </ul>
            </section>
            
            <Separator />

            <section id="alignment">
                <h3 className="text-2xl font-bold font-headline mb-4">Constructive alignment</h3>
                <p className="text-foreground/80">We began with a full constructive alignment pass—mapping outcomes to assessments, weekly activities and resources across 12 weeks.</p>
                <Image src="https://i.imgur.com/d7AFaMh.jpeg" alt="12-week PPD planning board: outcomes, assessments and weekly tasks" width={800} height={450} className="mt-4 rounded-lg shadow-md" />
                <p className="text-foreground/80 mt-4">Assessments scaffold into a final portfolio that evidences growth and readiness for the business environment. A week-by-week guide clarifies expectations and milestones. Design was iteratively refined via stakeholder feedback and collaboration.</p>
            </section>
            
            <Separator />
            
            <section id="concept_map">
                <h3 className="text-2xl font-bold font-headline mb-4">Concept map</h3>
                <p className="text-foreground/80">The initial planning board was distilled into a concept map—a navigable, student-friendly visual that keeps the structure obvious and the journey clear.</p>
                <Image src="https://i.imgur.com/WRbjIbv.jpeg" alt="Concept map simplifying the PPD course structure for students" width={800} height={450} className="mt-4 rounded-lg shadow-md" />
                <p className="text-foreground/80 mt-4">The map emphasises hierarchy, colour and flow so learners can see how topics connect and where they’re heading each week.</p>
            </section>

            <Separator />

            <section id="artefacts">
                <h3 className="text-2xl font-bold font-headline mb-4">Key design artefacts — the PPD cycle</h3>
                <p className="text-foreground/80">Lesson 1.1 introduces the Personal Professional Development cycle that frames the course. We evolved it from sketch → mock → animated final, in partnership with the media team.</p>
                <div className="ppd-cycle-trio my-4">
                    <Image src="https://i.imgur.com/xrDvepw.png" alt="Initial circular sketch of the PPD cycle" width={300} height={300} className="rounded-lg shadow-md" />
                    <Image src="https://i.imgur.com/O96zrC2.png" alt="Mock with University branding and clearer labels" width={300} height={300} className="rounded-lg shadow-md" />
                    <Image src="https://i.imgur.com/V6n9uM5.gif" alt="Finalised animated PPD cycle with distinct colour steps" width={300} height={300} className="rounded-lg shadow-md" />
                </div>
                <p className="text-foreground/80">The final chooses distinct colours for each step (rather than UoA palette) to emphasise differences and aid recall.</p>
            </section>
            
            <Separator />
            
            <section id="personas">
                <h3 className="text-2xl font-bold font-headline mb-4">Personas & narrative</h3>
                <p className="text-foreground/80">Story drives memory (Simmons, 2006), so we embedded a light narrative through two personas—Sarah and Alex—inspired by 16personalities MBTI patterns. Students follow their choices across Determine → Develop → Grow → Reflect → Apply and map their own growth alongside.</p>
                <Image src="https://i.imgur.com/ZmlHyvo.jpeg" alt="Three emotional journey maps showing highs and lows across the PPD journey" width={800} height={450} className="mt-4 rounded-lg shadow-md" />
                <Image src="https://i.imgur.com/csdmzNv.jpeg" alt="Sarah and Alex: final journey maps across five stages" width={800} height={450} className="mt-4 rounded-lg shadow-md" />
                <Image src="https://i.imgur.com/mJf5gtS.png" alt="Persona overview styled to UoA branding" width={800} height={450} className="mt-4 rounded-lg shadow-md" />
                <p className="text-foreground/80 mt-4">Inclusivity note: we used gender-neutral language and AI-assisted imagery to reflect diverse identities.</p>
            </section>

            <Separator />

            <section id="ux_copy">
                <h3 className="text-2xl font-bold font-headline mb-4">UX copy & student resources</h3>
                <p className="text-foreground/80">We wrote UX copy to make optional resources feel invitational, not remedial—“Dive into PPD with selected reads that mirror the diversity and potential of your personal growth journey.”</p>
                <Image src="https://i.imgur.com/wZ7uEQO.png" alt="Student resources card and framing copy" width={800} height={450} className="mt-4 rounded-lg shadow-md" />
                <p className="text-foreground/80 mt-4">Each resource has a short overview so learners can decide quickly what’s useful and why it matters to their goals.</p>
            </section>
            
            <Separator />

            <section id="visual_concepts">
                <h3 className="text-2xl font-bold font-headline mb-4">Visual concepts — Maslow’s hierarchy</h3>
                <p className="text-foreground/80">To reduce cognitive load, we translated text-heavy theory into concise visuals. Example: Maslow’s hierarchy, using a calm monochrome palette and simple icons for fast scanning.</p>
                <Image src="https://i.imgur.com/8T0yIKx.png" alt="Minimal, icon-based Maslow hierarchy for quick comprehension" width={800} height={450} className="mt-4 rounded-lg shadow-md" />
            </section>

            <Separator />

            <section id="presentations">
                <h3 className="text-2xl font-bold font-headline mb-4">Presentations (embedded)</h3>
                <p className="text-foreground/80">We also built mini-presentations inside the LMS for targeted lessons—e.g., Professionalism (respect, dress, punctuality, time management).</p>
                <Image src="https://i.imgur.com/3fajjWX.jpeg" alt="Professionalism mini-deck visual" width={800} height={450} className="mt-4 rounded-lg shadow-md" />
                <div style={{position: 'relative', width: '100%', height: 0, paddingTop: '56.25%', boxShadow: '0 2px 8px rgba(63,69,81,0.16)', marginTop: '1.2em', borderRadius: '8px', overflow: 'hidden'}}>
                    <iframe loading="lazy" style={{position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, border: 0}} src="https://www.canva.com/design/DAGF_2MTSus/L-uWgBF1JtKAwcVYdVItbw/view?embed" allowFullScreen></iframe>
                </div>
                <p className="mt-2"><a href="https://www.canva.com/design/DAGF_2MTSus/L-uWgBF1JtKAwcVYdVItbw/view?utm_content=DAGF_2MTSus&utm_campaign=designshare&utm_medium=embeds&utm_source=link" target="_blank" rel="noopener" className="text-primary hover:underline">Open the full presentation</a></p>
            </section>
            
            <Separator />

            <section id="assessments">
                <h3 className="text-2xl font-bold font-headline mb-4">Assessment exemplars</h3>
                <p className="text-foreground/80">Assessments build to a professional portfolio in Microsoft Sway. We supplied:<br/>a branded banner,<br/>step-by-step guidance and links,<br/>a duplicate-ready Sway template so students focus on content—not layout.</p>
                <Image src="https://i.imgur.com/jeu3Z5y.jpeg" alt="Assessment exemplar materials for building a Sway portfolio" width={800} height={450} className="mt-4 rounded-lg shadow-md" />
            </section>

            <Separator />
            
            <section id="visualising_data">
                <h3 className="text-2xl font-bold font-headline mb-4">Visualising data & inclusion content</h3>
                <p className="text-foreground/80">We transformed raw copy on diversity and inclusion into scannable graphs/infographics with the media team—improving comprehension and retention.</p>
                <Image src="https://i.imgur.com/Ye3mdd6.png" alt="Raw text prior to visual uplift" width={800} height={450} className="mt-4 rounded-lg shadow-md" />
                <Image src="https://i.imgur.com/nfzOA70.png" alt="Final infographic and graph set used in the LMS" width={800} height={450} className="mt-4 rounded-lg shadow-md" />
            </section>

            <Separator />

             <section id="references">
                <h3 className="text-2xl font-bold font-headline mb-4">References</h3>
                <p className="text-foreground/80">Simmons, A. (2006). The Story Factor: Inspiration, Influence and Persuasion Through the Art of Storytelling. Basic Books.</p>
            </section>
        </main>
        
        <aside className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Quick Facts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                <section id="intro">
                    <h4 className="font-semibold mb-1">Scope</h4>
                    <p className="text-muted-foreground">The Personal Professional Development course equips students with practical professional skills and a strong sense of professional identity. It blends theory with application so learners can navigate ethics, build personal learning ecosystems, and work cooperatively.</p>
                </section>
                <Separator />
                 <section id="tools">
                    <h4 className="font-semibold mb-1">Tools</h4>
                    <p className="text-muted-foreground">Canva, Canvas (LMS), Zoom</p>
                </section>
                <Separator />
                <section id="team">
                    <h4 className="font-semibold mb-1">Team & Timeline</h4>
                    <p className="text-muted-foreground">
                        <strong>Authors:</strong> Stella Bachtis, Rea Bachtis<br/>
                        <strong>Designers:</strong> Andrew Beatton, Richard Bartlett, Danielle Rhianna Lemieux, Tim Klapdor<br/>
                        <strong>Media:</strong> Aaron Honson, Michael Brockhouse<br/>
                        <strong>Timeline:</strong> August 2021 → March 2022
                    </p>
                </section>
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
                    data-ai-hint="design artifact"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                     <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-center text-sm">{img.title}</p>
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
        <h3 className="text-2xl font-bold font-headline mb-2">Need help translating complex ideas into engaging learning?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">I can walk through the process of designing learner-centric educational experiences.</p>
        <Button asChild>
            <Link href="/contact">Contact me</Link>
        </Button>
      </Card>
      <ScrollToTopButton />
    </CaseStudyLayout>
  );
}
