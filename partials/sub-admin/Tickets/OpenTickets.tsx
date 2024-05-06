import {
    Button,
    Card,
    EmptyData,
    LoadingAnimation,
    Select,
    Table,
    TechnicalError,
} from '@components'
import { PageHeading } from '@components/headings'
import { ticketPriorityEnum } from '@partials/common/Tickets'
import { CommonApi } from '@queries'
import { removeEmptyValues } from '@utils'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { BsFillTicketDetailedFill } from 'react-icons/bs'
import { useSubadminTicketsColumns } from './hooks'

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

    const { columns } = useSubadminTicketsColumns()

    const onFilterChange = (value: string) => {
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
