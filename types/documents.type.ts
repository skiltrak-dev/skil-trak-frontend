import { BaseResponse } from './base.type'

export interface DocumentsType extends BaseResponse {
    id: number
    docType: string
    fileType: FileType
    content: null | string
    file: null | string
    for: string
}

enum FileType {
    Editor = 'editor',
    File = 'file',
}
