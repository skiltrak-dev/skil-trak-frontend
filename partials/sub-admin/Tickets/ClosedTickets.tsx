import {
    Button,
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TechnicalError,
    Typography,
} from '@components'
import { PageHeading } from '@components/headings'
import { CommonApi } from '@queries'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { BsFillTicketDetailedFill } from 'react-icons/bs'
import { useSubadminTicketsColumns } from './hooks'
import moment from 'moment'
import { TicketStatus } from '@partials/common/Tickets'

export const ClosedTickets = () => {
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    const router = useRouter()

    const { isLoading, isFetching, data, isError } =
        CommonApi.Tickets.useGetTicket(
            {
                search: `status:${TicketStatus.CLOSED}`,
                skip: itemPerPage * page - itemPerPage,
                limit: itemPerPage,
            },
            { refetchOnMountOrArgChange: true }
        )

    // const { columns } = useMemo(() => useSubadminTicketsColumns(), [])

    // columns.splice(columns?.length - 3, 0, {
    //     accessorKey: 'closedAt',
    //     cell: (info) => {
    //         console.log(
    //             'info.row.original?.closedAt',
    //             info.row.original?.closedAt.slice(0, 10)
    //         )
    //         return (
    //             <Typography variant="small" semibold>
    //                 <span className="whitespace-pre">
    //                     {moment(info.row.original?.closedAt).format(
    //                         'DD, MMM YYYY'
    //                     )}
    //                 </span>
    //             </Typography>
    //         )
    //     },
    //     header: () => <span>Closed At</span>,
    // })

    const { columns: originalColumns } = useMemo(
        () => useSubadminTicketsColumns(),
        []
    )

    const columns = useMemo(() => {
        const newColumns = [...originalColumns]

        newColumns.splice(newColumns.length - 3, 0, {
            accessorKey: 'closedAt',
            cell: (info) => {
                const closedAt = info.row.original?.closedAt
                return (
                    <Typography variant="small" semibold>
                        <span className="whitespace-pre">
                            {moment(closedAt).format('DD, MMM YYYY')}
                        </span>
                    </Typography>
                )
            },
            header: () => <span>Closed At</span>,
        })

        return newColumns
    }, [originalColumns])

    return (
        <div>
            <div className="ml-4 mb-2">
                <PageHeading
                    title={'Closed Tickets'}
                    subtitle={'You can find all Closed Tickets here'}
                >
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
