import {
    Button,
    Card,
    Table,
    EmptyData,
    Typography,
    TableAction,
    ActionButton,
    TechnicalError,
    StudentSubAdmin,
    LoadingAnimation,
    TableActionOption,
    TableChildrenProps,
    StudentExpiryDaysLeft,
    CaseOfficerAssignedStudent,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { FaEdit, FaEye, FaFileExport } from 'react-icons/fa'

import { RtoCellInfo } from '@partials/admin/rto/components'
import { AdminApi } from '@queries'
import { Student, UserStatus } from '@types'
import { checkListLength, setLink, studentsListWorkplace } from '@utils'
import { useRouter } from 'next/router'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import { MdBlock } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
import { IndustryCell } from '../industry/components'
import { SectorCell, StudentCellInfo } from './components'
import {
    ArchiveModal,
    BlockModal,
    BlockMultiStudentsModal,
    ChangeStatusModal,
} from './modals'

// hooks
import { EditTimer } from '@components/StudentTimer/EditTimer'
import { useActionModal } from '@hooks'
import moment from 'moment'

export const ApprovedStudent = () => {
    const router = useRouter()
    const [modal, setModal] = useState<ReactElement | null>(null)

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    // hooks
    const { passwordModal, onViewPassword } = useActionModal()

    const { isLoading, isFetching, data, isError, refetch } =
        AdminApi.Students.useListQuery(
            {
                search: `status:${UserStatus.Approved}`,
                skip: itemPerPage * page - itemPerPage,
                limit: itemPerPage,
            },
            { refetchOnMountOrArgChange: true }
        )

    const onModalCancelClicked = useCallback(() => {
        setModal(null)
    }, [])
    const onBlockClicked = (student: Student) => {
        setModal(<BlockModal item={student} onCancel={onModalCancelClicked} />)
    }

    const onBlockMultiStudents = (student: Student[]) => {
        setModal(
            <BlockMultiStudentsModal
                onCancel={onModalCancelClicked}
                student={student}
            />
        )
    }

    const onArchiveClicked = (student: Student) => {
        setModal(
            <ArchiveModal item={student} onCancel={onModalCancelClicked} />
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

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'View',
            onClick: (student: any) => {
                router.push(
                    `/portals/admin/student/${student?.id}?tab=overview`
                )
                setLink('student', router)
            },
            Icon: FaEye,
        },
        {
            text: 'Edit',
            onClick: (student: Student) => {
                router.push(
                    `/portals/admin/student/edit-student/${student?.id}`
                )
            },
            Icon: FaEdit,
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
            text: 'Archive',
            onClick: (student: Student) => onArchiveClicked(student),
            Icon: MdBlock,
            color: 'text-red-400 hover:bg-red-100 hover:border-red-200',
        },
    ]

    const columns: ColumnDef<StudentSubAdmin>[] = [
        {
            accessorKey: 'user.name',
            cell: (info) => {
                return <StudentCellInfo student={info?.row?.original} call />
            },
            header: () => <span>Student</span>,
        },
        {
            accessorKey: 'rto',
            header: () => <span>RTO</span>,
            cell: (info) => {
                return <RtoCellInfo rto={info?.row?.original?.rto} short />
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
            cell: (info) => <SectorCell student={info.row.original} />,
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
            cell: (info) => {
                const length = checkListLength<StudentSubAdmin>(
                    data?.data as StudentSubAdmin[]
                )

                return (
                    <div className="flex gap-x-1 items-center">
                        <TableAction
                            options={tableActionOptions}
                            rowItem={info.row.original}
                            lastIndex={length.includes(info.row?.index)}
                        />
                    </div>
                )
            },
        },
    ]

    const quickActionsElements = {
        id: 'id',
        individual: (student: Student) => {
            return (
                <div className="flex gap-x-2">
                    <ActionButton
                        onClick={() => {
                            router.push(
                                `/portals/admin/student/${student?.id}?tab=overview`
                            )
                        }}
                    >
                        View
                    </ActionButton>
                    <ActionButton
                        Icon={FaEdit}
                        onClick={() => {
                            router.push(
                                `/portals/admin/student/edit-student/${student?.id}`
                            )
                        }}
                    >
                        Edit
                    </ActionButton>
                    <ActionButton
                        Icon={MdBlock}
                        variant="error"
                        onClick={() => {
                            onBlockClicked(student)
                        }}
                    >
                        Block
                    </ActionButton>
                </div>
            )
        },
        common: (student: Student[]) => (
            <ActionButton
                onClick={() => {
                    onBlockMultiStudents(student)
                }}
                Icon={MdBlock}
                variant="error"
            >
                Block
            </ActionButton>
        ),
    }

    return (
        <>
            {modal && modal}
            {passwordModal && passwordModal}
            <div className="flex flex-col gap-y-4">
                <div className="flex">
                    <PageHeading
                        title={'Approved Students'}
                        subtitle={'List of Approved Students'}
                    />
                    {data && data?.data.length ? (
                        <div className="">
                            <a
                                href={`${process.env.NEXT_PUBLIC_END_POINT}/admin/students/list/download
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
                </div>
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
                                        <div className=" overflow-x-scroll remove-scrollbar">
                                            <div className="px-6 w-full">
                                                {table}
                                            </div>
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
