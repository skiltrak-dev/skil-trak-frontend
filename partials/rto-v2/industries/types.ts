export interface SectorCapacity {
    sector: string
    capacity: number
    currentPlacements: number
}

export interface Industry {
    id: string
    name: string
    abn: string
    sector: string
    location: string
    status: 'verified' | 'pending' | 'inactive'
    emailVerified: boolean
    sectorCapacities: SectorCapacity[]
    workplaceType: string
    dateSignedUp: string
    contactPerson: string
    contactEmail: string
    contactPhone: string
    complianceScore: number
    rating: number
    lastActivity: string
    facilities: string[]
    isGlobal?: boolean
}

export interface PendingReview {
    id: string
    industryName: string
    abn: string
    location: string
    pendingFrom: 'SkilTrak' | 'Industry Owner' | 'Other RTO'
    requestedBy: string
    requestDate: string
    evidence?: string[]
    notes?: string
    timeline: string
}

export interface BlacklistedIndustry {
    id: string
    industryName: string
    abn: string
    location: string
    reason: 'Rejected' | 'Blocked' | 'Non-compliant'
    blockedDate: string
    blockedBy: string
    details: string
}

export interface FutureIndustry {
    id: string
    name: string
    abn?: string
    location?: string
    sector: string
    contactPerson?: string
    contactEmail?: string
    contactPhone?: string
    addedBy: string
    addedDate: string
    lastContact?: string
    status: 'new' | 'contacted' | 'interested' | 'not-interested'
    notes: string[]
    activityLog: Array<{ date: string; user: string; action: string }>
    isFavourite: boolean
}

export interface PendingIndustryFull {
    id: string
    name: string
    abn: string
    location: string
    sector: string
    contactPerson: string
    contactEmail: string
    contactPhone: string
    addedBy: string
    addedDate: string
    profileCompletion: number
    isFavourite: boolean
    registrationComplete: boolean
    partnerFormComplete: boolean
    supervisorsAdded: number
    emailVerified: boolean
    tradingHoursAdded: boolean
    checklistsComplete: number
    totalChecklists: number
    requiredChecksMarked: boolean
    insuranceDocsAdded: boolean
    branchesAdded: number
    capacityConfirmed: boolean
    courses: Array<{
        name: string
        sector: string
        approved: boolean
        approvalNote?: string
        referenceLink?: string
    }>
    activityLog: Array<{ date: string; user: string; action: string }>
    notes: string[]
}

