import { studentProfileKeys } from '@partials/student/components'

export const checkStudentProfileCompletion = (values: any) => {
    let totalValues = studentProfileKeys?.length
    let filledValues = 0
    studentProfileKeys.forEach((key) => {
        const keyValue = values[key as keyof typeof values]
        if (
            keyValue &&
            keyValue != 'NA' &&
            keyValue != 'N/A' &&
            !Array.isArray(keyValue)
        ) {
            filledValues++
        } else if (Array.isArray(keyValue) && keyValue?.length > 0) {
            filledValues++
        }
    })
    const profileCompletion = Math.floor((filledValues / totalValues) * 100)
    return profileCompletion
}
