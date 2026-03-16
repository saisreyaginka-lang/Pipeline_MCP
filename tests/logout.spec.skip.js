import { test, expect } from '@playwright/test';

test('Logout clears user session', async ({ page }) => {
  // --- Signup ---
  await page.goto('http://localhost:3000/signup');
  await page.fill('input[name="name"]', 'SaiLogout');
  await page.fill('input[name="email"]', 'sailogout@test.com');
  await page.fill('input[name="password"]', 'Test1234');
  await page.click('button[type="submit"]');

  // --- Login ---
  await page.goto('http://localhost:3000/');
  await page.fill('input[name="email"]', 'sailogout@test.com');
  await page.fill('input[name="password"]', 'Test1234');
  await page.click('button[type="submit"]');

  await expect(page.locator('h2')).toHaveText('Welcome SaiLogout!');

  // --- Logout ---
  await page.click('text=Logout');
  await page.waitForURL('http://localhost:3000/');

  // --- Try accessing home again ---
  await page.goto('http://localhost:3000/home');
  await page.waitForURL('http://localhost:3000/'); // ProtectedRoute forces redirect
});
