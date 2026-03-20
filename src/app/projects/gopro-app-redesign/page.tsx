
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ExternalLink, ArrowLeft, ArrowRight } from 'lucide-react';
import { ScrollToTopButton } from '@/components/scroll-to-top-button';
import { ProjectNavigation } from '@/components/project-navigation';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { CaseStudyLayout } from '@/components/case-study-layout';
import { CaseStudyTOC } from '@/components/case-study-toc';
import { CaseStudyHeader } from '@/components/case-study-header';

const galleryImages = [
    { src: 'https://i.imgur.com/hxXTWzW.jpeg', title: 'Quantitative findings', hint: 'quantitative findings chart' },
    { src: 'https://i.imgur.com/bKW3d6O.jpeg', title: 'Contextual Enquiry', hint: 'contextual enquiry photo' },
    { src: 'https://i.imgur.com/X4YgN3i.jpeg', title: 'User journey mapping', hint: 'journey map diagram' },
    { src: 'https://i.imgur.com/Jz6QZpI.png', title: 'Storyboarding', hint: 'storyboard illustration' },
    { src: 'https://i.imgur.com/0w253yc.png', title: 'mood board', hint: 'mood board collage' },
    { src: 'https://i.imgur.com/QEmm6ZK.png', title: 'User persona', hint: 'persona document' },
    { src: 'https://i.imgur.com/3wntbwt.jpeg', title: 'Affinity Mapping', hint: 'affinity map photo' },
    { src: 'https://i.imgur.com/99tUgnl.png', title: 'Wireframe sketches', hint: 'wireframe sketch' },
    { src: 'https://i.imgur.com/3lc38C6.png', title: 'Prioritisation Matrix', hint: 'prioritisation matrix diagram' },
    { src: 'https://i.imgur.com/ZvuBGbV.png', title: 'User Flow Matrix', hint: 'user flow matrix diagram' },
    { src: 'https://i.imgur.com/lHgtCIX.png', title: 'User Flow Diagram', hint: 'user flow diagram' },
    { src: 'https://i.imgur.com/CxpQUvR.png', title: 'Before and After images of the Home screen (left) and Editing screens (right)', hint: 'before after comparison' },
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
      <CaseStudyHeader slug="gopro-app-redesign" />
        <ProjectNavigation
            prevProject={null}
            nextProject={{slug: 'wellness-features-heat-safe-riding'}}
        />
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
              GoPro App Redesign
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              making gopro fun and easy for all
            </p>
            <p className="text-sm text-muted-foreground mt-2">Estimated reading time: {readingTime} minutes</p>
        </div>
      </header>
      
      <div className="grid lg:grid-cols-4 gap-12">
        <aside className="hidden lg:block lg:col-span-1">
          <CaseStudyTOC items={[
            { href: '#scope', label: 'Scope & constraints' },
            { href: '#problem', label: 'The problem' },
            { href: '#solution', label: 'The solution' },
            { href: '#design-process', label: 'Design process' },
            { href: '#testing', label: 'Testing & results' },
            { href: '#outcomes', label: 'Outcomes' },
            { href: '#challenges', label: 'Challenges & learnings' },
            { href: '#future', label: 'Future iterations' },
            { href: '#gallery', label: 'Gallery' },
          ]} />
        </aside>

        <main className="lg:col-span-2 space-y-12">
            <section id="scope">
                <h3 className="cs-h2">Project Scope & Constraints</h3>
                <div className="space-y-4 text-foreground/80">
                  <p><strong>Brief:</strong> I developed an iOS app concept for GoPro that addresses current app limitations and appeals to millennials—differentiating from instagram, vsco, snapchat.</p>
                  <p><strong>Constraints:</strong> must be iOS-compatible; suggested tech must exist now or within 12 months.</p>
                  <p><strong>Opportunity:</strong> go beyond photo viewing/editing to boost creativity and engagement while aligning to GoPro's adventurous ethos.</p>
                  <p><strong>Target Audience:</strong> millennials interested in capturing, editing and sharing photo/video.</p>
                  <p><strong>Critical pain points to address:</strong></p>
                  <ul className="list-disc list-outside pl-5">
                    <li>Limited dynamic features that push creative boundaries</li>
                    <li>Weaker engagement than rival photo platforms</li>
                  </ul>
                </div>
            </section>
            <section id="problem" className="cs-section">
                <h3 className="cs-h2">The Problem</h3>
                 <p className="text-foreground/80">Creating an auto-movie felt slow and opaque (vs QUIKSTORY); overall usability, feature clarity and usefulness needed to improve to encourage in-app editing.</p>
            </section>
            <section id="solution" className="cs-section">
                <h3 className="cs-h2">The Solution</h3>
                <div className="cs-callout"><p className="text-foreground/80">A redesigned magic movie flow with clearer entry points, faster assembly, stronger feedback, and supportive features (e.g., cloud import, learning content, social/shop). The hi-fi prototype achieved <strong>SUS 84.25</strong> (≈ 80th percentile, graded A) with positive feedback on intuitiveness and usefulness.</p></div>
            </section>
            <section id="design-process" className="cs-section">
                <h3 className="cs-h2">Design Process</h3>
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
                        <li><strong>Interviews:</strong> frequent outdoor use (diving/surf/skate/family); common connectivity issues ("NoGo" nickname); misconceptions about app capabilities.</li>
                        <li><strong>Contextual task:</strong> end-to-end ~25 minutes with rising frustration—clear scope for simplification.</li>
                        <li><strong>Competitors:</strong> most free/freemium; auto-movie features present elsewhere; value in third-party cloud import, music options, video/music editors; overlap with hardware-linked apps (DJI GO 4, Dive+).</li>
                        <li><strong>Market notes (timeline excerpt):</strong> 2004 first 35-mm HERO; 2015 revenue peak $1.62b; 2016 Karma drone failure/layoffs; 2018 &gt;100 countries; 2020 ReelSteady acquisition & pandemic cuts; 2020 HERO9; 2021 underwater camera growth projected.</li>
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
                        <iframe style={{border: '1px solid rgba(0, 0, 0, 0.1)'}} width="800" height="450" src="https://embed.figma.com/design/7YSr5GE1a0ZScvi1J4CYnm/GoPro-Lo-Fi--Final-?node-id=0-1&embed-host=share" allowFullScreen className="w-full h-full rounded-lg" title="Figma embed"></iframe>
                      </div>
                  </div>

                  <div>
                      <BannerHeading>Deliver</BannerHeading>
                      <p className="my-2"><strong>Success criteria:</strong> faster than QUIKSTORY; new features with familiarity; practical usefulness that encourages in-app editing.</p>
                       <Image src="https://i.imgur.com/rpf1Z6Q.png" width={800} height={450} alt="Hi-fi prototype overview" className="rounded-lg shadow-medium mb-4" />
                       <div className="aspect-video mb-4">
                        <iframe style={{border: '1px solid rgba(0, 0, 0, 0.1)'}} width="800" height="450" src="https://embed.figma.com/design/UgLZ101OVxbo3vU0mD1vTj/GoPro-Hi-Fi-V2--Final---V2-?node-id=0-1&embed-host=share" allowFullScreen className="w-full h-full rounded-lg" title="Figma embed"></iframe>
                       </div>
                       <Button asChild>
                          <a href="https://www.figma.com/proto/UgLZ101OVxbo3vU0mD1vTj/GoPro-Hi-Fi-V2--Final---V2-?node-id=0-2&p=f&t=smZhJZFLLrWsO9Md-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=0%3A2" target="_blank" rel="noopener noreferrer">
                              View Interactive Hi-Fi (Figma) <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                       </Button>
                  </div>
                </div>
            </section>
             <section id="testing" className="cs-section">
                <h3 className="cs-h2">Testing & Results</h3>
                <div className="space-y-4 text-foreground/80">
                  <div>
                    <h4 className="cs-h3">Heuristic Review (Selected)</h4>
                    <ul className="list-disc list-outside pl-5 mt-2 space-y-1">
                      <li>No clear home (user control & freedom)</li>
                      <li>Missing in-app guidance (help & documentation)</li>
                      <li>Unclear workflow (consistency & standards)</li>
                      <li>Misaligned priorities vs core task (aesthetic & minimalist design)</li>
                    </ul>
                  </div>
                   <div>
                    <h4 className="cs-h3">Design Principles</h4>
                    <ul className="list-disc list-outside pl-5 mt-2 space-y-1">
                        <li>Consistency with GoPro language/labels/colour</li>
                        <li>Deference to content (iOS HIGs)</li>
                        <li>Useful feedback and reduced cognitive load</li>
                        <li>Accessibility targeting WCAG AA/AAA contrast</li>
                        <li>Direct manipulation with familiar gestures</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="cs-h3">Testing Methods & Metrics</h4>
                     <ul className="list-disc list-outside pl-5 mt-2 space-y-1">
                        <li><strong>Methods:</strong> lo-fi (maze + in-person) → hi-fi (useberry + figma).</li>
                        <li><strong>Hi-fi participants/metrics:</strong> n=10; age 26–41; gender 50/50; 90% native English; 16 Qs; desktop; avg 13:52; 100% completion.</li>
                        <li><strong>SUS:</strong> industry avg 68; redesign <strong>84.25 (≈ 80th percentile, "A")</strong>.</li>
                    </ul>
                  </div>
                   <div>
                    <h4 className="cs-h3">Satisfaction Snapshots</h4>
                    <ul className="list-disc list-outside pl-5 mt-2 space-y-1">
                        <li><strong>Creating a movie:</strong> 80% happy/very satisfied; 20% neutral</li>
                        <li><strong>Adjusting volume:</strong> mixed → improvement area</li>
                        <li><strong>Sharing a movie:</strong> 100% happy/very satisfied</li>
                    </ul>
                  </div>
                   <div>
                    <h4 className="cs-h3">Interface Optimisations (from testing)</h4>
                    <p>Checkboxes for selection; loading states between steps; consistent back button; added frames for logical continuity; pruned non-essential buttons.</p>
                  </div>
                </div>
            </section>
             <section id="outcomes" className="cs-section">
                <h3 className="cs-h2">Outcomes</h3>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    <li>Faster, clearer magic movie flow and stronger feedback loops.</li>
                    <li>Quantitative improvement (SUS 84.25) with supporting qualitative comments.</li>
                    <li>Roadmap foundation: cloud import, learning content, social/store.</li>
                </ul>
            </section>
             <section id="challenges" className="cs-section">
                <h3 className="cs-h2">Challenges & Learnings</h3>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    <li>Remote testing quirks (mouse vs touch; prototype clickability).</li>
                    <li>Early question bias—importance of neutral task phrasing.</li>
                    <li>My first extensive use of Figma + remote testing platform; value of SUS as a simple comparable measure.</li>
                </ul>
            </section>
             <section id="future" className="cs-section">
                <h3 className="cs-h2">Future Iterations & Ideas</h3>
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
            <h3 className="cs-h2 text-center">Gallery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryImages.map((img, index) => (
                <div key={index} className="group relative cursor-pointer aspect-[4/3] rounded-md overflow-hidden shadow-medium transition-transform hover:scale-105"
                     onClick={() => { setSelectedIndex(index); setOpen(true); }}>
                  <Image 
                    src={img.src} 
                    alt={img.title} 
                    fill 
                    className="object-cover"
                    data-ai-hint={img.hint}
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
                      alt={galleryImages[selectedIndex].title} 
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
        <h3 className="cs-h2">Interested in the process behind the polish?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">I can walk you through research artefacts and test recordings on request.</p>
        <Button asChild>
            <Link href="/contact">Contact me</Link>
        </Button>
      </Card>
      <ScrollToTopButton />
    </CaseStudyLayout>
  );
}
