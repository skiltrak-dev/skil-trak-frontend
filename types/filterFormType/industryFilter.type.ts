import { UserStatus } from 'types/user.type'

export interface AdminIndustryFormFilter {
    name: string
    email: string
    phone: string
    abn: string
    status: UserStatus
    address: string
    courseId: number
    sectorId: number
    state: string
    suburb: string
    isPartner: boolean
    isHiring: boolean | undefined
    isSnoozed: boolean | undefined
}
