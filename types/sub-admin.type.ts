import { User } from './user.type'

export interface SubAdmin {
   id: number
   user: User
   appointmentEligibility: boolean
}
