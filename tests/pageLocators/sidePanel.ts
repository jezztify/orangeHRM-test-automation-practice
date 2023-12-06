import { Page } from "@playwright/test";
import { PageLocator } from "@pageLocators";


export class SidePanelLocator extends PageLocator {
    constructor(page: Page) {
        super(page)
    }

    getLink(linkName:string) {
        return this.page.locator(`//a[@href[contains(.,"${linkName}")]]`)
    }

    getHeaderTitle() {
        return this.page.locator('//header//h6').innerText();
    }
}