import { useState } from 'react'
import { Waypoint } from 'react-waypoint'
import moment from 'moment'
import {
    AuthorizedUserComponent,
    EmptyData,
    LoadingAnimation,
    Mail,
    TechnicalError,
    Timeline,
    Typography,
} from '@components'
import { useContextBar } from '@hooks'
import { CommonApi } from '@queries'
import { UserRoles } from '@constants'
import { StudentCellInfo } from '@partials/admin/student/components'
import { StudentCellInfo as RtoStudentCellInfo } from '@partials/rto/student/components'
import { StudentCellInfo as SubadminStudentCellInfo } from '@partials/sub-admin/students'
import { getDate, getIsEnabledCommonDates } from '@utils'
import { HistoryCard } from '../History'
import { TicketSubject, TicketUser } from '../Tickets'
import { StudentMessageCard } from '../StudentProfileDetail/components'
import { NoteCard } from '../Notes'
import { User } from '@types'

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

export const AllCommunicationTab = ({ user }: { user: User }) => {
    const { isVisible: isContextBarVisible } = useContextBar()
    const [isEntered, setIsEntered] = useState(false)

    const { data, isLoading, isError, isSuccess } =
        CommonApi.AllCommunication.useCommunications(user?.id, {
            skip: !user || !isEntered,
            refetchOnMountOrArgChange: 20,
        })

    const renderCommunicationItem = (
        item: CommunicationItem,
        index: number
    ) => {
        if (item.type === 'twilio') {
            return <StudentMessageCard key={item.id} studentMessage={item} />
        }

        if (item.calledBy) {
            return (
                <HistoryCard
                    key={item.id}
                    call
                    history={{
                        ...item,
                        title: 'Call',
                        description: (
                            <>
                                call made by{' '}
                                <strong>{item.calledBy.name}</strong>
                            </>
                        ),
                    }}
                />
            )
        }

        if (item.assignedTo) {
            return (
                <div key={item.id} className="w-full">
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
                                    <Typography
                                        variant="label"
                                        capitalize
                                        semibold
                                    >
                                        {item.priority}
                                    </Typography>
                                </td>
                                <td>
                                    <Typography
                                        variant="label"
                                        capitalize
                                        semibold
                                    >
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
                </div>
            )
        }

        if (item.title) {
            return (
                <Timeline key={item.id} updatedAt={item.updatedAt}>
                    <NoteCard note={item} />
                </Timeline>
            )
        }

        return (
            <div key={item.id} className="mb-2">
                <Mail
                    sender={item.sender?.role === 'admin'}
                    message={item}
                    index={index}
                />
            </div>
        )
    }

    const renderCommunicationsByDate = () => {
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

        const dates = getIsEnabledCommonDates(data)
        return dates.map((date: any) => (
            <div
                key={date}
                className="relative p-4 pt-6 mt-6 mb-2 rounded-md w-full bg-gray-50"
            >
                <div className="flex items-center sticky top-4 z-20">
                    <div className="bg-gray-700 w-fit shadow-md px-4 py-2 rounded-md text-gray-100">
                        {moment(date).format('MMM DD, YYYY')}
                    </div>
                </div>
                <div className="border-l-4 border-gray-700 ml-8 overflow-x-auto custom-scrollbar">
                    {data
                        .filter(
                            (item: any) =>
                                date ===
                                getDate(item.isEnabled || item.createdAt)
                        )
                        .map((item: any, index: any) =>
                            renderCommunicationItem(item, index)
                        )}
                </div>
            </div>
        ))
    }

    return (
        <Waypoint
            onEnter={() => setIsEntered(true)}
            onLeave={() => setIsEntered(false)}
        >
            <div
                className={`flex gap-2.5 w-full ${
                    isContextBarVisible ? 'flex-col' : 'flex-row'
                }`}
            >
                <div className="flex flex-col gap-2.5 w-full">
                    {renderCommunicationsByDate()}
                </div>
            </div>
        </Waypoint>
    )
}
