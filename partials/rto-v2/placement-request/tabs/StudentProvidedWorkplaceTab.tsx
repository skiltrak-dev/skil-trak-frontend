import {
    ActionButton,
    Button,
    Card,
    CaseOfficerAssignedStudent,
    EmptyData,
    LoadingAnimation,
    StudentExpiryDaysLeft,
    Table,
    TableAction,
    TableActionOption,
    TechnicalError,
    Typography,
    UserCreatedAt,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { FaCheckCircle, FaEdit, FaEye } from 'react-icons/fa'

import { EditTimer } from '@components/StudentTimer/EditTimer'
import { ChangeStudentStatusModal } from '@partials/sub-admin/students/modals'
import { RtoApi, RtoV2Api } from '@queries'
import { Student, StudentIssue } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { MdBlock } from 'react-icons/md'
import {
    AlertTriangle,
    Building2,
    Calendar,
    Clock,
    Flag,
    GraduationCap,
    User,
} from 'lucide-react'
import { CountCard } from '@partials/rto-v2/cards/CountCard'
import { PriorityBadge, ResolveIssuesCompletedModal } from '@partials/rto-v2'
import { FaRegCheckCircle } from 'react-icons/fa'
import moment from 'moment'
import { ellipsisText, studentsListWorkplace } from '@utils'
import { SectorCell, StudentCellInfo } from '@partials/rto/student/components'
import { SubadminStudentIndustries } from '@partials/sub-admin/students'
import { CreateStudentNote } from '@partials/common/Notes/forms'
import { LuMessageSquare } from 'react-icons/lu'

export const StudentProvidedWorkplaceTab = () => {
    const router = useRouter()
    const [modal, setModal] = useState<ReactElement | null>(null)

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    // RtoV2Api.PlacementRequests.useStudentPlacementRequestList()
    const { isLoading, data, isError, refetch } =
        RtoV2Api.PlacementRequests.useStudentPlacementRequestList({
            search: `studentProvidedWorkplace:${true}`,
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        })
    const count = RtoApi.Students.useRtoResolveIssuesStudentsCount()
    const onModalCancelClicked = () => setModal(null)
    const onChangeStatus = (student: Student) => {
        setModal(
            <ChangeStudentStatusModal
                student={student}
                onCancel={onModalCancelClicked}
            />
        )
    }
    const onAddNote = (student: Student) => {
        setModal(
            <div
                className={`bg-[#00000050]  w-[calc(100%-80%)]
                     h-full flex items-center justify-center gap-x-2 fixed top-[4.4rem] right-0 z-40`}
            >
                <CreateStudentNote
                    studentId={student?.id}
                    onCancel={onModalCancelClicked}
                    receiverId={student?.user?.id}
                />
            </div>
        )
    }




    const tableActionOptions = (student: Student) => [
        {
            text: 'View',
            onClick: (student: Student) =>
                router.push(`/portals/rto/students/${student.id}?tab=overview`),
            Icon: FaEye,
        },
        // {
        //     text: 'Edit',
        //     onClick: (student: Student) =>
        //         router.push(`/portals/rto/students/${student.id}/edit-student`),
        //     Icon: FaEye,
        // },
        // {
        //     text: student?.rtoCoordinator
        //         ? 'Change Coordinator'
        //         : 'Assign Coordinator',
        //     onClick: (student: Student) => onAssignCoordinatorClicked(student),
        //     Icon: FaUserPlus,
        // },
        // {
        //     text: 'Block',
        //     onClick: (student: Student) => onBlockClicked(student),
        //     Icon: MdBlock,
        //     color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        // },
        {
            text: 'Change Status',
            onClick: (student: Student) => onChangeStatus(student),
            Icon: FaEdit,
        },
        {
            text: 'Add Note',
            onClick: (student: Student) => onAddNote(student),
            Icon: LuMessageSquare,
        },
    ]

    const columns: ColumnDef<Student>[] = [
        {
            accessorKey: 'user.name',
            cell: (info) => (
                <StudentCellInfo student={info.row.original} call />
            ),
            header: () => <span>Student</span>,
        },
        {
            accessorKey: 'progress',
            header: () => <span>Status</span>,
            cell: ({ row }) => (
                <CaseOfficerAssignedStudent student={row.original} />
            ),
        },
        {
            accessorKey: 'sectors',
            header: () => <span>Sectors</span>,
            cell: (info) => <SectorCell student={info.row.original} />,
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
                    <SubadminStudentIndustries
                        workplace={info.row.original?.workplace}
                        industries={info.row.original?.industries}
                    />
                ) : info.row.original?.workplace &&
                    info.row.original?.workplace?.length > 0 &&
                    appliedIndustry ? (
                    <SubadminStudentIndustries
                        workplace={info.row.original?.workplace}
                        industries={info.row.original?.industries}
                    />
                ) : (
                    <Typography center>---</Typography>
                )
            },
        },

        // {
        //     accessorKey: 'expiry',
        //     header: () => <span>Day Left</span>,
        //     cell: (info) => (
        //         <StudentExpiryDaysLeft
        //             expiryDate={info.row.original?.expiryDate}
        //         />
        //     ),
        // },
        // {
        //     accessorKey: 'batch',
        //     header: () => <span>Batch</span>,
        //     cell: ({ row }) => (
        //         <Typography whiteSpacePre variant="small" medium>
        //             {' '}
        //             {row?.original?.batch}{' '}
        //         </Typography>
        //     ),
        // },

        {
            accessorKey: 'assigned',
            header: () => <span>Assigned Coordinator</span>,
            cell: ({ row }: any) =>
                row.original?.rtoCoordinator ? (
                    <div>
                        <Typography variant="label">
                            {row.original?.rtoCoordinator?.user?.name}
                        </Typography>
                        <Typography variant="small" color={'text-gray-400'}>
                            {row.original?.rtoCoordinator?.user?.email}
                        </Typography>
                        <Typography variant="small" color={'text-gray-400'}>
                            {row.original?.rtoCoordinator?.phone}
                        </Typography>
                    </div>
                ) : (
                    '----'
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
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: (info) => {
                const tableActionOption = tableActionOptions(info.row.original)
                return (
                    <div className="flex gap-x-1 items-center">
                        <TableAction
                            options={tableActionOption}
                            rowItem={info.row.original}
                        />
                    </div>
                )
            },
        },
    ]

    const quickActionsElements = {
        id: 'id',
        individual: (id: Student) => (
            <div className="flex gap-x-2">
                <ActionButton Icon={FaEdit}>Edit</ActionButton>
                <ActionButton>Sub Admins</ActionButton>
                <ActionButton Icon={MdBlock} variant="error">
                    Block
                </ActionButton>
            </div>
        ),
        common: (ids: Student[]) => (
            <ActionButton Icon={MdBlock} variant="error">
                Block
            </ActionButton>
        ),
    }


    return (
        <>
            {modal && modal}
            <div className="flex flex-col gap-y-4 mb-32">
                <Card noPadding>
                    {isError && <TechnicalError />}
                    {isLoading ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : data && data?.data.length ? (
                        <Table
                            columns={columns}
                            data={data.data}
                            quickActions={quickActionsElements}
                        // enableRowSelection
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
                                        <div className="px-6 overflow-auto">
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
                                title={'No Open Issue!'}
                                description={'There is no issue request yet'}
                                height={'50vh'}
                            />
                        )
                    )}
                </Card>
            </div>
        </>
    )
}
