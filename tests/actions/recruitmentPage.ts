import { CandidateSubPageLocator, RecruitmentPageLocator, VacanciesSubPageLocator } from "@pageLocators";
import { expect } from "@playwright/test";

export type VacancyData = {
    vacancyName: string;
    jobTitle: 'QA Engineer' | 'QA Lead' | undefined;
    description: string | undefined;
    hiringManager: string | undefined;
    numberOfPositions: number;
    active: boolean;
}
class VacanciesSubPageActions {
    protected pageLocator: VacanciesSubPageLocator;
    constructor(pageLocator: VacanciesSubPageLocator) {
        this.pageLocator = pageLocator;
    }

    navigateTo() {
        return this.pageLocator.vacanciesSubPageLink.click();
    }

    async addVacancy(vacancyData: VacancyData) {
        await this.pageLocator.addButton.click();
        expect(this.pageLocator.getCurrentUrl()).toBe('https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/addJobVacancy');
        await expect(this.pageLocator.addVacancyHeading).toBeVisible();
        await this.pageLocator.vacancyNameInput.fill(vacancyData.vacancyName);
        await this.pageLocator.jobTitleDropdown.click();
        await this.pageLocator.jobTitleListbox.getByRole('option', {name: vacancyData.jobTitle, exact: true}).click();
        await this.pageLocator.descriptionTextbox.fill(vacancyData.description ?? '');
        await this.pageLocator.hiringManagerInput.fill(vacancyData.hiringManager ?? '');
        await this.pageLocator.hiringManagerListbox.getByRole('option', {name: vacancyData.hiringManager, exact: true}).click();

        await this.pageLocator.numberOfPositionsInput.fill(vacancyData.numberOfPositions? vacancyData.numberOfPositions.toString() : '0');
        if(vacancyData.active) {
            await this.pageLocator.activeToggleButton.check()
        } else {
            await this.pageLocator.activeToggleButton.uncheck()
        }

        await this.pageLocator.saveButton.click();
        await expect(this.pageLocator.alreadyExistError).not.toBeVisible();
        await expect(this.pageLocator.vacanciesSubPageLink).toBeVisible();
        await expect(this.pageLocator.editVacancyHeading).toBeVisible();
    }

    async searchVacancy(vacancyData: VacancyData) {
        await this.pageLocator.jobTitleDropdown.click();
        await this.pageLocator.jobTitleListbox.getByRole('option', {name: vacancyData.jobTitle, exact: true}).click();
        await this.pageLocator.vacancyDropdown.click();
        await this.pageLocator.vacancyListbox.getByRole('option', {name: vacancyData.vacancyName, exact: true}).click();
        await this.pageLocator.hiringManagerDropdown.click();
        await this.pageLocator.hiringManagerListbox.getByRole('option', {name: vacancyData.hiringManager, exact: true}).click();
        await this.pageLocator.statusDropdown.click();
        await this.pageLocator.statusListbox.getByRole('option', {name: vacancyData.active?'Active':'Closed', exact: true}).click();
        await this.pageLocator.searchButton.click();
        await expect(this.pageLocator.tableLoadingSpinner).toBeVisible();
        await expect(this.pageLocator.tableLoadingSpinner).not.toBeVisible();
    }

    async updateVacancy(updatedVacancyData: VacancyData) {
        await this.pageLocator.searchResultRowEditButton.click();
        // await this.pageLocator.vacancyNameInput.clear({force: true});
        // await this.pageLocator.vacancyNameInput.fill(updatedVacancyData.vacancyName, {force: true});
        await this.pageLocator.jobTitleDropdown.click();
        await this.pageLocator.jobTitleListbox.getByRole('option', {name: updatedVacancyData.jobTitle, exact: true}).click();

        await this.pageLocator.saveButton.click();
    }
}

class CandidateSubPageActions {
    protected pageLocator: CandidateSubPageLocator;
    constructor(pageLocator: CandidateSubPageLocator) {
        this.pageLocator = pageLocator;
    }

    navigateTo() {
        return this.pageLocator.candidateSubPageLink.click();
    }
}

class RecruitmentFullPageActions {
    vacanciesSubPageActions: VacanciesSubPageActions;
    candidateSubPageActions: CandidateSubPageActions;
    constructor(vacanciesSubPageActions: VacanciesSubPageActions, candidateSubPageActions: CandidateSubPageActions) {
        this.vacanciesSubPageActions = vacanciesSubPageActions;
        this.candidateSubPageActions = candidateSubPageActions;
    }

    async navigateTo(subPageName: 'Vacancies' | 'Candidates') {
        if(subPageName === 'Vacancies') {
            await this.vacanciesSubPageActions.navigateTo();
        } else {
            await this.candidateSubPageActions.navigateTo();
        }
    }
}

export class RecruitmentPageActions extends RecruitmentFullPageActions {
    constructor(pageLocator: RecruitmentPageLocator) {
        super(new VacanciesSubPageActions(pageLocator.vacanciesSubPageLocator), new CandidateSubPageActions(pageLocator.candidateSubPageLocator));
    }
}