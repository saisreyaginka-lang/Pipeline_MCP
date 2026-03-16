import { test, expect } from '@playwright/test';

test('Guest cannot access Home directly', async ({ page }) => {
  await page.goto('http://localhost:3000/home');
  // Expect redirect back to login
  await expect(page).toHaveURL('http://localhost:3000/');
});
