import {
    ActionButton,
    Card,
    EmptyData,
    LoadingAnimation,
    StudentStatusProgressCell,
    StudentSubAdmin,
    Table,
    TableAction,
    TableActionOption,
    TableChildrenProps,
    TechnicalError,
    Typography,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'

import { EditTimer } from '@components/StudentTimer/EditTimer'
import { useActionModal } from '@hooks'
import { BulkDeleteModal } from '@modals'
import { AdminApi, commonApi } from '@queries'
import { Student, UserStatus } from '@types'
import {
    WorkplaceCurrentStatus,
    checkStudentStatus,
    checkWorkplaceStatus,
    getStudentWorkplaceAppliedIndustry,
    studentsListWorkplace,
} from '@utils'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { RiLockPasswordFill } from 'react-icons/ri'
import { IndustryCell } from '../industry/components'
import { RtoCellInfo } from '../rto/components'
import { SectorCell, StudentCellInfo, StudentIndustries } from './components'
import { ChangeStatusModal, DeleteModal } from './modals'

export const ArchivedStudent = () => {
    const router = useRouter()
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [modal, setModal] = useState<any | null>(null)

    useEffect(() => {
        setPage(Number(router.query.page))
        setItemPerPage(Number(router.query.pageSize))
    }, [router])

    // hooks
    const { passwordModal, onViewPassword } = useActionModal()

    const { isLoading, isFetching, data, isError, refetch } =
        AdminApi.Students.useListQuery(
            {
                search: `status:${UserStatus.Archived}`,
                skip: itemPerPage * page - itemPerPage,
                limit: itemPerPage,
            },
            {
                refetchOnMountOrArgChange: true,
            }
        )

    const [bulkAction, resultBulkAction] = commonApi.useBulkStatusMutation()

    const onModalCancelClicked = () => {
        setModal(null)
    }

    const onDeleteClicked = (item: Student) => {
        setModal(
            <DeleteModal item={item} onCancel={() => onModalCancelClicked()} />
        )
    }

    const onChangeStatus = (student: Student) => {
        setModal(
            <ChangeStatusModal
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

    const onBulkDeleteClicked = (ids: number[]) => {
        setModal(
            <BulkDeleteModal onCancel={onModalCancelClicked} usersIds={ids} />
        )
    }

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'View',
            onClick: (student: any) => {
                router.push(`/portals/admin/student/${student?.id}/detail`)
            },
            Icon: FaEye,
        },
        {
            text: 'Edit',
            onClick: (row: any) => {
                router.push(`/portals/admin/student/edit-student/${row?.id}`)
            },
            Icon: FaEdit,
        },
        {
            text: 'View Password',
            onClick: (student: Student) => onViewPassword(student),
            Icon: RiLockPasswordFill,
        },
        {
            text: 'Change Expiry',
            onClick: (student: Student) => onDateClick(student),
            Icon: FaEdit,
        },
        {
            text: 'Change Status',
            onClick: (student: Student) => {
                onChangeStatus(student)
            },
            Icon: FaEdit,
        },
        {
            text: 'Delete',
            onClick: (student: Student) => onDeleteClicked(student),
            Icon: FaTrash,
            color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        },
    ]

    const columns: ColumnDef<StudentSubAdmin>[] = [
        {
            accessorKey: 'user.name',
            cell: (info) => {
                return <StudentCellInfo student={info.row.original} call />
            },
            header: () => <span>Student</span>,
        },
        {
            accessorKey: 'rto',
            header: () => <span>RTO</span>,
            cell: (info) => {
                return <RtoCellInfo rto={info.row.original.rto} short />
            },
        },
        {
            accessorKey: 'industry',
            header: () => <span>Industry</span>,
            // cell: (info: any) => {
            //     const industry = info.row.original?.industries

            //     const appliedIndustry = studentsListWorkplace(
            //         info.row.original?.workplace
            //     )

            //     return industry && industry?.length > 0 ? (
            //         <IndustryCell industry={industry[0]} />
            //     ) : info.row.original?.workplace &&
            //       info.row.original?.workplace?.length > 0 &&
            //       appliedIndustry ? (
            //         <IndustryCell industry={appliedIndustry} />
            //     ) : (
            //         <Typography center>N/A</Typography>
            //     )
            // },
            cell: (info) => (
                <StudentIndustries
                    industries={info.row.original?.industries}
                    workplace={info.row.original?.workplace}
                />
            ),
        },
        {
            accessorKey: 'sectors',
            header: () => <span>Sectors</span>,
            cell: (info) => {
                return <SectorCell student={info.row.original} />
            },
        },

        {
            accessorKey: 'expiry',
            header: () => <span>Expiry Date</span>,
            cell: (info) => (
                <>
                    <Typography variant={'small'} color={'text-primary'}>
                        <span className="font-semibold whitespace-pre">
                            {moment(
                                info?.row?.original?.oldExpiry ||
                                    info?.row?.original?.expiryDate
                            ).format('Do MMM YYYY')}
                        </span>
                    </Typography>
                </>
            ),
        },
        {
            accessorKey: 'expiry',
            header: () => <span>Days Expired</span>,
            cell: (info) => {
                var marchFirst = new Date(
                    info?.row?.original?.oldExpiry ||
                        info?.row?.original?.expiryDate
                )

                // Get today's date
                var today = new Date()

                // Calculate the difference in milliseconds between today and March 1st
                var timeDifference = today.getTime() - marchFirst.getTime()

                // Convert milliseconds to days
                var daysPassed = Math.ceil(timeDifference / (1000 * 3600 * 24))

                return info.row.original?.studentStatus === 'expired' &&
                    marchFirst < new Date() ? (
                    <Typography variant={'small'} color="text-red-400">
                        <span className="font-medium whitespace-pre">
                            Expired{' '}
                            <span className="font-bold text-red-600">
                                {daysPassed}
                            </span>{' '}
                            days ago
                        </span>
                    </Typography>
                ) : (
                    '---'
                )
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
                        assigned={
                            workplace?.assignedTo || row?.original?.subadmin
                        }
                        step={studentStatus}
                        appliedIndustry={appliedIndustry}
                    />
                )
                // return industries?.length > 0 ? (
                //     <StudentStatusProgressCell step={studentStatus} />
                // ) : (
                //     <StudentStatusProgressCell step={3} />
                // )
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
            cell: (info) => {
                return (
                    <>
                        <Typography variant={'small'} color={'text-gray-600'}>
                            <span className="font-semibold whitespace-pre">
                                {moment(info?.row?.original?.createdAt).format(
                                    'Do MMM YYYY'
                                )}
                            </span>
                        </Typography>
                        <Typography variant={'small'} color={'text-gray-600'}>
                            <span className="font-semibold whitespace-pre">
                                {moment(info?.row?.original?.createdAt).format(
                                    'hh:mm:ss a'
                                )}
                            </span>
                        </Typography>
                    </>
                )
            },
        },
        {
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: (info: any) => {
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

    const quickActionsElements = {
        id: 'id',
        individual: (student: StudentSubAdmin) => (
            <div className="flex gap-x-2">
                <ActionButton
                    onClick={() => {
                        onDateClick(student)
                    }}
                >
                    Change Expiry
                </ActionButton>

                <ActionButton
                    Icon={FaTrash}
                    variant="error"
                    onClick={() => {
                        onDeleteClicked(student)
                    }}
                >
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
        <>
            {modal}
            {passwordModal && passwordModal}
            <div className="flex flex-col gap-y-4 mb-32">
                <PageHeading
                    title={'Archived Students'}
                    subtitle={'List of Archived Students'}
                />

                <Card noPadding>
                    {isError && <TechnicalError />}
                    {isLoading || isFetching ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : data && data?.data.length ? (
                        <Table
                            columns={columns}
                            data={data.data}
                            quickActions={quickActionsElements}
                            enableRowSelection
                        >
                            {({
                                table,
                                pagination,
                                pageSize,
                                quickActions,
                            }: TableChildrenProps) => {
                                return (
                                    <div>
                                        <div className="p-6 mb-2 flex justify-between">
                                            {pageSize
                                                ? pageSize(
                                                      itemPerPage,
                                                      setItemPerPage,
                                                      data?.data?.length
                                                  )
                                                : null}
                                            <div className="flex gap-x-2">
                                                {quickActions}
                                                {pagination
                                                    ? pagination(
                                                          data?.pagination,
                                                          setPage
                                                      )
                                                    : null}
                                            </div>
                                        </div>
                                        <div
                                            className="px-6 overflow-x-auto remove-scrollbar"
                                            id={'studentScrollId'}
                                        >
                                            {table}
                                        </div>
                                        {data?.data?.length > 10 && (
                                            <div className="p-6 mb-2 flex justify-between">
                                                {pageSize
                                                    ? pageSize(
                                                          itemPerPage,
                                                          setItemPerPage,
                                                          data?.data?.length
                                                      )
                                                    : null}
                                                <div className="flex gap-x-2">
                                                    {quickActions}
                                                    {pagination
                                                        ? pagination(
                                                              data?.pagination,
                                                              setPage
                                                          )
                                                        : null}
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
                                title={'No Archived RTO!'}
                                description={
                                    'You have not archived any RTO request yet'
                                }
                                height={'50vh'}
                            />
                        )
                    )}
                </Card>
            </div>
        </>
    )
}
