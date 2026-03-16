import { test, expect } from '@playwright/test';

test('Signup → Login → Home → Logout flow', async ({ page }) => {
  // Go to signup page
  await page.goto('http://localhost:3000/signup');
  await page.fill('input[name="name"]', 'Sai');
  await page.fill('input[name="email"]', 'sai@test.com');
  await page.fill('input[name="password"]', 'Test1234');
  await page.click('button[type="submit"]');

  // Go to login page
  await page.goto('http://localhost:3000/');
  await page.fill('input[name="email"]', 'sai@test.com');
  await page.fill('input[name="password"]', 'Test1234');
  await page.click('button[type="submit"]');

  // Verify Home page shows welcome message
  await expect(page.locator('h2')).toHaveText('Welcome Sai!');

  // Logout
  await page.click('text=Logout');
  await expect(page).toHaveURL('http://localhost:3000/');
});
