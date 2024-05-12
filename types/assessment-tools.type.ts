import { Course } from './sector.type'

export interface AssessmentToolsType {
    id: number
    isActive: boolean
    createdAt: string
    updatedAt: string
    title: string
    status: string
    file: string
    other: boolean
    course: Course
}
