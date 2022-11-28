import { BaseResponse } from './base.type'

export interface Packages extends BaseResponse {
    id: number
    name: string
    description: string
    billingType: 'monthly' | 'fortnightly'
    assessmentType: 'auto' | 'manual'
}
