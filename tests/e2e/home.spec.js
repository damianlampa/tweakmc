import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('displays the project placeholder', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'TweakMC', level: 1 })).toBeVisible();
  await expect(page.getByText('Website coming soon.')).toBeVisible();
  const width = await page.locator('html').evaluate((root) => root.scrollWidth - root.clientWidth);
  expect(width).toBeLessThanOrEqual(0);
  expect(errors).toEqual([]);
});

test('passes automated accessibility checks', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('main')).toBeVisible();
  const result = await new AxeBuilder({ page }).analyze();
  expect(result.violations).toEqual([]);
});
