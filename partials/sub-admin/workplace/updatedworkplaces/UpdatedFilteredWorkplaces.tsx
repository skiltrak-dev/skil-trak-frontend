import {
    Card,
    EmptyData,
    Table,
    Tooltip,
    TooltipPosition,
    Typography,
    UserCreatedAt,
} from '@components'
import { ColumnDef } from '@tanstack/react-table'
import { ellipsisText } from '@utils'
import Link from 'next/link'
import { FiPhoneOff } from 'react-icons/fi'
import { LuFlagTriangleRight } from 'react-icons/lu'
import { MdSnooze } from 'react-icons/md'
import { RtoCellInfo, UpdatedWorkplaceRequest } from './components'

export const UpdatedFilteredWorkplaces = ({
    setPage,
    subAdminWorkplace,
    setItemPerPage,
    itemPerPage,
}: {
    setPage: any
    subAdminWorkplace: any
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
                    <div className="flex items-center gap-x-2">
                        <Typography variant="small" semibold>
                            {info?.row?.original?.student?.user?.name ?? 'N/A'}
                        </Typography>
                        <div className="flex items-center gap-x-2">
                            {info?.row?.original?.student?.isSnoozed && (
                                <div className="w-5 h-5 flex items-center justify-center rounded relative group">
                                    <MdSnooze
                                        size={20}
                                        className="text-red-500"
                                    />
                                    <Tooltip>Snoozed Student</Tooltip>
                                </div>
                            )}
                            {info?.row?.original?.student?.nonContactable && (
                                <div className="group relative bg-red-600 p-1 rounded-full flex items-center justify-center">
                                    <FiPhoneOff className="text-white text-[10px]" />
                                    <Tooltip position={TooltipPosition.left}>
                                        Not Contactable
                                    </Tooltip>
                                </div>
                            )}
                            {info?.row?.original?.student?.hasIssue && (
                                <div className="group relative">
                                    <LuFlagTriangleRight className="text-red-600 text-xl" />
                                    <Tooltip position={TooltipPosition.left}>
                                        Flagged Issue
                                    </Tooltip>
                                </div>
                            )}
                            {info?.row?.original?.student?.isHighPriority && (
                                <div className="rounded-md whitespace-nowrap px-1 py-0.5 border border-red-400 text-red-400 text-xs font-medium">
                                    High Priority
                                </div>
                            )}
                        </div>
                    </div>
                    <Typography variant="small" color="text-gray-500">
                        {info?.row?.original?.student?.addressLine1 ?? 'N/A'}
                    </Typography>
                    <Link
                        href={`/portals/sub-admin/students/${info?.row?.original?.student?.id}/detail`}
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
                const appliedIndustry = info?.row?.original?.industries?.find(
                    (industry: any) => industry?.applied
                )
                return (
                    <>
                        {appliedIndustry ? (
                            <>
                                <Typography variant="small" bold>
                                    {ellipsisText(
                                        appliedIndustry?.industry?.user?.name,
                                        20
                                    )}
                                </Typography>
                                <Link
                                    href={`/portals/sub-admin/users/industries/${appliedIndustry?.industry?.id}?tab=students`}
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
                <RtoCellInfo rto={row?.original?.student?.rto} />
            ),
        },
        {
            header: () => 'Course',
            accessorKey: 'course',
            cell: ({ row }: any) => (
                <div className="flex items-center gap-x-2">
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
                <UserCreatedAt createdAt={row?.original?.createdAt} />
            ),
        },
        {
            accessorKey: 'cancel',
            header: () => <span>Action</span>,
            cell: ({ row }: any) => (
                <UpdatedWorkplaceRequest
                    workplace={row?.original}
                    cancelRequest={true}
                />
            ),
        },
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
        <div className="mt-5">
            <Card noPadding>
                {subAdminWorkplace?.data?.data &&
                subAdminWorkplace?.data?.data?.length &&
                !subAdminWorkplace?.isError ? (
                    <Table
                        columns={Columns}
                        data={subAdminWorkplace?.data?.data}
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
                                            subAdminWorkplace?.data?.data.length
                                        )}
                                        <div className="flex gap-x-2">
                                            {quickActions}
                                            {pagination(
                                                subAdminWorkplace?.data
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
                                    {subAdminWorkplace?.data?.data?.length >
                                        10 && (
                                        <div className="p-6 mb-2 flex justify-between">
                                            {pageSize(
                                                itemPerPage,
                                                setItemPerPage,
                                                subAdminWorkplace?.data?.data
                                                    ?.length
                                            )}
                                            <div className="flex gap-x-2">
                                                {quickActions}
                                                {pagination(
                                                    subAdminWorkplace?.data
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
                    !subAdminWorkplace?.isError && (
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
