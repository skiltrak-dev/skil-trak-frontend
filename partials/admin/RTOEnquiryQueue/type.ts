export type UserRole = 'industry' | 'rto' | 'admin'

export type FeatureStatus = 'active' | 'inactive' | 'pending'

export interface PremiumFeature {
    id: string
    name: string
    description: string
    icon: string
    status: FeatureStatus
    cost?: string
    details?: string
    badge?: string
    isPremiumDefault?: boolean // Always active as premium feature
}

export interface Service {
    id: string
    name: string
    description: string
    icon: string
    cost: string
    minDuration?: string
}

export interface Enquiry {
    id: string
    serviceType: string
    rtoName: string
    rtoEmail?: string
    rtoContact?: string
    dateSubmitted: string
    status: 'pending' | 'matched' | 'closed' | 'in-progress'
    requirements?: string
    timeline?: string
    attachedIndustry?: {
        id: string
        name: string
        email: string
    }
    closedDate?: string
    closedBy?: string
    notes?: string
}

export interface ActivationRequest {
    id: string
    accountName: string
    accountType: UserRole
    feature: string
    dateRequested: string
    status: 'pending' | 'approved' | 'rejected'
    reason?: string
}

export interface PremiumAccount {
    id: string
    name: string
    type: UserRole
    email: string
    premiumSince: string
    activeFeatures: number
    totalFeatures: number
    status: 'active' | 'inactive'
    features: Record<string, boolean>
}

export interface Subadmin {
    id: string
    name: string
    email: string
    permissionLevel: 1 | 2 | 3 | 4
    status: 'active' | 'inactive'
}

export interface User {
    id: string
    name: string
    email: string
    role: UserRole
    avatar?: string
}
