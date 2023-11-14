import {
    AuthorizedUserComponent,
    EmptyData,
    LoadingAnimation,
    Mail,
    Note,
    TechnicalError,
    Timeline,
    Typography,
} from '@components'
import { useContextBar } from '@hooks'
import { CommonApi } from '@queries'

import { getCommonDates, getDate, getUserCredentials } from '@utils'
import moment from 'moment'
import { HistoryCard } from '../History'
import { TicketSubject, TicketUser } from '../Tickets'
import { StudentCellInfo } from '@partials/admin/student/components'
import { UserRoles } from '@constants'
import { StudentCellInfo as SubadminStudentCellInfo } from '@partials/sub-admin/students'
import { StudentCellInfo as RtoStudentCellInfo } from '@partials/rto/student/components'

export const AllCommunicationTab = ({ user }: { user: any }) => {
    const contextBar = useContextBar()

    const allCommunications = CommonApi.AllCommunication.useCommunications(
        user?.id,
        {
            skip: !user,
        }
    )

    return (
        <div
            className={`flex gap-x-2.5 w-full ${
                contextBar.isVisible ? 'flex-col' : 'flex-row'
            }`}
        >
            <div className={`flex flex-col gap-y-2.5 w-full`}>
                {allCommunications.isError && <TechnicalError />}
                {allCommunications?.isLoading ? (
                    <div className="flex justify-center items-center h-full">
                        <LoadingAnimation />
                    </div>
                ) : allCommunications?.data &&
                  allCommunications?.data.length ? (
                    getCommonDates(allCommunications?.data)?.map(
                        (date: any) => {
                            return (
                                <div
                                    key={date}
                                    className="relative p-4 pt-6 rounded-md w-full mt-6 mb-2"
                                >
                                    <div className="flex items-center sticky top-4 z-20">
                                        {/* <div className='w-2/5 h-[1px] bg-gray-700'/> */}
                                        <div className="bg-gray-700 w-fit shadow-md px-4 py-2 rounded-md text-gray-100">
                                            {moment(date).format(
                                                'MMM, DD YYYY'
                                            )}
                                        </div>
                                        {/* <div className='w-2/5 h-[1px] bg-gray-700'/> */}
                                    </div>

                                    <div className="border-l-4 border-gray-700 ml-8 overflow-x-auto custom-scrollbar">
                                        {allCommunications.data.map(
                                            (item: any, i: number) => {
                                                if (item?.calledBy) {
                                                    return (
                                                        <HistoryCard
                                                            call
                                                            history={{
                                                                ...item,
                                                                title: 'Call',
                                                                description: (
                                                                    <>
                                                                        call
                                                                        made by{' '}
                                                                        <strong>
                                                                            {
                                                                                item
                                                                                    ?.calledBy
                                                                                    ?.name
                                                                            }
                                                                        </strong>
                                                                    </>
                                                                ),
                                                            }}
                                                        />
                                                    )
                                                } else if (
                                                    date ==
                                                    getDate(item?.updatedAt)
                                                ) {
                                                    if (item?.assignedTo) {
                                                        return (
                                                            <div>
                                                                <table className="w-full">
                                                                    <tr className="table-row">
                                                                        <td>
                                                                            <div className="mb-1.5">
                                                                                <Typography
                                                                                    variant="small"
                                                                                    bold
                                                                                >
                                                                                    Subject
                                                                                </Typography>
                                                                            </div>
                                                                            <TicketSubject
                                                                                ticket={
                                                                                    item
                                                                                }
                                                                            />
                                                                        </td>
                                                                        <td>
                                                                            <div className="mb-1.5">
                                                                                <Typography
                                                                                    variant="small"
                                                                                    bold
                                                                                >
                                                                                    Student
                                                                                </Typography>
                                                                            </div>
                                                                            {item?.student ? (
                                                                                <>
                                                                                    <AuthorizedUserComponent
                                                                                        roles={[
                                                                                            UserRoles.ADMIN,
                                                                                        ]}
                                                                                    >
                                                                                        <StudentCellInfo
                                                                                            student={
                                                                                                item?.student
                                                                                            }
                                                                                        />
                                                                                    </AuthorizedUserComponent>
                                                                                    <AuthorizedUserComponent
                                                                                        roles={[
                                                                                            UserRoles.SUBADMIN,
                                                                                        ]}
                                                                                    >
                                                                                        <SubadminStudentCellInfo
                                                                                            student={
                                                                                                item?.student
                                                                                            }
                                                                                        />
                                                                                    </AuthorizedUserComponent>
                                                                                    <AuthorizedUserComponent
                                                                                        roles={[
                                                                                            UserRoles.RTO,
                                                                                        ]}
                                                                                    >
                                                                                        <RtoStudentCellInfo
                                                                                            student={
                                                                                                item?.student
                                                                                            }
                                                                                        />
                                                                                    </AuthorizedUserComponent>
                                                                                </>
                                                                            ) : (
                                                                                'N/A'
                                                                            )}
                                                                        </td>
                                                                        <td>
                                                                            <div className="mb-1.5">
                                                                                <Typography
                                                                                    variant="small"
                                                                                    bold
                                                                                >
                                                                                    Created
                                                                                    By
                                                                                </Typography>
                                                                            </div>
                                                                            <TicketUser
                                                                                ticket={
                                                                                    item?.createdBy
                                                                                }
                                                                            />
                                                                        </td>
                                                                        <td>
                                                                            <div className="mb-1.5">
                                                                                <Typography
                                                                                    variant="small"
                                                                                    bold
                                                                                >
                                                                                    Assigned
                                                                                    To
                                                                                </Typography>
                                                                            </div>
                                                                            <TicketUser
                                                                                ticket={
                                                                                    item?.assignedTo
                                                                                }
                                                                            />
                                                                        </td>
                                                                        <td>
                                                                            <div className="mb-1.5">
                                                                                <Typography
                                                                                    variant="small"
                                                                                    bold
                                                                                >
                                                                                    Priority
                                                                                </Typography>
                                                                            </div>
                                                                            <Typography
                                                                                variant="label"
                                                                                capitalize
                                                                                semibold
                                                                            >
                                                                                {
                                                                                    item?.priority
                                                                                }
                                                                            </Typography>
                                                                        </td>
                                                                        <td>
                                                                            <div className="mb-1.5">
                                                                                <Typography
                                                                                    variant="small"
                                                                                    bold
                                                                                >
                                                                                    Replies
                                                                                </Typography>
                                                                            </div>
                                                                            <Typography
                                                                                variant="label"
                                                                                capitalize
                                                                                semibold
                                                                            >
                                                                                {
                                                                                    item?.replies
                                                                                }
                                                                            </Typography>
                                                                        </td>
                                                                        <td>
                                                                            <div className="mb-1.5">
                                                                                <Typography
                                                                                    variant="small"
                                                                                    bold
                                                                                >
                                                                                    Last
                                                                                    Activity
                                                                                </Typography>
                                                                            </div>
                                                                            <Typography
                                                                                variant={
                                                                                    'label'
                                                                                }
                                                                                capitalize
                                                                            >
                                                                                <span className="whitespace-pre">
                                                                                    {moment(
                                                                                        item?.updatedAt
                                                                                    ).fromNow()}
                                                                                </span>
                                                                            </Typography>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </div>
                                                        )
                                                    } else if (item?.title) {
                                                        return (
                                                            <Timeline
                                                                key={item?.id}
                                                                updatedAt={
                                                                    item?.updatedAt
                                                                }
                                                            >
                                                                {/* <NotesCard
                                                                key={item.id}
                                                                note={item}
                                                            /> */}
                                                                <Note
                                                                    key={
                                                                        item.id
                                                                    }
                                                                    note={item}
                                                                />
                                                            </Timeline>
                                                        )
                                                    } else {
                                                        return (
                                                            <div
                                                                key={item.id}
                                                                className="mb-2"
                                                            >
                                                                <Mail
                                                                    sender={
                                                                        item
                                                                            ?.sender
                                                                            ?.role ===
                                                                        'admin'
                                                                    }
                                                                    message={
                                                                        item
                                                                    }
                                                                    index={i}
                                                                />
                                                            </div>
                                                        )
                                                    }
                                                }
                                            }
                                        )}
                                    </div>
                                </div>
                            )
                        }
                    )
                ) : (
                    !allCommunications.isError && (
                        <EmptyData
                            imageUrl={'/images/icons/common/notes.png'}
                            title="No All Communication Attached"
                            description="Attach a note or message to view All Communication here"
                            height="40vh"
                        />
                    )
                )}
            </div>
        </div>
    )
}
