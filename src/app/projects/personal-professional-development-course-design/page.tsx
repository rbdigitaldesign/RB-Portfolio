
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ExternalLink, Quote } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollToTopButton } from '@/components/scroll-to-top-button';

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
      <li><a href="#design-process" className="hover:text-primary">Design process</a></li>
      <li><a href="#personas" className="hover:text-primary">Persona integration</a></li>
      <li><a href="#artefacts" className="hover:text-primary">Key artefacts</a></li>
      <li><a href="#outcomes" className="hover:text-primary">Outcomes</a></li>
    </ul>
  </nav>
);

const projectContent = {
  brief: `Design and develop a structured online course for the University of Adelaide to equip students with a comprehensive set of professional skills. The course needed to blend theoretical knowledge with practical application, covering professional identity, ethical challenges, and cooperative learning.`,
  problem: `The primary challenge was to synthesise a wide range of abstract professional development concepts and academic requirements into a single, coherent, and engaging 12-week online course. The learning journey had to be logical, practical, and cater to a diverse student body.`,
  solution: [
    `A structured 12-week curriculum with clear weekly themes and milestones.`,
    `Narrative-driven learning using two distinct student personas (Alex and Sarah) to make concepts relatable.`,
    `Iteratively designed visual aids, concept maps, and animations to simplify complex ideas.`,
    `Scaffolded assessments culminating in a practical professional portfolio.`,
    `A curated set of supplementary resources to encourage deeper, self-directed learning.`
  ],
  designProcess: {
      discovery: `The project began with collaborative brainstorming sessions with academics and stakeholders to map out ideas, tasks, and pedagogical strategies on a Miro board, forming a rich repository for the course structure.`,
      synthesis: `This initial brain dump was then distilled into a streamlined concept map. This iteration simplified the course overview, making it more intuitive and user-friendly for both educators and students.`,
      prototyping: `Key concepts, like the PPD cycle, were sketched in Canva, then developed into branded mock-ups with animated components. This allowed for rapid feedback from the course authors before final production by the media team.`,
      development: `Working with the media team, we transformed concepts and text-based content into polished, engaging learning materials, including animations, infographics, and interactive presentations within the Canvas LMS.`
  },
  personas: {
      narrative: `To make the learning experience more memorable and personal, we created two personas, Alex and Sarah, based on the MBTI framework. Their distinct journeys of professional growth provide a narrative thread that connects the course modules and helps students see reflections of their own development paths.`,
      inclusion: `To ensure all students feel represented, gender-neutral language and AI-generated imagery were used in portraying the personas, fostering an inclusive learning environment.`
  },
  outcomes: `The result is a comprehensive and pedagogically sound online course that guides students through a transformative learning journey. The course successfully translates abstract professional theories into practical skills through its structured content, engaging narrative, and visually compelling learning artefacts. It provides a clear pathway for students to build a professional portfolio and develop their own professional identity.`
};

const galleryImages = [
    { src: 'https://placehold.co/1200x800.png', alt: 'Initial brain dump of the course structure on a Miro board.', hint: 'miro board planning' },
    { src: 'https://placehold.co/1200x800.png', alt: 'A refined concept map showing the 12-week course overview.', hint: 'concept map diagram' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Final animated PPD cycle design, showing steps of professional development.', hint: 'animation diagram' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Persona poster for "Sarah" showing her personality traits and journey.', hint: 'persona document' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Emotional journey maps for the two personas, Alex and Sarah.', hint: 'journey map diagram' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Visualisation of Maslow\'s hierarchy of needs, designed for the course.', hint: 'diagram infographic' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Example of a presentation slide on professionalism designed in Canva.', hint: 'presentation slide' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Screenshot of the diversity and inclusion module in the LMS, showing infographics.', hint: 'lms screenshot' },
];

function calculateReadingTime(text: string) {
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
}

