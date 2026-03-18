
import Image from 'next/image';
import Link from 'next/link';

import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollToTopButton } from '@/components/scroll-to-top-button';
import { ProjectNavigation } from '@/components/project-navigation';
import { CaseStudyLayout } from '@/components/case-study-layout';
import { CaseStudyHeader } from '@/components/case-study-header';

const UOA_BASE = 'https://timklapdor.github.io/uoa-online';

const COURSES = [
  { name: 'Personal Professional Development', program: 'Shared', slug: 'personal-professional-development' },
  { name: 'Managing Organisations and People', program: 'Shared', slug: 'managing-organisations-and-people' },
  { name: 'Introduction to Marketing', program: 'IB', slug: 'introduction-to-marketing' },
  { name: 'Data Analytics 1', program: 'IB', slug: 'data-analytics-1' },
  { name: 'Health Economics', program: 'Health', slug: 'health-economics' },
  { name: 'Corporate Responsibility for Global Business', program: 'IB', slug: 'corporate-responsibility-for-global-business' },
];

const UOA_NAV = [
  { label: 'About', href: `${UOA_BASE}/` },
  { label: 'Programs', href: `${UOA_BASE}/programs/` },
  { label: 'Courses', href: `${UOA_BASE}/courses/` },
  { label: 'People', href: `${UOA_BASE}/people/` },
  { label: 'Process', href: `${UOA_BASE}/process/` },
  { label: 'Tools', href: `${UOA_BASE}/tools/` },
];

const PROGRAM_BADGE: Record<string, string> = {
  IB: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  Health: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Shared: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
};

