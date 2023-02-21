import {
    ActionButton,
    Card,
    EmptyData,
    LoadingAnimation,
    StudentStatusProgressCell,
    Table,
    TableAction,
    TableActionOption,
    TechnicalError,
    Typography,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'

import { AdminApi, commonApi } from '@queries'
import { Student } from '@types'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { MdUnarchive } from 'react-icons/md'
import { IndustryCell } from '../industry/components'
import { RtoCellInfo } from '../rto/components'
import { ProgressCell, SectorCell, StudentCellInfo } from './components'
import { useActionModal } from '@hooks'
import { RiLockPasswordFill } from 'react-icons/ri'
import { checkStudentStatus, checkWorkplaceStatus } from '@utils'

export const ArchivedStudent = () => {
    const router = useRouter()
    const [filterAction, setFilterAction] = useState(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState({})

    // hooks
    const { passwordModal, onViewPassword } = useActionModal()

    const { isLoading, data, isError } = AdminApi.Students.useListQuery({
        search: `status:archived`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })
    const [bulkAction, resultBulkAction] = commonApi.useBulkStatusMutation()

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'View',
            onClick: (student: any) => {
                router.push(
                    `/portals/admin/student/${student?.id}?tab=overview`
                )
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
            text: 'Unarchive',
            onClick: () => {},
            Icon: MdUnarchive,
            color: 'text-orange-500 hover:bg-orange-100 hover:border-orange-200',
        },
        {
            text: 'Delete',
            onClick: () => {},
            Icon: FaTrash,
            color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        },
    ]

    const columns: ColumnDef<Student>[] = [
        {
            accessorKey: 'user.name',
            cell: (info) => {
                return <StudentCellInfo student={info.row.original} />
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
            cell: (info) => {
                const industry = info.row.original?.industries

                return industry && industry?.length > 0 ? (
                    <IndustryCell industry={industry[0]} />
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
            accessorKey: 'progress',
            header: () => <span>Progress</span>,
            cell: ({ row }) => {
                const workplace = row.original.workplace[0]
                const industries = row.original?.industries
                const steps = checkWorkplaceStatus(workplace?.currentStatus)
                const studentStatus = checkStudentStatus(
                    row.original?.studentStatus
                )
                return <StudentStatusProgressCell step={studentStatus} />
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
        individual: (id: number) => (
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
        common: (ids: number[]) => (
            <div className="flex gap-x-2">
                <ActionButton
                    onClick={() => {
                        const arrayOfIds = ids.map((id: any) => id?.user.id)
                        bulkAction({ ids: arrayOfIds, status: 'approved' })
                    }}
                    Icon={MdUnarchive}
                    variant="warning"
                >
                    Unarchive
                </ActionButton>
                <ActionButton Icon={FaTrash} variant="error">
                    Delete
                </ActionButton>
            </div>
        ),
    }

    return (
        <>
            {passwordModal && passwordModal}
            <div className="flex flex-col gap-y-4 mb-32">
                <PageHeading
                    title={'Archived Students'}
                    subtitle={'List of Archived Students'}
                />

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
                                                setItemPerPage
                                            )}
                                            <div className="flex gap-x-2">
                                                {quickActions}
                                                {pagination(
                                                    data?.pagination,
                                                    setPage
                                                )}
                                            </div>
                                        </div>
                                        <div className="px-6">{table}</div>
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
