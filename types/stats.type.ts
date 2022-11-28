interface UserStats {
    subadmin: number
    student: number
    industry: number
    rto: number
}

export interface AdminStats {
    jobs: number
    users: UserStats
    workplaceRequests: number
}
