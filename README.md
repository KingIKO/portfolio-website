# Kingsley Okoli - Portfolio

A personal portfolio about test infrastructure, AI-assisted testing, and company-wide QA ownership. The design takes its reading-focused direction from Mathieu Flamant's site: a narrow column, serif headings, warm neutral colors, restrained dividers, and light/dark themes.

## Content

- Selected work explains the testing infrastructure, agent harness, and production investigations.
- AI copy describes the knowledge, tools, verification, and ongoing engineering judgment around the model.
- Employer names appear in the career history. Case descriptions explain the work without internal product identifiers.
- HallPass is the only independent project.
- The public resume follows the approved current resume, with email and LinkedIn contact information and no phone number.

## Development

React 19, Vite 7, self-hosted Lora and DM Sans, and a small Lucide icon set. No animation runtime, canvas, or third-party font requests.

```sh
npm ci
npm run dev
```

Open `http://127.0.0.1:5173/portfolio-website/`.

## Content and public files

`src/content.js` holds the portfolio copy. `src/resume.json` holds the public resume content. `scripts/build-public-pages.mjs` generates the HTML resume and the existing case-file URLs, and runs during every build.

To regenerate the committed public PDF and social preview after editing their sources:

```sh
node scripts/build-public-pages.mjs
npm run dev -- --port 4188 --strictPort
# In another terminal:
npm run render:assets
```

The renderer uses installed Chrome locally and Playwright Chromium in CI. Set `PORTFOLIO_URL` if the local server uses a different address. The full application resume remains outside this repository.

## Verification

```sh
npm run check
npm run test:e2e
```

Browser tests run against the production build, on desktop and mobile. They cover theme persistence, keyboard-operated case details, mobile menu focus, old deep links, no-JavaScript content, public artifacts, horizontal overflow, and accessibility in both themes.

## Deployment

The existing `.github/workflows/pages.yml` checks the site, builds it, tests it in Chromium, and deploys GitHub Pages on pushes to `master`. Pull requests run the same checks without deployment.

Production: https://kingiko.github.io/portfolio-website/
