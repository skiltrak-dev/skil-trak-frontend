import { AuthorizedUserComponent, Typography } from '@components'
import { UserRoles } from '@constants'
import { StudentCellInfo } from '@partials/admin/student/components'
import { TicketSubject, TicketUser } from '@partials/common/Tickets'
import React from 'react'
import { StudentCellInfo as SubadminStudentCellInfo } from '@partials/sub-admin/students'
import { StudentCellInfo as RtoStudentCellInfo } from '@partials/rto/student/components'
import moment from 'moment'

export const TicketAllCommunication = ({ item }: { item: any }) => {
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
                                    <StudentCellInfo student={item.student} />
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
