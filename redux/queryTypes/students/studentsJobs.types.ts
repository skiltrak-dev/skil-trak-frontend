export interface StudentJobType {
    id: any
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    title: string
    phone: string
    email: string
    description: string
    employmentType: any
    addressLine1: string
    addressLine2: string
    zipCode: string
    suburb: string
    state: string
    contactPerson: string
    website: string
    vacancies: any
    salaryFrom: string
    salaryTo: string
    expiry: string
    status: string
    savedJobs: any
    avatar: any
    industry: {
        id: any
        isActive: boolean
        createdAt: Date
        updatedAt: Date
        businessName: string
        abn: string
        phoneNumber: string
        contactPerson: string
        contactPersonNumber: any
        studentCapacity: any
        addressLine1: string
        addressLine2: string
        zipCode: string
        suburb: string
        state: string
        location: string
        user: {
            id: any
            isActive: boolean
            createdAt: Date
            updatedAt: Date
            name: string
            email: string
            role: string
            status: string
            socketId: any
            password: any
            avatar: any
        }
    }
}

export interface StudentJobsType {
    data: StudentJobType[]
}
