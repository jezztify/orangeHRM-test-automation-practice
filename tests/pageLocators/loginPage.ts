import { Page } from "@playwright/test";
import { PageLocator } from "@pageLocators";


export class LoginPageLocator extends PageLocator {
    constructor(page: Page) {
        super(page)
    }

    usernameInput = this.page.locator('//input[@name="username"]');
    passwordInput = this.page.locator('//input[@name="password"]');
    loginButton = this.page.locator('//button[@type="submit"]');
}