
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
import { CaseStudyLayout } from '@/components/case-study-layout';
import { CaseStudyTOC } from '@/components/case-study-toc';
import { CaseStudyHeader } from '@/components/case-study-header';

const galleryImages = [
    { src: 'https://i.imgur.com/Ruf6f0A.png', alt: 'Project canvas outlining goals, risks, and deliverables', title: 'Project canvas' },
    { src: 'https://i.imgur.com/O84waaK.png', alt: 'Affinity map synthesising interview data', title: 'Affinity map' },
    { src: 'https://i.imgur.com/wj4WJFR.png', alt: 'Journey map highlighting heat-related pain points', title: 'Rider journey map' },
    { src: 'https://i.imgur.com/x7uPhXP.png', alt: 'Persona summarising goals and frustrations', title: 'Primary persona' },
    { src: 'https://i.imgur.com/Pad4u29.png', alt: 'Project management board', title: 'Trello setup' },
    { src: 'https://i.imgur.com/XyyaPxB.png', alt: 'Icons for water, shade, sunscreen and credits', title: 'Icon development' },
    { src: 'https://i.imgur.com/ghsuA3P.png', alt: 'Screenshot from client review', title: 'Client feedback session' },
    { src: 'https://i.imgur.com/2lT9uXl.png', alt: 'Type, colour and iconography samples', title: 'Style guide' },
    { src: 'https://i.imgur.com/Lqvncof.png', alt: 'Diagram mapping stakeholder priorities', title: 'Problem scale' },
    { src: 'https://i.imgur.com/SpQdEkW.jpeg', alt: 'Team prioritising ideas with stickers', title: 'Dot voting as a team' },
    { src: 'https://i.imgur.com/KxsmBhl.png', alt: 'Participant using the prototype', title: 'Hi-fi usability testing' },
];

const sketchImages = [
    { src: 'https://i.imgur.com/Ei7QRx5.png', alt: 'Phone screen sketch', title: 'Sketch mock 1' },
    { src: 'https://i.imgur.com/x2aO11N.png', alt: 'Phone screen sketch', title: 'Sketch mock 2' },
    { src: 'https://i.imgur.com/0FRJBkN.png', alt: 'Phone screen sketch', title: 'Sketch mock 3' },
    { src: 'https://i.imgur.com/DifuNXX.png', alt: 'Phone screen sketch', title: 'Sketch mock 4' },
    { src: 'https://i.imgur.com/5B1iCRt.png', alt: 'Phone screen sketch', title: 'Sketch mock 5' },
    { src: 'https://i.imgur.com/ls7WMzt.png', alt: 'Phone screen sketch', title: 'Sketch mock 6' },
    { src: 'https://i.imgur.com/N71SBNd.png', alt: 'Phone screen sketch', title: 'Sketch mock 7' },
    { src: 'https://i.imgur.com/wc5Xmb1.jpeg', alt: 'Phone screen sketch', title: 'Sketch mock 8' },
    { src: 'https://i.imgur.com/5nXj4bQ.jpeg', alt: 'Phone screen sketch', title: 'Sketch mock 9' },
    { src: 'https://i.imgur.com/4llPHNS.png', alt: 'Phone screen sketch', title: 'Sketch mock 10' },
    { src: 'https://i.imgur.com/0kjNxx2.png', alt: 'Phone screen sketch', title: 'Sketch mock 11' },
    { src: 'https://i.imgur.com/CV9pcHi.jpeg', alt: 'Phone screen sketch', title: 'Sketch mock 12' },
];

const allGalleryImages = [...galleryImages, ...sketchImages];

const PhoneFrame = ({ children }: { children: React.ReactNode }) => (
    <div className="relative aspect-[9/19.5] w-full max-w-[250px] mx-auto border-4 border-black rounded-3xl overflow-hidden shadow-lg">
        <div className="absolute top-0 left-0 right-0 h-6 bg-black flex justify-center items-end">
            <div className="w-16 h-2 bg-gray-800 rounded-b-md"></div>
        </div>
        <div className="w-full h-full pt-6">
            {children}
        </div>
    </div>
);


