import { WorkplaceCurrentStatus } from '@utils'
import { UserStatus } from 'types/user.type'

export interface StudentsFilterType {
    name: string
    email: string
    phone: string
    studentId: string
    suburb: string
    status: UserStatus
    rtoId: number
    industryId: number
    courseId: number
    nowp: string
    currentStatus: WorkplaceCurrentStatus
}

export interface SubAdminStudentsFilterType {
    name: string
    email: string
    phone: string
    studentId: string
    status: UserStatus
    rtoId: number
    industryId: number
    courseId: number
    currentStatus: WorkplaceCurrentStatus
    suburb: string
    nowp: string
}
