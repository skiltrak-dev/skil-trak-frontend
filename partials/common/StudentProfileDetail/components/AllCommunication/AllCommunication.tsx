// TODO: save all the workplace status in all communication, including rejection and cancellation. With date stamp and the person who did it?,
// TODO: modal view snoozed history

import { EmptyData, LoadingAnimation, TechnicalError } from '@components'
import { useContextBar } from '@hooks'
import { CommonApi } from '@queries'
import { User } from '@types'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
    getCommunicationSender,
    getCommunicationTitle,
    getCommunicationType,
} from './communicationUtils'
import {
    CommunicationFilters,
    CommunicationHeader,
    CommunicationStats,
    VirtualizedCommunicationList,
} from './components'
import { CommunicationItem } from './types'
export const AllCommunication = ({
    student,
    isEntered = true,
}: {
    student: any
    isEntered?: boolean
}) => {
    const { isVisible: isContextBarVisible } = useContextBar()
    const [isExpanded, setIsExpanded] = useState(false)
    const [expandedCardId, setExpandedCardId] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [typeFilter, setTypeFilter] = useState('All')
    const [fromFilter, setFromFilter] = useState('All')
    const [expandedCardIds, setExpandedCardIds] = useState<string[]>([])

    // Virtualization states
    const [visibleItems, setVisibleItems] = useState<number>(20)
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const ITEMS_PER_LOAD = 20



    const { data, isLoading, isError, isSuccess } =
        CommonApi.AllCommunication.useCommunications(student?.user?.id, {
            skip: !student?.user || !isEntered,
            refetchOnMountOrArgChange: 20,
        })

    // const handleCardClick = (cardId: string) => {
    //     setExpandedCardId(expandedCardId === cardId ? null : cardId)
    // }
    const handleCardClick = (cardId: string) => {
        setExpandedCardIds((prev) =>
            prev.includes(cardId)
                ? prev.filter((id) => id !== cardId)
                : [...prev, cardId]
        )
    }

    useEffect(() => {
        if (data && data.length > 0) {
            const defaultExpanded = data
                .filter((item: any) => !!item.title)
                .map((item: any) => item.id)

            setExpandedCardIds(defaultExpanded)
        }
    }, [data])

    const loadMoreItems = useCallback(() => {
        if (isLoadingMore) return

        setIsLoadingMore(true)
        setTimeout(() => {
            setVisibleItems((prev) => prev + ITEMS_PER_LOAD)
            setIsLoadingMore(false)
        }, 300)
    }, [isLoadingMore])

    const onWaypointEnter = () => {
        const currentVisible = filteredData?.slice(0, visibleItems).length || 0
        const totalItems = filteredData?.length || 0

        if (currentVisible < totalItems) {
            loadMoreItems()
        }
    }

    const handleExpandToggle = () => {
        setIsExpanded(!isExpanded)
        setExpandedCardId(null)
    }
    // Reset visible items when filters change
    useEffect(() => {
        setVisibleItems(ITEMS_PER_LOAD)
        setExpandedCardId(null)
    }, [searchTerm, typeFilter, fromFilter])

    const filteredData = data?.filter((item: CommunicationItem) => {
        const matchesSearch =
            getCommunicationTitle(item)
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            getCommunicationSender(item)
                .toLowerCase()
                .includes(searchTerm.toLowerCase())

        const matchesType =
            typeFilter === 'All' || getCommunicationType(item) === typeFilter
        // console.log('matchesType', matchesType)
        const matchesFrom =
            fromFilter === 'All' || getCommunicationSender(item) === fromFilter

        return matchesSearch && matchesType && matchesFrom
    })

    const visibleData = filteredData?.slice(0, visibleItems) || []
    const hasMoreItems = (filteredData?.length || 0) > visibleItems

    return (
        <div className="h-[40rem] overflow-auto flex flex-col">
            <CommunicationHeader student={student} />
            {isError && <TechnicalError />}
            {isLoading && <LoadingAnimation />}
            {isSuccess && (!data || data.length === 0) && (
                <EmptyData
                    imageUrl="/images/icons/common/notes.png"
                    title="No All Communication Attached"
                    description="Attach a note or message to view All Communication here"
                    height="40vh"
                />
            )}
            <CommunicationFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
                fromFilter={fromFilter}
                setFromFilter={setFromFilter}
                isExpanded={isExpanded}
                onExpandToggle={handleExpandToggle}
            />

            <CommunicationStats
                visibleCount={visibleData.length}
                totalCount={filteredData?.length || 0}
                hasMoreItems={hasMoreItems}
            />

            <div ref={containerRef} className="flex-1 overflow-auto px-4 pb-4">
                <VirtualizedCommunicationList
                    items={visibleData}
                    isExpanded={isExpanded}
                    expandedCardIds={expandedCardIds}
                    expandedCardId={expandedCardId}
                    onCardClick={handleCardClick}
                    onLoadMore={onWaypointEnter}
                    isLoadingMore={isLoadingMore}
                    hasMoreItems={hasMoreItems}
                />
            </div>
        </div>
    )
}
