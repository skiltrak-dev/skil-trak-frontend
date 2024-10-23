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
import { CommonApi, SubAdminApi } from '@queries'
import { removeEmptyValues } from '@utils'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { BsFillTicketDetailedFill } from 'react-icons/bs'
import { useSubadminTicketsColumns } from './hooks'

export const DepartmentTickets = () => {
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [isHighPriority, setIsHighPriority] = useState<string | null>(null)
    const router = useRouter()
    const [coordinatorId, setCoordinatorId] = useState<string | null>(() => {
        // Initialize from URL query parameter if it exists
        return (router.query.subAdminId as string) || null
    })


    const { data: departmentCoordinators } =
        SubAdminApi.SubAdmin.useCoordinatorsDropDown()

    const coordinatorsOptions = departmentCoordinators?.map(
        (coordinator: any) => ({
            label: coordinator?.user?.name,
            value: coordinator?.user?.id,
        })
    )

    useEffect(() => {
        const query = { ...router.query }

        if (coordinatorId) {
            query.subAdminId = coordinatorId
        } else {
            delete query.subAdminId
        }

        router.push(
            {
                pathname: router.pathname,
                query,
            },
            undefined,
            { shallow: true }
        )
    }, [coordinatorId])

    const { isLoading, isFetching, data, isError } =
        CommonApi.Tickets.useDepartmentTicket(
            {
                skip: itemPerPage * page - itemPerPage,
                limit: itemPerPage,
                search: `${JSON.stringify(
                    removeEmptyValues({
                        subAdminId: coordinatorId,
                    })
                )
                    .replaceAll('{', '')
                    .replaceAll('}', '')
                    .replaceAll('"', '')
                    .trim()}`,
            },
            { refetchOnMountOrArgChange: true }
        )

    const { columns } = useMemo(() => useSubadminTicketsColumns(), [])

    const onFilterChange = (value: string) => {
        setIsHighPriority(value)
    }
    const onFilterByCoordinator = (value: string) => {
        setCoordinatorId(value)
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
                    title={'Department Tickets'}
                    subtitle={'You can find all Department Tickets here'}
                >
                    <div className="w-64">
                        <Select
                            label={'Select Coordinator'}
                            name={'coordinator'}
                            placeholder={'Select Coordinator...'}
                            options={coordinatorsOptions}
                            onlyValue
                            onChange={(e: any) => {
                                onFilterByCoordinator(e)
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
