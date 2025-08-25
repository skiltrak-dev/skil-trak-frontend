import {
    stepsConfig,
    satisfactionOptions,
    agreementOptions,
    confidenceOptions,
    recommendOptions,
    skillTrackSatisfactionOptions,
    clarityOptions,
} from '../config'
import type { StepConfig } from '../types'

const getOptionLabel = (key: string, value: string | number | null) => {
    if (value === null || value === undefined) return 'Not provided'

    const optionMaps: { [key: string]: { value: string; label: string }[] } = {
        overallSatisfaction: satisfactionOptions,
        skillsGained: agreementOptions,
        confidence: confidenceOptions,
        recommendEmployer: recommendOptions,
        skilltrakSupport: skillTrackSatisfactionOptions,
        skilltrakCommunication: clarityOptions,
    }

    if (
        [
            'professionalism',
            'communication',
            'supportMentorship',
            'learningOpportunities',
        ].includes(key)
    ) {
        return `${value} / 5 stars`
    }

    const options = optionMaps[key]
    if (options) {
        const option = options?.find((opt) => opt?.value === value)
        return option ? option.label : value
    }

    return value
}

export const processSubmission = (feedbackData: any[]) => {
    const questionAnswerPairs = feedbackData?.flatMap((feedback) => {
        const courseName = feedback?.course?.title || 'Unknown'
        return stepsConfig?.flatMap((step: any) =>
            step.fields?.map((field: any) => ({
                courseName,
                question: field.label,
                answer: getOptionLabel(field.key, feedback[field.key]),
                key: field.key,
                step: step.title,
            }))
        )
    })

    return questionAnswerPairs
}
