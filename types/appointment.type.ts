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
    notes: []
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
    cancelledBy: User
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

export interface AppointmentAvailableSlots {
    [key: string]: string[]
}

export interface GetAppointmentSlots {
    id: number
    date: Date | string | undefined
    forUser: number
    byUser: number
}

export interface SubadminAvailabilitiesList extends BaseResponse {
    id: number
    name: string
    openingTime: Date
    closingTime: Date
    user: User
}

export enum AppointmentUserEnum {
    RTO = 'RTO',
    Student = 'Student',
    Industry = 'Industry',
    Self = 'Self',
    Coordinator = 'Coordinator',
}

export interface SelectedPerson {
    selectedAppointmentFor: AppointmentUserEnum | null
    selectedAppointmentWith: AppointmentUserEnum | null
}

export interface SelectedUserType {
    selectedAppointmentForUser: number | null
    selectedAppointmentWithUser: number | null
}

export interface AppointmentDataType {
    text: AppointmentUserEnum
    icon: string
    type: AppointmentUserEnum[]
}

export interface SelectedTimeType {
    startTime?: Date | string
    endTime?: Date | string
}
