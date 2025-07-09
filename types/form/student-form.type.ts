import { OptionType } from 'types/option.type'

export interface StudentFormType {
    name: string
    familyName: string
    phone: string
    studentId: string
    dob: Date
    emergencyPerson: string
    emergencyPersonPhone: string
    rto: number
    sectors: OptionType[]
    courses: OptionType[]
    email: string
    password: string
    confirmPassword: string
    addressLine1: string
    addressLine2: string
    suburb: string
    state: string
    zipCode: string
    agreedWithPrivacyPolicy: boolean
    role: string
    isAddressUpdated: boolean
    courseDescription?: string
    rtoInfo?: any
}

export type StudentFormQueryType = StudentFormType & {
    sectors: OptionType[] | string
    courses: OptionType[] | string
}
