// ---------------------------------------------------------------------------
// Data for the AU Course Development Part 3 case study page
// Extracted from page.tsx to keep the page component manageable
// ---------------------------------------------------------------------------

export const CYCLE_DATES = [
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

export interface AttainmentPrinciple {
  title: string
  description: string
  example: string
}

export const ATTAINMENT_PRINCIPLES: AttainmentPrinciple[] = [
  {
    title: 'Sustainability & Global Citizenship',
    description:
      'Embedding sustainability perspectives and global awareness into course content, assessments, and learning activities that connect students to real-world challenges.',
    example:
      'For Fundamentals of Climate Change and Culture, Society & Climate Change I helped design Canvas assessments grounded in real-world climate scenarios. For Animal Handling & Husbandry I contributed to an Aboriginal Knowledges initiative, supporting the team in scoping how Indigenous perspectives could be meaningfully woven into course content.',
  },
  {
    title: 'Flexibility & Stackability',
    description:
      'Designing modular content structures in Canvas that support stackable credentials, micro-credentials, and varied student entry points.',
    example:
      'For Bioinformatics: Sequencing Technologies I worked with the LMS Support team to build a differentiated content pathway using Canvas Learning Mastery — a first for the team. Students at different starting points accessed different resources based on quiz performance, with module prerequisites preventing out-of-sequence progression.',
  },
  {
    title: 'Digital Richness',
    description:
      'Creating interactive, media-rich learning experiences through H5P activities, video, audio, and custom Canvas page design.',
    example:
      'H5P was the main tool across most courses — quizzes, branching scenarios, drag-and-drop, and flashcards. For Applied AI & Machine Learning I embedded NotebookLM audio summaries into the course structure. Custom summary boxes and styled lesson pages were co-developed with the Media team across the AI & Computing cluster.',
  },
  {
    title: 'Work-Integrated Learning (WIL)',
    description:
      'Supporting authentic assessment design that connects coursework to professional practice, industry contexts, and real-world application.',
    example:
      'Assessment design across Thinking By Design, Geochemistry 2, and the security courses focused on authentic professional tasks — from enterprise security scenario analysis to field report preparation. I helped ACDs move from generic task descriptions to discipline-specific, professionally-grounded assessment instructions.',
  },
  {
    title: 'AI Literacy',
    description:
      'Advising on AI-aware assessment design and creating H5P activities and Canvas content that help students engage critically with AI tools.',
    example:
      'The AI & Computing cluster was particularly rich: Generative AI (Alfred), Applied AI/ML (Feras), and Advanced Topics in AI/ML (Orvila) all needed nuanced assessment design. I helped ACDs write instructions that specified when and how AI tools could be used, and built H5P activities that prompted students to engage critically with AI outputs rather than just accept them.',
  },
  {
    title: 'Adelaide Academy',
    description:
      'Contributing to the Adelaide Graduate Attribute framework by helping course developers align learning outcomes to graduate capabilities through constructive alignment.',
    example:
      'Across most courses, the Course Details Form review was where graduate attribute alignment happened. I helped ACDs map CLOs to Adelaide Graduate Attributes — turning broad aspirational outcomes into measurable, assessable statements. The most productive conversations were often when an ACD realised their assessment didn\'t actually measure what their CLO claimed.',
  },
]

export interface EnvironmentPrinciple {
  label: string
  example: string
}

export const ENVIRONMENT_PRINCIPLES: EnvironmentPrinciple[] = [
  {
    label: 'Students as active agents in their own learning',
    example:
      'H5P branching scenarios — like the Cyber Threat Intelligence activity for Security Principles — gave students meaningful decisions with consequences, not just passive quiz questions. The Bioinformatics differentiated pathway let students determine their own route through content based on what they already knew.',
  },
  {
    label: 'Learning is social and collaborative',
    example:
      'Discussion forums and peer-review tasks were built with clear scaffolding — rubrics that rewarded thoughtful engagement rather than participation counts. For IHR I helped build a Google Forms topic allocation system so students could coordinate their own group work with less friction.',
  },
  {
    label: 'Learning environments are inclusive and accessible',
    example:
      'Every page I built followed AU\'s accessibility guidelines: correct heading hierarchy, sufficient contrast, alt text on images, keyboard-accessible H5P configurations. APA 7 referencing was standardised across courses, and custom Canvas components were reviewed against the AU style guide.',
  },
  {
    label: 'Content is contextualised and authentic',
    example:
      'The most engaging pages connected content directly to students\' future practice — Geochemistry fieldwork contexts, enterprise security real-world scenarios, and AI applications in the student\'s own discipline. Generic content was the hardest to make stick; contextualised content wrote itself.',
  },
  {
    label: 'Assessment is meaningful and aligned',
    example:
      'CDF reviews were fundamentally about alignment: every assessment was traceable to a CLO, and every CLO was assessable. When the chain broke — "analyse" in a CLO but only "describe" in the assessment — we fixed it before building, not after.',
  },
  {
    label: 'Feedback is timely, specific, and forward-looking',
    example:
      'Rubric criteria were drafted to be genuinely formative — not just "good analysis" but "clearly identifies the mechanism and cites supporting evidence; next step is to connect this to the broader literature." Vague criteria were replaced with actionable descriptors at each grade band.',
  },
  {
    label: 'Technology enhances rather than replaces human connection',
    example:
      'The principle I returned to most often. H5P and NotebookLM audio were chosen to free up synchronous time for deeper discussion, not as substitutes for academic presence. When a simpler tool served the learning need better, that\'s what we used — as the VibeCheck / Miro exploration showed.',
  },
]

export type Discipline =
  | 'AI & Computing'
  | 'Sciences & Engineering'
  | 'Health & Life Sciences'
  | 'Humanities, Law & Business'

export interface CourseEntry {
  name: string
  instructors: string
  discipline: Discipline
  activities: string[]
  notes?: string
}

export const COURSES: CourseEntry[] = [
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
    activities: ['Mapped topics and concepts from course notebook to Canvas'],
  },
  {
    name: 'Honours Plant, Food and Soil Sciences Project',
    instructors: '',
    discipline: 'Sciences & Engineering',
    activities: ['Linked to the H5P Handbook for student reference'],
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
    activities: ['Assessment design and creation in Canvas', 'Lesson page uplift'],
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
    activities: ['Created a video script for map image', 'Prototyped topic pages'],
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
    activities: ['Updated styling for Interactive Seminars Weeks 3–10', 'Quiz creation'],
  },
]

export const DISCIPLINE_STYLES: Record<Discipline, string> = {
  'AI & Computing':         'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  'Sciences & Engineering': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  'Health & Life Sciences': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
  'Humanities, Law & Business': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
}

export const DISCIPLINES: Discipline[] = [
  'AI & Computing',
  'Sciences & Engineering',
  'Health & Life Sciences',
  'Humanities, Law & Business',
]

export const TOC_ITEMS = [
  { href: '#overview',     label: 'Overview' },
  { href: '#numbers',      label: 'By the Numbers' },
  { href: '#role',         label: 'My Role' },
  { href: '#cycle',        label: 'Dev Cycle' },
  { href: '#attainment',   label: 'Attainment Model' },
  { href: '#deliverables', label: 'Key Deliverables' },
  { href: '#courses',      label: 'Courses' },
  { href: '#principles',   label: 'Learning Principles' },
  { href: '#reflections',  label: 'Reflections' },
]
