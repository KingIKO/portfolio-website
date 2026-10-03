export const profile = {
  name: 'Kingsley Okoli',
  role: 'QA engineer',
  location: 'New York City',
  email: 'kingsleyiokoli@gmail.com',
  linkedin: 'https://www.linkedin.com/in/kingsley-okoli',
  github: 'https://github.com/KingIKO',
};

export const caseStudies = [
  {
    id: 'ci-signal',
    category: 'Test infrastructure',
    title: 'Building the systems to run QA alone.',
    summary: 'Framework architecture, parallel CI, and release decisions brought together in a quality function I built and operate myself.',
    paragraphs: [
      'As the sole QA engineer, I own test planning, browser and API automation, production investigation, and release approval. I built the infrastructure that lets me carry that responsibility across the application.',
      'The Playwright and TypeScript framework covers three user roles. Parallel CI machines share authentication, while tests that use the same data run on the same machine. Unstable tests are isolated until they pass independently.',
      'I also built daily API checks in Postman with automated reporting. The responsibility extends beyond running tests: I maintain the framework as the product changes and investigate failures before making release decisions.',
    ],
  },
  {
    id: 'agent-system',
    category: 'AI testing systems',
    title: 'Putting testing expertise into an agent harness.',
    summary: 'Application knowledge, custom tools, and evidence requirements that let me direct AI testing while retaining engineering judgment.',
    paragraphs: [
      'I built a custom harness around Claude Code to work from a supplied ticket. Documented workflows give the agent application context, and a custom Model Context Protocol (MCP) server gives it tools to interact with the browser.',
      'Automated checks require supporting evidence before accepting a passing result. Those requirements are part of the system I designed around the model, alongside the knowledge and tools it needs to test the application.',
      'I use this harness as part of the QA function I operate. I remain responsible for test strategy, production investigation, and release decisions.',
    ],
  },
  {
    id: 'production-forensics',
    category: 'Production investigation',
    title: 'Tracing a silent failure to deployment order.',
    summary: 'An application release preceded its required database update by four hours. Approximately 2,300 customer changes were silently dropped.',
    paragraphs: [
      'I traced the dropped changes to the gap between the server deployment and the database update it depended on. I documented the incident timeline so engineering could address the deployment sequence.',
      'In separate investigations, I used customer-session recordings to identify eight confirmed bugs, including an application failure after releases for people with an existing browser tab open.',
      'This work connects the behavior a user sees with the systems behind it, and gives engineering concrete findings to act on.',
    ],
  },
];

export const projects = [
  {
    id: 'hallpass',
    name: 'HallPass',
    description: 'Find a convention. Plan the trip.',
    paragraphs: [
      'A convention discovery and trip-planning app I designed, built, and run independently. Available on the web and on Android through Google Play.',
      'Behind the app, a discovery pipeline finds conventions and an AI agent checks them against organizer websites before publication. Database rules keep one listing per convention edition, preserve data during duplicate merges, and remove emails and phone numbers before AI processing.',
    ],
    stack: 'Next.js / Supabase / Flutter',
    href: 'https://hallpass.me',
  },
];

export const experience = [
  {
    company: 'Sellfire',
    role: 'QA Engineer',
    dates: 'Aug 2025 - present',
    description: 'Sole QA engineer. Built and operate the testing infrastructure and AI harness supporting company-wide quality assurance.',
  },
  {
    company: 'Rapptr Labs',
    role: 'Software Development Engineer in Test',
    dates: 'Aug 2024 - Aug 2025',
    description: 'Built a client\'s initial Playwright framework and CI integration from scratch. The client subsequently hired me directly because of this work.',
  },
  {
    company: 'Rapptr Labs',
    role: 'QA Tester',
    dates: 'Nov 2021 - Aug 2024',
    description: 'Test planning, regression coverage, defect reproduction, and SQL validation of application data and workflow states.',
  },
];
