import { UrgencyLevel } from '@partials/admin/rto/message-center/enum'
import { BaseResponse } from './base.type'
import { Course } from './sector.type'
import { Rto, User } from './user.type'

export interface RTOSubAdmin extends BaseResponse {
    id: number
    skiltrakId: string
    appointmentEligibility: any
    addressLine1: string
    address: string
    phone: string
    coordinatorId: string
    receiveWorkplaceRequest: boolean | null
    canBookAppointments: boolean
    receiveStudentAssessment: boolean
    user: User
    courses: Course[]
    rtos: Rto[]
    createdBy: User
}

export interface RtoMessage extends BaseResponse {
    id: number
    urgencyLevel: UrgencyLevel
    status: string
    senderName: string
    expiryDate: Date
    title: string
    message: string
    rto: Rto
}
