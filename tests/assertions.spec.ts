import { test, expect } from "@playwright/test";


  test("Login Page assertions", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/login");

    // 1. Auto-retrying assertion (default behavior untill timeout)
    await expect(page.getByRole('heading', { name: 'Login Page' })).toBeVisible();

    // 2. Non-auto-retrying assertion
    const headingText = await page.locator('h2').textContent();
    await expect(headingText).toBe('Login Page');

    // 3. Negating assertion
    await expect(page.locator('#flash')).not.toBeVisible(); 

    // 4. Soft assertion
    await expect.soft(page).toHaveURL(/login/);

    // 5. Last assertion in the test
    await expect(page.getByRole('button', { name: ' Login' })).toBeEnabled();
  });

