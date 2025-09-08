
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
import StatusNote from '@/components/StatusNote';

const CaseStudyLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="container mx-auto max-w-6xl py-16 px-4">{children}</div>;
};

const LocalTOC = () => (
  <nav className="sticky top-24">
    <h4 className="font-semibold mb-2 font-headline">On this page</h4>
    <ul className="space-y-2 text-sm text-muted-foreground">
      <li><a href="#context" className="hover:text-primary">Context / Problem</a></li>
      <li><a href="#objectives" className="hover:text-primary">Objectives</a></li>
      <li><a href="#approach" className="hover:text-primary">Approach</a></li>
      <li><a href="#solution" className="hover:text-primary">The Solution</a></li>
      <li><a href="#outcome" className="hover:text-primary">Outcome / Impact</a></li>
      <li><a href="#gallery" className="hover:text-primary">Gallery</a></li>
      <li><a href="#acknowledgements" className="hover:text-primary">Acknowledgements</a></li>
    </ul>
  </nav>
);

const projectContent = {
  summary: `Academics Cristian and Han needed their 49-page PDF handbook transformed into a modern, navigable, student-friendly digital version. I designed and built an H5P framework that removed tutor-only content, reduced cognitive load, and re-structured information into accessible, interactive components.`,
  context: `The original handbook existed only as a 49-page PDF. Students had to hunt through dense pages, and tutor-only guidance appeared alongside student information—adding confusion and unnecessary cognitive load. The request: convert the handbook to a streamlined H5P experience that modernises presentation, improves navigation, and removes extraneous content.`,
  objectives: [
    `Modernise the format: Move from static PDF to interactive H5P.`,
    `Reduce cognitive load: Remove tutor-only content and clutter.`,
    `Improve navigation: Chunk content, add in-module navigation, and consistent structure.`
  ],
  approach: {
      backstory: `I created the initial H5P framework in my sandpit and began transferring content from the PDF. Cristian annotated the PDF with clear red mark-ups indicating what could be safely removed, which guided the scope of the build. After the prototype was ready, I engaged the Casual Course Builders in the Media Team to help complete content import and implement Cristian’s final change requests.`,
      contentModel: `Converted long passages into tables, accordions, and course presentations for scannability. Designed a left-panel navigation and in-page buttons to support quick movement across sections. Cleaned, grouped, and re-ordered content so each page focused on a single, memorable purpose.`
  },
  solution: [
    { title: 'Final Deliverable', description: 'A 10-page H5P handbook that replaces the 49-page PDF.' },
    { title: 'Structure', description: 'Clearly chunked sections, left-hand navigation, and consistent page patterns.' },
    { title: 'Formatting', description: 'Dense text refactored into tables, slides, and accordions to aid comprehension.' },
    { title: 'Clarity', description: 'Tutor-only content removed from student views to minimise distraction and confusion.' },
  ],
  outcome: [
      `Navigation time reduced by consolidating content and adding clear wayfinding.`,
      `Lower cognitive load through removal of extraneous/tutor-only info.`,
      `Better maintainability: structured, reusable H5P content patterns for future updates.`
  ],
  acknowledgements: `Thanks to Cristian and Han for decisively marking the source PDF and to the Casual Course Builders in the Media Team for completing the import and polishing changes.`
};

const galleryImages = [
    { src: 'https://i.imgur.com/2Ie7z5X.png', alt: 'Original home page of PDF Handbook', hint: 'pdf handbook' },
    { src: 'https://i.imgur.com/Y28Rk3v.png', alt: 'Information to be removed from the handbook', hint: 'pdf markup' },
    { src: 'https://i.imgur.com/ep9cvc6.png', alt: 'Cristian marked up pages clearly to show extraneous info', hint: 'pdf annotation' },
    { src: 'https://i.imgur.com/8YZX6s4.png', alt: 'New home page of H5P Handbook', hint: 'h5p handbook' },
    { src: 'https://i.imgur.com/BYnoct8.png', alt: 'Clear navigation of the handbook on the left panel', hint: 'h5p navigation' },
    { src: 'https://i.imgur.com/OQke1Gj.png', alt: 'Course Objectives in a table layout', hint: 'h5p table' },
    { src: 'https://i.imgur.com/clKuy35.png', alt: 'Course presentation within the handbook', hint: 'h5p presentation' },
];

