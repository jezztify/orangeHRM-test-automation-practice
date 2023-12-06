import { Page } from "@playwright/test";
import { PageLocator } from "@pageLocators";


export class DashboardPageLocator extends PageLocator {
    constructor(page: Page) {
        super(page)
    }
    
    dashboardHeading = this.page.getByLabel('Dashboard')
}