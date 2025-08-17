
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollToTopButton } from '@/components/scroll-to-top-button';

const CaseStudyLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="container mx-auto max-w-6xl py-16 px-4">{children}</div>;
};

const TimelineItem = ({ year, title, duration }: { year: string, title: string, duration: string }) => (
  <li className="mb-4 flex items-start">
    <div className="flex flex-col items-center mr-4">
      <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
        {year}
      </div>
      <div className="w-px h-8 bg-border"></div>
    </div>
    <div>
      <h4 className="font-bold font-headline text-lg">{title}</h4>
      <p className="text-sm text-muted-foreground">{duration}</p>
    </div>
  </li>
);

const projectTimeline = [
    { year: "2021", title: "OUA Orientation Redesign", duration: "August to October" },
    { year: "2021", title: "Personal Professional Development", duration: "August to March 2022" },
    { year: "2021", title: "Managing Organisations and People", duration: "August to Jan 2022" },
    { year: "2022", title: "Introduction to Marketing", duration: "May to August" },
    { year: "2022", title: "Data Analytics", duration: "August to December" },
    { year: "2023", title: "Health Economics", duration: "December 2022 to April 2023" },
    { year: "2024", title: "Corporate Responsibility for Global Business", duration: "Feb to July 2024" },
];

export default function OuaDesignProcessPage() {
  return (
    <CaseStudyLayout>
       <header className="mb-12">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-strong mb-8">
            <Image
                src="https://i.imgur.com/yygdVja.png"
                alt="OUA Design Process cover image"
                fill
                priority
                className="object-cover"
                data-ai-hint="learning design process"
            />
        </div>
        <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary dark:text-primary-foreground mb-2">
              The OUA design process
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              LD Design Project @The University of Adelaide
            </p>
        </div>
      </header>
      
      <div className="grid lg:grid-cols-3 gap-12">
        <main className="lg:col-span-2 space-y-12">
            <section id="intro">
                 <p className="text-foreground/80">
                    Sections of my portfolio designed in this fashion showcase specific projects I worked on as a Learning Designer at the University of Adelaide, beginning in August 2021. I aim to detail my approach to tackling a unique educational challenge via separate case study pages, highlighting the design thinking processes and strategies employed to enhance user experience and learning outcomes.
                 </p>
                 <br />
                 <p className="text-foreground/80">
                    These project pages provide insights into my problem-solving methodology, showcasing how practical solutions can be crafted to address specific needs within educational settings. It illustrates my commitment to creating accessible and effective learning experiences, reflecting my broader work ethic and dedication to educational innovation.
                 </p>
            </section>
            
            <Separator />

            <section id="scope">
                <h3 className="text-2xl font-bold font-headline mb-4">Project Scope</h3>
                <p className="text-foreground/80">{`The project spanned the development of 35 courses for Open Universities Australia (referred to as OUA) initiative, (six of which I was the lead Learning Designer), strategically designed to enhance the University of Adelaide's suite of fully online undergraduate offerings. The scope included courses for both the Bachelor of International Business and the Bachelor of Health Services Management programs with 12 shared courses amongst the two streams and culminating in a eChallenge Captstone. This initiative aimed to address the growing need for flexible education solutions, catering to the evolving landscape of higher education.`}</p>
            </section>
            
            <Separator />
            
            <section id="constraints">
                <h3 className="text-2xl font-bold font-headline mb-4">Constraints</h3>
                <p className="text-foreground/80">{`The primary challenge was to cater to a diverse and geographically dispersed student population, predominantly from NSW, VIC, and QLD, while also considering the lifestyles of learners, 41% of whom are employed full-time. The demographic profile, heavily skewed towards working females aged between 30-39, demanded a flexible and nuanced approach to course delivery and design.`}</p>
            </section>
            
            <Separator />

            <section id="opportunity">
                <h3 className="text-2xl font-bold font-headline mb-4">Opportunity</h3>
                <p className="text-foreground/80">{`This project presented a significant opportunity to align the University's academic offerings with the strategic goal of increasing accessibility to quality education. By integrating foundational knowledge with specialised content across shared courses, the project sought to create a seamless and cohesive learning journey for students. The redevelopment was more than an academic exercise; it was a step towards redefining the educational model to be more inclusive, adaptable, and resonant with the needs of a modern learner.`}</p>
            </section>
            
            <Separator />
            
            <section id="showcases">
                <h3 className="text-2xl font-bold font-headline mb-4">OUA Showcases</h3>
                <div className="space-y-8">
                    <div>
                        <h4 className="font-bold font-headline text-lg mb-2">Showcase 1 - The OUA project - innovations behind the scenes</h4>
                        <div className="aspect-video">
                            <iframe className="w-full h-full rounded-lg" src="https://www.youtube.com/embed/0tVOoji-DFc?si=rKM-8LycbTLD0Yb6" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        </div>
                    </div>
                     <div>
                        <h4 className="font-bold font-headline text-lg mb-2">Showcase 2 - The OUA design process</h4>
                        <div className="aspect-video">
                            <iframe className="w-full h-full rounded-lg" src="https://www.youtube.com/embed/Cs7badqlanY?si=zc5ZWW-nqyZrePpB" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        </div>
                    </div>
                     <div>
                        <h4 className="font-bold font-headline text-lg mb-2">Showcase 3 - Reflections on the curriculum design process</h4>
                        <div className="aspect-video">
                            <iframe className="w-full h-full rounded-lg" src="https://www.youtube.com/embed/IHibmTs9hI0?si=vj3CG_EmvICGV9eY" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        </div>
                    </div>
                      <div>
                        <h4 className="font-bold font-headline text-lg mb-2">OUA Showcase - student testimonial</h4>
                        <div className="aspect-video">
                            <iframe className="w-full h-full rounded-lg" src="https://www.youtube.com/embed/Ky1E0DzbxsU?si=IAvNkQ_A-9RcVwqn" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        
        <aside className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Project Timeline</CardTitle>
            </CardHeader>
            <CardContent>
                <ul>
                    {projectTimeline.map((item, index) => <TimelineItem key={index} {...item} />)}
                </ul>
            </CardContent>
          </Card>
        </aside>
      </div>
      <footer className="mt-24 text-center bg-muted/50 py-12 rounded-lg">
        <h3 className="text-2xl font-bold font-headline mb-2">Interested in large-scale curriculum design?</h3>
        <p className="text-muted-foreground mb-6">Happy to walk through the design process artefacts and learning frameworks used.</p>
        <Button asChild>
            <Link href="/contact">Contact me</Link>
        </Button>
      </footer>
      <ScrollToTopButton />
    </CaseStudyLayout>
  );
}
