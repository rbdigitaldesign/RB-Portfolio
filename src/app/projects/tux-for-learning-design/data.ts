export const projectContent = {
  brief: `A UX-for-learning toolkit was needed to provide fast, repeatable, and accessible methods for course design. Success is defined by enabling learning designers and academics to consistently apply user-centred principles, improving the quality of educational experiences and streamlining the development process.`,
  problem: [
    `Inconsistent methods used across different course design projects.`,
    `Scattered artefacts and documentation leading to lost knowledge.`,
    `Tight schedules with academics leaving little time for deep UX research.`,
    `Weak decision trails making it hard to justify design choices.`,
    `Uneven application of accessibility standards.`,
  ],
  solution: [
    { title: 'Curated methods for learning design', description: 'Adapted UX activities mapped to common course problems.' },
    { title: 'Ready-to-run assets', description: 'Method cards, canvases, and facilitator scripts to use out-of-the-box.' },
    { title: 'Time-boxed formats', description: '15, 30, and 60-minute variants for busy contributors.' },
    { title: 'Evidence & decision trails', description: 'Lightweight capture methods to link insights directly to design choices.' },
    { title: 'Accessibility by default', description: 'Templates with readable typescale, high contrast, and printable black & white versions.' },
  ],
  designApproach: {
    research: 'The process began with a brief literature scan and interviews with learning designers and academics to understand their current workflows and pain points.',
    synthesis: 'Needs were mapped to established UX techniques, and common constraints (like time and resources) were defined to shape the workshop formats.',
    prototyping: 'Several pilot workshops were run to test and iterate on the templates, timings, and language, ensuring they were practical and easy to understand for the target audience.',
  },
  promptToPrototype: {
    overview: 'As a coding partner, ChatGPT helped scaffold the initial toolkit website, which was then hosted on GitHub Pages. This allowed for rapid, vibe-driven development.',
    challenge: [
      'Translating abstract "UX vibes" into concrete HTML, CSS, and JavaScript.',
      'Navigating version control and deployment for the first time.',
      'Keeping UX testing of the toolkit distinct from generic feedback on the website itself.',
      'Integrating reputable methods and accessible tools into the content.',
    ],
    processHighlights: {
      chatbox: `Structured HTML on the fly; tailored CSS to the university's brand palette; added JavaScript for search and a "scroll-to-top" button; received step-by-step deployment guidance.`,
      github: 'Followed beginner-friendly flows (initialise repository, commit changes, push to remote, deploy via GitHub Pages); learned to recover from mistakes late at night.',
      toolkitShape: 'The site structure evolved to include: Home, Methodologies, Tools, Resources, and Contact, with a search.js file for functionality. Content was anchored in reputable sources like NN/g and IDF.',
      branding: "Applied the university's blue, purple, and limestone palette to ensure readability, consistency, and accessibility.",
    },
    reflections: 'Skipping wireframes in favour of a fast build-and-learn cycle proved effective. The layout of the homepage and profile cards evolved through iteration. The "break one thing, fix three" loop became a familiar challenge, often solved with terse prompts when tired.',
    outcome: [
      'A live prototype site successfully stood up on GitHub Pages.',
      'Structured guidance for educators was made available.',
      'Integrated recommendations for external tools.',
      'Demonstrated a powerful blend of human creativity and AI assistance.',
    ],
    lessons: [
      'Vibe-driven coding with clear prompts unleashes progress for non-developers.',
      'Iteration is painful but powerful, especially with version control for diffs and rollbacks.',
      'Clarity is crucial—separating UX testing from generic feedback is key.',
      'GitHub is a universal toolkit that extends far beyond software teams.',
    ],
    future: [
      "Conduct further qualitative research to validate and refine the toolkit's methods.",
      'Collaborate with the UX group to map the toolkit\'s structure to a universal design process (Empathise, Define, Ideate, Prototype, Evaluate, Iterate, Share Outcomes).',
      'Create short video walkthroughs for key methods.',
      'Improve repository hygiene and documentation.',
      'Collaborate with media and engineering teams for advanced features.',
      'Advocate for broader adoption across the institution.',
    ],
  },
  toolkitComposition: [
    `Method cards detailing when and how to use each technique.`,
    `Canvases for mapping learner jobs, journeys, risks, assumptions, and a decision trail.`,
    `Workshop run sheets with step-by-step instructions.`,
    `Completed examples to provide clear reference points.`,
    `A master slide deck for presenting methods and findings.`,
    `A facilitator checklist to ensure smooth session delivery.`,
  ],
  outcomes: [
    `A clearer, more consistent facilitation flow for workshops.`,
    `Reduced preparation time thanks to ready-to-use assets.`,
    `Reusable and transparent decision trails for better project documentation.`,
    `Positive feedback and requests for further sessions from participants.`,
  ],
  reflection: {
    worked: 'The ready-to-run assets and time-boxed formats were highly effective. The decision trail provided immediate value.',
    constraints: 'Piloting was limited to willing participants; broader adoption requires more strategic advocacy.',
    next: 'The next major step is to re-author the toolkit as a native Canvas LMS course to increase accessibility and integration. Short video explainers will be added for each method, and a governance model for versioning will be established.',
  },
};

