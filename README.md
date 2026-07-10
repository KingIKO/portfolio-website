# Kingsley Okoli - AI Reliability Portfolio

A production portfolio for Kingsley Okoli, positioned as an AI Reliability Engineer and Quality Systems Architect.

## What this site is

The site presents a single technical thesis: capable automation is not automatically trustworthy. Its case studies and system diagrams show how evidence contracts, deterministic guardrails, observability, executable knowledge, and drift detection turn AI agents into defensible engineering systems.

Employer work is anonymized. Public project names and metrics are included only where the underlying source material supports them.

## Stack

- React 19
- Vite 7
- GSAP + ScrollTrigger
- Custom Canvas 2D reliability-core visualization
- Vitest + Testing Library
- Playwright + axe-core
- GitHub Pages deployment workflow

## Local development

```bash
npm ci
npm run dev
```

Open `http://127.0.0.1:5173/portfolio-website/`.

## Verification

```bash
npm run check
npm run test:e2e
```

`npm run check` runs the unit/component tests and creates a production build. Playwright verifies desktop and mobile rendering, runtime errors, navigation, motion controls, accessibility, CTA visibility, and horizontal overflow.

## Build

```bash
npm run build
npm run preview
```

Vite writes the deployable static site to `dist/`. The configured base path is `/portfolio-website/` for the repository's GitHub Pages URL.

## Résumés

- The anonymized public résumé is generated and committed under `public/` as HTML and PDF.
- The full application résumé contains the real employer and direct contact details. It is intentionally stored outside this public repository.

## Deployment

`.github/workflows/pages.yml` verifies the site, builds `dist/`, and deploys the artifact on pushes to `master`. Before the first deployment of this architecture, GitHub Pages must use **GitHub Actions** as its source rather than legacy branch publishing.

The previous direct-to-`master` deployment scripts were removed because they staged arbitrary files and targeted inconsistent branches.
