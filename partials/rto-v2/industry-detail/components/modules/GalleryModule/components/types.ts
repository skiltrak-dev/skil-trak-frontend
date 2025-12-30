export interface MediaItem {
    id: string
    type: 'photo' | 'pdf'
    name: string
    url: string
    uploadDate: string
    size: string
    thumbnail?: string
}

export type MediaType = 'all' | 'photo' | 'pdf'
export type ViewMode = 'grid' | 'list'

export interface GalleryStatsType {
    total: number
    photos: number
    pdfs: number
}
