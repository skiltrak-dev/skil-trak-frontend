import { BaseResponse } from './base.type'
import { Industry } from './user.type'

export interface Rpl extends BaseResponse {
    id: number
    identity: string
    resume: string
    jobDescription: string
    financialEvidence: string[]
    academicDocuments: string[]
    industry: Industry
}
