import { LoginPageLocator, PageLocator } from "@pageLocators";

export class LoginPageHandler {
    protected pageLocator: LoginPageLocator;
    constructor(pageLocator: LoginPageLocator) {
        this.pageLocator = pageLocator;
    }
    
    async login(username: string, password: string) {
        await this.pageLocator.usernameInput.fill(username);
        await this.pageLocator.passwordInput.fill(password);
        await this.pageLocator.loginButton.click();
    }
}