export default function WellnessFeaturesPage() {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleNext = useCallback(() => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % allGalleryImages.length);
  }, []);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prevIndex) => (prevIndex - 1 + allGalleryImages.length) % allGalleryImages.length);
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
      <CaseStudyHeader slug="wellness-features-heat-safe-riding" />
      <ProjectNavigation 
          prevProject={{slug: 'gopro-app-redesign'}}
          nextProject={{slug: 'bestie-health-club'}}
      />
      <header className="mb-12">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-strong mb-8">
            <Image
                src="https://i.imgur.com/Kw74ciO.jpeg"
                alt="Hi-fi usability testing of wellness features inside the Deliveroo rider app concept"
                fill
                priority
                className="object-cover"
                data-ai-hint="usability test"
            />
        </div>
        <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary dark:text-primary-foreground mb-2">
              Wellness features in food delivery apps — heat-safe riding in a warming city
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Humanitech brief: empower communities via technology in the face of climate change.
            </p>
             <p className="text-sm text-muted-foreground mt-2">Estimated reading time: 8 minutes</p>
        </div>
        <div className="mt-4 text-center text-muted-foreground">
            <Badge>Case study</Badge> <Badge>Prototype</Badge> <Badge>Usability testing</Badge>
        </div>
      </header>
      
      <div className="grid lg:grid-cols-4 gap-12">
        <aside className="hidden lg:block lg:col-span-1">
          <CaseStudyTOC items={[
            { href: '#intro', label: 'Project scope & team' },
            { href: '#problem', label: 'Problem & design challenge' },
            { href: '#process', label: 'Process at a glance' },
            { href: '#discover', label: 'Discover — research & rider voices' },
            { href: '#define', label: 'Define — insights, personas, journey' },
            { href: '#develop', label: 'Develop — concepts, flows, mid-fi' },
            { href: '#deliver', label: 'Deliver — iterations, hi-fi & tests' },
            { href: '#styleguide', label: 'Style guide & further considerations' },
            { href: '#learnings', label: 'Learnings & reflections' },
            { href: '#ack', label: 'Acknowledgements' },
            { href: '#gallery', label: 'Gallery' },
          ]} />
        </aside>

        <main className="lg:col-span-2 space-y-12">
            <section id="intro">
                <h3 className="cs-h2">Project scope & team</h3>
                <p className="text-foreground/80">Humanitech's brief (Australian Red Cross):
