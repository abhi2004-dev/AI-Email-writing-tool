import { test, expect } from '@playwright/test';

test('has title and main UI elements', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Verify core elements of the Mailmodo Bright SaaS UI
  await expect(page.locator('h1')).toHaveText('AI Email Writer');
  await expect(page.locator('#prompt')).toBeVisible();
  await expect(page.locator('.generate-btn')).toBeVisible();

  // Verify the About and Engineering section exists
  await expect(page.locator('#about')).toBeVisible();
});
