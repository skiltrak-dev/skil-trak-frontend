import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

// Icons
import { FaEdit, FaEye } from 'react-icons/fa'

// components
import {
    Card,
    EmptyData,
    InitialAvatar,
    LoadingAnimation,
    StudentStatusProgressCell,
    StudentSubAdmin,
    Table,
    TableAction,
    TableActionOption,
    Typography,
    UserCreatedAt,
} from '@components'
import { StudentCellInfo } from './components'

import { TechnicalError } from '@components/ActionAnimations/TechnicalError'
import { useActionModal } from '@hooks'
import { SubAdminApi } from '@queries'
import { Student, UserStatus } from '@types'
import { MdBlock } from 'react-icons/md'
import { BlockModal, ChangeStudentStatusModal } from './modals'

import { EditTimer } from '@components/StudentTimer/EditTimer'
import { SectorCell } from '@partials/admin/student/components'
import { ColumnDef } from '@tanstack/react-table'
import {
    WorkplaceCurrentStatus,
    checkStudentStatus,
    checkWorkplaceStatus,
    getStudentWorkplaceAppliedIndustry,
    setLink,
    studentsListWorkplace,
} from '@utils'
import { RiLockPasswordFill } from 'react-icons/ri'
import { IndustryCellInfo } from '../Industries'

export const ArchivedStudents = () => {
    const router = useRouter()

    const [modal, setModal] = useState<ReactElement | null>(null)
    const [changeExpiryData, setChangeExpiryData] = useState(false)

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    // hooks
    const { passwordModal, onViewPassword } = useActionModal()

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    const { isLoading, isFetching, data, isError, refetch } =
        SubAdminApi.Student.useList({
            search: `status:${UserStatus.Archived}`,
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        })

    useEffect(() => {
        if (changeExpiryData) {
            refetch()
        }
    }, [changeExpiryData])

    const onModalCancelClicked = () => {
        setModal(null)
    }

    const onChangeStatus = (student: Student) => {
        setModal(
            <ChangeStudentStatusModal
                student={student}
                onCancel={onModalCancelClicked}
            />
        )
    }

    const onBlockClicked = (student: Student) => {
        setModal(<BlockModal item={student} onCancel={onModalCancelClicked} />)
    }

    const onDateClick = (student: Student) => {
        setModal(
            <EditTimer
                studentId={student?.user?.id}
                date={student?.expiryDate}
                onCancel={onModalCancelClicked}
                changeExpiryData={setChangeExpiryData}
            />
        )
    }

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'View',
            onClick: (student: Student) => {
                router.push(
                    `/portals/sub-admin/students/${student.id}?tab=overview`
                )
                setLink('subadmin-student', router)
            },
            Icon: FaEye,
        },
        {
            text: 'New Profile',
            onClick: (student: Student) => {
                router.push(`/portals/sub-admin/students/${student.id}/detail`)
            },
            Icon: FaEye,
        },
        {
            text: 'Change Status',
            onClick: (student: Student) => onChangeStatus(student),
            Icon: FaEdit,
        },
        {
            text: 'View Password',
            onClick: (student: Student) => onViewPassword(student),
            Icon: RiLockPasswordFill,
        },
        {
            text: 'Block',
            onClick: (student: Student) => onBlockClicked(student),
            Icon: MdBlock,
            color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        },
        {
            text: 'Change Expiry',
            onClick: (student: Student) => onDateClick(student),
            Icon: FaEdit,
        },
    ]

    const Columns: ColumnDef<StudentSubAdmin>[] = [
        {
            header: () => 'Name',
            accessorKey: 'user',
            cell: ({ row }: any) => {
                return (
                    <div id="student-profile">
                        <StudentCellInfo student={row.original} call />
                    </div>
                )
            },
        },

        {
            header: () => 'RTO',
            accessorKey: 'rto',
            cell({ row }: any) {
                const { rto } = row.original

                return (
                    <div className="flex gap-x-2 items-center">
                        <InitialAvatar name={rto.user.name} small />
                        {rto.user.name}
                    </div>
                )
            },
        },
        {
            accessorKey: 'industry',
            header: () => <span>Industry</span>,
            cell: (info: any) => {
                const industry = info.row.original?.industries

                const appliedIndustry = studentsListWorkplace(
                    info.row.original?.workplace
                )

                return industry && industry?.length > 0 ? (
                    <IndustryCellInfo industry={industry[0]} />
                ) : info.row.original?.workplace &&
                  info.row.original?.workplace?.length > 0 &&
                  appliedIndustry ? (
                    <IndustryCellInfo industry={appliedIndustry} />
                ) : (
                    <Typography center>N/A</Typography>
                )
            },
        },
        {
            accessorKey: 'sectors',
            header: () => <span>Sectors</span>,
            cell: ({ row }: any) => {
                return <SectorCell student={row.original} />
            },
        },
        {
            accessorKey: 'progress',
            header: () => <span>Progress</span>,
            cell: ({ row }) => {
                const workplace = row.original.workplace?.reduce(
                    (a: any, b: any) => (a?.createdAt > b?.createdAt ? a : b),
                    {
                        currentStatus: WorkplaceCurrentStatus.NotRequested,
                    }
                )
                const industries = row.original?.industries
                const steps = checkWorkplaceStatus(workplace?.currentStatus)
                const studentStatus = checkStudentStatus(
                    row.original?.studentStatus
                )
                const appliedIndustry = getStudentWorkplaceAppliedIndustry(
                    workplace?.industries
                )

                return (
                    <StudentStatusProgressCell
                        step={studentStatus}
                        appliedIndustry={appliedIndustry}
                    />
                )
                // return industries?.length > 0 ? (
                //     <StudentStatusProgressCell step={studentStatus} />
                // ) : (
                //     <ProgressCell
                //         step={steps > 14 ? 14 : steps < 1 ? 1 : steps}
                //     />
                // )
            },
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
            {modal && modal}
            {passwordModal}
            {isError && <TechnicalError />}
            <Card noPadding>
                {isLoading || isFetching ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data && data?.data.length ? (
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
                                    <div
                                        id="students-list"
                                        className="px-6 overflow-auto custom-scrollbar"
                                    >
                                        {table}
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
                            description={'You have not approved Students yet'}
                            height={'50vh'}
                        />
                    )
                )}
            </Card>
        </div>
    )
}
