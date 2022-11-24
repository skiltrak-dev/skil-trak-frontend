import { BaseResponse } from './base.type'
import { Course } from './sector.type'
import { Industry, User } from './user.type'

export interface Folder extends BaseResponse {
  id?: number
  name: string
  type: 'docs' | 'images' | 'videos' | 'all'
  category: 'IndustryCheck' | 'AssessmentEvidence'
  capacity: number
  description: string
  isRequired: boolean
  isCustom?: boolean
  course?: Course
  industry?: Industry
}
