# adaca-selenium-playwright
Repository for ADACA exam - Selenium and Playwright demonstration

This project demonstrates how to perform UI testing using Selenium WebDriver and Playwright for a simple web application (e.g., a to-do list app). It also includes utility functions, data-driven tests, and error handling.

Table of Contents
•	Prerequisites
•	Project Structure
•	Setup
•	Running Tests
o	Selenium Tests
o	Playwright Tests
•	Utility Functions
•	Bonus Features
•	Error Handling

Prerequisites
To get started with this project, ensure you have the following tools installed on your machine:
•	Node.js: Download Node.js
•	Google Chrome (or Chromium): For browser-based tests
•	Selenium WebDriver (ChromeDriver)
•	Playwright
You can install the required dependencies via NPM:
bash
CopyEdit
npm install
Project Structure
The project has the following folder structure:
bash
CopyEdit
project-root/
├── package.json
├── utils/
│   └── stringUtils.js           # Custom utility functions
├── selenium/
│   ├── pageObjects/
│   │   └── LoginPage.js         # Page object for login page
│   ├── testData/
│   │   └── users.json           # User test data for data-driven tests
│   └── todo.test.js             # Main test suite for Selenium WebDriver
├── playwright/
│   └── login.test.js            # Main test suite for Playwright
Setup
1.	Install dependencies:
In the root folder of the project, run the following command to install the required packages:
bash
CopyEdit
npm install selenium-webdriver chromedriver playwright
2.	Configure WebDriver:
Ensure that ChromeDriver is installed correctly and available for use. It will be used by Selenium WebDriver to control Chrome during tests.
Running Tests
Selenium Tests
The Selenium tests are written using the Jest test framework.
1.	To run Selenium tests, use the following command:
bash
CopyEdit
npx jest selenium/todo.test.js
2.	Test Description:
o	Login Test: Tests the user login functionality.
o	Add Item Test: Adds a to-do item to the to-do list.
o	Delete Item Test: Deletes an existing item from the list.
Playwright Tests
1.	To run Playwright tests, use the following command:
bash
CopyEdit
npx playwright test
2.	Test Description:
o	Login Test: Tests the login form using Playwright.
Utility Functions
appendTimestamp(input) from utils/stringUtils.js
This is a simple utility function that:
•	Takes an input string
•	Appends a timestamp to the string
•	Returns the result
Example:
js
CopyEdit
import { appendTimestamp } from './utils/stringUtils.js';

const result = appendTimestamp('TestName');
console.log(result);  // TestName_1632723839264
Usage in Tests
You can use this utility function in both Selenium and Playwright test suites to manipulate strings (e.g., to create unique identifiers or log entries).
 
Bonus Features
Data-Driven Testing in Selenium
The project includes data-driven tests where you can test multiple login credentials using a JSON file (selenium/testData/users.json). Each user’s credentials are looped through and tested automatically:
json
CopyEdit
[
  {
    "username": "testuser1",
    "password": "testpass1"
  },
  {
    "username": "testuser2",
    "password": "testpass2"
  }
]
You can easily extend this to test other scenarios using different data sets.
 
Error Handling
Basic error handling is implemented for test failures. If a test fails, a screenshot of the browser window is captured for debugging purposes. This is done automatically after each test run:
js
CopyEdit
afterEach(async () => {
  const testState = expect.getState();
  if (testState.currentTestName && testState.testPath) {
    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync(`screenshot-${Date.now()}.png`, screenshot, 'base64');
  }
});
 
Conclusion
This project demonstrates how to integrate Selenium WebDriver and Playwright for automating UI tests in a Node.js environment. It includes:
•	Test suites for functional testing (login, add/remove items)
•	Usage of Page Object Model design pattern
•	Explicit waits for dynamic elements
•	Screenshots on failure
•	Data-driven tests
•	Basic error handling
Feel free to modify and extend the project for other use cases and add more tests as needed.
![image](https://github.com/user-attachments/assets/c755de7c-441c-4a43-b455-0f74e13d4ea3)
