import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout, Student } from '@types'
import React, { ReactElement, useState } from 'react'
import { SubAdminApi } from '@queries'
import {
    getStudentWorkplaceAppliedIndustry,
    getUserCredentials,
    removeEmptyValues,
    setLink,
} from '@utils'
import { useRouter } from 'next/router'
import {
    AddToNonContactableStudents,
    AssignStudentModal,
    BlockModal,
    ChangeStudentStatusModal,
    HighPriorityModal,
} from '@partials/sub-admin/students/modals'
import { EditTimer } from '@components/StudentTimer/EditTimer'
import { InterviewModal } from '@partials/sub-admin/workplace/modals'
import { WorkplaceWorkIndustriesType } from 'redux/queryTypes'
import { FaEdit, FaEye, FaUsers } from 'react-icons/fa'
import { MdBlock, MdPriorityHigh } from 'react-icons/md'
import { ColumnDef } from '@tanstack/react-table'
import {
    StudentCellInfo,
    SubadminStudentIndustries,
} from '@partials/sub-admin/students'
import { StudentRtoCellInfo } from '@components/Appointment/AppointmentModal'
import { SectorCell } from '@partials/admin/student/components'
import {
    Card,
    CaseOfficerAssignedStudent,
    EmptyData,
    LoadingAnimation,
    Select,
    StudentExpiryDaysLeft,
    Table,
    TableAction,
    TechnicalError,
    UserCreatedAt,
} from '@components'

// useDepartmentStudents
export const FilterDepartmentStudents = ({
    setPage,
    itemPerPage,
    setItemPerPage,
    data,
}: any) => {
    const router = useRouter()
    const [modal, setModal] = useState<ReactElement | null>(null)


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
                text: 'Old Profile',
                onClick: (student: Student) => {
                    router.push(
                        `/portals/sub-admin/students/${student.id}?tab=overview`
                    )
                },
                Icon: FaEye,
            },
            {
                text: student?.subadmin ? 'Un Assign' : 'Assign to me',
                onClick: (student: Student) => onAssignStudentClicked(student),
                Icon: MdBlock,
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
                text: 'Interview',
                onClick: (student: Student) => onInterviewClicked(student),
                Icon: FaUsers,
            },
            {
                text: 'Change Status',
                onClick: (student: Student) => onChangeStatus(student),
                Icon: FaEdit,
            },
            {
                text: 'Block',
                onClick: (student: Student) => onBlockClicked(student),
                Icon: MdBlock,
                color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
            },
            {
                text: student?.isHighPriority
                    ? 'Remove Mark High Priority'
                    : 'Mark High Priority',
                onClick: (student: Student) =>
                    onMarkAsHighPriorityClicked(student),
                Icon: MdPriorityHigh,
                color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
            },
            {
                text: 'Change Expiry',
                onClick: (student: Student) => onDateClick(student),
                Icon: FaEdit,
            },
        ]
    }

    const Columns: ColumnDef<Student>[] = [
        {
            header: () => 'Name',
            accessorKey: 'user',
            cell: (info) => (
                <StudentCellInfo student={info.row.original} call />
            ),
        },
        {
            header: () => 'RTO',
            accessorKey: 'rto',
            cell: ({ row }: any) => (
                <StudentRtoCellInfo rto={row.original?.rto} />
            ),
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
            accessorKey: 'progress',
            header: () => <span>Progress</span>,
            cell: ({ row }) => (
                <CaseOfficerAssignedStudent student={row.original} />
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
            {data.isError && <TechnicalError />}

            <Card noPadding>
                {data.isLoading || data.isFetching ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data && data?.data?.data?.length && !data.isError ? (
                    <>
                        <Table
                            columns={Columns}
                            data={data?.data?.data}
                            enableRowSelection
                            // awaitingAgreementBeyondSevenDays={
                            //     filterAwaitingAgreementBeyondSevenDays
                            // }
                            // findCallLogsUnanswered={findCallLogsUnanswered}
                            // findExpiringInNext45Days={findExpiringInNext45Days}
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
                                                data?.data?.data?.length
                                            )}
                                            <div className="flex gap-x-2">
                                                {quickActions}
                                                {pagination(
                                                    data?.data?.pagination,
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
                                        {data?.data?.data?.length > 10 && (
                                            <div className="p-6 mb-2 flex justify-between">
                                                {pageSize(
                                                    itemPerPage,
                                                    setItemPerPage,
                                                    data?.data?.data?.length
                                                )}
                                                <div className="flex gap-x-2">
                                                    {quickActions}
                                                    {pagination(
                                                        data?.data?.pagination,
                                                        setPage
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )
                            }}
                        </Table>
                    </>
                ) : (
                    !data?.isError && (
                        <EmptyData
                            title={'No Filtered Students'}
                            description={'You have not filtered Students yet'}
                            height={'50vh'}
                        />
                    )
                )}
            </Card>
        </div>
    )
}
