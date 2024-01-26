import { UserStatus } from 'types/user.type'

export interface SubadminESignFilterType {
    templateName: string
    status: UserStatus
    courseId: number
    folderId: number
    studentName: string
    rtoName: string
    industryName: string
}
