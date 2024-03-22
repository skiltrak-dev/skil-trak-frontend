import { BaseResponse } from './base.type'
import { User } from './user.type'

export interface Note extends BaseResponse {
    id: number
    title: string
    body: string
    isPinned: boolean
    isEnabled: Date | null
    author: User
}
