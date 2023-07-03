import { Industry } from './user.type'

export interface VolunteerRequest {
    id: number
    isActive: boolean
    createdAt: string
    updatedAt: string
    industry: Industry
}
