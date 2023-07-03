import { UserStatus } from 'types/user.type'

export interface AdminSubadminFilter {
    name: string
    email: string
    status: UserStatus
    courseId: number
}
