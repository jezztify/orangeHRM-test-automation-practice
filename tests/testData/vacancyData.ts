import { VacancyData } from "@pageActions";
import { cloneDeep } from "lodash";

export class VacancyTestDataManager {
    vacancyData: VacancyData[] = [];
    constructor() {
        this.vacancyData.push({
            vacancyName: `This Vacancy - ${new Date().getTime()}`,
            jobTitle: 'QA Engineer',
            numberOfPositions: 5,
            hiringManager: 'Lisa  Andrews',
            description: 'Awesome QA Engineer',
            active: true
        })
    }

    updateVacancyData(partialVacancyData: Partial<VacancyData>) {
        const updatedVacancyData: VacancyData = cloneDeep(this.getVacancyData());
        Object.assign(updatedVacancyData, partialVacancyData);
        this.vacancyData.push(updatedVacancyData);
    }

    getVacancyData(index?: number) {
        try {
            if(index) {
                return this.vacancyData[index];
            }
        } catch {
            console.error(`Index ${index} does not exist in vacancy test data. Defaulting to latest Index.`)
        }
        return this.vacancyData[this.vacancyData.length - 1];
    }
}


// export const vacancyData: VacancyData = {
//     vacancyName: `This Vacancy - ${new Date().getTime()}`,
//     jobTitle: 'QA Engineer',
//     numberOfPositions: 5,
//     hiringManager: 'Lisa  Andrews',
//     description: 'Awesome QA Engineer',
//     active: true
// }

// export const updatedVacancyData = cloneDeep(vacancyData);
// updatedVacancyData.jobTitle = 'QA Lead';