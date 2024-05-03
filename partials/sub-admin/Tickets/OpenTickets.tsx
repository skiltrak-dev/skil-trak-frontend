import {
    BackButton,
    Button,
    Card,
    EmptyData,
    LoadingAnimation,
    Select,
    Table,
    TableAction,
    TableActionOption,
    TechnicalError,
    Typography,
} from '@components'
import { TicketSubject, TicketUser } from '@partials/common/Tickets/components'
import { CommonApi, SubAdminApi } from '@queries'
import { ColumnDef } from '@tanstack/react-table'
import moment from 'moment'
import { useRouter } from 'next/router'
import { TicketStatus } from 'pages/portals/admin/tickets'
import { useState } from 'react'
import { AiFillCloseCircle, AiFillDelete } from 'react-icons/ai'
import { BsFillEyeFill, BsFillTicketDetailedFill } from 'react-icons/bs'
import { StudentCellInfo } from '../students'
import { PageHeading } from '@components/headings'
import { removeEmptyValues } from '@utils'
import { ticketPriorityEnum } from '@partials/common/Tickets'

export const OpenTickets = () => {
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [isHighPriority, setIsHighPriority] = useState<string | null>(null)

    const router = useRouter()

    const { isLoading, isFetching, data, isError } =
        CommonApi.Tickets.useGetTicket(
            {
                skip: itemPerPage * page - itemPerPage,
                limit: itemPerPage,
                search: `${JSON.stringify(
                    removeEmptyValues({
                        priority: isHighPriority,
                    })
                )
                    .replaceAll('{', '')
                    .replaceAll('}', '')
                    .replaceAll('"', '')
                    .trim()}`,
            },
            { refetchOnMountOrArgChange: true }
        )

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

    const onFilterChange = (value: string) => {
        console.log({ value })
        setIsHighPriority(value)
    }

    const priorityOptions = [
        ...Object.entries(ticketPriorityEnum).map(([label, value]) => ({
            label,
            value,
        })),
    ]
    return (
        <div>
            <div className="ml-4 mb-2">
                <PageHeading
                    title={'Ticket'}
                    subtitle={'You can find all Tickets here'}
                >
                    <div className="w-64">
                        <Select
                            label={'Select Priority'}
                            name={'priority'}
                            placeholder={'Select Priority...'}
                            options={priorityOptions}
                            onlyValue
                            onChange={(e: any) => {
                                onFilterChange(e)
                            }}
                        />
                    </div>
                    <Button
                        variant={'dark'}
                        text={'Create a Ticket'}
                        Icon={BsFillTicketDetailedFill}
                        onClick={() => {
                            router.push('/portals/sub-admin/tickets/add-ticket')
                        }}
                    />
                </PageHeading>
            </div>
            <Card noPadding>
                {isError && <TechnicalError />}
                {isLoading || isFetching ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data && data?.data.length ? (
                    <Table columns={columns} data={data.data}>
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
