
'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ExternalLink } from 'lucide-react';
import { ScrollToTopButton } from '@/components/scroll-to-top-button';

// This would ideally be in a separate layout component
const CaseStudyLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="container mx-auto max-w-6xl py-16 px-4">{children}</div>;
};

// This would ideally be in a separate file.
const LocalTOC = () => (
  <nav className="sticky top-24">
    <h4 className="font-semibold mb-2 font-headline">On this page</h4>
    <ul className="space-y-2 text-sm text-muted-foreground">
      <li><a href="#scope" className="hover:text-primary">Scope & constraints</a></li>
      <li><a href="#problem" className="hover:text-primary">The problem</a></li>
      <li><a href="#solution" className="hover:text-primary">The solution</a></li>
      <li><a href="#design-process" className="hover:text-primary">Design process</a></li>
      <li><a href="#testing" className="hover:text-primary">Testing & results</a></li>
      <li><a href="#outcomes" className="hover:text-primary">Outcomes</a></li>
      <li><a href="#challenges" className="hover:text-primary">Challenges & learnings</a></li>
      <li><a href="#future" className="hover:text-primary">Future iterations</a></li>
      <li><a href="#gallery" className="hover:text-primary">Gallery</a></li>
    </ul>
  </nav>
);

const galleryImages = [
    { src: 'https://i.imgur.com/hxXTWzW.jpeg', title: 'Quantitative findings' },
    { src: 'https://i.imgur.com/bKW3d6O.jpeg', title: 'Contextual Enquiry' },
    { src: 'https://i.imgur.com/X4YgN3i.jpeg', title: 'User journey mapping' },
    { src: 'https://i.imgur.com/Jz6QZpI.png', title: 'Storyboarding' },
    { src: 'https://i.imgur.com/0w253yc.png', title: 'mood board' },
    { src: 'https://i.imgur.com/QEmm6ZK.png', title: 'User persona' },
    { src: 'https://i.imgur.com/3wntbwt.jpeg', title: 'Affinity Mapping' },
    { src: 'https://i.imgur.com/99tUgnl.png', title: 'Wireframe sketches' },
    { src: 'https://i.imgur.com/3lc38C6.png', title: 'Prioritisation Matrix' },
    { src: 'https://i.imgur.com/ZvuBGbV.png', title: 'User Flow Matrix' },
    { src: 'https://i.imgur.com/lHgtCIX.png', title: 'User Flow Diagram' },
    { src: 'https://i.imgur.com/CxpQUvR.png', title: 'Before and After images of the Home screen (left) and Editing screens (right)' },
]

// Estimated reading time
function calculateReadingTime(text: string) {
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
}

const BannerHeading = ({ children }: { children: React.ReactNode }) => (
    <h4 
        className="text-xl font-bold font-headline p-2 rounded-md w-full"
        style={{ backgroundColor: '#568f90', color: 'white' }}
    >
        {children}
    </h4>
);

