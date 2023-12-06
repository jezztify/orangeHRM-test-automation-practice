import { Page } from "@playwright/test";
import { PageLocator } from "@pageLocators";

export class VacanciesSubPageLocator extends PageLocator {
    constructor(page: Page) {
        super(page);
    }

    // main vacancy page
    vacanciesSubPageLink = this.page.locator('//a[text()[contains(.,"Vacancies")]]');
    vacancyDropdown = this.page.locator('//label[text()[contains(.,"Vacancy")]]/../../div[2]');
    vacancyListbox = this.page.getByRole('listbox');
    hiringManagerDropdown = this.page.locator('//label[text()[contains(.,"Hiring Manager")]]/../../div[2]');
    statusDropdown = this.page.locator('//label[text()[contains(.,"Status")]]/../../div[2]');
    statusListbox = this.page.getByRole('listbox');
    searchButton = this.page.locator('//button[text()[contains(.,"Search")]]');
    addButton = this.page.locator('//button[text()[contains(.,"Add")]]');
    numberRecordsText = this.page.locator('//span[text()[contains(.,"Records Found")]]');
    searchResultList = this.page.locator('.orangehrm-container');
    searchResultRow = this.page.locator('//div[@class="orangehrm-container"]//div[@class="oxd-table-body"]//div[@role="row"]');
    searchResultRowVacancyName = this.searchResultRow.locator('//div[@role="cell"][2]');
    searchResultRowJobTitle = this.searchResultRow.locator('//div[@role="cell"][3]');
    searchResultRowHiringManager = this.searchResultRow.locator('//div[@role="cell"][4]');
    searchResultRowStatus = this.searchResultRow.locator('//div[@role="cell"][5]');
    searchResultRowDeleteButton = this.searchResultRow.locator('//div[@role="cell"][6]//button[1]');
    searchResultRowEditButton = this.searchResultRow.locator('//div[@role="cell"][6]//button[2]');
    tableLoadingSpinner = this.page.locator('.oxd-table-loader');
    
    // delete modal
    yesDeleteButton = this.page.locator('//button[text()[contains(.,"Yes, Delete")]]');

    // add vacancy
    addVacancyHeading = this.page.locator('//h6[text()="Add Vacancy"]');
    editVacancyHeading = this.page.locator('//h6[text()="Edit Vacancy"]');
    vacancyNameInput = this.page.locator('//label[text()[contains(.,"Vacancy Name")]]/../../div/input');
    jobTitleDropdown = this.page.locator('//label[text()[contains(.,"Job Title")]]/../../div[2]');
    jobTitleListbox = this.page.getByRole('listbox');
    descriptionTextbox = this.page.locator('//label[text()[contains(.,"Description")]]/../..//textarea');
    hiringManagerInput = this.page.locator('//label[text()[contains(.,"Hiring Manager")]]/../..//input');
    hiringManagerListbox = this.page.getByRole('listbox');
    numberOfPositionsInput = this.page.locator('//label[text()[contains(.,"Number of Positions")]]/../..//input');
    activeToggleButton = this.page.locator('//p[text()[contains(.,"Active")]]/..//input');
    saveButton = this.page.locator('//button[@type="submit"]');
    alreadyExistError = this.page.locator('//span[text()="Already exists"]');
}

export class CandidateSubPageLocator extends PageLocator {
    constructor(page: Page) {
        super(page, );
    }

    candidateSubPageLink = this.page.locator('//a[text()[contains(.,"Candidate")]]');
}

export class RecruitmentFullPageLocator extends PageLocator {
    vacanciesSubPageLocator: VacanciesSubPageLocator;
    candidateSubPageLocator: CandidateSubPageLocator;
    constructor(page: Page, vacanciesSubPageLocator: VacanciesSubPageLocator, candidateSubPageLocator: CandidateSubPageLocator) {
        super(page);
        this.vacanciesSubPageLocator = vacanciesSubPageLocator;
        this.candidateSubPageLocator = candidateSubPageLocator;
    }
}

export class RecruitmentPageLocator extends RecruitmentFullPageLocator {
    constructor(page: Page) {
        super(page, new VacanciesSubPageLocator(page), new CandidateSubPageLocator(page));
    }
}