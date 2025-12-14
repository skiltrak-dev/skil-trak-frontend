import { BaseResponse } from './base.type'

export interface IndustryGalleryItem extends BaseResponse {
    id: number
    title: string
    fileKey: string
    file: string
    fileSize: number
}
