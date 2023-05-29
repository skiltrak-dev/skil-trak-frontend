import { NextPageWithLayout, UserStatus } from '@types'
import { ReactElement, useState } from 'react'

// layouts
import {
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TechnicalError,
    UserCreatedAt,
} from '@components'
import { SubAdminLayout } from '@layouts'
import { CommonApi, SubAdminApi } from '@queries'
import { ColumnDef } from '@tanstack/react-table'
// components

const SubAdminHistory: NextPageWithLayout = () => {
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    const { data, isError, isLoading, isFetching } =
        CommonApi.RecentActivities.useRecentActivities({
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        })

    const Columns: ColumnDef<any>[] = [
        {
            header: () => 'Title',
            accessorKey: 'title',
        },
        {
            header: () => 'Description',
            accessorKey: 'description',
        },
        {
            header: () => 'Created On',
            accessorKey: 'createdAt',
            cell: ({ row }) => (
                <UserCreatedAt createdAt={row.original?.createdAt} />
            ),
        },
    ]
    return (
        <div>
            {' '}
            {isError && <TechnicalError />}
            <Card noPadding>
                {isLoading || isFetching ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data && data?.data?.length && !isError ? (
                    <Table
                        columns={Columns}
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
                                        {pageSize(itemPerPage, setItemPerPage)}
                                        <div className="flex gap-x-2">
                                            {quickActions}
                                            {pagination(
                                                data?.pagination,
                                                setPage
                                            )}
                                        </div>
                                    </div>

                                    <div
                                        id="students-list"
                                        className="px-6 overflow-auto remove-scrollbar"
                                    >
                                        {table}
                                    </div>
                                </div>
                            )
                        }}
                    </Table>
                ) : (
                    !isError && (
                        <EmptyData
                            title={'No History'}
                            description={'You did not perform any action yet'}
                            height={'50vh'}
                        />
                    )
                )}
            </Card>
        </div>
    )
}

SubAdminHistory.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout pageTitle={{ title: 'History' }}>{page}</SubAdminLayout>
    )
}

export default SubAdminHistory
