import {
    Card,
    Table,
    EmptyData,
    TechnicalError,
    LoadingAnimation,
} from '@components'
import { useTicketsColumns } from './hooks'

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
    const { columns, modal } = useTicketsColumns()

    return (
        <div>
            {modal}
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
                        }: any) => (
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
                                <div className="overflow-x-scroll remove-scrollbar">
                                    <div className="px-6 w-full">{table}</div>
                                </div>
                            </div>
                        )}
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
