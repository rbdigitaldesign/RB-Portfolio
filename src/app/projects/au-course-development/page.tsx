import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ScrollToTopButton } from '@/components/scroll-to-top-button'
import { ProjectNavigation } from '@/components/project-navigation'
import { CaseStudyLayout } from '@/components/case-study-layout'
import { CaseStudyHeader } from '@/components/case-study-header'
import { CaseStudyTOC } from '@/components/case-study-toc'
import { AuCourseGrid } from '@/components/au-course-grid'
import { CASE_STUDY_ORDER } from '@/data/case-study-order'
import {
  CYCLE_DATES,
  ATTAINMENT_PRINCIPLES,
  ENVIRONMENT_PRINCIPLES,
  TOC_ITEMS,
} from '@/data/au-course-development-data'

// ---------------------------------------------------------------------------
// Page nav
// ---------------------------------------------------------------------------

const THIS_SLUG = 'au-course-development'
const _idx  = CASE_STUDY_ORDER.findIndex((p) => p.slug === THIS_SLUG)
const _prev = _idx > 0 ? CASE_STUDY_ORDER[_idx - 1] : null
const _next = _idx < CASE_STUDY_ORDER.length - 1 ? CASE_STUDY_ORDER[_idx + 1] : null

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

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
              Adelaide Attainment Model — a vision for graduates who are digitally capable,
              sustainability-minded, and equipped for work-integrated learning. Part 3 of this project is
              where that vision became reality: the active design and build of over 200 courses across
              disciplines.
            </p>
            <p className="cs-body mb-4">
              As a Learning Designer embedded in the Teaching &amp; Learning Innovation team, my role was to
              support Academic Course Developers (ACDs) through structured 10-week build cycles. Across 2025,
              I worked on <strong>53 courses</strong> — advising on pedagogy, building in Canvas, creating
              H5P activities, coordinating with media teams, and helping ACDs translate their expertise into
              student-ready learning experiences.
            </p>
          </section>

          {/* BY THE NUMBERS */}
          <section id="numbers" className="cs-section">
            <h2 className="cs-h2">By the Numbers</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              {[
                { value: '9',    label: 'Development cycles',    sub: 'Cycles 6–14 in 2025' },
                { value: '53+',  label: 'Courses supported',     sub: 'Across all disciplines' },
                { value: '4',    label: 'Discipline clusters',   sub: 'AI, Sciences, Health, Humanities' },
                { value: '15 h', label: 'Standard allocation',   sub: '20+ h for at-elbow courses' },
              ].map(({ value, label, sub }) => (
                <div key={label} className="rounded-xl border bg-muted/40 p-5 flex flex-col gap-1">
                  <span className="font-headline font-bold text-3xl leading-none text-accent">{value}</span>
                  <span className="font-semibold text-sm leading-snug mt-1">{label}</span>
                  <span className="text-xs text-muted-foreground leading-snug">{sub}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ROLE */}
          <section id="role" className="cs-section">
            <h2 className="cs-h2">My Role as Learning Designer</h2>
            <p className="cs-body mb-4">
              Each Learning Designer was allocated a portfolio of courses per development cycle. For most
              courses this meant a <strong>standard allocation of 15 hours</strong>; at-elbow courses —
              where the ACD needed more intensive support — received <strong>20+ hours</strong> of LD time.
              My primary contact window with ACDs was <strong>Weeks 4–8</strong> of each cycle, though I
              was often involved earlier for kick-off preparation and later for QA and handover.
            </p>
            <h3 className="cs-h3 mt-6">What I did as an LD</h3>
            <ul className="list-disc pl-5 space-y-2 cs-body mb-6">
              <li>Advised on constructive alignment: learning outcomes → assessments → content</li>
              <li>Co-created and reviewed lesson pages, concept pages, and topic structures in Canvas</li>
              <li>Built and uplifted H5P activities (quizzes, branching scenarios, flashcards, drag-and-drop)</li>
              <li>Wrote and reviewed video scripts; coordinated with Panopto and the Media team</li>
              <li>Converted PPTXs and Word documents to AU-branded Canvas content</li>
              <li>Completed and reviewed Course Details Forms with ACDs</li>
              <li>Supported assessment design: rubrics, instructions, Canvas assignment setup</li>
              <li>Coordinated QA reviews and contributed to the Course Readiness &amp; Handover Tool</li>
            </ul>
            <div className="cs-callout">
              The rhythm of the role took time to internalise. In a typical week I might be reviewing CLO
              alignment for a week-1 kick-off course, building H5P activities for a week-7 course, and
              completing handover documentation for a week-10 course — all concurrently. Getting comfortable
              with that juggle, and knowing which conversations could wait versus which needed immediate
              attention, was the core professional challenge.
            </div>
          </section>

          {/* CYCLE */}
          <section id="cycle" className="cs-section">
            <h2 className="cs-h2">The 10-Week Development Cycle</h2>
            <p className="cs-body mb-6">
              Each course followed a structured 10-week development cycle with four milestone checkpoints.
              Multiple cycles ran concurrently, meaning LDs were often supporting courses at different stages
              simultaneously.
            </p>

            {/* Milestone cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { week: 'Week 1',  label: 'Kick-off',     desc: 'ACD onboarding, Course Details Form review, scope agreement' },
                { week: 'Week 4',  label: 'Milestone 1',  desc: 'Module structure set, first content drafted, LD review begins' },
                { week: 'Week 7',  label: 'Milestone 2',  desc: 'Most content built, assessments drafted, media briefs submitted' },
                { week: 'Week 10', label: 'Final',        desc: 'Course ready for QA, handover tool completed, student-ready' },
              ].map(({ week, label, desc }) => (
                <div key={label} className="rounded-lg border bg-muted/40 p-4 flex flex-col gap-1">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{week}</span>
                  <span className="font-headline font-semibold text-base leading-snug">{label}</span>
                  <p className="text-sm text-muted-foreground leading-snug">{desc}</p>
                </div>
              ))}
            </div>

            {/* Cycle dates table */}
            <h3 className="cs-h3">Cycle Schedule — 2025</h3>
            <div className="overflow-x-auto rounded-lg border mb-6">
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

            <div className="cs-callout">
              The most striking thing about the cycle schedule was how quickly Cycle 6 became Cycle 14. By the
              time a course reached its Final milestone, three newer cohorts had already kicked off. I kept a
              personal tracker alongside Monday.com to visualise the full landscape — where each course sat,
              what was due, and where I had headspace to go deep versus where I needed to be efficient.
            </div>
          </section>

          {/* ATTAINMENT MODEL */}
          <section id="attainment" className="cs-section">
            <h2 className="cs-h2">Aligning to the Adelaide Attainment Model</h2>
            <p className="cs-body mb-6">
              The Adelaide Attainment Model is the pedagogical backbone of AU&apos;s new curriculum. Every
              course was expected to demonstrate alignment to its six principles. As an LD, I helped ACDs
              interpret and apply these principles practically — in assessment design, content structure, and
              the choice of learning activities.
            </p>
            <div className="space-y-4">
              {ATTAINMENT_PRINCIPLES.map(({ title, description, example }) => (
                <Card key={title}>
                  <CardHeader className="pb-2">
                    <CardTitle className="font-headline text-base">{title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-2">
                    <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                    <p className="text-sm leading-relaxed border-l-2 border-accent pl-3">{example}</p>
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
            <p className="cs-body mb-4">
              The overarching goal: a student-ready course in Canvas by the end of Week 10. This meant all
              modules published, assessments configured, media embedded, and QA completed. I supported ACDs
              in prioritising what needed to be done, identifying gaps, and ensuring nothing fell through the
              cracks in the final weeks.
            </p>
            <p className="cs-body mb-2">
              By the final week, the checklist was extensive: published modules, live assessments, embedded
              Panopto videos, accessible H5P, QA sign-off, and a completed handover tool. The courses I&apos;m
              proudest of are the ones where the ACD reached Week 10 feeling confident — where support had
              been scaffolded rather than substituted.
            </p>

            <h3 className="cs-h3 mt-8">2. Course Details Form &amp; Constructive Alignment</h3>
            <p className="cs-body mb-4">
              The Course Details Form was a foundational document mapping Course Learning Outcomes (CLOs) to
              assessments, rubrics, and learning activities. I worked with ACDs to complete or review their
              CDFs — ensuring CLOs were measurable, assessments were appropriately weighted, and content was
              genuinely aligned to what was being assessed.
            </p>
            <p className="cs-body mb-2">
              The CDF review was often where the real pedagogical conversation happened. Many academics who
              had been teaching face-to-face for years had tacit knowledge they&apos;d never articulated as
              learning outcomes. The CDF forced that articulation — which was sometimes uncomfortable but
              always valuable. The most productive conversations happened when an ACD realised their assessment
              didn&apos;t actually measure what their CLO claimed.
            </p>

            <h3 className="cs-h3 mt-8">3. Course Development &amp; Canvas Build</h3>
            <p className="cs-body mb-4">
              The hands-on build phase: writing assessment instructions, creating lesson and concept pages,
              designing H5P activities, embedding Panopto videos, converting PPTXs, sourcing and formatting
              images, and building the Canvas module structure. I collaborated closely with Digital Education
              Developers (DEDs), the Media team, and LMS Support depending on each course&apos;s needs.
            </p>
            <p className="cs-body mb-2">
              The build phase was where the abstract became concrete. A lesson page in Bioinformatics looked
              completely different from one in Administrative Law. Adapting to different disciplinary
              conventions while maintaining AU&apos;s visual and structural standards was a constant creative
              challenge — and the part of the role I found most satisfying.
            </p>

            <h3 className="cs-h3 mt-8">4. Course Readiness &amp; Handover Tool</h3>
            <p className="cs-body mb-4">
              Before a course could be marked complete, it needed to pass through the Course Readiness &amp;
              Handover Tool — a structured checklist ensuring all components were in place for a smooth
              transition to delivery.
            </p>
            <p className="cs-body mb-2">
              A good handover was one where the ACD could describe their course confidently to a student. The
              Handover Tool gave us a shared language for &quot;done&quot; — but the real test was whether the
              course could stand alone. My role in the final handover was to push back gently where items were
              marked complete but weren&apos;t quite there yet, and to help ACDs close those gaps so we could
              sign off with genuine confidence.
            </p>
          </section>

          {/* COURSES */}
          <section id="courses" className="cs-section">
            <h2 className="cs-h2">Courses I Worked On</h2>
            <div className="cs-callout mb-8">
              Across 2025, I worked on <strong>53 courses</strong> spanning disciplines from AI and computing
              to climate science, law, and the arts. Below are 18 courses I was most closely involved in —
              click any tile to see key activities, CLOs, and assessments.
            </div>
            <AuCourseGrid />
          </section>

          {/* CURRICULUM LAB */}
          <section id="curriculum-lab" className="cs-section scroll-mt-24">
            <h2 className="cs-h2">AI Common Core: Curriculum Lab</h2>

            <div className="cs-callout mb-8">
              <p className="cs-body">
                <strong>Responsible AI: Bridging Ethics, Education and Industry</strong> is Adelaide
                University&apos;s AI Common Core — a shared unit taken by students across all
                disciplines. One of the Academic Course Developers, Walter, flagged a UX friction
                point in the Week 3 Discussion Task: tutors running large interactive workshops had
                no reliable way to coordinate structured group discussions across numbered tables
                without shouting across the room or printing handouts. I built a lightweight
                real-time facilitation tool to solve it.
              </p>
            </div>

            {/* Problem / Solution */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader><CardTitle className="cs-h3">The Problem</CardTitle></CardHeader>
                <CardContent>
                  <p className="cs-body">
                    Tutors running large AI Common Core workshops needed to assign discussion
                    questions to individual tables, push updates in real-time, and guide students
                    through a structured framework — without relying on printing or verbal
                    instruction across a large room. The solution needed to be lightweight enough
                    for a single session yet flexible enough to reuse across different courses.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="cs-h3">The Solution</CardTitle></CardHeader>
                <CardContent>
                  <p className="cs-body mb-3">
                    <strong>Curriculum Lab</strong> is a lightweight web app with two interfaces:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>
                      <strong className="text-foreground">Tutor Dashboard</strong> — assign 9
                      curated curriculum questions to numbered tables, push assignments live, and
                      generate QR codes for easy student access.
                    </li>
                    <li>
                      <strong className="text-foreground">Student View</strong> — students enter
                      their table number and instantly see their assigned question, discussion
                      steps, and thematic background imagery.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Key Features */}
            <h3 className="cs-h3 mb-4">Key Features</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {[
                { title: 'Real-time sync', desc: 'Assignments update instantly across all connected student devices via websocket subscriptions.' },
                { title: 'QR code generation', desc: 'Tutors can display or print QR codes linking directly to each table\'s view.' },
                { title: 'Structured discussion framework', desc: 'Four-step guided scaffold: Individual Reflection → Group Share → Find the Tension → Agree on Justification.' },
                { title: 'Thematic imagery', desc: 'Each question has a contextual background image at 10% opacity — engaging without competing with question text.' },
                { title: 'AU branding', desc: 'Full Adelaide University colour palette: Dark Blue #140F50, NT Purple #836BFF, Bright Blue #1448FF, South East Limestone #F8EFE0.' },
                { title: 'Course-agnostic', desc: 'Questions, discussion steps, and table counts are all configurable — straightforward to adapt for any course or institution.' },
              ].map(f => (
                <div key={f.title} className="rounded-lg border bg-muted/30 p-4">
                  <p className="font-semibold text-sm mb-1">{f.title}</p>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <h3 className="cs-h3 mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Supabase', 'QRCode.react', 'Lovable'].map(t => (
                <span key={t} className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#1448FF]/10 text-[#1448FF] dark:text-blue-300 border border-[#1448FF]/20">
                  {t}
                </span>
              ))}
            </div>

            {/* Screenshots */}
            <h3 className="cs-h3 mb-4">Screenshots</h3>
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {/* Stock workshop image */}
              <div className="relative overflow-hidden rounded-xl border shadow-sm aspect-[16/10]">
                <Image
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80"
                  alt="Students engaged in a large workshop discussion"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[#140F50]/40" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-xs text-white/80">AI Common Core Workshop — Week 3 Discussion Task</p>
                </div>
              </div>
              {/* Canvas comments screenshot */}
              <div className="relative overflow-hidden rounded-xl border shadow-sm aspect-[16/10]">
                <Image
                  src="/canvas-comments.jpg"
                  alt="Canvas page showing the Discussion Task with Walter's annotation requesting a facilitation tool"
                  fill
                  className="object-cover object-top"
                />
              </div>
              {/* Curriculum Lab QR code screenshot */}
              <div className="relative overflow-hidden rounded-xl border shadow-sm aspect-[16/10]">
                <Image
                  src="/curriculum-lab.jpg"
                  alt="Curriculum Lab join screen with Adelaide University branding and QR code"
                  fill
                  className="object-contain bg-[#F8EFE0]"
                />
              </div>
              {/* Live link card */}
              <div className="rounded-xl border bg-muted/30 p-6 flex flex-col justify-center gap-3">
                <p className="font-semibold">Try Curriculum Lab</p>
                <p className="text-sm text-muted-foreground">
                  The app is deployed and publicly accessible.
                </p>
                <a
                  href="https://ai-cc-curriculum-lab.lovable.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1448FF] hover:underline"
                >
                  ai-cc-curriculum-lab.lovable.app <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Design Decisions */}
            <h3 className="cs-h3 mb-4">Design Decisions</h3>
            <ul className="space-y-3 cs-body list-disc list-outside pl-5">
              <li>Minimal student interface — just table number entry — to reduce friction in a live workshop setting.</li>
              <li>Background images kept at 10% opacity after testing showed higher values competed with question text.</li>
              <li>Discussion steps use a numbered timeline layout to create a sense of progression through the activity.</li>
              <li>Question content and discussion structure are centralised in a single store file, making it trivial to swap in a different course&apos;s content without touching UI code.</li>
            </ul>
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
              {ENVIRONMENT_PRINCIPLES.map(({ label, example }, index) => (
                <div key={label} className="flex gap-4">
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-headline font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold leading-snug mb-2">{label}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{example}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* REFLECTIONS */}
          <section id="reflections" className="cs-section">
            <h2 className="cs-h2">Reflections &amp; Key Takeaways</h2>

            <h3 className="cs-h3">What worked well</h3>
            <p className="cs-body mb-4">
              The structured cycle gave both LDs and ACDs a shared language for progress. Milestone
              checkpoints turned what could have been a vague 10-week sprint into a series of manageable
              conversations: &quot;by Week 4 we need X; by Week 7 we need Y.&quot; That predictability reduced
              anxiety for academics and made it easier for me to manage a concurrent portfolio of 8–12 courses.
            </p>
            <p className="cs-body mb-6">
              The cross-team collaboration model also worked better than I expected. Having DEDs, Media,
              and LMS Support as distinct specialist roles meant I could broker support rather than being
              the bottleneck for every technical problem. Knowing when to escalate versus when to handle
              something myself was a skill I built quickly.
            </p>

            <h3 className="cs-h3">What was hard</h3>
            <p className="cs-body mb-4">
              The hardest part was the scope variation. A &quot;standard 15-hour course&quot; could range
              from a well-prepared ACD who just needed a Canvas build, to an academic who needed help
              conceptualising their course from scratch. The hours were fixed; the ambiguity wasn&apos;t.
              Learning to scope honestly with ACDs early — and to be clear about what 15 hours could and
              couldn&apos;t achieve — was essential.
            </p>
            <p className="cs-body mb-4">
              The process was fundamentally academic-led — and the level of engagement varied enormously.
              Some course developers arrived prepared and eager to collaborate; others were navigating
              significant competing pressures. Full teaching loads, active research commitments, unfamiliarity
              with online pedagogy, anxiety about committing to a public platform, and simple overcommitment
              all affected the pace and depth of collaboration available in any given cycle. There&apos;s no
              clean solution to this — it&apos;s structural. But it meant that the same 15-hour allocation
              could produce very different outcomes depending on the working relationship, and building trust
              quickly became as important as any technical skill.
            </p>
            <p className="cs-body mb-4">
              Not having a complete set of tools and scaffolding resources made some engagements harder than
              they needed to be. When an ACD was starting from a blank page — no existing course materials,
              no content brief, no prior online equivalent — significant time went into helping them draft and
              structure content before any Canvas build could begin. Without a shared exemplar library,
              templated H5P structures tailored to different disciplines, or a bank of reusable course
              components, that scaffolding sometimes absorbed a disproportionate share of the allocation.
              Better tooling was advocated for; it takes time to materialise.
            </p>
            <p className="cs-body mb-6">
              Late-breaking content changes in Week 8–9 were a recurring challenge. An ACD rethinking an
              assessment in the final weeks could create knock-on effects for QA across other courses running
              simultaneously. Proactive milestone check-ins and an early-warning habit helped contain this,
              but it never fully went away.
            </p>

            <h3 className="cs-h3">What I&apos;d do differently</h3>
            <p className="cs-body mb-4">
              I&apos;d invest more time in the kick-off conversation. The courses that ran smoothest were
              the ones where I spent an extra 30–45 minutes in Week 1 establishing shared expectations:
              what the ACD wanted, what the course needed, and where the 15 hours would be best spent.
              When that conversation was rushed or skipped, the misalignment showed up later — often at
              the worst possible moment.
            </p>
            <p className="cs-body">
              I&apos;d also build in more peer review between LDs earlier in the process. By the end of
              the year we had informal patterns for sharing course templates and H5P designs, but a more
              deliberate sharing practice from Cycle 6 onwards would have accelerated quality and reduced
              duplicated effort across the team.
            </p>
          </section>

        </main>

        {/* ── Sidebar ─────────────────────────────────────────────────── */}
        <aside className="mt-12 lg:mt-0">
          {/* TOC gets its own sticky wrapper — keeps it isolated from the
              info cards so the inner sticky nav inside CaseStudyTOC never
              overlaps the cards below it */}
          <div className="sticky top-24 mb-6">
            <CaseStudyTOC items={TOC_ITEMS} />
          </div>

          {/* Info cards flow naturally below the sticky TOC */}
          <div className="space-y-6">
            <Separator />

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
                    { week: 'Wk 1',  label: 'Kick-off',     desc: 'Onboarding & CDF review' },
                    { week: 'Wk 4',  label: 'Milestone 1',  desc: 'Structure set, drafts begun' },
                    { week: 'Wk 7',  label: 'Milestone 2',  desc: 'Content built, media submitted' },
                    { week: 'Wk 10', label: 'Final',        desc: 'QA complete, handover done' },
                  ].map(({ week, label, desc }) => (
                    <li key={label} className="flex gap-3">
                      <span className="flex-shrink-0 text-xs font-semibold text-muted-foreground pt-0.5 w-10">{week}</span>
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
