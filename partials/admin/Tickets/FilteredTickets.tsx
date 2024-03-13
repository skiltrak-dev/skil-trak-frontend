import {
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TableAction,
    TableActionOption,
    TechnicalError,
    Typography,
} from '@components'
import { TicketSubject, TicketUser } from '@partials/common/Tickets/components'
import { CommonApi } from '@queries'
import { ColumnDef } from '@tanstack/react-table'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { AiFillCloseCircle, AiFillDelete } from 'react-icons/ai'
import { StudentCellInfo } from '../student/components'

export const FilteredTickets = ({
    setPage,
    itemPerPage,
    tickets,
    setItemPerPage,
}: {
    setPage: any
    itemPerPage: any
    tickets: any
    setItemPerPage: any
}) => {
    const router = useRouter()

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'View',
            onClick: (ticket: any) =>
                router.push(`/portals/admin/tickets/detail/${ticket?.id}`),
            Icon: AiFillCloseCircle,
        },
        {
            text: 'Close',
            onClick: () => {},
            Icon: AiFillDelete,
        },
    ]
    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'subject',
            cell: (info) => {
                return <TicketSubject ticket={info?.row?.original} />
            },
            header: () => <span>Subject</span>,
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
            header: () => <span>Student</span>,
        },
        {
            accessorKey: 'createdBy',
            cell: (info) => (
                <TicketUser ticket={info?.row?.original?.createdBy} />
            ),
            header: () => <span>Created By</span>,
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
        {
            accessorKey: 'priority',
            header: () => <span>Priority</span>,
            cell: (info) => (
                <Typography variant="label" capitalize semibold>
                    {info.row.original?.priority}
                </Typography>
            ),
        },
        {
            accessorKey: 'replies',
            // cell: (info) => Math.floor(Math.random() * 100),
            header: () => <span>Replies</span>,
        },
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
    return (
        <div>
            <Card noPadding>
                {tickets.isError && <TechnicalError />}
                {tickets.isLoading || tickets.isFetching ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : tickets.data && tickets.data?.data?.length ? (
                    <Table columns={columns} data={tickets.data?.data}>
                        {({
                            table,
                            pagination,
                            pageSize,
                            quickActions,
                        }: any) => {
                            return (
                                <div>
                                    <div className="p-6 mb-2 flex justify-between">
                                        {pageSize(
                                            itemPerPage,
                                            setItemPerPage,
                                            tickets.data?.data?.length
                                        )}
                                        <div className="flex gap-x-2">
                                            {quickActions}
                                            {pagination(
                                                tickets.data?.pagination,
                                                setPage
                                            )}
                                        </div>
                                    </div>
                                    <div className=" overflow-x-scroll remove-scrollbar">
                                        <div className="px-6 w-full">
                                            {table}
                                        </div>
                                    </div>
                                </div>
                            )
                        }}
                    </Table>
                ) : (
                    !tickets.isError && (
                        <EmptyData
                            title={'No Tickets!'}
                            description={'You have not Tickets request yet'}
                            height={'50vh'}
                        />
                    )
                )}
            </Card>
        </div>
    )
}
