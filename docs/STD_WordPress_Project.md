STD: Automated Post Creation & Publishing on WordPress
Project Context: End-to-End Automation Suite using Playwright & TypeScript.

1. General Information
    Test Case ID: TC-01.

    Feature: Post Management.

    Environment: WordPress running on Docker (Localhost).


    Author: Yoav Elkana.

2. Test Description
    Goal: Verify that a registered user can successfully create and publish a new post using the Gutenberg editor.


    | Step # | Action | Expected Result | Technical Logic (Automation) |
    | :--- | :--- | :--- | :--- |
    | **1** | Navigate to `wp-login.php` and enter credentials | User is redirected to Dashboard | `page.goto()` & `page.fill()` |
    | **2** | Click on "Posts" -> "Add New" | Gutenberg editor loads | Wait for editor URL |
    | **3** | Enter a Title in the editor | Title is displayed in `h1` | `frameLocator` for iframe access |
    | **4** | Click initial "Publish" button | Confirmation sidebar appears | XPath with `normalize-space` |
    | **5** | Click final "Publish" button | "Post published" message appears | Handle second button with `.last()` |


