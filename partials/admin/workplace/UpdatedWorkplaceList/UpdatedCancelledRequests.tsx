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
import { StudentWorkplaceCellInfo, UpdatedWorkplaceRequest } from './components'

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

    const Columns: ColumnDef<any>[] = [
        {
            header: () => 'Student',
            accessorKey: 'student',
            cell: (info) => (
                <StudentWorkplaceCellInfo
                    student={info?.row?.original?.student}
                />
            ),
        },
        {
            header: () => 'Industry Status',
            accessorKey: 'status',
            cell: ({ row }: any) => (
                <UpdatedWorkplaceRequest workplace={row?.original} />
            ),
        },
        {
            accessorKey: 'industry',
            header: () => <span>Workplace Name</span>,
            cell: (info) => {
                const appliedIndustry = info?.row?.original?.industries.find(
                    (industry: any) => industry?.applied
                )
                return (
                    <>
                        {appliedIndustry ? (
                            <>
                                <div
                                    title={
                                        appliedIndustry?.industry?.user?.name
                                    }
                                    className="bg-white px-3 py-1.5 rounded-md border border-[#128C7E]"
                                >
                                    <Typography variant="small" bold>
                                        {ellipsisText(
                                            appliedIndustry?.industry?.user
                                                ?.name,
                                            30
                                        )}
                                    </Typography>
                                </div>
                                <Link
                                    href={`/portals/admin/industry/${appliedIndustry?.industry?.id}`}
                                    className="text-blue-500 text-xs"
                                >
                                    View Details
                                </Link>
                            </>
                        ) : (
                            <Typography variant="small" semibold>
                                N/A
                            </Typography>
                        )}
                    </>
                )
            },
        },
        {
            header: () => 'RTO',
            accessorKey: 'rto',
            cell: ({ row }: any) => (
                <>
                    <Typography variant="small" semibold>
                        {row?.original?.student?.rto?.user?.name ?? 'N/A'}
                    </Typography>
                    <Typography variant="small" color="text-gray-500">
                        {row?.original?.student?.rto?.user?.email ?? 'N/A'}
                    </Typography>
                </>
            ),
        },
        {
            header: () => 'Course',
            accessorKey: 'course',
            cell: ({ row }: any) => (
                <div
                    title={row?.original?.courses[0]?.title}
                    className="flex items-center gap-x-2 cursor-pointer"
                >
                    <Typography variant="small" medium>
                        {row?.original?.courses[0]?.code ?? 'N/A'}
                    </Typography>
                    -
                    <Typography variant="small" medium>
                        {ellipsisText(row?.original?.courses[0]?.title, 15) ??
                            'N/A'}
                    </Typography>
                </div>
            ),
        },
        {
            header: () => 'Coordinator',
            accessorKey: 'coordinator',
            cell: ({ row }: any) => (
                <UpdatedWorkplaceRequest
                    workplace={row?.original}
                    assignToMe={true}
                />
            ),
        },

        {
            accessorKey: 'createdAt',
            header: () => <span>Created At</span>,
            cell: ({ row }: any) => (
                <UserCreatedAt createdAt={row.original?.createdAt} />
            ),
        },
        // {
        //     accessorKey: 'cancel',
        //     header: () => <span>Action</span>,
        //     cell: ({ row }: any) => (
        //         <UpdatedWorkplaceRequest
        //             workplace={row?.original}
        //             cancelRequest={true}
        //         />
        //     ),
        // },
        // {
        //     header: () => 'Action',
        //     accessorKey: 'Action',
        //     cell: ({ row }) => {
        //         const tableActionOption = tableActionOptions(row.original)
        //         return (
        //             <TableAction
        //                 options={tableActionOption}
        //                 rowItem={row.original}
        //             />
        //         )
        //     },
        // },
    ]

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
