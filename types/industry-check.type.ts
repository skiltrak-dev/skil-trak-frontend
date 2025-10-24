import { BaseResponse } from './base.type'
import { Sector } from './sector.type'

export interface IndustryCheck extends BaseResponse {
    id: number
    isActive: boolean
    name: string
    description?: string
    capacity: number
    link: string
    isRequired: boolean
    sector: Sector
    sectorId: number
    documentTemplate?: number
}

export interface IndustryCheckFilterType {
    name: string
    sectorId: number
}
