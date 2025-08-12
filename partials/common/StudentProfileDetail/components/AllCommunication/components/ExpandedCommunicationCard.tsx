import { Typography } from '@components'
import {
    getCommunicationDate,
    getCommunicationIcon,
    getCommunicationSenderName,
    getCommunicationTitle,
    getCommunicationType,
} from '../communicationUtils'
import { CommunicationCardProps } from '../types'
import { CommunicationDetails } from './CommunicationDetails'

export const ExpandedCommunicationCard: React.FC<CommunicationCardProps> = ({
    item,
    isExpanded,
    onCardClick,
}) => {
    console.log({ item })
    return (
        <div className="bg-white rounded-lg border border-gray-200 mb-2 overflow-hidden">
            {item?.type !== 'logger' && (
                <div
                    className="px-4 py-2.5 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => onCardClick(item.id)}
                >
                    <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                            <div className="text-2xl">
                                {getCommunicationIcon(item)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <Typography
                                        variant="small"
                                        medium
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
                                <Typography
                                    variant="small"
                                    color="text-gray-600 mt-1"
                                >
                                    From: {getCommunicationSenderName(item)} (
                                    {getCommunicationType(item)})
                                </Typography>
                                {/* <Typography
                                variant="small"
                                color="text-gray-500 mt-2 italic"
                            >
                                {getCommunicationPreview(item)}
                            </Typography> */}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isExpanded && (
                <div className="border-t border-gray-100 p-4 bg-gray-50">
                    <CommunicationDetails item={item} />
                </div>
            )}
        </div>
    )
}