export default function H5PStudentHandbookConversionPage() {
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
            prevProject={{slug: 'expandable-references-ux'}}
            nextProject={{slug: 'tux-for-learning-design'}}
        />
       <header className="mb-12">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-strong mb-8">
            <Image
                src="https://i.imgur.com/8YZX6s4.png"
                alt="H5P Student Handbook Conversion cover image"
                fill
                priority
                className="object-cover"
                data-ai-hint="h5p interactive handbook"
            />
        </div>
        <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary dark:text-primary-foreground mb-2">
              H5P Student Handbook Conversion
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              From a 49-page PDF to a clear, 10-page interactive handbook
            </p>
             <p className="text-muted-foreground max-w-3xl mx-auto mt-4">{projectContent.summary}</p>
        </div>
         <StatusNote>
            This case study focuses on collaboration and content design within H5P. Screens reflect an internal course build and may differ from public-facing materials.
        </StatusNote>
      </header>
      
      <div className="grid lg:grid-cols-4 gap-12">
        <aside className="hidden lg:block lg:col-span-1">
          <LocalTOC />
        </aside>

        <main className="lg:col-span-2 space-y-12">
            <section id="context">
                <h3 className="text-2xl font-bold font-headline mb-4">Context / Problem</h3>
                <p className="text-foreground/80">{projectContent.context}</p>
            </section>
            
            <Separator />
            
            <section id="objectives">
                <h3 className="text-2xl font-bold font-headline mb-4">Objectives</h3>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                   {projectContent.objectives.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </section>
            
            <Separator />

            <section id="approach">
                <h3 className="text-2xl font-bold font-headline mb-4">Approach</h3>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-bold font-headline text-lg">Backstory & collaboration</h4>
                        <p className="text-foreground/80">{projectContent.approach.backstory}</p>
                    </div>
                    <div>
                        <h4 className="font-bold font-headline text-lg">Content model & interaction design</h4>
                        <p className="text-foreground/80">{projectContent.approach.contentModel}</p>
                    </div>
                </div>
            </section>
            
            <Separator />

            <section id="solution">
                <h3 className="text-2xl font-bold font-headline mb-4">The Solution</h3>
                <ul className="list-disc list-outside space-y-4 pl-5 text-foreground/80">
                   {projectContent.solution.map((item, i) => 
                     <li key={i}>
                        <strong className="font-semibold text-foreground">{item.title}</strong> — {item.description}
                     </li>
                   )}
                </ul>
            </section>

            <Separator />

            <section id="outcome">
                <h3 className="text-2xl font-bold font-headline mb-4">Outcome / Impact</h3>
                 <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    {projectContent.outcome.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </section>

            <Separator />

             <section id="acknowledgements">
                <h3 className="text-2xl font-bold font-headline mb-4">Acknowledgements</h3>
                <p className="text-foreground/80">{projectContent.acknowledgements}</p>
            </section>
        </main>
        
        <aside className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Project Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                 <div>
                    <h4 className="font-semibold mb-1">Courses</h4>
                    <p className="text-muted-foreground">Advanced Plant, Food and Soil Sciences; Honours Plant, Food and Soil Sciences Project</p>
                </div>
                <Separator />
                <div>
                    <h4 className="font-semibold mb-1">Role</h4>
                    <p className="text-muted-foreground">UX lead, content architect, H5P builder</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Collaborators</h4>
                     <p className="text-muted-foreground">Cristian (academic), Han (academic), Casual Course Builders (Media Team)</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Tools</h4>
                     <p className="text-muted-foreground">H5P (Course Presentation, Accordion, Table), Canvas LMS, PDF mark-up</p>
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

      <Card className="mt-24 text-center p-8 md:p-12">
        <h3 className="text-2xl font-bold font-headline mb-2">Want to transform static documents into interactive experiences?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">I can walk through the content strategy and H5P authoring process used in this project.</p>
        <Button asChild>
            <Link href="/contact">Contact me</Link>
        </Button>
      </Card>
      <ScrollToTopButton />
    </CaseStudyLayout>
  );
}
