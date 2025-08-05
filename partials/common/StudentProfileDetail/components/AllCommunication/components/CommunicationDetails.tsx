import { HistoryCard } from '@partials/common/History'
import { StudentMessageCard } from '../../StudentMessageCard'
import { CommunicationDetailsProps } from '../types'
import {
    AuthorizedUserComponent,
    Mail,
    Timeline,
    Typography,
} from '@components'
import { TicketSubject, TicketUser } from '@partials/common/Tickets'
import { UserRoles } from '@constants'
import { StudentCellInfo } from '@partials/admin/student/components'
import { StudentCellInfo as RtoStudentCellInfo } from '@partials/rto/student/components'
import { StudentCellInfo as SubadminStudentCellInfo } from '@partials/sub-admin/students'
import moment from 'moment'
import { NoteCard } from '@partials/common/Notes'

export const CommunicationDetails: React.FC<CommunicationDetailsProps> = ({
    item,
}) => {
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
                            call made by <strong>{item?.calledBy?.name}</strong>
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
        <Mail sender={item.sender?.role === 'admin'} message={item} index={0} />
    )
}