const TimelineItem = ({ year, title, duration }: { year: string, title: string, duration: string }) => (
  <li className="mb-4 flex items-start">
    <div className="flex flex-col items-center mr-4">
      <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-xs">
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
      <CaseStudyHeader slug="oua-design-process" />
        <ProjectNavigation
            prevProject={{slug: 'when-not-to-code'}}
            nextProject={{slug: 'communication-styles-quiz'}}
        />
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
            
            <section id="scope" className="cs-section">
                <h3 className="cs-h2">Project Scope</h3>
                <div className="cs-callout"><p className="text-foreground/80">{`The project spanned the development of 35 courses for Open Universities Australia (referred to as OUA) initiative, (six of which I was the lead Learning Designer), strategically designed to enhance the University of Adelaide's suite of fully online undergraduate offerings. The scope included courses for both the Bachelor of International Business and the Bachelor of Health Services Management programmes with 12 shared courses amongst the two streams and culminating in a eChallenge Captstone. This initiative aimed to address the growing need for flexible education solutions, catering to the evolving landscape of higher education.`}</p></div>
            </section>
            
            <section id="constraints" className="cs-section">
                <h3 className="cs-h2">Constraints</h3>
                <p className="text-foreground/80">{`The primary challenge was to cater to a diverse and geographically dispersed student population, predominantly from NSW, VIC, and QLD, while also considering the lifestyles of learners, 41% of whom are employed full-time. The demographic profile, heavily skewed towards working females aged between 30-39, demanded a flexible and nuanced approach to course delivery and design.`}</p>
            </section>
            
            <section id="opportunity" className="cs-section">
                <h3 className="cs-h2">Opportunity</h3>
                <p className="text-foreground/80">{`This project presented a significant opportunity to align the University's academic offerings with the strategic goal of increasing accessibility to quality education. By integrating foundational knowledge with specialised content across shared courses, the project sought to create a seamless and cohesive learning journey for students. The redevelopment was more than an academic exercise; it was a step towards redefining the educational model to be more inclusive, adaptable, and resonant with the needs of a modern learner.`}</p>
            </section>
            
            <section id="orca-pod" className="cs-section">
                <h3 className="cs-h2">The Orca Pod</h3>
                <p className="text-foreground/80 mb-4">
                  For three years, I had the privilege of designing learning across a diverse portfolio of OUA courses alongside an extraordinary team we called the Orca Pod, part of the Learning Enhancement Innovation division at the University of Adelaide. The name fit us perfectly. Orcas move with precision, communicate constantly, and rely on collective intelligence to navigate vast and unpredictable waters. That was exactly how we worked — no one operated alone. Ideas surfaced, circled, and strengthened through shared effort.
                </p>
                <p className="text-foreground/80 mb-6">
                  The pod changed over time. People moved on, new directions called, but the group's rhythm never broke. We held onto our Salmon Hats, stayed tightly coordinated, and when challenges appeared immovable, we did what orcas do best — worked together beneath the surface until something shifted. Presenting our collective process at ASCILITE 2025 gave us a moment to surface and look back at what we had built. A special acknowledgement goes to Tim Klapdor, my line manager across the entire UoA project, who built the companion portfolio site that documents this work in full.
                </p>
                <a
                  href={`${UOA_BASE}/people/rich-bartlett/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors"
                >
                  View my profile on the UoA Online project site <ExternalLink size={14} />
                </a>
            </section>

            <section id="courses" className="cs-section">
                <h3 className="cs-h2">Courses I Designed</h3>
                <p className="text-foreground/80 mb-6">
                  I was Lead Learning Designer on six courses across the Bachelor of International Business and Bachelor of Health Services Management programmes.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {COURSES.map((course) => (
                    <a
                      key={course.slug}
                      href={`${UOA_BASE}/courses/${course.slug}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col gap-2 border border-border p-4 hover:border-foreground transition-colors"
                    >
                      <span className="flex items-start justify-between gap-2">
                        <span className="font-medium text-sm leading-snug">{course.name}</span>
                        <ExternalLink size={14} className="flex-shrink-0 mt-0.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      </span>
                      <span className={`self-start text-xs font-medium px-2 py-0.5 rounded-full ${PROGRAM_BADGE[course.program]}`}>
                        {course.program === 'IB' ? 'International Business' : course.program === 'Health' ? 'Health Services Mgmt' : 'Shared'}
                      </span>
                    </a>
                  ))}
                </div>
            </section>

            <section id="showcases" className="cs-section">
                <h3 className="cs-h2">OUA Showcases</h3>
                <div className="space-y-8">
                    <div>
                        <h4 className="cs-h3 mb-2">Showcase 1 - The OUA project - innovations behind the scenes</h4>
                        <div className="aspect-video">
                            <iframe className="w-full h-full rounded-lg" src="https://www.youtube.com/embed/0tVOoji-DFc?si=rKM-8LycbTLD0Yb6" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        </div>
                    </div>
                     <div>
                        <h4 className="cs-h3 mb-2">Showcase 2 - The OUA design process</h4>
                        <div className="aspect-video">
                            <iframe className="w-full h-full rounded-lg" src="https://www.youtube.com/embed/Cs7badqlanY?si=zc5ZWW-nqyZrePpB" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        </div>
                    </div>
                     <div>
                        <h4 className="cs-h3 mb-2">Reflections on the curriculum design process</h4>
                        <div className="aspect-video">
                            <iframe className="w-full h-full rounded-lg" src="https://www.youtube.com/embed/IHibmTs9hI0?si=vj3CG_EmvICGV9eY" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        </div>
                    </div>
                      <div>
                        <h4 className="cs-h3 mb-2">OUA Showcase - student testimonial</h4>
                        <div className="aspect-video">
                            <iframe className="w-full h-full rounded-lg" src="https://www.youtube.com/embed/Ky1E0DzbxsU?si=IAvNkQ_A-9RcVwqn" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        
        <aside className="lg:col-span-1 space-y-6">
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
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-lg">Explore the full project</CardTitle>
              <p className="text-xs text-muted-foreground">timklapdor.github.io/uoa-online</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {UOA_NAV.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between text-sm hover:text-accent transition-colors group"
                    >
                      {item.label}
                      <ExternalLink size={12} className="text-muted-foreground group-hover:text-accent transition-colors" />
                    </a>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </aside>
      </div>
      <Card className="mt-24 text-center p-8 md:p-12">
        <h3 className="cs-h2">Interested in large-scale curriculum design?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Happy to walk through the design process artefacts and learning frameworks used.</p>
        <Button asChild>
            <Link href="/contact" target="_blank" rel="noopener noreferrer">Contact me</Link>
        </Button>
      </Card>
      <ScrollToTopButton />
    </CaseStudyLayout>
  );
}
