import { useRouter } from 'next/router'

import {
    Card,
    EmptyData,
    InitialAvatar,
    LoadingAnimation,
    Table,
    Typography,
} from '@components'

import { TechnicalError } from '@components/ActionAnimations/TechnicalError'
import { SubAdminApi } from '@queries'
import { useEffect, useState } from 'react'

import {
    filterAwaitingAgreementBeyondSevenDays,
    findCallLogsUnanswered,
    findExpiringInNext45Days,
} from '@utils'
import Link from 'next/link'
import { useColumns } from './hooks'

export const UpcomingAppointmentsStudents = () => {
    const router = useRouter()

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    const { isLoading, isFetching, data, isError } =
        SubAdminApi.Student.getUpcomingAppointmentsStudents(
            {
                skip: itemPerPage * page - itemPerPage,
                limit: itemPerPage,
            },
            {
                refetchOnMountOrArgChange: 30,
            }
        )

    const { columns, modal } = useColumns()

    columns.splice(0, 1, {
        header: () => 'Name',
        accessorKey: 'user',
        cell: ({ row }) => (
            <Link
                className="flex items-center gap-x-2"
                href={{
                    pathname: `/portals/sub-admin/students/${row?.original?.id}/detail`,
                    query: {
                        sectionId: 'appointments',
                    },
                }}
            >
                <InitialAvatar
                    name={row?.original?.user?.name}
                    imageUrl={row?.original?.user?.avatar}
                />
                <Typography variant="label" cursorPointer>
                    {row?.original?.user?.name}
                </Typography>
            </Link>
        ),
    })

    return (
        <div>
            {modal}
            <Card noPadding>
                {isError && <TechnicalError />}

                {isLoading || isFetching ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data && data?.data.length ? (
                    <Table
                        columns={columns}
                        data={data?.data}
                        // quickActions={quickActionsElements}
                        enableRowSelection
                        awaitingAgreementBeyondSevenDays={filterAwaitingAgreementBeyondSevenDays(
                            data?.data
                        )}
                        findCallLogsUnanswered={findCallLogsUnanswered(
                            data?.data
                        )}
                        findExpiringInNext45Days={findExpiringInNext45Days(
                            data?.data
                        )}
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
                                    <div className="overflow-x-auto remove-scrollbar">
                                        <div
                                            className="px-6 w-full"
                                            id={'studentScrollId'}
                                        >
                                            {table}
                                        </div>
                                    </div>
                                    {data?.data?.length > 10 && (
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
                                    )}
                                </div>
                            )
                        }}
                    </Table>
                ) : (
                    !isError && (
                        <EmptyData
                            title={'No Students'}
                            description={'You have not added any Student'}
                            height={'50vh'}
                        />
                    )
                )}
            </Card>
        </div>
    )
}
