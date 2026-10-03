import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('loads the portfolio without runtime errors and features only HallPass', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('./');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('I build the systems behind reliable software.');
  const project = page.getByRole('region', { name: 'Independent project' });
  await expect(project.getByRole('article')).toHaveCount(1);
  await expect(project.getByRole('link', { name: 'Visit HallPass' })).toHaveAttribute('href', 'https://hallpass.me');
  expect(errors).toEqual([]);
});

test('case studies open by keyboard and reveal the verification method', async ({ page }) => {
  await page.goto('./');
  const summary = page.locator('#agent-system summary');
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#agent-system')).toHaveAttribute('open', '');
  await expect(page.getByText(/Automated checks require supporting evidence/)).toBeVisible();
  await page.keyboard.press('Enter');
  await expect(page.locator('#agent-system')).not.toHaveAttribute('open');
});

test('theme choice persists across reloads', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('./');
  await page.getByRole('button', { name: 'Switch to dark mode' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(page.getByRole('button', { name: 'Switch to light mode' })).toBeVisible();
  await page.getByRole('button', { name: 'Switch to light mode' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('supports system dark preference without a saved choice', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('./');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('restores direct and legacy section links without fragment errors', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  for (const [hash, target] of [['work', 'work'], ['lab', 'hallpass'], ['method', 'approach'], ['thesis', 'approach'], ['agent-system', 'agent-system']]) {
    await page.goto(`./#${hash}`);
    await expect.poll(() => page.locator(`#${target}`).evaluate((el) => Math.abs(el.getBoundingClientRect().top))).toBeLessThan(200);
  }
  await expect(page.locator('#agent-system')).toHaveAttribute('open', '');
  await page.goto('./#%');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  expect(errors).toEqual([]);
});

test('mobile navigation closes on Escape and moves focus on selection', async ({ page, isMobile }) => {
  test.skip(!isMobile);
  await page.goto('./');
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused();
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.getByRole('navigation').getByRole('link', { name: 'HallPass', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#hallpass')).toBeFocused();
});

test('has no horizontal overflow on narrow, tablet, and desktop layouts', async ({ page }) => {
  await page.goto('./');
  for (const width of [320, 375, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  }
});

test('light and dark views meet accessibility checks', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
  await page.goto('./');
  for (const theme of ['light', 'dark']) {
    if (theme === 'dark') await page.getByRole('button', { name: 'Switch to dark mode' }).click();
    await page.locator('#agent-system summary').click();
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(results.violations).toEqual([]);
  }
});

test('resume and existing case-file URLs remain usable', async ({ page, request }) => {
  const response = await request.get('./Kingsley-Okoli-Public-Resume.pdf');
  expect(response.ok()).toBe(true);
  expect((await response.body()).subarray(0, 4).toString()).toBe('%PDF');
  await page.goto('./case-files/index.html#agent-system');
  await expect(page.locator('#agent-system').getByRole('heading')).toHaveText('Putting testing expertise into an agent harness.');
  await page.goto('./Kingsley-Okoli-Public-Resume.html');
  await expect(page.getByRole('heading', { name: 'HallPass' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Sellfire' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Rapptr Labs' })).toBeVisible();
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter((item) => ['serious', 'critical'].includes(item.impact))).toEqual([]);
});

test('core information is usable without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(baseURL);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('I build the systems behind reliable software.');
  await expect(page.getByRole('link', { name: 'Visit HallPass' })).toHaveAttribute('href', 'https://hallpass.me');
  await expect(page.getByRole('link', { name: 'View résumé' })).toBeVisible();
  await context.close();
});
