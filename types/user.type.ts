import { BaseResponse } from './base.type'
import { IWorkplaceIndustries } from 'redux/queryTypes'
import { ReportingType } from '@partials/admin/rto/enum'
import { IndustryPlacementStatus } from '@partials/common'
import { InvoiceTypeEnum } from '@partials/admin/invoices'
import { AssessmentToolsType, Course, Packages } from '@types'

export enum StudentStatusEnum {
    ACTIVE = 'active',
    TERMINATED = 'terminated',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
    EXPIRED = 'expired',
    QUALIFICATION_ISSUED = 'qualification issued',
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
    signers: any
    schedules: any
    isEmailVerified: boolean
}

export interface UserCount {
    pending: number | string
    approved: number | string
    rejected: number | string
    blocked: number | string
    archived: number | string
    snoozed: any
    completed: number
    unAssigned: number
    placementStarted: number
    schedule: number
    reported: number
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
    FOLLOW_UP = 'followUp',
    SNOOZED = 'snoozed',
}

export interface RtoStatsCount {
    currentStudent: number | string
    pendingResult: number | string
    pendingStudent: number | string
    workplaceRequest: number | string
}

export interface InvoiceSetting extends BaseResponse {
    id: number
    type: InvoiceTypeEnum
    startDate: Date
    invoiceAction: InvoiceAction
}

export interface InvoiceAction extends BaseResponse {
    id: number
    name: string
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
    studentsCount: string
    zipCode: string
    allowUpdate: boolean
    allowAutoComplete: boolean
    workplaceApprovalRequired: boolean
    autoReleaseLogBook: boolean
    allowInvoicing: boolean
    allowAutoReport: boolean
    allowPartialSubmission: boolean
    allowStudentSelfPayment: boolean
    canViewPaymentStatus: boolean
    reportType: ReportingType
    user: User
    package: Packages
    courses: Course[]
    subadmin: SubAdmin[]
    students: Student[]
    contactPersons: any
    invoiceSettings: InvoiceSetting[]
    assessmentTools: AssessmentToolsType[]
}

export interface StudentActionsRequest extends BaseResponse {
    id: number
    comment: string
    status: string
    action: string
    snoozedDate: Date
    student: Student
    requestedBy: User
}
export interface RemovePartnerRequest extends BaseResponse {
    id: number
    comment: string
    status: string
    industry: Industry
}

export interface Student extends BaseResponse {
    id: number
    studentId: string
    age: string
    isInternational: boolean
    familyName: string
    hasIssue: boolean
    isReported: boolean
    statusHistory: any
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
    courseDescription: string
    suburb: string
    state: string
    zipCode: string
    oldExpiry: Date
    nonContactable: boolean
    user: User
    rto: Rto
    snoozedAt: Date | undefined
    snoozedDate: Date | undefined
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
    isTransferred: boolean
    isAddressUpdated: boolean
    studentUpdateRequests: PartnerRemovalRequests[]
    nonContactableAt: Date
}

export interface RtoApprovalWorkplaceRequest extends BaseResponse {
    id: number
    status: string
    isRtoApprovalRequired: boolean
    rtoApprovalStatus: string
    declaration: string
    isAutomated: boolean
    comment: string
    dates: Dates
    approvalDate: string
    approvalChannal: string
    student: Student
    industry: Industry
}

export interface Dates {
    date1: string
    date2: string
}

interface UserExtend extends User {
    rto: Rto
    coordinator: SubAdmin
}

export interface DeptMember extends BaseResponse {
    isHod: boolean
    department: Department
    subadmin: SubAdmin & { assignStudents: number }
}

export interface Department extends BaseResponse {
    name: string
    code: string
    email: null
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
    globalSearchAccess: boolean
    isManager: boolean
    receiveStudentAssessment: boolean
    receiveWorkplaceRequest: boolean
    canBookAppointments: boolean
    canAccessSubadmin: boolean
    canAddStudents: boolean
    canViewAllStudents: boolean
    canCreateInternalTicket: boolean
    canViewRtoList: boolean

    departmentMember: DeptMember

    hasAllStudentAccess: boolean

    studentsCount: number
}

export interface PartnerRemovalRequests extends BaseResponse {
    comment: string
    status: string
    action: string
}

export interface IndustryCourseApprovals extends BaseResponse {
    id: number

    status: string
    description: string
    note: null
    file: null
    reference: string[]
    isPreviousCourse: boolean
    isCoordinatorAdded: boolean
    addedBy: User
    actionBy: User
    course: Course
}

export interface StudentProvidedWpAppRequest extends BaseResponse {
    id: number
    status: string
    industry: Industry
    course: Course
    student: Student
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
    website: string
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
    approvalReviewQuestion: any
    locations: any
    enrolledStudents: number
    favoriteBy: SubAdmin
    partnerRemovalRequests: PartnerRemovalRequests[]
    industryCourseApprovals: IndustryCourseApprovals[]
}

export interface PendingIndustry extends Industry {
    industry: Industry
    sector: any
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

export interface KpiVerification {
    id: number
    isVerified: boolean
}

export interface KpiTarget {
    id: number
    verified: boolean
    user: AppointmentAchievments
    departmentMember: DeptMember
}

export interface AppointmentAchievments extends User {
    appointments: number
    workplaceRequests: number
    agreementByStudent: number
    agreementByWorkplace: number
    completed: number
    progress: number
    targets: Targets
    kpiData: any
}

export interface Targets {
    appointments: number
    workplaceRequests: number
    AgreementByStudent: number
    AgreementByWorkplace: number
    completed: number
}
