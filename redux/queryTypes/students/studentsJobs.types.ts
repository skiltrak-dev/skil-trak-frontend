export interface StudentJobType {
    id: any
    isActive: any
    createdAt: any
    updatedAt: any
    title: any
    phone: any
    email: any
    description: any
    employmentType: any
    addressLine1: any
    addressLine2: any
    zipCode: any
    suburb: any
    state: any
    contactPerson: any
    website: any
    vacancies: any
    salaryFrom: any
    salaryTo: any
    expiry: any
    status: any
    savedJobs: any
    avatar: any
    industry: {
        id: any
        isActive: any
        createdAt: any
        updatedAt: any
        businessName: any
        abn: any
        phoneNumber: any
        contactPerson: any
        contactPersonNumber: any
        studentCapacity: any
        addressLine1: any
        addressLine2: any
        zipCode: any
        suburb: any
        state: any
        location: any
        user: {
            id: any
            isActive: any
            createdAt: any
            updatedAt: any
            name: any
            email: any
            role: any
            status: any
            socketId: any
            password: any
            avatar: any
        }
    }
}

export interface StudentJobsType {
    data: StudentJobType[]
}