export const canvasContent = {
  transition: `By September 2025, the GitHub Pages prototype had served its purpose: it proved the concept, surfaced real pain points through early user feedback, and gave the team a tangible artefact to rally around. But a standalone website — however polished — asked something of its audience that an institutional learning team couldn't reliably deliver: a link, a bookmark, a habit of going somewhere new. The decision was made to rebuild TUX as a native Canvas LMS course.`,

  pivotRationale: `Canvas is where staff already live. Lectures are uploaded there, announcements go out through it, and professional development is increasingly delivered inside it. Moving TUX into Canvas meant the toolkit would appear in the same environment where learning designers and academics do their daily work — no new logins, no separate tab to remember, no friction at the point of need. The shift also addressed persistent accessibility concerns: Canvas's built-in accessibility checker, captioning tools, and screen-reader compatibility offered guarantees that a hand-rolled GitHub Pages site simply couldn't match. Finally, embedding TUX inside the institutional ecosystem opens the door to formal integration with onboarding pathways, quality frameworks, and professional learning catalogues — giving it a sustainability and reach the prototype could never have.`,

  fiveSteps: [
    { step: 'Plan', description: 'Define the testing question, select the most appropriate UX method, and scope the session to the time and resources available. This is where you choose what you are actually trying to learn.' },
    { step: 'Recruit', description: 'Identify who should participate and how many people are needed. This step covers writing recruitment briefs, coordinating with Students as Partners or staff panels, and confirming logistics ahead of the session.' },
    { step: 'Test', description: 'Facilitate the session using one of the toolkit methods — whether that is a think-aloud walkthrough, a card sort, a structured interview, or a rapid heuristic review. The focus is on observing and listening, not on defending design decisions.' },
    { step: 'Analyse', description: 'Make sense of what emerged. Cluster findings, identify patterns, and connect insights back to the original design question. Lightweight synthesis tools from the toolkit help turn raw notes into actionable takeaways.' },
    { step: 'Deliver', description: 'Share findings in a format that suits the audience and drives action — whether that is a short slide deck, a populated decision trail canvas, or a verbal debrief with a course team. The aim is to close the loop and keep the evidence visible.' },
  ],

  designThinking: `For Phase 2, the team adopted the five-stage Design Thinking model — Empathise, Define, Ideate, Prototype, and Test & Evaluate — as the backbone of the Canvas course structure. The choice was deliberate. Design Thinking is well documented, visually intuitive, and widely taught, which means novice practitioners can orient themselves within a familiar map even when the specific UX methods are new to them. Rather than inventing a proprietary process, TUX maps its activities to stages most learning designers can already name. Each Canvas module anchors a cluster of methods to a stage of the model, giving users a clear answer to the question: "When do I use this?" The framework was also selected because it is non-linear in practice — it invites return visits and iteration — which mirrors the reality of course design work, where teams often revisit earlier stages as new evidence surfaces.`,

  teamOverview: `Phase 2 is a collaborative effort. The core team — Tim Churchward, Kelli Knuth, Alex Price, and Rich Bartlett — came together from across Learning Enhancement and Innovation, each bringing a different lens to the work. Tim contributes strategic oversight and learning design expertise; Kelli brings a sharp eye for content structure and instructional clarity; Alex anchors the accessibility and student experience perspective; and Rich leads the UX design integration and Canvas build. The group adopted the working name "Cheesebags Anonymous" — a tongue-in-cheek label that signals the psychological safety the team has built to experiment, debate, and occasionally get things wrong together. Collaboration happens across two primary environments: a shared SharePoint Word document for drafting and co-authoring content (with a deliberate no-track-changes rule to keep the document clean and readable), and a Canvas sandpit where module structures, page designs, and interaction patterns are tested before anything moves into the live course environment.`,

  scopeDecisions: [
    `Course Essentials was selected as the home for the TUX Canvas course — a dedicated section within the institution's Canvas environment designed specifically for professional learning and staff resources, making it a natural fit.`,
    `The scope was intentionally scaled back from the Phase 1 prototype. Rather than attempting to document every possible UX method, the team agreed to focus on a curated set of high-value, high-feasibility techniques suited to the constraints of learning design work.`,
    `Where strong external resources already exist — particularly from Nielsen Norman Group (NN/g) and the Interaction Design Foundation (IDF) — the course links out rather than attempting to replicate or paraphrase established guidance. This keeps the content focused and avoids unnecessary maintenance burden.`,
    `Track changes were deliberately disabled in the shared Word documents. The decision prioritised readability over revision history, with version control handled through file naming conventions and SharePoint version history instead.`,
  ],

  ethics: `Because TUX involves gathering feedback from participants — including students — the team sought clarity on the ethics obligations early. A Quality Assurance exemption from the university's Human Research Ethics process was confirmed, meaning the testing activity sits within normal quality improvement practice rather than formal research. In place of a heavy legal consent form, the team designed a simple checkbox acknowledgement that participants complete at the start of each testing session. The checkbox confirms informed participation without creating bureaucratic friction that would discourage staff and students from volunteering. This streamlined approach reflects a broader principle the team is building into the toolkit itself: ethics should be visible and genuine, but never so cumbersome that it becomes a barrier to running tests in the first place.`,

  recruitment: `Student testers are being recruited through the Students as Partners (SaP) programme, coordinated by Anthea D'Aloia. SaP provides access to the Student Leaders Network — a pool of more than 560 engaged students who have opted in to contribute to university improvement initiatives. The agreed process is straightforward: staff from the TUX team provide the requirements and session brief; the SaP team promotes the opportunity through the Network; staff then train and onboard any students who agree to participate. One question remains open: remuneration. Options under discussion include applying for small project grants or providing gift vouchers, but no final model has been confirmed. Resolving this will be a priority before the first formal testing round.`,

  naming: `The question of what to call the resource ran longer than expected. "Guide" was the early front-runner — it is familiar, modest, and accurately describes a document that points people toward methods. But the team kept returning to "Toolkit." A toolkit implies something physical, something you carry with you and reach for when you need it. It suggests completeness without being encyclopaedic, and it positions the user as someone who does things, not just reads them. The naming debate also shaped a broader convention that now runs across the course documents: action-oriented language. Page titles, module headings, and navigation labels are written as things you do or decide, not things you consume. The word "Toolkit" won because it felt solid — and the naming convention that came out of that debate made the rest of the content more purposeful.`,

  contentProgress: [
    { module: 'Getting Started', page: 'Why should I run UX testing?', assigned: 'Rich Bartlett', status: 'Ready for review' },
    { module: 'Getting Started', page: 'What exactly am I testing and what outcomes do I want?', assigned: 'Rich Bartlett', status: 'Ready for review' },
    { module: 'Getting Started', page: 'Who needs to be involved and give approval for my testing?', assigned: 'Rich Bartlett', status: 'Ready for review' },
    { module: 'Planning and Running Testing', page: 'How do I choose the right testing method and tools?', assigned: 'Kelli Knuth', status: 'Ready for review' },
    { module: 'Planning and Running Testing', page: 'How do I recruit and prepare users for testing?', assigned: 'Kelli Knuth', status: 'In progress' },
    { module: 'Planning and Running Testing', page: 'How do I run a testing session?', assigned: 'Tim Churchward', status: 'In progress' },
    { module: 'Planning and Running Testing', page: 'How do I capture meaningful data?', assigned: 'Kelli Knuth', status: 'In progress' },
    { module: 'Iterating and Improving', page: 'How do I turn testing results into insights and reports?', assigned: 'Alex Price', status: 'Ready for review' },
    { module: 'Iterating and Improving', page: 'How do I use testing insights to improve designs over time?', assigned: 'Alex Price', status: 'In progress' },
  ],

  canvasOutcomes: [
    `A working Canvas LMS prototype has been established in the university sandpit environment, with the course structure, module scaffolding, and initial pages in place.`,
    `A sustainable team collaboration model is running — combining SharePoint co-authoring with Canvas sandpit testing and regular synchronous check-ins.`,
    `Content allocation across the nine core pages has been agreed and assigned, giving each team member clear ownership of their contribution.`,
    `The ethics pathway has been clarified: QA exemption confirmed, checkbox consent designed, and the approach documented so future testing rounds can proceed without delay.`,
  ],
};

