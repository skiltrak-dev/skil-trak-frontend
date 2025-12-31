import { UserRoles } from '@constants'
import { OptionType } from 'types/option.type'

export interface IndustryFormType {
    name: string
    abn: number
    website?: string
    phoneNumber: string
    contactPerson: string
    contactPersonNumber: string
    courses?: OptionType[] // Adjust type based on your Select options
    email: string
    addressLine1: string
    zipCode: number
    role: UserRoles
    suburb: string
    state: string
    country: string
    region: string
    isAddressUpdated: boolean
    agreedWithPrivacyPolicy: boolean
    // Add other fields as necessary
}

export interface IndustryFormTypeWithCoursesAsNumber {
    courses: number | number[] // Single number instead of an array
}

export type ProvideIndustryDetail = Omit<IndustryFormType, 'courses'> &
    IndustryFormTypeWithCoursesAsNumber
