import { BaseResponse } from './base.type'
import { User } from './user.type'

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
}

export interface RtoCount {
    pending: number | string
    approved: number | string
    rejected: number | string
    blocked: number | string
    archived: number | string
}
