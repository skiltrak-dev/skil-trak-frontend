import { UserStatus } from 'types/user.type'

export interface RTOFilterType {
    name: string
    email: string
    rtoCode: string
    status: UserStatus
    courseId: number
}
