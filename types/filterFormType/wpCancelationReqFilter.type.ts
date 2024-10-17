import { UserStatus } from 'types/user.type'

export interface WpCancelationReqFilter {
    name: string
    email: string
    phone: string
    studentId: string
    coordinatorId: number
    courseId: number
    status: UserStatus
}
