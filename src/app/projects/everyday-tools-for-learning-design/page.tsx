
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ExternalLink, ArrowLeft, ArrowRight, Download } from 'lucide-react';
import { ScrollToTopButton } from '@/components/scroll-to-top-button';
import { ProjectNavigation } from '@/components/project-navigation';
import { CaseStudyLayout } from '@/components/case-study-layout';
import { CaseStudyTOC } from '@/components/case-study-toc';
import { CaseStudyHeader } from '@/components/case-study-header';

const projectContent = {
  brief: `A fast, tool-rich session for designers and educators showing how everyday UX practices translate directly into online learning design (LX).`,
  context: `Part of Design For Humans—a local networking group (now disbanded). I co-presented with Tim Klapdor, where we shared our understanding of the parallels between UX design and Learning Design in a University Setting.`,
  sessionOutline: {
    uxTranslations: [
        "Information Architecture → mapping & sequencing content (right info, right time).",
        "Human–Computer Interaction → social interaction in learning (Zoom, cooperative work, divergent thinking).",
        "Interaction Design → feedback loops in quizzes/activities; immediate vs delayed feedback.",
        "Usability → effectiveness, efficiency, engagement, error-tolerance, ease of learning; orientation, familiar layouts, clear visuals, chunking.",
        "UI vs UX → consistent styles & media sizing; apply Mayer's multimedia principles on lesson pages."
    ],
    learningScience: [
        "Schema theory (connect new info to prior knowledge).",
        "Skeuomorphism as a bridge to teach new interfaces.",
        "Cognitive load (sequence, remove clutter, pace complexity)."
    ],
    everydayTools: "Canvas (LMS), H5P for interactives, Miro, Smart Storyboard, cloud docs."
  },
  slidesHighlights: [
    "IA → Mapping & Sequencing for learning.",
    "HCI in our context = human interaction around the tech.",
    "Interaction design = meaningful feedback; quizzes that teach, not just test.",
    "H5P in the LMS = quick, reusable HTML5 interactives.",
    "Usability pillars across UX & LX; chunking and primacy/recency effects.",
    "UI consistency & multimedia principles.",
    "Schema & skeuomorphism → leverage familiar cues.",
    "Cognitive load limits → design for attention."
  ],
  activity: "Rapid sketch of a lesson using learning patterns: question → acquisition → practice → reflection; map media and feedback.",
  outcome: {
    miss: "Heavy rain + limited promotion = small audience.",
    lesson: "Treat outreach as a design problem—value proposition, multi-channel promo, reminders, and a remote/recorded fallback.",
    wins: "The UX↔LX mapping and pattern library resonated; participants reported immediate applicability."
  },
  credits: "Thanks to Design For Humans for hosting (while it lasted), and Tim Klapdor for co-designing and co-presenting."
};


