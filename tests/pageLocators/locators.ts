import { Page } from "@playwright/test";

export abstract class PageLocator {
    protected page: Page
    constructor(page: Page) {
        this.page = page;
    }
}