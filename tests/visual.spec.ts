import { test, expect } from "@playwright/test";

test.describe("Visual tests", () => {
    test("Visual test", async ({ page }) => {
        await page.goto("https://the-internet.herokuapp.com/login");
        await expect(page).toHaveScreenshot("login.png");
    });

    test("Masked screenshot of the login page", async ({ page }) => {
        await page.goto("https://the-internet.herokuapp.com/login");
        await expect(page).toHaveScreenshot("login info masked.png", {
            fullPage: true,
            mask: [
                page.locator("#username"), 
                page.locator("#password")
            ],    
            maskColor: "#FF0000"
        });
    });



});