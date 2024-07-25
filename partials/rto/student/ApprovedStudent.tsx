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
    TechnicalError,
    Typography,
    UserCreatedAt,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { FaEdit, FaEye, FaFileExport, FaUserPlus } from 'react-icons/fa'

import { EditTimer } from '@components/StudentTimer/EditTimer'
import { ChangeStudentStatusModal } from '@partials/sub-admin/students/modals'
import { RtoApi, useGetRtoStudentsQuery } from '@queries'
import { Student, UserStatus } from '@types'
import { getUserCredentials, isBrowser, studentsListWorkplace } from '@utils'
import { saveAs } from 'file-saver'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { MdBlock, MdChangeCircle } from 'react-icons/md'
import { SectorCell, StudentCellInfo } from './components'
import { IndustryCell } from './components/IndustryCell'
import {
    ArchiveModal,
    AssignCoordinatorModal,
    BlockModal,
    RemoveCoordinator,
} from './modals'
import { AssignMultipleCoordinatorModal } from './modals/AssignMultipleCoordinatorModal'
export const ApprovedStudent = () => {
    const router = useRouter()
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [changeExpiryData, setChangeExpiryData] = useState(false)
    const [isExcelDownload, setIsExcelDownload] = useState<boolean>(false)
    const userId = getUserCredentials()?.id

    const exportList = RtoApi.Students.useExportStudentList(
        {
            status: `active`,
            userId,
        },
        { skip: !isExcelDownload }
    )

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const { isLoading, data, isError, refetch } = useGetRtoStudentsQuery({
        search: `status:${UserStatus.Approved}`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    useEffect(() => {
        if (changeExpiryData) {
            refetch()
        }
    }, [changeExpiryData])

    // Download excel
    useEffect(() => {
        if (exportList?.data?.file?.data && exportList?.isSuccess) {
            const buffer = Buffer.from(exportList.data.file.data)
            const blob = new Blob([buffer], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            })
            saveAs(blob)
            setIsExcelDownload(false)
        }
    }, [exportList?.data, exportList?.isSuccess])

    useEffect(() => {
        if (exportList?.isError) {
            setIsExcelDownload(false)
        }
    }, [exportList?.isError])

    const handleDownloadExcel = () => {
        setIsExcelDownload(true)
    }

    const onModalCancelClicked = () => setModal(null)

    const onBlockClicked = (student: Student) => {
        setModal(
            <BlockModal
                item={student}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    const onArchiveClicked = (student: Student) => {
        setModal(
            <ArchiveModal
                item={student}
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

    const onAssignCoordinatorClicked = (student: Student) => {
        setModal(
            <AssignCoordinatorModal
                studentId={student?.id}
                studentUser={student?.user}
                rtoCoordinatorId={student?.rtoCoordinator?.id}
                onCancel={onModalCancelClicked}
            />
        )
    }

    const onRemoveCoordinatorClicked = (student: Student) => {
        setModal(
            <RemoveCoordinator
                student={student}
                onCancel={onModalCancelClicked}
            />
        )
    }

    const onAddMultiStudentsCoordinatorClicked = (ids: number[]) => {
        setModal(
            <AssignMultipleCoordinatorModal
                ids={ids}
                onCancel={onModalCancelClicked}
            />
        )
    }

    const tableActionOptions = (student: Student) => {
        return [
            {
                text: 'View',
                onClick: (student: Student) =>
                    router.push(
                        `/portals/rto/students/${student.id}?tab=overview`
                    ),
                Icon: FaEye,
            },
            {
                text: 'Edit',
                onClick: (student: Student) =>
                    router.push(
                        `portals/rto/students/${student.id}/edit-student`
                    ),
                Icon: FaEye,
            },
            {
                text: student?.rtoCoordinator
                    ? 'Change Coordinator'
                    : 'Assign Coordinator',
                onClick: (student: Student) =>
                    onAssignCoordinatorClicked(student),
                Icon: FaUserPlus,
            },
            // {
            //     ...(student?.rtoCoordinator
            //         ? {
            //               text: 'Remove Coordinator',
            //               onClick: (student: Student) =>
            //                   onRemoveCoordinatorClicked(student),
            //               Icon: IoPersonRemoveSharp,
            //               color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
            //           }
            //         : {}),
            // },
            {
                text: 'Archive',
                onClick: (student: Student) => onArchiveClicked(student),
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
                text: 'Change Status',
                onClick: (student: Student) => onChangeStatus(student),
                Icon: FaEdit,
            },
            {
                text: 'Change Expiry',
                onClick: (student: Student) => onDateClick(student),
                Icon: FaEdit,
            },
        ]
    }

    const columns: ColumnDef<Student>[] = [
        {
            accessorKey: 'user.name',
            cell: (info) => {
                return <StudentCellInfo student={info.row.original} call />
            },
            header: () => <span>Student</span>,
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
                    <IndustryCell industry={industry[0]} />
                ) : info.row.original?.workplace &&
                  info.row.original?.workplace?.length > 0 &&
                  appliedIndustry ? (
                    <IndustryCell industry={appliedIndustry} />
                ) : (
                    <Typography center>N/A</Typography>
                )
            },
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
        individual: (student: Student) => (
            <div className="flex gap-x-2">
                <ActionButton
                    Icon={FaEdit}
                    onClick={() => {
                        router.push(
                            `portals/rto/students/${student?.id}/edit-student`
                        )
                    }}
                >
                    Edit
                </ActionButton>
                <ActionButton
                    Icon={MdBlock}
                    onClick={() => {
                        onBlockClicked(student)
                    }}
                    variant="error"
                >
                    Block
                </ActionButton>
                <ActionButton
                    Icon={MdChangeCircle}
                    variant="info"
                    onClick={() => {
                        onAssignCoordinatorClicked(student)
                    }}
                >
                    {student?.rtoCoordinator
                        ? 'Change Coordinator'
                        : 'Assign Coordinator'}
                </ActionButton>
            </div>
        ),
        common: (ids: Student[]) => (
            <ActionButton
                Icon={MdChangeCircle}
                variant="info"
                onClick={() => {
                    onAddMultiStudentsCoordinatorClicked(
                        ids?.map((stu: Student) => stu?.id)
                    )
                }}
            >
                Add Coordinator
            </ActionButton>
        ),
    }

    return (
        <>
            {modal && modal}
            <div className="flex flex-col gap-y-3 mb-32">
                <PageHeading
                    title={'Approved Students'}
                    subtitle={'List of Approved Students'}
                >
                    {data?.data && data?.data.length ? (
                        <Button
                            text={'Export'}
                            variant={'action'}
                            Icon={FaFileExport}
                            onClick={() => {
                                if (isBrowser()) {
                                    window.open(
                                        `${process.env.NEXT_PUBLIC_END_POINT}/rtos/students-list/download/${userId}?status=active`
                                    )
                                }
                            }}
                        />
                    ) : null}
                </PageHeading>

                <Card noPadding>
                    {isError && <TechnicalError />}
                    {isLoading ? (
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
                                        <div className="px-6 overflow-auto custom-scrollbar">
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
                                title={'No Approved Student!'}
                                description={
                                    'You have not approved any Student request yet'
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
