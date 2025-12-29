export type CallStatus = 'open' | 'completed'

export interface Call {
    id: string
    studentName: string
    agentName: string
    status: CallStatus
    date: string
    duration: string
    phoneNumber: string
    industry?: string
    placementCompany?: string
    notes: string
    tags: string[]
    priority: 'low' | 'medium' | 'high'
    recordingUrl?: string
    isCompleted?: boolean
    hasTicket?: boolean
}

export interface StatusConfig {
    label: string
    color: string
    bgColor: string
    borderColor: string
    description: string
}

export const statusConfigs: Record<CallStatus, StatusConfig> = {
    open: {
        label: 'Open States',
        color: '#044866',
        bgColor: '#E6F2F7',
        borderColor: '#B3D9E8',
        description: 'Call in open state',
    },
    completed: {
        label: 'Completed Placements',
        color: '#0D5468',
        bgColor: '#E8F4F6',
        borderColor: '#B8DDE4',
        description: 'Placement completed',
    },
}
