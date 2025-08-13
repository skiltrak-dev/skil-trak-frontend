export interface CommunicationItem {
    id: string
    type?: string
    isEnabled?: string
    createdAt?: string
    updatedAt?: any
    calledBy?: { name: string }
    assignedTo?: any
    student?: any
    priority?: string
    replies?: number
    title?: string
    sender?: any
    [key: string]: any
}

export interface CommunicationCardProps {
    item: CommunicationItem
}

export interface CommunicationDetailsProps {
    item: CommunicationItem
}

export interface VirtualizedListProps {
    items: CommunicationItem[]
}

export interface CommunicationStatsProps {
    visibleCount: number
    totalCount: number
    hasMoreItems: boolean
}

export interface CommunicationFiltersProps {
    searchTerm: string
    setSearchTerm: (term: string) => void
    typeFilter: string
    setTypeFilter: (type: string) => void
}