export default function PersonalDevelopmentProjectPage() {
  const allText = Object.values(projectContent).flat().map(i => typeof i === 'object' ? Object.values(i) : i).flat().join(' ');
  const readingTime = calculateReadingTime(allText);

  return (
    <CaseStudyLayout>
       <header className="mb-12">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-strong mb-8">
            <Image
                src="https://placehold.co/1200x675.png"
                alt="A collage of learning design artefacts including concept maps, personas, and diagrams."
                fill
                priority
                className="object-cover"
                data-ai-hint="learning design collage"
            />
        </div>
        <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary dark:text-primary-foreground mb-2">
              Personal Professional Development Course Design
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Crafting a comprehensive online learning journey for university students
            </p>
            <p className="text-sm text-muted-foreground mt-2">Estimated reading time: {readingTime} minutes</p>
        </div>
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
                 <p className="text-foreground/80">{projectContent.problem}</p>
            </section>
            
            <Separator />

            <section id="solution">
                <h3 className="text-2xl font-bold font-headline mb-4">The solution</h3>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                   {projectContent.solution.map((item, i) => 
                     <li key={i} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                   )}
                </ul>
            </section>

            <Separator />

            <section id="design-process">
                <h3 className="text-2xl font-bold font-headline mb-4">Design process</h3>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-bold font-headline text-lg">Discovery & Ideation</h4>
                        <p className="text-foreground/80">{projectContent.designProcess.discovery}</p>
                    </div>
                    <div>
                        <h4 className="font-bold font-headline text-lg">Synthesis & Simplification</h4>
                        <p className="text-foreground/80">{projectContent.designProcess.synthesis}</p>
                    </div>
                    <div>
                        <h4 className="font-bold font-headline text-lg">Prototyping & Iteration</h4>
                        <p className="text-foreground/80">{projectContent.designProcess.prototyping}</p>
                    </div>
                     <div>
                        <h4 className="font-bold font-headline text-lg">Collaborative Development</h4>
                        <p className="text-foreground/80">{projectContent.designProcess.development}</p>
                    </div>
                </div>
            </section>

            <Separator />

            <section id="personas">
                <h3 className="text-2xl font-bold font-headline mb-4">Persona integration</h3>
                 <div>
                    <h4 className="font-bold font-headline text-lg">A Narrative-Driven Experience</h4>
                    <p className="text-foreground/80 mb-2">{projectContent.personas.narrative}</p>
                </div>
                <div>
                    <h4 className="font-bold font-headline text-lg">Gender Inclusivity</h4>
                    <p className="text-foreground/80">{projectContent.personas.inclusion}</p>
                </div>
            </section>
            
            <Separator />

             <section id="artefacts">
                <h3 className="text-2xl font-bold font-headline mb-4">Key artefacts</h3>
                 <p className="text-foreground/80 mb-6">The gallery below showcases some of the key design artefacts created during the project, from initial brainstorming to final visualisations and learning resources.</p>
                 <Button variant="outline" asChild>
                    <Link href="#gallery">View Gallery</Link>
                </Button>
            </section>

            <Separator />
            
            <section id="outcomes">
                <h3 className="text-2xl font-bold font-headline mb-4">Outcomes</h3>
                <p className="text-foreground/80">{projectContent.outcomes}</p>
            </section>

        </main>
        
        <aside className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Quick facts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                <div>
                    <h4 className="font-semibold mb-1">Project</h4>
                    <p className="text-muted-foreground">Personal Professional Development Course</p>
                </div>
                <Separator />
                <div>
                    <h4 className="font-semibold mb-1">Team</h4>
                    <p className="text-muted-foreground">Course Authors, Learning Designers, Media Team</p>
                </div>
                 <Separator />
                <div>
                    <h4 className="font-semibold mb-1">Role</h4>
                    <p className="text-muted-foreground">Learning Designer</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Tools</h4>
                     <p className="text-muted-foreground">Canva, Canvas (LMS), Zoom, Google Docs</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Timeline</h4>
                     <p className="text-muted-foreground">August 2021 – March 2022</p>
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
        <h3 className="text-2xl font-bold font-headline mb-2">Need help translating complex ideas into engaging learning?</h3>
        <p className="text-muted-foreground mb-6">I can walk you through the process of designing learner-centric educational experiences.</p>
        <Button asChild>
            <Link href="/contact">Contact me</Link>
        </Button>
      </footer>
      <ScrollToTopButton />
    </CaseStudyLayout>
  );
}
