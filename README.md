# 🌐 WordPress E2E Automation Project
### **Powered by Playwright, TypeScript & Docker**

This project demonstrates a professional-grade Automated Testing framework designed for a **WordPress** environment. It covers the full lifecycle of content management—from secure authentication to complex post-publishing flows.

---

## 🚀 Key Features & Technical Challenges

* **Robust Login Flow:** Automated authentication including positive and negative scenarios.
* **End-to-End Publishing Flow:** A complete business logic test that automates the creation and publishing of posts.
* **Iframe Navigation:** Specialized handling of the Gutenberg Editor using Playwright’s `frameLocator`.
* **Dynamic Element Locators:** Implementation of resilient **XPath** using `normalize-space` to handle dynamic UI components.
* **Data Consistency:** Verification of system functionality across complex environments.

---

## 🛠 Tech Stack & Tools

| Category | Tools Used |
| :--- | :--- |
| **Language** | TypeScript & Node.js |
| **Automation** | Playwright (E2E Testing) |
| **Infrastructure** | Docker Containers |
| **Database** | DBeaver / SAP environment context |
| **Version Control**| Git  |

---

## 📊 Documentation & Methodology

This project follows a structured QA lifecycle:
* **STD (Software Test Description):** Detailed test cases can be found in the `/docs` folder.
* **Reporting:** Automated HTML reports generated after each run.

---

## 🏃 How to Run

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Execute Tests (Headed mode):**
    ```bash
    npx playwright test --headed
    ```

---

## 👨‍💻 About Me: Yoav Elkana
* **Experience:** SAP Implementer at Sheba Hospital & QA Team Lead in the IDF
* **Skills:** Manual & Automation Testing, STP/STD, Postman, and SQL 
* **Email:** yoavelkana7777@gmail.com