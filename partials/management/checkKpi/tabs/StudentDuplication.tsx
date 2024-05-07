import { useState } from 'react'
import {
    Card,
    EmptyData,
    Table,
    TableChildrenProps,
    Typography,
    LoadingAnimation,
    TechnicalError,
    InitialAvatar,
} from '@components'
import { StudentCellInfo } from '@partials/sub-admin/students'
import { ColumnDef } from '@tanstack/react-table'
import moment from 'moment'
import { ManagementApi } from '@queries'
import { useRouter } from 'next/router'
import { SectorCell } from '@partials/admin/sub-admin'

export const StudentDuplication = ({ filter }: any) => {
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const router = useRouter()
    const reportId = router?.query?.reportId
    // useKpiReportDuplicationDetail
    const { data, isLoading, isError, isFetching } =
        ManagementApi.CheckKpi.useKpiReportDuplicationDetail(
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
                    <div className="px-3 py-1 bg-gray-200 text-center text-xs rounded-md">
                        {info?.row?.original?.student?.studentId}
                    </div>
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
                    // <span className="text-xs">
                    //     {info?.row?.original?.course?.code} -
                    //     {info?.row?.original?.course?.title}
                    // </span>
                    <div>
                        <div className="flex flex-wrap gap-1">
                            {info?.row?.original?.student?.courses?.map(
                                (c: any) => (
                                    <div className="relative group" key={c.id}>
                                        <div className="w-[9px] h-[9px] rounded-full bg-gray-400 cursor-pointer"></div>
                                        <div className="bg-white p-2 rounded-xl shadow-xl z-20 absolute whitespace-nowrap hidden group-hover:block">
                                            <p className="text-xs font-medium text-gray-400">
                                                {c?.code}
                                            </p>
                                            <p>{c?.title}</p>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                )
            },
            header: () => <span>Course</span>,
        },
        {
            accessorKey: 'status',
            cell: (info) => {
                return (
                    <span className="capitalize text-xs">
                        {info?.row?.original?.status.replace(
                            /([a-z])([A-Z])/g,
                            '$1 $2'
                        )}
                    </span>
                )
            },
            header: () => <span>Status</span>,
        },
        // {
        //     accessorKey: 'createdAt',
        //     header: () => <span>Created At</span>,
        //     cell: (info) => {
        //         return (
        //             <>
        //                 <Typography variant={'small'} color={'text-gray-600'}>
        //                     <span className="font-semibold whitespace-pre">
        //                         {moment(info?.row?.original?.createdAt).format(
        //                             'Do MMM YYYY'
        //                         )}
        //                     </span>
        //                 </Typography>
        //                 <Typography variant={'small'} color={'text-gray-600'}>
        //                     <span className="font-semibold whitespace-pre">
        //                         {moment(info?.row?.original?.createdAt).format(
        //                             'hh:mm:ss a'
        //                         )}
        //                     </span>
        //                 </Typography>
        //             </>
        //         )
        //     },
        // },
    ]
    return (
        <div className="">
            <div className="bg-white/80 rounded-lg h-full">
                {isError && <TechnicalError />}
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
                                    )}
                                </div>
                            )
                        }}
                    </Table>
                ) : (
                    !isError && (
                        <EmptyData
                            title={'No Duplication'}
                            description={'No Duplication found.'}
                            height={'40vh'}
                        />
                    )
                )}
            </div>
        </div>
    )
}
