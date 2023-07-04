import { BaseResponse } from './base.type'
import { Course } from './sector.type'
import { Industry, User } from './user.type'

export enum TypeOptionsEnum {
    Documents = 'docs',
    Images = 'images',
    Videos = 'videos',
    All = 'all',
}

export enum FolderCategoryEnum {
    IndustryCheck = 'IndustryCheck',
    AssessmentEvidence = 'AssessmentEvidence',
}

export interface Folder extends BaseResponse {
    id?: number
    name: string
    type: TypeOptionsEnum
    category: FolderCategoryEnum
    capacity: number
    description: string
    isRequired: boolean
    isCustom?: boolean
    course?: Course
    industry?: Industry
}
