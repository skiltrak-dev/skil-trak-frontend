export enum ProfileIds {
    Workplace = 'workplace',
    Notes = 'notes',
    'Assessment Evidence' = 'assessments',
    'All Communications' = 'allCommunication',
    Appointments = 'appointments',
    Tickets = 'tickets',
    Schedule = 'schedule',
}

export interface StudentProfileData {
    id: number
    user: {
        id: number
        status: string
    }
    studentStatus: string
    isSnoozed: boolean
    snoozedDate: string
}

export interface ProfileSectionProps {
    student: StudentProfileData
    userId?: number
    studentId: number
}

export interface NavigationProps {
    role: string
    subadmin?: any
    router: any
}
