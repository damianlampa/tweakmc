import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('displays the application home', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  const width = await page.locator('html').evaluate((root) => root.scrollWidth - root.clientWidth);
  expect(width).toBeLessThanOrEqual(0);
  expect(errors).toEqual([]);
});

test('keeps the phone bar and navigation spacing aligned with their breakpoints', async ({
  page,
}) => {
  await page.setViewportSize({ width: 639, height: 800 });
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  const body = page.locator('body');
  const phoneBar = page.locator('.ip-bar-compact:not(footer *)');
  await page.locator('footer').scrollIntoViewIfNeeded();
  await expect(phoneBar).toBeVisible();
  await expect(body).toHaveCSS('padding-bottom', '136px');

  await page.setViewportSize({ width: 640, height: 800 });
  await expect(phoneBar).toBeHidden();
  await expect(body).toHaveCSS('padding-bottom', '0px');

  const root = page.locator('html');
  const menuButton = page.locator('header button[aria-expanded]');
  await page.setViewportSize({ width: 1023, height: 800 });
  await expect(root).toHaveCSS('scroll-padding-top', '66px');
  await menuButton.press('Enter');
  await expect(menuButton).toHaveAttribute('aria-expanded', 'true');

  await page.setViewportSize({ width: 1024, height: 800 });
  await expect(root).toHaveCSS('scroll-padding-top', '74px');
  await expect(menuButton).toBeHidden();
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  await expect(body).not.toHaveClass(/\bmenu-open\b/);
});

test('passes automated accessibility checks', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('main')).toBeVisible();
  const result = await new AxeBuilder({ page }).analyze();
  expect(result.violations).toEqual([]);
});
