import { Typography } from '@components'
import {
    getCommunicationDate,
    getCommunicationIcon,
    getCommunicationSender,
    getCommunicationSenderName,
    getCommunicationTitle,
    getCommunicationType,
} from '../communicationUtils'
import { CommunicationCardProps } from '../types'
import { CommunicationDetails } from './CommunicationDetails'
import { IoIosArrowDown } from 'react-icons/io'

export const CollapsedCommunicationCard: React.FC<CommunicationCardProps> = ({
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
                    <div className={`text-2xl ${getCommunicationIcon(item)?.bg}`}>{getCommunicationIcon(item)?.icon}</div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                            <Typography
                                variant="small"
                                semibold
                                color="text-gray-900 truncate"
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
                                <div
                                    className={`transform transition-transform text-gray-400 ${isExpanded ? 'rotate-180' : ''
                                        }`}
                                >
                                    <IoIosArrowDown />

                                </div>
                            </div>
                        </div>
                        <Typography variant="small" color="text-gray-600 mt-1">
                            From: {getCommunicationSenderName(item)
                                // getCommunicationSender(item)
                            }
                        </Typography>
                        {/* {isExpanded && (
                            <Typography
                                variant="small"
                                color="text-gray-500 mt-2 italic"
                            >
                                {getCommunicationPreview(item)}
                            </Typography>
                        )} */}
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
