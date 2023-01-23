import { Packages } from './package.type'

export interface RtoFormData {
    name: string
    email: string
    role: string
    password: string
    confirmPassword: string
    avatar: string | undefined
    rtoCode: string
    abn: string
    phone: string
    suburb: string
    state: string
    addressLine1: string
    addressLine2: string
    zipCode: string
    agreedWithPrivacyPolicy: boolean

    location: string
    notifyByEmail: boolean
    notifyBySms: boolean

    package: Packages
    sectors: any
    courses: any
}
