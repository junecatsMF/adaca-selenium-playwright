# adaca-selenium-playwright
Repository for ADACA exam - Selenium and Playwright demonstration

This project demonstrates how to perform UI testing using Selenium WebDriver and Playwright for a simple web application (e.g., a to-do list app). It also includes utility functions, data-driven tests, and error handling.

# Setup
Install dependencies:
In the root folder of the project, run the following command to install the required packages:

 `npm install`

# Running Tests
## Selenium Tests
The Selenium tests are written using VanillaJS.
1.	To run Selenium tests, use the following command in the root folder:

`npm test`

2.	Test Description:

o	Login Test: Tests the user login functionality.

o	Add Item Test: Adds an item to the cart.

o	Delete Item Test: Deletes the item from the list.

## Playwright Tests
1.	To run Playwright tests, use the following command in the root folder:

`npx playwright test playwright/login.spec.js --headed --project=Chromium`

2.	Test Description:

o	Login Test: Tests the login form using Playwright.
Utility Functions
appendTimestamp(input) from utils/stringUtils.js
This is a simple utility function that:

•	Takes an input string

•	Appends a timestamp to the string

•	Returns the result

## Error Handling
Basic error handling is implemented for test failures. If a test fails, a screenshot of the browser window is captured for debugging purposes. This is done automatically after each test run:

`afterEach(async () => {
  const testState = expect.getState();
  if (testState.currentTestName && testState.testPath) {
    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync(`screenshot-${Date.now()}.png`, screenshot, 'base64');
  }
});`
 
# Conclusion
This project demonstrates how to integrate Selenium WebDriver and Playwright for automating UI tests in a Node.js environment. It includes:

•	Test suites for functional testing (login, add/remove items)

•	Usage of Page Object Model design pattern

•	Explicit waits for dynamic elements

•	Screenshots on failure

•	Data-driven tests

•	Basic error handling
