import {expect, test} from '@playwright/test';

test('landing keeps the approved visual section order', async ({page}) => {
  await page.goto('/mistfall-hunter/');
  await expect(page.locator('[data-testid="landing-section"]')).toHaveCount(10);
  expect(await page.locator('[data-testid="landing-section"]').evaluateAll((nodes) => nodes.map((node) => node.id))).toEqual([
    'hero', 'stats', 'overview', 'classes', 'guides', 'builds',
    'featured-guides', 'faq', 'bottom-cta', 'footer'
  ]);
  await expect(page).toHaveScreenshot('landing-desktop.png', {fullPage: true});
});

test('Chinese mobile landing has no horizontal overflow', async ({page}) => {
  await page.setViewportSize({width: 390, height: 844});
  await page.goto('/zh-CN/mistfall-hunter/');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  await expect(page).toHaveScreenshot('landing-zh-mobile.png', {fullPage: true});
});
