import { useRouter } from 'next/router'

// Icons
import { FaEye } from 'react-icons/fa'

// components
import {
    Card,
    EmptyData,
    InitialAvatar,
    LoadingAnimation,
    StudentExpiryDaysLeft,
    Table,
    TableAction,
    TableActionOption,
    Typography,
    UserCreatedAt,
} from '@components'
import { StudentCellInfo, SubadminStudentIndustries } from './components'

import { TechnicalError } from '@components/ActionAnimations/TechnicalError'
import { SubAdminApi } from '@queries'
import { Student, SubAdmin, UserStatus } from '@types'
import { ReactElement, useEffect, useState } from 'react'
import { MdBlock } from 'react-icons/md'
import { BlockModal, UnAssignStudentModal } from './modals'

import { ProgressCell, SectorCell } from '@partials/admin/student/components'
import { ColumnDef } from '@tanstack/react-table'
import {
    WorkplaceCurrentStatus,
    checkWorkplaceStatus,
    getStudentWorkplaceAppliedIndustry,
    setLink,
} from '@utils'

export const PlacementStartedStudents = ({
    subadmin,
}: {
    subadmin: SubAdmin
}) => {
    const router = useRouter()

    const [modal, setModal] = useState<ReactElement | null>(null)

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    // hooks

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    const { isLoading, isFetching, data, isError } =
        SubAdminApi.Student.placementStartedStudents(
            {
                search: `currentStatus:${
                    WorkplaceCurrentStatus.PlacementStarted
                },status:${UserStatus.Approved},myStudent:${true}`,
                skip: itemPerPage * page - itemPerPage,
                limit: itemPerPage,
            },
            {
                refetchOnMountOrArgChange: 30,
            }
        )

    const onModalCancelClicked = () => {
        setModal(null)
    }

    const onBlockClicked = (student: Student) => {
        setModal(<BlockModal item={student} onCancel={onModalCancelClicked} />)
    }

    const onAssignStudentClicked = (student: Student) => {
        setModal(
            <UnAssignStudentModal
                student={student}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'View',
            onClick: (student: Student) => {
                router.push(`/portals/sub-admin/students/${student?.id}/detail`)

                setLink('subadmin-student', router)
            },
            Icon: FaEye,
        },
        {
            text: 'Block',
            onClick: (student: Student) => onBlockClicked(student),
            Icon: MdBlock,
            color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        },
        {
            text: 'Un Assign',
            onClick: (student: Student) => onAssignStudentClicked(student),
            Icon: MdBlock,
            color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        },
    ]

    const Columns: ColumnDef<Student>[] = [
        {
            header: () => 'Name',
            accessorKey: 'user',
            cell: ({ row }: any) => (
                <StudentCellInfo
                    isHod={subadmin?.departmentMember?.isHod}
                    student={row.original}
                    call
                />
            ),
        },

        {
            header: () => 'RTO',
            accessorKey: 'rto',
            cell({ row }: any) {
                const { rto } = row.original

                return (
                    <div className="flex gap-x-2 items-center">
                        {rto.user.name && (
                            <InitialAvatar name={rto.user.name} small />
                        )}
                        {rto.user.name}
                    </div>
                )
            },
        },
        {
            accessorKey: 'industry',
            header: () => <span>Industry</span>,
            cell: (info) => (
                <SubadminStudentIndustries
                    workplace={info.row.original?.workplace}
                    industries={info.row.original?.industries}
                />
            ),
        },
        {
            accessorKey: 'sectors',
            header: () => <span>Sectors</span>,
            cell: ({ row }: any) => {
                return <SectorCell student={row.original} />
            },
        },
        {
            accessorKey: 'expiry',
            header: () => <span>Expiry Countdown</span>,
            cell: (info) => (
                <StudentExpiryDaysLeft
                    expiryDate={info.row.original?.expiryDate}
                />
            ),
        },
        {
            header: () => 'Progress',
            accessorKey: 'progress',
            cell: ({ row }) => {
                const workplace = row.original?.workplace?.reduce(
                    (a: any, b: any) => (a?.createdAt > b?.createdAt ? a : b),
                    {
                        currentStatus: WorkplaceCurrentStatus.NotRequested,
                    }
                )
                const steps = checkWorkplaceStatus(workplace?.currentStatus)
                const appliedIndustry = getStudentWorkplaceAppliedIndustry(
                    workplace?.industries
                )
                return (
                    <ProgressCell
                        assigned={
                            workplace?.assignedTo || row?.original?.subadmin
                        }
                        studentId={row.original?.id}
                        appliedIndustry={appliedIndustry}
                        step={steps > 14 ? 14 : steps < 1 ? 1 : steps}
                    />
                )
            },
        },
        {
            accessorKey: 'user.status',
            header: () => <span>Status</span>,
            cell: (info) => (
                <Typography
                    uppercase
                    variant={'badge'}
                    color={
                        info.row.original?.user?.status === UserStatus.Blocked
                            ? 'text-error'
                            : 'text-black'
                    }
                >
                    <span className="font-bold">
                        {info.row.original?.user?.status}
                    </span>
                </Typography>
            ),
        },
        {
            accessorKey: 'createdAt',
            header: () => <span>Created At</span>,
            cell: ({ row }: any) => (
                <UserCreatedAt createdAt={row.original?.createdAt} />
            ),
        },
        {
            header: () => 'Action',
            accessorKey: 'Action',
            cell: ({ row }: any) => {
                return (
                    <TableAction
                        options={tableActionOptions}
                        rowItem={row.original}
                    />
                )
            },
        },
    ]
    return (
        <div>
            {modal}
            <Card noPadding>
                {isError && <TechnicalError />}
                {isLoading || isFetching ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data && data?.data.length ? (
                    <Table
                        columns={Columns}
                        data={data.data}
                        // quickActions={quickActionsElements}
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
                            )
                        }}
                    </Table>
                ) : (
                    !isError && (
                        <EmptyData
                            title={'No Students'}
                            description={'You have not added any Student'}
                            height={'50vh'}
                        />
                    )
                )}
            </Card>
        </div>
    )
}
