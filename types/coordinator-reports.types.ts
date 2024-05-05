import { Course } from './sector.type'
import { Student, User } from './user.type'

interface UserWithProfiles extends User {
    student: Student
}

export interface CoordinatorAppointmentReport {
    createdAt: Date
    date: Date
    startTime: string
    endTime: string
    appointmentBy: UserWithProfiles
    appointmentFor: UserWithProfiles
    course: Course
}

export interface CoordinatorAssignedReport {
    id: number
    studentId: string
    phone: string
    user: User
    courses: Course[]
}

export interface CoordinatorStudentHaveWorkplaceReport {
    id: number
    studentId: string
    phone: string
    user: User
    courses: Course[]
}

export interface CoordinatorActiveStudentReport {
    id: number
    studentId: string
    phone: string
    user: User
    courses: Course[]
}

export interface CoordinatorStudentCallsReport {
    id: number
    studentId: string
    phone: string
    user: User
    courses: Course[]
}
