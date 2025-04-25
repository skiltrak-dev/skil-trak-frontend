import { useRouter } from 'next/router'

import { Card, EmptyData, LoadingAnimation, Table } from '@components'

import { TechnicalError } from '@components/ActionAnimations/TechnicalError'
import { SubAdminApi } from '@queries'
import { useEffect, useState } from 'react'

import {
    filterAwaitingAgreementBeyondSevenDays,
    findCallLogsUnanswered,
    findExpiringInNext45Days,
} from '@utils'
import { useColumns } from './hooks'

export const StudentWeeklyCallList = () => {
    const router = useRouter()

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    const { columns, modal } = useColumns()

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    const { isLoading, isFetching, data, isError } =
        SubAdminApi.Student.studentWeeklyCallsList(
            {
                skip: itemPerPage * page - itemPerPage,
                limit: itemPerPage,
            },
            {
                refetchOnMountOrArgChange: 30,
            }
        )

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
