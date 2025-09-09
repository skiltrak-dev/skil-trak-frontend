import { Phone } from 'lucide-react'
import moment from 'moment'
import React, { useState } from 'react'
import { CallLog } from '../IndustryCommunications'
import { ContactStatusBadge } from '../ContactStatusBadge'

export const CallItemCard: React.FC<{ call: CallLog }> = ({ call }) => {
    const [expanded, setExpanded] = useState(false)

    const getDuration = (startDate: string, endDate?: string) => {
        if (!endDate) return null
        const start = new Date(startDate)
        const end = new Date(endDate)
        const diffMs = end.getTime() - start.getTime()
        const diffMins = Math.round(diffMs / 60000)
        return diffMins > 0 ? `${diffMins} min` : null
    }

    const getCompanyName = () => {
        return (
            call.industry?.businessName ||
            call.industry?.user?.name ||
            call.branch?.contactPerson ||
            call.futureindustry?.businessName ||
            'Unknown Company'
        )
    }

    const getDescription = () => {
        if (call.isAnswered === true) {
            return call.note || 'Call completed successfully.'
        } else if (call.isAnswered === false) {
            return call.note || 'No answer. Left voicemail.'
        } else {
            return call.note || 'Call attempted.'
        }
    }

    const getStatus = () => {
        if (call.isAnswered === true) return 'answered'
        if (call.isAnswered === false) return 'no_answer'
        if (call.note?.toLowerCase().includes('voicemail')) return 'voicemail'
        return 'pending'
    }

    const getIconColor = () => {
        const status = getStatus()
        switch (status) {
            case 'answered':
                return 'bg-green-100 text-green-600'
            case 'no_answer':
                return 'bg-red-100 text-red-600'
            case 'voicemail':
                return 'bg-yellow-100 text-yellow-600'
            default:
                return 'bg-blue-100 text-blue-600'
        }
    }

    const description = getDescription()
    const duration = getDuration(call.createdAt, call.updatedAt)

    return (
        <div className="flex items-start space-x-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
            <div
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${getIconColor()}`}
            >
                <Phone className="w-4 h-4" />
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                        {getCompanyName()}
                    </h3>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>
                            {moment(call?.createdAt)?.format(
                                'ddd, DD.MMM.YYYY [at] hh:mm a'
                            )}
                        </span>
                        {duration && (
                            <>
                                <span>•</span>
                                <span>{duration}</span>
                            </>
                        )}
                    </div>
                </div>

                <div className="text-sm text-gray-600 mb-2">
                    <p className={!expanded ? 'line-clamp-1' : 'break-all'}>
                        {description}
                    </p>
                    {description.length > 60 && (
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="text-blue-600 text-xs font-medium hover:underline mt-1"
                        >
                            {expanded ? 'View less' : 'View more'}
                        </button>
                    )}
                </div>
            </div>

            <div className="flex-shrink-0">
                <ContactStatusBadge status={getStatus()} type="call" />
            </div>
        </div>
    )
}
