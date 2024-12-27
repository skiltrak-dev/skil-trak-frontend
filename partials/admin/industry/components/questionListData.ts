import { IndustryQuestionsEnum } from '../enum'

export const industryQuestions = {
    [IndustryQuestionsEnum.SECTORS_BASE_CAPACITY]:
        'Number of students you can accommodate in each sector.',
    [IndustryQuestionsEnum.REQUIREMENTS]:
        'Do you have any specific requirements or preferences regarding the students you accept for placement (e.g., academic background, skillset)?',
    [IndustryQuestionsEnum.TRAINING]:
        'Are there any training or orientation sessions provided to students before they commence their placement?',

    [IndustryQuestionsEnum.EMPLOYMENT]:
        'Are there any opportunities for students to secure employment within your organization upon completion of their placement?',
    [IndustryQuestionsEnum.HIRE]:
        'Would you like to hire recently qualified students from the SkilTrak platform?',
    [IndustryQuestionsEnum.SAFETY]:
        'Do you have any specific health and safety requirements or protocols that students need to adhere to during their placement?',

    [IndustryQuestionsEnum.DOCUMENTS]:
        'Are there any legal or administrative documents that need to be completed before student placements commencing?',
    [IndustryQuestionsEnum.APPLICATIONS]:
        'All placement student applications will be sent via the SkilTrak portal and email. Do you have any internal platform (application form) that you want to link here?',
}
