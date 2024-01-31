import { EsignDocumentStatus } from '@utils'
import { UserStatus } from 'types/user.type'

export interface SubadminESignFilterType {
    templateName: string
    status: EsignDocumentStatus
    courseId: number
    folderId: number | null
    studentName: string
    rtoName: string
    industryName: string
}
