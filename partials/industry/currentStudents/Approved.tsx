import {
    ActionButton,
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
import { useEffect, useState } from 'react'
import { IndustryDetail, StudentCellInfo } from './components'

// query
import { LoadingAnimation } from '@components/LoadingAnimation'
import { PageHeading } from '@components/headings'
import {
    useGetIndustryWorkplaceQuery,
    useWorkplaceActionsMutation,
} from '@queries'
import { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/router'
import { FaEye } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import {
    WorkplaceCurrentStatus,
    checkStudentStatus,
    checkWorkplaceStatus,
    getStudentWorkplaceAppliedIndustry,
} from '@utils'
import { UserStatus } from '@types'
import { ProgressCell } from '@partials/admin/student/components'

export const Approved = () => {
    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(50)

    const router = useRouter()

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    // query
    const industryWorkplace = useGetIndustryWorkplaceQuery(
        {
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        },
        { refetchOnMountOrArgChange: true }
    )
    const [workplaceActions, workplaceActionsResult] =
        useWorkplaceActionsMutation()

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'View',
            onClick: (workplace: any) => {
                router.push({
                    pathname: `/portals/industry/students/current-students/${workplace?.id}`,
                    query: { tab: 'overview' },
                })
            },
            Icon: FaEye,
        },
    ]

    const onApproveClicked = (industry: any) => {
        workplaceActions({
            id: industry.id,
            status: UserStatus.Approved,
        })
    }

    const onRejectClicked = (industry: any) => {
        workplaceActions({
            id: industry.id,
            status: UserStatus.Rejected,
        })
    }

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'user',
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
                                name={rto?.user?.name || ''}
                                imageUrl={rto?.user?.avatar || ''}
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
            accessorKey: 'industry',
            header: () => <span>Industry</span>,
            cell: (info) => {
                const rto = info.row.original?.student?.rto
                return (
                    <IndustryDetail
                        industry={info.row.original?.industries?.[0]?.industry}
                    />
                )
            },
        },

        {
            accessorKey: 'sectors',
            header: () => <span>Course</span>,
            cell: (info) => (
                <div>
                    <Typography variant={'xs'} color={'text-gray-500'}>
                        {info.row.original?.courses[0]?.code || 'N/A'}
                    </Typography>
                    <Typography variant={'label'} color={'text-gray-700'}>
                        {info.row.original?.courses[0]?.title || 'N/A'}
                    </Typography>
                </div>
            ),
        },
        {
            accessorKey: 'progress',
            header: () => <span>Progress</span>,
            cell: ({ row }) => {
                const workplace = row.original
                const studentStatus = checkStudentStatus(
                    row.original?.student?.studentStatus
                )
                const appliedIndustry = getStudentWorkplaceAppliedIndustry(
                    workplace?.industries
                )
                const steps = checkWorkplaceStatus(workplace?.currentStatus)
                return workplace?.currentStatus ===
                    WorkplaceCurrentStatus.PlacementStarted ? (
                    <StudentStatusProgressCell
                        studentId={row.original?.student?.id}
                        step={
                            workplace?.currentStatus ===
                            WorkplaceCurrentStatus.Cancelled
                                ? 4
                                : studentStatus
                        }
                        appliedIndustry={appliedIndustry}
                    />
                ) : (
                    <ProgressCell
                        appliedIndustry={appliedIndustry}
                        studentId={row.original?.student?.id}
                        step={steps > 14 ? 14 : steps < 1 ? 1 : steps}
                    />
                )
            },
        },
        {
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: (info) => {
                const appliedIndustry = getStudentWorkplaceAppliedIndustry(
                    info.row.original?.industries
                )
                return (
                    <div className="flex gap-x-1 items-center">
                        {appliedIndustry &&
                        !appliedIndustry?.industryResponse ? (
                            <>
                                <ActionButton
                                    variant="success"
                                    onClick={() => {
                                        onApproveClicked(appliedIndustry)
                                    }}
                                    loading={workplaceActionsResult?.isLoading}
                                    disabled={workplaceActionsResult?.isLoading}
                                >
                                    Accept
                                </ActionButton>
                                <ActionButton
                                    variant="error"
                                    onClick={() => {
                                        onRejectClicked(appliedIndustry)
                                    }}
                                    loading={workplaceActionsResult?.isLoading}
                                    disabled={workplaceActionsResult?.isLoading}
                                >
                                    Reject
                                </ActionButton>
                            </>
                        ) : null}
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
