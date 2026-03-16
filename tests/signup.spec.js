import { test, expect } from '@playwright/test';

test('Duplicate signup should fail', async ({ page }) => {
  // First signup
  await page.goto('http://localhost:3000/signup');
  await page.fill('input[name="name"]', 'SaiSignup');
  await page.fill('input[name="email"]', 'saisignup@test.com');
  await page.fill('input[name="password"]', 'Test1234');
  await page.click('button[type="submit"]');

  // Try signing up again with same email
  await page.goto('http://localhost:3000/signup');
  await page.fill('input[name="name"]', 'SaiSignupAgain');
  await page.fill('input[name="email"]', 'saisignup@test.com');
  await page.fill('input[name="password"]', 'Test1234');
  await page.click('button[type="submit"]');

  // Expect alert dialog or error message
  page.on('dialog', async dialog => {
    expect(dialog.message()).toContain('already exists');
    await dialog.dismiss();
  });
});
