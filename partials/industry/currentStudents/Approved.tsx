import {
    Card,
    EmptyData,
    InitialAvatar,
    StudentStatusProgressCell,
    Table,
    TableAction,
    TableActionOption,
    TechnicalError,
    Typography,
} from '@components'
import { useState } from 'react'
import { StudentCellInfo } from './components'

// query
import { PageHeading } from '@components/headings'
import { LoadingAnimation } from '@components/LoadingAnimation'
import { ProgressCell } from '@partials/admin/student/components'
import { useGetIndustryWorkplaceQuery } from '@queries'
import { ColumnDef } from '@tanstack/react-table'
import { checkStudentStatus, checkWorkplaceStatus } from '@utils'
import { FaEye } from 'react-icons/fa'
import { UserStatus } from '@types'
import { MdEmail } from 'react-icons/md'
import { useRouter } from 'next/router'

export const Approved = () => {
    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(50)

    const router = useRouter()

    // query
    const industryWorkplace = useGetIndustryWorkplaceQuery({
        search: `status:${UserStatus.Approved}`,
    })

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'View',
            onClick: (workplace: any) => {
                router.push(
                    `/portals/industry/students/current-students/${workplace?.id}`
                )
            },
            Icon: FaEye,
        },
    ]

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'user.name',
            cell: (info) => (
                <StudentCellInfo
                    id={info.row.original?.id}
                    student={info.row.original?.student}
                />
            ),
            header: () => <span>Student</span>,
        },
        {
            accessorKey: 'rto',
            header: () => <span>RTO</span>,
            cell: (info) => {
                const rto = info.row.original?.student?.rto
                return (
                    <div className="flex items-center gap-x-2">
                        <div className="shadow-inner-image rounded-full">
                            <InitialAvatar
                                name={rto.user.name}
                                imageUrl={rto.user?.avatar}
                            />
                        </div>
                        <div>
                            <p className={`font-medium`}>{rto?.user?.name}</p>
                            <div className="font-medium text-xs text-gray-500">
                                <p className="flex items-center gap-x-1">
                                    <span>
                                        <MdEmail />
                                    </span>
                                    {rto?.user?.email}
                                </p>
                            </div>
                        </div>
                    </div>
                )
            },
        },
        {
            accessorKey: 'sectors',
            header: () => <span>Course</span>,
            cell: (info) => (
                <div>
                    <Typography variant={'xs'} color={'text-gray-500'}>
                        {info.row.original?.courses[0]?.sector?.name}
                    </Typography>
                    <Typography variant={'label'} color={'text-gray-700'}>
                        {info.row.original?.courses[0]?.title}
                    </Typography>
                </div>
            ),
        },
        {
            accessorKey: 'progress',
            header: () => <span>Progress</span>,
            cell: ({ row }) => {
                const steps = checkWorkplaceStatus(row.original?.currentStatus)
                const studentStatus = checkStudentStatus(
                    row.original?.studentStatus
                )

                return (
                    <ProgressCell
                        step={steps > 14 ? 14 : steps < 1 ? 1 : steps}
                    />
                )
            },
        },
        {
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: (info) => {
                return (
                    <div className="flex gap-x-1 items-center">
                        <TableAction
                            options={tableActionOptions}
                            rowItem={info.row.original}
                        />
                    </div>
                )
            },
        },
    ]

    return (
        <>
            <div className="flex flex-col gap-y-4">
                <PageHeading
                    title={'Approved Students'}
                    subtitle={'List of Approved Students'}
                />
                <Card noPadding>
                    {industryWorkplace.isError && <TechnicalError />}
                    {industryWorkplace.isLoading ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : industryWorkplace.data &&
                      industryWorkplace.data?.data.length ? (
                        <Table
                            columns={columns}
                            data={industryWorkplace.data.data}
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
                                                setItemPerPage
                                            )}
                                            <div className="flex gap-x-2">
                                                {quickActions}
                                                {pagination(
                                                    industryWorkplace.data
                                                        ?.pagination,
                                                    setPage
                                                )}
                                            </div>
                                        </div>
                                        <div className=" overflow-x-scroll remove-scrollbar">
                                            <div className="px-6 w-full">
                                                {table}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }}
                        </Table>
                    ) : (
                        !industryWorkplace.isError && (
                            <EmptyData
                                title={'There is no any Approved Student'}
                                description={'There is no any Approved Student'}
                            />
                        )
                    )}
                </Card>
            </div>
        </>
    )
}
