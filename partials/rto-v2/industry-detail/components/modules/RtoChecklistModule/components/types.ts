export interface ChecklistItem {
    id: string
    title: string
    category: string
    status: 'completed' | 'pending' | 'required'
    dueDate?: string
    description: string
}

export interface ChecklistStatsType {
    total: number
    completed: number
    pending: number
    required: number
}
