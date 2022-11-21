import { SubAdmin } from './sub-admin.type'
import { BaseResponse } from './base.type'
import { Course } from './sector.type'
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
   courses: Course[]
   subadmin: SubAdmin[]
}
