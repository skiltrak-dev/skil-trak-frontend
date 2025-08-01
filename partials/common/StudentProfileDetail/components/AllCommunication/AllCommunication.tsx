import moment from 'moment'
import { useState, useEffect, useRef, useCallback } from 'react'
import {
    AuthorizedUserComponent,
    EmptyData,
    LoadingAnimation,
    Mail,
    TechnicalError,
    Timeline,
    Typography,
    Button,
} from '@components'
import { useContextBar } from '@hooks'
import { CommonApi } from '@queries'
import { UserRoles } from '@constants'
import { StudentCellInfo } from '@partials/admin/student/components'
import { StudentCellInfo as RtoStudentCellInfo } from '@partials/rto/student/components'
import { StudentCellInfo as SubadminStudentCellInfo } from '@partials/sub-admin/students'
import { getDate, getIsEnabledCommonDates } from '@utils'
import { User } from '@types'
import { HistoryCard } from '@partials/common/History'
import { StudentMessageCard } from '../StudentMessageCard'
import { TicketSubject, TicketUser } from '@partials/common/Tickets'
import { NoteCard } from '@partials/common/Notes'
import { Waypoint } from 'react-waypoint'

interface CommunicationItem {
    id: string
    type?: string
    isEnabled?: string
    createdAt?: string
    updatedAt?: any
    calledBy?: { name: string }
    assignedTo?: any
    student?: any
    priority?: string
    replies?: number
    title?: string
    sender?: { role: string }
    [key: string]: any
}

