import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { Card, EmptyData, LoadingAnimation, Table } from '@components'

import { TechnicalError } from '@components/ActionAnimations/TechnicalError'
import { SubAdminApi } from '@queries'
import { UserStatus } from '@types'

import { useColumns } from './hooks'

export const ArchivedStudents = () => {
    const router = useRouter()

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    const { isLoading, isFetching, data, isError, refetch } =
        SubAdminApi.Student.useList(
            {
                search: `status:${UserStatus.Archived}`,
                skip: itemPerPage * page - itemPerPage,
                limit: itemPerPage,
            },
            {
                refetchOnMountOrArgChange: 30,
            }
        )

    const { modal, columns } = useColumns()

    return (
        <div>
            {modal}
            {isError && <TechnicalError />}
            <Card noPadding>
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
                        }: any) => (
                            <div>
                                <div className="p-6 mb-2 flex justify-between">
                                    {pageSize(
                                        itemPerPage,
                                        setItemPerPage,
                                        data?.data?.length
                                    )}
                                    <div className="flex gap-x-2">
                                        {quickActions}
                                        {pagination(data?.pagination, setPage)}
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
                        )}
                    </Table>
                ) : (
                    !isError && (
                        <EmptyData
                            title={'No Students'}
                            description={'You have not approved Students yet'}
                            height={'50vh'}
                        />
                    )
                )}
            </Card>
        </div>
    )
}
