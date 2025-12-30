/**
 * Types for Appointments Module
 */

export interface Appointment {
    id: number
    title: string
    date: string
    time: string
    type: 'interview' | 'site-visit' | 'training' | 'meeting'
    status: 'upcoming' | 'completed'
    location: string
    attendees: string[]
    description: string
    color: string
    attachments: number
}

export interface GalleryFile {
    id: number
    name: string
    type: 'pdf' | 'image' | 'excel'
    size: string
    uploadedBy: string
    uploadedAt: string
    category: string
    thumbnail: string | null
    relatedAppointment: number
}

export type ViewType = 'list' | 'calendar'
export type GalleryViewType = 'grid' | 'list'
export type StatusFilter = 'all' | 'future' | 'upcoming' | 'completed'
