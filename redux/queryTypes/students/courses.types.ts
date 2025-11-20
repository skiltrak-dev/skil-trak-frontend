export interface ICourseType {
    code: string
    createdAt: string
    description: string
    hours: number
    id: number
    isActive: boolean
    requirements: string
    title: string
    upadatedAt: string

    subadmin: {
        appointmentEligibility: boolean
        createdAt: string
        id: number
        isActive: boolean
        updatedAt: string
        user: {
            avatar: string
            createdAt: string
            email: string
            id: number
            isActive: boolean
            name: string
            password: string
            role: string
            socketId: string
            status: string
            updatedAt: string
        }
    }[]
}

// TypeScript types for the given response
export interface AddedBy {
    id: number
    name: string
    email: string
}

export interface Course {
    id: number
    code: string
    title: string
    description?: string | null
    sector: Sector
}

export interface Sector {
    id: number
    code: string
    name: string
}

export interface User {
    name: string
    email: string
}

export interface Industry {
    id: number
    user: User
}

export interface DataResponse {
    addedBy: AddedBy
    email: string
    id: number
    name: string
    course: Course
    sector: Sector
    createdAt: string
    description?: any
    industry: Industry
    reference?: string | null
    status: string
    file: string
}

