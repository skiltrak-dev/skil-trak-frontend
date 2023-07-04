import { Result } from '@constants'

export enum AddCommentEnum {
    Approved = 'approved',
    Rejected = 'rejected',
}

export interface AssessmentFinalCommentFormType {
    result: Result
    finalComment: string
    notifyStudent: boolean
    notifyRto: boolean
    notifyCoordinator: boolean
}
