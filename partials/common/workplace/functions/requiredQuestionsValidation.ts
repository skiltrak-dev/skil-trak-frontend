import { workplaceQuestionsKeys } from '../enum'
import * as yup from 'yup'

const requiredFields = [
    workplaceQuestionsKeys.suburb,
    workplaceQuestionsKeys.placementStartDate,
    workplaceQuestionsKeys.preferredContactTime,
    workplaceQuestionsKeys.possession,
    workplaceQuestionsKeys.medicalCondition,
    workplaceQuestionsKeys.commutePlan,
    workplaceQuestionsKeys.awarenessOfUnpaidPlacement,
    workplaceQuestionsKeys.understandingOfDocumentation,
]

export const requiredQuestionsValidation = () => {
    let fields: any = {}

    requiredFields?.forEach((field: workplaceQuestionsKeys) => {
        if (field === workplaceQuestionsKeys.possession) {
            fields[field] = yup
                .array()
                .of(yup.string().required('Item must be a non-empty string'))
                .min(1, 'Item must contain at least one item')
                .required()
        } else {
            fields[field] = yup.string().nullable(true).required('Required!')
        }
    })
    return fields
}
