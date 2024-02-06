import { BaseResponse } from './base.type'
import { Course } from './sector.type'
import { Industry, User } from './user.type'

export interface Job extends BaseResponse {
    id?: number
    title: string
    phone: string
    email: string
    description: string
    addressLine1: string
    addressLine2: string
    zipCode: string
    views: number
    suburb: string
    state: string
    contactPerson: string
    website: string
    vacancies: number
    salaryFrom: number
    salaryTo: number
    expiry: number
    status: any
    industry: Industry
    applicationCount: number
}
