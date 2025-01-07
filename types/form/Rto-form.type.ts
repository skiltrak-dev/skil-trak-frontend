import { OptionType } from 'types/option.type'
import { Course } from 'types/sector.type'

export interface RtoAssessmentToolFormType extends FormData {
    course: number
    title: string
    file: File
    isLogBook: boolean
}

export interface ImportStudentFileList {
    address: string
    email: string
    id: string
    name: string
    contact: string
}

export interface ImportStudentFormType {
    batch: string
    expiryDate: string
    courses: number[]
    list: ImportStudentFileList
}
