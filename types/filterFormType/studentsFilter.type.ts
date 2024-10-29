import { WorkplaceCurrentStatus } from '@utils'
import { UserStatus } from 'types/user.type'

export interface StudentsFilterType {
    name: string
    email: string
    phone: string
    studentId: string
    subadminId: number
    suburb: string
    state: string
    status: UserStatus
    rtoId: number
    industryId: number
    sectorId: number
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
    flagged: boolean
    snoozed: boolean
    nonContactable: boolean
}
