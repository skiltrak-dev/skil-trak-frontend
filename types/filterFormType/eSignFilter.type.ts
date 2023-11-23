import { UserStatus } from 'types/user.type'
export interface eSignFilterType {
    name: string
    status: UserStatus
    userId: number
    courseId: number
}
