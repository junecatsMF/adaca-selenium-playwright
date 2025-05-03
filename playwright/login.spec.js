import { test, expect } from '@playwright/test';
import { appendTimestamp } from '../utils/stringUtils.js';

test('Login and interact with form', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    const item = appendTimestamp('Backpack');
    await page.click('#add-to-cart-sauce-labs-backpack');
    console.log("Item added timestamp: "+item);
    await page.click('.shopping_cart_link');

    await expect(page.locator('.cart_item')).toContainText('Sauce Labs Backpack');
});
