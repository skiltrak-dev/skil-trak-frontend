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
import { AdminApi } from '@queries'
import { ColumnDef } from '@tanstack/react-table'
import React, { useState } from 'react'
import { AiFillCloseCircle, AiFillDelete } from 'react-icons/ai'
import { TicketSubject, TicketUser } from './components'
import moment from 'moment'

export const MyOpenTickets = () => {
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    const { isLoading, isFetching, data, isError, refetch } =
        AdminApi.Students.useListQuery(
            {
                skip: itemPerPage * page - itemPerPage,
                limit: itemPerPage,
            },
            { refetchOnMountOrArgChange: true }
        )

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'Close',
            onClick: () => {},
            Icon: AiFillCloseCircle,
        },
        {
            text: 'Delete',
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
            accessorKey: 'createdBy',
            cell: (info) => <TicketUser ticket={info?.row?.original} />,
            header: () => <span>Created By</span>,
        },
        {
            accessorKey: 'assignedTo',
            cell: (info) => <TicketUser ticket={info?.row?.original} />,
            header: () => <span>Assigned To</span>,
        },
        {
            accessorKey: 'conversation',
            cell: (info) => Math.floor(Math.random() * 100),
            header: () => <span>Conversation</span>,
        },
        {
            accessorKey: 'createdAt',
            cell: (info) => (
                <Typography variant={'label'} capitalize>
                    <span className="whitespace-pre">
                        {moment(info.row.original?.createdAt).fromNow()}
                    </span>
                </Typography>
            ),
            header: () => <span>Created At</span>,
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
                {isError && <TechnicalError />}
                {isLoading || isFetching ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data && data?.data.length ? (
                    <Table
                        columns={columns}
                        data={data.data}
                        enableRowSelection
                    >
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
