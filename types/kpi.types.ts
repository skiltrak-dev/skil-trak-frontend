import { BaseResponse } from './base.type'
import { Course } from './sector.type'
import { Student, User } from './user.type'

export interface KpiTypes {
    id: number
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    objectId: number
    isDuplicated: boolean
    kpiType: KpiType
    student: Student
    user: User
    course: Course
}

export interface KpiType extends BaseResponse {
    id: number
    name: string
}
