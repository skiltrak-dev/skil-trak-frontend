import { BaseResponse } from './base.type'

export enum UserStatus {
   Pending = 'pending',
   Approved = 'approved',
   Rejected = 'rejected',
   Archived = 'archived',
   Blocked = 'blocked',
}

export interface User extends BaseResponse {
   id: number
   email: string
   name: string
   role: string
   socketId: string | undefined
   status: string
   avatar: string | undefined
}

export interface UserCount {
   pending: number | string
   approved: number | string
   rejected: number | string
   blocked: number | string
   archived: number | string
}
