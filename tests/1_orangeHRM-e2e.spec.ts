import { Page, expect, test } from '@playwright/test';
import { LoginPageLocator, PageLocators, RecruitmentPageLocator, SidePanelLocator } from '@pageLocators';
import { LoginPageActions, PageActions, RecruitmentPageActions, SidePanelActions, VacancyData } from '@pageActions';
import { VacancyTestDataManager } from '@testData';

test.describe('Orange HRM @e2e', () => {
    let page: Page;
    const pageLocators: PageLocators = {};
    const pageActions: PageActions = {};

    test.beforeAll(async ({browser}) => {
        const context = await browser.newContext();
        page = await context.newPage();
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    })

    test.describe('Login Page', () => {
        test.beforeAll(() => {
            pageLocators.loginPageLocator = new LoginPageLocator(page);
            pageActions.loginPageActions = new LoginPageActions(pageLocators.loginPageLocator);
        })

        test('should be able to login', async () => {
            await pageActions.loginPageActions!.login('Admin', 'admin123');
            expect(page.url()).toBe('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
        })
    })

    test.describe('Recruitment Page', () => {
        test.beforeAll(() => {
            pageLocators.sidePanelLocator = new SidePanelLocator(page);
            pageActions.sidePanelActions = new SidePanelActions(pageLocators.sidePanelLocator);
            pageLocators.recruitmentPageLocator = new RecruitmentPageLocator(page);
            pageActions. recruitmentPageActions = new RecruitmentPageActions(pageLocators.recruitmentPageLocator);
            // use API call to delete all records
            // use API call to populate vacancy records
            // use API call to populate candidate records
        })

        test('should be able to load the Recruitment page', async () => {
            await pageActions.sidePanelActions!.navigateTo('Recruitment');
            expect(await pageLocators.sidePanelLocator!.getHeaderTitle()).toBe('Recruitment')
        })

        test.describe('Vacancies Subpage', () => {
            let vacancyDataManager: VacancyTestDataManager;
            test.beforeAll(() => {
                vacancyDataManager = new VacancyTestDataManager();
            })

            test('should be able to load the Vacancy sub page', async () => {
                await pageActions.recruitmentPageActions!.navigateTo('Vacancies');
                expect(page.url()).toBe('https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewJobVacancy');
            })
            
            test('should be able to create a new vacancy', async () => {
                const vacancyData = vacancyDataManager.getVacancyData();
                await pageActions.recruitmentPageActions!.vacanciesSubPageActions.addVacancy(vacancyData);
                expect(page.url()).toMatch(/recruitment\/addJobVacancy\/.*/);
    
                // Assert all data from created vacancy
                await expect(pageLocators.recruitmentPageLocator!.vacanciesSubPageLocator.vacancyNameInput).toHaveValue(vacancyData.vacancyName);
                await expect(pageLocators.recruitmentPageLocator!.vacanciesSubPageLocator.jobTitleDropdown).toHaveText(vacancyData.jobTitle!);
                await expect(pageLocators.recruitmentPageLocator!.vacanciesSubPageLocator.numberOfPositionsInput).toHaveValue(vacancyData.numberOfPositions.toString());
                await expect(pageLocators.recruitmentPageLocator!.vacanciesSubPageLocator.hiringManagerInput).toHaveValue(vacancyData.hiringManager!);
                await expect(pageLocators.recruitmentPageLocator!.vacanciesSubPageLocator.descriptionTextbox).toHaveValue(vacancyData.description!);
                await expect(pageLocators.recruitmentPageLocator!.vacanciesSubPageLocator.activeToggleButton).toBeChecked({checked: vacancyData.active});
            })
    
            test('should be able to search for an existsing vacancy', async () => {
                const vacancyData = vacancyDataManager.getVacancyData();
                await pageActions.recruitmentPageActions!.navigateTo('Vacancies');
                await pageActions.recruitmentPageActions!.vacanciesSubPageActions.searchVacancy(vacancyData);
                expect(pageLocators.recruitmentPageLocator!.vacanciesSubPageLocator.jobTitleDropdown).toHaveText(vacancyData.jobTitle!);
    
                // Assert all data from search results
                await expect(pageLocators.recruitmentPageLocator!.vacanciesSubPageLocator.searchResultRow).toHaveCount(1);
                await expect(pageLocators.recruitmentPageLocator!.vacanciesSubPageLocator.searchResultRowVacancyName).toHaveText(vacancyData.vacancyName);
                await expect(pageLocators.recruitmentPageLocator!.vacanciesSubPageLocator.searchResultRowJobTitle).toHaveText(vacancyData.jobTitle!);
                await expect(pageLocators.recruitmentPageLocator!.vacanciesSubPageLocator.searchResultRowStatus).toHaveText(vacancyData.active?'Active':'Closed');
    
            })
    
            test('should be able to update an existing vacancy', async () => {
                vacancyDataManager.updateVacancyData({jobTitle: 'QA Lead'});
                const updatedVacancyData = vacancyDataManager.getVacancyData();
                await pageActions.recruitmentPageActions!.vacanciesSubPageActions.updateVacancy(updatedVacancyData);
                await pageActions.recruitmentPageActions!.navigateTo('Vacancies');
                await pageActions.recruitmentPageActions!.vacanciesSubPageActions.searchVacancy(updatedVacancyData);
                
                // Assert all updated data from search results
                await expect(pageLocators.recruitmentPageLocator!.vacanciesSubPageLocator.searchResultRow).toHaveCount(1);
                await expect(pageLocators.recruitmentPageLocator!.vacanciesSubPageLocator.searchResultRowVacancyName).toHaveText(updatedVacancyData.vacancyName);
                await expect(pageLocators.recruitmentPageLocator!.vacanciesSubPageLocator.searchResultRowJobTitle).toHaveText(updatedVacancyData.jobTitle!);
                await expect(pageLocators.recruitmentPageLocator!.vacanciesSubPageLocator.searchResultRowStatus).toHaveText(updatedVacancyData.active?'Active':'Closed');
            })
    
            test('should be able to delete a single existing vacancy', async () => {
                vacancyDataManager.updateVacancyData({jobTitle: 'QA Lead'});
                const updatedVacancyData = vacancyDataManager.getVacancyData();
                await pageLocators.recruitmentPageLocator!.vacanciesSubPageLocator.searchResultRowDeleteButton.click();
                await pageLocators.recruitmentPageLocator!.vacanciesSubPageLocator.yesDeleteButton.click();
                await pageActions.recruitmentPageActions!.vacanciesSubPageActions.searchVacancy(updatedVacancyData);
    
                // Assert deleted data from search results
                await expect(pageLocators.recruitmentPageLocator!.vacanciesSubPageLocator.searchResultRow).toHaveCount(0);
            })
        })
    })
})
