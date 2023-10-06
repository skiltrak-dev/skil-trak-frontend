import { UserStatus } from 'types/user.type'

export interface AdminIndustryFormFilter {
    name: string
    email: string
    phone: string
    status: UserStatus
    address: string
    courseId: number
    sectorId: number
}
