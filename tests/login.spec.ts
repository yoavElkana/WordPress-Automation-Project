import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
test("LOGIN - Positive Test", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login("admin", "Yoav2001!");
  await expect(page).toHaveURL(/.*wp-admin/);
  const adminBar = page.locator("#wpadminbar");
  await expect(adminBar).toBeVisible();
  console.log("The login test (with valid user) was completed sucssfully  ");
});

test("LOGIN - Negative Test", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login("admin", "wrong_password_123");
  const errorMessage = page.locator("#login_error");
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText("Error");

  console.log("The login test (with Invalid user) was completed sucssfully  ");
});
