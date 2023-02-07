import {
    Button,
    ActionButton,
    Card,
    EmptyData,
    Filter,
    LoadingAnimation,
    Table,
    TableAction,
    TableActionOption,
    StudentFilters,
    Typography,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { FaEdit, FaEye, FaFileExport, FaFilter } from 'react-icons/fa'

import { AdminApi } from '@queries'
import { MdBlock, MdEmail, MdPhoneIphone } from 'react-icons/md'
import { ReactElement, useState } from 'react'
import {
    CourseDot,
    ProgressCell,
    SectorCell,
    StudentCellInfo,
} from './components'
import { RtoCellInfo } from '@partials/admin/rto/components'
import { Student } from '@types'
import { BlockModal } from './modals'
import { useRouter } from 'next/router'
import { checkWorkplaceStatus } from '@utils'
import { IndustryCell } from '../industry/components'
import { RiLockPasswordFill } from 'react-icons/ri'
import { useActionModal } from '@hooks'

interface StatusTableActionOption extends TableActionOption {
    status: string
}

export const FilteredStudents = ({
    student,
    setPage,
    itemPerPage,
    setItemPerPage,
}: {
    student: any
    setPage: any
    itemPerPage: any
    setItemPerPage: any
}) => {
    const router = useRouter()
    const [modal, setModal] = useState<ReactElement | null>(null)

    // hooks
    const { passwordModal, onViewPassword } = useActionModal()

    const onModalCancelClicked = () => {
        setModal(null)
    }
    const onBlockClicked = (student: Student) => {
        setModal(
            <BlockModal
                item={student}
                onCancel={() => onModalCancelClicked()}
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
        // {
        //     text: 'Block',
        //     onClick: (student: Student) => onBlockClicked(student),
        //     Icon: MdBlock,
        //     color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        // },
    ]
    const statusBaseActions: StatusTableActionOption[] = [
        {
            status: 'approved',
            text: 'Block',
            onClick: (student: Student) => onBlockClicked(student),
            Icon: MdBlock,
            color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        },
    ]

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'user.name',
            // cell: (info) => 'Saad',
            cell: (info) => {
                return <StudentCellInfo student={info.row.original} />
            },
            header: () => <span>Student</span>,
        },
        {
            accessorKey: 'rto',
            header: () => <span>RTO</span>,
            cell: (info) => {
                return <RtoCellInfo rto={info.row.original?.rto} short />
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
            accessorKey: 'user.status',
            header: () => <span>Status</span>,
            cell: (info) => (
                <Typography uppercase variant={'badge'}>
                    <span className="font-bold">
                        {info.row.original?.user?.status}
                    </span>
                </Typography>
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
            accessorKey: 'progress',
            header: () => <span>Progress</span>,
            cell: ({ row }) => {
                const workplace = row.original.workplace[0]
                const steps = checkWorkplaceStatus(workplace?.currentStatus)

                return <ProgressCell step={steps || 1} />
            },
        },
        {
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: (info) => (
                <div className="flex gap-x-1 items-center">
                    <TableAction
                        options={[
                            ...tableActionOptions,
                            ...statusBaseActions.filter(
                                (action) =>
                                    action.status ===
                                    info.row.original?.user?.status
                            ),
                        ]}
                        rowItem={info.row.original}
                    />
                </div>
            ),
        },
    ]

    const quickActionsElements = {
        id: 'id',
        individual: (id: number) => (
            <div className="flex gap-x-2">
                <ActionButton Icon={FaEdit}>Edit</ActionButton>
                <ActionButton>Sub Admins</ActionButton>
                <ActionButton Icon={MdBlock} variant="error">
                    Block
                </ActionButton>
            </div>
        ),
        common: (ids: number[]) => (
            <ActionButton Icon={MdBlock} variant="error">
                Block
            </ActionButton>
        ),
    }

    return (
        <>
            {modal && modal}
            {passwordModal && passwordModal}
            <div className="flex flex-col gap-y-4 p-4">
                <PageHeading
                    title={'Filtered Students'}
                    subtitle={'List of Filtered Students'}
                />

                <Card noPadding>
                    {student?.isLoading || student?.isFetching ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : student?.data && student?.data?.data.length ? (
                        <Table
                            columns={columns}
                            data={student?.data.data}
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
                                                    student?.data?.pagination,
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
                        <EmptyData
                            title={'No Students in your Search!'}
                            description={'No Students in your Search yet'}
                            height={'50vh'}
                        />
                    )}
                </Card>
            </div>
        </>
    )
}
