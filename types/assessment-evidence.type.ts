import { BaseResponse } from './base.type'
import { Course } from './sector.type'

export interface AssessmentEvidenceFolder extends BaseResponse {
    id: number
    skiltrakId: number
    name: string
    type: string
    capacity: number
    description: string
    positiveComment: string
    negativeComment: string
    notAssessed: boolean
}

export interface CourseWithAssessmentEvidence extends Course {
    assessmentEvidence: AssessmentEvidenceFolder[]
}
