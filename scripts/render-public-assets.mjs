import { chromium } from '@playwright/test';
const browser = await chromium.launch(process.env.CI ? {} : { channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
const base = process.env.PORTFOLIO_URL || 'http://127.0.0.1:4188/portfolio-website/';
try {
  await page.goto(`${base}Kingsley-Okoli-Public-Resume.html`, { waitUntil: 'networkidle' });
  await page.pdf({ path: 'public/Kingsley-Okoli-Public-Resume.pdf', preferCSSPageSize: true, printBackground: true });
  await page.goto(`${base}og-card.svg`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'public/og-card.png' });
  console.log('Rendered the public resume PDF and social preview.');
} finally { await browser.close(); }
