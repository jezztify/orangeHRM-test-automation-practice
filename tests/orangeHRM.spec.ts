import { Page, expect, test } from '@playwright/test';
import { LoginPageLocator } from '@pageLocators';
import { LoginPageHandler } from '@pageHandlers';

test.describe('Orange HRM', () => {
    let page: Page;
    interface PageLocators {
        [key: string]: LoginPageLocator;
    }
    interface PageHandlers {
        [key: string]: LoginPageHandler;
    }
    const pageLocators: PageLocators = {};
    const pageHandlers: PageHandlers = {};

    test.beforeAll(async ({browser}) => {
        const context = await browser.newContext();
        page = await context.newPage();
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    })

    test('Login Page', () => {
        test.beforeAll(() => {
           pageLocators.loginPageLocator = new LoginPageLocator(page);
           pageHandlers.loginPageHandler = new LoginPageHandler(pageLocators.loginPageLocator);
        })

        test('should be able to login', async () => {
            pageHandlers.loginPageHandler.login('Admin', 'admin123');
            expect(page.url()).toBe('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
        })
    })
})