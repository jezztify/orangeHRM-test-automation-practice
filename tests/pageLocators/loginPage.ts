import { Page } from "@playwright/test";
import { PageLocator } from "./locators";


export class LoginPageLocator extends PageLocator {
    constructor(page: Page) {
        super(page)
    }

    usernameInput = this.page.getByPlaceholder('Username');
    passwordInput = this.page.getByPlaceholder('Password')
    loginButton = this.page.locator('button')
}