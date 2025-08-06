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
    isExpanded: boolean
    onCardClick: (id: string) => void
}

export interface CommunicationDetailsProps {
    item: CommunicationItem
}

export interface VirtualizedListProps {
    items: CommunicationItem[]
    isExpanded: boolean
    expandedCardId?: string | null
    onCardClick: (id: string) => void
    onLoadMore: () => void
    isLoadingMore: boolean
    hasMoreItems: boolean
    expandedCardIds: string[]
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
    fromFilter: string
    setFromFilter: (from: string) => void
    isExpanded: boolean
    onExpandToggle: () => void
}