export default function EverydayToolsPage() {

  return (
    <CaseStudyLayout>
      <CaseStudyHeader slug="everyday-tools-for-learning-design" />
        <ProjectNavigation
            prevProject={{slug: 'h5p-student-handbook-conversion'}}
            nextProject={{slug: 'oua-design-process'}}
        />
       <header className="mb-12">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-strong mb-8">
            <Image
                src="https://i.imgur.com/WjjEOU4.jpeg"
                alt="Everyday tools for the online Learning Designer cover image"
                fill
                priority
                className="object-cover"
                data-ai-hint="learning design workshop"
            />
        </div>
        <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary dark:text-primary-foreground mb-2">
              Everyday tools for the online Learning Designer
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              A practical intro talk linking UX methods to online Learning Design (LX). We showed how to map & sequence content, design interactions, use H5P, and apply usability, schema theory and cognitive load. Attendance was low (torrential rain + light promo), which became a key lesson—great content still needs great distribution.
            </p>
            <p className="text-sm text-muted-foreground mt-2">Published: 2022-08-23 | Reading time: 3 minutes</p>
        </div>
      </header>
      
      <div className="grid lg:grid-cols-4 gap-12">
        <aside className="hidden lg:block lg:col-span-1">
          <CaseStudyTOC items={[
            { href: '#brief', label: 'Project brief' },
            { href: '#context', label: 'Context' },
            { href: '#outline', label: 'Session outline' },
            { href: '#slides-highlights', label: 'Key slides (highlights)' },
            { href: '#activity', label: 'Hands-on activity' },
            { href: '#slides', label: 'Slides' },
            { href: '#outcome', label: 'Outcome & what we learned' },
            { href: '#credits', label: 'Credits' },
          ]} />
        </aside>

        <main className="lg:col-span-2 space-y-12">
            <section id="brief">
                <h3 className="cs-h2">Project brief</h3>
                <div className="cs-callout"><p>{projectContent.brief}</p></div>
            </section>
            
            <section id="context" className="cs-section">
                <h3 className="cs-h2">Context</h3>
                <p className="text-foreground/80">{projectContent.context}</p>
            </section>
            
            <section id="outline" className="cs-section">
                <h3 className="cs-h2">Session outline</h3>
                <h4 className="font-semibold text-lg mt-4 mb-2">UX → LX translations</h4>
                 <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    {projectContent.sessionOutline.uxTranslations.map((item, i) => <li key={i}>{item}</li>)}
                 </ul>
                 <h4 className="font-semibold text-lg mt-4 mb-2">Learning science lenses</h4>
                 <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    {projectContent.sessionOutline.learningScience.map((item, i) => <li key={i}>{item}</li>)}
                 </ul>
                 <h4 className="font-semibold text-lg mt-4 mb-2">Everyday tools</h4>
                 <p className="text-foreground/80">{projectContent.sessionOutline.everydayTools}</p>
            </section>

            <section id="slides-highlights" className="cs-section">
                <h3 className="cs-h2">Key slides (highlights)</h3>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                   {projectContent.slidesHighlights.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </section>
            
            <section id="activity" className="cs-section">
                <h3 className="cs-h2">Hands-on activity</h3>
                <p className="text-foreground/80">{projectContent.activity}</p>
            </section>
            
            <section id="slides" className="cs-section">
                <h3 className="cs-h2">Slides</h3>
                <div style={{position: 'relative', width: '100%', height: 0, paddingTop: '56.2500%', paddingBottom: 0, boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)', marginTop: '1.6em', marginBottom: '0.9em', overflow: 'hidden', borderRadius: '8px', willChange: 'transform'}}>
                    <iframe loading="lazy" style={{position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, border: 'none', padding: 0, margin: 0}} src="https://www.canva.com/design/DAGyp2uRW8I/GHrwR2G0VsV6JKL_43tSAw/view?embed" allowFullScreen={true} allow="fullscreen">
                    </iframe>
                </div>
            </section>

            <section id="outcome" className="cs-section">
                <h3 className="cs-h2">Outcome & what we learned</h3>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    <li><strong>Attendance miss:</strong> {projectContent.outcome.miss}</li>
                    <li><strong>Lesson:</strong> {projectContent.outcome.lesson}</li>
                    <li><strong>Wins:</strong> {projectContent.outcome.wins}</li>
                </ul>
            </section>

            <section id="credits" className="cs-section">
                <h3 className="cs-h2">Credits</h3>
                <p className="text-foreground/80">
                    Thanks to Design For Humans for hosting (while it lasted), and <a href="https://www.linkedin.com/in/timklapdor/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Tim Klapdor</a> for co-designing and co-presenting.
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
                    <p className="text-muted-foreground">Co-presenter (content + facilitation)</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Collaborators</h4>
                    <p className="text-muted-foreground">
                        <a href="https://www.linkedin.com/in/timklapdor/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Tim Klapdor</a> — Co-presenter
                    </p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Hosts</h4>
                     <p className="text-muted-foreground">
                        <a href="https://www.linkedin.com/in/harshitha-rajashekara/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Harshitha Rajashekara</a> & <a href="https://www.linkedin.com/in/isaiashernandezb/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Isaias Hernandez</a> (Design for Humans)
                    </p>
                </div>
                <Separator />
                <div>
                    <h4 className="font-semibold mb-1">Location</h4>
                    <p className="text-muted-foreground">The University of Adelaide - Student Hub Mezzanine</p>
                </div>
            </CardContent>
          </Card>
        </aside>
      </div>

      <Card className="mt-24 text-center p-8 md:p-12">
        <h3 className="cs-h2">Interested in translating UX to LX?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Happy to walk through the workshop materials and discuss how these methods can be applied in your context.</p>
        <Button asChild>
            <Link href="/contact">Contact me</Link>
        </Button>
      </Card>
      <ScrollToTopButton />
    </CaseStudyLayout>
  );
}
