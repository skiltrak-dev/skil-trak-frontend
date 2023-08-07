export interface LoginCredentials {
    email: string
    password: string
    remember?: boolean
}

export type StatusType =
    | 'pending'
    | 'approved'
    | 'rejected'
    | 'archived'
    | 'blocked'
