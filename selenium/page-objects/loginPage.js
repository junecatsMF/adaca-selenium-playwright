import { By, until } from 'selenium-webdriver';

export default class LoginPage {

    constructor(driver) {
        this.driver = driver;
        this.usernameInput = By.id('user-name');
        this.passwordInput = By.id('password');
        this.loginButton = By.id('login-button');
    }

    async login(username, password) {
        await this.driver.wait(until.elementLocated(this.usernameInput), 5000);
        await this.driver.findElement(this.usernameInput).sendKeys(username);
        await this.driver.findElement(this.passwordInput).sendKeys(password);
        await this.driver.findElement(this.loginButton).click();
    }

    async clickAddToCartBackpack() {
        await this.driver.findElement(By.id('add-to-cart-sauce-labs-backpack')).click();
    }
    async clickShoppingCart() {
        await this.driver.findElement(By.className('shopping_cart_link')).click();
    }
    async removeItemSauceLabsBackpackIsDisplayed() {
        await this.driver.findElements(By.id('remove-sauce-labs-backpack'));
    }
    async removeItemSauceLabsBackpack() {
        await this.driver.findElement(By.id('remove-sauce-labs-backpack')).click();
    }
}