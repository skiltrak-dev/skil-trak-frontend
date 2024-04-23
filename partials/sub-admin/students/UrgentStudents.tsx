import { useRouter } from 'next/router'
import { ReactElement } from 'react'

// Icons
import { FaEdit, FaEye, FaUsers } from 'react-icons/fa'

// components
import {
    Card,
    CaseOfficerAssignedStudent,
    EmptyData,
    LoadingAnimation,
    StudentExpiryDaysLeft,
    StudentSubAdmin,
    Table,
    TableAction,
    Typography,
    UserCreatedAt,
} from '@components'
import { StudentCellInfo } from './components'

import { TechnicalError } from '@components/ActionAnimations/TechnicalError'
import { SubAdminApi } from '@queries'
import { Student } from '@types'
import { useEffect, useState } from 'react'
import { MdBlock, MdPriorityHigh } from 'react-icons/md'
import {
    AddToNonContactableStudents,
    AssignStudentModal,
    BlockModal,
    ChangeStudentStatusModal,
    HighPriorityModal,
} from './modals'

import { EditTimer } from '@components/StudentTimer/EditTimer'
import { SectorCell } from '@partials/admin/student/components'
import { ColumnDef } from '@tanstack/react-table'
import {
    getStudentWorkplaceAppliedIndustry,
    setLink,
    studentsListWorkplace,
} from '@utils'
import { WorkplaceWorkIndustriesType } from 'redux/queryTypes'
import { IndustryCellInfo } from '../Industries'
import { RTOCellInfo } from '../rto/components'
import { InterviewModal } from '../workplace/modals'

export const UrgentStudents = () => {
    const router = useRouter()

    // hooks

    const [modal, setModal] = useState<ReactElement | null>(null)

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    const { isSuccess, isLoading, data, isError, isFetching } =
        SubAdminApi.Student.useUrgentStudents(
            {
                skip: itemPerPage * page - itemPerPage,
                limit: itemPerPage,
            },
            {
                refetchOnMountOrArgChange: true,
            }
        )

    const onModalCancelClicked = () => {
        setModal(null)
    }
    const onAssignStudentClicked = (student: Student) => {
        setModal(
            <AssignStudentModal
                student={student}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    const onNonContactableStudents = (student: Student) => {
        setModal(
            <AddToNonContactableStudents
                student={student}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    const onChangeStatus = (student: Student) => {
        setModal(
            <ChangeStudentStatusModal
                student={student}
                onCancel={onModalCancelClicked}
            />
        )
    }

    const onDateClick = (student: Student) => {
        setModal(
            <EditTimer
                studentId={student?.user?.id}
                date={student?.expiryDate}
                onCancel={onModalCancelClicked}
            />
        )
    }

    const onBlockClicked = (student: Student) => {
        setModal(<BlockModal item={student} onCancel={onModalCancelClicked} />)
    }
    const onMarkAsHighPriorityClicked = (studetnt: Student) => {
        setModal(
            <HighPriorityModal
                item={studetnt}
                onCancel={onModalCancelClicked}
                // setRefetchStudents={setRefetchStudents}
            />
        )
    }

    const onInterviewClicked = (student: Student) => {
        setModal(
            <InterviewModal
                student={student}
                onCancel={onModalCancelClicked}
                workplace={Number(student?.workplace[0]?.id)}
                workIndustry={Number(
                    getStudentWorkplaceAppliedIndustry(
                        student?.workplace[0]
                            ?.industries as WorkplaceWorkIndustriesType[]
                    )?.id
                )}
            />
        )
    }

    const tableActionOptions = (student: any) => {
        return [
            {
                text: 'View',
                onClick: (student: Student) => {
                    router.push(
                        `/portals/sub-admin/students/${student?.id}/detail`
                    )
                    setLink('subadmin-student', router)
                },
                Icon: FaEye,
            },
            {
                text: student?.nonContactable
                    ? 'Add to Contactable'
                    : 'Add to Not Contactable',
                onClick: (student: Student) =>
                    onNonContactableStudents(student),
                Icon: MdBlock,
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
    }

    const Columns: ColumnDef<StudentSubAdmin>[] = [
        {
            header: () => 'Name',
            accessorKey: 'user',
            cell: (info) => {
                return <StudentCellInfo student={info.row.original} call />
            },
        },
        {
            header: () => 'RTO',
            accessorKey: 'rto',
            cell: ({ row }: any) => <RTOCellInfo rto={row.original?.rto} />,
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
            header: () => <span>Expiry Date</span>,
            cell: (info) => (
                <StudentExpiryDaysLeft
                    expiryDate={info.row.original?.expiryDate}
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
        {
            header: () => 'Action',
            accessorKey: 'Action',
            cell: ({ row }) => {
                const tableActionOption = tableActionOptions(row.original)
                return (
                    <TableAction
                        options={tableActionOption}
                        rowItem={row.original}
                    />
                )
            },
        },
    ]

    return (
        <div>
            {modal}
            {isError && <TechnicalError />}
            <Card noPadding>
                {isLoading || isFetching ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data && data?.data?.length && !isError ? (
                    <Table
                        columns={Columns}
                        data={data?.data}
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
                            description={'You have not approved Students yet'}
                            height={'50vh'}
                        />
                    )
                )}
            </Card>
        </div>
    )
}
