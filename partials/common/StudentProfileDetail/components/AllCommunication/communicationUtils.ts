import moment from 'moment'
import { CommunicationItem } from './types'

export const getCommunicationType = (item: CommunicationItem) => {
    console.log('isPinned', item?.isPinned)
    if (item.type === 'twilio') return 'Message'
    if (item.calledBy) return 'Call'
    if (item.assignedTo) return 'Ticket'
    if (item.isInternal) return 'internalNotes'
    if (item.isPinned) return 'PinnedNotes'
    if (item.title) return 'Note'
    return 'Email'
}

export const getCommunicationIcon = (item: CommunicationItem) => {
    const type = getCommunicationType(item)
    switch (type) {
        case 'Call':
            return '📞'
        case 'Message':
            return '💬'
        case 'Ticket':
            return '🎫'
        case 'Note':
            return '📝'
        default:
            return '✉️'
    }
}

export const getCommunicationTitle = (item: CommunicationItem) => {
    if (item.type === 'twilio') return 'Student Message'
    if (item.calledBy) return 'Call'
    if (item.assignedTo) return item.title || 'Support Ticket'
    if (item.title) return item.title
    return 'Email Communication'
}

export const getCommunicationSender = (item: CommunicationItem) => {
    if (item.calledBy) return item.calledBy.name
    if (item.assignedTo) return 'Support Team'
    if (item.sender) return item.sender.role
    return 'System'
}

export const getCommunicationDate = (item: CommunicationItem) => {
    const date = item.updatedAt || item.createdAt
    return moment(date).format('MMM DD, YYYY')
}

export const getCommunicationPreview = (item: CommunicationItem) => {
    if (item.type === 'twilio') return 'Student sent a message via SMS'
    if (item.calledBy) return `Phone call from ${item.calledBy.name}`
    if (item.assignedTo)
        return `Support ticket: ${item.title || 'New ticket created'}`
    if (item.title) return `Note: ${item.title}`
    return 'Email communication received'
}
