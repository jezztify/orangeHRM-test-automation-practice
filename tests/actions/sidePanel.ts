import { SidePanelLocator, PageLocator } from "@pageLocators";

export class SidePanelActions {
    protected pageLocator: SidePanelLocator;
    constructor(pageLocator: SidePanelLocator) {
        this.pageLocator = pageLocator;
    }
    
    async navigateTo(navLinkName: string) {
        await this.pageLocator.getLink(navLinkName).click()
    }
}