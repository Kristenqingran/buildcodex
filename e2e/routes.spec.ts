import {expect, test} from '@playwright/test';

test('root redirects once to the English game landing', async ({page}) => {
  const response = await page.goto('/');
  expect(response?.status()).toBe(200);
  await expect(page).toHaveURL('/mistfall-hunter/');
  await expect(page.getByRole('heading', {level: 1})).toContainText('Survive the Mist');
});

test('Chinese root redirects once to the localized game landing', async ({page}) => {
  await page.goto('/zh-CN/');
  await expect(page).toHaveURL('/zh-CN/mistfall-hunter/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
});

for (const path of [
  '/mistfall-hunter/',
  '/mistfall-hunter/classes/',
  '/mistfall-hunter/guides/best-class/',
  '/zh-CN/mistfall-hunter/',
  '/zh-CN/mistfall-hunter/classes/',
  '/zh-CN/mistfall-hunter/guides/best-class/'
]) {
  test(`${path} renders canonical and language alternates`, async ({page}) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveCount(1);
    await expect(page.locator('link[rel="alternate"][hreflang="zh-CN"]')).toHaveCount(1);
    await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveCount(1);
  });
}

test('unknown games and guides return the branded noindex 404', async ({page}) => {
  for (const path of ['/unknown-game/', '/mistfall-hunter/guides/unknown/']) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
    await expect(page.getByText('404')).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  }
});
