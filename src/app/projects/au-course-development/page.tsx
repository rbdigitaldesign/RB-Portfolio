import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ScrollToTopButton } from '@/components/scroll-to-top-button'
import { ProjectNavigation } from '@/components/project-navigation'
import { CaseStudyLayout } from '@/components/case-study-layout'
import { CaseStudyHeader } from '@/components/case-study-header'
import { CASE_STUDY_ORDER } from '@/data/case-study-order'

// ---------------------------------------------------------------------------
// Inline helper components
// ---------------------------------------------------------------------------

function Placeholder({ label = 'Content placeholder' }: { label?: string }) {
  return (
    <div className="rounded-lg border-2 border-dashed border-amber-400 bg-amber-50 dark:bg-amber-950/20 p-5 my-4 text-center">
      <p className="text-xs font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400 mb-1">
        Placeholder
      </p>
      <p className="text-sm text-muted-foreground italic">{label}</p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const CYCLE_DATES = [
  { cycle: 6,  start: 'Jan 2025', m1: 'Feb 2025', m2: 'Mar 2025', final: 'Apr 2025' },
  { cycle: 7,  start: 'Feb 2025', m1: 'Mar 2025', m2: 'Apr 2025', final: 'May 2025' },
  { cycle: 8,  start: 'Mar 2025', m1: 'Apr 2025', m2: 'May 2025', final: 'Jun 2025' },
  { cycle: 9,  start: 'Apr 2025', m1: 'May 2025', m2: 'Jun 2025', final: 'Jul 2025' },
  { cycle: 10, start: 'May 2025', m1: 'Jun 2025', m2: 'Jul 2025', final: 'Aug 2025' },
  { cycle: 11, start: 'Jun 2025', m1: 'Jul 2025', m2: 'Aug 2025', final: 'Sep 2025' },
  { cycle: 12, start: 'Jul 2025', m1: 'Aug 2025', m2: 'Sep 2025', final: 'Oct 2025' },
  { cycle: 13, start: 'Aug 2025', m1: 'Sep 2025', m2: 'Oct 2025', final: 'Nov 2025' },
  { cycle: 14, start: 'Sep 2025', m1: 'Oct 2025', m2: 'Nov 2025', final: 'Dec 2025' },
]

const ATTAINMENT_PRINCIPLES = [
  {
    title: 'Sustainability & Global Citizenship',
    description:
      'Embedding sustainability perspectives and global awareness into course content, assessments, and learning activities that connect students to real-world challenges.',
  },
  {
    title: 'Flexibility & Stackability',
    description:
      'Designing modular content structures in Canvas that support stackable credentials, micro-credentials, and varied student entry points.',
  },
  {
    title: 'Digital Richness',
    description:
      'Creating interactive, media-rich learning experiences through H5P activities, video, audio, and custom Canvas page design.',
  },
  {
    title: 'Work-Integrated Learning (WIL)',
    description:
      'Supporting authentic assessment design that connects coursework to professional practice, industry contexts, and real-world application.',
  },
  {
    title: 'AI Literacy',
    description:
      'Advising on AI-aware assessment design and creating H5P activities and Canvas content that help students engage critically with AI tools.',
  },
  {
    title: 'Adelaide Academy',
    description:
      'Contributing to the Adelaide Graduate Attribute framework by helping course developers align learning outcomes to graduate capabilities through constructive alignment.',
  },
]

const ENVIRONMENT_PRINCIPLES = [
  'Students as active agents in their own learning',
  'Learning is social and collaborative',
  'Learning environments are inclusive and accessible',
  'Content is contextualised and authentic',
  'Assessment is meaningful and aligned',
  'Feedback is timely, specific, and forward-looking',
  'Technology enhances rather than replaces human connection',
]

type Discipline =
  | 'AI & Computing'
  | 'Sciences & Engineering'
  | 'Health & Life Sciences'
  | 'Humanities, Law & Business'

interface CourseEntry {
  name: string
  instructors: string
  discipline: Discipline
  activities: string[]
  notes?: string
}

const COURSES: CourseEntry[] = [
  // ── AI & Computing ──────────────────────────────────────────────────────
  {
    name: 'Advanced Topics in Artificial Intelligence and Machine Learning',
    instructors: 'Orvila',
    discipline: 'AI & Computing',
    activities: [
      'Facilitated quiz uplift',
      'H5P creation',
      'Custom summary boxes (in collaboration with Media team)',
      'Course module creation',
      'Uplifting key concept pages',
      'Uplifting references to APA 7 style',
    ],
  },
  {
    name: 'Bioinformatics: Sequencing Technologies',
    instructors: 'Jessica, Anna, James, Chris',
    discipline: 'AI & Computing',
    activities: [
      'Worked with LMS Support team to set up a Differentiated Content Solution via Learning Mastery in Canvas',
      'Quiz created and assigned to Learning Mastery; individual pathway pages added sequentially per score pathway',
      'Set up module prerequisites so students cannot progress without completing the previous module',
      'Fleshed out concept pages',
      'Duplicated course and imported content',
    ],
    notes:
      'The Learning Mastery differentiated content setup was a first for the team — a technical and pedagogical challenge requiring close collaboration with LMS Support.',
  },
  {
    name: 'Security Principles + Security Foundations',
    instructors: '',
    discipline: 'AI & Computing',
    activities: [
      'Uplifted lesson pages across both courses',
      'H5P uplifts',
      'Created a Branching Scenario H5P for Cyber Threat Intelligence topics',
    ],
  },
  {
    name: 'Enterprise Security',
    instructors: 'Stephen',
    discipline: 'AI & Computing',
    activities: [
      'Reworked H5P animation in Chapter 1 based on Media team feedback',
      'Requested Media team H5P uplift for Chapter 3 — Endpoint Security Strategies and Architectures',
    ],
  },
  {
    name: 'Applied Artificial Intelligence and Machine Learning',
    instructors: 'Feras',
    discipline: 'AI & Computing',
    activities: [
      'Updated styling of pages across the course',
      'Implemented Notebook LM audio files into course content',
    ],
  },
  {
    name: 'Generative AI',
    instructors: 'Alfred',
    discipline: 'AI & Computing',
    activities: [
      'Generated multiple H5P and Canvas quizzes',
      'Uplifted lesson pages',
      'Embedded videos',
      'Improved overall page styling',
    ],
  },

  // ── Sciences & Engineering ───────────────────────────────────────────────
  {
    name: 'Animal Handling & Husbandry 1',
    instructors: 'William',
    discipline: 'Sciences & Engineering',
    activities: [
      'Uplifted pages throughout the course',
      'H5P collaboration with Media team',
      'Wrote video scripts',
      'Scoped out and contributed to the AHAH Aboriginal Knowledges project',
    ],
    notes:
      'A broad scope of work — one of the more intensive courses I supported, spanning design, media, and an Indigenous knowledges initiative.',
  },
  {
    name: 'Geochemistry 2',
    instructors: 'Alex, Juraj, Monica',
    discipline: 'Sciences & Engineering',
    activities: [
      'At-elbow support throughout development',
      'Assisted with video scripts',
      'Quiz drafts',
      'Content additions to Canvas and page uplift',
      'Assignment creation',
    ],
  },
  {
    name: 'Number Theory',
    instructors: 'Sue',
    discipline: 'Sciences & Engineering',
    activities: [
      'Mapped topics and concepts from course notebook to Canvas',
    ],
  },
  {
    name: 'Honours Plant, Food and Soil Sciences Project',
    instructors: '',
    discipline: 'Sciences & Engineering',
    activities: [
      'Linked to the H5P Handbook for student reference',
    ],
  },
  {
    name: 'Construction Science & Materials',
    instructors: 'Thilini',
    discipline: 'Sciences & Engineering',
    activities: [
      'Imported Module 1 / Topic 1 / Concept 1',
      'Provided video presentation feedback',
      'Downloaded and converted images from Adobe Stock and Shutterstock from Word file',
      'Converted PPTX slides to AU style',
    ],
  },

  // ── Health & Life Sciences ───────────────────────────────────────────────
  {
    name: 'Additional Development for Introduction to Health Research',
    instructors: 'Anna, Elysia, Joanne',
    discipline: 'Health & Life Sciences',
    activities: [
      'Built custom interactive prototypes (linked to the VibeCheck tool)',
      'Created IHR Google Forms Topic Allocation system and handover documentation',
      'Facilitated course banner uplift',
      'Iterated on lesson page layouts',
      'Worked on video scripts',
      'Coordinated with DED Zofia on H5P uplifts',
    ],
    notes:
      'A highly collaborative project — spanning custom tooling, documentation systems, visual design, and media coordination.',
  },

  // ── Humanities, Law & Business ───────────────────────────────────────────
  {
    name: 'Thinking By Design',
    instructors: 'Ari, Ron',
    discipline: 'Humanities, Law & Business',
    activities: [
      'Assessment design and creation in Canvas',
      'Lesson page uplift',
    ],
  },
  {
    name: 'International Business Environment',
    instructors: '',
    discipline: 'Humanities, Law & Business',
    activities: ['Uplifted lesson content'],
  },
  {
    name: 'Administrative Law',
    instructors: '',
    discipline: 'Humanities, Law & Business',
    activities: [
      'Created a video script for map image',
      'Prototyped topic pages',
    ],
  },
  {
    name: 'Passions and Interests: The History of Greed',
    instructors: 'Eden',
    discipline: 'Humanities, Law & Business',
    activities: [
      'Lesson page uplifts',
      'Designed a custom navigation bar',
      'Converting PowerPoint presentations',
      'Creating H5P activities',
    ],
  },
  {
    name: 'Fundamentals of Climate Change',
    instructors: 'Sunny',
    discipline: 'Humanities, Law & Business',
    activities: [
      'Assessment creation in Canvas',
      'Converted Activity 3.3A from a basic Canvas Quiz to an interactive H5P activity',
    ],
  },
  {
    name: 'Culture, Society and Climate Change',
    instructors: 'Georgina',
    discipline: 'Humanities, Law & Business',
    activities: [
      'Updated styling for Interactive Seminars Weeks 3–10',
      'Quiz creation',
    ],
  },
]

const DISCIPLINE_STYLES: Record<Discipline, string> = {
  'AI & Computing':
    'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  'Sciences & Engineering':
    'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  'Health & Life Sciences':
    'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
  'Humanities, Law & Business':
    'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
}

const DISCIPLINES: Discipline[] = [
  'AI & Computing',
  'Sciences & Engineering',
  'Health & Life Sciences',
  'Humanities, Law & Business',
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

const THIS_SLUG = 'au-course-development'
const _idx = CASE_STUDY_ORDER.findIndex((p) => p.slug === THIS_SLUG)
const _prev = _idx > 0 ? CASE_STUDY_ORDER[_idx - 1] : null
const _next = _idx < CASE_STUDY_ORDER.length - 1 ? CASE_STUDY_ORDER[_idx + 1] : null

export default function AuCourseDevelopmentPage() {
  return (
    <CaseStudyLayout>
      <CaseStudyHeader slug="au-course-development" />
      <ProjectNavigation prevProject={_prev} nextProject={_next} />

      <div className="mt-12 lg:grid lg:grid-cols-3 lg:gap-12">
        {/* ── Main content ────────────────────────────────────────────── */}
        <main className="lg:col-span-2 space-y-0">

          {/* OVERVIEW */}
          <section id="overview" className="cs-section">
            <h2 className="cs-h2">Course Development at Adelaide University</h2>
            <p className="cs-body mb-4">
              Adelaide University launched a new curriculum in 2024, built from the ground up to reflect the
              Adelaide Attainment Model — a vision for graduates who are digitally capable, sustainability-minded,
              and equipped for work-integrated learning. Part 3 of this project is where that vision became
              a reality: the active design and build of over 200 courses across disciplines.
            </p>
            <p className="cs-body mb-4">
              As a Learning Designer embedded in the Teaching &amp; Learning Innovation team, my role was to
              support Academic Course Developers (ACDs) through structured 10-week build cycles. Across 2025,
              I worked on <strong>53 courses</strong> — advising on pedagogy, building in Canvas, creating H5P
              activities, coordinating with media teams, and helping ACDs translate their expertise into
              student-ready learning experiences.
            </p>
            <Placeholder label="Add an overview image, team photo, or process diagram here" />
          </section>

          {/* ROLE */}
          <section id="role" className="cs-section">
            <h2 className="cs-h2">My Role as Learning Designer</h2>
            <p className="cs-body mb-4">
              Each Learning Designer was allocated to a portfolio of courses per development cycle. For most
              courses, this meant a <strong>standard allocation of 15 hours</strong>; at-elbow courses — where
              the ACD needed more intensive support — received <strong>20+ hours</strong> of LD time.
            </p>
            <p className="cs-body mb-4">
              My primary contact window with ACDs was <strong>Weeks 4–8</strong> of the cycle, though I was
              often involved earlier for kick-off preparation and later for QA and handover.
            </p>
            <h3 className="cs-h3 mt-6">What I did as an LD</h3>
            <ul className="list-disc pl-5 space-y-2 cs-body mb-4">
              <li>Advised on constructive alignment: learning outcomes → assessments → content</li>
              <li>Co-created and reviewed lesson pages, concept pages, and topic structures in Canvas</li>
              <li>Built and uplifted H5P activities (quizzes, branching scenarios, flashcards, drag-and-drop)</li>
              <li>Wrote and reviewed video scripts; coordinated with Panopto and the Media team</li>
              <li>Converted PPTXs and Word documents to AU-branded Canvas content</li>
              <li>Completed and reviewed Course Details Forms with ACDs</li>
              <li>Supported assessment design: rubrics, instructions, Canvas assignment setup</li>
              <li>Coordinated QA reviews and contributed to the Course Readiness &amp; Handover Tool</li>
            </ul>
            <Placeholder label="Add a reflection, quote, or key moment from your experience in this role" />
          </section>

          {/* CYCLE */}
          <section id="cycle" className="cs-section">
            <h2 className="cs-h2">The 10-Week Development Cycle</h2>
            <p className="cs-body mb-6">
              Each course followed a structured 10-week development cycle with four milestone checkpoints.
              Multiple cycles ran concurrently across the team, meaning LDs were often supporting courses at
              different stages simultaneously.
            </p>

            {/* Milestone cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { week: 'Week 1', label: 'Kick-off', desc: 'ACD onboarding, Course Details Form review, scope agreement' },
                { week: 'Week 4', label: 'Milestone 1', desc: 'Module structure set, first content drafted, LD review begins' },
                { week: 'Week 7', label: 'Milestone 2', desc: 'Most content built, assessments drafted, media briefs submitted' },
                { week: 'Week 10', label: 'Final', desc: 'Course ready for QA, handover tool completed, student-ready' },
              ].map(({ week, label, desc }) => (
                <div
                  key={label}
                  className="rounded-lg border bg-muted/40 p-4 flex flex-col gap-1"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {week}
                  </span>
                  <span className="font-headline font-semibold text-base leading-snug">{label}</span>
                  <p className="text-sm text-muted-foreground leading-snug">{desc}</p>
                </div>
              ))}
            </div>

            {/* Cycle dates table */}
            <h3 className="cs-h3">Cycle Schedule — 2025</h3>
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left font-semibold">Cycle</th>
                    <th className="px-4 py-3 text-left font-semibold">Kick-off</th>
                    <th className="px-4 py-3 text-left font-semibold">Milestone 1</th>
                    <th className="px-4 py-3 text-left font-semibold">Milestone 2</th>
                    <th className="px-4 py-3 text-left font-semibold">Final</th>
                  </tr>
                </thead>
                <tbody>
                  {CYCLE_DATES.map(({ cycle, start, m1, m2, final }) => (
                    <tr key={cycle} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-2 font-semibold">{cycle}</td>
                      <td className="px-4 py-2 text-muted-foreground">{start}</td>
                      <td className="px-4 py-2 text-muted-foreground">{m1}</td>
                      <td className="px-4 py-2 text-muted-foreground">{m2}</td>
                      <td className="px-4 py-2 text-muted-foreground">{final}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Placeholder label="Add a note about your most memorable or challenging cycle, or an insight about the rhythm of parallel cycles" />
          </section>

          {/* ATTAINMENT MODEL */}
          <section id="attainment" className="cs-section">
            <h2 className="cs-h2">Aligning to the Adelaide Attainment Model</h2>
            <p className="cs-body mb-6">
              The Adelaide Attainment Model is the pedagogical backbone of AU&apos;s new curriculum. Every
              course was expected to demonstrate alignment to its six principles. As an LD, I helped ACDs
              interpret and apply these principles practically — in assessment design, content structure,
              and the choice of learning activities.
            </p>
            <div className="space-y-4">
              {ATTAINMENT_PRINCIPLES.map(({ title, description }) => (
                <Card key={title}>
                  <CardHeader className="pb-2">
                    <CardTitle className="font-headline text-base">{title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">{description}</p>
                    <Placeholder label={`Add specific examples, artefacts, or screenshots showing how your work aligned to "${title}"`} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* DELIVERABLES */}
          <section id="deliverables" className="cs-section">
            <h2 className="cs-h2">Supporting Course Developers: Key Deliverables</h2>
            <p className="cs-body mb-6">
              The development cycle was structured around four key deliverables. My role as LD was to support
              ACDs in meeting each one — not to build the course for them, but to provide the scaffolding,
              expertise, and hands-on assistance they needed to do it well.
            </p>

            <h3 className="cs-h3">1. Course Completion &amp; Teaching Readiness</h3>
            <p className="cs-body mb-2">
              The overarching goal: a student-ready course in Canvas by the end of Week 10. This meant all
              modules published, assessments configured, media embedded, and QA completed. I supported ACDs
              in prioritising what needed to be done, identifying gaps, and ensuring nothing fell through the
              cracks in the final weeks.
            </p>
            <Placeholder label="Add evidence: QA checklist screenshots, a completed course example, or student-ready criteria artefacts" />

            <h3 className="cs-h3 mt-8">2. Course Details Form &amp; Constructive Alignment</h3>
            <p className="cs-body mb-2">
              The Course Details Form was a foundational document mapping Course Learning Outcomes (CLOs)
              to assessments, rubrics, and learning activities. I worked with ACDs to complete or review their
              CDFs — ensuring CLOs were measurable, assessments were appropriately weighted, and content was
              genuinely aligned to what was being assessed.
            </p>
            <Placeholder label="Add example Course Details Form snippets, a CLO mapping table, or a rubric you helped develop" />

            <h3 className="cs-h3 mt-8">3. Course Development &amp; Canvas Build</h3>
            <p className="cs-body mb-2">
              The hands-on build phase: writing assessment instructions, creating lesson and concept pages,
              designing H5P activities, embedding Panopto videos, converting PPTXs, sourcing and formatting
              images, and building the Canvas module structure. I collaborated closely with Digital Education
              Developers (DEDs), the Media team, and LMS Support depending on the course&apos;s needs.
            </p>
            <Placeholder label="Add Canvas screenshots, learning activity examples, video scripts or storyboards, or course structure maps" />

            <h3 className="cs-h3 mt-8">4. Course Readiness &amp; Handover Tool</h3>
            <p className="cs-body mb-2">
              Before a course could be marked complete, it needed to pass through the Course Readiness &amp;
              Handover Tool — a structured checklist ensuring all components were in place for a smooth
              transition to delivery. I contributed to handover documentation and helped ACDs close out any
              remaining items before final sign-off.
            </p>
            <Placeholder label="Add an example handover tool output, completion notes, or a reflection on the handover process for a specific course" />
          </section>

          {/* COURSES */}
          <section id="courses" className="cs-section">
            <h2 className="cs-h2">Courses I Worked On</h2>
            <div className="cs-callout mb-8">
              Across 2025, I worked on <strong>53 courses</strong> spanning disciplines from AI and computing
              to climate science, law, and the arts. Below are 18 courses I was most closely involved in,
              grouped by discipline.
            </div>

            {DISCIPLINES.map((discipline) => {
              const courses = COURSES.filter((c) => c.discipline === discipline)
              if (courses.length === 0) return null
              return (
                <div key={discipline} className="mb-12">
                  <div className="flex items-center gap-3 mb-5">
                    <h3 className="cs-h3 mb-0">{discipline}</h3>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${DISCIPLINE_STYLES[discipline]}`}
                    >
                      {courses.length} course{courses.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="space-y-6">
                    {courses.map((course) => (
                      <Card key={course.name} className="overflow-hidden">
                        <CardHeader className="pb-3">
                          <div className="flex flex-wrap items-start gap-2 mb-1">
                            <span
                              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${DISCIPLINE_STYLES[course.discipline]}`}
                            >
                              {course.discipline}
                            </span>
                            {course.instructors && (
                              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                                {course.instructors}
                              </span>
                            )}
                          </div>
                          <CardTitle className="font-headline text-lg leading-snug">
                            {course.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          {course.notes && (
                            <p className="cs-callout text-sm mb-4">{course.notes}</p>
                          )}
                          <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                            Key activities
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm text-foreground/80 leading-relaxed mb-4">
                            {course.activities.map((activity) => (
                              <li key={activity}>{activity}</li>
                            ))}
                          </ul>
                          <Placeholder label="Add screenshots or images from this course" />
                          <Placeholder label="Add video, audio, or embedded media from this course" />
                          <Placeholder label="Add additional notes, reflections, or context for this course" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )
            })}
          </section>

          {/* PRINCIPLES */}
          <section id="principles" className="cs-section">
            <h2 className="cs-h2">AU Learning Environment Principles in Practice</h2>
            <p className="cs-body mb-6">
              Alongside the Attainment Model, AU&apos;s seven Learning Environment Principles guided how
              courses were designed and built. These principles informed the everyday decisions I made as an
              LD — from how a lesson page was structured to how feedback was framed in an assessment rubric.
            </p>
            <div className="space-y-6">
              {ENVIRONMENT_PRINCIPLES.map((principle, index) => (
                <div key={principle} className="flex gap-4">
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-headline font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold leading-snug mb-1">{principle}</p>
                    <Placeholder label={`Add specific examples showing how your LD work reflected this principle`} />
                  </div>
                </div>
              ))}
            </div>
          </section>

        </main>

        {/* ── Sidebar ─────────────────────────────────────────────────── */}
        <aside className="mt-12 lg:mt-0">
          <div className="sticky top-24 space-y-6">

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="font-headline text-lg">Quick Facts</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-0.5">Role</dt>
                    <dd>Learning Designer</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-0.5">Period</dt>
                    <dd>2024 – 2026 (ongoing)</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-0.5">Courses in 2025</dt>
                    <dd>53+</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-0.5">Tools</dt>
                    <dd className="leading-relaxed">Canvas LMS, H5P, Trello, CurV, Monday.com, Panopto</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-0.5">Standard allocation</dt>
                    <dd>15 h standard / 20+ h at-elbow</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Separator />

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="font-headline text-lg">Dev Cycle at a Glance</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-3 text-sm">
                  {[
                    { week: 'Wk 1', label: 'Kick-off', desc: 'Onboarding & CDF review' },
                    { week: 'Wk 4', label: 'Milestone 1', desc: 'Structure set, drafts begun' },
                    { week: 'Wk 7', label: 'Milestone 2', desc: 'Content built, media submitted' },
                    { week: 'Wk 10', label: 'Final', desc: 'QA complete, handover done' },
                  ].map(({ week, label, desc }) => (
                    <li key={label} className="flex gap-3">
                      <span className="flex-shrink-0 text-xs font-semibold text-muted-foreground pt-0.5 w-10">
                        {week}
                      </span>
                      <span>
                        <span className="font-semibold">{label}</span>
                        <br />
                        <span className="text-muted-foreground">{desc}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

          </div>
        </aside>
      </div>

      {/* ── Footer CTA ──────────────────────────────────────────────────── */}
      <Card className="mt-16">
        <CardContent className="p-8 text-center">
          <h3 className="cs-h3 mb-2">Interested in curriculum design at scale?</h3>
          <p className="cs-body mb-4 max-w-lg mx-auto">
            I&apos;m always happy to talk about learning design, Canvas builds, H5P, or what it looks like
            to work across 53 courses in a year.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
          >
            Get in touch <ExternalLink className="w-4 h-4" />
          </Link>
        </CardContent>
      </Card>

      <ScrollToTopButton />
    </CaseStudyLayout>
  )
}
