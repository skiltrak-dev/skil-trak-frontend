import { AssessmentEvidenceFolder } from './assessment-evidence.type'
import { BaseResponse } from './base.type'
import { Folder } from './folder.type'

export interface CourseExtraHours extends BaseResponse {
    id: number
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    hours: string
}

export interface WPSectorType extends BaseResponse {
    id: number
    sector: Sector
}

export interface WorkplaceType extends BaseResponse {
    id: number
    isActive: boolean
    name: string
    sector: Sector
    course: Course
    workplaceTypeSectors: WPSectorType[]
    sectors: WPSectorType[]
}
export interface WorkplaceTypes extends BaseResponse {
    id: number
    isActive: boolean
    workplaceType: WorkplaceType
}

export interface Course extends BaseResponse {
    id: number
    code: string
    title: string
    name: string
    description: string
    hours: number
    requirements: string
    courseRequirements?: any
    sector: Sector
    folders: Folder[]
    results: any
    timing: any
    isSuperseded: boolean
    extraHours: CourseExtraHours[]
    assessmentEvidence: AssessmentEvidenceFolder[]
    workplaceTypes: WorkplaceTypes[]
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
