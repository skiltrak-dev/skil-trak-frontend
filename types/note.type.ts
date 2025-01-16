import { NotesTemplateStatus } from '@partials/common/Notes/forms'
import { BaseResponse } from './base.type'
import { User } from './user.type'
import { NoteTemplateType } from './noteTemplate.type'

export interface StudentNoteHistory {
    current: string
    previous: string
    updateAt: Date
    updateBy: string
}

export interface StudentNote extends BaseResponse {
    id: number
    status: NotesTemplateStatus
    noteTemplate: NoteTemplateType
    studentNoteHistory: StudentNoteHistory[]
}

export interface Note extends BaseResponse {
    id: number
    title: string
    body: string
    isPinned: boolean
    isEnabled: Date | null
    author: User
    studentNote: StudentNote
    isSuccess: boolean
}
