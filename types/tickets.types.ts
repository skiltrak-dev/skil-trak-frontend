import { Course } from './sector.type'
import { Student, User } from './user.type'

export interface TicketTypes {
    id: number
    createdAt: Date
    updatedAt: Date
    subject: string
    status: string
    priority: string
    createdBy: User
    assignedTo: User
    closedBy: null
    student: Student
    course: Course
    replies: number
    closedAt: Date
}
