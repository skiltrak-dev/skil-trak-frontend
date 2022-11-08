import { BaseResponse } from './base.type'

export interface User extends BaseResponse {
    id: number
    email: string
    name: string
    role: string
    socketId: string | undefined
    status: string
    avatar: string | undefined
}
