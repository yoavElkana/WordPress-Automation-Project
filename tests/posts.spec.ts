import { test, expect } from "@playwright/test";

test("יצירת פוסט - חזרה ל-URL מקורי עם עקיפת פופ-אפ", async ({ page }) => {
  test.setTimeout(60000);

  // 1. התחברות (Login)
  await page.goto("http://localhost:8080/wp-login.php");
  await page.fill("#user_login", "admin");
  await page.fill("#user_pass", "Yoav2001!");
  await page.click("#wp-submit");

  // 2. ניווט לעמוד פוסט חדש (חזרה לכתובת המקורית שביקשת)
  await page.goto("http://localhost:8080/wp-admin/post-new.php");

  // המתנה לטעינה ראשונית של הדף
  await page.waitForLoadState("networkidle");

  // 3. סגירת הפופ-אפ - ננסה גם Escape וגם לחיצה על ה-X אם הוא שם
  await page.keyboard.press("Escape");
  await page.waitForTimeout(1000); // זמן למערכת להגיב

  const closeBtn = page.locator('button[aria-label="Close dialog"]');
  if (await closeBtn.isVisible()) {
    await closeBtn.click({ force: true });
  }

  // 4. מילוי הכותרת - שימוש ב-Selector הכי בסיסי שיש
  // הוספנו לחיצה (Click) לפני המילוי כדי "להעיר" את השדה
  // 4. מילוי הכותרת - שימוש ב-Class במקום בטקסט האפור (Placeholder)
  // אנחנו משתמשים ב-locator שמחפש את ה-Class הספציפי של וורדפרס
  const titleField = page.locator(
    ".editor-post-title__input, h1.editor-post-title__input",
  );

  // לחיצה כדי לוודא שהסמן (Cursor) נמצא בתוך השדה
  await titleField.click({ force: true });

  // מילוי הטקסט - הפעם הוא יחליף את ה"Add title" האפור
  await titleField.fill("פוסט בדיקה ללא Placeholder", { force: true });

  // 5. תהליך הפרסום (Publish)
  // לחיצה על כפתור ה-Publish הראשי
  await page
    .getByRole("button", { name: "Publish", exact: true })
    .first()
    .click({ force: true });

  // המתנה קצרה להופעת הפאנל הצידי ולחיצה על אישור הפרסום
  await page.waitForTimeout(500);
  await page
    .getByRole("region", { name: "Editor publish" })
    .getByRole("button", { name: "Publish", exact: true })
    .click({ force: true });

  // 6. אימות סופי - מחכים שה-URL יכיל את מזהה הפוסט
  await expect(page).toHaveURL(/post=\d+/);

  console.log("הטסט הסתיים בהצלחה!");
});
