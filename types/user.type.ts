import { Course } from '@types'
import { BaseResponse } from './base.type'
import { Note } from './note.type'

export enum UserStatus {
    Pending = 'pending',
    Approved = 'approved',
    Rejected = 'rejected',
    Archived = 'archived',
    Blocked = 'blocked',
}

export interface User extends BaseResponse {
    id: number
    email: string
    name: string
    role: string
    socketId: string | undefined
    status: string
    password: string
    avatar: string | undefined
}

export interface UserCount {
    pending: number | string
    approved: number | string
    rejected: number | string
    blocked: number | string
    archived: number | string
}

export interface Rto extends BaseResponse {
    id: number
    rtoCode: string
    phone: string
    suburb: string
    state: string
    addressLine1: string
    addressLine2: string
    zipCode: string
    user: User
    package: any
    courses: Course[]
    subadmin: SubAdmin[]
    students: Student[]
}

export interface Student extends BaseResponse {
    id: number
    studentId: string
    familyName: string
    phone: string
    dob: Date
    emergencyPerson: string
    emergencyPersonPhone: string
    industries: any
    addressLine1: string
    addressLine2: string
    suburb: string
    state: string
    zipCode: string
    user: User
    rto: Rto
    location: string
    courses: Course[]
    assessmentEvidence: any[]
    workplace: any

    gender: string
}

export interface SubAdmin extends BaseResponse {
    id: number
    user: User
    phone: string
    appointmentEligibility: boolean
    courses: Course[]
    coordinatorId: string
    address: string
}

export interface Industry extends BaseResponse {
    id: number
    abn: string
    businessName: string
    phoneNumber: string
    dob: Date
    contactPerson: string
    contactPersonNumber: string
    studentCapacity: number | null

    addressLine1: string
    addressLine2: string
    suburb: string
    state: string
    zipCode: string
    user: User
    location: string
}

export interface ContactPerson extends BaseResponse {
    id: number
    name: string
    email: string
    phone: string
}
