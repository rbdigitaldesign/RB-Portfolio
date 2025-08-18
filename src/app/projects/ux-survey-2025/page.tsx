
'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ExternalLink, Download } from 'lucide-react';
import { ScrollToTopButton } from '@/components/scroll-to-top-button';

const CaseStudyLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="container mx-auto max-w-6xl py-16 px-4">{children}</div>;
};

const LocalTOC = () => (
  <nav className="sticky top-24">
    <h4 className="font-semibold mb-2 font-headline">On this page</h4>
    <ul className="space-y-2 text-sm text-muted-foreground">
      <li><a href="#overview" className="hover:text-primary">Project overview</a></li>
      <li><a href="#method" className="hover:text-primary">Method</a></li>
      <li><a href="#findings" className="hover:text-primary">Key findings</a></li>
      <li><a href="#implications" className="hover:text-primary">Implications</a></li>
      <li><a href="#outreach" className="hover:text-primary">Outreach status</a></li>
      <li><a href="#artefacts" className="hover:text-primary">Artefacts</a></li>
    </ul>
  </nav>
);

const projectContent = {
  overview: `A pulse check was needed to understand current UX practices, confidence levels, and barriers among learning designers to better inform capability support and platform choices.`,
  method: {
    live: 'A live poll was run using Mentimeter during the LEI division meeting. Questions allowed for multi-select answers to capture a broad range of practices.',
    followup: 'An identical survey was created in Jotform and shared with colleagues at the Teaching Innovation Unit (TIU) at UniSA for asynchronous participation.',
    note: 'Note: Multi-select questions mean that total responses can exceed the number of participants.'
  },
  findings: [
    `UX practices used (multi-select): user interviews 20; surveys/feedback forms 29; student journey mapping 18; personas/empathy maps 17; wireframes/prototypes 33; card sorting/tree testing 6; none 3.`,
    `Confidence applying UX: average 3.35/5.`,
    `Experience: haven’t thought about using ux 1; understand value but don’t apply 0; would like to incorporate 9; sometimes apply informally 22; actively use methods/tools 11.`,
    `Interest in learning more: average 4.85/5.`,
    `Support preferences (multi-select): workshops/events 28; a ux knowledge base 24; exemplars/case studies 28; 1:1 support 12; short video explainers 17.`,
    `Barriers (multi-select): time constraints 31; lack of training 15; limited tools/resources 22; team/academic resistance 19; don’t know where to start 13; none 3.`,
    `Preferred platform for future resources: canvas course 29; dedicated website 6; confluence 3; pdfs 3; other 2.`,
    `Open-ended themes: interest in recognised upskilling/certificates; access to paid resources; exemplars and baseline quality standards; earlier usability testing; small-group training; “fewer clicks”; leadership awareness that ux testing is longer and continuous; encode best practices in course templates; helpful link shared (nngroup.com/articles/).`,
    `Interview volunteers: Tamika Glouftsis; Michelle Riggs; Yashi Renoir; Haley Timms; Jeremy Bowtell.`
  ],
  implications: [
    'Prioritise canvas as the preferred delivery platform for future ux-for-learning resources.',
    'Sequence support as: workshops + exemplars first, then a knowledge base, with short explainers and optional 1:1s.',
    'Design around time constraints; provide lightweight, start-here pathways.',
    'Plan for ongoing usability testing and leadership comms about cadence/effort.',
    'Schedule interviews with volunteers; consider micro-credentials.'
  ],
  outreach: `The Jotform survey was distributed to TIU colleagues at UniSA post-session. The results are pending and will be appended to this study once available.`
};

