import {
    ActionButton,
    Button,
    Card,
    EmptyData,
    LoadingAnimation,
    StudentStatusProgressCell,
    StudentSubAdmin,
    Table,
    TableAction,
    TableActionOption,
    TechnicalError,
    Typography,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { Student, UserStatus } from '@types'
import { FaEdit, FaEye, FaFileExport, FaTrash } from 'react-icons/fa'

import { EditTimer } from '@components/StudentTimer/EditTimer'
import { ChangeStudentStatusModal } from '@partials/sub-admin/students/modals'
import { useGetRtoStudentsQuery } from '@queries'
import { checkStudentStatus, studentsListWorkplace } from '@utils'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { MdUnarchive } from 'react-icons/md'
import { IndustryCell, SectorCell, StudentCellInfo } from './components'
import { DeleteModal } from './modals'
import moment from 'moment'

export const ArchivedStudent = () => {
    const router = useRouter()
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [changeExpiryData, setChangeExpiryData] = useState(false)

    const { isLoading, data, isError, refetch } = useGetRtoStudentsQuery({
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

    const onDeleteClicked = (student: Student) => {
        setModal(
            <DeleteModal
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
                changeExpiryData={setChangeExpiryData}
            />
        )
    }

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'View',
            onClick: (student: Student) => {
                router.push(`/portals/rto/students/${student.id}`)
            },
            Icon: FaEye,
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
            text: 'Delete',
            onClick: (student: Student) => onDeleteClicked(student),
            Icon: FaTrash,
            color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        },
    ]

    const columns: ColumnDef<StudentSubAdmin>[] = [
        {
            accessorKey: 'user.name',
            cell: (info) => <StudentCellInfo student={info.row.original} />,
            header: () => <span>Student</span>,
        },
        {
            accessorKey: 'phone',
            header: () => <span>Phone</span>,
            cell: (info) => info.getValue(),
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
            accessorKey: 'progress',
            header: () => <span>Progress</span>,
            cell: ({ row }) => {
                const studentStatus = checkStudentStatus(
                    row.original?.studentStatus
                )

                return <StudentStatusProgressCell step={studentStatus} />
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
        individual: (id: StudentSubAdmin) => (
            <div className="flex gap-x-2">
                <ActionButton>Sub Admins</ActionButton>
                <ActionButton Icon={MdUnarchive} variant="warning">
                    Unarchive
                </ActionButton>
                <ActionButton Icon={FaTrash} variant="error">
                    Delete
                </ActionButton>
            </div>
        ),
        common: (ids: StudentSubAdmin[]) => (
            <div className="flex gap-x-2">
                <ActionButton Icon={MdUnarchive} variant="warning">
                    Unarchive
                </ActionButton>
                <ActionButton Icon={FaTrash} variant="error">
                    Delete
                </ActionButton>
            </div>
        ),
    }

    return (
        <div className="flex flex-col gap-y-4 mb-32">
            {modal && modal}
            <PageHeading
                title={'Archived Students'}
                subtitle={'List of Archived Students'}
            >
                {data && data?.data.length ? (
                    <>
                        <Button
                            text="Export"
                            variant="action"
                            Icon={FaFileExport}
                        />
                    </>
                ) : null}
            </PageHeading>

            <Card noPadding>
                {isError && <TechnicalError />}
                {isLoading ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data && data?.data?.length ? (
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
                            title={'No Archived Student!'}
                            description={'You have not archived Student yet'}
                            height={'50vh'}
                        />
                    )
                )}
            </Card>
        </div>
    )
}
