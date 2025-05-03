import { Builder } from 'selenium-webdriver';
import fs from 'fs';
import path from 'path';
import chrome from 'selenium-webdriver/chrome.js';
import LoginPage from './page-objects/loginPage.js';

const userData = JSON.parse(fs.readFileSync('selenium/test-data/user.json', 'utf-8'));

// Ensure screenshots folder exists
const screenshotsDir = './screenshots';
if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
}

// Capture screenshot utility
async function takeScreenshot(driver, testName) {
    if (!driver) return;
    const screenshot = await driver.takeScreenshot();
    const filename = `screenshot-${testName}-${Date.now()}.png`;
    const filepath = path.join(screenshotsDir, filename);
    fs.writeFileSync(filepath, screenshot, 'base64');
    console.log(`[INFO] Screenshot saved: ${filepath}`);
}

// Create and configure Chrome driver
async function createDriver() {
    const options = new chrome.Options();
    options.addArguments(
        '--incognito',
        '--disable-save-password-bubble',
        '--disable-notifications'
    );
    options.setUserPreferences({
        'credentials_enable_service': false,
        'profile.password_manager_enabled': false
    });

    return await new Builder().forBrowser('chrome').setChromeOptions(options).build();
}

// Main test suite runner
async function runTestSuite() {
    let driver;

    try {
        console.log('\n=== Selenium Test Suite Start ===');

        driver = await createDriver();
        const loginPage = new LoginPage(driver);

        // ---------- Test: User Login ----------
        console.log('\n[TEST] User login');
        try {
            await driver.get('https://www.saucedemo.com/');
            await loginPage.login(userData[0].username, userData[0].password);
            console.log('[PASS] Login successful');
        } catch (error) {
            console.error('[FAIL] Login failed:', error.message);
            await takeScreenshot(driver, 'login');
        }

        // ---------- Test: Add Item ----------
        console.log('\n[TEST] Add item to cart');
        try {
            await loginPage.clickAddToCartBackpack();
            await loginPage.clickShoppingCart();
            console.log('[PASS] Item added successfully');
        } catch (error) {
            console.error('[FAIL] Add item failed:', error.message);
            await takeScreenshot(driver, 'add-item');
        }

        // ---------- Test: Delete Item ----------
        console.log('\n[TEST] Delete item from cart');
        try {
            await loginPage.removeItemSauceLabsBackpack();
            console.log('[PASS] Item deleted');
        } catch (error) {
            console.error('[FAIL] Delete item failed:', error.message);
            await takeScreenshot(driver, 'delete-item');
        }

    } catch (fatalError) {
        console.error('[FATAL] Test suite could not start:', fatalError.message);
    } finally {
        if (driver) {
            await driver.quit();
            console.log('\n=== ✅ Selenium Test Suite Finished ===');
        }
    }
}

runTestSuite();
