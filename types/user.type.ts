import { Course, Packages } from '@types'
import { BaseResponse } from './base.type'
import { Note } from './note.type'
import { IWorkplaceIndustries } from 'redux/queryTypes'
import { ReportingType } from '@partials/admin/rto/enum'
import { IndustryPlacementStatus } from '@partials/common'

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

interface StatusChangeHistory {
    current: UserStatus
    previous: string
    updateAt: Date
    updateBy: string
}

export interface User extends BaseResponse {
    id: number
    email: string
    name: string
    role: string
    socketId: string | undefined
    status: UserStatus
    password: string
    avatar: string | undefined
    appointmentFor: any
    statusChangeHistory: StatusChangeHistory
    after_hours_access: boolean
}

export interface UserCount {
    pending: number | string
    approved: number | string
    rejected: number | string
    blocked: number | string
    archived: number | string
    snoozed: any
    completed: number
}

export interface SubadminCount extends UserCount {
    admin_approved: number
    rto_approved: number
}

export enum IndustryStatus {
    DEFAULT = 'default',
    FAVOURITE = 'favourite',
    DO_NOT_DISTURB = 'doNotDisturb',
    BLOCKED = 'blocked',
}
export enum RtoStatus {
    DEFAULT = 'default',
    FAVOURITE = 'favourite',
    DO_NOT_DISTURB = 'doNotDisturb',
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
    abn: string
    phone: string
    suburb: string
    state: string
    addressLine1: string
    addressLine2: string
    zipCode: string
    allowUpdate: boolean
    allowAutoComplete: boolean
    allowAutoReport: boolean
    reportType: ReportingType
    user: User
    package: Packages
    courses: Course[]
    subadmin: SubAdmin[]
    students: Student[]
}

export interface Student extends BaseResponse {
    id: number
    studentId: string
    age: string
    isInternational: boolean
    familyName: string
    hasIssue: boolean
    phone: string
    dob: Date
    isHighPriority: boolean
    emergencyPerson: string
    subadmin: SubAdmin
    called: boolean
    batch: string
    emergencyPersonPhone: string
    industries: Industry[]
    expiryDate: Date
    addressLine1: string
    addressLine2: string
    suburb: string
    state: string
    zipCode: string
    oldExpiry: Date
    nonContactable: boolean
    user: User
    rto: Rto
    rtoCoordinator: SubAdmin
    location: string
    studentStatus: StudentStatusEnum
    courses: Course[]
    assessmentEvidence: any[]
    workplace: IWorkplaceIndustries[]
    callLog: CallLog[]
    gender: string
    tickets: any
    isSnoozed: boolean
    snoozedDate: Date
    isAddressUpdated: boolean
}

interface UserExtend extends User {
    rto: Rto
    coordinator: SubAdmin
}

export interface SubAdmin extends BaseResponse {
    id: number
    user: User
    phone: string
    appointmentEligibility: boolean
    courses: Course[]
    coordinatorId: string
    addressLine1: string
    createdBy: UserExtend
    isAssociatedWithRto: boolean
    canAdmin: boolean
    isAdmin: boolean
    rtos: Rto[]
    associatedRto: Rto
    removeOnPlacementStart: boolean
    canCancelWorkPlaceRequest: boolean
    allowRtoListing: boolean
    allowIndustryListing: boolean
    allowAutoAssignment: boolean
    canAccessRtoProfile: boolean
    canDownloadReport: boolean
    canViewStudentDetails: boolean
    canViewIndustryDetails: boolean
    canAccessRpl: boolean
    canAccessTalentPool: boolean
    canAccessQueries: boolean
    canAccessBlogs: boolean
}

export interface Industry extends BaseResponse {
    id: number
    abn: string
    businessName: string
    phoneNumber: string
    dob: Date
    contactPerson: string
    snoozedDate: Date
    isSnoozed: boolean
    contactPersonNumber: string
    isPartner: boolean
    PartneredBy: User
    studentCapacity: number | null
    courses: Course[]
    branches: Industry[]
    createdBy: any
    channel: string
    addressLine1: string
    addressLine2: string
    suburb: string
    state: string
    zipCode: string
    user: User
    location: string
    headQuarter: Industry
    isHiring: boolean
    subAdmin: SubAdmin[]
    callLog: CallLog[]
    approvalReviewQuestionCount: number
    isAddressUpdated: boolean
    placementStatus: IndustryPlacementStatus
}

export interface IndustryBranchesAddressType extends BaseResponse {
    address: string
    contactPerson: string
    contactPersonPhone: string
    contactPersonEmail: string
    suburb: string
    studentCapacity: number
    enrolledStudents: number
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
export interface ApiCallResult {
    isLoading: any
    isSuccess: any
    isFetching: any
    isError: any
    error: any
    isUninitialized: any
    status: string
    reset: () => void
    originalArgs: any
    fulfilledTimeStamp: any
    requestId: any
    data: any
    endpointName: any
    startedTimeStamp: any
}
