export const metrics = [
  {
    value: '240+',
    label: 'executable application skills',
    detail: 'A versioned knowledge layer precise enough for an agent to run each flow cold.',
    source: 'Career export, 2026-07-10',
  },
  {
    value: '190',
    label: 'product flows exercised',
    detail: 'Four roles, real actions, observed outcomes, and no silent skips.',
    source: 'Career export, 2026-07-10',
  },
  {
    value: '1,300+',
    label: 'daily API assertions',
    detail: 'Fifty collections with automated triage and roughly 99% steady-state signal.',
    source: 'Career export, 2026-07-10',
  },
  {
    value: '770+',
    label: 'browser tests owned',
    detail: 'A Playwright and TypeScript suite spanning three production user roles.',
    source: 'Career export, 2026-07-10',
  },
  {
    value: '2 years',
    label: 'of silent failure uncovered',
    detail: 'A user-facing success state hid 2,473 server-side errors affecting 43 users.',
    source: 'Career export, 2026-07-10',
  },
];

export const caseStudies = [
  {
    id: 'agent-system',
    index: '01',
    eyebrow: 'Autonomous quality system',
    timeframe: '2026',
    context: 'Anonymized B2B sales intelligence platform · four production roles · 190 documented flows',
    title: 'Teaching an AI agent an entire SaaS platform',
    summary:
      'I encoded hundreds of product flows into an executable knowledge layer, then surrounded the agent with deterministic rules that made shallow passes and invented excuses structurally difficult.',
    signal: 'A capable agent could navigate the product, but its verdicts were not dependable enough to run unsupervised.',
    system: [
      '240+ versioned skills capture selectors, fixtures, edge cases, and expected outcomes.',
      'Evidence contracts require a real action and an observed result before a flow can pass.',
      'A progress ledger and watchdog keep long programs alive across sessions and context limits.',
    ],
    outcome: '190 flows across four roles, zero silent skips, and zero false bug reports.',
    telemetry: ['240+ skills', '190 flows', '4 roles', '0 false reports'],
    artifact: { label: 'Open sanitized case file', href: './case-files/index.html#agent-system' },
  },
  {
    id: 'ci-signal',
    index: '02',
    eyebrow: 'CI reliability engineering',
    timeframe: '2026',
    context: 'Anonymized B2B sales intelligence platform · six CI runners · shared staging backend',
    title: 'Restoring trust after nineteen red days',
    summary:
      'The suite had been red long enough for the team to stop listening. I reproduced every failure live, separated known defects from environment noise, and fixed the system creating the ambiguity.',
    signal: 'Six parallel runners were overloading a shared staging backend and turning response delay into misleading test failures.',
    system: [
      'Reproduced failures in a real browser instead of classifying from logs.',
      'Traced timeouts through page hydration, backend latency, and runner concurrency.',
      'Raised timeout floors and tuned the execution topology rather than patching tests one by one.',
    ],
    outcome: 'Zero new product bugs hidden in the streak. The hardened suite returned to green and stayed actionable.',
    telemetry: ['19 red days', '21 failures', '0 new bugs', '6 runners'],
    artifact: { label: 'Open sanitized case file', href: './case-files/index.html#ci-signal' },
  },
  {
    id: 'production-forensics',
    index: '03',
    eyebrow: 'Production forensics',
    timeframe: '2026',
    context: 'Anonymized B2B communications platform · production exception telemetry · session replay',
    title: 'Finding failures no single monitor could see',
    summary:
      'I joined exception telemetry, production session replay, source code, and live reproduction into one investigation loop. Each lens covered the blind spots of the others.',
    signal: 'The browser reported success while an internal call failed behind it. One monitoring lens made the incident look healthy.',
    system: [
      'Overturned my first diagnosis when a controlled retest contradicted it.',
      'Chased the server error through exception data and verified the user impact in replay.',
      'Turned the incident into a repeatable dual-lens triage standard.',
    ],
    outcome: 'A two-year silent defect surfaced with 2,473 recorded errors and 43 affected users in 90 days.',
    telemetry: ['2 years', '2,473 errors', '43 users', '1 hidden defect'],
    artifact: { label: 'Open sanitized case file', href: './case-files/index.html#production-forensics' },
  },
];

