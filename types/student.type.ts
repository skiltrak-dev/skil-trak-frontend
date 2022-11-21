import { BaseResponse } from './base.type'
import { Rto } from './rto.type'
import { Course } from './sector.type'
import { User } from './user.type'

export interface Student extends BaseResponse {
   id: number
   studentId: string
   familyName: string
   phone: string
   dob: Date
   emergencyPerson: string
   emergencyPersonPhone: string

   addressLine1: string
   addressLine2: string
   suburb: string
   state: string
   zipCode: string
   user: User
   rto: Rto
   location: string
   courses: Course[]
}
