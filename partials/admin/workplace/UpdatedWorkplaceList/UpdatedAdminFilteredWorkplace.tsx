// components
import {
    Card,
    EmptyData,
    LoadingAnimation,
    PageSize,
    Pagination,
    Table,
    TechnicalError,
    Typography,
    UserCreatedAt,
} from '@components'
import { PageHeading } from '@components/headings'

// queries
import { AdminWorkplaceRequest } from '../components'
import { UpdatedWorkplaceRequest } from './components'
import { ellipsisText } from '@utils'
import Link from 'next/link'
import { ColumnDef } from '@tanstack/react-table'

export const UpdatedAdminFilteredWorkplace = ({
    setPage,
    workplace,
    setItemPerPage,
    itemPerPage,
}: {
    setPage: any
    workplace: any
    itemPerPage: number
    setItemPerPage: any
}) => {
    const Columns: ColumnDef<any>[] = [
        {
            header: () => 'Student',
            accessorKey: 'student',
            cell: (info) => (
                <div>
                    <Typography variant="muted" color="text-gray-700">
                        {info?.row?.original?.student?.studentId ?? 'N/A'}
                    </Typography>
                    <Typography variant="small" semibold>
                        {ellipsisText(
                            info?.row?.original?.student?.user?.name,
                            16
                        ) ?? 'N/A'}
                    </Typography>
                    <Typography variant="small" color="text-gray-500">
                        {info?.row?.original?.student?.addressLine1 ?? 'N/A'}
                    </Typography>
                    <Link
                        href={`/portals/admin/student/${info?.row?.original?.student?.id}/detail`}
                        className="text-blue-500 text-xs"
                    >
                        View Details
                    </Link>
                </div>
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
        <div className="p-4">
            <Card noPadding>
                {workplace?.data?.data &&
                workplace?.data?.data?.length &&
                !workplace?.isError ? (
                    <Table
                        columns={Columns}
                        data={workplace?.data?.data}
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
                                            workplace?.data?.data.length
                                        )}
                                        <div className="flex gap-x-2">
                                            {quickActions}
                                            {pagination(
                                                workplace?.data?.pagination,
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
                                    {workplace?.data?.data?.length > 10 && (
                                        <div className="p-6 mb-2 flex justify-between">
                                            {pageSize(
                                                itemPerPage,
                                                setItemPerPage,
                                                workplace?.data?.data?.length
                                            )}
                                            <div className="flex gap-x-2">
                                                {quickActions}
                                                {pagination(
                                                    workplace?.data?.pagination,
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
                    !workplace?.isError && (
                        <EmptyData
                            title={'No Workplace request yet'}
                            description={'No workplace request were found'}
                            height={'50vh'}
                        />
                    )
                )}
            </Card>
        </div>
    )
}
