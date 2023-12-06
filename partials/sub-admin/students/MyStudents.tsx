import { useRouter } from 'next/router'

// Icons
import { FaEye } from 'react-icons/fa'

// components
import {
    Card,
    CaseOfficerAssignedStudent,
    EmptyData,
    InitialAvatar,
    LoadingAnimation,
    StudentExpiryDaysLeft,
    StudentSubAdmin,
    Table,
    TableAction,
    Typography,
    UserCreatedAt,
    Button,
} from '@components'
import { StudentCellInfo } from './components'

import { TechnicalError } from '@components/ActionAnimations/TechnicalError'
import { useGetSubAdminMyStudentsQuery } from '@queries'
import { Student } from '@types'
import { ReactElement, useEffect, useState } from 'react'
import { MdBlock, MdPriorityHigh } from 'react-icons/md'
import {
    AddToNonContactableStudents,
    BlockModal,
    HighPriorityModal,
    UnAssignStudentModal,
} from './modals'

import { useActionModal } from '@hooks'
import { SectorCell } from '@partials/admin/student/components'
import { ColumnDef } from '@tanstack/react-table'
import {
    calculateRemainingDays,
    getUserCredentials,
    setLink,
    studentsListWorkplace,
} from '@utils'
import { RiLockPasswordFill } from 'react-icons/ri'
import { IndustryCellInfo } from '../Industries'
import moment from 'moment'
import { AiOutlineWarning } from 'react-icons/ai'
import { FaFileExport } from 'react-icons/fa'

export const MyStudents = () => {
    const router = useRouter()
    const userId = getUserCredentials()?.id
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [refetchStudents, setRefetchStudents] = useState(false)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    // hooks
    const { passwordModal, onViewPassword } = useActionModal()

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    const { isLoading, isFetching, data, isError, refetch } =
        useGetSubAdminMyStudentsQuery({
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        })

    useEffect(() => {
        if (refetchStudents) {
            refetch()
        }
    }, [refetchStudents, data])

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

    const onNonContactableStudents = (student: Student) => {
        setModal(
            <AddToNonContactableStudents
                student={student}
                onCancel={() => onModalCancelClicked()}
            />
        )
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

    const tableActionOptions = (student: any) => {
        return [
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
                text: student?.nonContactable
                    ? 'Add to Contactable'
                    : 'Add to Not Contactable',
                onClick: (student: Student) =>
                    onNonContactableStudents(student),
                Icon: MdBlock,
            },
            {
                text: 'Un Assign',
                onClick: (student: Student) => onAssignStudentClicked(student),
                Icon: MdBlock,
                color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
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
        ]
    }

    const Columns: ColumnDef<StudentSubAdmin>[] = [
        {
            header: () => 'Name',
            accessorKey: 'user',
            cell: ({ row }: any) => {
                return <StudentCellInfo student={row.original} call />
            },
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
            accessorKey: 'expiry',
            header: () => <span>Expiry Date</span>,
            cell: (info) => (
                <StudentExpiryDaysLeft
                    expiryDate={info.row.original?.expiryDate}
                />
            ),
        },
        {
            header: () => 'Progress',
            accessorKey: 'progress',
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
            cell: ({ row }: any) => {
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
            {modal && modal}
            {passwordModal}
            <Card noPadding>
                {isError && <TechnicalError />}

                {data && data?.data.length ? (
                    <div className="flex justify-end">
                        <a
                            href={`${process.env.NEXT_PUBLIC_END_POINT}/subadmin/students/download-list/${userId}
                        `}
                            target="_blank"
                            rel="noreferrer"
                            className=""
                        >
                            {' '}
                            <Button
                                text={'Export'}
                                variant={'action'}
                                Icon={FaFileExport}
                            />
                        </a>
                    </div>
                ) : null}
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