export const galleryImages = [
  { src: 'https://i.imgur.com/r4LoKz6.png', alt: 'ive build of the toolkit on github pages showing navigation and search', hint: 'live build toolkit' },
  { src: 'https://i.imgur.com/MaiMjSF.png', alt: 'home page with search bar, main tool kit buttons, team info', hint: 'home page search team' },
  { src: 'https://i.imgur.com/K3pvDbr.png', alt: 'Example of UX methods page', hint: 'ux methods page' },
  { src: 'https://i.imgur.com/tGQbFmp.png', alt: 'Example of UX tools page', hint: 'ux tools page' },
  { src: 'https://i.imgur.com/UfgW5a0.png', alt: 'UX/ review checklist tool, utilising a mix of Uni Quality framework and UX checklist to create a report for designers', hint: 'checklist tool report' },
  { src: 'https://i.imgur.com/gZVNi9r.png', alt: 'Personas page, with PPTX developer by team mate Kelli Knuth', hint: 'personas page presentation' },
  { src: 'https://i.imgur.com/Py2dBmx.jpeg', alt: 'Miro board for collaborative toolkit planning', hint: 'miro board planning' },
];

export const canvasGalleryImages = [
  { src: '/canvas-uxtoolkit-home-page.png', alt: 'Canvas LMS home page for the UX Toolkit course', hint: 'canvas ux toolkit home' },
  { src: '/tux-canvas-why-test.png', alt: 'Canvas LMS page: Why should I run UX testing?', hint: 'canvas lms why test' },
  { src: '/tux-canvas-who-involved.png', alt: 'Canvas LMS page: Who needs to be involved for my testing?', hint: 'canvas lms who involved' },
  { src: '/tux-miro-mvt-flow.png', alt: 'Miro board: Minimum viable testing flow', hint: 'miro minimum viable testing' },
  { src: '/tux-miro-design-thinking.png', alt: 'Miro board: Design thinking framework map', hint: 'miro design thinking map' },
  { src: '/tux-miro-modules.png', alt: 'Miro board: Five-module course structure', hint: 'miro course modules structure' },
];

export const allGalleryImages = [...galleryImages, ...canvasGalleryImages];

export function calculateReadingTime(text: string) {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
