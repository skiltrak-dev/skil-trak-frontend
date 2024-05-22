import {
    Card,
    EmptyData,
    GlobalModal,
    InitialAvatar,
    LoadingAnimation,
    Table,
    TableChildrenProps,
    TechnicalError,
    Typography,
} from '@components'
import { ViewFeedbackModal } from '@partials/management/team'
import { StudentCellInfo } from '@partials/sub-admin/students'
import { ManagementApi } from '@queries'
import { ColumnDef } from '@tanstack/react-table'
import { addSpacesToCamelCase } from '@utils'
import moment from 'moment'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { PiEyeBold } from 'react-icons/pi'

export const FirstTimeStudent = ({ filter }: any) => {
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const router = useRouter()
    const reportId = router?.query?.reportId

    const { data, isLoading, isError, isFetching } =
        ManagementApi.CheckKpi.useKpiReportDetail(
            {
                id: reportId,
                params: {
                    search: `status:${filter || ''}`,
                    skip: itemPerPage * page - itemPerPage,
                    limit: itemPerPage,
                },
            },
            {
                skip: !reportId,
                refetchOnMountOrArgChange: true,
            }
        )
    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'id',
            cell: (info) => {
                return (
                    <span className="px-3 py-1 bg-gray-200 text-xs rounded-md">
                        {info?.row?.original?.student?.studentId}
                    </span>
                )
            },
            header: () => <span>Student ID</span>,
        },
        {
            accessorKey: 'name',
            cell: (info) => {
                return (
                    <div className="flex items-center gap-x-2 text-xs">
                        {info?.row?.original?.student?.user?.name && (
                            <InitialAvatar
                                name={info?.row?.original?.student?.user?.name}
                            />
                        )}
                        {info?.row?.original?.student?.user?.name}
                    </div>
                )
            },
            header: () => <span>Student Name</span>,
        },
        {
            accessorKey: 'course',
            cell: (info) => {
                return (
                    <span className="text-xs">
                        {info?.row?.original?.course?.code} -{' '}
                        {info?.row?.original?.course?.title}
                    </span>
                )
            },
            header: () => <span>Course</span>,
        },
        {
            accessorKey: 'status',
            cell: (info) => {
                const status = info?.row?.original?.status
                const formattedStatus = status
                    ? addSpacesToCamelCase(status)
                    : 'N/A'
                return (
                    <span className="capitalize text-xs">
                        {formattedStatus}
                    </span>
                )
            },
            header: () => <span>Status</span>,
        },
    ]

    return (
        <>
            <div className="">
                {isError && <TechnicalError />}

                <div className="bg-white/80 rounded-lg">
                    {isLoading || isFetching ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : data?.data && data?.data.length ? (
                        <Table
                            columns={columns}
                            data={data?.data}
                            // quickActions={quickActionsElements}
                            enableRowSelection
                        >
                            {({
                                table,
                                pagination,
                                pageSize,
                                quickActions,
                            }: TableChildrenProps) => {
                                return (
                                    <div>
                                        <div className="p-6 mb-2 flex justify-between">
                                            {pageSize
                                                ? pageSize(
                                                      itemPerPage,
                                                      setItemPerPage,
                                                      data?.length
                                                  )
                                                : null}
                                            <div className="flex gap-x-2">
                                                {quickActions}
                                                {pagination
                                                    ? pagination(
                                                          data?.pagination,
                                                          setPage
                                                      )
                                                    : null}
                                            </div>
                                        </div>
                                        <div className="overflow-auto remove-scrollbar h-[calc(100vh-470px)]">
                                            <div
                                                className="px-6 w-full"
                                                id={'studentScrollId'}
                                            >
                                                {table}
                                            </div>
                                        </div>
                                        {data?.length > 10 && (
                                            <div className="p-6 mb-2 flex justify-between">
                                                {pageSize
                                                    ? pageSize(
                                                          itemPerPage,
                                                          setItemPerPage,
                                                          data?.data?.length
                                                      )
                                                    : null}
                                                <div className="flex gap-x-2">
                                                    {quickActions}
                                                    {pagination
                                                        ? pagination(
                                                              data?.pagination,
                                                              setPage
                                                          )
                                                        : null}
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
                                title={'No Approved Student!'}
                                description={
                                    'You have not approved any Student request yet'
                                }
                                height={'50vh'}
                            />
                        )
                    )}
                </div>
            </div>
        </>
    )
}