Define what it means to empower a community through technology; identify themes worth exploring; map lived experience; develop concepts; and prototype solutions that prioritise psychosocial wellbeing and livelihoods.</p>
            </section>
            <section id="problem" className="cs-section">
                <h3 className="cs-h2">Problem & design challenge</h3>
                <div className="cs-callout"><p className="text-foreground/80"><strong>Problem:</strong> Climate change is increasing the frequency and intensity of heatwaves in Australian cities. Riders working outdoors are vulnerable; safety features are fragmented or absent in their day-to-day tools.<br/><br/><strong>Design challenge:</strong> How might we, through technology, empower urban communities—in our case, delivery riders—to better respond to extreme heat?</p></div>
            </section>
            <section id="process" className="cs-section">
                <h3 className="cs-h2">Process at a glance</h3>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    <li><strong>Discover</strong> — desk research, field interviews in Adelaide/Perth/Hong Kong, stakeholder review.</li>
                    <li><strong>Define</strong> — affinity mapping, problem scale, personas, journey.</li>
                    <li><strong>Develop</strong> — ideation with client, MVP matrix, detailed & simple user flows, mid-fi prototype.</li>
                    <li><strong>Deliver</strong> — usability testing rounds, design iterations, hi-fi prototype and style guide.</li>
                </ul>
            </section>
            <section id="discover" className="cs-section">
                <h3 className="cs-h2">Discover — research & rider voices</h3>
                <p className="text-foreground/80">We began broad (heat risk & public-health literature), then narrowed to delivery riders as a high-exposure group we could reach quickly for research.</p>
                <h4 className="font-bold font-headline text-lg mt-4 mb-2">Fieldwork</h4>
                 <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    <li>14 interviews with Deliveroo/UberEats riders (street intercepts, café approaches, Facebook group outreach).</li>
                    <li>66% reported being negatively affected by heat during work.</li>
                    <li>78% said platforms could do more for their health/wellbeing.</li>
                    <li>81% said in-app health information could improve their experience.</li>
                </ul>
                <h4 className="font-bold font-headline text-lg mt-4 mb-2">Outreach artefacts (video)</h4>
                <p className="text-foreground/80 mb-2">Looking for riders:</p>
                <div className="aspect-video mb-4"><iframe width="560" height="315" src="https://www.youtube.com/embed/xSmzlWvnVt8?si=TCteCA-LTC-Ywcz6" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen className="w-full h-full rounded-lg"></iframe></div>
                <p className="text-foreground/80 mb-2">Trying to engage riders:</p>
                <div className="aspect-video mb-4"><iframe width="560" height="315" src="https://www.youtube.com/embed/XU5NAF98wIw?si=5fhkH6Om2oDt9z7w" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen className="w-full h-full rounded-lg"></iframe></div>
                <p className="text-foreground/80 mb-2">A Deliveroo rider demonstrates the current app:</p>
                <div className="aspect-video"><iframe width="560" height="315" src="https://www.youtube.com/embed/cJlyXj-KrAI?si=Gm9nadp4LoVDNstF" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen className="w-full h-full rounded-lg"></iframe></div>
            </section>
             <section id="quotes" className="cs-section">
                <h3 className="cs-h2">Voices from riders</h3>
                <div className="space-y-4">
                    <blockquote className="border-l-2 pl-4 italic">"Yes, in the summer it gets very hot doing this job so I just need to drink lots of water but sometimes I forget to fill up or the bottle gets warm." <cite className="block not-italic text-sm text-muted-foreground mt-2">— Henry, Delivery Rider</cite></blockquote>
                    <blockquote className="border-l-2 pl-4 italic">"Heat doesn't really affect me, I just need more support from the delivery company for things like when my bag breaks." <cite className="block not-italic text-sm text-muted-foreground mt-2">— Inga, Delivery Rider</cite></blockquote>
                    <blockquote className="border-l-2 pl-4 italic">"I make sure I wear long clothes on my body, a bandanna around my neck and face and sometimes use sunscreen." <cite className="block not-italic text-sm text-muted-foreground mt-2">— Adesh, Delivery Rider</cite></blockquote>
                    <blockquote className="border-l-2 pl-4 italic">"I work two shifts, one during the morning then I have a break in the middle of the day and go back out for the peak afternoon/dinner shift." <cite className="block not-italic text-sm text-muted-foreground mt-2">— Delivery Rider</cite></blockquote>
                    <blockquote className="border-l-2 pl-4 italic">"I like the existing COVID-19 features in the delivery apps but this is just political and I'm not sure they really care about our wellbeing." <cite className="block not-italic text-sm text-muted-foreground mt-2">— Adesh, Delivery Rider</cite></blockquote>
                </div>
             </section>
            <section id="define" className="cs-section">
                <h3 className="cs-h2">Define — insights, personas, journey</h3>
                 <h4 className="font-bold font-headline text-lg mt-4 mb-2">Key insights</h4>
                <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    <li>Riders want platforms to show they care; motivation rises with visible support.</li>
                    <li>Hydration is easily forgotten when busy; access to water & shade is inconsistent.</li>
                    <li>Knowledge gaps exist on heat stress signs and where to rest safely.</li>
                </ul>
                <h4 className="font-bold font-headline text-lg mt-4 mb-2">Problem scale</h4>
                <p className="text-foreground/80">Businesses optimise for profit; charities focus on climate & wellbeing; riders prioritise earnings. Our solution needed to align incentives across that spectrum.</p>
                <h4 className="font-bold font-headline text-lg mt-4 mb-2">Personas & journey</h4>
                <p className="text-foreground/80">We created primary/secondary personas and a rider journey to locate pain points (task pressure, navigation, recovery between jobs).</p>
            </section>
            <section id="develop" className="cs-section">
                <h3 className="cs-h2">Develop — concepts, flows, mid-fi</h3>
                <h4 className="font-bold font-headline text-lg mt-4 mb-2">Co-design & ideation</h4>
                <p className="text-foreground/80">We ran Crazy-8s with our client (Humanitech), consolidated ideas via brain-writing, then prioritised in an MVP matrix (impact × effort).</p>
                 <h4 className="font-bold font-headline text-lg mt-4 mb-2">Core concept</h4>
                 <p className="text-foreground/80">Integrate wellness features into the rider app (starting with Deliveroo):</p>
                 <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80 mt-2">
                    <li>Map markers for water, shade, sunscreen.</li>
                    <li>Daily check-ins to earn credits redeemable at partner vendors.</li>
                    <li>Quick tips on heat stress & a compact weather panel.</li>
                </ul>
                <section id="sketches" className="mt-8">
                    <h4 className="font-bold font-headline text-lg mb-4">Sketch Mocks</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                       {sketchImages.map((img, index) => (
                         <div key={index} className="group relative cursor-pointer rounded-md overflow-hidden shadow-medium transition-transform hover:scale-105"
                              onClick={() => { setSelectedIndex(galleryImages.length + index); setOpen(true); }}>
                            <PhoneFrame>
                                <Image 
                                    src={img.src} 
                                    alt={img.alt} 
                                    fill 
                                    className="object-cover"
                                />
                            </PhoneFrame>
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <p className="text-white text-center text-xs">{img.title}</p>
                            </div>
                         </div>
                       ))}
                    </div>
               </section>
                 <h4 className="font-bold font-headline text-lg mt-8 mb-2">Mid-fi prototype (walkthrough)</h4>
                 <div className="aspect-video mb-4"><iframe style={{border: '1px solid rgba(0, 0, 0, 0.1)'}} width="800" height="450" src="https://embed.figma.com/design/WHP6vo5uMQZOSNSITdDNU1/Redo-Mid-Fi--Delivery-Rider---Copy-?node-id=0-1&embed-host=share" allowFullScreen className="w-full h-full rounded-lg"></iframe></div>
                 <h4 className="font-bold font-headline text-lg mt-4 mb-2">Humanitech mid-fi video with voice-over</h4>
                 <div className="aspect-video"><iframe width="560" height="315" src="https://www.youtube.com/embed/lcVawe5UNks?si=4SdRX1zt5MBlFEdJ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen className="w-full h-full rounded-lg"></iframe></div>
            </section>
            <section id="deliver" className="cs-section">
                <h3 className="cs-h2">Deliver — iterations, hi-fi & tests</h3>
                 <h4 className="font-bold font-headline text-lg mt-4 mb-2">Round 1 — mid-fi testing (8 tests: 4 moderated, 4 unmoderated)</h4>
                 <p className="text-foreground/80"><strong>Findings:</strong> onboarding lacked clarity; wellness screen felt static; credits/QR redemption was confusing; slider interaction disliked; some map icons unclear.<br/><strong>Iterations</strong> simplified language, made the wellness screen dynamic, refined iconography and interactions.</p>
                 <h4 className="font-bold font-headline text-lg mt-4 mb-2">Round 2 — hi-fi testing (12 tests: 6 moderated, 6 unmoderated incl. riders)</h4>
                 <p className="text-foreground/80"><strong>Findings:</strong> explanation of new features still needed tightening; "star" was a poor metaphor for credits; map legend ate space.<br/><strong>Iterations</strong> renamed Climate Credits → Credits; switched to coin-stack icon; removed persistent legend; improved copy and micro-interactions.</p>
                 <h4 className="font-bold font-headline text-lg mt-4 mb-2">Hi-fi prototype</h4>
                 <div className="w-full" style={{height: '750px'}}><iframe style={{border: '1px solid rgba(0, 0, 0, 0.1)', width: '100%', height: '100%'}} src="https://embed.figma.com/proto/ZQgjE1b0NUoU3yM7H7CKFJ/V2---Deliveroo-High-Fi?kind=proto&node-id=313-1087&page-id=0%3A1&scaling=min-zoom&viewport=114%2C815%2C0.06224198266863823&embed-host=share" allowFullScreen className="rounded-lg"></iframe></div>
            </section>
            <section id="styleguide" className="cs-section">
                 <h3 className="cs-h2">Style guide & further considerations</h3>
                 <p className="text-foreground/80">We sampled the Deliveroo Rider App to ensure visual fit, paired it with Australian Red Cross colours where relevant, and chose bold, distinct icons.</p>
                 <h4 className="font-bold font-headline text-lg mt-4 mb-2">Further considerations</h4>
                 <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    <li>Platform partnerships (Uber Eats, Foodpanda) and retail partners (7-Eleven, BP).</li>
                    <li>Optional wearables (Fitbit/Apple Watch) for passive wellness signals.</li>
                    <li>Animate/expand the weather widget; deepen research into heat-related incidents.</li>
                </ul>
            </section>
            <section id="learnings" className="cs-section">
                 <h3 className="cs-h2">Learnings & reflections</h3>
                 <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/80">
                    <li>Pivot early when research access is hard; align to reachable communities.</li>
                    <li>Structure your tests—consistent scripts/metrics make results comparable.</li>
                    <li>Don't get attached; iterate on copy, icons, and interaction metaphors.</li>
                    <li>Facilitated sessions surfaced richer insight than unmoderated links.</li>
                </ul>
            </section>
            <section id="ack" className="cs-section">
                <h3 className="cs-h2">Acknowledgements</h3>
                <p className="text-foreground/80">Thanks to Osama Mah and Ash Cheuk for collaboration, and Alastair Pryor (Humanitech) for guidance and feedback. Shout-out to mentors Jaemie (Academy Xi), Simon Woods (Data Action), and Juan Vaamonde (Cochlear).</p>
            </section>
            <section id="cta" className="cs-section">
                <h3 className="cs-h2">View slide deck</h3>
                <Button asChild>
                    <a href="https://www.canva.com/design/DAEdoWlWb_o/view" target="_blank" rel="noopener noreferrer">
                        Open the deck <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                </Button>
            </section>

        </main>
        
        <aside className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Quick facts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                 <div>
                  <h4 className="font-semibold mb-1">Scope</h4>
                  <p className="text-muted-foreground">Research technologies that empower communities, Engage affected groups and synthesise themes, Create journey maps, concepts, user flows, Build mid- and high-fidelity prototypes</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-1">Tools</h4>
                  <p className="text-muted-foreground">Figma, Miro, Canva, Zoom, UseBerry, Trello, Slack, Google Suite</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-1">Team</h4>
                  <p className="text-muted-foreground">Osama Mah, Ash Cheuk</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-1">My role</h4>
                  <p className="text-muted-foreground">Team lead / client contact, UX researcher, UI designer, co-presenter</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-1">Timeline (6 weeks)</h4>
                  <p className="text-muted-foreground">Discover (1.5w) · Define (1.5w) · Develop (1.5w) · Deliver (1.5w)</p>
                </div>
            </CardContent>
          </Card>
        </aside>
      </div>

       <section id="gallery" className="mt-16">
            <h3 className="cs-h2 text-center">Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                src={allGalleryImages[selectedIndex].src} 
                alt={allGalleryImages[selectedIndex].alt} 
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
