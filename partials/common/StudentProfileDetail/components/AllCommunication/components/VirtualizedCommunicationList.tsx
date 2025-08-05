import { Waypoint } from 'react-waypoint'
import { CollapsedCommunicationCard } from './CollapsedCommunicationCard'
import { ExpandedCommunicationCard } from './ExpandedCommunicationCard'
import { LoadingAnimation, Typography } from '@components'
import { CommunicationItem, VirtualizedListProps } from '../types'

export const VirtualizedCommunicationList: React.FC<VirtualizedListProps> = ({
    items,
    isExpanded,
    onCardClick,
    onLoadMore,
    isLoadingMore,
    hasMoreItems,
    expandedCardIds,
}) => {
    const renderVirtualizedItem = (item: CommunicationItem, index: number) => {
        const isCardExpanded = expandedCardIds?.includes(item?.id)
        const shouldAddWaypoint =
            index >= items.length - 5 && index === items.length - 1

        const CardComponent = isExpanded
            ? ExpandedCommunicationCard
            : CollapsedCommunicationCard
        const content = (
            <CardComponent
                key={item.id}
                item={item}
                isExpanded={isCardExpanded}
                onCardClick={onCardClick}
            />
        )

        if (shouldAddWaypoint) {
            return (
                <Waypoint
                    key={`waypoint-${item.id}`}
                    onEnter={onLoadMore}
                    bottomOffset="-100px"
                >
                    <div>{content}</div>
                </Waypoint>
            )
        }

        return content
    }

    return (
        <>
            {items.map((item, index) => renderVirtualizedItem(item, index))}

            {isLoadingMore && (
                <div className="flex justify-center items-center py-4">
                    <LoadingAnimation />
                    <Typography variant="small" color="text-gray-600">
                        Loading more communications...
                    </Typography>
                </div>
            )}

            {!hasMoreItems && items.length > 0 && (
                <div className="flex justify-center items-center py-8">
                    <Typography variant="small" color="text-gray-500">
                        You've reached the end of all communications
                    </Typography>
                </div>
            )}
        </>
    )
}
