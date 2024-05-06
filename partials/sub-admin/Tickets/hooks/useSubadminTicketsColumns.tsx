import { TableAction, TableActionOption, Typography } from '@components'
import { TicketSubject, TicketUser } from '@partials/common/Tickets/components'
import { RTOCellInfo } from '@partials/sub-admin/rto/components'
import { StudentCellInfo } from '@partials/sub-admin/students'
import { ColumnDef } from '@tanstack/react-table'
import moment from 'moment'
import { useRouter } from 'next/router'
import { BsFillEyeFill } from 'react-icons/bs'

export const useSubadminTicketsColumns = () => {
    const router = useRouter()

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'View',
            onClick: (ticket: any) =>
                router.push(`/portals/sub-admin/tickets/detail/${ticket?.id}`),
            Icon: BsFillEyeFill,
        },
        // {
        //     text: 'Delete',
        //     onClick: () => {},
        //     Icon: AiFillDelete,
        // },
    ]
    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'subject',
            cell: (info) => <TicketSubject ticket={info?.row?.original} />,
            header: () => <span>Subject</span>,
        },

        {
            accessorKey: 'createdBy',
            cell: (info) => (
                <TicketUser ticket={info?.row?.original?.createdBy} />
            ),
            header: () => <span>Created By</span>,
        },
        {
            accessorKey: 'user.name',
            cell: (info) => {
                return info?.row?.original?.student ? (
                    <StudentCellInfo
                        student={info?.row?.original?.student}
                        call
                    />
                ) : (
                    'N/A'
                )
            },
            header: () => <span>Linked Student</span>,
        },
        {
            accessorKey: 'rto',
            cell: (info) => {
                return info?.row?.original?.student ? (
                    <RTOCellInfo rto={info.row.original?.student?.rto} />
                ) : (
                    'N/A'
                )
            },
            header: () => <span>RTO</span>,
        },
        {
            accessorKey: 'assignedTo',
            cell: (info) => (
                <TicketUser ticket={info?.row?.original?.assignedTo} />
            ),
            header: () => <span>Assigned To</span>,
        },
        {
            accessorKey: 'course',
            header: () => <span>Course</span>,
            cell: (info) => (
                <Typography variant="muted" capitalize>
                    {info?.row?.original?.course?.title || 'N/A'}
                </Typography>
            ),
        },
        // {
        //     accessorKey: 'priority',
        //     header: () => <span>Priority</span>,
        //     cell: (info) => (
        //         <Typography variant="label" capitalize semibold>
        //             {info.row.original?.priority}
        //         </Typography>
        //     ),
        // },
        {
            accessorKey: 'lastActivity',
            cell: (info) => (
                <Typography variant={'label'} capitalize>
                    <span className="whitespace-pre">
                        {moment(info.row.original?.updatedAt).fromNow()}
                    </span>
                </Typography>
            ),
            header: () => <span>Last Activity</span>,
        },
        {
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: (info) => {
                return (
                    <div className="flex gap-x-1 items-center">
                        <TableAction
                            options={tableActionOptions}
                            rowItem={info.row.original}
                        />
                    </div>
                )
            },
        },
    ]
    return { columns }
}
