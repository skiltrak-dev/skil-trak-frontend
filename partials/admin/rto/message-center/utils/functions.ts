import { Rto } from '@types'

export const getRecipientCount = (
    type: string,
    rtosListLength: number,
    rtoIdsLength: number
) => {
    if (type === 'all') return rtosListLength
    return rtoIdsLength
}

export const getRecipientNames = (
    type: string,
    rtoIds: number[],
    rtosList: Rto[] | undefined
) => {
    if (type === 'all') return 'All RTOs'
    if (rtoIds?.length === 0) return 'No RTOs selected'
    if (rtoIds?.length === 1) {
        const rto = rtosList?.find((r) => r.id === rtoIds?.[0])
        return rto?.user?.name || ''
    }
    return `${rtoIds?.length} RTOs`
}

export const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
        case 'URGENT':
            return 'bg-red-100 text-red-900 border-red-200'
        case 'HIGH':
            return 'bg-orange-100 text-orange-900 border-orange-200'
        case 'MEDIUM':
            return 'bg-yellow-100 text-yellow-900 border-yellow-200'
        case 'LOW':
            return 'bg-blue-100 text-blue-900 border-blue-200'
        default:
            return 'bg-gray-100 text-gray-900 border-gray-200'
    }
}
