import { Course, Packages } from '@types'
import { BaseResponse } from './base.type'
import { Note } from './note.type'
import { IWorkplaceIndustries } from 'redux/queryTypes'

export enum StudentStatusEnum {
    ACTIVE = 'active',
    TERMINATED = 'terminated',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
    EXPIRED = 'expired',
}

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

export interface RtoStatsCount {
    currentStudent: number | string
    pendingResult: number | string
    pendingStudent: number | string
    workplaceRequest: number | string
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
    package: Packages
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
    called: boolean
    emergencyPersonPhone: string
    industries: Industry[]
    expiryDate: Date
    addressLine1: string
    addressLine2: string
    suburb: string
    state: string
    zipCode: string
    user: User
    rto: Rto
    location: string
    studentStatus: StudentStatusEnum
    courses: Course[]
    assessmentEvidence: any[]
    workplace: IWorkplaceIndustries[]
    callLog: CallLog[]

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
    createdBy: User
}

export interface Industry extends BaseResponse {
    id: number
    abn: string
    businessName: string
    phoneNumber: string
    dob: Date
    contactPerson: string
    contactPersonNumber: string
    isPartner: boolean
    studentCapacity: number | null
    courses: Course[]

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

export interface CallLog extends BaseResponse {
    id: number
    isExpired: boolean
    isAnswered: boolean
}
export interface ApiCallResult  {
    isLoading: any
    isSuccess: any
    isFetching: any
    isError: any
    error: any
    isUninitialized: any
    status:string
    reset : () => void
    originalArgs : any
    fulfilledTimeStamp : any
    requestId:any
    data:any
    endpointName:any
    startedTimeStamp:any
}
