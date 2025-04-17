import {
    Card,
    EmptyData,
    LoadingAnimation,
    Portal,
    Table,
    TableAction,
    TableActionOption,
    TechnicalError,
    Typography,
} from '@components'
import { CommonApi } from '@queries'
import { ColumnDef } from '@tanstack/react-table'
import React, { ReactElement, useState } from 'react'
import { AiFillCloseCircle, AiFillDelete } from 'react-icons/ai'
import moment from 'moment'
import { useRouter } from 'next/router'
import { TicketSubject, TicketUser } from '@partials/common/Tickets/components'
import { CloseTicketModal } from '@partials/admin/Tickets'
import { TicketStatus } from '../Tickets'

export const StudentTickets = () => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    const router = useRouter()

    const { isLoading, isFetching, data, isError } =
        CommonApi.Tickets.useGetTicket(
            {
                search: `status:${TicketStatus.OPEN}`,
                skip: itemPerPage * page - itemPerPage,
                limit: itemPerPage,
            },
            { refetchOnMountOrArgChange: true }
        )

    const onCancel = () => {
        setModal(null)
    }

    const onCloseClicked = (ticket: any) => {
        setModal(
            <Portal>
                <CloseTicketModal onCancel={onCancel} ticket={ticket} />
            </Portal>
        )
    }

    const tableActionOptions: TableActionOption<any>[] = [
        {
            text: 'View',
            onClick: (ticket: any) =>
                router.push(`/portals/admin/tickets/detail/${ticket?.id}`),
            Icon: AiFillCloseCircle,
        },
        {
            text: 'Close',
            onClick: (ticket: any) => onCloseClicked(ticket),
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
            {modal}
            <Card noPadding>
                {isError && <TechnicalError />}
                {isLoading || isFetching ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data && data?.data?.length ? (
                    <Table columns={columns} data={data?.data}>
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
                                            data?.data?.length
                                        )}
                                        <div className="flex gap-x-2">
                                            {quickActions}
                                            {pagination(
                                                data?.pagination,
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
                    !isError && (
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