export default function GoProProjectPage() {
  const readingTime = 4; // Hardcoded based on content

  return (
    <CaseStudyLayout>
       <header className="mb-12">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-strong mb-8">
            <Image
                src="https://i.imgur.com/Ukax7tl.png"
                alt="dark-styled mobile screens showing a magic movie flow for the gopro app"
                fill
                priority
                className="object-cover"
                data-ai-hint="gopro app hero"
            />
        </div>
        <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary dark:text-primary-foreground mb-2">
              gopro app redesign
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              making gopro fun and easy for all
            </p>
            <p className="text-sm text-muted-foreground mt-2">Estimated reading time: {readingTime} minutes</p>
        </div>
      </header>
      
      <div className="grid lg:grid-cols-4 gap-12">
        <aside className="hidden lg:block lg:col-span-1">
          <LocalTOC />
        </aside>

        <main className="lg:col-span-2 space-y-12">
            <section id="scope">
                <h3 className="text-2xl font-bold font-headline mb-4">Project Scope & Constraints</h3>
                <div className="space-y-4 text-foreground/80">
                  <p><strong>Brief:</strong> develop an iOS app concept for GoPro that addresses current app limitations and appeals to millennials—differentiating from instagram, vsco, snapchat.</p>
                  <p><strong>Constraints:</strong> must be iOS-compatible; suggested tech must exist now or within 12 months.</p>
                  <p><strong>Opportunity:</strong> go beyond photo viewing/editing to boost creativity and engagement while aligning to GoPro’s adventurous ethos.</p>
                  <p><strong>Target Audience:</strong> millennials interested in capturing, editing and sharing photo/video.</p>
                  <p><strong>Critical pain points to address:</strong></p>
                  <ul className="list-disc list-outside pl-5">
                    <li>Limited dynamic features that push creative boundaries</li>
                    <li>Weaker engagement than rival photo platforms</li>
                  </ul>
                </div>
            </section>
            
            <Separator />
            
            <section id="problem">
                <h3 className="text-2xl font-bold font-headline mb-4">The Problem</h3>
                 <p className="text-foreground/80">Creating an auto-movie felt slow and opaque (vs QUIKSTORY); overall usability, feature clarity and usefulness needed to improve to encourage in-app editing.</p>
            </section>
            
            <Separator />

            <section id="solution">
                <h3 className="text-2xl font-bold font-headline mb-4">The Solution</h3>
                <p className="text-foreground/80">A redesigned magic movie flow with clearer entry points, faster assembly, stronger feedback, and supportive features (e.g., cloud import, learning content, social/shop). The hi-fi prototype achieved <strong>SUS 84.25</strong> (≈ 80th percentile, graded A) with positive feedback on intuitiveness and usefulness.</p>
            </section>

            <Separator />

            <section id="design-process">
                <h3 className="text-2xl font-bold font-headline mb-4">Design Process</h3>
                <div className="space-y-6 text-foreground/80">
                  <p>I followed the Double Diamond model: 1) Discover → 2) Define → 3) Develop → 4) Deliver.</p>
                  
                  <div>
                    <BannerHeading>Discover</BannerHeading>
                    <p className="my-2"><strong>Goals:</strong> understand action-cam user needs, language and workflows; compare competing apps; identify opportunities.</p>
                    <p className="mb-2"><strong>Methods:</strong> surveys (Q2), 1:1 interviews (Q1), contextual enquiry (Q1), competitor analysis, desk research.</p>
                    <p className="mb-4"><strong>Targets:</strong> 20+ survey; 3–5 interviews/contextual; 1–3 competitors.</p>
                    <p><strong>Contextual enquiry (task: insta story from fresh GoPro footage):</strong></p>
                    <div className="aspect-video mt-2">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/xfQ_z7bzjX8?si=m5GG2abJ-Lll8t5m" title="Contextual enquiry: creating a short Instagram story from GoPro footage" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen className="w-full h-full rounded-lg"></iframe>
                    </div>
                     <p className="mt-4"><strong>Selected research highlights:</strong></p>
                     <ul className="list-disc list-outside pl-5 mt-2 space-y-1">
                        <li><strong>Surveys (n=5):</strong> 75% did not use the app to edit/create; average GoPro use ~2.4 times/month; largest group 25–34.</li>
                        <li><strong>Interviews:</strong> frequent outdoor use (diving/surf/skate/family); common connectivity issues (“NoGo” nickname); misconceptions about app capabilities.</li>
                        <li><strong>Contextual task:</strong> end-to-end ~25 minutes with rising frustration—clear scope for simplification.</li>
                        <li><strong>Competitors:</strong> most free/freemium; auto-movie features present elsewhere; value in third-party cloud import, music options, video/music editors; overlap with hardware-linked apps (DJI GO 4, Dive+).</li>
                        <li><strong>Market notes (timeline excerpt):</strong> 2004 first 35-mm HERO; 2015 revenue peak $1.62b; 2016 Karma drone failure/layoffs; 2018 >100 countries; 2020 ReelSteady acquisition & pandemic cuts; 2020 HERO9; 2021 underwater camera growth projected.</li>
                    </ul>
                  </div>

                  <div>
                      <BannerHeading>Define</BannerHeading>
                      <p className="my-2"><strong>Hypothesis:</strong> adventurers (20s–30s) are motivated to create/share video narratives.</p>
                      <p><strong>Key concepts:</strong> home hub; global navigation; faster auto-movie; cloud storage (Drive/Dropbox/iCloud); social & shop.</p>
                  </div>

                  <div>
                      <BannerHeading>Develop</BannerHeading>
                      <p className="my-2">Lo-fi wireframes → tests (maze + face-to-face); iterative fixes:</p>
                      <ul className="list-disc list-outside pl-5 mb-4 space-y-1">
                          <li>Checkboxes instead of swipes</li>
                          <li>Explicit loading indicators</li>
                          <li>Consistent back placement (top-left)</li>
                      </ul>
                      <div className="aspect-video">
                        <iframe style={{border: '1px solid rgba(0, 0, 0, 0.1)'}} width="800" height="450" src="https://embed.figma.com/design/7YSr5GE1a0ZScvi1J4CYnm/GoPro-Lo-Fi--Final-?node-id=0-1&embed-host=share" allowFullScreen className="w-full h-full rounded-lg"></iframe>
                      </div>
                  </div>

                  <div>
                      <BannerHeading>Deliver</BannerHeading>
                      <p className="my-2"><strong>Success criteria:</strong> faster than QUIKSTORY; new features with familiarity; practical usefulness that encourages in-app editing.</p>
                       <Image src="https://i.imgur.com/rpf1Z6Q.png" width={800} height={450} alt="Hi-fi prototype overview" className="rounded-lg shadow-medium mb-4" />
                       <div className="aspect-video mb-4">
                        <iframe style={{border: '1px solid rgba(0, 0, 0, 0.1)'}} width="800" height="450" src="https://embed.figma.com/design/UgLZ101OVxbo3vU0mD1vTj/GoPro-Hi-Fi-V2--Final---V2-?node-id=0-1&embed-host=share" allowFullScreen className="w-full h-full rounded-lg"></iframe>
                       </div>
                       <Button asChild>
                          <a href="https://www.figma.com/proto/UgLZ101OVxbo3vU0mD1vTj/GoPro-Hi-Fi-V2--Final---V2-?node-id=0-2&p=f&t=smZhJZFLLrWsO9Md-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=0%3A2" target="_blank" rel="noopener noreferrer">
                              View Interactive Hi-Fi (Figma) <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                       </Button>
                  </div>
                </div>
            </section>
            
            <Separator />
            
             <section id="testing">
                <h3 className="text-2xl font-bold font-headline mb-4">Testing & Results</h3>
                <div className="space-y-4 text-foreground/80">
                  <div>
                    <h4 className="font-bold font-headline text-lg">Heuristic Review (Selected)</h4>
                    <ul className="list-disc list-outside pl-5 mt-2 space-y-1">
                      <li>No clear home (user control & freedom)</li>
                      <li>Missing in-app guidance (help & documentation)</li>
                      <li>Unclear workflow (consistency & standards)</li>
                      <li>Misaligned priorities vs core task (aesthetic & minimalist design)</li>
                    </ul>
                  </div>
                   <div>
                    <h4 className="font-bold font-headline text-lg">Design Principles</h4>
                    <ul className="list-disc list-outside pl-5 mt-2 space-y-1">
                        <li>Consistency with GoPro language/labels/colour</li>
                        <li>Deference to content (iOS HIGs)</li>
                        <li>Useful feedback and reduced cognitive load</li>
                        <li>Accessibility targeting WCAG AA/AAA contrast</li>
                        <li>Direct manipulation with familiar gestures</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold font-headline text-lg">Testing Methods & Metrics</h4>
                     <ul className="list-disc list-outside pl-5 mt-2 space-y-1">
                        <li><strong>Methods:</strong> lo-fi (maze + in-person) → hi-fi (useberry + figma).</li>
                        <li><strong>Hi-fi participants/metrics:</strong> n=10; age 26–41; gender 50/50; 90% native English; 16 Qs; desktop; avg 13:52; 100% completion.</li>
                        <li><strong>SUS:</strong> industry avg 68; redesign <strong>84.25 (≈ 80th percentile, “A”)</strong>.</li>
                    </ul>
                  </div>
                   <div>
                    <h4 className="font-bold font-headline text-lg">Satisfaction Snapshots</h4>
                    <ul className="list-disc list-outside pl-5 mt-2 space-y-1">
                        <li><strong>Creating a movie:</strong> 80% happy/very satisfied; 20% neutral</li>
                        <li><strong>Adjusting volume:</strong> mixed → improvement area</li>
                        <li><strong>Sharing a movie:</strong> 100% happy/very satisfied</li>
                    </ul>
                  </div>
                   <div>
                    <h4 className="font-bold font-headline text-lg">Interface Optimisations (from testing)</h4>
                    <p>Checkboxes for selection; loading states between steps; consistent back button; added frames for logical continuity; pruned non-essential buttons.</p>
                  </div>
                </div>
            </section>

            <Separator />
            
             <section id="outcomes">
                <h3 className="text-2xl font-bold font-headline mb-4">Outcomes</h3>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    <li>Faster, clearer magic movie flow and stronger feedback loops.</li>
                    <li>Quantitative improvement (SUS 84.25) with supporting qualitative comments.</li>
                    <li>Roadmap foundation: cloud import, learning content, social/store.</li>
                </ul>
            </section>

             <Separator />
            
             <section id="challenges">
                <h3 className="text-2xl font-bold font-headline mb-4">Challenges & Learnings</h3>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    <li>Remote testing quirks (mouse vs touch; prototype clickability).</li>
                    <li>Early question bias—importance of neutral task phrasing.</li>
                    <li>My first extensive use of Figma + remote testing platform; value of SUS as a simple comparable measure.</li>
                </ul>
            </section>

            <Separator />

             <section id="future">
                <h3 className="text-2xl font-bold font-headline mb-4">Future Iterations & Ideas</h3>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    <li>Rotate/edit in landscape; prioritise most valuable mobile editing tools; explore a GoPro social channel; refine QuikStory → Magic Movie onboarding; continue accessibility checks.</li>
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
                    <p className="text-muted-foreground">Academy XI Student Brief (Concept Project)</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Target Audience</h4>
                     <p className="text-muted-foreground">Millennials capturing/sharing adventure content</p>
                </div>
                 <Separator />
                <div>
                    <h4 className="font-semibold mb-1">Role</h4>
                    <p className="text-muted-foreground">Team Leader & Client Contact; UX Researcher; UI Designer; Collaborative Presenter</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Tools</h4>
                     <p className="text-muted-foreground">Figma, Miro, Canva, Zoom, Maze, Useberry, Slack, Google Suite</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Timeline</h4>
                     <p className="text-muted-foreground">1 March – 16 April 2021 (6 weeks) → Discover & Research ~2 weeks; Design & Testing ~4 weeks</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-1">Device</h4>
                     <p className="text-muted-foreground">iOS (iPhone 11 Pro, 375 × 812)</p>
                </div>
                 <Separator />
                <div>
                    <h4 className="font-semibold mb-1">Deliverables</h4>
                     <p className="text-muted-foreground">Lo-fi & hi-fi prototypes; usability tests; SUS survey; report</p>
                </div>
            </CardContent>
          </Card>
        </aside>
      </div>

       <section id="gallery" className="mt-16">
            <h3 className="text-3xl font-bold font-headline mb-6 text-center">Gallery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryImages.map((img, index) => (
                <div key={index} className="group relative aspect-[4/3] rounded-md overflow-hidden shadow-medium transition-transform hover:scale-105">
                  <Image 
                    src={img.src} 
                    alt={img.title} 
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

      <footer className="mt-24 text-center bg-muted/50 py-12 rounded-lg">
        <h3 className="text-2xl font-bold font-headline mb-2">Interested in the process behind the polish?</h3>
        <p className="text-muted-foreground mb-6">I can walk you through research artefacts and test recordings on request.</p>
        <Button asChild>
            <Link href="/contact">Contact me</Link>
        </Button>
      </footer>
      <ScrollToTopButton />
    </CaseStudyLayout>
  );
}

    
