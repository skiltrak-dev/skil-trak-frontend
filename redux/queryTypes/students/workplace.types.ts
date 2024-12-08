import { WorkplaceAnswerEnum } from '@partials/common'
import { WorkplaceEmploymentDocument } from '@partials/student'
import { Course, Industry, Student, SubAdmin, UserStatus } from '@types'
import { WorkplaceCurrentStatus } from '@utils'
import { BaseResponse } from 'types/base.type'

export interface WorkplaceQuestionType {
    id: number
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    question: string
    type: string
    answer: WorkplaceAnswerEnum | any
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
    AgreementSignedDate: Date
    distance: number
    accepted: boolean
    applied: boolean
    appliedDate: Date
    appointmentBooked: boolean
    appointmentBookedDate: Date
    awaitingAgreementSigned: boolean
    awaitingAgreementSignedDate: Date
    awaitingWorkplaceResponse: boolean
    awaitingWorkplaceResponseDate: Date
    cancelled: boolean
    cancelledDate: Date
    caseOfficerAssigned: boolean
    caseOfficerAssignedDate: Date
    createdAt: Date
    id: number
    industryCheck: boolean
    industryCheckDate: Date
    industryResponse: string
    industryResponseDate: Date
    interview: boolean
    interviewDate: Date
    isActive: boolean
    isCompleted: boolean
    isCompletedDate: Date
    placementStarted: boolean
    placementStartedDate: Date
    terminated: boolean
    terminatedDate: Date
    updatedAt: Date
    industry: Industry
}

export interface EmploymentDocument extends BaseResponse {
    file: string
    id: string
    key: string
    workplaceDocumentType: WorkplaceEmploymentDocument
}

export interface Warning {
    id: number
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    comment: string
    type: string
}

export interface IWorkplaceIndustries {
    warnings?: Warning[]
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

    interviewDate?: Date
    appointmentDate?: Date
    industries?: WorkplaceWorkIndustriesType[]
    courses?: Course[]
    student?: Student
    questions?: WorkplaceQuestionType[]
    employmentDocument?: EmploymentDocument
}
