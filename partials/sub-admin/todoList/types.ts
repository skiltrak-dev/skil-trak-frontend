export type TaskFrequency =
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'bimonthly'
    | 'quarterly'

export type TaskCategory =
    | 'highPriority'
    | 'appointments'
    | 'openTickets'
    | 'workplaceRequests'
    | 'studentFollowUp'
    | 'industryFollowUp'
    | 'nonPartnerIndustries'
    | 'listedIndustries'

export interface Task {
    id: string
    title: string
    description?: string
    frequency: TaskFrequency
    category: TaskCategory
    dueDate: Date
    completed: boolean
    clientId?: string
    clientName?: string
    assignedTo?: string
    createdAt: Date
    status?: string
}

export interface TaskSubcategory {
    id: string
    label: string
    category: TaskCategory
    description: string
    tasks: Task[]
    isExpanded: boolean
}

export interface TaskGroup {
    frequency: TaskFrequency
    label: string
    description: string
    tasks: Task[]
    isExpanded: boolean
    icon: string
    subcategories?: TaskSubcategory[]
}
