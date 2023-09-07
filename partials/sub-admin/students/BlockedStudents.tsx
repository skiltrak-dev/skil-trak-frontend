import { useRouter } from 'next/router'
import { ReactElement } from 'react'

// Icons
import { FaEye, FaTrash } from 'react-icons/fa'

// components
import {
    ActionButton,
    Card,
    CaseOfficerAssignedStudent,
    EmptyData,
    InitialAvatar,
    LoadingAnimation,
    StudentExpiryDaysLeft,
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
import { useEffect, useState } from 'react'
import { MdBlock, MdDelete } from 'react-icons/md'
import { AcceptModal, AssignStudentModal, DeleteModal } from './modals'

import { BulkDeleteModal } from '@modals'
import { SectorCell } from '@partials/admin/student/components'
import { ColumnDef } from '@tanstack/react-table'
import { checkListLength, setLink, studentsListWorkplace } from '@utils'
import { AiFillCheckCircle } from 'react-icons/ai'
import { CgUnblock } from 'react-icons/cg'
import { RiLockPasswordFill } from 'react-icons/ri'
import { IndustryCellInfo, IndustrySubAdmin } from '../Industries'

export const BlockedStudents = () => {
    const router = useRouter()

    const [modal, setModal] = useState<ReactElement | null>(null)

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    // hooks
    const { passwordModal, onViewPassword } = useActionModal()

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    const { isLoading, isFetching, data, isError } =
        SubAdminApi.Student.useList({
            search: `status:${UserStatus.Blocked}`,
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        })

    const onModalCancelClicked = () => {
        setModal(null)
    }

    const onAcceptClicked = (student: Student) => {
        setModal(<AcceptModal item={student} onCancel={onModalCancelClicked} />)
    }

    const onAssignStudentClicked = (student: Student) => {
        setModal(
            <AssignStudentModal
                student={student}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    const onDeleteClicked = (student: Student) => {
        setModal(
            <DeleteModal
                item={student}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    const onBulkDeleteClicked = (ids: number[]) => {
        setModal(
            <BulkDeleteModal onCancel={onModalCancelClicked} usersIds={ids} />
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
            text: 'View Password',
            onClick: (student: Student) => onViewPassword(student),
            Icon: RiLockPasswordFill,
        },
        {
            text: 'Un Block',
            onClick: (student: Student) => onAcceptClicked(student),
            Icon: AiFillCheckCircle,
            color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        },
        {
            text: 'Delete',
            onClick: (student: Student) => onDeleteClicked(student),
            Icon: MdDelete,
            color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        },
        {
            text: 'Assign to me',
            onClick: (student: Student) => onAssignStudentClicked(student),
            Icon: MdBlock,
            color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        },
    ]

    const Columns: ColumnDef<StudentSubAdmin>[] = [
        {
            header: () => 'Name',
            accessorKey: 'user',
            cell: ({ row }) => (
                <div id="student-profile">
                    <StudentCellInfo student={row.original} />
                </div>
            ),
        },
        {
            header: () => 'RTO',
            accessorKey: 'rto',
            cell({ row }) {
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
            cell: (info) => {
                const industry = info.row.original?.industries

                const appliedIndustry = studentsListWorkplace(
                    info.row.original?.workplace
                )

                return industry && industry?.length > 0 ? (
                    <IndustryCellInfo
                        industry={industry[0] as IndustrySubAdmin}
                    />
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
            cell: ({ row }) => {
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
            accessorKey: 'progress',
            header: () => <span>Progress</span>,
            cell: ({ row }) => (
                <CaseOfficerAssignedStudent student={row.original} />
            ),
        },
        {
            accessorKey: 'createdAt',
            header: () => <span>Created At</span>,
            cell: ({ row }) => (
                <UserCreatedAt createdAt={row.original?.createdAt} />
            ),
        },
        {
            header: () => 'Action',
            accessorKey: 'Action',
            cell: ({ row }) => {
                const length = checkListLength<StudentSubAdmin>(data?.data)
                return (
                    <TableAction
                        options={tableActionOptions}
                        rowItem={row.original}
                        lastIndex={length.includes(row?.index)}
                    />
                )
            },
        },
    ]

    const quickActionsElements = {
        id: 'id',
        individual: (id: StudentSubAdmin) => (
            <div className="flex gap-x-2">
                <ActionButton>Sub Admins</ActionButton>
                <ActionButton Icon={CgUnblock} variant="warning">
                    Unblock
                </ActionButton>
                <ActionButton Icon={FaTrash} variant="error">
                    Delete
                </ActionButton>
            </div>
        ),
        common: (ids: StudentSubAdmin[]) => (
            <div className="flex gap-x-2">
                <ActionButton
                    Icon={FaTrash}
                    variant="error"
                    onClick={() => {
                        const arrayOfIds = ids.map((id: any) => id?.user.id)
                        onBulkDeleteClicked(arrayOfIds)
                    }}
                >
                    Delete
                </ActionButton>
            </div>
        ),
    }

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
                        quickActions={quickActionsElements}
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
                                        className="px-6 overflow-auto remove-scrollbar"
                                    >
                                        {table}
                                    </div>
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