export const AllCommunication = ({
    user,
    isEntered = true,
}: {
    user: User
    isEntered?: boolean
}) => {
    const { isVisible: isContextBarVisible } = useContextBar()
    const [isExpanded, setIsExpanded] = useState(false)
    const [expandedCardId, setExpandedCardId] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [typeFilter, setTypeFilter] = useState('All')
    const [fromFilter, setFromFilter] = useState('All')

    // Virtualization states
    const [visibleItems, setVisibleItems] = useState<number>(20) // Start with 20 items
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const ITEMS_PER_LOAD = 10

    const { data, isLoading, isError, isSuccess } =
        CommonApi.AllCommunication.useCommunications(user?.id, {
            skip: !user || !isEntered,
            refetchOnMountOrArgChange: 20,
        })

    const getCommunicationType = (item: CommunicationItem) => {
        if (item.type === 'twilio') return 'Message'
        if (item.calledBy) return 'Call'
        if (item.assignedTo) return 'Ticket'
        if (item.title) return 'Note'
        return 'Email'
    }

    const getCommunicationIcon = (item: CommunicationItem) => {
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

    const getCommunicationTitle = (item: CommunicationItem) => {
        if (item?.type === 'twilio') return 'Student Message'
        if (item?.calledBy) return 'Call'
        if (item?.assignedTo) return item?.title || 'Support Ticket'
        if (item?.title) return item?.title
        return `${item?.subject}`
    }

    const getCommunicationSender = (item: CommunicationItem) => {
        if (item.calledBy) return item.calledBy.name
        if (item.assignedTo) return 'Support Team'
        if(item?.author) return `${item.author?.name}`
        if (item.sender) return item.sender.role
        return 'System'
    }

    const getCommunicationDate = (item: CommunicationItem) => {
        const date = item.updatedAt || item.createdAt
        return moment(date).format('MMM DD, YYYY')
    }

    const getCommunicationPreview = (item: CommunicationItem) => {
        if (item.type === 'twilio') return 'Student sent a message via SMS'
        if (item.calledBy) return `Phone call from ${item.calledBy.name}`
        if (item.assignedTo)
            return `Support ticket: ${item.title || 'New ticket created'}`
        if (item.title) return `Note: ${item.title}`
        return `Email communication received`
    }

    const handleCardClick = (cardId: string) => {
        setExpandedCardId(expandedCardId === cardId ? null : cardId)
    }

    const loadMoreItems = useCallback(() => {
        if (isLoadingMore) return

        setIsLoadingMore(true)
        // Simulate loading delay (remove this in production)
        setTimeout(() => {
            setVisibleItems((prev) => prev + ITEMS_PER_LOAD)
            setIsLoadingMore(false)
        }, 300)
    }, [isLoadingMore])

    const onWaypointEnter = () => {
        const currentVisible = filteredData?.slice(0, visibleItems).length || 0
        const totalItems = filteredData?.length || 0

        // Load more if we haven't reached the end
        if (currentVisible < totalItems) {
            loadMoreItems()
        }
    }

    // Reset visible items when filters change
    useEffect(() => {
        setVisibleItems(ITEMS_PER_LOAD)
        setExpandedCardId(null)
    }, [searchTerm, typeFilter, fromFilter])

    const renderVirtualizedItem = (item: CommunicationItem, index: number) => {
        const content = isExpanded
            ? renderExpandedPreviewItem(item)
            : renderCollapsedCommunicationItem(item)

        // Add waypoint to the last few items to trigger loading
        const shouldAddWaypoint =
            index >= visibleItems - 5 && index === visibleItems - 1

        if (shouldAddWaypoint) {
            return (
                <Waypoint
                    key={`waypoint-${item.id}`}
                    onEnter={onWaypointEnter}
                    bottomOffset="-100px"
                >
                    <div>{content}</div>
                </Waypoint>
            )
        }

        return content
    }

    const renderCollapsedCommunicationItem = (item: CommunicationItem) => {
        const isCardExpanded = expandedCardId === item.id

        return (
            <div
                key={item.id}
                className="bg-white rounded-lg border border-gray-200 mb-3 overflow-hidden"
            >
                {/* Main card content - clickable */}
                <div
                    className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => handleCardClick(item.id)}
                >
                    <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                            <div className="text-2xl">
                                {getCommunicationIcon(item)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <Typography
                                        variant="body"
                                        bold
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
                                        <span
                                            className={`transform transition-transform text-gray-400 ${
                                                isCardExpanded
                                                    ? 'rotate-180'
                                                    : ''
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
                                    From: {getCommunicationSender(item)} (
                                    {getCommunicationType(item)})
                                </Typography>
                                {/* Show preview when expanded */}
                                {isCardExpanded && (
                                    <Typography
                                        variant="small"
                                        color="text-gray-500 mt-2 italic"
                                    >
                                        {getCommunicationPreview(item)}
                                    </Typography>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Full details - only visible when this card is expanded */}
                {isCardExpanded && (
                    <div className="border-t border-gray-100 p-4 bg-gray-50">
                        {renderFullCommunicationDetails(item)}
                    </div>
                )}
            </div>
        )
    }

    const renderExpandedPreviewItem = (item: CommunicationItem) => {
        const isCardExpanded = expandedCardId === item.id

        return (
            <div
                key={item.id}
                className="bg-white rounded-lg border border-gray-200 mb-3 overflow-hidden"
            >
                {/* Preview Header - Always visible when in expanded mode */}
                <div
                    className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => handleCardClick(item.id)}
                >
                    <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                            <div className="text-2xl">
                                {getCommunicationIcon(item)}
                            </div>
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
                                                isCardExpanded
                                                    ? 'rotate-180'
                                                    : ''
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

                {/* Full Details - Only visible when this specific card is expanded */}
                {isCardExpanded && (
                    <div className="border-t border-gray-100 p-4 bg-gray-50">
                        {renderFullCommunicationDetails(item)}
                    </div>
                )}
            </div>
        )
    }

    const renderFullCommunicationDetails = (item: CommunicationItem) => {
        if (item.type === 'twilio') {
            return <StudentMessageCard studentMessage={item} />
        }

        if (item.calledBy) {
            return (
                <HistoryCard
                    call
                    history={{
                        ...item,
                        title: 'Call',
                        description: (
                            <>
                                call made by{' '}
                                <strong>{item?.calledBy?.name}</strong>
                            </>
                        ),
                    }}
                />
            )
        }

        if (item.assignedTo) {
            return (
                <table className="w-full table-auto">
                    <thead>
                        <tr className="text-left">
                            {[
                                'Subject',
                                'Student',
                                'Created By',
                                'Assigned To',
                                'Priority',
                                'Replies',
                                'Last Activity',
                            ].map((header) => (
                                <th key={header} className="pb-1.5">
                                    <Typography variant="small" bold>
                                        {header}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <TicketSubject ticket={item} />
                            </td>
                            <td>
                                {item.student ? (
                                    <>
                                        <AuthorizedUserComponent
                                            roles={[UserRoles.ADMIN]}
                                        >
                                            <StudentCellInfo
                                                student={item.student}
                                            />
                                        </AuthorizedUserComponent>
                                        <AuthorizedUserComponent
                                            roles={[UserRoles.SUBADMIN]}
                                        >
                                            <SubadminStudentCellInfo
                                                student={item.student}
                                            />
                                        </AuthorizedUserComponent>
                                        <AuthorizedUserComponent
                                            roles={[UserRoles.RTO]}
                                        >
                                            <RtoStudentCellInfo
                                                student={item.student}
                                            />
                                        </AuthorizedUserComponent>
                                    </>
                                ) : (
                                    'N/A'
                                )}
                            </td>
                            <td>
                                <TicketUser ticket={item} />
                            </td>
                            <td>
                                <TicketUser
                                    ticket={{
                                        ...item,
                                        createdBy: item.assignedTo,
                                    }}
                                />
                            </td>
                            <td>
                                <Typography variant="label" capitalize semibold>
                                    {item.priority}
                                </Typography>
                            </td>
                            <td>
                                <Typography variant="label" capitalize semibold>
                                    {item.replies}
                                </Typography>
                            </td>
                            <td>
                                <Typography variant="label" capitalize>
                                    <span className="whitespace-nowrap">
                                        {moment(item.updatedAt).fromNow()}
                                    </span>
                                </Typography>
                            </td>
                        </tr>
                    </tbody>
                </table>
            )
        }

        if (item.title) {
            return (
                <Timeline updatedAt={item.updatedAt}>
                    <NoteCard note={item} />
                </Timeline>
            )
        }

        return (
            <Mail
                sender={item.sender?.role === 'admin'}
                message={item}
                index={0}
            />
        )
    }

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
        const matchesFrom =
            fromFilter === 'All' || getCommunicationSender(item) === fromFilter

        return matchesSearch && matchesType && matchesFrom
    })

    // Get only the visible items for rendering
    const visibleData = filteredData?.slice(0, visibleItems) || []
    const hasMoreItems = (filteredData?.length || 0) > visibleItems

    if (isError) return <TechnicalError />

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <LoadingAnimation />
            </div>
        )
    }

    if (!data || data.length === 0) {
        return isSuccess ? (
            <EmptyData
                imageUrl="/images/icons/common/notes.png"
                title="No All Communication Attached"
                description="Attach a note or message to view All Communication here"
                height="40vh"
            />
        ) : null
    }

    return (
        <div className="h-full flex flex-col">
            {/* Header with controls */}
            <div className="flex items-center justify-between mb-4 p-4 bg-white border-b">
                <Typography variant="h3" color="text-gray-900">
                    Recent Communications
                </Typography>
                {/* <Button variant="info">+ Compose New</Button> */}
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4 mb-4 p-4 bg-gray-50">
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Search communications..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex items-center space-x-2">
                    <Typography variant="small" color="text-gray-600">
                        Type:
                    </Typography>
                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="All">All</option>
                        <option value="Email">Email</option>
                        <option value="Call">Call</option>
                        <option value="Message">Message</option>
                        <option value="Ticket">Ticket</option>
                        <option value="Note">Note</option>
                    </select>
                </div>

                <Button
                    variant={isExpanded ? 'error' : 'secondary'}
                    onClick={() => {
                        setIsExpanded(!isExpanded)
                        setExpandedCardId(null) // Reset individual card expansion
                    }}
                >
                    {isExpanded ? '📋 Collapse All' : '📋 Expand All'}
                </Button>

                {/*<div className="flex items-center space-x-2">
                    <Typography variant="small" color="text-gray-600">
                        From:
                    </Typography>
                    <select
                        value={fromFilter}
                        onChange={(e) => setFromFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="All">All</option>
                    </select>
                </div> */}
            </div>

            {/* Communications count */}
            <div className="px-4 mb-4">
                <Typography variant="small" color="text-gray-600">
                    Showing {visibleData.length} of {filteredData?.length || 0}{' '}
                    communications
                    {hasMoreItems && (
                        <span className="ml-2 text-blue-600">
                            (Loading more as you scroll...)
                        </span>
                    )}
                </Typography>
            </div>

            {/* Communications list */}
            <div ref={containerRef} className="flex-1 overflow-auto px-4 pb-4">
                {visibleData.map((item: CommunicationItem, index: number) =>
                    renderVirtualizedItem(item, index)
                )}

                {/* Loading indicator for more items */}
                {isLoadingMore && (
                    <div className="flex justify-center items-center py-4">
                        <LoadingAnimation />
                        <Typography variant="small" color="ml-2 text-gray-600">
                            Loading more communications...
                        </Typography>
                    </div>
                )}

                {/* End of list indicator */}
                {!hasMoreItems && visibleData.length > 0 && (
                    <div className="flex justify-center items-center py-8">
                        <Typography variant="small" color="text-gray-500">
                            You've reached the end of all communications
                        </Typography>
                    </div>
                )}
            </div>
        </div>
    )
}
