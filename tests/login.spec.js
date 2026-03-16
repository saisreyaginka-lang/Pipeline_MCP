import { test, expect } from '@playwright/test';

test('Invalid login shows error', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.fill('input[name="email"]', 'sai@test.com');
  await page.fill('input[name="password"]', 'WrongPassword');
  await page.click('button[type="submit"]');

  // Expect alert dialog with error message
  page.on('dialog', async dialog => {
    expect(dialog.message()).toContain('Invalid email or password');
    await dialog.dismiss();
  });
});
