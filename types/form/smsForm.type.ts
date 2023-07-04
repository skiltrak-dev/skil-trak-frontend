import { BaseResponse } from 'types/base.type'

export interface SMSFormType {
    message: string
    number: string
}

export interface SMSFormQueryType extends SMSFormType, BaseResponse {
    id: number
    status: number
}
