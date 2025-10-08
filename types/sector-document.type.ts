import { BaseResponse } from './base.type'
import { Sector } from './sector.type'

export interface SectorDocument extends BaseResponse {
    id: number
    isActive: boolean
    name: string
    description?: string
    documentType: string
    required: boolean
    sector: Sector
    sectorId: number
    fileUrl?: string
    fileSize?: number
    mimeType?: string
}

export interface SectorDocumentFilterType {
    name: string
    sectorId: number
}
