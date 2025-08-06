import moment from 'moment'
import { CommunicationItem } from './types'

export const isWorkplaceStatusUpdate = (item: CommunicationItem): boolean => {
    return (
        item.action === 'custom' &&
        item.actionName === 'workplaceRequestStatusUpdated'
    )
}

export const getCommunicationType = (item: CommunicationItem) => {
    if (isWorkplaceStatusUpdate(item)) return 'WpStatuses'
    if (item.type === 'twilio') return 'Message'
    if (item.calledBy) return 'Call'
    if (item.assignedTo) return 'Ticket'
    if (item.title) return 'Note'
    return 'Email'
}

export const getCommunicationIcon = (item: CommunicationItem) => {
    const type = getCommunicationType(item)

    const iconMap: any = {
        Call: {
            icon: '📞',
            bg: 'bg-green-100 rounded-md p-1',
            text: 'text-green-700',
        },
        Message: {
            icon: '💬',
            bg: 'bg-purple-100 rounded-md p-1',
            text: 'text-purple-700',
        },
        Ticket: {
            icon: '🎫',
            bg: 'bg-blue-100 rounded-md p-1',
            text: 'text-blue-700',
        },
        Note: {
            icon: '📝',
            bg: 'bg-yellow-100 rounded-md p-1',
            text: 'text-yellow-700',
        },
        Email: {
            icon: '📧',
            bg: 'bg-blue-100 rounded-md p-1',
            text: 'text-blue-700',
        },
    }

    return iconMap[type] || iconMap['Email']
}

export const getCommunicationTitle = (item: CommunicationItem) => {
    if (isWorkplaceStatusUpdate(item)) return item?.title
    if (item.type === 'twilio') return 'Student Message'
    if (item.calledBy) return 'Call'
    if (item.assignedTo) return item.title || 'Support Ticket'
    if (item.title) return item.title
    return item?.subject ?? 'Email Subject'
}

export const getCommunicationSender = (item: CommunicationItem) => {
    if (item.isInternal) return 'internalNotes'
    if (item.isPinned) return 'PinnedNotes'
    return 'System'
}
export const getCommunicationSenderName = (item: CommunicationItem): string => {
    return (
        item?.author?.name ||
        item?.addedBy?.name ||
        item?.calledBy?.name ||
        item?.createdBy?.name ||
        item?.sender?.name ||
        item?.actionName ||
        ''
    )
}

export const getCommunicationDate = (item: CommunicationItem) => {
    const date = item.updatedAt || item.createdAt
    return moment(date).format('MMM DD, YYYY [at] hh:mm A')
}

// export const getCommunicationPreview = (item: CommunicationItem) => {
//     if (item.type === 'twilio') return 'Student sent a message via SMS'
//     if (item.calledBy) return `Phone call from ${item.calledBy.name}`
//     if (item.assignedTo)
//         return `Support ticket: ${item.title || 'New ticket created'}`
//     if (item.title) return `Note: ${item.title}`
//     return 'Email communication received'
// }
