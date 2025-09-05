import { Mail } from 'lucide-react'
import moment from 'moment'
import { Email } from '../IndustryCommunications'
import { ContactStatusBadge } from '../ContactStatusBadge'

export const EmailItemCard: React.FC<{ email: Email }> = ({ email }) => {
    const getCompanyName = () => {
        return (
            email.listing?.businessName ||
            email.receiver?.name ||
            email.sender?.name ||
            'Unknown Company'
        )
    }

    const getDescription = () => {
        const content = email.message || email.body || ''
        const plainText = content.replace(/<[^>]*>/g, '')
        return plainText.length > 100
            ? `${plainText.substring(0, 100)}...`
            : plainText
    }

    const getStatus = () => {
        return email.isSeen ? 'seen' : 'pending'
    }

    return (
        <div className="flex items-start space-x-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
            <div
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    email.isSeen
                        ? 'bg-green-100 text-green-600'
                        : 'bg-blue-100 text-blue-600'
                }`}
            >
                <Mail className="w-4 h-4" />
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                        {getCompanyName()}
                    </h3>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>
                            {moment(email.createdAt)?.format(
                                'ddd, DD.MMM.YYYY [at] hh:mm a'
                            )}
                        </span>
                    </div>
                </div>

                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {email.subject || getDescription()}
                </p>
            </div>

            {/* <div className="flex-shrink-0">
                <StatusBadge status={getStatus()} type="email" />
            </div> */}
        </div>
    )
}
