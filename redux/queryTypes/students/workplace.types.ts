import { WorkplaceAnswerEnum } from '@partials/common'
import { IndustrySubAdmin } from '@partials/sub-admin/Industries'
import { Course, Student, SubAdmin, UserStatus } from '@types'
import { WorkplaceCurrentStatus } from '@utils'

export interface WorkplaceQuestionType {
    id: number
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    question: string
    type: string
    answer: WorkplaceAnswerEnum
}

export interface AdminWorkplaceCount {
    studentProvided: number
    requested: number
    assigned: number
    unAssigned: number
    cancelled: number
}

export interface WorkplaceWorkIndustriesType {
    AgreementSigned: boolean
    AgreementSignedDate: string
    distance: number
    accepted: boolean
    applied: boolean
    appliedDate: string
    appointmentBooked: boolean
    appointmentBookedDate: string
    awaitingAgreementSigned: boolean
    awaitingAgreementSignedDate: string
    awaitingWorkplaceResponse: boolean
    awaitingWorkplaceResponseDate: string
    cancelled: boolean
    cancelledDate: string
    caseOfficerAssigned: boolean
    caseOfficerAssignedDate: string
    createdAt: string
    id: number
    industryCheck: boolean
    industryCheckDate: string
    industryResponse: string
    industryResponseDate: string
    interview: boolean
    interviewDate: string
    isActive: boolean
    isCompleted: boolean
    isCompletedDate: string
    placementStarted: boolean
    placementStartedDate: string
    terminated: boolean
    terminatedDate: string
    updatedAt: string
    industry: IndustrySubAdmin
}

export interface IWorkplaceIndustries {
    approvalStatus?: string
    cancelledAt?: string
    byExistingAbn?: boolean
    studentProvidedWorkplace?: boolean
    assignedTo?: SubAdmin
    industryStatus?: UserStatus
    cancelledBy?: string
    createdAt?: Date
    currentStatus: WorkplaceCurrentStatus
    currentQualification?: string
    currentWork?: string
    haveDrivingLicense?: boolean
    haveTransport?: boolean
    id?: number
    isActive?: boolean
    isCancelled?: boolean
    prefferableLocation?: string
    status?: string
    updatedAt?: Date
    industries?: WorkplaceWorkIndustriesType[]
    courses?: Course[]
    student?: Student
    questions?: WorkplaceQuestionType[]
}
