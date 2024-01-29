import { Industry } from "@types"

export interface StudentJobType {
    id: any
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    title: string
    phone: string
    email: string
    description: string
    employmentType: any
    addressLine1: string
    addressLine2: string
    zipCode: string
    suburb: string
    state: string
    contactPerson: string
    website: string
    vacancies: any
    salaryFrom: string
    salaryTo: string
    expiry: string
    status: string
    savedJobs: any
    avatar: any
    industry: Industry
    students: any
}

export interface StudentJobsType {
    data: StudentJobType[]
}
