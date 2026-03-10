import { test, expect } from "@playwright/test";

test("יצירת פוסט בוורדפרס - גרסה סופית עם XPath מותאם", async ({ page }) => {
  // הגדרת זמן המתנה ארוך יותר למקרה שהסביבה איטית
  test.setTimeout(60000);

  // 1. התחברות (Login)
  await page.goto("http://localhost:8080/wp-login.php");
  await page.locator("#user_login").fill("admin");
  await page.locator("#user_pass").fill("Yoav2001!");
  await page.locator("#wp-submit").click();

  // 2. ניווט לעמוד פוסט חדש וניקוי פופ-אפים
  await page.goto("http://localhost:8080/wp-admin/post-new.php");

  // סגירת מדריכי וורדפרס שעלולים לחסום את המסך
  await page.keyboard.press("Escape");
  await page
    .locator('iframe[name="editor-canvas"]')
    .waitFor({ state: "attached", timeout: 30000 });
  // 3. מילוי הכותרת בתוך ה-iframe
  // שימוש ב-frameLocator לפי ה-name שזיהינו ב-SelectorsHub
  const editorFrame = page.frameLocator('iframe[name="editor-canvas"]');
  const titleField = editorFrame.locator("h1.editor-post-title__input");

  await titleField.waitFor({ state: "visible" });
  await titleField.click();
  await titleField.fill("פוסט אוטומציה סופי בהחלט");

  // 4. לחיצה ראשונה על Publish (הכפתור העליון)
  // שימוש ב-XPath שביקשת עם .first() כי יש שני כפתורים כאלה בדף
  const firstPublishBtn = page
    .locator("//button[normalize-space()='Publish']")
    .first();
  await expect(firstPublishBtn).toBeEnabled();
  await firstPublishBtn.click();

  // 5. לחיצה שנייה על Publish (הכפתור בפאנל האישור)
  // כאן אנחנו משתמשים ב-.last() כדי לתפוס את הכפתור שנוסף בתוך תפריט הצד
  const finalPublishBtn = page
    .locator("//button[normalize-space()='Publish']")
    .last();

  // מחכים שהכפתור השני יהיה גלוי ולחיץ לפני הפעולה
  await finalPublishBtn.waitFor({ state: "visible" });
  await finalPublishBtn.click();

  // 6. אימות (Assertion) - בדיקה שהפוסט באמת פורסם
  // וורדפרס מעביר ל-URL שמכיל את ה-ID של הפוסט
  await expect(page).toHaveURL(/post=\d+/);

  console.log("Success: Post was published using the provided XPath!");
});
