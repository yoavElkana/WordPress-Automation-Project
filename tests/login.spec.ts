import { test, expect } from "@playwright/test";

test("LOGIN - Positive Test", async ({ page }) => {
  // 1. כניסה לדף הלוגין שרץ בדוקר שלך
  await page.goto("http://localhost:8080/wp-login.php");

  // 2. הזנת פרטי המשתמש (תחליף לפרטים שיצרת בהתקנה)
  await page.fill("#user_login", "admin");
  await page.fill("#user_pass", "Yoav2001!");

  // 3. לחיצה על כפתור התחברות
  await page.click("#wp-submit");

  // 4. בדיקה (Assertion) - האם הגענו ללוח הבקרה?
  await expect(page).toHaveURL(/.*wp-admin/);

  console.log("The login test (with valid user) was completed sucssfully  ");
});

test("LOGIN - Negative Test", async ({ page }) => {
  await page.goto("http://localhost:8080/wp-login.php");

  // הזנת פרטים שגויים בכוונה
  await page.fill("#user_login", "admin");
  await page.fill("#user_pass", "wrong_password_123");
  await page.click("#wp-submit");

  // בדיקה שהודעת השגיאה מופיעה על המסך
  const errorMessage = page.locator("#login_error");
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText("Error");

  console.log("The login test (with Invalid user) was completed sucssfully  ");
});
