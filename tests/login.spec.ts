import { test, expect } from "@playwright/test";

test.describe("Login Page tests", () => {
  test("Positive Login Page test", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/login");
    await page.getByLabel("Username").fill("tomsmith");
    await page
      .getByRole("textbox", { name: "Password" })
      .fill("SuperSecretPassword!");
    await page.getByRole("button", { name: " Login" }).click();
    await expect(page.getByText("You logged into a secure area")).toBeVisible();
    await expect(page.locator("#flash")).toContainText(
      "You logged into a secure area!",
    );
  });

  test("Negative Login Page test", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/login");
    await page.getByRole("textbox", { name: "Username" }).fill("wrong-user");
    await page.getByRole("textbox", { name: "Password" }).fill("pass");
    await page.getByRole("button", { name: " Login" }).click();
    await expect(page.getByText("Your username is invalid! ×")).toBeVisible();
    await expect(page.locator("#flash")).toContainText(
      "Your username is invalid!",
    );
  });
});
