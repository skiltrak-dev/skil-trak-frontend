export interface NoteTemplateType {
    id: number
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    type: string
    subject: string
    successContent: string
    failureContent: string
    sequenceNo: number
}
