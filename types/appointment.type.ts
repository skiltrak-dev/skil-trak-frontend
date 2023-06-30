import { AppointmentType } from './appointment-type.type'
import { BaseResponse } from './base.type'
import { Course } from './sector.type'
import { Industry, Rto, Student, User } from './user.type'

export interface appointmentWithUser extends User {
    industry: Industry
    student: Student
    rto: Rto
}

export interface Appointment extends BaseResponse {
    type: AppointmentType
    course: Course
    date: Date
    WorkplacePhone: string
    address: string
    email: string
    endTime: Date
    totalMinutes: string
    id: number
    isActive: boolean
    isCancelled: boolean
    joinUrl: string
    name: string
    note: string
    phone: string
    sectorId: string
    skiltrakId: string
    startTime: Date
    startUrl: string
    workplaceEmail: string
    workplaceName: string
    workplaceSupervisor: string
    appointmentFor: appointmentWithUser
    appointmentBy: appointmentWithUser
    coordinator: User
}

export interface CreateAppointment {
    date: Date
    note: string
    type: number
    course: number
    appointmentFor: number
    appointmentBy: number
    startTime: Date
    endTime: Date
}
