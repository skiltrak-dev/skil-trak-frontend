import { Typography } from '@components'
import { CommunicationCardProps } from '../types'
import { getCommunicationDate, getCommunicationIcon, getCommunicationPreview, getCommunicationSender, getCommunicationTitle, getCommunicationType } from '../communicationUtils'
import { CommunicationDetails } from './CommunicationDetails'

export const ExpandedCommunicationCard: React.FC<CommunicationCardProps> = ({
    item,
    isExpanded,
    onCardClick,
}) => (
    <div className="bg-white rounded-lg border border-gray-200 mb-3 overflow-hidden">
        <div
            className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => onCardClick(item.id)}
        >
            <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                    <div className="text-2xl">{getCommunicationIcon(item)}</div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                            <Typography
                                variant="body"
                                bold
                                color="text-gray-900"
                            >
                                {getCommunicationTitle(item)}
                            </Typography>
                            <div className="flex items-center space-x-2">
                                <Typography
                                    variant="small"
                                    color="text-gray-500 whitespace-nowrap"
                                >
                                    {getCommunicationDate(item)}
                                </Typography>
                                <span
                                    className={`transform transition-transform ${
                                        isExpanded ? 'rotate-180' : ''
                                    }`}
                                >
                                    ▼
                                </span>
                            </div>
                        </div>
                        <Typography variant="small" color="text-gray-600 mt-1">
                            From: {getCommunicationSender(item)} (
                            {getCommunicationType(item)})
                        </Typography>
                        <Typography
                            variant="small"
                            color="text-gray-500 mt-2 italic"
                        >
                            {getCommunicationPreview(item)}
                        </Typography>
                    </div>
                </div>
            </div>
        </div>

        {isExpanded && (
            <div className="border-t border-gray-100 p-4 bg-gray-50">
                <CommunicationDetails item={item} />
            </div>
        )}
    </div>
)
