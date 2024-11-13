// types.ts
export interface Employee {
    id: string
    name: string
    username: string
    avatar?: string
}

export interface ScheduleEntry {
    employeeId: any
    date: string
    status: string
    time?: string
}