const galleryImages = [
    { src: 'https://i.imgur.com/5UV2LHM.png', alt: 'Division meeting slide showing the live UX poll title', hint: 'live poll title' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Summary chart of key survey categories from the live poll', hint: 'results overview' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Bar chart highlighting Canvas as the preferred platform', hint: 'platform preference' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Chart showing workshops and exemplars as top support formats', hint: 'support preferences' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Bar chart with time constraints as the leading barrier', hint: 'barriers chart' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Redacted list indicating colleagues who volunteered for interviews', hint: 'volunteer list' },
];

export default function UxSurveyCaseStudyPage() {
  return (
    <CaseStudyLayout>
       <header className="mb-12">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-strong mb-8">
            <Image
                src="https://i.imgur.com/5UV2LHM.png"
                alt="Live poll results projected to colleagues during a division meeting"
                fill
                priority
                className="object-cover"
                data-ai-hint="live poll results"
            />
        </div>
        <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary dark:text-primary-foreground mb-2">
              UX Survey of Learning Design Practice — LEI & TIU 2025
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              A quick pulse on practices, confidence, barriers, and platform preferences
            </p>
        </div>
      </header>
      
      <div className="grid lg:grid-cols-4 gap-12">
        <aside className="hidden lg:block lg:col-span-1">
          <LocalTOC />
        </aside>

        <main className="lg:col-span-2 space-y-12">
            <section id="overview">
                <h3 className="text-2xl font-bold font-headline mb-4">Project overview</h3>
                <p className="text-foreground/80">{projectContent.overview}</p>
            </section>
            
            <Separator />
            
            <section id="method">
                <h3 className="text-2xl font-bold font-headline mb-4">Method</h3>
                 <div className="space-y-4 text-foreground/80">
                    <div>
                        <h4 className="font-bold font-headline text-lg">Live Poll (LEI)</h4>
                        <p>{projectContent.method.live}</p>
                    </div>
                    <div>
                        <h4 className="font-bold font-headline text-lg">Follow-up (TIU)</h4>
                        <p>{projectContent.method.followup}</p>
                    </div>
                     <p className="text-sm text-muted-foreground">{projectContent.method.note}</p>
                </div>
            </section>
            
            <Separator />

            <section id="findings">
                <h3 className="text-2xl font-bold font-headline mb-4">Key findings (LEI results)</h3>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                   {projectContent.findings.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </section>

            <Separator />

            <section id="implications">
                <h3 className="text-2xl font-bold font-headline mb-4">Implications</h3>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                   {projectContent.implications.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </section>

             <Separator />

            <section id="outreach">
                <h3 className="text-2xl font-bold font-headline mb-4">Outreach status (TIU, UniSA)</h3>
                <p className="text-foreground/80">{projectContent.outreach}</p>
            </section>

            <Separator />

            <section id="artefacts">
                <h3 className="text-2xl font-bold font-headline mb-4">Artefacts</h3>
                 <div className="flex flex-wrap gap-4">
                    <Button asChild>
                        <a href="https://www.mentimeter.com/app/presentation/alg5s77uqr8xh113fecfb2cs8uumqze3/view?utm_source=govote&utm_medium=button&question=eeuuvpei44wt" target="_blank" rel="noopener noreferrer">
                            View Mentimeter Deck <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                    </Button>
                    <Button asChild variant="outline">
                        <a href="https://drive.google.com/file/d/1SHFHjdnFacnZ7lhXnHeI2uZXb4pprd9S/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                            <Download className="mr-2 h-4 w-4" /> Download Survey (PDF)
                        </a>
                    </Button>
                     <Button asChild variant="outline">
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            Volunteer Interview List (Redacted)
                        </a>
                    </Button>
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
                    <p className="text-muted-foreground">LEI (University of Adelaide) & TIU (UniSA)</p>
                </div>
                <Separator />
                <div>
                    <h4 className="font-semibold mb-1">Date</h4>
                    <p className="text-muted-foreground">28 May 2025 (live poll); Jotform to follow</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Facilitators</h4>
                    <p className="text-muted-foreground">Rich Bartlett, Kelli Knuth, Tim Churchward, Alex Price</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Tools</h4>
                     <p className="text-muted-foreground">Mentimeter, Jotform</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Audience</h4>
                     <p className="text-muted-foreground">Learning Designers and adjacent roles</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Focus</h4>
                     <p className="text-muted-foreground">Practices, confidence, experience, support preferences, barriers, platform preference</p>
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
      <ScrollToTopButton />
    </CaseStudyLayout>
  );
}
