import { LoginPageLocator, RecruitmentPageLocator, SidePanelLocator } from "@pageLocators";
import { Page } from "@playwright/test";

export abstract class PageLocator {
    protected page: Page
    constructor(page: Page) {
        this.page = page;
    }

    getCurrentUrl() {
        return this.page.url()
    }
}

export interface PageLocators {
    loginPageLocator?: LoginPageLocator;
    sidePanelLocator?: SidePanelLocator;
    recruitmentPageLocator?: RecruitmentPageLocator
}