export const methodology = [
  {
    id: 'evidence',
    number: '01',
    title: 'Evidence contracts',
    text: 'A verdict has an explicit evidence bar. A pass requires a real action and an observed outcome. Logs can suggest; they cannot convict.',
  },
  {
    id: 'guardrails',
    number: '02',
    title: 'Machine-enforced honesty',
    text: 'Deterministic gates block shallow checks, unsupported completion claims, and false blocked verdicts at the moment they occur.',
  },
  {
    id: 'knowledge',
    number: '03',
    title: 'Executable knowledge',
    text: 'Every hard-won flow becomes a versioned skill. The system compounds instead of relearning the same application every session.',
  },
  {
    id: 'ledgers',
    number: '04',
    title: 'Durable execution',
    text: 'Progress ledgers, checkpoints, and watchdogs let multi-hour programs survive context limits without quietly stopping early.',
  },
  {
    id: 'adversarial',
    number: '05',
    title: 'Adversarial verification',
    text: 'Agent findings are treated as claims. Parallel critics and direct source checks rule out plausible but incorrect conclusions.',
  },
  {
    id: 'sentinels',
    number: '06',
    title: 'Drift sentinels',
    text: 'Quiet systems need alarms for missing activity. Knowledge, CI, and background AI pipelines all get checks for silent decay.',
  },
];

export const projects = [
  {
    id: 'hallpass',
    featured: true,
    name: 'Hallpass',
    kind: 'Product + data platform',
    summary: 'A convention companion built across Next.js, Flutter, Supabase, and a layered schedule-ingestion system.',
    proof: '~2,900 conventions, 25,000+ events, two clients, production data-quality and SEO operations.',
    stack: ['Next.js', 'Flutter', 'Supabase', 'LLM ingestion'],
    action: { label: 'Visit Hallpass', href: 'https://hallpass.me', external: true },
    status: 'Public product',
  },

  {
    id: 'second-brain',
    name: 'Compounding Second Brain',
    kind: 'Knowledge infrastructure',
    summary: 'An automated capture, distill, and lint pipeline that maintains a cited, versioned knowledge graph in Obsidian.',
    proof: 'Immutable source layer, federated topic wikis, hourly distillation, and daily integrity repair.',
    stack: ['Obsidian', 'Markdown', 'Agent pipelines', 'Git'],
    action: { label: 'Request private walkthrough', href: 'mailto:kingsleyiokoli@gmail.com?subject=Compounding%20Second%20Brain%20walkthrough' },
    status: 'Private system',
  },
  {
    id: 'e7-advisor',
    name: 'E7 Advisor',
    kind: 'Verified optimizer',
    summary: 'A React application for browsing equipment and solving constrained six-slot build searches for 372 characters.',
    proof: 'The optimized search matched a brute-force oracle 12 of 12 times; stat math matched 111 characters with zero drift.',
    stack: ['Next.js', 'TypeScript', 'Search', 'Verification'],
    action: { label: 'Request private walkthrough', href: 'mailto:kingsleyiokoli@gmail.com?subject=E7%20Advisor%20walkthrough' },
    status: 'Private system',
  },

];

export const principles = [
  'A guard must be able to break.',
  'Coverage is counted in actions, not pages.',
  'Never classify a failure from logs alone.',
  'Flakiness is usually state, not randomness.',
  'Silence is not health. Give quiet systems a sentinel.',
  'Completing the turn is not completing the task.',
  'A false blocked verdict is indistinguishable from an uncaught bug.',
  'Keep AI knowledge where you can audit it.',
];
