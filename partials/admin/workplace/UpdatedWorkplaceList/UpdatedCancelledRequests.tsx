import { useEffect, useState } from 'react'
// components
import {
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TechnicalError,
    Typography,
    UserCreatedAt,
} from '@components'

// queries
import { AdminApi } from '@queries'
import { ColumnDef } from '@tanstack/react-table'
import { ellipsisText } from '@utils'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
    CourseWorkplaceCell,
    RtoWorkplaceCell,
    StudentWorkplaceCellInfo,
    UpdatedWorkplaceRequest,
} from './components'
import { useColumns } from './hooks'

export const UpdatedCancelledRequests = () => {
    const router = useRouter()

    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(30)

    const cancelledWorkplaces = AdminApi.Workplace.cancelledWorkplaces(
        {
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        },
        {
            refetchOnMountOrArgChange: true,
        }
    )
    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 30))
    }, [router])

    const Columns = useColumns()

    return (
        <div>
            <Card noPadding>
                {cancelledWorkplaces.isError && <TechnicalError />}
                {cancelledWorkplaces.isLoading ||
                cancelledWorkplaces.isFetching ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : cancelledWorkplaces?.data?.data &&
                  cancelledWorkplaces?.data?.data?.length &&
                  !cancelledWorkplaces?.isError ? (
                    <Table
                        columns={Columns}
                        data={cancelledWorkplaces?.data?.data}
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
                                            cancelledWorkplaces?.data?.data
                                                .length
                                        )}
                                        <div className="flex gap-x-2">
                                            {quickActions}
                                            {pagination(
                                                cancelledWorkplaces?.data
                                                    ?.pagination,
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
                                    {cancelledWorkplaces?.data?.data?.length >
                                        10 && (
                                        <div className="p-6 mb-2 flex justify-between">
                                            {pageSize(
                                                itemPerPage,
                                                setItemPerPage,
                                                cancelledWorkplaces?.data?.data
                                                    ?.length
                                            )}
                                            <div className="flex gap-x-2">
                                                {quickActions}
                                                {pagination(
                                                    cancelledWorkplaces?.data
                                                        ?.pagination,
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
                    !cancelledWorkplaces?.isError && (
                        <EmptyData
                            title={'No Cancelled Workplace request yet'}
                            description={
                                'No Cancelled workplace request were found'
                            }
                            height={'50vh'}
                        />
                    )
                )}
            </Card>
        </div>
    )
}
