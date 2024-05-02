import { workplaceQuestionsKeys } from '../enum'

export const questionsDefaultValues = (questions: any) => {
    let updatedQuestions: any = {}
    questions?.forEach((question: any) => {
        if (question?.type === workplaceQuestionsKeys.suburb) {
            questions[workplaceQuestionsKeys.suburb] = question?.answer?.suburb
            questions['zip'] = question?.answer?.zip
        } else if (
            question?.type === workplaceQuestionsKeys.supervisorMeeting
        ) {
            questions['supervisorMeetingDate1'] =
                question?.answer?.supervisorMeetingDate1
            questions['supervisorMeetingDate2'] =
                question?.answer?.supervisorMeetingDate2
        } else if (question?.type === workplaceQuestionsKeys.possession) {
            questions[question?.type] = question?.answer?.split(',')
        } else {
            questions[question?.type] = question?.answer
        }
    })
    return updatedQuestions
}
