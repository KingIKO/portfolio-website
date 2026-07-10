import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('loads the complete evidence-led portfolio without runtime errors', async ({ page }) => {
  const errors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));

  await page.goto('./');
  await expect(page).toHaveTitle(/Kingsley Okoli/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('AI Reliability Engineer');
  await expect(page.getByRole('article', { name: /Case study/ })).toHaveCount(3);
  await expect(page.getByRole('region', { name: 'Systems lab' })).toBeVisible();
  expect(errors).toEqual([]);
});

test('offers a usable fallback when JavaScript is unavailable', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4188/portfolio-website/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('AI Reliability Engineer');
  await expect(page.getByRole('link', { name: 'Open the public résumé' })).toHaveAttribute(
    'href',
    './Kingsley-Okoli-Public-Resume.pdf'
  );
  await context.close();
});

test('motion control is operable', async ({ page }) => {
  await page.goto('./');
  const control = page.getByRole('button', { name: 'Pause motion' });
  await expect(control).toBeVisible();
  await control.click();
  await expect(page.getByRole('button', { name: 'Resume motion' })).toBeVisible();
  await expect(page.locator('.site')).toHaveClass(/motion-off/);
});

test('desktop reliability-core status is fully inside the viewport', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === 'mobile');
  await page.goto('./');
  const viewport = page.viewportSize();
  const box = await page.getByText('Reliability core online').boundingBox();
  expect(box.x + box.width).toBeLessThanOrEqual(viewport.width - 16);
});

test('shared section deep links land on the requested content', async ({ page }) => {
  await page.goto('./#work');
  await expect.poll(
    () => page.locator('#work').evaluate((element) => Math.abs(element.getBoundingClientRect().top)),
    { timeout: 2_000 }
  ).toBeLessThan(150);
});

test('malformed URL fragments do not raise runtime errors', async ({ page }) => {
  const pageErrors = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));
  await page.goto('./#%');
  await page.waitForTimeout(600);
  expect(pageErrors).toEqual([]);
  await expect(page.getByRole('heading', { level: 1, name: 'AI Reliability Engineer' })).toBeVisible();
});

test('every case-study receipt opens its matching sanitized case file', async ({ page }) => {
  const receipts = [
    ['agent-system', 'Teaching an AI agent an entire SaaS platform'],
    ['ci-signal', 'Restoring trust after nineteen red days'],
    ['production-forensics', 'Finding failures no single monitor could see'],
  ];

  for (const [id, heading] of receipts) {
    await page.goto('./');
    await page.locator(`a[href="./case-files/index.html#${id}"]`).click();
    await expect(page).toHaveURL(new RegExp(`/case-files/index\\.html#${id}$`));
    await expect(page.locator(`#${id}`).getByRole('heading', { name: heading })).toBeVisible();
  }
});

test('sanitized case files have no serious accessibility violations', async ({ page }) => {
  await page.goto('./case-files/index.html#ci-signal');
  const results = await new AxeBuilder({ page }).analyze();
  const serious = results.violations.filter((item) => ['serious', 'critical'].includes(item.impact));
  expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
});

test('fast scrolling never leaves thesis copy transparent', async ({ page }) => {
  await page.goto('./');
  await page.locator('#thesis').scrollIntoViewIfNeeded();
  const opacity = await page.locator('.thesis__copy').evaluate((element) => Number(getComputedStyle(element).opacity));
  expect(opacity).toBeGreaterThanOrEqual(0.9);
});

test('has no serious accessibility violations', async ({ page }) => {
  await page.goto('./');
  const results = await new AxeBuilder({ page }).analyze();
  const serious = results.violations.filter((violation) => ['serious', 'critical'].includes(violation.impact));
  expect(serious).toEqual([]);
});

test('mobile navigation works and the document does not overflow', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile-only behavior');
  await page.goto('./');

  const viewport = page.viewportSize();
  const primaryCta = page.getByRole('link', { name: 'Explore the systems' });
  const ctaBox = await primaryCta.boundingBox();
  expect(ctaBox.y + ctaBox.height).toBeLessThanOrEqual(viewport.height);

  for (const buttonName of ['Pause motion', 'Open menu']) {
    const box = await page.getByRole('button', { name: buttonName }).boundingBox();
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(viewport.width);
  }

  await page.getByRole('button', { name: 'Open menu' }).click();
  await expect(page.getByRole('link', { name: 'Work' })).toBeVisible();
  await page.getByRole('link', { name: 'Work' }).click();
  await expect(page.getByRole('button', { name: 'Open menu' })).toBeVisible();

  const sizes = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    document: document.documentElement.scrollWidth,
  }));
  expect(sizes.document).toBeLessThanOrEqual(sizes.viewport + 1);
});
