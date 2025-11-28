import { BaseResponse } from './base.type'

export interface Supervisor extends BaseResponse {
    id: number
    name: string
    email: string | null
    phone: string | null
    experience: string | null
    description: string | null
    position: string | null
    level: number
    title: string
    qualification: string
}
