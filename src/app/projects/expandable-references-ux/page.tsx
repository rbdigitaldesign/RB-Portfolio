
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
import { ProjectNavigation } from '@/components/project-navigation';

const CaseStudyLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="container mx-auto max-w-6xl py-16 px-4">{children}</div>;
};

const projectContent = {
  overview: `In this project, I enhanced a course page by integrating an expandable 'show references' feature. This design aligns with the principle of progressive disclosure, which defers advanced or less frequently used features to secondary screens, simplifying the user interface and reducing cognitive load.`,
  problem: `The original page presented a lengthy reference list, requiring extensive scrolling and potentially overwhelming students. This layout hindered efficient navigation and detracted from the primary content.`,
  solution: `Implemented an expandable 'show references' box. This feature allows students to access references on demand, providing greater control and freedom to navigate content according to their needs. The references section is initially collapsed, displaying a link to expand. When clicked, the full list of references expands below, allowing students to view them without leaving the current page.`,
  outcome: `The integration of the expandable 'show references' feature resulted in a cleaner, more intuitive interface. Students can now focus on the main content without unnecessary distractions, and access references seamlessly when needed. This project underscores the importance of user-centred design in educational materials.`
};

const galleryImages = [
    { src: 'https://i.imgur.com/A3EW01i.png', alt: 'Before: Reference list displaying as a long list of text adding extra scrolling to students to reach the bottom navigation pages', hint: 'before references' },
    { src: 'https://i.imgur.com/BFGfSix.gif', alt: 'After: Expandable accordion in branded colours', hint: 'after references gif' }
];

export default function ExpandableReferencesPage() {
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
        <ProjectNavigation 
            prevProject={{slug: 'personal-professional-development-course-design'}}
            nextProject={{slug: 'h5p-student-handbook-conversion'}}
        />
       <header className="mb-12">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-strong mb-8">
            <Image
                src="https://i.imgur.com/AzzPhcJ.png"
                alt="Expandable references UI"
                fill
                priority
                className="object-cover"
                data-ai-hint="ui component"
            />
        </div>
        <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary dark:text-primary-foreground mb-2">
              Expandable References for Better UX
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Applying progressive disclosure to simplify UI and reduce cognitive load.
            </p>
        </div>
      </header>
      
      <div className="grid lg:grid-cols-3 gap-12">
        <main className="lg:col-span-2 space-y-12">
            <section id="overview">
                <h3 className="text-2xl font-bold font-headline mb-4">Project Overview</h3>
                <p className="text-foreground/80">{projectContent.overview}</p>
            </section>
            
            <Separator />
            
            <section id="problem">
                <h3 className="text-2xl font-bold font-headline mb-4">The Problem</h3>
                <p className="text-foreground/80">{projectContent.problem}</p>
            </section>
            
            <Separator />

            <section id="solution">
                <h3 className="text-2xl font-bold font-headline mb-4">The Solution</h3>
                 <p className="text-foreground/80">{projectContent.solution}</p>
            </section>

            <Separator />

            <section id="outcome">
                <h3 className="text-2xl font-bold font-headline mb-4">Outcome</h3>
                <p className="text-foreground/80">{projectContent.outcome}</p>
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
                    <h4 className="font-semibold mb-1">Tools</h4>
                     <p className="text-muted-foreground">LMS, CSS, HTML</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Timeline</h4>
                     <p className="text-muted-foreground">1 Week</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Principle</h4>
                     <p className="text-muted-foreground">Progressive Disclosure</p>
                </div>
            </CardContent>
          </Card>
        </aside>
      </div>

       <section id="gallery" className="mt-16">
            <h3 className="text-3xl font-bold font-headline mb-6 text-center">Gallery (Before & After)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {galleryImages.map((img, index) => (
                <div key={index} className="group relative cursor-pointer aspect-video rounded-md overflow-hidden shadow-medium transition-transform hover:scale-105"
                     onClick={() => { setSelectedIndex(index); setOpen(true); }}>
                  <Image 
                    src={img.src} 
                    alt={img.alt} 
                    fill 
                    className="object-cover"
                    data-ai-hint={img.hint}
                    sizes="(max-width: 768px) 100vw, 50vw"
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
        <h3 className="text-2xl font-bold font-headline mb-2">Interested in improving learning experiences?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">I can walk through how small UX improvements can make a big impact on student engagement.</p>
        <Button asChild>
            <Link href="/contact">Contact me</Link>
        </Button>
      </Card>
      <ScrollToTopButton />
    </CaseStudyLayout>
  );
}

    
