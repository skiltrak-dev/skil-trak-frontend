// TODO: save all the workplace status in all communication, including rejection and cancellation. With date stamp and the person who did it?,
// TODO: modal view snoozed history
// TODO: student cancellation note in all communication

import { Button, EmptyData, LoadingAnimation, TechnicalError } from '@components'
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
    user,
    isEntered = true,
}: {
    user: any
    isEntered?: boolean
}) => {
    const ITEMS_PER_LOAD = 6
    const [itemPerPage, setItemPerPage] = useState(6)
    const [page, setPage] = useState(1)


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



    const { data, isLoading, isError, isSuccess, isFetching } =
        CommonApi.AllCommunication.useCommunications(
            {
                id: user?.user?.id,
                params: {
                    skip: itemPerPage * page - itemPerPage, // ✅ new formula
                    limit: itemPerPage,
                }
            },
            {

                skip: !user?.user || !isEntered,
            })


    const hasMoreItems = data?.data?.length === ITEMS_PER_LOAD;
    const handleCardClick = (cardId: string) => {
        setExpandedCardIds((prev) =>
            prev.includes(cardId)
                ? prev.filter((id) => id !== cardId)
                : [...prev, cardId]
        )
    }

    useEffect(() => {
        if (data?.data && data?.data?.length > 0) {
            const defaultExpanded = data?.data
                .filter((item: any) => !!item.title)
                .map((item: any) => item.id)

            setExpandedCardIds(defaultExpanded)
        }
    }, [data?.data])

    const loadMoreItems = useCallback(() => {
        if (isLoadingMore || !hasMoreItems) return;

        setIsLoadingMore(true);
        setTimeout(() => {
            setPage(prev => prev + 1); // ✅ trigger API for next page
            setIsLoadingMore(false);
        }, 300);
    }, [isLoadingMore, hasMoreItems]);


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

    const filteredData = data?.data?.filter((item: CommunicationItem) => {
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


    return (
        <div className="h-[40rem] overflow-auto flex flex-col">
            <CommunicationHeader user={user} />
            {isError && <TechnicalError />}
            {isLoading ? <LoadingAnimation /> : data?.data && data?.data?.length > 0 ?
                (
                    <>
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
                            itemPerPage={data?.pagination?.itemPerPage || 6}
                            totalCount={data?.pagination?.totalResult || 0}
                            currentPage={data?.pagination?.currentPage || 1}
                            hasNext={data?.pagination?.hasNext || false}
                        />
                        <div ref={containerRef} className="flex-1 overflow-auto px-4 pb-4">
                            <VirtualizedCommunicationList
                                items={data?.data}
                                isExpanded={isExpanded}
                                expandedCardIds={expandedCardIds}
                                expandedCardId={expandedCardId}
                                onCardClick={handleCardClick}
                                onLoadMore={onWaypointEnter}
                                isLoadingMore={isLoadingMore}
                                hasMoreItems={hasMoreItems}
                            />
                        </div>
                        <div className="flex items-center gap-x-2 justify-center">
                            {data?.pagination?.hasPrevious && (
                                <div className="flex justify-center py-4">
                                    <Button
                                        text="Load previous"
                                        variant="info"
                                        outline
                                        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                                        loading={isFetching || isLoading}
                                        disabled={!data?.pagination?.hasPrevious || isLoading || isFetching}
                                    />
                                </div>
                            )}
                            {data?.pagination?.hasNext && (
                                <div className="flex justify-center py-4">
                                    <Button
                                        text="Load more"
                                        variant={"secondary"}
                                        outline
                                        onClick={() => setPage(prev => prev + 1)}
                                        loading={isFetching || isLoading}
                                        disabled={!data?.pagination?.hasNext || isLoading || isFetching}

                                    />
                                </div>
                            )}
                        </div>
                    </>
                ) : !isError && <EmptyData
                    imageUrl="/images/icons/common/notes.png"
                    title="No All Communication Attached"
                    description="Attach a note or message to view All Communication here"
                    height="40vh"
                />}

        </div>
    )
}
