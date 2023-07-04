import { AssessmentEvidenceFolder } from './assessment-evidence.type'
import { BaseResponse } from './base.type'
import { Folder } from './folder.type'

export interface Course extends BaseResponse {
    id: number
    code: string
    title: string
    name: string
    description: string
    hours: number
    requirements: string
    sector: Sector
    folders: Folder[]
}

export interface Sector extends BaseResponse {
    id: number
    code: string
    name: string
    courses: Course[]
}

export interface GetSectorsType {
    [key: string]: Course[]
}

export interface CourseDetailType extends Course {
    assessmentEvidence: AssessmentEvidenceFolder[]
    folder: Folder[]
}
